# CV Builder — Nexio

ATS-friendly CV builder. JSON → HTML → PDF. Deployed on Cloudflare Pages at **cv.nexio.work**.

## Architecture

- **Astro** — Static site generator, zero JS by default
- **Tailwind CSS 3** — Styling
- **JSON Resume schema** — Standard CV data format ([jsonresume.org](https://jsonresume.org))
- **Print CSS** — PDF export via `window.print()`, optimized for ATS parsers
- **Cloudflare Pages** — Hosting + CI/CD via GitHub Actions

## Adding a new CV

1. Create a JSON file in `src/cvs/{slug}.json` (follow `src/cvs/mihaja.json` as template)
2. Create a page in `src/pages/{slug}.astro` that imports the JSON
3. Add the CV to the list in `src/pages/index.astro`
4. Push to `main` → CI/CD auto-deploys

## ATS-Friendly Features

- **Semantic HTML**: `<h1>` for name, `<h2>` for sections, `<article>` for entries
- **JSON-LD structured data**: Schema.org `Person` type embedded
- **Real text**: No JavaScript-rendered content, all server-side
- **Print CSS**: Clean A4 layout, proper margins, no page breaks inside sections
- **Skill levels as text**: Visible in print/PDF for ATS keyword matching
- **Standard fonts**: Inter (web-safe fallback to system-ui)

## Development

```bash
npm install --legacy-peer-deps
npm run dev      # http://localhost:4321
npm run build    # outputs to dist/
npm run preview  # preview production build
```

## CI/CD

GitHub Actions workflow in `.github/workflows/deploy.yml`:
1. On push to `main` → install → build → deploy to Cloudflare Pages
2. Domain: `cv.nexio.work`

### Required GitHub Secrets
- `CLOUDFLARE_API_TOKEN` — Cloudflare API token with Pages permissions
- `CLOUDFLARE_ACCOUNT_ID` — Cloudflare account ID

## License

MIT — FATAPLUS
