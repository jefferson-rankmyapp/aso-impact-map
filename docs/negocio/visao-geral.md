# Visão Geral de Negócio — Mapa de Impacto ASO

## O que é

O **Mapa de Impacto ASO** é uma ferramenta interativa de diagnóstico causal para estrategistas da RankMyApp. Ele visualiza as relações causais entre as dimensões de um app mobile e guia o estrategista a identificar a causa raiz de um problema — antes de falar com o cliente.

A ferramenta responde à pergunta central do trabalho do estrategista:

> *"O que realmente está causando esse problema — e como a plataforma RankMyApp me ajuda a provar isso?"*

---

## Problema que resolve

Estrategistas da RankMyApp chegavam a calls de retenção e diagnóstico com dados isolados, sem uma estrutura de raciocínio causal. Comum acontecer:

- Focar em sintomas (rating baixo) sem identificar a causa (crash recente)
- Usar features da plataforma de forma dispersa, sem narrativa conectada
- Apresentar ao cliente análises pontuais em vez de um diagnóstico estruturado

O Mapa de Impacto resolve isso fornecendo:
1. **Um grafo causal** das dimensões do app — cada nó conectado ao que causa e ao que é causado por ele
2. **Cenários pré-mapeados por persona** — o estrategista seleciona o problema do cliente e recebe o caminho de diagnóstico pronto
3. **Features da RankMyApp conectadas a cada passo** — cada recomendação tem a feature específica que entrega a evidência
4. **Análises complementares** — entregas que vão além das features, enriquecendo a proposta de valor

---

## Proposta de Valor

| Para quem | O que entrega |
|---|---|
| **Customer Success** | Chega à call com diagnóstico, não com suposição |
| **Marketing** | Separa problema orgânico de problema de mídia antes de mudar o budget |
| **Produto** | Correlaciona feedback de usuário com métricas e prioriza o backlog com dado real |
| **RankMyApp** | Diferencial de consultoria — não apenas dados, mas raciocínio causal estruturado |

---

## Público-Alvo

**Usuário primário:** Estrategistas internos da RankMyApp (CS, Marketing, Produto)

**Uso típico:**
- Antes de uma call de diagnóstico com o cliente
- Durante uma apresentação para justificar análises adicionais
- Em onboarding de novos estrategistas para aprender a cadeia causal

**Não é voltado** para o cliente final — é uma ferramenta interna de preparação e formação.

---

## Dimensões do Mapa

O grafo é composto por **10 nós (dimensões)**, cada um com suas relações causais:

| Nó | Ícone | Cor | Causado por | Causa |
|---|---|---|---|---|
| Performance Técnica | ⚡ | Vermelho | — | Ratings, Reviews, Retenção |
| Ratings | ⭐ | Amarelo | Performance | Aquisição, Visibilidade |
| Reviews | 💬 | Azul | Performance | Aquisição, Churn |
| Retenção | 🔁 | Roxo | Performance | Engajamento, Receita |
| Engajamento | 📈 | Índigo | Retenção | Churn, Receita |
| Visibilidade | 🔎 | Ciano | Ratings, Concorrentes | Aquisição |
| Aquisição | 🚀 | Verde | Ratings, Reviews, Visibilidade, Concorrentes | — |
| Churn | 📉 | Vermelho escuro | Reviews, Engajamento | — |
| Receita | 💰 | Âmbar | Retenção, Engajamento | — |
| Concorrentes | 🔍 | Cinza | — | Aquisição, Visibilidade |

**Regra geral da cadeia causal:**
```
Performance / Concorrentes (causas raiz)
    ↓
Ratings / Reviews / Retenção (amplificadores)
    ↓
Visibilidade / Engajamento (intermediários)
    ↓
Aquisição / Churn / Receita (desfechos de negócio)
```

---

## Features da Plataforma Referenciadas

Cada nó do mapa está associado a features do produto RankMyApp por plano:

| Plano | Features associadas (exemplos) |
|---|---|
| **Starter** | Ratings Analysis, Ratings Overview, Reviews Analysis, Daily Trends, Category Rank, Keyword Management, Live Store Search, Top Apps |
| **Pro** | Performance Impact, Competitor Map, App Comparison, Words, Reviews Replies |
| **Advanced** | App Sentinel, App Foresight, Predictive Growth, Competitive Radar, Keyword Expansion, Review Brief, Comparative Analysis |
| **Enterprise** | Custom Pages Studio |

---

## Histórico e Contexto

O Mapa de Impacto foi criado para o time de estrategistas da RankMyApp como ferramenta de capacitação e diagnóstico. Após o primeiro uso interno, chamou atenção suficiente para justificar:

1. Métricas de uso dedicadas (analytics via Vercel Postgres)
2. Material de treinamento estruturado (apresentação de 11 slides)
3. Separação em repositório próprio para crescer de forma independente

O projeto foi extraído do `mi-tool-hub` (hub de ferramentas internas) para ganhar identidade e lifecycle próprios.
