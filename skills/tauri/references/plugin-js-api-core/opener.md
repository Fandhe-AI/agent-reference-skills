---
source: https://v2.tauri.app/reference/javascript/opener/
---

# @tauri-apps/plugin-opener

Open files and URLs using their default application.

## Signature / Usage

```ts
import { openUrl, openPath, revealItemInDir } from '@tauri-apps/plugin-opener';

// opens the given URL on the default browser:
await openUrl('https://github.com/tauri-apps/tauri');
// opens the given URL using `firefox`:
await openUrl('https://github.com/tauri-apps/tauri', 'firefox');
// opens a file using the default program:
await openPath('/path/to/file');
await revealItemInDir('/path/to/file');
```

```ts
function openUrl(url: string | URL, openWith?: 'inAppBrowser' | string): Promise<void>   // @since 2.0.0
function openPath(path: string, openWith?: string): Promise<void>                        // @since 2.0.0
function revealItemInDir(path: string | string[]): Promise<void>                         // @since 2.0.0
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| openUrl: url | `string \| URL` | The URL to open. |
| openUrl: openWith | `'inAppBrowser' \| string` | The app to open the URL with. If not specified, defaults to the system default application for the specified url type. On mobile, `openWith` can be provided as `inAppBrowser` to open the URL in an in-app browser. Otherwise, it will open the URL in the system default browser. |
| openPath: path | `string` | The path to open. |
| openPath: openWith | `string` | The app to open the path with. If not specified, defaults to the system default application for the specified path type. |
| revealItemInDir: path | `string \| string[]` | The path to reveal (one path or a list). |

## Notes

- Security: this API has a scope configuration that forces you to restrict the files and urls to be opened.
- Scope is configured through capabilities: `opener:default` allows `mailto:`, `tel:`, `http://` and `https://` URLs and `revealItemInDir`. Other targets need `opener:allow-open-url` / `opener:allow-open-path` with glob entries, e.g.:

```json
{
  "identifier": "opener:allow-open-url",
  "allow": [{ "url": "https://tauri.app" }]
}
```

and for paths `opener:allow-open-path` with `"allow": [{ "path": "$APPDATA/file" }]`.
- The guest-js module doc still carries the shell plugin's legacy `open: true` regex text; it does not apply to plugin-opener, whose scope is configured through capabilities.
- Tauri plugin guest-js binding (Rust core + system WebView). Not Electron's API (`shell.openExternal`); see the electron skill for Electron.
- `revealItemInDir` is unsupported on Android and iOS.
- Source: `plugins-workspace@opener-v2.7.2` `plugins/opener/guest-js/index.ts`

## Related

- [Opener plugin](../plugins-core/opener.md)
- [Shell plugin JS API](./shell.md)
