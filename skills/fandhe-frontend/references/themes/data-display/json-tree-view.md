# JsonTreeView

JSON データをツリー表示する styled コンポーネント。`fandhe-frontend-headless-ui::json_tree_view`（`JsonValue`/`TreeView`/`render_json`/`expanded_to_depth`、`key`/`value` の 2 パーツ）をそのまま再エクスポートし、型別配色の CSS を追加する。

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::json_tree_view::{JsonValue, TreeView, render_json};
use fandhe_frontend_core::render;

let tree = TreeView::default();
let data = JsonValue::Object(vec![("name".to_string(), JsonValue::String("Ada".to_string()))]);
let html = render(&render_json(&tree, &data));
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `expanded_to_depth(data, depth)` | `fn(&JsonValue, usize) -> TreeView` | — | 初期展開状態を決定的に構築する |

## Data Attributes

| Part | Attribute | Values |
| --- | --- | --- |
| value | `data-kind` | `string` \| `number` \| `bool` \| `null` \| `object` \| `array` |

## Notes

- 構造部（root/tree/branch 系）は `fandhe_frontend_headless_ui::tree_view` のパーツをそのまま使うため、Tree View 側の `stylesheet()`（インデント・開閉・選択の CSS）も併用する必要がある。本モジュールの `stylesheet()` は `key`/`value` の型別配色のみを追加する。
- `size`/`color-palette` variant は提供しない。
- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）。

## Related

- [primitives/display/json-tree-view](../../primitives/display/json-tree-view.md)
- [Table](./table.md)
