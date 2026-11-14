# plugin-fetch: Transport

実行時に transport を設定して、ネットワーク送信を置き換える。クライアントは引き続き URL 構築・パラメーター serialize・認証解決・結果処理を行う。transport は関数。リクエストヘッダーやレスポンスログには interceptor を使う。

## Signature / Usage

`@kubb/plugin-fetch` は transport を、解決済みリクエストを受け取り web `Response` を返す関数として型付けする:

```typescript
type Transport = (request: ResolvedRequest) => Promise<Response | TransportResult>

type ResolvedRequest = {
  url: string
  method: string
  headers: Record<string, string>
  body?: RequestBody
  signal?: AbortSignal
  credentials?: RequestCredentials
  options?: NativeOptions
  // Set when the call streams the response. Do not buffer the body.
  stream?: boolean
}

type TransportResult = {
  webResponse: Response
  request: Request
  response: Response
}
```

`ResolvedRequest` は URL 構築済み・query と body エンコード済み・auth ヘッダー設定済み。ボディを未読のまま `Response` を返す。results と errors に native の `request` / `response` を設定するには `TransportResult` を返す。

### Send with another library

[ky](https://github.com/sindresorhus/ky) のように `Response` を返すライブラリは送信だけを担えばよい。`toRequestInit(request)` が `fetch` と ky の受け取る `RequestInit` を返す:

```typescript
import ky from 'ky'
import { client, toRequestInit } from './gen/.kubb/client'

client.setConfig({
  // The client splits success from error itself, so ky must not throw or retry on an error status. ky's `timeout`
  // (10 seconds by default) only waits for the response headers and never ends a started body or stream. Turn it
  // off and bound the whole call with `signal: AbortSignal.timeout(ms)`.
  transport: (request) => ky(request.url, { ...toRequestInit(request), throwHttpErrors: false, retry: 0, timeout: false }),
})
```

ライブラリはボディを未読で返す必要がある。このとき `result.request` は解決済みリクエストから組み立てた、ボディなしの `Request`（ライブラリが独自にボディを保持するため）。相対 URL の場合は解決済みリクエストそのもの。

### Mock the network in tests

テストでは独立クライアントから固定結果を返す:

```typescript
import { createClient } from './gen/.kubb/client'
import { getPetById } from './gen/clients/getPetById'

const testClient = createClient({
  transport: async () => Response.json({ id: 1, name: 'Fluffy' }),
})

const { data } = await getPetById({ path: { petId: 1 }, client: testClient })
//      ^ { id: 1, name: 'Fluffy' }
```

独立クライアントは operation 単位、またはクエリ系プラグインに渡せる。

### Wrap the default transport

生成クライアントは `defaultTransport`（transport 未設定時に使う `fetch` ベースの送信）を export する。これをラップすれば、組み込みのリクエスト / レスポンス処理を保ったままトレース・計測・ヘッダー付与ができる:

```typescript
import { client, defaultTransport } from './gen/.kubb/client'

client.setConfig({
  transport: (request) => withSpan(request, () => defaultTransport(request)),
})
```

## Notes

- core は URL 構築・query / body の serialize・auth ヘッダー設定済みの `ResolvedRequest` を渡す。transport が web `Response` を返し、core がボディをデコードする。response interceptor は `DecodedResponse` を受け取る
- 設定場所: 共有は `client.setConfig({ transport })`、独立インスタンスは `createClient({ transport })`、1 呼び出しだけの上書きは operation に `transport` を渡す
- plugin-axios では transport は axios instance を `createAxiosTransport` でラップしたもの（別ページ参照）
- 例は adapter に [`integerType: 'number'`](https://kubb.dev/extensions/kubb-labs/adapter-oas/options#integertype) を設定しており、`petId` のような `int64` の id は `number` になる。既定では `bigint` で、呼び出しには `1n` を渡す
- Migration (5.x → 6.0): a transport now returns a web `Response`, or `{ webResponse, request, response }` to also set the native objects (built with `toRequestInit(request)`), instead of the former `TransportResult` with `data` / `status` / `statusText` / `headers`; `ResolvedRequest.responseType` is replaced by `stream`; the former `Transport` mock that returned `{ data, status, ... }` becomes `async () => Response.json({ id: 1 })` (6.0.0 CHANGELOG and migrate-to-v6)
- Source: https://kubb.dev/extensions/kubb-labs/plugin-fetch/guides/transport （`@kubb/plugin-fetch@6.0.1`、取得日 2026-11-14）

## Related

- [fetch-interceptors](./fetch-interceptors.md)
- [fetch-calling-operations](./fetch-calling-operations.md)
- [axios-transport](./axios-transport.md)
- [fetch-migrate-to-v6](./fetch-migrate-to-v6.md)
