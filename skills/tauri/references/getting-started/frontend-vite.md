---
source: https://v2.tauri.app/start/frontend/vite/
---

# Vite

Vite is a build tool that aims to provide a faster and leaner development experience for modern web projects. This guide is accurate as of Vite 8.

## Signature / Usage

Checklist:

- Use `../dist` as `frontendDist` in `src-tauri/tauri.conf.json`.
- Use `process.env.TAURI_DEV_HOST` as the development server host IP when set to run on iOS physical devices.

Assuming these `package.json` scripts:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "tauri": "tauri"
  }
}
```

Tauri configuration (npm; for yarn / pnpm replace the commands with `yarn dev` / `yarn build` / `pnpm dev` / `pnpm build`, for deno with `deno task dev` / `deno task build`):

`src-tauri/tauri.conf.json`:

```json
{
  "build": {
    "beforeDevCommand": "npm run dev",
    "beforeBuildCommand": "npm run build",
    "devUrl": "http://localhost:5173",
    "frontendDist": "../dist"
  }
}
```

Vite configuration `vite.config.js`:

```js
import { defineConfig } from 'vite';

const host = process.env.TAURI_DEV_HOST;

export default defineConfig({
  // prevent vite from obscuring rust errors
  clearScreen: false,
  server: {
    // make sure this port matches the devUrl port in tauri.conf.json file
    port: 5173,
    // Tauri expects a fixed port, fail if that port is not available
    strictPort: true,
    // if the host Tauri is expecting is set, use it
    host: host || false,
    hmr: host
      ? {
          protocol: 'ws',
          host,
          port: 1421,
        }
      : undefined,

    watch: {
      // tell vite to ignore watching `src-tauri`
      ignored: ['**/src-tauri/**'],
    },
  },
  // Env variables starting with the item of `envPrefix` will be exposed in tauri's source code through `import.meta.env`.
  envPrefix: ['VITE_', 'TAURI_ENV_'],
  build: {
    // Tauri uses Chromium on Windows and WebKit on macOS and Linux
    target:
      process.env.TAURI_ENV_PLATFORM == 'windows'
        ? 'chrome105'
        : 'safari13',
    // don't minify for debug builds
    minify: !process.env.TAURI_ENV_DEBUG,
    // produce sourcemaps for debug builds
    sourcemap: !!process.env.TAURI_ENV_DEBUG,
  },
});
```

## Notes

- File-name comments are moved out of the JSON block so it stays valid JSON.
- The source uses `'TAURI_ENV_*'`; Vite's envPrefix is a plain prefix match, so the wildcard is dropped.
- Tauri-side integration settings only; Vite itself is covered by the vite skill (Next.js: nextjs-app, TanStack Start: tanstack-start).
- The page recommends Vite as the default choice for SPA frameworks.

## Related

- [Frontend Configuration](./frontend-configuration.md)
- [Create a Project](./create-project.md)
