# CV Builder — Nexio

> Générateur de CV statiques **ATS-friendly** — JSON → HTML → PDF  
> Déployé sur **cv.nexio.work**

## Docs

| Doc | Contenu |
|---|---|
| [ARCHITECTURE.md](./docs/ARCHITECTURE.md) | Vue d'ensemble, stack, structure, data flow, ATS features |
| [THEME-ENGINE.md](./docs/THEME-ENGINE.md) | Les 6 thèmes, comment ça marche, comment en ajouter |
| [ADDING-CV.md](./docs/ADDING-CV.md) | Guide pas-à-pas pour créer un nouveau CV |
| [DEPLOYMENT.md](./docs/DEPLOYMENT.md) | CI/CD, Cloudflare Pages, troubleshooting |
| [ROADMAP.md](./docs/ROADMAP.md) | Ce qui est fait, en cours, planifié |

## Démarrage rapide

```bash
npm install --legacy-peer-deps
npm run dev      # http://localhost:4321
npm run build    # → dist/
npm run preview  # preview production
```

## Stack

- **Astro 7** — Static Site Generator, zero JS
- **Tailwind CSS 3** — Styling
- **JSON Resume** — Format de data standard
- **Cloudflare Pages** — Hosting + CI/CD
- **GitHub Actions** — Auto-deploy sur push `main`

## Routes

| Route | Description |
|---|---|
| `/` | Page d'accueil |
| `/mihaja` | CV Mihaja (thème par défaut) |
| `/themes` | Catalogue des 6 thèmes |
| `/mihaja--{theme}` | CV Mihaja en thème spécifique |

## Licence

MIT — FATAPLUS
