# Menubar

Application menu bar arranging multiple [menu](./menu.md) instances horizontally or vertically (11 anatomy parts: Root, Menu, Trigger, Positioner, Content, Item, ItemGroup, ItemGroupLabel, Separator, SubTrigger, SubContent). `Menubar` state machine tracks roving-tabindex focus and which sub-menu is open.

## Signature / Usage

```rust
// Free functions (SSR, `fandhe_frontend_headless_ui::menubar`)
pub fn root<'a>(orientation: Orientation, label: &'a str, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn menu<'a>(state: OpenState, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn trigger<'a>(
    focused: bool,
    state: OpenState,
    disabled: bool,
    highlighted: bool,
    index: usize,
    controls: Option<&'a str>,
    attrs: Vec<(&'a str, &'a str)>,
    children: Vec<Node>,
) -> Node
pub fn positioner<'a>(state: OpenState, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn content<'a>(state: OpenState, id: Option<&'a str>, labelledby: Option<&'a str>, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn item<'a>(value: &'a str, disabled: bool, highlighted: bool, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn item_group<'a>(labelledby: Option<&'a str>, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn item_group_label<'a>(id: Option<&'a str>, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn separator<'a>(attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn sub_trigger<'a>(sub_state: OpenState, disabled: bool, highlighted: bool, controls: Option<&'a str>, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn sub_content<'a>(sub_state: OpenState, id: Option<&'a str>, labelledby: Option<&'a str>, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node

// State machine (CSR/hydration, implements `Component` + `Hydrate`)
pub struct Menubar { /* focused, trigger_count, open, loop_focus, orientation */ }
impl Menubar {
    pub fn new(focused: usize, trigger_count: usize, open: Option<usize>, loop_focus: bool, orientation: Orientation) -> Self
    pub fn focused(&self) -> usize
    pub fn trigger_count(&self) -> usize
    pub fn open(&self) -> Option<usize>
    pub fn is_loop_focus(&self) -> bool
    pub fn orientation(&self) -> Orientation
    pub fn is_focused(&self, index: usize) -> bool
    pub fn is_open(&self, index: usize) -> bool
    pub fn menu_state(&self, index: usize) -> OpenState
    // menu/trigger/positioner/content は index を受け取る利便メソッドとして提供（root のみ index を取らず label を受け取る）
}

pub enum MenubarAction { Next, Prev, First, Last, Focus(usize), Open(usize), Close, Toggle(usize) }
```

## Anatomy

```
root
  menu
    trigger
    positioner
      content
        item-group
          item-group-label
          item
        separator
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| orientation | `Orientation` | `root` の向き（`data-orientation`） |
| label | `&str` | `root` の `aria-label` |
| focused | `bool` | `trigger` が roving-tabindex の対象かどうか |
| loop_focus | `bool` | 端で循環するかどうか |
| index | `usize` | `trigger` の位置。`Menubar` の `menu_state(index)` などへ対応付ける |
| controls | `Option<&str>` | `trigger`/`sub_trigger` の `aria-controls` |

## Notes

- Tab/Shift+Tab は roving-tabindex（`tabindex="0"` の trigger のみタブ順に含まれる）で移動する。ArrowRight/Left・Home/End・Enter/Space・Escape は wasm ランタイム層の後続責務
- `MenubarAction::Next`/`Prev` はある Menu が開いていれば、開く Menu も新しい `focused` へ追随する
- `root` に `role="menubar"` + `aria-orientation`、`menu` に `role="none"`、`trigger` に `role="menuitem"` + `aria-haspopup="menu"` + `aria-expanded`、`content` に `role="menu"` を固定付与する
- `@ark-ui/react` の JS/TS API とは別物（Rust 製）

## Related

- [menu](./menu.md)
