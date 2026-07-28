# Combobox

Form component that filters candidate options while accepting text input (14 anatomy parts). ARIA 1.2 combobox pattern: the focusable `input` (`role="combobox"`) carries `aria-activedescendant`, wired to a `role="listbox"` `content`. `live_region` announces candidate count changes.

## Signature / Usage

```rust
// Free functions (SSR, `fandhe_frontend_headless_ui::combobox`)
pub fn root<'a>(state: OpenState, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn label<'a>(id: Option<&'a str>, for_: Option<&'a str>, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn control<'a>(state: OpenState, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn input<'a>(
    state: OpenState, value: &'a str, disabled: bool,
    controls: Option<&'a str>, activedescendant: Option<&'a str>, name: Option<&'a str>,
    attrs: Vec<(&'a str, &'a str)>,
) -> Node
pub fn trigger<'a>(state: OpenState, disabled: bool, controls: Option<&'a str>, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn clear_trigger<'a>(attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn positioner<'a>(state: OpenState, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn content<'a>(state: OpenState, id: Option<&'a str>, labelledby: Option<&'a str>, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn item_group<'a>(labelledby: Option<&'a str>, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn item_group_label<'a>(id: Option<&'a str>, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn item<'a>(
    selected_state: OpenState, disabled: bool, highlighted: bool, value: &'a str,
    id: Option<&'a str>, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>,
) -> Node
pub fn item_text<'a>(id: Option<&'a str>, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn item_indicator<'a>(selected_state: OpenState, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn live_region<'a>(attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node

pub fn filter_options<'a>(options: &[(&'a str, &'a str)], query: &str) -> Vec<(&'a str, &'a str)>

// State machine (CSR/hydration, implements `Component` + `Hydrate`)
pub struct Combobox { /* disclosure, selection, input */ }
pub enum ComboboxAction { Open, Close, Toggle, Select(String), Deselect, Input(String), Clear }
```

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
      item-group
        item-group-label
        item
          item-text
          item-indicator
  live-region
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| state | `OpenState` | listbox 開閉状態（`data-state`、`aria-expanded`） |
| value | `&str` | `input` の現在値（`value` 属性） |
| controls | `Option<&str>` | `input`/`trigger` の `aria-controls` 参照先（`content` の `id`） |
| activedescendant | `Option<&str>` | `input` の `aria-activedescendant`（ハイライト中 `item` の `id`） |
| disabled | `bool` | `input`/`trigger` の無効状態 |
| highlighted | `bool` | `item` の `data-highlighted` |

## Notes

- `aria-activedescendant` は `content` ではなく **`input`** 側に配線する（ARIA 1.2、フォーカスを保持する要素へ付与）
- `live_region` は `role="status"` + `aria-live="polite"` + `aria-atomic="true"` 固定。`root` 直下・`control` の兄弟として配置する（`content` 配下は不正）
- `ComboboxAction::Select` は `closeOnSelect` 相当で選択と同時に listbox を閉じる。`Input` は `openOnChange` 相当で listbox を開く。選択ラベルの `input` への自動反映（`selectionBehavior: "replace"` 相当）は行わない
- multiple 選択・creatable・async 候補・仮想化は未対応
- `@ark-ui/react` の JS/TS API とは別物（Rust 製）

## Related

- [listbox](./listbox.md)
- [select](./select.md)
