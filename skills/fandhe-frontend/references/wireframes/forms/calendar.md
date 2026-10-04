# Calendar (wireframe)

`fandhe-frontend-wireframe-ui` の月表示グリッド型カレンダー部品。「ここに月表示の日付ピッカーがある」という配置イメージだけを示す非インタラクティブな部品。blocks.pm に対応部品はなく、wireframe-ui 独自の追加部品。

## Signature / Usage

```rust
// fandhe-frontend-wireframe-ui 0.52.0 / src/calendar.rs
pub const MAX_WEEKS: usize = 6;

/// 週 1 個分の日付マス（`Some(d)` は日付あり、`None` は空きマス）。
pub type Week = [Option<u32>; DAYS_PER_WEEK];

#[must_use]
pub fn calendar(month_label: &str, weeks: &[Week], selected_day: Option<u32>, size: Size) -> Node

// 呼び出し例（docs-site の SEPTEMBER_WEEKS 定義を含む。日曜始まり 5 週分）
use fandhe_frontend_wireframe_ui::{calendar, Size};

const SEPTEMBER_WEEKS: [[Option<u32>; 7]; 5] = [
    [None, None, Some(1), Some(2), Some(3), Some(4), Some(5)],
    [
        Some(6),
        Some(7),
        Some(8),
        Some(9),
        Some(10),
        Some(11),
        Some(12),
    ],
    [
        Some(13),
        Some(14),
        Some(15),
        Some(16),
        Some(17),
        Some(18),
        Some(19),
    ],
    [
        Some(20),
        Some(21),
        Some(22),
        Some(23),
        Some(24),
        Some(25),
        Some(26),
    ],
    [Some(27), Some(28), Some(29), Some(30), None, None, None],
];

calendar("2026 年 9 月", &SEPTEMBER_WEEKS, Some(18), Size::Md)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| month_label | `&str` | - | ヘッダー中央に表示する月ラベル文言（例: "2026 年 9 月"）。 |
| weeks | `&[[Option<u32>; 7]]` | - | 週ごとに 7 マスの日付配列。`Some(日)` または空きマス `None`。6 週を超える入力は先頭 6 週へ飽和する。 |
| selected_day | `Option<u32>` | `None` | 選択日。一致する `Some(day)` を持つ全セルに data-active を付与する。 |
| size | `Size` | `Size::Md` | サイズ段階（xs〜xl）。 |

## Notes

- 出典: https://fandhe-ai.github.io/fandhe-frontend/wireframes/calendar/
- 低忠実度のワイヤーフレーム部品であり、Primitives / Themes の同名 Calendar / Date Picker とは別物。月送り・キーボード操作・範囲選択は実装しない。操作可能な日付ピッカーが必要な場合は Themes / Primitives の Calendar / Date Picker を使う
- `@ark-ui/react` / `@chakra-ui/react` の JS/TS API とは無関係（Rust 製）
- ルートは表示状態軸を持たない。選択日セルだけが `Active`（`data-active`）を持ち、新規の `Selected` / `Checked` 型は無い
- 同じ日付値が複数セルにある入力では一致する全セルに `data-active` を付与する
- `weeks` は `MAX_WEEKS = 6` を超えると先頭 6 週のみ描画する。空スライスは曜日ヘッダーのみを描画し panic しない
- 日付値（0 や 32 以上など）は検証しない。`Some(d)` は `u32::to_string()` で表示し、`None` は空セル（`fw-wire-calendar-day-empty` 修飾）として 7 列の配置を保つ
- `<table>` / `<th>` は使わず `div` / `span` + CSS grid で組み立てる
- 曜日ヘッダーはロケール依存文字列をハードコードしないため、テキストなしの固定パート 7 個。前月 / 翌月の送り矢印は `icon::caret_left` / `icon::caret_right` の装飾（`<button>` は出力しない）
- `style` 属性・ネイティブ対話要素は出力しない

## Related

- [Forms overview](./overview.md)
- [共通型 (Size / Active ほか)](../foundations/common-types.md)
- [Calendar (Themes)](../../themes/date-time/calendar.md)
- [Calendar (Primitives)](../../primitives/date-time/calendar.md)
- [Date Picker (Themes)](../../themes/date-time/date-picker.md)
- [Date Picker (Primitives)](../../primitives/date-time/date-picker.md)
