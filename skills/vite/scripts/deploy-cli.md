---
source: https://vite.dev/guide/static-deploy
---

# Deploy CLI

Host-specific CLI commands from the Static Deploy guide. Assumptions: the output directory is the default `dist`, and `package.json` has `"build": "vite build"` and `"preview": "vite preview"`.

> **Warning**: The commands below include ones that actually deploy (publish to an external service). Check the account and project, and test with a throwaway project. A Netlify deploy with `--prod` goes to production.

## Build and preview locally

```sh
npm run build
npm run preview
```

`vite preview` serves `dist` at `http://localhost:4173`. The port can be changed with `--port`.

## Netlify CLI

```sh
npm install -g netlify-cli
netlify init
netlify deploy
```

A preview URL is issued. To deploy to production, run the following.

```sh
netlify deploy --prod
```

## Vercel CLI

```sh
npm i -g vercel
vercel
```

Vite is detected automatically and deployed with appropriate settings.

## Cloudflare Workers

```sh
npm install --save-dev @cloudflare/vite-plugin
```

Add the `cloudflare()` plugin to `vite.config.js`, set `name` in `wrangler.jsonc`, then build.

```sh
npm run build
npx wrangler deploy
```

For the full config files, see `references/build-deploy/deploy-cloudflare-firebase.md`.

## Google Firebase

```sh
npm i -g firebase-tools
```

In the project root, create `firebase.json` (hosting.public set to `dist`, rewrites `**` to `/index.html`) and `.firebaserc` (the Firebase ID in `projects.default`).

```sh
npm run build
firebase deploy
```

## Surge

```sh
npm i -g surge
npm run build
surge dist
```

To use a custom domain:

```sh
surge dist yourdomain.com
```

## Hosts without CLI commands

GitHub Pages, GitLab Pages, Git integration for Netlify / Vercel / Cloudflare Pages, Azure Static Web Apps, Render, Flightcontrol, xmit, Zephyr Cloud, and EdgeOne Pages are described in the official guide only through config files, dashboard operations, or links to external guides, with no CLI commands, so they are not included in this file. Render's build settings are Build Command `npm install && npm run build` and Publish Directory `dist`.
