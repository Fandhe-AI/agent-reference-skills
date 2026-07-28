# Listbox

Always-expanded single/multiple selection list (9 anatomy parts). Unlike `select`/`combobox` (popup-style), Listbox has no trigger/positioner/open state — it is permanently visible. Provides `Listbox` (single) and `MultiListbox` (multiple) state machines.

## Signature / Usage

```rust
// Free functions (SSR, `fandhe_frontend_headless_ui::listbox`)
pub fn root<'a>(selection_state: OpenState, disabled: bool, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn label<'a>(id: Option<&'a str>, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn content<'a>(
    multiple: bool, id: Option<&'a str>, labelledby: Option<&'a str>, activedescendant: Option<&'a str>,
    attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>,
) -> Node
pub fn item_group<'a>(labelledby: Option<&'a str>, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn item_group_label<'a>(id: Option<&'a str>, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn item<'a>(
    selected_state: OpenState, disabled: bool, highlighted: bool, value: &'a str,
    id: Option<&'a str>, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>,
) -> Node
pub fn item_text<'a>(id: Option<&'a str>, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn item_indicator<'a>(selected_state: OpenState, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn value_text<'a>(placeholder_shown: bool, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node

// State machines (CSR/hydration, implement `Component` + `Hydrate`)
pub struct Listbox { /* single: SingleSelect */ }
pub struct MultiListbox { /* multiple: MultiSelect */ }
```

## Anatomy

```
root
  label
  content
    item-group
      item-group-label
      item
        item-text
        item-indicator
  value-text
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| multiple | `bool` | `content` の `aria-multiselectable`（single モードでは属性省略） |
| activedescendant | `Option<&str>` | `content` の `aria-activedescendant`（`tabindex="0"` で `content` 自身がフォーカスを持つ） |
| selected_state | `OpenState` | `item`/`item_indicator` の選択状態（`data-state`、`aria-selected`） |
| disabled | `bool` | `root`/`item` の無効状態 |
| highlighted | `bool` | `item` の `data-highlighted` |
| placeholder_shown | `bool` | `value_text` の `data-placeholder-shown`（未選択時のみ） |

## Notes

- ポップアップ選択（開閉するドロップダウン）が必要な場合は [select](./select.md) を使う。常に見えているリストから 1 個/複数個を選ぶ用途には Listbox を使う
- `"extended"` selection mode（Cmd/Ctrl 修飾範囲選択）・フォーム送信用 hidden input・grid collection は未対応
- `@ark-ui/react` の JS/TS API とは別物（Rust 製）

## Related

- [select](./select.md)
- [combobox](./combobox.md)
