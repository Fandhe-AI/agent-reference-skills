# Message Scroller

AI チャット UI の会話ログを収めるスクロールコンテナを表現する shadcn/ui Message Scroller 相当の部品。`root` / `viewport` / `content` / `anchor` / `jump_to_latest` / `load_more` の 6 anatomy パーツを持つ、状態機械を持たない静的部品。

## Signature / Usage

```rust
use fandhe_frontend_core::text;
use fandhe_frontend_headless_ui::message_scroller::{
    self, MessageScrollerRootProps, MessageScrollerStuck,
};

let node = message_scroller::root(
    MessageScrollerRootProps { stuck: MessageScrollerStuck::Bottom, has_new: false },
    vec![],
    vec![
        message_scroller::viewport("Conversation", vec![], vec![
            message_scroller::load_more(false, false, vec![], vec![text("Load earlier")]),
            message_scroller::content(vec![], vec![/* message::group(...) など */]),
            message_scroller::anchor(vec![]),
        ]),
        message_scroller::jump_to_latest("Jump to latest", false, vec![], vec![text("Latest")]),
    ],
);
```

```rust
message_scroller::root(props: MessageScrollerRootProps, attrs, children) -> Node
message_scroller::viewport(label: &str, attrs, children) -> Node
message_scroller::content(attrs, children) -> Node
message_scroller::anchor(attrs) -> Node
message_scroller::jump_to_latest(label: &str, visible: bool, attrs, children) -> Node
message_scroller::load_more(loading: bool, disabled: bool, attrs, children) -> Node
```

## Anatomy

典型的な入れ子の一例。ソースで裏付けられるのは `anchor` を `viewport` 末尾に置くこと、`scroll_area` の scrollbar / thumb を `viewport` 内に入れ子にできることのみ。`load_more` / `jump_to_latest` の配置位置はソースに規定がない。

```
root
  viewport
    load_more
    content
    anchor
  jump_to_latest
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `MessageScrollerRootProps.stuck` | `MessageScrollerStuck` | `Bottom` | `Bottom` \| `Free`。`data-stuck` |
| `MessageScrollerRootProps.has_new` | `bool` | `false` | `true` のとき `data-has-new`（新着の表示のみ、検知は内包しない） |
| `viewport: label` | `&str` | 必須 | 非空のときのみ `role="region"` + `aria-label` |
| `jump_to_latest: label` | `&str` | 必須 | 非空のときのみ `aria-label` |
| `jump_to_latest: visible` | `bool` | 必須 | `true` で `data-visible`、`false` で `hidden` |
| `load_more: loading` | `bool` | 必須 | `true` のとき `data-loading`（`disabled` とは自動連動しない） |
| `load_more: disabled` | `bool` | 必須 | `true` のときネイティブ `disabled` + `data-disabled` |

## Data Attributes

| Part | Attribute | Values |
| --- | --- | --- |
| root | `data-stuck` | `bottom` \| `free` |
| root | `data-has-new` | presence |
| jump_to_latest | `data-visible` | presence（非可視時は `hidden`） |
| load_more | `data-loading` / `data-disabled` | presence |

## Notes

- 出典: https://fandhe-ai.github.io/fandhe-frontend/primitives/message-scroller/
- 責務境界: 最下部追従・新着検知・スクロール位置の計測や復元は内包しない。SSR は常に「最下部に居る」初期状態（`data-stuck="bottom"`）を決定的に描画し、実行時の計測・自動追従・新着検知は `fandhe-frontend-wasm-full` 側の配線が担う。
- `jump_to_latest` の可視判定（`stuck=free` かつ `has_new` 等）は呼び出し側または配線層が行う。`hidden` にするのは JS 無効時に「押しても何も起きないボタン」を見せないため。
- `viewport` は `tabindex="0"` 固定（矢印キー・Page キーでスクロール可能にする WAI 慣行）。Scroll Area の `viewport` と同じ契約を `message-scroller` scope で独立に実装しており `scroll_area` へは委譲しない。カスタムスクロールバーが必要なら `scroll_area::scrollbar` / `scroll_area::thumb` を `viewport` 内に入れ子にできる。
- `content` に `role="log"` は固定付与しない（ストリーミング通知の読み上げタイミングはアプリ固有の UX 判断）。
- `anchor` は `viewport` 末尾に置く `aria-hidden="true"` の計測用センチネルで children を持たない。
- `jump_to_latest` / `load_more` は `button type="button"`（Enter / Space が既定で作動）。`aria-live` / `aria-busy` / `aria-posinset` / `aria-setsize` は付与しない。
- 自前 CSS の最小例: `[data-scope="message-scroller"][data-part="jump-to-latest"]:not([data-visible]) { display: none; }`。
- `@ark-ui/react` の JS/TS API とは別物（Rust 製、`fandhe-frontend-headless-ui`）。

## Related

- [Message](./message.md)
- [Scroll Area](../disclosure/scroll-area.md)
- [Marker](./marker.md)
- [Message Scroller（Themes 版）](../../themes/data-display/message-scroller.md)
