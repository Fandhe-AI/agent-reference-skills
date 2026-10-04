# Checkout（Ecommerce Blocks）

購入手続き（ステップ式ウィザード・節単位の段階入力・注文サマリ付き 2 カラム）の Blocks 3 件。Blocks は新規 API ではなく既存の Themes / Primitives / core 部品の合成例であり、各 block の公開物は未公開 crate `docs-site` 内部の `pub fn demo() -> Node` と `pub const BLOCK: Block` だけである。

## Signature / Usage

カテゴリ内で最も短い `checkout-wizard-steps` の `## Rust コード` の冒頭抜粋。

```rust
use fandhe_frontend_core::{div, h3, p, span, text, Node};
use fandhe_frontend_pre_styled_ui::button::{self, ButtonProps, ButtonVariant};
use fandhe_frontend_pre_styled_ui::fandhe_frontend_headless_ui::steps::Steps;
use fandhe_frontend_pre_styled_ui::field::{
    self, FieldIds, FieldOrientation, FieldProps, FieldRootProps,
};
use fandhe_frontend_pre_styled_ui::input::{self, InputProps};
use fandhe_frontend_pre_styled_ui::item::{self, ItemRootProps};
use fandhe_frontend_pre_styled_ui::separator::{self, SeparatorProps};
use fandhe_frontend_pre_styled_ui::steps;
use fandhe_frontend_pre_styled_ui::{ColorPalette, Orientation, Size};

/// ステップのラベル（番号 + ラベルがトリガーのアクセシブルネームになる）。
const STEP_LABELS: [&str; 4] = ["メール", "住所", "配送", "支払い"];

/// id 接頭辞から [`FieldProps`] を組み立てる（`required: true` 固定の
/// 共通設定。本 Demo の入力欄はすべて必須想定のダミーのため）。
fn field_props(id: &'static str) -> FieldProps<'static> {
    FieldProps {
        id,
        ids: FieldIds::default(),
        disabled: false,
        invalid: false,
        required: true,
        readonly: false,
        has_helper_text: false,
    }
}

/// ラベル付き 1 行入力欄を組み立てる（`field::root` + `field::label` +
/// `input::input`）。`id` は呼び出し側で block 全体で一意な値を渡すこと
/// （2〜4 段目の `content` も `hidden` のまま DOM に残るため、
/// `blocks_contract.rs::demo_output_has_no_dangling_aria_references_or_duplicate_ids`
/// が id 重複を fail-closed に検知する）。
fn labelled_field(
    orientation: &FieldRootProps,
    id: &'static str,
    label: &str,
    input_attrs: Vec<(&'static str, &'static str)>,
) -> Node {
    let props = field_props(id);
    field::root(
        orientation,
        &props,
        vec![("data-blocks-checkout-wizard-steps-field", "")],
        vec![
            field::label(&props, vec![], vec![text(label)]),
            input::input(&InputProps::default(), &props, input_attrs),
        ],
    )
}

/// 配送方法・支払い方法の静的な 1 行（`item::root` + `title`/`description`）。
fn option_item(hook: &'static str, title: &str, description: &str) -> Node {
    item::root(
        ItemRootProps::default(),
        vec![(hook, "")],
        vec![item::content(
            vec![],
            vec![
                item::title(vec![], vec![text(title)]),
                item::description(vec![], vec![text(description)]),
            ],
        )],
    )
}
// ...（以下省略。全文は公式ページ https://fandhe-ai.github.io/fandhe-frontend/blocks/checkout-wizard-steps/ の「Rust コード」を参照）
```

## Blocks

| slug | 説明 | 使用部品（BLOCK.parts） | 公式 URL |
|------|------|------------------------|----------|
| checkout-form-summary-split | 注文サマリ（商品行・割引コード・集計・確定ボタン）と入力フォーム（連絡先 → 配送先 → 配送方法 → 支払い情報）を並べた 2 カラム。集約元 6 件の差分を読み取れる 3 版を並記 | [Field](../../themes/forms/field.md) / [Input](../../themes/forms/input.md) / [Input Group](../../themes/forms/input-group.md) / [Native Select](../../themes/forms/native-select.md) / [Radio Card](../../themes/forms/radio-card.md) / [Radio Group](../../themes/forms/radio-group.md) / [Fieldset](../../themes/forms/fieldset.md) / [Checkbox](../../themes/forms/checkbox.md) / [Badge](../../themes/data-display/badge.md) / [Button](../../themes/forms/button.md) / [Image](../../themes/data-display/image.md) / [Separator](../../themes/utilities/separator.md) / [Data List](../../themes/data-display/data-list.md) / [Heading](../../themes/typography/heading.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/checkout-form-summary-split/ |
| checkout-step-sections | 購入手続きを「現在入力中の節 + まだ着手していない後続節」として段階的に見せる。一方の列に注文サマリ、もう一方に簡易決済ボタン群 → 現在節（連絡先） → 後続節の見出し一覧 | [Field](../../themes/forms/field.md) / [Input](../../themes/forms/input.md) / [Checkbox](../../themes/forms/checkbox.md) / [Button](../../themes/forms/button.md) / [Heading](../../themes/typography/heading.md) / [Image](../../themes/data-display/image.md) / [Separator](../../themes/utilities/separator.md) / [Data List](../../themes/data-display/data-list.md) / [Text](../../themes/typography/text.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/checkout-step-sections/ |
| checkout-wizard-steps | 購入手続きを「メール → 住所 → 配送 → 支払い」の 4 段ステップ式ウィザードとして見せる | [Steps](../../themes/collections/steps.md) / [Field](../../themes/forms/field.md) / [Input](../../themes/forms/input.md) / [Button](../../themes/forms/button.md) / [Separator](../../themes/utilities/separator.md) / [Item](../../themes/data-display/item.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/checkout-wizard-steps/ |

## Notes

- 上記コードは公式 md `## Rust コード` の冒頭抜粋（元は約 265 行）。全文は公式ページを参照する。
- `docs-site` は crates.io 未公開 crate のため `use` できる API ではない。コードをコピーして `fandhe_frontend_pre_styled_ui::*` / `fandhe_frontend_core::*` の呼び出し規約の見本として使う前提。
- 全 block は無 JS の静的表示で `<form>` を持たず、送信処理・データ取得を行わない。支払い段にカード番号・CVC 等の決済情報入力欄を置かない block がある（実在の決済フォームに見せないための判断）。文言・金額は架空。
- 差分メモ（`checkout-wizard-steps`）: 集約元は対応表 ID R0430 の 1 件のみ。ステップ表示は番号 + ラベルで、狭幅（`@container` 30rem 以下）ではラベルを視覚的にのみ隠し番号中心の簡略表示へ切り替える。1 段目のみ現在ステップとして固定表示し、2〜4 段目は `hidden` 属性で隠す（JS ハイドレーションなしのため静的な初期状態のみ）。支払い段は入力欄を置かず支払い方法の一覧（`item`）に留める。
- 他 2 block の差分メモは公式 md を参照（`checkout-form-summary-split` は集約元 R0833 / R0834 / R0836 / R0837 / R0429 / R0431）。
- 出典（pin SHA `cf5edb9b8f1bf2a63d51dcf50a8d2806e2d8f9f9`）: 公式 md `site/blocks/<slug>.md`、Rust ソース `crates/docs-site/src/blocks/ecommerce/checkout/<slug_snake>.rs`。

## Related

- [Ecommerce Blocks overview](./overview.md)
- [Cart](./cart.md)
- [Order](./order.md)
