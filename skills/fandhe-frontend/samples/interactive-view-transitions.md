# Client-side state machine with View Transitions and headless-ui overlays

`AppState`/`NavigationMenu`/`Menubar` に対して `dispatch` でアクションを適用し、`@view-transition` を含む `page_shell` へ `NavigationMenu`/`Menubar` の headless-ui オーバーレイを配線した SSR ページを書き出す。

```rust
use fandhe_frontend_app::{demo_items, layout, list_page, page_shell};
use fandhe_frontend_core::{el, render, text, Node};
use fandhe_frontend_headless_ui::data_attrs::Orientation;
use fandhe_frontend_headless_ui::menubar::{self, Menubar};
use fandhe_frontend_headless_ui::navigation_menu::{self, NavigationMenu, NavigationMenuProps};
use fandhe_frontend_interactive::{dispatch, render_for_hydration, AppState, Component, Hydrate};
use std::error::Error;
use std::fs;

const NAV_MENU_ITEMS: [(&str, &str); 2] = [("products", "製品"), ("docs", "ドキュメント")];

const MENUBAR_MENUS: [(&str, [&str; 2]); 2] = [
    ("ファイル", ["新規", "開く"]),
    ("編集", ["コピー", "貼り付け"]),
];

fn run_native_demo() {
    let mut state = AppState::new();
    for (name, payload) in [
        ("increment", ""),
        ("increment", ""),
        ("set_draft", "wasm glue crate"),
        ("add_item", ""),
    ] {
        let applied = dispatch(&mut state, name, payload);
        println!("dispatch({name:?}, {payload:?}) -> applied={applied}, state={state:?}");
    }
    // 未知アクション名の dispatch は no-op（false、状態不変）を返す。
    let unknown_applied = dispatch(&mut state, "no-such-action", "");
    println!("dispatch(\"no-such-action\", \"\") -> applied={unknown_applied}");
    println!("{}", render(&state.view()));
}

/// `NavigationMenu` 状態から navigation-menu の完全なマークアップを組み立てる。
/// `Component::view()` は共通契約のみの最小ビューのため、children を持つ完全な
/// マークアップには `Hydrate::hydration_attrs` を root の `attrs` へ直接マージする。
fn nav_menu_view(state: &NavigationMenu) -> Node {
    // `NavigationMenuProps`（`orientation`）は root/list/item/content の
    // 各パーツ関数へ引数として渡す。
    let props = NavigationMenuProps::default();

    let hydrate_attrs = state.hydration_attrs();
    let hydrate_attrs_ref: Vec<(&str, &str)> = hydrate_attrs
        .iter()
        .map(|(k, v)| (k.as_str(), v.as_str()))
        .collect();
    let mut root_attrs: Vec<(&str, &str)> =
        vec![("id", "nav-menu-root"), ("data-testid", "nav-menu-root")];
    root_attrs.extend(hydrate_attrs_ref);

    let items: Vec<Node> = NAV_MENU_ITEMS
        .iter()
        .map(|(value, label)| {
            let trigger_id = format!("nav-menu-{value}-trigger");
            let content_id = format!("nav-menu-{value}-content");
            let link_href = format!("/nav-menu/{value}");
            let link_label = format!("{label}を見る");
            state.item(
                value,
                false,
                &props,
                vec![],
                vec![
                    state.trigger(
                        value,
                        false,
                        Some(&trigger_id),
                        Some(&content_id),
                        vec![],
                        vec![text(*label)],
                    ),
                    state.content(
                        value,
                        &props,
                        Some(&content_id),
                        Some(&trigger_id),
                        vec![],
                        vec![navigation_menu::link(
                            &link_href,
                            false,
                            vec![],
                            vec![text(&link_label)],
                        )],
                    ),
                ],
            )
        })
        .collect();

    navigation_menu::root(
        &props,
        "製品・ドキュメントナビゲーション",
        root_attrs,
        vec![navigation_menu::list(&props, vec![], items)],
    )
}

fn run_navigation_menu_demo() {
    let mut state = NavigationMenu::default();
    for (name, payload) in [
        ("toggle", "products"),
        // 開いている項目の再クリックは disclosure nav として閉じる。
        ("toggle", "products"),
        ("toggle", "docs"),
        // OverlayCloseController の閉鎖要求（Escape・外側クリック）を
        // 受けた呼び出し側が dispatch する冪等操作。
        ("deselect", ""),
    ] {
        let applied = dispatch(&mut state, name, payload);
        println!("dispatch({name:?}, {payload:?}) -> applied={applied}, state={state:?}");
    }
}

/// `Menubar` 状態から menubar の完全なマークアップを組み立てる。
/// `nav_menu_view` と同様に `Hydrate::hydration_attrs` を root の `attrs` へ直接マージする。
fn menubar_view(state: &Menubar) -> Node {
    let hydrate_attrs = state.hydration_attrs();
    let hydrate_attrs_ref: Vec<(&str, &str)> = hydrate_attrs
        .iter()
        .map(|(k, v)| (k.as_str(), v.as_str()))
        .collect();
    let mut root_attrs: Vec<(&str, &str)> =
        vec![("id", "menubar-root"), ("data-testid", "menubar-root")];
    root_attrs.extend(hydrate_attrs_ref);

    let menus: Vec<Node> = MENUBAR_MENUS
        .iter()
        .enumerate()
        .map(|(index, (label, items))| {
            let trigger_id = format!("menubar-trigger-{index}");
            let content_id = format!("menubar-content-{index}");
            state.menu(
                index,
                vec![],
                vec![
                    state.trigger(
                        index,
                        false,
                        false,
                        Some(&content_id),
                        vec![("id", &trigger_id)],
                        vec![text(*label)],
                    ),
                    state.positioner(
                        index,
                        vec![],
                        vec![state.content(
                            index,
                            Some(&content_id),
                            Some(&trigger_id),
                            vec![],
                            items
                                .iter()
                                .map(|item_label| {
                                    menubar::item(
                                        item_label,
                                        false,
                                        false,
                                        vec![],
                                        vec![text(*item_label)],
                                    )
                                })
                                .collect(),
                        )],
                    ),
                ],
            )
        })
        .collect();

    state.root("アプリケーションメニュー", root_attrs, menus)
}

fn run_menubar_demo() {
    let mut state = Menubar::new(0, 2, None, false, Orientation::Horizontal);
    for (name, payload) in [
        ("toggle", "0"),
        // 開いている Menu を跨いだ左右移動: focus 移動と同時に開く Menu も移る。
        ("next", ""),
        ("close", ""),
    ] {
        let applied = dispatch(&mut state, name, payload);
        println!("dispatch({name:?}, {payload:?}) -> applied={applied}, state={state:?}");
    }
}

/// `layout` + `list_page`（`start_router` 系統）・`render_for_hydration`
/// （`hydrate` 系統）・navigation-menu / menubar デモを 1 ページに同居させ、
/// `page_shell`（`@view-transition { navigation: auto; }` を内包）で
/// `dist/index.html` へ書き出す。
fn write_ssr_html(
    state: &AppState,
    nav_menu_state: &NavigationMenu,
    menubar_state: &Menubar,
) -> Result<(), Box<dyn Error>> {
    let router_demo = layout("記事一覧 (start_router 系統)", list_page(&demo_items()));
    let hydrate_demo = render_for_hydration(state);
    let nav_menu_demo = nav_menu_view(nav_menu_state);
    let menubar_demo = menubar_view(menubar_state);
    let combined = el(
        "div",
        vec![],
        vec![router_demo, hydrate_demo, nav_menu_demo, menubar_demo],
    );
    let html = page_shell("状態管理 + View Transitions サンプル", combined);

    fs::create_dir_all("dist")?;
    fs::write("dist/index.html", html)?;
    Ok(())
}

fn main() -> Result<(), Box<dyn Error>> {
    run_native_demo();
    run_navigation_menu_demo();
    run_menubar_demo();

    let state = AppState::new();
    // 「products が開いている」「File メニューが開いている」初期状態にし、
    // SSR で開閉双方の見た目を検分できるようにする。
    let nav_menu_state = {
        let mut s = NavigationMenu::default();
        dispatch(&mut s, "select", "products");
        s
    };
    let menubar_state = Menubar::new(0, 2, Some(0), false, Orientation::Horizontal);
    write_ssr_html(&state, &nav_menu_state, &menubar_state)?;
    Ok(())
}
```

## Notes

- `dispatch(&mut state, name, payload)` は `bool` を返す。未知のアクション名（`decode_action` の復号失敗）は安全側フォールバックとして `false`（no-op、状態不変）になる（`AppState`/`NavigationMenu`/`Menubar` 共通の不変条件）。`Menubar` も同じ状態機械の形（`toggle`/`next`/`close` 等の named action と `dispatch` 戻り値）に従い、ビュー組み立ては `nav_menu_view` と同じ「`Hydrate::hydration_attrs` を root の `attrs` へ直接マージする」形になる。
- `NavigationMenuProps`（`NavigationMenuProps::default()`）は `navigation_menu::root` / `list` と状態の `item` / `content` に `&props` として渡す。`trigger` / `link` は props を取らない。属性引数は `Vec<(&str, &str)>`、`Menubar::new` は `(0, 2, None | Some(0), false, Orientation::Horizontal)` の 5 引数。
- `hydrate("interactive-root")`（`AppState` 系）・`start_router("app-root")`（`layout` が組む系統）・`hydrate_navigation_menu("nav-menu-root")`・`hydrate_menubar("menubar-root")` は別系統・別 DOM。同一ページに同居させる場合は異なる `root_id` を使う。ブラウザでの実挙動配線（wasm glue の `hydrate_navigation_menu`/`hydrate_menubar`）は wasm 層の責務で、本サンプルの責務外。
- `@view-transition { navigation: auto; }`（Cross-Document View Transitions を有効化する固定 CSS リテラル）は `fandhe_frontend_app::page_shell` が内包する。自前で `<style>` を組み立てる必要はない。
- `fandhe-frontend-headless-ui` の `navigation_menu` / `menubar` は ark-ui の `NavigationMenu`/`Menubar` 相当の headless UI 層であり、JS の `@ark-ui/react` / `@chakra-ui/react` とは別物（Rust API）。
