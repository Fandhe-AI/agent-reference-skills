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
let node = root(OpenState::Open, vec![], vec![
    content(OpenState::Open, Some("pop-1"), Some("pop-1-title"), Some("pop-1-desc"), vec![], vec![
        title(Some("pop-1-title"), vec![], vec![]),
        description(Some("pop-1-desc"), vec![], vec![]),
    ]),
]);
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
| `root(state, attrs, children)` / `trigger`/`anchor`/`positioner`/`arrow`/`arrow_tip`/`close_trigger`/`indicator` | `OpenState` | — | いずれも headless `popover` の同名関数をそのまま再エクスポート（`pub use fandhe_frontend_headless_ui::popover::*`）。`trigger` は暗黙 submit 事故防止で `type="button"` 固定 |
| `content(state, id, labelledby, describedby, attrs, children)` | `OpenState`, `id: Option<&str>`, `labelledby: Option<&str>`, `describedby: Option<&str>` | すべて `None` | headless `popover` の同名関数をそのまま再エクスポート。`id`/`labelledby`/`describedby` が `Some` のときそれぞれ `id`/`aria-labelledby`/`aria-describedby` を出力（dialog と異なり `ContentIds` 構造体は使わず個別引数） |
| `title(id, attrs, children)` / `description(id, attrs, children)` | `id: Option<&str>` | `id: None` | headless `popover` の同名関数をそのまま再エクスポート。`id` が `Some` のとき `content` の `labelledby`/`describedby` と対にする |
| `stylesheet()` | — | — | 既定 CSS 全量。`positioner` は `position: absolute; top: 100%; left: 0; z-index: 10` |

## Notes

- `@chakra-ui/react` の JS/TS API とは別物（Rust 製、`fandhe-frontend-pre-styled-ui` クレート）
- `content` の `min-width` は `var(--fandhe-reference-width, auto)`（トリガー実測幅へ追随、SSR では `auto` にフォールバック）
- フォーカストラップ・Escape キー閉鎖・外側クリック閉鎖・アニメーションはスコープ外
- variant（size 等）は持たない
- `root`/`trigger`/`anchor`/`positioner`/`arrow`/`arrow_tip`/`content`/`title`/`description`/`close_trigger`/`indicator` は本モジュール（`pre-styled-ui::popover`）で再定義されておらず、`pub use fandhe_frontend_headless_ui::popover::*` により headless の同名関数をそのまま再エクスポートしたもの（本モジュール固有の定義は `stylesheet()` のみ）。`state`/`id`/`labelledby`/`describedby` は headless 側の関数がもともと取る引数であり、dialog/drawer の `root`（styled 側で再定義され `size` 引数を追加する）とは性質が異なる
- `Popover` 状態機械は本モジュールから再エクスポートされる（dialog/drawer とは異なり headless 型を隠さない）

## Related

- [primitives/overlays/popover](../../primitives/overlays/popover.md)
- [floating-panel](./floating-panel.md)
