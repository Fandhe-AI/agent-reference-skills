# Headless UI anatomy with pre-styled variants and theme token overrides

`fandhe-frontend-pre-styled-ui` の headless ラッパー（Dialog/Menu/Select/Popover/Tooltip/NavigationMenu/Menubar/Tabs/Accordion）と styled 部品（Button/Badge/Card/Alert/Spinner/Switch/RadioGroup/Avatar）を横断し、`Theme::upsert_color`/`upsert_space` でテーマトークンをカスタマイズして `StyleSheet` へ集約する。

```rust
use fandhe_frontend_core::{el, render, text, Node};
use fandhe_frontend_pre_styled_ui::button::{button, ButtonProps, ButtonVariant};
use fandhe_frontend_pre_styled_ui::dialog::{self, ContentIds, DialogRole};
use fandhe_frontend_pre_styled_ui::menu;
use fandhe_frontend_pre_styled_ui::radio_group;
use fandhe_frontend_pre_styled_ui::stylesheet::StyleSheet;
use fandhe_frontend_pre_styled_ui::switch;
use fandhe_frontend_pre_styled_ui::theme::Theme;
use fandhe_frontend_pre_styled_ui::{ColorPalette, OpenState, Orientation, Size};

/// headless ラッパー経由の overlay 型コンポーネント（Dialog）。
/// SSR 初期状態は常に `OpenState::Closed`、全 anatomy を `hidden` 付きで DOM に掲載する。
fn dialog_section() -> Node {
    let state = OpenState::Closed;
    el(
        "div",
        vec![],
        vec![
            dialog::trigger(
                state,
                Some("showcase-dialog-content"),
                vec![],
                vec![text("Open dialog")],
            ),
            dialog::root(
                Size::Md,
                state,
                vec![],
                vec![
                    dialog::backdrop(state, vec![], vec![]),
                    dialog::positioner(
                        state,
                        vec![],
                        vec![dialog::content(
                            state,
                            DialogRole::Dialog,
                            true,
                            ContentIds {
                                id: Some("showcase-dialog-content"),
                                labelledby: Some("showcase-dialog-title"),
                                describedby: Some("showcase-dialog-description"),
                            },
                            vec![],
                            vec![
                                dialog::title(
                                    Some("showcase-dialog-title"),
                                    vec![],
                                    vec![text("Confirm action")],
                                ),
                                dialog::description(
                                    Some("showcase-dialog-description"),
                                    vec![],
                                    vec![text("この操作は取り消せません。続行しますか？")],
                                ),
                                // close-trigger はアイコン専用契約。
                                // 支援技術向けラベルは aria-label で維持する
                                dialog::close_trigger(
                                    vec![("aria-label", "Close")],
                                    vec![text("×")],
                                ),
                            ],
                        )],
                    ),
                ],
            ),
        ],
    )
}

/// headless ラッパー経由の overlay 型コンポーネント（Menu）。1 件目は
/// `highlighted: true` で virtual focus（実 DOM フォーカスは trigger に留まる）を実演する。
fn menu_section() -> Node {
    let state = OpenState::Closed;
    let items = vec![
        menu::item_group(
            Some("showcase-menu-group-label"),
            vec![],
            vec![
                menu::item_group_label(
                    Some("showcase-menu-group-label"),
                    vec![],
                    vec![text("Actions")],
                ),
                menu::item("duplicate", false, true, vec![], vec![text("Duplicate")]),
                menu::item("rename", false, false, vec![], vec![text("Rename")]),
            ],
        ),
        menu::separator(vec![], vec![]),
        menu::item("delete", true, false, vec![], vec![text("Delete")]),
    ];
    menu::root(
        Size::Md,
        state,
        vec![],
        vec![
            menu::trigger(
                state,
                false,
                Some("showcase-menu-content"),
                vec![("id", "showcase-menu-trigger")],
                vec![text("Open menu")],
            ),
            menu::indicator(state, vec![], vec![]),
            menu::positioner(
                state,
                vec![],
                vec![menu::content(
                    state,
                    Some("showcase-menu-content"),
                    Some("showcase-menu-trigger"),
                    vec![],
                    items,
                )],
            ),
        ],
    )
}

/// styled root（variant 付与）型コンポーネント（Switch）。headless の自由関数と
/// 異なり `size`/`palette` を取り、`fd-switch--size-*`/`fd-switch--color-palette-*` を付与する。
/// 子パーツは `&SwitchProps` を取る。
fn switch_section() -> Node {
    let checked = true;
    let props = switch::SwitchProps::default();
    switch::root(
        Size::Md,
        ColorPalette::Accent,
        checked,
        &props,
        vec![],
        vec![
            switch::control(
                checked,
                &props,
                vec![],
                vec![switch::thumb(checked, &props, vec![], vec![])],
            ),
            switch::label(checked, &props, vec![], vec![text("Enable notifications")]),
            switch::hidden_input("notifications", "on", checked, &props, vec![]),
        ],
    )
}

/// styled root（variant 付与）型コンポーネント（RadioGroup）。
fn radio_group_section() -> Node {
    let props = radio_group::RadioGroupProps::default();
    let options = [
        ("ssr", "SSR", true),
        ("ssg", "SSG", false),
        ("csr", "CSR", false),
    ];
    let mut items = Vec::new();
    for (value, label_text, checked) in options {
        items.push(radio_group::item(
            checked,
            &props,
            value,
            vec![],
            vec![
                radio_group::item_hidden_input(checked, &props, Some("render-mode"), value, vec![]),
                radio_group::item_control(checked, &props, vec![]),
                radio_group::item_text(checked, &props, vec![], vec![text(label_text)]),
            ],
        ));
    }
    radio_group::root(
        Size::Md,
        ColorPalette::Accent,
        false,
        Some(Orientation::Vertical),
        Some("render-mode-label"),
        vec![],
        std::iter::once(radio_group::label(
            &props,
            Some("render-mode-label"),
            vec![],
            vec![text("Render mode")],
        ))
        .chain(items)
        .collect(),
    )
}

/// 単純 styled 部品（Button）。variant/size/colorPalette を Rust enum で型安全に指定する。
fn outline_button() -> Node {
    button(
        &ButtonProps {
            variant: ButtonVariant::Outline,
            palette: ColorPalette::Danger,
            size: Size::Sm,
            ..ButtonProps::default()
        },
        vec![],
        vec![text("Outline")],
    )
}

/// `StyleSheet` へテーマトークン・手書き CSS・使用コンポーネントの recipe CSS を
/// 集約する。取り込み順は「テーマトークン → 手書き CSS → recipe CSS」
/// （後段の recipe が `var(--fandhe-...)` でトークンを参照するため）。
fn build_stylesheet() -> Result<StyleSheet, fandhe_frontend_pre_styled_ui::StylesheetError> {
    let mut theme = Theme::default();
    // `push_color` は同名トークンを `ThemeError::DuplicateTokenName` で
    // fail-closed 拒否するため、既定パレット（`accent`）の上書きには
    // `upsert_color` が正規経路。挿入順＝出力順は upsert でも保たれる。
    theme
        .upsert_color("accent", "#0f766e", "#2dd4bf")
        .expect("\"accent\"/\"#0f766e\"/\"#2dd4bf\" are statically valid theme tokens");
    // `upsert_space` は不在トークンに対しては `push_space` と同じ挿入動作
    // （末尾追加）になる。手書き CSS が `var(--fandhe-space-showcase-gap)` を参照する。
    theme
        .upsert_space("showcase-gap", "1.25rem")
        .expect("\"showcase-gap\"/\"1.25rem\" are statically valid theme tokens");

    let mut sheet = StyleSheet::new();
    sheet.push_theme(&theme);
    sheet.push_css(include_str!("../static/ui.css"))?;
    for css in [
        fandhe_frontend_pre_styled_ui::dialog::stylesheet(),
        fandhe_frontend_pre_styled_ui::menu::stylesheet(),
        fandhe_frontend_pre_styled_ui::switch::stylesheet(),
        fandhe_frontend_pre_styled_ui::radio_group::stylesheet(),
        fandhe_frontend_pre_styled_ui::button::css(),
    ] {
        sheet.push_css(&css)?;
    }
    Ok(sheet)
}

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let page = el(
        "div",
        vec![],
        vec![
            dialog_section(),
            menu_section(),
            switch_section(),
            radio_group_section(),
            outline_button(),
        ],
    );
    let dist = std::path::Path::new("dist");
    let assets = dist.join("assets");
    std::fs::create_dir_all(&assets)?;
    std::fs::write(dist.join("index.html"), format!("<!DOCTYPE html>\n{}", render(&page)))?;
    build_stylesheet()?.write_css_file(&assets.join("ui.css"))?;
    Ok(())
}
```

## Notes

- headless ラッパー（Dialog / Menu / Select / Popover / Tooltip / NavigationMenu / Menubar / Tabs / Accordion）はマークアップを headless 層がそのまま生成し `stylesheet()` が既定 CSS を追加提供する薄い委譲層で、overlay 型（`positioner` を持つもの）は SSR 初期状態を常に `OpenState::Closed` にし全 anatomy を `hidden` 付きで DOM に掲載する（開閉の実挙動は wasm 層の責務）。対して styled root（variant 付与）型（Switch / RadioGroup / Avatar）は headless の自由関数 `root(attrs, children)` とは異なり `size`/`palette`（または `shape`）を取り、recipe 生成クラス（`fd-switch--size-*` 等）を付与する。
- Switch / RadioGroup は props 構造体（`switch::SwitchProps` / `radio_group::RadioGroupProps`）を `Default` で作り、`control` / `thumb` / `label` / `hidden_input` / `item*` / `label` の各子パーツへ `&props` で渡す。`radio_group::root` は `Size`・`ColorPalette`・`disabled`・`Option<Orientation>`・labelledby の後に `attrs`・`children` を取る。属性引数は常に `Vec<(&str, &str)>`（`Node` ではない）。
- 単純 styled 部品（Button / Badge / Card / Alert / Spinner）は variant/size/colorPalette を Rust enum（`ButtonVariant` / `ColorPalette` / `Size` 等）で指定する（Card のみ `root`/`header`/`body`/`footer`/`title`/`description` を個別に呼び出す）。コンポーネントへ渡す文字列はすべて `text()` 経由で載せ、`raw_html()` は使わない。
- `StyleSheet::push_css` は fail-closed 検証を持ち、`<` を含む CSS を拒否して `Err` を返す。`Theme::upsert_color`/`upsert_space` は `push_color`/`push_space` と異なり同名トークンの重複を許容し既存値を置き換える（既定パレットの上書きに使う正規経路）。`include_str!("../static/ui.css")` は公式 example の `static/ui.css`（ページ骨格のみの手書き CSS）を指す。
- `fandhe-frontend-headless-ui` / `fandhe-frontend-pre-styled-ui` は ark-ui / chakra-ui 相当の 2 層構成だが、JS の `@ark-ui/react` / `@chakra-ui/react` とは別物（Rust API）。
