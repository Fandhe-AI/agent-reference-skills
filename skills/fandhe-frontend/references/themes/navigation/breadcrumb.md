# Breadcrumb

現在位置までの階層パスを示すパンくずナビゲーション。Primitives の headless Breadcrumb（`nav`/`ol`/`li` 構造）を薄くラップし、`size`/`variant` の既定 CSS を追加する。

## Anatomy

```
root（styled、size/variant クラス付与）
  list
    item
      link
      current-link
    separator
    ellipsis
```

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::breadcrumb::{self, BreadcrumbVariant};
use fandhe_frontend_pre_styled_ui::Size;

let node = breadcrumb::root(Size::Md, BreadcrumbVariant::default(), None, vec![], vec![]);
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `root: size` | `Size` | `Md` | `Sm` / `Md` / `Lg`。`root` の `font-size` を切り替える |
| `root: variant` | `BreadcrumbVariant` | `Plain` | `Plain`（下線なし）/ `Underline`（常時下線） |
| `root: aria_label_value` | `Option<&str>` | `None` | `None` のとき既定値 `"breadcrumb"` を `aria-label` に適用する |

## Notes

- `list`/`item`/`link`/`current_link`/`separator`/`ellipsis` は Primitives（headless-ui）の自由関数をそのまま再エクスポートする。クラス付与は `root` のみが担う
- `current_link` は `aria-current="page"` + `data-current` を常に付与する。`separator`/`ellipsis` は `role="presentation"` + `aria-hidden="true"`
- `link.href` の危険な URL スキーム（`javascript:` 等）は core の `render()` が属性ごと拒否する
- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）

## Related

- [NavList](./nav-list.md)
- [Primitives: Breadcrumb](../../primitives/navigation/breadcrumb.md)
