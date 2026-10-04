# Radio Group

`crate::state::SingleSelect` の上に構築された単一選択のフォームコントロール。

## Signature / Usage

```rust
use fandhe_frontend_headless_ui::radio_group::{self, RadioGroup, RadioGroupProps};

let group = RadioGroup::default();
let props = RadioGroupProps::default();

group.item("red", &props, vec![], vec![
    group.item_control("red", &props, vec![]),
    group.item_text("red", &props, vec![], vec![]),
    group.item_hidden_input("red", &props, Some("colors"), vec![]),
]);
```

フリー関数: `radio_group::root(props: &RadioGroupProps, orientation: Option<Orientation>, labelled_by: Option<&str>, attrs, children)`, `label(props, id: Option<&str>, attrs, children)`, `item(checked: bool, props, value, attrs, children)`, `item_control(checked, props, attrs)`, `item_text(checked, props, attrs, children)`, `item_hidden_input(checked, props, name: Option<&str>, value, attrs)`。`root` / `label` は状態非依存のため `RadioGroup` に利便メソッドは無い。`RadioGroup` は `RadioGroupProps` を保持せず、メソッドは呼び出し側の `props` 引用を受け取る。

## Anatomy

- `root` — `<div role="radiogroup">`
- `label` — `<span>`
- `item` — `<label>`、`data-state`（`"checked"`/`"unchecked"`）
- `item-control` — `<span aria-hidden="true">`
- `item-text` — `<span>`
- `item-hidden-input` — `<input type="radio">`、自前実装（`crate::checkbox::hidden_input` を再利用する `checkbox_group` とは異なる）

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `RadioGroup::value()` | `Option<&str>` | 現在選択されている値 |
| `is_checked(value)` | `bool` | |
| `RadioGroupProps.disabled` | `bool`（既定 `false`） | `data-disabled`（root / label / item 系）、`root` に `aria-disabled="true"`、`item_hidden_input` にネイティブ `disabled` |
| `RadioGroupProps.readonly` | `bool`（既定 `false`） | `item` / `item_control` / `item_text` に `data-readonly`、`root` に `aria-readonly="true"`（`root` に `data-readonly` は出力せず、ネイティブ `readonly` も付与しない） |
| `RadioGroupProps.invalid` | `bool`（既定 `false`） | `data-invalid`（root / label / item 系）、`item_hidden_input` に `aria-invalid="true"` |
| `RadioGroupProps.required` | `bool`（既定 `false`） | `data-required`（root / label）、`root` に `aria-required="true"`、`item_hidden_input` にネイティブ `required` |
| `root.orientation` | `Option<Orientation>` | `Some` のときのみ `root` に `data-orientation` と `aria-orientation` を出力 |
| `root.labelled_by` | `Option<&str>` | `Some` のときのみ `aria-labelledby` を出力 |
| `item_hidden_input.name` | `Option<&str>` | `Some` のときのみ `name` を出力 |

## Notes

- 呼び出し側 `attrs` による固定属性（`data-state` / `data-disabled` / `data-invalid` / `data-readonly` / `data-required` / `data-value`、`root` の `role` / `aria-*`、`item_hidden_input` の `type` / `name` / `value` / `checked` 等）の上書きは除去される
- `readonly` による選択変更の抑止はクライアント層の責務（`item` の `data-readonly` を参照）。JS 無効時はネイティブ radio が `readonly` 非対応のため防げない

- ディスパッチ語彙は `"select"` のみ（解除なし。ラジオには「クリア」ジェスチャーがなく、`checkbox_group` の `select`/`deselect`/`toggle` とは非対称）
- `@ark-ui/react` の JS/TS API とは別物（Rust 製、`fandhe-frontend-headless-ui`）

## Related

- [Checkbox Group](./checkbox-group.md)
- [Segment Group](./segment-group.md)
