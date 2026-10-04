# Grid List（Application Blocks）

カード・タイル・サムネイルをグリッドに並べる一覧（アクションタイル・コンパクトタイル・連絡先カード・ファイルサムネイル・取引先カード）の合成例 5 件。Blocks は新規 API ではなく既存の Themes / Primitives / core 部品の合成例で、各 block の公開物は未公開 crate `docs-site` 内部の `pub fn demo() -> Node` と `pub const BLOCK: Block` だけである。

## Signature / Usage

カテゴリ内で最も短い `grid-list-file-thumbnails`（画像サムネイルのグリッド）の公式 `## Rust コード`。

```rust
use crate::blocks::dummy_assets;
use fandhe_frontend_core::{div, p, text, Node};
use fandhe_frontend_pre_styled_ui::button::{self, ButtonProps, ButtonVariant};
use fandhe_frontend_pre_styled_ui::image::{self, AspectRatio, ImageProps};
use fandhe_frontend_pre_styled_ui::list::{self, ListType, ListVariant};
use fandhe_frontend_pre_styled_ui::text::{self as styled_text, TextProps, TextSize, TextVariant};
use fandhe_frontend_pre_styled_ui::visually_hidden;

/// 架空のファイル名とサイズのセット（12 件。12 は 2/3/4 いずれの列数でも
/// 割り切れる最小公倍数のため、2/3/4 列のいずれでも最終行が埋まる）。実在の
/// 人名・社名・PII は含まない。
const FILES: [(&str, &str); 12] = [
    ("IMG_4821.jpg", "3.9 MB"),
    ("harbor-sunset.png", "2.4 MB"),
    ("team-offsite-04.jpg", "5.1 MB"),
    ("product-mockup-v2.png", "1.8 MB"),
    ("mountain-trail.jpg", "4.6 MB"),
    ("workshop-notes.png", "0.9 MB"),
    ("studio-shelf.jpg", "3.2 MB"),
    ("river-bridge-evening.jpg", "6.0 MB"),
    ("conference-badge.png", "0.7 MB"),
    ("rooftop-garden.jpg", "4.1 MB"),
    ("archive-notes-scan.png", "1.2 MB"),
    ("lakeside-cabin.jpg", "5.5 MB"),
];

/// [`FILES`] のインデックスへ循環割当するサムネイル `src` の候補
/// （`dummy_assets` の 5 種すべて。PR #3364 Codex(P2) 指摘の是正、モジュール
/// doc 参照）。
const THUMBNAIL_SRCS: [&str; 5] = [
    dummy_assets::PRODUCT_SRC,
    dummy_assets::AVATAR_SRC,
    dummy_assets::LOGO_SRC,
    dummy_assets::SCREENSHOT_SRC,
    dummy_assets::BACKGROUND_SRC,
];

/// キャプション（見出し代わりの短い説明文）。
fn caption() -> Node {
    p(
        vec![("class", "blocks-grid-list-file-thumbnails-caption")],
        vec![text("最近アップロードした画像")],
    )
}

/// グリッド 1 セル分（サムネイル全体を「詳細を表示」ボタンにし、下へ
/// ファイル名・サイズを表示する）。`thumbnail_src` は [`THUMBNAIL_SRCS`] を
/// 呼び出し側が循環割当した値。
fn cell(name: &str, size: &str, thumbnail_src: &str) -> Node {
    let sr_label = format!("{name} の詳細を表示");
    let trigger = button::button(
        &ButtonProps {
            variant: ButtonVariant::Plain,
            ..ButtonProps::default()
        },
        vec![("data-blocks-grid-list-file-thumbnails-trigger", "")],
        vec![
            image::image(
                &ImageProps {
                    aspect_ratio: AspectRatio::Landscape,
                    ..ImageProps::new(thumbnail_src, "")
                },
                vec![("data-blocks-grid-list-file-thumbnails-image", "")],
            ),
            visually_hidden::root(vec![], vec![text(&sr_label)]),
        ],
    );
    let meta = div(
        vec![("data-blocks-grid-list-file-thumbnails-meta", "")],
        vec![
            styled_text::text(&TextProps::default(), vec![], vec![text(name)]),
            styled_text::text(
                &TextProps {
                    variant: TextVariant::Muted,
                    size: TextSize::Sm,
                    ..TextProps::default()
                },
                vec![],
                vec![text(size)],
            ),
        ],
    );
    list::item(
        vec![("data-blocks-grid-list-file-thumbnails-item", "")],
        vec![trigger, meta],
    )
}

/// `grid-list-file-thumbnails` の Demo 本体。呼び出しごとに同一の `Node`
/// を返す純関数。
pub fn demo() -> Node {
    let items = FILES
        .iter()
        .enumerate()
        .map(|(i, (name, size))| cell(name, size, THUMBNAIL_SRCS[i % THUMBNAIL_SRCS.len()]))
        .collect();
    let grid = list::root(
        ListType::Unordered,
        ListVariant::Plain,
        vec![("data-blocks-grid-list-file-thumbnails-grid", "")],
        items,
    );
    div(
        vec![("class", "blocks-grid-list-file-thumbnails-stack")],
        vec![caption(), grid],
    )
}
```

## Blocks

| Slug | Description | Parts | Official URL |
|------|-------------|-------|--------------|
| `grid-list-action-tiles` | 境界線を共有するアクションタイルのグリッド（面色付きアイコン枠・見出し・説明文・右上の矢印） | [Item](../../themes/data-display/item.md), [Icon](../../themes/data-display/icon.md), [Heading](../../themes/typography/heading.md), [Text](../../themes/typography/text.md), [Link Overlay](../../themes/typography/link-overlay.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/grid-list-action-tiles/ |
| `grid-list-compact-tiles` | コンパクトな横長タイルをグリッドに並べる（「固定したプロジェクト」など配置の異なる 2 variant） | [List](../../themes/typography/list.md), [Avatar](../../themes/data-display/avatar.md), [Heading](../../themes/typography/heading.md), [Link](../../themes/typography/link.md), [Link Overlay](../../themes/typography/link-overlay.md), [Button](../../themes/forms/button.md), [Menu](../../themes/collections/menu.md), [Item](../../themes/data-display/item.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/grid-list-compact-tiles/ |
| `grid-list-contact-cards` | 連絡先カードを 1〜4 列に並べ、下端に「メール」「電話」の 2 分割アクションを置く | [Card](../../themes/data-display/card.md), [Avatar](../../themes/data-display/avatar.md), [Badge](../../themes/data-display/badge.md), [Button](../../themes/forms/button.md), [Icon](../../themes/data-display/icon.md), [List](../../themes/typography/list.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/grid-list-contact-cards/ |
| `grid-list-file-thumbnails` | 画像サムネイルを 2〜4 列に並べ、下にファイル名とサイズを表示（サムネイル全体が「詳細を表示」ボタン） | [Image](../../themes/data-display/image.md), [Button](../../themes/forms/button.md), [Text](../../themes/typography/text.md), [List](../../themes/typography/list.md), [Visually Hidden](../../themes/utilities/visually-hidden.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/grid-list-file-thumbnails/ |
| `grid-list-logo-cards` | ロゴまたはイニシャルアバター・社名・三点メニューのヘッダーと、定義リスト・支払状態バッジを持つ取引先カード | [Card](../../themes/data-display/card.md), [Avatar](../../themes/data-display/avatar.md), [Image](../../themes/data-display/image.md), [Data List](../../themes/data-display/data-list.md), [Badge](../../themes/data-display/badge.md), [Menu](../../themes/collections/menu.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/grid-list-logo-cards/ |

## Notes

- Blocks は Themes / Primitives / core 部品の合成例で、公開 crate の API を使う側のコード例。`docs-site` crate は crates.io 未公開のため `use` できず、コードをコピーして利用する前提。`crate::blocks::dummy_assets` は docs-site 内部のダミー素材で、コピー時に自前の画像 URL へ置き換える。
- 各 block の `BLOCK.parts` の label と公式 md 冒頭の使用部品は一致する（`BLOCK` の構造は [overview.md](./overview.md) を参照）。
- 静的表示（docs サイトは JS ハイドレーションを行わない）。ボタン・三点メニューは閉じた固定表示で、開閉には `fandhe-frontend-wasm-full` の JS 配線が必要。文言・人名・ファイル名・金額は架空で、実在の企業・人物・PII を含まない。
- 差分メモの要点: 参照元の配色・文言・アイコンは持ち込まず、領域配置・部品構成・状態の見せ方のみを取り込む。`grid-list-file-thumbnails` の `visually-hidden` は `fandhe-frontend-headless-ui` 由来の部品。`grid-list-file-thumbnails` は集約元が 1 件のみで差分の並記はない。
- 出典（pin SHA `cf5edb9b8f1bf2a63d51dcf50a8d2806e2d8f9f9`）: 公式 md は `site/blocks/<slug>.md`、Rust ソースは `crates/docs-site/src/blocks/application/grid_list/<slug_snake>.rs`。

## Related

- [Application Blocks overview](./overview.md)
- [List](./list.md)
- [Card](./card.md)
- [Description List](./description-list.md)
