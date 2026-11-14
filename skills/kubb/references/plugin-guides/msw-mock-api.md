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

`pluginFaker` を追加し、MSW の [`parser`](https://kubb.dev/extensions/kubb-labs/plugin-msw/options#parser) を `'faker'` に変える。Faker が `bigint` で生成する `int64` フィールドは、ハンドラーが JSON number として送信する。安全な整数範囲外の値は精度を失わず throw する。

```typescript
// kubb.config.ts
import { defineConfig } from 'kubb/config'
import { pluginTs } from '@kubb/plugin-ts'
import { pluginFaker } from '@kubb/plugin-faker'
import { pluginMsw } from '@kubb/plugin-msw'

export default defineConfig({
  input: './petStore.yaml',
  output: { path: './src/gen' },
  plugins: [
    pluginTs(),
    pluginFaker(),
    pluginMsw({
      output: { path: 'handlers', mode: 'directory' },
      baseURL: 'http://localhost:3000',
      parser: 'faker',
      handlers: true,
    }),
  ],
})
```

`getPetByIdHandler()` をデータなしで呼ぶと、生成された Faker の値を使う。

### Register the handler collection

`handlers: true` のとき、`handlers.ts` が operation 順の全ハンドラーを持つ `handlers` 配列と `createHandlers` を export する。Node またはブラウザーで登録する:

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

### Set the base URL at runtime

`baseURL` オプションは Kubb がハンドラーを生成する時点で固定される。ホストが実行時にしか分からない場合（API クライアントの設定から取る等）は `createHandlers` に渡す:

```typescript
// test-server.ts
import { setupServer } from 'msw/node'
import { createHandlers } from './src/gen/handlers/handlers'

export const server = setupServer(...createHandlers({ baseURL: getBaseURL() }))
```

各ハンドラーも第 2 引数に `{ baseURL }` を取り、そのハンドラーのみ設定済みのものを上書きする。第 1 引数に `undefined` を渡すと既定レスポンスのまま。これで同じパスを持つ 2 つのサービスをモックできる:

```typescript
// test-server.ts
export const server = setupServer(
  listPetsHandler(undefined, { baseURL: 'https://pets.example.com' }),
  listPetsHandler(undefined, { baseURL: 'https://staging.example.com' }),
)
```

## Notes

- Node テストでは、MSW が絶対 URL のリクエストをマッチできるよう `baseURL` をクライアントが呼ぶ URL に設定する。ブラウザーのハンドラーは現在の origin に対する相対パスを使える
- テストセットアップで `server.listen()`、ブラウザーエントリで `await worker.start()` を呼ぶ
- Source: https://kubb.dev/extensions/kubb-labs/plugin-msw/guides/mock-api （`@kubb/plugin-msw@6.2.1`、取得日 2026-11-14）
- Migration (5 → 6): plugin-msw 6 generates handlers for MSW 3 (`msw@^3.0.0`, imports from `msw/http`, returns `HttpResponse`); regenerate the handlers after upgrading (see plugin-msw Notes)

## Related

- [plugin-msw](../plugins/plugin-msw.md)
- [plugin-faker](../plugins/plugin-faker.md)
