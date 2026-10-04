# List（Application Blocks）

人物・アクティビティ・タイトル + メタ行などを縦に並べる一覧（Stacked List 系）の合成例 5 件。Blocks は新規 API ではなく既存の Themes / Primitives / core 部品の合成例で、各 block の公開物は未公開 crate `docs-site` 内部の `pub fn demo() -> Node` と `pub const BLOCK: Block` だけである。

## Signature / Usage

カテゴリ内で最も短い `list-sticky-groups`（頭文字ごとにグループ化した人物ディレクトリ）の `## Rust コード` の冒頭抜粋。

```rust
use fandhe_frontend_core::{div, text, Node};
use fandhe_frontend_pre_styled_ui::avatar::{self, AvatarProps, ImageStatus};
use fandhe_frontend_pre_styled_ui::heading::{heading, HeadingLevel, HeadingProps, HeadingSize};
use fandhe_frontend_pre_styled_ui::list::{self, ListType, ListVariant};
use fandhe_frontend_pre_styled_ui::scroll_area;
use fandhe_frontend_pre_styled_ui::Size;

/// 頭文字グループ順の人物ディレクトリ（架空。頭文字と (名前, メール) の組の
/// 配列）。あらかじめ頭文字順に並べた状態で持ち、実行時にソート・グループ
/// 化は行わない。スクロールが確実に起きる件数（6 グループ・合計 16 人）に
/// している。
const GROUPS: &[(&str, &[(&str, &str)])] = &[
    (
        "A",
        &[
            ("安藤 明", "akira.ando@example.com"),
            ("荒木 愛子", "aiko.araki@example.com"),
        ],
    ),
    (
        "C",
        &[
            ("千葉 智也", "tomoya.chiba@example.com"),
            ("近藤 千夏", "chinatsu.kondo@example.com"),
            ("千田 治郎", "jiro.chida@example.com"),
        ],
    ),
    (
        "F",
        &[
            ("藤原 文子", "fumiko.fujiwara@example.com"),
            ("福田 太郎", "taro.fukuda@example.com"),
        ],
    ),
    (
        "M",
        &[
            ("松本 まどか", "madoka.matsumoto@example.com"),
            ("三浦 実", "minoru.miura@example.com"),
            ("森田 美咲", "misaki.morita@example.com"),
            ("宮本 学", "manabu.miyamoto@example.com"),
        ],
    ),
    (
        "S",
        &[
            ("佐々木 進", "susumu.sasaki@example.com"),
            ("清水 幸子", "sachiko.shimizu@example.com"),
            ("杉山 聡", "satoshi.sugiyama@example.com"),
        ],
    ),
    (
        "Y",
        &[
            ("山口 洋子", "yoko.yamaguchi@example.com"),
            ("吉田 裕也", "yuya.yoshida@example.com"),
        ],
    ),
];

/// 名前の先頭 1 文字をアバターのフォールバック表示に使う
/// （`content_article`/`list_narrow_activity` と同じ判断）。
fn initial_avatar(name: &str) -> Node {
    let initial: String = name
        .split_whitespace()
        .filter_map(|part| part.chars().next())
        .collect();
    avatar::root(
        &AvatarProps {
            size: Size::Sm,
            ..AvatarProps::default()
        },
        vec![],
        vec![avatar::fallback(
            ImageStatus::Error,
            vec![],
            vec![text(initial)],
        )],
    )
}
// ...（以下省略。全文は公式ページ https://fandhe-ai.github.io/fandhe-frontend/blocks/list-sticky-groups/ の「Rust コード」を参照）
```

## Blocks

| Slug | Description | Parts | Official URL |
|------|-------------|-------|--------------|
| `list-container` | 同一の行データ（タイトル + 説明）を 4 通りの容器（区切り線付きの単純リスト、外枠付きカード内のリスト ほか）に並べる | [Item](../../themes/data-display/item.md), [Card](../../themes/data-display/card.md), [Separator](../../themes/utilities/separator.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/list-container/ |
| `list-narrow-activity` | サイドパネルや補助カラム向けの狭幅アクティビティリスト（名前・時刻・本文の版と、コミット活動を 1 行に要約した版の 2 インスタンス） | [List](../../themes/typography/list.md), [Avatar](../../themes/data-display/avatar.md), [Text](../../themes/typography/text.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/list-narrow-activity/ |
| `list-people` | 人物のスタックリスト。1 行に「アバター・名前・メール」と右側メタ欄（役職・最終ログイン状態）を持ち、`40rem` 以上のコンテナ幅でメタ欄が右寄せの横並びに切り替わる | [List](../../themes/typography/list.md), [Avatar](../../themes/data-display/avatar.md), [Link](../../themes/typography/link.md), [Link Overlay](../../themes/typography/link-overlay.md), [Button](../../themes/forms/button.md), [Menu](../../themes/collections/menu.md), [Card](../../themes/data-display/card.md), [Status](../../themes/data-display/status.md), [Visually Hidden](../../themes/utilities/visually-hidden.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/list-people/ |
| `list-sticky-groups` | 頭文字ごとにグループ化した人物ディレクトリ。固定高のスクロール領域内でグループ見出しが sticky で貼り付く | [List](../../themes/typography/list.md), [Avatar](../../themes/data-display/avatar.md), [Heading](../../themes/typography/heading.md), [Scroll Area](../../themes/disclosure/scroll-area.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/list-sticky-groups/ |
| `list-title-meta` | 1 行目にタイトル（+ ステータス表示）、2 行目に日付・作成者などのメタ情報を並べる 2 段構成のリスト。右端の付随要素だけが異なる 3 インスタンス | [List](../../themes/typography/list.md), [Badge](../../themes/data-display/badge.md), [Status](../../themes/data-display/status.md), [Avatar](../../themes/data-display/avatar.md), [Button](../../themes/forms/button.md), [Menu](../../themes/collections/menu.md), [Link](../../themes/typography/link.md), [Link Overlay](../../themes/typography/link-overlay.md), [Visually Hidden](../../themes/utilities/visually-hidden.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/list-title-meta/ |

## Notes

- 上記コードは公式 md `## Rust コード` の冒頭抜粋（元は約 151 行）。全文は公式ページを参照する。
- Blocks は Themes / Primitives / core 部品の合成例で、公開 crate の API を使う側のコード例。`docs-site` crate は crates.io 未公開のため `use` できず、コードをコピーして利用する前提。
- 各 block の `BLOCK.parts` の label と公式 md 冒頭の使用部品は一致する（`BLOCK` の構造は [overview.md](./overview.md) を参照）。
- 静的表示（docs サイトは JS ハイドレーションを行わない）。データ取得・送信は行わず `<form>` は使わない。文言・人名・日時は架空で、メールは予約ドメイン `example.com` を使う（`mailto:` リンクにはしない）。
- 差分メモの要点: `list-narrow-activity` の省略は CSS のみ（`-webkit-line-clamp` / `text-overflow: ellipsis`）で行い、DOM には全文が残る。`list-sticky-groups` の見出しは `position: sticky` のみで実現し、スクロール領域は `scroll-area` の Viewport（`role="region"` + `aria-label`）でキーボードスクロール可能、アバターは名前の頭文字の fallback 表示。集約元からは領域配置・部品構成・状態の見せ方といった構造のみを取り込む。
- 出典（pin SHA `cf5edb9b8f1bf2a63d51dcf50a8d2806e2d8f9f9`）: 公式 md は `site/blocks/<slug>.md`、Rust ソースは `crates/docs-site/src/blocks/application/list/<slug_snake>.rs`。

## Related

- [Application Blocks overview](./overview.md)
- [Grid List](./grid-list.md)
- [Table](./table.md)
- [List](../../themes/typography/list.md)
