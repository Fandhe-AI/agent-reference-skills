# @kubb/plugin-msw

OpenAPI 仕様から operation ごとの型付き MSW（Mock Service Worker）リクエストハンドラーを生成するプラグイン（plugin-msw 5.1.3 の docs に準拠）。

## インストール

```bash
npm install --save-dev @kubb/plugin-msw
npm install msw
```

`@kubb/plugin-ts` が必要。`parser: 'faker'` を使う場合は `@kubb/plugin-faker` と `@faker-js/faker` v10 も必要（既定の `data` parser では不要）。利用側アプリに `msw` v2 を入れる。

## 設定オプション（v5）

`contentType` / `generators` は削除され、`transformers.name` は `resolver` に置き換わった。

| オプション | 型 | デフォルト | 説明 |
|-----------|-----|----------|------|
| `output` | `Output` | `{ path: 'handlers', barrel: { type: 'named' } }` | 出力先（`path` / `mode` / `barrel` / `banner` / `footer`） |
| `group` | `Group` | None | tag / path によるフォルダー分割（`output.mode: 'directory'` 必須） |
| `baseURL` | `string` | None | 各ハンドラーのリクエストに付与するベース URL。省略時はホストを付けず spec の相対パスにマッチ |
| `handlers` | `boolean` | `false` | 全ハンドラーを operation 順に再エクスポートする `handlers.ts` を生成（`setupServer` / `setupWorker` に spread する） |
| `parser` | `'data' \| 'faker'` | `'data'` | レスポンスボディの生成元。`'data'` は渡したデータを返す。`'faker'` は `data` が `undefined` / `null` のとき `@kubb/plugin-faker` の値にフォールバック（`0` / `false` / `''` はそのまま返す） |
| `include` | `Array<Include>` | None | 対象を絞り込む |
| `exclude` | `Array<Exclude>` | `[]` | 対象を除外する |
| `override` | `Array<Override>` | `[]` | パターン単位のオプション上書き |
| `resolver` | `ResolverPatch<ResolverMsw>` | `resolverMsw` | 生成名・ファイルパスのカスタマイズ（`handler.name` / `handler.listName` など） |
| `macros` | `Array<Macro>` | `[]` | 出力前の AST ノード書き換え |

## 設定例

```typescript
import { defineConfig } from 'kubb/config'
import { pluginTs } from '@kubb/plugin-ts'
import { pluginMsw } from '@kubb/plugin-msw'

export default defineConfig({
  input: './petStore.yaml',
  output: { path: './src/gen' },
  plugins: [
    pluginTs(),
    pluginMsw({ output: { path: 'handlers', mode: 'directory' }, handlers: true }),
  ],
})
```

## Notes

- `parser: 'faker'` では成功レスポンススキーマを持つ operation のみモックデータが付く。`pluginFaker()` を併せて登録する
- Migration (v4 → v5): `parser` / `handlers` / `baseURL` は v4 と同じ挙動。生成ハンドラーはリクエストボディとヘッダーに型付けされた `HttpResponseResolver` を使う。共通の resolver・adapter `contentType`・generator オプションの移行を適用する
- 詳細は [msw-mock-api](../plugin-guides/msw-mock-api.md) を参照

## Related

- [@kubb/plugin-faker](./plugin-faker.md)
- [@kubb/plugin-ts](./plugin-ts.md)
