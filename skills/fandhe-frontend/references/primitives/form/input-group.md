# Input Group

入力欄の前後にテキスト・アイコン・ボタンなどの addon を配置する複合パターン。`root` / `addon` / `text` / `button` の 4 パーツで構成され、実際の `<input>` / `<textarea>` は Field の `input` / `textarea` を呼び出し側が子として合成する。状態機械を持たない静的部品。

## Signature / Usage

```rust
use fandhe_frontend_core::text;
use fandhe_frontend_headless_ui::input_group::{self, InputGroupAlign, InputGroupProps};

let props = InputGroupProps { disabled: false, invalid: false };

let node = input_group::root(&props, vec![], vec![
    input_group::addon(InputGroupAlign::InlineStart, &props, vec![], vec![
        input_group::text(vec![], vec![text("https://")]),
    ]),
    // 実際の <input> は Field の field::input(...) を呼び出し側が合成する
    input_group::addon(InputGroupAlign::InlineEnd, &props, vec![], vec![
        input_group::button(&props, vec![], vec![text("Copy")]),
    ]),
]);
```

```rust
input_group::root(props: &InputGroupProps, attrs, children) -> Node
input_group::addon(align: InputGroupAlign, props: &InputGroupProps, attrs, children) -> Node
input_group::text(attrs, children) -> Node
input_group::button(props: &InputGroupProps, attrs, children) -> Node
InputGroupProps::merge_field_props<'a>(&self, field: FieldProps<'a>) -> FieldProps<'a>
```

## Anatomy

```
root
  addon
    text
    button
  (field の input / textarea を呼び出し側が合成)
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `InputGroupProps.disabled` | `bool` | — | `true` のとき `root` / `addon` / `button` に `data-disabled`。`button` はネイティブ `disabled` も付与 |
| `InputGroupProps.invalid` | `bool` | — | `true` のとき `root` に `aria-invalid="true"` + `data-invalid`、`addon` に `data-invalid` |
| `addon: align` | `InputGroupAlign` | `InlineStart` | `InlineStart` \| `InlineEnd` \| `BlockStart` \| `BlockEnd`。`data-align` に反映 |

## Data Attributes

| Part | Attribute | Values |
| --- | --- | --- |
| addon | `data-align` | `inline-start` \| `inline-end` \| `block-start` \| `block-end` |
| root / addon / button | `data-disabled` | presence |
| root / addon | `data-invalid` | presence |

## Notes

- 出典: https://fandhe-ai.github.io/fandhe-frontend/primitives/input-group/
- `root` は `div` で `role="group"` を固定付与。`addon` に `role="group"` は重ねない（入れ子のグループ情報の冗長化を避ける）。
- `inline-*` は `<input>` の前後、`block-*` は `<textarea>` の上下に addon を置く用途を想定。
- `button` は `button type="button"` 固定（暗黙 submit 防止）。
- `merge_field_props` は `disabled` と `invalid` の両方を `FieldProps` へ OR 伝播する。Fieldset の `merge_field_props` が `invalid` を伝播しないのに対し、Input Group は 1 group = 1 control のため。
- `aria-labelledby` / `aria-describedby` は付与しない。アクセシブルネームは Field の `label`、補足説明は `helper_text` / `error_text` が担う。`text` は `aria-label` を持たない可視テキスト。
- addon クリックで input へフォーカスを移す JS 挙動と、`button` の `size` / `variant` は本層の範囲外（`variant` 等の装飾は pre-styled-ui の責務）。
- `@ark-ui/react` の JS/TS API とは別物（Rust 製、`fandhe-frontend-headless-ui`）。

## Related

- [Field](./field.md)
- [Fieldset](./fieldset.md)
- [Button Group](./button-group.md)
- [Input Group（Themes 版）](../../themes/forms/input-group.md)
