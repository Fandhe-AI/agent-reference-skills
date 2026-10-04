# TreeView

Hierarchical structure component with expand/collapse and selection. Implements the WAI-ARIA APG Tree pattern (`role="tree"`). State machine combines multi-select expansion (`MultiSelect`) with single-select value (`SingleSelect`).

## Signature / Usage

```rust
// Free functions (SSR, `fandhe_frontend_headless_ui::tree_view`)
pub fn root<'a>(attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn label<'a>(attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn tree<'a>(aria_label_text: Option<&'a str>, aria_labelledby_id: Option<&'a str>, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
// ノード 1 個分の共通プロパティ（level / posinset / setsize / depth は呼び出し側が事前に文字列化して渡す）
pub struct TreeItemProps<'a> {
    pub value: &'a str, pub selected: bool, pub disabled: bool,
    pub level: &'a str,    // aria-level（1 起点）
    pub posinset: &'a str, // aria-posinset（1 起点）
    pub setsize: &'a str,  // aria-setsize
    pub depth: &'a str,    // data-depth（0 起点）
}

pub fn branch<'a>(state: OpenState, props: TreeItemProps<'a>, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn branch_control<'a>(state: OpenState, props: TreeItemProps<'a>, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn branch_indicator<'a>(state: OpenState, props: TreeItemProps<'a>, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn branch_text<'a>(state: OpenState, props: TreeItemProps<'a>, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn branch_content<'a>(state: OpenState, props: TreeItemProps<'a>, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn branch_indent_guide<'a>(props: TreeItemProps<'a>, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn item<'a>(props: TreeItemProps<'a>, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn item_text<'a>(props: TreeItemProps<'a>, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn item_indicator<'a>(props: TreeItemProps<'a>, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node

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
| `TreeItemProps.level` / `posinset` / `setsize` | `&str` | `aria-level`（1 起点）/`aria-posinset`/`aria-setsize`（`branch`/`item`、`TreeView::render_nodes` が再帰的に算出） |
| `TreeItemProps.depth` | `&str` | `data-depth`（0 起点。zag.js は 1 起点だが本実装は 0 起点を維持） |
| `TreeItemProps.value` | `&str` | ノード値。`data-value`（`branch` は `data-branch` も）に出力 |
| `TreeItemProps.selected` | `bool` | `aria-selected` と `data-selected`。`item_indicator` は非選択時 `hidden` |
| `TreeItemProps.disabled` | `bool` | `aria-disabled="true"` + `data-disabled` で表現（treeitem は ネイティブ disabled を持たない） |

## Notes

- `TreeView::render_nodes` は `TreeNode` 列から `level`/`posinset`/`setsize` を再帰的に算出して描画する
- `tree` に `role="tree"`（`aria_label_text` / `aria_labelledby_id` は `Some` のときのみ出力）、`branch`/`item` に `role="treeitem"`、`branch_content` に `role="group"` を固定付与する。`branch` は `aria-expanded` も出力する。`branch_control` は `role` を持たない（フォーカス可能な treeitem は `branch` 側）
- Data Attributes: `branch` に `data-state` / `data-value` / `data-branch` / `data-depth` / `data-selected` / `data-disabled`、`branch_control` に `data-state` / `data-value` / `data-depth` / `data-selected` / `data-disabled`、`branch_indicator` に `data-state` / `data-selected` / `data-disabled`（`aria-hidden="true"`）、`branch_text` に `data-state` / `data-disabled`、`branch_content` に `data-state` / `data-depth` / `data-value`（閉時 `hidden`）、`branch_indent_guide` に `data-depth`、`item` に `data-value` / `data-depth` / `data-selected` / `data-disabled`、`item_text` に `data-selected` / `data-disabled`、`item_indicator` に `data-selected` / `data-disabled`（`aria-hidden="true"`、非選択時 `hidden`）
- 呼び出し側 `attrs` による固定付与キーの上書きは除去される。dispatch は `"expand"` / `"collapse"` / `"toggle"` / `"select"` / `"deselect"`。キーボード操作・typeahead はクライアント層（wasm-full）が担い、`*`（兄弟一括展開）・複数選択・checkbox モード・lazy loading・inline rename は未提供
- hydration では展開集合を `data-hydrate-expanded`、選択値を `data-hydrate-selected` で運ぶ（属性名の衝突回避）
- `@ark-ui/react` の JS/TS API とは別物（Rust 製）

## Related

- [listbox](./listbox.md)
