# React Query Integration

entities の `api` セグメントにクエリファクトリを置き、pages から利用するパターン。

```ts
// src/entities/post/api/post.queries.ts — クエリファクトリ
import { keepPreviousData, queryOptions } from "@tanstack/react-query";
import { getPosts } from "./get-posts";
import { getDetailPost } from "./get-detail-post";

export const postQueries = {
  all: () => ["posts"],
  lists: () => [...postQueries.all(), "list"],
  list: (page: number, limit: number) =>
    queryOptions({
      queryKey: [...postQueries.lists(), page, limit],
      queryFn: () => getPosts(page, limit),
      placeholderData: keepPreviousData,
    }),
  detail: (id?: number) =>
    queryOptions({
      queryKey: [...postQueries.all(), "detail", id],
      queryFn: () => getDetailPost({ id }),
      staleTime: 5000,
    }),
};
```

```ts
// src/pages/post/ui/PostPage.tsx — pages からクエリを利用
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { postQueries } from "entities/post/api/post.queries";

export const PostPage = () => {
  const { postId } = useParams<{ postId: string }>();
  const { data: post, isLoading } = useQuery(
    postQueries.detail(Number(postId))
  );

  if (isLoading) return <div>Loading...</div>;
  return <div>{post?.title}</div>;
};
```

```ts
// src/shared/api/query-client.ts — 共有 QueryClient
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 5 * 60 * 1000 } },
});
```

```ts
// src/app/providers/query-provider.tsx — app レイヤーでラップ
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "shared/api/query-client";

export const QueryProvider = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
```

## Notes

- ミューテーションは `features` の `api` セグメントに `useMutation` フックとして配置する
- クリアなエンティティ分離がない場合は `shared/api` にクエリをまとめる選択肢もある
- `QueryClient` は `shared/api` に置き、`app` プロバイダーで注入する
- entities 間でクエリキーが重複しないよう、`all()` をルートキーとするファクトリパターンを採用する
