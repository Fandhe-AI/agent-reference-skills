# Checkbox Group

`fandhe_frontend_headless_ui::checkbox_group` の Label / Item / ItemControl / ItemIndicator / ItemText 5 anatomy パーツと `CheckboxGroup` 状態機械をそのまま再エクスポートし、既定 CSS を追加提供する。`item-hidden-input` パーツは新設せず、呼び出し側が入れ子にする `checkbox::hidden_input` を再利用する設計のため、本コンポーネント使用時は `checkbox::stylesheet()` も併せて読み込む必要がある。

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::checkbox_group;
use fandhe_frontend_pre_styled_ui::{ColorPalette, Size};

let node = checkbox_group::root(
    Size::Md,
    ColorPalette::Accent,
    false,
    None,
    None,
    vec![],
    vec![],
);
```

`root(size, palette, disabled, orientation: Option<Orientation>, labelled_by: Option<&str>, attrs, children) -> Node`。`stylesheet() -> String` が静的 CSS 全量を返す。`item`/`item_control`/`item_indicator`/`item_text`/`label`/`CheckboxGroup` は headless-ui からの再エクスポート。

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `size` | `Size`（既定 `Md`） | `item-control`/`item-text` の寸法 |
| `palette` | `ColorPalette`（既定 `Accent`） | checked 時の色 |
| `disabled` | `bool` | 全体の無効化 |
| `orientation` | `Option<Orientation>` | `Horizontal` で `flex-direction: row` に切り替え |
| `labelled_by` | `Option<&str>` | `aria-labelledby` |

## Notes

- `checkbox-group` recipe は `hidden-input` slot の visually-hidden 規則を重複定義しない。`checkbox::stylesheet()` 併用が必須。
- 実フォーカスは `checkbox::hidden_input` が受けるため、祖先 `item`（`<label>`）へ `:focus-within` フォーカスリングを登録する。
- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）。

## Related

- [Checkbox](./checkbox.md)
- [Checkbox Group (primitives/form)](../../primitives/form/checkbox-group.md)
