# Breadcrumb

パンくずナビゲーション。`nav[aria-label="breadcrumb"]` + `ol`/`li` + `aria-current="page"` の静的意味論マークアップを組み立てる headless コンポーネント。状態機械を持たない自由関数群。

## Anatomy

```
root (nav)
  list (ol)
    item (li)
      link (a)
      current-link (span)
    separator (li)
    ellipsis (li)
```

## Signature / Usage

```rust
use fandhe_frontend_headless_ui::breadcrumb::{root, list, item, link, current_link, separator, ellipsis, breadcrumb, BreadcrumbItem};

pub fn root<'a>(aria_label_value: Option<&'a str>, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node;
pub fn list(attrs: Vec<(&str, &str)>, children: Vec<Node>) -> Node;
pub fn item(attrs: Vec<(&str, &str)>, children: Vec<Node>) -> Node;
pub fn link<'a>(href: &'a str, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node;
pub fn current_link(attrs: Vec<(&str, &str)>, children: Vec<Node>) -> Node;
pub fn separator(attrs: Vec<(&str, &str)>, children: Vec<Node>) -> Node;
pub fn ellipsis(attrs: Vec<(&str, &str)>) -> Node;

// 利便ビルダー: items から nav > ol > (li + li)* を組み立てる
pub fn breadcrumb<'a>(
    aria_label_value: Option<&'a str>,
    items: &[BreadcrumbItem<'a>],
    separator_children: impl Fn() -> Vec<Node>,
) -> Node;
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `root.aria_label_value` | `Option<&str>` | `"breadcrumb"` | `None` のとき既定値 `"breadcrumb"` を `aria-label` に適用する |
| `link.href` | `&str` | — | 遷移先 URL。危険な URL スキーム（`javascript:` 等）は core の `render()` が属性ごと拒否する |
| `breadcrumb.items` | `&[BreadcrumbItem]` | — | `label`/`href` を持つパンくず項目の配列。末尾項目のみ `current_link` として描画される |
| `breadcrumb.separator_children` | `impl Fn() -> Vec<Node>` | — | 項目間の区切りに毎回呼び出される子ノード生成クロージャ |

## Notes

- `current_link` は末尾項目（現在ページ）用の非対話要素（`span`）。`aria-current="page"` + `data-current` を常に付与する
- `separator`/`ellipsis` は `role="presentation"` + `aria-hidden="true"` で装飾扱いとし、スクリーンリーダーの読み上げから除外する
- `items` が空のときは空の `list` を持つ `root` を返す（panic しない fail-closed）
- `@ark-ui/react` の JS/TS API とは別物（Rust 製、SSR 向け headless UI）

## Related

- [Link](./link.md)
- [NavList](./nav-list.md)
