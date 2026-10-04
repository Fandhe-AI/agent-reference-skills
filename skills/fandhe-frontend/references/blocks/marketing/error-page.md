# Error Page（Marketing Blocks）

404 などのエラーページ向け block 5 件。blocks は新規 API ではなく既存の Themes / Primitives / core 部品の合成例で、各 block の公開物は未公開 crate `docs-site` 内部の `pub fn demo() -> Node` と `pub const BLOCK: Block` だけである。

## Signature / Usage

カテゴリ内で最も短い `error-page-background-image`（背景画像付きの 404 ページ）の公式 `## Rust コード` を原文のまま掲載する。

```rust
use crate::blocks::dummy_assets;
use fandhe_frontend_core::{div, text, Node};
use fandhe_frontend_pre_styled_ui::empty_state::{self, EmptyStateProps, EmptyStateVariant};
use fandhe_frontend_pre_styled_ui::heading::{self, HeadingLevel, HeadingProps, HeadingSize};
use fandhe_frontend_pre_styled_ui::image::{self, ImageProps};
use fandhe_frontend_pre_styled_ui::link::{self, LinkProps};
use fandhe_frontend_pre_styled_ui::text::{
    self as styled_text, TextProps, TextVariant, TextWeight,
};

const ROOT_CLASS: &str = "blocks-error-page-background-image-root";
const BACKDROP_CLASS: &str = "blocks-error-page-background-image-backdrop";
const SCRIM_CLASS: &str = "blocks-error-page-background-image-scrim";
const CONTENT_CLASS: &str = "blocks-error-page-background-image-content";
const ACTIONS_CLASS: &str = "blocks-error-page-background-image-actions";

const IMAGE_ATTR: &str = "data-blocks-error-page-background-image-image";
const MESSAGE_ATTR: &str = "data-blocks-error-page-background-image-message";
const CODE_ATTR: &str = "data-blocks-error-page-background-image-code";
const TITLE_ATTR: &str = "data-blocks-error-page-background-image-title";
const DESCRIPTION_ATTR: &str = "data-blocks-error-page-background-image-description";
const BACK_ATTR: &str = "data-blocks-error-page-background-image-back";

pub fn demo() -> Node {
    let backdrop = div(
        vec![("class", BACKDROP_CLASS)],
        vec![
            image::image(
                &ImageProps::new(dummy_assets::BACKGROUND_SRC, ""),
                vec![(IMAGE_ATTR, "")],
            ),
            div(vec![("class", SCRIM_CLASS)], vec![]),
        ],
    );

    let code = styled_text::text(
        &TextProps {
            weight: TextWeight::Semibold,
            ..TextProps::default()
        },
        vec![(CODE_ATTR, "")],
        vec![text("404")],
    );

    let title = empty_state::title(
        vec![],
        vec![heading::heading(
            HeadingLevel::H3,
            &HeadingProps {
                size: HeadingSize::Xl3,
                ..HeadingProps::default()
            },
            vec![(TITLE_ATTR, "")],
            vec![text("Page not found")],
        )],
    );

    let description = empty_state::description(
        vec![],
        vec![styled_text::text(
            &TextProps {
                variant: TextVariant::Muted,
                ..TextProps::default()
            },
            vec![(DESCRIPTION_ATTR, "")],
            vec![text(
                "The page you are looking for has moved or never existed.",
            )],
        )],
    );

    let actions = empty_state::actions(
        vec![("class", ACTIONS_CLASS)],
        vec![link::root(
            "../../",
            &LinkProps::default(),
            vec![(BACK_ATTR, "")],
            vec![text("← Back to home")],
        )],
    );

    let message = empty_state::root(
        &EmptyStateProps {
            variant: EmptyStateVariant::Plain,
            ..EmptyStateProps::default()
        },
        vec![(MESSAGE_ATTR, "")],
        vec![empty_state::content(
            vec![("class", CONTENT_CLASS)],
            vec![code, title, description, actions],
        )],
    );

    div(vec![("class", ROOT_CLASS)], vec![backdrop, message])
}
```

## Blocks

| Block | Description | 使用部品 | 公式 URL |
| --- | --- | --- | --- |
| `error-page-background-image` | 背景画像付きの 404 ページ。Demo 領域いっぱいに背景画像を敷き、半透明のスクリムを重ねてエラーコード・見出し・説明文・「ホームへ戻る」リンクを中央寄せで表示 | [Empty State](../../themes/feedback/empty-state.md) / [Heading](../../themes/typography/heading.md) / [Text](../../themes/typography/text.md) / [Image](../../themes/data-display/image.md) / [Link](../../themes/typography/link.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/error-page-background-image/ |
| `error-page-centered` | 中央寄せの 404 ページ。「エラーコードの小ラベル、大見出し、説明文」を縦に積み、その下にホームへ戻るリンクとサポートへのテキストリンクを横に並べる。狭幅でもアクション列は折り返して中央寄せを保つ | [Empty State](../../themes/feedback/empty-state.md) / [Heading](../../themes/typography/heading.md) / [Text](../../themes/typography/text.md) / [Link](../../themes/typography/link.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/error-page-centered/ |
| `error-page-popular-links` | 人気ページ一覧付きの 404 ページ。上部にロゴ、中央にエラーコード・見出し・説明文、その下にアイコンタイル・タイトル・説明・右向きシェブロンからなる人気ページの一覧 | [Empty State](../../themes/feedback/empty-state.md) / [Heading](../../themes/typography/heading.md) / [Text](../../themes/typography/text.md) / [Item](../../themes/data-display/item.md) / [List](../../themes/typography/list.md) / [Icon](../../themes/data-display/icon.md) / [Link](../../themes/typography/link.md) / [Separator](../../themes/utilities/separator.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/error-page-popular-links/ |
| `error-page-split-image` | 本文と画像の 2 カラム 404 ページ。左カラムにロゴ・エラーコード・見出し・説明文・戻る導線を左寄せで並べる | [Empty State](../../themes/feedback/empty-state.md) / [Heading](../../themes/typography/heading.md) / [Text](../../themes/typography/text.md) / [Link](../../themes/typography/link.md) / [Image](../../themes/data-display/image.md) / [Icon](../../themes/data-display/icon.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/error-page-split-image/ |
| `error-page-split-links` | 本文と案内リンクの 2 カラム 404 ページ。64rem 以上で左に「タグライン、大見出し、説明文」、右に「ホーム」「ガイド」「examples」への案内リンクを縦に並べる。各行はアイコン・ラベル・説明文をまとめた複合行で行全体がクリック対象（ボタンは使わない）。狭幅は 1 カラム | [Empty State](../../themes/feedback/empty-state.md) / [Heading](../../themes/typography/heading.md) / [Text](../../themes/typography/text.md) / [Item](../../themes/data-display/item.md) / [Icon](../../themes/data-display/icon.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/error-page-split-links/ |

## Notes

- `docs-site` crate は crates.io 未公開。`demo()` と `BLOCK` は利用者が `use` できる API ではなく、コードをコピーして改変する前提の例である。
- 上のフェンスの `use crate::blocks::dummy_assets;` と `dummy_assets::BACKGROUND_SRC` は docs サイト内部の非公開ヘルパ（ダミー画像素材）。ホームへの戻り先 `"../../"` は docs サイトの相対パスで、コピー時は自サイトの URL に差し替える。
- `blocks-error-page-*` などのクラス名に当たるレイアウト CSS（スクリムの重ね方や中央寄せを含む）は `Block.layout_css`（`LayoutCss`）として `.rs` 側に別途登録されており、公式 md のフェンスには含まれない。Rust コードだけではレイアウトのスタイルは付かない。
- 代表 block `error-page-background-image` の差分メモ（各 block ページ末尾に個別記載）: 参照元の白文字直書きをやめ、`--fandhe-color-bg` を半透明にしたスクリムの上に `--fandhe-color-fg` / `--fandhe-color-fg-muted` で文字を描く設計に変更（ライト/ダーク両テーマのコントラストを維持）。全画面高ではなく Demo 枠内の `min-height` 表示。
- 静的な表示例で `<form>` は持たず、遷移処理・送信処理も行わない。文言はすべて架空のダミー。
- 出典（pin SHA `cf5edb9b8f1bf2a63d51dcf50a8d2806e2d8f9f9`）: `crates/docs-site/src/blocks/marketing/error_page/<slug_snake>.rs`、`site/blocks/<slug>.md`。

## Related

- [Marketing Blocks 概要](./overview.md)
- [Empty State](../../themes/feedback/empty-state.md)
- [Item](../../themes/data-display/item.md)
