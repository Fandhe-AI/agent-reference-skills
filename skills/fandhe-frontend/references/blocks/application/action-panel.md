# Action Panel（Application Blocks）

Action Panel は、カード内にタイトル・説明文・主操作を置くアクションパネルの合成例 5 件。blocks は新規 API ではなく既存の Themes / Primitives / core 部品の合成例で、各 block の公開物は未公開 crate docs-site 内部の `pub fn demo() -> Node` と `pub const BLOCK: Block` だけである。

## Signature / Usage

`action-panel-with-input`（カテゴリ内で最も短い block）の `## Rust コード`。

```rust
use fandhe_frontend_core::{div, text, Node};
use fandhe_frontend_pre_styled_ui::button::{self, ButtonProps};
use fandhe_frontend_pre_styled_ui::card::{self, CardProps};
use fandhe_frontend_pre_styled_ui::heading::{self, HeadingLevel, HeadingProps, HeadingSize};
use fandhe_frontend_pre_styled_ui::input::{self, FieldIds, FieldProps, InputProps};
use fandhe_frontend_pre_styled_ui::text::{self as styled_text, TextProps, TextVariant};
use fandhe_frontend_pre_styled_ui::visually_hidden;

/// メール入力欄の `id`（`<label for>` と入力欄 `id` を一致させる固定
/// リテラル。モジュール doc「入力欄の `id` を `FieldIds::control` で固定
/// する理由」参照）。
const EMAIL_ID: &str = "blocks-action-panel-with-input-email";

/// メール入力欄のアクセシビリティ状態（初期状態＝未入力・未検証・
/// 有効・必須なし）。
fn email_field() -> FieldProps<'static> {
    FieldProps {
        id: EMAIL_ID,
        ids: FieldIds {
            control: Some(EMAIL_ID),
            ..FieldIds::default()
        },
        disabled: false,
        invalid: false,
        required: false,
        readonly: false,
        has_helper_text: false,
    }
}

/// 見出し（H2、[`Heading`](heading) 部品）。docs ページ自体が H1 を持つため
/// block 内は H2 以下とする（`page_heading_avatar.rs` と同型の判断）。
fn heading_node() -> Node {
    heading::heading(
        HeadingLevel::H2,
        &HeadingProps {
            size: HeadingSize::Md,
            ..HeadingProps::default()
        },
        vec![],
        vec![text("通知メールの送信先")],
    )
}

/// 説明文（[`Text`](styled_text) 部品、`Muted` variant）。
fn description() -> Node {
    styled_text::text(
        &TextProps {
            variant: TextVariant::Muted,
            ..TextProps::default()
        },
        vec![],
        vec![text("週次レポートと重要なお知らせの送信先を設定します。")],
    )
}

/// 視覚的に隠したラベル + メール入力欄 + 保存ボタンの横並び行。
fn input_row() -> Node {
    let label = visually_hidden::root(
        vec![],
        vec![fandhe_frontend_core::el(
            "label",
            vec![("for", EMAIL_ID)],
            vec![text("メールアドレス")],
        )],
    );
    let email_input = input::input(
        &InputProps::default(),
        &email_field(),
        vec![
            ("type", "email"),
            ("autocomplete", "email"),
            ("placeholder", "you@example.com"),
        ],
    );
    let save_button = button::button(
        &ButtonProps::default(),
        vec![("data-blocks-action-panel-with-input-submit", "")],
        vec![text("保存する")],
    );
    div(
        vec![("class", "blocks-action-panel-with-input-row")],
        vec![label, email_input, save_button],
    )
}

/// `action-panel-with-input` の Demo 本体。呼び出しごとに同一の `Node` を
/// 返す純関数。レイアウト用 class は `card::root` へ渡さず最外を素の
/// `div` で包む（`card::root` は `drop_class_attr` で呼び出し側 `class` を
/// 除去するため、[`LAYOUT_CSS`] を効かせるには外側にもう 1 段必要。
/// `page_heading_avatar.rs::demo` と同型の判断）。
#[must_use]
pub fn demo() -> Node {
    let panel = card::root(
        CardProps::default(),
        vec![],
        vec![
            card::header(vec![], vec![heading_node(), description()]),
            card::body(vec![], vec![input_row()]),
        ],
    );
    div(
        vec![("class", "blocks-action-panel-with-input-layout")],
        vec![panel],
    )
}
```

## Blocks

| slug | 説明 | 使用部品 | 公式 URL |
|------|------|----------|----------|
| action-panel-footer-bar | セクション末尾の操作バー。上罫線付きの細い帯で、左に補足テキスト、右にボタン群（表示・編集・保存等）。3 インスタンス併記 | [Button](../../themes/forms/button.md) / [Button Group](../../themes/forms/button-group.md) / [Text](../../themes/typography/text.md) / [Separator](../../themes/utilities/separator.md) / [Icon](../../themes/data-display/icon.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/action-panel-footer-bar/ |
| action-panel-inline | タイトル・説明文の右側にボタンまたはトグルスイッチを横並びに置くパネル。ボタンを右上へ固定した版も併記 | [Card](../../themes/data-display/card.md) / [Heading](../../themes/typography/heading.md) / [Text](../../themes/typography/text.md) / [Button](../../themes/forms/button.md) / [Switch](../../themes/forms/switch.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/action-panel-inline/ |
| action-panel-stacked | カード内にタイトル・説明文・主操作（ボタンまたは矢印付きリンク）を縦に積むパネル。影付きカードと面色のみの枠（well 相当）の 2 通りを並記 | [Card](../../themes/data-display/card.md) / [Heading](../../themes/typography/heading.md) / [Text](../../themes/typography/text.md) / [Button](../../themes/forms/button.md) / [Link](../../themes/typography/link.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/action-panel-stacked/ |
| action-panel-with-input | 見出し・説明文の下に、視覚的に隠した実ラベル付きのメール入力欄と保存ボタンを横並びに置くパネル | [Card](../../themes/data-display/card.md) / [Heading](../../themes/typography/heading.md) / [Text](../../themes/typography/text.md) / [Input](../../themes/forms/input.md) / [Button](../../themes/forms/button.md) / [Visually Hidden](../../themes/utilities/visually-hidden.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/action-panel-with-input/ |
| action-panel-with-well | タイトルの下に外側カードより濃い面色の内側枠（well）を置き、支払手段の概要と右端の編集ボタンを並べるパネル | [Card](../../themes/data-display/card.md) / [Heading](../../themes/typography/heading.md) / [Text](../../themes/typography/text.md) / [Icon](../../themes/data-display/icon.md) / [Button](../../themes/forms/button.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/action-panel-with-well/ |

## Notes

- docs-site は crates.io 未公開の crate で、`demo()` は利用者が `use` できる API ではない。利用者は block のコード例をコピーし、`fandhe_frontend_pre_styled_ui::*` / `fandhe_frontend_headless_ui::*` / `fandhe_frontend_core::*` の部品を合成して使う。
- すべての Demo は静的な表示例で、`<form>` 要素を持たず、ボタンは `type="button"` のまま送信先・状態管理を持たない。文言はすべて架空のデータ。
- `action-panel-with-input` の差分メモ: `field::root` / `field::label` は使わず、ラベルは `visually_hidden::root` で clip した実 `<label for>` 要素として組み立てる（`aria-label` による省略ではない）。入力欄の `id` は `FieldIds::control` で固定。
- 出典（pin SHA `cf5edb9b8f1bf2a63d51dcf50a8d2806e2d8f9f9`）: `crates/docs-site/src/blocks/application/action_panel/action_panel_with_input.rs`（コードは `// blocks-code:begin`〜`end` の範囲）、公式 md は `site/blocks/<slug>.md`。他 4 件も同ディレクトリの `action_panel_<slug_snake>.rs`。

## Related

- [Application Blocks overview](./overview.md)
- [Card](../../themes/data-display/card.md)
- [Button](../../themes/forms/button.md)
