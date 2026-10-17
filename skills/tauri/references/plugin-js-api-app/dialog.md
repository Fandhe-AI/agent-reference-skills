---
source: https://v2.tauri.app/reference/javascript/dialog/
---

# @tauri-apps/plugin-dialog

Native system dialogs for opening and saving files, along with message, ask and confirm dialogs.

## Signature / Usage

```typescript
import { open } from '@tauri-apps/plugin-dialog';
// Open a selection dialog for image files
const selected = await open({
  multiple: true,
  filters: [{
    name: 'Image',
    extensions: ['png', 'jpeg']
  }]
});
if (Array.isArray(selected)) {
  // user selected multiple files
} else if (selected === null) {
  // user cancelled the selection
} else {
  // user selected a single file
}
```

```typescript
function open<T extends OpenDialogOptions>(options?: T): Promise<OpenDialogReturn<T>>  // since 2.0.0
function save(options?: SaveDialogOptions): Promise<string | null>                       // since 2.0.0
function message(message: string, options?: string | MessageDialogOptions): Promise<MessageDialogResult>  // since 2.0.0
function ask(message: string, options?: string | ConfirmDialogOptions): Promise<boolean>      // since 2.0.0
function confirm(message: string, options?: string | ConfirmDialogOptions): Promise<boolean>  // since 2.0.0

type PickerMode = 'document' | 'media' | 'image' | 'video'
type FileAccessMode = 'copy' | 'scoped'
type MessageDialogDefaultButtons = 'Ok' | 'OkCancel' | 'YesNo' | 'YesNoCancel'   // since 2.4.0
type MessageDialogButtons = MessageDialogDefaultButtons | MessageDialogCustomButtons // since 2.4.0
type MessageDialogCustomButtons =                                                    // since 2.4.0
  | { yes: string; no: string; cancel: string }
  | { ok: string; cancel: string }
  | { ok: string }
type MessageDialogResult = 'Yes' | 'No' | 'Ok' | 'Cancel' | (string & {})            // since 2.4.0
```

`OpenDialogReturn<T>` is `string[] | null` when `multiple` is `true`, otherwise `string | null` (`null` when the user cancels).

## Options / Props

`DialogFilter`:

| Name | Type | Description |
| --- | --- | --- |
| name | `string` | The name of the filter, shown in the dialog's filter selector. |
| extensions | `string[]` | Extensions to filter, without a `.` prefix. On mobile, MIME types are the primary way to filter (iOS: extensions work in the document picker, not the media picker; Android: extensions not supported). |

`OpenDialogOptions`:

| Name | Type | Description |
| --- | --- | --- |
| title | `string` | Title of the dialog window (desktop only). |
| filters | `DialogFilter[]` | Filters of the dialog. On mobile, the media picker is shown if `pickerMode` is `media` / `image` / `video`, or if the filters include only image or video MIME types; otherwise the document picker. |
| defaultPath | `string` | Initial directory or file path. A directory path changes the dialog to that folder; otherwise the file name is set in the file name input and the dialog opens in the parent folder. On mobile the file name is always used; Android uses `(invalid).txt` if not provided. |
| multiple | `boolean` | Whether the dialog allows multiple selection. |
| directory | `boolean` | Whether the dialog is a directory selection. |
| recursive | `boolean` | If `directory` is true, indicates it will be read recursively later; defines whether subdirectories are allowed on the scope. |
| canCreateDirectories | `boolean` | Allow creating directories in the dialog. Enabled by default. macOS only. |
| pickerMode | `PickerMode` | Preferred mode on iOS / Android (distinct file and media pickers). Ignored on desktop. On iOS, ignored on iOS 13 and below. |
| fileAccessMode | `FileAccessMode` | `copy` (default): the picked file is copied to the app sandbox. `scoped`: file stays in place with security-scoped access managed by the system. For iOS / macOS document pickers only; image and video pickers always use `copy`. On iOS, ignored on iOS 13 and below. |

`SaveDialogOptions`: `title`, `filters`, `defaultPath`, `canCreateDirectories` (same meaning as above).

`MessageDialogOptions`:

| Name | Type | Description |
| --- | --- | --- |
| title | `string` | Title of the dialog. Defaults to the app name. |
| kind | `'info' \| 'warning' \| 'error'` | Kind of the dialog. Defaults to `info`. |
| okLabel | `string` | Label of the Ok button. Deprecated: use `buttons` instead. |
| buttons | `MessageDialogButtons` | Buttons of the dialog (since 2.4.0). |

`ConfirmDialogOptions` (for `ask` and `confirm`): `title`, `kind` (as above), `okLabel` (label of the confirm button), `cancelLabel` (label of the cancel button).

## Notes

- `open` / `save` add the selected path(s) to the filesystem and asset protocol scopes. When security matters more than ease of use, prefer writing a dedicated command. The scope change is not persisted (cleared on restart); it can be saved with tauri-plugin-persisted-scope.
- `ask` is a wrapper for `await message('msg', { buttons: 'YesNo' }) === 'Yes'`; `confirm` for `{ buttons: 'OkCancel' } === 'Ok'`.
- For `message`, a string `options` is the dialog title.
- Tauri plugin (Rust core + system WebView). Not Electron's `dialog` module; see the electron skill for Electron.
- Source: `tauri-apps/plugins-workspace@dialog-v2.8.3` `plugins/dialog/guest-js/index.ts`.

```typescript
import { message } from '@tauri-apps/plugin-dialog';
await message('File not found', { title: 'Tauri', kind: 'error' });
await message('Take on the task?', {
  buttons: { ok: 'Accept', cancel: 'Cancel' }
});
```

## Related

- [dialog plugin](../plugins-app/dialog.md)
