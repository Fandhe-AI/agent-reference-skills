# Floating Panel

ドラッグ移動・リサイズ可能な非モーダルオーバーレイ（styled）。`fandhe-frontend-headless-ui` の `floating_panel` を `pub use ...::*` で再エクスポートし、`stylesheet()` で既定 CSS を追加提供する薄いラッパー。

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::floating_panel::{
    root, trigger, positioner, content, header, title, control, stage_trigger, close_trigger,
    body, stylesheet,
};
use fandhe_frontend_pre_styled_ui::floating_panel::{OpenState, Stage};

let css = stylesheet();
let node = root(OpenState::Open, Stage::Default, vec![], vec![]);
```

## Anatomy

```
root
  ├─ trigger
  └─ positioner
      └─ content
          ├─ header
          │   ├─ title
          │   └─ control
          │       ├─ stage-trigger
          │       └─ close-trigger
          └─ body
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `root`/`trigger`/`positioner`/`content`/`header`/`title`/`control`/`stage_trigger`/`close_trigger`/`body` | — | — | headless `floating_panel` の同名関数をそのまま再エクスポート |
| `stylesheet()` | — | — | 既定 CSS 全量。`positioner` は `transform: translate3d(var(--fandhe-x), var(--fandhe-y), 0)` で座標反映、`z-index: 900` |

## Notes

- `@chakra-ui/react` の JS/TS API とは別物（Rust 製、`fandhe-frontend-pre-styled-ui` クレート）
- `data-stage="minimized"` で `body` を `display: none` に折り畳み、`data-stage="maximized"` で `positioner` をビューポート全面（`transform: none; inset: 0`）に切り替え
- ドラッグ移動・リサイズの実 DOM 配線・座標実測値の注入はスコープ外（`--fandhe-x`/`--fandhe-y` を消費するのみ）
- variant（size 等）は持たない

## Related

- [primitives/overlays/floating-panel](../../primitives/overlays/floating-panel.md)
- [popover](./popover.md)
