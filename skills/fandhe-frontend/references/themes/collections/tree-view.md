# TreeView

headless `tree_view`（12 anatomy parts: root, label, tree, branch, branch-control, branch-indicator, branch-text, branch-content, branch-indent-guide, item, item-text, item-indicator）を包む styled wrapper。headless モジュール全体（`pub use ...::*`）と `TreeView` 状態機械、`TreeNode` コレクションを再エクスポートし、既定 CSS のみを追加する。`size`/`color-palette` variant は提供**しない**（階層ナビゲーションパーツには明確な寸法スケール/アクセント基準がないため）。

## Signature / Usage

```rust
pub use fandhe_frontend_headless_ui::tree_view::*;
pub use fandhe_frontend_headless_ui::state::{MultiSelectAction, OpenState, SingleSelectAction};

pub fn stylesheet() -> String
```

## Options / Props

variant パラメータなし — 単一の既定外観のみ。スタイリングは `data-state`（branch の open/closed）、`data-selected`、`data-disabled`、`branch-content` の `hidden` 属性に反応する。

## Notes

- インデントは `branch-content` の `padding-inline-start` に対する CSS custom property `--fandhe-tree-view-indent`（既定値 `1rem`）のみで表現される。深さは再帰的な DOM ネストを通じて自然に積み重なる（深さごとの数値 CSS は無い）
- `branch-content[hidden]` は明示的に `display: none` で上書きする。基本ルールの `display: flex`（`branch-indent-guide` を再帰的な子 `root` の横に配置するために必要）が無いと UA 既定の `[hidden] { display: none }` を詳細度で上回ってしまうため
- 選択状態のスタイリングは `branch-control`（非インタラクティブな `role="treeitem"` の fixture part である `branch` 自体ではない）と `item` の両方に適用される
- `@ark-ui/react` の JS/TS API とは別物（Rust 製）

## Related

- [tree-view (primitives)](../../primitives/collections/tree-view.md)
