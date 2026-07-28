# fandhe-frontend-pre-styled-ui API

`fandhe-frontend-headless-ui` の上に、テーマトークン・variant API・静的CSS生成を重ねた2層構造の上層。v0.31.0時点で98個の公開モジュールを持つ。

## Signature / Usage

```rust
// stylesheet: CSS集約・配布ヘルパ
pub fn new() -> StyleSheet
pub fn push_css(&mut self, css: &str) -> Result<(), StylesheetError>
pub fn push_recipe(&mut self, recipe: &SlotRecipe)
pub fn push_theme(&mut self, theme: &Theme)
pub fn as_css(&self) -> &str
pub fn write_css_file(&self, path: &Path) -> std::io::Result<()>
pub fn style_element(&self) -> Node
```

```rust
let mut sheet = StyleSheet::new();
sheet.push_theme(&Theme::default());
sheet.push_css(&fandhe_frontend_pre_styled_ui::button::css()).unwrap();
sheet.write_css_file(std::path::Path::new("static/ui.css")).unwrap();
```

## モジュール構成

| 分類 | モジュール |
| --- | --- |
| 基盤 | `theme`（デザイントークン・ダークモード）、`css`、`recipe`（variant API）、`stylesheet` |
| 単純styled部品（15） | button / badge / spinner / alert / callout / card / skeleton / image / icon / separator / highlight / visually_hidden / skip_nav / tag / kbd / code |
| headlessラッパー（55+） | dialog / tabs / accordion / menu / select / popover / tooltip / switch / radio_group / avatar / checkbox / input / textarea / native_select / number_input / pin_input / password_input / slider / rating_group / segment_group / tags_input / editable / listbox / toggle / toggle_group / combobox / tree_view / json_tree_view / pagination / steps / breadcrumb / carousel / drawer / link / link_overlay / nav_list / action_bar / toolbar / menubar / navigation_menu / tab_nav / checkbox_group / toast / hover_card / toggle_tip / progress / clipboard / checkbox_card / radio_card / floating_panel / scroll_area / splitter / marquee / date_input / qr_code / download_trigger / file_upload / calendar / date_picker / timer / angle_slider / signature_pad / image_cropper |
| タイポグラフィ（8） | heading / text / em / mark / blockquote / list / quote / strong |
| charts | 基盤（data/scale/svg）+ line_chart / area_chart / sparkline / bar_chart / bar_list / bar_segment / pie_chart / donut_chart / scatter_chart / radar_chart |

## 代表的な部品 API

```rust
// avatar
pub fn root(size: Size, shape: AvatarShape, attrs: Attributes, children: Vec<Node>) -> Node
pub fn stylesheet() -> String
// size: Sm / Md（既定）/ Lg、shape: Circle（既定）/ Rounded / Square

// radio_group
pub fn root(size: Size, palette: ColorPalette, disabled: bool, orientation: Orientation,
            labelled_by: Option<&str>, attrs: Attributes, children: Vec<Node>) -> Node
pub fn stylesheet() -> String

// checkbox
pub fn root(size: Size, palette: ColorPalette, props: &CheckboxProps, attrs: Attributes, children: Vec<Node>) -> Node
pub fn stylesheet() -> String

// input（静的フォーム部品共通パターン）
pub fn input(props: &InputProps, field_props: &FieldProps, extra_attrs: Attributes) -> Node
// variant: Outline（既定）/ Subtle / Flushed（native_selectのみ Plain 追加）。color-palette 非提供

// line_chart / area_chart / sparkline
pub fn line_chart(props: &LineChartProps, attrs: Attributes) -> Result<Node, ChartError>
pub fn area_chart(props: &AreaChartProps, attrs: Attributes) -> Result<Node, ChartError>
pub fn sparkline(props: &SparklineProps, attrs: Attributes) -> Result<Node, ChartError>
// 既定viewBox: line/area = 300x150, sparkline = 112x48
```

## variant軸の提供方針（抜粋）

| 部品 | size | color-palette | 備考 |
| --- | --- | --- | --- |
| button/badge/spinner | ✓ | ✓ | — |
| switch/radio-group/checkbox | ✓ | ✓ | — |
| input/textarea/native-select | ✓ | – | フォーム入力は非提供 |
| tabs | ✓ | ✓ | 選択trigger強調色 |
| accordion/dialog/menu/select | ✓ | – | — |
| popover/tooltip | – | – | 配置・寸法がpositioning起因 |
| rating-group | ✓ | ✓ | 星形指標 |
| pagination | ✓ | ✓ | 現在ページ強調色 |
| checkbox-card/radio-card | ✓ | ✓ | カード外観・選択強調 |

## 再エクスポート契約

```rust
pub use fandhe_frontend_headless_ui;
pub use fandhe_frontend_headless_ui::fandhe_frontend_core;
pub use fandhe_frontend_headless_ui::{OpenState, Orientation};
pub use fandhe_frontend_pre_styled_ui::fandhe_frontend_interactive::{Component, Hydrate, dispatch, /* ... */};
```

`tabs::Orientation`、`accordion::{OpenState, SingleSelectAction, MultiSelectAction}`、`dialog::{OpenState, DisclosureAction}`、`menu::{OpenState, DisclosureAction, CheckableAction, SingleSelectAction}`、`select::OpenState`、`combobox::OpenState` は選択的再エクスポート。popover / tooltip / tree_view / toggle_tip / action_bar / hover_card / menubar / json_tree_view / floating_panel / timer / navigation_menu / scroll_area / toolbar の13モジュールは glob 再エクスポート。

## Notes

- コンポーネントは `fandhe_frontend_headless_ui` 経由で `Node` を返す通常の Rust 関数
- 出力は `render` の既定エスケープを経由。`raw_html()` の使用は `stylesheet::StyleSheet::style_element` 内の1箇所のみ
- `#![forbid(unsafe_code)]`。外部依存は `fandhe-frontend-headless-ui` のみ
- クラスは root slot のみに付与し、子孫パーツへは CSS custom property の継承で伝搬する
- `data-focus-visible` 存在属性 + wasm配線による付け外しで、キーボード操作時のみフォーカスリングを表示する（switch / radio_group / checkbox）
- charts の `size` variant は `--fandhe-<scope>-height` custom property経由でplot高さを切り替え、`color-palette` は非提供（系列色は固定指定）
- `raw_html()` の使用は `stylesheet::StyleSheet::style_element` 内1箇所に限定し、全パスに `#[expect(clippy::disallowed_methods)]` を付与

## Related

- [fandhe-frontend-headless-ui API](./headless-ui-api.md)
- [コンポーネント記述 API](./component-api.md)
- [pre-styled-ui slot recipe API](./pre-styled-recipe-api.md)
