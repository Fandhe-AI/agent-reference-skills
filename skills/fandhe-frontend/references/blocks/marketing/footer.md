# Footer（Marketing Blocks）

フッター向け block 6 件。blocks は新規 API ではなく既存の Themes / Primitives / core 部品の合成例で、各 block の公開物は未公開 crate `docs-site` 内部の `pub fn demo() -> Node` と `pub const BLOCK: Block` だけである。

## Signature / Usage

カテゴリ内で最も短い `footer-newsletter-band`（全幅の購読帯付き footer。A: 帯下、B: 帯上、C: 簡素形）の公式 `## Rust コード` を原文のまま掲載する。

```rust
use fandhe_frontend_core::{div, footer, text, Node};
use fandhe_frontend_pre_styled_ui::button::{self, ButtonProps};
use fandhe_frontend_pre_styled_ui::field::{self, FieldOrientation, FieldRootProps};
use fandhe_frontend_pre_styled_ui::input::{self, FieldIds, FieldProps, InputProps};
use fandhe_frontend_pre_styled_ui::link::{self, LinkProps};
use fandhe_frontend_pre_styled_ui::separator::{separator, SeparatorProps};

const REPO: &str = "https://github.com/Fandhe-AI/fandhe-frontend";

fn link(label: &'static str) -> Node {
    link::root(REPO, &LinkProps::default(), vec![], vec![text(label)])
}

/// リンク列 1 本（見出しテキスト + リンク一覧、見出し要素は使わない）。
fn link_column(heading: &'static str, labels: &[&'static str]) -> Node {
    let mut children = vec![text(heading)];
    children.extend(labels.iter().copied().map(link));
    div(vec![("class", "fnb-col")], children)
}

/// リンク列グリッド（A・B が並べる 2 列）。
fn top() -> Node {
    div(
        vec![("class", "fnb-t")],
        vec![
            link_column("製品", &["ガイド", "API"]),
            link_column("コミュニティ", &["GitHub"]),
        ],
    )
}

fn band(id: &'static str) -> Node {
    let f = FieldProps {
        id,
        ids: FieldIds::default(),
        disabled: false,
        invalid: false,
        required: true,
        readonly: false,
        has_helper_text: false,
    };
    let signup = div(
        vec![],
        vec![
            field::root(
                &FieldRootProps {
                    orientation: FieldOrientation::Vertical,
                },
                &f,
                vec![],
                vec![
                    field::label(&f, vec![], vec![text("メール")]),
                    input::input(&InputProps::default(), &f, vec![("type", "email")]),
                ],
            ),
            button::button(&ButtonProps::default(), vec![], vec![text("購読")]),
        ],
    );
    div(vec![("data-fnb-band", "")], vec![text("最新情報"), signup])
}

fn variant(order: u8, id: &'static str) -> Node {
    let mut body = match order {
        0 => vec![top(), band(id)],
        1 => vec![band(id), top()],
        _ => vec![div(vec![("class", "fnb-c")], vec![link("製品"), band(id)])],
    };
    body.push(separator(&SeparatorProps::default(), vec![]));
    body.push(div(vec![], vec![text("© 2026")]));
    footer(vec![], body)
}

pub fn demo() -> Node {
    div(
        vec![("class", "fnb-l")],
        vec![
            text("A"),
            variant(0, "fnb-a"),
            text("B"),
            variant(1, "fnb-b"),
            text("C"),
            variant(2, "fnb-c"),
        ],
    )
}
```

## Blocks

| Block | Description | 使用部品 | 公式 URL |
| --- | --- | --- | --- |
| `footer-cta-columns` | CTA 付きリンクカラム footer。上段に中央寄せの CTA、区切り線の下の中段にロゴと 4 列のリンク、下段に SNS アイコンのリンクと著作権表記の 3 段構成 | [Heading](../../themes/typography/heading.md) / [Text](../../themes/typography/text.md) / [Link](../../themes/typography/link.md) / [Separator](../../themes/utilities/separator.md) / [Icon](../../themes/data-display/icon.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/footer-cta-columns/ |
| `footer-inline-nav` | 1 行ナビ型 footer。上段にロゴ・横並びのナビリンク・SNS アイコン、区切り線の下に著作権表記と法務リンク。ナビと法務リンクを省いた最小形と全段中央寄せの縦積み形を含む 3 種を並記 | [Icon](../../themes/data-display/icon.md) / [Link](../../themes/typography/link.md) / [Nav List](../../themes/navigation/nav-list.md) / [Separator](../../themes/utilities/separator.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/footer-inline-nav/ |
| `footer-link-columns` | 定番のリンクカラム型 footer。上段にブランド列とカテゴリ見出し付きのリンク列 2〜5 群、下段に区切り線を挟んだ著作権表示。lg（64rem）以上で全列が横 1 行 | [Link](../../themes/typography/link.md) / [Separator](../../themes/utilities/separator.md) / [Icon](../../themes/data-display/icon.md) / [Heading](../../themes/typography/heading.md) / [Text](../../themes/typography/text.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/footer-link-columns/ |
| `footer-newsletter-band` | 帯が全幅の購読帯付き footer。A: 帯下、B: 帯上、C: 簡素形の 3 インスタンス。`<form>` なし | [Field](../../themes/forms/field.md) / [Input](../../themes/forms/input.md) / [Button](../../themes/forms/button.md) / [Link](../../themes/typography/link.md) / [Separator](../../themes/utilities/separator.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/footer-newsletter-band/ |
| `footer-newsletter` | ニュースレター列付き footer（Motion+ `sections/footers` の newsletter 相当）。「入力」panel と「完了」panel を Before/After の 2 インスタンスで静的に併記。送信ボタンは `type="button"` で送信先を持たない | [Field](../../themes/forms/field.md) / [Input](../../themes/forms/input.md) / [Button](../../themes/forms/button.md) / [Link](../../themes/typography/link.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/footer-newsletter/ |
| `footer-sticky-reveal` | sticky reveal footer（Motion+ `sections/footers` の sticky reveal 相当）。Demo 枠を固定高スクロールコンテナにし、`position: sticky` のみ（JS 不使用）で footer が本文の下から現れる。`prefers-reduced-motion: reduce` ではフェードイン強調を無効化 | [Card](../../themes/data-display/card.md) / [Heading](../../themes/typography/heading.md) / [Link](../../themes/typography/link.md) / [Nav List](../../themes/navigation/nav-list.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/footer-sticky-reveal/ |

## Notes

- `docs-site` crate は crates.io 未公開。`demo()` と `BLOCK` は利用者が `use` できる API ではなく、コードをコピーして改変する前提の例である。
- 上のフェンスの `REPO` 定数は固定の GitHub リポジトリ URL（リンク先のダミー）。コピー時は自サイトの URL に差し替える。
- `fnb-*` などのクラス名に当たるレイアウト CSS は `Block.layout_css`（`LayoutCss`）として `.rs` 側に別途登録されており、公式 md のフェンスには含まれない。Rust コードだけではレイアウトのスタイルは付かない。
- 代表 block `footer-newsletter-band` の公式 md は導入 1 行と関連情報のみで差分メモを持たない。`footer-newsletter` は `docs/policy/intentional-non-adoption.md` §3.25 に従い送信処理を利用者の Rust コードに委ねる旨を明記している。
- 無 JS の静的な表示例で `<form>` は使わない（導入文で明記されている block が大半）。リンク先は GitHub への外部 URL（`footer-newsletter` / `footer-sticky-reveal` / `footer-inline-nav` の導入文に記載）。
- 出典（pin SHA `cf5edb9b8f1bf2a63d51dcf50a8d2806e2d8f9f9`）: `crates/docs-site/src/blocks/marketing/footer/<slug_snake>.rs`、`site/blocks/<slug>.md`。

## Related

- [Marketing Blocks 概要](./overview.md)
- [Link](../../themes/typography/link.md)
- [Separator](../../themes/utilities/separator.md)
- [Field](../../themes/forms/field.md)
