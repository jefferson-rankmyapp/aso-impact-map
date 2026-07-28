# Documentação — Mapa de Impacto ASO

Índice central de toda a documentação do projeto.

---

## Visão Geral Rápida

O **Mapa de Impacto ASO** é uma ferramenta interativa de diagnóstico causal para estrategistas da RankMyApp. Ele conecta dimensões de um app mobile (Performance, Ratings, Reviews, Retenção, Engajamento, Visibilidade, Concorrentes, Aquisição, Churn e Receita) em um grafo de relações causais, guiando o estrategista a identificar a causa raiz de um problema antes de uma call com o cliente.

| Item | Valor |
|---|---|
| **URL de produção** | https://aso-impact-map.vercel.app |
| **Repositório** | https://github.com/jefferson-rankmyapp/aso-impact-map |
| **Stack** | HTML/CSS/JS puro (sem framework) |
| **Deploy** | Vercel (CI/CD automático via push no `main`) |
| **Analytics** | Vercel Postgres via API do mi-tool-hub |
| **Dashboard de métricas** | https://mi-tool-hub.vercel.app/admin/impact-map |

---

## Documentos de Negócio

| Documento | Descrição |
|---|---|
| [Visão Geral](./negocio/visao-geral.md) | Contexto, objetivos, proposta de valor e público-alvo |
| [Personas e Cenários](./negocio/personas-e-cenarios.md) | As 3 personas e os 12 cenários mapeados |
| [Roadmap](./negocio/roadmap.md) | Visão de evolução do produto — próximos passos |

## Documentos Técnicos

| Documento | Descrição |
|---|---|
| [Arquitetura](./tecnico/arquitetura.md) | Estrutura de arquivos, fluxo de dados, dependências |
| [Como Editar Conteúdo](./tecnico/como-editar-conteudo.md) | Guia prático para adicionar personas, cenários e análises |
| [Analytics](./tecnico/analytics.md) | Eventos rastreados, endpoint, schema do banco e dashboard |
| [Deploy e Operação](./tecnico/deploy.md) | Git flow, Vercel, variáveis de ambiente, rollback |

---

## Estrutura de Arquivos

```
aso-impact-map/
├── index.html              ← Landing page com navegação
├── mapa.html               ← Ferramenta principal (mapa interativo)
├── treinamento.html        ← Apresentação para estrategistas (11 slides)
├── treinamento-pdf.html    ← Versão print-ready para exportar PDF
├── .gitignore
└── docs/
    ├── README.md           ← Este arquivo
    ├── negocio/
    │   ├── visao-geral.md
    │   ├── personas-e-cenarios.md
    │   └── roadmap.md
    └── tecnico/
        ├── arquitetura.md
        ├── como-editar-conteudo.md
        ├── analytics.md
        └── deploy.md
```

---

## Contato e Responsáveis

| Papel | Nome |
|---|---|
| **Product Owner** | Jefferson Freitas — jefferson.freitas@rankmyapp.com.br |
| **Repositório** | jefferson-rankmyapp (GitHub) |
| **Plataforma Vercel** | jefferson-rankmyapps-projects |
