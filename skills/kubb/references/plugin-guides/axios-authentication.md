# plugin-axios: Authentication

生成クライアントに `auth` resolver を設定する。operation は OpenAPI の security scheme を使い、資格情報を渡すまでリクエストは未認証のまま。

## Signature / Usage

```typescript
import { client } from './gen/.kubb/client'

client.setConfig({
  auth: () => localStorage.getItem('token') ?? undefined,
})
```

`auth` はトークン文字列または関数。関数は async 可で、トークンまたは `undefined`（その scheme をスキップ）を返す。runtime は、含まれる全 scheme のトークンが得られた最初の security requirement を送る。API キーとセッション cookie を同時に要求する requirement は両方を送る。

`.kubb/client.ts` は spec の scheme を名前付きで `securitySchemes` として export する。`mutualTLS` scheme は除外される（資格情報が TLS ハンドシェイクのクライアント証明書であり、`auth` resolver が返すトークンではないため）。生成された operation はここの scheme を参照し、必要な scope を加える:

```typescript
security: [{ ...securitySchemes.petstore_auth, scopes: ['write:pets'] }]
```

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
- 1 回のリクエストだけ上書きするには、その呼び出しに `auth` を渡す（トークンのリフレッシュ向き）。自分で設定したヘッダー（client レベルの `headers`、またはヘッダーパラメーターを宣言する operation の呼び出しに渡した `headers`）は解決済みトークンより常に優先される
- OpenAPI security scheme 外の認証は、async の request interceptor で署名やカスタムヘッダーを付与する
- 例は adapter に [`integerType: 'number'`](https://kubb.dev/extensions/kubb-labs/adapter-oas/options#integertype) を設定しており、`petId` のような `int64` の id は `number` になる。既定では `bigint` で、呼び出しには `1n` を渡す
- `mutualTLS` scheme: クライアント証明書はリクエストではなく接続に載せる。Node.js では証明書を持つ undici `Agent` 経由で送る（custom transport を使う）。ブラウザーではブラウザー自身がクライアント証明書を選ぶ
- Migration (5.x → 6.0): an auth requirement that needs several schemes now sends all of them (previously the runtime tried each scheme until one returned a token; see the 6.0 "Behavior changes" in the migration guide). Each security scheme is written once as `securitySchemes` in `.kubb/client.ts` (6.0.0 CHANGELOG)
- 内容は plugin-fetch 版と同一（原文が同文）
- Source: https://kubb.dev/extensions/kubb-labs/plugin-axios/guides/authentication （`@kubb/plugin-axios@6.0.1`、取得日 2026-11-14）

## Related

- [axios-interceptors](./axios-interceptors.md)
- [axios-base-url](./axios-base-url.md)
- [fetch-authentication](./fetch-authentication.md)
- [client-authentication](./client-authentication.md)
- [axios-migrate-to-v6](./axios-migrate-to-v6.md)
