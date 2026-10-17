---
source: https://v2.tauri.app/reference/javascript/fs/
---

# @tauri-apps/plugin-fs

Access the file system.

## Signature / Usage

```ts
import { readTextFile, writeTextFile, BaseDirectory } from '@tauri-apps/plugin-fs';
await writeTextFile('file.txt', "Hello world", { baseDir: BaseDirectory.AppLocalData });
const contents = await readTextFile('file.txt', { baseDir: BaseDirectory.AppLocalData });
```

```ts
// Files and directories (all `path` params are string | URL; URLs must use the file: protocol)
function create(path, options?: CreateOptions): Promise<FileHandle>
function open(path, options?: OpenOptions): Promise<FileHandle>
function copyFile(fromPath, toPath, options?: CopyFileOptions): Promise<void>
function mkdir(path, options?: MkdirOptions): Promise<void>
function readDir(path, options?: ReadDirOptions): Promise<DirEntry[]>
function readFile(path, options?: ReadFileOptions): Promise<Uint8Array<ArrayBuffer>>
function readTextFile(path, options?: ReadFileOptions): Promise<string>
function readTextFileLines(path, options?: ReadFileOptions): Promise<AsyncIterableIterator<string>>
function remove(path, options?: RemoveOptions): Promise<void>
function rename(oldPath, newPath, options?: RenameOptions): Promise<void>
function stat(path, options?: StatOptions): Promise<FileInfo>
function lstat(path, options?: StatOptions): Promise<FileInfo>
function truncate(path, len?: number, options?: TruncateOptions): Promise<void>
function writeFile(path, data: Uint8Array | ReadableStream<Uint8Array>, options?: WriteFileOptions): Promise<void>
function writeTextFile(path, data: string, options?: WriteFileOptions): Promise<void>
function exists(path, options?: ExistsOptions): Promise<boolean>
function size(path, options?: SizeOptions): Promise<number>                       // @since 2.1.0
function watch(paths: string | string[] | URL | URL[], cb: (event: WatchEvent) => void, options?: DebouncedWatchOptions): Promise<UnwatchFn>
function watchImmediate(paths: string | string[] | URL | URL[], cb: (event: WatchEvent) => void, options?: WatchOptions): Promise<UnwatchFn>
function startAccessingSecurityScopedResource(path: string | URL): Promise<void>  // @since 2.5.0
function stopAccessingSecurityScopedResource(path: string | URL): Promise<void>   // @since 2.5.0

class FileHandle extends Resource {
  read(buffer: Uint8Array): Promise<number | null>
  seek(offset: number, whence: SeekMode): Promise<number>
  stat(): Promise<FileInfo>
  truncate(len?: number): Promise<void>
  write(data: Uint8Array): Promise<number>
}

enum SeekMode { Start = 0, Current = 1, End = 2 }
type UnwatchFn = () => void
```

Everything above is `@since 2.0.0` unless noted. Also re-exports `BaseDirectory`.

## Options / Props

Option interfaces (each also accepts `baseDir?: BaseDirectory`, the base directory for `path`, unless the table says otherwise)

| Interface | Name | Type | Description |
| --- | --- | --- | --- |
| CreateOptions | baseDir | `BaseDirectory` | Base directory for `path`. |
| OpenOptions | read | `boolean` | Read access. |
| OpenOptions | write | `boolean` | Write access. If the file exists, writes overwrite contents, by default without truncating it. |
| OpenOptions | append | `boolean` | Writes append instead of overwriting. `{ write: true, append: true }` is the same as `{ append: true }`. |
| OpenOptions | truncate | `boolean` | Truncate the file to `0` size if it exists. Requires write access. |
| OpenOptions | create | `boolean` | Allow creating a new file if one does not exist. Requires write or append access. |
| OpenOptions | createNew | `boolean` | Default `false`. If `true`, no file, directory or symlink may exist at the target; `create` and `truncate` are ignored. Requires write or append access. |
| OpenOptions | mode | `number` | Permissions when creating the file (defaults to `0o666`, before umask). Ignored on Windows. |
| OpenOptions | baseDir | `BaseDirectory` | Base directory for `path`. |
| CopyFileOptions | fromPathBaseDir / toPathBaseDir | `BaseDirectory` | Base directory for `fromPath` / `toPath`. |
| MkdirOptions | mode | `number` | Permissions (defaults to `0o777`, before umask). Ignored on Windows. |
| MkdirOptions | recursive | `boolean` | Default `false`. If `true`, intermediate directories are also created (like `mkdir -p`). |
| MkdirOptions | baseDir | `BaseDirectory` | Base directory for `path`. |
| ReadDirOptions | baseDir | `BaseDirectory` | Base directory for `path`. |
| ReadFileOptions | baseDir | `BaseDirectory` | Base directory for `path`. |
| ReadFileOptions | encoding | `string` | Text encoding when reading a text file. Defaults to `'utf-8'`. |
| RemoveOptions | recursive | `boolean` | Default `false`. If `true`, removes a non-empty directory. |
| RemoveOptions | baseDir | `BaseDirectory` | Base directory for `path`. |
| RenameOptions | oldPathBaseDir / newPathBaseDir | `BaseDirectory` | Base directory for `oldPath` / `newPath`. |
| StatOptions, TruncateOptions, ExistsOptions | baseDir | `BaseDirectory` | Base directory for `path`. |
| SizeOptions (since 2.6.0) | baseDir | `BaseDirectory` | Base directory for `path`. |
| WriteFileOptions | append | `boolean` | Default `false`. If `true`, appends instead of overwriting. |
| WriteFileOptions | create | `boolean` | Create a new file if none exists (defaults to `true`). |
| WriteFileOptions | createNew | `boolean` | Create a new file, failing if it already exists. |
| WriteFileOptions | mode | `number` | File permissions. Ignored on Windows. |
| WriteFileOptions | baseDir | `BaseDirectory` | Base directory for `path`. |
| WatchOptions | recursive | `boolean` | Watch a directory recursively. |
| WatchOptions | baseDir | `BaseDirectory` | Base directory for `path`. |
| DebouncedWatchOptions (extends WatchOptions) | delayMs | `number` | Debounce delay in milliseconds; changes in the window are grouped. Defaults to `2000`. |

`DirEntry`: `name: string`, `isDirectory: boolean`, `isFile: boolean`, `isSymlink: boolean`.

`FileInfo`

| Name | Type | Description |
| --- | --- | --- |
| isFile / isDirectory / isSymlink | `boolean` | Mutually exclusive kind flags. |
| size | `number` | Size of the file, in bytes. |
| mtime / atime / birthtime | `Date \| null` | Last modification / last access / creation time. May not be available on all platforms. |
| readonly | `boolean` | Whether this is a readonly (unwritable) file. |
| fileAttributes | `number \| null` | File system attribute information (Windows File Attribute Constants). Unsupported on macOS / Linux / Android / iOS. |
| dev, ino, mode, nlink, uid, gid, rdev, blksize, blocks | `number \| null` | Unix stat fields (device ID, inode, raw `st_mode` bits, hard links, owner user / group ID, device ID of this file, I/O block size, blocks in 512-byte units). Unsupported on Windows. |

`WatchEvent`: `type: WatchEventKind`, `paths: string[]`, `attrs: unknown`.

```ts
type WatchEventKind =
  | 'any'
  | { access: WatchEventKindAccess }
  | { create: WatchEventKindCreate }
  | { modify: WatchEventKindModify }
  | { remove: WatchEventKindRemove }
  | 'other'
```

`WatchEventKindAccess`, `WatchEventKindCreate`, `WatchEventKindModify`, `WatchEventKindRemove` are exported discriminated unions on `kind` (for example `{ kind: 'rename'; mode: 'any' | 'to' | 'from' | 'both' | 'other' }`); see the source for the complete variants.

## Notes

- Writing under `BaseDirectory.AppLocalData` needs a write permission such as `fs:allow-applocaldata-write` (`fs:default` only grants read access and `mkdir` for the app-specific directories), and the directory must be created first (e.g. `mkdir` with `recursive: true`).

- Security: this module prevents path traversal; parent directory accessors (`/usr/path/to/../file`, `../path/to/file`) are not allowed. Paths must be relative to a `BaseDirectory` or created with the path API.
- The API has a scope configuration that restricts accessible paths with glob patterns. Trying to execute any API with a URL not configured on the scope results in a promise rejection due to denied access. Scopes apply to all `fs` APIs with `fs:scope`, or to a specific API by its identifier:

```json
{
  "permissions": [
    {
      "identifier": "fs:scope",
      "allow": [{ "path": "$APPDATA/databases/*" }]
    }
  ]
}
```

```json
{
  "permissions": [
    {
      "identifier": "fs:allow-exists",
      "allow": [{ "path": "$APPDATA/databases/*" }]
    }
  ]
}
```

- Scope variables injected at runtime: `$APPCONFIG`, `$APPDATA`, `$APPLOCALDATA`, `$APPCACHE`, `$APPLOG`, `$AUDIO`, `$CACHE`, `$CONFIG`, `$DATA`, `$LOCALDATA`, `$DESKTOP`, `$DOCUMENT`, `$DOWNLOAD`, `$EXE`, `$FONT`, `$HOME`, `$PICTURE`, `$PUBLIC`, `$RUNTIME`, `$TEMPLATE`, `$VIDEO`, `$RESOURCE`, `$TEMP`.
- iOS security-scoped resources: on iOS the plugin automatically manages access to security-scoped resources when a file URL is accessed (required for files outside the app sandbox, e.g. from a file picker). `startAccessingSecurityScopedResource` / `stopAccessingSecurityScopedResource` are only needed for manual management (every start must be paired with a stop); on other platforms they do nothing.
- `open` / `create`: it is the caller's responsibility to close the returned `FileHandle`.
- `stat` always follows symlinks but rejects if the symlink points outside the scope; `lstat` returns info about the symlink itself.
- `rename`: if `newPath` exists and is not a directory it is replaced; on Unix it does not follow symlinks at either path.
- `readTextFileLines` returns an async iterator; breaking out of a `for await` loop closes the file.
- `size` on a directory iterates recursively over every file and directory and can be very time consuming on large directories.
- `watch` and `watchImmediate` require the `watch` Cargo feature of the Rust plugin; both are marked `TODO: Return Watcher instead in v3` in the source.
- Tauri plugin guest-js binding (Rust core + system WebView). Not Electron's API; see the electron skill for Electron.
- Source: `plugins-workspace@fs-v2.7.1` `plugins/fs/guest-js/index.ts`

## Related

- [File System plugin](../plugins-core/file-system.md)
