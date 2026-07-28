# Blockquote

引用ブロック（`<figure>`/`<blockquote>`/`<figcaption>` の 3 パーツ）を組み立てる slot recipe styled 部品。`variant`/`colorPalette` の 2 軸を持つ。

## Anatomy

```
root (figure)
  content (blockquote)
  caption (figcaption)
```

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::blockquote::{self, BlockquoteVariant};
use fandhe_frontend_pre_styled_ui::ColorPalette;

let node = blockquote::root(BlockquoteVariant::default(), ColorPalette::default(), vec![], vec![
    blockquote::content(vec![("cite", "https://example.com")], vec![/* ... */]),
    blockquote::caption(vec![], vec![/* ... */]),
]);
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| variant | `BlockquoteVariant` | `Subtle` | `Subtle`（淡色背景 + 左罫線） / `Solid`（塗りつぶし） / `Plain`（罫線のみ） |
| palette | `ColorPalette` | `Accent` | colorPalette 軸（`root` のみに適用） |

`root(variant, palette, attrs, children)` / `content(attrs, children)` / `caption(attrs, children)` の 3 関数で構成する。

## Notes

- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）。
- variant/colorPalette クラスは `root` のみに付与する。
- `caption` の文字色は CSS custom property `--fandhe-blockquote-caption-fg` 経由で継承する（`Solid` variant では `--fandhe-palette-fg` へ上書き）。
- 文中に埋め込む短いインライン引用は [Quote](./quote.md) が担う。`Blockquote` はブロックレベルの構造・出典表示（`caption`）を持つ点で異なる。

## Related

- [Quote](./quote.md)
