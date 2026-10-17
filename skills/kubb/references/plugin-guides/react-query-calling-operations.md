# plugin-react-query: Calling operations

`@kubb/plugin-react-query` は operation ごとに型付き TanStack Query フックを生成できる。`GET` は `useGetPetById` のような query フック、`POST` / `PUT` / `PATCH` / `DELETE` は `useDeletePet` のような mutation フック。各フックは `@kubb/plugin-fetch` / `@kubb/plugin-axios` / `@kubb/plugin-client` のクライアント関数を呼ぶ。

## Signature / Usage

### Queries

query フックは operation のグループ化リクエスト設定（`path` / `query` / `headers` のうち宣言されたもの）を第 1 引数に取り、TanStack の `UseQueryResult` を返す:

```typescript
import { useGetPetById } from './gen/hooks/useGetPetById'

const { data, error, isLoading } = useGetPetById({ path: { petId: 1n } })
```

第 2 引数は 2 つの任意グループ。`query` は任意の TanStack Query オプション、`query.client` は使う `QueryClient`。トップレベルの `client` はこの呼び出し用のリクエスト設定（`baseURL` / `signal` 等）:

```typescript
useGetPetById(
  { path: { petId: 1n } },
  {
    query: { staleTime: 60_000 },
    client: { baseURL: 'https://api.example.com/v1' },
  },
)
```

### Factories

query operation は `queryOptions` ファクトリと `queryKey` ヘルパーも export する。フック外での prefetch / invalidate に使う。キーは operation URL と path パラメーターに、あれば query / body の値が続く:

```typescript
import { useQueryClient } from '@tanstack/react-query'
import { getPetByIdQueryKey, getPetByIdQueryOptions } from './gen/hooks/useGetPetById'

const queryClient = useQueryClient()

await queryClient.prefetchQuery(getPetByIdQueryOptions({ path: { petId: 1n } }))
queryClient.invalidateQueries({ queryKey: getPetByIdQueryKey({ path: { petId: 1n } }) })
```

### Mutations

mutation フックはオプションオブジェクトのみを取る。グループ化リクエスト設定が mutation variable なので `mutate` / `mutateAsync` に渡す。各 mutation は `mutationOptions` ファクトリと `mutationKey` ヘルパーも export する:

```typescript
import { useDeletePet } from './gen/hooks/useDeletePet'

const { mutate } = useDeletePet({
  mutation: { onSuccess: () => queryClient.invalidateQueries() },
})

mutate({ path: { petId: 1n } })
```

### Customize cache keys

プラグインの `queryKey` で生成キーを変える。文字列エントリはソースコードとして出力されるため、文字列リテラルには `JSON.stringify` を使う:

```typescript
import { pluginReactQuery } from '@kubb/plugin-react-query'

pluginReactQuery({
  queryKey: ({ node }) => [JSON.stringify(node.operationId)],
})
```

### Load more pages

operation が宣言する query parameter・初期値・次カーソルの response path で `infinite` を設定する。`hooks: true` が必要で、`queryParam` を宣言する operation にのみ適用される:

```typescript
pluginReactQuery({
  hooks: true,
  infinite: {
    queryParam: 'page',
    initialPageParam: 0,
    nextParam: 'pagination.next.cursor',
  },
})
```

```typescript
import { useInfiniteQuery } from '@tanstack/react-query'
import { findPetsByTagsInfiniteQueryOptions } from './gen/hooks/useFindPetsByTagsInfinite'

const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
  findPetsByTagsInfiniteQueryOptions({ query: { tags: ['dog'] } }),
)
```

### Use suspense

`suspense: {}` と `hooks: true` で、通常フックと並んで suspense フックを生成する:

```typescript
pluginReactQuery({ hooks: true, suspense: {} })
```

```typescript
import { useGetPetByIdSuspense } from './gen/hooks/useGetPetByIdSuspense'

const { data } = useGetPetByIdSuspense({ path: { petId: 1n } })
```

### Share hook options

[`customOptions`](https://kubb.dev/extensions/kubb-labs/plugin-react-query/options#customoptions) で、全生成フックから 1 つの options 関数を呼ぶ:

```typescript
pluginReactQuery({
  hooks: true,
  customOptions: {
    importPath: './useCustomHookOptions',
    name: 'useCustomHookOptions',
  },
})
```

関数は `importPath`（生成フックフォルダー基準。ここでは `src/gen/hooks/useCustomHookOptions.ts`）に作る。各フックは `{ hookName, operationId }` を渡す。生成 barrel は `HookOptions` を re-export する:

```typescript
import type { HookOptions } from './HookOptions'

export function useCustomHookOptions(
  { hookName }: { hookName: keyof HookOptions; operationId: string },
) {
  if (hookName === 'useGetPetById') {
    return { staleTime: 60_000 } satisfies HookOptions['useGetPetById']
  }
  return {}
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `hooks` | `boolean` | `true` で `use*` フックを生成（既定は factory ヘルパー `queryOptions` / `mutationOptions` / `queryKey` / `mutationKey` のみ） |
| `queryKey` | `({ node }) => Array` | 生成 query key のカスタマイズ |
| `infinite` | `{ queryParam, initialPageParam, nextParam }` | infinite query の設定（`hooks: true` 必須） |
| `suspense` | `{}` | suspense フック生成（`hooks: true` 必須、TanStack Query v5 以上） |
| `customOptions` | `{ importPath, name }` | 全フック共通の options 関数 |

## Notes

- 既定ではフックは生成されず factory ヘルパーのみ。`use*` フックが必要なら `hooks: true`（原文 IMPORTANT）
- 各生成フックは client 関数を `throwOnError: true` で呼ぶ。失敗は TanStack Query の `error` に入り、型は spec のエラーレスポンスから付く。base URL・認証・interceptor・serialization・検証は client プラグイン側で設定する（plugin-client の場合は自前 client モジュール）
- `queryKey` の例は全呼び出しに同一キー（例 `['getUserByName']`）を与える。path / query の値で取得データが変わる場合はキーに加える（原文 WARNING）
- `nextParam` はドット記法またはキー配列。API のレスポンスに合わせて変える。`getNextPageParam` / `nextParam` / `cursorParam` がなければ、空配列を返すまでページ番号を増やす
- フック単位の query オプションは共有 options を上書きする
- Source: https://kubb.dev/extensions/kubb-labs/plugin-react-query/guides/calling-operations （`@kubb/plugin-react-query@5.5.3`）

## Related

- [plugin-react-query](../plugins/plugin-react-query.md)
- [vue-query-calling-operations](./vue-query-calling-operations.md)
- [swr-calling-operations](./swr-calling-operations.md)
- [fetch-calling-operations](./fetch-calling-operations.md)
- [axios-calling-operations](./axios-calling-operations.md)
