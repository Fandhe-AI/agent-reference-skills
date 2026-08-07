# Zod Schema Generation

OpenAPI 仕様から Zod バリデーションスキーマを生成するワークフロー。

```typescript
// kubb.config.ts
import { defineConfig } from 'kubb/config'
import { adapterOas } from '@kubb/adapter-oas'
import { pluginTs } from '@kubb/plugin-ts'
import { pluginZod } from '@kubb/plugin-zod'

export default defineConfig({
  input: { path: './petStore.yaml' },
  output: { path: './src/gen', clean: true },
  adapter: adapterOas({ dateType: 'stringOffset', unknownType: 'unknown' }),
  plugins: [
    pluginTs({ output: { path: 'models' } }),
    pluginZod({
      output: { path: './zod' },
      group: { type: 'tag', name: ({ group }) => `${group}Schemas` },
      inferred: true,
    }),
  ],
})
```

```bash
# インストール
npm install --save-dev kubb@beta @kubb/plugin-ts@beta @kubb/plugin-zod@beta
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

- `inferred: true`（旧 `typed`）を指定すると TypeScript 型アノテーション付きでスキーマが生成される（`pluginTs` が必要）
- v5 で Zod バージョン切替用の `version` オプションは廃止され、常に最新の Zod API 向けにスキーマを生成する
- `dateType` / `unknownType` は `pluginZod` 個別オプションから `adapter: adapterOas()` に集約された
- `printer` オプションでノードごとの出力を個別にカスタマイズできる（例: `integer()` を `z.number()` に固定）
