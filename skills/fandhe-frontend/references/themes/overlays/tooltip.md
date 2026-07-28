# Tooltip

ホバー/フォーカスで表示する説明テキスト（styled、`role="tooltip"`、WAI-ARIA tooltip パターン準拠）。`fandhe-frontend-headless-ui` の `tooltip` を `pub use ...::*` で再エクスポートし、`stylesheet()` で既定 CSS を追加提供する薄いラッパー。

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::tooltip::{
    root, trigger, positioner, content, arrow, arrow_tip, stylesheet,
};
use fandhe_frontend_pre_styled_ui::tooltip::OpenState;

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
| `root`/`trigger`/`positioner`/`content`/`arrow`/`arrow_tip` | — | — | headless `tooltip` の同名関数をそのまま再エクスポート |
| `stylesheet()` | — | — | 既定 CSS 全量。`positioner` は `position: absolute; bottom: 100%; left: 0; z-index: 1100`（`dialog` の `positioner`(1001) より前面） |

## Notes

- `@chakra-ui/react` の JS/TS API とは別物（Rust 製、`fandhe-frontend-pre-styled-ui` クレート）
- `content` は `sameWidth` 相当（`--fandhe-reference-width`）を意図的に消費しない（短いテキストへ幅が追随すべきのため）
- `openDelay`/`closeDelay`/`interactive`/`closeOnEscape` はクライアント側（wasm-full）の責務でスコープ外
- variant（size 等）は持たない

## Related

- [primitives/overlays/tooltip](../../primitives/overlays/tooltip.md)
- [toggle-tip](./toggle-tip.md)
- [hover-card](./hover-card.md)
