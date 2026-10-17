---
source: https://v2.tauri.app/reference/javascript/deep-link/
---

# @tauri-apps/plugin-deep-link

Set your Tauri application as the default handler for a URL, or check which URL(s) it was opened with.

## Signature / Usage

```typescript
import { getCurrent, onOpenUrl } from '@tauri-apps/plugin-deep-link';
const urls = await getCurrent();
await onOpenUrl((urls) => { console.log(urls) });
```

```typescript
function getCurrent(): Promise<string[] | null>                       // since 2.0.0
function register(protocol: string): Promise<null>                    // since 2.0.0
function unregister(protocol: string): Promise<null>                  // since 2.0.0
function isRegistered(protocol: string): Promise<boolean>             // since 2.0.0
function onOpenUrl(handler: (urls: string[]) => void): Promise<UnlistenFn>  // since 2.0.0
```

## Options / Props

| Function | Parameter | Description |
| --- | --- | --- |
| register / unregister / isRegistered | `protocol` | The name of the protocol without `://`. E.g. `tauri` to handle `tauri://` links. |
| onOpenUrl | `handler` | Called with the list of URLs the app was requested to open, every time this happens while the app is running. |

## Notes

- `getCurrent`: use on app load to check whether the app was started via a deep link; resolves to `null` if it was not. On Windows / Linux it reads the command line arguments and checks that there is only one value, which must be a URL whose scheme matches a configured value. Check the arguments manually when registering schemes dynamically with `register`; the deep link might also have been provided as a CLI argument, so verify its format.
- `register`: macOS / Android / iOS unsupported.
- `unregister`: Windows requires admin rights if the protocol is registered on the local machine (can happen when registered from the NSIS installer with install mode set to both or per machine). Linux can only unregister a scheme initially registered with `register`, requires `update-desktop-database`, may not work on older distros. macOS / Android / iOS unsupported.
- `isRegistered`: macOS / Android / iOS unsupported.
- `onOpenUrl` is a helper for the `deep-link://new-url` event. On Windows / Linux it is unsupported without the single-instance plugin; the OS spawns a new app instance passing the URL as a CLI argument. Resolves to a function that unregisters the event listener.
- Tauri plugin (Rust core + system WebView). Not Electron's `app.setAsDefaultProtocolClient` / `open-url`; see the electron skill for Electron.
- Source: `tauri-apps/plugins-workspace@deep-link-v2.6.2` `plugins/deep-link/guest-js/index.ts`.

## Related

- deep-linking plugin
- single-instance plugin
