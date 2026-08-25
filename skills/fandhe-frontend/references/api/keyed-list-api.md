# keyed_list API

`fandhe-frontend-core::keyed` が提供する、リスト構造変更（挿入・削除・並び替え）を表現する唯一の経路。`fandhe-frontend-wasm-client::keyed_diff` はその DOM 非依存な差分計画層。

## Signature / Usage

```rust
// fandhe-frontend-core::keyed
pub const BIND_LIST_ATTR: &str = "data-bind-list";
pub const KEY_ATTR: &str = "data-key";

pub fn keyed_list(
    tag: &'static str,
    attrs: Vec<(&str, &str)>,
    field: &'static str,
    items: Vec<(String, Node)>,
) -> Result<Node, KeyedListError>

pub enum KeyedListError {
    EmptyKey { index: usize },
    DuplicateKey { first_index: usize, duplicate_index: usize },
    NonElementItem { index: usize },
    ReservedAttr { attr: &'static str },
}
```

```rust
// fandhe-frontend-wasm-client::keyed_diff
pub enum KeyedOp {
    Remove { key: String },
    Insert { index: usize, key: String },
    Move { index: usize, key: String },
}

pub fn diff_keys(old_keys: &[String], new_keys: &[String]) -> Vec<KeyedOp>
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `keyed_list(tag, attrs, field, items)` | fn | キー付きリストを構築する。親要素には `attrs` に `data-bind-list="<field>"` を付加、各子要素には `data-key="<key>"` を付加した `Node::Element` を返す。キー一意性の検証は直下の子のみが対象で、ネストした `keyed_list` 呼び出し同士のキー空間は独立する |
| `KeyedListError::EmptyKey { index }` | variant | `items` 内 `index` 位置のキーが空文字列 |
| `KeyedListError::DuplicateKey { first_index, duplicate_index }` | variant | 同一リスト内（直下の子スコープのみ）でキーが重複 |
| `KeyedListError::NonElementItem { index }` | variant | `index` 位置の子ノードが `Node::Element` でなく `data-key` を付与できない |
| `KeyedListError::ReservedAttr { attr }` | variant | 呼び出し側が渡した `attrs` に予約マーカー属性（`data-bind-list` または `data-key`）が既に含まれている |
| `BIND_LIST_ATTR` | const | リスト束縛のマーカー属性名（`"data-bind-list"`） |
| `KEY_ATTR` | const | キー属性名（`"data-key"`） |
| `KeyedOp::Remove { key }` | variant | 該当キーの既存ノードを削除する |
| `KeyedOp::Insert { index, key }` | variant | 該当キーに対応する新規ノードを新しい並びの `index` 位置へ挿入する |
| `KeyedOp::Move { index, key }` | variant | 該当キーに対応する既存ノードを新しい並びの `index` 位置へ移動する |
| `diff_keys(old_keys, new_keys)` | fn | `old_keys` から `new_keys` への最小の操作列を計画する。O(n) の 2 パス方式（不在キーの `Remove` 記録 → 新順序を辿りながら `Move`/`Insert` を記録）。キー重複は `keyed_list` 側で防止される前提だが、DOM 改竄等で `old_keys` に重複があっても検索範囲を未処理の先頭要素に限定し無限ループ・panic を防ぐ |

## Notes

- `keyed_list` は `fandhe-frontend-core`（crates.io 公開版 0.2.0）、`KeyedOp` / `diff_keys` は `fandhe-frontend-wasm-client`（crates.io 公開版 0.3.0）で確認（docs.rs 該当バージョンページ、2026-08-25 時点）
- `keyed_diff` は DOM に一切依存しない純粋な差分計画層。実際に DOM へ差分を適用する処理（`apply_keyed_list` 等）は GitHub `main` ブランチの `keyed_apply`/`keyed_dom` モジュールで開発中・crates.io 未反映（2026-08 時点）
- 公式ドキュメントサイト（`fandhe-ai.github.io/fandhe-frontend/`）のナビゲーションには未掲載（2026-08-25 時点）、crates.io 公開済み API
- `hydrate()` / `wire_hydrate_targets` の DOM 再構築なしハイドレーション経路とは別レイヤーとして提供される

## Related

- [hydrate() API](./hydration-api.md)
- [束縛 (binding) API](./binding-api.md)
