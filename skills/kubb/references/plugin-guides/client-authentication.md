# plugin-client: Authentication

認証は自前の `client` 内にある。`@kubb/plugin-client` は資格情報を送らず、各 operation が必要とする scheme を client に伝え、client が処理を決める。

## Signature / Usage

各生成関数は spec の operation の security scheme を `security` として渡す:

```typescript
apiClient<GetPetByIdResponses, ThrowOnError>({
  method: 'GET',
  url: '/pet/{petId}',
  security: [{ type: 'apiKey', name: 'api_key', in: 'header' }, { type: 'oauth2' }],
  ...config,
})
```

各エントリーは 1 つの security requirement で、どれか 1 つを満たせばよい。API キーとセッション cookie のように複数 scheme を同時に要求する requirement は配列になり、client はそれら全てを送る: `security: [[{ type: 'apiKey', name: 'api_key', in: 'header' }, { type: 'apiKey', name: 'sid', in: 'cookie' }]]`。

`oauth2` エントリーは URL 付きの `flows` を持ち、spec が `oauth2MetadataUrl` を設定していれば `metadataUrl` も持つ。`openIdConnect` エントリーは discovery の `url` を持つ。client はこれらでフロー（OpenAPI 3.2 の `deviceAuthorization` フローなど）を実行し、bearer トークンとして送れる:

```typescript
security: [{ type: 'oauth2', flows: { deviceAuthorization: { deviceAuthorizationUrl: 'https://auth.example.com/device', tokenUrl: 'https://auth.example.com/token' } }, scopes: ['read'] }]
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

署名（AWS SigV4 等）や複数の認証方式は `config.security` を読んで operation ごとに選ぶか、呼び出しごとに別の `client` を渡す。どちらの方法も使える:

```typescript
import { createSignedClient } from './clients/iam'

await getPetById({ path: { petId: 1 }, client: createSignedClient() })
```

## Notes

- security 要件のない operation は `security` フィールドを渡さない。公開エンドポイントで認証をスキップする目印になる
- 例は adapter に [`integerType: 'number'`](https://kubb.dev/extensions/kubb-labs/adapter-oas/options#integertype) を設定しており、`petId` のような `int64` の id は `number` になる。既定では `bigint` で、呼び出しには `1n` を渡す
- Migration (5.x → 6.0): generated functions now call `apiClient<TResponses, ThrowOnError>(...)`; a `security` entry is one scheme, or an array of schemes to send together, and `oauth2` / `openIdConnect` entries carry `flows` / `metadataUrl` / `url` (migrate-to-v6 and the 6.0 authentication guide)
- 呼び出しに渡した client はその呼び出しに限り既定を置き換える
- plugin-fetch / plugin-axios の組み込み `auth` resolver とは別物（こちらは自前 client で実装する）
- Source: https://kubb.dev/extensions/kubb-labs/plugin-client/guides/authentication （`@kubb/plugin-client@6.0.1`、取得日 2026-11-14）

## Related

- [client-write-your-client](./client-write-your-client.md)
- [client-calling-operations](./client-calling-operations.md)
- [fetch-authentication](./fetch-authentication.md)
- [client-migrate-to-v6](./client-migrate-to-v6.md)
