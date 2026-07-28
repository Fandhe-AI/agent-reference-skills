# ColorSwatch

色見本を表示する単一パーツの静的 styled コンポーネント。検証済み `Color` 型のみを受け取り、任意文字列の色指定は受け付けない。透過色はチェッカーボード模様の背景に重ねて表示する。

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::color_swatch::{self, Color, ColorSwatchProps, Rgb};

let props = ColorSwatchProps {
    value: Color::from_rgb(Rgb::new(0x3b, 0x82, 0xf6)),
    ..ColorSwatchProps::default()
};
let node = color_swatch::color_swatch(&props, vec![], vec![]);
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `Color` | 不透明の黒 | 表示する色。検証済み `Color` 型のみ |
| `size` | `Size` (`Sm`/`Md`/`Lg`) | `Md` | サイズ（chakra-ui の 8 段階に対する最小サブセット） |
| `shape` | `SwatchShape` (`Square`/`Circle`/`Rounded`) | `Rounded` | 外形 |

## Notes

- `style` 属性へ到達する動的値は `Color::to_hex_string()` の出力（`#` + 小文字 16 進数字に閉じる）のみで、CSS インジェクション経路を持たない。
- headless-ui 側に対応する anatomy は存在しない（pre-styled-ui 層のみで新規定義）。
- 純粋な表示専用部品であり `role`/`aria-*` は付与しない。
- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）。

## Related

- [Badge](./badge.md)
- [Status](./status.md)
