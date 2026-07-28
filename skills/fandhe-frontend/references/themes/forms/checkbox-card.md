# Checkbox Card

chakra-ui `forms/checkbox-card` 相当のカード型選択 UI。headless-ui には checkbox-card 相当の anatomy が存在しないため、`data-scope="checkbox-card"` の新規 9 パーツ anatomy を pre-styled 層で独自定義する（`checkbox` scope とは完全に独立）。状態機械は `fandhe_frontend_headless_ui::checkbox::CheckboxProps`/`CheckedState`/`Checkbox` をそのまま再利用する。

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::checkbox_card::{self, CheckboxProps};
use fandhe_frontend_pre_styled_ui::{ColorPalette, Size};

let node = checkbox_card::root(Size::Md, ColorPalette::Accent, &CheckboxProps::default(), vec![], vec![]);
```

`stylesheet() -> String` が静的 CSS 全量を返す。`control`/`content`/`label`/`description`/`addon`/`indicator`/`indicator_check`/`hidden_input` は本モジュールが個別に定義するパーツ関数（いずれも `props: &CheckboxProps, attrs, children -> Node`、`hidden_input` のみ `name`/`value` 引数を追加で取る）。

## Anatomy

- `root`（`<label>`）— `size`/`palette` クラスを付与する唯一のパーツ
- `control`（`<div>`）— indicator と content を横に並べる領域
- `content`（`<div>`）— label/description/addon を縦に積むコンテナ
- `label` / `description` / `addon`（`<div>`）
- `indicator`（`<div>`）— チェックボックス外枠
- `indicator-check`（`<div>`）— チェックマーク本体、`Unchecked` のとき `hidden`
- `hidden-input`（`<input type="checkbox">`）

## Notes

- `indicator-check` の base に `display` 宣言を置かない（`checkbox` と同じ設計、`hidden` 属性の意味論を壊さないため）。
- 実フォーカスは `hidden-input` が受けるため、祖先 `root` へ `:focus-within` のフォーカスリングを登録する。
- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）。

## Related

- [Checkbox](./checkbox.md)
- [Checkbox Group](./checkbox-group.md)
