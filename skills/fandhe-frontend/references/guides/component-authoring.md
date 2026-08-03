# コンポーネント記述ガイド（`fandhe-frontend-core`）

`fandhe-frontend-core` はコンポーネントをマクロ DSL（`view!`/`rsx!`/`html!` 相当）に依存させず、通常の Rust の関数・enum・`Vec` だけでノード木を組み立てる「純 Rust 方式」を採用する。

## Signature / Usage

```rust
use fandhe_frontend_core::{el, text, render};

let greeting = el(
    "p",
    vec![("class", "greeting")],
    vec![text("hello, world")],
);

assert_eq!(render(&greeting), r#"<p class="greeting">hello, world</p>"#);
```

- `el(tag, attrs, children)`: `tag` は `&'static str`、`attrs` は `(属性名, 属性値)` のペアの `Vec`、`children` は子ノードの `Vec`
- `text(s)`: 文字列を既定でエスケープされるテキストノードにする
- `render(&node)`: ノード木を HTML 文字列にレンダリングする（SSR/SSG/CSR いずれも共通で使うモード非依存レンダラ）

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `Node::Element { tag, attrs, children }` | enum variant | 要素ノード。属性値は常にエスケープされる |
| `Node::Text(String)` | enum variant | テキストノード。常にエスケープ（既定安全） |
| `Node::RawHtml(String)` | enum variant | 生 HTML ノード。エスケープされない唯一のオプトイン経路 |
| `fn el(tag: &'static str, attrs: Vec<(&str, &str)>, children: Vec<Node>) -> Node` | function | 要素ノードを組み立てる。属性名は英数字・`-`・`_`・`:` のホワイトリスト検証を通過したもののみ出力される |
| `fn text(s: impl Into<String>) -> Node` | function | テキストノードを組み立てる（既定エスケープの入口 API） |
| `fn raw_html(s: impl Into<String>) -> Node` | function | 生 HTML ノードを組み立てる。エスケープを迂回できる唯一の明示的オプトイン API（React の `dangerouslySetInnerHTML` 相当） |
| `fn render(node: &Node) -> String` | function | ノード木を HTML 文字列にレンダリングする |
| `fn escape_html(input: &str) -> String` / `fn escape_html_into(input: &str, out: &mut String)` | function | `render()` が内部で使うエスケープ関数。`&`/`<`/`>`/`"`/`'` をエンティティ化する（OWASP XSS Prevention Cheat Sheet Rule #1 準拠） |

## Notes

- コンポーネントは `Node` を返す通常の Rust 関数。props は関数引数、合成は関数呼び出しでよく、専用の型・トレイト・特別なランタイムはない
- 条件分岐は `if`/`match`、リスト描画はイテレータ→`Vec<Node>`、空ノードは空の `Vec` で表現する。`Node` に専用の `Empty`/`Fragment` バリアントは無い
- `escape_html`/`escape_html_into` は冪等ではない。既にエンティティ化済みの文字列を再度渡すと二重エスケープされる（`text()`/`el()` 経由で使う限りこの契約は自動的に満たされる）
- タグショートカット（`core::tags` モジュール）: `div`/`span`/`p`/`a`/`form`/`table` など。すべて `el()` への一行委譲でシグネチャは共通 `fn <name>(attrs: Vec<(&str, &str)>, children: Vec<Node>) -> Node`
- void 要素（`img`/`br`/`hr`/`input` 等）は開始タグのみで自己終端し、終了タグを出力しない（例: `<img src="/logo.png">`。`</img>` は付かない）。子ノードは無視される（イシュー #1139。以前は常に終了タグを出力していたが SSR/hydration の DOM 不一致バグ対応で反転した）
- 動的な属性値・条件付き属性を組み立てる場合は `el_owned`（`Vec<(String, String)>` 版の `el`）、`attr_if`/`attr_if_value`（条件を満たさない場合は属性ごと省略）を使う（イシュー #1121）
- 意図的に提供しないヘルパー: `script`/`style`/`iframe`（攻撃面が大きいため）。`select`/`option`（Rust の `Option` 型との混同回避のため）。属性なし版ヘルパー・attrs ビルダ API も不採用
- `raw_html()` を使ってよいのは、渡す文字列がフレームワーク利用者コード内の固定リテラル、または別途信頼できるサニタイズ処理を経た文字列である場合のみ。ユーザー入力・外部 API のレスポンス・DB から取得した値をそのまま渡してはいけない
- `format!("<div>{}</div>", user_input)` のような文字列組み立てによる HTML 生成は既定エスケープの保証が一切効かないため禁止
- ネスト 3 段を超えたら関数抽出、意味のあるまとまりには中間 `let` 束縛で名前を付けるのが可読性規約。整形は `cargo fmt` に委ねる
- ハイドレーション・状態管理（`fandhe-frontend-interactive`）は本ガイドの範囲外

## Related

- [クイックスタート](../getting-started/quickstart.md)
- [最小埋め込みガイド](./embedding-guide.md)
