# Static site generation with generate_pages

`generate_pages` に (リクエストパス, `Node`) 列を渡し、静的ブログサイトを `dist/` へ書き出す。

```rust
use fandhe_frontend_core::{a, article, el, h1, header, main_tag, p, text, Node};
use fandhe_frontend_server::ssg::generate_pages;
use std::path::Path;

struct Post {
    slug: &'static str,
    title: &'static str,
    paragraphs: &'static [&'static str],
}

fn layout(title: &str, main: Node) -> Node {
    let head = el(
        "head",
        vec![],
        vec![
            el("meta", vec![("charset", "utf-8")], vec![]),
            el("style", vec![], vec![text("@view-transition { navigation: auto; }")]),
            el("title", vec![], vec![text(title)]),
        ],
    );
    let document_body = el(
        "body",
        vec![],
        vec![header(vec![], vec![a(vec![("href", "/")], vec![text("SSG Blog")])]), main],
    );
    el("html", vec![("lang", "ja")], vec![head, document_body])
}

fn post_page(post: &Post) -> Node {
    let mut children = vec![h1(vec![], vec![text(post.title)])];
    children.extend(post.paragraphs.iter().map(|paragraph| p(vec![], vec![text(*paragraph)])));
    main_tag(vec![], vec![article(vec![], children)])
}

fn build_pages(posts: &[Post]) -> Vec<(String, Node)> {
    let mut pages = vec![("/".to_string(), layout("Posts", main_tag(vec![], vec![h1(vec![], vec![text("Posts")])])))];
    for post in posts {
        pages.push((format!("/posts/{}/", post.slug), layout(post.title, post_page(post))));
    }
    pages
}

fn main() {
    let posts = [Post { slug: "hello-ssg", title: "Welcome", paragraphs: &["first paragraph"] }];
    match generate_pages(&build_pages(&posts), Path::new("dist")) {
        Ok(written) => {
            for path in written {
                println!("{}", path.display());
            }
        }
        Err(err) => eprintln!("failed to generate static site: {err}"),
    }
}
```

## Notes

- `generate_pages` は `Node` 列を要求するため、`String` を返す `fandhe_frontend_app::page_shell` は使えない。ページ骨格は `Node` を返す自作の `layout` を用意する。
- 出力パスの検証は fail-closed。不正なパス（`..` を含む等）が1件でもあれば全ページとも何も書き出さない。正規化後の重複パス（`/a` と `/a/` はいずれも `a/index.html`）も拒否される。
- `slug` は出力パスの一部になるため静的リテラルなど、`generate_pages` のパス検証ホワイトリスト（英数字・`-`・`_`）を満たす値のみを使う。
