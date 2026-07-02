# Theme Engine — CV Builder

> 6 thèmes CSS, activables via `meta.theme` dans le JSON Resume.

## Thèmes disponibles

| ID | Nom | Direction | Couleur accent |
|---|---|---|---|
| `editorial` | Editorial | Serif summary, navy accent, two-column classique | `#1e3a5f` (navy) |
| `minimal` | Minimal | Ultra-clean black & white, aucune décoration | `#111111` |
| `dark` | Dark | Dark mode avec accent violet, moderne | `#a78bfa` (violet) |
| `swiss` | Swiss | International style, rouge accent, uppercase | `#e63329` (rouge) |
| `classic` | Classic | Serif traditionnel, bordeaux, header centré | `#6b1d2e` (bordeaux) |
| `creative` | Creative | Chaud, bold, accent amber, formes géométriques | `#f59e0b` (amber) |

## Comment ça marche

Le thème est déterminé par `data.meta.theme`. Si absent, fallback sur `editorial`.

```ts
// CVTemplate.astro — ligne 15
const theme = meta.theme || 'editorial';
```

```astro
<!-- CVTemplate.astro — ligne 40 -->
<div data-theme={theme} class={`cv-page theme-${theme}`}>
```

Chaque thème est défini par un bloc `.theme-{id}` dans le `<style is:global>` du composant, qui surcharge les tokens de couleur/style de la base partagée.

## Architecture CSS

```
.cv-page (base partagée)
├── layout, structure, spacing
├── fonts, sizes
│
├── .theme-editorial (surcharge couleurs + serif summary)
├── .theme-minimal (surcharge couleurs + font-weight 800)
├── .theme-dark (surcharge fond dark + couleurs claires)
├── .theme-swiss (surcharge uppercase + rouge + grid)
├── .theme-classic (surcharge Georgia serif + centered header)
└── .theme-creative (surcharge amber + bordures + shapes)
```

### Tokens surchargés par thème

Chaque thème redéfinit ~30 propriétés CSS :

| Token | Rôle | Exemple (editorial) |
|---|---|---|
| `.fn` | Couleur prénom | `#1a1a1a` |
| `.ln` | Couleur nom de famille | `#1e3a5f` |
| `.role` | Couleur métier/titre | `#666` |
| `.bt` | Couleur titre de section | `#1e3a5f` |
| `.bt::before` | Décoratif avant titre section | `width: 24px; height: 2px; background: #1e3a5f` |
| `.eo` | Couleur entreprise/école | `#1e3a5f` |
| `.d.on / .d.off` | Couleur dots skill level | navy / `#e0ddd8` |
| `.sheet` | Fond de la page | `#fff` |
| `.toolbar` | Fond barre du haut | `#1a1a1a` |
| `.tag` | Style des tags intérêts | fond clair + bordure |

## Utiliser un thème

### Option 1 : Dans le JSON

```json
{
  "meta": {
    "theme": "swiss"
  }
}
```

La page `/mihaja` utilisera automatiquement ce thème.

### Option 2 : Route dynamique

Accéder à `/mihaja--swiss` force le thème `swiss`, indépendamment du JSON :

```astro
// src/pages/mihaja--[theme].astro
const { theme } = Astro.params;
const data = { ...cvData, meta: { ...cvData.meta, theme } };
```

### Option 3 : Catalogue

La page `/themes` affiche les 6 thèmes side-by-side avec un preview scaled-down (52%).

## Ajouter un nouveau thème

1. **Choisir un ID** : `corporate`, `tech`, `academic`, etc.

2. **Ajouter aux routes dynamiques** :

```ts
// src/pages/mihaja--[theme].astro — getStaticPaths()
const themes = ['editorial', 'minimal', 'dark', 'swiss', 'classic', 'creative', 'corporate'];
//                                                                      ↑ ajouter ici
```

3. **Ajouter au catalogue** :

```ts
// src/pages/themes.astro
const themes = [
  // ... thèmes existants
  { id: 'corporate', name: 'Corporate', desc: 'Bleu corporate, sobre, professionnel', accent: '#0070c5' },
];
```

4. **Écrire le CSS** dans `CVTemplate.astro` :

```css
/* ===== THEME: CORPORATE ===== */
.theme-corporate { color: #1a1a1a; }
.theme-corporate .toolbar { background: #0070c5; color: #fff; }
.theme-corporate .pdf-btn { background: rgba(255,255,255,.12); color: #fff; }
.theme-corporate .sheet { background: #fff; }
.theme-corporate .fn { color: #1a1a1a; }
.theme-corporate .ln { color: #0070c5; }
/* ... (copier depuis un thème existant et adapter les couleurs) */
```

5. **Tester** : `npm run dev` → `/mihaja--corporate`

## Spécificités par thème

### Editorial (par défaut)
- Summary en Georgia italic
- Header avec border-bottom 2px navy
- Dots skill level en navy

### Minimal
- Font-weight 800 pour le nom
- Aucun décoratif sur les bullets (juste un trait fin)
- Tags sans bordure

### Dark
- Fond `#18181b` (zinc-900)
- Texte `#e4e4e7` (zinc-200)
- Accent violet `#a78bfa`
- Tags avec bordure `#3f3f46`

### Swiss
- Tout en uppercase (nom, titres, tags)
- Letterspacing augmenté
- Accent rouge vif `#e63329`
- Border-bottom 3px noir sur le header

### Classic
- Font Georgia partout
- Header centré (flex-direction column)
- Bullets en petits cercles
- Tags en ton crème `#f5f0eb`

### Creative
- Bordure supérieure 6px amber sur `.sheet`
- Gradient décoratif sur le header
- Bullets en diamants (rotation 45deg)
- Tags en amber plein
