# SkipNav

`fandhe_frontend_headless_ui::skip_nav` の `link`/`content` 2パーツを薄く再利用し、「キーボードフォーカス時のみ視覚的に現れる」既定 CSS を追加する styled ラッパー（WCAG 2.1 SC 2.4.1 Bypass Blocks）。JS/hydration 配線を持たない純 CSS（`:focus-visible`）のみで表現する。

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::skip_nav::{link, DEFAULT_ID};

let node = link(DEFAULT_ID, vec![], vec![/* text("Skip to content") */]);
```

```rust
pub fn link<'a>(id: &str, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node;
pub fn content<'a>(id: &'a str, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node;
```

`DEFAULT_ID` は headless 層から再エクスポートされる。

## Anatomy

```
link (a)
content (div)
```

## Notes

- `link` の base 宣言は `crate::visually_hidden::clip_declarations`（clip 手法）を再利用し、`:focus-visible` 時に `position: fixed` + 座標 + 背景 + `z-index` で視覚的に復元する
- `content` は `outline: none` のみ（`tabindex="-1"` によるプログラム的フォーカス先であり、実コンテンツを持たない）
- `link`（`<a>`）自身が実フォーカスを受け取る通常の要素のため、`data-focus-visible` 存在属性 + クライアントランタイム方式（switch/radio_group 等）は不要
- `fandhe-frontend-docs-site` は hydration を持たないため、本部品の表示切り替えは CSS のみで完結する
- Themes は Primitives（`fandhe_frontend_headless_ui::skip_nav`）への薄いラッパーであり、既定 CSS のみを追加する
- `@ark-ui/react` の JS/TS API とは別物（Rust 製）

## Related

- [SkipNav (primitives)](../../primitives/navigation/skip-nav.md)
- [VisuallyHidden](./visually-hidden.md)
