# Text

段落テキスト（`<p>`）を `size` variant 付きで組み立てる単一 recipe styled 部品。[Heading](./heading.md) と対になる本文向け静的部品。

## Anatomy

```
root (p)
```

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::text::{text, TextProps};

let node = text(&TextProps::default(), vec![], vec![/* children */]);
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| size | `TextSize` | `Md` | フォントサイズ・行間の視覚サイズ軸（`Xs`/`Sm`/`Md`/`Lg`/`Xl`） |

## Notes

- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）。
- 関数名 `text` は `fandhe_frontend_core::text`（テキストノード生成関数）と同名。同一スコープで両方 `use` する場合はモジュールパス（`text::text(...)`）か `use ... as` での別名化が必要。
- colorPalette 軸は持たない（前景色トークンを継承する中立部品）。
- chakra-ui の `Prose`（記事全体への一括カスケード適用）に相当する機構はこのクレートには存在しない。要素単位のオプトイン適用のみ。

## Related

- [Heading](./heading.md)
