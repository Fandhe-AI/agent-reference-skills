# hydrate() API

`fandhe-frontend-wasm-client` が提供する、SSR/SSG 出力済み DOM を再構築せずイベントリスナーを後付けするハイドレーション API。REQ-6・REQ-7 の受け入れ基準に対応する。

## Signature / Usage

```rust
// fandhe-frontend-wasm-client
#[wasm_bindgen]
pub fn hydrate(root_id: &str) -> Result<(), JsValue>
// 指定 ID のルート要素配下の既存 DOM を再構築せず、イベントリスナーを後付けする

#[wasm_bindgen]
pub fn mount_csr(root_id: &str) -> Result<(), JsValue>
// CSR 経路でページを innerHTML へ反映

// fandhe-frontend-core
pub fn find_attr_values(node: &Node, attr_name: &str) -> Vec<String>
// 指定属性を持つ子孫要素の属性値を列挙する DOM 非依存の純粋関数

pub fn find_nav_targets(node: &Node) -> Vec<String>
// data-nav 属性専用のショートカット

// 拡張 API（Section 12 追記。#[cfg(target_arch = "wasm32")] の pub use 経由で公開）
pub fn replace_subtree(slot: &Element, node: &Node) -> Result<(), JsValue>
// Node ツリーから DOM サブツリーを置き換える。HTML 文字列組み立てを経由しない

pub fn set_timeout_once(key: &str, ms: u32, f: impl FnOnce() + 'static) -> Result<(), JsValue>
pub fn clear_timeout_once(key: &str)
// key 単位の単発タイマー。明示的なレジストリ管理で closure.forget() を使わない
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `hydrate(root_id)` | fn | 既存 DOM 再構築なしでイベントリスナーを後付け |
| `mount_csr(root_id)` | fn | CSR がSSR/SSGと同一関数を呼び `innerHTML` へ反映する |
| `find_attr_values(node, attr_name)` | fn | DOM 非依存でハイドレーション対象属性値を列挙 |
| `find_nav_targets(node)` | fn | `data-nav` 属性専用の列挙ショートカット |
| `replace_subtree(slot, node)` | fn | `Node` ツリーで DOM サブツリーを置換。ツリーに `Node::RawHtml` を検出した場合は fail-closed で失敗する |
| `set_timeout_once(key, ms, f)` / `clear_timeout_once(key)` | fn | `key` 単位の単発タイマー。同一 `key` での再呼び出し・明示 `clear` まで期限切れタイマーはレジストリに残る（遅延クリーンアップ） |

## Notes

- パッケージ名は `fandhe-frontend-wasm-client`（`crates/wasm-client/`、edition 2021、`crate-type = ["cdylib", "rlib"]`）。依存は `fandhe-frontend-core`・`fandhe-frontend-app` + `wasm-bindgen`/`web-sys`
- `#[wasm_bindgen]` の展開コードが `unsafe` を含むため `#![deny(unsafe_code)]` を採用する（`forbid` は不採用）
- `root_id: &str` 受け取りは複数マウント・部分埋め込み構成（REQ-7）との整合のため
- `set_inner_html` 等の DOM 再構築系 API は呼び出さない（サーバー出力済み DOM を再構築しない不変条件）
- DOM への HTML 挿入は `fandhe_frontend_core::render()` の出力（既定エスケープ済み）のみを経由する。`raw_html()` は `wasm-client` から呼ばない
- イベントハンドラ内の DOM 更新は `set_text_content` / `class_list` 等のテキスト・属性 API に限定する
- ハンドル保持は `thread_local!` レジストリで行い、複数回呼び出しでのリーク蓄積を回避する
- エラー・ログに内部パス・状態値等の機微情報を含めない
- イシュー #403 の追記: `hydrate` の本体は `wire_hydrate_targets(registry_key: &str, root: &Element)` として共有 Rust API に切り出され、`wasm-full` からの遷移後再配線でも利用される。シグネチャ・挙動は不変
- `fandhe-frontend-wasm-client` は `keyed_diff`（keyed list の差分操作を計画する純粋関数層）と `binding`（`bind_text`/`bind_attr_token`/`bind_class_token` マーカーの解決）も提供する。既存の DOM 再構築なし方式（`hydrate`/`wire_hydrate_targets`）とは別レイヤー。詳細は [keyed_list API](./keyed-list-api.md) / [束縛 (binding) API](./binding-api.md) を参照

## Related

- [状態管理 API](./interactive-api.md)
- [ハイドレーション状態フォーマット](./hydration-state-format.md)
- [keyed_list API](./keyed-list-api.md)
- [束縛 (binding) API](./binding-api.md)
