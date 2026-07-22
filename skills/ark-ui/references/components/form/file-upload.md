# File Upload

Enables users to upload multiple files through an intuitive interface supporting both click and drag-and-drop interactions.

## Anatomy

- `Root` — main container wrapper
- `Label` — associated label element
- `Dropzone` — drag-and-drop target area
- `Trigger` — button to open the file picker
- `ItemGroup` — list container for uploaded files
- `Item` — individual file entry
- `ItemPreview` / `ItemPreviewImage` — file preview display
- `ItemName` — file name display
- `ItemSizeText` — file size information
- `ItemDeleteTrigger` — remove individual file button
- `ClearTrigger` — remove all files button
- `HiddenInput` — native file input element

## Signature / Usage

```tsx
import { FileUpload } from '@ark-ui/react/file-upload'

<FileUpload.Root>
  <FileUpload.Dropzone>
    <FileUpload.Trigger>Choose Files</FileUpload.Trigger>
  </FileUpload.Dropzone>
  <FileUpload.ItemGroup>
    <FileUpload.Item file={file}>
      <FileUpload.ItemPreview />
      <FileUpload.ItemName />
      <FileUpload.ItemDeleteTrigger />
    </FileUpload.Item>
  </FileUpload.ItemGroup>
</FileUpload.Root>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `maxFiles` | `number` | Maximum uploadable files, default `1` |
| `accept` | `string \| string[]` | Restrict file types by MIME type or extension |
| `maxFileSize` / `minFileSize` | `number` | Size constraints in bytes |
| `directory` | `boolean` | Enable folder uploads (webkit browsers) |
| `capture` | `'user' \| 'environment'` | Access device camera |
| `allowDrop` | `boolean` | Enable drag-and-drop, default `true` |
| `defaultAcceptedFiles` | `File[]` | Set initial files |
| `transformFiles` | `function` | Process files before acceptance |
| `onFileAccept` / `onFileReject` | `function` | Validation callbacks |

## Notes

- Use `"image/*"`, `"video/*"`, or `"application/pdf"` matchers for type-specific previews
- Set `disableClick` on `Dropzone` when delegating clicks to a nested `Trigger` to prevent double-open
- Validation errors include `TOO_MANY_FILES`, `FILE_INVALID_TYPE`, `FILE_TOO_LARGE`, `FILE_EXISTS`
- Access clipboard files via `setClipboardFiles()`
- When used via Chakra UI v3, import from `@chakra-ui/react` instead; Chakra adds `size` / `variant` / `colorPalette` props.

## Related

- [Fieldset](./fieldset.md)
