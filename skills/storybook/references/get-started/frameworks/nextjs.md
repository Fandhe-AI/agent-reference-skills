# Storybook for Next.js (Webpack)

`@storybook/nextjs` is the Webpack 5 based Storybook framework for Next.js applications.

## Signature / Usage

```bash
npm install --save-dev @storybook/nextjs
```

```ts
// .storybook/main.ts
import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  // ...
  framework: '@storybook/nextjs',
};

export default config;
```

Jest portable stories alias helper:

```ts
import { getPackageAliases } from '@storybook/nextjs/export-mocks';

const config: Config = {
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    ...getPackageAliases(), // 👈 Add the utility as mapped module names
  },
};
```

## Options / Props

Framework options (`framework.options`):

| Name | Type | Description |
|------|------|-------------|
| `builder` | `Record<string, any>` | Options for the framework's builder (Webpack builder docs). |
| `nextConfigPath` | `string` | Absolute path to `next.config.js` when it is not in the project root. |

Parameters (`nextjs` namespace):

| Name | Type | Description |
|------|------|-------------|
| `image` | `object` | Props passed to every instance of `next/image`. |
| `appDirectory` | `boolean` (default `false`) | Set `true` for stories whose components use `next/navigation`. |
| `navigation` | `{ asPath?: string; pathname?: string; query?: Record<string, string>; segments?: (string \| [string, string])[] }` | Router object for the `next/navigation` context. `segments` defaults to `[]`. |
| `router` | `{ asPath?: string; pathname?: string; query?: Record<string, string> }` | Router object for the `next/router` context. |

Exported modules: `@storybook/nextjs/export-mocks` (`getPackageAliases({ useESM? })`), `@storybook/nextjs/cache.mock`, `@storybook/nextjs/headers.mock`, `@storybook/nextjs/navigation.mock`, `@storybook/nextjs/router.mock`.

## Notes

- Requirements: Next.js ≥ 14.1, Webpack 5.
- The docs recommend `@storybook/nextjs-vite` for most projects. Use this framework only for incompatible custom Webpack/Babel configuration or Webpack-only features. The `create` command prompts you to choose between the two.
- For local fonts (`next/font/local`) you must map the fonts directory via `staticDirs` (`from` relative to `.storybook`, `to` relative to Storybook's execution context). `next/font/google` works out of the box. `fallback` / `adjustFontFallback` are unsupported; `preload` / `display` are ignored.
- Custom Webpack modifications go in `webpackFinal` in `.storybook/main.js|ts` (docs show SVGR as an example).
- Router and navigation are stubbed; interactions log to the Actions panel. Use `next/router` in `pages` only and `next/navigation` in `app` only.
- RSC support is experimental via `features: { experimentalRSC: true }`.
- Yarn v2/v3 users may hit `Can't resolve 'css-loader'` / `'style-loader'`; install those packages directly.
- Manual install: install the framework, change `framework` in `.storybook/main.js|ts`, and remove Next.js integration plugins that are no longer necessary.
- Pages fetching data in server components can break the Webpack build; extract the pure component, or polyfill in `webpackFinal`.
- Migrating to Vite: see the `nextjs-vite` page (`npx storybook automigrate nextjs-to-nextjs-vite`).
- Source: https://storybook.js.org/docs/get-started/frameworks/nextjs (Storybook v10.6.2 docs)

## Related

- [nextjs-vite](./nextjs-vite.md)
