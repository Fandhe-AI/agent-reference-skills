# Image Cropper

決定的な整数クロップ矩形の状態機械（`x`/`y`/`width`/`height` を `u32` で表現）。未採用だったコンポーネントの再導入（issue #844）。canvas/ピクセル状態は持たず、CSS 表示用の矩形とパーセンテージゲッターのみを提供する。

## Signature / Usage

```rust
use fandhe_frontend_headless_ui::image_cropper::{self, ImageCropper, ImageCropperProps, HandlePosition};

let cropper = ImageCropper::new(800, 600, 0, 0, 400, 300, None, 1);
let props = ImageCropperProps::default();

cropper.root(&props, vec![], vec![
    cropper.viewport(&props, vec![], vec![
        cropper.image("/photo.jpg", "Photo", vec![]),
        cropper.selection(&props, vec![], vec![
            cropper.handle(HandlePosition::Se, &props, vec![]),
        ]),
        cropper.grid(None, &props, vec![]),
    ]),
]);
```

フリー関数: `image_cropper::root(props: &ImageCropperProps, attrs, children)`, `viewport(props, attrs, children)`, `image(src, alt, attrs)`, `selection(state: &ImageCropper, props, attrs, children)`, `handle(position, props, attrs)`, `grid(axis: Option<GridAxis>, props, attrs)`。`ImageCropper` のメソッドは `selection` に `self` を state として渡す。ヘルパー: `action_for_key(key: &str, modifiers: KeyModifiers) -> Option<ImageCropperAction>`。

## Anatomy

- `root` — `<div role="group" aria-roledescription="image cropper">`
- `viewport` — `<div role="presentation">`、クリッピングコンテナ
- `image` — `<img src alt draggable="false">`（呼び出し側 `attrs` に `draggable` があればそれを優先）
- `selection` — `<div role="slider" aria-roledescription="2d slider" aria-label="Crop selection" aria-valuemin="0" aria-valuemax aria-valuenow aria-valuetext>`、フォーカス可能（`tabindex="0"`、disabled で `tabindex="-1"` + `aria-disabled="true"`）。クロップ矩形の視覚的フレームで、キーボード操作の受け口（`aria-valuemax` = `image_width - width`、`aria-valuenow` = `x`、`aria-valuetext` = `"x {x}, y {y}, width {w}, height {h}"`）。位置・寸法の `style` は呼び出し側がパーセンテージゲッターから供給する
- `handle` — `<div role="presentation" aria-hidden="true">`、8方向（`n`/`s`/`e`/`w`/`ne`/`nw`/`se`/`sw`）、非フォーカス
- `grid` — `<div aria-hidden="true">`、装飾用の 3x3 ガイドライン

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `ImageCropper::new(image_width, image_height, x, y, width, height, aspect, min_size)` | `u32 x6, Option<(u32,u32)>, u32` | フェイルクローズで正規化される。`aspect` は幅/高さの比率を固定する |
| `ImageCropperProps.disabled` | `bool`（既定 `false`） | root / viewport / selection / handle に `data-disabled`。`selection` は `tabindex="-1"` + `aria-disabled="true"` |
| `ImageCropperProps.dragging` | `bool`（既定 `false`） | root / selection / grid に `data-dragging`（SSR 静的表現。状態機械のフィールドではない） |
| `GridAxis` | `Horizontal` \| `Vertical` | `grid` の `data-axis`（`None` なら出力しない） |
| `HandlePosition` | enum | `N`/`S`/`E`/`W`/`Ne`/`Nw`/`Se`/`Sw`（`as_str()` が `data-position` の値、`from_str_value` / `aria_label` / `all()` あり） |
| `KeyModifiers` | struct | `alt` / `shift` / `ctrl_or_meta`（`action_for_key` の修飾状態） |
| `NUDGE_STEP` / `NUDGE_STEP_SHIFT` / `NUDGE_STEP_CTRL` | `i32` | `1` / `10` / `50`（`ctrl_or_meta` が `shift` より優先） |
| `x_percent()` / `y_percent()` / `width_percent()` / `height_percent()` | `f64` | `0.0..=100.0`。CSS カスタムプロパティへの入力として意図された唯一の値 |

## Data Attributes

| Part | Attribute | Values |
| --- | --- | --- |
| handle | `data-position` | `n` \| `s` \| `e` \| `w` \| `ne` \| `nw` \| `se` \| `sw`（旧 `data-handle-position` から改名） |
| grid | `data-axis` | `horizontal` \| `vertical`（`axis` が `Some` のとき） |
| root / viewport / selection / handle | `data-disabled` | 存在属性 |
| root / selection / grid | `data-dragging` | 存在属性 |

## Notes

- `action_for_key` は Arrow キーを `ImageCropperAction::Move`（nudge）、Alt+Arrow を `Se` ハンドル基準の `Resize` に写す純粋関数。zoom キー（`+` / `-` / `=` / `_`）を含む未知キーは `None`。実際の keydown / pointer ドラッグの DOM 配線は未提供
- ディスパッチアクション: `"move"`（ペイロード `"dx,dy"`）、`"resize"`（ペイロード `"<handle>,dx,dy"`、反対側の辺/角を固定する）、`"set"`（ペイロード `"x,y,w,h"`）、`"reset"`（構築時の初期矩形に戻す）
- 実際のピクセル単位クロップ（canvas 画像抽出）、ズーム/回転/反転、円形クロップは対象外。このコンポーネントは矩形値のみを返す
- `@ark-ui/react` の JS/TS API とは別物（Rust 製、`fandhe-frontend-headless-ui`）

## Related

- [Slider](./slider.md)
