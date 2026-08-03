# NavList

文書ナビ向け Link リスト。`nav`/`h2`/`ul`/`li`/`a` の暗黙 ARIA ロールをそのまま使い、`role` 属性を一切付与しない headless コンポーネント（「操作可能なメニュー」との誤読を避けるのが存在理由）。状態機械を持たない静的なリンク集（ディスクロージャなし）。

## Anatomy

```
root (nav)
  heading (h2)
  list (ul)
    item (li)
      link (a)
```

## Signature / Usage

```rust
use fandhe_frontend_headless_ui::nav_list::{root, heading, list, item, link};

pub fn root<'a>(label: &'a str, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node;
pub fn heading(attrs: Vec<(&str, &str)>, children: Vec<Node>) -> Node;
pub fn list(attrs: Vec<(&str, &str)>, children: Vec<Node>) -> Node;
pub fn item(attrs: Vec<(&str, &str)>, children: Vec<Node>) -> Node;
pub fn link<'a>(
    href: &'a str,
    current: bool,
    attrs: Vec<(&'a str, &'a str)>,
    children: Vec<Node>,
) -> Node;
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `root.label` | `&str` | — | `root`（`nav`）へ付与する `aria-label`（必須引数）。複数 `nav` ランドマークをスクリーンリーダー利用者が区別するために必須化している |
| `link.href` | `&str` | — | 遷移先 URL。危険な URL スキームは core の `render()` が属性ごと拒否する |
| `link.current` | `bool` | — | `true` のとき `aria-current="page"` + `data-current` を付与する |

## Notes

- `root`/`heading`/`list`/`item`/`link` のいずれも `role` を一切付与しない（`menu` と誤読させない設計判断）
- [NavigationMenu](./navigation-menu.md) との使い分けの軸は role の有無ではなくディスクロージャの有無。単なるリンク集は NavList、開閉するパネルが必要なら NavigationMenu を使う
- キーボードナビゲーション（矢印キーでの項目間移動）は提供しない（通常の Tab 移動のみ）
- `@ark-ui/react` の JS/TS API とは別物（Rust 製、SSR 向け headless UI）

## Related

- [NavigationMenu](./navigation-menu.md)
- [Breadcrumb](./breadcrumb.md)
- [Link](./link.md)
