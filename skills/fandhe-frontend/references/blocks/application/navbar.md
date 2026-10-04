# Navbar（Application Blocks）

アプリ・ドキュメントサイト向けのナビバー（リンク群 + アクション、2 段構成、検索欄付き）の合成例 4 件。Blocks は新規 API ではなく既存の Themes / Primitives / core 部品の合成例で、各 block の公開物は未公開 crate `docs-site` 内部の `pub fn demo() -> Node` と `pub const BLOCK: Block` だけである。

## Signature / Usage

カテゴリ内で最も短い `navbar-app-links`（左にロゴと主ナビ、右に主操作・通知・アバターメニューの 1 段アプリ用ナビバー）の `## Rust コード` の冒頭抜粋。

```rust
use fandhe_frontend_core::{div, el, header, span, text, Node};
use fandhe_frontend_pre_styled_ui::avatar::{self, AvatarProps, ImageStatus};
use fandhe_frontend_pre_styled_ui::badge::{self, BadgeProps};
use fandhe_frontend_pre_styled_ui::button::{self, ButtonProps};
use fandhe_frontend_pre_styled_ui::collapsible;
use fandhe_frontend_pre_styled_ui::icon::{icon, IconProps};
use fandhe_frontend_pre_styled_ui::menu::{self, OpenState};
use fandhe_frontend_pre_styled_ui::navigation_menu::{self, NavigationMenuProps};
use fandhe_frontend_pre_styled_ui::Size;

/// 実在の自リポジトリ URL（`href` の方針、モジュール doc 参照）。
const REPO: &str = "https://github.com/Fandhe-AI/fandhe-frontend";
/// 実在の自組織 URL。
const ORG: &str = "https://github.com/Fandhe-AI";

/// 装飾用の自作幾何アイコン（実在ブランドのロゴを模さない、`label: None`）。
fn geo_icon(d: &'static str) -> Node {
    icon(
        &IconProps {
            label: None,
            ..IconProps::default()
        },
        vec![],
        vec![el("path", vec![("d", d)], vec![])],
    )
}

/// ロゴ（幾何図形 + ブランド名テキスト）。
fn logo() -> Node {
    span(
        vec![("data-blocks-navbar-app-links-logo", "")],
        vec![
            geo_icon("M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z"),
            span(vec![], vec![text("Fandhe Console")]),
        ],
    )
}

/// メインナビ本体（`aria_label` は variant ごとに一意にする。デスクトップ
/// 用と [`hamburger_panel`] への clone とで 2 回出るが、非表示側は
/// `display: none` で a11y ツリーから除外されるため実害を持たない）。
/// `with_badge` は「受信箱」リンクへ件数 [`badge`] を付けるかどうか
/// （R0578 の集約対応、対応表参照）。
fn nav(aria_label: &str, with_badge: bool) -> Node {
    let props = NavigationMenuProps::default();
    let mut inbox_children: Vec<Node> = vec![text("受信箱")];
    if with_badge {
        inbox_children.push(badge::badge(
            &BadgeProps::default(),
            vec![("data-blocks-navbar-app-links-count", "")],
            vec![text("3")],
        ));
    }
    navigation_menu::root(
        &props,
        aria_label,
        vec![("data-blocks-navbar-app-links-nav", "")],
        vec![navigation_menu::list(
            &props,
            vec![],
            vec![
                navigation_menu::item(
                    navigation_menu::OpenState::Closed,
                    false,
                    &props,
                    "dashboard",
                    vec![],
                    vec![navigation_menu::link(
                        "./",
                        true,
                        vec![],
                        vec![text("ダッシュボード")],
                    )],
                ),
// ...（以下省略。全文は公式ページ https://fandhe-ai.github.io/fandhe-frontend/blocks/navbar-app-links/ の「Rust コード」を参照）
```

## Blocks

| Slug | Description | Parts | Official URL |
|------|-------------|-------|--------------|
| `navbar-app-links` | 1 段のアプリ用ナビバー（左にロゴと主ナビ、右に主操作・通知・アバターメニュー）。現在地をピル型 / 下線で示す 2 種と、狭幅でハンバーガーパネルを常時展開した状態の 3 インスタンス | [Navigation Menu](../../themes/navigation/navigation-menu.md), [Button](../../themes/forms/button.md), [Avatar](../../themes/data-display/avatar.md), [Menu](../../themes/collections/menu.md), [Badge](../../themes/data-display/badge.md), [Icon](../../themes/data-display/icon.md), [Collapsible](../../themes/disclosure/collapsible.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/navbar-app-links/ |
| `navbar-docs-site` | ドキュメントサイト用のナビバー（`narrow` variant では右端項目群のみ幅超過時に折り返す） | [Navigation Menu](../../themes/navigation/navigation-menu.md), [Input Group](../../themes/forms/input-group.md), [Input](../../themes/forms/input.md), [Kbd](../../themes/typography/kbd.md), [Link](../../themes/typography/link.md), [Button](../../themes/forms/button.md), [Icon](../../themes/data-display/icon.md), [Tab Nav](../../themes/navigation/tab-nav.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/navbar-docs-site/ |
| `navbar-two-row` | 2 段構成のアプリ用ナビバー。1 段目にロゴ・中央の検索欄・通知ボタン・プロフィールメニュー、2 段目にセカンダリナビ（ピル型の `pills` と中央寄せタブ型の `tabs-center` の 2 variant） | [Input Group](../../themes/forms/input-group.md), [Input](../../themes/forms/input.md), [Navigation Menu](../../themes/navigation/navigation-menu.md), [Tab Nav](../../themes/navigation/tab-nav.md), [Button](../../themes/forms/button.md), [Avatar](../../themes/data-display/avatar.md), [Menu](../../themes/collections/menu.md), [Icon](../../themes/data-display/icon.md), [Collapsible](../../themes/disclosure/collapsible.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/navbar-two-row/ |
| `navbar-with-search` | 検索欄付きの 1 段アプリナビバー。検索欄の置き方 3 通り（`links-end` / `center-search` / `grid-12`）と、Demo 枠を狭幅へ固定した `narrow` の 4 インスタンス | [Input Group](../../themes/forms/input-group.md), [Input](../../themes/forms/input.md), [Field](../../themes/forms/field.md), [Navigation Menu](../../themes/navigation/navigation-menu.md), [Button](../../themes/forms/button.md), [Avatar](../../themes/data-display/avatar.md), [Menu](../../themes/collections/menu.md), [Icon](../../themes/data-display/icon.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/navbar-with-search/ |

## Notes

- 上記コードは公式 md `## Rust コード` の冒頭抜粋（元は約 277 行）。全文は公式ページを参照する。
- Blocks は Themes / Primitives / core 部品の合成例で、公開 crate の API を使う側のコード例。`docs-site` crate は crates.io 未公開のため `use` できず、コードをコピーして利用する前提。
- 各 block の `BLOCK.parts` の label と公式 md 冒頭の使用部品は一致する（`BLOCK` の構造は [overview.md](./overview.md) を参照）。
- 無 JS の静的表示のため、通知ボタン・アバターメニューのトリガー・ハンバーガー・主操作ボタンは `disabled: true` で固定する。狭い幅（Demo 枠基準の container query、`48rem` 未満）ではデスクトップ用ナビを隠し、ハンバーガーの常時展開パネルへナビの複製を畳む（`aria-controls` で指す。パネルは `OpenState::Open` で常に到達可能）。
- 差分メモの要点: 集約元の配色・文言・アイコンは持ち込まず、アイコンは実在ブランドを模さない自作の幾何図形。デスクトップ用とパネル用でナビが 2 回出力されるため、`aria-label` と `id` は variant ごとに一意にする。`navbar-with-search` は検索欄を幅にかかわらず常時表示する（アイコンボタンへの折りたたみは行わない）。`navbar-app-links` の `href` は実在の自リポジトリ / 自組織 URL を使う。`navbar-docs-site` は代表構成（中央検索）を基準に、検索トリガーの位置・リンクのボタン化の差分を右寄せ検索・ボタン型トリガーの variant へ集約し、配色違いは既存のテーマトークン（`--fandhe-*`）に吸収されるため Demo を増やさない。
- 出典（pin SHA `cf5edb9b8f1bf2a63d51dcf50a8d2806e2d8f9f9`）: 公式 md は `site/blocks/<slug>.md`、Rust ソースは `crates/docs-site/src/blocks/application/navbar/<slug_snake>.rs`。

## Related

- [Application Blocks overview](./overview.md)
- [App Shell](./app-shell.md)
- [Sidebar](./sidebar.md)
- [Navigation Menu](../../themes/navigation/navigation-menu.md)
