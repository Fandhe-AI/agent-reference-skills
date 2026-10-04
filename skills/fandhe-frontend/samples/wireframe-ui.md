# Wireframe UI showcase page with wireframe_css

`fandhe-frontend-wireframe-ui`（ローファイ・モノクロのワイヤーフレーム部品）で 1 ページを組み立て、`dist/index.html` と `wireframe_css()` の出力を別ファイル `dist/assets/wireframe.css` へ書き出す。

```rust
use fandhe_frontend_core::{el, h1, h2, h3, header, main_tag, render, section, text, Node};
use fandhe_frontend_wireframe_ui as wire;
use wire::{Orientation, Size};

fn item(label: &str, node: Node) -> Node {
    fandhe_frontend_core::div(
        vec![("class", "showcase-item")],
        vec![h3(vec![], vec![text(label)]), node],
    )
}

fn phase1() -> Node {
    section(
        vec![("id", "phase-1-layout"), ("class", "showcase-phase")],
        vec![
            h2(vec![], vec![text("Phase 1: レイアウト骨格")]),
            item(
                "grid",
                wire::grid(vec![text("1"), text("2"), text("3"), text("4")], 2, Size::Md),
            ),
            item(
                "divider",
                wire::divider(Some("区切り"), Size::Md, Orientation::Horizontal),
            ),
            item(
                "stack",
                wire::stack(vec![text("項目 A"), text("項目 B")], Orientation::Vertical, Size::Md),
            ),
            item("frame", wire::frame(vec![text("枠内コンテンツ")], Size::Md, true)),
        ],
    )
}

fn layout(title: &str, main: Node) -> Node {
    let head = el(
        "head",
        vec![],
        vec![
            el("meta", vec![("charset", "utf-8")], vec![]),
            el(
                "link",
                vec![("rel", "stylesheet"), ("href", "assets/wireframe.css")],
                vec![],
            ),
            el("title", vec![], vec![text(title)]),
        ],
    );
    let document_body = el(
        "body",
        vec![],
        vec![
            header(vec![], vec![h1(vec![], vec![text("wireframe-ui ショーケース")])]),
            main,
        ],
    );
    el("html", vec![("lang", "ja")], vec![head, document_body])
}

fn main() {
    let page = layout("wireframe-ui ショーケース", main_tag(vec![], vec![phase1()]));
    let html = format!("<!DOCTYPE html>\n{}", render(&page));

    let dist = std::path::Path::new("dist");
    let assets = dist.join("assets");
    if let Err(err) = std::fs::create_dir_all(&assets) {
        eprintln!("failed to create dist/assets: {err}");
        std::process::exit(1);
    }
    if let Err(err) = std::fs::write(dist.join("index.html"), html) {
        eprintln!("failed to write dist/index.html: {err}");
        std::process::exit(1);
    }
    if let Err(err) = std::fs::write(
        assets.join("wireframe.css"),
        fandhe_frontend_wireframe_ui::wireframe_css(),
    ) {
        eprintln!("failed to write dist/assets/wireframe.css: {err}");
        std::process::exit(1);
    }
}
```

```toml
[dependencies]
fandhe-frontend-core = "0.4.3"
fandhe-frontend-wireframe-ui = "0.52.0"
```

## Notes

- 出典: https://fandhe-ai.github.io/fandhe-frontend/examples/wireframe-ui/
- 出典は公式 `examples/wireframe-ui`（`src/main.rs` + `src/sections.rs`）。公式は Phase 1〜8・全 49 部品を 1 ページに並べるが、ここでは Phase 1（grid / divider / stack / frame）のみ抜粋。`wire::<関数>(...)` の修飾呼び出しにするのは、core の `text()`（テキストノード生成）と wireframe-ui の `text()`（Text 部品）が衝突するため。
- `wireframe_css()` を `<style>` へインライン埋め込みしてはいけない。`render` は `Node::Text` を常にエスケープするため、子結合子セレクタの `>` が `&gt;` になり壊れる。別ファイルへ書き出して `<link rel="stylesheet">` で参照する。
- wireframe-ui は SSR 専用・非インタラクティブな表示専用部品層。wasm 配線も状態遷移も持たず、`fandhe-frontend-server` への依存も不要（`generate_pages` を使わず 1 ページを直接書き出す）。
- 部品へ渡すテキスト引数は内部で `text()` 経由になり既定エスケープされる（`<script>` を含む文字列も実体参照化される）。JS の `@ark-ui/react` / `@chakra-ui/react` とは別物（Rust API）。
