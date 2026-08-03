# JS ゼロ SSG 利用ガイド（`fandhe-frontend-server`）

クライアント JavaScript を一切読み込まない静的サイト構成での制約と代替パターンを扱うガイド。イシュー #1118（styled Accordion が JS ゼロ SSG で常時閉のまま）を契機に作成された。

## Signature / Usage

```rust
use fandhe_frontend_server::ssg::generate_assets;
use std::path::Path;

let assets = vec![
    ("/sitemap.xml".to_string(), sitemap_xml),
    ("/robots.txt".to_string(), robots_txt),
];

generate_assets(&assets, Path::new("dist"))?;
```

details/summary によるアコーディオン代替:

```rust
use fandhe_frontend_core::{el, text, Node};

fn disclosure_panel(summary_text: &str, body_text: &str) -> Node {
    let summary = el("summary", vec![], vec![text(summary_text.to_string())]);
    let body = el("div", vec![], vec![text(body_text.to_string())]);
    el("details", vec![], vec![summary, body])
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `fn generate_assets(assets: &[(String, String)], out_dir: &Path) -> Result<Vec<PathBuf>, SsgError>` | function | 非 HTML アセット（`sitemap.xml`/`robots.txt` 等）を `out_dir` へ書き出す。`fandhe-frontend-server` 0.2.0 以降 |
| `assets: &[(String, String)]` | parameter | `(リクエストパス, コンテンツ文字列)` のペアの列 |
| `out_dir: &Path` | parameter | 出力先ディレクトリ |

## Notes

- 部品の開閉状態は SSR/SSG ビルド時に Rust コード側が渡した引数でそのまま出力される。`data-state`（`open`/`closed` 等）属性の書き換えは `fandhe-frontend-wasm-full` のクライアント側ハイドレーションが担当するため、JS ゼロ構成ではハイドレーション自体が読み込まれず初期状態が固定される
- クリック配線対象部品は `crates/wasm-full/src/headless.rs` の `MAPPING_TABLE` に `(scope, part)` → アクション文字列として登録済み: collapsible / dialog / popover / tooltip / menu / tabs / radio-group / select / signature-pad / combobox / toggle-group / tree-view / calendar / accordion。Accordion は `scope: "accordion"`, `part: "item-trigger"`, `action: "toggle"`, `requires_value: true` の 1 エントリのみで、`item-trigger` パーツのクリックが `toggle` 操作へ写像される（fandhe-frontend-headless-ui 0.27.0 以降が前提）。マッピング表にない組は `None` を返す fail-closed 契約
- 開閉インタラクションが必要で JS を読み込まない場合はブラウザネイティブの `<details>`/`<summary>` 要素を使う。`fandhe-frontend-core` は details/summary 専用のタグ関数を持たないため汎用 `el()` を使う。Theme トークンで CSS を別途定義すれば既存部品との見た目統一が可能
- 排他制御が必要な場合は `<details name="...">` で同じ `name` を持つ要素どうしが排他的に開閉する（HTML Living Standard の比較的新しい機能。古いブラウザでは無視され各要素が独立して開閉する）
- `generate_assets` は `Node` 木・`render()` を経由しないため既定エスケープ（REQ-1）は適用されない。コンテンツは書き込み前に呼び出し側で処理する必要がある（XML エスケープ等）。HTML ページ生成には別途 `generate_pages(pages: &[(String, Node)], out_dir: &Path) -> Result<Vec<PathBuf>, SsgError>` を使う
- `generate_assets`/`generate_pages` ともに全パスを事前検証してから書き込む fail-closed 戦略（部分書き込みを防ぐ）。`.well-known/` （RFC 8615）は許可、`.git` ディレクトリは拒否される
- 静的表示部品（heading/text 等）は JS ゼロ構成でも影響を受けない

## Related

- [コンポーネント記述ガイド](./component-authoring.md)
