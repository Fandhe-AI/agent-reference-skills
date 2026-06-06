# Cross-Entity Import

entities 間の正当なクロススライス依存を `@x` 記法で明示的に管理する。

```text
entities/
  user/
    @x/
      post.ts        ← entities/post に公開する専用 API
    ui/
      Avatar.tsx
    index.ts         ← 汎用 Public API
  post/
    ui/
      PostCard.tsx
    index.ts
```

```ts
// entities/user/@x/post.ts — post スライス専用の公開 API
export { UserAvatar } from "../ui/Avatar";
```

```ts
// entities/post/ui/PostCard.tsx
// "user crossed with post" — 明示的で監査可能なクロスエンティティ依存
import { UserAvatar } from "entities/user/@x/post";

export const PostCard = ({ post }) => (
  <div>
    <UserAvatar userId={post.authorId} />
    <h2>{post.title}</h2>
  </div>
);
```

## Notes

- `@x` は意図的なエスケープハッチであり、一般パターンではない
- 可能であれば上位レイヤー（pages, widgets）で合成する方を優先する
- 他のレイヤーで `@x` を多用する場合は設計上の問題のサイン
- `entities/user/@x/post.ts` は `entities/post` だけに向けた専用 API — 汎用 `index.ts` とは別管理
