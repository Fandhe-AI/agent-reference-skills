# Pre-styled component variants and StyleSheet aggregation

variant/size/colorPalette を Rust enum で型安全に指定する styled 部品と、`StyleSheet` によるテーマ + recipe CSS の集約・書き出し。

```rust
use fandhe_frontend_pre_styled_ui::button::{button, ButtonProps, ButtonVariant};
use fandhe_frontend_pre_styled_ui::stylesheet::StyleSheet;
use fandhe_frontend_pre_styled_ui::theme::Theme;
use fandhe_frontend_pre_styled_ui::{ColorPalette, Size};
use fandhe_frontend_core::text;
use std::path::Path;

fn outline_button() -> fandhe_frontend_core::Node {
    button(
        &ButtonProps {
            variant: ButtonVariant::Outline,
            palette: ColorPalette::Danger,
            size: Size::Sm,
            ..ButtonProps::default()
        },
        vec![],
        vec![text("Outline")],
    )
}

fn build_stylesheet() -> Result<StyleSheet, fandhe_frontend_pre_styled_ui::StylesheetError> {
    let mut sheet = StyleSheet::new();
    sheet.push_theme(&Theme::default());
    sheet.push_css(include_str!("../static/ui.css"))?;
    sheet.push_css(&fandhe_frontend_pre_styled_ui::button::css())?;
    Ok(sheet)
}

fn write_css(sheet: &StyleSheet) -> std::io::Result<()> {
    sheet.write_css_file(Path::new("dist/assets/ui.css"))
}
```

## Notes

- 単純 styled 部品（`button` / `badge` / `card` / `alert` / `spinner`）は `variant` / `size` / `palette` を Rust enum（`ButtonVariant` / `ColorPalette` / `Size` 等）で指定し、対応する recipe CSS クラス（`fd-button--variant-outline` 等）が付与される。
- `StyleSheet::push_css` は fail-closed 検証を持ち、`<` を含む CSS を拒否して `Err` を返す。pre-styled-ui 側が生成する recipe/テーマ CSS は検証済み契約のため常に `Ok` になる。
- CSS の取り込み順序は「テーマトークン（`Theme::default()`）→ 手書き CSS → 各コンポーネントの recipe CSS」。後段の recipe が `var(--fandhe-...)` でトークンを参照するため。
- `StyleSheet::write_css_file` は SSG 向けに CSS 全量を1ファイルへ書き出す経路。
