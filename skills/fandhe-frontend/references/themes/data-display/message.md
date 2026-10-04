# Message

AI チャット UI の「会話 1 発言」を表現するスタイル済み部品。発言者の役割・整列・応答待ち・送信失敗を見た目に反映する。

## Signature / Usage

```rust
use fandhe_frontend_core::text;
use fandhe_frontend_pre_styled_ui::message::{self, MessageAlign, MessageRole, MessageRootProps};

let node = message::root(
    MessageRootProps {
        role: MessageRole::Assistant,
        align: MessageAlign::Start,
        loading: false,
        error: false,
    },
    vec![],
    vec![message::content(vec![], vec![text("Hello")])],
);
let css = message::stylesheet();
```

## Anatomy

`group` → `root`（→ `avatar` / `header` / `content` / `footer`）

## Options / Props

`MessageRootProps`（headless 層の型を再エクスポート）:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `role` | `MessageRole`（`User` \| `Assistant` \| `System`） | `User` | 発言者の役割（`data-role`）。`user` は accent、`assistant` は muted、`system` は透明 + 斜体の `content` |
| `align` | `MessageAlign`（`Start` \| `End`） | `Start` | 整列（`data-align`） |
| `loading` | `bool` | — | `data-loading`。`root` を半透明化 |
| `error` | `bool` | — | `data-error`。`content` の背景・文字色・枠線を危険色へ切替 |

パーツ関数（すべて `#[must_use]`、呼び出し側 `class` は除去される）:

| Function | Signature |
|----------|-----------|
| `root` | `(props: MessageRootProps, attrs: Vec<(&str, &str)>, children: Vec<Node>) -> Node` |
| `avatar` / `header` / `content` / `footer` | `(attrs: Vec<(&str, &str)>, children: Vec<Node>) -> Node` |
| `group` | `(label: &str, attrs: Vec<(&str, &str)>, children: Vec<Node>) -> Node` |
| `stylesheet` | `() -> String` |

## Notes

- 出典: https://fandhe-ai.github.io/fandhe-frontend/themes/message/
- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）
- `role` / `align` / `loading` / `error` は headless 層の `data-*` を CSS セレクタとして参照するだけで、class ベースの軸は持たない
- `group` は連続発言のコンテナ。2 件目以降の `root` は余白が詰まり、`avatar` は `visibility: hidden` で幅を残したまま非表示になる（`display: none` だと先頭行との横位置がずれるため）
- 応答のストリーミング通知（`aria-live`）と応答待ちの読み上げ（`aria-busy`）は付与しない。必要なら呼び出し側が自前で `aria-live` リージョンを合成する
- バリデーション・送信処理・Markdown レンダリングは実装しない

## Related

- [Primitives: Message](../../primitives/display/message.md)
- [Bubble](./bubble.md)
- [Message Scroller](./message-scroller.md)
- [Marker](./marker.md)
