---
source: https://v2.tauri.app/start/frontend/sveltekit/
---

# SvelteKit

SvelteKit is a meta framework for Svelte. This guide is accurate as of SvelteKit 2.20.4 / Svelte 5.25.8.

## Signature / Usage

Checklist:

- Use SSG and SPA via `static-adapter`. Tauri doesn't support server-based solutions.
- If using SSG **with prerendering**, `load` functions will not have access to tauri APIs during the build process. Using SPA mode (without prerendering) is recommended since the load functions only run in the webview with access to tauri APIs.
- Use `build/` as `frontendDist` in `tauri.conf.json`.

1. Install `@sveltejs/adapter-static`:

```sh
npm install --save-dev @sveltejs/adapter-static
# yarn add -D @sveltejs/adapter-static
# pnpm add -D @sveltejs/adapter-static
# deno add -D npm:@sveltejs/adapter-static
```

2. Update Tauri configuration (npm; others use the matching `dev` / `build` commands):

```json
// tauri.conf.json
{
  "build": {
    "beforeDevCommand": "npm run dev",
    "beforeBuildCommand": "npm run build",
    "devUrl": "http://localhost:5173",
    "frontendDist": "../build"
  }
}
```

3. Update SvelteKit configuration `svelte.config.js`:

```js
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://svelte.dev/docs/kit/integrations#preprocessors
  // for more information about preprocessors
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter({
      fallback: 'index.html',
    }),
  },
};

export default config;
```

4. Disable SSR by adding a root `+layout.ts` (or `+layout.js`):

```ts
// src/routes/+layout.ts
export const ssr = false;
```

## Notes

- `static-adapter` doesn't require disabling SSR for the whole app, but doing so makes it possible to use APIs that depend on the global window object (like Tauri's API) without client-side checks.
- If you prefer Static Site Generation (SSG) over SPA mode, change the adapter configuration and `+layout.ts` according to the SvelteKit adapter-static docs.
- Tauri-side integration settings only; Svelte/SvelteKit itself has no dedicated skill here. Vite: vite skill.

## Related

- [Frontend Configuration](./frontend-configuration.md)
