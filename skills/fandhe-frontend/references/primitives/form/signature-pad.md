# Signature Pad

デジタル署名の描画面。ストロークを決定的な点リストとして保持し（canvas ピクセルバッファなし）、SVG `<path>` データとして描画される。

## Signature / Usage

```rust
use fandhe_frontend_headless_ui::signature_pad::{self, SignaturePad, Point, Stroke};

let stroke = Stroke::new(vec![Point::new(0.0, 0.0), Point::new(10.0, 10.0)]).unwrap();
let pad = SignaturePad::new(vec![stroke], false, false);

pad.root(vec![], vec![
    pad.label(vec![], vec![]),
    pad.control(vec![
        // pad.segment_paths() -> Vec<Node> of <path> elements
        pad.guide(vec![], vec![]),
    ]),
    pad.clear_trigger(vec![], vec![]),
    pad.hidden_input("signature", vec![]),
]);
```

フリー関数: `signature_pad::root(disabled, empty, attrs, children)`, `label`, `control(disabled, attrs, children)`, `segment(width, height, aria_label_text, attrs, children)`, `segment_path(stroke: &Stroke, attrs)`, `guide`, `clear_trigger(disabled, attrs, children)`, `hidden_input(name, value, disabled, attrs)`。ヘルパー: `stroke_path_d(stroke) -> String`（SVG パス `d`）, `stroke_to_payload(stroke) -> String`, `parse_stroke_payload(payload) -> Option<Stroke>`。

## Anatomy

- `root`, `label`, `control`
- `segment` — ストロークごとの `<svg>` コンテナ、`segment-path` — `<path d="...">`
- `guide` — `<div>`、装飾用のベースライン
- `clear-trigger` — `<button type="button">`
- `hidden-input` — `<input type="hidden">`、エンコードされたストロークペイロード

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `SignaturePad::new(strokes, disabled, read_only)` | `Vec<Stroke>, bool, bool` | |
| `Stroke::new(points: Vec<Point>)` | `Result<Self, StrokeError>` | 点数の範囲を検証する |
| `is_empty()` | `bool` | `strokes` が空か |
| `value()` | `String` | エンコードされた署名ペイロード |

## Notes

- `Component`/`Hydrate` に加えて `DirtyTracked` を実装する（未保存変更の状態を追跡する）
- 実際のポインター/canvas 描画配線は持たない。このモジュールは SSR マークアップとディスパッチ契約のみを提供する
- `@ark-ui/react` の JS/TS API とは別物（Rust 製、`fandhe-frontend-headless-ui`）

## Related

- [Image Cropper](./image-cropper.md)
