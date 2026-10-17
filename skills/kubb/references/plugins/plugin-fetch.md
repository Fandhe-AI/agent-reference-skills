# @kubb/plugin-fetch

OpenAPI 仕様から type-safe な Fetch API クライアントを生成するプラグイン。operation ごとに 1 つの async 関数を生成する（plugin-fetch 5.6.5 の docs に準拠）。

## インストール

```bash
npm install --save-dev kubb @kubb/plugin-fetch
```

`@kubb/plugin-ts`（または `inferred: true` の `@kubb/plugin-zod`）が必須。`validator` を使う場合は `@kubb/plugin-zod` と `zod` v4 も必要。HTTP クライアントパッケージは不要で、生成コードはグローバルの `fetch` を呼ぶ。

## 設定オプション

| オプション | 型 | デフォルト | 説明 |
|-----------|-----|----------|------|
| `output` | `Output` | `{ path: 'clients', barrel: { type: 'named' } }` | 生成ファイルの出力先（`path` / `mode` / `barrel` / `banner` / `footer`） |
| `group` | `Group` | None | tag / path 単位でのフォルダ分割（`type` / `name`） |
| `baseURL` | `string` | None | 各リクエストに付与するベース URL。省略時は spec の相対パスのみ |
| `throwOnErrorDefault` | `boolean` | `true` | 生成される operation の既定のエラー挙動と戻り値型。`false` で文書化済みエラーレスポンスを値として返す。プラグイン全体に適用され `override` では設定不可 |
| `validator` | `false \| 'zod' \| { request?: 'zod'; response?: 'zod' }` | `false` | Zod によるリクエスト/レスポンスバリデーション。不正なボディは `ParseError` を throw |
| `sdk` | `{ mode?: 'tag' \| 'flat'; name?: string }` | None | クラスベース SDK を生成（`mode: 'tag'` が既定でタグ毎、`'flat'` は `sdk.name` の単一クラス） |
| `returnType` | `'full' \| 'data'` | `'full'` | 生成呼び出しの戻り値の形。`'full'` は `{ status, data, error, contentType, request, response }`、`'data'` は `throwOnError: true` のとき成功ボディ |
| `include` | `Array<Include>` | None | マッチする operation のみ生成 |
| `exclude` | `Array<Exclude>` | `[]` | マッチする operation をスキップ |
| `override` | `Array<Override>` | `[]` | パターン別にオプションを上書き |
| `resolver` | `ResolverPatch<ResolverClient>` | `resolverClient` | 生成される名前・ファイルパスのカスタマイズ |
| `macros` | `Array<Macro>` | `[]`（ビルトインのクライアント macro の後に実行） | 出力前に AST ノードを書き換え |

## 設定例

```typescript
import { defineConfig } from 'kubb/config'
import { pluginTs } from '@kubb/plugin-ts'
import { pluginFetch } from '@kubb/plugin-fetch'

export default defineConfig({
  input: './petStore.yaml',
  output: { path: './src/gen' },
  plugins: [
    pluginTs(),
    pluginFetch({ baseURL: 'https://petstore.swagger.io/v2' }),
  ],
})
```

## Notes

- `group` を使う場合、`output.mode` は `'directory'` である必要がある（`'file'` との併用はビルドエラー）
- `baseURL` は `${...}` を含む値をテンプレートリテラルとして出力する。省略時は `client.setConfig({ baseURL })` で実行時に設定できる
- `returnType: 'data'` 下で `ETag` などのヘッダーを読むには `throwOnError: false` を渡し `result.response.headers.get('etag')` を使う
- `sdk.mode: 'tag'` は単一ファイル出力で `KUBB_INVALID_PLUGIN_OPTIONS`。単一ファイルには `mode: 'flat'`。クエリ系プラグインと `@kubb/plugin-mcp` を使う場合は `sdk` を未設定にする
- 実行時ファイル（`client.ts` / `serializers.ts` / `standardSchema.ts`）が出力ルートの `.kubb/` にコピーされる
- v5: `pluginClient({ client: 'fetch' })` は `pluginFetch()` に置き換え。旧版の `@beta` タグ配布は不要
- 旧版ページにあった multipart / バイナリ / typed SSE / interceptor / 認証の記述は 5.6.5 の overview / options に記載がないため削除（詳細は plugin-guides の fetch 系ページを参照）

## Related

- [@kubb/plugin-axios](./plugin-axios.md)
- [@kubb/plugin-ts](./plugin-ts.md)
- [@kubb/plugin-zod](./plugin-zod.md)
- [fetch-calling-operations](../plugin-guides/fetch-calling-operations.md) / [fetch-base-url](../plugin-guides/fetch-base-url.md) / [fetch-authentication](../plugin-guides/fetch-authentication.md) / [fetch-error-handling](../plugin-guides/fetch-error-handling.md) / [fetch-interceptors](../plugin-guides/fetch-interceptors.md) / [fetch-serialization](../plugin-guides/fetch-serialization.md) / [fetch-server-sent-events](../plugin-guides/fetch-server-sent-events.md) / [fetch-transport](../plugin-guides/fetch-transport.md)
