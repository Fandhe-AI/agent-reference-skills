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
| props.size | `HeadingSize` | `Xl` | 視覚サイズ（`Xs`/`Sm`/`Md`/`Lg`/`Xl`/`Xl2`/`Xl3`/`Xl4`/`Xl5`/`Xl6`）。`level` とは独立した軸 |
| props.weight | `HeadingWeight` | `Semibold` | フォントウェイト（`Normal`/`Medium`/`Semibold`/`Bold`） |

## Notes

- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）。
- 視覚サイズは `xs`〜`6xl` の 10 段階（`2xl`〜`6xl` は CSS クラス名の都合で `xl2`〜`xl6` 表記。`Xl5`/`Xl6` はテーマトークン `font-size-5xl`/`6xl` に対応し、`Xl6` が最大）。
- colorPalette 軸は持たない（前景色トークンを継承する中立部品）。

## Related

- [Text](./text.md)
