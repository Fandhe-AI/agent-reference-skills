# React Query Hooks Generation

OpenAPI 仕様から TanStack Query（React Query）hooks を生成するワークフロー。

```typescript
// kubb.config.ts
import { defineConfig } from 'kubb/config'
import { pluginTs } from '@kubb/plugin-ts'
import { pluginFetch } from '@kubb/plugin-fetch'
import { pluginReactQuery } from '@kubb/plugin-react-query'

export default defineConfig({
  input: './petStore.yaml',
  output: { path: './src/gen', clean: true },
  plugins: [
    pluginTs({ output: { path: 'models' } }),
    pluginFetch({ output: { path: './clients' } }),
    pluginReactQuery({
      output: { path: './hooks' },
      group: { type: 'tag', name: ({ group }) => `${group}Hooks` },
      client: 'fetch',
      hooks: true,
      query: { methods: ['GET'] },
      mutation: { methods: ['POST', 'PUT', 'DELETE'] },
    }),
  ],
})
```

```bash
# インストール
npm install --save-dev kubb @kubb/plugin-ts @kubb/plugin-fetch @kubb/plugin-react-query
npm install @tanstack/react-query
```

生成された hooks の使用例:

```typescript
import { useGetPetById } from './gen/hooks'

function PetDetail({ petId }: { petId: number }) {
  const { data: pet } = useGetPetById({ path: { petId } })
  return <div>{pet?.name}</div>
}
```

## Notes

- `pluginTs` → `pluginFetch`（または `pluginAxios`）→ `pluginReactQuery` の順に配置する（型定義とクライアント関数に依存するため）
- v5 の `pluginReactQuery` は `client: 'fetch'` / `'axios'` の文字列でクライアントプラグインを選択する（v4 までのオブジェクト指定 `client: { dataReturnType }` は廃止）
- v5 では `hooks` の既定が `false`（`queryOptions` / `mutationOptions` ファクトリとキーのみ生成）。`use*` hooks が必要なため `hooks: true` を指定している。hooks のパラメーターは `{ path, query, body, headers }` にグループ化される
- `query.methods` の既定は `['GET', 'QUERY']`。上書きする場合に `'QUERY'` を外すと QUERY operation は生成されない
- `group: { type: 'tag' }` でタグごとにファイルをグループ化できる
- `query.methods: ['GET']` で GET のみ `useQuery` hooks を生成し、それ以外は `useMutation` となる
- Suspense Query を使う場合は `suspense: {}` を追加する
