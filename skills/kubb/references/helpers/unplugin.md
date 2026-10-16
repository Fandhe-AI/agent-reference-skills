# unplugin-kubb

Kubb コード生成を複数のビルドツールに統合するユニバーサルプラグイン（unplugin ベース）。Vite、webpack、Rollup、Rolldown、Rspack、esbuild、Farm、Nuxt、Astro に対応（Kubb 5.11.0 の `packages/unplugin-kubb/README.md` と docs 5.x integrations/* に準拠）。`unplugin-kubb` は `kubb` に同梱され、docs は `kubb/<bundler>` から import する。

Kubb generates once, when the first build starts. Watch rebuilds and later builds that share the plugin reuse that output, so restart the build after you change your spec. Vite, Nuxt, and Astro generate during builds only, not in their development servers. A missing `config` or a failed generation fails the build.

## インストール

docs 5.x は `kubb` と必要なプラグインをインストールする（統合は `kubb` に同梱）。

```bash
npm install -D kubb @kubb/plugin-ts typescript
```

パッケージ README は単体の `unplugin-kubb` を案内している。

```bash
npm install -D unplugin-kubb @kubb/core
```

## 設定オプション

### `config`

- **型**: `UserConfig`（`{ config: UserConfig }`）
- **必須**: `true`
- **説明**: Kubb の生成設定（input, output, plugins 等）。共有の `kubb.config.ts` を import して渡す。`config` は単一のオブジェクトで、`defineConfig` が受け付ける配列形式・関数形式は不可

## import パス

| ビルドツール | docs 5.x（`kubb` 同梱） | パッケージ README（単体） |
|-------------|----------------------|---------------------|
| Vite | `kubb/vite` | `unplugin-kubb/vite` |
| webpack | `kubb/webpack` | `unplugin-kubb/webpack` |
| Rollup | `kubb/rollup` | `unplugin-kubb/rollup` |
| Rolldown | `kubb/rolldown` | `unplugin-kubb/rolldown` |
| Rspack | `kubb/rspack` | `unplugin-kubb/rspack` |
| esbuild | `kubb/esbuild` | `unplugin-kubb/esbuild` |
| Farm | `kubb/farm` | `unplugin-kubb/farm` |
| Nuxt（module） | `kubb/nuxt` | `unplugin-kubb/nuxt` |
| Astro | `kubb/astro` | `unplugin-kubb/astro` |

## ビルドツール別の統合例

### Vite

```typescript
// vite.config.ts
import kubb from 'kubb/vite'
import { defineConfig } from 'vite'
import config from './kubb.config'

export default defineConfig({
  plugins: [kubb({ config })],
})
```

### Rollup / Rolldown

```typescript
// rollup.config.ts（Rolldown は 'kubb/rolldown' と defineConfig from 'rolldown'）
import kubb from 'kubb/rollup'
import config from './kubb.config'

export default {
  input: 'src/index.ts',
  plugins: [kubb({ config })],
}
```

### webpack / Rspack

```typescript
// webpack.config.ts（Rspack は 'kubb/rspack'）
import kubb from 'kubb/webpack'
import config from './kubb.config'

export default {
  plugins: [kubb({ config })],
}
```

### esbuild

```typescript
import { build } from 'esbuild'
import kubb from 'kubb/esbuild'
import config from './kubb.config'

await build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  outfile: 'dist/bundle.js',
  plugins: [kubb({ config })],
})
```

### Farm

```typescript
// farm.config.ts
import { defineConfig } from '@farmfe/core'
import kubb from 'kubb/farm'
import config from './kubb.config'

export default defineConfig({
  plugins: [kubb({ config })],
})
```

### Nuxt

Vite・webpack・Rspack の各ビルダーで動作する。

```typescript
// nuxt.config.ts
import config from './kubb.config'

export default defineNuxtConfig({
  modules: [['kubb/nuxt', { config }]],
})
```

### Astro

```typescript
// astro.config.mjs
import { defineConfig } from 'astro/config'
import kubb from 'kubb/astro'
import config from './kubb.config'

export default defineConfig({
  integrations: [kubb({ config })],
})
```

### Vue CLI

```javascript
// vue.config.js
const kubb = require('unplugin-kubb/webpack')

module.exports = {
  configureWebpack: {
    plugins: [kubb({ config: { /* ...UserConfig */ } })],
  },
}
```

## Notes

- Vite / Nuxt / Astro の統合は**ビルド時のみ**生成する。開発サーバーを起動する前に `kubb generate` を実行する
- Bundler integrations apply fewer defaults than the CLI: no Markdown parser, no reporters, and no `output.postGenerate` commands. それらが必要なら CLI を使う（Prettier / ESLint など生成後の処理も CLI で行う）
- 旧版の `hook` オプションは unplugin では動作しない制限事項の記述だった。5.x では上記のとおり `output.postGenerate` が bundler 統合で適用されない
- Vue CLI の節は 5.11.0 の README と docs 5.x のどちらにも記載がない（旧版ページ由来で残している）。Vue CLI は webpack ベースのため `webpack` 統合と同じ書き方になる想定
- Rolldown と Farm は v5 で追加された統合
- v5 では config は `kubb/config` の `defineConfig`、`input` は直接指定（`input: { path }` は `KUBB_LEGACY_INPUT`）

## Related

- [cli.md](./cli.md)
- [../getting-started/installation.md](../getting-started/installation.md)
