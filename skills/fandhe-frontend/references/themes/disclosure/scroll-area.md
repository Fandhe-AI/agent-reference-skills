# ScrollArea

`fandhe_frontend_headless_ui::scroll_area` の Root / Viewport / Content / Scrollbar / Thumb / Corner 6 パーツをそのまま再エクスポートし、既定 CSS を追加する styled ラッパー。CSS `overflow` を主体とするスクロール表現で、状態機械を持たない自由関数のみのモジュール。

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::scroll_area::{root, viewport, content};

let node = root(vec![], viewport(vec![], vec![content(vec![], vec![])]));
```

`root`/`viewport`/`content`/`scrollbar`/`thumb`/`corner` はすべて headless 層 `fandhe_frontend_headless_ui::scroll_area::*` の再エクスポートで、variant 引数を持たない（`pub use ...::*`）。

## Anatomy

```
root
  viewport
    content
  scrollbar
    thumb
  corner
```

## Notes

- `viewport` に `overflow: auto` + `height/width: 100%`（`root` へ連動）を付与し、ネイティブスクロールを実現する。`root` は `position: relative; overflow: hidden`
- `scrollbar`/`thumb`/`corner` は初期実装で `display: none`。代わりに `viewport` へ `scrollbar-width: thin`/`scrollbar-color` + `::-webkit-scrollbar` 系 CSS を付与してネイティブスクロールバーを装飾する
- JS によるスクロール位置追従・thumb drag はスコープ外
- `variant`/`size` 軸は提供しない（イシュー #825 判断）
- `viewport` はキーボード操作時のみ `:focus-visible` のフォーカスリングを持つ
- Themes は Primitives（`fandhe_frontend_headless_ui::scroll_area`）への薄いラッパーであり、既定 CSS のみを追加する
- `@ark-ui/react` の JS/TS API とは別物（Rust 製）

## Related

- [ScrollArea (primitives)](../../primitives/disclosure/scroll-area.md)
