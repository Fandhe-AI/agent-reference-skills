# fandhe-frontend-pre-styled-ui API

`fandhe-frontend-headless-ui` の上に、テーマトークン・variant API・静的CSS生成を重ねた2層構造の上層。crate 0.241.0（crates.io 公開ソース、`lib.rs` の `pub mod` 行を実測）は 134 個の公開モジュールを持ち、うち 12 個（`border_beam` / `button_motion` / `carousel_motion` / `cursor` / `forms_motion` / `list_motion` / `marquee_motion` / `motion` / `stat_motion` / `text_reveal` / `toast_motion` / `view_transition`）は `motion` feature 限定、残り 122 個は常時有効。以前の記述（v0.40.0 で 106 個）から大幅に増加している。実際に使えるモジュール・API は `https://docs.rs/fandhe-frontend-pre-styled-ui/<version>` で確認すること。

## Signature / Usage

```rust
// stylesheet: CSS集約・配布ヘルパ
pub fn new() -> StyleSheet
pub fn push_css(&mut self, css: &str) -> Result<(), StylesheetError>
pub fn push_recipe(&mut self, recipe: &SlotRecipe)
pub fn push_theme(&mut self, theme: &Theme)
pub fn as_css(&self) -> &str // 0.241.0 のソースで確認（new / push_css / push_recipe / push_theme / as_css / write_css_file / style_element）
pub fn write_css_file(&self, path: &Path) -> std::io::Result<()>
pub fn style_element(&self) -> Node
```

```rust
// theme: 既定トークンの上書き（イシュー #1138）
pub fn upsert_color(&mut self, name: &str, light: &str, dark: &str) -> Result<(), ThemeError>
pub fn upsert_space(&mut self, name: &str, value: &str) -> Result<(), ThemeError>
pub fn upsert_typography(&mut self, name: &str, value: &str) -> Result<(), ThemeError>
pub fn upsert_radius(&mut self, name: &str, value: &str) -> Result<(), ThemeError>
pub fn upsert_shadow(&mut self, name: &str, light: &str, dark: &str) -> Result<(), ThemeError>
// 0.241.0 で追加確認（いずれも name: &str, value: &str -> Result<(), ThemeError>）
pub fn upsert_z_index(&mut self, name: &str, value: &str) -> Result<(), ThemeError>
pub fn upsert_focus_ring(&mut self, name: &str, value: &str) -> Result<(), ThemeError>
pub fn upsert_size(&mut self, name: &str, value: &str) -> Result<(), ThemeError>
pub fn upsert_motion(&mut self, name: &str, value: &str) -> Result<(), ThemeError>
pub fn upsert_breakpoint(&mut self, name: &str, value: &str) -> Result<(), ThemeError>
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
| 単純styled部品（16） | button / badge / spinner / alert / callout / card / skeleton / image / icon / separator / highlight / visually_hidden / skip_nav / tag / kbd / code |
| headlessラッパー（64） | dialog / tabs / accordion / menu / select / popover / tooltip / switch / radio_group / avatar / checkbox / color_picker / input / textarea / native_select / number_input / pin_input / password_input / slider / rating_group / segment_group / tags_input / editable / listbox / toggle / toggle_group / combobox / tree_view / json_tree_view / pagination / steps / breadcrumb / carousel / drawer / link / link_overlay / nav_list / action_bar / toolbar / menubar / navigation_menu / tab_nav / checkbox_group / toast / hover_card / toggle_tip / progress / clipboard / checkbox_card / radio_card / floating_panel / scroll_area / splitter / marquee / date_input / qr_code / download_trigger / file_upload / calendar / date_picker / timer / angle_slider / signature_pad / image_cropper |
| タイポグラフィ（8） | heading / text / em / mark / blockquote / list / quote / strong |
| データ表示・その他（8） | color_swatch / data_list / empty_state / stat / status / table / timeline / tour |
| charts（7） | 基盤 `charts`（data/scale/svg）+ line_chart / area_chart / sparkline / pie_chart / donut_chart / radial_chart（0.241.0 の `pub mod` 実測） |
| 0.241.0 で追加された常時有効モジュール | collapsible / field / fieldset / input_group / item / button_group / command / sidebar / message / bubble / attachment / marker / message_scroller / questionnaire / data_table / radial_chart |
| `motion` feature 限定（12） | border_beam / button_motion / carousel_motion / cursor / forms_motion / list_motion / marquee_motion / motion / stat_motion / text_reveal / toast_motion / view_transition |

## 代表的な部品 API

```rust
// avatar
// （0.241.0 のソースで確認。属性列 attrs は Vec<(&'a str, &'a str)>）
pub fn root<'a>(props: &AvatarProps, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn stylesheet() -> String
// AvatarProps は size / shape / variant / palette / stacked / with_badge 等を持つ（旧 root(size, shape, ...) 形から変更）

// radio_group
pub fn root<'a>(size: Size, palette: ColorPalette, disabled: bool, orientation: Option<Orientation>,
                labelled_by: Option<&'a str>, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn stylesheet() -> String

// checkbox
pub fn root<'a>(size: Size, palette: ColorPalette, props: &CheckboxProps,
                attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn stylesheet() -> String

// input（静的フォーム部品共通パターン）
pub fn input<'a>(props: &InputProps, field: &FieldProps<'_>, extra_attrs: Vec<(&'a str, &'a str)>) -> Node
// variant: Outline（既定）/ Subtle / Flushed（native_selectのみ Plain 追加）。color-palette 非提供

// line_chart / area_chart / sparkline
pub fn line_chart<'a>(props: &LineChartProps<'a>, attrs: Vec<(&'a str, &'a str)>) -> Result<Node, ChartError>
pub fn area_chart<'a>(props: &AreaChartProps<'a>, attrs: Vec<(&'a str, &'a str)>) -> Result<Node, ChartError>
pub fn sparkline<'a>(props: &SparklineProps<'a>, attrs: Vec<(&'a str, &'a str)>) -> Result<Node, ChartError>
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
pub use fandhe_frontend_headless_ui::fandhe_frontend_interactive;
```

crate 0.241.0 の `lib.rs` では、上記4行（`fandhe_frontend_headless_ui` 本体・`fandhe_frontend_core`・`fandhe_frontend_interactive`・`OpenState`/`Orientation`）に加え、v0.40.0 時点では無かった styled 側の選択的再エクスポートがルートに存在する。例: `button::{button, close_button, icon_button, ButtonProps, ButtonVariant}` / `badge::{badge, BadgeProps, BadgeVariant}` / `input::{input, InputProps, InputVariant}` / `heading::{heading, HeadingLevel, HeadingProps, HeadingSize, HeadingWeight}` / `recipe::{when, ColorPalette, Shape, Size, SlotRecipe, VariantCondition, VariantValue}` / `stylesheet::{StyleSheet, StylesheetError}` / `css::{decl, Declaration}` ほか（alert / callout / card / code / color_swatch / em / empty_state / field / fieldset / highlight / icon / image / kbd / link / list / mark / marquee / native_select / quote / separator / skeleton / spinner / status / strong / table / tag / text / textarea の主要型）。`tabs::Orientation` 等の個別型が必要な場合はモジュールパスを明示する（例: `fandhe_frontend_pre_styled_ui::tabs::Orientation`）。

## Notes

- コンポーネントは `fandhe_frontend_headless_ui` 経由で `Node` を返す通常の Rust 関数
- 出力は `render` の既定エスケープを経由。`raw_html()` の使用は `stylesheet::StyleSheet::style_element` 内の1箇所のみ
- `#![forbid(unsafe_code)]`。外部依存は `fandhe-frontend-headless-ui` のみ
- クラスは root slot のみに付与し、子孫パーツへは CSS custom property の継承で伝搬する
- `data-focus-visible` 存在属性 + wasm配線による付け外しで、キーボード操作時のみフォーカスリングを表示する（switch / radio_group / checkbox）
- charts の `size` variant は `--fandhe-<scope>-height` custom property経由でplot高さを切り替え、`color-palette` は非提供（系列色は固定指定）
- `raw_html()` の使用は `stylesheet::StyleSheet::style_element` 内1箇所に限定し、全パスに `#[expect(clippy::disallowed_methods)]` を付与
- Theme トークン API は `push_*` 系（fail-closed、同名トークンは拒否・既定値の上書き不可）に加え、`upsert_color` / `upsert_space` / `upsert_typography` / `upsert_radius` / `upsert_shadow`（既存トークンを挿入順を保ったまま上書き、または無ければ追加。イシュー #1138、`crates/pre-styled-ui/src/theme.rs`、main では commit `2a81311` で着地済み）が利用できる。crate 0.241.0 のソースで `Theme::upsert_*` の存在を確認済み（上記シグネチャ参照）

## Related

- [fandhe-frontend-headless-ui API](./headless-ui-api.md)
- [コンポーネント記述 API](./component-api.md)
- [pre-styled-ui slot recipe API](./pre-styled-recipe-api.md)
