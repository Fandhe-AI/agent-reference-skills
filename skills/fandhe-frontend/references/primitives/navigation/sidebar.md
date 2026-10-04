# Sidebar

アプリシェル用サイドバーに相当する shadcn/ui Sidebar 部品。`provider` / `root` / `header` / `content` / `footer` / `separator` / `input` / `group` / `group-label` / `group-content` / `group-action` / `menu` / `menu-item` / `menu-button` / `menu-action` / `menu-badge` / `menu-sub` / `menu-sub-item` / `menu-sub-button` / `rail` / `trigger` / `inset` の 22 anatomy パーツと、`data-state="expanded"|"collapsed"` を管理する状態機械 `Sidebar` を持つ。

## Signature / Usage

```rust
use fandhe_frontend_core::text;
use fandhe_frontend_headless_ui::sidebar::{
    self, Sidebar, SidebarMenuButtonProps, SidebarProps, SidebarState,
};

let state = Sidebar::new(SidebarState::Expanded);
let props = SidebarProps::default();

let node = sidebar::provider(&state, &props, vec![], vec![
    sidebar::root(&state, &props, "Main navigation", Some("app-sidebar"), vec![], vec![
        sidebar::content(vec![], vec![
            sidebar::menu(vec![], vec![
                sidebar::menu_item(vec![], vec![
                    sidebar::menu_button(
                        &SidebarMenuButtonProps { href: Some("/"), active: true, ..Default::default() },
                        vec![],
                        vec![text("Home")],
                    ),
                ]),
            ]),
        ]),
    ]),
    sidebar::inset(vec![], vec![sidebar::trigger(&state, "Toggle sidebar", Some("app-sidebar"), vec![], vec![])]),
]);
```

```rust
sidebar::provider(state: &Sidebar, props: &SidebarProps, attrs, children) -> Node
sidebar::root(state: &Sidebar, props: &SidebarProps, label: &str, id: Option<&str>, attrs, children) -> Node
sidebar::header / content / footer / separator / menu / menu_item / menu_badge / menu_sub / menu_sub_item / inset (attrs, children)
sidebar::input(attrs) -> Node
sidebar::group(labelledby: Option<&str>, attrs, children) -> Node
sidebar::group_label(id: Option<&str>, attrs, children) -> Node
sidebar::group_content(attrs, children) -> Node
sidebar::group_action(label: &str, attrs, children) -> Node
sidebar::menu_button(props: &SidebarMenuButtonProps, attrs, children) -> Node
sidebar::menu_action(label: &str, attrs, children) -> Node
sidebar::menu_sub_button(props: &SidebarMenuSubButtonProps, attrs, children) -> Node
sidebar::rail(state: &Sidebar, label: &str, attrs, children) -> Node
sidebar::trigger(state: &Sidebar, label: &str, controls: Option<&str>, attrs, children) -> Node
```

## Anatomy

典型的な入れ子の一例（各パーツは自由関数で独立に組み立てられ、入れ子の強制はない）。

```
provider
  root (nav)
    header
    input
    content
      group
        group-label
        group-action
        group-content
          menu
            menu-item
              menu-button
              menu-action
              menu-badge
              menu-sub
                menu-sub-item
                  menu-sub-button
    separator
    footer
    rail
  inset
  trigger
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `Sidebar::new: initial` | `SidebarState` | `Expanded`（`Default`） | `Expanded` \| `Collapsed` |
| `SidebarProps.collapsible` | `SidebarCollapsible` | `Offcanvas` | `Offcanvas` \| `Icon` \| `None`。`data-collapsible` |
| `SidebarProps.variant` | `SidebarVariant` | `Sidebar` | `Sidebar` \| `Floating` \| `Inset`。`data-variant` |
| `SidebarProps.side` | `SidebarSide` | `Left` | `Left` \| `Right`。`data-side` |
| `SidebarProps.mobile` | `bool` | `false` | `true` のとき `data-mobile` |
| `root: label` | `&str` | 必須 | `aria-label`（`nav` のアクセシブルネームを型で強制） |
| `root: id` / `trigger: controls` | `Option<&str>` | — | `Some` のとき `id` / `aria-controls`（対で使う） |
| `SidebarMenuButtonProps.href` | `Option<&str>` | `None` | `Some` なら `a`、`None` なら `button type="button"` |
| `SidebarMenuButtonProps.active` | `bool` | `false` | `data-active`（`a` のときのみ `aria-current="page"` も） |
| `SidebarMenuButtonProps.size` | `SidebarMenuButtonSize` | `Default` | `Default` \| `Sm` \| `Lg`。`data-size` |
| `SidebarMenuButtonProps.variant` | `SidebarMenuButtonVariant` | `Default` | `Default` \| `Outline`。`data-variant` |
| `SidebarMenuButtonProps.describedby` | `Option<&str>` | `None` | `Some` のとき `aria-describedby`（tooltip 関連付け） |
| `SidebarMenuSubButtonProps.href` / `active` | `Option<&str>` / `bool` | `None` / `false` | `menu-button` と同型 |
| `SidebarMenuSubButtonProps.size` | `SidebarMenuSubButtonSize` | `Sm` | `Sm` \| `Md`。`data-size` |
| `group_action` / `menu_action` / `rail` / `trigger: label` | `&str` | 必須 | `aria-label`（アイコンのみ操作を想定） |

## Actions

`SidebarAction`（`Sidebar::update`）と dispatch 名: `Expand`（`"expand"`）/ `Collapse`（`"collapse"`）/ `Toggle`（`"toggle"`）。`SidebarState` は `as_data_state()` / `from_data_state()` / `toggled()` / `is_expanded()` を持つ。

## Data Attributes

| Part | Attribute | Values |
| --- | --- | --- |
| provider / root | `data-state` | `expanded` \| `collapsed` |
| provider / root | `data-collapsible` | `offcanvas` \| `icon` \| `none`（状態に関わらず常に出力） |
| provider / root | `data-variant` | `sidebar` \| `floating` \| `inset` |
| provider / root | `data-side` | `left` \| `right` |
| provider / root | `data-mobile` | presence |
| menu-button / menu-sub-button | `data-active` | presence |
| menu-button / menu-sub-button | `data-size` | menu-button: `default` \| `sm` \| `lg`、menu-sub-button: `sm` \| `md` |
| menu-button | `data-variant` | `default` \| `outline` |
| rail / trigger | `data-state` | `expanded` \| `collapsed` |

## Notes

- 出典: https://fandhe-ai.github.io/fandhe-frontend/primitives/sidebar/
- `root` は `nav`。`div` への `aria-label` は支援技術に露出しないため、ランドマークが必要な本部品では `label` を必須引数にしている。
- `group` は `role="group"` を固定出力し、`labelledby` が `Some` のときのみ `aria-labelledby`。`separator` は `hr`（暗黙の separator ロールに委ね `role` を付与しない）。
- `menu-sub` は開閉状態を持たない静的な `ul`。開閉が必要なら呼び出し側で `collapsible::root` / `trigger` / `content` を合成する（他 scope を内包しない設計）。
- `trigger` は `aria-expanded` / `aria-controls` を持つキーボード操作可能な開閉ボタン。`rail` は `tabindex="-1"` のマウス専用領域。
- `inset` は `div`（`main` ではない）。`role="main"` が必要なら呼び出し側が `attrs` で渡す。
- `data-state` の語彙は `expanded` / `collapsed` で、`OpenState`（`open` / `closed`）とは別型。
- `menu-skeleton`（ローディング装飾）は本層に含まれず pre-styled-ui 側の責務。Cmd/Ctrl+B ショートカット・モバイル drawer 切替・`menu-button` の tooltip hover 配線の実 DOM 配線は本層の範囲外（`fandhe-frontend-wasm-full` の後続責務）。
- 自前 CSS の最小例: `[data-scope="sidebar"][data-part="provider"][data-state="collapsed"] { width: 3rem; }`。
- `@ark-ui/react` の JS/TS API とは別物（Rust 製、`fandhe-frontend-headless-ui`）。

## Related

- [Nav List](./nav-list.md)
- [Collapsible](../disclosure/collapsible.md)
- [Tooltip](../overlays/tooltip.md)
- [Drawer](../overlays/drawer.md)
- [Sidebar（Themes 版）](../../themes/navigation/sidebar.md)
