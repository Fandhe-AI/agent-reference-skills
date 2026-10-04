# Toggle Group

`fandhe_frontend_headless_ui::toggle_group` の item / `ToggleGroup` / `MultiToggleGroup` 状態機械をそのまま再エクスポートし、既定 CSS を追加提供する。`size`/`palette` variant クラスは `root` にのみ付与する。

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::toggle_group::{self, ToggleGroupVariant};
use fandhe_frontend_pre_styled_ui::{ColorPalette, Size};

let node = toggle_group::root(Size::Md, ToggleGroupVariant::Outline, ColorPalette::Accent, false, None, None, vec![], vec![]);
```

`root(size, variant: ToggleGroupVariant, palette, disabled, orientation: Option<Orientation>, labelled_by: Option<&str>, attrs, children) -> Node`。`root_with_props(size, variant, palette, props: &ToggleGroupProps, labelled_by, attrs, children) -> Node` は `roving_focus` も root へ反映する（`root` は `disabled`/`orientation` 以外を既定値へ戻す）。`stylesheet() -> String` が静的 CSS 全量を返す。`item`/`ToggleGroup`/`MultiToggleGroup`/`ToggleGroupProps` は headless-ui からの再エクスポート。

## Anatomy

- `root`（`role="group"`）/ `item`

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `size` | `Size`（既定 `Md`） | `root` へクラス付与 |
| `variant` | `ToggleGroupVariant`（`Outline`（既定） \| `Ghost`） | 外観。`Ghost` は背景・輪郭なしの最小装飾（`ToggleVariant` と同じ軸・値） |
| `palette` | `ColorPalette`（既定 `Accent`） | 選択済み `item` の色 |
| `props`（`root_with_props` のみ） | `&ToggleGroupProps`（`disabled: bool` / `orientation: Option<Orientation>` / `roving_focus: bool`） | `data-orientation`/`data-disabled`/`tabindex` を一貫して反映 |
| `disabled` | `bool` | `root`/`item` へ `data-disabled` |
| `orientation` | `Option<Orientation>` | `data-orientation` |
| `labelled_by` | `Option<&str>` | `aria-labelledby` |

## Notes

- `RadioGroup` と異なり `role="radiogroup"` ではなく `role="group"` を使う。各 `item` はネイティブ `<button>` + `aria-pressed` で意味論を担う。
- `item` の `data-value` は `top`/`bottom`/`left`/`middle`/`center`/`right` 等の配置系値も取りうる（用途に応じた任意文字列）。
- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）。

## Related

- [Toggle](./toggle.md)
- [Toggle Group (primitives/form)](../../primitives/form/toggle-group.md)
