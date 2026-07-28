# Analytics — Mapa de Impacto ASO

Documentação do sistema de rastreamento de uso da ferramenta.

---

## Visão Geral

O analytics rastreia eventos anônimos de uso sem coletar nenhum dado pessoal (sem cookies, sem login, sem PII). O objetivo é entender:

- Quantas pessoas estão usando a ferramenta
- Quais personas e cenários são mais acessados
- Quais análises complementares são mais selecionadas
- Quais nós do grafo atraem mais atenção

---

## Eventos Rastreados

| Evento | Quando dispara | Campos enviados |
|---|---|---|
| `page_view` | Ao carregar `mapa.html` | `eventType` |
| `persona_select` | Ao clicar em CS, Marketing ou Produto | `eventType`, `persona` |
| `scenario_open` | Ao clicar em um cenário dentro da persona | `eventType`, `persona`, `scenario` (slug) |
| `node_click` | Ao clicar em um nó do grafo | `eventType`, `nodeName` |
| `analysis_toggle` | Ao selecionar/deselecionar uma análise complementar | `eventType`, `analysisSlug`, `action` (select/deselect) |

---

## Implementação no `mapa.html`

### Session ID anônimo

```javascript
const _sid = (() => {
  const k = "im_sid"
  let id = sessionStorage.getItem(k)
  if (!id) { id = crypto.randomUUID(); sessionStorage.setItem(k, id) }
  return id
})()
```

- Gerado por `crypto.randomUUID()` — criptograficamente aleatório
- Armazenado em `sessionStorage` — não persiste entre abas ou sessões
- Nenhum dado de usuário é associado ao ID

### Função de tracking

```javascript
function track(payload) {
  fetch("https://mi-tool-hub.vercel.app/api/impact-map/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...payload, sessionId: _sid }),
    keepalive: true,
  }).catch(() => {})
}
```

- `keepalive: true` — garante que o evento seja enviado mesmo no unload da página
- `.catch(() => {})` — nunca interrompe a UX se o endpoint estiver indisponível

### Hooks nos eventos

As funções originais do mapa são sobrescritas no `window` após salvar referências:

```javascript
const _orig = window.selectPersona
window.selectPersona = function(pid) {
  _orig(pid)
  if (pid) track({ eventType: "persona_select", persona: pid })
}
```

Mesmo padrão para `selectScenario`, `selectNode` e `toggleAnalysis`.

---

## Backend — API de Tracking

**Endpoint:** `https://mi-tool-hub.vercel.app/api/impact-map/track`
**Método:** POST
**Auth:** Nenhuma (endpoint público — validação por tipo de evento)

O endpoint aceita CORS de qualquer origem (necessário para uso cross-domain do `aso-impact-map.vercel.app`).

---

## Schema do Banco de Dados

**Banco:** Vercel Postgres (no projeto `mi-tool-hub`)
**Tabela:** `impact_map_events`

```sql
CREATE TABLE IF NOT EXISTS impact_map_events (
  id            BIGSERIAL PRIMARY KEY,
  event_type    TEXT NOT NULL,
  persona       TEXT,         -- 'cs' | 'marketing' | 'produto'
  scenario      TEXT,         -- slug do cenário (ex: 'rating-drop')
  node_name     TEXT,         -- id do nó (ex: 'performance')
  analysis_slug TEXT,         -- slug da análise (ex: 'bench-rating-rd')
  action        TEXT,         -- 'select' | 'deselect'
  session_id    TEXT,         -- UUID anônimo de sessão
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

Índices criados:
- `event_type`
- `created_at`
- `persona`
- `session_id`

---

## Dashboard de Métricas

**URL:** https://mi-tool-hub.vercel.app/admin/impact-map
**Acesso:** Requer login com role `admin` ou `leadership`
**Credencial:** jefferson.freitas@rankmyapp.com.br

### KPIs exibidos

| KPI | Como é calculado |
|---|---|
| **Total de Sessões** | `COUNT(DISTINCT session_id)` |
| **Visualizações de Página** | `COUNT(*)` WHERE event_type = 'page_view' |
| **Cenários Abertos** | `COUNT(*)` WHERE event_type = 'scenario_open' |
| **Análises Selecionadas** | `COUNT(*)` WHERE event_type = 'analysis_toggle' AND action = 'select' |
| **Sessões Engajadas** | Sessões com ≥ 1 evento além de page_view |
| **Taxa de Engajamento** | sessões_engajadas / total_sessões × 100 |

### Relatórios disponíveis

- **Sparkline diário** — últimos 14 dias (sessões, cenários, visualizações)
- **Personas mais selecionadas** — com percentual do total
- **Top nós clicados** — por contagem de cliques
- **Top cenários abertos** — por frequência de abertura
- **Top análises selecionadas** — por frequência de seleção

---

## Migração Futura do Backend

Atualmente o backend de analytics roda no `mi-tool-hub`. Se o projeto crescer para ter equipe própria, a migração implica:

1. Criar instância de Vercel Postgres no projeto `aso-impact-map`
2. Criar `api/track/route.ts` (ou equivalente) neste projeto
3. Atualizar a URL de `fetch()` em `mapa.html` para o endpoint local
4. Migrar dados históricos com `INSERT INTO ... SELECT FROM ...`
5. Atualizar o dashboard (atualmente hardcoded em `mi-tool-hub/app/admin/impact-map/page.tsx`)
