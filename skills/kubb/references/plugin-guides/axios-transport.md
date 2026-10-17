# plugin-axios: Transport

実行時に transport を設定して、ネットワーク送信を置き換える。クライアントは引き続き URL 構築・パラメーター serialize・認証解決・結果処理を行う。transport は `AxiosInstance`。既定は `axios.create()` で、設定済みの独自インスタンスに置き換えられる。リクエストヘッダーやレスポンスログには interceptor を使う。

## Signature / Usage

```typescript
type ClientConfig = {
  // ...
  transport?: AxiosInstance
}
```

Kubb は解決済みの URL・query・body・認証をインスタンスへ転送する。timeout・既定ヘッダー・ログ interceptor を持つインスタンスを渡す:

```typescript
import axios from 'axios'
import { client } from './gen/.kubb/client'

const instance = axios.create({
  timeout: 10_000,
  headers: { 'X-Client': 'kubb' },
})

instance.interceptors.response.use((response) => {
  console.info(`${response.config.method?.toUpperCase()} ${response.config.url} -> ${response.status}`)
  return response
})

client.setConfig({ transport: instance })
```

## Notes

- 以降、生成された全関数がこのインスタンス経由で送信し、timeout・headers・interceptor が各呼び出しに適用される。`client.interceptors` 経由で登録した interceptor は新インスタンスへ移り、`eject` / `update` 用の ID を保持する
- Kubb は独自の serialization と `throwOnError` 処理のため各リクエストに `transformRequest` / `paramsSerializer` / `validateStatus` を設定する。これらのフィールドには触れない。timeout・retry・interceptor はインスタンスに設定する。1 呼び出しだけなら新インスタンスを作らず `options`（`{ timeout }` や `{ onUploadProgress }`）を渡す
- 設定場所: 共有は `client.setConfig({ transport })`、独立インスタンスは `createClient({ transport })`、1 呼び出しだけの上書きは operation に `transport` を渡す
- plugin-fetch では transport は `(request: ResolvedRequest) => Promise<TransportResult>` 関数（別ページ参照）
- Source: https://kubb.dev/extensions/kubb-labs/plugin-axios/guides/transport （`@kubb/plugin-axios@5.6.5`）

## Related

- [axios-interceptors](./axios-interceptors.md)
- [axios-calling-operations](./axios-calling-operations.md)
- [fetch-transport](./fetch-transport.md)
