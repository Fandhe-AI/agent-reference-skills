# API Client Generation

OpenAPI 仕様から Axios または Fetch ベースの型安全な API クライアントを生成するワークフロー。

```typescript
// kubb.config.ts（Fetch クライアント例）
import { defineConfig } from '@kubb/core'
import { pluginOas } from '@kubb/plugin-oas'
import { pluginTs } from '@kubb/plugin-ts'
import { pluginClient } from '@kubb/plugin-client'

export default defineConfig({
  input: { path: './petStore.yaml' },
  output: { path: './src/gen', clean: true },
  plugins: [
    pluginOas({ generators: [] }),
    pluginTs({
      output: { path: 'models' },
      enumType: 'asConst',
    }),
    pluginClient({
      output: { path: './clients' },
      client: 'fetch',
      group: { type: 'tag', name: ({ group }) => `${group}Service` },
      dataReturnType: 'data',
      pathParamsType: 'object',
    }),
  ],
})
```

```bash
# インストール（Fetch の場合）
npm install --save-dev @kubb/cli @kubb/core @kubb/plugin-oas @kubb/plugin-ts @kubb/plugin-client

# Axios を使う場合は axios も追加
npm install axios
```

生成されたクライアントの使用例:

```typescript
import { getPetById } from './gen/clients/PetService'

const pet = await getPetById({ petId: 1 })
console.log(pet.name)
```

## Notes

- `client: 'fetch'` で Fetch API、`client: 'axios'` で Axios ベースのコードを生成する
- `pluginReactQuery` と組み合わせる場合は `clientType: 'function'`（デフォルト）のままにする
- `group: { type: 'tag' }` でタグごとにサービスクラス/ファイルを分割できる
- `parser: 'zod'` を指定するとレスポンスを Zod スキーマで自動バリデーションする
