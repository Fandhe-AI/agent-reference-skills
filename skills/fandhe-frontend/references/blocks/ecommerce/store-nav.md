# Store Nav（Ecommerce Blocks）

ストア用ナビゲーション（2 行カテゴリ行・中央ロゴ・メガメニュー）の Blocks 3 件。Blocks は新規 API ではなく既存の Themes / Primitives / core 部品の合成例であり、各 block の公開物は未公開 crate `docs-site` 内部の `pub fn demo() -> Node` と `pub const BLOCK: Block` だけである。

## Signature / Usage

カテゴリ内で最も短い `store-nav-category-row` の `## Rust コード` の冒頭抜粋（`href` の文字列はコード内のデモ用相対パスで、このスキル内のリンクではない）。

```rust
use fandhe_frontend_core::{div, el, span, text, Node};
use fandhe_frontend_pre_styled_ui::button::{self, ButtonProps, ButtonVariant};
use fandhe_frontend_pre_styled_ui::icon::{self, IconProps};
use fandhe_frontend_pre_styled_ui::link::{self, LinkProps};
use fandhe_frontend_pre_styled_ui::navigation_menu::{self, NavigationMenuProps, OpenState};
use fandhe_frontend_pre_styled_ui::scroll_area;
use fandhe_frontend_pre_styled_ui::Size;

/// パネル項目 1 件（タイトル, href）。href はサイト内に実在する索引ページ・
/// 既存 block ページへの相対パス（モジュール冒頭 rustdoc「href の方針」節）。
type PanelItem = (&'static str, &'static str);

/// パネルの列 1 件（列見出し, 項目 4 件）。
type PanelColumn = (&'static str, [PanelItem; 4]);

/// 開いたカテゴリ（「コレクション」）が持つパネルの列一覧（列見出し +
/// 項目 4 件 × 3 列、画像なしの項目リスト）。
const PANEL_COLUMNS: [PanelColumn; 3] = [
    (
        "アウター",
        [
            ("コート", "../../themes/"),
            ("ジャケット", "../../primitives/"),
            ("ニット", "../../guides/"),
            ("パーカー", "../../examples/"),
        ],
    ),
    (
        "トップス",
        [
            ("シャツ", "../../themes/"),
            ("Tシャツ", "../../primitives/"),
            ("ブラウス", "../../guides/"),
            ("カットソー", "../../examples/"),
        ],
    ),
    (
        "アクセサリー",
        [
            ("バッグ", "../../api/"),
            ("ジュエリー", "../../themes/"),
            ("ベルト", "../../primitives/"),
            ("帽子", "../../guides/"),
        ],
    ),
];

/// 開いたカテゴリの value/ラベル。
const OPEN_CATEGORY: (&str, &str) = ("collection", "コレクション");

/// トリガーを持たない、リンクのみのカテゴリ一覧（value, ラベル, href）。
const LINK_CATEGORIES: [(&str, &str, &str); 7] = [
    ("women", "レディース", "../../themes/"),
    ("men", "メンズ", "../../primitives/"),
    ("kids", "キッズ", "../../guides/"),
    ("shoes", "シューズ", "../../examples/"),
    ("bags", "バッグ", "../../api/"),
    (
        "accessories",
        "アクセサリー",
        "../../blocks/promo-collection-cards/",
    ),
    ("sale", "セール", "../../blocks/category-split-panels/"),
];

/// 広い幅インスタンスのトリガー `id`。
const WIDE_TRIGGER_ID: &str = "blocks-store-nav-category-row-wide-trigger";
/// 広い幅インスタンスの `content` `id`。
const WIDE_CONTENT_ID: &str = "blocks-store-nav-category-row-wide-content";
/// 狭い幅インスタンスのトリガー `id`。
const NARROW_TRIGGER_ID: &str = "blocks-store-nav-category-row-narrow-trigger";
/// 狭い幅インスタンスの `content` `id`。
const NARROW_CONTENT_ID: &str = "blocks-store-nav-category-row-narrow-content";
// ...（以下省略。全文は公式ページ https://fandhe-ai.github.io/fandhe-frontend/blocks/store-nav-category-row/ の「Rust コード」を参照）
```

## Blocks

| slug | 説明 | 使用部品（BLOCK.parts） | 公式 URL |
|------|------|------------------------|----------|
| store-nav-category-row | 2 行構成のストアナビ。1 行目にロゴ・検索・カート、2 行目をカテゴリのトリガー行として常時表示し、狭い幅では横スクロール | [Navigation Menu](../../themes/navigation/navigation-menu.md) / [Link](../../themes/typography/link.md) / [Button](../../themes/forms/button.md) / [Icon](../../themes/data-display/icon.md) / [Scroll Area](../../themes/disclosure/scroll-area.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/store-nav-category-row/ |
| store-nav-centered-logo | 中央にロゴを配置したストアナビゲーション | [Navigation Menu](../../themes/navigation/navigation-menu.md) / [Link](../../themes/typography/link.md) / [Button](../../themes/forms/button.md) / [Icon](../../themes/data-display/icon.md) / [Image](../../themes/data-display/image.md) / [Drawer](../../themes/overlays/drawer.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/store-nav-centered-logo/ |
| store-nav-mega-menu | 上部帯 + メガメニュー付きストアナビゲーション | [Navigation Menu](../../themes/navigation/navigation-menu.md) / [Link](../../themes/typography/link.md) / [Button](../../themes/forms/button.md) / [Icon](../../themes/data-display/icon.md) / [Image](../../themes/data-display/image.md) / [Native Select](../../themes/forms/native-select.md) / [Badge](../../themes/data-display/badge.md) / [Drawer](../../themes/overlays/drawer.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/store-nav-mega-menu/ |

## Notes

- 上記コードは公式 md `## Rust コード` の冒頭抜粋（元は約 328 行）。全文は公式ページを参照する。
- `docs-site` は crates.io 未公開 crate のため `use` できる API ではない。コードをコピーして `fandhe_frontend_pre_styled_ui::*` / `fandhe_frontend_core::*` の呼び出し規約の見本として使う前提。
- 全 block は静的な表示例で、`<form>` を持たない。開いたカテゴリのトリガー、検索・カートの操作アイコンボタンは送信先・遷移先を持たない `disabled` 表示。ブランド名・文言は架空。
- 差分メモ（`store-nav-category-row`）: 参照では全カテゴリがトリガーだが、本 block は開いた「コレクション」1 件だけを trigger にし他はリンクのみ。参照の 2 列メニューに対し 3 列グループを auto-fit で並べ、幅に応じて列数が減る。パネルはカテゴリ一覧（`list`）の外に置き通常フローで表示。画像は持たない。
- 他 2 block の差分メモは公式 md を参照（`store-nav-centered-logo` は主参照 R1316・集約元 1 件のみ、`store-nav-mega-menu` は主参照 R0711）。
- 出典（pin SHA `cf5edb9b8f1bf2a63d51dcf50a8d2806e2d8f9f9`）: 公式 md `site/blocks/<slug>.md`、Rust ソース `crates/docs-site/src/blocks/ecommerce/store_nav/<slug_snake>.rs`。

## Related

- [Ecommerce Blocks overview](./overview.md)
- [Category](./category.md)
- [Cart](./cart.md)
- [Promo](./promo.md)
