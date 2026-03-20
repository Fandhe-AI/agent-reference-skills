# Advanced Configuration Example

複数プラグインを組み合わせた高度な設定例。TypeScript 型、API クライアント、React Query hooks、Zod スキーマ、MSW ハンドラーを同時に生成する。

## kubb.config.ts

```typescript
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
    pluginOas({
      validate: true,
      collisionDetection: true,
    }),
    pluginTs({
      output: { path: './types' },
      enumType: 'asConst',
      dateType: 'date',
      unknownType: 'unknown',
      optionalType: 'questionTokenAndUndefined',
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
      infinite: {
        queryParam: 'page',
        initialPageParam: 0,
      },
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
      dateType: 'date',
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
    done: [
      'npm run typecheck',
      'biome format --write ./',
      'biome lint --fix --unsafe ./src',
    ],
  },
})
```

## 依存関係

```bash
npm install --save-dev @kubb/cli @kubb/core @kubb/plugin-oas @kubb/plugin-ts @kubb/plugin-client @kubb/plugin-react-query @kubb/plugin-zod @kubb/plugin-faker @kubb/plugin-msw
npm install @tanstack/react-query zod @faker-js/faker msw
```

## 生成されるディレクトリ構造

```
src/gen/
├── types/          ← TypeScript 型・インターフェース
├── clients/        ← Fetch ベース API クライアント（Zod パース付き）
├── hooks/          ← React Query hooks（Suspense・無限クエリ対応）
├── zod/            ← Zod バリデーションスキーマ
├── mocks/          ← Faker モックデータジェネレーター
├── msw/            ← MSW ハンドラー
│   └── handlers.ts ← 全ハンドラーの統合ファイル
└── index.ts        ← バレルエクスポート
```

## ポイント

- `parser: 'zod'`（client）— レスポンスを Zod スキーマでバリデーション
- `parser: 'faker'`（msw）— Faker でモックレスポンスを生成
- `collisionDetection: true` — スキーマ名の衝突を自動解決
- `hooks.done` — 生成後に型チェック・フォーマット・リントを実行
