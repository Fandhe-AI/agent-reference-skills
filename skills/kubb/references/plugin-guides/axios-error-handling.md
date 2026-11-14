# plugin-axios: Error handling

生成クライアントの失敗を扱う。`ResponseError` を catch する、`throwOnError` でエラー結果の返却に切り替える、ネットワーク失敗と 4xx / 5xx を区別する。

## Signature / Usage

生成クライアントは既定で非 2xx に `ResponseError` を投げる:

```typescript
import { getPetById } from './gen/clients/getPetById'
import { ResponseError } from './gen/.kubb/client'

try {
  const { data } = await getPetById({ path: { petId: 1 } })
  console.info(data)
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
  headers: Headers
  request: AxiosRequestConfig
  response: AxiosResponse
}
```

### Narrow a thrown error by status

`isResponseError<Responses>(error)` は、catch したエラーを 1 つの operation の `ResponseError` に絞り込む。続けて `status` を調べると `data` がその status に宣言されたボディに絞られる。`4xx` のような range キーは個別エントリーを持たない status をカバーし、`default` は残りをカバーする:

```typescript
import { isResponseError } from './gen/.kubb/client'
import type { GetPetByIdResponses } from './gen/types/GetPetById'

try {
  await getPetById({ path: { petId: 7 } })
} catch (error) {
  if (isResponseError<GetPetByIdResponses>(error) && error.status === 404) {
    console.error(error.data) // GetPetById404
  }
}
```

エラーはレスポンスの `Headers` も `error.headers` として持つので、`error.headers.get('Retry-After')` はどの transport でも同じに読める。

### Return the error instead

`throwOnError: false` を渡すと、文書化された全 status で resolve する。結果は判別共用体（成功は `data`、失敗は `error`）。ボディのない失敗呼び出しは `error` に `{ status, statusText }` を設定する。

`data` を確認してから読む。`status` の確認でも `data` は絞り込まれるが、operation が `default` レスポンス（status は任意の数値になり得る）を宣言している場合は絞り込まれない。

```typescript
const result = await getPetById({ path: { petId: 1 }, throwOnError: false })

if (result.data !== undefined) {
  console.info(result.data)
} else {
  console.error(result.status, result.error)
}
```

### Set the generated default

クライアントプラグインの `throwOnErrorDefault` で生成 operation の既定を選ぶ。各呼び出しは `throwOnError` で上書き可:

```typescript
import { pluginAxios } from '@kubb/plugin-axios'

pluginAxios({ throwOnErrorDefault: false })

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

### Turn validation off at runtime

`validator` オプションは生成時に各呼び出しが持つ schema を決める。実行時にスキップするには client に `validate` を設定する（本番やテストの部分的な fixture など）:

```typescript
import { client } from './gen/.kubb/client'

client.setConfig({ validate: import.meta.env.DEV })
```

`validate: false` は全 schema をスキップする。オブジェクトは `false` を設定した方向だけをスキップする: `request`（ボディ）、`params`（path / query / header / cookie パラメーター）、`response`、`error`:

```typescript
client.setConfig({ validate: { response: false } })
```

呼び出し単位の `validate` は client 設定を上書きする（例: `getPetById({ path: { petId: 1 }, validate: true })`）。既定は `true`。

## Notes

- `request` は `AxiosRequestConfig`、`response` は `AxiosResponse`（plugin-fetch 版は native の `Request` / `Response`）
- `message` は HTTP メソッドとクエリ文字列を除いた URL を含む（例: `GET https://api.example.com/pets/1 failed with status 404 Not Found`）。クエリ内の資格情報がログに出ない
- 各生成パッケージは独自の `ResponseError` クラスを同梱するため、`instanceof` ではなく `ResponseError.is(error)`（error name を検査）で絞り込む
- `client.setConfig({ throwOnError })` は既定を変えない（各 operation が自身の値を渡すため）。プラグイン側で設定する
- `throwOnError` はサーバーが応答した場合のみ有効。接続断・DNS 失敗・abort は常に reject する。`ResponseError` は非 2xx 応答、`ParseError` はボディの検証失敗または JSON として不正であること、それ以外は通常リクエスト未完了を意味する。これらはすべて `client.interceptors.error` に届く
- 非 2xx レスポンスのエラーボディは、その status の schema、次に `5xx` などの range、次に `default` の順で検査される。schema に合わないエラーボディは（`throwOnError: false` でも）`ResponseError` の代わりに `ParseError` を投げる。ドキュメントに無い status（ゲートウェイの `502` など）のボディは未検査のまま
- `throwOnError: false` の呼び出しに `.unwrap()` すると同じ `error` が reject になり `try`/`catch` で扱える
- A network error reaches `client.interceptors.error` handlers as the native `AxiosError`
- Migration (5.x → 6.0): `client.interceptors.error` handlers now also receive network errors, aborts, and validation errors, so narrow with `ResponseError.is` before reading `status`; an aborted call rejects with the signal's reason; a failed call without a body reports `{ status, statusText }` as `error`; invalid JSON under a JSON media type throws a `ParseError`; `ResponseError.data` holds the validated body; every result and thrown `ResponseError` carries `headers` (6.0.0 CHANGELOG and migrate-to-v6)
- Source: https://kubb.dev/extensions/kubb-labs/plugin-axios/guides/error-handling （`@kubb/plugin-axios@6.0.1`、取得日 2026-11-14）

## Related

- [axios-calling-operations](./axios-calling-operations.md)
- [axios-serialization](./axios-serialization.md)
- [axios-interceptors](./axios-interceptors.md)
- [fetch-error-handling](./fetch-error-handling.md)
- [axios-migrate-to-v6](./axios-migrate-to-v6.md)
