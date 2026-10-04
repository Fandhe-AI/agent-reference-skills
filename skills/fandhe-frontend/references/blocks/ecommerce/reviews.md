# Reviews（Ecommerce Blocks）

商品レビュー（カードグリッド・縦積み一覧・評価サマリ付き 2 カラム・投稿フォーム）の Blocks 4 件。Blocks は新規 API ではなく既存の Themes / Primitives / core 部品の合成例であり、各 block の公開物は未公開 crate `docs-site` 内部の `pub fn demo() -> Node` と `pub const BLOCK: Block` だけである。

## Signature / Usage

カテゴリ内で最も短い `reviews-write-form` の `## Rust コード` の冒頭抜粋。

```rust
use fandhe_frontend_core::{div, text, Node};
use fandhe_frontend_pre_styled_ui::button::{self, ButtonProps};
use fandhe_frontend_pre_styled_ui::field::{self, FieldOrientation, FieldRootProps};
use fandhe_frontend_pre_styled_ui::heading::{self, HeadingLevel, HeadingProps};
use fandhe_frontend_pre_styled_ui::input::{self, FieldIds, FieldProps, InputProps};
use fandhe_frontend_pre_styled_ui::rating_group::{
    self, RatingGroup, RatingGroupProps, RatingItemFlags,
};
use fandhe_frontend_pre_styled_ui::textarea::{self, TextareaProps};
use fandhe_frontend_pre_styled_ui::{ColorPalette, Size};

/// 一意な id を組み立てる（`blocks-reviews-write-form-` 接頭辞を共通化し、
/// フィールド追加時の綴り間違いを防ぐ）。
fn field_id(suffix: &str) -> String {
    format!("blocks-reviews-write-form-{suffix}")
}

/// 縦積み（label 上・control 下）の共通 orientation。
fn orientation() -> FieldRootProps {
    FieldRootProps {
        orientation: FieldOrientation::Vertical,
    }
}

/// 通常フィールド（`text`/`email` 等）を組み立てる。全項目を必須にする
/// （R0213 の「名前・メール・評価・題名・本文 + 投稿」が全項目必須の構成
/// であることに対応）。
fn text_field(
    id: String,
    label_text: &'static str,
    input_type: &'static str,
    autocomplete: &'static str,
    placeholder: &'static str,
) -> Node {
    let props = FieldProps {
        id: id.as_str(),
        ids: FieldIds::default(),
        disabled: false,
        invalid: false,
        required: true,
        readonly: false,
        has_helper_text: false,
    };
    field::root(
        &orientation(),
        &props,
        vec![("data-blocks-reviews-write-form-field", "")],
        vec![
            field::label(&props, vec![], vec![text(label_text)]),
            input::input(
                &InputProps::default(),
                &props,
                vec![
                    ("type", input_type),
                    ("autocomplete", autocomplete),
                    ("placeholder", placeholder),
                ],
            ),
        ],
    )
}
// ...（以下省略。全文は公式ページ https://fandhe-ai.github.io/fandhe-frontend/blocks/reviews-write-form/ の「Rust コード」を参照）
```

## Blocks

| slug | 説明 | 使用部品（BLOCK.parts） | 公式 URL |
|------|------|------------------------|----------|
| reviews-card-grid | 見出し・平均評価・投稿ボタンのヘッダ行、区切り線、レビューカード 6 枚のグリッド、末尾中央の「さらに読み込む」ボタン | [Heading](../../themes/typography/heading.md) / [Rating Group](../../themes/forms/rating-group.md) / [Button](../../themes/forms/button.md) / [Separator](../../themes/utilities/separator.md) / [Card](../../themes/data-display/card.md) / [Text](../../themes/typography/text.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/reviews-card-grid/ |
| reviews-stacked-list | レビューを区切り線で仕切って縦に並べる一覧。投稿者名・日付・星評価・タイトル・本文を持つ行（広幅で投稿者・評価・本文の 3 列化） | [Heading](../../themes/typography/heading.md) / [Avatar](../../themes/data-display/avatar.md) / [Rating Group](../../themes/forms/rating-group.md) / [Text](../../themes/typography/text.md) / [Separator](../../themes/utilities/separator.md) / [Input Group](../../themes/forms/input-group.md) / [Input](../../themes/forms/input.md) / [Badge](../../themes/data-display/badge.md) / [Button](../../themes/forms/button.md) / [Visually Hidden](../../themes/utilities/visually-hidden.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/reviews-stacked-list/ |
| reviews-summary-split | 左列に評価サマリ（平均評価・星別割合バー・導線）、右列にレビュー一覧を置く 2 カラム | [Heading](../../themes/typography/heading.md) / [Rating Group](../../themes/forms/rating-group.md) / [Progress](../../themes/feedback/progress.md) / [Avatar](../../themes/data-display/avatar.md) / [Text](../../themes/typography/text.md) / [Link](../../themes/typography/link.md) / [Button](../../themes/forms/button.md) / [Image](../../themes/data-display/image.md) / [Card](../../themes/data-display/card.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/reviews-summary-split/ |
| reviews-write-form | 見出しの下に名前・メールアドレス・評価・タイトル・本文の入力欄を縦 1 列に並べ、最後に投稿ボタンを置くレビュー投稿フォーム | [Heading](../../themes/typography/heading.md) / [Field](../../themes/forms/field.md) / [Input](../../themes/forms/input.md) / [Textarea](../../themes/forms/textarea.md) / [Rating Group](../../themes/forms/rating-group.md) / [Button](../../themes/forms/button.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/reviews-write-form/ |

## Notes

- 上記コードは公式 md `## Rust コード` の冒頭抜粋（元は約 180 行）。全文は公式ページを参照する。
- `docs-site` は crates.io 未公開 crate のため `use` できる API ではない。コードをコピーして `fandhe_frontend_pre_styled_ui::*` / `fandhe_frontend_core::*` の呼び出し規約の見本として使う前提。
- 全 block は無 JS の静的表示で、`<form>` を含まない。`reviews-write-form` の投稿ボタンは `type="button"` で送信先・バリデーション・状態管理を持たず、評価は readonly の `rating-group`（既定値 4）の静的表示。実際の値変更・送信は利用者側のハイドレーション（`fandhe-frontend-wasm-full`）で実装する。名前・メール・本文の文言は架空。
- 差分メモ（`reviews-write-form`）: 集約元は主参照 R0213 の 1 件のみ。見出しはページ側が `## Demo` として `h2` を出すため `h3`。評価は参照元の星評価選択 UI を既存 `rating-group` へ置換し既定値 4 で固定。狭い画面でも常に 1 列（メディアクエリ・コンテナクエリによる切り替えなし）。参照素材が着手時点で閲覧不能だったため対応表 ID のみを根拠に独自実装。
- 他 3 block の差分メモは公式 md を参照（`reviews-card-grid` は主参照 R0214、`reviews-stacked-list` は主参照 R1218、`reviews-summary-split` は主参照 R1219・集約元 R0215）。
- 出典（pin SHA `cf5edb9b8f1bf2a63d51dcf50a8d2806e2d8f9f9`）: 公式 md `site/blocks/<slug>.md`、Rust ソース `crates/docs-site/src/blocks/ecommerce/reviews/<slug_snake>.rs`。

## Related

- [Ecommerce Blocks overview](./overview.md)
- [Product Overview](./product-overview.md)
- [Product List](./product-list.md)
- [Order](./order.md)
