# Heading

h1〜h6 の見出し要素を組み立てる単一 recipe styled 部品。レンダリングするタグ（意味論レベル）と視覚サイズ（`size` variant）は独立した軸。

## Anatomy

```
root (h1〜h6)
```

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::heading::{heading, HeadingLevel, HeadingProps};

let node = heading(HeadingLevel::H1, &HeadingProps::default(), vec![], vec![/* children */]);
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| level | `HeadingLevel` | `H2` | レンダリングする HTML タグ（`H1`〜`H6`）。variant クラスではなくタグ選択そのもの |
| props.size | `HeadingSize` | `Xl` | 視覚サイズ（`Sm`/`Md`/`Lg`/`Xl`/`Xl2`/`Xl3`/`Xl4`）。`level` とは独立した軸 |

## Notes

- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）。
- chakra-ui の Heading は `xs`〜`7xl` の 9 段階だが、テーマトークンの都合で `sm`〜`4xl` の 7 段階へ縮約している（`2xl`/`3xl`/`4xl` は `xl2`/`xl3`/`xl4` 表記）。
- colorPalette 軸は持たない（前景色トークンを継承する中立部品）。

## Related

- [Text](./text.md)
