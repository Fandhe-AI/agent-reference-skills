---
source: https://v2.tauri.app/start/frontend/nextjs/
---

# Next.js

Next.js is a meta framework for React. This guide is accurate as of Next.js 14.2.3.

## Signature / Usage

Checklist:

- Use static exports by setting `output: 'export'`. Tauri doesn't support server-based solutions.
- Use the `out` directory as `frontendDist` in `tauri.conf.json`.

Tauri configuration (npm; yarn / pnpm / deno use `yarn dev` / `pnpm dev` / `deno task dev` and the matching `build` command):

```json
// src-tauri/tauri.conf.json
{
  "build": {
    "beforeDevCommand": "npm run dev",
    "beforeBuildCommand": "npm run build",
    "devUrl": "http://localhost:3000",
    "frontendDist": "../out"
  }
}
```

Next.js configuration:

```ts
// next.config.mjs
const isProd = process.env.NODE_ENV === 'production';

const internalHost = process.env.TAURI_DEV_HOST || 'localhost';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ensure Next.js uses SSG instead of SSR
  // https://nextjs.org/docs/pages/building-your-application/deploying/static-exports
  output: 'export',
  // Note: This feature is required to use the Next.js Image component in SSG mode.
  // See https://nextjs.org/docs/messages/export-image-api for different workarounds.
  images: {
    unoptimized: true,
  },
  // Configure assetPrefix or else the server won't properly resolve your assets.
  assetPrefix: isProd ? undefined : `http://${internalHost}:3000`,
};

export default nextConfig;
```

`package.json` scripts:

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "tauri": "tauri"
}
```

## Notes

- Tauri-side integration settings only; the framework itself is covered by the nextjs-app skill (Vite: vite, TanStack Start: tanstack-start).

## Related

- [Frontend Configuration](./frontend-configuration.md)
