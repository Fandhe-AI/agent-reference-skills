# Card Heading（Application Blocks）

カード・区画の上部見出し（題名のみ〜操作ボタン付き、ツールバー付き）の合成例 2 件。Blocks は新規 API ではなく既存の Themes / Primitives / core 部品の合成例で、各 block の公開物は未公開 crate `docs-site` 内部の `pub fn demo() -> Node` と `pub const BLOCK: Block` だけである。

## Signature / Usage

カテゴリ内で最も短い `card-heading-toolbar`（ツールバー付きの区画）の `## Rust コード` の冒頭抜粋。

```rust
use fandhe_frontend_core::{div, text, Node};
use fandhe_frontend_pre_styled_ui::badge::{self, BadgeProps};
use fandhe_frontend_pre_styled_ui::button::{self, ButtonProps, ButtonVariant};
use fandhe_frontend_pre_styled_ui::empty_state::{self, EmptyStateProps};
use fandhe_frontend_pre_styled_ui::field::{FieldIds, FieldProps};
use fandhe_frontend_pre_styled_ui::heading::{heading, HeadingLevel, HeadingProps, HeadingSize};
use fandhe_frontend_pre_styled_ui::input::{self, InputProps};
use fandhe_frontend_pre_styled_ui::input_group::{self, InputGroupAlign, InputGroupProps};
use fandhe_frontend_pre_styled_ui::menu::{self, OpenState};
use fandhe_frontend_pre_styled_ui::recipe::ColorPalette;
use fandhe_frontend_pre_styled_ui::separator::{self, SeparatorProps};
use fandhe_frontend_pre_styled_ui::text::{self as styled_text, TextProps, TextVariant};
use fandhe_frontend_pre_styled_ui::Size;

/// ヘッダー左側（見出し群）。
fn heading_group() -> Node {
    div(
        vec![("data-blocks-card-heading-toolbar-heading-group", "")],
        vec![
            div(
                vec![("data-blocks-card-heading-toolbar-title-row", "")],
                vec![
                    heading(
                        HeadingLevel::H3,
                        &HeadingProps {
                            size: HeadingSize::Xl,
                            ..HeadingProps::default()
                        },
                        vec![],
                        vec![text("進行中のタスク")],
                    ),
                    badge::badge(
                        &BadgeProps {
                            palette: ColorPalette::Neutral,
                            ..BadgeProps::default()
                        },
                        vec![],
                        vec![text("12 件")],
                    ),
                ],
            ),
            styled_text::text(
                &TextProps {
                    variant: TextVariant::Muted,
                    ..TextProps::default()
                },
                vec![],
                vec![text("担当者ごとの進捗をまとめて確認できます。")],
            ),
        ],
    )
}

/// 三点メニュー（無 JS のため閉じた状態で固定する。モジュール doc
/// 「三点メニューは無 JS のため閉じた状態で固定する」節参照）。
fn overflow_menu(content_id: &'static str) -> Node {
    let trigger = menu::trigger(
        OpenState::Closed,
        false,
        Some(content_id),
        vec![("aria-label", "その他の操作")],
        vec![text("\u{2026}")],
    );
    let content = menu::content(
        OpenState::Closed,
        Some(content_id),
        None,
        vec![],
        vec![
            menu::item("export", false, false, vec![], vec![text("書き出す")]),
            menu::item(
                "archive",
                false,
                false,
                vec![],
                vec![text("アーカイブする")],
            ),
            menu::separator(vec![], vec![]),
            menu::item("delete", false, false, vec![], vec![text("削除する")]),
        ],
    );
    let positioner = menu::positioner(OpenState::Closed, vec![], vec![content]);
    menu::root(
        Size::Sm,
        OpenState::Closed,
        vec![],
        vec![trigger, positioner],
    )
}
// ...（以下省略。全文は公式ページ https://fandhe-ai.github.io/fandhe-frontend/blocks/card-heading-toolbar/ の「Rust コード」を参照）
```

## Blocks

| Slug | Description | Parts | Official URL |
|------|-------------|-------|--------------|
| `card-heading-basic` | カード上部の最小構成の区画見出し 6 形（題名のみ / 題名 + 操作ボタン / アバター + 輪郭ボタン 2 個 / 題名 + 説明文 + 操作ボタン + テキストリンク / 題名 + 説明文のみ / アバター + メタ情報 + 三点メニュー）を縦に並べる | [Card](../../themes/data-display/card.md), [Heading](../../themes/typography/heading.md), [Text](../../themes/typography/text.md), [Avatar](../../themes/data-display/avatar.md), [Button](../../themes/forms/button.md), [Menu](../../themes/collections/menu.md), [Link](../../themes/typography/link.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/card-heading-basic/ |
| `card-heading-toolbar` | 見出し・件数バッジ・説明文（左）と、検索欄・操作ボタン・三点メニューのツールバー（右）を並べ、本文と最終更新時刻 + キャンセル/保存の操作行を持つ区画（プレースホルダ版と空状態版の 2 パネル） | [Heading](../../themes/typography/heading.md), [Badge](../../themes/data-display/badge.md), [Text](../../themes/typography/text.md), [Input Group](../../themes/forms/input-group.md), [Input](../../themes/forms/input.md), [Button](../../themes/forms/button.md), [Menu](../../themes/collections/menu.md), [Empty State](../../themes/feedback/empty-state.md), [Separator](../../themes/utilities/separator.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/card-heading-toolbar/ |

## Notes

- 上記コードは公式 md `## Rust コード` の冒頭抜粋（元は約 265 行）。全文は公式ページを参照する。
- Blocks は Themes / Primitives / core 部品の合成例で、公開 crate の API を使う側のコード例。`docs-site` crate は crates.io 未公開のため `use` できず、コードをコピーして利用する前提。
- 各 block の `BLOCK.parts` の label と公式 md 冒頭の使用部品は一致する（`BLOCK` の構造は [overview.md](./overview.md) を参照）。
- 静的表示（docs サイトは JS ハイドレーションを行わない）。`<form>` は出力せず、ボタンは `type="button"` のまま送信先を持たない。三点メニューは閉じた状態で固定し、開閉には `fandhe-frontend-wasm-full` の JS 配線が必要。文言はすべて架空で、実企業名・実クレデンシャル・PII を含まない。
- 差分メモの要点: `card-heading-basic` は下罫線の有無が形ごとに異なり、`data-blocks-card-heading-basic-divider` 属性で表現する（1・2・4 に付与、3・5・6 には付与しない）。`card-heading-toolbar` は 2 パネル間で `id` が重複しないよう接尾辞（`content` / `empty`）で一意化する。
- 出典（pin SHA `cf5edb9b8f1bf2a63d51dcf50a8d2806e2d8f9f9`）: 公式 md は `site/blocks/<slug>.md`、Rust ソースは `crates/docs-site/src/blocks/application/card_heading/<slug_snake>.rs`。

## Related

- [Application Blocks overview](./overview.md)
- [Page Heading](./page-heading.md)
- [Table](./table.md)
- [Card](../../themes/data-display/card.md)
