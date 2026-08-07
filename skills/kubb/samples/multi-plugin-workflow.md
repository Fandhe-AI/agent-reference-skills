# Multi-Plugin Workflow

複数プラグインを組み合わせて TypeScript 型・API クライアント・React Query hooks・Zod スキーマ・MSW ハンドラーを同時生成するフルスタック構成。

```typescript
// kubb.config.ts
import { defineConfig } from 'kubb/config'
import { adapterOas } from '@kubb/adapter-oas'
import { pluginTs } from '@kubb/plugin-ts'
import { pluginFetch } from '@kubb/plugin-fetch'
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
  adapter: adapterOas({
    validate: true,
    dateType: 'stringOffset',
    unknownType: 'unknown',
  }),
  plugins: [
    pluginTs({
      output: { path: './types' },
      enum: { type: 'asConst' },
    }),
    pluginFetch({
      output: { path: './clients' },
      group: { type: 'tag' },
      validator: 'zod',
    }),
    pluginReactQuery({
      output: { path: './hooks' },
      group: { type: 'tag' },
      client: 'fetch',
      suspense: {},
    }),
    pluginZod({
      output: { path: './zod' },
      group: { type: 'tag' },
      inferred: true,
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
├── clients/    ← Fetch ベース API クライアント（Zod バリデーション付き）
├── hooks/      ← React Query hooks（Suspense 対応）
├── zod/        ← Zod バリデーションスキーマ
├── mocks/      ← Faker モックデータジェネレーター
├── msw/        ← MSW ハンドラー
│   └── handlers.ts
└── index.ts    ← バレルエクスポート
```

## Notes

- プラグインの順序は `pluginTs` → クライアント系（`pluginFetch` / `pluginAxios`）→ その他の順を守る。v5 で `pluginOas` は廃止され、パース・バリデーションはトップレベルの `adapter: adapterOas()` が担う
- `dateType` / `unknownType` / `enumSuffix` は v5 でプラグイン個別オプションから `adapterOas()` に集約された。旧 `pluginOas` にあった `collisionDetection` は `adapterOas` の options 一覧に存在しない。命名衝突が疑われる場合は各プラグインの `resolver` で個別に名前解決する
- `hooks.done` で生成後に任意のシェルコマンドを実行できる
- `pluginFetch` の `validator: 'zod'`（旧 `parser: 'zod'`）は `pluginZod` と組み合わせてレスポンスを自動バリデーションする
- `pluginZod` の旧 `typed` は `inferred` に改称され、Zod バージョン切替用の `version` オプションは廃止された（常に最新の Zod API 向けに生成）
- `pluginReactQuery` の `client` は `'fetch'` / `'axios'` の文字列で対応クライアントプラグインを指定する
