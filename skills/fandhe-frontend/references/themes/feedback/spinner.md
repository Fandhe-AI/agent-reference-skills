# Spinner

読み込み中を示すインジケータ。`role="status"` + `aria-label`（既定 `"Loading"`）でスクリーンリーダーへ状態を伝える単一 recipe styled 部品。

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::spinner::{spinner, SpinnerProps};

let node = spinner(&SpinnerProps::default());
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `SpinnerProps.size` | `Size` | `Md` | `Sm` / `Md` / `Lg` |
| `SpinnerProps.palette` | `ColorPalette` | `Accent` | `Accent` / `Info` / `Success` / `Warning` / `Danger` |
| `SpinnerProps.label` | `&str` | `"Loading"` | `aria-label` に渡すラベル文字列 |

## Notes

- 単体利用の `spinner()` は `role="status"` + `aria-label` を常に付与する
- `Button` の `loading: true` 時に埋め込まれる `spinner_decorative`（`role`/`aria-label` を持たず `aria-hidden="true"`）は crate 内限定 API のため公開 API 面には出ない
- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）

## Related

- [Progress](./progress.md)
