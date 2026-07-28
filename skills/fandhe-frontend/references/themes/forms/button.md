# Button

単一 recipe styled 部品。`<button type="button">` を組み立てる。headless-ui に対応する部品は存在しない pre-styled-only コンポーネント。`icon_button`/`close_button` は同じ `assemble` ロジックを共有する Button variant 拡張。

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::button::{button, ButtonProps};

let node = button(&ButtonProps::default(), vec![], vec![]);
```

`icon_button(props: &ButtonProps, label: &str, attrs, children) -> Node` はアイコンのみの正方形 Button。`close_button(props: &ButtonProps, label: &str, attrs) -> Node` は装飾用の × アイコンを内包する `icon_button` 特化版。`css() -> String` が静的 CSS 全量を返す。

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `ButtonProps.variant` | `ButtonVariant`（`Solid` \| `Outline` \| `Ghost` \| `Subtle`、既定 `Solid`） | 見た目 |
| `ButtonProps.size` | `Size`（既定 `Md`） | サイズ |
| `ButtonProps.palette` | `ColorPalette`（既定 `Accent`） | 5 色 |
| `ButtonProps.disabled` | `bool` | `disabled`/`data-disabled`/`aria-disabled="true"` を付与 |
| `ButtonProps.loading` | `bool` | `aria-busy="true"`/`data-loading` を付与し、装飾用 Spinner を子ノード先頭へ埋め込む。`disabled` と同様の 3 点セットも付与 |

## Notes

- `type="button"` を既定固定し、フォーム内の暗黙 submit 事故を防ぐ。
- `icon_button` は `label` が空白のみの場合 `"unlabeled button"` へフォールバックし、空の `aria-label=""` を出さない（fail-closed）。
- `close_button` の既定ラベルは `"Close"`（chakra-ui `CloseButton` と同値）。
- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）。

## Related

- [Icon (primitives/display)](../../primitives/display/README.md)
