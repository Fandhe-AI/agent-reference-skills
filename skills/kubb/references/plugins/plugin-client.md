# @kubb/plugin-client

OpenAPI 仕様の各 operation を、自分で書いた client モジュールを呼ぶ型付き関数へ変換するプラグイン。生成コードは Fetch / axios / Kubb ランタイムに依存しない。

## セットアップ

- 必須の `importPath` に自作 client モジュールを指定する。モジュールはジェネリックな `client` と、`Options` / `RequestResult` 型を export する必要がある。仕様に server-sent event または JSON Lines の operation がある場合は、`client` に `stream` メソッドも必要で、`StreamResult` / `SuccessOf` / `TypedEvent` / `ServerSentEvent` 型も export する
- operation の型として `@kubb/plugin-ts`、または `inferred: true` の `@kubb/plugin-zod` を追加する
- `validator` を設定する場合は `@kubb/plugin-zod` を追加し、`zod` v4 をインストールする（プラグインが無いと生成が失敗する）

各関数は `path` / `query` / `headers` / `cookies` / `body` をグループ化したパラメータを受け取り、operation の認証要件を `security` リストとして client に渡す。個別の呼び出しで `client` を渡せば既定の client を置き換えられる。

## 設定オプション

| Option | Purpose | Default |
|--------|---------|---------|
| `importPath` | 自作 client モジュールの import specifier（`string`） | Required |
| `output` | 出力先: `path` / `mode` / `barrel` / `banner` / `footer` | `{ path: 'clients', barrel: { type: 'named' } }` |
| `group` | tag または path 単位で分割: `type` / `name` | None |
| `throwOnErrorDefault` | client に渡す `throwOnError` の既定値（`boolean`） | `true` |
| `validator` | Zod スキーマを client に渡す（`false \| 'zod' \| { request?: 'zod'; params?: 'zod'; response?: 'zod' }`） | `false` |
| `returnType` | 生成された operation が resolve する値の形（`'plain' \| 'full' \| 'data'`） | `'plain'` |
| `include` | マッチする operation のみ残す | None |
| `exclude` | マッチする operation をスキップ | `[]` |
| `override` | パターン別にオプションを上書き | `[]` |
| `resolver` | 生成される名前・ファイルパスのカスタマイズ | `resolverClient` |
| `macros` | 出力前に AST ノードを書き換え | `[]`（組み込み client マクロの後に実行） |

### importPath

生成される全 import にそのまま書き込まれるため、生成ファイルから解決できる必要がある。相対パス・パッケージ名・エイリアスのいずれも可。

```typescript
pluginClient({ importPath: '../../../client' }) // relative to src/gen/clients/<tag>/
pluginClient({ importPath: '@my-org/api-client' }) // a package
```

`group: { type: 'tag' }` かつ `output.path: 'clients'` の場合、生成ファイルは `src/gen/clients/<tag>/` に置かれるため `../../../client` が `src/client.ts` を指す。`group` なしなら `../../client`。

### throwOnErrorDefault

生成される全関数が client に渡す `throwOnError` フィールドの既定値。呼び出し側で `throwOnError` を指定した場合はそちらが優先される。フラグの意味は client 実装が決める（公式 example client は `true` で非 2xx を throw、`false` でエラーを値として返す）。プラグイン全体の設定のため `override` では設定できない。

### validator

`@kubb/plugin-zod` の Zod スキーマを `config.validator` として client に渡す。プラグイン自身はスキーマを実行せず、client が `config.validator` を読んで実行する。

- `false`: 何も渡さない（既定）
- `'zod'`: response と error のスキーマを渡す
- `{ request?: 'zod', params?: 'zod', response?: 'zod' }`: 方向ごとに opt-in。`request` はリクエストボディの schema、`params` は path / query / header / cookie パラメーターの schema、`response` は response と error の schema を渡す

`validator` を設定する場合は `pluginZod()` を plugins に追加すること（無いとエラーで生成が止まる）。`params: 'zod'` では生成された呼び出しが `importPath` のモジュールから `toHeadersStandardSchema` も import するので、そのモジュールが export する必要がある。

### returnType

生成された operation が resolve する値の形。プラグイン全体の設定のため `override` では設定できない。

- `'plain'`（既定）: `client` が返すものをそのまま返す
- `'full'`: 呼び出しを `withUnwrap` で包み、呼び出し側が `await` するか `.unwrap()` を呼べるようにする。モジュールは `withUnwrap` / `resolveThrowOnError` / `Unwrappable` 型を export する必要がある
- `'data'`: 呼び出しを `unwrapResult` に通して本文へ resolve する。モジュールは `unwrapResult` / `resolveThrowOnError` / `UnwrappedResult` 型を export する必要がある

`@kubb/plugin-client/templates/core.ts` がこれら全てを export するので、モジュールはそこから再 export できる。

```typescript
pluginClient({ importPath: '../../client', returnType: 'full' })
// const pet = await getPetById({ path: { petId: 1 } }).unwrap()
```

## 設定例

```typescript [kubb.config.ts]
import { defineConfig } from 'kubb/config'
import { adapterOas } from '@kubb/adapter-oas'
import { pluginTs } from '@kubb/plugin-ts'
import { pluginClient } from '@kubb/plugin-client'

export default defineConfig({
  input: './petStore.yaml',
  output: { path: './src/gen' },
  adapter: adapterOas({ integerType: 'number' }),
  plugins: [
    pluginTs(),
    pluginClient({
      output: { path: 'clients', mode: 'directory', barrel: { type: 'named' } },
      group: { type: 'tag' },
      // resolved from each generated file: src/gen/clients/<tag>/ to src/client.ts
      importPath: '../../../client',
    }),
  ],
})
```

## Notes

- 既製の client が必要なら `@kubb/plugin-fetch` または `@kubb/plugin-axios` を使う。query 系プラグインと `@kubb/plugin-mcp` も本プラグインと併用でき、その場合 hooks / handlers が自作 client モジュールを呼ぶ
- `include` / `exclude` / `override` / `resolver` / `macros` / `output` / `group` の共通オプション詳細は公式の Shared plugin options を参照
- 例は adapter に [`integerType: 'number'`](https://kubb.dev/extensions/kubb-labs/adapter-oas/options#integertype) を設定しており、`int64` の id は `number` になる。既定では `bigint`
- Migration (5.x → 6.0): a generated function now calls `client<TResponses, ThrowOnError>(config)` and streams through `client.stream` (so `toEventStream` and `EventStreamResult` are no longer exported by your client); `RequestConfig` gains `contentType`, `parseAs`, `eventShape`, `cookies`, and `styles`; `returnType` is new and defaults to `'plain'`; status ranges are written in lower case (`ListPetsStatus4xx`); with `group: { type: 'tag' }` a tag whose OpenAPI 3.2 `parent` is `store` writes to `store/payment/`, so one relative `importPath` cannot serve both depths (pass `group.name` or use a package name or alias) (6.0.0 CHANGELOG; client-migrate-to-v6)
- Source: https://kubb.dev/extensions/kubb-labs/plugin-client/overview と https://kubb.dev/extensions/kubb-labs/plugin-client/options（`@kubb/plugin-client@6.0.1` の docs、取得日 2026-11-14）

## Related

- [@kubb/plugin-fetch](./plugin-fetch.md)
- [@kubb/plugin-axios](./plugin-axios.md)
- [@kubb/plugin-ts](./plugin-ts.md)
- [@kubb/plugin-zod](./plugin-zod.md)
- [client-migrate-to-v6](../plugin-guides/client-migrate-to-v6.md) / [client-write-your-client](../plugin-guides/client-write-your-client.md) / [client-calling-operations](../plugin-guides/client-calling-operations.md) / [client-authentication](../plugin-guides/client-authentication.md) / [client-validate-requests-and-responses](../plugin-guides/client-validate-requests-and-responses.md)
