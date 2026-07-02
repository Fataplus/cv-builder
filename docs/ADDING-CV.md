# Ajouter un CV — Guide complet

> Comment créer un nouveau CV dans le builder.

## Étapes

### 1. Créer le fichier JSON

Créer `src/cvs/{slug}.json` en suivant le format JSON Resume.

Exemple minimal — `src/cvs/jane.json` :

```json
{
  "$schema": "https://jsonresume.org/schema/v1.0.0",
  "basics": {
    "name": "Jane Doe",
    "label": "Software Engineer",
    "email": "jane@example.com",
    "phone": "+33 6 12 34 56 78",
    "location": {
      "city": "Paris",
      "countryCode": "FR"
    },
    "summary": "Développeuse full-stack avec 5 ans d'expérience..."
  },
  "work": [
    {
      "name": "Acme Corp",
      "position": "Senior Engineer",
      "startDate": "2022-01-01",
      "endDate": null,
      "highlights": [
        "Migration de l'infrastructure vers Kubernetes",
        "Réduction du temps de build de 60%"
      ]
    }
  ],
  "education": [
    {
      "institution": "EPITECH",
      "area": "Informatique",
      "studyType": "Master",
      "startDate": "2014-01-01",
      "endDate": "2019-01-01"
    }
  ],
  "skills": [
    {
      "name": "JavaScript",
      "level": "Expert",
      "keywords": ["React", "Node.js", "TypeScript"]
    }
  ],
  "languages": [
    { "language": "Français", "fluency": "Courant" },
    { "language": "Anglais", "fluency": "Avancé" }
  ],
  "interests": [
    { "name": "Rock climbing" },
    { "name": "Photographie" }
  ],
  "meta": {
    "slug": "jane",
    "theme": "editorial"
  }
}
```

### 2. Créer la page Astro

Créer `src/pages/{slug}.astro` :

```astro
---
import CVLayout from '../layouts/CVLayout.astro';
import CVTemplate from '../components/CVTemplate.astro';
import cvData from '../cvs/jane.json';

const data = cvData;
const basics = data.basics;
---

<CVLayout title={`${basics.name} — CV`} description={basics.summary}>
  <CVTemplate data={data} />
</CVLayout>
```

### 3. Ajouter à l'index

Ajouter le CV dans la liste sur `src/pages/index.astro` :

```astro
const cvs = [
  { slug: 'mihaja', name: 'Andriamihaja RABARINJATOVO', title: 'Mécanicien Motoriste', theme: 'editorial' },
  { slug: 'jane', name: 'Jane Doe', title: 'Software Engineer', theme: 'editorial' },
  //                                                                    ↑ ajouter ici
];
```

### 4. (Optionnel) Ajouter aux routes thématiques

Si le CV doit être disponible en multiple thèmes, créer `src/pages/{slug}--[theme].astro` :

```astro
---
import CVLayout from '../layouts/CVLayout.astro';
import CVTemplate from '../components/CVTemplate.astro';
import cvData from '../cvs/jane.json';

export function getStaticPaths() {
  const themes = ['editorial', 'minimal', 'dark', 'swiss', 'classic', 'creative'];
  return themes.map((theme) => ({ params: { theme } }));
}

const { theme } = Astro.params;
const data = { ...cvData, meta: { ...cvData.meta, theme } };
const basics = data.basics;
---

<CVLayout title={`${basics.name} — CV (${theme})`} description={basics.summary}>
  <CVTemplate data={data} />
</CVLayout>
```

### 5. Push

```bash
git add .
git commit -m "feat: add CV for {name}"
git push origin main
```

Le CI/CD déploie automatiquement sur `cv.nexio.work`.

## JSON Resume Schema — Référence

### `basics`

| Champ | Type | Requis | Description |
|---|---|---|---|
| `name` | string | ✅ | Nom complet |
| `label` | string | ✅ | Métier/titre |
| `email` | string | ✅ | Email |
| `phone` | string | ✅ | Téléphone |
| `location.city` | string | ✅ | Ville |
| `location.countryCode` | string | ✅ | Code pays (MG, FR…) |
| `summary` | string | recommandé | Paragraphe de présentation |

### `work[]`

| Champ | Type | Description |
|---|---|---|
| `name` | string | Entreprise |
| `position` | string | Poste |
| `startDate` | string (ISO) | `2024-03-01` |
| `endDate` | string\|null | `null` = présent |
| `highlights[]` | string[] | Points clés (bullets) |

### `education[]`

| Champ | Type | Description |
|---|---|---|
| `institution` | string | École |
| `area` | string | Domaine |
| `studyType` | string | Type (Bac, Master…) |
| `startDate` | string (ISO) | — |
| `endDate` | string\|null | `null` = en cours |
| `courses[]` | string[] | Matières |

### `skills[]`

| Champ | Type | Niveaux acceptés |
|---|---|---|
| `name` | string | Nom compétence |
| `level` | string | `Notions`, `Débutant`, `Intermédiaire`, `Avancé`, `Expert` |
| `keywords[]` | string[] | Tags associés |

Le `level` est mappé sur 4 dots :

| Level | Dots |
|---|---|
| Notions / Débutant | ●○○○ |
| Intermédiaire | ●●○○ |
| Avancé | ●●●○ |
| Expert | ●●●● |

### `languages[]`

| Champ | Type |
|---|---|
| `language` | string |
| `fluency` | string |

### `interests[]`

| Champ | Type |
|---|---|
| `name` | string |

### `meta` (extension Nexio)

Champs custom au-delà du standard JSON Resume :

| Champ | Type | Description |
|---|---|---|
| `slug` | string | URL slug |
| `theme` | string | ID du thème (`editorial`, `minimal`, etc.) |
| `permit` | string | Permis de conduire |
| `certificates[]` | string[] | Certifications |
| `objective` | string | Objectif professionnel |
