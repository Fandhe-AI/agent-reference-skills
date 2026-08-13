# fandhe-frontend-pre-styled-ui API

`fandhe-frontend-headless-ui` の上に、テーマトークン・variant API・静的CSS生成を重ねた2層構造の上層。リポジトリ main は106個の公開モジュール（`grep -c '^pub mod ' crates/pre-styled-ui/src/lib.rs` 実測値）を持つ。crates.io の最新公開版は v0.40.0（2026-08-13 確認）で、公開モジュール数も106個（docs.rs のソース `pub mod` 行を実測、2026-08-13 確認）と main に一致する。crates.io 版で実際に使えるモジュール・API は `https://docs.rs/fandhe-frontend-pre-styled-ui/<version>` で確認すること。

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
// theme: 既定トークンの上書き（イシュー #1138）
pub fn upsert_color(&mut self, name: &str, light: &str, dark: &str) -> Result<(), ThemeError>
pub fn upsert_space(&mut self, name: &str, value: &str) -> Result<(), ThemeError>
pub fn upsert_typography(&mut self, name: &str, value: &str) -> Result<(), ThemeError>
pub fn upsert_radius(&mut self, name: &str, value: &str) -> Result<(), ThemeError>
pub fn upsert_shadow(&mut self, name: &str, light: &str, dark: &str) -> Result<(), ThemeError>
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
| charts（6） | 基盤 `charts`（data/scale/svg）+ line_chart / area_chart / sparkline / pie_chart / donut_chart（docs.rs `pub mod` 実測、2026-08-13 確認） |

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
pub use fandhe_frontend_headless_ui::fandhe_frontend_interactive;
```

crates.io v0.40.0（docs.rs のソース `pub use` 行 + 生成済み Re-exports セクションの双方で実測、2026-08-13 確認）では、上記4行（`fandhe_frontend_headless_ui` 本体・`fandhe_frontend_core`・`fandhe_frontend_interactive`・`OpenState`/`Orientation`）以外に crate ルートでの選択的・glob 再エクスポートは確認できなかった。`tabs::Orientation` 等の個別型が必要な場合はモジュールパスを明示する（例: `fandhe_frontend_pre_styled_ui::tabs::Orientation`）。

## Notes

- コンポーネントは `fandhe_frontend_headless_ui` 経由で `Node` を返す通常の Rust 関数
- 出力は `render` の既定エスケープを経由。`raw_html()` の使用は `stylesheet::StyleSheet::style_element` 内の1箇所のみ
- `#![forbid(unsafe_code)]`。外部依存は `fandhe-frontend-headless-ui` のみ
- クラスは root slot のみに付与し、子孫パーツへは CSS custom property の継承で伝搬する
- `data-focus-visible` 存在属性 + wasm配線による付け外しで、キーボード操作時のみフォーカスリングを表示する（switch / radio_group / checkbox）
- charts の `size` variant は `--fandhe-<scope>-height` custom property経由でplot高さを切り替え、`color-palette` は非提供（系列色は固定指定）
- `raw_html()` の使用は `stylesheet::StyleSheet::style_element` 内1箇所に限定し、全パスに `#[expect(clippy::disallowed_methods)]` を付与
- Theme トークン API は `push_*` 系（fail-closed、同名トークンは拒否・既定値の上書き不可）に加え、`upsert_color` / `upsert_space` / `upsert_typography` / `upsert_radius` / `upsert_shadow`（既存トークンを挿入順を保ったまま上書き、または無ければ追加。イシュー #1138、`crates/pre-styled-ui/src/theme.rs`、main では commit `2a81311` で着地済み）が利用できる。crates.io でも v0.40.0（2026-08-13 確認、最新安定版）に `Theme::upsert_*` が含まれることを docs.rs で確認済み

## Related

- [fandhe-frontend-headless-ui API](./headless-ui-api.md)
- [コンポーネント記述 API](./component-api.md)
- [pre-styled-ui slot recipe API](./pre-styled-recipe-api.md)
