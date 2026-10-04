# Docs Layout（Docs Blocks）

ドキュメントサイトのレイアウト部品（ページヘッダー・前後ページ導線・サイドバー・ページ内目次）の Blocks 7 件。Blocks は新規 API ではなく既存の Themes / Primitives / core 部品の合成例であり、各 block の公開物は未公開 crate `docs-site` 内部の `pub fn demo() -> Node` と `pub const BLOCK: Block` だけである。

## Signature / Usage

カテゴリ内で最も短い `docs-layout-prev-next` の `## Rust コード` の冒頭抜粋（`href` の文字列はコード内のデモ用相対パスで、このスキル内のリンクではない）。

```rust
use fandhe_frontend_core::{div, el, text, Node};
use fandhe_frontend_pre_styled_ui::card::{self, CardProps, CardVariant};
use fandhe_frontend_pre_styled_ui::icon::{icon, IconProps};
use fandhe_frontend_pre_styled_ui::link::{self, LinkProps};
use fandhe_frontend_pre_styled_ui::pagination::{self, next_trigger, prev_trigger, ItemMode};
use fandhe_frontend_pre_styled_ui::recipe::{ColorPalette, Size};
use fandhe_frontend_pre_styled_ui::text::{
    self as styled_text, TextProps, TextSize, TextVariant, TextWeight,
};

/// 自作の幾何アイコン（線画。モジュール doc「アイコンは自作の単純図形」
/// 節参照）。`path` へ `fill="none"` + `stroke="currentColor"` を明示し、
/// `icon` の `<svg>` 側が固定で持つ `fill="currentColor"`（塗り面）を
/// 上書きして線画（ストローク）として描画する。
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

/// 左向き矢印アイコン（シェブロン）。
fn left_arrow_icon() -> Node {
    geo_icon("M15 4l-8 8 8 8")
}

/// 右向き矢印アイコン（シェブロン）。
fn right_arrow_icon() -> Node {
    geo_icon("M9 4l8 8-8 8")
}

/// 方向ラベル（`前へ`/`次へ`）+ ページタイトルの縦積み（版 A）。
fn meta_stack(direction_label: &'static str, title: &'static str) -> Node {
    div(
        vec![("class", "blocks-docs-layout-prev-next-meta")],
        vec![
            styled_text::text(
                &TextProps {
                    size: TextSize::Xs,
                    variant: TextVariant::Muted,
                    ..TextProps::default()
                },
                vec![],
                vec![text(direction_label)],
            ),
            styled_text::text(
                &TextProps {
                    size: TextSize::Sm,
                    weight: TextWeight::Medium,
                    ..TextProps::default()
                },
                vec![],
                vec![text(title)],
            ),
        ],
    )
}
// ...（以下省略。全文は公式ページ https://fandhe-ai.github.io/fandhe-frontend/blocks/docs-layout-prev-next/ の「Rust コード」を参照）
```

## Blocks

| slug | 説明 | 使用部品（BLOCK.parts） | 公式 URL |
|------|------|------------------------|----------|
| docs-layout-page-header | ドキュメントページ上部のヘッダー（パンくず・見出し・説明・コピー操作・バッジ・コード表示） | [Breadcrumb](../../themes/navigation/breadcrumb.md) / [Heading](../../themes/typography/heading.md) / [Text](../../themes/typography/text.md) / [Button](../../themes/forms/button.md) / [Clipboard](../../themes/data-display/clipboard.md) / [Badge](../../themes/data-display/badge.md) / [Code](../../themes/typography/code.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/docs-layout-page-header/ |
| docs-layout-prev-next | ドキュメント本文末尾の前後ページ導線。版 A（方向ラベル + タイトルの縦積み）・版 B（前後 1 件ずつの 2 ボタン）・版 C（淡色帯 + 次側に概要文）を並記 | [Pagination](../../themes/collections/pagination.md) / [Link](../../themes/typography/link.md) / [Text](../../themes/typography/text.md) / [Icon](../../themes/data-display/icon.md) / [Card](../../themes/data-display/card.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/docs-layout-prev-next/ |
| docs-layout-sidebar-api | API ドキュメント用サイドバー（検索入力・スクロール領域・ナビリスト・バッジ・開閉セクション） | [Input Group](../../themes/forms/input-group.md) / [Input](../../themes/forms/input.md) / [Scroll Area](../../themes/disclosure/scroll-area.md) / [Nav List](../../themes/navigation/nav-list.md) / [Badge](../../themes/data-display/badge.md) / [Collapsible](../../themes/disclosure/collapsible.md) / [Link](../../themes/typography/link.md) / [Button](../../themes/forms/button.md) / [Icon](../../themes/data-display/icon.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/docs-layout-sidebar-api/ |
| docs-layout-sidebar-nav | ドキュメントサイト用サイドバー | [Nav List](../../themes/navigation/nav-list.md) / [Button](../../themes/forms/button.md) / [Kbd](../../themes/typography/kbd.md) / [Menu](../../themes/collections/menu.md) / [Accordion](../../themes/disclosure/accordion.md) / [Collapsible](../../themes/disclosure/collapsible.md) / [Switch](../../themes/forms/switch.md) / [Link](../../themes/typography/link.md) / [Icon](../../themes/data-display/icon.md) / [Drawer](../../themes/overlays/drawer.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/docs-layout-sidebar-nav/ |
| docs-layout-toc | ページ内目次（サイドバー用の基本形）。目次ラベルの下に節リンクを縦に並べ、階層は字下げ・現在節は強調。縦線あり（インスタンス A）と簡素版（B） | [Link](../../themes/typography/link.md) / [NavList](../../themes/navigation/nav-list.md) / [Heading](../../themes/typography/heading.md) / [Text](../../themes/typography/text.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/docs-layout-toc/ |
| docs-layout-toc-collapsible | 狭い画面向けの開閉式ページ内目次 | [Collapsible](../../themes/disclosure/collapsible.md) / [Link](../../themes/typography/link.md) / [Button](../../themes/forms/button.md) / [Icon](../../themes/data-display/icon.md) / [Heading](../../themes/typography/heading.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/docs-layout-toc-collapsible/ |
| docs-layout-toc-progress | ページ内目次（番号付き進捗トラック）。先頭 10 項目に番号を付けて縦に並べ、左の縦トラックで現在節までの読み進み位置を塗る | [Link](../../themes/typography/link.md) / [Text](../../themes/typography/text.md) / [Heading](../../themes/typography/heading.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/docs-layout-toc-progress/ |

## Notes

- 上記コードは公式 md `## Rust コード` の冒頭抜粋（元は約 194 行）。全文は公式ページを参照する。
- `docs-site` は crates.io 未公開 crate のため `use` できる API ではない。コードをコピーして `fandhe_frontend_pre_styled_ui::*` / `fandhe_frontend_core::*` の呼び出し規約の見本として使う前提。
- 全 block は無 JS の静的表示で `<form>` を持たない。`docs-layout-toc-progress` の現在位置は Demo 内で固定した静的表示で、scroll spy のような実行時更新は行わない。ページタイトル・概要文は架空。
- 差分メモ（`docs-layout-prev-next`）: 主参照 R0083（版 A）に R0081（版 B、前後 1 件ずつの 2 ボタン）・R0082（版 C、淡色帯 + 次側に概要文）を集約。版 A/B は `pagination` の `prev-trigger` / `next-trigger`（`ItemMode::Link`）、版 C は `card` の Subtle variant の帯の中に `pagination::root` + `link::root` を置く。コンテナ幅 32rem 未満（`@container`）で各 `nav` が縦積み。トリガーの固定高さは block の CSS で `height: auto` に解除。矢印アイコンは自作の線画（SVG path）。
- 他 6 block の差分メモは公式 md を参照（`docs-layout-page-header` は主参照 R0080・集約元 R0091 / R0079、`docs-layout-sidebar-api` は主参照 R0089、`docs-layout-sidebar-nav` は主参照 R0085・集約元 R0084 / R0086 / R0087 / R0088、`docs-layout-toc` は R0364（A）・R0365（B）、`docs-layout-toc-collapsible` は主参照 R0366、`docs-layout-toc-progress` は主参照 R0367）。
- 出典（pin SHA `cf5edb9b8f1bf2a63d51dcf50a8d2806e2d8f9f9`）: 公式 md `site/blocks/<slug>.md`、Rust ソース `crates/docs-site/src/blocks/docs/docs_layout/<slug_snake>.rs`。

## Related

- [Docs Blocks overview](./overview.md)
- [Code Block](./code-block.md)
- [API Reference](./api-reference.md)
