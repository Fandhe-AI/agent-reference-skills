# JsonTreeView

JSON 風データ構造のツリー表示 headless コンポーネント。`tree_view`（12 anatomy パーツ・`TreeView` 状態機械）をそのまま再利用しつつ、JSON 固有の `key`/`value` の 2 パーツと変換ロジック `render_json` を追加する。

## Signature / Usage

```rust
use fandhe_frontend_headless_ui::json_tree_view::{render_json, expanded_to_depth, JsonValue, TreeView};

let data = JsonValue::Object(vec![
    ("name".to_string(), JsonValue::String("Ada".to_string())),
    ("age".to_string(), JsonValue::Number(36.0)),
]);

let tree = expanded_to_depth(&data, 1);
let node = render_json(&tree, &data);
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `render_json: tree` | `&TreeView` | — | 展開・選択状態 |
| `render_json: root` | `&JsonValue` | — | 描画対象の JSON 風データ木 |
| `expanded_to_depth: root` | `&JsonValue` | — | 展開対象のデータ木 |
| `expanded_to_depth: depth` | `usize` | — | ルートから何段目まで展開済みにするか（`0` は何も展開しない） |
| `value: kind` | `&'static str` | — | `JsonValue::kind()` が返す固定語彙のみを受け取る |

## Data Attributes

| Part | Attribute | Values |
| --- | --- | --- |
| value | `data-kind` | `null` \| `bool` \| `number` \| `string` \| `array` \| `object` |

構造部（root/tree/branch/branch-control/branch-indicator/branch-content/branch-indent-guide/item/item-indicator）は `tree_view` の既存 `data-scope="tree-view"` パーツをそのまま使う。`key`/`value` は別スコープ `data-scope="json-tree-view"` に属する。

## Notes

- `JsonValue` は `serde_json::Value` 等に依存しない外部依存ゼロの静的 enum。`Object` は挿入順を保持する `Vec<(String, JsonValue)>` で表現し、`render_json` の出力決定性を保証する。
- ノード識別子には RFC 6901 JSON Pointer 記法を使う（`~0`→`~`・`~1`→`/` の逆写像でエスケープ）。ルートは空文字列 `""`。
- 構造部の ARIA（`role="tree"`/`role="treeitem"`/`role="group"`、`aria-expanded`/`aria-selected`/`aria-level`/`aria-posinset`/`aria-setsize`）は `tree_view` から継承する。
- `@ark-ui/react` の `utilities/json-tree-view`（JS/TS API）とは別物（Rust 製）。`collapseStringsAfterLength`/`groupArraysAfterLength`/`showNonenumerable`/lazy loading/rename は提供しない。

## Related

- [Toolbar](./toolbar.md)
