# Fetch Client Example

OpenAPI 仕様から Fetch ベースの API クライアントを生成する設定例。

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
    pluginOas({ validate: false }),
    pluginTs({
      output: { path: 'models.ts' },
    }),
    pluginClient({
      client: 'fetch',
      output: { path: './clients' },
    }),
  ],
  hooks: {
    done: ['npm run typecheck', 'biome format --write ./', 'biome lint --fix --unsafe ./src'],
  },
})
```

## 依存関係

```bash
npm install --save-dev @kubb/cli @kubb/core @kubb/plugin-oas @kubb/plugin-ts @kubb/plugin-client
```
