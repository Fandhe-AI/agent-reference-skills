---
source: https://developers.cloudflare.com/pages/framework-guides/deploy-an-angular-site/, https://developers.cloudflare.com/pages/framework-guides/deploy-an-analog-site/
---

# Angular and Analog

Angular deploys via C3 (first deploy is Direct Upload) or Git integration with output in `dist/cloudflare`. Analog is directed to a Workers guide.

## Signature / Usage

```
npm create cloudflare@latest -- my-angular-app --framework=angular --platform=pages
```

Git integration setup after C3:

```sh
# Skip the following three commands if you have built your application
# using C3 or already committed your changes
git init
git add .
git commit -m "Initial commit"

git branch -M main
git remote add origin https://github.com/<YOUR_GH_USERNAME>/<REPOSITORY_NAME>
git push -u origin main
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Production branch | — | — | `main` |
| Build command | — | — | `npm run build` |
| Build directory | — | — | `dist/cloudflare` |
| Build command (some Angular versions) | — | — | `npx ng build --output-path dist/cloudflare` |
| Build directory (some Angular versions) | — | — | `dist/cloudflare/browser` |

## Notes

- For new projects Cloudflare recommends Workers; see cloudflare-workers framework-guides.
- Analog (fullstack Angular meta-framework on Vite and Nitro): deploy with the Analog Workers guide (https://developers.cloudflare.com/workers/framework-guides/web-apps/more-web-frameworks/analog/). The Analog page has no code or build settings.
- The initial C3 deployment is a Direct Upload deployment. Git integration cannot be added to an existing Pages application; create a new one.
- Optionally set **Project name**; it becomes the `*.pages.dev` subdomain.
- Angular APIs themselves are out of scope for this skill.

## Related

- [overview.md](./overview.md)
- [vue.md](./vue.md)
