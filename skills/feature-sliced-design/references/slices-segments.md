# Slices & Segments

FSD の第 2・第 3 階層。レイヤーの下にスライスとセグメントが位置する。

## スライス

**ビジネスドメインの意味**でコードをグループ化する。

- 使用するレイヤー: `pages`, `widgets`, `features`, `entities`
- 使用しないレイヤー: `app`, `shared`（セグメントのみ）

スライス名はドメイン固有でプロジェクトごとに異なる:

| プロジェクト | スライス例 |
| --- | --- |
| フォトギャラリー | `photo`, `effects`, `gallery-page` |
| SNS | `post`, `comments`, `news-feed` |
| EC サイト | `product`, `cart`, `checkout` |

### ゼロ結合・高凝集

同一レイヤーのスライスは**互いに独立**:

- 同一レイヤーのスライス間で直接インポートしない
- スライスの主要な関心事に関するコードはすべてスライス内に配置する

### スライスグループ

関連スライスを構造的にフォルダでまとめることが可能:

```text
features/
  auth/
    login/
    register/
    reset-password/
```

制約: グループ内のスライスも**完全な分離を維持**する — 兄弟スライス間でコードを共有しない。

## セグメント

スライス（または `app` / `shared`）内で**技術的な目的**でコードをグループ化する。

### 標準セグメント

| セグメント | 内容 |
| --- | --- |
| `ui` | UI コンポーネント、フォーマッタ、スタイル |
| `api` | バックエンド連携、リクエスト関数、レスポンス型 |
| `model` | データスキーマ、インターフェース、ストア、ビジネスロジック |
| `lib` | スライスローカルの再利用可能ユーティリティ |
| `config` | 設定定数、フィーチャーフラグ |

カスタムセグメント名も許可。特に `app` と `shared` で一般的。

### 命名規則

セグメント名はコンテンツの**目的**（purpose）を記述する。技術的な**本質**（essence）ではない。

Bad:

```text
components/
hooks/
types/
utils/
```

Good:

```text
ui/
model/
api/
lib/
```

## ディレクトリ構造例

```text
features/
  authenticate-user/       ← スライス
    ui/                    ← セグメント
      LoginForm.tsx
    api/                   ← セグメント
      loginMutation.ts
    model/                 ← セグメント
      authStore.ts
      authSchema.ts
    index.ts               ← Public API
```

## @x 記法（クロスインポート）

主に `entities` での正当なクロススライス依存に使用:

```text
entities/
  user/
    @x/
      post.ts              ← entities/post に公開する API
    ui/
      Avatar.tsx
    index.ts
```

```ts
// entities/post/ui/PostCard.tsx
import { UserAvatar } from "entities/user/@x/post";
```

「user crossed with post」— 明示的で監査可能なクロスエンティティ依存。

## 注意点

- セグメントは単一ファイル（`model.ts`）でもフォルダ（`model/`）でも可 — 内容が増えたらフォルダに
- 1 ファイルだけのためにセグメントを作らない — 小さなスライスではルート直下のフラットファイルで可
- `@x` は主に `entities` 向け。他レイヤーでの多用は設計上の問題のサイン
