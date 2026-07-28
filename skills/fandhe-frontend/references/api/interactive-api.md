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
pub fn encode_value(value: &Value) -> String;
pub fn decode_value(input: &str) -> Result<Value, ValueDecodeError>;
```

## DirtyTracked（イシュー #341 追記）

```rust
pub trait DirtyTracked: Component {
    fn dirty_fields(&self) -> &[&'static str];
}
```

直前の `update()` で変更されたフィールドを追跡する、`Component` とは独立したトレイト。

## Notes

- パッケージ名は `fandhe-frontend-interactive`（`crates/interactive/`、edition 2021）。`#![forbid(unsafe_code)]` + `#![warn(missing_docs)]`、外部クレート依存はゼロ（`fandhe-frontend-core` のみ）
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
