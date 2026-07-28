# Rating Group

`radiogroup` として構築された星/アイコン形式の評価セレクター。ホバープレビューをサポートする。

## Signature / Usage

```rust
use fandhe_frontend_headless_ui::rating_group::{self, RatingGroup, RatingItemFlags};

let rating = RatingGroup::new(5, Some(3), false);

rating.control(None, vec![
    rating.item(0, RatingItemFlags::default(), "1 star", vec![], vec![]),
    // ... one item() per index up to count
    rating.hidden_input(vec![]),
]);
```

フリー関数: `rating_group::root(disabled, readonly, attrs, children)`, `label(id, attrs, children)`, `control(labelled_by, attrs, children)`, `item(index, flags: RatingItemFlags, aria_label, attrs, children)`, `hidden_input(name, value_text, disabled, attrs)`。

## Anatomy

- `root`, `label`, `control` — `<div role="radiogroup">`
- `item` — 評価ステップごとに1つ
- `hidden-input` — `<input type="hidden">`

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `RatingGroup::new(count, value, readonly)` | `u32, Option<u32>, bool` | |
| `RatingGroup.hover()` | `Option<u32>` | ホバープレビューのインデックス。確定した `value` とは別 |
| `display_value()` | `Option<u32>` | `hover` が設定されていればそれ、なければ `value` |
| `is_checked(index)` / `is_highlighted(index)` | `bool` | |

## Notes

- `RatingGroupAction` は確定選択とホバープレビューの両方の遷移をサポートする
- `@ark-ui/react` の JS/TS API とは別物（Rust 製、`fandhe-frontend-headless-ui`）

## Related

- [Radio Group](./radio-group.md)
