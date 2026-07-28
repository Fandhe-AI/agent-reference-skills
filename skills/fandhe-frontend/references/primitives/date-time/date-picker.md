# Date Picker

トリガー起点で開閉する日付選択オーバーレイの headless コンポーネント（`data-scope="date-picker"`）。開閉・配置の基盤は Popover と共通（`crate::state::Disclosure` を再利用）で、`content` 内部に `crate::calendar::Calendar` のパーツ群を合成して月表示・選択 UI を組み立てる想定。

## Signature / Usage

```rust
pub fn root<'a>(state: OpenState, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node;
pub fn label<'a>(id: Option<&'a str>, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node;
pub fn control<'a>(state: OpenState, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node;
pub fn input<'a>(
    value: Option<&'a str>,
    disabled: bool,
    id: Option<&'a str>,
    attrs: Vec<(&'a str, &'a str)>,
) -> Node;
pub fn trigger<'a>(
    state: OpenState,
    disabled: bool,
    controls: Option<&'a str>,
    attrs: Vec<(&'a str, &'a str)>,
    children: Vec<Node>,
) -> Node;
pub fn clear_trigger<'a>(attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node;
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

`DatePicker::new` は埋め込む `Calendar` を渡し、popover は閉状態で構築する。`open_state()` / `is_open()` / `calendar()` / `selected()` と、`root`/`control`/`trigger`/`positioner`/`content` の利便メソッド（`&self` 経由で現在の開閉状態を自動注入）を持つ。dispatch アクション名: `"open"` / `"close"` / `"toggle"` / `"prev-month"` / `"next-month"` / `"select"`（ISO 8601 payload、選択と同時に popover を閉じる） / `"clear-selection"`。

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
| `input` | value | `Option<&str>` | `None` | `input` の現在値（ISO 8601 `YYYY-MM-DD` 形式のみを渡す契約） |
| `input` | disabled | `bool` | `false` | `input` を無効化（ネイティブ `disabled` + `data-disabled`） |
| `trigger` | disabled | `bool` | `false` | `trigger` を無効化 |
| `trigger` | controls | `Option<&str>` | `None` | `Some` のとき `trigger` に `aria-controls` を付与 |
| `content` | labelledby | `Option<&str>` | `None` | `Some` のとき `content` に `aria-labelledby` を付与 |

## Notes

- `@ark-ui/react` の JS/TS API とは別物（Rust 製）。ark-ui/chakra-ui の DatePicker を参考にしているが、API 形状は自由関数群 + `DatePicker` 状態機械であり、ark-ui の React コンポーネント構成とは異なる
- Data Attributes: `root`/`control`/`positioner`/`content`/`trigger` はいずれも `data-state`（`open`/`closed`）を出力する
- Accessibility: `trigger` に `aria-haspopup="dialog"` を固定付与、`aria-expanded` は `state.is_open()` を反映。`content` に `role="dialog"` を固定付与。`trigger`/`clear_trigger` はネイティブ `<button type="button">` であり Tab / Space / Enter はブラウザ既定動作で成立する。閉状態の `positioner`/`content` には `hidden` 属性を付与する
- セグメント式の `date-input` には依存せず、ISO 8601 値を持つネイティブ `<input>` パーツだけで完結する
- フォーカストラップ・`closeOnEscape`・`closeOnInteractOutside`・portal はクライアントランタイム側の責務でありスコープ外

## Related

- [Calendar](./calendar.md)
- [Date Input](./date-input.md)
