# Déploiement — CI/CD

> Pipeline GitHub Actions → Cloudflare Pages

## Vue d'ensemble

```
git push origin main
       │
       ▼
GitHub Actions (.github/workflows/deploy.yml)
       │
       ├── checkout
       ├── setup Node.js 22 + cache npm
       ├── npm ci --legacy-peer-deps
       ├── npm run build (Astro static build)
       └── cloudflare/pages-action → cv.nexio.work
```

## Configuration

### GitHub Secrets requis

| Secret | Description |
|---|---|
| `CLOUDFLARE_API_TOKEN` | Token Cloudflare avec permissions Pages |
| `CLOUDFLARE_ACCOUNT_ID` | Account ID Cloudflare |

Le `GITHUB_TOKEN` est fourni automatiquement par GitHub Actions.

### Cloudflare Pages

| Setting | Value |
|---|---|
| **Project name** | `cv-nexio` |
| **Framework preset** | None (static) |
| **Build command** | `npm run build` |
| **Output directory** | `dist/` |
| **Domain** | `cv.nexio.work` |

## Commandes locales

```bash
# Installation
npm install --legacy-peer-deps

# Dev server
npm run dev          # http://localhost:4321

# Build production
npm run build        # → dist/

# Preview production build
npm run preview      # → http://localhost:4321
```

## Workflow

```bash
# 1. Développement local
npm run dev

# 2. Build de test
npm run build
npm run preview

# 3. Commit & push
git add .
git commit -m "feat: ..."
git push origin main

# 4. Le CI/CD fait le reste
#    → https://github.com/Fataplus/cv-builder/actions (suivi)
#    → https://cv.nexio.work (live)
```

## Troubleshooting

### Build fails

```bash
# Vérifier que le JSON est valide
node -e "JSON.parse(require('fs').readFileSync('src/cvs/mihaja.json', 'utf8')); console.log('JSON OK')"

# Clean install
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

### `--legacy-peer-deps`

Le flag est nécessaire à cause d'un conflit de peer dependencies entre Astro 7 et certaines libs. Sans ce flag, `npm ci` échoue.

### Cloudflare deploy échoue

1. Vérifier que les secrets GitHub sont valides
2. Le token Cloudflare doit avoir les permissions **Cloudflare Pages → Edit**
3. Le project name doit être exactement `cv-nexio`

### Déploiement manuel (fallback)

```bash
npm run build
npx wrangler pages deploy dist --project-name=cv-nexio
```

## Monitoring

- **GitHub Actions** : `https://github.com/Fataplus/cv-builder/actions`
- **Cloudflare Pages** : Dashboard Cloudflare → Pages → cv-nexio
- **Site live** : `https://cv.nexio.work`
