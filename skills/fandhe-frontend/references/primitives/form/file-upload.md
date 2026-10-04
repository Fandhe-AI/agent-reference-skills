# File Upload

ドラッグ&ドロップ、accept/max-files/size バリデーションを備えたファイルアップロード。ファイルメタデータ（`FileUploadItem`: name/size/mime）のみを保持し、`File` オブジェクトやコンテンツバイト列は決して保持しない。

## Signature / Usage

```rust
use fandhe_frontend_headless_ui::file_upload::{self, FileUpload, FileUploadAction, FileUploadItem, FileUploadProps};
use fandhe_frontend_interactive::Component;

let mut upload = FileUpload::new("image/*", Some(5), None, None);
upload.update(FileUploadAction::AddFiles(vec![
    FileUploadItem::new("a.png", 1024, "image/png"),
]));
let props = FileUploadProps::default();

upload.root(&props, false, vec![], vec![
    upload.dropzone(&props, false, vec![], vec![
        upload.trigger(&props, vec![], vec![]),
        upload.hidden_input(true, &props, vec![]),
    ]),
]);
```

フリー関数: `file_upload::root(props: &FileUploadProps, dragging: bool, attrs, children)`, `label(props, attrs, children)`, `dropzone(props, dragging, attrs, children)`, `trigger(props, attrs, children)`, `item_group(item_type: ItemType, props, attrs, children)`, `item(item_type, props, attrs, children)`, `item_name(item_type, props, attrs, children)`, `item_size_text_node(item_type, props, attrs, children)`, `item_delete_trigger(name: &str, item_type, props, attrs, children)`, `clear_trigger(props, hidden: bool, attrs, children)`, `hidden_input(accept, multiple, props, attrs)`。`FileUpload` のメソッドは `root` / `label` / `dropzone` / `trigger` / `hidden_input(multiple, props, attrs)`（`accept` を自動注入）/ `clear_trigger(props, attrs, children)`（`is_empty()` から `hidden` を導出）のみで、`item_*` の利便メソッドは無い。ヘルパー: `accept_matches(mime_type, file_name, accept) -> bool`, `validate_incoming(item, accepted, accept, max_files, max_file_size, min_file_size) -> Result<(), FileRejectionReason>`, `item_size_text(size_bytes) -> String`（`"512 B"` / `"1.0 KB"` / `"1.5 MB"` / `"2.0 GB"` 形式）。

## Anatomy

- `root`（`<div>`）, `label`（`<label>`）, `dropzone`（`<div role="button">`、`tabindex="0"`、disabled / readonly のとき `tabindex="-1"` + `aria-disabled="true"`。呼び出し側 `attrs` に `aria-label` / `aria-labelledby` が無ければ既定 `aria-label="dropzone"`）, `trigger`（`<button type="button">`）
- `item-group` — `<ul>`、`item` — `<li>`
- `item-name`（`<div>`）, `item-size-text`（`<div>`）, `item-delete-trigger`（`<button type="button" aria-label="Delete {name}">`）
- `clear-trigger`（`<button type="button">`、`hidden: true` で `hidden`）, `hidden-input` — `<input type="file" tabindex="-1" aria-hidden="true">`

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `FileUpload::new(accept, max_files, max_file_size, min_file_size)` | `String, Option<usize>, Option<u64>, Option<u64>` | `None` はそれぞれ無制限を意味する |
| `FileUploadProps.disabled` | `bool`（既定 `false`） | `data-disabled`（全パーツ）。`trigger` / `item-delete-trigger` / `clear-trigger` / `hidden-input` にネイティブ `disabled`、`dropzone` に `tabindex="-1"` + `aria-disabled="true"` |
| `FileUploadProps.readonly` | `bool`（既定 `false`） | `data-readonly`（全パーツ）。readonly でも上記と同様にネイティブ `disabled` / `tabindex="-1"` + `aria-disabled="true"` を付与（新規追加操作の抑止） |
| `FileUploadProps.invalid` | `bool`（既定 `false`） | root / label / dropzone / trigger に `data-invalid`（item 系・delete / clear trigger には付与しない） |
| `FileUploadProps.required` | `bool`（既定 `false`） | `label` に `data-required`、`hidden-input` に `aria-required` + `data-required`（ネイティブ `required` は付与しない。必須検証は `accepted()` を読む呼び出し側が行う） |
| `ItemType` | `Accepted`（既定） \| `Rejected` | item 系パーツの `data-type`（`accepted` / `rejected`） |
| `FileRejectionReason` | enum | `TooManyFiles` \| `FileInvalidType` \| `FileTooLarge` \| `FileTooSmall` \| `FileExists` |
| `accept` | string | `"image/*"` ワイルドカード、`"application/pdf"` のような正確な MIME、または `".pdf"` のような拡張子（カンマ区切り、空文字は無制限） |

## Notes

- `FileUploadAction::AddFiles(Vec<FileUploadItem>)` は構造化メタデータを運ぶため**型付き API 専用**のアクション（文字列ディスパッチからは到達不能）。文字列ディスパッチは `"remove"`（`accepted` のインデックスペイロード）、`"remove-rejected"`（`rejected` のインデックスペイロード）、`"clear"` のみを受け付ける（`FileUploadAction::RemoveRejected(usize)` あり）
- `root` は `data-readonly` / `data-dragging`、`dropzone` も `data-dragging` を出力する（`dragging` は DOM ローカル状態で呼び出し側が与える）。dropzone の Enter / Space keydown 配線は未提供（`trigger` がネイティブ `<button>` のためキーボード操作は可能）
- `rejected()` は直近の拒否履歴（ephemeral）で hydration では運ばない
- ItemPreview/ItemPreviewImage（object-URL 画像プレビュー）は対象外。`File`/object-URL は一切保持しない
- `@ark-ui/react` の JS/TS API とは別物（Rust 製、`fandhe-frontend-headless-ui`）

## Related

- [Field](./field.md)
