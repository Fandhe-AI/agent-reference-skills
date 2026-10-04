# Message

AI チャット UI の「会話 1 発言」を表現する shadcn/ui Message 相当の部品。`root` / `avatar` / `header` / `content` / `footer` / `group` の 6 anatomy パーツを持つ、状態機械を持たない静的部品。応答待ち・送信失敗の判定や再送、ストリーミング更新はアプリ側の責務。

## Signature / Usage

```rust
use fandhe_frontend_core::text;
use fandhe_frontend_headless_ui::message::{self, MessageAlign, MessageRole, MessageRootProps};

let node = message::group("Conversation", vec![], vec![
    message::root(
        MessageRootProps {
            role: MessageRole::Assistant,
            align: MessageAlign::Start,
            loading: false,
            error: false,
        },
        vec![],
        vec![
            message::avatar(vec![], vec![/* avatar::root(...) を組み込める */]),
            message::content(vec![], vec![text("Hello!")]),
        ],
    ),
]);
```

```rust
message::root(props: MessageRootProps, attrs, children) -> Node
message::group(label: &str, attrs, children) -> Node
message::avatar / header / content / footer (attrs, children) -> Node
```

## Anatomy

典型的な入れ子の一例。ソースで裏付けられるのは `group` が複数の `root` を束ねること、`avatar` / `content` がスロットであることのみ。

```
group
  root
    avatar
    header
    content
    footer
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `MessageRootProps.role` | `MessageRole` | `User` | `User` \| `Assistant` \| `System`。`data-role` |
| `MessageRootProps.align` | `MessageAlign` | `Start` | `Start` \| `End`。`data-align`（`data-role` から自動導出されない独立軸） |
| `MessageRootProps.loading` | `bool` | `false` | `true` のとき `data-loading`（応答待ちの表示） |
| `MessageRootProps.error` | `bool` | `false` | `true` のとき `data-error`（送信失敗の表示） |
| `group: label` | `&str` | 必須 | 空文字列でないときのみ `aria-label` |

## Data Attributes

| Part | Attribute | Values |
| --- | --- | --- |
| root | `data-role` | `user` \| `assistant` \| `system` |
| root | `data-align` | `start` \| `end` |
| root | `data-loading` / `data-error` | presence |

## Notes

- 出典: https://fandhe-ai.github.io/fandhe-frontend/primitives/message/
- この 4 語彙（`data-role` / `data-align` / `data-loading` / `data-error`）は会話系部品（message / bubble / attachment / marker）が共有する共通語彙として `message` mod が最初に確定した。
- `root` は `role="listitem"`、`group` は `role="list"` を固定付与。会話全体は「発言者ターンごとの `group`（list）の並び」として読み上げられる想定。`group` を介さず `root` 単体で使う場合は呼び出し側が `ul` / `role="list"` コンテナへ置く。
- `avatar` / `content` はスロット。`avatar` は既存の `avatar` mod を内部で呼ばず、中に `avatar::root` / `avatar::image` / `avatar::fallback` を自由に組み込める。同じ発言者の連続発言は `group` でまとめる（先頭以外の `avatar` を省略する見た目は CSS の責務）。
- `aria-live` / `aria-busy` は付与しない（ストリーミング応答の通知や読み上げはアプリ固有の UX 判断で責務外）。
- 自前 CSS の最小例: `[data-scope="message"][data-part="root"][data-align="end"] { margin-left: auto; }`。
- `@ark-ui/react` の JS/TS API とは別物（Rust 製、`fandhe-frontend-headless-ui`）。

## Related

- [Avatar](./avatar.md)
- [Bubble](./bubble.md)
- [Attachment](./attachment.md)
- [Marker](./marker.md)
- [Message Scroller](./message-scroller.md)
- [Message（Themes 版）](../../themes/data-display/message.md)
