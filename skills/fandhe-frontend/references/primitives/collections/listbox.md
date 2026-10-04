# Listbox

Always-expanded single/multiple selection list (9 anatomy parts). Unlike `select`/`combobox` (popup-style), Listbox has no trigger/positioner/open state — it is permanently visible. Provides `Listbox` (single) and `MultiListbox` (multiple) state machines.

## Signature / Usage

```rust
// Free functions (SSR, `fandhe_frontend_headless_ui::listbox`)
pub struct ListboxProps { pub disabled: bool, pub orientation: Orientation } // Default: disabled=false, orientation=Vertical

pub fn root<'a>(selection_state: OpenState, props: &ListboxProps, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn label<'a>(props: &ListboxProps, id: Option<&'a str>, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn content<'a>(
    multiple: bool, props: &ListboxProps, id: Option<&'a str>, labelledby: Option<&'a str>, activedescendant: Option<&'a str>,
    attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>,
) -> Node
pub fn item_group<'a>(props: &ListboxProps, labelledby: Option<&'a str>, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn item_group_label<'a>(id: Option<&'a str>, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn item<'a>(
    selected_state: OpenState, props: &ListboxProps, disabled: bool, highlighted: bool, value: &'a str,
    id: Option<&'a str>, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>,
) -> Node
pub fn item_text<'a>(
    selected_state: OpenState, props: &ListboxProps, disabled: bool, highlighted: bool,
    id: Option<&'a str>, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>,
) -> Node
pub fn item_indicator<'a>(selected_state: OpenState, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn value_text<'a>(placeholder_shown: bool, props: &ListboxProps, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node

// State machines (CSR/hydration, implement `Component` + `Hydrate`)
pub struct Listbox { /* single: SingleSelect */ }
pub struct MultiListbox { /* multiple: MultiSelect */ }
// 利便メソッド（Listbox）: root(props, ..) / item(value, props, disabled, highlighted, id, ..) / item_text(value, props, disabled, highlighted, id, ..) / item_indicator(value, ..) / value_text(props, ..)
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
| `ListboxProps.disabled` | `bool`（既定 `false`） | `data-disabled` を root / label / content / item-group / value-text へ、`item` / `item_text` へは `props.disabled \|\| 個別 disabled` として伝播 |
| `ListboxProps.orientation` | `Orientation` | `data-orientation` を root / content / item-group / item へ出力。`horizontal` ではキーボード層が ArrowLeft / ArrowRight を受理する |
| `item.disabled` | `bool` | 項目個別の無効状態 |
| highlighted | `bool` | `item` の `data-highlighted` |
| placeholder_shown | `bool` | `value_text` の `data-placeholder-shown`（未選択時のみ） |

## Notes

- `content` は `role="listbox"` + `tabindex="0"`（`content` 自身がフォーカスを持つ）。`item_group_label` は `role="presentation"`、`item_indicator` は `aria-hidden="true"`。`item_text` は `data-state` / `data-disabled` / `data-highlighted` を出力する
- ポップアップ選択（開閉するドロップダウン）が必要な場合は [select](./select.md) を使う。常に見えているリストから 1 個/複数個を選ぶ用途には Listbox を使う
- `"extended"` selection mode（Cmd/Ctrl 修飾範囲選択）・フォーム送信用 hidden input・grid collection は未対応
- `@ark-ui/react` の JS/TS API とは別物（Rust 製）

## Related

- [select](./select.md)
- [combobox](./combobox.md)
