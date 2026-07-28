# File Upload

`fandhe_frontend_headless_ui::file_upload` の clear-trigger / dropzone / hidden-input / item / item-delete-trigger / item-group / item-name / item-size-text(-node) / label / trigger パーツをそのまま再エクスポートし、既定 CSS を追加提供する。`size` variant クラスは `root` にのみ付与する。

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::file_upload;
use fandhe_frontend_pre_styled_ui::Size;

let node = file_upload::root(Size::Md, false, vec![], vec![]);
```

`stylesheet() -> String` が静的 CSS 全量を返す。`dropzone`/`trigger`/`hidden_input`/`item_group`/`item`/`item_name`/`item_size_text`/`item_delete_trigger`/`clear_trigger`/`label` は headless-ui からの再エクスポート。

## Anatomy

- `root` — `size` クラスを付与するコンテナ
- `label` / `dropzone` / `trigger` / `hidden-input`
- `item-group`（`item` を複数内包、各 `item` は `item-name`/`item-size-text`/`item-delete-trigger` を内包）
- `clear-trigger`

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `size` | `Size`（既定 `Md`） | `root` へクラス付与 |
| `disabled` | `bool` | `clear-trigger`/`dropzone`/`hidden-input`/`item`/`item-delete-trigger`/`root`/`trigger` へ `data-disabled` を反映 |

## Notes

- ファイルのメタデータ（name/size/mime type）のみを扱い、実際の `File` オブジェクトは `fandhe-frontend-wasm-full` 層に隔離される。
- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）。

## Related

- [Input](./input.md)
- [File Upload (primitives/form)](../../primitives/form/file-upload.md)
