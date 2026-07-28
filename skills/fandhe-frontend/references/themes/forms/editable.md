# Editable

`fandhe_frontend_headless_ui::editable` の area / cancel-trigger / control / edit-trigger / input / label / preview / submit-trigger パーツをそのまま再エクスポートし、既定 CSS を追加提供する。`size` variant クラスは `root` にのみ付与する。

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::editable;
use fandhe_frontend_pre_styled_ui::Size;
use fandhe_frontend_headless_ui::editable::{EditMode, EditableActivationMode, EditableSubmitMode};

let node = editable::root(
    Size::Md,
    EditMode::Preview,
    false,
    false,
    EditableActivationMode::default(),
    EditableSubmitMode::default(),
    vec![],
    vec![],
);
```

`stylesheet() -> String` が静的 CSS 全量を返す。`area`/`input`/`preview`/`control`/`edit_trigger`/`submit_trigger`/`cancel_trigger`/`label` は headless-ui からの再エクスポート。

## Anatomy

- `root` — `size` クラスを付与するコンテナ
- `label` / `area`（`input`/`preview` を内包）/ `control`（`edit-trigger`/`submit-trigger`/`cancel-trigger` を内包）

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `size` | `Size`（既定 `Md`） | フォントサイズ等を切り替え |
| `mode` | `EditMode`（`Edit` \| `Preview`） | `data-state` の源泉 |
| `disabled` / `readonly` | `bool` | 各パーツへ `data-disabled` 等を反映 |
| `activation_mode` | `EditableActivationMode` | `data-activation-mode` |
| `submit_mode` | `EditableSubmitMode` | `data-submit-mode`（Enter/blur トリガー） |

## Notes

- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）。

## Related

- [Editable (primitives/form)](../../primitives/form/editable.md)
