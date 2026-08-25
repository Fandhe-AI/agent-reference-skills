# 束縛 (binding) API

`fandhe-frontend-core::bind` が提供する、テキスト・属性・class の状態束縛マーカーを SSR 出力へ埋め込む API。`fandhe-frontend-wasm-client::binding` はハイドレーション時にそのマーカーを走査・解決する層。

## Signature / Usage

```rust
// fandhe-frontend-core::bind
pub const BIND_TEXT_ATTR: &str = "data-bind-text";
pub const BIND_ATTR_ATTR: &str = "data-bind-attr";
pub const BIND_CLASS_ATTR: &str = "data-bind-class";

pub fn bind_text(
    tag: &'static str,
    attrs: Vec<(&str, &str)>,
    field: &'static str,
    value: impl Into<String>,
) -> Node

pub fn bind_attr_token(attr: &'static str, field: &'static str) -> String
pub fn bind_class_token(class: &'static str, field: &'static str) -> String
```

```rust
// fandhe-frontend-wasm-client::binding
pub struct BindingSpec {
    pub field: String,
    pub kind: BindingKind,
}

pub enum BindingKind {
    Text,
    Attr(String),
    Class(String),
}

pub enum BoundValue {
    Text(String),
    Flag(bool),
}

pub trait BindingSource {
    fn bound_value(&self, field: &str) -> Option<BoundValue>;
}

pub fn collect_binding_specs(node: &Node) -> Vec<BindingSpec>
pub fn element_binding_specs(
    bind_text: Option<&str>,
    bind_attr: Option<&str>,
    bind_class: Option<&str>,
) -> Vec<BindingSpec>
pub fn parse_binding_tokens(raw: &str) -> Vec<(String, String)>
pub fn parse_class_binding_tokens(raw: &str) -> Vec<(String, String)>
pub fn unresolved_binding_specs<S: BindingSource>(node: &Node, source: &S) -> Vec<BindingSpec>
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `bind_text(tag, attrs, field, value)` | fn | テキスト束縛付き要素を構築する。`attrs` の末尾（決定的な順序で呼び出し側属性の後）に `data-bind-text="<field>"` を付加し、子ノードは `Node::Text(value)` 1 個のみ。要素は構築時点でテキスト子ノードを厳密に 1 個持つという不変条件を構造的に保証する。属性・テキスト値のエスケープは既存の `render()` に完全委譲する |
| `bind_attr_token(attr, field)` | fn | `data-bind-attr` 属性値用の `"<attr>:<field>"` トークンを合成する（区切り文字は `:`）。`attr`・`field` とも `&'static str` に限定されるため実行時外部入力からトークンを構成できない |
| `bind_class_token(class, field)` | fn | `data-bind-class` 属性値用の `"<class>:<field>"` トークンを合成する。`bind_attr_token` と同じ区切り文字規約 |
| `BIND_TEXT_ATTR` | const | テキスト束縛のマーカー属性名（`"data-bind-text"`） |
| `BIND_ATTR_ATTR` | const | 属性束縛のマーカー属性名（`"data-bind-attr"`） |
| `BIND_CLASS_ATTR` | const | class 束縛のマーカー属性名（`"data-bind-class"`） |
| `BindingSpec { field, kind }` | struct | 走査で見つかった束縛点。`field` は DOM 属性値から実行時に読み取った `String`、DOM ノードへの参照は保持しない |
| `BindingKind::Text` | variant | `data-bind-text` — 要素の唯一のテキスト子ノードを更新する |
| `BindingKind::Attr(String)` | variant | `data-bind-attr` の 1 トークン分。指定属性値を更新する |
| `BindingKind::Class(String)` | variant | `data-bind-class` の 1 トークン分。指定 class のオン/オフを切り替える |
| `BoundValue::Text(String)` | variant | テキスト・属性値として出力する文字列 |
| `BoundValue::Flag(bool)` | variant | class のオン/オフを表す真偽値 |
| `BindingSource::bound_value(&self, field)` | trait method | 状態フィールドの現在値を名前で読む契約。未知フィールドは `None`（fail-closed、panic しない） |
| `collect_binding_specs(node)` | fn | `Node` ツリーを再帰走査し `data-bind-text`/`data-bind-attr`/`data-bind-class` マーカーから `BindingSpec` 列を収集する（深さ優先・出現順）。`Node::Text` はスキップ、`Node::RawHtml` は走査しない。`data-bind-list`（キー付きリスト）は収集対象外 |
| `element_binding_specs(bind_text, bind_attr, bind_class)` | fn | 単一要素の 3 マーカー属性の生値（未設定は `None`）から `BindingSpec` 列を構築する。テキスト→属性（トークン出現順）→class（トークン出現順）の決定的順序で返す |
| `parse_binding_tokens(raw)` | fn | `"<name>:<field>"` 形式の空白区切りトークン列をパースする（`data-bind-attr` 専用）。`name` は `is_valid_attr_binding_name` で検証（`on*` 接頭辞を拒否） |
| `parse_class_binding_tokens(raw)` | fn | `"<name>:<field>"` 形式の空白区切りトークン列をパースする（`data-bind-class` 専用）。`name` は `is_valid_class_binding_name` で検証。class 名は `setAttribute` を経由せず `classList.toggle_with_force` にしか到達しないため `on*` 接頭辞拒否は行わない |
| `unresolved_binding_specs(node, source)` | fn | `collect_binding_specs` が収集した束縛点のうち `source.bound_value` が `None` を返すもの（実行時 no-op）を抽出する。空の `Vec` はビューのマーカーと状態フィールドが整合していることを示す読み取り専用の検証ユーティリティ |

## Notes

- `bind_text`/`bind_attr_token`/`bind_class_token` は `fandhe-frontend-core`（crates.io 公開版 0.2.0）、`binding` モジュール一式は `fandhe-frontend-wasm-client`（crates.io 公開版 0.3.0）で確認（docs.rs 該当バージョンページ、2026-08-25 時点）
  - 出典:
    - https://docs.rs/fandhe-frontend-core/0.2.0/fandhe_frontend_core/fn.bind_text.html
    - https://docs.rs/fandhe-frontend-core/0.2.0/fandhe_frontend_core/fn.bind_attr_token.html
    - https://docs.rs/fandhe-frontend-core/0.2.0/fandhe_frontend_core/fn.bind_class_token.html
    - https://docs.rs/fandhe-frontend-core/0.2.0/fandhe_frontend_core/constant.BIND_TEXT_ATTR.html
    - https://docs.rs/fandhe-frontend-core/0.2.0/fandhe_frontend_core/constant.BIND_ATTR_ATTR.html
    - https://docs.rs/fandhe-frontend-core/0.2.0/fandhe_frontend_core/constant.BIND_CLASS_ATTR.html
    - https://docs.rs/fandhe-frontend-wasm-client/0.3.0/fandhe_frontend_wasm_client/struct.BindingSpec.html
    - https://docs.rs/fandhe-frontend-wasm-client/0.3.0/fandhe_frontend_wasm_client/enum.BindingKind.html
    - https://docs.rs/fandhe-frontend-wasm-client/0.3.0/fandhe_frontend_wasm_client/enum.BoundValue.html
    - https://docs.rs/fandhe-frontend-wasm-client/0.3.0/fandhe_frontend_wasm_client/trait.BindingSource.html
    - https://docs.rs/fandhe-frontend-wasm-client/0.3.0/fandhe_frontend_wasm_client/fn.collect_binding_specs.html
    - https://docs.rs/fandhe-frontend-wasm-client/0.3.0/fandhe_frontend_wasm_client/fn.element_binding_specs.html
    - https://docs.rs/fandhe-frontend-wasm-client/0.3.0/fandhe_frontend_wasm_client/fn.parse_binding_tokens.html
    - https://docs.rs/fandhe-frontend-wasm-client/0.3.0/fandhe_frontend_wasm_client/fn.parse_class_binding_tokens.html
    - https://docs.rs/fandhe-frontend-wasm-client/0.3.0/fandhe_frontend_wasm_client/fn.unresolved_binding_specs.html
- `fandhe-frontend-core` には本ページ記載分に加え複数トークンをまとめて処理する `bind_attr_tokens`/`bind_class_tokens` も公開されている（docs.rs で存在確認済み、詳細シグネチャは未検証）
- 公式ドキュメントサイト（`fandhe-ai.github.io/fandhe-frontend/`）のナビゲーションには未掲載（2026-08-25 時点）、crates.io 公開済み API
- `hydrate()` の DOM 再構築なしハイドレーション経路とは別レイヤー。`BindingSource` の参照実装は `fandhe_frontend_interactive::AppState`（`counter`/`draft` フィールドのみ対応、キー付きリスト構造は別経路で更新）

## Related

- [hydrate() API](./hydration-api.md)
- [keyed_list API](./keyed-list-api.md)
