# plugin-client: Validate requests and responses

`@kubb/plugin-client` 自体は検証しない。`validator` を設定すると schema を自前 client に渡し、client が実行する。

## Signature / Usage

Adapted (not in the official docs): `importPath` is `'../../client'` instead of the official `'../../../client'`, which resolves to `src/client.ts` only with `group: { type: 'tag' }`

```typescript
// kubb.config.ts
import { defineConfig } from 'kubb/config'
import { pluginTs } from '@kubb/plugin-ts'
import { pluginZod } from '@kubb/plugin-zod'
import { pluginClient } from '@kubb/plugin-client'

export default defineConfig({
  input: './petStore.yaml',
  output: { path: './src/gen' },
  plugins: [
    pluginTs(),
    pluginZod(),
    pluginClient({ importPath: '../../client', validator: 'zod' }),
  ],
})
```

生成される各呼び出しに schema が含まれる:

```typescript
apiClient<AddPetResponses, ThrowOnError>({
  method: 'POST',
  url: '/pet',
  ...config,
  validator: { response: addPetResponseSchema, error: { 405: addPetStatus405Schema }, ...config.validator },
})
```

1 呼び出しに渡した `validator` はキーごとにマージされるので、`validator: { request }` は生成済みの response schema を保ったまま request schema を加える。呼び出し単位の `error` は生成された error マップ全体を置き換える。

`RequestConfig` に `validator` フィールドを追加し、`client` 内で schema を実行する。Zod schema は [Standard Schema](https://standardschema.dev) に従うため、互換ライブラリなら `~standard.validate` が使える:

```typescript
// src/client.ts
type Result = { value: unknown; issues?: undefined } | { issues: ReadonlyArray<unknown> }
type Schema = { '~standard': { validate: (value: unknown) => Result | Promise<Result> } }

export type RequestConfig = {
  // ...
  validator?: { request?: Schema; response?: Schema; error?: Schema | Record<string, Schema> }
}

// inside client(), after reading the body
const result = await config.validator?.response?.['~standard'].validate(body)
if (result && 'issues' in result && result.issues) throw new Error('Response validation failed')
const validatedBody = result && 'value' in result ? result.value : body
```

`error` は `{ 404: schema, '5xx': schema, default: schema }` のように status をキーにする。正確な status、次にその range、次に `default` を選び、どれにも一致しなければ検証をスキップする。

`validator: { params: 'zod' }` では、各呼び出しが path / query / header / cookie パラメーターの schema も渡す:

```typescript
apiClient<PutEventResponses, ThrowOnError>({
  method: 'PUT',
  url: '/events/{day}',
  ...config,
  validator: {
    path: putEventPathSchema,
    query: putEventQuerySchema,
    headers: toHeadersStandardSchema(putEventHeadersSchema, putEventHeadersSchema.shape),
    ...config.validator,
  },
})
```

`RequestConfig` の `validator` フィールドに `path` / `query` / `headers` / `cookies` を追加する。URL とヘッダーを組み立てる前に `config.path` / `config.query` / `config.headers` / `config.cookies` に対して実行し、返された値を送る。

## Notes

- `validatedBody` を `data` として返すと、値を変換する schema が有効になる。response schema がなければ `validatedBody` は元の `body`
- `validator: { request: 'zod' }` / `{ params: 'zod' }` / `{ response: 'zod' }` で片方向のみ渡せる
- path と query の schema は spec が宣言しないキーを取り除くため、宣言済みのパラメーターだけが送られる。`Authorization` など client 自身が足すヘッダーは宣言されていないため、headers schema は未宣言キーを通す
- 生成された呼び出しは `importPath` のモジュールから `toHeadersStandardSchema` を import するので、そのモジュールが export する必要がある（さもないと生成コードはコンパイルできない）。`toHeadersStandardSchema` は Standard Schema とオブジェクトの宣言済みキーを受け取り、宣言済みヘッダーを大文字小文字を問わず照合し、未宣言ヘッダーを通す Standard Schema を返す。`@kubb/plugin-fetch` が生成する `.kubb/standardSchema.ts` からコピーする。schema をそのまま返すだけでは足りない（plain object schema は `Authorization` などの未宣言ヘッダーを取り除く）
- Migration (5.x → 6.0): the generated `validator` now carries `error` as a map keyed by status (`{ 405: addPetStatus405Schema }`) instead of a single schema, and is spread before `...config.validator` so a per-call `validator` merges per key; `validator: { params: 'zod' }` is new (6.0.0 CHANGELOG: "Check an error body against the schema of its own status with a `validator.error` map")
- plugin 一覧に `pluginZod()` がないと、生成はエラーで停止する
- `importPath` was changed from the upstream guide: the upstream snippet omits `group` but points one directory higher, which assumes `group: { type: 'tag' }` (output in `src/gen/clients/<tag>/`). Without `group`, files go to `src/gen/clients/`, so `../../client` resolves to `src/client.ts` (see plugins/plugin-client.md)
- Source: https://kubb.dev/extensions/kubb-labs/plugin-client/guides/validate-requests-and-responses （`@kubb/plugin-client@6.0.1`、取得日 2026-11-14）

## Related

- [client-write-your-client](./client-write-your-client.md)
- [client-calling-operations](./client-calling-operations.md)
- [fetch-serialization](./fetch-serialization.md)
- [client-migrate-to-v6](./client-migrate-to-v6.md)
