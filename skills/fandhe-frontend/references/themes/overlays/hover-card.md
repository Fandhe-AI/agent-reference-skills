# Hover Card

ホバー/フォーカスでリンクプレビューを表示するオーバーレイ（styled）。`fandhe-frontend-headless-ui` の `hover_card` を `pub use ...::*` で再エクスポートし、`stylesheet()` で既定 CSS を追加提供する薄いラッパー。

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::hover_card::{
    root, trigger, positioner, content, arrow, arrow_tip, stylesheet,
};
use fandhe_frontend_pre_styled_ui::hover_card::{OpenState, HoverCardDelays};

let css = stylesheet();
let node = root(OpenState::Open, HoverCardDelays::default(), vec![], vec![]);
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
| `root`/`trigger`/`positioner`/`content`/`arrow`/`arrow_tip` | — | — | headless `hover_card` の同名関数をそのまま再エクスポート |
| `HoverCardDelays` | `struct { open_ms, close_ms }` | `open_ms: 600`, `close_ms: 300` | `root` の第2引数（ドキュメント記載の既定値） |
| `stylesheet()` | — | — | 既定 CSS 全量。`positioner` は `position: absolute; top: 100%; left: 0; z-index: 10` |

## Notes

- `@chakra-ui/react` の JS/TS API とは別物（Rust 製、`fandhe-frontend-pre-styled-ui` クレート）
- `content` は `sameWidth` 相当（`--fandhe-reference-width`）を意図的に消費しない（プレビュー内容へ幅が追随すべきのため）
- `openDelay`/`closeDelay`/`interactive` の実行時挙動はクライアント側の責務でスコープ外
- variant（size 等）は持たない

## Related

- [primitives/overlays/hover-card](../../primitives/overlays/hover-card.md)
- [tooltip](./tooltip.md)
