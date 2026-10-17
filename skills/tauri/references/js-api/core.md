---
source: https://v2.tauri.app/reference/javascript/api/namespacecore/
---

# core (invoke, Channel, convertFileSrc)

Invoke your custom commands. Also accessible with `window.__TAURI__.core` when `app.withGlobalTauri` is `true`.

## Signature / Usage

```typescript
import { invoke } from '@tauri-apps/api/core';
await invoke('login', { user: 'tauri', password: '<password>' });
```

```typescript
async function invoke<T>(cmd: string, args: InvokeArgs = {}, options?: InvokeOptions): Promise<T>
```

## Options / Props

### Exports

| Name | Signature | Since |
| --- | --- | --- |
| invoke | `invoke<T>(cmd: string, args?: InvokeArgs, options?: InvokeOptions): Promise<T>` | 1.0.0 |
| Channel | `class Channel<T = unknown>` with `id: number`, `onmessage: (response: T) => void`, `constructor(onmessage?)` | 2.0.0 |
| convertFileSrc | `convertFileSrc(filePath: string, protocol = 'asset'): string` | 1.0.0 |
| isTauri | `isTauri(): boolean` | 2.0.0 |
| Resource | `class Resource { readonly rid: number; constructor(rid: number); close(): Promise<void>; [Symbol.asyncDispose]() }` | |
| PluginListener | `class PluginListener { plugin: string; event: string; channelId: number; unregister(): Promise<void> }` | 2.0.0 |
| addPluginListener | `addPluginListener<T>(plugin: string, event: string, cb: (payload: T) => void): Promise<PluginListener>` | 2.0.0 |
| checkPermissions | `checkPermissions<T>(plugin: string): Promise<T>` | 2.0.0 |
| requestPermissions | `requestPermissions<T>(plugin: string): Promise<T>` | 2.0.0 |
| transformCallback | `transformCallback<T = unknown>(callback?: (response: T) => void, once = false): number` | 1.0.0 |
| SERIALIZE_TO_IPC_FN | `const SERIALIZE_TO_IPC_FN = '__TAURI_TO_IPC_KEY__'` | |
| PermissionState | `type PermissionState = 'granted' \| 'denied' \| 'prompt' \| 'prompt-with-rationale'` | |
| InvokeArgs | `type InvokeArgs = Record<string, unknown> \| number[] \| ArrayBuffer \| Uint8Array` | 1.0.0 |
| InvokeOptions | `interface InvokeOptions { headers: HeadersInit }` | 2.0.0 |

### Channel

A message channel used to stream values from Rust to the frontend; the JavaScript counterpart of `tauri::ipc::Channel`.

```typescript
import { Channel, invoke } from '@tauri-apps/api/core';

const onEvent = new Channel<string>();
onEvent.onmessage = (message) => {
  console.log(`got download event ${message}`);
};

await invoke('download', { url: 'https://tauri.app', onEvent });
```

Matching Rust command:

```rust
#[tauri::command]
async fn download(url: String, on_event: tauri::ipc::Channel<String>) -> tauri::Result<()> {
  on_event.send("started".to_string())?;
  on_event.send("finished".to_string())?;
  Ok(())
}
```

### InvokeArgs and raw payloads

An object is the usual form (each key becomes a command parameter, JSON). `ArrayBuffer`, `Uint8Array` and `number[]` send the whole body as `application/octet-stream`; the command then has a single `tauri::ipc::Request` parameter:

```rust
#[tauri::command]
fn upload(request: tauri::ipc::Request<'_>) -> Result<(), String> {
  let tauri::ipc::InvokeBody::Raw(bytes) = request.body() else {
    return Err("expected a raw body".into());
  };
  println!("got {} bytes", bytes.len());
  Ok(())
}
```

```typescript
await invoke('upload', new Uint8Array([1, 2, 3]), {
  headers: { 'x-file-name': 'image.png' }
});
```

### convertFileSrc

```typescript
import { downloadDir, join } from '@tauri-apps/api/path';
import { convertFileSrc } from '@tauri-apps/api/core';
const downloads = await downloadDir();
const filePath = await join(downloads, 'photo.png');
const assetUrl = convertFileSrc(filePath);
```

Requires the asset protocol enabled with the files in its scope, and the origins allowed by `app.security.csp`:

```json
{
  "app": {
    "security": {
      "assetProtocol": { "enable": true, "scope": ["$DOWNLOAD/**"] },
      "csp": "default-src 'self'; img-src 'self' asset: http://asset.localhost"
    }
  }
}
```

### Resource

A rust-backed resource stored through `tauri::Manager::resources_table`. It is not cleaned up automatically except on application exit; call `close()` or use `await using` (only `Symbol.asyncDispose` is implemented; synchronous `using` does not work). `Menu`, `TrayIcon`, `Image` and the menu item classes (`MenuItemBase` subclasses) are resources. `Webview` / `WebviewWindow` are not resources (no `rid` / `Symbol.asyncDispose`); their `close()` closes the webview itself rather than releasing a resource handle.

```typescript
import { Resource, invoke } from '@tauri-apps/api/core';

// `open_db` / `execute_sql` are app-defined commands
export class DatabaseHandle extends Resource {
  static async open(path: string): Promise<DatabaseHandle> {
    const rid: number = await invoke('open_db', { path });
    return new DatabaseHandle(rid);
  }

  async execute(sql: string): Promise<void> {
    await invoke('execute_sql', { rid: this.rid, sql });
  }
}

await using db = await DatabaseHandle.open('test.db');
await db.execute('SELECT *');
// `db` is closed here
```

## Notes

- The upstream TSDoc example uses a literal dummy password; it is replaced with a placeholder here.
- `Channel`: messages are delivered in send order; stays alive until the Rust `Channel` is dropped; messages that arrived before a handler was set are not replayed. For raw bytes declare `Channel<ArrayBuffer>`.
- `SERIALIZE_TO_IPC_FN`: implement `[SERIALIZE_TO_IPC_FN]()` on a class to control how it is serialized across IPC (for example `{ String: this.id }` for a Rust enum variant).
- `addPluginListener`, `checkPermissions`, `requestPermissions` are meant for plugin authors wrapping `plugin:<name>|register_listener` / `check_permissions` / `request_permissions`.
- `Resource.close` uses `core:resources:allow-close` (part of `core:resources:default`).
- For old browsers, `Symbol.asyncDispose ??= Symbol("Symbol.asyncDispose");` and tsconfig `"target": "es2022"`, `"lib": ["es2022", "esnext.disposable", "dom"]`.
- Tauri (Rust core + system WebView). Not Electron's IPC (`ipcRenderer` / `ipcMain`); see the electron skill for Electron.
- Source: `tauri-apps/tauri@tauri-v2.12.4` `packages/api/src/core.ts`.

## Related

- [event](./event.md)
- [path](./path.md)
- [image](./image.md)
