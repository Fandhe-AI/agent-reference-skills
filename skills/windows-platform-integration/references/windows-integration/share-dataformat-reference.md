# Windows Share DataFormat and FileType reference

Reference for choosing `DataFormat` declarations and send/receive APIs for Windows Share integration, plus a FileType cheat sheet by app category.

## Signature / Usage

```xml
<uap:FileType>.jpg</uap:FileType>
<uap:FileType>.png</uap:FileType>
<uap:SupportsAnyFileType />
```

## Options / Props

DataFormat reference:

| DataFormat | Send API | Receive API | Typical app types |
|------------|----------|-------------|-------------------|
| `Text` | `SetText` | `GetTextAsync` | Notes apps, clipboard tools, general text |
| `Uri` / `WebLink` | `SetWebLink` | `GetWebLinkAsync` | Browsers, bookmarks, messaging apps |
| `ApplicationLink` | `SetApplicationLink` | `GetApplicationLinkAsync` | Apps that expose deep links |
| `Html` | `SetHtmlFormat` | `GetHtmlFormatAsync` | Email clients, rich-text editors |
| `Bitmap` | `SetBitmap` | `GetBitmapAsync` | Photo editors, image viewers |
| `StorageItems` | `SetStorageItems` | `GetStorageItemsAsync` | File managers, cloud storage apps |
| `Rtf` | `SetRtf` | `GetRtfAsync` | Word processors, rich-text editors |

FileType declarations by app category:

| App category | Recommended `<uap:FileType>` | Additional data formats |
|--------------|------------------------------|-------------------------|
| Photo viewer / editor | `.jpg` `.jpeg` `.png` `.gif` `.bmp` `.heic` `.webp` | `Bitmap`, `StorageItems` |
| Video player | `.mp4` `.mov` `.avi` `.mkv` `.wmv` | `StorageItems` |
| Audio player | `.mp3` `.flac` `.wav` `.aac` `.m4a` | `StorageItems` |
| Document editor | `.pdf` `.docx` `.xlsx` `.pptx` `.txt` | `StorageItems` |
| Link handler / browser | (no file types) | `Uri`, `WebLink` |
| Messaging app | (no file types, or specific attachment types) | `Uri`, `WebLink`, `StorageItems` |
| Notes app | `.txt` `.md` | `Text`, `StorageItems` |
| Cloud storage / file mover | `<uap:SupportsAnyFileType />` | `StorageItems` |

## Notes

- For URLs, prefer `SetWebLink` over `SetText`: target apps can generate rich link previews and handle navigation only when content arrives typed as a URI.
- Declare the narrowest set of `<uap:FileType>` values; fewer, more specific types reduce Share Sheet noise and keep the app from appearing for content it can't handle.
- `<uap:SupportsAnyFileType />` is appropriate only for general-purpose file movers. Over-broad declarations are the most common share-target bug.
- Namespace of the APIs: `Windows.ApplicationModel.DataTransfer` (`DataPackage` / `DataPackageView`).

## Related

- [Share content from your app (Send)](./share-sheet-send.md)
- [Receive content in your app (Share Target)](./share-sheet-receive.md)
- [DataPackage](./data-package.md)
- [DataPackageView](./data-package-view.md)
- [Official docs: DataFormat reference](https://learn.microsoft.com/en-us/windows/apps/develop/windows-integration/dataformat-reference)
