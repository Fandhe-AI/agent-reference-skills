# React Query Hooks Generation

OpenAPI 仕様から TanStack Query（React Query）hooks を生成するワークフロー。

```typescript
// kubb.config.ts
import { defineConfig } from 'kubb/config'
import { pluginTs } from '@kubb/plugin-ts'
import { pluginFetch } from '@kubb/plugin-fetch'
import { pluginReactQuery } from '@kubb/plugin-react-query'

export default defineConfig({
  input: { path: './petStore.yaml' },
  output: { path: './src/gen', clean: true },
  plugins: [
    pluginTs({ output: { path: 'models' } }),
    pluginFetch({ output: { path: './clients' } }),
    pluginReactQuery({
      output: { path: './hooks' },
      group: { type: 'tag', name: ({ group }) => `${group}Hooks` },
      client: 'fetch',
      query: { methods: ['GET'] },
      mutation: { methods: ['POST', 'PUT', 'DELETE'] },
    }),
  ],
})
```

```bash
# インストール
npm install --save-dev kubb@beta @kubb/plugin-ts@beta @kubb/plugin-fetch@beta @kubb/plugin-react-query@beta
npm install @tanstack/react-query
```

生成された hooks の使用例:

```typescript
import { useGetPetById } from './gen/hooks'

function PetDetail({ petId }: { petId: number }) {
  const { data: pet } = useGetPetById({ petId })
  return <div>{pet?.name}</div>
}
```

## Notes

- `pluginTs` → `pluginFetch`（または `pluginAxios`）→ `pluginReactQuery` の順に配置する（型定義とクライアント関数に依存するため）
- v5 の `pluginReactQuery` は `client: 'fetch'` / `'axios'` の文字列でクライアントプラグインを選択する（v4 までのオブジェクト指定 `client: { dataReturnType }` は廃止）
- `group: { type: 'tag' }` でタグごとにファイルをグループ化できる
- `query.methods: ['GET']` で GET のみ `useQuery` hooks を生成し、それ以外は `useMutation` となる
- Suspense Query を使う場合は `suspense: {}` を追加する
