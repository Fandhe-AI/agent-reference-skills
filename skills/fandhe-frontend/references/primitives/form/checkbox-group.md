# Checkbox Group

`crate::state::MultiSelect` の上に構築された複数選択グループ（「同時に0個以上選択」）。単一選択版である `radio_group` と構造的に対称。

## Signature / Usage

```rust
use fandhe_frontend_headless_ui::checkbox_group::{self, CheckboxGroup};
use fandhe_frontend_headless_ui::checkbox::hidden_input as checkbox_hidden_input;

let group = CheckboxGroup::default();

group.item("red", false, vec![], vec![
    // native <input type="checkbox"> is reused from crate::checkbox::hidden_input
    group.item_control("red", false, vec![], vec![
        group.item_indicator("red", false, vec![], vec![]),
    ]),
    group.item_text("red", false, vec![], vec![]),
]);
```

フリー関数: `checkbox_group::root(disabled, orientation: Option<Orientation>, labelled_by: Option<&str>, attrs, children)`, `label(id, attrs, children)`, `item(checked, disabled, value, attrs, children)`, `item_control(checked, disabled, attrs)`, `item_text(checked, disabled, attrs, children)`。

## Anatomy

- `root` — `<div role="group">`
- `label` — `<span>`
- `item` — `<label>`、`data-state`（`"checked"`/`"unchecked"`） + `data-value`
- `item-control` — `<span>`（`role="checkbox"`/`aria-checked` なし、意味論はネイティブ input が担う）
- `item-indicator` — `<span>`、unchecked のとき `hidden`
- `item-text` — `<span>`

専用の `item-hidden-input` パートは存在しない。`item` にネストされた `crate::checkbox::hidden_input` 由来のネイティブ `<input type="checkbox">` を再利用する。

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `orientation` | `Option<Orientation>` | `Some` のとき `data-orientation`/`aria-orientation` を発行する |
| `labelled_by` | `Option<&str>` | `Some` のとき `root` に `aria-labelledby` を発行する |

## Notes

- ディスパッチ語彙は `"select"`/`"deselect"`/`"toggle"`（チェックボックス意味論では解除が可能なため、`"select"` のみの `radio_group` と非対称）
- `CheckboxGroup::selected()` / `is_checked(value)` で現在の選択状態を読み取る
- `@ark-ui/react` の JS/TS API とは別物（Rust 製、`fandhe-frontend-headless-ui`）

## Related

- [Checkbox](./checkbox.md)
- [Radio Group](./radio-group.md)
