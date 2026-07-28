# Mark

テキストハイライト（`<mark>`）を `variant`/`colorPalette` の 2 軸で組み立てる単一 recipe styled 部品。

## Anatomy

```
root (mark)
```

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::mark::{mark, MarkProps};

let node = mark(&MarkProps::default(), vec![], vec![/* children */]);
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| variant | `MarkVariant` | `Subtle` | `Subtle`（淡色背景） / `Solid`（塗りつぶし） / `Text`（背景なし・文字色のみ） / `Plain`（装飾なし） |
| palette | `ColorPalette` | `Accent` | colorPalette 軸 |

## Notes

- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）。
- `badge` と同型の単一 recipe パターン。色は `--fandhe-palette`/`--fandhe-palette-fg` custom property 経由で参照する。
- 一致箇所検索を伴う自動強調は [Highlight](./highlight.md) が担う。`Mark` はマークアップ自体を呼び出し側が明示的に組み立てる用途。

## Related

- [Highlight](./highlight.md)
