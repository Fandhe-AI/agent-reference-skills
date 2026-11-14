---
source: https://v2.tauri.app/plugin/upload/
---

# Upload

Upload files from disk to a remote server over HTTP. Download files from a remote HTTP server to disk.

## Signature / Usage

### Supported Platforms

Windows, Linux, macOS, Android, iOS: full support (`upload-v2.5.0`).

### Setup

```sh
npm run tauri add upload
# or: cargo tauri add upload
```

Manual. From `src-tauri`:

```sh
cargo add tauri-plugin-upload
```

From the project root, install the JavaScript guest bindings:

```sh
npm install @tauri-apps/plugin-upload
```

```rust
// src-tauri/src/lib.rs
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  tauri::Builder::default()
    .plugin(tauri_plugin_upload::init())
      .run(tauri::generate_context!())
      .expect("error while running tauri application");
}
```

### Usage

Once you've completed the registration and setup process for the plugin, you can access all of its APIs through the JavaScript guest bindings.

#### Upload

`upload` sends the file as the raw request body (not `multipart/form-data`) and returns the response body as text:

```javascript
import { upload } from '@tauri-apps/plugin-upload';
// when using `"withGlobalTauri": true`, you may use
// const { upload } = window.__TAURI__.upload;

const response = await upload(
  'https://example.com/file-upload',
  '/path/to/my/file.txt',
  ({ progressTotal, total }) =>
    console.log(`Uploaded ${progressTotal} of ${total} bytes`), // a callback that will be called with the upload progress
  { 'Content-Type': 'text/plain' } // optional headers to send with the request
);
```

It sends a `POST` request by default. To use `PUT` or `PATCH`, pass an `HttpMethod` as the fifth argument:

```javascript
import { upload, HttpMethod } from '@tauri-apps/plugin-upload';

await upload(
  'https://example.com/file-upload',
  '/path/to/my/file.txt',
  undefined, // no progress callback
  { 'Content-Type': 'text/plain' },
  HttpMethod.Put
);
```

#### Download

`download` saves the response body to the given file path:

```javascript
import { download } from '@tauri-apps/plugin-upload';
// when using `"withGlobalTauri": true`, you may use
// const { download } = window.__TAURI__.upload;

await download(
  'https://example.com/file-download-link',
  '/path/to/save/my/file.txt',
  ({ progressTotal, total }) =>
    console.log(`Downloaded ${progressTotal} of ${total} bytes`), // a callback that will be called with the download progress
  { Authorization: 'Bearer <token>' } // optional headers to send with the request
);
```

It sends a `GET` request by default. If you pass a body as the fifth argument, it sends a `POST` request with that body instead:

```javascript
import { download } from '@tauri-apps/plugin-upload';

await download(
  'https://example.com/export',
  '/path/to/save/report.csv',
  undefined, // no progress callback
  { 'Content-Type': 'application/json' },
  JSON.stringify({ format: 'csv' })
);
```

#### Progress

The progress callback runs for each chunk and receives:

- `progress`: bytes in the last chunk, not the running total
- `progressTotal`: bytes transferred so far
- `total`: total size in bytes. For downloads this comes from the `Content-Length` header and is `0` if the server doesn't send it.
- `transferSpeed`: approximate speed in bytes per second

#### File paths

Relative paths are resolved against the app's working directory, which is different in `tauri dev` and in a bundled app. Use absolute paths instead, for example with the [path API](/reference/javascript/api/namespacepath/):

```javascript
import { appDataDir, join } from '@tauri-apps/api/path';

const filePath = await join(await appDataDir(), 'file.txt');
```

When downloading, the parent directory must already exist, and any existing file at that path is overwritten. If the download fails, the partial file is not removed.

#### Errors

Both functions reject if the file can't be read or written, the request fails, or the server returns an error status.

### Permissions

```json
{
  "permissions": [
    ...,
    "upload:default",
  ]
}
```

`upload:default` enables all operations (`allow-upload`, `allow-download`).

| Identifier | Notes |
| --- | --- |
| `upload:allow-upload` / `upload:deny-upload` | upload command |
| `upload:allow-download` / `upload:deny-download` | download command |

## Notes

- Tauri plugin (Rust core + system WebView). The `...` in the capability snippet is the official placeholder for your other permissions.
- The Usage section follows the official page at tauri-docs@ed0786e (rewritten since 32f68c5: raw-body upload, `HttpMethod`, download with body, progress fields, absolute paths, errors). The relative link `/reference/javascript/api/namespacepath/` is a site-relative link kept from the official page; see the Path JS API page in this skill.
- The `headers` parameter is typed `Map<string, string>` in upload-v2.5.0 while the official examples pass a plain object (see the JS API page for the cast); the behavior statements above (default `POST` / `GET`, `total` = `0` without `Content-Length`) match the `guest-js/index.ts` doc comments at upload-v2.5.0.
- Source: `tauri-apps/plugins-workspace@upload-v2.5.0` `plugins/upload/Cargo.toml`, `plugins/upload/permissions/autogenerated/reference.md`, `plugins/upload/guest-js/index.ts`; docs https://github.com/tauri-apps/tauri-docs/blob/ed0786ec86699e4ffd08f3234e37aa125becb9eb/src/content/docs/plugin/upload.mdx (fetched 2026-11-14).

## Related

- [http-client.md](./http-client.md)
- [file-system.md](./file-system.md)
- [../plugin-js-api-core/upload.md](../plugin-js-api-core/upload.md)
