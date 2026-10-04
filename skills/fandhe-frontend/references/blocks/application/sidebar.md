# Sidebar（Application Blocks）

サイドバーナビ（submenu 付き・icon 折りたたみ・グループ見出し付き・2 段レール + パネル）の合成例 4 件。`sidebar-03` / `sidebar-07` は shadcn/ui Blocks の同名 block 相当。Blocks は新規 API ではなく既存の Themes / Primitives / core 部品の合成例で、各 block の公開物は未公開 crate `docs-site` 内部の `pub fn demo() -> Node` と `pub const BLOCK: Block` だけである。

## Signature / Usage

カテゴリ内で最も短い `sidebar-03`（submenu 付きサイドバー）の `## Rust コード` の冒頭抜粋。

```rust
use fandhe_frontend_core::{div, el, span, text, Node};
use fandhe_frontend_pre_styled_ui::breadcrumb::{self, BreadcrumbVariant};
use fandhe_frontend_pre_styled_ui::icon::{icon, IconProps};
use fandhe_frontend_pre_styled_ui::separator::{self, SeparatorProps, SeparatorVariant};
use fandhe_frontend_pre_styled_ui::sidebar;
use fandhe_frontend_pre_styled_ui::sidebar::{
    Sidebar, SidebarMenuButtonProps, SidebarMenuButtonSize, SidebarMenuSubButtonProps,
    SidebarProps, SidebarState,
};
use fandhe_frontend_pre_styled_ui::{Orientation, Size};

/// 自作の単純な矩形アイコン（`d` は呼び出し側が座標を選ぶ、モジュール doc
/// 「アイコンは自作の単純幾何図形」参照）。
fn geo_icon(path_d: &'static str) -> Node {
    icon(
        &IconProps::default(),
        vec![],
        vec![el("path", vec![("d", path_d)], vec![])],
    )
}

/// header のブランド行（`size="lg"` の `menu_button` 1 個。角丸の濃色
/// アイコン枠 + 「Documentation」/「v1.0.0」の 2 行ラベル。モジュール doc
/// 「Issue 見立てとの差異」参照）。
fn brand_header() -> Node {
    let icon_box = div(
        vec![("data-blocks-sidebar-03-brand-icon", "")],
        vec![geo_icon("M4 4h16v16H4z")],
    );
    let button = sidebar::menu_button(
        &SidebarMenuButtonProps {
            href: None,
            size: SidebarMenuButtonSize::Lg,
            ..Default::default()
        },
        Some(icon_box),
        vec![("data-blocks-sidebar-03-brand", "")],
        vec![
            span(vec![], vec![text("Documentation")]),
            span(vec![], vec![text("v1.0.0")]),
        ],
    );
    sidebar::header(
        vec![],
        vec![sidebar::menu(
            vec![],
            vec![sidebar::menu_item(vec![], vec![button])],
        )],
    )
}

/// nav の 1 グループ（親見出しの `menu_button` + `menu-sub` の子項目群）。
/// `active` に一致する子項目のみ `data-active` を付与する
/// （モジュール doc「`asChild` 相当が無い点と `href` の扱い」参照）。
fn nav_group(title: &'static str, active: Option<&'static str>, subs: &[&'static str]) -> Node {
    let parent = sidebar::menu_button(
        &SidebarMenuButtonProps {
            href: None,
            ..Default::default()
        },
        None,
        vec![("data-blocks-sidebar-03-parent", "")],
        vec![text(title)],
    );
    let sub_items: Vec<Node> = subs
        .iter()
        .map(|label| {
            sidebar::menu_sub_item(
                vec![],
                vec![sidebar::menu_sub_button(
                    &SidebarMenuSubButtonProps {
                        href: None,
                        active: active == Some(*label),
                        ..Default::default()
                    },
                    vec![],
                    vec![text(*label)],
                )],
            )
        })
        .collect();
    sidebar::menu_item(vec![], vec![parent, sidebar::menu_sub(vec![], sub_items)])
}
// ...（以下省略。全文は公式ページ https://fandhe-ai.github.io/fandhe-frontend/blocks/sidebar-03/ の「Rust コード」を参照）
```

## Blocks

| Slug | Description | Parts | Official URL |
|------|-------------|-------|--------------|
| `sidebar-03` | shadcn/ui Blocks `sidebar-03` 相当。`size="lg"` のブランド header・`menu-sub` を入れ子にしたナビ・`data-active` の現在項目・rail を持つ submenu 付きサイドバー（expanded の 1 インスタンスのみ） | [Sidebar](../../themes/navigation/sidebar.md), [Breadcrumb](../../themes/navigation/breadcrumb.md), [Separator](../../themes/utilities/separator.md), [Icon](../../themes/data-display/icon.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/sidebar-03/ |
| `sidebar-07` | shadcn/ui Blocks `sidebar-07` 相当。team switcher 付き header・collapsible な nav-main・`Projects` グループ・avatar + menu の footer を持つ icon 折りたたみ可能なサイドバー（expanded と collapsed の 2 インスタンス併記） | [Sidebar](../../themes/navigation/sidebar.md), [Collapsible](../../themes/disclosure/collapsible.md), [Menu](../../themes/collections/menu.md), [Avatar](../../themes/data-display/avatar.md), [Breadcrumb](../../themes/navigation/breadcrumb.md), [Separator](../../themes/utilities/separator.md), [Icon](../../themes/data-display/icon.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/sidebar-07/ |
| `sidebar-grouped-nav` | 目的別パーツのグループ見出し付きサイドバーナビ。ロゴ header 版（件数バッジ付き Inbox・Teams グループ・ユーザーメニュー footer）と検索欄 header 版（Workspace グループ）の 2 インスタンス | [Sidebar](../../themes/navigation/sidebar.md), [Avatar](../../themes/data-display/avatar.md), [Icon](../../themes/data-display/icon.md), [Input Group](../../themes/forms/input-group.md), [Input](../../themes/forms/input.md), [Field](../../themes/forms/field.md), [Menu](../../themes/collections/menu.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/sidebar-grouped-nav/ |
| `sidebar-rail-panel` | アイコンだけの細いレールと、その右にセクション見出し付きナビパネル（見出し + 検索欄）を持つ 2 段サイドバー。幅制約のない Desktop と、パネルを隠しレールのみ残す Narrow の 2 インスタンス | [Sidebar](../../themes/navigation/sidebar.md), [Icon](../../themes/data-display/icon.md), [Avatar](../../themes/data-display/avatar.md), [Heading](../../themes/typography/heading.md), [Menu](../../themes/collections/menu.md), [Input Group](../../themes/forms/input-group.md), [Input](../../themes/forms/input.md), [Button](../../themes/forms/button.md), [Field](../../themes/forms/field.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/sidebar-rail-panel/ |

## Notes

- 上記コードは公式 md `## Rust コード` の冒頭抜粋（元は約 241 行）。全文は公式ページを参照する。
- Blocks は Themes / Primitives / core 部品の合成例で、公開 crate の API を使う側のコード例。`docs-site` crate は crates.io 未公開のため `use` できず、コードをコピーして利用する前提。
- 各 block の `BLOCK.parts` の label と公式 md 冒頭の使用部品は一致する（`BLOCK` の構造は [overview.md](./overview.md) を参照）。
- docs サイトは JS ハイドレーションを行わないため、サイドバーの開閉（トリガーボタン・Cmd/Ctrl+B）は `fandhe-frontend-wasm-full` 側の実行時責務で本 SSR 合成例では動作しない。開閉状態は静的に固定して並記する。
- 差分メモの要点（shadcn 側との差分）: `sidebar-03` は header に検索 `input` や version-switcher を持たず `size="lg"` の `menu_button` 1 個のみ（shadcn 実物に忠実）。ナビ項目は `href: None`（`<button type="button">`）で組み、現在項目は `href` に依らない `data-active` で表現する（`href="#"` の死リンクは契約テストが禁止）。他社製品固有の名称は一般名（Config Options / Compiler / Bundler / Hot Reload）へ置換、アイコンは自作の単純な矩形 SVG path。`sidebar-03` は `collapsible` / `menu` / `avatar` を使わない点が `sidebar-07` との違い。
- 出典（pin SHA `cf5edb9b8f1bf2a63d51dcf50a8d2806e2d8f9f9`）: 公式 md は `site/blocks/<slug>.md`、Rust ソースは `crates/docs-site/src/blocks/application/sidebar/<slug_snake>.rs`。

## Related

- [Application Blocks overview](./overview.md)
- [App Shell](./app-shell.md)
- [Navbar](./navbar.md)
- [Settings](./settings.md)
- [Sidebar (Themes)](../../themes/navigation/sidebar.md)
