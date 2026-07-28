# Menubar

headless `menubar`（11 anatomy parts: root, menu, trigger, positioner, content, item, item-group, item-group-label, separator, sub-trigger, sub-content）を包む styled wrapper。headless モジュール全体（`pub use ...::*`）と `Menubar` roving-tabindex 状態機械を再エクスポートし、既定 CSS のみを追加する。`size`/`color-palette` variant は提供**しない**。

## Signature / Usage

```rust
pub use fandhe_frontend_headless_ui::menubar::*;
pub use fandhe_frontend_headless_ui::data_attrs::Orientation;
pub use fandhe_frontend_headless_ui::state::OpenState;

pub fn stylesheet() -> String
```

## Options / Props

variant パラメータなし — 単一の既定外観のみ。`root`/`item`/`sub-trigger` のスタイリングは `data-orientation`、`data-state`、`data-highlighted`、`data-disabled` に反応する。

## Notes

- `menu` スロットは `position: relative`（自身の `positioner` の containing block）を持つ。`content` も `sub-content` の containing block として `position: relative` を持つ（`sub-trigger`/`sub-content` は祖先子孫関係ではなく兄弟）
- `trigger` は `:focus-visible`（ネイティブ `<button>`）を受け取る。`item`/`sub-trigger` は代わりに `data-highlighted`（仮想フォーカス）を使う
- `@ark-ui/react` の JS/TS API とは別物（Rust 製）

## Related

- [menubar (primitives)](../../primitives/collections/menubar.md)
- [menu](./menu.md)
