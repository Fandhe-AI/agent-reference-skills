# React Query Example

OpenAPI 仕様から React Query（TanStack Query）hooks を生成する設定例。

## kubb.config.ts

```typescript
import { defineConfig } from '@kubb/core'
import { pluginOas } from '@kubb/plugin-oas'
import { pluginTs } from '@kubb/plugin-ts'
import { pluginReactQuery } from '@kubb/plugin-react-query'
import { QueryKey } from '@kubb/plugin-react-query/components'

export default defineConfig({
  input: { path: './petStore.yaml' },
  output: { path: './src/gen', clean: true },
  plugins: [
    pluginOas({ generators: [] }),
    pluginTs({ output: { path: 'models' } }),
    pluginReactQuery({
      client: { bundle: true },
      output: { path: './hooks' },
      group: { type: 'path' },
      paramsType: 'inline',
      pathParamsType: 'object',
      suspense: {},
      transformers: {
        name: (name, type) => {
          if (type === 'file' || type === 'function') {
            return `${name}Hook`
          }
          return name
        },
      },
      queryKey(props) {
        const keys = QueryKey.getTransformer(props)
        return ['"v5"', ...keys]
      },
      override: [
        {
          type: 'operationId',
          pattern: 'findPetsByTags',
          options: {
            client: { dataReturnType: 'full' },
            infinite: {
              queryParam: 'pageSize',
              initialPageParam: 0,
            },
          },
        },
      ],
    }),
  ],
})
```

## 依存関係

```bash
npm install --save-dev @kubb/cli @kubb/core @kubb/plugin-oas @kubb/plugin-ts @kubb/plugin-react-query
npm install @tanstack/react-query
```

## 生成コードの使用例

```typescript
import { useGetPetByIdHook } from './gen/hooks'

function PetDetail({ petId }: { petId: number }) {
  const { data: pet } = useGetPetByIdHook({ petId })
  return <div>{pet?.name}</div>
}
```
