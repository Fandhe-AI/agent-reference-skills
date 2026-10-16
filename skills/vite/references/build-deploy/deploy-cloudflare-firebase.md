---
source: https://vite.dev/guide/static-deploy#cloudflare
---

# Cloudflare / Google Firebase

Deploy to Cloudflare Workers (via the Cloudflare Vite plugin) or Cloudflare Pages, or to Google Firebase Hosting.

## Signature / Usage

Cloudflare Workers:

```bash
$ npm install --save-dev @cloudflare/vite-plugin
```

```js
// vite.config.js
import { cloudflare } from '@cloudflare/vite-plugin'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [cloudflare()],
})
```

```jsonc
// wrangler.jsonc
{
  "name": "my-vite-app",
}
```

After `npm run build`, deploy with `npx wrangler deploy`.

Google Firebase `firebase.json`:

```json
{
  "hosting": {
    "public": "dist",
    "ignore": [],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

`.firebaserc`:

```js
{
  "projects": {
    "default": "<YOUR_FIREBASE_ID>"
  }
}
```

## Notes

- The Cloudflare Vite plugin (https://developers.cloudflare.com/workers/vite-plugin/) integrates with Cloudflare Workers and uses Vite's Environment API to run server-side code in the Workers runtime during development. Backend APIs can be added to the Vite app and deploy alongside the frontend; see https://developers.cloudflare.com/workers/vite-plugin/tutorial/.
- Cloudflare Pages with Git (no Wrangler file needed): push to GitHub / GitLab; in the Cloudflare dashboard go to Account Home > Workers & Pages; select Create a new Project, the Pages option, then Git; select the project and click Begin setup; choose the matching framework preset (or enter your build command and output directory); save and deploy. The app is available at `https://<PROJECTNAME>.pages.dev/`. Pushes to branches generate Preview Deployments unless disabled in branch build controls; Production Branch changes result in a Production Deployment.
- Firebase: install via `npm i -g firebase-tools`, create `firebase.json` and `.firebaserc` at the project root, run `npm run build`, then deploy with `firebase deploy`.
- Environment API here refers to Vite's `DevEnvironment` / `ModuleRunner` API (see the environment-api category), not any other product's "environments".

## Related

- [Deploying a Static Site](./static-deploy-overview.md)
- [Other Static Hosts](./deploy-other-hosts.md)
