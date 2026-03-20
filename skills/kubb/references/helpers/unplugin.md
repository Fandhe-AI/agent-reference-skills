# unplugin-kubb

Kubb コード生成を複数のビルドツールに統合するユニバーサルプラグイン。
Vite、webpack、Rollup、esbuild、Nuxt、Astro、Rspack に対応。

## インストール

```bash
bun add -d unplugin-kubb @kubb/core
pnpm add -D unplugin-kubb @kubb/core
npm install --save-dev unplugin-kubb @kubb/core
yarn add -D unplugin-kubb @kubb/core
```

## 設定オプション

### `config`

- **型**: `UserConfig`
- **必須**: `true`
- **説明**: Kubb の生成設定（input, output, plugins 等）

## ビルドツール別の統合例

### Vite

```typescript
// vite.config.ts
import kubb from 'unplugin-kubb/vite'

export default defineConfig({
  plugins: [
    kubb({
      config: {
        root: '.',
        input: { path: './petStore.yaml' },
        output: { path: './src/gen' },
        plugins: [/* ... */],
      },
    }),
  ],
})
```

### Rollup

```typescript
// rollup.config.js
import kubb from 'unplugin-kubb/rollup'

export default {
  plugins: [
    kubb({
      config: {
        // ...UserConfig
      },
    }),
  ],
}
```

### webpack

```javascript
// webpack.config.js
const kubb = require('unplugin-kubb/webpack')

module.exports = {
  plugins: [
    kubb({
      config: {
        // ...UserConfig
      },
    }),
  ],
}
```

### Rspack

```javascript
// rspack.config.js
const kubb = require('unplugin-kubb/rspack')

module.exports = {
  plugins: [
    kubb({
      config: {
        // ...UserConfig
      },
    }),
  ],
}
```

### esbuild

```typescript
import { build } from 'esbuild'
import kubb from 'unplugin-kubb/esbuild'

build({
  plugins: [
    kubb({
      config: {
        // ...UserConfig
      },
    }),
  ],
})
```

### Vue CLI

```javascript
// vue.config.js
const kubb = require('unplugin-kubb/webpack')

module.exports = {
  configureWebpack: {
    plugins: [
      kubb({
        config: {
          // ...UserConfig
        },
      }),
    ],
  },
}
```

### Nuxt

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    ['unplugin-kubb/nuxt', {
      config: {
        // ...UserConfig
      },
    }],
  ],
})
```

### Astro

```typescript
// astro.config.mjs
import kubb from 'unplugin-kubb/astro'

export default defineConfig({
  integrations: [
    kubb({
      config: {
        // ...UserConfig
      },
    }),
  ],
})
```

## 制限事項

- `hook` オプションは unplugin では動作しない。生成後に Prettier や ESLint を実行する必要がある場合は、Kubb CLI を使用すること。
