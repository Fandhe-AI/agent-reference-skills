---
source: https://vite.dev/guide/static-deploy#surge
---

# Other Static Hosts

Surge, Azure Static Web Apps, Render, Flightcontrol, xmit, Zephyr Cloud, and EdgeOne Pages.

## Signature / Usage

```bash
# Surge
npm i -g surge
npm run build
surge dist
surge dist yourdomain.com   # custom domain
```

## Notes

- Surge: install via `npm i -g surge`, run `npm run build`, deploy with `surge dist`; a custom domain is added with `surge dist yourdomain.com`.
- Azure Static Web Apps: requires an Azure account and subscription key, app code pushed to GitHub, and the SWA Extension in VS Code. In the extension, sign in to Azure and click '+' to create a Static Web App; follow the wizard to name the app, choose a framework preset, and set the app root (usually `/`) and built file location `/dist`. The wizard creates a GitHub action in `.github` that deploys the app.
- Render: Static Site. Create a Render account, click New → Static Site in the Dashboard, connect GitHub/GitLab or use a public repository, set a project name and branch, Build Command `npm install && npm run build`, Publish Directory `dist`, then Create Static Site. The app is deployed at `https://<PROJECTNAME>.onrender.com/`. Each new commit to the branch triggers a deployment by default (Auto-Deploy is configurable); custom domains can be added.
- Flightcontrol: follow https://www.flightcontrol.dev/docs/reference/examples/vite?ref=docs-vite
- xmit Static Site Hosting: follow https://xmit.dev/guides/vite-quickstart/
- Zephyr Cloud: a deployment platform integrated directly into the Vite build process with global edge distribution for module federation and other applications; every build or dev server run is automatically deployed. Steps: https://docs.zephyr-cloud.io/bundlers/vite
- EdgeOne Pages: follow https://pages.edgeone.ai/document/vite
- Listing criteria for new platforms (from the source comment): free deployment, an indefinite free tier, no malicious guide content, and at least 1 year in operation.

## Related

- [Deploying a Static Site](./static-deploy-overview.md)
- [Netlify / Vercel](./deploy-netlify-vercel.md)
