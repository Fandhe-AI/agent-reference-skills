---
source: https://docs.expo.dev/versions/v58.0.0/sdk/filesystem/
---

# FileSystem

`expo-file-system` provides access to files and directories stored on a device or bundled as assets into the native project, and allows downloading and uploading files over the network. The current API is class based (`File`, `Directory`, `Paths`).

## Signature / Usage

```sh
npx expo install expo-file-system
```

```js
import { File, Directory, Paths } from 'expo-file-system';
```

`File` and `Directory` instances hold a reference to a file, content, or asset URI. The file or directory does not need to exist; an error is thrown from the constructor only if the wrong class is used for an existing path (for example a `File` for an existing directory).

Writing and reading text files:

```ts
import { File, Paths } from 'expo-file-system';

try {
  const file = new File(Paths.cache, 'example.txt');
  file.create(); // can throw an error if the file already exists or no permission to create it
  await file.write('Hello, world!'); // or `file.writeSync('Hello, world!');` for synchronous call
  console.log(file.textSync()); // Hello, world!
} catch (error) {
  console.error(error);
}
```

Downloading a file:

```ts
import { Directory, File, Paths } from 'expo-file-system';

const url = 'https://pdfobject.com/pdf/sample.pdf';
const destination = new Directory(Paths.cache, 'pdfs');
try {
  destination.create();
  const output = await File.downloadFileAsync(url, destination);
  console.log(output.exists); // true
  console.log(output.uri); // path to the downloaded file, e.g., '${cacheDirectory}/pdfs/sample.pdf'
} catch (error) {
  console.error(error);
}
```

Download with `expo/fetch`, and upload (blob body or `FormData`):

```ts
import { fetch } from 'expo/fetch';
import { File, Paths } from 'expo-file-system';

const response = await fetch('https://pdfobject.com/pdf/sample.pdf');
const src = new File(Paths.cache, 'file.pdf');
await src.write(await response.bytes());

const file = new File(Paths.cache, 'file.txt');
await file.write('Hello, world!');
await fetch('https://example.com', { method: 'POST', body: file });

const formData = new FormData();
formData.append('data', file);
await fetch('https://example.com', { method: 'POST', body: formData });
```

Moving and copying:

```ts
import { Directory, File, Paths } from 'expo-file-system';

const file = new File(Paths.document, 'example.txt');
file.create();
const copiedFile = new File(Paths.cache, 'example-copy.txt');
file.copySync(copiedFile);
file.moveSync(Paths.cache);
file.moveSync(new Directory(Paths.cache, 'newFolder'));
```

Previewing files (Android opens an installed app for the MIME type; iOS uses Quick Look):

```ts
import { File, Paths } from 'expo-file-system';

const file = await File.downloadFileAsync(
  'https://pdfobject.com/pdf/sample.pdf',
  new File(Paths.cache, 'sample.pdf')
);

if (await File.canPreview(file)) {
  await File.preview(file, { title: 'Sample PDF' });
}
```

Random-access reads with `FileHandle`:

```ts
import { File, Paths, FileMode } from 'expo-file-system';

const file = new File(Paths.document, 'recording.wav');
const handle = file.open(FileMode.ReadOnly);

// Read the WAV header (first 44 bytes)
const header = handle.readBytesSync(44);

// Seek to a specific offset and read a chunk
handle.offset = 1024;
const chunk = await handle.readBytes(4096);

handle.close();
```

Using the legacy API alongside the new one:

```ts
import * as FileSystem from 'expo-file-system/legacy';
import { File, Paths } from 'expo-file-system';

const file = new File(Paths.cache, 'example.txt');
const content = await FileSystem.readAsStringAsync(file.uri);
```

Config plugin (iOS Info.plist flags):

```json
{
  "expo": {
    "plugins": [
      [
        "expo-file-system",
        {
          "supportsOpeningDocumentsInPlace": true,
          "enableFileSharing": true
        }
      ]
    ]
  }
}
```

## Options / Props

All entries are supported on Android, iOS and tvOS unless noted.

Config plugin properties (iOS only, both default `false`): `supportsOpeningDocumentsInPlace` enables `LSSupportsOpeningDocumentsInPlace` in Info.plist; `enableFileSharing` enables `UIFileSharingEnabled` (app Documents directory visible in the Files app and iTunes File Sharing).

`Directory` (constructor accepts strings joined into the URI; first argument may be a `Directory` such as `Paths.cache`):

| Member | Returns / Type | Description |
| --- | --- | --- |
| `exists` | `boolean` | Whether the directory exists and can be accessed. |
| `size` | `number \| null` | Size in bytes; `null` if missing or unreadable. |
| `uri` | `string` (read only) | URI; may change after `move`. |
| `name`, `parentDirectory` | `string`, `Directory` | Name and containing directory. |
| `create(options?: DirectoryCreateOptions)` | `void` | Creates the directory. |
| `createDirectory(name: string)` / `createFile(name: string, mimeType: string \| null)` | `Directory` / `File` | Creates a child. |
| `copy(destination: File \| Directory, options?: RelocationOptions)` / `copySync(...)` | `Promise<void>` / `void` | Copies the directory. |
| `move(destination, options?)` / `moveSync(...)` | `Promise<void>` / `void` | Moves; updates `uri`. |
| `rename(newName: string)` | `void` | Renames. |
| `delete()` | `void` | Deletes the directory and everything inside. |
| `info()` | `DirectoryInfo` | Metadata. |
| `list()` | `(File \| Directory)[]` | Contents; throws if the parent directory does not exist. |
| `watch(callback: (event: WatchEvent<File \| Directory>) => void, options?: WatchOptions)` | `WatchSubscription` | Watches for changes; stops automatically if deleted or renamed. On iOS child changes are surfaced as a coarse-grained `modified` event on the directory itself. |

`File` (implements Web `Blob`; constructor strings joined into the URI; first argument may be a `Directory` or a `File`):

| Member | Returns / Type | Description |
| --- | --- | --- |
| `exists`, `size`, `type`, `name`, `extension`, `uri`, `parentDirectory` | `boolean`, `number` (0 if missing), `string` (MIME; empty if missing), `string`, `string` (e.g. `'.png'`), `string`, `Directory` | Basic properties. |
| `creationTime`, `lastModified` | `number \| null` | Milliseconds since epoch; `null` if missing/unreadable (`creationTime` also `null` before Android API 26). |
| `modificationTime`, `md5` | `number \| null`, `string \| null` | Deprecated: use `lastModified` / `await file.digest('MD5')`. |
| `contentUri` (Android) | `string` | Content URI that can be shared with external apps. |
| `create(options?: FileCreateOptions)` | `void` | Creates the file. |
| `write(content: string \| ArrayBuffer \| Uint8Array, options?: FileWriteOptions)` / `writeSync(...)` | `Promise<void>` / `void` | Writes content. |
| `text()` / `textSync()` | `Promise<string>` / `string` | Text content. |
| `base64()` / `base64Sync()` | `Promise<string>` / `string` | Base64 content. |
| `bytes()` / `bytesSync()` | `Promise<Uint8Array>` / `Uint8Array` | Entire content as bytes. |
| `arrayBuffer()`, `json()`, `formData()`, `slice(start?, end?, contentType?)`, `stream()` | Blob-compatible | `stream()` is an alias for `readableStream()`. |
| `readableStream()` / `writableStream()` | `ReadableStream<Uint8Array>` / `WritableStream<Uint8Array>` | Stream via an internal `FileHandle` (1024-byte chunks by default for reads); handle closed automatically. |
| `open(mode?: FileMode)` | `FileHandle` | On Android SAF `content://` URIs `ReadWrite` is unsupported; default is `ReadOnly` for SAF URIs and `ReadWrite` for `file://` URIs. |
| `copy`, `copySync`, `move`, `moveSync`, `rename`, `delete` | as `Directory` | `move` updates `uri`. |
| `info(options?: InfoOptions)` | `FileInfo` | Metadata. |
| `digest(algorithm: FileDigestAlgorithm)` | `Promise<string>` | Lowercase hexadecimal digest. |
| `createDownloadTask(url: string, destination: File \| Directory, options?: DownloadTaskOptions)` (static) | `DownloadTask` | Creates a task without starting it. If a directory is given, the filename comes from response headers or the URL. |
| `createUploadTask(url: string, options?: UploadOptions)` | `UploadTask` | Creates an upload task for this file without starting it. |
| `upload(url: string, options?: UploadOptions)` | `Promise<UploadResult>` | Starts the upload immediately; resolves for any completed response including non-2xx; rejects if the file cannot be read, the request fails, or it is cancelled. |
| `pickFileAsync(options?: PickSingleFileOptions)` (static, overload 1) | `Promise<PickSingleFileResult>` | System file picker for one file (`multipleFiles` undefined or `false`). |
| `pickFileAsync(options?: PickMultipleFilesOptions)` (static, overload 2) | `Promise<PickMultipleFilesResult>` | Multiple files (`multipleFiles: true`). |
| `pickFileAsync(initialUri?: string, mimeType?: string)` (static, overload 3) | `Promise<File \| File[]>` | Deprecated: use `pickFileAsync({initialUri, mimeTypes: mimeType})`. On iOS returns a temporary copy. |
| `canPreview(options?: FileCanPreviewOptions)` (Android, iOS) | `Promise<boolean>` | Whether the platform can preview the file; `false` if missing; rejects for invalid/unreadable files. |
| `File.canPreview(input: File \| File[], options?)` (static; Android, iOS) | `Promise<boolean>` | All files previewable? Android resolves `false` for more than one file; rejects empty arrays. |
| `preview(options?: FilePreviewOptions)` (Android, iOS) | `Promise<void>` | iOS: Quick Look; Android: `ACTION_VIEW` intent. Resolves at presentation or handoff; rejects if the file does not exist or cannot be previewed. |
| `File.preview(input: File \| File[], options?: FilePreviewOptions & FilePreviewCollectionOptions)` (static; Android, iOS) | `Promise<void>` | Previews in order starting at `initialIndex` (default `0`). Android rejects more than one file. Rejects `title` / `mimeType` with multiple files. |
| `watch(callback: (event: WatchEvent<File>) => void, options?: WatchOptions)` | `WatchSubscription` | Stops automatically if deleted or renamed. |

`FileHandle` (from `file.open()`; always `close()`; await async operations on one handle to keep ordering):

| Member | Returns / Type | Description |
| --- | --- | --- |
| `offset` | `number \| null` | Current byte offset; settable to seek; `null` after close. Setting past the size makes the next write append at the end. |
| `size` | `number \| null` | File size; `null` after close. |
| `readBytes(length: number)` / `readBytesSync(length)` | `Promise<Uint8Array>` / `Uint8Array` | Reads up to `length` bytes and advances the offset. Per-call limit is the platform `ArrayBuffer` size (2 GB on Android). |
| `writeBytes(bytes: Uint8Array)` / `writeBytesSync(bytes)` | `Promise<void>` / `void` | Writes at the offset. |
| `close()` | `void` | Releases the file descriptor; later reads/writes throw. |

`DownloadTask` (states `'idle' \| 'active' \| 'paused' \| 'completed' \| 'cancelled' \| 'error'`):

| Member | Returns | Description |
| --- | --- | --- |
| `state` | `DownloadTaskState` | Current state. |
| `downloadAsync()` | `Promise<File \| null>` | Starts the download (only once, while `idle`); `null` if paused before completion; rejects on failure or cancel; `AbortError` if `options.signal` aborts. |
| `pause()` / `pauseAsync()` | `void` / `Promise<void>` | Requests pause; `pauseAsync` waits until resume data is available. |
| `resumeAsync()` | `Promise<File \| null>` | Resumes a paused download. |
| `cancel()` | `void` | Cancels; no effect after a terminal state. |
| `savable()` | `DownloadPauseState` | Serializable paused state (only while `paused`). |
| `fromSavable(state: DownloadPauseState, options?: DownloadTaskOptions)` | `DownloadTask` | Paused task from saved state; new headers override saved ones with the same names. |
| `addListener('progress', listener: (data: DownloadProgress) => void)` | `EventSubscription` | Prefer the `onProgress` option. |
| `acknowledgeBackgroundCompletionAsync()` (iOS) | `Promise<void>` | Acknowledge a successful download when `deferBackgroundSessionCompletion` is used. |
| `release()` | `void` | Releases the native task handle. |

`UploadTask` (states are the download states except `paused`): `state`, `uploadAsync(): Promise<UploadResult>` (once, while `idle`; `AbortError` on `signal` abort), `cancel()`, `addListener('progress', (data: UploadProgress) => void)`, `release()`.

`Paths`:

| Member | Returns / Type | Description |
| --- | --- | --- |
| `Paths.bundle` | `Directory` | Directory where bundled assets are stored. |
| `Paths.cache` | `Directory` | Files the system may delete when storage is low. |
| `Paths.document` | `Directory` | Files safe from system deletion. |
| `Paths.appleSharedContainers` | `Record<string, Directory>` | Apple shared containers. |
| `Paths.availableDiskSpace`, `Paths.totalDiskSpace` | `number` | Internal storage space in bytes. |
| `basename(path, ext?)`, `dirname(path)`, `extname(path)`, `join(...paths)`, `normalize(path)`, `relative(from, to)` | `string` | Path utilities; `path` may be `string \| File \| Directory`. |
| `isAbsolute(path)` | `boolean` | Whether the path is absolute. |
| `parse(path)` | `{ base, dir, ext, name, root }` | Parsed components. |
| `info(...uris: string[])` | `PathInfo` | `{ exists: boolean, isDirectory: boolean \| null }`. |

Option and result types:

| Type | Definition |
| --- | --- |
| `DirectoryCreateOptions` | `idempotent?` (default `false`), `intermediates?` (default `false`), `overwrite?` (default `false`) |
| `FileCreateOptions` | `intermediates?` (default `false`), `overwrite?` (default `false`) |
| `FileWriteOptions` | `append?: boolean` (default `false`), `encoding?: EncodingType \| 'utf8' \| 'base64'` (default UTF8) |
| `RelocationOptions` | `overwrite?: boolean` (default `false`) |
| `InfoOptions` | `md5?: boolean` (deprecated; default `false`) |
| `FileInfo` | `exists: boolean`, `creationTime?`, `modificationTime?`, `size?`, `uri?` (preserves `file://` or `content://`), `md5?` (deprecated) |
| `DirectoryInfo` | `exists`, `creationTime?`, `files?: string[]`, `modificationTime?`, `size?`, `uri?` |
| `FileDigestAlgorithm` | `'MD5' \| 'SHA-1' \| 'SHA-256' \| 'SHA-384' \| 'SHA-512'` |
| `FileCanPreviewOptions` | `mimeType?: string` (Android finds a matching app; defaults to the file's `type`) |
| `FilePreviewOptions` | `mimeType?`, `title?` |
| `FilePreviewCollectionOptions` | `initialIndex?: number` (zero-based; default `0`) |
| `PickFileGeneralOptions` | `initialUri?: string`, `mimeTypes?: string \| string[]` (default `'*/*'`; wildcards like `'image/*'`), `multipleFiles?: boolean` (default `false`) |
| `PickSingleFileResult` / `PickMultipleFilesResult` | `{ canceled: false, result: File }` / `{ canceled: false, result: File[] }`; canceled: `{ canceled: true, result: null }` |
| `DownloadTaskOptions` | `headers?`, `onProgress?`, `signal?`, `sessionType?: NetworkTaskSessionType` (iOS; default `'background'`; ignored on Android), `deferBackgroundSessionCompletion?: boolean` (iOS; default `false`; 25-second deadline for event delivery and JS processing) |
| `DownloadProgress` | `bytesWritten: number`, `totalBytes: number` (`-1` if no `Content-Length`) |
| `DownloadPauseState` | `fileUri`, `url`, `isDirectory`, `headers?`, `resumeData?` (opaque) |
| `UploadOptions` | `fieldName?` (default `'file'`), `headers?`, `httpMethod?: 'POST' \| 'PUT' \| 'PATCH'` (default `'POST'`), `mimeType?`, `onProgress?`, `parameters?` (multipart form params), `sessionType?` (iOS; default `'background'`), `signal?`, `uploadType?: UploadType` (default `BINARY_CONTENT`) |
| `UploadProgress` / `UploadResult` | `{ bytesSent, totalBytes }` / `{ body: string, headers: Record<string, string>, status: number }` |
| `NetworkTaskSessionType` | `'background' \| 'foreground'` |
| `WatchEvent<T>` | `type: WatchEventType`, `target: T` (original path for `renamed`), `newTarget?: T` (Android rename), `nativeEventFlags?: number` |
| `WatchEventType` | `'created' \| 'modified' \| 'deleted' \| 'renamed'` |
| `WatchOptions` | `debounce?: number` (ms; default `100`), `events?: WatchEventType[]` |
| `WatchSubscription` | `remove: () => void` |

Enums: `EncodingType` (`Base64 = "base64"`, `UTF8 = "utf8"`); `FileMode` (`ReadOnly = "r"`, `ReadWrite = "rw"` (not for SAF `content://` URIs), `WriteOnly = "w"`, `Append = "wa"` (for SAF files strictly append-only, cursor cannot move), `Truncate = "wt"`); `UploadType` (`BINARY_CONTENT = 0`, `MULTIPART = 1`).

## Notes

- Platforms (frontmatter `platforms`): Android, iOS, tvOS, Included in Expo Go.
- The old module-level functions (`FileSystem.copyAsync`, `createDownloadResumable`, `createUploadTask`, `deleteAsync`, `deleteLegacyDocumentDirectoryAndroid`, `downloadAsync`, `getContentUriAsync`, `getFreeDiskStorageAsync`, `getInfoAsync`, `getTotalDiskCapacityAsync`, `makeDirectoryAsync`, `moveAsync`, `readAsStringAsync`, `readDirectoryAsync`, `uploadAsync`, `writeAsStringAsync`) are deprecated and "will throw in runtime"; import them from `expo-file-system/legacy` instead. Replacements named in the source: `copyAsync` -> `new File().copy()`; `deleteAsync` -> `new File().delete()` / `new Directory().delete()`; `downloadAsync` -> `File.downloadFileAsync`; `getFreeDiskStorageAsync` -> `Paths.availableDiskSpace`; `getInfoAsync` -> `new File().info`; `getTotalDiskCapacityAsync` -> `Paths.totalDiskSpace`; `makeDirectoryAsync` -> `new Directory().create()`; `moveAsync` -> `new File().move()`; `readAsStringAsync` -> `new File().text()`; `readDirectoryAsync` -> `new Directory().list()`; `uploadAsync` -> `@expo/fetch`; `writeAsStringAsync` -> `await new File().write()` or `new File().writeSync()`.
- `File.downloadFileAsync` and a directory picker (`pickDirectoryAsync`) are used in the source examples and prose, but the generated API listing of this page does not include entries for them.
- Preview details: `File.canPreview()` resolves `false` when the platform cannot preview or a checked file is missing or has an unsupported type, and rejects on invalid or unreadable files; keep files available until the viewer closes; on a single file, `mimeType` defaults to the file's `type` (pass it explicitly if the extension does not identify the type, particularly on Android). If a share sheet is useful, compose with `expo-sharing` when previewing fails.
- Existing React Native apps (no CNG): add `LSSupportsOpeningDocumentsInPlace` and `UIFileSharingEnabled` (`<true/>`) to `ios/[app]/Info.plist`.
- The source example calls copy()/move() without await although they are documented as returning Promise<void>; the sync variants are used here.
- Source code: https://github.com/expo/expo/tree/sdk-58/packages/expo-file-system

## Related

- [DocumentPicker](./document-picker.md)
- [Sharing](./sharing.md)
- [Blob](./blob.md)
- [Crypto](./crypto.md)
