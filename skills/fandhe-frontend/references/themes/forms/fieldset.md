# Fieldset

複数の Field をネイティブ `<fieldset>` / `<legend>` でグループ化するスタイル済み Fieldset 部品。Root / Legend / HelperText / ErrorText の 4 パーツ構成。

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::fieldset::{self, FieldsetProps, FieldsetRootProps};

let props = FieldsetProps {
    id: "address",
    disabled: false,
    invalid: false,
    has_helper_text: false,
};
let node = fieldset::root(&FieldsetRootProps::default(), &props, vec![], vec![]);
```

`css() -> String` が静的 CSS 全量を返す（決定的）。

```rust
pub fn root<'a>(props: &FieldsetRootProps, fieldset: &FieldsetProps<'_>, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
```

headless 層から再エクスポート: `error_text` / `helper_text` / `legend` / `legend_with_variant` / `FieldsetProps` / `LegendVariant`。

```rust
pub fn legend_with_variant(variant: LegendVariant, props: &FieldsetProps<'_>, attrs: Vec<(&str, &str)>, children: Vec<Node>) -> Node
```

## Anatomy

`root` / `legend` / `helper-text` / `error-text`

## Options / Props

`FieldsetRootProps`:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `Size`（`Sm` \| `Md` \| `Lg`） | `Md` | 余白・文字サイズの段階 |

`LegendVariant`（`legend_with_variant` の引数）:

| Value | Description |
|-------|-------------|
| `Legend`（既定・大見出し） | `legend` |
| `Label` | `size` 軸の 1 段下の小見出し（`label`） |

`FieldsetProps`: `id` / `disabled` / `invalid` / `has_helper_text`。

## Notes

- 出典: https://fandhe-ai.github.io/fandhe-frontend/themes/fieldset/
- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）
- UA 既定の `<fieldset>` / `<legend>` 枠線・padding をリセットする。`orientation` / `colorPalette` 軸は持たない
- 内側の各 Field（ラベル・入力欄・補助テキスト等）は本部品が所有せず、[Field](./field.md) / [Input](./input.md) 等が担う
- `data-disabled` / `data-invalid` は headless 層が出力する状態を CSS セレクタとして参照するだけで、値の妥当性判定・送信処理は実装しない
- `legend_with_variant` は shadcn/ui `FieldLegend` の `variant` prop と突合（イシュー #2214）。既存の `legend` は `data-variant` を出力しない契約のまま不変

## Related

- [Fieldset (primitives)](../../primitives/form/fieldset.md)
- [Field](./field.md)
- [Input](./input.md)
