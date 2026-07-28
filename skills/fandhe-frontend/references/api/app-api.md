# fandhe-frontend-app API

`fandhe-frontend-app` クレートが提供する公開 API・モジュール構成。ページ組み立て・共通レイアウト・データ取得契約（Loader trait）を扱う。

## Signature / Usage

```rust
struct Item { id: &'static str, title: String, body: String }
fn items() -> Vec<Item>
fn layout(title: &str, body: Node) -> Node
fn list_page() -> Node
fn detail_page(id: &str) -> Node
fn page_shell(title: &str, body: Node) -> String // 完全な HTML 文書生成。SSR・SSG 双方で利用
const LIKE_BUTTON_ID: &str
```

```rust
trait Loader {
    type Input;
    type Output;
    type Error;
    fn load(&self, input: &Self::Input) -> Result<Self::Output, Self::Error>;
}
// 参照実装: DemoItemsLoader（入力 () / 出力 Vec<Item>）, DemoItemDetailLoader（入力 String / 出力 Option<Item>）
fn assemble_list_page(/* 汎用型アセンブラ */) -> Node
fn assemble_detail_page(/* 汎用型アセンブラ */) -> Node
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `Item` | struct | リスト項目の最小データモデル（`id`, `title`, `body`） |
| `items()` | fn | 固定デモデータ（XSS ペイロードを含む） |
| `layout()` | fn | 共通レイアウト |
| `list_page()` | fn | リスト画面（`data-nav` 属性付き） |
| `detail_page()` | fn | 詳細画面（404 対応） |
| `page_shell()` | fn | 完全な HTML 文書生成 |
| `LIKE_BUTTON_ID` | const | ハイドレーション対象 ID |
| `Loader` | trait | SSR / SSG / CSR 三モード共有のデータ取得契約 |

## Notes

- パッケージ名は `fandhe-frontend-app`（`crates/app/`）。`#![forbid(unsafe_code)]` + `#![warn(missing_docs)]`、外部依存は `fandhe-frontend-core` への path 依存のみ
- モジュール構成: `data`（`Item`, `items()`）、`pages`（`layout`, `list_page`, `detail_page`）、`shell`（`page_shell`）
- エスケープは `fandhe-frontend-core` の `render()` 内で必ず実施し、エスケープ迂回経路は `raw_html()` のみに限定される
- ユーザー入力の直接 HTML 組み立ては禁止（`page_shell` は固定文書骨格のみ例外）

## Related

- [コンポーネント記述 API](./component-api.md)
- [状態管理 API](./interactive-api.md)
