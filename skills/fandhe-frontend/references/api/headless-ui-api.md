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

// 位置決め
fn compute_position(anchor: Rect, floating: Size, viewport: Size, config: &PositioningConfig, has_arrow: bool) -> ResolvedPosition
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
- `format`: `format_byte()` / `format_number()` / `format_time()` / `format_relative_time()`。`Locale` は `En`/`Ja` の値型（Context/Provider非採用）
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
