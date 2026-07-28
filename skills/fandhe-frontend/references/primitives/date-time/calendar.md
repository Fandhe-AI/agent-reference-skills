# Calendar

月表示・日付選択の headless コンポーネント（`data-scope="calendar"`）。暦計算は `crate::date` へ全委譲し、本モジュールは描画・状態遷移のみを担う。

## Signature / Usage

```rust
pub fn root<'a>(attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node;
pub fn heading<'a>(id: Option<&'a str>, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node;
pub fn prev_trigger<'a>(disabled: bool, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node;
pub fn next_trigger<'a>(disabled: bool, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node;
pub fn table<'a>(labelledby: Option<&'a str>, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node;
pub fn table_header<'a>(attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node;
pub fn table_row<'a>(attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node;
pub fn table_head_cell<'a>(attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node;
pub fn table_body<'a>(attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node;
pub fn table_cell<'a>(selected: bool, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node;
pub fn day_trigger<'a>(
    date: PlainDate,
    selected: bool,
    today: bool,
    outside_month: bool,
    disabled: bool,
    id: Option<&'a str>,
    attrs: Vec<(&'a str, &'a str)>,
    children: Vec<Node>,
) -> Node;

impl Calendar {
    pub fn new(
        view_year: i32,
        view_month: u8,
        today: PlainDate,
        selected: Option<PlainDate>,
        min: Option<PlainDate>,
        max: Option<PlainDate>,
        week_start: Weekday,
    ) -> Result<Self, DateError>;
}
```

状態機械 `Calendar` は `root`/`prev_trigger`/`next_trigger` の利便メソッド（`&self` 経由で現在の選択・範囲端到達状態を自動注入）と、月グリッドから `tbody` を組み立てる `table_body_from_grid` を持つ。`Calendar` に対する dispatch アクション名は `"prev-month"` / `"next-month"` / `"select"`（ISO 8601 payload） / `"clear-selection"`。

## Anatomy

```
root
  heading
  prev-trigger
  next-trigger
  table
    table-header
      table-row
        table-head-cell
    table-body
        table-cell
          day-trigger
```

## Options / Props

`Calendar::new` の引数（状態機械のコンストラクタ）。

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| view_year | `i32` | 必須 | 表示年（`0000..=9999`）。範囲外は `DateError::OutOfRange` |
| view_month | `u8` | 必須 | 表示月（`1..=12`） |
| today | `PlainDate` | 必須 | 「今日」として呼び出し側が明示的に渡す日付（現在時刻 API は一切使用しない、決定性の不変条件） |
| selected | `Option<PlainDate>` | `None` | 現在選択中の日付 |
| min / max | `Option<PlainDate>` | `None` | 選択可能範囲。両方 `Some` かつ `min > max` は `DateError::InvalidDate` |
| week_start | `Weekday` | 必須 | 週開始曜日 |

## Notes

- `@ark-ui/react` の JS/TS API とは別物（Rust 製）。ark-ui の Calendar/DatePicker を参考にしているが、API 形状は自由関数群 + `Calendar` 状態機械であり、ark-ui の React コンポーネント構成とは異なる
- Data Attributes: `day-trigger` に `data-selected`（選択中）・`data-today`（今日、`aria-current="date"` も同時付与）・`data-outside-month`（表示月外）・`data-disabled`（min/max 範囲外、ネイティブ `disabled` + `aria-disabled` も付与）。`prev-trigger`/`next-trigger` は範囲端到達時に `data-disabled` を付与
- Accessibility: `table` に `role="grid"`、`table_row` に `role="row"`、`table_head_cell`/`table_cell` に `role="columnheader"`/`role="gridcell"` を固定付与（WAI-ARIA grid パターン）。`table_cell` は選択有無にかかわらず常に `aria-selected="true"`/`"false"` を出力する。`day_trigger` の `aria-label` は ISO 8601 表記（例 `2026-07-15`）を固定付与
- `prev_trigger`/`next_trigger`/`day_trigger` はネイティブ `<button type="button">` であり、Tab / Space / Enter はブラウザ既定動作で成立する
- キーボードナビゲーション（矢印キーでの gridcell フォーカス移動）・range mode・複数月表示は本コンポーネントのスコープ外

## Related

- [Date Input](./date-input.md)
- [Date Picker](./date-picker.md)
