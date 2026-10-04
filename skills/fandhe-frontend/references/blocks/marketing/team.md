# Team（Marketing Blocks）

Blocks は新規 API ではなく、既存の Themes / Primitives / core 部品を組み合わせた合成例。各 block の公開物は未公開 crate `docs-site` 内部の `pub fn demo() -> Node` と `pub const BLOCK: Block` のみ。Team は 4 block。

## Signature / Usage

カテゴリ内で最も短い block `team-bio-rows`（見出し左・区切り線付き縦リストと、見出し上・2 列グリッドの 2 variant を並記）の `## Rust コード` の冒頭抜粋。

```rust
use crate::blocks::dummy_assets;
use fandhe_frontend_core::{div, li, text, ul, Node};
use fandhe_frontend_pre_styled_ui::heading::{self, HeadingLevel, HeadingProps, HeadingSize};
use fandhe_frontend_pre_styled_ui::icon::{icon, IconProps};
use fandhe_frontend_pre_styled_ui::image::{self, AspectRatio, ImageProps};
use fandhe_frontend_pre_styled_ui::link::{self, LinkProps};
use fandhe_frontend_pre_styled_ui::separator::{self, SeparatorProps};
use fandhe_frontend_pre_styled_ui::text::{self as styled_text, TextProps, TextSize, TextVariant};
use fandhe_frontend_pre_styled_ui::Size;

/// 実在の自リポジトリ URL（`href` の方針、モジュール doc 参照）。
const REPO: &str = "https://github.com/Fandhe-AI/fandhe-frontend";
/// 実在の自組織 URL。
const ORG: &str = "https://github.com/Fandhe-AI";
/// [`REPO`] の accessible name（遷移先と食い違わない固定文字列、モジュール
/// doc「SNS リンクのアクセシブルネーム」節参照。全メンバー共通）。
const REPO_LABEL: &str = "fandhe-frontend の GitHub リポジトリ";
/// [`ORG`] の accessible name（同上）。
const ORG_LABEL: &str = "Fandhe-AI の GitHub 組織ページ";

/// メンバーの紹介文（架空の日本語、検索インデックス容量対策で短くする）。
const BIOS: &[&str] = &[
    "小さく試して確かめてから広げる進め方を、チーム全体に広めています。",
    "利用者からのフィードバックを設計へ素早く反映する仕組みを作ります。",
    "運用で見えた課題を、次の開発計画へ落とし込む役割を担っています。",
    "数字の裏側にある背景を掘り下げ、次の一手を提案しています。",
];

/// SNS アイコン用の装飾幾何アイコン（`label` は呼び出し側が指定する）。
fn geo_icon(size: Size, label: &str, path_d: &'static str) -> Node {
    icon(
        &IconProps {
            size,
            label: Some(label),
            ..IconProps::default()
        },
        vec![],
        vec![fandhe_frontend_core::el(
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

/// メンバー共通の SNS リンク行（実在の自リポジトリ・自組織 URL のみ。
/// アクセシブルネームが遷移先と食い違わないよう全メンバー共通の固定文字列
/// を使う、モジュール doc「SNS リンクのアクセシブルネーム」節参照）。
fn social_links() -> Node {
    ul(
        vec![("class", "blocks-team-bio-rows-social")],
        vec![
            li(
                vec![],
                vec![link::root(
                    REPO,
                    &LinkProps {
                        external: true,
                        ..LinkProps::default()
                    },
                    vec![],
                    vec![geo_icon(Size::Sm, REPO_LABEL, "M4 4h16v6H4zM4 14h16v6H4z")],
                )],
            ),
// ...（以下省略。全文は公式ページ https://fandhe-ai.github.io/fandhe-frontend/blocks/team-bio-rows/ の「Rust コード」を参照）
```

## Blocks

| slug | 説明 | 使用部品 | 公式 URL |
|------|------|----------|----------|
| team-avatar-grid | アバター画像を中心にしたメンバーグリッド | [heading](../../themes/typography/heading.md) / [text](../../themes/typography/text.md) / [avatar](../../themes/data-display/avatar.md) / [card](../../themes/data-display/card.md) / [button](../../themes/forms/button.md) / [link](../../themes/typography/link.md) / [icon](../../themes/data-display/icon.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/team-avatar-grid/ |
| team-bio-rows | 写真と紹介文を横並びにするチームメンバー一覧。見出し左・区切り線付き縦リスト（`side`）と見出し上・2 列グリッド（`top`）の 2 variant を並記 | [heading](../../themes/typography/heading.md) / [text](../../themes/typography/text.md) / [image](../../themes/data-display/image.md) / [separator](../../themes/utilities/separator.md) / [link](../../themes/typography/link.md) / [icon](../../themes/data-display/icon.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/team-bio-rows/ |
| team-photo-grid | 写真を主役にしたメンバーグリッド。比率を固定した大きな写真カードを並べ、列数は狭幅 1 列・md で 2 列・lg で 3〜4 列 | [heading](../../themes/typography/heading.md) / [text](../../themes/typography/text.md) / [image](../../themes/data-display/image.md) / [link](../../themes/typography/link.md) / [icon](../../themes/data-display/icon.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/team-photo-grid/ |
| team-split-list | 左に見出し、右にメンバー一覧を置く分割レイアウト | [heading](../../themes/typography/heading.md) / [text](../../themes/typography/text.md) / [avatar](../../themes/data-display/avatar.md) / [image](../../themes/data-display/image.md) / [button](../../themes/forms/button.md) / [link](../../themes/typography/link.md) / [icon](../../themes/data-display/icon.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/team-split-list/ |

## Notes

- 上記コードは公式 md `## Rust コード` の冒頭抜粋（元は約 242 行）。全文は公式ページを参照する。
- docs-site は crates.io 未公開のため `use` できない。各 block のコードはコピーして自アプリへ取り込む前提。一部 block のコードは docs-site 内部の `crate::blocks::dummy_assets`（ダミー素材）や `LAYOUT_CSS`（block 固有のレイアウト CSS）に依存するため、そのままではコンパイルできない。上記 Signature / Usage のコードも `dummy_assets`（人名・役職・アバター画像のダミー）に依存する
- 全 block は静的な表示例で `<form>` を持たない。人名・役職・紹介文は架空
- SNS リンクは架空人物のため実在アカウントを持たず、全メンバーとも本リポジトリ・本組織の GitHub ページへ遷移する。アクセシブルネームはメンバー名を含まない遷移先と食い違わない固定文字列（`team-avatar-grid` と同じ判断）
- 公式ページの差分メモ（`team-bio-rows`）: 見出し左 + 区切り線付き縦リスト（`variant="side"`）と見出し上 + 2 列グリッド（`variant="top"`）の 2 形を集約。狭い幅ではどちらも写真を本文の上に縦積みにする
- 出典（pin SHA `cf5edb9b8f1bf2a63d51dcf50a8d2806e2d8f9f9`）: `site/blocks/<slug>.md`、`crates/docs-site/src/blocks/marketing/team/<slug_snake>.rs`。`rust` フェンスは rs の `// blocks-code:begin` 〜 `end` 範囲と一致

## Related

- [overview.md](./overview.md)
- [avatar](../../themes/data-display/avatar.md)
- [image](../../themes/data-display/image.md)
- [link](../../themes/typography/link.md)
