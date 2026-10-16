# plugin-client: Validate requests and responses

`@kubb/plugin-client` 自体は検証しない。`validator` を設定すると schema を自前 client に渡し、client が実行する。

## Signature / Usage

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
request({
  method: 'POST',
  url: '/pet',
  validator: { response: addPetResponseSchema, error: addPetErrorSchema },
  ...config,
})
```

`RequestConfig` に `validator` フィールドを追加し、`client` 内で schema を実行する。Zod schema は [Standard Schema](https://standardschema.dev) に従うため、互換ライブラリなら `~standard.validate` が使える:

```typescript
// src/client.ts
type Result = { value: unknown; issues?: undefined } | { issues: ReadonlyArray<unknown> }
type Schema = { '~standard': { validate: (value: unknown) => Result | Promise<Result> } }

export type RequestConfig = {
  // ...
  validator?: { request?: Schema; response?: Schema; error?: Schema }
}

// inside client(), after reading the body
const result = await config.validator?.response?.['~standard'].validate(body)
if (result && 'issues' in result && result.issues) throw new Error('Response validation failed')
const validatedBody = result && 'value' in result ? result.value : body
```

## Notes

- `validatedBody` を `data` として返すと、値を変換する schema が有効になる。response schema がなければ `validatedBody` は元の `body`
- `validator: { request: 'zod' }` または `{ response: 'zod' }` で片方向のみ渡せる
- plugin 一覧に `pluginZod()` がないと、生成はエラーで停止する
- `importPath` was changed from the upstream guide: the upstream snippet omits `group` but points one directory higher, which assumes `group: { type: 'tag' }` (output in `src/gen/clients/<tag>/`). Without `group`, files go to `src/gen/clients/`, so `../../client` resolves to `src/client.ts` (see plugins/plugin-client.md)
- Source: https://kubb.dev/extensions/kubb-labs/plugin-client/guides/validate-requests-and-responses （`@kubb/plugin-client@5.5.15`）

## Related

- [client-write-your-client](./client-write-your-client.md)
- [client-calling-operations](./client-calling-operations.md)
- [fetch-serialization](./fetch-serialization.md)
