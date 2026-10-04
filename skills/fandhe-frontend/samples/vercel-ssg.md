# Vercel Build Output API with generate_pages

`generate_pages` で `.vercel/output/static/` へ HTML を、`generate_assets` で `config.json`（Build Output API v3）と `404.html` を書き出し、`vercel deploy --prebuilt` で配置する。

```rust
use fandhe_frontend_core::{a, el, h1, header, main_tag, p, render, text, Node};
use fandhe_frontend_server::ssg::{generate_assets, generate_pages};
use std::path::Path;

const OUTPUT_ROOT: &str = ".vercel/output";
const STATIC_DIR: &str = ".vercel/output/static";

struct Page {
    path: &'static str,
    title: &'static str,
    paragraphs: &'static [&'static str],
}

const PAGES: &[Page] = &[
    Page {
        path: "/",
        title: "Vercel SSG Example",
        paragraphs: &[
            "fandhe-frontend フレームワークの SSG 出力を Vercel Build Output API 形式で配置する正本サンプルです。",
        ],
    },
    Page {
        path: "/pages/about/",
        title: "About",
        paragraphs: &["cargo run --release で .vercel/output を生成し、vercel deploy --prebuilt で配置します。"],
    },
];

const CONFIG_JSON: &str = r#"{
  "version": 3,
  "routes": [
    {
      "src": "/(.*)",
      "headers": {
        "X-Content-Type-Options": "nosniff",
        "Referrer-Policy": "strict-origin-when-cross-origin"
      },
      "continue": true
    },
    { "handle": "filesystem" },
    { "src": "/(.*)", "status": 404, "dest": "/404.html" }
  ]
}
"#;

fn layout(title: &str, main: Node) -> Node {
    let head = el(
        "head",
        vec![],
        vec![
            el("meta", vec![("charset", "utf-8")], vec![]),
            el(
                "style",
                vec![],
                vec![text("@view-transition { navigation: auto; }")],
            ),
            el("title", vec![], vec![text(title)]),
        ],
    );
    let body = el(
        "body",
        vec![],
        vec![
            header(
                vec![],
                vec![a(vec![("href", "/")], vec![text("Vercel SSG Example")])],
            ),
            main,
        ],
    );
    el("html", vec![("lang", "ja")], vec![head, body])
}

fn build_pages() -> Vec<(String, Node)> {
    PAGES
        .iter()
        .map(|page| {
            let children: Vec<Node> = std::iter::once(h1(vec![], vec![text(page.title)]))
                .chain(
                    page.paragraphs
                        .iter()
                        .map(|paragraph| p(vec![], vec![text(*paragraph)])),
                )
                .collect();
            (
                page.path.to_string(),
                layout(page.title, main_tag(vec![], children)),
            )
        })
        .collect()
}

fn not_found_page() -> Node {
    layout(
        "404 Not Found",
        main_tag(
            vec![],
            vec![
                h1(vec![], vec![text("404 Not Found")]),
                p(vec![], vec![text("お探しのページは見つかりませんでした。")]),
            ],
        ),
    )
}

fn not_found_asset() -> Vec<(String, String)> {
    let body = format!("<!DOCTYPE html>\n{}", render(&not_found_page()));
    vec![("/404.html".to_string(), body)]
}

/// 生成前に古い `.vercel/output` を削除する（OWASP A05: 古いビルド成果物が
/// 混ざって公開されるのを防ぐ）。
///
/// `.vercel/output` はサンプル自身の固定リテラルパスのみを対象とし、
/// `.vercel/`（`vercel link` が作る `project.json` を含む）自体は残す。
/// 対象またはその親要素（`.vercel` 自体を含む）がシンボリックリンクの場合は
/// fail-closed でエラーを返し、削除しない。`.vercel/output` 自体の
/// `symlink_metadata` だけでは、親の `.vercel` が外部ディレクトリへの
/// シンボリックリンクであるケースを検出できず、そのリンクを辿った先の
/// `output` を意図せず削除してしまうため、パスの構成要素を先頭から順に
/// 検証する。
fn clean_output_dir() -> std::io::Result<()> {
    let path = Path::new(OUTPUT_ROOT);

    let mut ancestor = std::path::PathBuf::new();
    for component in path.components() {
        ancestor.push(component);
        match std::fs::symlink_metadata(&ancestor) {
            Ok(meta) if meta.file_type().is_symlink() => {
                return Err(std::io::Error::new(
                    std::io::ErrorKind::InvalidInput,
                    format!("refusing to remove symlink at {}", ancestor.display()),
                ));
            }
            Ok(_) => {}
            // 途中の構成要素が存在しなければ、削除対象自体も存在しないため
            // 削除するものがない（正常終了）。
            Err(err) if err.kind() == std::io::ErrorKind::NotFound => return Ok(()),
            Err(err) => return Err(err),
        }
    }

    std::fs::remove_dir_all(path)
}

fn main() {
    if let Err(err) = clean_output_dir() {
        eprintln!("failed to clean .vercel/output: {err}");
        std::process::exit(1);
    }

    let result = generate_pages(&build_pages(), Path::new(STATIC_DIR))
        .and_then(|pages| {
            let not_found = generate_assets(&not_found_asset(), Path::new(STATIC_DIR))?;
            let config = generate_assets(
                &[("/config.json".to_string(), CONFIG_JSON.to_string())],
                Path::new(OUTPUT_ROOT),
            )?;
            Ok(pages.into_iter().chain(not_found).chain(config).collect::<Vec<_>>())
        });

    match result {
        Ok(written) => {
            for path in written {
                println!("{}", path.display());
            }
        }
        Err(err) => {
            eprintln!("failed to generate Vercel Build Output API tree: {err}");
            std::process::exit(1);
        }
    }
}
```

```bash
cargo run --release
vercel link
vercel deploy --prebuilt
vercel deploy --prebuilt --prod
```

## Notes

- 出典: https://fandhe-ai.github.io/fandhe-frontend/examples/vercel-ssg/
- 出典は公式 `examples/vercel-ssg`（`fandhe-frontend-core` 0.4.3 / `fandhe-frontend-server` 0.2.6）。`clean_output_dir` は公式からの転記で、生成前に固定リテラルの `.vercel/output` だけを削除し（シンボリックリンクは fail-closed で拒否）、削除済みページの HTML が古い出力に残って公開され続けるのを防ぐ。公式は環境変数 `FANDHE_VERCEL_SSG_BASIC_AUTH=1` で有効化する Basic 認証 Routing Middleware（opt-in）も持つが、ここでは最小構成のため省略しており、`main` は公式のものを `clean_output_dir` → `generate_pages` → `generate_assets` の流れに簡略化している。
- `config.json` の `routes` は、先頭でセキュリティヘッダーを付与（`continue: true`）し、`{"handle": "filesystem"}` で実在ファイルに一致させ、一致しなければ 404 ステータスで `/404.html` を返す。`python3 -m http.server -d .vercel/output/static` のような簡易サーバーでは `routes` は効かない。
- 生成物は `.vercel/output/config.json` と `.vercel/output/static/`（`index.html`・`pages/about/index.html`・`404.html`）。Vercel 側に Rust ツールチェーンは不要で、ローカルまたは CI でビルドした出力を `--prebuilt` で配置するだけでよい。
- 新規 Vercel プロジェクトは Deployment Protection（Vercel Authentication）が既定で有効で、未認証アクセスは SSO ページへ 302 になり 404 フォールバックへは到達しない。リクエスト時 SSR が必要なら `vercel-ssr`（Container Images）を使う。
