# plugin-fetch: Error handling

生成クライアントの失敗を扱う。`ResponseError` を catch する、`throwOnError` でエラー結果の返却に切り替える、ネットワーク失敗と 4xx / 5xx を区別する。

## Signature / Usage

生成クライアントは既定で非 2xx に `ResponseError` を投げる:

```typescript
import { getPetById } from './gen/clients/getPetById'
import { ResponseError } from './gen/.kubb/client'

try {
  const { data } = await getPetById({ path: { petId: 1 } })
  console.info(data.name)
} catch (error) {
  if (ResponseError.is(error)) {
    console.error(error.status) // 404
    console.error(error.data) // the parsed error body
  }
}
```

```typescript
class ResponseError extends Error {
  static is(error: unknown): error is ResponseError<unknown, unknown, unknown>
  data: TError // the parsed error body
  status: number
  statusText: string
  contentType: string | undefined
  request: Request
  response: Response
}
```

### Return the error instead

`throwOnError: false` を渡すと、文書化された全 status で resolve する。結果は判別共用体（成功は `data`、失敗は `error`）。空のエラーボディでは `error` が空 / undefined になり得るため `status` で分岐する。

```typescript
const result = await getPetById({ path: { petId: 1 }, throwOnError: false })

if (result.status === 200) {
  console.info(result.data.name)
}
if (result.status !== 200) {
  console.error(result.status, result.error)
}
```

### Set the generated default

クライアントプラグインの `throwOnErrorDefault` で生成 operation の既定を選ぶ。各呼び出しは `throwOnError` で上書き可:

```typescript
import { pluginFetch } from '@kubb/plugin-fetch'

pluginFetch({ throwOnErrorDefault: false })

// resolves with an error result
const list = await searchPets({ query: { status: 'available' } })

// opt one call back into throwing
const pet = await getPetById({ path: { petId: 1 }, throwOnError: true })
```

### Network failures still throw

```typescript
try {
  const { data } = await getPetById({ path: { petId: 1 }, throwOnError: false })
  use(data)
} catch (error) {
  // not a ResponseError: the request never completed
  console.error('request failed to send', error)
}
```

`AbortSignal` を渡すとキャンセルでき、呼び出しは abort reason で reject する。

### Validation failures

`validator` を有効にすると、Zod schema に合わないボディは `ParseError`（schema の生の `issues` を保持）を投げる:

```typescript
import { ParseError } from './gen/.kubb/standardSchema'

try {
  const { data } = await getPetById({ path: { petId: 1 } })
  use(data)
} catch (error) {
  if (error instanceof ParseError) {
    console.error(error.issues) // [{ message, path }]
  }
}
```

## Notes

- `message` は HTTP メソッドとクエリ文字列を除いた URL を含む（例: `GET https://api.example.com/pets/1 failed with status 404 Not Found`）。クエリ内の資格情報がログに出ない
- 各生成パッケージは独自の `ResponseError` クラスを同梱するため、`instanceof` ではなく `ResponseError.is(error)`（error name を検査）で絞り込む
- `client.setConfig({ throwOnError })` は既定を変えない（各 operation が自身の値を渡すため）。プラグイン側で設定する
- `throwOnError` はサーバーが応答した場合のみ有効。接続断・DNS 失敗・abort は常に reject する。`ResponseError` は非 2xx 応答、`ParseError` はボディの検証失敗、それ以外は通常リクエスト未完了を意味する
- `throwOnError: false` ではエラーボディは専用のエラー schema で検査される。`throwOnError: false` の呼び出しに `.unwrap()` すると同じ `error` が reject になり `try`/`catch` で扱える
- Source: https://kubb.dev/extensions/kubb-labs/plugin-fetch/guides/error-handling （`@kubb/plugin-fetch@5.6.5`）

## Related

- [fetch-calling-operations](./fetch-calling-operations.md)
- [fetch-serialization](./fetch-serialization.md)
- [fetch-interceptors](./fetch-interceptors.md)
- [axios-error-handling](./axios-error-handling.md)
