# React Query Integration

TanStack Query のクエリファクトリを `shared/api` に置き、Public API 経由で pages から利用するパターン。

```ts
// src/shared/api/post/post.queries.ts — クエリファクトリ
import { queryOptions } from '@tanstack/react-query';
import { getPosts } from './get-posts';
import { getDetailPost, type DetailPostQuery } from './get-detail-post';

export const POST_QUERIES = {
    all: () => ['posts'],
    lists: () => [...POST_QUERIES.all(), 'list'],
    list: (page: number, limit: number) => queryOptions({
        queryKey: [...POST_QUERIES.lists(), page, limit],
        queryFn: () => getPosts(page, limit),
        placeholderData: prev => prev,
    }),
    details: () => [...POST_QUERIES.all(), 'detail'],
    detail: (query?: DetailPostQuery) => queryOptions({
        queryKey: [...POST_QUERIES.details(), query?.id],
        queryFn: () => getDetailPost({ id: query?.id }),
    }),
};
```

```ts
// src/shared/api/post/index.ts — Public API
export { POST_QUERIES } from './post.queries';
```

```tsx
// src/pages/post/ui/post.tsx — Public API 経由でクエリを利用
import { useParams } from 'react-router';
import { POST_QUERIES } from '@/shared/api/post';
import { useQuery } from '@tanstack/react-query';

export const Post = () => {
    const { postId } = useParams<{ postId: string }>();

    const { data: post, error, isLoading, isError } = useQuery(
        POST_QUERIES.detail({ id: parseInt(postId ?? '', 10) })
    );

    if (isLoading) return <div>Loading...</div>;
    if (isError || !post) return <div>{ error?.message }</div>;

    return <h1>{ post.title }</h1>;
};
```

```tsx
// src/app/providers/query-provider.tsx — QueryClient は app レイヤーで用意する
import { type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000,
            gcTime: 5 * 60 * 1000,
        },
    },
});

export const QueryProvider = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={ queryClient }>{ children }</QueryClientProvider>
);
```

## Notes

- クエリの置き場所は公式に 3 案: `shared/api`（全体）、`shared/api` をコントローラー単位に分割して各々に Public API を置く、`entities/<name>/api`（リクエストが単一 entity に対応する場合に最もクリーン）。entity 間に関連がある場合は `@x` の Public API を使う
- スライス内部のファイル（`entities/post/api/post.queries` など）を直接インポートせず、スライスの Public API 経由で利用する
- ミューテーションはクエリと混ぜない。使用箇所に近い `api` セグメントにカスタムフック（例 `pages/example/api/use-update-example.ts`、`features/update-post/api/`）として置くか、`shared` / `entities` の関数を `mutationFn` に渡す
- `QueryClient` と `QueryClientProvider` は `app` レイヤー（`app/providers`）に置く。`shared/api` には置かない
- `all()` をルートキーとするファクトリで、キーの重複とリフェッチ時のキー変更を避ける。`queryOptions` は react-query v5 の組み込みユーティリティ
