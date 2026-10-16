# @kubb/plugin-barrel

Kubb が生成したコードの `index.ts` バレルファイルを書き出すプラグイン。Kubb（`kubb` パッケージ）に標準同梱され、`defineConfig` が自動で `plugins` に追加する（Kubb 5.11.0 の docs に準拠）。

## インストール

別途インストール不要（`kubb` に同梱）。`pluginBarrel()` は引数を取らず、`output.barrel` で設定する。

## 設定オプション

| オプション | 型 | デフォルト | 説明 |
|-----------|-----|----------|------|
| `output.barrel` | `{ type: 'all' \| 'named', nested?: boolean } \| false` | `defineConfig` では `false`、各ジェネレータープラグインの既定 `output` では `{ type: 'named' }` | バレルの再エクスポート方式。`defineConfig` に設定するとルートバレルと全プラグインの既定値になる |
| `output.barrel.type` | `'all' \| 'named'` | `output.barrel` がオブジェクトのとき必須 | `'named'` は名前付き再エクスポート（tree-shaking 向け）、`'all'` は `export *` |
| `output.barrel.nested` | `boolean` | `false` | 各バレルがサブディレクトリのバレルを参照するか。プラグインの `output.barrel` のみ有効（ルートは常にフラット） |

## 設定例

```typescript
import { defineConfig } from 'kubb/config'
import { pluginTs } from '@kubb/plugin-ts'

export default defineConfig({
  input: './petStore.yaml',
  output: { path: './src/gen', barrel: { type: 'named' } },
  plugins: [pluginTs()],
})
```

```typescript
// src/gen/index.ts
export { getUser } from './api/user'
export { getPost, Post } from './api/post'
```

## Notes

- v5 の既定値変更: ルートバレルの既定は `false`（v4 は `'named'`）。`output.barrelType` は `barrel: { type, nested }` に置き換え（`'named'` → `{ type: 'named' }`、`'all'` → `{ type: 'all' }`、プラグインの `'propagate'` → `{ type: 'named', nested: true }`、`false` → `false`）
- プラグインに独自の `output` オブジェクトを渡すと、そのプラグインの既定 `barrel: { type: 'named' }` が置き換えられ、ルート設定にフォールバックする（例: `pluginTs({ output: { path: 'types' } })` は `config.output.barrel` を使う）
- プラグインの `output.barrel: false` はそのバレルを無効にし、ルートバレルからもそのファイルを除外する
- `output.mode: 'file'` のプラグインは自前のバレルを持たず、ルートバレルがそのファイルを直接再エクスポートする
- 同名エクスポートが衝突すると Kubb がエラーを報告し、`named` バレルは最初の 1 つだけを残す
- 旧版の `@beta` タグ配布は不要

## Related

- [@kubb/plugin-axios](./plugin-axios.md)
- [@kubb/plugin-fetch](./plugin-fetch.md)
- [migration-guide](../guides/migration-guide.md)
