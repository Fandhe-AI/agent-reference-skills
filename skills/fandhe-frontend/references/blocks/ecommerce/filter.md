# Filter（Ecommerce Blocks）

商品一覧の絞り込み・並び替え（ドロップダウンバー・開閉パネル・オーバーレイ・サイドバー）の Blocks 4 件。Blocks は新規 API ではなく既存の Themes / Primitives / core 部品の合成例であり、各 block の公開物は未公開 crate `docs-site` 内部の `pub fn demo() -> Node` と `pub const BLOCK: Block` だけである。

## Signature / Usage

カテゴリ内で最も短い `filter-expandable-panel` の `## Rust コード` の冒頭抜粋。

```rust
use fandhe_frontend_core::{div, span, text, Node};
use fandhe_frontend_pre_styled_ui::button::{self, ButtonProps, ButtonVariant};
use fandhe_frontend_pre_styled_ui::checkbox::{self, CheckboxProps, CheckedState};
use fandhe_frontend_pre_styled_ui::collapsible::{self, OpenState};
use fandhe_frontend_pre_styled_ui::fieldset::{self, FieldsetProps, FieldsetRootProps};
use fandhe_frontend_pre_styled_ui::menu;
use fandhe_frontend_pre_styled_ui::separator::{self, SeparatorProps};
use fandhe_frontend_pre_styled_ui::{ColorPalette, Orientation, Size};

/// フィルタパネルの `id`（collapsible trigger の `aria-controls` が指す先）。
const PANEL_ID: &str = "blocks-filter-expandable-panel-panel";
/// 並び替えメニューの trigger/content の `id`。
const SORT_TRIGGER_ID: &str = "blocks-filter-expandable-panel-sort-trigger";
const SORT_CONTENT_ID: &str = "blocks-filter-expandable-panel-sort-content";

/// 1 項目分のチェックボックス定義（value, label, 既定チェック状態）。
type CheckOption = (&'static str, &'static str, bool);

/// 1 フィルタ群の定義（group id, legend, input name, 項目一覧）。
type FilterGroup = (
    &'static str,
    &'static str,
    &'static str,
    &'static [CheckOption],
);

/// 価格帯フィルタ（4 項目、チェック済みは 1 件）。
const PRICE_OPTIONS: &[CheckOption] = &[
    ("under-3000", "¥3,000 以下", false),
    ("3000-8000", "¥3,000〜8,000", true),
    ("8000-15000", "¥8,000〜15,000", false),
    ("over-15000", "¥15,000 以上", false),
];

/// 色フィルタ（4 項目、チェック済みは 1 件）。
const COLOR_OPTIONS: &[CheckOption] = &[
    ("black", "ブラック", false),
    ("white", "ホワイト", true),
    ("navy", "ネイビー", false),
    ("beige", "ベージュ", false),
];

/// サイズフィルタ（4 項目、チェック済みは 1 件）。
const SIZE_OPTIONS: &[CheckOption] = &[
    ("s", "S", false),
    ("m", "M", false),
    ("l", "L", true),
    ("xl", "XL", false),
];

/// カテゴリフィルタ（4 項目、チェック済みは 0 件）。
const CATEGORY_OPTIONS: &[CheckOption] = &[
    ("tops", "トップス", false),
    ("bottoms", "ボトムス", false),
    ("outerwear", "アウター", false),
    ("accessories", "アクセサリー", false),
];

/// パネルが並べる 4 フィルタ群（単一の真実源。[`applied_count`] が
/// ここから件数を数え上げる）。
const GROUPS: &[FilterGroup] = &[
    (
        "price",
        "価格",
        "blocks-filter-expandable-panel-price",
        PRICE_OPTIONS,
    ),
    (
        "color",
        "色",
        "blocks-filter-expandable-panel-color",
        COLOR_OPTIONS,
    ),
    (
        "size",
        "サイズ",
        "blocks-filter-expandable-panel-size",
        SIZE_OPTIONS,
    ),
    (
        "category",
        "カテゴリ",
        "blocks-filter-expandable-panel-category",
        CATEGORY_OPTIONS,
    ),
];
// ...（以下省略。全文は公式ページ https://fandhe-ai.github.io/fandhe-frontend/blocks/filter-expandable-panel/ の「Rust コード」を参照）
```

## Blocks

| slug | 説明 | 使用部品（BLOCK.parts） | 公式 URL |
|------|------|------------------------|----------|
| filter-dropdown-bar | 見出しの下に並び替えメニューと商品フィルタ（カテゴリ・色・サイズ・素材などのドロップダウン）を横一列に並べる。1 つは popover を開いた状態で checkbox 一覧を表示し、選択件数をバッジで示す | [Heading](../../themes/typography/heading.md) / [Menu](../../themes/collections/menu.md) / [Popover](../../themes/overlays/popover.md) / [Checkbox](../../themes/forms/checkbox.md) / [Button](../../themes/forms/button.md) / [Badge](../../themes/data-display/badge.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/filter-dropdown-bar/ |
| filter-expandable-panel | 商品一覧上部の開閉パネル式フィルタバー。適用件数付きトグル + 「すべて解除」+ 並び替えメニューの下に価格・色・サイズ・カテゴリの 4 チェック群（列数 1 → 2 → 4） | [Button](../../themes/forms/button.md) / [Collapsible](../../themes/disclosure/collapsible.md) / [Fieldset](../../themes/forms/fieldset.md) / [Checkbox](../../themes/forms/checkbox.md) / [Menu](../../themes/collections/menu.md) / [Separator](../../themes/utilities/separator.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/filter-expandable-panel/ |
| filter-overlay-panel | 並び替えメニューとフィルタボタンの横バーを置き、フィルタボタンで開くパネル（カテゴリ・価格帯・在庫の条件 + 解除・適用ボタン）を併せ持つ | [Drawer](../../themes/overlays/drawer.md) / [Dialog](../../themes/overlays/dialog.md) / [Button](../../themes/forms/button.md) / [Menu](../../themes/collections/menu.md) / [Checkbox](../../themes/forms/checkbox.md) / [Fieldset](../../themes/forms/fieldset.md) / [Skeleton](../../themes/feedback/skeleton.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/filter-overlay-panel/ |
| filter-sidebar | EC 商品一覧の「左サイドバーのフィルタ + 右の商品領域」 | [Heading](../../themes/typography/heading.md) / [Menu](../../themes/collections/menu.md) / [Link](../../themes/typography/link.md) / [Collapsible](../../themes/disclosure/collapsible.md) / [Fieldset](../../themes/forms/fieldset.md) / [Checkbox](../../themes/forms/checkbox.md) / [Drawer](../../themes/overlays/drawer.md) / [Button](../../themes/forms/button.md) / [Skeleton](../../themes/feedback/skeleton.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/filter-sidebar/ |

## Notes

- 上記コードは公式 md `## Rust コード` の冒頭抜粋（元は約 305 行）。全文は公式ページを参照する。
- `docs-site` は crates.io 未公開 crate のため `use` できる API ではない。コードをコピーして `fandhe_frontend_pre_styled_ui::*` / `fandhe_frontend_core::*` の呼び出し規約の見本として使う前提。
- 全 block は無 JS の静的表示で `<form>` を持たない。チェックボックス・並び替え項目は `disabled` 固定、選択肢（価格帯・色・サイズ・カテゴリ）は架空データ。
- 差分メモ（`filter-expandable-panel`）: 集約元は R0817 の 1 件のみ。パネルを閉じた状態や適用中フィルタのタグ列併記は入れず、初期状態をパネルが開いた状態に固定した 1 枚の静的見本。並び替えメニューは閉じた状態（`おすすめ順` 選択済み）で表示し、トリガーを押しても開かない。
- 他 3 block の差分メモは公式 md を参照（`filter-sidebar` は主参照 R0818、集約元 R0819 / R0621）。
- 出典（pin SHA `cf5edb9b8f1bf2a63d51dcf50a8d2806e2d8f9f9`）: 公式 md `site/blocks/<slug>.md`、Rust ソース `crates/docs-site/src/blocks/ecommerce/filter/<slug_snake>.rs`。

## Related

- [Ecommerce Blocks overview](./overview.md)
- [Product List](./product-list.md)
- [Category](./category.md)
- [Cart](./cart.md)
