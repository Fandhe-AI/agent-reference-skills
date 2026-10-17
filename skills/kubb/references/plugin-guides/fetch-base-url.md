# plugin-fetch: Base URL

`baseURL` をクライアントプラグインまたは生成クライアントに設定する。

## Signature / Usage

```typescript
import { defineConfig } from 'kubb/config'
import { pluginTs } from '@kubb/plugin-ts'
import { pluginFetch } from '@kubb/plugin-fetch'

export default defineConfig({
  input: './petStore.yaml',
  output: { path: './src/gen' },
  plugins: [
    pluginTs(),
    pluginFetch({ baseURL: 'https://localhost:8080/api/v1' }),
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

## Notes

- OpenAPI の server URL はクライアントを自動設定しない。`adapterOas` の `server` オプションはドキュメントメタデータのみで `baseURL` を設定しない
- `${...}` 補間を含む値は動的のまま、生成クライアント設定に template literal として出力される。`baseURL: '${process.env.API_URL}'` はビルド時の値を焼き込まず実行時に環境変数を読む
- 優先順位: 呼び出し時の `baseURL` > `createClient` > `setConfig` > ビルド時の値
- Source: https://kubb.dev/extensions/kubb-labs/plugin-fetch/guides/base-url （`@kubb/plugin-fetch@5.6.5`）

## Related

- [fetch-calling-operations](./fetch-calling-operations.md)
- [axios-base-url](./axios-base-url.md)
