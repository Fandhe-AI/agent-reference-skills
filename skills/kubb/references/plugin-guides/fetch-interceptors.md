# plugin-fetch: Interceptors

`client.interceptors.request` / `.response` / `.error` にハンドラーを登録し、呼び出し全体に挙動を適用する。ハンドラーは解決済みの request / result オブジェクトを受け取る。

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

ハンドラーは `ResolvedRequest`（`url` / `method` / `headers` / `body` / `signal` / `credentials` / `options` / `responseType`）を受け取る。

### Run after the send

response ハンドラーは呼び出しが resolve する前、status 分岐とデシリアライズの前に実行されるため `data` は生のボディ。`TransportResult`（`data` / `status` / `statusText` / `headers` / `contentType` / `request` / `response`）を受け取る:

```typescript
client.interceptors.response.use((result) => {
  console.info(`${result.status} ${result.request.url}`)
  return result
})
```

### React to an error

throw 経路の HTTP エラーに反応する。ハンドラーは `ResponseError` を受け取る:

```typescript
client.interceptors.error.use((error) => {
  if (error.status === 401) scheduleTokenRefresh()
  return error
})
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

## Notes

- error チャンネルは throw 経路でのみ発火する。`throwOnError: false` では文書化された非 2xx は resolve され error interceptor は動かないため、返された result の `error` を確認する。transport 失敗（応答なし）は throw されるが、渡す result が無いため error ハンドラーは動かない
- ハンドラーは登録順に実行される
- 共有 `client` に登録すると全 operation に、`createClient` の別インスタンスに登録すると独立した呼び出しに適用される（interceptor はインスタンス単位の設定）
- Source: https://kubb.dev/extensions/kubb-labs/plugin-fetch/guides/interceptors （`@kubb/plugin-fetch@5.6.5`）

## Related

- [fetch-transport](./fetch-transport.md)
- [fetch-error-handling](./fetch-error-handling.md)
- [axios-interceptors](./axios-interceptors.md)
