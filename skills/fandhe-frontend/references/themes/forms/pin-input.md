# Pin Input

`fandhe_frontend_headless_ui::pin_input` の control / hidden-input / input / label パーツをそのまま再エクスポートし、既定 CSS を追加提供する。`size` variant クラスは `root` にのみ付与する。

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::pin_input;
use fandhe_frontend_pre_styled_ui::Size;

let node = pin_input::root(Size::Md, false, false, vec![], vec![]);
```

`stylesheet() -> String` が静的 CSS 全量を返す。`control`/`input`/`hidden_input`/`label`/`PinInputAction`/`PinInputKind` は headless-ui からの再エクスポート。

## Anatomy

- `root` / `label` / `control`（`input`/`hidden-input` を内包）

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `size` | `Size`（既定 `Md`） | `root` へクラス付与 |
| `complete` | `bool` | 全桁入力完了状態 |
| `disabled` | `bool` | 無効化 |

## Notes

- 固定桁数の PIN コード入力向け。
- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）。

## Related

- [Input](./input.md)
- [Pin Input (primitives/form)](../../primitives/form/pin-input.md)
