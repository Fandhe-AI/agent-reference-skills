# @kubb/plugin-axios

OpenAPI 仕様から type-safe な Axios クライアントを生成するプラグイン。operation ごとに 1 つの async 関数を生成する（plugin-axios 6.0.1 の docs に準拠）。

## インストール

```bash
npm install --save-dev kubb @kubb/plugin-axios
npm install axios
```

`@kubb/plugin-ts`（または `inferred: true` の `@kubb/plugin-zod`）が必須。`validator` を使う場合は `@kubb/plugin-zod` と `zod` v4 も必要（プラグインが無いと生成が失敗する）。`axios` 1.20 以降の v1 を利用側アプリに入れる。

## 設定オプション

| オプション | 型 | デフォルト | 説明 |
|-----------|-----|----------|------|
| `output` | `Output` | `{ path: 'clients', barrel: { type: 'named' } }` | 生成ファイルの出力先（`path` / `mode` / `barrel` / `banner` / `footer`） |
| `group` | `Group` | None | tag / path 単位でのフォルダ分割（`type` / `name`） |
| `baseURL` | `string` | None | 各リクエストに付与するベース URL。省略時は spec の相対パスのみ（トップレベル server URL へのフォールバックなし）。path または operation が独自の `servers` を宣言する場合はその URL を使う |
| `throwOnErrorDefault` | `boolean` | `true` | 生成される operation の既定のエラー挙動と戻り値型。`false` で文書化済みエラーレスポンスを値として返す。プラグイン全体に適用され `override` では設定不可 |
| `validator` | `false \| 'zod' \| { request?: 'zod'; params?: 'zod'; response?: 'zod' }` | `false` | Zod によるリクエストボディ・path / query / header / cookie パラメーター・レスポンスのバリデーション。不正な値は `ParseError` を throw |
| `sdk` | `{ mode?: 'tag' \| 'flat'; name?: string }` | None | クラスベース SDK を生成（`mode: 'tag'` が既定でタグ毎、`'flat'` は `sdk.name` の単一クラス） |
| `returnType` | `'full' \| 'data'` | `'full'` | 生成呼び出しの戻り値の形。`'full'` は `{ status, data, error, contentType, headers, request, response }`（`headers` はレスポンスの `Headers`）、`'data'` は `throwOnError: true` のとき成功ボディ |
| `include` | `Array<Include>` | None | マッチする operation のみ生成 |
| `exclude` | `Array<Exclude>` | `[]` | マッチする operation をスキップ |
| `override` | `Array<Override>` | `[]` | パターン別にオプションを上書き |
| `resolver` | `ResolverPatch<ResolverClient>` | `resolverClient` | 生成される名前・ファイルパスのカスタマイズ（`className` / `groupName` / `propertyName` など） |
| `macros` | `Array<Macro>` | `[]`（ビルトインのクライアント macro の後に実行） | 出力前に AST ノードを書き換え |

## 設定例

```typescript
import { defineConfig } from 'kubb/config'
import { adapterOas } from '@kubb/adapter-oas'
import { pluginTs } from '@kubb/plugin-ts'
import { pluginAxios } from '@kubb/plugin-axios'

export default defineConfig({
  input: './petStore.yaml',
  output: { path: './src/gen' },
  adapter: adapterOas({ integerType: 'number' }),
  plugins: [
    pluginTs(),
    pluginAxios({ baseURL: 'https://petstore.swagger.io/v2' }),
  ],
})
```

## Notes

- `group` を使う場合、`output.mode` は `'directory'` である必要がある（`'file'` との併用はビルドエラー）
- `baseURL` は `${...}` を含む値をテンプレートリテラルとして出力する（例: `'${process.env.API_URL}'` は実行時に環境変数を読む）。省略時は `client.setConfig({ baseURL })` で実行時に設定できる
- `sdk.mode: 'tag'` は 1 タグ 1 ファイルが必要で、単一ファイル出力では `KUBB_INVALID_PLUGIN_OPTIONS` を throw する。単一ファイルには `mode: 'flat'`
- React/Vue Query・SWR・`@kubb/plugin-mcp` はスタンドアロン関数を呼ぶため、これらを使う場合は `sdk` を未設定にする
- 実行時ファイルが出力ルートの `.kubb/` にコピーされる。クライアントは `.kubb/client.ts` から import する
- 例は adapter に [`integerType: 'number'`](https://kubb.dev/extensions/kubb-labs/adapter-oas/options#integertype) を設定しており、`int64` の id は `number` になる。既定では `bigint` で、呼び出しには `1n` を渡す
- `validator` の `params` は生成された `<operation>PathSchema` / `QuerySchema` / `HeadersSchema` / `CookiesSchema` を通し、schema が返す値を送る（`Date` などの codec パラメーターは wire 形式で送られ、不正なパラメーターはリクエスト前に失敗する）。`auth` が足した値は検証されない。spec が宣言したパラメーターだけが送られ、宣言の無い path / query キーは取り除かれる（宣言するか `params` を外す）。client レベルの `headers` は検証前に呼び出しの `headers` とマージされ、未宣言ヘッダーはそのまま通り、宣言済みヘッダーは大文字小文字を問わず照合される。schema が codec を使う場合は `pluginZod({ inferred: 'codec' })` と組み合わせる
- `sdk` の各クラスは client を読み取り専用の `client` フィールドとして公開する。root クラスの `client` に付けた interceptor は全タグに適用され、タグクラスは既存の client も受け取れる（`new PetClient(api.client)`）。`sdk.name` を設定した root クラスは全タグで 1 つの client を共有する
- Migration (5.x → 6.0): `@kubb/plugin-axios` 6 runs on the shared client core from `@kubb/plugin-client` (see fetch-migrate-to-v6): `templates/fetch.ts` is gone and `FetchOptions` is now `NativeOptions`, `codecs` is now `mediaTypes`, `toEventStream` is replaced by `client.stream`, `sdk` tag classes are named like `PetClient` instead of `pet`, a `servers` entry on a path or operation becomes that operation's default `baseURL`, and `returnType: 'plain'` is no longer accepted (it stays on `@kubb/plugin-client`) (6.0.0 / 6.0.1 CHANGELOG)
- Migration (5.x → 6.0): `@kubb/plugin-axios` 6 runs on the shared client core from `@kubb/plugin-client` (see axios-migrate-to-v6): `templates/axios.ts` is gone and `AxiosOptions` is now `NativeOptions`, `client.interceptors` handlers receive the core objects (native handlers go on `getAxiosInstance().interceptors`), an axios instance is wrapped with `createAxiosTransport`, `validateStatus` / `AxiosTransport` / `InterceptorFn` / `InterceptorChannel` are removed, `sdk` tag classes are named like `PetClient` instead of `pet`, a `servers` entry on a path or operation becomes that operation's default `baseURL`, and `returnType: 'plain'` is no longer accepted (6.0.0 / 6.0.1 CHANGELOG)
- v5: `pluginClient({ client: 'axios' })` は `pluginAxios()` に置き換え（migration-guide.md 参照）。旧版の `@beta` タグ配布は不要
- 詳細ガイドは plugin-guides の axios 系ページ（calling-operations / base-url など）を参照
- Source: https://kubb.dev/extensions/kubb-labs/plugin-axios/overview と https://kubb.dev/extensions/kubb-labs/plugin-axios/options（`@kubb/plugin-axios@6.0.1` の docs、取得日 2026-11-14）

## Related

- [@kubb/plugin-fetch](./plugin-fetch.md)
- [@kubb/plugin-ts](./plugin-ts.md)
- [@kubb/plugin-zod](./plugin-zod.md)
- [axios-migrate-to-v6](../plugin-guides/axios-migrate-to-v6.md)
- [axios-calling-operations](../plugin-guides/axios-calling-operations.md) / [axios-base-url](../plugin-guides/axios-base-url.md) / [axios-authentication](../plugin-guides/axios-authentication.md) / [axios-error-handling](../plugin-guides/axios-error-handling.md) / [axios-interceptors](../plugin-guides/axios-interceptors.md) / [axios-serialization](../plugin-guides/axios-serialization.md) / [axios-server-sent-events](../plugin-guides/axios-server-sent-events.md) / [axios-transport](../plugin-guides/axios-transport.md)
