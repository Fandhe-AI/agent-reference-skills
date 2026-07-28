# Image

写真等の静的コンテンツを表示する `<img>` ラッパー。`avatar::image`（読み込み状態機械）とは独立した、状態を持たない単体画像部品。

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::image::{image, ImageProps};

let node = image(&ImageProps::new("/photo.png", "説明"), vec![]);
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `src` | `&str` | 必須 | 画像 URL |
| `alt` | `&str` | 必須 | 代替テキスト（アクセシビリティ上必須） |
| `fit` | `ImageFit` (`Cover`/`Contain`/`Fill`/`ScaleDown`/`NoFit`) | `Cover` | `object-fit` |
| `aspect_ratio` | `AspectRatio` (`Auto`/`Square`/`Video`) | `Auto` | `aspect-ratio` |

## Notes

- `src` は `fandhe_frontend_core::render` の既定エスケープに加え `is_safe_url` 検証を通過しないと属性ごと不出力になる（`javascript:` 等は `<img>` 自体は出力されるが `src` のみ欠落、fail-closed）。
- 空要素のため `children` 引数を持たない。
- 中立的なコンテンツ表示部品のため `colorPalette` 軸は付与しない。
- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）。

## Related

- [Icon](./icon.md)
- [Avatar](./avatar.md)
