# File Upload

ドラッグ&ドロップ、accept/max-files/size バリデーションを備えたファイルアップロード。ファイルメタデータ（`FileUploadItem`: name/size/mime）のみを保持し、`File` オブジェクトやコンテンツバイト列は決して保持しない。

## Signature / Usage

```rust
use fandhe_frontend_headless_ui::file_upload::{self, FileUpload, FileUploadAction, FileUploadItem};
use fandhe_frontend_interactive::Component;

let mut upload = FileUpload::new("image/*", Some(5), None, None);
upload.update(FileUploadAction::AddFiles(vec![
    FileUploadItem::new("a.png", 1024, "image/png"),
]));

upload.root(false, vec![], vec![
    upload.dropzone(false, false, vec![
        upload.trigger(false, vec![], vec![]),
        upload.hidden_input(true, false, vec![]),
    ]),
]);
```

フリー関数: `file_upload::root(disabled, attrs, children)`, `label`, `dropzone(disabled, dragging, attrs, children)`, `trigger`, `item_group`, `item(disabled, attrs, children)`, `item_name`, `item_size_text_node`, `item_delete_trigger(name, disabled, attrs, children)`, `clear_trigger`, `hidden_input(accept, multiple, disabled, attrs)`。ヘルパー: `accept_matches(mime_type, file_name, accept) -> bool`, `validate_incoming(item, accepted, accept, max_files, max_file_size, min_file_size) -> Result<(), FileRejectionReason>`, `item_size_text(size_bytes) -> String`。

## Anatomy

- `root`, `label`, `dropzone`（`role="button"` `tabindex="0"`、`data-dragging`）, `trigger`
- `item-group` — `<ul>`、`item` — `<li>`
- `item-name`, `item-size-text`, `item-delete-trigger`
- `clear-trigger`, `hidden-input` — `<input type="file">`

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `FileUpload::new(accept, max_files, max_file_size, min_file_size)` | `String, Option<usize>, Option<u64>, Option<u64>` | `None` はそれぞれ無制限を意味する |
| `FileRejectionReason` | enum | `TooManyFiles` \| `FileInvalidType` \| `FileTooLarge` \| `FileTooSmall` \| `FileExists` |
| `accept` | string | `"image/*"` ワイルドカード、`"application/pdf"` のような正確な MIME、または `".pdf"` のような拡張子（カンマ区切り、空文字は無制限） |

## Notes

- `FileUploadAction::AddFiles(Vec<FileUploadItem>)` は構造化メタデータを運ぶため**型付き API 専用**のアクション（文字列ディスパッチからは到達不能）。文字列ディスパッチは `"remove"`（インデックスペイロード）と `"clear"` のみを受け付ける
- ItemPreview/ItemPreviewImage（object-URL 画像プレビュー）は対象外。`File`/object-URL は一切保持しない
- `@ark-ui/react` の JS/TS API とは別物（Rust 製、`fandhe-frontend-headless-ui`）

## Related

- [Field](./field.md)
