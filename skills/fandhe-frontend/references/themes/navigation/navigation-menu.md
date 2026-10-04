# NavigationMenu

トリガーで開閉するナビゲーションパネル。「高々1個の Trigger だけが開く」状態機械（`NavigationMenu`、`SingleSelect` 埋め込み）を持つ、Primitives の headless 実装をそのまま再エクスポートし `stylesheet()` で既定 CSS のみを追加提供する薄い委譲。

## Anatomy

```
root
  list
    item
      trigger
      item-indicator
      content
        link
  indicator
```

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::navigation_menu::{
    root, list, item, trigger, content, link, NavigationMenu, NavigationMenuProps, OpenState,
};

let menu = NavigationMenu::default();
let props = NavigationMenuProps::default();
let node = root(&props, "Main", vec![], vec![
    list(&props, vec![], vec![
        menu.item("products", false, &props, vec![], vec![
            menu.trigger("products", false, None, None, vec![], vec![]),
            menu.content("products", &props, None, None, vec![], vec![]),
        ]),
    ]),
]);

// 自由関数（state を明示渡し）
pub fn root<'a>(props: &NavigationMenuProps, label: &'a str, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn list(props: &NavigationMenuProps, attrs: Vec<(&str, &str)>, children: Vec<Node>) -> Node
pub fn item<'a>(state: OpenState, disabled: bool, props: &NavigationMenuProps, value: &'a str, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn trigger<'a>(state: OpenState, disabled: bool, value: &'a str, id: Option<&'a str>, controls: Option<&'a str>, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn item_indicator<'a>(state: OpenState, props: &NavigationMenuProps, value: &'a str, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn content<'a>(state: OpenState, props: &NavigationMenuProps, value: &'a str, id: Option<&'a str>, labelled_by: Option<&'a str>, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn indicator<'a>(state: OpenState, props: &NavigationMenuProps, value: Option<&'a str>, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn link<'a>(href: &'a str, current: bool, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
```

`NavigationMenu` の利便メソッド（`item` / `trigger` / `item_indicator` / `content` / `indicator`）は項目 `value` の現在 `OpenState` を自動で注入する。`item_state(value)` / `open_value()` / `is_open(value)` で状態を参照できる。

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `NavigationMenuProps.orientation` | `Orientation` | `Horizontal` | `data-orientation` として root / list / item / item-indicator / content / indicator へ出力する。実際のキーボード操作は wasm-full の keynav が本属性を読んで解釈する |
| `root: label` | `&str` | — | `aria-label` として必須付与 |
| `item: state` / `trigger: state` / `item_indicator: state` / `content: state` / `indicator: state` | `OpenState` | — | `Open` / `Closed`。`NavigationMenu::item_state(value)` で解決できる。`indicator` は何かが開いているとき `Open` |
| `item: disabled` / `trigger: disabled` | `bool` | `false` | disabled 状態（`trigger` はネイティブ `disabled` 属性も付与） |
| `item: value` / `trigger: value` / `item_indicator: value` / `content: value` | `&str` | — | 項目値。`data-value` として出力する |
| `indicator: value` | `Option<&str>` | — | `Some` のときのみ `data-value` として出力（開いている項目値） |
| `trigger: id` / `content: id` | `Option<&str>` | `None` | `aria-controls`/`id` の対応付けに使う |
| `content: labelled_by` | `Option<&str>` | `None` | `Some` のときのみ `aria-labelledby` を付与 |
| `link: current` | `bool` | `false` | `true` のとき `aria-current="page"` を付与 |

## Data Attributes

| Part | Attribute | Values |
| --- | --- | --- |
| item / trigger / item-indicator / content / indicator | `data-state` | `open` \| `closed` |
| root / list / item / item-indicator / content / indicator | `data-orientation` | `horizontal` \| `vertical` |
| item / trigger / item-indicator / content / indicator | `data-value` | 項目値（`indicator` は `Some` のときのみ） |
| link | `data-current` | — |

## Notes

- `role` を明示付与しない。native `nav`/`ul`/`li`/`button`/`div`/`a` の暗黙ロールのみで構成する
- `item-indicator` は項目ごとの装飾要素（`<span>`）、`indicator` は `root` 直下・`list` の後ろ（兄弟）に 1 つだけ置くルートレベルの装飾要素。どちらも `aria-hidden="true"` を固定付与し、`indicator` は何も開いていないとき `hidden` を付与する。`indicator` は `style` を出力しない（座標追従は wasm-full の責務で、JS 無効時は pre-styled 層の CSS 変数フォールバックで破綻しない）
- `list` の `align-items` は `center` ではなく `flex-start` を既定にする（縦ずれ回帰の予防）
- `trigger` は `:focus-visible` のみのフォーカスリングを持つ（`link` は持たない）
- `data-motion`・viewport 寸法測定・キーボード操作の実 DOM 配線はスコープ外
- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）

## Related

- [NavList](./nav-list.md)
- [Toolbar](./toolbar.md)
- [Primitives: NavigationMenu](../../primitives/navigation/navigation-menu.md)
