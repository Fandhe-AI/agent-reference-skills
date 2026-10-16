# Storybook for Next.js with Vite

`@storybook/nextjs-vite` is the recommended Storybook framework for Next.js applications. It uses Vite for faster builds and supports Storybook Testing (Vitest addon).

## Signature / Usage

```bash
npm create storybook@latest
# Manual install
npm install --save-dev @storybook/nextjs-vite
```

```ts
// .storybook/main.ts
import type { StorybookConfig } from '@storybook/nextjs-vite';

const config: StorybookConfig = {
  // ...
  framework: '@storybook/nextjs-vite',
};

export default config;
```

Per-story router override (parameters under the `nextjs` namespace):

```ts
export const Example: Story = {
  parameters: {
    nextjs: {
      router: {
        pathname: '/profile/[id]',
        asPath: '/profile/1',
        query: { id: '1' },
      },
    },
  },
};
```

## Options / Props

Framework options (`framework.options`):

| Name | Type | Description |
|------|------|-------------|
| `builder` | `Record<string, any>` | Options for the framework's builder (Vite builder docs). |
| `image` | `object` | Props passed to every instance of `next/image`. |
| `nextConfigPath` | `string` | Absolute path to `next.config.js` when it is not in the project root. |

Parameters (`nextjs` namespace):

| Name | Type | Description |
|------|------|-------------|
| `appDirectory` | `boolean` (default `false`) | Set `true` for stories whose components use `next/navigation`. |
| `navigation` | `{ asPath?: string; pathname?: string; query?: Record<string, string>; segments?: (string \| [string, string])[] }` | Router object passed to the `next/navigation` context. `segments` defaults to `[]`. |
| `router` | `{ asPath?: string; pathname?: string; query?: Record<string, string> }` | Router object passed to the `next/router` context. |

Exported mock modules: `@storybook/nextjs-vite/cache.mock`, `@storybook/nextjs-vite/headers.mock`, `@storybook/nextjs-vite/navigation.mock`, `@storybook/nextjs-vite/router.mock` (the last two also export `getRouter`).

## Notes

- Requirements: Next.js ≥ 14.1, Vite ≥ 5.
- Storybook auto-selects `nextjs-vite` unless the project has custom Webpack or Babel configuration, in which case it asks which framework to install. Choose `@storybook/nextjs` (Webpack 5) to keep existing Webpack/Babel setup.
- Supported: `next/image` (local and remote), `next/font/google` and `next/font/local` (no `staticDirs` mapping needed with this framework; `fallback` / `adjustFontFallback` unsupported, `preload` / `display` ignored), stubbed `next/router` and `next/navigation` (interactions logged to the Actions panel), `next/head`, Sass/CSS Modules/styled-jsx/Tailwind/PostCSS, absolute imports, module aliases, subpath imports, runtime config (`publicRuntimeConfig` only), TypeScript `baseUrl`/`paths`.
- Use `next/router` only in the `pages` directory and `next/navigation` only in the `app` directory.
- Absolute imports cannot be mocked in stories/tests.
- React Server Components are experimental; enable with `features: { experimentalRSC: true }` in `.storybook/main.js|ts`. The story is wrapped in Suspense; opt out per level with the `react.rsc` parameter. Server Actions are not yet supported.
- Custom Vite config goes in `viteFinal`; `webpackFinal` must be migrated to `viteFinal`. Direct `.md` imports need Vite's `?raw` suffix.
- Migrating from `@storybook/nextjs`: `npx storybook automigrate nextjs-to-nextjs-vite` (updates `package.json`, `.storybook/main.js|ts`, and import statements).
- Pages that fetch data in server components can crash the Vite build; extract the pure component into a separate file and import that in stories.
- Static image imports return an object (`src`, `height`, `width`, `blurDataURL`), as in Next.js. If you see the avif / `sharp` error, install `sharp`.
- Source: https://storybook.js.org/docs/get-started/frameworks/nextjs-vite (Storybook v10.6.2 docs)

## Related

- [nextjs](./nextjs.md)
- [react-vite](./react-vite.md)
