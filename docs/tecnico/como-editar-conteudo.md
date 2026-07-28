# Como Editar Conteúdo — Mapa de Impacto ASO

Guia prático para adicionar ou modificar personas, cenários, nós e análises sem quebrar a ferramenta.

Todo o conteúdo do mapa está em **`mapa.html`**, nas constantes JavaScript no final do arquivo.

---

## Adicionar um novo Cenário a uma Persona existente

Abra `mapa.html` e localize o array `scenarios` dentro da persona desejada (ex: `PERSONAS.cs.scenarios`). Adicione um novo objeto seguindo o schema:

```javascript
{
  id: "meu-cenario",          // kebab-case, único dentro da persona
  icon: "🔥",                 // emoji exibido no card de seleção
  title: "Título do Cenário", // título curto (< 30 chars)
  problem: "Uma frase descrevendo o problema do cliente.",
  narrative: "Contexto mais longo explicando a situação e o que o estrategista precisa saber antes de agir.",
  insight: "Benchmark de mercado com fonte. Ex: 'Apps com X têm Y% de... (Fonte, Ano).'",

  // Nós que ficam iluminados no grafo
  path: new Set(["performance", "ratings", "aquisicao"]),

  // Arestas que ficam destacadas (formato: "from-to")
  activeEdges: new Set(["performance-ratings", "ratings-aquisicao"]),

  // Passos do diagnóstico — máx 5 recomendado
  steps: [
    { node: "performance", action: "O que verificar neste nó" },
    { node: "ratings",     action: "O que verificar neste nó" },
  ],

  // Features da plataforma — máx 5 recomendado
  recommendations: [
    {
      action: "O que o estrategista deve fazer",
      name: "Nome da Feature",
      slug: "nome-da-feature",   // kebab-case, para analytics
      how: "Como a feature resolve — frase curta e específica",
    },
  ],

  // Análises complementares — exatamente 3 (padrão)
  analyses: [
    {
      icon: "📊",
      name: "Nome da Análise",
      slug: "slug-da-analise",   // kebab-case único, para analytics
      type: "benchmark",          // ver tipos abaixo
      deliverable: "Relatório",   // o que é entregue (Relatório, Dashboard, Deck)
      desc: "O que a análise faz.",
      why: "Por que essa análise é relevante para este cenário específico.",
    },
  ],
}
```

**Tipos de análise disponíveis:**
`benchmark`, `daumau`, `midia`, `cohort`, `sentimento`, `keyword`, `sazonal`, `competitivo`

Cada tipo tem uma cor associada definida em `ANALYSIS_COLORS` no `mapa.html`.

---

## Adicionar uma nova Persona

Abra `mapa.html` e adicione uma nova entrada no objeto `PERSONAS`:

```javascript
const PERSONAS = {
  cs: { ... },
  marketing: { ... },
  produto: { ... },
  // Nova persona aqui:
  lideranca: {
    id: "lideranca",
    label: "Liderança",
    icon: "👔",
    color: "#10b981",             // cor hex para o tema da persona
    tagline: "Estratégia e resultado de negócio",
    scenarios: [
      // Adicionar cenários seguindo o schema acima
    ],
  },
}
```

Depois, adicione o botão de seleção da nova persona na seção HTML do `#persona-bar` e no `#panel-persona`. Busque por `cs` no HTML para encontrar os elementos a replicar.

---

## Adicionar um novo Nó ao Grafo

### 1. Adicionar ao objeto `DIM`

```javascript
const DIM = {
  // Nó existente...
  monetizacao: {
    label: "Monetização",
    icon: "💳",
    color: "#f59e0b",
    description: "Descrição do que este nó representa...",
    impacts: ["receita"],          // quais nós este causa
    causedBy: ["engajamento"],     // quais nós causam este
    features: [
      { name: "In-App Revenue", plan: "advanced", icon: "💳", desc: "..." },
    ],
  },
}
```

### 2. Adicionar ao array `EDGES`

```javascript
const EDGES = [
  // ... edges existentes
  ["engajamento", "monetizacao"],
  ["monetizacao", "receita"],
]
```

### 3. Posicionar o nó no HTML

Localize a seção dos nós no HTML (elementos `<div class="node" id="n-...">`). Adicione:

```html
<div class="node" id="n-monetizacao"
     style="left: 50%; top: 50%"   <!-- posição no grafo, ajustar conforme layout -->
     onclick="selectNode('monetizacao')">
  <div class="node-icon">💳</div>
  <div class="node-label">Monetização</div>
</div>
```

Ajuste `left` e `top` para posicionar o nó no grafo sem sobrepor os existentes.

---

## Modificar um Cenário ou Análise existente

Localize o cenário pelo `id` dentro de `PERSONAS`:

```
Ctrl+F → "rating-drop"   → Cenário CS-1 (Nota do app caindo)
Ctrl+F → "review-spike"  → Cenário CS-2 (Pico de reviews negativos)
Ctrl+F → "churn-spike"   → Cenário CS-3 (Churn pós-atualização)
...
```

Edite os campos desejados diretamente. Os campos mais comuns de atualizar:
- `insight` — atualizar benchmarks de mercado com anos e fontes mais recentes
- `recommendations` — adicionar nova feature lançada no produto
- `analyses` — adicionar análise nova que o time está entregando

---

## Atualizar Features de um Nó

Localize o nó em `DIM` e edite o array `features`:

```javascript
ratings: {
  features: [
    // Adicionar nova feature:
    { name: "Rating Guard", plan: "enterprise", icon: "🛡", desc: "Alerta proativo antes da nota cair." },
  ],
}
```

Planos válidos: `starter`, `pro`, `advanced`, `enterprise`

---

## Checklist antes de publicar uma alteração

- [ ] `id` do cenário é único dentro da persona
- [ ] `slug` das análises são únicos globalmente (para analytics não conflitar)
- [ ] Nós referenciados em `path` e `activeEdges` existem em `DIM`
- [ ] Arestas em `activeEdges` existem em `EDGES`
- [ ] Abrir `mapa.html` localmente e testar:
  - [ ] Selecionar a persona modificada
  - [ ] Abrir o cenário novo/editado
  - [ ] Clicar nos nós e verificar o painel lateral
  - [ ] Selecionar as análises complementares

---

## Dicas de Layout do Grafo

O grafo usa SVG com arestas desenhadas como curvas de Bézier via JavaScript. As posições dos nós são definidas por `style="left: Xpx; top: Ypx"` no HTML (posicionamento absoluto dentro do `#graph-wrap`).

- O contêiner do grafo tem 1200px × 600px (aprox)
- Nós têm ~110px de largura e ~70px de altura
- Manter distância mínima de 30px entre nós
- Novos nós devem estar visualmente separados por tipo (causas raiz à esquerda, desfechos à direita)
