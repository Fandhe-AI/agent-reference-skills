# Help Center（Application Blocks）

Help Center は、パンくず・コレクション見出し・記事一覧カードで構成するヘルプセンター画面の合成例 2 件。blocks は新規 API ではなく既存の Themes / Primitives / core 部品の合成例で、各 block の公開物は未公開 crate docs-site 内部の `pub fn demo() -> Node` と `pub const BLOCK: Block` だけである。

## Signature / Usage

`help-center-article-list`（カテゴリ内で最も短い block）の `## Rust コード` の冒頭抜粋。

```rust
use fandhe_frontend_core::{div, el, li, p, span, text, ul, Node};
use fandhe_frontend_pre_styled_ui::badge::{badge, BadgeProps, BadgeVariant};
use fandhe_frontend_pre_styled_ui::breadcrumb::{self, BreadcrumbVariant};
use fandhe_frontend_pre_styled_ui::card::{self, CardProps};
use fandhe_frontend_pre_styled_ui::heading::{heading, HeadingLevel, HeadingProps, HeadingSize};
use fandhe_frontend_pre_styled_ui::icon::{icon, IconProps};
use fandhe_frontend_pre_styled_ui::link::{self, LinkProps};
use fandhe_frontend_pre_styled_ui::stat;
use fandhe_frontend_pre_styled_ui::Size;

/// 自作の幾何アイコン（線画。モジュール doc「アイコンは自作の単純図形」
/// 節参照）。`path` へ `fill="none"` + `stroke="currentColor"` を明示し、
/// `icon` の `<svg>` 側が固定で持つ `fill="currentColor"`（塗り面）を
/// 上書きして線画（ストローク）として描画する。
fn geo_icon(path_d: &'static str) -> Node {
    icon(
        &IconProps::default(),
        vec![],
        vec![el(
            "path",
            vec![
                ("d", path_d),
                ("fill", "none"),
                ("stroke", "currentColor"),
                ("stroke-width", "2"),
                ("stroke-linecap", "round"),
                ("stroke-linejoin", "round"),
            ],
            vec![],
        )],
    )
}

/// 開いた本のアイコン（コレクション見出し用。版 A のみに付ける、
/// モジュール doc「2 版と集約元の対応」節参照）。
fn book_icon() -> Node {
    geo_icon("M4 5c4-2 8-1 8 1v13c0-2-4-3-8-1zm16 0c-4-2-8-1-8 1v13c0-2 4-3 8-1z")
}

/// 行末のシェブロン（右矢印。狭幅でも `margin-inline-start: auto` で
/// 右端に残す、モジュール doc「狭い幅では」節参照）。
fn chevron_icon() -> Node {
    geo_icon("M9 5l7 7-7 7")
}

/// パンくず 1 本（ドキュメントトップ → Blocks → 現在のコレクション。
/// 実サイト階層〔ドキュメントトップ配下に Blocks、その配下に本ページ〕と
/// 一致させる順序、イシュー #3427 レビュー指摘対応）。
/// A/B 共通で使う（`page_heading_meta.rs` の常時パンくず付きインスタンスと
/// 同型の合成）。
fn breadcrumb_row() -> Node {
    breadcrumb::root(
        Size::Sm,
        BreadcrumbVariant::Plain,
        Some("パンくずリスト"),
        vec![],
        vec![breadcrumb::list(
            vec![],
            vec![
                breadcrumb::item(
                    vec![],
                    vec![breadcrumb::link(
                        "../../",
                        vec![],
                        vec![text("ドキュメントトップ")],
                    )],
                ),
                breadcrumb::separator(vec![], vec![text("/")]),
                breadcrumb::item(
                    vec![],
                    vec![breadcrumb::link("../", vec![], vec![text("Blocks")])],
                ),
                breadcrumb::separator(vec![], vec![text("/")]),
                breadcrumb::item(
                    vec![],
                    vec![breadcrumb::current_link(
                        vec![],
                        vec![text("サイトの歩き方")],
                    )],
                ),
            ],
        )],
    )
}
// ...（以下省略。全文は公式ページ https://fandhe-ai.github.io/fandhe-frontend/blocks/help-center-article-list/ の「Rust コード」を参照）
```

## Blocks

| slug | 説明 | 使用部品 | 公式 URL |
|------|------|----------|----------|
| help-center-article-list | パンくず → コレクション見出し（アイコン・題名・説明・記事数バッジ）→ 記事一覧カードのヘルプセンター記事一覧。記事 6 件をフラットに並べる版 A と、グループ見出しで 3 区分する版 B を並記 | [Breadcrumb](../../themes/navigation/breadcrumb.md) / [Heading](../../themes/typography/heading.md) / [Card](../../themes/data-display/card.md) / [Stat](../../themes/data-display/stat.md) / [Badge](../../themes/data-display/badge.md) / [Icon](../../themes/data-display/icon.md) / [Link](../../themes/typography/link.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/help-center-article-list/ |
| help-center-collection-grid | パンくずと見出しの下に、ヘルプ記事コレクションをカードのグリッドで並べる。コンテナ幅に応じて 3 列 → 2 列 → 1 列へ切り替え（`@container`） | [Breadcrumb](../../themes/navigation/breadcrumb.md) / [Heading](../../themes/typography/heading.md) / [Text](../../themes/typography/text.md) / [Card](../../themes/data-display/card.md) / [Icon](../../themes/data-display/icon.md) / [Stat](../../themes/data-display/stat.md) / [Avatar](../../themes/data-display/avatar.md) / [Link](../../themes/typography/link.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/help-center-collection-grid/ |

## Notes

- 上記コードは公式 md `## Rust コード` の冒頭抜粋（元は約 265 行）。全文は公式ページを参照する。
- docs-site は crates.io 未公開の crate で、`demo()` は利用者が `use` できる API ではない。利用者は block のコード例をコピーし、既存部品を合成して使う。
- すべての Demo は無 JS の静的表示で `<form>` を含まない。コレクション名・記事タイトル・件数・著者アバターは架空のダミーデータ。
- `help-center-article-list` の差分メモ: 記事リンクの `href` と、パンくずの中間項目（ドキュメントトップ）は docs サイト内の実在する索引ページを指す。実際に使う際は自分のページ URL へ差し替える。記事行間の罫線・狭幅時のカード余白の詰めは `card` / `link` 部品自体の機能ではなく block の CSS が付与する。見出し・シェブロンのアイコンは自作の線画（SVG path）。
- 出典（pin SHA `cf5edb9b8f1bf2a63d51dcf50a8d2806e2d8f9f9`）: `crates/docs-site/src/blocks/application/help_center/help_center_article_list.rs`（コードは `// blocks-code:begin`〜`end` の範囲）、公式 md は `site/blocks/<slug>.md`。`help-center-collection-grid` は同ディレクトリの `help_center_collection_grid.rs`。

## Related

- [Application Blocks overview](./overview.md)
- [Breadcrumb](../../themes/navigation/breadcrumb.md)
- [Card](../../themes/data-display/card.md)
