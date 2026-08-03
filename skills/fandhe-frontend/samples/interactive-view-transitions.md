# Client-side state machine with View Transitions and headless-ui overlays

`AppState`/`NavigationMenu`/`Menubar` に対して `dispatch` でアクションを適用し、`@view-transition` を含む `page_shell` へ `NavigationMenu` の headless-ui オーバーレイを配線した SSR ページを書き出す。

```rust
use fandhe_frontend_app::{demo_items, layout, list_page, page_shell};
use fandhe_frontend_core::{el, render, text, Node};
use fandhe_frontend_headless_ui::menubar::Menubar;
use fandhe_frontend_headless_ui::navigation_menu::{self, NavigationMenu};
use fandhe_frontend_interactive::{dispatch, render_for_hydration, AppState, Component, Hydrate};
use std::error::Error;
use std::fs;

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
    let hydrate_attrs = state.hydration_attrs();
    let hydrate_attrs_ref: Vec<(&str, &str)> = hydrate_attrs
        .iter()
        .map(|(k, v)| (k.as_str(), v.as_str()))
        .collect();
    let mut root_attrs: Vec<(&str, &str)> = vec![("id", "nav-menu-root")];
    root_attrs.extend(hydrate_attrs_ref);

    navigation_menu::root(
        "製品・ドキュメントナビゲーション",
        root_attrs,
        vec![navigation_menu::list(
            vec![],
            vec![state.item(
                "products",
                false,
                vec![],
                vec![
                    state.trigger(
                        "products",
                        false,
                        Some("nav-menu-products-trigger"),
                        Some("nav-menu-products-content"),
                        vec![],
                        vec![text("製品")],
                    ),
                    state.content(
                        "products",
                        Some("nav-menu-products-content"),
                        Some("nav-menu-products-trigger"),
                        vec![],
                        vec![navigation_menu::link(
                            "/nav-menu/products",
                            false,
                            vec![],
                            vec![text("製品を見る")],
                        )],
                    ),
                ],
            )],
        )],
    )
}

fn run_navigation_menu_demo() {
    let mut state = NavigationMenu::default();
    for (name, payload) in [
        ("toggle", "products"),
        // 開いている項目の再クリックは disclosure nav として閉じる。
        ("toggle", "products"),
        // OverlayCloseController の閉鎖要求（Escape・外側クリック）を
        // 受けた呼び出し側が dispatch する冪等操作。
        ("deselect", ""),
    ] {
        let applied = dispatch(&mut state, name, payload);
        println!("dispatch({name:?}, {payload:?}) -> applied={applied}, state={state:?}");
    }
}

/// `layout` + `list_page`（`start_router` 系統）・`render_for_hydration`
/// （`hydrate` 系統）・navigation-menu デモを 1 ページに同居させ、
/// `page_shell`（`@view-transition { navigation: auto; }` を内包）で
/// `dist/index.html` へ書き出す。
fn write_ssr_html(state: &AppState, nav_menu_state: &NavigationMenu) -> Result<(), Box<dyn Error>> {
    let router_demo = layout("記事一覧 (start_router 系統)", list_page(&demo_items()));
    let hydrate_demo = render_for_hydration(state);
    let nav_menu_demo = nav_menu_view(nav_menu_state);
    let combined = el("div", vec![], vec![router_demo, hydrate_demo, nav_menu_demo]);
    let html = page_shell("状態管理 + View Transitions サンプル", combined);

    fs::create_dir_all("dist")?;
    fs::write("dist/index.html", html)?;
    Ok(())
}

fn main() -> Result<(), Box<dyn Error>> {
    run_native_demo();
    run_navigation_menu_demo();

    let state = AppState::new();
    // 「products が開いている」初期状態にし、SSR で開閉双方の見た目を検分できるようにする。
    let nav_menu_state = {
        let mut s = NavigationMenu::default();
        dispatch(&mut s, "select", "products");
        s
    };
    write_ssr_html(&state, &nav_menu_state)?;
    Ok(())
}
```

## Notes

- `dispatch(&mut state, name, payload)` は `bool` を返す。未知のアクション名（`decode_action` の復号失敗）は安全側フォールバックとして `false`（no-op、状態不変）になる（`AppState`/`NavigationMenu`/`Menubar` 共通の不変条件）。`Menubar` も同じ状態機械の形（`toggle`/`next`/`close` 等の named action と `dispatch` 戻り値）に従うが、ビュー組み立ては `nav_menu_view` と同じ「`Hydrate::hydration_attrs` を root の `attrs` へ直接マージする」形になる。
- `hydrate("interactive-root")`（`AppState` 系）・`start_router("app-root")`（`layout` が組む系統）・`hydrate_navigation_menu("nav-menu-root")`・`hydrate_menubar("menubar-root")` は別系統・別 DOM。同一ページに同居させる場合は異なる `root_id` を使う。ブラウザでの実挙動配線（`wasm/src/lib.rs` の `hydrate_navigation_menu`/`hydrate_menubar`）は wasm 層の責務で、本サンプルの責務外。
- `@view-transition { navigation: auto; }`（Cross-Document View Transitions を有効化する固定 CSS リテラル）は `fandhe_frontend_app::page_shell` が内包する。自前で `<style>` を組み立てる必要はない。
- `fandhe-frontend-headless-ui` の `navigation_menu` / `menubar` は ark-ui の `NavigationMenu`/`Menubar` 相当の headless UI 層であり、JS の `@ark-ui/react` / `@chakra-ui/react` とは別物（Rust API）。
