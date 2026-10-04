# Page Heading（Application Blocks）

ページ上部の見出し領域（操作ボタン・アバター・カバー画像・メタ情報・タブ・統計付きウェルカム）の合成例 6 件。Blocks は新規 API ではなく既存の Themes / Primitives / core 部品の合成例で、各 block の公開物は未公開 crate `docs-site` 内部の `pub fn demo() -> Node` と `pub const BLOCK: Block` だけである。

## Signature / Usage

カテゴリ内で最も短い `page-heading-cover`（カバー画像付きプロフィール見出し）の公式 `## Rust コード`。

```rust
use fandhe_frontend_core::{div, el, text, Node};
use fandhe_frontend_pre_styled_ui::avatar::{self, AvatarProps, ImageStatus};
use fandhe_frontend_pre_styled_ui::button::{self, ButtonProps, ButtonVariant};
use fandhe_frontend_pre_styled_ui::heading::{heading, HeadingLevel, HeadingProps, HeadingSize};
use fandhe_frontend_pre_styled_ui::icon::{icon, IconProps};
use fandhe_frontend_pre_styled_ui::image::{self, ImageFit, ImageProps};
use fandhe_frontend_pre_styled_ui::Size;

/// 自作の単純な幾何アイコン（`page_heading_actions.rs::geo_icon` と同型。
/// モジュール doc「アイコンは自作の単純幾何図形」参照）。開いた線分のみの
/// パスのため `fill="none"` + `stroke="currentColor"` でアウトライン描画
/// にする。
fn geo_icon(path_d: &'static str) -> Node {
    icon(
        &IconProps::default(),
        vec![],
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

/// 封筒アイコン（メッセージ送信操作）。
fn mail_icon() -> Node {
    geo_icon("M4 6h16v12H4z M4 6l8 7 8-7")
}

/// 受話器アイコン（電話操作）。
fn phone_icon() -> Node {
    geo_icon(
        "M6 3h4l2 5-2.5 2a11 11 0 0 0 5 5l2-2.5 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 4 5a2 2 0 0 1 2-2z",
    )
}

/// `page-heading-cover` の Demo 本体（呼び出しごとに同一の `Node` を返す
/// 純関数）。カバー画像 → アバター重なり + 名前 + 操作ボタン 2 個の 1
/// インスタンス構成（集約元が R1129 単独のため併記なし）。
pub fn demo() -> Node {
    let cover = div(
        vec![("data-blocks-page-heading-cover-cover", "")],
        vec![image::image(
            &ImageProps {
                fit: ImageFit::Cover,
                ..ImageProps::new(crate::blocks::dummy_assets::BACKGROUND_SRC, "")
            },
            vec![("data-blocks-page-heading-cover-cover-image", "")],
        )],
    );
    let avatar_node = avatar::root(
        &AvatarProps {
            size: Size::Xl,
            ..AvatarProps::default()
        },
        vec![("data-blocks-page-heading-cover-avatar", "")],
        vec![avatar::image(
            ImageStatus::Loaded,
            crate::blocks::dummy_assets::AVATAR_SRC,
            "",
            vec![],
        )],
    );
    let name = heading(
        HeadingLevel::H1,
        &HeadingProps {
            size: HeadingSize::Xl,
            ..HeadingProps::default()
        },
        vec![("data-blocks-page-heading-cover-name", "")],
        vec![text(crate::blocks::dummy_assets::PERSON_NAMES[0])],
    );
    let actions = div(
        vec![("data-blocks-page-heading-cover-actions", "")],
        vec![
            button::button(
                &ButtonProps {
                    variant: ButtonVariant::Outline,
                    ..ButtonProps::default()
                },
                vec![],
                vec![mail_icon(), text("メッセージ")],
            ),
            button::button(
                &ButtonProps {
                    variant: ButtonVariant::Outline,
                    ..ButtonProps::default()
                },
                vec![],
                vec![phone_icon(), text("電話")],
            ),
        ],
    );
    let header = div(
        vec![("data-blocks-page-heading-cover-header", "")],
        vec![avatar_node, name, actions],
    );
    div(
        vec![("class", "blocks-page-heading-cover-layout")],
        vec![cover, header],
    )
}
```

## Blocks

| Slug | Description | Parts | Official URL |
|------|-------------|-------|--------------|
| `page-heading-actions` | 操作ボタン（主操作・副操作）と三点メニュー付きのページ見出し。下罫線付き区画などの複数形を併記 | [Heading](../../themes/typography/heading.md), [Text](../../themes/typography/text.md), [Badge](../../themes/data-display/badge.md), [Button](../../themes/forms/button.md), [Button Group](../../themes/forms/button-group.md), [Menu](../../themes/collections/menu.md), [Breadcrumb](../../themes/navigation/breadcrumb.md), [Link](../../themes/typography/link.md), [Input Group](../../themes/forms/input-group.md), [Input](../../themes/forms/input.md), [Icon](../../themes/data-display/icon.md), [Avatar](../../themes/data-display/avatar.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/page-heading-actions/ |
| `page-heading-avatar` | 円形アバター（または企業ロゴ）・名前・補足行・操作ボタン列と三点メニューを横並びにした見出し | [Avatar](../../themes/data-display/avatar.md), [Image](../../themes/data-display/image.md), [Heading](../../themes/typography/heading.md), [Link](../../themes/typography/link.md), [Button](../../themes/forms/button.md), [Menu](../../themes/collections/menu.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/page-heading-avatar/ |
| `page-heading-cover` | カバー画像・重なる円形アバター・名前・連絡系ボタン 2 個のプロフィール見出し | [Image](../../themes/data-display/image.md), [Avatar](../../themes/data-display/avatar.md), [Heading](../../themes/typography/heading.md), [Button](../../themes/forms/button.md), [Icon](../../themes/data-display/icon.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/page-heading-cover/ |
| `page-heading-meta` | 見出し下にアイコン付きメタ情報（状態・場所・日付・担当）を一列に並べ、右側に操作ボタン群を置く見出し | [Heading](../../themes/typography/heading.md), [Badge](../../themes/data-display/badge.md), [Status](../../themes/data-display/status.md), [Icon](../../themes/data-display/icon.md), [Button](../../themes/forms/button.md), [Button Group](../../themes/forms/button-group.md), [Breadcrumb](../../themes/navigation/breadcrumb.md), [Clipboard](../../themes/data-display/clipboard.md), [Menu](../../themes/collections/menu.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/page-heading-meta/ |
| `page-heading-tabs` | セクションタブ付き見出し（below / inline / above / filter の 4 配置） | [Heading](../../themes/typography/heading.md), [Tab Nav](../../themes/navigation/tab-nav.md), [Button](../../themes/forms/button.md), [Native Select](../../themes/forms/native-select.md), [Segment Group](../../themes/collections/segment-group.md), [Menu](../../themes/collections/menu.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/page-heading-tabs/ |
| `page-heading-welcome-stats` | アバター・挨拶文・プロフィール導線ボタンと、区切り線で 3 分割した統計値の帯を持つウェルカム見出しカード | [Card](../../themes/data-display/card.md), [Avatar](../../themes/data-display/avatar.md), [Heading](../../themes/typography/heading.md), [Text](../../themes/typography/text.md), [Button](../../themes/forms/button.md), [Stat](../../themes/data-display/stat.md), [Separator](../../themes/utilities/separator.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/page-heading-welcome-stats/ |

## Notes

- Blocks は Themes / Primitives / core 部品の合成例で、`fandhe-frontend-pre-styled-ui` 等の公開 crate の API を使う側のコード例。`docs-site` crate は crates.io 未公開のため `use` できず、コードをコピーして利用する前提。`crate::blocks::dummy_assets` 等の `crate::` 参照は docs-site 内部のダミー素材で、コピー時に置き換える。
- 各 block の `BLOCK.parts` の label と公式 md 冒頭の使用部品は一致する（`BLOCK` の構造は [overview.md](./overview.md) を参照）。
- 静的表示（docs サイトは JS ハイドレーションを行わない）。ボタンは押下先を持たず、三点メニューは閉じた固定表示。開閉には `fandhe-frontend-wasm-full` の JS 配線が必要。
- 差分メモの要点: 各 block は参照元の配色・文言・アイコンを持ち込まず、既存の Themes トークンに揃える。アイコンは自作の単純幾何図形。複数の集約元がある block は複数形（例 A / B ...）を併記する。`page-heading-cover` は集約元が 1 件のみ。
- 出典（pin SHA `cf5edb9b8f1bf2a63d51dcf50a8d2806e2d8f9f9`）: 公式 md は `site/blocks/<slug>.md`、Rust ソースは `crates/docs-site/src/blocks/application/page_heading/<slug_snake>.rs`。

## Related

- [Application Blocks overview](./overview.md)
- [Card Heading](./card-heading.md)
- [Navbar](./navbar.md)
- [Heading](../../themes/typography/heading.md)
