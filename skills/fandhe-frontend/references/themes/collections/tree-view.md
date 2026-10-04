# TreeView

headless `tree_view`（12 anatomy parts: root, label, tree, branch, branch-control, branch-indicator, branch-text, branch-content, branch-indent-guide, item, item-text, item-indicator）を包む styled wrapper。headless の識別子を選択的に再エクスポートし（`pub use ...::*` は使わない）、`TreeView` 状態機械と `TreeNode` コレクションも再エクスポートする。styled `root` が `size` variant クラスを付与する唯一のパーツ。`color-palette` variant は提供**しない**（選択行の配色は固定のため）。

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::tree_view;
use fandhe_frontend_pre_styled_ui::Size;

pub fn root<'a>(size: Size, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node

pub use fandhe_frontend_headless_ui::tree_view::{
    branch, branch_content, branch_control, branch_indent_guide, branch_indicator, branch_text,
    item, item_indicator, item_text, label, tree, TreeItemProps, TreeNode, TreeView,
    TreeViewAction,
};
pub use fandhe_frontend_headless_ui::state::{MultiSelectAction, OpenState, SingleSelectAction};

pub fn stylesheet() -> String
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| size | `Size` (`Sm` \| `Md` \| `Lg`) | `root` に行 padding（`--fandhe-tree-view-row-padding`）・文字サイズ（`--fandhe-tree-view-font-size`）・indicator とラベルの gap（`--fandhe-tree-view-row-gap`）を設定する。既定値 `Md` |

スタイリングは `data-state`（branch の open/closed）、`data-selected`、`data-disabled`、`branch-content` の `hidden` 属性に反応する。

## Notes

- headless の自由関数 `root` は再エクスポートされない（styled `root` が置き換える。エスケープハッチ: `fandhe_frontend_headless_ui::tree_view`）。`TreeView::render_nodes` が再帰的に組み立てる子ノード列の `root` は styled `root` を経由しないが、寸法は root スコープの CSS custom property の継承で伝わるため外観は崩れない
- `--fandhe-tree-view-indent` は `size` variant では上書きされない
- インデントは `branch-content` の `padding-inline-start` に対する CSS custom property `--fandhe-tree-view-indent`（既定値 `1rem`）のみで表現される。深さは再帰的な DOM ネストを通じて自然に積み重なる（深さごとの数値 CSS は無い）
- `branch-content[hidden]` は明示的に `display: none` で上書きする。基本ルールの `display: flex`（`branch-indent-guide` を再帰的な子 `root` の横に配置するために必要）が無いと UA 既定の `[hidden] { display: none }` を詳細度で上回ってしまうため
- 選択状態のスタイリングは `branch-control`（非インタラクティブな `role="treeitem"` の fixture part である `branch` 自体ではない）と `item` の両方に適用される
- `@ark-ui/react` の JS/TS API とは別物（Rust 製）
- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）。

## Related

- [tree-view (primitives)](../../primitives/collections/tree-view.md)
