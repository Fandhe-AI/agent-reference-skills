# Signature Pad

`fandhe_frontend_headless_ui::signature_pad` の guide / hidden-input / label / `parse_stroke_payload` / `segment_path` / `stroke_path_d` / `stroke_to_payload` / `Point` / `SignaturePad` / `Stroke` 等をそのまま再エクスポートし、既定 CSS を追加提供する。

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::signature_pad;

let node = signature_pad::root(false, true, vec![], vec![]);
```

`root(disabled, empty, attrs, children) -> Node`、`control(disabled, attrs, children) -> Node`、`segment(width: u32, height: u32, aria_label_text: Option<&str>, attrs, children) -> Node`、`clear_trigger(disabled, attrs, children) -> Node`。`stylesheet() -> String` が静的 CSS 全量を返す。

## Anatomy

- `root` / `label` / `control` / `segment`（`segment-path` を内包）/ `guide` / `hidden-input`

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `disabled` | `bool` | 操作の禁止 |
| `empty` | `bool` | 未署名状態。`root` の `data-empty` を決める |

## Notes

- headless 層のスタイリングは `fandhe-frontend-pre-styled-ui` へ委譲する構図（本ページ自体が styled 層）。
- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）。

## Related

- [Image Cropper](./image-cropper.md)
- [Signature Pad (primitives/form)](../../primitives/form/signature-pad.md)
