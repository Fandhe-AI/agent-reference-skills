# Calendar

`fandhe_frontend_headless_ui::calendar` の Root / Heading / PrevTrigger / NextTrigger / Table 系 / DayTrigger 11 パーツに既定 CSS を追加する styled ラッパー。`size` variant クラス付与のため styled `root` のみを本クレートで新設し、状態機械 `Calendar` はあえて再エクスポートしない。

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::calendar;
use fandhe_frontend_pre_styled_ui::Size;

let node = calendar::root(Size::Md, vec![], vec![]);
// heading/prev_trigger/next_trigger/table/table_body/table_cell/... は
// headless 層からそのまま再エクスポートされる
```

`root(size: Size, attrs: Vec<(&str, &str)>, children: Vec<Node>) -> Node` が本モジュールで新設される styled パーツ。`root_with(size: Size, variant: CalendarVariant, cell_size: CalendarCellSize, attrs: Vec<(&str, &str)>, children: Vec<Node>) -> Node` はその opt-in 拡張版で、`variant == Outline` かつ `cell_size == Compact`（いずれも既定）のとき `root` とバイト単位で同一の出力になる。`PlainDate`/`Weekday` も呼び出し側の便宜のため再エクスポートされる。

```rust
use fandhe_frontend_pre_styled_ui::calendar::{self, CalendarCellSize, CalendarVariant};
use fandhe_frontend_pre_styled_ui::Size;

let node = calendar::root_with(Size::Md, CalendarVariant::Plain, CalendarCellSize::Large, vec![], vec![]);
```

## Anatomy

```
root
  heading
  prev-trigger / next-trigger
  table
    table-header
      table-row
        table-head-cell
    table-body
      table-row
        table-cell
          day-trigger
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `root.size` | `Size` | `Md` | `--fandhe-calendar-root-padding`/`-day-size`（root スコープ custom property）を切り替える |
| `root_with.variant` | `CalendarVariant` | `Outline` | `Outline`（従来の枠線付き root）/ `Plain`（枠線なし、`border-width: 0`） |
| `root_with.cell_size` | `CalendarCellSize` | `Compact` | `Compact`（従来の正方形日セル）/ `Large`（全幅 7 列等幅・セル左上に日付を置く、月間スケジュール向けの大セル月表示） |

## Data Attributes

| Part | Attribute | Values |
| --- | --- | --- |
| `day-trigger` | `data-selected` / `data-today` / `data-outside-month` / `data-disabled` | 存在属性 |

選択日は `background`/`color` を強調色に、今日は `font-weight: 700`、表示月外は `color` をミュートに切り替える。`day-trigger` はキーボード操作時のみ `:focus-visible` のフォーカスリングを持つ。

## Notes

- `data-selected`/`data-today`/`data-outside-month` の出力元は Primitives（`fandhe_frontend_headless_ui::calendar`）。Themes 側は CSS セレクタとして参照するのみで属性を出力しない
- `size` のみが variant 軸（`color-palette` 軸は持たない）
- Themes は Primitives への薄いラッパーであり、既定 CSS のみを追加する。状態管理・hydration が必要な場合は Primitives の `Calendar` 状態機械を直接 import する
- `@ark-ui/react` の JS/TS API とは別物（Rust 製）
- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）。

## Related

- [Calendar (primitives)](../../primitives/date-time/calendar.md)
- [DatePicker](./date-picker.md)
