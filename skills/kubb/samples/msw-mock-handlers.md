# MSW Mock Handlers Generation

OpenAPI 仕様から MSW（Mock Service Worker）ハンドラーと Faker モックデータを生成するワークフロー。

```typescript
// kubb.config.ts
import { defineConfig } from 'kubb/config'
import { adapterOas } from '@kubb/adapter-oas'
import { pluginTs } from '@kubb/plugin-ts'
import { pluginFaker } from '@kubb/plugin-faker'
import { pluginMsw } from '@kubb/plugin-msw'

export default defineConfig({
  input: './petStore.yaml',
  output: { path: './src/gen', clean: true },
  adapter: adapterOas({ dateType: 'date' }),
  plugins: [
    pluginTs({ output: { path: 'models' } }),
    pluginFaker({
      output: { path: './mocks' },
      group: { type: 'tag', name: ({ group }) => `${group}Mocks` },
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
npm install --save-dev kubb @kubb/plugin-ts @kubb/plugin-faker @kubb/plugin-msw
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
- `dateType` は v5 でプラグイン個別オプションから `adapter: adapterOas({ dateType })` に集約された（`pluginFaker` / `pluginTs` / `pluginZod` 個別のオプションではなくなった）
- `handlers: true` で全エンドポイントを統合した `handlers.ts` を生成する
- `seed` を固定するとテスト実行ごとに同じモックデータが生成される
- `parser: 'data'`（デフォルト）はハンドラーに渡したデータをそのまま返す（型は `@kubb/plugin-ts` の型）。`parser: 'faker'` は `data` が `undefined` / `null` のとき `@kubb/plugin-faker` の値にフォールバックする
