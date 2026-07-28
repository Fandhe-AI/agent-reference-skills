# Image Cropper

決定的な整数クロップ矩形の状態機械（`x`/`y`/`width`/`height` を `u32` で表現）。未採用だったコンポーネントの再導入（issue #844）。canvas/ピクセル状態は持たず、CSS 表示用の矩形とパーセンテージゲッターのみを提供する。

## Signature / Usage

```rust
use fandhe_frontend_headless_ui::image_cropper::{self, ImageCropper, HandlePosition};

let cropper = ImageCropper::new(800, 600, 0, 0, 400, 300, None, 1);

cropper.root(vec![], vec![
    cropper.viewport(vec![
        cropper.image("/photo.jpg", "Photo", vec![]),
        cropper.selection(vec![
            cropper.handle(HandlePosition::Se, vec![]),
        ]),
        cropper.grid(vec![]),
    ]),
]);
```

フリー関数: `image_cropper::root(attrs, children)`, `viewport`, `image(src, alt, attrs)`, `selection`, `handle(position, attrs)`, `grid`。

## Anatomy

- `root` — `<div role="group" aria-roledescription="image cropper">`
- `viewport` — `<div>`、クリッピングコンテナ
- `image` — `<img src alt>`
- `selection` — `<div>`、クロップ矩形の視覚的フレーム（呼び出し側がパーセンテージゲッターから `style` を供給する）
- `handle` — `<div>`、8方向（`n`/`s`/`e`/`w`/`ne`/`nw`/`se`/`sw`）、`tabindex="0"` + 方向別 `aria-label`
- `grid` — `<div>`、装飾用の 3x3 ガイドライン

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `ImageCropper::new(image_width, image_height, x, y, width, height, aspect, min_size)` | `u32 x6, Option<(u32,u32)>, u32` | フェイルクローズで正規化される。`aspect` は幅/高さの比率を固定する |
| `HandlePosition` | enum | `N`/`S`/`E`/`W`/`Ne`/`Nw`/`Se`/`Sw` |
| `x_percent()` / `y_percent()` / `width_percent()` / `height_percent()` | `f64` | `0.0..=100.0`。CSS カスタムプロパティへの入力として意図された唯一の値 |

## Notes

- ディスパッチアクション: `"move"`（ペイロード `"dx,dy"`）、`"resize"`（ペイロード `"<handle>,dx,dy"`、反対側の辺/角を固定する）、`"set"`（ペイロード `"x,y,w,h"`）、`"reset"`（構築時の初期矩形に戻す）
- 実際のピクセル単位クロップ（canvas 画像抽出）、ズーム/回転/反転、円形クロップは対象外。このコンポーネントは矩形値のみを返す
- `@ark-ui/react` の JS/TS API とは別物（Rust 製、`fandhe-frontend-headless-ui`）

## Related

- [Slider](./slider.md)
