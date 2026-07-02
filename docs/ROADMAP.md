# Roadmap — CV Builder

> Ce qui existe, ce qui est en cours, ce qui est planifié.

## ✅ Fait

| Feature | Commit | Date |
|---|---|---|
| MVP ATS-friendly CV builder (Astro + JSON Resume) | `966228c` | 2 jul 2026 |
| CI/CD GitHub Actions → Cloudflare Pages | `c36bf98` | 2 jul 2026 |
| Editorial redesign (resume-modern + frontend-design) | `229d572` | 2 jul 2026 |
| Fix espace prénom/nom | `933bd8b` | 2 jul 2026 |
| Theme engine — 6 thèmes + catalogue | `cdd63aa` | 2 jul 2026 |

## 🔄 En cours

| Feature | Status |
|---|---|
| Documentation complète | 📝 Branche `docs/comprehensive-docs` |
| Annotation/feedback visuel | 💡 Recherche — Agentation ou alternative vanilla |

## 📋 Planifié

### Court terme

| Feature | Priorité | Notes |
|---|---|---|
| **Annotation system** | 🔴 Haute | Click element → note → export markdown. Inspiration: Agentation.com. Option vanilla JS légère (~100 lignes) pour préserver le zero-JS. |
| **Theme customizer** | 🟡 Moyenne | UI pour ajuster accent color, font, spacing en temps réel → génère JSON config. |
| **Plus de CVs** | 🟡 Moyenne | Ajouter d'autres profils (Fefe, etc.) |

### Moyen terme

| Feature | Priorité | Notes |
|---|---|---|
| **i18n** | 🟡 Moyenne | FR/EN switch. Le contenu JSON reste le même, seules les labels changent. |
| **Multi-page CV** | 🟡 Moyenne | Support CV > 1 page A4 avec pagination propre. |
| **Dark/light toggle** | 🟢 Basse | Permettre au visiteur de switcher le thème depuis la toolbar. |
| **Photo de profil** | 🟢 Basse | Optionnel dans le JSON, affichée dans le header (certaines cultures l'attendent). |

### Long terme

| Feature | Priorité | Notes |
|---|---|---|
| **Editor UI** | 🟡 Moyenne | Interface d'édition type Form → JSON → Preview. Admin-only. |
| **API backend** | 🟢 Basse | Permettre la création/édition de CVs via API REST. Passage d'un SSG à un hybrid. |
| **Multi-tenant** | 🟢 Basse | Permettre à d'autres organisations d'utiliser le builder. |
| **Analytics** | 🟢 Basse | Tracking des vues de CV (privacy-friendly). |

## 🧪 Expérimental

| Idée | Status |
|---|---|
| **AI-powered CV optimization** | Suggérer des améliorations de contenu basées sur l'analyse d'offres d'emploi |
| **Cover letter generator** | Générer une lettre de motivation depuis le JSON Resume |
| **LinkedIn import** | Importer un profil LinkedIn → JSON Resume |
| **CV versioning** | Garder l'historique des versions d'un CV |

## Annotation — Analyse Agentation

[Agentation](https://www.agentation.com/) est un outil de feedback visuel pour AI agents :

**Concept :**
- L'utilisateur active la toolbar
- Hover sur les éléments → met en surbrillance
- Click → ouvre un champ annotation
- Export → markdown avec CSS selectors + file paths + feedback
- Paste dans l'AI agent (Claude Code, Cursor…)

**Incompatibilité :**
- Agentation est un composant **React** (`<Agentation />`)
- CV Builder est **Astro pur, zero JS**
- Intégrer Agentation implique : `@astrojs/react` + React + ReactDOM
- Casse le principe ATS-friendly du projet

**Alternatives :**
1. Charger Agentation uniquement en mode dev (import conditionnel)
2. Build vanilla JS léger : même UX, zéro dépendance
3. Script bookmarklet — injecte la toolbar sur n'importe quel env

## Décisions techniques

| Décision | Rationale |
|---|---|
| **Astro sur Next.js** | Zero JS = meilleur ATS parsing + perf maximale |
| **JSON Resume** | Standard ouvert, portable, pas de lock-in |
| **CSS themes (pas Tailwind)** | Les thèmes sont des overrides CSS scoped, pas de config Tailwind à maintenir |
| **Cloudflare Pages** | Gratuit, global CDN, intégration GitHub native |
| **`--legacy-peer-deps`** | Conflit peer deps Astro 7, workaround nécessaire |
