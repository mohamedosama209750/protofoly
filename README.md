# Mohamed Osama — Portfolio

A single-page personal portfolio built with plain HTML, CSS, and JavaScript. No frameworks, no build step, no dependencies.

## Structure

```
protofoly/
├── index.html          # all content and markup
├── css/styles.css      # design tokens, layout, responsive rules
├── js/main.js          # theme, reveals, nav spy
├── assets/
│   ├── avatar.jpg      # portrait (640×640)
│   ├── focus-timer.jpg # project preview (785×574)
│   ├── iphone.jpg      # project preview (800×574)
│   ├── favicon.svg     # monogram favicon
│   └── resume.pdf      # downloadable résumé
├── robots.txt          # crawler permissions
└── .gitignore
```

## Run locally

Open `index.html` directly, or serve the folder so relative paths behave exactly like production:

```bash
npx serve .
# or
python -m http.server 4173
```

Then visit `http://localhost:3000` (serve) or `http://localhost:4173` (Python).

## Edit content

- **Text, projects, links, phone:** `index.html`.
- **Colors, type, spacing, breakpoints:** the `:root` variables at the top of `css/styles.css`.
- **Avatar / previews / résumé:** replace the files in `assets/` and keep the same filenames.
- **Theme:** the toggle stores the choice in `localStorage` (`mo-theme`). The inline script in `index.html` applies it before first paint. Keep the key in sync if you rename it.

Palette is limited to `#000000`, `#14213d`, `#fca311`, `#e5e5e5`, `#ffffff`.

## Deploy

The site is fully static, so any static host works:

- **GitHub Pages:** push to `main`, then Settings → Pages → Deploy from branch → `main` / root.
- **Vercel / Netlify / Cloudflare Pages:** import the repository, leave the build command empty, and set the output directory to `.`.

All asset paths are relative, so the site works from a project subpath (for example `https://user.github.io/protofoly/`) without configuration.

## Notes

- External fonts load from Google Fonts with a system-font fallback.
- Every external link uses `rel="noreferrer noopener"` and opens in a new tab.
- Motion respects `prefers-reduced-motion`.
- No analytics, cookies, or server code.
