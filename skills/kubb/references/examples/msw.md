# MSW Example

OpenAPI 仕様から MSW（Mock Service Worker）ハンドラーを生成する設定例。

## kubb.config.ts

```typescript
import { defineConfig } from '@kubb/core'
import { pluginOas } from '@kubb/plugin-oas'
import { pluginTs } from '@kubb/plugin-ts'
import { pluginFaker } from '@kubb/plugin-faker'
import { pluginMsw } from '@kubb/plugin-msw'

export default defineConfig({
  input: { path: './petStore.yaml' },
  output: { path: './src/gen', clean: true },
  plugins: [
    pluginOas({ generators: [] }),
    pluginTs({ output: { path: 'models' } }),
    pluginFaker({ output: { path: './mocks' } }),
    pluginMsw({
      output: { path: './msw' },
      group: {
        type: 'tag',
        name: ({ group }) => `${group}Handlers`,
      },
      handlers: true,
      parser: 'faker',
    }),
  ],
})
```

## 依存関係

```bash
npm install --save-dev @kubb/cli @kubb/core @kubb/plugin-oas @kubb/plugin-ts @kubb/plugin-faker @kubb/plugin-msw
npm install msw @faker-js/faker
```
