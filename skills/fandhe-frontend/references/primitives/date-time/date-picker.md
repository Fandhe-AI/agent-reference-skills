# Date Picker

トリガー起点で開閉する日付選択オーバーレイの headless コンポーネント（`data-scope="date-picker"`）。開閉・配置の基盤は Popover と共通（`crate::state::Disclosure` を再利用）で、`content` 内部に `crate::calendar::Calendar` のパーツ群を合成して月表示・選択 UI を組み立てる想定。

## Signature / Usage

```rust
pub struct DatePickerProps { pub disabled: bool, pub readonly: bool, pub invalid: bool, pub required: bool } // Default: すべて false

pub fn root<'a>(state: OpenState, props: &DatePickerProps, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node;
pub fn label<'a>(
    props: &DatePickerProps,
    id: Option<&'a str>,
    for_: Option<&'a str>,
    attrs: Vec<(&'a str, &'a str)>,
    children: Vec<Node>,
) -> Node;
pub fn control<'a>(state: OpenState, props: &DatePickerProps, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node;
pub fn input<'a>(
    value: Option<&'a str>,
    props: &DatePickerProps,
    id: Option<&'a str>,
    attrs: Vec<(&'a str, &'a str)>,
) -> Node;
pub fn trigger<'a>(
    state: OpenState,
    props: &DatePickerProps,
    controls: Option<&'a str>,
    attrs: Vec<(&'a str, &'a str)>,
    children: Vec<Node>,
) -> Node;
pub fn clear_trigger<'a>(props: &DatePickerProps, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node;
pub fn positioner<'a>(state: OpenState, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node;
pub fn content<'a>(
    state: OpenState,
    id: Option<&'a str>,
    labelledby: Option<&'a str>,
    attrs: Vec<(&'a str, &'a str)>,
    children: Vec<Node>,
) -> Node;

impl DatePicker {
    pub fn new(calendar: Calendar) -> Self;
}
```

`DatePicker::new` は埋め込む `Calendar` を渡し、popover は閉状態で構築する。`open_state()` / `is_open()` / `calendar()` / `selected()` と、`root(props, attrs, children)` / `control(props, attrs, children)` / `trigger(props, controls, attrs, children)` / `positioner(attrs, children)` / `content(id, labelledby, attrs, children)` の利便メソッド（`&self` 経由で現在の開閉状態を自動注入）を持つ。`label` / `input` / `clear_trigger` の利便メソッドは無い。dispatch アクション名: `"open"` / `"close"` / `"toggle"` / `"prev-month"` / `"next-month"` / `"select"`（ISO 8601 payload、選択と同時に popover を閉じる） / `"clear-selection"`。

## Anatomy

```
root
  label
  control
    input
    trigger
    clear-trigger
  positioner
    content
```

## Options / Props

パーツごとに引数が分かれる（単一コンストラクタではない）。

| Function | Name | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `root` / `control` / `positioner` / `content` / `trigger` | state | `OpenState` | 必須 | popover の開閉状態（`Open`/`Closed`）。各パーツへ個別に渡す |
| `DatePickerProps` | disabled | `bool` | `false` | root / label / control / input / trigger / clear-trigger に `data-disabled`。`input` / `trigger` / `clear_trigger` にネイティブ `disabled` |
| `DatePickerProps` | readonly | `bool` | `false` | 同 6 パーツに `data-readonly`。`input` にネイティブ `readonly`（操作抑止はクライアント層の責務） |
| `DatePickerProps` | invalid | `bool` | `false` | 同 6 パーツに `data-invalid`。`input` に `aria-invalid="true"`（valid では省略） |
| `DatePickerProps` | required | `bool` | `false` | `label` に `data-required`、`input` にネイティブ `required` |
| `label` | id | `Option<&str>` | `None` | `Some` のとき `id` を出力（`content` の `labelledby` と対で `aria-labelledby` 関連付け） |
| `label` | for_ | `Option<&str>` | `None` | `Some` のとき `for` を出力（`input` の `id` と対でネイティブ `label[for]` 関連付け） |
| `input` | value | `Option<&str>` | `None` | `input` の現在値（ISO 8601 `YYYY-MM-DD` 形式のみを渡す契約）。`type="text"` 固定 |
| `trigger` | controls | `Option<&str>` | `None` | `Some` のとき `trigger` に `aria-controls` を付与 |
| `content` | labelledby | `Option<&str>` | `None` | `Some` のとき `content` に `aria-labelledby` を付与 |

## Notes

- `@ark-ui/react` の JS/TS API とは別物（Rust 製）。ark-ui/chakra-ui の DatePicker を参考にしているが、API 形状は自由関数群 + `DatePicker` 状態機械であり、ark-ui の React コンポーネント構成とは異なる
- Data Attributes: `root`/`control`/`positioner`/`content`/`trigger` はいずれも `data-state`（`open`/`closed`）を出力する。`DatePickerProps` に応じて root / label / control / input / trigger / clear-trigger が `data-disabled` / `data-invalid` / `data-readonly`、`label` のみ `data-required` を出力する。呼び出し側 `attrs` による状態系 `data-*` の上書きは除去される
- Accessibility: `trigger` に `aria-haspopup="dialog"` を固定付与、`aria-expanded` は `state.is_open()` を反映。`content` に `role="dialog"` を固定付与。`trigger`/`clear_trigger` はネイティブ `<button type="button">` であり Tab / Space / Enter はブラウザ既定動作で成立する。閉状態の `positioner`/`content` には `hidden` 属性を付与する
- セグメント式の `date-input` には依存せず、ISO 8601 値を持つネイティブ `<input>` パーツだけで完結する
- フォーカストラップ・`closeOnEscape`・`closeOnInteractOutside`・portal はクライアントランタイム側の責務でありスコープ外

## Related

- [Calendar](./calendar.md)
- [Date Input](./date-input.md)
