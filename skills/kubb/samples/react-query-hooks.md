# React Query Hooks Generation

OpenAPI 仕様から TanStack Query（React Query）hooks を生成するワークフロー。

```typescript
// kubb.config.ts
import { defineConfig } from '@kubb/core'
import { pluginOas } from '@kubb/plugin-oas'
import { pluginTs } from '@kubb/plugin-ts'
import { pluginReactQuery } from '@kubb/plugin-react-query'

export default defineConfig({
  input: { path: './petStore.yaml' },
  output: { path: './src/gen', clean: true },
  plugins: [
    pluginOas({ generators: [] }),
    pluginTs({ output: { path: 'models' } }),
    pluginReactQuery({
      output: { path: './hooks' },
      group: { type: 'tag', name: ({ group }) => `${group}Hooks` },
      client: { dataReturnType: 'data' },
      query: { methods: ['get'] },
      mutation: { methods: ['post', 'put', 'delete'] },
    }),
  ],
})
```

```bash
# インストール
npm install --save-dev @kubb/cli @kubb/core @kubb/plugin-oas @kubb/plugin-ts @kubb/plugin-react-query
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

- `pluginTs` を `pluginReactQuery` より前に配置する（型定義に依存するため）
- `group: { type: 'tag' }` でタグごとにファイルをグループ化できる
- `query.methods: ['get']` で GET のみ `useQuery` hooks を生成し、それ以外は `useMutation` となる
- Suspense Query を使う場合は `suspense: {}` を追加する
