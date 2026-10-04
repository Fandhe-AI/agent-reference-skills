# keyed_list API

`fandhe-frontend-core::keyed` が提供する、リスト構造変更（挿入・削除・並び替え）を表現する唯一の経路と、そのキー列・アイテム列の差分計画（`diff_keys` / `diff_keyed_items`）、Insert 対象アイテムの同型判定（`keyed::template`）。

## Signature / Usage

```rust
// fandhe-frontend-core::keyed（core 0.4.3）
pub const BIND_LIST_ATTR: &str = "data-bind-list";
pub const KEY_ATTR: &str = "data-key";
pub const MAX_KEYED_LIST_ITEMS: usize = 4_096;
pub const MAX_KEYED_LIST_KEY_BYTES: usize = 262_144;

pub fn keyed_list(
    tag: &'static str,
    attrs: Vec<(&str, &str)>,
    field: &'static str,
    items: Vec<(String, Node)>,
) -> Result<Node, KeyedListError>

#[non_exhaustive]
pub enum KeyedListError {
    TooManyItems { count: usize },
    KeyBytesExceeded { total_bytes: usize },
    EmptyKey { index: usize },
    DuplicateKey { first_index: usize, duplicate_index: usize },
    NonElementItem { index: usize },
    ReservedAttr { attr: &'static str },
    KeyHashCollision,
}

pub enum KeyedOp {
    Remove { key: String },
    Insert { index: usize, key: String },
    Move { index: usize, key: String },
    Update { key: String },
}

pub fn diff_keys(old_keys: &[String], new_keys: &[String]) -> Result<Vec<KeyedOp>, KeyedListError>
pub fn diff_keyed_items(
    old_items: &[(String, Node)],
    new_items: &[(String, Node)],
) -> Result<Vec<KeyedOp>, KeyedListError>

// fandhe-frontend-core::keyed::template
pub struct ItemTemplate { /* text_paths: Vec<Vec<usize>>（非公開） */ }
impl ItemTemplate {
    pub fn text_paths(&self) -> &[Vec<usize>]
}
pub fn derive_item_template(items: &[&Node]) -> Option<ItemTemplate>
pub fn text_values<'a>(item: &'a Node, template: &ItemTemplate) -> Option<Vec<&'a str>>
```

```rust
use fandhe_frontend_core::{el, text, render, keyed::keyed_list};

let list = keyed_list(
    "ul",
    vec![("data-testid", "item-list")],
    "items",
    vec![
        ("a".to_string(), el("li", vec![], vec![text("item-a")])),
        ("b".to_string(), el("li", vec![], vec![text("item-b")])),
    ],
)
.expect("valid keyed list");
// <ul data-testid="item-list" data-bind-list="items"><li data-key="a">item-a</li><li data-key="b">item-b</li></ul>
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `keyed_list(tag, attrs, field, items)` | fn | キー付きリストを構築する。親要素には `attrs` の末尾に `data-bind-list="<field>"` を付加、各子要素には属性列の末尾に `data-key="<key>"` を付加した `Node::Element` を返す。キー一意性の検証は直下の子のみが対象で、ネストした `keyed_list` 呼び出し同士のキー空間は独立する。新しい `Node` バリアント・レンダリング経路・エスケープ処理は追加せず、属性値は `render()` の既定エスケープを経由する |
| `KeyedListError::TooManyItems { count }` | variant | 項目数が `MAX_KEYED_LIST_ITEMS` を超えている（HashDoS 対策の追加防御）。`keyed_list` / `diff_keys` / `diff_keyed_items` のいずれからも返り得る |
| `KeyedListError::KeyBytesExceeded { total_bytes }` | variant | 全項目のキー文字列の合計バイト数が `MAX_KEYED_LIST_KEY_BYTES` を超えている。3 関数いずれからも返り得る |
| `KeyedListError::EmptyKey { index }` | variant | `items` 内 `index` 位置のキーが空文字列（`keyed_list` 専用） |
| `KeyedListError::DuplicateKey { first_index, duplicate_index }` | variant | 同一リスト内（直下の子スコープのみ）でキーが重複（`keyed_list` 専用） |
| `KeyedListError::NonElementItem { index }` | variant | `index` 位置の子ノードが `Node::Element` でなく `data-key` を付与できない（`keyed_list` 専用） |
| `KeyedListError::ReservedAttr { attr }` | variant | 呼び出し側が渡した `attrs`、または各子要素の属性列に予約マーカー属性（`data-bind-list` または `data-key`）が既に含まれている（`keyed_list` 専用）。比較は大文字小文字を区別しない（`DATA-BIND-LIST` 等の表記ゆれでの迂回を遮断） |
| `KeyedListError::KeyHashCollision` | variant | 内部のキー用ハッシュテーブルが 64bit 一次ハッシュ値の衝突する異なる文字列キーを検出した。3 関数いずれからも返り得る |
| `BIND_LIST_ATTR` | const | リスト束縛のマーカー属性名（`"data-bind-list"`） |
| `KEY_ATTR` | const | キー属性名（`"data-key"`） |
| `MAX_KEYED_LIST_ITEMS` | const | 1 リストあたりの最大項目数（`4_096`）。全ターゲット一律で強制される |
| `MAX_KEYED_LIST_KEY_BYTES` | const | 1 リストあたりのキー文字列の合計バイト数上限（`262_144`） |
| `KeyedOp::Remove { key }` | variant | 該当キーの既存ノードを削除する |
| `KeyedOp::Insert { index, key }` | variant | 該当キーに対応する新規ノードを新しい並びの `index` 位置へ挿入する |
| `KeyedOp::Move { index, key }` | variant | 該当キーに対応する既存ノードを新しい並びの `index` 位置へ移動する。`Remove` + `Insert` へ分解しない専用操作（DOM ノード参照・フォーカス・入力途中の値を保持するため） |
| `KeyedOp::Update { key }` | variant | 保持キー（新旧両方に存在するキー）のうち `Node` の内容が `PartialEq` で不一致だったものにのみ発行される。変更後の `Node` は運ばない。`diff_keyed_items` の `new_items` 順で並ぶ |
| `diff_keys(old_keys, new_keys)` | fn | `old_keys` から `new_keys` への最小の操作列を計画する（`Remove` / `Insert` / `Move` のみ）。O(n) の 2 パス方式で、共通接頭辞・接尾辞は前段でスキップする。キー重複が混入した場合は旧側は最後の出現を保持、新側は最初の出現を保持する fail-closed で、無限ループ・panic を起こさない。上限超過時は `Err` |
| `diff_keyed_items(old_items, new_items)` | fn | `(キー, Node)` 列同士の差分を計画し、`diff_keys` の構造 op に加えて内容変化の `Update` を発行する。計算量は O(キー数) + O(Σ 保持キーの部分木サイズ)（保持キー 1 件あたり `Node::eq` 1 回）。接頭辞・接尾辞でも `Update` 判定は必須 |
| `derive_item_template(items)` | fn | Insert 対象アイテム群が同一構造（タグ・属性の並びが一致しテキスト値のみ異なる）かを判定し、テキスト束縛点のパス列を持つ `ItemTemplate` を返す。非同型・`RawHtml` 混入・非 `Element` ルート・空列は `None`（fail-safe）。ルートの `data-key` の値のみ差異を許容する |
| `ItemTemplate::text_paths()` | method | テキスト束縛点パス列（文書順）。各パスはアイテムルートからの `Node::Element::children` のインデックス列 |
| `text_values(item, template)` | fn | `item` に対して各束縛点パスを解決しテキスト値を文書順で返す。解決できなければ `None` |

## Notes

- 本ページは公式 docs サイト（`fandhe-ai.github.io/fandhe-frontend/`）の API Reference 索引に存在しない。`/api/keyed-list-api/` の URL も 404（2026-10-04 確認）で、`site/nav.toml` にも `docs/api/` にも無い。内容は `fandhe-frontend-core` 0.4.3 の crate ソース（`src/keyed.rs` と `src/keyed/template.rs`）由来で、シグネチャは同ソースと突合済み
- `KeyedOp` / `diff_keys` は以前 `fandhe-frontend-wasm-client::keyed_diff`（0.3.0）にあったが、core 0.4.3 の `keyed` モジュールが op 生成（diff・内容比較）の責務を持つ。`fandhe-frontend-wasm-client` 0.6.1 の `keyed_diff` は `pub use fandhe_frontend_core::keyed::{diff_keyed_items, diff_keys, KeyedOp};` の再エクスポートのみ（0.6.1 のソースで確認）で、`Result` を返す core 版と同一シグネチャ
- 実際に DOM へ差分を適用する処理は core の責務外で、`fandhe-frontend-wasm-client` 0.6.1 が `wasm32` 向けに `apply_keyed_list` / `apply_keyed_list_with_previous` などを公開する。`keyed::template` も純 Rust の前段処理のみで、`clone_node` による DOM 適用は後続
- `Result` を `.expect()` / `.unwrap()` すると `KeyedListError: Debug` の整形機構が wasm payload にリンクされる（doc comment によれば約 6KB）。wasm クライアントから呼ぶ場合は `?` / `match` を使う
- `KeyedListError` は `#[non_exhaustive]`。`Display` のメッセージには固定文言とインデックスのみを含み、キー値は含まれない
- `hydrate()` / `wire_hydrate_targets` の DOM 再構築なしハイドレーション経路とは別レイヤーとして提供される

## Related

- [hydrate() API](./hydration-api.md)
- [束縛 (binding) API](./binding-api.md)
- [コンポーネント記述 API](./component-api.md)
