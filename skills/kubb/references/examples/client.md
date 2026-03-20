# Axios Client Example

OpenAPI 仕様から Axios ベースの API クライアントを生成する設定例。

## kubb.config.ts

```typescript
import { defineConfig } from '@kubb/core'
import { pluginOas } from '@kubb/plugin-oas'
import { pluginTs } from '@kubb/plugin-ts'
import { pluginClient } from '@kubb/plugin-client'

export default defineConfig({
  input: { path: './petStore.yaml' },
  output: { path: './src/gen', clean: true },
  plugins: [
    pluginOas({ generators: [] }),
    pluginTs({
      output: { path: 'models' },
      enumType: 'asConst',
    }),
    pluginClient({
      output: { path: './clients' },
      client: 'axios',
      group: {
        type: 'tag',
        name: ({ group }) => `${group}Service`,
      },
      exclude: [{ type: 'tag', pattern: 'store' }],
      pathParamsType: 'object',
    }),
  ],
})
```

## 依存関係

```bash
npm install --save-dev @kubb/cli @kubb/core @kubb/plugin-oas @kubb/plugin-ts @kubb/plugin-client
npm install axios
```

## 生成コードの使用例

```typescript
import { getPetById } from './gen/clients/PetService'

const pet = await getPetById({ petId: 1 })
```
