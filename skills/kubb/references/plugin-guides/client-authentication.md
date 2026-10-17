# plugin-client: Authentication

認証は自前の `client` 内にある。`@kubb/plugin-client` は資格情報を送らず、各 operation が必要とする scheme を client に伝え、client が処理を決める。

## Signature / Usage

各生成関数は spec の operation の security scheme を `security` として渡す:

```typescript
request({
  method: 'GET',
  url: '/pet/{petId}',
  security: [{ type: 'apiKey', name: 'api_key', in: 'header' }, { type: 'oauth2' }],
  ...config,
})
```

client は送信前に任意の処理を `await` できる。次の例は `setAuth` で登録したトークン関数を await し、トークンを secrets store やリフレッシュ呼び出しから取得できる:

```typescript
// src/client.ts
type GetToken = () => Promise<string | undefined>

let getToken: GetToken | undefined

export function setAuth(resolve: GetToken) {
  getToken = resolve
}

export async function client(config: RequestConfig) {
  const token = config.security?.length ? await getToken?.() : undefined

  const response = await fetch(url, {
    method: config.method,
    headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}), ...(config.headers as Record<string, string>) },
    // ...
  })
  // ...
}
```

```typescript
// src/index.ts
import { setAuth } from './client'

setAuth(async () => readTokenFromSecretsStore())
```

署名（AWS SigV4 等）や複数の認証方式は `config.security` を読んで operation ごとに選ぶか、呼び出しごとに別の `client` を渡す:

```typescript
import { createSignedClient } from './clients/iam'

await getPetById({ path: { petId: 1 }, client: createSignedClient() })
```

## Notes

- security 要件のない operation は `security` フィールドを渡さない。公開エンドポイントで認証をスキップする目印になる
- 呼び出しに渡した client はその呼び出しに限り既定を置き換える
- plugin-fetch / plugin-axios の組み込み `auth` resolver とは別物（こちらは自前 client で実装する）
- Source: https://kubb.dev/extensions/kubb-labs/plugin-client/guides/authentication （`@kubb/plugin-client@5.5.15`）

## Related

- [client-write-your-client](./client-write-your-client.md)
- [client-calling-operations](./client-calling-operations.md)
- [fetch-authentication](./fetch-authentication.md)
