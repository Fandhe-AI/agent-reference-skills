# Zod Example

OpenAPI 仕様から Zod バリデーションスキーマを生成する設定例。

## kubb.config.ts

```typescript
import { defineConfig } from '@kubb/core'
import { pluginOas } from '@kubb/plugin-oas'
import { pluginTs } from '@kubb/plugin-ts'
import { pluginZod } from '@kubb/plugin-zod'

export default defineConfig({
  input: { path: './petStore.yaml' },
  output: { path: './src/gen', clean: true },
  plugins: [
    pluginOas({ generators: [] }),
    pluginTs({ output: { path: 'models' } }),
    pluginZod({
      output: { path: './zod' },
      group: {
        type: 'tag',
        name: ({ group }) => `${group}Schemas`,
      },
      typed: true,
      dateType: 'stringOffset',
      unknownType: 'unknown',
    }),
  ],
})
```

## 依存関係

```bash
npm install --save-dev @kubb/cli @kubb/core @kubb/plugin-oas @kubb/plugin-ts @kubb/plugin-zod
npm install zod
```

## 生成コードの使用例

```typescript
import { petSchema } from './gen/zod'

const result = petSchema.safeParse(apiResponse)
if (result.success) {
  console.log(result.data.name)
}
```
