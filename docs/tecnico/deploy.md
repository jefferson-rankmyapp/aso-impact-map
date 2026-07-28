# Deploy e Operação — Mapa de Impacto ASO

---

## Infraestrutura

| Recurso | Valor |
|---|---|
| **URL de produção** | https://aso-impact-map.vercel.app |
| **Repositório** | https://github.com/jefferson-rankmyapp/aso-impact-map |
| **Plataforma** | Vercel — projeto `aso-impact-map` |
| **Time Vercel** | `jefferson-rankmyapps-projects` |
| **Branch de produção** | `main` |

---

## CI/CD — Deploy Automático

O Vercel está conectado ao repositório GitHub. Qualquer push na branch `main` dispara um deploy automático de produção.

**Não há etapa de build** — o projeto é HTML estático. O Vercel serve os arquivos diretamente.

### Fluxo de deploy

```
git add .
git commit -m "feat: ..."
git push origin main
# → Vercel detecta o push e faz deploy automático em ~30s
```

### Verificar o status de um deploy

```bash
# Via GitHub
# Acessar: https://github.com/jefferson-rankmyapp/aso-impact-map/actions

# Via Vercel Dashboard
# Acessar: https://vercel.com/jefferson-rankmyapps-projects/aso-impact-map
```

---

## Deploy Manual via CLI

Se necessário fazer deploy sem commit (ex: hotfix urgente):

```bash
# Instalar Vercel CLI
npm i -g vercel

# Fazer login (primeira vez)
VERCEL_TOKEN=<token> npx vercel login

# Deploy de produção
VERCEL_TOKEN=<token> npx vercel deploy --prod --yes
```

O token Vercel está em:
```
/cortex/secrets/users/jeffersonfreitas/vercel-token.env
→ VERCEL_TOKEN_JEFFERSON
```

---

## Desenvolvimento Local

Por ser HTML puro, basta abrir o arquivo no navegador:

```bash
# Opção 1: abrir diretamente
open index.html

# Opção 2: usar um servidor local simples (evita CORS em alguns navegadores)
npx serve .
# ou
python3 -m http.server 3000
# Acesse: http://localhost:3000
```

**Nota sobre analytics em desenvolvimento:** O `mapa.html` chama `https://mi-tool-hub.vercel.app/api/impact-map/track`. Em desenvolvimento local, esse fetch funciona normalmente — os eventos serão registrados no banco de produção. Para evitar poluir os dados, comente temporariamente a linha `track({ eventType: "page_view" })` durante desenvolvimento.

---

## Git Flow

O projeto usa um flow simplificado com branch única:

```
main  ← deploy automático para produção
```

Para alterações com review:

```bash
git checkout -b feat/novo-cenario-produto
# ... editar mapa.html
git commit -m "feat: adicionar cenário 'nova-feature-sem-retorno' à persona Produto"
git push origin feat/novo-cenario-produto
# Abrir PR no GitHub → merge na main → deploy automático
```

### Convenção de commits

Seguir **Conventional Commits**:

| Prefixo | Quando usar |
|---|---|
| `feat:` | Novo cenário, persona, análise, página |
| `fix:` | Correção de bug no grafo, link quebrado, texto errado |
| `docs:` | Atualização de documentação |
| `style:` | Ajustes de CSS, cores, layout |
| `chore:` | Atualização de .gitignore, configs, sem impacto no produto |

---

## Rollback

Se um deploy causar problema:

```bash
# Via Vercel Dashboard
# Acessar: https://vercel.com/jefferson-rankmyapps-projects/aso-impact-map
# → Deployments → Selecionar deploy anterior → "Promote to Production"

# Via Git (reverter o commit e fazer push)
git revert HEAD
git push origin main
```

---

## Variáveis de Ambiente

O projeto **não usa variáveis de ambiente** — é HTML puro sem servidor.

A única URL "configurável" está hardcoded em `mapa.html`:

```javascript
fetch("https://mi-tool-hub.vercel.app/api/impact-map/track", { ... })
```

Se o endpoint de analytics mudar, buscar essa string e atualizar.

---

## Credenciais e Acessos

| Recurso | Onde encontrar |
|---|---|
| Vercel Token (Jefferson) | `/cortex/secrets/users/jeffersonfreitas/vercel-token.env` |
| GitHub PAT (org) | `/cortex/secrets/org/github-evope-agent.env` |
| Dashboard analytics | https://mi-tool-hub.vercel.app/admin/impact-map |
| Login dashboard | jefferson.freitas@rankmyapp.com.br |

**Importante:** Nunca commitar tokens ou credenciais no repositório. O `.gitignore` já exclui arquivos `.env`.

---

## Monitoramento

O projeto não tem monitoramento de uptime configurado. A disponibilidade depende 100% do Vercel (SLA 99.99%).

Para verificar se o site está no ar:

```bash
curl -s -o /dev/null -w "%{http_code}" https://aso-impact-map.vercel.app
# Esperado: 200
```

O analytics funciona como indicador indireto de uso — se o dashboard mostrar `page_view` eventos, o site está sendo acessado com sucesso.
