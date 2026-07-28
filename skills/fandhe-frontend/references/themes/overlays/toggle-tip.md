# Toggle Tip

クリックで開閉するヒント表示（styled、見た目は Tooltip・挙動は Popover）。`fandhe-frontend-headless-ui` の `toggle_tip` を `pub use ...::*` で再エクスポートし、`stylesheet()` で既定 CSS を追加提供する薄いラッパー。

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::toggle_tip::{
    root, trigger, positioner, content, arrow, arrow_tip, stylesheet,
};
use fandhe_frontend_pre_styled_ui::toggle_tip::OpenState;

let css = stylesheet();
let node = root(OpenState::Open, vec![], vec![]);
```

## Anatomy

```
root
  ├─ trigger
  └─ positioner
      └─ content
          ├─ arrow
          └─ arrow-tip
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `root`/`trigger`/`positioner`/`content`/`arrow`/`arrow_tip` | — | — | headless `toggle_tip` の同名関数をそのまま再エクスポート |
| `stylesheet()` | — | — | 既定 CSS 全量。`content` の視覚系は `tooltip` と同一値（背景色・文字色・フォントサイズ等）。`positioner` は `position: absolute; bottom: 100%; left: 0; z-index: 1100` |

## Notes

- `@chakra-ui/react` の JS/TS API とは別物（Rust 製、`fandhe-frontend-pre-styled-ui` クレート）
- `content` は `sameWidth` 相当（`--fandhe-reference-width`）を意図的に消費しない
- click-outside dismiss・Escape 閉鎖はスコープ外
- variant（size 等）は持たない

## Related

- [primitives/overlays/toggle-tip](../../primitives/overlays/toggle-tip.md)
- [tooltip](./tooltip.md)
