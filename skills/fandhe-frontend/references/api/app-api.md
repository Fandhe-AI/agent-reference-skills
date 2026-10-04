# fandhe-frontend-app API

`fandhe-frontend-app` クレートが提供する公開 API・モジュール構成。ページ組み立て・共通レイアウト・データ取得契約（Loader trait）を扱う。

## Signature / Usage

```rust
struct Item { id: String, title: String, body: String }
fn demo_items() -> Vec<Item>
fn layout(title: &str, body: Node) -> Node
fn list_page(items: &[Item]) -> Node
fn detail_page(item: Option<&Item>) -> Node // None は 404 相当のノード（panic しない）
fn page_shell(title: &str, body: Node) -> String // 完全な HTML 文書生成。SSR・SSG 双方で利用
const LIKE_BUTTON_ID: &str = "like-btn"
```

```rust
trait Loader {
    type Input;
    type Output;
    type Error;
    fn load(&self, input: &Self::Input) -> Result<Self::Output, Self::Error>;
}
// 参照実装（いずれも Error = Infallible）: DemoItemsLoader（入力 () / 出力 Vec<Item>）, DemoItemDetailLoader（入力 String / 出力 Option<Item>）
fn assemble_list_page<L>(loader: &L, input: &L::Input) -> Result<Node, L::Error>
where L: Loader<Output = Vec<Item>>
fn assemble_detail_page<L>(loader: &L, input: &L::Input) -> Result<Node, L::Error>
where L: Loader<Output = Option<Item>>
```

`routes` モジュール（イシュー #407 追記。server の `ssr.rs` と wasm-full の `nav.rs` に別々に存在していたルート定義を `fandhe-frontend-app` 側へ一本化）:

```rust
pub mod routes {
    pub enum AppRoute { List, Detail }
    pub struct ResolvedRoute { pub route: AppRoute, pub id: Option<String> } // id は Detail のみ Some
    pub fn resolve(path: &str) -> Option<ResolvedRoute>; // 一致しないパスは None

    pub fn title(route: AppRoute) -> &'static str;
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `Item` | struct | リスト項目の最小データモデル（`id`, `title`, `body`。全フィールド所有型 `String`） |
| `demo_items()` | fn | 固定デモデータ 3 件（`[1]` の title は意図的な XSS ペイロードで既定エスケープの回帰テスト入力）。公式設計書（`docs/api/app-api.md`）は `items()` と記すが、crate 0.2.6 の実在関数は `demo_items()` のみ |
| `layout(title, body)` | fn | 共通レイアウト（`id="app-root"` `data-fandhe-frontend="root"` の `div` 内に `h1`（title）と `main` を配置） |
| `list_page(items)` | fn | リスト画面。各項目へのリンクに `href` と `data-nav` 属性を付与。タイトルは「記事一覧」 |
| `detail_page(item)` | fn | 詳細画面。`Some` の場合は title / body と `id=LIKE_BUTTON_ID` `data-hydrate="like"` のボタン、一覧へ戻るリンクを描画。`None` は「見つかりません」の 404 相当ノード |
| `page_shell(title, body)` | fn | `<!DOCTYPE html>` を含む完全な HTML 文書生成。`title` は `text()` 経由で既定エスケープされ、`@view-transition { navigation: auto; }` を `style` 要素で同梱する |
| `LIKE_BUTTON_ID` | const | ハイドレーション対象 ID（`"like-btn"`） |
| `Loader` | trait | SSR / SSG / CSR 三モード共有のデータ取得契約。同期 `fn load` のみ。`Error` の表示用文字列に内部情報を含めない契約 |
| `DemoItemsLoader` | struct | `list_page` 向け参照実装。`Input = ()` / `Output = Vec<Item>` / `Error = Infallible` |
| `DemoItemDetailLoader` | struct | `detail_page` 向け参照実装。`Input = String`（id） / `Output = Option<Item>` / `Error = Infallible`。id 不在は `Output = None`（404 相当を `Error` にしない） |
| `assemble_list_page(loader, input)` | fn | loader の解決結果を `list_page` へ型接続する。`Output` 型が `Vec<Item>` でない loader はコンパイルエラー。`load` 失敗時は `Err` を返し描画を続行しない |
| `assemble_detail_page(loader, input)` | fn | loader の解決結果を `detail_page` へ型接続する（`Output = Option<Item>` に固定） |
| `routes::AppRoute` | enum | SSR/CSR 双方が参照する画面種別の統合表現 |
| `routes::ResolvedRoute` | struct | `resolve()` の戻り値。マッチしたルート種別と（Detail の場合）捕捉した `id` を保持 |
| `routes::resolve(path)` | fn | パスをルートへ解決する共有関数（`/` と `/items/:id` のみ登録）。一致しないパスは `None`。戻り値の捕捉値は未エスケープの生文字列で、呼び出し側が既定エスケープ経路（`render()`）を経由させる責務を負う |
| `routes::title(route)` | fn | ルートに対応する固定タイトル文字列を返す（リクエスト由来の値を含まない） |

## Notes

- パッケージ名は `fandhe-frontend-app`（`crates/app/`、crate 0.2.6 で確認）。`#![forbid(unsafe_code)]` + `#![warn(missing_docs)]`、`fandhe-frontend-core` のみに依存
- 公式設計書（`docs/api/app-api.md`）のモジュール構成案（`data` / `pages` / `shell`）と異なり、crate 0.2.6 では `Item` / `demo_items` / `Loader` / `layout` / `list_page` / `detail_page` / `page_shell` / `LIKE_BUTTON_ID` は `lib.rs` 直下で、公開サブモジュールは `router` と `routes` の 2 つ。設計書の凍結表の `Item.id: &'static str`、`list_page()` / `detail_page(id: &str)` の引数なし・id 受け取り形も、実装は `Item.id: String`、`list_page(items: &[Item])`、`detail_page(item: Option<&Item>)` に変わっている（呼び出し側が項目解決を済ませて渡す）
- SSR のソケット層は本クレートに無い。`fandhe-frontend-server` の `ssr::respond(path)` が HTTP レスポンス文字列化の純関数で、axum は不採用（依存グラフ上限 REQ-3 違反のため）。SSG は SSR ボディの単純書き出し
- エスケープは `fandhe-frontend-core` の `render()` 内で必ず実施し、エスケープ迂回経路は `raw_html()` のみに限定される
- ユーザー入力の直接 HTML 組み立ては禁止（`page_shell` は固定文書骨格のみ例外）
- `routes` は `fandhe_frontend_app::router::Router`（[ルーター パスマッチング](./router-path-matching.md)）の共通 `Router` 構造体をマッチングエンジンとして利用し、SSR (`server` crate の `ssr.rs`) と CSR (`wasm-full` crate の `nav.rs`) 双方から呼ばれる単一の真実源として機能する（イシュー #407。crate 0.2.6 で確認）

## Related

- [コンポーネント記述 API](./component-api.md)
- [状態管理 API](./interactive-api.md)
- [ルーター パスマッチング](./router-path-matching.md)
