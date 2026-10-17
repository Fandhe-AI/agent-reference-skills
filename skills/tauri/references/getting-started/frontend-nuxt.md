---
source: https://v2.tauri.app/start/frontend/nuxt/
---

# Nuxt

Nuxt is a meta framework for Vue. This guide is accurate as of Nuxt 4.2.

## Signature / Usage

Checklist:

- Use SSG by setting `ssr: false`. Tauri doesn't support server based solutions.
- Use default `../dist` as `frontendDist` in `tauri.conf.json` (a symlink to `.output/public` created by `nuxi generate`).
- Compile using `nuxi generate` (the `generate` script, which `beforeBuildCommand` runs).
- (Optional): Disable telemetry by setting `telemetry: false` in `nuxt.config.ts`.

Tauri configuration (npm; yarn / pnpm / deno use `yarn dev` / `yarn generate`, `pnpm dev` / `pnpm generate`, `deno task dev` / `deno task generate`):

`src-tauri/tauri.conf.json`:

```json
{
  "build": {
    "beforeDevCommand": "npm run dev",
    "beforeBuildCommand": "npm run generate",
    "devUrl": "http://localhost:3000",
    "frontendDist": "../dist"
  }
}
```

Nuxt configuration:

```ts
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  // (optional) Enable the Nuxt devtools
  devtools: { enabled: true },
  // Enable SSG
  ssr: false,
  // Enables the development server to be discoverable by other devices when running on iOS physical devices
  devServer: {
    host: '0',
  },
  vite: {
    // Better support for Tauri CLI output
    clearScreen: false,
    // Enable environment variables
    // Additional environment variables can be found at
    // https://v2.tauri.app/reference/environment-variables/
    envPrefix: ['VITE_', 'TAURI_ENV_'],
    server: {
      // Tauri requires a consistent port
      strictPort: true,
    },
  },
  // Avoids error [unhandledRejection] EMFILE: too many open files, watch
  ignore: ['**/src-tauri/**'],
});
```

## Notes

- `nuxi generate` writes static output to `.output/public` and links `<rootDir>/dist` to it (Nuxt's `linkStaticDist`), so `frontendDist: ../dist` resolves to the generated assets.
- The source checklist says nuxi build, but its config runs the generate script; aligned to nuxi generate for static output. Scripts in package.json: `"dev": "nuxi dev"`, `"generate": "nuxi generate"`.
- The source uses `envPrefix: ['VITE_', 'TAURI_']`; narrowed to `TAURI_ENV_` here (as in the Vite guide) because the `TAURI_` prefix would also expose build-time secrets such as `TAURI_SIGNING_PRIVATE_KEY` / `TAURI_SIGNING_PRIVATE_KEY_PASSWORD` to the client bundle.
- File-name comments are moved out of the JSON block so it stays valid JSON.
- Tauri-side integration settings only; Nuxt itself has no dedicated skill here. Vite: vite skill.

## Related

- [Frontend Configuration](./frontend-configuration.md)
- [Vite](./frontend-vite.md)
