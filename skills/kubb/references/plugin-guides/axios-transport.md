# plugin-axios: Transport

実行時に transport を設定して、ネットワーク送信を置き換える。クライアントは引き続き URL 構築・パラメーター serialize・認証解決・結果処理を行う。transport は、解決済みリクエストを受け取り native の axios config / response 付きの web `Response` を返す関数（`@kubb/plugin-fetch` と同じ）。既定は `getAxiosInstance()` 経由で送る `defaultTransport`。`createAxiosTransport(instance)` で任意の axios instance を transport にできる。リクエストヘッダーやレスポンスログには interceptor を使う。

## Signature / Usage

```typescript
type ClientConfig = {
  // ...
  transport?: Transport
}
```

### Send through a pre-configured instance

timeout・既定ヘッダー・ログ interceptor を持つインスタンスをラップする:

```typescript
import axios from 'axios'
import { client, createAxiosTransport } from './gen/.kubb/client'

const instance = axios.create({
  timeout: 10_000,
  headers: { 'X-Client': 'kubb' },
})

instance.interceptors.response.use((response) => {
  console.info(`${response.config.method?.toUpperCase()} ${response.config.url} -> ${response.status}`)
  return response
})

client.setConfig({ transport: createAxiosTransport(instance) })
```

以降、生成された全関数がこのインスタンス経由で送信し、timeout・headers・axios interceptor が各呼び出しに適用される。`client.interceptors` 経由で登録したハンドラーは transport によらず動き続ける。

### Configure the default instance

生成クライアントは `getAxiosInstance()`（`defaultTransport` が送信に使うインスタンスを返す）を export する。transport を置き換えずにトレースやヘッダーを足すには、これを直接設定する:

```typescript
import { getAxiosInstance } from './gen/.kubb/client'

getAxiosInstance().defaults.timeout = 10_000
getAxiosInstance().interceptors.request.use((config) => {
  config.headers.set('traceparent', currentTraceparent())
  return config
})
```

`createClient()` のインスタンスは、独自の `transport` を渡さない限り作成時に `client` の `transport` をコピーする。後からの `client.setConfig({ transport })` は届かない。どちらにも `transport` が無ければ `getAxiosInstance()` 経由で送る。

### Write a transport function

独自関数は `defaultTransport` や任意のインスタンスの transport をラップできる:

```typescript
import { client, defaultTransport } from './gen/.kubb/client'

client.setConfig({
  transport: (request) => withSpan(request, () => defaultTransport(request)),
})
```

## Notes

- Kubb は独自の serialization とステータス処理のため `url` / `method` / `headers` / `data` / `transformRequest` / `transformResponse` / `responseType` / `validateStatus` を設定する。これらのフィールドには触れない。timeout・retry・interceptor はインスタンスに設定する。1 呼び出しだけなら新インスタンスを作らず `options`（`{ timeout }` や `{ onUploadProgress }`）を渡す
- 設定場所: 共有は `client.setConfig({ transport })`、独立インスタンスは `createClient({ transport })`、1 呼び出しだけの上書きは operation に `transport` を渡す
- plugin-fetch では transport は `(request: ResolvedRequest) => Promise<Response | TransportResult>` 関数（別ページ参照）
- Migration (5.x → 6.0): `transport` no longer takes an `AxiosInstance` directly — wrap it with `createAxiosTransport(instance)`, and set defaults on `getAxiosInstance()` in place of `defaultTransport.defaults` (`defaultTransport` is now a function that sends through `getAxiosInstance()`); `validateStatus`, `AxiosTransport`, `InterceptorFn`, and `InterceptorChannel` are removed; a child from `createClient()` now inherits the `transport` of `client` (it used to get its own `axios.create()`); native interceptors for a custom transport go on the instance passed to `createAxiosTransport` (6.0.0 CHANGELOG and migrate-to-v6)
- Source: https://kubb.dev/extensions/kubb-labs/plugin-axios/guides/transport （`@kubb/plugin-axios@6.0.1`、取得日 2026-11-14）

## Related

- [axios-interceptors](./axios-interceptors.md)
- [axios-calling-operations](./axios-calling-operations.md)
- [fetch-transport](./fetch-transport.md)
- [axios-migrate-to-v6](./axios-migrate-to-v6.md)
