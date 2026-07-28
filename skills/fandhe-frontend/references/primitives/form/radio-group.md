# Radio Group

`crate::state::SingleSelect` の上に構築された単一選択のフォームコントロール。

## Signature / Usage

```rust
use fandhe_frontend_headless_ui::radio_group::{self, RadioGroup};

let group = RadioGroup::default();

group.item("red", false, vec![], vec![
    group.item_control("red", false, vec![]),
    group.item_text("red", false, vec![], vec![]),
    group.item_hidden_input("colors", "red", false, vec![]),
]);
```

フリー関数: `radio_group::root(disabled, orientation: Option<Orientation>, labelled_by, attrs, children)`, `label(id, attrs, children)`, `item(checked, disabled, value, attrs, children)`, `item_control(checked, disabled, attrs)`, `item_text(checked, disabled, attrs, children)`, `item_hidden_input(checked, disabled, name, value, attrs)`。

## Anatomy

- `root` — `<div role="radiogroup">`
- `label` — `<span>`
- `item` — `<label>`、`data-state`（`"checked"`/`"unchecked"`）
- `item-control` — `<span>`
- `item-text` — `<span>`
- `item-hidden-input` — `<input type="radio">`、自前実装（`crate::checkbox::hidden_input` を再利用する `checkbox_group` とは異なる）

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `RadioGroup::value()` | `Option<&str>` | 現在選択されている値 |
| `is_checked(value)` | `bool` | |

## Notes

- ディスパッチ語彙は `"select"` のみ（解除なし。ラジオには「クリア」ジェスチャーがなく、`checkbox_group` の `select`/`deselect`/`toggle` とは非対称）
- `@ark-ui/react` の JS/TS API とは別物（Rust 製、`fandhe-frontend-headless-ui`）

## Related

- [Checkbox Group](./checkbox-group.md)
- [Segment Group](./segment-group.md)
