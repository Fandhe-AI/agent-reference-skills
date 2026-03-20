# Faker Example

OpenAPI 仕様から Faker.js モックデータジェネレーターを生成する設定例。

## kubb.config.ts

```typescript
import { defineConfig } from '@kubb/core'
import { pluginOas } from '@kubb/plugin-oas'
import { pluginTs } from '@kubb/plugin-ts'
import { pluginFaker } from '@kubb/plugin-faker'

export default defineConfig({
  input: { path: './petStore.yaml' },
  output: { path: './src/gen', clean: true },
  plugins: [
    pluginOas({ generators: [] }),
    pluginTs({ output: { path: 'models' } }),
    pluginFaker({
      output: { path: './mocks' },
      group: {
        type: 'tag',
        name: ({ group }) => `${group}Mocks`,
      },
      dateType: 'date',
      seed: [100],
    }),
  ],
})
```

## 依存関係

```bash
npm install --save-dev @kubb/cli @kubb/core @kubb/plugin-oas @kubb/plugin-ts @kubb/plugin-faker
npm install @faker-js/faker
```
