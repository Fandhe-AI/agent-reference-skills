# API Client Generation

OpenAPI 仕様から Axios または Fetch ベースの型安全な API クライアントを生成するワークフロー。

```typescript
// kubb.config.ts（Fetch クライアント例）
import { defineConfig } from 'kubb/config'
import { pluginTs } from '@kubb/plugin-ts'
import { pluginFetch } from '@kubb/plugin-fetch'

export default defineConfig({
  input: { path: './petStore.yaml' },
  output: { path: './src/gen', clean: true },
  plugins: [
    pluginTs({
      output: { path: 'models' },
    }),
    pluginFetch({
      output: { path: './clients', mode: 'directory' },
      baseURL: 'https://petstore.swagger.io/v2',
      group: { type: 'tag', name: ({ group }) => `${group}Service` },
    }),
  ],
})
```

Axios を使う場合は `pluginFetch` を `pluginAxios` に差し替えるだけでよい（他の設定はそのまま）:

```typescript
// kubb.config.ts（Axios クライアント例）
import { defineConfig } from 'kubb/config'
import { pluginTs } from '@kubb/plugin-ts'
import { pluginAxios } from '@kubb/plugin-axios'

export default defineConfig({
  input: { path: './petStore.yaml' },
  output: { path: './src/gen', clean: true },
  plugins: [
    pluginTs({
      output: { path: 'models' },
    }),
    pluginAxios({
      output: { path: './clients', mode: 'directory' },
      baseURL: 'https://petstore.swagger.io/v2',
      group: { type: 'tag', name: ({ group }) => `${group}Service` },
    }),
  ],
})
```

```bash
# インストール（Fetch の場合）
npm install --save-dev kubb@beta @kubb/plugin-ts@beta @kubb/plugin-fetch@beta

# Axios の場合
npm install --save-dev kubb@beta @kubb/plugin-ts@beta @kubb/plugin-axios@beta
npm install axios
```

生成されたクライアントの使用例:

```typescript
import { getPetById } from './gen/clients/PetService'

const pet = await getPetById({ petId: 1 })
console.log(pet.name)
```

## Notes

- v5 では旧 `@kubb/plugin-client`（`client: 'fetch' | 'axios'` で切替）が `@kubb/plugin-fetch` と `@kubb/plugin-axios` に分割された。用途に応じてどちらか一方をインストールする
- レスポンスを Zod でバリデーションしたい場合は `validator: 'zod'` を追加し、`pluginZod` をあわせて登録する（未登録のまま `validator: 'zod'` を指定するとビルドエラーになる）
- `pluginReactQuery` 等と組み合わせる場合は `client: 'fetch'` のように文字列でクライアントプラグインを指定する（v4 までのオブジェクト指定 `client: { dataReturnType }` は廃止）
- 旧 `clientType` は `sdk`（`{ mode: 'tag' | 'flat'; name? }`）に、旧 `parser` は `validator` にリネームされた
- `group: { type: 'tag' }` でタグごとにサービスクラス/ファイルを分割できる
- 執筆時点で `@kubb/plugin-axios` / `@kubb/plugin-fetch` は `@beta` タグでの配布（v5 系）
