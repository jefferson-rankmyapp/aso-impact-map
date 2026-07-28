# Roadmap — Mapa de Impacto ASO

Este documento descreve a visão de evolução do projeto, com base no material de treinamento (slide 10) e nas oportunidades identificadas no uso da ferramenta.

---

## Estado Atual (v1.0)

O mapa está em produção com:
- ✅ 10 nós causais no grafo interativo
- ✅ 3 personas com 4 cenários cada (12 cenários)
- ✅ 36 análises complementares mapeadas (3 por cenário)
- ✅ Painel de diagnóstico com contexto, insight de mercado, diagnóstico e plano de ação
- ✅ Analytics de uso (sessões, personas, cenários, análises, nós)
- ✅ Dashboard de métricas em https://mi-tool-hub.vercel.app/admin/impact-map
- ✅ Material de treinamento (apresentação de 11 slides + versão PDF)

---

## Iniciativas de Futuro

### 1. Jornadas Inteligentes

**Visão:** O mapa sugere automaticamente o próximo cenário com base no histórico do cliente.

**Como:** Cada visita registrada, cada análise selecionada e cada plano executado vira sinal de predição. Com volume de dados suficiente, é possível criar um motor de recomendação que diz: *"Para clientes com esse perfil de problema, o próximo passo mais comum é..."*

**Dados necessários:** Histórico de sessões por cliente (integração com CRM ou Salesforce).

---

### 2. Registro de Planos de Ação

**Visão:** Cada plano de ação executado vira dado estruturado — com resultado medido.

**Como:** Adicionar ao mapa um campo de "execução" onde o estrategista registra: qual análise foi entregue, qual foi a resposta do cliente, quais métricas mudaram após a ação. O loop fecha quando o sistema mostra: *"Clientes que executaram esse plano de ação tiveram X% de melhoria no rating em Y semanas"*.

**Impacto:** Transforma o mapa de ferramenta de diagnóstico para sistema de inteligência de CS.

---

### 3. Integração com Tarefas do Time

**Visão:** Tarefas do CRM/task manager como insumo para sugerir jornadas e análises prioritárias.

**Como:** Onde o time gasta mais tempo? Quais cenários recorrem mais? Esses padrões revelam onde o produto deve evoluir e quais análises precisam ser adicionadas.

**Dado:** Integração com Linear, Notion ou CRM existente.

---

### 4. Modelos Preditivos (Diagnóstico Proativo)

**Visão:** O sistema sabe — antes do cliente — que um problema está se formando.

**Como:** Com dados históricos de apps monitorados (ratings, reviews, downloads, crash rate), treinar um modelo que identifica padrões antecedentes de crise. O mapa se transforma de diagnóstico reativo para diagnóstico proativo.

**Pré-requisito:** Volume de dados históricos de apps da base RankMyApp + integração com a plataforma de analytics interna (DataRank).

---

### 5. Melhorias de Curto Prazo

Estas são melhorias pontuais que podem ser entregues sem grandes dependências:

| Item | Impacto | Esforço |
|---|---|---|
| Adicionar novos cenários por persona | Alto | Baixo — editar `mapa.html` |
| Adicionar filtro por plano (Starter/Pro/etc.) | Médio | Médio |
| Exportar plano de ação como PDF | Alto | Médio |
| Modo de apresentação para o cliente (público) | Alto | Médio |
| Tradução para inglês (EN) | Alto | Médio |
| Adicionar mais análises complementares por cenário | Médio | Baixo |
| Integrar analytics com o dashboard do DataRank | Alto | Alto |
| Migrar backend de analytics do mi-tool-hub para este projeto | Baixo | Alto |

---

## Decisões de Arquitetura para o Futuro

### Quando migrar o backend de analytics?

Atualmente, o tracking de eventos usa a API do `mi-tool-hub` (cross-origin). Isso funciona e simplifica a infraestrutura. Migrar para um backend próprio faz sentido quando:
- O projeto precisar de autenticação própria
- O volume de eventos justificar uma instância separada de banco
- A equipe que mantiver o projeto não tiver acesso ao mi-tool-hub

### Quando adicionar um framework (Next.js, Vite)?

O projeto é HTML puro — simples, rápido, sem dependências. Migrar para um framework faz sentido quando:
- For necessário autenticação de usuário (login)
- For necessário SSR ou geração de conteúdo dinâmico
- O número de páginas crescer significativamente (> 10)

### Quando quebrar em múltiplos repos?

O projeto é pequeno e autocontido. Manter em um repo único é a decisão correta até que o projeto tenha times distintos trabalhando em partes diferentes.
