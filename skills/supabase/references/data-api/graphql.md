# GraphQL

pg_graphql Extension による PostgreSQL スキーマからの自動 GraphQL API 生成。

## 概要

Supabase は `pg_graphql` Extension を使い、PostgreSQL のスキーマから GraphQL API を自動生成する。テーブル、ビュー、外部キーリレーション、関数がすべて GraphQL スキーマに反映される。

### エンドポイント

```
https://<PROJECT_REF>.supabase.co/graphql/v1
```

### 特徴

- PostgreSQL スキーマから自動的に GraphQL スキーマを生成
- テーブルの CRUD 操作（Query / Mutation）
- 外部キーに基づくリレーション解決
- RLS（Row Level Security）が適用される
- フィルタリング、ソート、ページネーション対応
- PostgreSQL 関数の GraphQL 公開
- リアルタイムサブスクリプションは非対応（Realtime API を使用）

### 命名規則

| PostgreSQL | GraphQL |
|------------|---------|
| テーブル名（複数形） | 型名（キャメルケース、単数形の Collection） |
| `posts` テーブル | `postsCollection` クエリ / `Post` 型 |
| `user_profiles` テーブル | `userProfilesCollection` クエリ / `UserProfile` 型 |

## コード例

```typescript
// === supabase-js からの GraphQL 呼び出し ===
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

// GraphQL クエリの実行
const { data, error } = await supabase
  .from('graphql')
  .select() // ダミー。実際は fetch で直接呼び出す
```

```typescript
// === fetch での直接呼び出し ===
const SUPABASE_URL = 'https://<REF>.supabase.co';
const SUPABASE_ANON_KEY = '<ANON_KEY>';

// Query: 投稿一覧の取得
const response = await fetch(`${SUPABASE_URL}/graphql/v1`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
  },
  body: JSON.stringify({
    query: `
      query GetPosts {
        postsCollection(
          filter: { published: { eq: true } }
          orderBy: [{ created_at: DescNullsLast }]
          first: 10
        ) {
          edges {
            node {
              id
              title
              body
              created_at
              author: user {
                id
                name
              }
              commentsCollection {
                edges {
                  node {
                    id
                    body
                  }
                }
              }
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    `,
  }),
});

const { data, errors } = await response.json();
```

```graphql
# === Query 例 ===

# フィルタ付き取得
query FilteredPosts($status: String!) {
  postsCollection(
    filter: {
      status: { eq: $status }
      views: { gte: 100 }
    }
    first: 20
    after: "cursor_value"
  ) {
    edges {
      cursor
      node {
        id
        title
        status
        views
      }
    }
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
  }
}

# === Mutation 例 ===

# INSERT
mutation CreatePost($title: String!, $body: String!) {
  insertIntoPostsCollection(
    objects: [{ title: $title, body: $body, published: false }]
  ) {
    records {
      id
      title
      created_at
    }
  }
}

# UPDATE
mutation UpdatePost($id: BigInt!, $title: String!) {
  updatePostsCollection(
    filter: { id: { eq: $id } }
    set: { title: $title }
  ) {
    records {
      id
      title
    }
  }
}

# DELETE
mutation DeletePost($id: BigInt!) {
  deleteFromPostsCollection(
    filter: { id: { eq: $id } }
  ) {
    records {
      id
    }
  }
}

# UPSERT（atMost を指定して制限）
mutation UpsertPost($id: BigInt!, $title: String!) {
  insertIntoPostsCollection(
    objects: [{ id: $id, title: $title }]
  ) {
    records {
      id
      title
    }
  }
}
```

```bash
# === cURL での GraphQL 呼び出し ===
curl -X POST 'https://<REF>.supabase.co/graphql/v1' \
  -H "apikey: <ANON_KEY>" \
  -H "Authorization: Bearer <ANON_KEY>" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "query { postsCollection(first: 5) { edges { node { id title } } } }"
  }'
```

## 注意点

- pg_graphql はデフォルトで有効。Supabase ダッシュボードの「API Docs > GraphQL」からスキーマを確認できる
- GraphQL はリレーカーソルページネーション（Relay-style）を使用。`first`/`after` または `last`/`before` で制御
- RLS ポリシーは GraphQL リクエストにも適用される
- スキーマ変更後、GraphQL スキーマは自動的に更新される（キャッシュにより若干の遅延あり）
- `pg_graphql` はサブスクリプション（リアルタイム）をサポートしない。リアルタイムが必要な場合は Supabase Realtime を使用
- GraphQL のフィルタは PostgREST のフィルタとは構文が異なる
- テーブルにプライマリキーがないと GraphQL スキーマに含まれない

## 関連

- [Data API 概要](./overview.md)
- [REST API](./rest.md)
- [API 堅牢化](./hardening.md)
