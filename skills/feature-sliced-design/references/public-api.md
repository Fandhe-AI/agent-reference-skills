# Public API

スライス（またはセグメント）とコードベースの他の部分との間の**契約**。外部コードは指定されたエントリーポイントのみからインポートでき、内部ファイルパスからは直接インポートしない。

## なぜ重要か

1. **構造変更からの保護** — スライス内部のリファクタリングがアプリの他の部分を壊さない
2. **振る舞い変更の明示** — スライスの振る舞いに対する破壊的変更は Public API の変更を必要とする
3. **露出の最小化** — 必要な表面のみをエクスポートし、実装詳細は非公開に

## 実装: index ファイル

スライスルートの `index.ts`（または `index.js`）で、公開する表面のみを re-export する:

```ts
// pages/auth/index.ts
export { LoginPage } from "./ui/LoginPage";
export { RegisterPage } from "./ui/RegisterPage";
```

利用側はスライスルートからインポートし、内部パスからインポートしない:

```ts
// Good
import { LoginPage } from "pages/auth";

// Bad — 内部パスからのインポート
import { LoginPage } from "pages/auth/ui/LoginPage";
```

### アンチパターン: ワイルドカード re-export

`export *` を避ける — 実際のインターフェースが不明瞭になり、内部詳細を意図せず公開する:

```ts
// Bad
export * from "./ui/Comment";

// Good
export { Comment } from "./ui/Comment";
export type { CommentProps } from "./ui/Comment";
```

## @x 記法（クロススライス Public API）

正当なクロススライス依存（主に `entities`）には `@x` ディレクトリで専用 API を作成:

```text
entities/
  user/
    @x/
      post.ts    ← entities/post 専用の公開 API
    index.ts     ← 汎用の公開 API
```

```ts
// entities/user/@x/post.ts
export { UserAvatar } from "../ui/Avatar";

// entities/post/ui/PostCard.tsx
import { UserAvatar } from "entities/user/@x/post";
```

## よくある問題と解決策

### 循環インポート

相対インポートと絶対インポートの混在から発生しやすい。2 つのルールで防止:

- 同一スライス内では**相対インポート**（完全な内部パス）
- スライス境界を越える場合は**絶対インポート**

### ツリーシェイキング / バンドル肥大化

`shared/ui` の単一 index ファイルが、すべての利用側バンドルに全エクスポートを含めてしまう。

解決策: コンポーネントごとに個別の index ファイルを作成:

```text
shared/
  ui/
    button/
      index.ts     ← Button のみエクスポート
    input/
      index.ts     ← Input のみエクスポート
```

```ts
import { Button } from "shared/ui/button";
import { Input } from "shared/ui/input";
```

### IDE の自動インポート違反

IDE は最も近いファイルから自動インポートし、Public API を迂回することがある。Steiger 等の linter で CI で検出する。

## 注意点

- Public API ルールはスライスのないレイヤー（`app`, `shared`）のセグメントにも適用される
- `@x` 記法は意図的なエスケープハッチであり、一般パターンではない — 可能なら上位レイヤーでの再構成を優先
- 新しいスライスを作るときは、利用側を書く前に必ず `index.ts` を定義する
