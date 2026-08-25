# fandhe-frontend-app API

`fandhe-frontend-app` クレートが提供する公開 API・モジュール構成。ページ組み立て・共通レイアウト・データ取得契約（Loader trait）を扱う。

## Signature / Usage

```rust
struct Item { id: String, title: String, body: String }
fn demo_items() -> Vec<Item>
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

`routes` モジュール（イシュー #407 追記。server の `ssr.rs` と wasm-full の `nav.rs` に別々に存在していたルート定義を `fandhe-frontend-app` 側へ一本化）:

```rust
pub mod routes {
    pub enum AppRoute { List, Detail }
    pub struct ResolvedRoute { pub route: AppRoute, pub id: Option<String> } // id は Detail のみ Some
    pub fn resolve(path: &str) -> ResolvedRoute;
    pub fn title(route: AppRoute) -> &'static str;
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `Item` | struct | リスト項目の最小データモデル（`id`, `title`, `body`。全フィールド所有型 `String`） |
| `demo_items()` | fn | 固定デモデータ（XSS ペイロードを含む）。crates.io 公開版 0.2.0 では `demo_items()` のみ確認でき、`items()` という名前の関数は存在しない（本ページの旧記載は誤り） |
| `layout()` | fn | 共通レイアウト |
| `list_page()` | fn | リスト画面（`data-nav` 属性付き） |
| `detail_page()` | fn | 詳細画面（404 対応） |
| `page_shell()` | fn | 完全な HTML 文書生成 |
| `LIKE_BUTTON_ID` | const | ハイドレーション対象 ID |
| `Loader` | trait | SSR / SSG / CSR 三モード共有のデータ取得契約 |
| `routes::AppRoute` | enum | SSR/CSR 双方が参照する画面種別の統合表現 |
| `routes::ResolvedRoute` | struct | `resolve()` の戻り値。マッチしたルート種別と（Detail の場合）捕捉した `id` を保持 |
| `routes::resolve(path)` | fn | パスをルートへ解決する共有関数。戻り値の捕捉値は未エスケープの生文字列で、呼び出し側が既定エスケープ経路（`render()`）を経由させる責務を負う |
| `routes::title(route)` | fn | ルートに対応する固定タイトル文字列を返す（リクエスト由来の値を含まない） |

## Notes

- パッケージ名は `fandhe-frontend-app`（`crates/app/`）。`#![forbid(unsafe_code)]` + `#![warn(missing_docs)]`、外部依存は `fandhe-frontend-core` への path 依存のみ
- モジュール構成: `data`（`Item`, `demo_items()`）、`pages`（`layout`, `list_page`, `detail_page`）、`shell`（`page_shell`）、`routes`（`AppRoute`, `ResolvedRoute`, `resolve`, `title`）
- エスケープは `fandhe-frontend-core` の `render()` 内で必ず実施し、エスケープ迂回経路は `raw_html()` のみに限定される
- ユーザー入力の直接 HTML 組み立ては禁止（`page_shell` は固定文書骨格のみ例外）
- `routes` は `fandhe_frontend_app::router::Router`（[ルーター パスマッチング](./router-path-matching.md)）の共通 `Router` 構造体をマッチングエンジンとして利用し、SSR (`server` crate の `ssr.rs`) と CSR (`wasm-full` crate の `nav.rs`) 双方から呼ばれる単一の真実源として機能する（イシュー #407。crates.io 公開版 0.2.0 で確認、2026-08-25 時点）

## Related

- [コンポーネント記述 API](./component-api.md)
- [状態管理 API](./interactive-api.md)
- [ルーター パスマッチング](./router-path-matching.md)
