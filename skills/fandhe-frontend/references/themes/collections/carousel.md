# Carousel

headless `carousel`（8 anatomy parts: root, control, prev-trigger, next-trigger, item-group, item, indicator-group, indicator）を包む styled wrapper（`fandhe-frontend-pre-styled-ui`）。未スタイル primitive の上に既定 CSS（position/overflow、トリガーボタン、transform ベースのスライド遷移）を追加する。`size` variant のみ提供。`color-palette` 軸は持たない（選択・チェック状態を持つコンポーネントではないため）。

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::carousel::{self, Orientation};
use fandhe_frontend_pre_styled_ui::Size;

// styled root — the only part that receives a variant class
pub fn root<'a>(
    size: Size,
    orientation: Orientation,
    label: &'a str,
    attrs: Vec<(&'a str, &'a str)>,
    children: Vec<Node>,
) -> Node

// re-exported unstyled headless parts (styled via [data-scope]/[data-part] CSS only)
pub use fandhe_frontend_headless_ui::carousel::{
    control, indicator, indicator_group, item, item_group, next_trigger, prev_trigger,
};

pub fn stylesheet() -> String
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| size | `Size` (`Sm` \| `Md` \| `Lg`) | `root` に `--fandhe-carousel-trigger-size` / `--fandhe-carousel-indicator-size` を設定。既定値 `Md` |
| orientation | `Orientation` | headless `root` へそのまま渡す。`vertical` で `item-group` の transform が `translateX` から `translateY` に切り替わる |
| label | `&str` | `root` の `aria-label` |

## Notes

- `Carousel` 状態機械と headless の自由関数 `root` はあえて再エクスポートしない。公開されるのは styled `root` と再エクスポートされた anatomy parts のみ。headless を直接使う場合は `fandhe_frontend_headless_ui::carousel::Carousel` を明示的に import する必要がある
- `item-group` の transform は headless 層が設定する `--fandhe-carousel-index`（明示的に `0` フォールバック付き）を読む。`data-current` が item/indicator の強調表示を駆動し、`data-disabled` が prev/next トリガーを減光する
- `@ark-ui/react` の JS/TS API とは別物（Rust 製）

## Related

- [carousel (primitives)](../../primitives/collections/carousel.md)
