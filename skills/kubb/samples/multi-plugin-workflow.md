# Multi-Plugin Workflow

複数プラグインを組み合わせて TypeScript 型・API クライアント・React Query hooks・Zod スキーマ・MSW ハンドラーを同時生成するフルスタック構成。

```typescript
// kubb.config.ts
import { defineConfig } from '@kubb/core'
import { pluginOas } from '@kubb/plugin-oas'
import { pluginTs } from '@kubb/plugin-ts'
import { pluginClient } from '@kubb/plugin-client'
import { pluginReactQuery } from '@kubb/plugin-react-query'
import { pluginZod } from '@kubb/plugin-zod'
import { pluginFaker } from '@kubb/plugin-faker'
import { pluginMsw } from '@kubb/plugin-msw'

export default defineConfig({
  input: { path: './petStore.yaml' },
  output: {
    path: './src/gen',
    clean: true,
    barrelType: 'named',
  },
  plugins: [
    pluginOas({ validate: true, collisionDetection: true }),
    pluginTs({
      output: { path: './types' },
      enumType: 'asConst',
      dateType: 'date',
      unknownType: 'unknown',
    }),
    pluginClient({
      output: { path: './clients' },
      client: 'fetch',
      group: { type: 'tag' },
      parser: 'zod',
    }),
    pluginReactQuery({
      output: { path: './hooks' },
      group: { type: 'tag' },
      suspense: {},
    }),
    pluginZod({
      output: { path: './zod' },
      group: { type: 'tag' },
      typed: true,
      dateType: 'stringOffset',
    }),
    pluginFaker({
      output: { path: './mocks' },
      group: { type: 'tag' },
      seed: [42],
    }),
    pluginMsw({
      output: { path: './msw' },
      group: { type: 'tag' },
      handlers: true,
      parser: 'faker',
    }),
  ],
  hooks: {
    done: ['npm run typecheck'],
  },
})
```

生成されるディレクトリ構造:

```
src/gen/
├── types/      ← TypeScript 型
├── clients/    ← Fetch ベース API クライアント（Zod パース付き）
├── hooks/      ← React Query hooks（Suspense 対応）
├── zod/        ← Zod バリデーションスキーマ
├── mocks/      ← Faker モックデータジェネレーター
├── msw/        ← MSW ハンドラー
│   └── handlers.ts
└── index.ts    ← バレルエクスポート
```

## Notes

- プラグインの順序は `pluginOas` → `pluginTs` → その他の順を守る
- `collisionDetection: true` でスキーマ名の衝突を自動解決する
- `hooks.done` で生成後に任意のシェルコマンドを実行できる
- `pluginClient` の `parser: 'zod'` は `pluginZod` と組み合わせてレスポンスを自動バリデーションする
