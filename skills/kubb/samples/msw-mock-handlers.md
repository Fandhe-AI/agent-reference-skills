# MSW Mock Handlers Generation

OpenAPI 仕様から MSW（Mock Service Worker）ハンドラーと Faker モックデータを生成するワークフロー。

```typescript
// kubb.config.ts
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
    pluginFaker({
      output: { path: './mocks' },
      group: { type: 'tag', name: ({ group }) => `${group}Mocks` },
      dateType: 'date',
      seed: [42],
    }),
    pluginMsw({
      output: { path: './msw' },
      group: { type: 'tag', name: ({ group }) => `${group}Handlers` },
      handlers: true,
      parser: 'faker',
    }),
  ],
})
```

```bash
# インストール
npm install --save-dev @kubb/cli @kubb/core @kubb/plugin-oas @kubb/plugin-ts @kubb/plugin-faker @kubb/plugin-msw
npm install msw @faker-js/faker
```

生成されたハンドラーの使用例:

```typescript
// src/mocks/browser.ts
import { setupWorker } from 'msw/browser'
import { handlers } from '../gen/msw/handlers'

export const worker = setupWorker(...handlers)
```

## Notes

- `pluginFaker` を `pluginMsw` より前に配置する（`parser: 'faker'` 時に Faker の出力を参照するため）
- `handlers: true` で全エンドポイントを統合した `handlers.ts` を生成する
- `seed` を固定するとテスト実行ごとに同じモックデータが生成される
- `parser: 'data'`（デフォルト）は空レスポンスを返す最小ハンドラーを生成する
