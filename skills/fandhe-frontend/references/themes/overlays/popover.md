# Popover

トリガー起点で表示するコンテキスト情報オーバーレイ（styled、`role="dialog"`）。`fandhe-frontend-headless-ui` の `popover` を `pub use ...::*` で再エクスポートし、`stylesheet()` で既定 CSS を追加提供する薄いラッパー。

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::popover::{
    root, trigger, anchor, positioner, arrow, arrow_tip, content, title, description,
    close_trigger, indicator, stylesheet,
};
use fandhe_frontend_pre_styled_ui::popover::OpenState;

let css = stylesheet();
let node = root(OpenState::Open, vec![], vec![]);
```

## Anatomy

```
root
  ├─ trigger
  ├─ anchor
  └─ positioner
      ├─ arrow
      │   └─ arrow-tip
      └─ content
          ├─ title
          ├─ description
          ├─ close-trigger
          └─ indicator
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `root`/`trigger`/`anchor`/`positioner`/`arrow`/`arrow_tip`/`content`/`title`/`description`/`close_trigger`/`indicator` | — | — | headless `popover` の同名関数をそのまま再エクスポート |
| `stylesheet()` | — | — | 既定 CSS 全量。`positioner` は `position: absolute; top: 100%; left: 0; z-index: 10` |

## Notes

- `@chakra-ui/react` の JS/TS API とは別物（Rust 製、`fandhe-frontend-pre-styled-ui` クレート）
- `content` の `min-width` は `var(--fandhe-reference-width, auto)`（トリガー実測幅へ追随、SSR では `auto` にフォールバック）
- フォーカストラップ・Escape キー閉鎖・外側クリック閉鎖・アニメーションはスコープ外
- variant（size 等）は持たない

## Related

- [primitives/overlays/popover](../../primitives/overlays/popover.md)
- [floating-panel](./floating-panel.md)
