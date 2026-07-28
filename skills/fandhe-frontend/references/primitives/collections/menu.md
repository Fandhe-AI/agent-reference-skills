# Menu

Trigger-click-opened dropdown action item list (16 anatomy parts). Provides `Menu` (open/close), `MenuCheckboxItem` (checkbox item state), `MenuRadioItemGroup` (exclusive radio item selection).

## Signature / Usage

```rust
// Free functions (SSR, `fandhe_frontend_headless_ui::menu`)
pub fn root<'a>(state: OpenState, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn trigger<'a>(state: OpenState, disabled: bool, controls: Option<&'a str>, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn indicator<'a>(state: OpenState, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn positioner<'a>(state: OpenState, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn content<'a>(state: OpenState, id: Option<&'a str>, labelledby: Option<&'a str>, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn arrow<'a>(attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn arrow_tip<'a>(attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn item<'a>(value: &'a str, disabled: bool, highlighted: bool, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn item_group<'a>(labelledby: Option<&'a str>, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn item_group_label<'a>(id: Option<&'a str>, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn separator<'a>(attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn trigger_item<'a>(sub_state: OpenState, disabled: bool, highlighted: bool, controls: Option<&'a str>, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn context_trigger<'a>(state: OpenState, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn checkbox_item<'a>(checked: bool, value: &'a str, disabled: bool, highlighted: bool, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn radio_item_group<'a>(labelledby: Option<&'a str>, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn radio_item<'a>(checked: bool, value: &'a str, disabled: bool, highlighted: bool, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node

// State machines (CSR/hydration, implement `Component` + `Hydrate`)
pub struct Menu { /* disclosure: Disclosure */ }
impl Menu {
    pub fn new(initial: OpenState) -> Self
    pub fn state(&self) -> OpenState
    pub fn is_open(&self) -> bool
    // root/trigger/indicator/positioner/content/trigger_item/context_trigger も利便メソッドとして提供
}

pub struct MenuCheckboxItem { /* checkable: Checkable */ }
impl MenuCheckboxItem {
    pub fn new(checked: bool) -> Self
    pub fn is_checked(&self) -> bool
}

pub struct MenuRadioItemGroup { /* select: SingleSelect */ }
impl MenuRadioItemGroup {
    pub fn value(&self) -> Option<&str>
    pub fn is_checked(&self, value: &str) -> bool
}
```

## Anatomy

```
root
  trigger
    indicator
  positioner
    content
      arrow
        arrow-tip
      item-group
        item-group-label
        item
      separator
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| state / sub_state | `OpenState` | Menu / サブメニューの開閉状態 |
| controls | `Option<&str>` | `trigger`/`trigger_item` の `aria-controls`（`content` の `id`） |
| checked | `bool` | `checkbox_item`/`radio_item` のチェック状態（`aria-checked`、`data-state`） |
| highlighted | `bool` | 各項目の `data-highlighted` |

## Notes

- `trigger_item`（サブメニュートリガー）は `Menu::trigger_item` を呼ぶ際、**親 Menu ではなくサブメニュー側 `Menu` インスタンス**から呼ぶ（`aria-expanded`/`data-state` はサブメニュー自身の状態を反映するため）
- `context_trigger`（右クリック）は SSR/no-JS で成立しないジェスチャのため ARIA 属性を一切付与しない（`data-*` フックのみ）
- `checkbox_item`/`radio_item` は `div` ベースでネイティブ `disabled` を持たないため、`aria-disabled` + `data-disabled` の対で無効状態を表現する
- `@ark-ui/react` の JS/TS API とは別物（Rust 製）

## Related

- [menubar](./menubar.md)
