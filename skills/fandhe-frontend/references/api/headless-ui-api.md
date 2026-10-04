# fandhe-frontend-headless-ui API

`fandhe-frontend-headless-ui` の公開 API 表面。unstyled UI コンポーネント層を定義し、上層の `fandhe-frontend-pre-styled-ui` がこの層の anatomy と `data-*` 属性を前提にスタイルを重ねる。

## Signature / Usage

```rust
// 共通基盤
anatomy::Anatomy       // data-scope / data-part を付与してパーツノードを組み立てる基盤
data_attrs             // 状態属性ヘルパ（data-state / data-disabled 等）
aria                    // WAI-ARIA 属性ヘルパ（role / aria-* ）
state::OpenState        // Open / Closed の2値状態
state::Disclosure       // 開閉状態機械（dispatch: "open" / "close" / "toggle"）
state::SingleSelect      // 単一選択状態機械
state::TextInput         // 自由入力文字列状態機械

// 位置決め（positioning モジュール、クレートルートから再エクスポート。fandhe-frontend-headless-ui 0.69.2 のソースで確認）
fn positioning::compute_position(anchor: Rect, floating: Size, viewport: Size, config: &PositioningConfig, has_arrow: bool) -> ResolvedPosition
// 同モジュールの再エクスポート: css_vars_style / data_align / data_side / placement_attrs /
// Align / ArrowPosition / Placement / PositioningConfig / Rect / ResolvedPosition / Side / Size
// Rect { x, y, width, height: f64 } / Size { width, height: f64 }
// PositioningConfig { placement: Placement, offset: f64, flip: bool, shift: bool, same_width: bool }
// ResolvedPosition { x: f64, y: f64, placement: Placement, arrow: Option<ArrowPosition> }
```

## コンポーネント一覧（主要抜粋）

| コンポーネント | パーツ | 状態機械 |
| --- | --- | --- |
| Collapsible | Root/Trigger/Indicator/Content | `state::Disclosure` |
| Accordion | Root/Item/ItemTrigger/ItemIndicator/ItemContent | `state::SingleSelect` |
| Dialog | Root/Trigger/Backdrop/Positioner/Content/Title/Description/CloseTrigger | `state::Disclosure` |
| Tabs | Root/List/Trigger/Content | なし |
| Field | Root/Label/Input/Textarea/Select/HelperText/ErrorText/RequiredIndicator | 静的 props |
| Checkbox | Root/Control/Indicator/Label/HiddenInput | 3値（checked/unchecked/indeterminate） |
| RadioGroup | Root/Label/Item/ItemControl/ItemText/ItemHiddenInput | `state::SingleSelect` |
| Switch | Root/Control/Thumb/Label/HiddenInput | 独自実装（checked/unchecked） |
| Select | Root/Label/Control/Trigger/ValueText/ClearTrigger/Indicator/Positioner/Content/... | `state::Disclosure` + `state::SingleSelect` |
| Calendar | Root/Heading/PrevTrigger/NextTrigger/Table/TableHeader/TableBody/TableCell/DayTrigger | `PlainDate` ベースの決定的計算 |
| DatePicker | Root/Label/Control/Input/Trigger/ClearTrigger/Positioner/Content | `state::Disclosure` + Calendar機能 |
| ColorPicker | Root/Label/Control/Trigger/Positioner/Content/Area/ChannelSlider/... | HSV + alpha + `state::Disclosure` |
| Toast | Group/Root/Title/Description/ActionTrigger/CloseTrigger | 有界キュー実装 |

## 関連モジュール

- `color`: RGB/HSL/HSV/HEX相互変換（整数演算のみ、外部依存ゼロ、round half up丸め規則）
- `date`: `PlainDate`（proleptic Gregorian対応、現在時刻API非使用契約、`PlainDate::new(year, month, day)` は検証付き構築）
- `date` の主要シグネチャ: `PlainDate::add_days(&self, delta: i64) -> Result<PlainDate, DateError>` / `PlainDate::days_until(&self, other: &PlainDate) -> i64` / `PlainDate::parse_iso(s: &str) -> Result<PlainDate, DateError>`（厳密な `YYYY-MM-DD` のみ） / `PlainDate::to_iso_string(&self) -> String` / `month_grid(year: i32, month: u8, week_start: Weekday) -> Result<MonthGrid, DateError>`。現在時刻を一切取得せず、「今日」は呼び出し側が `PlainDate` で渡す。`DateError` は `InvalidDate` / `InvalidFormat` / `OutOfRange`
- `color` の型: `Rgb` / `Hsl` / `Hsv`（`Hsl::new` / `Hsv::new` は範囲外を構築不能にする fallible コンストラクタ）/ `Color`（RGBA。`parse_hex` は `#rgb` / `#rgba` / `#rrggbb` / `#rrggbbaa` の 4 形式以外を `ColorError::InvalidHex` で拒否、`to_hex_string()` は `#` + 小文字 16 進）/ `ColorError`（`OutOfRange` / `InvalidHex`）
- `format` の主要シグネチャ: `format_byte(value: f64, options: &FormatByteOptions) -> String` / `format_number(value: f64, options: &FormatNumberOptions) -> String` / `format_time(total_seconds: i64, options: &FormatTimeOptions) -> String` / `format_relative_time(target: i64, base: i64, options: &FormatRelativeTimeOptions) -> String`（`target` / `base` は Unix 秒、`base` は必ず呼び出し側が渡す）。NaN / ±∞ は panic せず `"NaN"` / `"∞"` / `"-∞"` を返す
- `format`: `format_byte()` / `format_number()` / `format_time()` / `format_relative_time()`。`Locale` は `En`/`Ja` の値型（Context/Provider非採用。`#[non_exhaustive]`、`Locale::tag()` / `Locale::from_tag(tag) -> Option<Locale>`）
- `Placement`: `Side`（`top`/`bottom`/`left`/`right`）× `Align`（`start`/`center`/`end`）の 12 語彙。`as_str()` / `from_str()` は相互逆写像で、未知の値は `None`（fail-closed）。`PositioningConfig` の `Default` は `bottom-center`・`offset: 0.0`・`flip`/`shift` 有効・`same_width: false`
- `compute_position()` の手順: `config.placement` で座標算出 → `flip`（主軸の単純反転 1 候補）→ `shift`（交差軸の viewport 内クランプ）→ `has_arrow` が真のときのみ arrow 座標。`NaN`/`Infinity`・負の幅高さ・viewport 寸法 0 等は panic せず `config.placement` のまま座標 `(0.0, 0.0)`・`arrow: None` を返す。実 DOM 計測は `fandhe-frontend-wasm-full` の責務
- `compute_position()`: CSS変数 `--fandhe-x` / `--fandhe-y` / `--fandhe-reference-width` / `--fandhe-arrow-x` / `--fandhe-arrow-y` を出力。`data-side` / `data-align` は flip適用後の確定値

## Notes

- 属性名（`data-*` / `aria-*`）は `&'static str` リテラルのみで固定
- 動的値は `fandhe_frontend_core::render` の既定エスケープを必ず経由する
- `data-state` 語彙は各モジュールで一元管理される
- ハイドレーション時、改ざん入力は `HydrateError` で検証される
- `#![forbid(unsafe_code)]`。外部依存は `fandhe-frontend-core` / `fandhe-frontend-interactive` のみに最小化
- CSS 変数は数値形式のみで、呼び出し側がエスケープを経由する
- `password_input` は値を一切保持しない設計
- SSR は状態機械を経由せず自由関数で静的マークアップを生成し、CSR/hydration は `Component`/`Hydrate` trait経由で状態遷移する。DOM操作は wasm層（`fandhe-frontend-wasm-full`）の責務
- JS ゼロ SSG（wasm 層を配線しない構成）では `data-state` 等の表示状態は SSR/SSG ビルド時に渡した引数の値で固定表示され、開閉・選択操作は反映されない（イシュー #1118）。Accordion 等の開閉挙動をクリックのみで実現したい場合は本層の状態機械ではなくブラウザネイティブの `<details>`/`<summary>` 等を使う

## Related

- [ルーター パスマッチング](./router-path-matching.md)
- [fandhe-frontend-pre-styled-ui API](./pre-styled-ui-api.md)
