# Import Rules

FSD のインポートルールと依存関係の方向を定義する。

## 基本ルール

> スライス内のモジュール（ファイル）は、**厳密に下位のレイヤー**に位置するスライスからのみインポートできる。

```text
app      ← pages, widgets, features, entities, shared をインポート可
pages    ← widgets, features, entities, shared をインポート可
widgets  ← features, entities, shared をインポート可
features ← entities, shared をインポート可
entities ← shared をインポート可
shared   ← 外部ライブラリのみ（他レイヤーからインポート不可）
```

### 例外

- `app` と `shared` はスライスを持たないため、内部セグメント間で自由に相互参照可能

## 同一レイヤー内のルール

同一レイヤーのスライス間で直接インポートは**禁止**:

```ts
// Bad — features 内のスライス間インポート
// features/cart/model/cart.ts
import { Product } from "features/product/model/product";

// Bad — pages 内のスライス間インポート
// pages/home/ui/HomePage.tsx
import { ProfileCard } from "pages/profile/ui/ProfileCard";
```

## クロスインポートの解決策

同一レイヤーの依存が必要になった場合の対処法:

### 1. 上位レイヤーでの合成

最も推奨される方法。上位レイヤーで組み合わせる:

```ts
// pages/post/ui/PostPage.tsx（pages レイヤーから features と entities をインポート）
import { CommentList } from "features/comment-list";
import { UserAvatar } from "entities/user";

export const PostPage = () => (
  <div>
    <CommentList renderAvatar={(userId) => <UserAvatar id={userId} />} />
  </div>
);
```

### 2. `@x` 記法（entities 限定）

エンティティ間の正当な依存に使用:

```text
entities/
  user/
    @x/
      post.ts    ← entities/post に公開する専用 API
    index.ts     ← 汎用 Public API
```

```ts
// entities/user/@x/post.ts
export { UserAvatar } from "../ui/Avatar";

// entities/post/ui/PostCard.tsx
import { UserAvatar } from "entities/user/@x/post";
```

### 3. スライスの統合

常に一緒に変更されるスライスは 1 つに統合する。

### 4. 共有ロジックの下位レイヤーへの移動

features 間で共有されるビジネスロジックは entities に、entities 間で共有されるユーティリティは shared に移動する。

## インポートスタイルのルール

| 状況 | スタイル |
| --- | --- |
| 同一スライス内 | 相対インポート（`"./ui/Button"`） |
| スライス境界を越える | 絶対インポート（`"entities/user"`） |

この使い分けにより循環インポートを防止する。

## 警告サイン

- 他スライスのストアに直接依存している
- 他スライスの内部ファイルをインポートしている（Public API を迂回）
- 双方向の依存関係が存在する
- クロススライスの変更で頻繁に破壊が発生する
