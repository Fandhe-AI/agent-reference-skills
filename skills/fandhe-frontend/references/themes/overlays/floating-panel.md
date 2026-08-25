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
let node = root(OpenState::Open, Stage::Default, vec![], vec![
    content(OpenState::Open, Stage::Default, Some("fp-1"), Some("fp-1-title"), vec![], vec![
        header(vec![], vec![title(Some("fp-1-title"), vec![], vec![])]),
    ]),
]);
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
| `root(state, stage, attrs, children)` / `trigger`/`positioner`/`header`/`control`/`stage_trigger`/`close_trigger`/`body` | `OpenState`, `Stage` | — | いずれも headless `floating_panel` の同名関数をそのまま再エクスポート（`pub use fandhe_frontend_headless_ui::floating_panel::*`） |
| `content(state, stage, id, labelledby, attrs, children)` | `OpenState`, `Stage`, `id: Option<&str>`, `labelledby: Option<&str>` | すべて `None` | headless `floating_panel` の同名関数をそのまま再エクスポート。`role="dialog"` 固定（`aria-modal` は付与しない = 非モーダル）。`labelledby` が `Some` のとき `aria-labelledby` を出力 |
| `title(id, attrs, children)` | `id: Option<&str>` | `id: None` | headless `floating_panel` の同名関数をそのまま再エクスポート。`id` が `Some` のとき `content` の `labelledby` と対にする |
| `stylesheet()` | — | — | 既定 CSS 全量。`positioner` は `transform: translate3d(var(--fandhe-x), var(--fandhe-y), 0)` で座標反映、`z-index: 900` |

## Notes

- `@chakra-ui/react` の JS/TS API とは別物（Rust 製、`fandhe-frontend-pre-styled-ui` クレート）
- `data-stage="minimized"` で `body` を `display: none` に折り畳み、`data-stage="maximized"` で `positioner` をビューポート全面（`transform: none; inset: 0`）に切り替え
- ドラッグ移動・リサイズの実 DOM 配線・座標実測値の注入はスコープ外（`--fandhe-x`/`--fandhe-y` を消費するのみ）
- variant（size 等）は持たない
- `root`/`trigger`/`positioner`/`content`/`header`/`title`/`control`/`stage_trigger`/`close_trigger`/`body` は本モジュール（`pre-styled-ui::floating_panel`）で再定義されておらず、`pub use fandhe_frontend_headless_ui::floating_panel::*` により headless の同名関数をそのまま再エクスポートしたもの（本モジュール固有の定義は `stylesheet()` のみ。popover と同じ構成）。`state`/`stage`/`id`/`labelledby` は headless 側の関数がもともと取る引数であり、dialog/drawer の `root`（styled 側で再定義され `size` 引数を追加する）とは性質が異なる

## Related

- [primitives/overlays/floating-panel](../../primitives/overlays/floating-panel.md)
- [popover](./popover.md)
