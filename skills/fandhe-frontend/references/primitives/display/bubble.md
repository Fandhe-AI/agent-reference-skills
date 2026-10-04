# Bubble

チャット吹き出し 1 個を表現する shadcn/ui Bubble 相当の部品。`root` / `content` / `reactions` / `reaction` / `collapse-trigger` / `collapse-content` の 6 anatomy パーツを持つ、状態機械を持たない静的部品。

## Signature / Usage

```rust
use fandhe_frontend_core::text;
use fandhe_frontend_headless_ui::bubble::{self, BubbleGroupPosition, BubbleRootProps, BubbleVariant};
use fandhe_frontend_headless_ui::message::MessageAlign;

let node = bubble::root(
    BubbleRootProps {
        variant: BubbleVariant::Solid,
        align: MessageAlign::Start,
        group_position: BubbleGroupPosition::Single,
    },
    vec![],
    vec![
        bubble::content(vec![], vec![text("Hello!")]),
        bubble::reactions("Reactions", vec![], vec![
            bubble::reaction(true, vec![], vec![text("+1")]),
        ]),
    ],
);
```

```rust
bubble::root(props: BubbleRootProps, attrs, children) -> Node
bubble::content(attrs, children) -> Node
bubble::reactions(label: &str, attrs, children) -> Node
bubble::reaction(selected: bool, attrs, children) -> Node
bubble::collapse_trigger(state: OpenState, controls: Option<&str>, attrs, children) -> Node
bubble::collapse_content(state: OpenState, id: Option<&str>, attrs, children) -> Node
```

## Anatomy

典型的な入れ子の一例。ソースで裏付けられるのは `reactions` が `reaction` 群を束ねること、`collapse-trigger` と `collapse-content` が `controls` / `id` で対になることのみ。

```
root
  content
  reactions
    reaction
  collapse-trigger
  collapse-content
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `BubbleRootProps.variant` | `BubbleVariant` | `Solid` | `Solid` \| `Outline` \| `Plain`。`data-variant` |
| `BubbleRootProps.align` | `MessageAlign` | `Start` | `Start` \| `End`（`message` mod の型を再利用）。`data-align` |
| `BubbleRootProps.group_position` | `BubbleGroupPosition` | `Single` | `Single` \| `First` \| `Middle` \| `Last`。`data-group-position` |
| `reactions: label` | `&str` | 必須 | 空文字列でないときのみ `aria-label` |
| `reaction: selected` | `bool` | 必須 | `true` のとき `data-selected` |
| `collapse_trigger: state` / `collapse_content: state` | `OpenState` | 必須 | `aria-expanded` / `data-state` と `hidden` の元 |
| `collapse_trigger: controls` / `collapse_content: id` | `Option<&str>` | — | 対で `aria-controls` と `id` を成立させる |

## Data Attributes

| Part | Attribute | Values |
| --- | --- | --- |
| root | `data-variant` | `solid` \| `outline` \| `plain` |
| root | `data-align` | `start` \| `end` |
| root | `data-group-position` | `single` \| `first` \| `middle` \| `last` |
| reaction | `data-selected` | presence |
| collapse-trigger / collapse-content | `data-state` | `open` \| `closed` |

## Notes

- 出典: https://fandhe-ai.github.io/fandhe-frontend/primitives/bubble/
- `data-variant` は shadcn/ui の 7 色調バリアントを「塗り・枠線・無装飾」の 3 形態へ縮約したもの。色調選択は pre-styled-ui の ColorPalette 軸の責務。
- `data-group-position` は連続発言の角丸連結用の表示状態のみ。「何番目か」の算出は利用者側の責務（部品はリスト全体を受け取らない）。
- `content` はスロット。Markdown レンダリング結果等は利用者側で用意する。
- `reactions` は `role="group"` 固定。`reaction` は `data-selected` のみを持つ非インタラクティブな表示用パーツ（押下・集計・トグルはアプリ側）。
- `collapse-trigger` は `button type="button"`（`aria-expanded` / `data-state` / 任意で `aria-controls`）、`collapse-content` は closed のとき `hidden`。`collapsible` mod と同じ属性契約を `bubble` scope のまま再利用する。
- 公式 docs: wasm-full の click → `"toggle"` dispatch 配線は現時点で未整備。CSR での実開閉には呼び出し側が `OpenState` を保持して各パーツへ注入する配線が必要。
- 自前 CSS の最小例: `[data-scope="bubble"][data-part="root"][data-variant="outline"] { border: 1px solid #cbd5e1; }`。
- `@ark-ui/react` の JS/TS API とは別物（Rust 製、`fandhe-frontend-headless-ui`）。

## Related

- [Message](./message.md)
- [Attachment](./attachment.md)
- [Marker](./marker.md)
- [Collapsible](../disclosure/collapsible.md)
- [Bubble（Themes 版）](../../themes/data-display/bubble.md)
