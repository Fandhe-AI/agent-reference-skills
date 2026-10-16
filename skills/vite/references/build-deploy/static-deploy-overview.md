---
source: https://vite.dev/guide/static-deploy
---

# Deploying a Static Site

Shared assumptions for the static deployment guides, plus building the app and testing it locally with `vite preview`.

## Signature / Usage

```json
{
  "scripts": {
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

```bash
$ npm run build
$ npm run preview
```

Change the preview port:

```json
{
  "scripts": {
    "preview": "vite preview --port 8080"
  }
}
```

## Notes

- Assumptions: the default build output location (`dist`, changeable via `build.outDir`); npm (use equivalent commands for Yarn or other package managers); Vite installed as a local dev dependency with the `build` / `preview` scripts above.
- `vite preview` is intended for previewing the build locally and is not meant as a production server.
- `vite preview` boots a local static web server serving `dist` at `http://localhost:4173`. `--port` changes it (the example above serves at `http://localhost:8080`).
- By default the build output is placed at `dist`; deploy this folder to any preferred platform.
- These guides cover static deployment only. For SSR (running the same app in Node.js, pre-rendering to HTML, hydrating on the client) see the ssr category; for traditional server-side frameworks see backend-integration.md.

## Related

- [GitHub Pages / GitLab Pages](./deploy-github-gitlab.md)
- [Netlify / Vercel](./deploy-netlify-vercel.md)
- [Cloudflare / Google Firebase](./deploy-cloudflare-firebase.md)
- [Other Static Hosts](./deploy-other-hosts.md)
- [Backend Integration](./backend-integration.md)
