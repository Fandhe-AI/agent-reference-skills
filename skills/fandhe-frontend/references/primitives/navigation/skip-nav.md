# SkipNav

キーボード操作時のみ視覚的に現れる「本文へスキップ」リンク（WCAG 2.1 SC 2.4.1 Bypass Blocks）。状態機械を持たない純粋関数のみで構成する headless コンポーネント。

## Anatomy

```
link (a)
content (div)
```

## Signature / Usage

```rust
use fandhe_frontend_headless_ui::skip_nav::{link, content, DEFAULT_ID};

pub const DEFAULT_ID: &str = "fandhe-skip-nav";

pub fn link<'a>(id: &str, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node;
pub fn content<'a>(id: &'a str, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node;
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `link.id` | `&str` | `DEFAULT_ID` | スキップ先 id。`href="#<id>"` として常時出力する。呼び出し側 `attrs` に同名（大文字小文字無視）の `href` があっても除去してから合成する |
| `content.id` | `&str` | `DEFAULT_ID` | `id="<id>"` + `tabindex="-1"` を常時出力する。呼び出し側 `attrs` に同名の `id`/`tabindex` があっても除去してから合成する |

## Notes

- `link` は呼び出し側から任意の URL を受け取らず、常に `#<id>`（フラグメントのみ）を内部で組み立てる。`javascript:` 等のスキーム注入経路を構造的に持たない
- `content` の `tabindex="-1"` は `link` クリック時のプログラム的フォーカス移動のみを許可し、通常の Tab 順序には加えない
- `link`/`content` はいずれも `role`/`aria-*` 属性を出力しない
- `@ark-ui/react` の JS/TS API とは別物（Rust 製、SSR 向け headless UI）

## Related

- [Link](./link.md)
