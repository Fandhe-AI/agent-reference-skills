# plugin-fetch: Transport

実行時に transport を設定して、ネットワーク送信を置き換える。クライアントは引き続き URL 構築・パラメーター serialize・認証解決・結果処理を行う。transport は関数。リクエストヘッダーやレスポンスログには interceptor を使う。

## Signature / Usage

`@kubb/plugin-fetch` は transport を、解決済みリクエストを受け取り結果を返す関数として型付けする:

```typescript
type Transport = (request: ResolvedRequest) => Promise<TransportResult>

type ResolvedRequest = {
  url: string
  method: string
  headers: Record<string, string>
  body?: RequestBody
  signal?: AbortSignal
  credentials?: RequestCredentials
  options?: FetchOptions
  responseType?: ResponseType
}

type TransportResult<TData = unknown> = {
  data: TData
  status: number
  statusText: string
  headers: Headers
  contentType?: string
  request: Request
  response: Response
}
```

テストでネットワークをモックする（独立クライアントから固定結果を返す）:

```typescript
import { createClient } from './gen/.kubb/client'
import { getPetById } from './gen/clients/getPetById'

const testClient = createClient({
  transport: async (request) => ({
    data: { id: 1, name: 'Fluffy' },
    status: 200,
    statusText: 'OK',
    headers: new Headers(),
    request: new Request(request.url),
    response: new Response(),
  }),
})

const { data } = await getPetById({ path: { petId: 1 }, client: testClient })
//      ^ { id: 1, name: 'Fluffy' }
```

## Notes

- core は URL 構築・query / body の serialize・auth ヘッダー設定済みの `ResolvedRequest` を渡す。パース済み `data` と native の `request` / `response` を返すことで、status・headers・生ボディが result から参照できる
- 設定場所: 共有は `client.setConfig({ transport })`、独立インスタンスは `createClient({ transport })`、1 呼び出しだけの上書きは operation に `transport` を渡す
- 独立クライアントは operation 単位、またはクエリ系プラグインに渡せる
- plugin-axios では transport は `AxiosInstance`（別ページ参照）
- Source: https://kubb.dev/extensions/kubb-labs/plugin-fetch/guides/transport （`@kubb/plugin-fetch@5.6.5`）

## Related

- [fetch-interceptors](./fetch-interceptors.md)
- [fetch-calling-operations](./fetch-calling-operations.md)
- [axios-transport](./axios-transport.md)
