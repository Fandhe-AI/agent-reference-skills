# @kubb/plugin-swr

OpenAPI 仕様から SWR hooks（クエリごとの `useSWR`、ミューテーションごとの `useSWRMutation`）を生成するプラグイン（plugin-swr 5.9.1 の docs に準拠）。

## インストール

```bash
npm install --save-dev @kubb/plugin-swr
npm install swr
```

HTTP クライアントは同梱されない。`@kubb/plugin-ts`（または codec 型を使う場合は `pluginZod({ inferred: 'codec' })`）とクライアントプラグイン（`@kubb/plugin-fetch` / `@kubb/plugin-axios` / `@kubb/plugin-client`）が必要で、クライアント側で `sdk` を未設定にする。`swr` 2.2 以降の v2 を利用側アプリに入れる。バリデーションはクライアントプラグイン側で設定する。

## 設定オプション（v5）

`parser` / `paramsType` / `pathParamsType` / `paramsCasing` は削除され、`transformers.name` は `resolver` に置き換わった。

| オプション | 型 | デフォルト | 説明 |
|-----------|-----|----------|------|
| `output` | `Output` | `{ path: 'hooks', barrel: { type: 'named' } }` | 出力先（`path` / `mode` / `barrel` / `banner` / `footer`） |
| `group` | `Group` | None | tag / path によるフォルダー分割 |
| `client` | `'fetch' \| 'axios' \| 'client'` | 自動検出 | hooks が呼ぶ登録済みクライアントプラグイン。複数登録時に指定。`'client'` は `@kubb/plugin-client`（クライアントモジュールが `RequestConfig` / `ResponseErrorConfig` 型も export する必要あり） |
| `returnType` | `'full' \| 'data'` | `'data'` | hooks が resolve する値の形。`'full'` はクライアントの `RequestResult` 全体（`{ status, data, error, contentType, headers, request, response }`）を返し status・レスポンスヘッダーを読める。クライアントプラグイン側の `returnType` が `'full'` か `'plain'` である必要があり、クライアントが `'data'` だと生成時にエラーで止まる |
| `query` | `Partial<Query> \| false` | `{ methods: ['GET', 'QUERY'], importPath: 'swr' }` | `useSWR` hooks の設定・無効化。`methods` を上書きする場合 `'QUERY'` を残さないと QUERY operation がスキップされる。`importPath` は `import useSWR from '${importPath}'` として出力 |
| `queryKey` | `(props: { node, casing, variant }) => Array<unknown>` | export 済み `queryKeyTransformer` | 各クエリ hook の SWR キー構築（`variant: 'query'`）。文字列は `JSON.stringify(...)` で包む |
| `mutation` | `Partial<Mutation> \| false` | `{ methods: ['POST', 'PUT', 'PATCH', 'DELETE'], importPath: 'swr/mutation' }` | `useSWRMutation` hooks の設定・無効化 |
| `mutationKey` | `(props: { node, casing, variant }) => Array<unknown>` | export 済み `mutationKeyTransformer` | 各ミューテーション hook の SWR キー構築（`variant: 'mutation'`） |
| `include` | `Array<Include>` | None | 対象を絞り込む |
| `exclude` | `Array<Exclude>` | `[]` | 対象を除外する |
| `override` | `Array<Override>` | `[]` | パターン単位のオプション上書き |
| `resolver` | `ResolverPatch<ResolverSwr>` | `resolverSwr` | 生成名・ファイルパスのカスタマイズ（旧 `transformers.name`） |
| `macros` | `Array<Macro>` | `[]` | 出力前の AST ノード書き換え |

## 設定例

```typescript
import { defineConfig } from 'kubb/config'
import { pluginTs } from '@kubb/plugin-ts'
import { pluginFetch } from '@kubb/plugin-fetch'
import { pluginSwr } from '@kubb/plugin-swr'

export default defineConfig({
  input: './petStore.yaml',
  output: { path: './src/gen' },
  plugins: [pluginTs(), pluginFetch(), pluginSwr()],
})
```

## Notes

- `useSWRInfinite` hooks は生成されない
- Migration (v4 → v5): 同じクライアントセレクター・grouped パラメーター・クライアント側バリデーションを使う。`mutation.paramsToTrigger` は削除され、ミューテーションのパラメーターは常に `trigger()` 経由で渡す（例: `useUpdatePet().trigger({ path: { petId }, body: pet })`）
- Migration (v4 → v5): パラメーター有無のガードは削除され、リクエストのキーは `shouldFetch` で決まる。`false` にするとリクエストを無効化
- Migration (5.4 → 5.9): `returnType` was added in 5.8.0 (default `'data'` keeps the previous output); `resolver.query.clientName` and `resolver.mutation.typeName` were removed in 5.7.0 (delete them from a custom `resolver`); the default `queryKeyTransformer` / `mutationKeyTransformer` are exported since 5.4.4 (spread `queryKeyTransformer(props)` to extend the default key); `inferred: 'direction'` was renamed `inferred: 'codec'` in 5.5.1
- Migration (5.4 → 5.9): 5.9.0 removes `throwOnError` from the hooks' `client` option, nests a tag group in the folders of its OpenAPI 3.2 `parent` tags (`group.name` keeps one folder per tag) and writes a status range in lower case (`'2XX'` becomes `'2xx'`). Hooks are skipped for `text/event-stream` and JSON Lines operations. Node.js 22.22 or newer is required since 5.5.0
- Source: https://kubb.dev/extensions/kubb-labs/plugin-swr/options （`@kubb/plugin-swr@5.9.1`、取得日 2026-11-14）、overview も同じ版
- 呼び出し方は [swr-calling-operations](../plugin-guides/swr-calling-operations.md) を参照

## Related

- [@kubb/plugin-react-query](./plugin-react-query.md)
- [@kubb/plugin-axios](./plugin-axios.md)
- [@kubb/plugin-fetch](./plugin-fetch.md)
