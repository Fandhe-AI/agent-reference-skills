# Number Input

`fandhe_frontend_headless_ui::number_input` の control / decrement-trigger / increment-trigger / input / label パーツをそのまま再エクスポートし、既定 CSS を追加提供する。`size` variant クラスは `root` にのみ付与する。

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::number_input;
use fandhe_frontend_pre_styled_ui::Size;

let node = number_input::root(Size::Md, false, false, vec![], vec![]);
```

`stylesheet() -> String` が静的 CSS 全量を返す。`control`/`input`/`increment_trigger`/`decrement_trigger`/`label` は headless-ui からの再エクスポート。

## Anatomy

- `root` / `label` / `control`（`input`/`increment-trigger`/`decrement-trigger` を内包）

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `size` | `Size`（既定 `Md`） | `root` へクラス付与 |
| `disabled` | `bool` | `root`/`label`/`input`/`control`/`increment-trigger`/`decrement-trigger` へ `data-disabled` を反映 |
| `invalid` | `bool` | バリデーション失敗状態 |

## Notes

- `increment-trigger`/`decrement-trigger` は最小/最大値到達時に自動的に無効化される。
- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）。

## Related

- [Input](./input.md)
- [Number Input (primitives/form)](../../primitives/form/number-input.md)
