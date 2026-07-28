# Image Cropper

`fandhe_frontend_headless_ui::image_cropper` の grid / handle / image / viewport パーツをそのまま再エクスポートし、動的な選択領域を伴う `root`/`selection` は `ImageCropper` 状態機械を受け取る styled ラッパーとして個別に組み立てる。`size` variant クラスは `root` にのみ付与する。

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::image_cropper;
use fandhe_frontend_pre_styled_ui::Size;
use fandhe_frontend_headless_ui::image_cropper::ImageCropper;

let state = ImageCropper::default();
let node = image_cropper::root(Size::Md, &state, vec![], vec![]);
```

`selection(state: &ImageCropper, attrs, children) -> Node` が `--fandhe-image-cropper-w`/`-h`/`-x`/`-y` を含む `style` を組み立てる唯一のパーツ。`stylesheet() -> String` が静的 CSS 全量を返す。

## Anatomy

- `root` / `viewport` / `image` / `selection` / `handle` / `grid`

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `size` | `Size`（既定 `Md`） | `root` へクラス付与 |

## Notes

- 選択領域の動的な幅・高さ・位置は custom property（`--fandhe-image-cropper-w`/`-h`/`-x`/`-y`、既定はそれぞれ `100%`/`100%`/`0%`/`0%`）注入のみで伝搬する。ハンドル寸法は `--fandhe-image-cropper-handle-size`（既定 `0.75rem`）。
- 状態機械 `ImageCropper` は本モジュールから再エクスポートしない。hydration が必要な場合は `fandhe_frontend_headless_ui::image_cropper::ImageCropper` を直接 import する。
- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）。

## Related

- [Signature Pad](./signature-pad.md)
- [Image Cropper (primitives/form)](../../primitives/form/image-cropper.md)
