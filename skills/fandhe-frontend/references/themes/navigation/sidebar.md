# Sidebar

shadcn/ui `Sidebar` 相当のスタイル済みサイドバー部品。headless 層（`fandhe-frontend-headless-ui` の `sidebar`）が出力する 22 パーツへ意匠を重ねる。

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::sidebar::{self, Sidebar, SidebarProps, SidebarState};

let state = Sidebar::new(SidebarState::Expanded);
let props = SidebarProps::default();
let node = sidebar::provider(&state, &props, vec![], vec![
    sidebar::root(&state, &props, "Main navigation", None, vec![], vec![]),
]);
```

`stylesheet() -> String` が静的 CSS 全量を返す。次の型は headless 層から再エクスポートされる: `Sidebar` / `SidebarAction` / `SidebarCollapsible` / `SidebarMenuButtonProps` / `SidebarMenuButtonSize` / `SidebarMenuButtonVariant` / `SidebarMenuSubButtonProps` / `SidebarMenuSubButtonSize` / `SidebarProps` / `SidebarSide` / `SidebarState` / `SidebarVariant` / `DATA_STATE_COLLAPSED` / `DATA_STATE_EXPANDED`。

```rust
pub fn provider<'a>(state: &Sidebar, props: &SidebarProps, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn root<'a>(state: &Sidebar, props: &SidebarProps, label: &'a str, id: Option<&'a str>, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn header<'a>(attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn content<'a>(attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn footer<'a>(attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn separator<'a>(attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn input<'a>(attrs: Vec<(&'a str, &'a str)>) -> Node
pub fn group<'a>(labelledby: Option<&'a str>, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn group_label<'a>(id: Option<&'a str>, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn group_content<'a>(attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn group_action<'a>(label: &'a str, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn menu<'a>(attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn menu_item<'a>(attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn menu_button<'a>(props: &SidebarMenuButtonProps<'a>, icon: Option<Node>, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn menu_action<'a>(label: &'a str, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn menu_badge<'a>(attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn menu_sub<'a>(attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn menu_sub_item<'a>(attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn menu_sub_button<'a>(props: &SidebarMenuSubButtonProps<'a>, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn rail<'a>(state: &Sidebar, label: &'a str, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn trigger<'a>(state: &Sidebar, label: &'a str, controls: Option<&'a str>, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn inset<'a>(attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn menu_skeleton<'a>(show_icon: bool, attrs: Vec<(&'a str, &'a str)>) -> Node
```

## Anatomy

`provider` / `root` / `header` / `content` / `footer` / `separator` / `input` / `group` / `group-label` / `group-content` / `group-action` / `menu` / `menu-item` / `menu-button` / `menu-action` / `menu-badge` / `menu-sub` / `menu-sub-item` / `menu-sub-button` / `rail` / `trigger` / `inset`

## Options / Props

`SidebarProps`（`Default`）:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `collapsible` | `SidebarCollapsible`（`Offcanvas` \| `Icon` \| `None`） | `Offcanvas` | 折りたたみ方式（`data-collapsible`: `offcanvas` / `icon` / `none`） |
| `variant` | `SidebarVariant`（`Sidebar` \| `Floating` \| `Inset`） | `Sidebar` | 見た目（`data-variant`: `sidebar` / `floating` / `inset`） |
| `side` | `SidebarSide`（`Left` \| `Right`） | `Left` | 配置側（`data-side`） |
| `mobile` | `bool` | `false` | `true` のとき `data-mobile` を出力 |

`SidebarMenuButtonProps<'a>`（`Default`）:

| Name | Type | Description |
|------|------|-------------|
| `href` | `Option<&str>` | `Some` なら `a`（`href` 固定付与）、`None` なら `button type="button"` |
| `active` | `bool` | `data-active` を付与（`a` のときのみ `aria-current="page"` も） |
| `size` | `SidebarMenuButtonSize`（`Default` \| `Sm` \| `Lg`） | `data-size` |
| `variant` | `SidebarMenuButtonVariant`（`Default` \| `Outline`） | `data-variant` |
| `describedby` | `Option<&str>` | `aria-describedby`（tooltip 関連付け） |

`SidebarMenuSubButtonProps<'a>`: `href` / `active`（`SidebarMenuButtonProps` と同様）+ `size: SidebarMenuSubButtonSize`（`Sm`（既定）\| `Md`）。

状態機械: `Sidebar::new(initial: SidebarState)`（`SidebarState`: `Expanded`（既定）\| `Collapsed`）、`SidebarAction`: `Expand` / `Collapse` / `Toggle`。

CSS custom property: `--fandhe-sidebar-width`（展開幅）/ `--fandhe-sidebar-width-icon`（icon 折りたたみ幅）/ `--fandhe-sidebar-width-mobile`（モバイル drawer 幅）/ `--fandhe-color-sidebar-*`（7 ロール: 背景 / 前景 / 枠線 / accent 背景・前景 / ring / border）。

## Notes

- 出典: https://fandhe-ai.github.io/fandhe-frontend/themes/sidebar/
- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）
- `variant` / `collapsible` / `side` は class ベースのバリアント軸を持たず、headless が出力する `data-variant` / `data-collapsible` / `data-side` を CSS 属性セレクタとして参照して見た目を切り替える。全パーツで呼び出し側 `class` は除去される
- icon 折りたたみ時は `menu-button` のラベルテキストを clip 手法で視覚的に非表示化しつつアクセシブルネームを維持する（WCAG 4.1.2）。`menu_button` は装飾用アイコンを専用の `icon` 引数で受け取り、`children`（ラベル）は非空なら内側の無印 `<span data-fandhe-sidebar-menu-button-label>` に集約される
- モバイル表示時は `root` が `transform` のみで drawer として開閉する
- `menu_skeleton` はローディング装飾用ヘルパーで、ランダム幅を持たない決定的な固定幅の skeleton を返す（`show_icon` が `true` なら先頭に円形 skeleton）。呼び出し側 `style` は固定のレイアウト宣言と統合される
- Cmd/Ctrl+B のグローバルショートカット・モバイル判定（メディアクエリ）・`menu-button` の tooltip hover 配線は本部品では実装せず、`fandhe-frontend-wasm-full` 側の配線が担う

## Related

- [Sidebar (primitives)](../../primitives/navigation/sidebar.md)
- [Nav List](./nav-list.md)
- [Navigation Menu](./navigation-menu.md)
- [Skeleton](../feedback/skeleton.md)
