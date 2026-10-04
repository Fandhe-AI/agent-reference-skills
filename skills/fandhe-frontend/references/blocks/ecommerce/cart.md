# Cart（Ecommerce Blocks）

ショッピングカート（ダイアログ・ドロワー・ミニパネル・明細表・1 カラム・2 カラム）の Blocks 6 件。Blocks は新規 API ではなく既存の Themes / Primitives / core 部品の合成例であり、各 block の公開物は未公開 crate `docs-site` 内部の `pub fn demo() -> Node` と `pub const BLOCK: Block` だけである。

## Signature / Usage

カテゴリ内で最も短い `cart-dialog` の `## Rust コード` の冒頭抜粋。

```rust
use crate::blocks::dummy_assets;
use fandhe_frontend_core::{div, el, text, Node};
use fandhe_frontend_pre_styled_ui::button::{button, ButtonProps, ButtonVariant};
use fandhe_frontend_pre_styled_ui::data_list::{self, DataListOrientation, DataListProps};
use fandhe_frontend_pre_styled_ui::dialog::{self, ContentIds, DialogRole, OpenState};
use fandhe_frontend_pre_styled_ui::image::{image, ImageProps, ImageShape};
use fandhe_frontend_pre_styled_ui::native_select::{
    native_select, FieldIds, FieldProps, NativeSelectProps,
};
use fandhe_frontend_pre_styled_ui::recipe::Size;
use fandhe_frontend_pre_styled_ui::separator::{separator, SeparatorProps};
use fandhe_frontend_pre_styled_ui::text::{
    self as styled_text, TextProps, TextSize, TextVariant, TextWeight,
};

/// [`dialog::content`] の `id`（[`dialog::trigger`] の `controls` と対）。
const CONTENT_ID: &str = "blocks-cart-dialog-content";

/// [`dialog::title`] の `id`（[`dialog::content`] の `labelledby` と対）。
const TITLE_ID: &str = "blocks-cart-dialog-title";

/// 架空の商品行データ（商品名, 属性表示, 価格表示, 初期選択数量）。
/// 実在のブランド・商品・PII は含まない。
const CART_ITEMS: &[(&str, &str, &str, u8)] = &[
    (
        "エルゴノミック メッシュチェア",
        "カラー: グレー / サイズ: M",
        "¥24,800",
        1,
    ),
    (
        "ノイズキャンセリング ヘッドホン",
        "カラー: ブラック",
        "¥18,200",
        1,
    ),
];

/// 集計行（ラベル, 値）。最終行（合計）だけ [`summary`] 側で強調用の
/// `data-*` を追加する。
const SUMMARY_ROWS: &[(&str, &str)] = &[("小計", "¥43,000"), ("送料", "¥600"), ("合計", "¥43,600")];

/// 指定した初期選択数量 `selected` の 1〜5 の `<option>` 列を組み立てる
/// （`cart_two_column_summary.rs::qty_options` と同型）。
fn qty_options(selected: u8) -> Vec<Node> {
    (1..=5u8)
        .map(|n| {
            let mut attrs = vec![("value", n.to_string())];
            if n == selected {
                attrs.push(("selected", String::new()));
            }
            el(
                "option",
                attrs.iter().map(|(k, v)| (*k, v.as_str())).collect(),
                vec![text(n.to_string())],
            )
        })
        .collect()
}

/// 商品行 1 件（サムネイル + 名称/属性 + 価格/数量選択/削除）。`index` は
/// 0 始まりで、数量 `select` の一意な `id` の派生に使う
/// （`cart_two_column_summary.rs::item_row` と同型）。
fn item_row(index: usize, name: &str, attrs: &str, price: &str, qty: u8) -> Node {
    let field_id = format!("blocks-cart-dialog-qty-{}", index + 1);
    let qty_aria_label = format!("{name} の数量");
    let field = FieldProps {
        id: &field_id,
        ids: FieldIds::default(),
        disabled: true,
        invalid: false,
        required: false,
        readonly: false,
        has_helper_text: false,
    };
// ...（以下省略。全文は公式ページ https://fandhe-ai.github.io/fandhe-frontend/blocks/cart-dialog/ の「Rust コード」を参照）
```

## Blocks

| slug | 説明 | 使用部品（BLOCK.parts） | 公式 URL |
|------|------|------------------------|----------|
| cart-dialog | カートを開くボタンと画面中央のダイアログ（タイトル・閉じるボタン・数量選択/削除付き商品行・淡い面の集計・右寄せの次へボタン） | [Dialog](../../themes/overlays/dialog.md) / [Button](../../themes/forms/button.md) / [Image](../../themes/data-display/image.md) / [Text](../../themes/typography/text.md) / [Native Select](../../themes/forms/native-select.md) / [Separator](../../themes/utilities/separator.md) / [Data List](../../themes/data-display/data-list.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/cart-dialog/ |
| cart-drawer | 画面右端（inline-end）から出るカートドロワー | [Drawer](../../themes/overlays/drawer.md) / [Button](../../themes/forms/button.md) / [Image](../../themes/data-display/image.md) / [Text](../../themes/typography/text.md) / [Separator](../../themes/utilities/separator.md) / [Data List](../../themes/data-display/data-list.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/cart-drawer/ |
| cart-line-item-table | 列見出し付きの明細表を持つカート画面 | [Heading](../../themes/typography/heading.md) / [Image](../../themes/data-display/image.md) / [Text](../../themes/typography/text.md) / [Native Select](../../themes/forms/native-select.md) / [Button](../../themes/forms/button.md) / [Separator](../../themes/utilities/separator.md) / [Data List](../../themes/data-display/data-list.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/cart-line-item-table/ |
| cart-mini-panel | 店舗ヘッダーのカートボタン直下に開くミニカートパネル | [Popover](../../themes/overlays/popover.md) / [Button](../../themes/forms/button.md) / [Image](../../themes/data-display/image.md) / [Text](../../themes/typography/text.md) / [Number Input](../../themes/forms/number-input.md) / [Separator](../../themes/utilities/separator.md) / [Link](../../themes/typography/link.md) / [Heading](../../themes/typography/heading.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/cart-mini-panel/ |
| cart-single-column | 1 カラム構成のカート画面 | [Heading](../../themes/typography/heading.md) / [Image](../../themes/data-display/image.md) / [Text](../../themes/typography/text.md) / [Native Select](../../themes/forms/native-select.md) / [Button](../../themes/forms/button.md) / [Separator](../../themes/utilities/separator.md) / [Data List](../../themes/data-display/data-list.md) / [Link](../../themes/typography/link.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/cart-single-column/ |
| cart-two-column-summary | 左に商品行リスト、右に注文サマリの 2 カラム構成のカート画面 | [Heading](../../themes/typography/heading.md) / [Image](../../themes/data-display/image.md) / [Text](../../themes/typography/text.md) / [Native Select](../../themes/forms/native-select.md) / [Button](../../themes/forms/button.md) / [Separator](../../themes/utilities/separator.md) / [Data List](../../themes/data-display/data-list.md) / [Card](../../themes/data-display/card.md) / [Progress](../../themes/feedback/progress.md) / [Link](../../themes/typography/link.md) / [Tooltip](../../themes/overlays/tooltip.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/cart-two-column-summary/ |

## Notes

- 上記コードは公式 md `## Rust コード` の冒頭抜粋（元は約 267 行）。全文は公式ページを参照する。
- `docs-site` は crates.io 未公開 crate のため `use` できる API ではない。コードをコピーして `fandhe_frontend_pre_styled_ui::*` / `fandhe_frontend_core::*` の呼び出し規約の見本として使う前提。`use crate::blocks::dummy_assets;` は docs-site 内部モジュールで、コピー時は自前の画像 URL に置き換える。
- 全 block は無 JS の静的表示で `<form>` を持たない。商品名・属性・価格は架空データ。
- 差分メモ（`cart-dialog`）: 開く/閉じるボタンは docs サイトが JS ハイドレーションを行わない設計のため、ネイティブ `disabled` + `data-disabled` でフォーカス・クリック不能を明示（`store-nav-centered-logo` と同型）。数量 select・削除・「レジに進む」も同じ理由で `disabled`。閉じる機構がないため `aria-modal` は false（`contact-dialog-form` と同じ判断）。主参照 R1251（中央モーダル + 集計 + 次へボタン）に集約元 R0680 の商品行構成を統合。コンテナ幅 36rem 未満では `@container` によりダイアログが全幅に近づき、商品行コントロールと次へボタンが縦積み・全幅。
- 他 5 block の差分メモは公式 md を参照（`cart-drawer` は主参照 R1250・集約元 R0679、`cart-line-item-table` は主参照 R0325、`cart-mini-panel` は主参照 R1252・集約元 R0326 / R0327、`cart-single-column` は主参照 R1248・集約元 R1249、`cart-two-column-summary` は主参照 R1247・集約元 R0324 / R0681 / R0682）。
- 出典（pin SHA `cf5edb9b8f1bf2a63d51dcf50a8d2806e2d8f9f9`）: 公式 md `site/blocks/<slug>.md`、Rust ソース `crates/docs-site/src/blocks/ecommerce/cart/<slug_snake>.rs`。

## Related

- [Ecommerce Blocks overview](./overview.md)
- [Checkout](./checkout.md)
- [Product Overview](./product-overview.md)
- [Store Nav](./store-nav.md)
