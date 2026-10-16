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

// 位置決め（positioning モジュール、クレートルートから再エクスポート。fandhe-frontend-headless-ui 0.73.0 のソースで確認）
fn positioning::compute_position(anchor: Rect, floating: Size, viewport: Size, config: &PositioningConfig, has_arrow: bool) -> ResolvedPosition
// 同モジュールの再エクスポート: css_vars_style / data_align / data_side / placement_attrs /
// Align / ArrowPosition / Placement / PositioningConfig / Rect / ResolvedPosition / Side / Size
// Rect { x, y, width, height: f64 } / Size { width, height: f64 }
// PositioningConfig { placement: Placement, offset: f64, flip: bool, shift: bool, same_width: bool }
// ResolvedPosition { x: f64, y: f64, placement: Placement, arrow: Option<ArrowPosition> }

// 型付き autocomplete（autocomplete モジュール、クレートルートから再エクスポート: pub use autocomplete::{AutocompleteField, AutocompleteToken}）
#[non_exhaustive]
enum AutocompleteField { Username, Email, CurrentPassword, NewPassword, OneTimeCode }
const fn AutocompleteToken::new(field: AutocompleteField) -> AutocompleteToken // webauthn なし
const fn AutocompleteToken::off() -> AutocompleteToken                         // 単独の "off"
const fn AutocompleteToken::is_off(self) -> bool
const fn AutocompleteToken::with_webauthn(self) -> AutocompleteToken           // off / OneTimeCode では no-op
const fn AutocompleteToken::field(self) -> AutocompleteField                   // off のときは意味を持たない値（Username）
const fn AutocompleteToken::webauthn(self) -> bool                             // off では常に false
const fn AutocompleteToken::as_str(self) -> &'static str                       // 全組み合わせの静的リテラル
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

- `AutocompleteToken` は field 名 + 任意の末尾 `webauthn`、または単独の `off` を表す固定語彙型。任意の `&str` を受ける公開コンストラクタ・`FromStr`・`From<&str>` を持たず、`as_str()` はリテラルの `match` のみで値を返す。`off webauthn` / `one-time-code webauthn` / `webauthn` 単独・先頭配置は型として表現できない。`off` では `field()` が意味を持たない値を返すため、先に `is_off()` で判定する。`AutocompleteField::Email` の `email webauthn` は文法上有効だが通常は使わない
- 公式 `docs/api/headless-ui-api.md` の追記（verbatim）: イシュー #3815 で `autocomplete` モジュールの固定語彙型 `AutocompleteToken`（field 名 + 任意の `webauthn`）と `input_with_autocomplete` を追加した（`current-password webauthn` 等。任意の `&str` を受ける経路は持たない）
- イシュー #3816 で `field::input_with_autocomplete(props, token, extra_attrs)` と `AutocompleteField::Email`（`#[non_exhaustive]` 化）を追加した。`extra_attrs` の `autocomplete` は大文字小文字を区別せず除去し型付きの値を優先する。既存の `field::input` は不変で生文字列経路も維持する。`password_input` では password 系以外の field 指定を `props.autocomplete` へフォールバックする
- イシュー #3859 で `AutocompleteField::OneTimeCode`（`one-time-code`）と単独値の `AutocompleteToken::off()` / `is_off()` を追加した。`off` と `OneTimeCode` への `with_webauthn()` は no-op で `off webauthn` 等の不正値は表現できない。`off` 時の `field()` は意味を持たない値のため先に `is_off()` で判定する。`password_input` は `off`・`one-time-code` も `props.autocomplete` へフォールバックし（password 欄の保護設定を型付き API で外させない）、`pin_input` の `otp` は `AutocompleteToken` 由来の同一出力になった
- イシュー #3833: `PinInputKind` に opt-in の `AlphanumericUppercase` / `AlphabeticUppercase`（hydration 語彙 `alphanumeric-uppercase` / `alphabetic-uppercase`）を追加した。`Input` / `Paste` で ASCII 英小文字を `to_ascii_uppercase` で大文字へそろえる（状態側の正規化が正。CSS `text-transform` は送信値と食い違うため不採用）。この kind のときだけ `autocapitalize="characters"`（固定語彙）を出し、呼び出し側 `attrs` の `autocapitalize` は除外する。hydration で小文字の桁は `InvalidValue`。既存 kind の挙動は不変。値の検証はアプリの責務のまま（§3.25）
- 0.x の破壊的変更: `AutocompleteField` / `PinInputKind` へのバリアント追加は、網羅的に `match` しているコードにとってはコンパイルエラーになる（`PinInputKind` は 0.72.0、`AutocompleteField::OneTimeCode` は 0.73.0 でそれぞれ minor バンプ）
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
