# fandhe-frontend-server API（ssg / ssr モジュール）

`fandhe-frontend-server` クレートが提供する静的サイト生成（SSG）API と、リクエストパスを HTTP レスポンス相当へ文字列化する SSR 純関数（`ssr` モジュール）。`app` / `interactive` / `wasm-client` を扱う既存ページとは別クレート。ページ・アセットを fail-closed なパス検証付きでディスクへ書き出す。

## Signature / Usage

```rust
pub fn generate(out_dir: &Path) -> Result<Vec<PathBuf>, SsgError>

pub fn generate_with<L, D>(
    list_loader: &L,
    detail_loader: &D,
    out_dir: &Path,
) -> Result<Vec<PathBuf>, SsgError>
where
    L: Loader<Input = (), Output = Vec<Item>>,
    D: Loader<Input = String, Output = Option<Item>>;

pub fn generate_pages(pages: &[(String, Node)], out_dir: &Path) -> Result<Vec<PathBuf>, SsgError>

pub fn generate_assets(
    assets: &[(String, String)],
    out_dir: &Path,
) -> Result<Vec<PathBuf>, SsgError>
```

```rust
// ssr モジュール
pub struct SsrResponse {
    pub status: u16,
    pub content_type: &'static str,
    pub body: String,
}

pub fn respond(path: &str) -> Option<SsrResponse>
pub fn respond_with<L, D>(list_loader: &L, detail_loader: &D, path: &str) -> Option<SsrResponse>
where
    L: Loader<Input = (), Output = Vec<Item>>,
    D: Loader<Input = String, Output = Option<Item>>;

// router モジュール（fandhe_frontend_app::router の再エクスポート）
pub use fandhe_frontend_app::router::{Params, RouteMatch, Router, RouterError};
```

```rust
pub enum SsgError {
    UnsafeItemId(String),
    CreateDir { path: PathBuf, source: std::io::Error },
    WriteFile { path: PathBuf, source: std::io::Error },
    RouteNotFound(String),
    UnexpectedStatus { path: String, status: u16 },
    LoaderError { path: String },
    UnsafePagePath(String),
    DuplicatePagePath(String),
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `generate()` | fn | 固定ルート（`/`, `/items/{id}`）をデフォルトローダーで出力。`index.html` を書き出し、生成ファイルのパス一覧を返す |
| `generate_with()` | fn | `list_loader` / `detail_loader` を差し替え可能な汎用版。SSR の 200 応答を無加工で静的ファイル化 |
| `generate_pages()` | fn | 任意の (リクエストパス, `Node`) 組を出力する汎用 API。`fandhe_frontend_core::render` を通しテキスト補間・属性値をデフォルトエスケープ。常に `<path>/index.html` へ出力 |
| `generate_assets()` | fn | 任意の (リクエストパス, 文字列コンテンツ) 組を無加工で書き出す。拡張子付き任意ファイル名に対応。デフォルトエスケープを迂回するため呼び出し側が XML エスケープ等の責任を負う |
| `respond(path)` | fn | 既定 loader（`DemoItemsLoader` / `DemoItemDetailLoader`）で `respond_with` を呼ぶ薄いエントリ。未一致パスは `None`（呼び出し側が 404 を組み立てる） |
| `respond_with(list_loader, detail_loader, path)` | fn | loader 差し替え可能版。`/` は 200、`/items/:id` は存在すれば 200・不在は 404（`detail_page(None)`）、loader が `Err` を返した場合は固定文言の 500 応答（`Error` 値は参照しない）。本文は `page_shell` の出力 |
| `SsrResponse` | struct | `status`（HTTP ステータス相当）/ `content_type`（固定 `&'static str`、`"text/html; charset=utf-8"`）/ `body`（既定エスケープ済み HTML）。ソケット層への変換は呼び出し元（`fandhe-frontend-dist-server` 等）の責務 |
| `SsgError` | enum | `UnsafeItemId` / `CreateDir` / `WriteFile` / `RouteNotFound` / `UnexpectedStatus` / `LoaderError` / `UnsafePagePath` / `DuplicatePagePath` の各バリアントを持つ統一エラー型。表示は呼び出し側指定のパス・ステータスのみに限定し `Loader` 内部詳細は含まない |

## Notes

- パッケージ名は `fandhe-frontend-server`（`crates/server/`、crate 0.2.6 で確認）。公開モジュールは `router`（`fandhe-frontend-app` のルーターの再エクスポート）/ `ssg` / `ssr` の 3 つ
- `generate_with` は SSR の 200 応答ボディ（`respond_with`）をそのままファイルへ書き出すため SSR/SSG の出力は構造的に一致する。一覧 loader を失敗させるとビルド全体を `SsgError::LoaderError { path: "/" }` で中止する。`Item::id` は英数字・`-`・`_` のみ許可（それ以外は `UnsafeItemId`）
- `SsgError::UnexpectedStatus` は SSR が 200 以外を返した場合、`LoaderError` は loader 失敗（500 応答を含む）、`RouteNotFound` は `respond` が `None` を返した場合、`DuplicatePagePath` は正規化後に同一出力先（例: `/a` と `/a/` は共に `a/index.html`）を指した場合に返る
- `app` / `interactive` / `wasm-client` を扱う既存ページとは別クレートである点に注意（`fandhe-frontend-app` 等とは依存方向が逆で、`server` が `app` の `Loader` 実装・`Item` 型を利用する）
- 全パスは書き込み前に全件検証され、正規化後のパス重複も検出される（fail-closed: 1件でも検証失敗すると全出力を中止）
- パストラバーサル対策はホワイトリスト方式のセグメント検証。中間セグメントの `.well-known` は許可、`.git` は明示的にブロックされる
- `generate_pages` はデフォルトエスケープを適用するが、`generate_assets` はエスケープを迂回するため呼び出し側の責任になる

## Related

- [fandhe-frontend-app API](./app-api.md)
