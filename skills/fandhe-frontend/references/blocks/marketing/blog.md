# Blog（Marketing Blocks）

Blocks は新規 API ではなく、既存の Themes / Primitives / core 部品を組み合わせた合成例。各 block の公開物は未公開 crate `docs-site` 内部の `pub fn demo() -> Node` と `pub const BLOCK: Block` のみ。Blog は 7 block。

## Signature / Usage

カテゴリ内で最も短い block `blog-overlay-cards`（背景画像にグラデーションを重ねた記事カード 3 件のグリッド。カード全体が `link-overlay` で 1 つのリンク）の `## Rust コード` の冒頭抜粋。

```rust
use crate::blocks::dummy_assets;
use fandhe_frontend_core::{div, el, span, text, Node};
use fandhe_frontend_pre_styled_ui::avatar::{self, AvatarProps, ImageStatus};
use fandhe_frontend_pre_styled_ui::card::{self, CardProps};
use fandhe_frontend_pre_styled_ui::heading::{self, HeadingLevel, HeadingProps, HeadingSize};
use fandhe_frontend_pre_styled_ui::image::{self, ImageProps};
use fandhe_frontend_pre_styled_ui::link_overlay::{self, overlay};
use fandhe_frontend_pre_styled_ui::text::{self as styled_text, TextProps, TextSize};
use fandhe_frontend_pre_styled_ui::Size;

/// リンク先の固定外部 URL（モジュール doc「リンク先の方針」節参照）。
const REPO: &str = "https://github.com/Fandhe-AI/fandhe-frontend";

/// 記事カード 1 件分のダミーデータ（架空、実在の人物・企業とは無関係）。
struct Post {
    date_iso: &'static str,
    date_label: &'static str,
    title: &'static str,
    author_name: &'static str,
}

/// 記事カード 3 件（架空）。タイトルの長さを意図的にばらつかせ、
/// `grid-auto-rows: 1fr` による行の高さ統一が実際に効いていることを
/// 目視確認しやすくする。
const POSTS: [Post; 3] = [
    Post {
        date_iso: "2026-09-18",
        date_label: "2026年9月18日",
        title: "既定エスケープを崩さないレビュー観点",
        author_name: "遠藤 佑奈",
    },
    Post {
        date_iso: "2026-09-11",
        date_label: "2026年9月11日",
        title: "単一バイナリ配布で削った依存",
        author_name: "冨田 千夏",
    },
    Post {
        date_iso: "2026-09-04",
        date_label: "2026年9月4日",
        title: "ノード木 API のまま重ね表示を組み立てる",
        author_name: "宮下 大和",
    },
];

/// 日付・区切り・著者（アバター + 氏名）のメタ行を組み立てる。
fn post_meta(post: &Post) -> Node {
    let initials: String = post
        .author_name
        .split_whitespace()
        .filter_map(|part| part.chars().next())
        .collect();
    div(
        vec![("class", "blocks-blog-overlay-cards-meta")],
        vec![
            el(
                "time",
                vec![("datetime", post.date_iso)],
                vec![text(post.date_label)],
            ),
// ...（以下省略。全文は公式ページ https://fandhe-ai.github.io/fandhe-frontend/blocks/blog-overlay-cards/ の「Rust コード」を参照）
```

## Blocks

| slug | 説明 | 使用部品 | 公式 URL |
|------|------|----------|----------|
| blog-featured-article | 特集記事ブロック | [heading](../../themes/typography/heading.md) / [text](../../themes/typography/text.md) / [badge](../../themes/data-display/badge.md) / [card](../../themes/data-display/card.md) / [image](../../themes/data-display/image.md) / [avatar](../../themes/data-display/avatar.md) / [link](../../themes/typography/link.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/blog-featured-article/ |
| blog-featured-with-list | 特集記事 1 件 + 通常記事リスト 2 件を並べる 2 カラム | [heading](../../themes/typography/heading.md) / [text](../../themes/typography/text.md) / [avatar](../../themes/data-display/avatar.md) / [separator](../../themes/utilities/separator.md) / [link](../../themes/typography/link.md) / [link-overlay](../../themes/typography/link-overlay.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/blog-featured-with-list/ |
| blog-grid-image | 画像付き記事カードグリッド | [heading](../../themes/typography/heading.md) / [text](../../themes/typography/text.md) / [badge](../../themes/data-display/badge.md) / [card](../../themes/data-display/card.md) / [image](../../themes/data-display/image.md) / [avatar](../../themes/data-display/avatar.md) / [link](../../themes/typography/link.md) / [link-overlay](../../themes/typography/link-overlay.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/blog-grid-image/ |
| blog-grid-text | 画像を持たない記事カードのグリッド。列数は狭い幅で 1 列、md 以上で 2 列、lg 以上で 3 列 | [heading](../../themes/typography/heading.md) / [text](../../themes/typography/text.md) / [badge](../../themes/data-display/badge.md) / [card](../../themes/data-display/card.md) / [avatar](../../themes/data-display/avatar.md) / [link](../../themes/typography/link.md) / [link-overlay](../../themes/typography/link-overlay.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/blog-grid-text/ |
| blog-list-image | 見出し + 画像横並びの記事リスト | [heading](../../themes/typography/heading.md) / [text](../../themes/typography/text.md) / [badge](../../themes/data-display/badge.md) / [image](../../themes/data-display/image.md) / [avatar](../../themes/data-display/avatar.md) / [separator](../../themes/utilities/separator.md) / [link](../../themes/typography/link.md) / [link-overlay](../../themes/typography/link-overlay.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/blog-list-image/ |
| blog-overlay-cards | 背景画像へ下から上へのグラデーションを重ねた記事カードのグリッド。lg 未満 1 列、以上 3 列 | [heading](../../themes/typography/heading.md) / [text](../../themes/typography/text.md) / [card](../../themes/data-display/card.md) / [image](../../themes/data-display/image.md) / [avatar](../../themes/data-display/avatar.md) / [link-overlay](../../themes/typography/link-overlay.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/blog-overlay-cards/ |
| blog-split-header-grid | 見出し左 + 記事グリッド右のブログセクション | [heading](../../themes/typography/heading.md) / [text](../../themes/typography/text.md) / [badge](../../themes/data-display/badge.md) / [card](../../themes/data-display/card.md) / [image](../../themes/data-display/image.md) / [link](../../themes/typography/link.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/blog-split-header-grid/ |

## Notes

- 上記コードは公式 md `## Rust コード` の冒頭抜粋（元は約 171 行）。全文は公式ページを参照する。
- docs-site は crates.io 未公開のため `use` できない。各 block のコードはコピーして自アプリへ取り込む前提。一部 block のコードは docs-site 内部の `crate::blocks::dummy_assets`（ダミー素材）や `LAYOUT_CSS`（block 固有のレイアウト CSS）に依存するため、そのままではコンパイルできない。上記 Signature / Usage のコードも `dummy_assets`（背景画像・アバターのダミー）に依存する
- 全 block は静的な表示例で `<form>` を持たない。記事タイトル・著者名・日付は架空。リンク先はすべてリポジトリへの固定リンクで、`href="#"` の死リンクは使わない
- 記事カード全体のクリック領域は疑似要素ではなく `link-overlay` 部品（`link_overlay::overlay`）で表現する
- 公式ページの差分メモ（`blog-overlay-cards`）: 見出しレベルは `h2` から `h3` へ変更（ページ側が `## Demo` として `h2` を出すため）、暗色固定の配色はテーマトークンの fg / bg 反転ペアへ置換（dark テーマでは明るいスクリムと暗色文字）、`datetime` の機械可読値と表示値は常に同じ日を指す組にしている
- 出典（pin SHA `cf5edb9b8f1bf2a63d51dcf50a8d2806e2d8f9f9`）: `site/blocks/<slug>.md`、`crates/docs-site/src/blocks/marketing/blog/<slug_snake>.rs`。`rust` フェンスは rs の `// blocks-code:begin` 〜 `end` 範囲と一致

## Related

- [overview.md](./overview.md)
- [card](../../themes/data-display/card.md)
- [link-overlay](../../themes/typography/link-overlay.md)
- [avatar](../../themes/data-display/avatar.md)
