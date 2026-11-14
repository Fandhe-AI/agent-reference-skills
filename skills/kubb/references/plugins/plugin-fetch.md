# @kubb/plugin-fetch

OpenAPI 仕様から type-safe な Fetch API クライアントを生成するプラグイン。operation ごとに 1 つの async 関数を生成する（plugin-fetch 6.0.1 の docs に準拠）。

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
| `baseURL` | `string` | None | 各リクエストに付与するベース URL。省略時は spec の相対パスのみ。path または operation が独自の `servers` を宣言する場合はその URL を使う |
| `throwOnErrorDefault` | `boolean` | `true` | 生成される operation の既定のエラー挙動と戻り値型。`false` で文書化済みエラーレスポンスを値として返す。プラグイン全体に適用され `override` では設定不可 |
| `validator` | `false \| 'zod' \| { request?: 'zod'; params?: 'zod'; response?: 'zod' }` | `false` | Zod によるリクエストボディ・path / query / header / cookie パラメーター・レスポンスのバリデーション。不正な値は `ParseError` を throw |
| `sdk` | `{ mode?: 'tag' \| 'flat'; name?: string }` | None | クラスベース SDK を生成（`mode: 'tag'` が既定でタグ毎、`'flat'` は `sdk.name` の単一クラス） |
| `returnType` | `'full' \| 'data'` | `'full'` | 生成呼び出しの戻り値の形。`'full'` は `{ status, data, error, contentType, headers, request, response }`（`headers` はレスポンスの `Headers`）、`'data'` は `throwOnError: true` のとき成功ボディ |
| `include` | `Array<Include>` | None | マッチする operation のみ生成 |
| `exclude` | `Array<Exclude>` | `[]` | マッチする operation をスキップ |
| `override` | `Array<Override>` | `[]` | パターン別にオプションを上書き |
| `resolver` | `ResolverPatch<ResolverClient>` | `resolverClient` | 生成される名前・ファイルパスのカスタマイズ |
| `macros` | `Array<Macro>` | `[]`（ビルトインのクライアント macro の後に実行） | 出力前に AST ノードを書き換え |

## 設定例

```typescript
import { defineConfig } from 'kubb/config'
import { adapterOas } from '@kubb/adapter-oas'
import { pluginTs } from '@kubb/plugin-ts'
import { pluginFetch } from '@kubb/plugin-fetch'

export default defineConfig({
  input: './petStore.yaml',
  output: { path: './src/gen' },
  adapter: adapterOas({ integerType: 'number' }),
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
- 実行時ファイルが出力ルートの `.kubb/` にコピーされる。クライアントは `.kubb/client.ts` から import する
- 例は adapter に [`integerType: 'number'`](https://kubb.dev/extensions/kubb-labs/adapter-oas/options#integertype) を設定しており、`int64` の id は `number` になる。既定では `bigint` で、呼び出しには `1n` を渡す
- `validator` の `params` は生成された `<operation>PathSchema` / `QuerySchema` / `HeadersSchema` / `CookiesSchema` を通し、schema が返す値を送る（`Date` などの codec パラメーターは wire 形式で送られ、不正なパラメーターはリクエスト前に失敗する）。`auth` が足した値は検証されない。spec が宣言したパラメーターだけが送られ、宣言の無い path / query キーは取り除かれる（宣言するか `params` を外す）。client レベルの `headers` は検証前に呼び出しの `headers` とマージされ、未宣言ヘッダーはそのまま通り、宣言済みヘッダーは大文字小文字を問わず照合される。schema が codec を使う場合は `pluginZod({ inferred: 'codec' })` と組み合わせる
- `sdk` の各クラスは client を読み取り専用の `client` フィールドとして公開する。root クラスの `client` に付けた interceptor は全タグに適用され、タグクラスは既存の client も受け取れる（`new PetClient(api.client)`）。`sdk.name` を設定した root クラスは全タグで 1 つの client を共有する
- Migration (5.x → 6.0): `@kubb/plugin-fetch` 6 runs on the shared client core from `@kubb/plugin-client` (see fetch-migrate-to-v6): `templates/fetch.ts` is gone and `FetchOptions` is now `NativeOptions`, `codecs` is now `mediaTypes`, `toEventStream` is replaced by `client.stream`, `sdk` tag classes are named like `PetClient` instead of `pet`, a `servers` entry on a path or operation becomes that operation's default `baseURL`, and `returnType: 'plain'` is no longer accepted (it stays on `@kubb/plugin-client`) (6.0.0 / 6.0.1 CHANGELOG)
- v5: `pluginClient({ client: 'fetch' })` は `pluginFetch()` に置き換え。旧版の `@beta` タグ配布は不要
- 旧版ページにあった multipart / バイナリ / typed SSE / interceptor / 認証の記述は overview / options に記載がないため削除（詳細は plugin-guides の fetch 系ページを参照）
- Source: https://kubb.dev/extensions/kubb-labs/plugin-fetch/overview と https://kubb.dev/extensions/kubb-labs/plugin-fetch/options（`@kubb/plugin-fetch@6.0.1` の docs、取得日 2026-11-14）

## Related

- [@kubb/plugin-axios](./plugin-axios.md)
- [@kubb/plugin-ts](./plugin-ts.md)
- [@kubb/plugin-zod](./plugin-zod.md)
- [fetch-migrate-to-v6](../plugin-guides/fetch-migrate-to-v6.md)
- [fetch-calling-operations](../plugin-guides/fetch-calling-operations.md) / [fetch-base-url](../plugin-guides/fetch-base-url.md) / [fetch-authentication](../plugin-guides/fetch-authentication.md) / [fetch-error-handling](../plugin-guides/fetch-error-handling.md) / [fetch-interceptors](../plugin-guides/fetch-interceptors.md) / [fetch-serialization](../plugin-guides/fetch-serialization.md) / [fetch-server-sent-events](../plugin-guides/fetch-server-sent-events.md) / [fetch-transport](../plugin-guides/fetch-transport.md)
