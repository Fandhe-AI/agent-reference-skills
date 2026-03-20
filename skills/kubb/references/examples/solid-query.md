# Solid Query Example

OpenAPI 仕様から Solid Query hooks を生成する設定例。

## kubb.config.ts

```typescript
import { defineConfig } from '@kubb/core'
import { pluginOas } from '@kubb/plugin-oas'
import { pluginTs } from '@kubb/plugin-ts'
import { pluginSolidQuery } from '@kubb/plugin-solid-query'

export default defineConfig({
  input: { path: './petStore.yaml' },
  output: { path: './src/gen', clean: true },
  plugins: [
    pluginOas({ generators: [] }),
    pluginTs({ output: { path: 'models' } }),
    pluginSolidQuery({
      output: { path: './hooks' },
      group: {
        type: 'tag',
        name: ({ group }) => `${group}Hooks`,
      },
    }),
  ],
})
```

## 依存関係

```bash
npm install --save-dev @kubb/cli @kubb/core @kubb/plugin-oas @kubb/plugin-ts @kubb/plugin-solid-query
npm install @tanstack/solid-query
```
