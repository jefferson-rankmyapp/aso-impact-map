# Arquitetura Técnica — Mapa de Impacto ASO

## Stack

O projeto é um **site estático** — sem framework, sem bundler, sem build step. Cada arquivo HTML é autocontido com CSS e JavaScript inline.

| Camada | Tecnologia |
|---|---|
| Frontend | HTML5 / CSS3 / JavaScript vanilla (ES6+) |
| Deploy | Vercel (static hosting) |
| CI/CD | Automático via push para `main` no GitHub |
| Analytics (backend) | Vercel Postgres via API do `mi-tool-hub` (cross-origin) |

---

## Estrutura de Arquivos

```
aso-impact-map/
├── index.html              ← Landing page
├── mapa.html               ← Ferramenta principal
├── treinamento.html        ← Apresentação 11 slides
├── treinamento-pdf.html    ← Print-ready para PDF
├── .gitignore
└── docs/                   ← Documentação completa
    ├── README.md
    ├── negocio/
    └── tecnico/
```

---

## `index.html` — Landing Page

Página de entrada com cards de navegação para as 3 seções do projeto.

- HTML/CSS puro
- Sem dependências externas
- Responsivo para mobile

---

## `mapa.html` — Ferramenta Principal

Arquivo central do projeto. Autocontido (~1.350 linhas). Estrutura:

```
mapa.html
├── <style>              ← CSS completo (variáveis, layout, componentes)
├── <body>
│   ├── #graph-wrap      ← Contêiner do grafo SVG
│   │   ├── <svg>        ← Arestas (linhas curvas entre nós)
│   │   └── .node[*]     ← 10 nós posicionados com absolute
│   ├── #panel           ← Painel lateral deslizante
│   │   ├── #panel-persona   ← Seletor de persona e cenários
│   │   └── #panel-node      ← Diagnóstico do nó selecionado
│   └── #persona-bar     ← Barra de seleção de persona (mobile)
└── <script>
    ├── const DIM        ← Dados dos 10 nós (descrição, features, relações causais)
    ├── const PERSONAS   ← Dados das 3 personas com 4 cenários cada
    ├── const EDGES      ← Lista de arestas causais
    ├── State vars       ← activePersona, activeScenario, selectedNode, selectedAnalyses
    └── Functions        ← drawEdges, updateNodes, selectPersona, selectScenario, selectNode, toggleAnalysis
    └── Analytics        ← track(), session ID, hooks nos eventos
```

### Estrutura de Dados — `DIM` (nós do grafo)

```javascript
const DIM = {
  performance: {
    label: "Performance Técnica",
    icon: "⚡",
    color: "#ef4444",
    description: "...",
    impacts: ["ratings", "reviews", "retencao"],   // este nó causa esses
    causedBy: [],                                    // esses nós causam este
    features: [                                      // features da plataforma
      { name: "Performance Impact", plan: "pro", icon: "⚡", desc: "..." },
    ],
  },
  // ... (10 nós no total)
}
```

### Estrutura de Dados — `PERSONAS` (personas e cenários)

```javascript
const PERSONAS = {
  cs: {
    id: "cs",
    label: "Customer Success",
    icon: "🤝",
    color: "#0ea5e9",
    tagline: "Diagnóstico e retenção de clientes",
    scenarios: [
      {
        id: "rating-drop",
        icon: "⭐",
        title: "Nota do app caindo",
        problem: "A nota do app caiu para abaixo de 4.0 nos últimos 30 dias.",
        narrative: "...",                            // texto de contexto
        insight: "...",                              // benchmark de mercado
        path: new Set(["performance", "ratings", "aquisicao"]),      // nós iluminados
        activeEdges: new Set(["performance-ratings", "ratings-aquisicao"]), // arestas iluminadas
        steps: [                                     // passos de diagnóstico
          { node: "performance", action: "Verificar se houve crash..." },
        ],
        recommendations: [                           // features recomendadas
          { action: "...", name: "App Sentinel", slug: "app-sentinel", how: "..." },
        ],
        analyses: [                                  // análises complementares
          { icon: "📊", name: "...", slug: "...", type: "benchmark", deliverable: "Relatório", desc: "...", why: "..." },
        ],
      },
      // ... (4 cenários por persona)
    ],
  },
  // marketing: { ... }
  // produto: { ... }
}
```

### Estrutura de Dados — `EDGES` (arestas causais)

```javascript
const EDGES = [
  ["performance", "ratings"],
  ["performance", "reviews"],
  ["performance", "retencao"],
  ["concorrentes", "aquisicao"],
  ["concorrentes", "visibilidade"],
  ["ratings", "aquisicao"],
  ["ratings", "visibilidade"],
  ["reviews", "aquisicao"],
  ["reviews", "churn"],
  ["retencao", "engajamento"],
  ["engajamento", "churn"],
  ["visibilidade", "aquisicao"],
  ["retencao", "receita"],
  ["engajamento", "receita"],
]
```

---

## `treinamento.html` — Apresentação 11 Slides

Apresentação interativa de slides com navegação via botões e teclado.

```
treinamento.html
├── <style>              ← CSS do deck + componentes de cada slide
├── .deck                ← Contêiner relativo (100vw × 100vh)
│   ├── #s1  .slide      ← Slide 1: Título
│   ├── #s2  .slide      ← Slide 2: Efeito Dominó (case AppFinance)
│   ├── #s3  .slide      ← Slide 3: Demo pause 1
│   ├── #s4  .slide      ← Slide 4: Teoria causal (mini mapa SVG)
│   ├── #s5  .slide      ← Slide 5: As 3 personas
│   ├── #s6  .slide      ← Slide 6: Marketing em ação (case)
│   ├── #s7  .slide      ← Slide 7: Demo pause 2
│   ├── #s8  .slide      ← Slide 8: A barra lateral
│   ├── #s9  .slide      ← Slide 9: Análises complementares
│   ├── #s10 .slide      ← Slide 10: Visão de futuro
│   └── #s11 .slide      ← Slide 11: Encerramento
└── <nav .nav>           ← Navegação: ←  ● ● ●  →  1/11
```

Navegação: botões ← → ou teclas `ArrowLeft` / `ArrowRight` / `Space`.

---

## `treinamento-pdf.html` — Versão Print-Ready

Versão estática da apresentação para exportação PDF via navegador.

**Diferenças em relação ao `treinamento.html`:**
- Todos os slides visíveis simultaneamente (sem toggle por JS)
- `@page { size: A4 landscape; margin: 0 }`
- `page-break-after: always` em cada `.slide`
- `-webkit-print-color-adjust: exact` para manter fundo escuro no PDF
- Dimensões em `mm` (297mm × 210mm) em vez de `vw/vh`

**Como usar:** Abrir no Chrome → Ctrl+P → Salvar como PDF. Selecionar:
- Layout: Paisagem
- Margens: Nenhuma
- Gráficos em segundo plano: ✅ ativado

---

## Analytics

O `mapa.html` rastreia eventos via `fetch()` para a API do `mi-tool-hub`:

```javascript
function track(payload) {
  fetch("https://mi-tool-hub.vercel.app/api/impact-map/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...payload, sessionId: _sid }),
    keepalive: true,  // dispara mesmo no unload
  }).catch(() => {})  // nunca quebra a UX
}
```

Sessão anônima via `crypto.randomUUID()` armazenado em `sessionStorage` (sem cookies, sem PII).

Eventos rastreados:
- `page_view` — ao carregar a página
- `persona_select` — ao clicar em uma persona
- `scenario_open` — ao abrir um cenário
- `node_click` — ao clicar em um nó do grafo
- `analysis_toggle` — ao selecionar/deselecionar uma análise complementar

Ver documentação completa em [analytics.md](./analytics.md).

---

## Dependências Externas

O projeto **não possui dependências de runtime** (sem npm, sem CDNs, sem frameworks).

Única dependência externa: chamada cross-origin para `https://mi-tool-hub.vercel.app/api/impact-map/track` (analytics). Se o endpoint estiver indisponível, o tracking simplesmente não ocorre — o `mapa.html` continua funcionando normalmente.
