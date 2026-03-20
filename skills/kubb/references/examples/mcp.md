# MCP Example

OpenAPI 仕様から MCP（Model Context Protocol）サーバーを生成する設定例。

## kubb.config.ts

```typescript
import { defineConfig } from '@kubb/core'
import { pluginOas } from '@kubb/plugin-oas'
import { pluginTs } from '@kubb/plugin-ts'
import { pluginClient } from '@kubb/plugin-client'
import { pluginMcp } from '@kubb/plugin-mcp'

export default defineConfig({
  input: { path: './petStore.yaml' },
  output: { path: './src/gen', clean: true },
  plugins: [
    pluginOas({ generators: [] }),
    pluginTs({ output: { path: 'models' } }),
    pluginClient({
      output: { path: './clients' },
      client: 'fetch',
    }),
    pluginMcp({
      output: { path: './mcp' },
      client: {
        baseURL: 'https://petstore.swagger.io/v2',
      },
      group: {
        type: 'tag',
        name: ({ group }) => `${group}Handlers`,
      },
    }),
  ],
})
```

## 依存関係

```bash
npm install --save-dev @kubb/cli @kubb/core @kubb/plugin-oas @kubb/plugin-ts @kubb/plugin-client @kubb/plugin-mcp
```
