# Careers（Marketing Blocks）

採用・求人一覧向け block 3 件。blocks は新規 API ではなく既存の Themes / Primitives / core 部品の合成例で、各 block の公開物は未公開 crate `docs-site` 内部の `pub fn demo() -> Node` と `pub const BLOCK: Block` だけである。

## Signature / Usage

カテゴリ内で最も短い `careers-split-photo-list`（写真付き見出し + 求人リスト）の `## Rust コード` の冒頭抜粋。

```rust
use crate::blocks::dummy_assets;
use fandhe_frontend_core::{div, span, text, Node};
use fandhe_frontend_pre_styled_ui::heading::{
    heading, HeadingLevel, HeadingProps, HeadingSize, HeadingWeight,
};
use fandhe_frontend_pre_styled_ui::image::{self, AspectRatio, ImageProps, ImageShape};
use fandhe_frontend_pre_styled_ui::link::{self, LinkProps};
use fandhe_frontend_pre_styled_ui::link_overlay::{self, overlay};
use fandhe_frontend_pre_styled_ui::separator::{separator, SeparatorProps};
use fandhe_frontend_pre_styled_ui::text::{self as styled_text, TextProps, TextSize, TextVariant};
use fandhe_frontend_pre_styled_ui::visually_hidden;

/// リンク先の固定外部 URL（モジュール doc「`href="#"` を使わない」節参照）。
const REPO: &str = "https://github.com/Fandhe-AI/fandhe-frontend";

/// 求人 1 件分のダミーデータ（架空、実在の人物・企業とは無関係）。
struct Job {
    title: &'static str,
    description: &'static str,
    salary: &'static str,
    location: &'static str,
}

/// 求人一覧（架空、3 件）。
const JOBS: [Job; 3] = [
    Job {
        title: "バックエンドエンジニア",
        description: "描画コアとサーバーサイド API の設計・実装を担当します。",
        salary: "年収 600万〜900万円",
        location: "東京（リモート可）",
    },
    Job {
        title: "プロダクトデザイナー",
        description: "UI コンポーネント層のビジュアルデザインとアクセシビリティ検証を担当します。",
        salary: "年収 550万〜850万円",
        location: "大阪（リモート可）",
    },
    Job {
        title: "カスタマーサクセス",
        description: "導入企業への技術サポートとフィードバック収集を担当します。",
        salary: "年収 450万〜650万円",
        location: "フルリモート",
    },
];

/// 求人 1 件の行（見出し + 説明 + 給与・勤務地 + 全面リンク）。
///
/// `dl`/`dt`/`dd` を再現せず `div` + [`link_overlay::root`] で組む（モジュール
/// doc「`dl`/`dt`/`dd` を再現しない」節）。給与・勤務地はスクリーンリーダー
/// 向けラベルを [`visually_hidden::root`] で可視テキストの内側に補う。
/// `role="listitem"` を付与し、[`demo`] 側の `role="list"` コンテナと対で
/// 一覧構造をアクセシビリティツリーへ公開する（`<hr>` を `<li>` 直下に
/// 置けないため `ul`/`li` は使えず、ARIA role で代替する判断）。
///
/// `with_separator` が `true` のとき、`<hr>`（[`separator::separator`]）を
/// この求人行自身の**末尾の子要素**として追加する（モジュール doc「罫線」
/// 節。`role="list"` の直下ではなく `role="listitem"` の子孫に置くことで
/// list の required owned elements 制約〔listitem/group のみ〕を満たす）。
fn job_item(job: &Job, with_separator: bool) -> Node {
    let mut children = vec![
        heading(
            HeadingLevel::H4,
            &HeadingProps::default(),
            vec![],
            vec![text(job.title)],
        ),
        styled_text::text(
            &TextProps {
                variant: TextVariant::Muted,
                ..TextProps::default()
            },
            vec![],
            vec![text(job.description)],
        ),
// ...（以下省略。全文は公式ページ https://fandhe-ai.github.io/fandhe-frontend/blocks/careers-split-photo-list/ の「Rust コード」を参照）
```

## Blocks

| Block | Description | 使用部品 | 公式 URL |
| --- | --- | --- | --- |
| `careers-card-grid` | 求人カードグリッド。ページ見出し（タグライン + 見出し + 説明）の下に求人カードを並べ、狭幅は 1 列・md（48rem）以上は 2 列。各カードは部署 badge・職種名・短い説明・勤務地と雇用形態のアイコン付きメタ行・詳細へ進む矢印付きリンク | [Heading](../../themes/typography/heading.md) / [Text](../../themes/typography/text.md) / [Badge](../../themes/data-display/badge.md) / [Card](../../themes/data-display/card.md) / [Icon](../../themes/data-display/icon.md) / [Link](../../themes/typography/link.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/careers-card-grid/ |
| `careers-split-accordion` | 見出し左 + 求人アコーディオン一覧。md（48rem）以上で左に見出し・説明、右に求人一覧の 2 カラム、それより狭い幅では見出しの下に求人一覧が縦に続く | [Heading](../../themes/typography/heading.md) / [Text](../../themes/typography/text.md) / [Badge](../../themes/data-display/badge.md) / [Accordion](../../themes/disclosure/accordion.md) / [Icon](../../themes/data-display/icon.md) / [Button](../../themes/forms/button.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/careers-split-accordion/ |
| `careers-split-photo-list` | 写真付き見出し + 求人リスト。lg（64rem）以上で左に見出し・説明文・写真、右に求人 3 件の 2 カラム。求人 1 件は行全体がクリック範囲の全面リンクで、求人の間は罫線区切り。給与・勤務地にスクリーンリーダー向け補足ラベルを添える | [Heading](../../themes/typography/heading.md) / [Text](../../themes/typography/text.md) / [Image](../../themes/data-display/image.md) / [Separator](../../themes/utilities/separator.md) / [Link](../../themes/typography/link.md) / [Link Overlay](../../themes/typography/link-overlay.md) / [Visually Hidden](../../themes/utilities/visually-hidden.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/careers-split-photo-list/ |

## Notes

- 上記コードは公式 md `## Rust コード` の冒頭抜粋（元は約 200 行）。全文は公式ページを参照する。
- `docs-site` crate は crates.io 未公開。`demo()` と `BLOCK` は利用者が `use` できる API ではなく、コードをコピーして改変する前提の例である。
- 上のフェンスの `use crate::blocks::dummy_assets;` と（全文側で使われる）`dummy_assets::BACKGROUND_SRC` は docs サイト内部の非公開ヘルパ（ダミー画像素材）。`REPO` 定数は固定の GitHub リポジトリ URL。コピー時はどちらも自前の値に差し替える。
- `blocks-careers-*` などのクラス名に当たるレイアウト CSS（lg での 2 カラム切替を含む）は `Block.layout_css`（`LayoutCss`）として `.rs` 側に別途登録されており、公式 md のフェンスには含まれない。Rust コードだけではレイアウトのスタイルは付かない。
- 代表 block `careers-split-photo-list` の差分メモ（各 block ページ末尾に個別記載）: 見出しは `h3` / `h4` に 1 段下げ、`dl`/`dt`/`dd` をやめて `div` + visually-hidden ラベル、`href="#"` を固定外部 URL に置換、「すべての募集を見る」リンクは全面リンクの外の兄弟として配置、参照元の分類は blog だが右列が求人一覧のため careers に分類。
- 応募処理などのアプリケーションロジックは持たず、リンク先はすべてリポジトリへの固定リンク。`<form>` は使用しない。給与・勤務地・文言はすべて架空値。
- 出典（pin SHA `cf5edb9b8f1bf2a63d51dcf50a8d2806e2d8f9f9`）: `crates/docs-site/src/blocks/marketing/careers/<slug_snake>.rs`、`site/blocks/<slug>.md`。

## Related

- [Marketing Blocks 概要](./overview.md)
- [Link Overlay](../../themes/typography/link-overlay.md)
- [Accordion](../../themes/disclosure/accordion.md)
