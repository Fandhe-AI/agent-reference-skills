# Item

media（アイコン・画像・アバター）+ title / description + actions からなる汎用リスト行を表現する shadcn/ui Item 相当の部品。`root` / `media` / `content` / `title` / `description` / `actions` / `header` / `footer` / `group` / `separator` の 10 anatomy パーツを持つ。

## Signature / Usage

```rust
use fandhe_frontend_core::text;
use fandhe_frontend_headless_ui::item::{self, ItemMediaVariant, ItemRootProps};

let node = item::group("Notifications", vec![], vec![
    item::root(
        ItemRootProps { href: Some("/inbox"), ..Default::default() },
        vec![],
        vec![
            item::media(ItemMediaVariant::Icon, vec![], vec![]),
            item::content(vec![], vec![
                item::title(vec![], vec![text("Inbox")]),
                item::description(vec![], vec![text("3 unread messages")]),
            ]),
            item::actions(vec![], vec![]),
        ],
    ),
    item::separator(vec![], vec![]),
]);
```

```rust
item::root<'a>(props: ItemRootProps<'a>, attrs, children) -> Node
item::media(variant: ItemMediaVariant, attrs, children) -> Node
item::group(label: &str, attrs, children) -> Node
item::content / title / description / actions / header / footer / separator (attrs, children) -> Node
```

## Anatomy

典型的な入れ子の一例（各パーツは自由関数で独立に組み立てられる）。

```
group
  root (div | a)
    header
    media
    content
      title
      description
    actions
    footer
  separator
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `ItemRootProps.href` | `Option<&str>` | `None` | `Some` なら `a`、`None` なら `div` として描画し `href` を固定付与 |
| `ItemRootProps.external` | `bool` | `false` | `href` が `Some` のときのみ有効。`target="_blank"` + `rel="noopener noreferrer"` を不可分に付与 |
| `ItemRootProps.variant` | `ItemVariant` | `Default` | `Default` \| `Outline` \| `Muted`。`data-variant` |
| `ItemRootProps.size` | `ItemSize` | `Default` | `Default` \| `Sm`。`data-size` |
| `media: variant` | `ItemMediaVariant` | `Default` | `Default` \| `Icon` \| `Image`。`data-variant` |
| `group: label` | `&str` | 必須 | 空文字列でないときのみ `aria-label` |

## Data Attributes

| Part | Attribute | Values |
| --- | --- | --- |
| root | `data-variant` | `default` \| `outline` \| `muted` |
| root | `data-size` | `default` \| `sm` |
| media | `data-variant` | `default` \| `icon` \| `image` |
| separator | `data-orientation` / `aria-orientation` | `horizontal`（固定） |

## Notes

- 出典: https://fandhe-ai.github.io/fandhe-frontend/primitives/item/
- `title` は `div`（見出しレベルは呼び出し側が子ノードで決める）、`description` は `p`。
- `group` は `role="group"` 固定。shadcn/ui の `ItemGroup` は `role="list"` だが、`a[href]` は WAI-ARIA 上 `listitem` ロールを持てず `list` / `listitem` 対を成立させられないため意図的に差分化している。
- `separator` は `role="separator"` + 水平固定（`group` は常に縦並びのため）。
- `root` が `a` のときのみキーボード操作はネイティブ `a[href]` の `Tab` / `Shift+Tab` / `Enter` に依存。`div` のときはキー操作を提供せず、`role` も付与しない（`a` の暗黙の `link` ロールに委ねる）。
- 自前 CSS の最小例: `[data-scope="item"][data-part="root"][data-variant="outline"] { border: 1px solid currentColor; }`。
- `@ark-ui/react` の JS/TS API とは別物（Rust 製、`fandhe-frontend-headless-ui`）。

## Related

- [Avatar](./avatar.md)
- [Nav List](../navigation/nav-list.md)
- [Item（Themes 版）](../../themes/data-display/item.md)
