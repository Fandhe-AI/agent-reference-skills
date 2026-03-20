# TypeScript Example

OpenAPI 仕様から TypeScript 型を生成する設定例。複数の enum スタイルと出力形式を示す。

## kubb.config.ts

```typescript
import { defineConfig } from '@kubb/core'
import { pluginOas } from '@kubb/plugin-oas'
import { pluginTs } from '@kubb/plugin-ts'

export default defineConfig([
  // 基本: 単一ファイルに interface で出力
  {
    input: { path: './petStore.yaml' },
    output: { path: './src/gen', clean: true },
    plugins: [
      pluginOas({ validate: false }),
      pluginTs({
        output: { path: 'models.ts', barrelType: false },
        syntaxType: 'interface',
        enumType: 'enum',
      }),
    ],
  },
  // タグでグループ化、asConst enum
  {
    input: { path: './petStore.yaml' },
    output: { path: './src/gen2' },
    plugins: [
      pluginOas({ validate: false }),
      pluginTs({
        output: { path: 'models' },
        group: { type: 'tag' },
        enumType: 'asConst',
      }),
    ],
  },
])
```

## 依存関係

```bash
npm install --save-dev @kubb/cli @kubb/core @kubb/plugin-oas @kubb/plugin-ts
```

## enumType の比較

| 設定 | 出力例 |
|------|--------|
| `'enum'` | `enum Status { Active = 'active' }` |
| `'asConst'` | `const status = { Active: 'active' } as const` |
| `'asPascalConst'` | `const Status = { Active: 'active' } as const` |
| `'constEnum'` | `const enum Status { Active = 'active' }` |
| `'literal'` | `type Status = 'active' \| 'inactive'` |
