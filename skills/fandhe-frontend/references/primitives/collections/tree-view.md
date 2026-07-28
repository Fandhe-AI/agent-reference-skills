# TreeView

Hierarchical structure component with expand/collapse and selection. Implements the WAI-ARIA APG Tree pattern (`role="tree"`). State machine combines multi-select expansion (`MultiSelect`) with single-select value (`SingleSelect`).

## Signature / Usage

```rust
// Free functions (SSR, `fandhe_frontend_headless_ui::tree_view`)
pub fn root<'a>(attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn label<'a>(attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn tree<'a>(aria_label_text: Option<&'a str>, aria_labelledby_id: Option<&'a str>, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn branch<'a>(
    state: OpenState, value: &'a str, selected: bool, disabled: bool,
    level: &'a str, posinset: &'a str, /* setsize, attrs, children */
) -> Node
pub fn branch_control<'a>(state: OpenState, selected: bool, disabled: bool, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn branch_indicator<'a>(state: OpenState, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn branch_text<'a>(attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn branch_content<'a>(state: OpenState, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn branch_indent_guide<'a>(attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn item<'a>(value: &'a str, selected: bool, disabled: bool, level: &'a str, posinset: &'a str, setsize: &'a str, /* attrs, children */) -> Node
pub fn item_text<'a>(attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn item_indicator<'a>(selected: bool, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node

pub struct TreeNode { /* value, label, children, disabled */ }
impl TreeNode {
    pub fn new(value: impl Into<String>, label: impl Into<String>) -> Self
    pub fn with_children(mut self, children: Vec<TreeNode>) -> Self
    pub fn disabled(mut self, disabled: bool) -> Self
    pub fn value(&self) -> &str
    pub fn label(&self) -> &str
    pub fn children(&self) -> &[TreeNode]
    pub fn is_disabled(&self) -> bool
    pub fn is_branch(&self) -> bool
}

// State machine (CSR/hydration, implements `Component` + `Hydrate`)
pub enum TreeViewAction { Expand(String), Collapse(String), ToggleBranch(String), /* ... */ }

pub struct TreeView { /* expanded: MultiSelect, selected: SingleSelect */ }
impl TreeView {
    pub fn is_expanded(&self, value: &str) -> bool
    pub fn branch_state(&self, value: &str) -> OpenState
    pub fn selected(&self) -> Option<&str>
    pub fn is_selected(&self, value: &str) -> bool
    pub fn render_nodes(&self, nodes: &[TreeNode]) -> Vec<Node>
}
```

## Anatomy

```
root
  label
  tree
    branch
      branch-control
        branch-indicator
        branch-text
      branch-content
        branch-indent-guide
        item
          item-indicator
          item-text
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| state | `OpenState` | `branch`/`branch_control`/`branch_indicator`/`branch_content` の展開状態 |
| level / posinset / setsize | `&str` | `aria-level`/`aria-posinset`/`aria-setsize`（`branch`/`item` 共通、`TreeView::render_nodes` が再帰的に算出） |
| selected | `bool` | `branch`/`item`/`item_indicator` の選択状態 |
| disabled | `bool` | `aria-disabled="true"` で表現（treeitem は ネイティブ disabled を持たない） |

## Notes

- `TreeView::render_nodes` は `TreeNode` 列から `level`/`posinset`/`setsize` を再帰的に算出して描画する
- `root` に `role="tree"`、`branch`/`item` に `role="treeitem"`、`branch_content` に `role="group"` を固定付与する
- `@ark-ui/react` の JS/TS API とは別物（Rust 製）

## Related

- [listbox](./listbox.md)
