# Architecture — CV Builder

> Dernière mise à jour : 2 juillet 2026

## Vue d'ensemble

CV Builder est un générateur de CV statiques **ATS-friendly** (Applicant Tracking System). Il transforme des fichiers JSON (format JSON Resume standard) en pages HTML sémantiques, optimisées pour les parsers de recrutement, et exportables en PDF via `window.print()`.

```
┌─────────────┐      ┌──────────────┐      ┌──────────────┐      ┌──────────────┐
│  JSON Data  │─────▶│  Astro SSG   │─────▶│  Static HTML │─────▶│  Cloudflare  │
│  (Resume)   │      │  + Template  │      │  + JSON-LD   │      │    Pages     │
└─────────────┘      └──────────────┘      └──────────────┘      └──────────────┘
                           │                                             │
                    Theme Engine                              cv.nexio.work
                    (6 thèmes)                                   
```

## Principes

| Principe | Détail |
|---|---|
| **Zero JS** | Tout est rendu server-side par Astro. Aucun framework client (React, Vue…). |
| **ATS-friendly** | HTML sémantique (`<h1>`, `<h2>`, `<article>`), JSON-LD Schema.org, texte réel (pas de JS render). |
| **JSON Resume** | Format standard [jsonresume.org](https://jsonresume.org). Chaque CV = un fichier JSON. |
| **Print-ready** | CSS print dédié : A4, marges, pas de page breaks dans les sections, couleurs forcées. |
| **Theme Engine** | 6 thèmes CSS, activables via `meta.theme` dans le JSON. |

## Stack technique

| Technologie | Version | Rôle |
|---|---|---|
| **Astro** | `^7.0.5` | Static Site Generator — rendu server-side |
| **Tailwind CSS 3** | `^3.4.19` | Framework CSS (utilisé principalement pour les pages d'index) |
| **Cloudflare Pages** | — | Hosting + CDN |
| **GitHub Actions** | — | CI/CD — auto-deploy sur push `main` |
| **Node.js** | `22` | Runtime pour le build |

## Structure des fichiers

```
cv-builder/
├── .github/
│   └── workflows/
│       └── deploy.yml              # CI/CD: build → Cloudflare Pages
├── src/
│   ├── components/
│   │   └── CVTemplate.astro        # Moteur de rendu CV + 6 thèmes CSS (429 lignes)
│   ├── cvs/
│   │   └── mihaja.json             # Data CV Mihaja (JSON Resume)
│   ├── layouts/
│   │   └── CVLayout.astro          # Layout HTML de base (head, fonts, meta)
│   ├── pages/
│   │   ├── index.astro             # Page d'accueil — liste des CVs
│   │   ├── mihaja.astro            # CV Mihaja (thème par défaut)
│   │   ├── mihaja--[theme].astro   # Route dynamique: /mihaja--{theme}
│   │   └── themes.astro            # Catalogue — preview des 6 thèmes
│   ├── styles/
│   │   ├── global.css              # Tailwind base
│   │   └── print.css               # Styles print/PDF globaux
│   └── types.ts                    # Types TypeScript (CVProps)
├── astro.config.mjs                # Config Astro (static output)
├── tailwind.config.mjs             # Config Tailwind (couleurs Nexio, fonts)
├── postcss.config.mjs              # Config PostCSS
└── package.json
```

## Routes

| Route | Description |
|---|---|
| `/` | Page d'accueil — liens vers CVs + catalogue |
| `/mihaja` | CV de Mihaja (thème `editorial` par défaut) |
| `/themes` | Catalogue — preview side-by-side des 6 thèmes |
| `/mihaja--editorial` | CV Mihaja en thème Editorial |
| `/mihaja--minimal` | CV Mihaja en thème Minimal |
| `/mihaja--dark` | CV Mihaja en thème Dark |
| `/mihaja--swiss` | CV Mihaja en thème Swiss |
| `/mihaja--classic` | CV Mihaja en thème Classic |
| `/mihaja--creative` | CV Mihaja en thème Creative |

## Data flow

```
                    ┌─────────────────┐
                    │  src/cvs/*.json │
                    │  (JSON Resume)  │
                    └────────┬────────┘
                             │ import
                             ▼
┌──────────────────────────────────────────┐
│           src/pages/*.astro               │
│  - Lit le JSON                           │
│  - Injecte meta.theme si route dynamique │
│  - Passe data au CVTemplate              │
└──────────────────┬───────────────────────┘
                   │ <CVTemplate data={data} />
                   ▼
┌──────────────────────────────────────────┐
│        src/components/CVTemplate.astro    │
│  - Extrait basics, work, education...    │
│  - Rend le HTML sémantique               │
│  - Applique la classe theme-{name}       │
│  - Injecte JSON-LD Schema.org Person     │
│  - Scoped CSS selon data-theme           │
└──────────────────────────────────────────┘
```

## ATS-Friendly Features

### HTML sémantique
- `<h1>` pour le nom complet
- `<h2>` pour les titres de sections (Expérience, Formation, etc.)
- `<h3>` pour les sous-entrées (poste, diplôme)
- `<article>` pour chaque entrée
- `<nav aria-label="Coordonnées">` pour les contacts

### JSON-LD structuré
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "...",
  "email": "...",
  "telephone": "...",
  "jobTitle": "...",
  "description": "...",
  "knowsAbout": [...]
}
```

### Print CSS
- `@page { size: A4; margin: 12mm 14mm }`
- `.toolbar` cachée en print
- `.skd` (dots visuels) remplacés par `.skp` (texte niveau)
- `page-break-inside: avoid` sur les entries
- `print-color-adjust: exact` pour forcer les couleurs

## Pipeline CI/CD

```
push main ──▶ GitHub Actions ──▶ npm ci ──▶ npm run build ──▶ Cloudflare Pages
                              (Node 22)    (Astro build)     (project: cv-nexio)
```

Voir [DEPLOYMENT.md](./DEPLOYMENT.md) pour les détails.
