# コンポーネント記述 API

`fandhe-frontend-core` が提供する、マクロ DSL に依存しないプレーン Rust コンポーネント記述の公開 API（凍結）。REQ-5 の受け入れ基準に対応する。

## Signature / Usage

```rust
enum Node { Element { tag, attrs, children }, Text(String), RawHtml(String) }
fn el(tag: &'static str, attrs: Vec<(&str, &str)>, children: Vec<Node>) -> Node
fn text(s: impl Into<String>) -> Node
fn raw_html(s: impl Into<String>) -> Node
fn render(node: &Node) -> String
// escape モジュール re-export: escape_html / escape_html_into

// 拡張 API（イシュー #1117, #1121 追記。既存 API を置き換えるものではなく追加のみ）
fn el_owned(tag: &'static str, attrs: Vec<(String, String)>, children: Vec<Node>) -> Node
fn json_ld(json: impl Into<String>) -> Node
fn attr_if(cond: bool, name: &str) -> Option<(String, String)>
fn attr_if_value(cond: bool, name: &str, value: impl Into<String>) -> Option<(String, String)>
```

```rust
use fandhe_frontend_core::{el, text, render};
let node = el("p", vec![("class", "greeting")], vec![text("hello")]);
assert_eq!(render(&node), r#"<p class="greeting">hello</p>"#);
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `Node` | enum | HTML ノード木の値表現（`Element` / `Text` / `RawHtml`） |
| `el` | fn | 要素ノードを組み立てる（`attrs` は借用 `&str` ペア） |
| `el_owned` | fn | `el` の所有値版。`attrs` が `String` ペアで、動的な値・条件付き属性を組み立てる場合に使う（イシュー #1121） |
| `text` | fn | テキストノード（既定でエスケープ対象） |
| `raw_html` | fn | 生 HTML ノード（エスケープを迂回する唯一の明示的オプトイン） |
| `render` | fn | ノード木を HTML 文字列へ変換 |
| `json_ld` | fn | JSON-LD を `<script type="application/ld+json">` へ安全に埋め込む。`<`/`>`/`&`/U+2028/U+2029 を `\uXXXX` エスケープした上で内部的に `raw_html` を使う（イシュー #1117） |
| `attr_if` | fn | `cond` が真の場合のみ真偽値属性（値なし属性）を返す。偽の場合 `None`（属性ごと省略） |
| `attr_if_value` | fn | `cond` が真の場合のみ任意値の属性を返す。偽の場合 `None` |

## タグショートカット

最小セット `div, p, ul, li, a, h1, main_tag`（TASK-5.1b）に加え、イシュー #164 で `span, h2〜h6, ol, strong, em, small, blockquote, pre, code, form, label, input, button, textarea, table, thead, tbody, tr, th, td, caption, img, br, hr, section, header, footer, nav, article, aside` が追加され、`core::tags` モジュールは計 41 関数を提供する。シグネチャは共通 `fn <name>(attrs: Vec<(&str, &str)>, children: Vec<Node>) -> Node` で、本体は `el("<tag>", attrs, children)` への薄い委譲のみ。独自のエスケープ経路・raw 出力は持たない。

```rust
use fandhe_frontend_core::{div, p, text, render};
let node = div(vec![("class", "card")], vec![p(vec![], vec![text("hello")])]);
assert_eq!(render(&node), r#"<div class="card"><p>hello</p></div>"#);
```

## Notes

- テキスト・属性値は `render()` 内で必ず `escape_html` 経由で出力される。エスケープ迂回は `raw_html` のみ（`json_ld` は内部で `raw_html` を使うが、埋め込み前に自前でエスケープ済み）
- タグ名は `&'static str` 固定＋ホワイトリスト検証、属性名検証でスキップ（panic 回避・注入防止）による多層防御を行う
- **void 要素（イシュー #1139 で挙動が反転）**: `img`/`br`/`hr`/`input` 等 HTML Standard の void 要素は終了タグを持たず、開始タグのみで自己終端する（`<input ...>` であって `<input ...></input>` ではない）。子ノードは無視される。以前は常に終了タグを出力していたが、SSR/hydration の DOM 不一致バグ対応のため反転した
- 大文字タグ名はそのまま出力する（小文字化はフレームワーク責務外）
- `#![forbid(unsafe_code)]` により `unsafe` を機械的に禁止し、外部依存はゼロ（proc-macro を除く）
- URL 属性値は `is_safe_url` 検証パスを経由し、`on*` イベントハンドラは一律出力しない
- ハイドレーション支援 API・状態管理（`fandhe-frontend-interactive`）・イベントハンドラ API はスコープ外
- 本ページが記す API は「凍結」表記だが、これは初期リリース時点の API 表面の安定性を指す。`el_owned`/`json_ld`/`attr_if`/`attr_if_value` はその後の追加であり、既存シグネチャの変更は伴わない

## Related

- [fandhe-frontend-app API](./app-api.md)
- [状態管理 API](./interactive-api.md)
