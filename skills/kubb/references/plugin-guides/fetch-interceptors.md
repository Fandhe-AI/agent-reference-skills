# plugin-fetch: Interceptors

`client.interceptors.request` / `.response` / `.error` にハンドラーを登録し、呼び出し全体に挙動を適用する。ハンドラーは解決済みの request、デコード済みの result、または呼び出しが行き着いた error を受け取る。

## Signature / Usage

### Run before the send

request ハンドラーは URL 構築・serialization・認証の後に実行される。変更した request を返す:

```typescript
import { client } from './gen/.kubb/client'

client.interceptors.request.use((request) => {
  request.headers['X-Request-ID'] = crypto.randomUUID()
  return request
})
```

ハンドラーは `ResolvedRequest`（`url` / `method` / `headers` / `body` / `signal` / `credentials` / `options` / `stream`）を受け取る。

### Run after the send

response ハンドラーはボディのデコード後、status の確認と validator の前に実行されるため、JSON ボディはすでにパース済み。`client.stream` 呼び出しでは `data` は生のボディストリーム。`DecodedResponse`（`data` / `status` / `statusText` / `headers` / `contentType` / `request` / `response`）を受け取る:

```typescript
client.interceptors.response.use((result) => {
  console.info(`${result.status} ${result.contentType}`)
  return result
})
```

### React to an error

error ハンドラーは全ての失敗を受け取る: 非 2xx status の `ResponseError`、ネットワークエラー、abort、`ParseError`。`ResponseError.is` で絞り込む:

```typescript
import { client, ResponseError } from './gen/.kubb/client'

client.interceptors.error.use((error) => {
  if (ResponseError.is(error) && error.status === 401) scheduleTokenRefresh()
  if (error.name === 'AbortError') console.info('canceled')
  return error
})
```

別の error（ドメインエラーなど）を返すと、呼び出しは代わりにそれを throw する。各ハンドラーは直前のハンドラーが返した error を受け取る。何も返さないハンドラーは error を保持する:

```typescript
class NotFoundError extends Error {}

client.interceptors.error.use((error) => (ResponseError.is(error) && error.status === 404 ? new NotFoundError(error.message) : error))
```

### Add, replace, and remove handlers

`use` はハンドラーを登録して id を返す。`eject` で削除、`update` で関数を差し替える。

```typescript
const id = client.interceptors.request.use((request) => request)

client.interceptors.request.update(id, (request) => {
  request.headers['X-Trace'] = 'on'
  return request
})

client.interceptors.request.eject(id)
```

### Where to set them

ハンドラーは共有 `client` に登録すると全 operation に適用される。`client.createClient(config)` は同じ config でハンドラーを持たないインスタンスを返す。`client.extend(config)` は親のハンドラー（後から追加されたものも含む）を自身のハンドラーより先に実行するインスタンスを返す:

```typescript
import { client } from './gen/.kubb/client'

const admin = client.extend({ headers: { 'X-Role': 'admin' } })
admin.interceptors.request.use((request) => request) // runs after the handlers on client
await getPetById({ path: { petId: 1 }, client: admin })
```

## Notes

- `throwOnError: false` では文書化された非 2xx は resolve され error ハンドラーは動かないため、返された result の `error` を確認する。stream ループ内のエラーはループから throw され、error ハンドラーはスキップされる
- ハンドラーは登録順に実行される
- 例は adapter に [`integerType: 'number'`](https://kubb.dev/extensions/kubb-labs/adapter-oas/options#integertype) を設定しており、`int64` の id は `number` になる。既定では `bigint` で、呼び出しには `1n` を渡す
- Migration (5.x → 6.0): response handlers now receive a `DecodedResponse` (the shape `TransportResult` had) after the body is decoded, and `ResolvedRequest` carries `stream` in place of `responseType`; `client.interceptors.error` handlers now also get network errors, aborts, and validation errors, so narrow with `ResponseError.is` before reading `status`, and each handler gets the error the previous one returned (6.0.0 CHANGELOG and migrate-to-v6)
- Source: https://kubb.dev/extensions/kubb-labs/plugin-fetch/guides/interceptors （`@kubb/plugin-fetch@6.0.1`、取得日 2026-11-14）

## Related

- [fetch-transport](./fetch-transport.md)
- [fetch-error-handling](./fetch-error-handling.md)
- [axios-interceptors](./axios-interceptors.md)
- [fetch-migrate-to-v6](./fetch-migrate-to-v6.md)
