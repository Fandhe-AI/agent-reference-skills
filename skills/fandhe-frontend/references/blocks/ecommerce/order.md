# Order（Ecommerce Blocks）

注文確認・注文履歴・配送追跡の Blocks 5 件。Blocks は新規 API ではなく既存の Themes / Primitives / core 部品の合成例であり、各 block の公開物は未公開 crate `docs-site` 内部の `pub fn demo() -> Node` と `pub const BLOCK: Block` だけである。

## Signature / Usage

カテゴリ内で最も短い `order-confirmation-split-image` の `## Rust コード` の冒頭抜粋。

```rust
use crate::blocks::dummy_assets;
use fandhe_frontend_core::{div, text, Node};
use fandhe_frontend_pre_styled_ui::data_list::{self, DataListOrientation, DataListProps};
use fandhe_frontend_pre_styled_ui::heading::{heading, HeadingLevel, HeadingProps};
use fandhe_frontend_pre_styled_ui::image::{image, AspectRatio, ImageFit, ImageProps, ImageShape};
use fandhe_frontend_pre_styled_ui::link::{self, LinkProps, LinkVariant};
use fandhe_frontend_pre_styled_ui::separator::{separator, SeparatorProps};
use fandhe_frontend_pre_styled_ui::text::{self as styled_text, TextProps, TextSize, TextVariant};

/// ラベル・値の 1 行（`data_list::item` + `item-label` + `item-value`）。
/// `value` は `impl Into<String>` で受け取り、`dummy_assets::PERSON_NAMES`
/// 等と組み立てた動的な値（`format!` の結果）もそのまま渡せるようにする
/// （レビュー指摘: 氏名を文字列直書きにすると共通ダミーデータ更新時に
/// 表示とモジュール説明がずれるため）。
fn row(label: &'static str, value: impl Into<String>) -> Node {
    row_with_attrs(label, value, vec![])
}

/// 強調等の CSS フックを `data_list::item` 自身に付けたい行
/// （`data_list::root` の `<dl>` 直下は `div`〔item〕のみを子に持てるため、
/// 合計行の強調フックは `item` を追加の `div` で包まず本関数で直接付与する。
/// `data_list(dl)` 配下で `item` をさらに `div` で包むと `dt`/`dd` が項目
/// グループ直下にない無効な入れ子になる、というレビュー指摘の是正）。
fn row_with_attrs(
    label: &'static str,
    value: impl Into<String>,
    attrs: Vec<(&'static str, &'static str)>,
) -> Node {
    data_list::item(
        attrs,
        vec![
            data_list::item_label(vec![], vec![text(label)]),
            data_list::item_value(vec![], vec![text(value)]),
        ],
    )
}

/// 「買い物を続ける」リンクの遷移先（商品一覧を模した架空 URL）。
/// 本 Demo は商品一覧・ストアページを持たないため、`order_history_table`
/// と同じ判断（`https://example.com/` 配下の架空 URL + `external: true`、
/// `href="#"` は linkcheck が fail-closed に検知するため使わない）に揃える。
/// 当初は `cart_two_column_summary`/`cart_single_column` と同じ固定リポジトリ
/// URL を指していたが、レビュー指摘（案内文言「買い物を続ける」と遷移先の
/// GitHub リポジトリが不一致）を受け、文言の期待先に合わせた架空の商品一覧
/// URL へ変更した。
const CONTINUE_SHOPPING_URL: &str = "https://example.com/products";

/// 商品行 1 件（サムネイル・商品名・オプション・価格）。
fn product_line(name: &'static str, option: &'static str, price: &'static str) -> Node {
    div(
        vec![("class", "blocks-order-confirmation-split-image-line")],
        vec![
            image(
                &ImageProps {
                    fit: ImageFit::Cover,
                    aspect_ratio: AspectRatio::Square,
                    shape: ImageShape::Rounded,
                    ..ImageProps::new(dummy_assets::PRODUCT_SRC, name)
                },
                vec![("data-blocks-order-confirmation-split-image-thumb", "")],
            ),
            div(
                vec![("class", "blocks-order-confirmation-split-image-line-text")],
                vec![
                    styled_text::text(&TextProps::default(), vec![], vec![text(name)]),
                    styled_text::text(
                        &TextProps {
                            variant: TextVariant::Muted,
                            size: TextSize::Sm,
                            ..TextProps::default()
                        },
                        vec![],
                        vec![text(option)],
                    ),
                ],
            ),
            styled_text::text(&TextProps::default(), vec![], vec![text(price)]),
        ],
    )
}
// ...（以下省略。全文は公式ページ https://fandhe-ai.github.io/fandhe-frontend/blocks/order-confirmation-split-image/ の「Rust コード」を参照）
```

## Blocks

| slug | 説明 | 使用部品（BLOCK.parts） | 公式 URL |
|------|------|------------------------|----------|
| order-confirmation-split-image | 注文確認ページ。広い幅で左半分に大きな画像、右列に支払い完了見出し・追跡番号・商品行・集計・配送先と支払い情報・「買い物を続ける」リンク | [Image](../../themes/data-display/image.md) / [Heading](../../themes/typography/heading.md) / [Text](../../themes/typography/text.md) / [Data List](../../themes/data-display/data-list.md) / [Separator](../../themes/utilities/separator.md) / [Link](../../themes/typography/link.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/order-confirmation-split-image/ |
| order-confirmation-summary | お礼見出し・追跡番号、商品明細 2 件、配送先・請求先・支払い方法・配送方法の 4 情報、割引バッジ付き集計を組み合わせた注文確認 | [Heading](../../themes/typography/heading.md) / [Text](../../themes/typography/text.md) / [Image](../../themes/data-display/image.md) / [Separator](../../themes/utilities/separator.md) / [Data List](../../themes/data-display/data-list.md) / [Badge](../../themes/data-display/badge.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/order-confirmation-summary/ |
| order-history-panels | 注文ごとに枠付きパネルを縦に積む注文履歴。上部にサマリ帯（注文番号・注文日・合計・操作ボタン・三点メニュー）、下部に商品行と操作群 | [Card](../../themes/data-display/card.md) / [Data List](../../themes/data-display/data-list.md) / [Button](../../themes/forms/button.md) / [Menu](../../themes/collections/menu.md) / [Image](../../themes/data-display/image.md) / [Text](../../themes/typography/text.md) / [Heading](../../themes/typography/heading.md) / [Link](../../themes/typography/link.md) / [Separator](../../themes/utilities/separator.md) / [Icon](../../themes/data-display/icon.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/order-history-panels/ |
| order-history-table | 注文ごとにサマリ帯（注文番号・注文日・合計金額・請求書リンク）を置き、商品・価格・状態・操作の 4 列の明細表を積む注文履歴 | [Table](../../themes/data-display/table.md) / [Data List](../../themes/data-display/data-list.md) / [Link](../../themes/typography/link.md) / [Image](../../themes/data-display/image.md) / [Text](../../themes/typography/text.md) / [Visually Hidden](../../themes/utilities/visually-hidden.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/order-history-table/ |
| order-tracking-progress | 注文ヘッダ・商品カード列（配送状況の進捗バーと到達段階表示）・サマリ（請求先・支払い情報・集計）を組み合わせた注文詳細 | [Heading](../../themes/typography/heading.md) / [Text](../../themes/typography/text.md) / [Image](../../themes/data-display/image.md) / [Progress](../../themes/feedback/progress.md) / [Steps](../../themes/collections/steps.md) / [Data List](../../themes/data-display/data-list.md) / [Button](../../themes/forms/button.md) / [Link](../../themes/typography/link.md) / [Card](../../themes/data-display/card.md) / [Separator](../../themes/utilities/separator.md) / [Badge](../../themes/data-display/badge.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/order-tracking-progress/ |

## Notes

- 上記コードは公式 md `## Rust コード` の冒頭抜粋（元は約 198 行）。全文は公式ページを参照する。
- `docs-site` は crates.io 未公開 crate のため `use` できる API ではない。コードをコピーして `fandhe_frontend_pre_styled_ui::*` / `fandhe_frontend_core::*` の呼び出し規約の見本として使う前提。`use crate::blocks::dummy_assets;` は docs-site 内部モジュールで、コピー時は自前の画像 URL・ダミーデータに置き換える。
- 全 block は無 JS の静的表示で `<form>` を持たず、決済処理・送信先を持たない。氏名・住所・追跡番号・価格は架空、カード番号は末尾 4 桁の伏字表現のみ。
- 差分メモ（`order-confirmation-split-image`）: 主参照 R1121（左半分画像 + 右列に注文内容）からの差分。文言・配色・アイコンは独自。コンテナ幅 48rem 未満では `@container` で画像を上部の帯にする。配送先と支払い情報は幅にかかわらず `data-list` を 2 列 grid にし、合計行の強調も block 固有 CSS。節の区切りには `separator`。「買い物を続ける」リンクは `href="#"` を避けて架空 URL（`https://example.com/products`、`external: true`）。
- 他 4 block の差分メモは公式 md を参照（`order-history-panels` は主参照 R1116）。
- 出典（pin SHA `cf5edb9b8f1bf2a63d51dcf50a8d2806e2d8f9f9`）: 公式 md `site/blocks/<slug>.md`、Rust ソース `crates/docs-site/src/blocks/ecommerce/order/<slug_snake>.rs`。

## Related

- [Ecommerce Blocks overview](./overview.md)
- [Checkout](./checkout.md)
- [Cart](./cart.md)
- [Reviews](./reviews.md)
