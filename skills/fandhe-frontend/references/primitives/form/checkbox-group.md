# Checkbox Group

`crate::state::MultiSelect` の上に構築された複数選択グループ（「同時に0個以上選択」）。単一選択版である `radio_group` と構造的に対称。

## Signature / Usage

```rust
use fandhe_frontend_headless_ui::checkbox_group::{self, CheckboxGroup, CheckboxGroupProps};
use fandhe_frontend_headless_ui::checkbox::hidden_input as checkbox_hidden_input;

let group = CheckboxGroup::default();
let item = CheckboxGroupProps::default(); // 項目単体の disabled / readonly / invalid

group.item("red", item, vec![], vec![
    // native <input type="checkbox"> is reused from crate::checkbox::hidden_input
    // （group.item_hidden_input(value, CheckboxProps, name, attrs) でも組み立てられる）
    group.item_control("red", item, vec![], vec![
        group.item_indicator("red", item, vec![], vec![]),
    ]),
    group.item_text("red", item, vec![], vec![]),
]);
```

フリー関数: `checkbox_group::root(props: &CheckboxGroupProps, orientation: Option<Orientation>, labelled_by: Option<&str>, attrs, children)`, `label(id: Option<&str>, attrs, children)`, `item(checked: bool, props: &CheckboxGroupProps, value, attrs, children)`, `item_control(checked, props, attrs, children)`, `item_indicator(checked, props, attrs, children)`, `item_text(checked, props, attrs, children)`。`root` / `label` は状態非依存のため `CheckboxGroup` に利便メソッドは無い。

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
| `CheckboxGroupProps.disabled` / `readonly` / `invalid` | `bool`（既定 `false`） | root / item / item-control / item-indicator / item-text に `data-disabled` / `data-readonly` / `data-invalid` を一律出力。`CheckboxGroup` の利便メソッドは root（`set_props` / `with_props` / `set_disabled` / `set_invalid` / `set_readonly`）と項目単体の値を OR した実効値を注入する |
| `orientation` | `Option<Orientation>` | `Some` のとき `root` に `data-orientation` を発行する（`aria-orientation` は発行しない） |
| `labelled_by` | `Option<&str>` | `Some` のとき `root` に `aria-labelledby` を発行する |
| `label.id` | `Option<&str>` | `Some` のとき `id` を出力（`root` の `labelled_by` と対で使う） |

## Notes

- ディスパッチ語彙は `"select"`/`"deselect"`/`"toggle"`（チェックボックス意味論では解除が可能なため、`"select"` のみの `radio_group` と非対称）
- `CheckboxGroup::selected()` / `is_checked(value)` で現在の選択状態を読み取る
- `role="group"` の `root` に `aria-orientation` は付与しない（WAI-ARIA 1.2 で `group` ロールは対象外）。`data-orientation` は維持
- `CheckboxGroup::item_hidden_input(value, props: CheckboxProps, name, attrs)` は root の disabled / invalid / readonly を OR し、`props.checked` を現在の選択状態で常に上書きして `checkbox::hidden_input` へ渡す
- `disabled` / `invalid` / `readonly` は hydration 状態形式（`data-hydrate-disabled` / `-invalid` / `-readonly`）でも往復する
- 矢印キーによる項目間移動（roving tabindex）は採用しない（各ネイティブ checkbox が独立した Tab ストップ）
- `@ark-ui/react` の JS/TS API とは別物（Rust 製、`fandhe-frontend-headless-ui`）

## Related

- [Checkbox](./checkbox.md)
- [Radio Group](./radio-group.md)
