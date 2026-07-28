# Toggle Group

トグルボタンのグループ。単一選択版（`ToggleGroup`）と複数選択版（`MultiToggleGroup`）の2種類を提供する。

## Signature / Usage

```rust
use fandhe_frontend_headless_ui::toggle_group::{self, ToggleGroup, MultiToggleGroup};

let group = ToggleGroup::default();
group.item("bold", false, vec![], vec![]);

let multi = MultiToggleGroup::default();
multi.item("bold", false, vec![], vec![]);
```

フリー関数: `toggle_group::root(disabled, orientation: Option<Orientation>, labelled_by, attrs, children)`, `item(pressed, disabled, value, attrs, children)`。

## Anatomy

- `root` — `<div>`
- `item` — 値ごとの `<button>`、`aria-pressed`/`data-state`

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `ToggleGroup::value()` | `Option<&str>` | 単一選択の現在値 |
| `MultiToggleGroup::values()` | `&[String]` | 複数選択の現在値 |
| `is_pressed(value)` | `bool` | 両バリアント共通 |

## Notes

- `ToggleGroup` と `MultiToggleGroup` は同じ `root`/`item` フリー関数とパート形状を共有し、内蔵する状態機械（`SingleSelect` vs `MultiSelect`）のみが異なる
- `@ark-ui/react` の JS/TS API とは別物（Rust 製、`fandhe-frontend-headless-ui`）

## Related

- [Toggle](./toggle.md)
- [Segment Group](./segment-group.md)
