# plugin-axios: Authentication

生成クライアントに `auth` resolver を設定する。operation は OpenAPI の security scheme を使い、資格情報を渡すまでリクエストは未認証のまま。

## Signature / Usage

```typescript
import { client } from './gen/.kubb/client'

client.setConfig({
  auth: () => localStorage.getItem('token') ?? undefined,
})
```

`auth` はトークン文字列または関数。関数は async 可で、トークンまたは `undefined`（その scheme をスキップ）を返す。operation が複数 scheme を受け付ける場合、トークンが返るまで順に試す。

resolver に渡される `Auth` オブジェクトで scheme ごとに資格情報を選べる:

```typescript
type Auth = {
  type: 'http' | 'apiKey' | 'oauth2' | 'openIdConnect'
  scheme?: 'bearer' | 'basic'
  name?: string
  in?: 'header' | 'query' | 'cookie'
}

client.setConfig({
  auth: (auth) => (auth.type === 'apiKey' ? apiKey : accessToken),
})
```

環境（テナント等）ごとに別トークンを使う場合は `createClient` で独立クライアントを作る:

```typescript
import { createClient } from './gen/.kubb/client'

const tenant = createClient({
  baseURL: 'https://tenant.example.com',
  auth: () => tenantToken,
})

const { data } = await getPetById({ path: { petId: 1 }, client: tenant })
```

## Options / Props

| Spec の scheme | `Auth` オブジェクト | トークンの送信先 |
| --- | --- | --- |
| `http` bearer | `{ type: 'http', scheme: 'bearer' }` | `Authorization: Bearer <token>` |
| `http` basic | `{ type: 'http', scheme: 'basic' }` | `Authorization: Basic <token>` |
| `apiKey` header | `{ type: 'apiKey', name, in: 'header' }` | `name` のリクエストヘッダー |
| `apiKey` query | `{ type: 'apiKey', name, in: 'query' }` | `name` のクエリパラメーター |
| `apiKey` cookie | `{ type: 'apiKey', name, in: 'cookie' }` | `Cookie` ヘッダー |
| `oauth2` | `{ type: 'oauth2' }` | `Authorization: Bearer <token>` |
| `openIdConnect` | `{ type: 'openIdConnect' }` | `Authorization: Bearer <token>` |

## Notes

- basic 認証では生の `username:password` 文字列を返す。runtime が base64 エンコードして `Basic` プレフィックスを付ける
- 1 回のリクエストだけ上書きするには、その呼び出しに `auth` を渡す（トークンのリフレッシュ向き）。呼び出しに明示した `headers` は解決済みトークンより常に優先される
- OpenAPI security scheme 外の認証は、async の request interceptor で署名やカスタムヘッダーを付与する
- 内容は plugin-fetch 版と同一（原文が同文）
- Source: https://kubb.dev/extensions/kubb-labs/plugin-axios/guides/authentication （`@kubb/plugin-axios@5.6.5`）

## Related

- [axios-interceptors](./axios-interceptors.md)
- [axios-base-url](./axios-base-url.md)
- [fetch-authentication](./fetch-authentication.md)
- [client-authentication](./client-authentication.md)
