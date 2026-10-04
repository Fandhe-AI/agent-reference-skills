# Section Heading（Marketing Blocks）

セクション見出し（タグライン・大見出し・説明・操作）向け block 3 件。blocks は新規 API ではなく既存の Themes / Primitives / core 部品の合成例で、各 block の公開物は未公開 crate `docs-site` 内部の `pub fn demo() -> Node` と `pub const BLOCK: Block` だけである。

## Signature / Usage

カテゴリ内で最も短い `section-heading-stats`（統計とリンク列付きの見出し）の `## Rust コード` の冒頭抜粋。

```rust
const REPO: &str = "https://github.com/Fandhe-AI/fandhe-frontend";

use fandhe_frontend_core::{div, el, text, Node};
use fandhe_frontend_pre_styled_ui::heading::{
    heading, HeadingLevel, HeadingProps, HeadingSize, HeadingWeight,
};
use fandhe_frontend_pre_styled_ui::link::{self, LinkProps};
use fandhe_frontend_pre_styled_ui::recipe::ColorPalette;
use fandhe_frontend_pre_styled_ui::stat;
use fandhe_frontend_pre_styled_ui::text::{self as styled_text, TextProps, TextSize, TextVariant};
use fandhe_frontend_pre_styled_ui::Size;

/// リンク列 1 件分のダミーデータ（実在する本リポジトリ配下の URL のみを
/// 使う。架空の遷移先は用意しない）。
struct LinkItem {
    label: &'static str,
    href: &'static str,
}

/// リンク列（4 件、可視テキストが相異なるため `aria-label` は付与しない）。
const LINKS: [LinkItem; 4] = [
    LinkItem {
        label: "リポジトリを見る",
        href: REPO,
    },
    LinkItem {
        label: "Issue 一覧",
        href: "https://github.com/Fandhe-AI/fandhe-frontend/issues",
    },
    LinkItem {
        label: "Pull Requests",
        href: "https://github.com/Fandhe-AI/fandhe-frontend/pulls",
    },
    LinkItem {
        label: "リリース履歴",
        href: "https://github.com/Fandhe-AI/fandhe-frontend/releases",
    },
];

/// 数値指標 1 件分のダミーデータ（架空、実データ・実企業とは無関係）。
struct StatItem {
    label: &'static str,
    value: &'static str,
}

/// 数値指標一覧（架空、4 件）。
const STATS: [StatItem; 4] = [
    StatItem {
        label: "稼働率",
        value: "99.9%",
    },
    StatItem {
        label: "平均対応時間",
        value: "12 分",
    },
    StatItem {
        label: "導入チーム数",
        value: "480",
    },
    StatItem {
        label: "満足度",
        value: "4.8 / 5",
    },
];
// ...（以下省略。全文は公式ページ https://fandhe-ai.github.io/fandhe-frontend/blocks/section-heading-stats/ の「Rust コード」を参照）
```

## Blocks

| Block | Description | 使用部品 | 公式 URL |
| --- | --- | --- | --- |
| `section-heading-split` | タグライン + 左に大見出し・右に説明/操作を置くセクション見出し。lg（1024px）以上で左列に大見出し、右列に説明・操作の 2 カラム | [Badge](../../themes/data-display/badge.md) / [Heading](../../themes/typography/heading.md) / [Text](../../themes/typography/text.md) / [Button](../../themes/forms/button.md) / [Field](../../themes/forms/field.md) / [Input Group](../../themes/forms/input-group.md) / [Input](../../themes/forms/input.md) / [Clipboard](../../themes/data-display/clipboard.md) / [Visually Hidden](../../themes/utilities/visually-hidden.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/section-heading-split/ |
| `section-heading-stacked` | 縦積みのセクション見出し。集約元は対応表 ID 17 件 | [Badge](../../themes/data-display/badge.md) / [Heading](../../themes/typography/heading.md) / [Text](../../themes/typography/text.md) / [Breadcrumb](../../themes/navigation/breadcrumb.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/section-heading-stacked/ |
| `section-heading-stats` | 統計とリンク列付きの見出し。大見出し・リード文・矢印付きリンク 4 点の列・数値指標 4 件を縦に並べ、md（768px）未満ではリンクと指標を 1〜2 列に畳む。背景画像は使わず面色トークンで層を見せる | [Heading](../../themes/typography/heading.md) / [Text](../../themes/typography/text.md) / [Link](../../themes/typography/link.md) / [Stat](../../themes/data-display/stat.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/section-heading-stats/ |

## Notes

- 上記コードは公式 md `## Rust コード` の冒頭抜粋（元は約 143 行）。全文は公式ページを参照する。
- `docs-site` crate は crates.io 未公開。`demo()` と `BLOCK` は利用者が `use` できる API ではなく、コードをコピーして改変する前提の例である。
- 上のフェンスの `REPO` 定数と各 `href` は固定の GitHub リポジトリ URL（リンク先のダミー）。コピー時は自サイトの URL に差し替える。
- `blocks-section-heading-*` などのクラス名に当たるレイアウト CSS（`sm` / `md` での列数切替を含む）は `Block.layout_css`（`LayoutCss`）として `.rs` 側に別途登録されており、公式 md のフェンスには含まれない。Rust コードだけではレイアウトのスタイルは付かない。
- 代表 block `section-heading-stats` の差分メモ（各 block ページ末尾に個別記載）: 参照元から取り込んだのは構造（大見出し・リード文・リンク列・数値指標の領域配置と部品構成）のみ。背景画像は持ち込まず `--fandhe-color-bg-muted` で層を見せる、矢印は `icon` 部品ではなく `aria-hidden="true"` の文字「→」、リンクは本リポジトリの固定 URL のみ（`href="#"` は不使用）、数値指標はすべて架空値、畳み方は 1 列から sm（640px）以上でリンク 2 列、md（768px）以上でリンク・指標とも 4 列。
- `<form>` は出力せず、送信処理・入力値検証は持たない（`docs/policy/intentional-non-adoption.md` §3.25 の責務境界）。
- 出典（pin SHA `cf5edb9b8f1bf2a63d51dcf50a8d2806e2d8f9f9`）: `crates/docs-site/src/blocks/marketing/section_heading/<slug_snake>.rs`、`site/blocks/<slug>.md`。

## Related

- [Marketing Blocks 概要](./overview.md)
- [Heading](../../themes/typography/heading.md)
- [Stat](../../themes/data-display/stat.md)
