---
source: https://developers.cloudflare.com/pages/framework-guides/deploy-anything/
---

# Static HTML (deploy anything)

Deploy any static site, or a framework with no guide, by choosing your own build command and output directory.

## Signature / Usage

```sh
git init
git remote add origin https://github.com/<your-gh-username>/<repository-name>
git add .
git commit -m "Initial commit"
git branch -M main
git push -u origin main
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Production branch | — | — | `main` |
| Build command (optional) | — | — | `exit 0` when no build is needed |
| Build output directory | — | — | `<YOUR_BUILD_DIR>`; where your application's content lives |

## Notes

- For new projects Cloudflare recommends Workers; see cloudflare-workers framework-guides.
- Cloudflare recommends `exit 0` as the build command when you do not need a build, to access features such as Pages Functions.
- Getting 404 errors on `*.pages.dev`: make sure the site has a top-level `index.html`, which Pages serves on the apex with no page specified.
- Pages gives each project a `*.pages.dev` subdomain, rebuilds on commits, and creates preview deployments for pull requests.

## Related

- [overview.md](./overview.md)
- [nextjs.md](./nextjs.md)
