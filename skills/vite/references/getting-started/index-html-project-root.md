---
source: https://vite.dev/guide/#index-html-and-project-root
---

# index.html and Project Root

`index.html` is the entry point and part of the module graph; the project root is the directory files are served from.

## Signature / Usage

```bash
vite serve some/sub/dir
```

Default npm scripts in a scaffolded project:

```json
{
  "scripts": {
    "dev": "vite", // start dev server, aliases: `vite dev`, `vite serve`
    "build": "vite build", // build for production
    "preview": "vite preview" // locally preview production build
  }
}
```

## Notes

- `index.html` sits at the project root rather than inside `public`: during development Vite is a server and `index.html` is the entry point.
- Vite treats `index.html` as source code. It resolves `<script type="module" src="...">`; inline `<script type="module">` and CSS referenced via `<link href>` also get Vite-specific features. URLs inside `index.html` are rebased automatically, so no `%PUBLIC_URL%` placeholders are needed.
- The root is referenced as `<root>` in the docs. Absolute URLs in source code resolve using the project root as base. Dependencies resolving to out-of-root file system locations are handled, so monorepos work.
- Running `vite` uses the current working directory as root. Use `vite serve some/sub/dir` for an alternative root; the config file (`vite.config.js`) is resolved inside the project root, so move it if the root changes.
- Multi-page apps with multiple `.html` entry points are supported.
- Additional CLI options such as `--port` or `--open` can be passed; run `npx vite --help` for the full list.

## Related

- [cli-dev.md](./cli-dev.md)
- [scaffolding.md](./scaffolding.md)
