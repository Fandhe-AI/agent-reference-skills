# unplugin-kubb

Kubb コード生成を複数のビルドツールに統合するユニバーサルプラグイン（unplugin ベース）。Vite、webpack、Rollup、Rolldown、Rspack、esbuild、Farm、Nuxt、Astro に対応（kubb@5.20.0 の `packages/unplugin-kubb/README.md` と docs 5.x integrations/* に準拠）。`unplugin-kubb` は `kubb` に同梱され、docs は `kubb/<bundler>` から import する。

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
import config from './kubb.config.ts'

export default defineConfig({
  plugins: [kubb({ config })],
})
```

### Rollup / Rolldown

```typescript
// rollup.config.ts（Rolldown は 'kubb/rolldown' と defineConfig from 'rolldown'）
import kubb from 'kubb/rollup'
import config from './kubb.config.ts'

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
import config from './kubb.config.ts'

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
- バンドラー連携は `defineConfig` と同じ既定値を適用し、ビルド中に `output.format` / `output.lint` / `output.postGenerate` を実行する。サマリーは表示するが `json` / `file` / `html` reporter は実行しない（それらのレポートが必要なら CLI を使う）。`config` を省略すると連携は CLI と同様に `kubb.config.ts` を読み込み、`*.openapi.yaml` の import も使える（overview の "Import a spec" と integrations の openapi-import ページを参照）
- Migration (5.11 → 5.20): the 5.11.0 docs said bundler integrations apply fewer defaults than the CLI and run no `output.postGenerate`; the 5.20.0 docs state the opposite as above. The changelog records `unplugin-kubb` honoring `output.format`, `output.lint` and `output.postGenerate` (#4196) and applying the `defineConfig` defaults with a printed summary (5.9.4, #4293); it also records `kubb()` without a `config` option loading `kubb.config.ts` (5.12.6, #4402). Official bundler pages now import the config as `./kubb.config.ts` for Vite / Rollup / Rolldown / esbuild; the webpack / Rspack / Farm / Nuxt / Astro pages still say `./kubb.config` (kept verbatim)
- Source: https://kubb.dev/docs/5.x/integrations/overview （kubb@5.20.0 の docs/5.x/integrations/overview.md と各ビルドツールページ、取得日 2026-11-14）
- Vue CLI の節は 5.20.0 の README と docs 5.x のどちらにも記載がない（旧版ページ由来で残している）。Vue CLI は webpack ベースのため `webpack` 統合と同じ書き方になる想定
- Rolldown と Farm は v5 で追加された統合
- v5 では config は `kubb/config` の `defineConfig`、`input` は直接指定（`input: { path }` は `KUBB_LEGACY_INPUT`）

## Related

- [cli.md](./cli.md)
- [../getting-started/installation.md](../getting-started/installation.md)
