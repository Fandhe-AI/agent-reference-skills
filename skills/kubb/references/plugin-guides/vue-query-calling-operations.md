# plugin-vue-query: Calling operations

`@kubb/plugin-vue-query` は operation ごとに型付き TanStack Query composable を生成できる。`GET` は `useGetPetById` のような query composable、`POST` / `PUT` / `PATCH` / `DELETE` は `useUpdatePetWithForm` のような mutation composable。各 composable は `@kubb/plugin-fetch` / `@kubb/plugin-axios` / `@kubb/plugin-client` のクライアント関数を呼ぶ。

## Signature / Usage

### Queries

query composable はグループ化リクエストパラメーターを第 1 引数に取る。パラメーターは値・ref・getter を受け付ける:

```typescript
import { useGetPetById } from './gen/hooks/useGetPetById'

const { data, error, isLoading } = useGetPetById({ path: { petId: 1n } })
```

第 2 引数は 2 つの任意グループ。`query` は任意の TanStack Query オプション、`query.client` は使う `QueryClient`。トップレベルの `client` はこの呼び出し用のリクエスト設定（`baseURL` 等）:

```typescript
import { useFindPetsByTags } from './gen/hooks/useFindPetsByTags'

useFindPetsByTags(
  { query: { tags: ['dog'] } },
  {
    query: { staleTime: 60_000 },
    client: { baseURL: 'https://api.example.com/v1' },
  },
)
```

### Factories

query operation は `queryOptions` ファクトリと `queryKey` ヘルパーも export する。キーは `[{ url }, query]`（operation path と query params から構築）:

```typescript
import { useQueryClient } from '@tanstack/vue-query'
import { findPetsByTagsQueryKey, findPetsByTagsQueryOptions } from './gen/hooks/useFindPetsByTags'

const queryClient = useQueryClient()

await queryClient.prefetchQuery(findPetsByTagsQueryOptions({ query: { tags: ['dog'] } }))
queryClient.invalidateQueries({ queryKey: findPetsByTagsQueryKey({ query: { tags: ['dog'] } }) })
```

mutation は composable の隣に `mutationKey` ヘルパーを export する。

### Mutations

mutation composable はオプションオブジェクトのみを取る。グループ化リクエスト設定が mutation variable なので `mutate` / `mutateAsync` に渡す:

```typescript
import { useQueryClient } from '@tanstack/vue-query'
import { useUpdatePetWithForm } from './gen/hooks/useUpdatePetWithForm'

const queryClient = useQueryClient()

const { mutate } = useUpdatePetWithForm({
  mutation: { onSuccess: () => queryClient.invalidateQueries() },
})

mutate({ path: { petId: 1n }, query: { name: 'Fluffy' } })
```

### Customize cache keys

```typescript
import { pluginVueQuery } from '@kubb/plugin-vue-query'

pluginVueQuery({
  queryKey: ({ node }) => [JSON.stringify(node.operationId)],
})
```

### Load more pages

```typescript
pluginVueQuery({
  hooks: true,
  infinite: {
    queryParam: 'page',
    initialPageParam: 0,
    nextParam: 'pagination.next.cursor',
  },
})
```

```typescript
import { useInfiniteQuery } from '@tanstack/vue-query'
import { findPetsByTagsInfiniteQueryOptions } from './gen/hooks/useFindPetsByTagsInfinite'

const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
  findPetsByTagsInfiniteQueryOptions({ query: () => ({ tags: ['dog'] }) }),
)
```

### Refetch when parameters change

`hooks: true` を有効にし、生成 composable に ref または getter を渡す。パラメーターは `MaybeRefOrGetter` を受け付け、getter はリアクティブ依存を追跡する:

```typescript
import { ref } from 'vue'
import { useFindPetsByTags } from './gen/hooks/useFindPetsByTags'

const tags = ref(['dog'])
const { data, error, isLoading } = useFindPetsByTags({
  query: () => ({ tags: tags.value }),
})

tags.value = ['cat']
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `hooks` | `boolean` | `true` で `use*` composable を生成（既定は factory ヘルパー `queryOptions` / `queryKey` / `mutationKey` のみ） |
| `queryKey` | `({ node }) => Array` | 生成 query key のカスタマイズ |
| `infinite` | `{ queryParam, initialPageParam, nextParam }` | infinite query の設定（`hooks: true` 必須） |

## Notes

- 既定では composable は生成されず factory ヘルパーのみ。`use*` composable が必要なら `hooks: true`（原文 IMPORTANT）
- 各生成 composable は client 関数を `throwOnError: true` で呼ぶ。失敗は TanStack Query の `error` に入り、型は spec のエラーレスポンスから付く。base URL・認証・interceptor・serialization・検証は client プラグイン側で設定する（plugin-client の場合は自前 client モジュール）
- `queryKey` の例は全呼び出しに同一キー（例 `['getUserByName']`）を与える。path / query の値で取得データが変わる場合はキーに加える（原文 WARNING）
- `nextParam` はドット記法またはキー配列。API のレスポンスに合わせて変える。`getNextPageParam` / `nextParam` / `cursorParam` がなければ、空配列を返すまでページ番号を増やす
- `tags.value` を変更すると query key が更新され、対応するリソースが fetch される
- 上記 mutation 例の `useQueryClient` は `@tanstack/vue-query` から import する（react-query 版は `@tanstack/react-query`）
- Source: https://kubb.dev/extensions/kubb-labs/plugin-vue-query/guides/calling-operations （`@kubb/plugin-vue-query@5.5.3`）

## Related

- [plugin-vue-query](../plugins/plugin-vue-query.md)
- [react-query-calling-operations](./react-query-calling-operations.md)
- [swr-calling-operations](./swr-calling-operations.md)
