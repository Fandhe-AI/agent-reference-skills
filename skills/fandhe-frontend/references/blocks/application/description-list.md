# Description List（Application Blocks）

ラベルと値の組を並べる説明リスト（横並び・サマリーカード・2 カラム）の合成例 3 件。Blocks は新規 API ではなく既存の Themes / Primitives / core 部品の合成例で、各 block の公開物は未公開 crate `docs-site` 内部の `pub fn demo() -> Node` と `pub const BLOCK: Block` だけである。

## Signature / Usage

カテゴリ内で最も短い `description-list-two-column`（2 カラムの説明リスト）の `## Rust コード` の冒頭抜粋。

```rust
use crate::blocks::dummy_assets;
use fandhe_frontend_core::{div, li, p, text, ul, Node};
use fandhe_frontend_pre_styled_ui::attachment::{self, AttachmentRootProps};
use fandhe_frontend_pre_styled_ui::button::{self, ButtonProps, ButtonVariant};
use fandhe_frontend_pre_styled_ui::data_list::{self, DataListOrientation, DataListProps};
use fandhe_frontend_pre_styled_ui::heading::{self, HeadingLevel, HeadingProps};
use fandhe_frontend_pre_styled_ui::text::{self as styled_text, TextProps, TextSize, TextVariant};
use fandhe_frontend_pre_styled_ui::Size;

/// 概要欄の架空の紹介文（検索インデックス容量対策で 2〜3 文に抑える）。
const SUMMARIES: &[&str] = &[
    "在宅勤務を中心とした働き方への切り替えを希望しています。\
     チーム内の定例は既存のオンライン会議のまま継続する想定です。",
    "隣接チームとの兼務を解消し、現チームの業務に専念したいという申請です。\
     引き継ぎ期間として 2 週間を見込んでいます。",
];

/// 添付ファイル 1 件（`media` に拡張子表記、`content` に名前・サイズ、
/// `actions` にダウンロードボタンを置く）。
fn attachment_item(extension: &str, name: &str, size: &str) -> Node {
    li(
        vec![],
        vec![attachment::root(
            AttachmentRootProps::default(),
            vec![],
            vec![
                attachment::media(
                    vec![],
                    vec![styled_text::text(
                        &TextProps {
                            size: TextSize::Xs,
                            variant: TextVariant::Muted,
                            ..TextProps::default()
                        },
                        vec![],
                        vec![text(extension)],
                    )],
                ),
                attachment::content(
                    vec![],
                    vec![
                        attachment::name(vec![], vec![text(name)]),
                        attachment::meta(vec![], vec![text(size)]),
                    ],
                ),
                attachment::actions(
                    vec![],
                    vec![button::button(
                        &ButtonProps {
                            variant: ButtonVariant::Ghost,
                            size: Size::Sm,
                            ..ButtonProps::default()
                        },
                        vec![],
                        vec![text("ダウンロード")],
                    )],
                ),
            ],
        )],
    )
}

/// 半幅の項目（ラベル + 値）1 件。
fn field(label: &str, value: &str) -> Node {
    data_list::item(
        vec![],
        vec![
            data_list::item_label(vec![], vec![text(label)]),
            data_list::item_value(vec![], vec![text(value)]),
        ],
    )
}

/// 全幅の項目（`data-blocks-description-list-two-column-span="full"` 付き）。
fn field_full(label: &str, value_children: Vec<Node>) -> Node {
    data_list::item(
        vec![("data-blocks-description-list-two-column-span", "full")],
        vec![
            data_list::item_label(vec![], vec![text(label)]),
            data_list::item_value(vec![], value_children),
        ],
    )
}
// ...（以下省略。全文は公式ページ https://fandhe-ai.github.io/fandhe-frontend/blocks/description-list-two-column/ の「Rust コード」を参照）
```

## Blocks

| Slug | Description | Parts | Official URL |
|------|-------------|-------|--------------|
| `description-list-horizontal` | 見出し・説明文・操作ボタンの行の下に、ラベル左・値右の横並び説明リストを置く（添付ファイル行を含む複数形を併記） | [Data List](../../themes/data-display/data-list.md), [Heading](../../themes/typography/heading.md), [Text](../../themes/typography/text.md), [Button](../../themes/forms/button.md), [Card](../../themes/data-display/card.md), [Attachment](../../themes/data-display/attachment.md), [Link](../../themes/typography/link.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/description-list-horizontal/ |
| `description-list-summary-card` | 上段に金額と支払状態バッジ、下段に担当者・期日・支払方法をアイコン付きの行で縦に並べるサマリーカード | [Card](../../themes/data-display/card.md), [Data List](../../themes/data-display/data-list.md), [Badge](../../themes/data-display/badge.md), [Icon](../../themes/data-display/icon.md), [Link](../../themes/typography/link.md), [Visually Hidden](../../themes/utilities/visually-hidden.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/description-list-summary-card/ |
| `description-list-two-column` | ラベルを値の上に積み 2 列グリッドに並べる説明リスト。概要・添付ファイル一覧は全幅（2 インスタンス併記） | [Data List](../../themes/data-display/data-list.md), [Heading](../../themes/typography/heading.md), [Text](../../themes/typography/text.md), [Attachment](../../themes/data-display/attachment.md), [Button](../../themes/forms/button.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/description-list-two-column/ |

## Notes

- 上記コードは公式 md `## Rust コード` の冒頭抜粋（元は約 190 行）。全文は公式ページを参照する。
- Blocks は Themes / Primitives / core 部品の合成例で、公開 crate の API を使う側のコード例。`docs-site` crate は crates.io 未公開のため `use` できず、コードをコピーして利用する前提。`crate::blocks::dummy_assets` は docs-site 内部のダミー素材で、コピー時に置き換える。
- 各 block の `BLOCK.parts` の label と公式 md 冒頭の使用部品は一致する（`BLOCK` の構造は [overview.md](./overview.md) を参照）。
- 静的表示で、氏名・金額・期日・ファイル名は架空データ。`description-list-two-column` は 2 インスタンス（操作ボタンなし / 見出し行に操作ボタンあり）を併記する。
- 出典（pin SHA `cf5edb9b8f1bf2a63d51dcf50a8d2806e2d8f9f9`）: 公式 md は `site/blocks/<slug>.md`、Rust ソースは `crates/docs-site/src/blocks/application/description_list/<slug_snake>.rs`。

## Related

- [Application Blocks overview](./overview.md)
- [Grid List](./grid-list.md)
- [Settings](./settings.md)
- [Data List](../../themes/data-display/data-list.md)
