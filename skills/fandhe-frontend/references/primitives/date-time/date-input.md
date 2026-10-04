# Date Input

年・月・日を独立したセグメントとして編集する headless コンポーネント（`data-scope="date-input"`）。暦計算は `crate::date` へ委譲し、本モジュールはセグメント単位の SSR マークアップ・dispatch・hydration のみを担う。

## Signature / Usage

```rust
pub struct DateInputProps { pub disabled: bool, pub readonly: bool, pub invalid: bool, pub focused: bool } // Default: すべて false

pub fn root<'a>(props: DateInputProps, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node;
pub fn label<'a>(
    props: DateInputProps,
    control_id: Option<&'a str>,
    attrs: Vec<(&'a str, &'a str)>,
    children: Vec<Node>,
) -> Node;
pub fn control<'a>(props: DateInputProps, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node;
pub fn segment_group<'a>(props: DateInputProps, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node;
pub fn segment<'a>(
    kind: DateSegment,
    value: Option<&'a str>,
    min: &'a str,
    max: &'a str,
    props: DateInputProps,
    attrs: Vec<(&'a str, &'a str)>,
) -> Node;
pub fn hidden_input<'a>(name: &'a str, value: &'a str, disabled: bool, attrs: Vec<(&'a str, &'a str)>) -> Node;

impl DateInput {
    pub fn new(
        year: Option<i32>,
        month: Option<u8>,
        day: Option<u8>,
        min: Option<PlainDate>,
        max: Option<PlainDate>,
    ) -> Self;
    // 利便メソッド: disabled / readonly は呼び出し側が渡し、invalid / focused は状態機械が導出して注入する
    pub fn root<'a>(&self, disabled: bool, readonly: bool, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node;
    pub fn label<'a>(&self, disabled: bool, readonly: bool, control_id: Option<&'a str>, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node;
    pub fn control<'a>(&self, disabled: bool, readonly: bool, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node;
    pub fn segment_group<'a>(&self, disabled: bool, readonly: bool, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node;
    pub fn segment<'a>(&self, kind: DateSegment, disabled: bool, readonly: bool, attrs: Vec<(&'a str, &'a str)>) -> Node;
    pub fn hidden_input<'a>(&self, name: &'a str, disabled: bool, attrs: Vec<(&'a str, &'a str)>) -> Node;
}
```

`DateSegment` は `Year` / `Month` / `Day` の 3 値（`parse("year"|"month"|"day")` あり）。`DateInput` は `year()` / `month()` / `day()` / `min()` / `max()` / `focused()` / `is_complete()` / `value() -> Option<PlainDate>` / `is_invalid()` を持つ。dispatch アクション名: `"increment"` / `"decrement"`（境界で wrap-around、未入力は最小値 / 最大値から開始）/ `"page-increment"` / `"page-decrement"`（境界で clamp。ステップは year=5 / month=2 / day=7 の暫定値）/ `"prev"` / `"next"` / `"home"` / `"end"` / `"backspace"` / `"focus"`（payload: `"year"`/`"month"`/`"day"`）/ `"blur"` / `"set-segment"`（payload: `"<kind>:<value>"`）/ `"set"`（ISO 8601 payload）/ `"clear"`。

## Anatomy

```
root
  label
  control
    segment-group
      segment
  hidden-input
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `DateInputProps.disabled` | `bool` | `false` | 全パーツに `data-disabled`。`segment` は加えて `aria-disabled="true"` で `tabindex` を省略 |
| `DateInputProps.readonly` | `bool` | `false` | 全パーツに `data-readonly`。`segment` は加えて `aria-readonly="true"` |
| `DateInputProps.invalid` | `bool` | `false` | 全パーツに `data-invalid`。`segment` は加えて `aria-invalid="true"` |
| `DateInputProps.focused` | `bool` | `false` | `control` / `segment-group` のみに `data-focus`（root / label / segment は無視） |
| `label.control_id` | `Option<&str>` | `None` | `Some` のとき `for` を出力 |
| `segment.kind` | `DateSegment` | 必須 | `Year` / `Month` / `Day` のいずれか。`aria-label`・`data-type`・プレースホルダを決定 |
| `segment.value` | `Option<&str>` | `None` | 現在の表示値。`None` のときプレースホルダ（`yyyy`/`mm`/`dd`）表示 |
| `segment.min` / `max` | `&str` | 必須 | `aria-valuemin` / `aria-valuemax` に出力する文字列（`DateInput::segment` は年 `"0"`–`"9999"` 等を自動注入） |
| `DateInput::new` の min / max | `Option<PlainDate>` | `None` | 状態機械が保持する日付範囲。`min > max` は自動的に入れ替えて正規化する。年 / 月 / 日はそれぞれ `[0, 9999]` / `[1, 12]` / `[1, 31]` へ clamp |

## Notes

- `@ark-ui/react` の JS/TS API とは別物（Rust 製）。ark-ui の DateInput 相当を参考にしているが、API 形状は自由関数群 + `DateInput` 状態機械であり、ark-ui の React コンポーネント構成とは異なる。この `segment_group` は `data-scope="date-input"` 内の 1 パーツで、独立コンポーネントの Segment Group（segmented control）とは無関係
- Data Attributes: `root`/`label`/`control`/`segment-group`/`segment` は `data-disabled`/`data-readonly`/`data-invalid`。`segment` はさらに `data-type`（`year`/`month`/`day`）・`data-editable`・値の有無に応じた `data-value`・未入力時 `data-placeholder-shown` を付与。`hidden_input` は disabled 時に `data-disabled` を付与する
- Accessibility: `segment_group` は `role="group"`（`aria-labelledby` は呼び出し側が `attrs` で `label` の id を配線）。`segment` は `role="spinbutton"` + `inputmode="numeric"` + `aria-label` + `aria-valuemin`/`aria-valuemax` を常に出力し、`value` が `Some` のときのみ `aria-valuenow` を出力。disabled でない `segment` は `tabindex="0"` を持つ
- 3 セグメントすべてが充足したときのみ実在する日付か検証する（fail-closed）。`2/30` のような存在しない日付は `value()` が `None` を返し（`hidden_input` は空値）、セグメント値自体は破棄されない。`focused` は hydration では運ばない
- 呼び出し側 `attrs` による固定付与キー（`data-*` 状態属性、`segment_group` の `role`、`segment` の `role` / `aria-*` / `tabindex` / `inputmode` 等）の上書きは除去される。ネイティブ `contenteditable`、数字キーの桁蓄積・自動前進、`aria-valuetext`、hour / minute / second、range 選択、locale 依存整形は未提供。キー入力の DOM 配線はクライアント層の責務

## Related

- [Calendar](./calendar.md)
- [Date Picker](./date-picker.md)
