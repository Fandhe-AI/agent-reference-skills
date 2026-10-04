# Header（Marketing Blocks）

ナビゲーションヘッダー向け block 4 件。blocks は新規 API ではなく既存の Themes / Primitives / core 部品の合成例で、各 block の公開物は未公開 crate `docs-site` 内部の `pub fn demo() -> Node` と `pub const BLOCK: Block` だけである。

## Signature / Usage

カテゴリ内で最も短い `header-floating-pill`（浮遊ピル型ヘッダー）の `## Rust コード` の冒頭抜粋。

```rust
use fandhe_frontend_core::{div, el, header, span, text, Node};
use fandhe_frontend_pre_styled_ui::button::{self, ButtonProps};
use fandhe_frontend_pre_styled_ui::collapsible::{self, OpenState};
use fandhe_frontend_pre_styled_ui::icon::{icon, IconProps};
use fandhe_frontend_pre_styled_ui::navigation_menu::{self, NavigationMenuProps};

const REPO: &str = "https://github.com/Fandhe-AI/fandhe-frontend";
const PANEL_ID: &str = "hfp-panel";

pub fn demo() -> Node {
    let props = NavigationMenuProps::default();
    let link_item = navigation_menu::item(
        OpenState::Closed,
        false,
        &props,
        "機能",
        vec![],
        vec![navigation_menu::link(
            REPO,
            false,
            vec![],
            vec![text("機能")],
        )],
    );
    let nav = navigation_menu::root(
        &props,
        "ナビ",
        vec![],
        vec![navigation_menu::list(&props, vec![], vec![link_item])],
    );
    let cta = button::button(
        &ButtonProps::default(),
        vec![("data-hfp-cta", "")],
        vec![text("始める")],
    );
    let mark = icon(
        &IconProps::default(),
        vec![],
        vec![el(
            "rect",
            vec![
                ("x", "3"),
                ("y", "3"),
                ("width", "18"),
                ("height", "18"),
                ("rx", "5"),
            ],
            vec![],
        )],
    );
    let logo = span(
        vec![("class", "hfp-logo")],
        vec![mark, text("Fandhe Frontend")],
    );
    let menu_icon = icon(
        &IconProps::default(),
        vec![("stroke", "currentColor")],
        vec![
            el(
                "line",
                vec![
                    ("x1", "3"),
                    ("y1", "6"),
                    ("x2", "21"),
                    ("y2", "6"),
                    ("stroke-width", "2"),
                    ("stroke-linecap", "round"),
                ],
                vec![],
            ),
            el(
                "line",
                vec![
                    ("x1", "3"),
                    ("y1", "12"),
                    ("x2", "21"),
                    ("y2", "12"),
                    ("stroke-width", "2"),
                    ("stroke-linecap", "round"),
                ],
                vec![],
            ),
// ...（以下省略。全文は公式ページ https://fandhe-ai.github.io/fandhe-frontend/blocks/header-floating-pill/ の「Rust コード」を参照）
```

## Blocks

| Block | Description | 使用部品 | 公式 URL |
| --- | --- | --- | --- |
| `header-floating-pill` | 浮遊ピル型ヘッダー。無 JS のため開閉は行わず、狭幅ではデスクトップナビ・CTA を隠してハンバーガートリガーと常時展開のドロップダウンパネルをピルの下に表示 | [Navigation Menu](../../themes/navigation/navigation-menu.md) / [Button](../../themes/forms/button.md) / [Icon](../../themes/data-display/icon.md) / [Collapsible](../../themes/disclosure/collapsible.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/header-floating-pill/ |
| `header-flyout-menu` | ドロップダウン付きヘッダー。ロゴ・ナビ・アクションを横並びにし、48rem 未満ではハンバーガーのみ表示。標準形は「製品」フライアウトを開いた状態で、3 形を並記 | [Navigation Menu](../../themes/navigation/navigation-menu.md) / [Button](../../themes/forms/button.md) / [Icon](../../themes/data-display/icon.md) / [Link](../../themes/typography/link.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/header-flyout-menu/ |
| `header-mega-menu` | 全幅メガメニュー付きヘッダー。幅を制限したバーの下にヘッダー全幅のドロップダウンパネル（アイコン付き項目の複数列と下部の補助 CTA 帯）を持つ。無 JS の静的表示のためハンバーガーの開閉切り替えはない | [Navigation Menu](../../themes/navigation/navigation-menu.md) / [Button](../../themes/forms/button.md) / [Icon](../../themes/data-display/icon.md) / [Link](../../themes/typography/link.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/header-mega-menu/ |
| `header-simple-bar` | 1 段構成のシンプルなヘッダーバー。ロゴ・メインナビ・アクション（ログイン/登録）を横並びにし、48rem 未満ではハンバーガートリガーのみを表示して `aria-controls` で常時展開のドロップダウンパネルへ関連付ける | [Navigation Menu](../../themes/navigation/navigation-menu.md) / [Button](../../themes/forms/button.md) / [Icon](../../themes/data-display/icon.md) / [Link](../../themes/typography/link.md) / [Collapsible](../../themes/disclosure/collapsible.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/header-simple-bar/ |

## Notes

- 上記コードは公式 md `## Rust コード` の冒頭抜粋（元は約 135 行）。全文は公式ページを参照する。
- `docs-site` crate は crates.io 未公開。`demo()` と `BLOCK` は利用者が `use` できる API ではなく、コードをコピーして改変する前提の例である。
- 上のフェンスの `REPO` 定数は固定の GitHub リポジトリ URL（リンク先のダミー）。コピー時は自サイトの URL に差し替える。
- `hfp-*` などのクラス名に当たるレイアウト CSS は `Block.layout_css`（`LayoutCss`）として `.rs` 側に別途登録されており、公式 md のフェンスには含まれない。Rust コードだけではレイアウトのスタイルは付かない。
- 無 JS の静的表示のため、狭幅のハンバーガーは開閉を行わず、ドロップダウンパネルは常時展開で描画される（`header-floating-pill` の全文では `collapsible::root(OpenState::Open, true, ..)`）。
- 代表 block `header-floating-pill` の公式 md は `## 原案差分メモ` を持たない。`header-flyout-menu` は集約元のバリエーションを 3 形並記する。各 block の詳細は公式 md を参照。
- 全 block は `<form>` を持たない静的な表示例。
- 出典（pin SHA `cf5edb9b8f1bf2a63d51dcf50a8d2806e2d8f9f9`）: `crates/docs-site/src/blocks/marketing/header/<slug_snake>.rs`、`site/blocks/<slug>.md`。

## Related

- [Marketing Blocks 概要](./overview.md)
- [Navigation Menu](../../themes/navigation/navigation-menu.md)
- [Button](../../themes/forms/button.md)
- [Icon](../../themes/data-display/icon.md)
