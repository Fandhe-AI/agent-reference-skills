# 状態管理 API

`fandhe-frontend-interactive` クレートが提供する状態管理 API。REQ-11「WASM 完全方式によるクライアントインタラクション」の受け入れ基準に対応する。

## Signature / Usage

```rust
pub trait Component {
    type Action;
    fn update(&mut self, action: Self::Action);
    fn view(&self) -> fandhe_frontend_core::Node;
    fn decode_action(name: &str, payload: &str) -> Option<Self::Action>;
}

pub fn dispatch<C: Component>(component: &mut C, name: &str, payload: &str) -> bool

pub trait Hydrate: Sized {
    fn hydration_attrs(&self) -> Vec<(String, String)>;
    fn from_hydration_attrs(attrs: &[(String, String)]) -> Result<Self, HydrateError>;
}

pub const HYDRATE_ATTR_PREFIX: &str = "data-hydrate-";

pub enum HydrateError {
    MissingAttr(String),
    InvalidValue { attr: String, reason: String },
}

pub mod codec {
    pub fn encode_list(items: &[String]) -> String;
    pub fn decode_list(joined: &str) -> Vec<String>;
}

pub fn render_for_hydration<C: Component + Hydrate>(component: &C) -> fandhe_frontend_core::Node
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `Component` | trait | 状態と描画・遷移を結ぶ中核トレイト |
| `dispatch` | fn | WASM 境界の文字列 dispatch ヘルパ。復号失敗時は状態を変更せず `false` を返す |
| `Hydrate` | trait | SSR ↔ WASM のハイドレーション契約。属性値は信頼できない入力として扱う |
| `HYDRATE_ATTR_PREFIX` | const | ハイドレーション属性のプレフィックス |
| `HydrateError` | enum | `MissingAttr` / `InvalidValue`。`Display`・`std::error::Error` 実装を持つ |
| `codec` | module | Unit Separator（`\u{1f}`）区切り＋バックスラッシュエスケープ方式のリストエンコード/デコード |
| `render_for_hydration` | fn | SSR 用ヘルパ。ルート要素へハイドレーション属性を付与する |

## codec::Value（イシュー #163 追記）

```rust
pub enum Value {
    Str(String), Int(i64), Bool(bool),
    List(Vec<Value>), Map(Vec<(String, Value)>),
}
pub const MAX_VALUE_DEPTH: u32 = 32;
pub enum ValueDecodeError {
    Empty, UnknownTag(char), InvalidLength, InvalidUtf8, InvalidInt, InvalidBool,
    InvalidMapKey, UnexpectedEnd, DepthExceeded, TrailingData,
}
impl ValueDecodeError {
    pub fn into_hydrate_error(self, attr: &str) -> HydrateError;
}
pub fn encode_value(value: &Value) -> String;
pub fn decode_value(input: &str) -> Result<Value, ValueDecodeError>;
```

`Value` / `ValueDecodeError` は `codec` モジュール内の型（`fandhe_frontend_interactive::codec::*`）。`Map` は順序保持の `Vec<(String, Value)>` でキー重複チェックは行わない（アプリ側の責務）。`decode_value` は改ざんされうる属性値を扱うため `MAX_VALUE_DEPTH`（32）超のネストを `DepthExceeded` で拒否する。`into_hydrate_error` は `Hydrate::from_hydration_attrs` 実装内で `?` を使えるよう `HydrateError::InvalidValue` へ変換する。

## AppState / Action（参照実装）

```rust
pub struct AppState {
    pub counter: i64,
    pub draft: String,
    pub items: Vec<String>,
    pub dirty: Vec<&'static str>,   // 描画同期メタデータ（PartialEq・ハイドレーション対象外）
    pub item_ids: Vec<u64>,         // items と同順の keyed list 用安定 id（同上）
    pub next_item_id: u64,          // 同上
}
impl AppState {
    pub const FIELD_COUNTER: &'static str = "counter";
    pub const FIELD_DRAFT: &'static str = "draft";
    pub const FIELD_ITEMS: &'static str = "items";
    pub const FIELD_ITEM_IDS: &'static str = "item-ids";
    pub fn new() -> Self;
}

pub enum Action { Increment, Decrement, Reset, SetDraft(String), AddItem, RemoveItem(u64) }
```

## DirtyTracked（イシュー #341 追記）

```rust
pub trait DirtyTracked: Component {
    fn dirty_fields(&self) -> &[&'static str];
}
```

直前の `update()` で変更されたフィールドを追跡する、`Component` とは別立てのオプトイン・トレイト。`Component::update` のシグネチャは変更しない。実装者が `update()` 冒頭で記録をクリアし、実際に値が変わったフィールド名（`&'static str`）だけを積み上げる契約で、順序は実装依存だが決定的であること。`update()` を経由しない公開フィールドへの直接代入は追跡対象外。

## Notes

- パッケージ名は `fandhe-frontend-interactive`（`crates/interactive/`、crate 0.2.7 で確認）。`#![forbid(unsafe_code)]` + `#![warn(missing_docs)]`、外部クレート依存はゼロ（`fandhe-frontend-core` のみ）
- `AppState` は `Component` / `Hydrate` / `DirtyTracked` を実装する参照実装（カウンター・下書き・動的リスト）。`PartialEq` は `counter` / `draft` / `items` のみを比較する。`decode_action` の対応: `"increment"` → `Increment`、`"decrement"` → `Decrement`、`"reset"` → `Reset`、`"set_draft"` → `SetDraft(payload)`、`"add_item"` → `AddItem`、`"remove_item"` → `RemoveItem(payload を u64 にパース、失敗時は None)`、その他は `None`。`counter` は `saturating_add` / `saturating_sub` で更新され、極端値から復元されても panic しない
- `render_for_hydration` は `view()` のルートが `Node::Element` でない場合（`Text` / `RawHtml`）、属性を付与せず `view()` の戻り値をそのまま返す（panic しない）
- `view()` は `Node` のみ返却し、既定エスケープを必ず経由する
- `decode_action` は文字列変換の単一窓口。未知アクションは `None` を返す
- `Hydrate` は独立トレイトで、SSR 非対応コンポーネントは `Component` のみ実装可能
- 未知アクション名の `dispatch` は no-op（安全側フォールバック）
- codec のラウンドトリップは区切り文字・エスケープ文字を含む入力でも成立する
- 関数本体実装・テストスイート・イベント配線統合・状態注入実配線はスコープ外

## Related

- [コンポーネント記述 API](./component-api.md)
- [fandhe-frontend-app API](./app-api.md)
- [hydrate() API](./hydration-api.md)
