# Markdown Reader (Ledger theme)

A static, no-build website that renders every Markdown file in `content/` using the
same book/PDF styling as your `md2pdf` tool, with a sidebar for jumping between
chapters. **A new page only starts at a top-level `#` heading** — `##`/`###`
headings stay on the same page and just appear as in-page sections (with quick
links in the sidebar).

## How it works

- `index.html` — the whole site (fonts, styles, and JS all in one file, same
  Fraunces/Lora/Inter/JetBrains Mono look as the PDF generator).
- `content/manifest.json` — tells the site which `.md` files to load, and in
  what order.
- `content/*.md` — your actual chapters. Two samples are included.

Browsers can't list a folder's contents on their own, so the manifest is what
replaces "reading the whole folder." To add your own book:

1. Drop your `.md` files into `content/`.
2. Edit `content/manifest.json`:
   ```json
   {
     "title": "Your Book Title",
     "subtitle": "Optional subtitle shown under the title",
     "files": ["chapter-1.md", "chapter-2.md", "chapter-3.md"]
   }
   ```
3. Open `index.html` through any static web server (see below) — that's it.
   Each `# Heading` inside each file becomes its own sidebar entry and its own
   "page." `##`/`###` headings inside a chapter are listed as sub-links but
   don't break to a new page.

## Running it

Because the page `fetch()`s your markdown files, it needs to be served over
`http://`, not opened directly as a `file://` path. Any static server works, e.g.:

```bash
npx serve .
# or
python3 -m http.server 8000
```

Then visit the printed local URL. Deploying is the same as any static site —
upload the folder as-is to GitHub Pages, Netlify, Vercel, S3, etc.

## Exporting as a PDF

The "Export PDF" button in the sidebar footer stitches every chapter together
with a forced page break before each top-level heading and opens the browser's
print dialog — pick "Save as PDF" there, exactly like the original converter.

## Customizing

- Book title/subtitle: `content/manifest.json`.
- Colors, fonts, spacing: the `:root` CSS variables and typography rules near
  the top of `index.html` — they're the same tokens as `md2pdf.html`, so
  tweaking one keeps both in sync if you want.
- Sidebar width: `--rail-w` in `:root`.
