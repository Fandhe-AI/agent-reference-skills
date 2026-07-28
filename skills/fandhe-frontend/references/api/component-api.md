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
| `el` | fn | 要素ノードを組み立てる |
| `text` | fn | テキストノード（既定でエスケープ対象） |
| `raw_html` | fn | 生 HTML ノード（エスケープを迂回する唯一の明示的オプトイン） |
| `render` | fn | ノード木を HTML 文字列へ変換 |

## タグショートカット

`div, p, ul, li, a, h1, main_tag` を実装対象の最小セットとする。シグネチャは `fn <name>(attrs: Vec<(&str, &str)>, children: Vec<Node>) -> Node` で、本体は `el("<tag>", attrs, children)` への薄い委譲のみ。独自のエスケープ経路・raw 出力は持たない。

```rust
use fandhe_frontend_core::{div, p, text, render};
let node = div(vec![("class", "card")], vec![p(vec![], vec![text("hello")])]);
assert_eq!(render(&node), r#"<div class="card"><p>hello</p></div>"#);
```

## Notes

- テキスト・属性値は `render()` 内で必ず `escape_html` 経由で出力される。エスケープ迂回は `raw_html` のみ
- タグ名は `&'static str` 固定＋ホワイトリスト検証、属性名検証でスキップ（panic 回避・注入防止）による多層防御を行う
- void 要素は常に終了タグを出力する（既知制約として凍結、最適化は将来課題）
- 大文字タグ名はそのまま出力する（小文字化はフレームワーク責務外）
- `#![forbid(unsafe_code)]` により `unsafe` を機械的に禁止し、外部依存はゼロ
- URL 属性値は `is_safe_url` 検証パスを経由し、`on*` イベントハンドラは一律出力しない
- ハイドレーション支援 API・状態管理（`fandhe-frontend-interactive`）・イベントハンドラ API はスコープ外

## Related

- [fandhe-frontend-app API](./app-api.md)
- [状態管理 API](./interactive-api.md)
