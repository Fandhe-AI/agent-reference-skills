# Field

ラベル・補助テキスト・エラーテキスト・必須マークの型階層と `root` の余白レイアウトを提供するスタイル済み Field 部品。Root / Label / HelperText / ErrorText / RequiredIndicator の 5 パーツに Group / Content / Title / Separator（内部パーツ SeparatorLine / SeparatorContent）の 6 パーツ（イシュー #2185）を加えた計 11 パーツ。

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::field::{self, FieldIds, FieldProps, FieldRootProps};

let f = FieldProps {
    id: "email",
    ids: FieldIds::default(),
    disabled: false,
    invalid: false,
    required: false,
    readonly: false,
    has_helper_text: false,
};
let node = field::root(&FieldRootProps::default(), &f, vec![], vec![]);
```

`css() -> String` が静的 CSS 全量を返す（決定的）。

```rust
pub fn root<'a>(props: &FieldRootProps, field: &FieldProps<'_>, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn root_with_label_placement<'a>(props: &FieldRootProps, placement: FieldLabelPlacement, field: &FieldProps<'_>, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn inset_stack<'a>(attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
```

headless 層から再エクスポート: `content` / `error_text` / `group` / `helper_text` / `label` / `required_indicator` / `separator` / `title` / `FieldIds` / `FieldProps`。

## Anatomy

`root` / `label` / `helper-text` / `error-text` / `required-indicator` / `group` / `content` / `title` / `separator` / `separator-line` / `separator-content`

## Options / Props

`FieldRootProps`:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `orientation` | `FieldOrientation`（`Vertical` \| `Horizontal` \| `Responsive`） | `Vertical` | 配置軸。`Responsive` は `group` の inline サイズが 448px 以上のときのみ `Horizontal` と同じ横並びになる（`group` の外では常に縦積み） |

`FieldLabelPlacement`（`root_with_label_placement` の引数、`orientation` とは独立）:

| Value | Description |
|-------|-------------|
| `Outside`（既定） | 従来のラベル配置。`root` と同じ出力 |
| `Inset` | ラベルを枠の内側・上部に置く。`inset_stack` 直下に縦に並べると枠線を共有して連結する |
| `Overlap` | ラベルを `root` の枠線の上へ重ねる。`--fandhe-field-label-bg` でラベル背景を地の色に合わせられる |

`FieldProps`（headless 層）: `id` / `ids: FieldIds` / `disabled` / `invalid` / `required` / `readonly` / `has_helper_text`。`FieldIds`: `root` / `control` / `label` / `helper_text` / `error_text`（いずれも `Option<&str>`）。

## Notes

- 出典: https://fandhe-ai.github.io/fandhe-frontend/themes/field/
- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）
- コントロール（input / textarea / select）は本部品が所有せず、[Input](./input.md) / [Textarea](./textarea.md) / [Native Select](./native-select.md) が同じ headless-ui `field` scope を共有して提供する
- `data-invalid` / `data-disabled` / `data-required` / `data-readonly` は headless 層が出力する状態を CSS セレクタとして参照するだけで、値の妥当性判定・送信処理は実装しない
- `data-invalid` のとき Label のテキスト色もエラー色（`--fandhe-color-danger`）になる。エラー内容は ErrorText のテキストで別途伝わる
- `horizontal`（および 448px 以上の `responsive`）のとき HelperText は `text-wrap: balance` で行長を均す（イシュー #2160。未対応ブラウザでは通常の折り返し）
- Content / Title は `<label for>` を結び付けにくい場面（複数コントロールの見出し等）で Label の代替として使う。Title は `for` / `id` を自動導出しないため、呼び出し側が Title の `id` を対応するコントロールの `aria-labelledby` へ渡す
- ErrorText に `<ul>`（各エラーを `<li>`）を子要素として渡すと複数エラー向けのリスト整形（縦積み・字下げ・disc マーカー）が適用される。`<ul>` / `<li>` の組み立てや重複排除は呼び出し側が `fandhe_frontend_core::el` / `text` で行う
- `Inset` / `Overlap` はどちらも枠線を `root` が描くため、`data-invalid`（枠線色）とフォーカスリングは `root` 側で表示される（`data-disabled` の半透明化は従来どおり各パーツ側のみ）。`orientation = Vertical` での使用が前提で、`Horizontal` / `Responsive` との併用は対象外
- `inset_stack` の外（`group` の中など）では `Inset` の枠線連結は発動しない

## Related

- [Field (primitives)](../../primitives/form/field.md)
- [Fieldset](./fieldset.md)
- [Input](./input.md)
- [Textarea](./textarea.md)
- [Native Select](./native-select.md)
- [Input Group](./input-group.md)
