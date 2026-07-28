# Personas e Cenários — Mapa de Impacto ASO

O mapa tem **3 personas** e **12 cenários** (4 por persona). Cada cenário contém: problema, narrativa, insight de mercado, caminho causal, passos de diagnóstico, recomendações de features e análises complementares.

---

## Persona 1 — Customer Success 🤝

**Tagline:** Diagnóstico e retenção de clientes
**Cor:** #0ea5e9 (azul)

O CS entra no problema quando o cliente já está insatisfeito. Seu objetivo é chegar à call com diagnóstico estruturado — não com suposição.

---

### CS-1: Nota do app caindo ⭐

**Problema:** A nota do app caiu para abaixo de 4.0 nos últimos 30 dias.

**Caminho causal:** Performance → Ratings → Aquisição

**Insight de mercado:**
- Queda de 4.0 para 3.9 = -15 a -20% na conversão orgânica
- Crash-free sessions < 99.5% correlaciona com rating < 3.5
- Cada 0.1 ponto a menos no rating eleva o CPI em 2-3%

**Passos de diagnóstico:**
1. Verificar crash ou ANR correlacionado com início da queda
2. Analisar evolução da nota por versão e por país
3. Medir impacto nos downloads (comparar antes/depois)

**Features recomendadas:** App Sentinel, Ratings Analysis, Performance Impact, Reviews & Replies, Review Brief

**Análises complementares:**
- 📊 Benchmark de Rating por Segmento — top 5 concorrentes no mesmo segmento
- 📉 Análise de Cohort por Versão — qual release causou o problema
- 🔄 Análise de Sazonalidade Histórica — queda estrutural vs padrão sazonal

---

### CS-2: Pico de reviews negativos 💬

**Problema:** Volume de reviews negativos subiu 40% na última semana.

**Caminho causal:** Performance → Reviews → Churn

**Insight de mercado:**
- Resposta em até 24h aumenta nota de review negativo em média 0.7 estrelas no Google Play
- Respostas personalizadas têm taxa de atualização muito maior que genéricas

**Passos de diagnóstico:**
1. Checar se ANR/crash recente coincide com início do pico
2. Identificar palavras-chave dominantes e versão mais mencionada
3. Estimar usuários em risco e agir com resposta ativa

**Features recomendadas:** Reviews Analysis, Words, Reviews & Replies, Review Brief, App Sentinel

**Análises complementares:**
- 💬 Análise de Sentimento NLP por Tema — prioriza o tema de maior impacto
- 📢 Análise de Mídia Correlacionada — campanha trouxe usuário fora do perfil?
- 📊 Benchmark de Resposta a Reviews — taxa de atualização vs concorrentes

---

### CS-3: Churn acelerado pós-atualização 📉

**Problema:** Taxa de desinstalação aumentou 25% após o último release.

**Caminho causal:** Performance → Reviews → Engajamento → Churn

**Insight de mercado:**
- Queda de 5+ pontos percentuais em D7 vs cohort anterior = investigação imediata
- Bugs intermitentes não aparecem no crash rate mas destroem a retenção
- D1 alta com D7 baixa = onboarding atraente mas app não entrega a promessa

**Passos de diagnóstico:**
1. Identificar crash rate da versão nova vs anterior
2. Filtrar reviews da semana por versão — tema dominante?
3. Verificar queda de DAU/sessões no pós-release
4. Confirmar correlação e escalar para produto

**Features recomendadas:** App Sentinel, Performance Impact, Reviews Analysis, App Foresight

**Análises complementares:**
- 👥 Análise de DAU/MAU Pós-Release — 14 dias antes vs depois do release
- 📉 Análise de Cohort de Churn — D1/D7/D30 pós release problemático
- ⚖️ Análise Comparativa de Versões — crash/ANR/rating/churn nas últimas 3 versões

---

### CS-4: Queda geral de satisfação 😟

**Problema:** NPS do app em queda consistente há 2 meses sem causa aparente.

**Caminho causal:** Performance → Ratings → Reviews → Churn

**Insight de mercado:**
- ANR rate > 0.47% ou crash rate > 1.09% acionam penalidade de visibilidade no Google Play
- Lentidão silenciosa (não crash) é a causa mais subestimada de deterioração de NPS

**Passos de diagnóstico:**
1. Verificar lentidão crescente (ANR) — app ficou mais pesado?
2. Mapear curva de queda de rating — há aceleração em alguma versão?
3. Identificar temas recorrentes nos reviews dos 2 meses
4. Projetar impacto no LTV e priorizar correção com produto

**Features recomendadas:** Ratings Analysis, Review Brief, Comparative Analysis, Words, Performance Impact

**Análises complementares:**
- 🔄 Análise de Sazonalidade Histórica de Satisfação — 24 meses com correlação de eventos
- 📊 Benchmark de NPS por Vertical — NPS relativo ao setor (fintech, saúde, e-commerce)
- 🔑 Análise de Keywords de Insatisfação por Período — quando cada tema surgiu

---

## Persona 2 — Marketing 📣

**Tagline:** Crescimento, aquisição e posicionamento
**Cor:** #f97316 (laranja)

O Marketing entra pelo funil — downloads, keywords, CVR. Seu objetivo é separar problema orgânico de problema de mídia antes de mudar o budget.

---

### MKT-1: Downloads estagnados 📊

**Problema:** Downloads estagnaram há 6 semanas sem mudança de budget ou campanha.

**Caminho causal:** Concorrentes → Ratings → Visibilidade → Aquisição

**Insight de mercado:**
- Apps que caem do top 3 para top 10 em keyword principal perdem 60-70% do tráfego orgânico
- Diferença entre posição 1 e posição 3 = 3-5x mais cliques
- Metadata update a cada 4-6 semanas mantém relevância algorítmica

**Passos de diagnóstico:**
1. Verificar se concorrentes subiram de posição ou nota recentemente
2. Checar se nota caiu abaixo de 4.0 — threshold crítico de conversão
3. Auditar posição em keywords-chave — alguma perdeu rank?
4. Medir CVR da página e comparar com benchmark do setor

**Features recomendadas:** Keyword Expansion, Keyword Evolution, Ratings Overview, Predictive Growth, App Sentinel

**Análises complementares:**
- 📢 Análise de Mídia: Paid vs Organic — orgânico secou ou paid perdeu eficiência?
- 🔑 Análise de Benchmark de Keywords — share of voice vs top 3 concorrentes
- 🔄 Análise de Sazonalidade de Downloads — vale sazonal ou queda estrutural?

---

### MKT-2: Concorrente ganhando share 🔍

**Problema:** Um concorrente cresceu 25% mais rápido no último trimestre.

**Caminho causal:** Concorrentes → Visibilidade → Ratings → Aquisição

**Insight de mercado:**
- Apps com ASO + Apple Search Ads nas mesmas keywords têm lift de conversão de até +8.6%
- Diferença de 0.3 estrelas na nota = vantagem composta ao longo do tempo (não pontual)

**Passos de diagnóstico:**
1. Mapear quais keywords o concorrente ganhou ranking
2. Comparar posição em categoria e share of voice
3. Comparar nota e velocidade de resposta a reviews
4. Projetar recuperação de share com plano de keywords + melhoria de nota

**Features recomendadas:** Competitor Map, Keyword Competitors, Changes Log, Competitive Radar, Comparative Analysis

**Análises complementares:**
- 🏆 Benchmark Competitivo Completo — rating/reviews/SOV/downloads dos 5 principais concorrentes
- 🔑 Análise de Share of Voice em Keywords — onde a batalha orgânica está sendo perdida
- 👥 Análise de DAU/MAU Comparativa — concorrente cresceu em aquisição ou retenção?

---

### MKT-3: Lançamento em novo mercado 🌎

**Problema:** Expandindo para o mercado LatAm — como estruturar o ASO?

**Caminho causal:** Concorrentes → Visibilidade → Ratings → Aquisição

**Insight de mercado:**
- Localização completa (título + screenshots + preview) tem lift de conversão de até +26%
- Expansão para Tier Full pode gerar até +128% de downloads no novo mercado
- App com 4.7 global pode ter 3.8 local se nunca teve presença no mercado

**Passos de diagnóstico:**
1. Mapear top 10 concorrentes locais e suas keywords dominantes
2. Definir estratégia de keywords localizadas e posição-alvo em categoria
3. Coletar reviews em português — adaptar resposta e onboarding para expectativas locais
4. Projetar rampa de crescimento com mix orgânico + paid para os primeiros 90 dias

**Features recomendadas:** Keyword Analysis, Competitive Radar, Live Store Search, Ratings Overview, Daily Trends

**Análises complementares:**
- 📊 Benchmark Local por Segmento — top 5 players locais com keywords e estimativa de downloads
- 📢 Análise de Mídia no Mercado Alvo — CPIs e canais mais eficientes no mercado local
- 🔑 Análise de Oportunidade de Keywords Locais — high volume, low competition em idioma local

---

### MKT-4: Conversão na página do app baixa 🎯

**Problema:** Anúncios trazem tráfego mas a conversão na página do app é abaixo de 20%.

**Caminho causal:** Ratings → Reviews → Aquisição

**Insight de mercado:**
- Rating de 3 → 4 estrelas = +89% de conversão
- Rating < 4.0 exclui o app de usuários que filtram buscas por 4+ no Play Store
- 92% dos apps em destaque editorial têm 4+ estrelas; 63% têm 4.6+
- CVR médio de referência: 25% (iOS) e 27.3% (Android) nos EUA

**Passos de diagnóstico:**
1. Verificar nota atual — abaixo de 4.0 reduz conversão em até 70%
2. Checar quais reviews aparecem em destaque — são negativos? Há resposta?
3. Testar screenshots e Custom Product Page (CPP) para melhorar CVR

**Features recomendadas:** Ratings Analysis, Reviews & Replies, Review Brief, Custom Pages Studio, Predictive Growth

**Análises complementares:**
- 📊 Benchmark de CVR por Vertical — referência por segmento para iOS e Android
- 📢 Análise de Mídia: Qual Fonte Converte — qual canal contamina o CVR médio?
- 💬 Análise de Sentimento nas Reviews de 1-2★ — objeções explícitas à instalação

---

## Persona 3 — Produto ⚙️

**Tagline:** Qualidade, retenção e roadmap
**Cor:** #8b5cf6 (roxo)

O Produto entra pelos dados internos — DAU, D1, retenção, feature adoption. Seu objetivo é correlacionar feedback de usuário com métricas e priorizar o backlog com dado real.

---

### PROD-1: Engajamento caindo 📉

**Problema:** DAU/MAU caiu 15% no último mês sem explicação clara.

**Caminho causal:** Performance → Reviews → Retenção → Engajamento → Churn

**Insight de mercado:**
- DAU pode ser estável com churn alto se aquisição compensa — triangular com cohort retention
- Stickiness (DAU/MAU) < 10% em qualquer categoria = engajamento crítico
- Queda de DAU por 12 semanas = leading indicator de churn 30-60 dias à frente

**Passos de diagnóstico:**
1. Checar se ANR rate aumentou — app pode estar travando sem crash explícito
2. Analisar reviews das últimas 4 semanas — há tema novo de friction?
3. Verificar D7 e D30 — queda é de novos ou de usuários recorrentes?
4. Identificar qual feature/flow teve queda de uso
5. Projetar impacto em LTV e montar sprint de correção prioritária

**Features recomendadas:** App Sentinel, Performance Impact, App Foresight, Reviews Analysis, Comparative Analysis

**Análises complementares:**
- 👥 Análise de DAU/MAU com Cohort Breakdown — distingue novos vs base existente
- 🔄 Análise de Sazonalidade de Engajamento — queda de 15% em dezembro pode ser sazonal
- 📊 Benchmark de Stickiness por Vertical — contexto por categoria (fintech, saúde, social)

---

### PROD-2: Retenção D1 baixa após onboarding 🔁

**Problema:** Apenas 25% dos novos usuários voltam no dia seguinte à instalação.

**Caminho causal:** Performance → Retenção → Engajamento

**Insight de mercado:**
- D7 mediana por vertical: Fintech 13%, E-commerce 11%, Saúde 10%, Social 14% (Adjust, 2025)
- D1 alta com D7 baixa = onboarding atraente mas core value não entregue
- Crash durante sessão de onboarding = usuário perdido definitivamente (sem segunda chance)

**Passos de diagnóstico:**
1. Medir crash rate e ANR rate especificamente na sessão de onboarding
2. Identificar em qual step do onboarding a maioria abandona
3. Verificar se usuários que completam onboarding têm D1 acima da média geral

**Features recomendadas:** Performance Impact, Reviews Analysis, App Foresight, App Sentinel

**Análises complementares:**
- 📉 Análise de Cohort D1/D7/D30 — curvas de retenção por cohort semanal (últimos 3 meses)
- 🎯 Análise de Funil de Onboarding — ponto de maior abandono por step
- 📊 Benchmark de Retenção por Categoria — contextualiza se D1=25% é crítico ou aceitável

---

### PROD-3: Priorização de roadmap 🗺️

**Problema:** Precisamos decidir o que priorizar para o próximo quarter com dados.

**Caminho causal:** Performance → Reviews → Retenção → Engajamento → Churn

**Insight de mercado:**
- Tema em > 15% dos reviews negativos = sprint atual
- 5-15% = backlog top
- < 5% = melhoria pontual
- Temas que aparecem em reviews E em crash logs = prioridade máxima (sinal convergente)

**Passos de diagnóstico:**
1. Listar bugs de crash/ANR por impacto (usuários afetados × frequência)
2. Extrair top 5 temas de insatisfação dos reviews (por volume e sentimento)
3. Identificar onde usuários saem no funil (onboarding, D1, D7, D30)
4. Mapear features com maior correlação com usuários de alta retenção
5. Calcular custo de aquisição desperdiçado com churn evitável

**Features recomendadas:** Review Brief, Reviews Analysis, Performance Impact, Competitive Radar, Words

**Análises complementares:**
- 🎯 Análise de Impacto Estimado por Iniciativa — score por evidência para cada item do backlog
- 🏆 Benchmark de Features por Vertical — higiene vs diferencial nos top 5 concorrentes
- 💬 Análise de Correlação Review→Métrica — quais temas de reviews causam mais churn/rating

---

### PROD-4: Feature nova não engaja ✨

**Problema:** Lançamos uma feature nova há 3 semanas e o engajamento não cresceu.

**Caminho causal:** Reviews → Engajamento → Churn

**Insight de mercado:**
- Silêncio nos reviews sobre feature nova = usuários não sabem que existe (problema de discoverability)
- Reviews de 3 estrelas têm o feedback mais construtivo
- Reviews de 5 estrelas frequentemente contêm frustração oculta

**Passos de diagnóstico:**
1. Buscar menções à feature nova nos reviews — usuários a encontraram?
2. Verificar funil de uso — quantos chegam, quantos usam de novo?
3. Identificar se usuários que usaram a feature têm menor churn (valida o valor)

**Features recomendadas:** Reviews Analysis, Words, Review Brief, Comparative Analysis

**Análises complementares:**
- 🔍 Análise de Discoverability da Feature — o nome da feature aparece em reviews e keywords?
- 👥 Análise de DAU da Feature vs Total — retention lift para usuários que usaram a feature
- 🏆 Benchmark de Adoção de Features Similares — como concorrentes comunicaram features equivalentes

---

## Resumo — Análises Complementares por Tipo

| Tipo | Cor | Descrição |
|---|---|---|
| `benchmark` | #64748b | Comparação com concorrentes ou médias de mercado |
| `daumau` | #0ea5e9 | Análises de engajamento, stickiness, cohorts |
| `midia` | #f97316 | Paid vs organic, canais de aquisição |
| `cohort` | #8b5cf6 | Análise de cohorts por versão, churn, retenção |
| `sentimento` | #10b981 | NLP, temas, sentimento em reviews |
| `keyword` | #f59e0b | Share of voice, oportunidades, discoverability |
| `sazonal` | #06b6d4 | Padrões históricos e sazonalidade |
| `competitivo` | #ef4444 | Benchmarks competitivos abrangentes |
