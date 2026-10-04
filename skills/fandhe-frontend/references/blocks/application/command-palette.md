# Command Palette（Application Blocks）

Command Palette は、ダイアログ内に検索欄と 2 ペイン（候補一覧・プレビュー）を置くコマンドパレットの合成例 1 件。blocks は新規 API ではなく既存の Themes / Primitives / core 部品の合成例で、各 block の公開物は未公開 crate docs-site 内部の `pub fn demo() -> Node` と `pub const BLOCK: Block` だけである。

## Signature / Usage

`command-palette-preview`（カテゴリ唯一の block）の `## Rust コード` の冒頭抜粋。

```rust
use crate::blocks::dummy_assets;
use fandhe_frontend_core::{div, el, text, Node};
use fandhe_frontend_pre_styled_ui::avatar::{self, AvatarProps, ImageStatus};
use fandhe_frontend_pre_styled_ui::button::{button, ButtonProps};
use fandhe_frontend_pre_styled_ui::command::{self, OpenState};
use fandhe_frontend_pre_styled_ui::data_list::{self, DataListOrientation, DataListProps};
use fandhe_frontend_pre_styled_ui::dialog::{self, ContentIds, DialogRole};
use fandhe_frontend_pre_styled_ui::heading::{heading, HeadingLevel, HeadingProps};
use fandhe_frontend_pre_styled_ui::recipe::Size;

const LIST_ID: &str = "blocks-command-palette-preview-list";
const RECENT_HEADING_ID: &str = "blocks-command-palette-preview-recent-heading";
const SUGGESTIONS_HEADING_ID: &str = "blocks-command-palette-preview-suggestions-heading";
const SELECTED_ITEM_ID: &str = "blocks-command-palette-preview-item-0";

/// 候補 1 件（アバター Sm + 氏名 + 役職）を `command::item` として組み立てる。
fn candidate_item(
    selected: bool,
    id: &'static str,
    value: &'static str,
    name: &'static str,
    title: &'static str,
) -> Node {
    command::item(
        selected,
        false,
        value,
        Some(id),
        vec![],
        vec![
            avatar::root(
                &AvatarProps {
                    size: Size::Sm,
                    ..AvatarProps::default()
                },
                vec![],
                vec![
                    avatar::image(ImageStatus::Loaded, dummy_assets::AVATAR_SRC, name, vec![]),
                    avatar::fallback(
                        ImageStatus::Loaded,
                        vec![],
                        vec![text(name.chars().take(1).collect::<String>())],
                    ),
                ],
            ),
            div(
                vec![("class", "blocks-command-palette-preview-item-body")],
                vec![
                    el("span", vec![], vec![text(name)]),
                    el(
                        "span",
                        vec![("class", "blocks-command-palette-preview-item-title")],
                        vec![text(title)],
                    ),
                ],
            ),
        ],
    )
}

/// ラベル・値の 1 行（`data_list::item` + `item-label` + `item-value`）を
/// 組み立てる。
fn row(label: &'static str, value: &'static str) -> Node {
    data_list::item(
        vec![],
        vec![
            data_list::item_label(vec![], vec![text(label)]),
            data_list::item_value(vec![], vec![text(value)]),
        ],
    )
}
// ...（以下省略。全文は公式ページ https://fandhe-ai.github.io/fandhe-frontend/blocks/command-palette-preview/ の「Rust コード」を参照）
```

## Blocks

| slug | 説明 | 使用部品 | 公式 URL |
|------|------|----------|----------|
| command-palette-preview | ダイアログ内の上部に検索欄、下部を左右 2 ペインに分割したコマンドパレット。左に「最近の検索」と「候補」の一覧、右に選択中候補のプレビュー（アバター・氏名・連絡先・送信ボタン） | [Command](../../themes/collections/command.md) / [Dialog](../../themes/overlays/dialog.md) / [Avatar](../../themes/data-display/avatar.md) / [Button](../../themes/forms/button.md) / [Heading](../../themes/typography/heading.md) / [Data List](../../themes/data-display/data-list.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/command-palette-preview/ |

## Notes

- 上記コードは公式 md `## Rust コード` の冒頭抜粋（元は約 265 行）。全文は公式ページを参照する。
- docs-site は crates.io 未公開の crate で、`demo()` は利用者が `use` できる API ではない。コードの `crate::blocks::dummy_assets`（架空の人名・役職・社名・アバター画像）も docs-site 内部で未公開のため、コピー利用時は自前のデータ・画像へ差し替える。
- Demo は無 JS の静的表示のみで、絞り込み・選択切替は行わない。候補一覧の先頭 1 件のみを選択中として固定表示し、`command::input` の `aria-activedescendant` を同じ id へ向ける。`<form>` は含まない。
- ダイアログは既に開いた状態のみを描き、`trigger` / `title` は置かない。見出しを持たない構成のため `content` の `aria-label` がアクセシブルネームを担う。狭幅（コンテナ幅 40rem 未満）ではプレビューを候補一覧の下へ移す。
- 出典（pin SHA `cf5edb9b8f1bf2a63d51dcf50a8d2806e2d8f9f9`）: `crates/docs-site/src/blocks/application/command_palette/command_palette_preview.rs`（コードは `// blocks-code:begin`〜`end` の範囲）、公式 md は `site/blocks/command-palette-preview.md`。

## Related

- [Application Blocks overview](./overview.md)
- [Command](../../themes/collections/command.md)
- [Dialog（Application Blocks）](./dialog.md)
