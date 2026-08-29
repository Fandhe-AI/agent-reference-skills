---
source: https://tanstack.com/router/latest/docs/framework/react/installation/with-vite
---

# Bundler Plugins

Configuration snippets for `@tanstack/router-plugin` across Vite, Rspack/Rsbuild, Webpack, and Esbuild. Install the package first (see `install.md`).

## Vite に設定する（React）

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { tanstackRouter } from '@tanstack/router-plugin/vite'

export default defineConfig({
  plugins: [
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
    }),
    react(),
  ],
})
```

`@tanstack/router-plugin` must be listed **before** `@vitejs/plugin-react` in the `plugins` array. Source: https://tanstack.com/router/latest/docs/framework/react/installation/with-vite

## Vite に設定する（Solid）

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import { tanstackRouter } from '@tanstack/router-plugin/vite'

export default defineConfig({
  plugins: [
    tanstackRouter({ target: 'solid', autoCodeSplitting: true }),
    solid(),
  ],
})
```

## Rspack/Rsbuild に設定する（React）

```ts
// rsbuild.config.ts
import { tanstackRouter } from '@tanstack/router-plugin/rspack'

export default {
  plugins: [
    tanstackRouter({ target: 'react', autoCodeSplitting: true }),
    // ...react plugin
  ],
}
```

Source: https://tanstack.com/router/latest/docs/framework/react/installation/with-rspack

## Webpack に設定する（React）

```ts
// webpack.config.ts
import { tanstackRouter } from '@tanstack/router-plugin/webpack'

export default {
  plugins: [
    tanstackRouter({ target: 'react', autoCodeSplitting: true }),
  ],
}
```

## Webpack に設定する（Solid）

```ts
// webpack.config.ts
import { tanstackRouter } from '@tanstack/router-plugin/webpack'

export default {
  plugins: [
    tanstackRouter({ target: 'solid', autoCodeSplitting: true }),
  ],
}
```

```json
// .babelrc (Solid only — SWC doesn't support solid-js)
{
  "presets": ["babel-preset-solid", "@babel/preset-typescript"]
}
```

Source: https://tanstack.com/router/latest/docs/framework/react/installation/with-webpack

## Esbuild に設定する（React）

```ts
// esbuild.config.js
import { tanstackRouter } from '@tanstack/router-plugin/esbuild'

export default {
  plugins: [
    tanstackRouter({ target: 'react', autoCodeSplitting: true }),
  ],
}
```

## Esbuild に設定する（Solid、watch モード込み）

```ts
// build.js
import * as esbuild from 'esbuild'
import { solidPlugin } from 'esbuild-plugin-solid'
import { tanstackRouter } from '@tanstack/router-plugin/esbuild'

const isDev = process.argv.includes('--dev')
const ctx = await esbuild.context({
  entryPoints: ['src/main.tsx'],
  outfile: 'dist/main.js',
  minify: !isDev,
  bundle: true,
  format: 'esm',
  target: ['esnext'],
  sourcemap: true,
  plugins: [
    solidPlugin(),
    tanstackRouter({ target: 'solid', autoCodeSplitting: true }),
  ],
})

if (isDev) {
  await ctx.watch()
  const { host, port } = await ctx.serve({ servedir: '.', port: 3005 })
} else {
  await ctx.rebuild()
  await ctx.dispose()
}
```

Source: https://tanstack.com/router/latest/docs/framework/react/installation/with-esbuild

## 共通オプション

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| routesDirectory | string | `./src/routes` | Directory containing route files |
| generatedRouteTree | string | `./src/routeTree.gen.ts` | Output path for the generated route tree |
| routeFileIgnorePrefix | string | `-` | Prefix used to exclude files from route generation |
| quoteStyle | string | `single` | Quote style used in generated code |

> **警告**: `generatedRouteTree` に指定したファイル（既定 `src/routeTree.gen.ts`）はビルド・watch のたびにプラグインが上書き生成する。手動編集した内容は次回生成時に失われるため、linter/formatter の対象からも除外すること。
