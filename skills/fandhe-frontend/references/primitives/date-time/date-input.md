# Date Input

年・月・日を独立したセグメントとして編集する headless コンポーネント（`data-scope="date-input"`）。暦計算は `crate::date` へ委譲し、本モジュールはセグメント単位の SSR マークアップ・dispatch・hydration のみを担う。

## Signature / Usage

```rust
pub fn root<'a>(disabled: bool, invalid: bool, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node;
pub fn label<'a>(
    disabled: bool,
    invalid: bool,
    control_id: Option<&'a str>,
    attrs: Vec<(&'a str, &'a str)>,
    children: Vec<Node>,
) -> Node;
pub fn control<'a>(disabled: bool, invalid: bool, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node;
pub fn segment_group<'a>(disabled: bool, invalid: bool, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node;
pub fn segment<'a>(
    kind: DateSegment,
    value: Option<&'a str>,
    min: &'a str,
    max: &'a str,
    flags: DateSegmentFlags,
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
}
```

`DateSegment` は `Year` / `Month` / `Day` の 3 値。`DateSegmentFlags { disabled, invalid, readonly }` は `segment` へまとめて渡す。`DateInput` は `year()` / `month()` / `day()` / `min()` / `max()` / `focused()` / `is_complete()` / `value() -> Option<PlainDate>` / `is_invalid()` を持ち、`root`/`label`/`control`/`segment_group`/`segment`/`hidden_input` の利便メソッド（`&self` 経由で現在状態を自動注入）を提供する。dispatch アクション名: `"increment"` / `"decrement"` / `"focus"`（payload: `"year"`/`"month"`/`"day"`） / `"set-segment"`（payload: `"<kind>:<value>"`） / `"set"`（ISO 8601 payload） / `"clear"`。

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

`segment` 関数の引数（`DateInput::new` の年/月/日/`min`/`max` とは別スロット。`segment` の `min`/`max` は `&str` の表示用文字列で、`DateInput::new` の `min`/`max: Option<PlainDate>` とは型が異なる）。

| Function | Name | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `segment` | kind | `DateSegment` | 必須 | `Year` / `Month` / `Day` のいずれか。`aria-label` とプレースホルダを決定 |
| `segment` | value | `Option<&str>` | `None` | 現在の表示値。`None` のときプレースホルダ（`yyyy`/`mm`/`dd`）表示 |
| `segment` | min / max | `&str` | 必須 | `aria-valuemin` / `aria-valuemax` に出力する文字列 |
| `segment` | flags | `DateSegmentFlags` | `default()` | `disabled` / `invalid` / `readonly` フラグ構造体 |
| `DateInput::new` | min / max | `Option<PlainDate>` | `None` | 状態機械が保持する日付範囲。`min > max` は自動的に入れ替えて正規化する |

## Notes

- `@ark-ui/react` の JS/TS API とは別物（Rust 製）。ark-ui の DateInput 相当を参考にしているが、API 形状は自由関数群 + `DateInput` 状態機械であり、ark-ui の React コンポーネント構成とは異なる
- Data Attributes: `root`/`label`/`control`/`segment-group`/`segment` は disabled/invalid 状態に応じて `data-disabled`/`data-invalid` を付与。`segment` はさらに readonly 時 `data-readonly`、未入力（`value` が `None`）時 `data-placeholder` を付与。`hidden_input` は disabled 時に `data-disabled` を付与する
- Accessibility: `segment` は `role="spinbutton"` + `aria-valuemin`/`aria-valuemax` を常に出力し、`value` が `Some` のときのみ `aria-valuenow` を出力。`flags.invalid` が `true` のとき `aria-invalid="true"` を付与。disabled でない `segment` は `tabindex="0"` を持ち Tab キーでブラウザ既定の順序に参加する
- 3 セグメントすべてが充足したときのみ実在する日付か検証する（fail-closed）。`2/30` のような存在しない日付は `value()` が `None` を返すが、セグメント値自体は破棄されない
- hour/minute/second セグメント（time granularity）・range 選択・locale 依存の桁順整形はスコープ外

## Related

- [Calendar](./calendar.md)
- [Date Picker](./date-picker.md)
