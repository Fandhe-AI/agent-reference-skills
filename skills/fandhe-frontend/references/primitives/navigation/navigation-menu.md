# Navigation Menu

トリガー起点で開閉するナビゲーションパネル。Radix Primitives の Navigation Menu を参照した設計で、Root/List/Item/Trigger/ItemIndicator/Content/Link/Indicator の 8 anatomy パーツと「高々 1 項目が開く」状態機械（`SingleSelect` を埋め込んだ `NavigationMenu`）を提供する。

## Anatomy

```
root (nav)
  list (ul)
    item (li)
      trigger (button)
      item-indicator (span)
      content (div)
        link (a)
  indicator (span)
```

## Signature / Usage

```rust
use fandhe_frontend_headless_ui::navigation_menu::{
    root, list, item, trigger, item_indicator, content, indicator, link,
    NavigationMenu, NavigationMenuProps,
};

// props.orientation の既定は Orientation::Horizontal
pub fn root<'a>(props: &NavigationMenuProps, label: &'a str, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node;
pub fn list(props: &NavigationMenuProps, attrs: Vec<(&str, &str)>, children: Vec<Node>) -> Node;
pub fn item<'a>(state: OpenState, disabled: bool, props: &NavigationMenuProps, value: &'a str, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node;
pub fn trigger<'a>(
    state: OpenState,
    disabled: bool,
    value: &'a str,
    id: Option<&'a str>,
    controls: Option<&'a str>,
    attrs: Vec<(&'a str, &'a str)>,
    children: Vec<Node>,
) -> Node;
pub fn item_indicator<'a>(state: OpenState, props: &NavigationMenuProps, value: &'a str, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node;
pub fn content<'a>(
    state: OpenState,
    props: &NavigationMenuProps,
    value: &'a str,
    id: Option<&'a str>,
    labelled_by: Option<&'a str>,
    attrs: Vec<(&'a str, &'a str)>,
    children: Vec<Node>,
) -> Node;
pub fn indicator<'a>(state: OpenState, props: &NavigationMenuProps, value: Option<&'a str>, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node;
pub fn link<'a>(href: &'a str, current: bool, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node;

// 状態機械（SingleSelect を埋め込み。dispatch は "select"/"toggle"/"deselect"）
#[derive(Default)]
pub struct NavigationMenu { /* .. */ }
impl NavigationMenu {
    pub fn open_value(&self) -> Option<&str>;
    pub fn is_open(&self, value: &str) -> bool;
    pub fn item_state(&self, value: &str) -> OpenState;
    pub fn item<'a>(&self, value: &'a str, disabled: bool, props: &NavigationMenuProps, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node;
    pub fn trigger<'a>(&self, value: &str, disabled: bool, id: Option<&'a str>, controls: Option<&'a str>, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node;
    pub fn item_indicator<'a>(&self, value: &'a str, props: &NavigationMenuProps, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node;
    pub fn content<'a>(&self, value: &'a str, props: &NavigationMenuProps, id: Option<&'a str>, labelled_by: Option<&'a str>, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node;
    pub fn indicator<'a>(&self, props: &NavigationMenuProps, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node;
}
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `NavigationMenuProps.orientation` | `Orientation` | `Horizontal` | root / list / item / item-indicator / content / indicator の `data-orientation`（`trigger` / `link` には付与しない） |
| `root.label` | `&str` | — | `root`（`nav`）へ付与する `aria-label`（必須引数） |
| `item.state` | `OpenState` | — | 項目の開閉状態。`data-state` に反映される |
| `item.disabled` | `bool` | — | `true` のとき `data-disabled` を付与する |
| `item.value` / `trigger.value` / `item_indicator.value` / `content.value` | `&str` | — | 項目の識別値（`NavigationMenu` の `SingleSelect` キー）。`data-value` として出力され、`trigger` のクリックを `"toggle"` へ写像する際の payload になる |
| `trigger.controls` | `Option<&str>` | `None` | `Some` のとき `aria-controls` で `content` と関連付ける |
| `trigger.disabled` | `bool` | — | ネイティブ `disabled` 存在属性と `data-disabled` の両方へ反映。`type="button"` は常に固定付与（フォーム内 submit 誤爆対策） |
| `content.labelled_by` | `Option<&str>` | `None` | `Some` のときのみ `aria-labelledby` を付与する |
| `indicator.value` | `Option<&str>` | — | `Some` のときのみ `data-value`（開いている項目値）を出力。`NavigationMenu::indicator` は `open_value()` を自動注入する |
| `link.current` | `bool` | `false` | `true` のとき `aria-current="page"` + `data-current` を付与する |

## Data Attributes

| Part | Attribute | Values |
| --- | --- | --- |
| item / trigger / item-indicator / content / indicator | `data-state` | `open` \| `closed` |
| item / trigger / item-indicator / content | `data-value` | 項目値（`indicator` は `Some` のときのみ） |
| root / list / item / item-indicator / content / indicator | `data-orientation` | `horizontal` \| `vertical` |
| item / trigger | `data-disabled` | 存在属性 |
| link | `data-current` | 存在属性（`current=true` のとき） |

## Notes

- `role="navigation"`/`role="menu"`/`role="menuitem"` を一切付与しない（`<nav>` の暗黙 role に依拠。Radix NavigationMenu も同様に menu role を避けている）
- `content` は closed のとき `hidden` 存在属性を付与し、JS なしの SSR でも閉状態を表現する
- `item_indicator` は装飾用で常に `aria-hidden="true"`。`indicator`（ルートレベルのスライドポインタ）も `aria-hidden="true"` で、どの項目も開いていないとき `hidden`。`indicator` は `list` が素の `<ul>` のため `root` 直下・`list` の後ろに置く（`style` 属性は出力しない。座標追従はクライアント層・styled 層の責務）
- 呼び出し側 `attrs` による固定付与キー（`data-state` / `data-orientation` / `data-value` / `data-disabled`、`trigger` の `type` / `aria-expanded` / `disabled`、`link` の `aria-current` / `data-current` 等）の上書きは除去される
- viewport 寸法測定・`data-motion`（アニメーション方向の露出）、Viewport / Sub（入れ子）は headless 層に持ち込まない。hover による自動展開は実装しない（クリック起点の開閉のみ）
- [NavList](./nav-list.md) との使い分けの軸はディスクロージャの有無。単なるリンク集は NavList、開閉するパネルが必要なら本コンポーネントを使う
- キーボード操作の実 DOM 配線（Trigger 間の矢印キー移動・Home / End・Escape・フォーカス移動）は別クレート（wasm 層）の責務。`data-orientation` がその向き判定に使われる
- `@ark-ui/react` の JS/TS API とは別物（Rust 製、SSR 向け headless UI）

## Related

- [NavList](./nav-list.md)
- [Link](./link.md)
