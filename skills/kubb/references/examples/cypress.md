# Cypress Example

OpenAPI 仕様から Cypress リクエスト定義を生成する設定例。

## kubb.config.ts

```typescript
import { defineConfig } from '@kubb/core'
import { pluginOas } from '@kubb/plugin-oas'
import { pluginTs } from '@kubb/plugin-ts'
import { pluginCypress } from '@kubb/plugin-cypress'

export default defineConfig({
  input: { path: './petStore.yaml' },
  output: { path: './src/gen', clean: true },
  plugins: [
    pluginOas(),
    pluginTs({ output: { path: 'models' } }),
    pluginCypress({
      output: { path: './cypress' },
      group: {
        type: 'tag',
        name: ({ group }) => `${group}Requests`,
      },
    }),
  ],
})
```

## 依存関係

```bash
npm install --save-dev @kubb/cli @kubb/core @kubb/plugin-oas @kubb/plugin-ts @kubb/plugin-cypress cypress
```
