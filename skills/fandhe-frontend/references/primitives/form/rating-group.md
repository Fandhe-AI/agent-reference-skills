# Rating Group

`radiogroup` として構築された星/アイコン形式の評価セレクター。ホバープレビューをサポートする。

## Signature / Usage

```rust
use fandhe_frontend_headless_ui::rating_group::{self, RatingGroup, RatingGroupProps};

let rating = RatingGroup::new(5, Some(3), false);
let props = RatingGroupProps::default();

rating_group::root(&props, vec![], vec![
    rating_group::control(&props, None, vec![], vec![
        rating.item(1, false, "1 star", vec![], vec![]),
        // ... one item() per index (1-origin) up to count
        rating.hidden_input(Some("rating"), false, vec![]),
    ]),
]);
```

フリー関数: `rating_group::root(props: &RatingGroupProps, attrs, children)`, `label(props, id: Option<&str>, attrs, children)`, `control(props, labelled_by: Option<&str>, attrs, children)`, `item(index: u32, flags: RatingItemFlags, aria_label, attrs, children)`, `hidden_input(props, name: Option<&str>, value_text, attrs)`。`RatingGroup` のメソッドは `item(index, disabled, aria_label, attrs, children)` と `hidden_input(name, disabled, attrs)` のみ（`root` / `label` / `control` の利便メソッドは styled `root` との取り違えを防ぐため意図的に持たない）。

## Anatomy

- `root` — `<div>`（`role` なし）
- `label` — `<span>`
- `control` — `<div role="radiogroup">`
- `item` — `<span role="radio">`（評価ステップごとに 1 つ、`index` は 1-origin）
- `hidden-input` — `<input type="hidden">`

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `RatingGroup::new(count, value, readonly)` | `u32, Option<u32>, bool` | `count == 0` は `5` へ、`value` が `1..=count` 範囲外は `None`（未評価）へ正規化 |
| `RatingGroupProps.disabled` | `bool`（既定 `false`） | `data-disabled`（root / label / control / hidden-input）、`control` に `aria-disabled="true"`、`hidden_input` にネイティブ `disabled` |
| `RatingGroupProps.readonly` | `bool`（既定 `false`） | `data-readonly`（root / control）、`control` に `aria-readonly="true"` |
| `RatingGroupProps.required` | `bool`（既定 `false`） | `label` に `data-required`、`control` に `aria-required="true"`（`type="hidden"` では無効のため `hidden_input` には付与しない） |
| `RatingItemFlags` | struct | `checked` / `highlighted` / `disabled` / `readonly`（既定すべて `false`）。`item` の `aria-checked` / `data-checked` / `data-highlighted` / `data-disabled` / `data-readonly` に反映 |
| `item.aria_label` | `&str` | 呼び出し側が必須で与えるラベル（例: `"1 star"`）。`aria-label` に出力 |
| `hidden_input.name` | `Option<&str>` | `Some` のときのみ `name` を出力 |
| `hidden_input.value_text` | `&str` | `type="hidden"` の `value`（`RatingGroup::value_text()` は未評価で空文字列） |
| `RatingGroup.hover()` | `Option<u32>` | ホバープレビューのインデックス。確定した `value` とは別 |
| `display_value()` | `Option<u32>` | `hover` が設定されていればそれ、なければ `value` |
| `is_checked(index)` / `is_highlighted(index)` | `bool` | |

## Notes

- `RatingGroupAction` は確定選択とホバープレビューの両方の遷移をサポートする（dispatch `"set"` / `"hover"` / `"clear-hover"`）。`readonly` のとき `SetValue` / `Hover` は no-op
- `hover` は transient な状態で hydration では直列化されない（復元後は常に `hover = None`）
- `item` は `tabindex` を出力しない（click / hover / キー入力の DOM 配線が未提供のため）。半星（`allow_half`）は未提供
- `item` の `data-value` は index の 10 進文字列、`data-checked` は `index == value`、`data-highlighted` は `index <= display_value`（`hover` 優先）で付与される存在属性
- `@ark-ui/react` の JS/TS API とは別物（Rust 製、`fandhe-frontend-headless-ui`）

## Related

- [Radio Group](./radio-group.md)
