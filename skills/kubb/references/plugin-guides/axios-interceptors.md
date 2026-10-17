# plugin-axios: Interceptors

`client.interceptors.request` / `.response` / `.error` にハンドラーを登録し、呼び出し全体に挙動を適用する。ハンドラーは native の Axios オブジェクトを受け取る。

## Signature / Usage

### Run before the send

request ハンドラーは URL 構築・serialization・認証の後に実行される。変更した request を返す:

```typescript
import { client } from './gen/.kubb/client'

client.interceptors.request.use((request) => {
  request.headers.set('X-Request-ID', crypto.randomUUID())
  return request
})
```

ハンドラーは `InternalAxiosRequestConfig` を受け取る。ヘッダーは `AxiosHeaders` 経由、ボディは `data` にある。

### Run after the send

response ハンドラーは呼び出しが resolve する前に実行される。`AxiosResponse` を受け取る:

```typescript
client.interceptors.response.use((response) => {
  console.info(`${response.status} ${response.config.url}`)
  return response
})
```

### React to an error

throw 経路の HTTP エラーに反応する。ハンドラーは `AxiosError` を受け取る:

```typescript
client.interceptors.error.use((error) => {
  if (error.response?.status === 401) scheduleTokenRefresh()
  return error
})
```

### Add, replace, and remove handlers

`use` はハンドラーを登録して id を返す。`eject` で削除、`update` で関数を差し替える。

```typescript
const id = client.interceptors.request.use((request) => request)

client.interceptors.request.update(id, (request) => {
  request.headers.set('X-Trace', 'on')
  return request
})

client.interceptors.request.eject(id)
```

## Notes

- error チャンネルは throw 経路でのみ発火する。`throwOnError: false` では文書化された非 2xx は resolve され error interceptor は動かないため、返された result の `error` を確認する。transport 失敗（応答なし）は throw され、その場合 error ハンドラーは動く（plugin-fetch 版と異なる）
- response / error ハンドラーは登録順に実行される。Axios は request ハンドラーを逆順に実行する
- 共有 `client` に登録すると全 operation に、`createClient` の別インスタンスに登録すると独立した呼び出しに適用される（interceptor はインスタンス単位の設定）
- `client.interceptors` 経由で登録した interceptor は、後から `client.setConfig({ transport })` で設定したカスタム transport にも追従する。transport が変わるとハンドラーは旧インスタンスから外れ新インスタンスに付き、ID は `eject` / `update` で有効なまま。transport をクリア（`client.setConfig({ transport: undefined })`）するとクライアントのベースインスタンスへ戻る。呼び出し単位の `transport` はクライアント interceptor を迂回する
- Source: https://kubb.dev/extensions/kubb-labs/plugin-axios/guides/interceptors （`@kubb/plugin-axios@5.6.5`）

## Related

- [axios-transport](./axios-transport.md)
- [axios-error-handling](./axios-error-handling.md)
- [fetch-interceptors](./fetch-interceptors.md)
