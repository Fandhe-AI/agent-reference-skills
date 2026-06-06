# Zod Schema Generation

OpenAPI 仕様から Zod バリデーションスキーマを生成するワークフロー。

```typescript
// kubb.config.ts
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
      group: { type: 'tag', name: ({ group }) => `${group}Schemas` },
      typed: true,
      dateType: 'stringOffset',
      unknownType: 'unknown',
      version: '4',
    }),
  ],
})
```

```bash
# インストール
npm install --save-dev @kubb/cli @kubb/core @kubb/plugin-oas @kubb/plugin-ts @kubb/plugin-zod
npm install zod
```

生成されたスキーマの使用例:

```typescript
import { petSchema } from './gen/zod'

const result = petSchema.safeParse(apiResponse)
if (result.success) {
  console.log(result.data.name)
}
```

## Notes

- `typed: true` を指定すると TypeScript 型アノテーション付きでスキーマが生成される（`pluginTs` が必要）
- `version: '4'` で Zod v4 用のスキーマを生成する（デフォルトは `'3'`）
- `dateType: 'stringOffset'` は `z.string().datetime({ offset: true })` を生成する
- `wrapOutput` でスキーマに `.openapi()` などの後処理を追加できる
