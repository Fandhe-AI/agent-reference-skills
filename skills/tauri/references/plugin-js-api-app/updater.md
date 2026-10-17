---
source: https://v2.tauri.app/reference/javascript/updater/
---

# @tauri-apps/plugin-updater

In-app updates for Tauri applications: check the configured endpoints for a new release, download it and install it.

## Signature / Usage

```typescript
import { check } from '@tauri-apps/plugin-updater';

const update = await check();
if (update) {
  console.log(`update ${update.version} is available`);
  await update.downloadAndInstall();
}
```

```typescript
function check(options?: CheckOptions): Promise<Update | null>   // since 2.0.0; null when no update is available

class Update extends Resource {                                    // since 2.0.0
  available: boolean            // deprecated: always true, check for null from check() instead
  currentVersion: string
  version: string
  date?: string                 // RFC 3339 string, when provided by the server
  body?: string                 // release notes, when provided by the server
  rawJson: Record<string, unknown>
  download(onEvent?: (progress: DownloadEvent) => void, options?: DownloadOptions): Promise<void>
  install(options?: InstallOptions): Promise<void>
  downloadAndInstall(onEvent?: (progress: DownloadEvent) => void, options?: DownloadOptions & InstallOptions): Promise<void>
  close(): Promise<void>
}

type DownloadEvent =
  | { event: 'Started'; data: { contentLength?: number } }
  | { event: 'Progress'; data: { chunkLength: number } }
  | { event: 'Finished' }
```

## Options / Props

`CheckOptions`:

| Name | Type | Description |
| --- | --- | --- |
| headers | `HeadersInit` | Headers to send with the update check request. |
| timeout | `number` | Timeout in milliseconds. |
| proxy | `string` | Proxy URL used when checking and downloading updates. |
| target | `string` | Target identifier for the running application, sent to the backend. |

`DownloadOptions`: `headers?: HeadersInit`, `timeout?: number` (milliseconds).

`InstallOptions`:

| Name | Type | Description |
| --- | --- | --- |
| restartAfterInstall | `boolean` | If the Windows installer should restart the app after install. Default `true`. |

## Notes

- `Update` holds a resource on the Rust side: call `update.close()` when done with it without installing it.
- `install` must be called after `download`; otherwise it throws `Update.install called before Update.download`.
- Windows: `install` / `downloadAndInstall` exit the app after launching the updater installer successfully. macOS / Linux: relaunch the app to run the newly installed version.
- `download` callback: `Started` when the first chunk is received, `Progress` for every downloaded chunk, `Finished` when the download completes.
- `available` is marked `@deprecated` in the source (a TODO notes removal in v3).
- Tauri plugin (Rust core + system WebView). Not Electron's `autoUpdater`; see the electron skill for Electron.
- Source: `tauri-apps/plugins-workspace@updater-v2.14.0` `plugins/updater/guest-js/index.ts`.

```typescript
import { check } from '@tauri-apps/plugin-updater';

const update = await check();
if (update) {
  let downloaded = 0;
  await update.download((event) => {
    if (event.event === 'Progress') {
      downloaded += event.data.chunkLength;
      console.log(`downloaded ${downloaded} bytes`);
    }
  });
  await update.install();
}
```

## Related

- [updater plugin](../plugins-app/updater.md)
