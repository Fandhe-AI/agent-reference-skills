# Incentives（Ecommerce Blocks）

特典・安心訴求（送料無料・返品保証など）の紹介 Blocks 3 件。Blocks は新規 API ではなく既存の Themes / Primitives / core 部品の合成例であり、各 block の公開物は未公開 crate `docs-site` 内部の `pub fn demo() -> Node` と `pub const BLOCK: Block` だけである。

## Signature / Usage

カテゴリ内で最も短い `incentives-split-header` の `## Rust コード` の冒頭抜粋。

```rust
use crate::blocks::dummy_assets;
use fandhe_frontend_core::{div, el, text, Node};
use fandhe_frontend_pre_styled_ui::heading::{
    self, HeadingLevel, HeadingProps, HeadingSize, HeadingWeight,
};
use fandhe_frontend_pre_styled_ui::icon::{icon, IconProps};
use fandhe_frontend_pre_styled_ui::image::{self, AspectRatio, ImageFit, ImageProps, ImageShape};
use fandhe_frontend_pre_styled_ui::text::{self as styled_text, TextProps, TextSize, TextVariant};
use fandhe_frontend_pre_styled_ui::Size;

/// 特典項目 1 件分の架空データ（見出し・説明・自作アイコンのパス）。
struct Incentive {
    title: &'static str,
    body: &'static str,
    icon_path_d: &'static str,
}

/// 特典項目 3 件（架空、実在の企業・製品とは無関係）。自作の単純な幾何
/// パスのみを使い、lucide 等の著作物は複製しない。
const INCENTIVES: [Incentive; 3] = [
    Incentive {
        title: "送料無料",
        body: "注文金額にかかわらず、国内配送はすべて無料です。",
        icon_path_d: "M3 7h11v9H3zM14 10h4l3 3v3h-7zM6.5 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM17.5 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3z",
    },
    Incentive {
        title: "30 日以内の返品",
        body: "到着から 30 日以内であれば、理由を問わず返品できます。",
        icon_path_d: "M4 4v6h6M4.5 15a8 8 0 108-11.3",
    },
    Incentive {
        title: "サポート窓口",
        body: "注文に関するお問い合わせに、専任スタッフが対応します。",
        icon_path_d: "M12 21a9 9 0 100-18 9 9 0 000 18zM12 8v5l3 3",
    },
];

/// 装飾用の自作幾何アイコン（`fill="none"` + `stroke="currentColor"` の
/// 線画、`feature_three_column_icons::geo_icon` と同型の判断）。
fn geo_icon(path_d: &'static str) -> Node {
    icon(
        &IconProps {
            size: Size::Xl,
            ..IconProps::default()
        },
        vec![("data-blocks-incentives-split-header-icon", "")],
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

/// 左列（見出し + リード文）。
fn intro() -> Node {
    div(
        vec![("class", "blocks-incentives-split-header-intro")],
        vec![
            heading::heading(
                HeadingLevel::H3,
                &HeadingProps {
                    size: HeadingSize::Xl3,
                    weight: HeadingWeight::Bold,
                },
                vec![],
                vec![text("安心してお買い物いただくために")],
            ),
            styled_text::text(
                &TextProps {
                    variant: TextVariant::Muted,
                    ..TextProps::default()
                },
                vec![("data-blocks-incentives-split-header-lead", "")],
                vec![text(
                    "送料・返品・サポートのすべてで、ご注文の不安を取り除きます。",
                )],
            ),
        ],
    )
}
// ...（以下省略。全文は公式ページ https://fandhe-ai.github.io/fandhe-frontend/blocks/incentives-split-header/ の「Rust コード」を参照）
```

## Blocks

| slug | 説明 | 使用部品（BLOCK.parts） | 公式 URL |
|------|------|------------------------|----------|
| incentives-icon-grid | 特典（送料無料・返品保証・ギフト包装・ポイント還元など）をアイコンやイラスト付きの項目グリッドで紹介する。5 つの静的インスタンスを縦に並べる | [Heading](../../themes/typography/heading.md) / [Text](../../themes/typography/text.md) / [Icon](../../themes/data-display/icon.md) / [Image](../../themes/data-display/image.md) / [Card](../../themes/data-display/card.md) / [Item](../../themes/data-display/item.md) / [Visually Hidden](../../themes/utilities/visually-hidden.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/incentives-icon-grid/ |
| incentives-inline-strip | アイコンと短いタイトルの組を横一行に並べる 1 行帯。説明文は付けない | [Icon](../../themes/data-display/icon.md) / [Text](../../themes/typography/text.md) / [Visually Hidden](../../themes/utilities/visually-hidden.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/incentives-inline-strip/ |
| incentives-split-header | 上段は左に見出し・本文、右に大きな画像の 2 列、下段はアイコン付き特典 3 点を横並び（48rem 未満は 1 列に縦積み） | [Heading](../../themes/typography/heading.md) / [Text](../../themes/typography/text.md) / [Image](../../themes/data-display/image.md) / [Icon](../../themes/data-display/icon.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/incentives-split-header/ |

## Notes

- 上記コードは公式 md `## Rust コード` の冒頭抜粋（元は約 148 行）。全文は公式ページを参照する。
- `docs-site` は crates.io 未公開 crate のため `use` できる API ではない。コードをコピーして `fandhe_frontend_pre_styled_ui::*` / `fandhe_frontend_core::*` の呼び出し規約の見本として使う前提。`use crate::blocks::dummy_assets;` は docs-site 内部モジュールで、コピー時は自前の画像 URL に置き換える。
- 全 block は無 JS の静的表示で `<form>` を持たない。特典の文言は架空で、アイコンは自作の単純な幾何パス（線画）のみ。
- 差分メモ（`incentives-split-header`）: 主参照 R1015（導入 2 列 + 特典 3 点）の集約元は 1 件のみで Demo は 1 形。文言・アイコンは独自の架空（送料無料・返品・サポート窓口）で、参照元の文言・配色・装飾・アイコンは持ち込まない。画像は同梱のビルド時生成プレースホルダー SVG。幅 md（48rem）未満では上段 2 列・下段の特典 3 点とも 1 列に縦積み。lucide 等の著作物アイコンは複製しない。
- 他 2 block の差分メモは公式 md を参照（`incentives-inline-strip` は主参照 R1022・集約元 R0560）。
- 出典（pin SHA `cf5edb9b8f1bf2a63d51dcf50a8d2806e2d8f9f9`）: 公式 md `site/blocks/<slug>.md`、Rust ソース `crates/docs-site/src/blocks/ecommerce/incentives/<slug_snake>.rs`。

## Related

- [Ecommerce Blocks overview](./overview.md)
- [Promo](./promo.md)
- [Product Overview](./product-overview.md)
