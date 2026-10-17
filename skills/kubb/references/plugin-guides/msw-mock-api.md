# plugin-msw: Mock API

生成された MSW ハンドラーを設定し、テストまたはブラウザー worker に登録する。

## Signature / Usage

### Generate typed handlers

設定に `pluginTs` と `pluginMsw` を追加する。既定の `parser: 'data'` は、レスポンスデータを自分で与えるハンドラーを生成する。

```typescript
// kubb.config.ts
import { defineConfig } from 'kubb/config'
import { pluginTs } from '@kubb/plugin-ts'
import { pluginMsw } from '@kubb/plugin-msw'

export default defineConfig({
  input: './petStore.yaml',
  output: { path: './src/gen' },
  plugins: [
    pluginTs(),
    pluginMsw({ output: { path: 'handlers', mode: 'directory' }, baseURL: 'http://localhost:3000', handlers: true }),
  ],
})
```

### Supply test data

生成ハンドラーにレスポンスボディ、または `Response` を返すコールバックを渡す。

```typescript
// test-server.ts
import { setupServer } from 'msw/node'
import { getPetByIdHandler } from './src/gen/handlers/getPetByIdHandler'

export const server = setupServer(
  getPetByIdHandler({ name: 'Rex', photoUrls: [] }),
)
```

### Generate mock data

`pluginFaker` を追加し、MSW の [`parser`](https://kubb.dev/extensions/kubb-labs/plugin-msw/options#parser) を `'faker'` に変える。

```typescript
// kubb.config.ts
import { pluginTs } from '@kubb/plugin-ts'
import { pluginFaker } from '@kubb/plugin-faker'
import { pluginMsw } from '@kubb/plugin-msw'

const plugins = [
  pluginTs(),
  pluginFaker(),
  pluginMsw({
    output: { path: 'handlers', mode: 'directory' },
    baseURL: 'http://localhost:3000',
    parser: 'faker',
    handlers: true,
  }),
]
```

この配列を `defineConfig.plugins` として使う。`getPetByIdHandler()` をデータなしで呼ぶと、生成された Faker の値を使う。

### Register the handler collection

`handlers: true` のとき、`handlers.ts` が operation 順の全ハンドラーを持つ `handlers` 配列を export する。Node またはブラウザーで登録する:

```typescript
// test-server.ts
import { setupServer } from 'msw/node'
import { handlers } from './src/gen/handlers/handlers'

export const server = setupServer(...handlers)
```

```typescript
// browser-worker.ts
import { setupWorker } from 'msw/browser'
import { handlers } from './src/gen/handlers/handlers'

export const worker = setupWorker(...handlers)
```

## Notes

- Node テストでは、MSW が絶対 URL のリクエストをマッチできるよう `baseURL` をクライアントが呼ぶ URL に設定する。ブラウザーのハンドラーは現在の origin に対する相対パスを使える
- テストセットアップで `server.listen()`、ブラウザーエントリで `await worker.start()` を呼ぶ
- Source: https://kubb.dev/extensions/kubb-labs/plugin-msw/guides/mock-api （`@kubb/plugin-msw@5.1.3`）

## Related

- [plugin-msw](../plugins/plugin-msw.md)
- [plugin-faker](../plugins/plugin-faker.md)
