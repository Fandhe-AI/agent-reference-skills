---
source: https://developers.cloudflare.com/workers/vite-plugin/get-started/
---

# Vite Plugin

Develop, build, preview, and deploy a Worker with the Cloudflare Vite plugin. Details: see [../references/vite-plugin/README.md](../references/vite-plugin/README.md).

## Install the dependencies

```sh
npm i -D vite @cloudflare/vite-plugin wrangler
```

## package.json scripts

```json
{
	"scripts": {
		"dev": "vite dev",
		"build": "vite build",
		"preview": "npm run build && vite preview",
		"deploy": "npm run build && wrangler deploy"
	}
}
```

Include `"type": "module"` in `package.json`.

## Start the Vite dev server

```sh
npx vite dev
```

Or `npm run dev`. Press `t + Enter` to start or close a tunnel.

## Build, preview, and deploy

```sh
npm run build
npm run preview
npm run deploy
```

## Select a Cloudflare environment

```sh
CLOUDFLARE_ENV=staging vite dev
CLOUDFLARE_ENV=production vite build
```

The environment is applied at dev and build time. Setting `CLOUDFLARE_ENV` for `vite preview` or `wrangler deploy` has no effect; use `CLOUDFLARE_ENV=some-env vite build` instead of `wrangler deploy --env some-env`.

## Select an environment with a Vite mode

```sh
CLOUDFLARE_ENV=staging
```

Put this line in `.env.staging` (and `CLOUDFLARE_ENV=production` in `.env.production`), then:

```sh
vite build --mode staging
```

## Local secrets

```sh
CLOUDFLARE_ENV=staging vite dev
```

Loads `.dev.vars.staging` if it exists, otherwise `.dev.vars`. `vite build` copies the relevant `.dev.vars` to the output directory for `vite preview` only; it is not deployed.

## Debug with Chrome DevTools

```sh
npx vite dev
```

Open the `/__debug` route to get a DevTools tab for each Worker. The inspector listens on port `9229` by default (`inspectorPort` option). VS Code `launch.json` setup: see [../references/vite-plugin/debugging.md](../references/vite-plugin/debugging.md).

## Local data

Wrangler and the Vite plugin share the `.wrangler/state` folder by default. To change the Vite plugin location, set `persistState: { path: "./my-custom-directory" }` in `cloudflare({ ... })`.
