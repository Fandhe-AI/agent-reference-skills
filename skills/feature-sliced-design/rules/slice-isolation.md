# Slice Isolation

同一レイヤー内のスライスは互いに独立する。

## Rule

同一レイヤーのスライス間で直接インポートは禁止。スライス間の依存が必要な場合は、上位レイヤーでの合成、`@x` 記法（entities 限定）、またはスライスの統合で解決する。

## Good

```ts
// 上位レイヤーで合成（推奨）
// pages/post/ui/PostPage.tsx
import { CommentList } from "features/comment-list";
import { UserAvatar } from "entities/user";

export const PostPage = () => (
  <CommentList
    renderAvatar={(userId) => <UserAvatar id={userId} />}
  />
);
```

```ts
// @x 記法で明示的なクロスエンティティ依存
// entities/user/@x/post.ts
export { UserAvatar } from "../ui/Avatar";

// entities/post/ui/PostCard.tsx
import { UserAvatar } from "entities/user/@x/post";
```

## Bad

```ts
// 同一レイヤーのスライスを直接インポート
// features/cart/model/cart.ts
import { Product } from "features/product/model/product";

// entities/comment/ui/Comment.tsx
import { UserAvatar } from "entities/user/ui/Avatar";
```

```ts
// スライスグループ内でも兄弟スライス間は禁止
// features/auth/login/model/loginStore.ts
import { registrationSchema } from "features/auth/register/model/schema";
```

## Why

スライスの分離により:

- 各スライスを独立して開発・テスト・削除できる
- 変更が他のスライスに予期しない影響を与えない
- コードの所有権が明確になる（どのスライスがどのロジックを担当するか）
- `@x` 記法は依存を明示的・監査可能にするが、乱用はエンティティ境界を固定化するため注意
