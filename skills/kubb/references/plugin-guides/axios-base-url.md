# plugin-axios: Base URL

`baseURL` をクライアントプラグインまたは生成クライアントに設定する。

## Signature / Usage

```typescript
import { defineConfig } from 'kubb/config'
import { adapterOas } from '@kubb/adapter-oas'
import { pluginTs } from '@kubb/plugin-ts'
import { pluginAxios } from '@kubb/plugin-axios'

export default defineConfig({
  input: './petStore.yaml',
  output: { path: './src/gen' },
  adapter: adapterOas({ integerType: 'number' }),
  plugins: [
    pluginTs(),
    pluginAxios({ baseURL: 'https://localhost:8080/api/v1' }),
  ],
})
```

実行時に設定する場合:

```typescript
import { client } from './gen/.kubb/client'

client.setConfig({ baseURL: import.meta.env.VITE_API_URL })
```

独立クライアントを作って operation に渡す:

```typescript
import { createClient } from './gen/.kubb/client'
import { getPetById } from './gen/clients/getPetById'

const staging = createClient({ baseURL: 'https://staging.petstore.swagger.io/v2' })

const { data } = await getPetById({ path: { petId: 1 }, client: staging })
```

単一呼び出しだけ上書き:

```typescript
const { data } = await getPetById({ path: { petId: 1 }, baseURL: 'https://localhost:3000' })
```

path または operation が独自の `servers` を宣言できる（アップロードやストリーミング用ホストなど）。その URL がその operation の既定 `baseURL` になる。`adapterOas` の `server.index` でエントリーを選び、無ければ先頭を使う:

```yaml
paths:
  /.sse:
    servers:
      - url: https://echo.websocket.org
    get:
      operationId: streamEvents
```

OpenAPI 3.2 では server に `name` を付けられる。生成される `.kubb/client.ts` は名前付き server を `servers` として export するので、名前で選べる:

```yaml
servers:
  - url: https://api.example.com
    name: production
  - url: https://staging.example.com
    name: staging
```

```typescript
import { client, servers } from './gen/.kubb/client'

client.setConfig({ baseURL: servers.staging })
```

## Notes

- トップレベルの OpenAPI server URL は、`adapterOas` の `server` オプションを使ってもクライアントの `baseURL` を設定しない
- 相対 server URL（`/v2` など）や `{variable}` プレースホルダーを含む URL は無視され、クライアントの `baseURL` が使われる
- 例は adapter に [`integerType: 'number'`](https://kubb.dev/extensions/kubb-labs/adapter-oas/options#integertype) を設定しており、`int64` の id は `number` になる。既定では `bigint`
- `${...}` 補間を含む値は動的のまま、生成クライアント設定に template literal として出力される。`baseURL: '${process.env.API_URL}'` はビルド時の値を焼き込まず実行時に環境変数を読む
- 優先順位（先に見つかったものを使う）: 1. 呼び出し時の `baseURL`、2. operation 自身の `servers`、3. path の `servers`、4. `client` として渡した `createClient({ baseURL })` のクライアント、5. `client.setConfig({ baseURL })`、6. `pluginAxios` の `baseURL` オプション
- Migration (5.x → 6.0): a `servers` entry on a path or operation is now that operation's default `baseURL`; a `baseURL` on the call still wins (6.0.0 CHANGELOG)
- Source: https://kubb.dev/extensions/kubb-labs/plugin-axios/guides/base-url （`@kubb/plugin-axios@6.0.1`、取得日 2026-11-14）

## Related

- [axios-calling-operations](./axios-calling-operations.md)
- [fetch-base-url](./fetch-base-url.md)
- [axios-migrate-to-v6](./axios-migrate-to-v6.md)
