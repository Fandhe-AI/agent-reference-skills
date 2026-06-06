# Layer Imports

上位レイヤーは下位レイヤーからのみインポートできる一方向依存ルールの実例。

```ts
// pages/post/ui/PostPage.tsx
// pages → features, entities, shared は OK
import { CommentList } from "features/comment-list";
import { UserAvatar } from "entities/user";
import { Button } from "shared/ui/button";

export const PostPage = () => (
  <div>
    <CommentList renderAvatar={(userId) => <UserAvatar id={userId} />} />
    <Button>投稿する</Button>
  </div>
);
```

```ts
// widgets/header/ui/Header.tsx
// widgets → features, entities, shared は OK
import { SearchBar } from "features/search";
import { UserAvatar } from "entities/user";
import { Logo } from "shared/ui/logo";
```

```ts
// Bad — 上位レイヤーへのインポート（禁止）
// entities/user/model/user.ts
import { SearchBar } from "features/search"; // entities → features (NG)

// Bad — 同一レイヤーのスライス間インポート（禁止）
// features/cart/model/cart.ts
import { Product } from "features/product"; // features → features (NG)
```

## Notes

- インポート方向: `app` > `pages` > `widgets` > `features` > `entities` > `shared`
- `shared` は外部ライブラリのみインポート可（他レイヤーからインポート不可）
- 同一スライス内では相対インポート、スライス境界を越える場合は絶対インポートを使う
- 双方向依存や同一レイヤー間依存が必要になった場合は設計を見直すサイン
