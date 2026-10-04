# Message Scroller

AI チャット UI の会話ログを収めるスクロールコンテナのスタイル済み部品。ネイティブスクロール（JS 不要）、両端フェード、最新へジャンプ、履歴の追加読み込みボタンを持つ。

## Signature / Usage

```rust
use fandhe_frontend_core::text;
use fandhe_frontend_pre_styled_ui::message_scroller::{
    self, MessageScrollerRootProps, MessageScrollerStuck,
};

let node = message_scroller::root(
    MessageScrollerRootProps {
        stuck: MessageScrollerStuck::Bottom,
        has_new: false,
    },
    vec![],
    vec![
        message_scroller::viewport(
            "Conversation",
            vec![],
            vec![message_scroller::content(vec![], vec![text("messages")])],
        ),
        message_scroller::jump_to_latest("Jump to latest", false, vec![], vec![]),
    ],
);
let css = message_scroller::stylesheet();
```

## Anatomy

`root` → `viewport`（→ `content` / `anchor`）/ `jump-to-latest` / `load-more`

## Options / Props

`MessageScrollerRootProps`（headless 層の型を再エクスポート）:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `stuck` | `MessageScrollerStuck`（`Bottom` \| `Free`） | `Bottom` | 最下部に張り付いているか（`data-stuck`） |
| `has_new` | `bool` | — | `data-has-new` 存在属性。`jump-to-latest` をアクセント色へ強調 |

パーツ関数（すべて `#[must_use]`、呼び出し側 `class` は除去される）:

| Function | Signature |
|----------|-----------|
| `root` | `(props: MessageScrollerRootProps, attrs: Vec<(&str, &str)>, children: Vec<Node>) -> Node` |
| `viewport` | `(label: &str, attrs: Vec<(&str, &str)>, children: Vec<Node>) -> Node` |
| `content` | `(attrs: Vec<(&str, &str)>, children: Vec<Node>) -> Node` |
| `anchor` | `(attrs: Vec<(&str, &str)>) -> Node` |
| `jump_to_latest` | `(label: &str, visible: bool, attrs: Vec<(&str, &str)>, children: Vec<Node>) -> Node`（`data-visible` / `hidden` の 2 択） |
| `load_more` | `(loading: bool, disabled: bool, attrs: Vec<(&str, &str)>, children: Vec<Node>) -> Node`（`data-loading` / `data-disabled`。`loading == true` で装飾的 spinner を children 先頭へ埋め込む） |
| `stylesheet` | `() -> String` |

## Notes

- 出典: https://fandhe-ai.github.io/fandhe-frontend/themes/message-scroller/
- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）
- `viewport` は `overflow-y: auto` で既定高さ `24rem`（`--fandhe-message-scroller-height` で上書き可）。両端は `mask-image` の既定フェードを持ち、`data-stuck="bottom"` のときは末尾フェードを自動解除して最新メッセージを霞ませない
- `data-stuck` / `data-has-new` / `data-visible` / `hidden` / `data-loading` / `data-disabled` は headless 層の出力を CSS セレクタとして参照するだけで、class ベースの軸は持たない
- 最下部追従・新着検知・履歴読み込み時の位置維持といったスクロール位置の計測・実行時更新は実装しない（`fandhe-frontend-wasm-full` 側の配線が別イシュー担当）

## Related

- [Primitives: Message Scroller](../../primitives/display/message-scroller.md)
- [Message](./message.md)
- [Bubble](./bubble.md)
