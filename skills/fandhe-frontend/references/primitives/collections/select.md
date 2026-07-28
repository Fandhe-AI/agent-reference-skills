# Select

Popup-style listbox selection component (15 anatomy parts). Combines [`state::Disclosure`](../../) (open/close) + [`state::SingleSelect`] (selection, at most 1) into a composite state machine, with trigger/positioner and a `hidden_select` for native form submission.

## Signature / Usage

```rust
// Free functions (SSR, `fandhe_frontend_headless_ui::select`)
pub fn root<'a>(state: OpenState, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn label<'a>(id: Option<&'a str>, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn control<'a>(state: OpenState, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn trigger<'a>(state: OpenState, disabled: bool, controls: Option<&'a str>, labelledby: Option<&'a str>, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn value_text<'a>(placeholder_shown: bool, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn clear_trigger<'a>(attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn indicator<'a>(state: OpenState, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn positioner<'a>(state: OpenState, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn content<'a>(state: OpenState, id: Option<&'a str>, labelledby: Option<&'a str>, activedescendant: Option<&'a str>, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn item_group<'a>(labelledby: Option<&'a str>, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn item_group_label<'a>(id: Option<&'a str>, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn item<'a>(selected_state: OpenState, disabled: bool, highlighted: bool, value: &'a str, id: Option<&'a str>, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn item_text<'a>(id: Option<&'a str>, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn item_indicator<'a>(selected_state: OpenState, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn hidden_select<'a>(selected: Option<&'a str>, name: Option<&'a str>, disabled: bool, attrs: Vec<(&'a str, &'a str)>, options: Vec<(&'a str, &'a str)>) -> Node

// State machine (CSR/hydration, implements `Component` + `Hydrate`)
pub enum SelectAction { Open, Close, Toggle, /* ... */ }

pub struct Select { /* disclosure: Disclosure, selection: SingleSelect */ }
impl Select {
    pub fn open_state(&self) -> OpenState
    pub fn is_open(&self) -> bool
    pub fn selected(&self) -> Option<&str>
    pub fn is_selected(&self, value: &str) -> bool
    pub fn item_state(&self, value: &str) -> OpenState
    // root/control/trigger/value_text/indicator/positioner/content/item/item_indicator/hidden_select も
    // 現在状態を注入する利便メソッドとして提供
}
```

## Anatomy

```
root
  label
  control
    trigger
      value-text
      indicator
    clear-trigger
  positioner
    content
      item-group
        item-group-label
        item
          item-text
          item-indicator
  hidden-select
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| state | `OpenState` | listbox 開閉状態（`data-state`、`aria-expanded`） |
| activedescendant | `Option<&str>` | `content` の `aria-activedescendant`（`combobox` と異なり `content` 側に配線） |
| placeholder_shown | `bool` | `value_text` の `data-placeholder-shown` |
| selected / name | `Option<&str>` | `hidden_select` のネイティブ `<select>` 選択値・`name` |

## Notes

- `hidden_select` は `aria-hidden="true"` + `tabindex="-1"` で視覚 UI との二重公開・二重フォーカスを防ぐ。未選択時は不可視プレースホルダー option を自動挿入し、ブラウザの先頭 option 自動選択による誤送信を防ぐ
- ハイライト移動・typeahead・キーボードナビゲーション自体は CSR 挙動層のスコープ。本モジュールは `data-highlighted`/`aria-activedescendant` の SSR 静的表現のみ提供する
- `combobox` と異なり `aria-activedescendant` は `content` 側に配線する（`select` の trigger は combobox 化しない）
- `@ark-ui/react` の JS/TS API とは別物（Rust 製）

## Related

- [combobox](./combobox.md)
- [listbox](./listbox.md)
