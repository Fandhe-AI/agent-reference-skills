---
source: https://v2.tauri.app/reference/javascript/upload/
---

# @tauri-apps/plugin-upload

Upload files from disk to a remote server over HTTP, and download files from a remote HTTP server to disk.

## Signature / Usage

```ts
import { upload } from '@tauri-apps/plugin-upload';

await upload(
  'https://example.com/file-upload',
  './path/to/my/file.txt',
  ({ progressTotal, total }) => console.log(`Uploaded ${progressTotal} of ${total} bytes`),
  { 'Content-Type': 'text/plain' } as unknown as Map<string, string>
);
```

```ts
function upload(
  url: string,
  filePath: string,
  progressHandler?: ProgressHandler,
  headers?: Map<string, string>,
  method?: HttpMethod
): Promise<string>   // @since 2.0.0

function download(
  url: string,
  filePath: string,
  progressHandler?: ProgressHandler,
  headers?: Map<string, string>,
  body?: string
): Promise<void>     // @since 2.0.0

enum HttpMethod { Post = 'POST', Put = 'PUT', Patch = 'PATCH' }

type ProgressHandler = (progress: ProgressPayload) => void

interface ProgressPayload {
  progress: number
  progressTotal: number
  total: number
  transferSpeed: number
}
```

## Options / Props

`upload`

| Name | Type | Description |
| --- | --- | --- |
| url | `string` | The URL to upload the file to. |
| filePath | `string` | The path of the file to upload. |
| progressHandler | `ProgressHandler` | A callback invoked with upload progress updates. |
| headers | `Map<string, string>` | Additional request headers to send with the upload. |
| method | `HttpMethod` | The HTTP method used to send the file. Defaults to `HttpMethod.Post`. Returns a promise resolving to the response body as text. |

`download`

| Name | Type | Description |
| --- | --- | --- |
| url | `string` | The URL to download the file from. |
| filePath | `string` | The path to save the file to. It must include the file name. |
| progressHandler | `ProgressHandler` | A callback invoked with download progress updates. The reported `total` will be `0` if the server did not send a `Content-Length` header or the response body is compressed. |
| headers | `Map<string, string>` | Additional request headers to send with the download request. |
| body | `string` | An optional request body. When provided, the download is requested with an HTTP `POST` request using this value as the body; otherwise an HTTP `GET` request is used. |

`ProgressPayload`

| Name | Type | Description |
| --- | --- | --- |
| progress | `number` | Bytes transferred since the previous progress event (size of the last chunk), not the cumulative total. |
| progressTotal | `number` | The cumulative number of bytes transferred so far. |
| total | `number` | Total size of the transfer in bytes. For a download, the response's `Content-Length` value (`0` if not sent or the body is compressed). For an upload, the size of the file. |
| transferSpeed | `number` | Current transfer speed, approximately in bytes per second. Recalculated about every 500 milliseconds and stays at `0` until then. |

## Notes

- `headers` is typed `Map<string, string>` but is forwarded to `invoke` unchanged (`headers ?? {}`); the official example passes a plain object, which in TypeScript needs a cast. The example above adds an `as unknown as Map<string, string>` cast; the upstream JavaScript example passes the plain object without a cast. Keep it a plain object, since a `new Map` would not be sent correctly.
- The upstream example logs `progress` (last chunk size); this page uses `progressTotal` for the cumulative count.
- The source has a `TODO: V3` to combine `headers` and `method` into one `options` object.
- Tauri plugin guest-js binding (Rust core + system WebView). Not Electron's API; see the electron skill for Electron.
- Source: `plugins-workspace@upload-v2.5.0` `plugins/upload/guest-js/index.ts`

## Related

- [Upload plugin](../plugins-core/upload.md)
- [HTTP Client plugin JS API](./http.md)
