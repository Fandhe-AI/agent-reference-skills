# Navigation Menu

トリガー起点で開閉するナビゲーションパネル。Radix Primitives の Navigation Menu を参照した設計で、Root/List/Item/Trigger/Content/Link の 6 anatomy パーツと「高々 1 項目が開く」状態機械（`SingleSelect` を埋め込んだ `NavigationMenu`）を提供する。

## Anatomy

```
root (nav)
  list (ul)
    item (li)
      trigger (button)
      content (div)
        link (a)
```

## Signature / Usage

```rust
use fandhe_frontend_headless_ui::navigation_menu::{root, list, item, trigger, content, link, NavigationMenu};

pub fn root<'a>(label: &'a str, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node;
pub fn list(attrs: Vec<(&str, &str)>, children: Vec<Node>) -> Node;
pub fn item<'a>(state: OpenState, disabled: bool, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node;
pub fn trigger<'a>(
    state: OpenState,
    disabled: bool,
    value: &'a str,
    id: Option<&'a str>,
    controls: Option<&'a str>,
    attrs: Vec<(&'a str, &'a str)>,
    children: Vec<Node>,
) -> Node;
pub fn content<'a>(
    state: OpenState,
    id: Option<&'a str>,
    labelled_by: Option<&'a str>,
    attrs: Vec<(&'a str, &'a str)>,
    children: Vec<Node>,
) -> Node;
pub fn link<'a>(href: &'a str, current: bool, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node;

// 状態機械（SingleSelect を埋め込み。dispatch は "select"/"toggle"/"deselect"）
#[derive(Default)]
pub struct NavigationMenu { /* .. */ }
impl NavigationMenu {
    pub fn open_value(&self) -> Option<&str>;
    pub fn is_open(&self, value: &str) -> bool;
    pub fn item_state(&self, value: &str) -> OpenState;
    pub fn item<'a>(&self, value: &str, disabled: bool, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node;
    pub fn trigger<'a>(&self, value: &str, disabled: bool, id: Option<&'a str>, controls: Option<&'a str>, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node;
    pub fn content<'a>(&self, value: &str, id: Option<&'a str>, labelled_by: Option<&'a str>, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node;
}
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `root.label` | `&str` | — | `root`（`nav`）へ付与する `aria-label`（必須引数） |
| `item.state` | `OpenState` | — | 項目の開閉状態。`data-state` に反映される |
| `item.disabled` | `bool` | — | `true` のとき `data-disabled` を付与する |
| `trigger.value` | `&str` | — | `item`/`content` と対応付ける識別値（`NavigationMenu` の `SingleSelect` キー） |
| `trigger.controls` | `Option<&str>` | `None` | `Some` のとき `aria-controls` で `content` と関連付ける |
| `trigger.disabled` | `bool` | — | ネイティブ `disabled` 存在属性と `data-disabled` の両方へ反映。`type="button"` は常に固定付与（フォーム内 submit 誤爆対策） |
| `content.labelled_by` | `Option<&str>` | `None` | `Some` のときのみ `aria-labelledby` を付与する |
| `link.current` | `bool` | `false` | `true` のとき `aria-current="page"` + `data-current` を付与する |

## Notes

- `role="navigation"`/`role="menu"`/`role="menuitem"` を一切付与しない（`<nav>` の暗黙 role に依拠。Radix NavigationMenu も同様に menu role を避けている）
- `content` は closed のとき `hidden` 存在属性を付与し、JS なしの SSR でも閉状態を表現する
- viewport 寸法測定・`data-motion`（アニメーション方向の露出）は headless 層に持ち込まない（styled 層の責務）
- [NavList](./nav-list.md) との使い分けの軸はディスクロージャの有無。単なるリンク集は NavList、開閉するパネルが必要なら本コンポーネントを使う
- キーボード操作の実 DOM 配線（矢印キー・Escape・フォーカス移動）は別クレート（wasm 層）の責務
- `@ark-ui/react` の JS/TS API とは別物（Rust 製、SSR 向け headless UI）

## Related

- [NavList](./nav-list.md)
- [Link](./link.md)
