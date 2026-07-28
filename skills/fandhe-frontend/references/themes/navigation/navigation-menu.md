# NavigationMenu

トリガーで開閉するナビゲーションパネル。「高々1個の Trigger だけが開く」状態機械（`NavigationMenu`、`SingleSelect` 埋め込み）を持つ、Primitives の headless 実装をそのまま再エクスポートし `stylesheet()` で既定 CSS のみを追加提供する薄い委譲。

## Anatomy

```
root
  list
    item
      trigger
      content
        link
```

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::navigation_menu::{root, list, item, trigger, content, link, NavigationMenu, OpenState};

let menu = NavigationMenu::default();
let node = root("Main", vec![], vec![
    list(vec![], vec![
        item(menu.item_state("products"), false, vec![], vec![
            trigger(menu.item_state("products"), false, None, None, vec![], vec![]),
            content(menu.item_state("products"), None, None, vec![], vec![]),
        ]),
    ]),
]);
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `root: label` | `&str` | — | `aria-label` として必須付与 |
| `item: state` / `trigger: state` / `content: state` | `OpenState` | — | `Open` / `Closed`。`NavigationMenu::item_state(value)` で解決できる |
| `item: disabled` / `trigger: disabled` | `bool` | `false` | disabled 状態（`trigger` はネイティブ `disabled` 属性も付与） |
| `trigger: id` / `content: id` | `Option<&str>` | `None` | `aria-controls`/`id` の対応付けに使う |
| `content: labelled_by` | `Option<&str>` | `None` | `Some` のときのみ `aria-labelledby` を付与 |
| `link: current` | `bool` | `false` | `true` のとき `aria-current="page"` を付与 |

## Data Attributes

| Part | Attribute | Values |
| --- | --- | --- |
| item / trigger / content | `data-state` | `open` \| `closed` |
| link | `data-current` | — |

## Notes

- `role` を明示付与しない。native `nav`/`ul`/`li`/`button`/`div`/`a` の暗黙ロールのみで構成する
- `list` の `align-items` は `center` ではなく `flex-start` を既定にする（縦ずれ回帰の予防）
- `trigger` は `:focus-visible` のみのフォーカスリングを持つ（`link` は持たない）
- `data-motion`・viewport 寸法測定・キーボード操作の実 DOM 配線はスコープ外
- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）

## Related

- [NavList](./nav-list.md)
- [Toolbar](./toolbar.md)
- [Primitives: NavigationMenu](../../primitives/navigation/navigation-menu.md)
