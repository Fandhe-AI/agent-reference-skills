# File Upload

Drag-and-drop or click-to-browse file input with file list management.

## Import

```tsx
import { FileUpload } from "@chakra-ui/react"
```

## Usage

```tsx
<FileUpload.Root maxFiles={3} accept={{ "image/*": [] }}>
  <FileUpload.HiddenInput />
  <FileUpload.Trigger>
    <Button>Upload files</Button>
  </FileUpload.Trigger>
  <FileUpload.ItemGroup>
    <FileUpload.Context>
      {({ acceptedFiles }) =>
        acceptedFiles.map((file) => (
          <FileUpload.Item key={file.name} file={file}>
            <FileUpload.ItemName />
            <FileUpload.ItemDeleteTrigger>Remove</FileUpload.ItemDeleteTrigger>
          </FileUpload.Item>
        ))
      }
    </FileUpload.Context>
  </FileUpload.ItemGroup>
</FileUpload.Root>
```

## Props

### FileUpload.Root

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `accept` | `Record<string, string[]>` | — | Accepted MIME types mapped to extensions |
| `maxFiles` | `number` | `1` | Maximum number of files |
| `maxFileSize` | `number` | — | Maximum file size in bytes |
| `minFileSize` | `number` | — | Minimum file size in bytes |
| `allowDrop` | `boolean` | `true` | Whether drag-and-drop is enabled |
| `directory` | `boolean` | — | Whether to accept directory uploads |
| `capture` | `"user" \| "environment"` | — | Camera capture mode on mobile |
| `disabled` | `boolean` | — | Whether the upload is disabled |
| `multiple` | `boolean` | — | Whether multiple files are allowed |
| `onFileAccept` | `(details: FileAcceptDetails) => void` | — | Callback when files are accepted |
| `onFileReject` | `(details: FileRejectDetails) => void` | — | Callback when files are rejected |
| `onFileChange` | `(details: FileChangeDetails) => void` | — | Callback when file list changes |

## Sub-parts

`Root`, `HiddenInput`, `Trigger`, `Dropzone`, `DropzoneContent`, `Item`, `ItemGroup`, `ItemName`, `ItemSizeText`, `ItemPreview`, `ItemPreviewImage`, `ItemDeleteTrigger`, `Context`, `Label`

## Notes

- Use `FileUpload.Dropzone` as an alternative to `FileUpload.Trigger` for drag-and-drop UI.
- File validation errors are available in the `onFileReject` callback.
- 3.35.0 (Ark UI 5.36.0): duplicate files are rejected with the `FILE_EXISTS` error code.
- 3.38.0: disabled delete triggers no longer show an active cursor and full-opacity icon. `Field.Root readOnly` now makes the file upload read-only (Ark UI 5.40.0).
- Source: https://github.com/chakra-ui/chakra-ui/blob/f0387b6e832a41663eb7186a375db7879337724e/packages/react/CHANGELOG.md (3.38.0 entry, tag @chakra-ui/react@3.38.0, retrieved 2026-11-14)

## Related

- [field.md](./field.md)
