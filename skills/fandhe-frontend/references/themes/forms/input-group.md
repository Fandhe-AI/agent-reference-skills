# Input Group

入力欄の前後にテキスト・アイコン・ボタンの addon を配置するスタイル済み Input Group 部品。Root / Addon / Text / Button の 4 パーツ構成。

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::input_group::{self, InputGroupAlign, InputGroupProps};

let props = InputGroupProps {
    disabled: false,
    invalid: false,
};
let node = input_group::root(
    &props,
    vec![],
    vec![/* addon(InputGroupAlign::InlineStart, ...) と Input を並べる */],
);
```

`stylesheet() -> String` が静的 CSS 全量を返す。`InputGroupAlign` / `InputGroupProps` は headless 層から再エクスポートされる。

```rust
pub fn root<'a>(props: &InputGroupProps, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn addon<'a>(align: InputGroupAlign, props: &InputGroupProps, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn text<'a>(attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn button<'a>(props: &InputGroupProps, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
```

## Anatomy

`root` / `addon` / `text` / `button`

## Options / Props

`InputGroupProps`（`Default` 未実装。構造体リテラルで構築する。`Debug` / `Clone` / `Copy` を derive。`merge_field_props(&self, field: FieldProps) -> FieldProps` で `disabled` / `invalid` を内包する Field へ OR 伝播できる）:

| Name | Type | Description |
|------|------|-------------|
| `disabled` | `bool` | グループ全体の無効化。`root` / `addon` / `button` に `data-disabled` を付与（ネイティブ `disabled` の伝播は内側コントロールが個別に担う） |
| `invalid` | `bool` | 唯一のコントロールの入力値が不正であることを示す。`root` に `aria-invalid="true"` と `data-invalid`、`addon` にも `data-invalid` を付与 |

`InputGroupAlign`（`addon` の配置、`data-align`）:

| Value | `data-align` |
|-------|--------------|
| `InlineStart` | `inline-start` |
| `InlineEnd` | `inline-end` |
| `BlockStart` | `block-start` |
| `BlockEnd` | `block-end` |

## Notes

- 出典: https://fandhe-ai.github.io/fandhe-frontend/themes/input-group/
- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）
- Root がコンテナ側の枠線・角丸・`:focus-within` フォーカスリングを所有し、内側の [Input](./input.md) / [Textarea](./textarea.md) / [Native Select](./native-select.md) / [Select](../collections/select.md) は枠線なし・背景透明へリセットされる
- Native Select / Select は `root` の直接の子として配置した場合のみリセットが効き、内容幅のままインライン配置される
- `size` / `variant` / `color-palette` いずれの軸も持たず、寸法・文字サイズは内側のコントロールに従属する。全パーツで呼び出し側 `class` は除去される
- ラベル・補助テキストは [Field](./field.md) が担う
- `data-disabled` / `data-invalid` は CSS セレクタとして参照されるだけで、値の妥当性判定・送信処理・addon クリックでのフォーカス移動は実装しない

## Related

- [Input Group (primitives)](../../primitives/form/input-group.md)
- [Input](./input.md)
- [Field](./field.md)
- [Button Group](./button-group.md)
