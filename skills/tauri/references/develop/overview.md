---
source: https://v2.tauri.app/develop/
---

# Develop

Topics pertaining to the development of Tauri applications: running the dev server, desktop and mobile development, source watching, browser DevTools and source control.

## Signature / Usage

Point Tauri at a dev server via `devUrl` and `beforeDevCommand`:

`tauri.conf.json`

```json
{
  "build": {
    "devUrl": "http://localhost:3000",
    "beforeDevCommand": "npm run dev"
  }
}
```

Without a UI framework or bundler, point Tauri at the frontend sources and the CLI starts a dev server (the `src` folder must include an `index.html` and any other assets):

`tauri.conf.json`

```json
{
  "build": {
    "frontendDist": "./src"
  }
}
```

Desktop development:

```sh
npm run tauri dev
cargo tauri dev
```

Mobile development:

```sh
npm run tauri [android|ios] dev
cargo tauri [android|ios] dev
```

### Desktop

- The first `tauri dev` run may need several minutes for Cargo to download and build packages; later builds only rebuild your code.
- Open the Web Inspector with a right-click on the webview and "Inspect", or `Ctrl + Shift + I` (Windows / Linux) / `Cmd + Option + I` (macOS).
- `tauri dev` watches `src-tauri` and its dependent workspace crates and rebuilds / restarts the app on change. Disable with `--no-watch`.
- Ignore files with `.taurignore` (same syntax as `.gitignore`), usually in `src-tauri` or the Cargo workspace root. `tauri dev` looks for `.taurignore` files anywhere inside the common ancestor of the watched folders and the Cargo workspace root.

`.taurignore`

```txt
build/
src/generated/*.rs
deny.toml
```

### Mobile

- On a physical iOS device the dev server must listen on the address given by the `TAURI_DEV_HOST` environment variable: either a public network address (default) or the iOS device TUN address (more secure, needs Xcode to connect).
- To use the device TUN address, open Xcode first, make sure the device is connected via network in Window > Devices and Simulators, then run `tauri ios dev --force-ip-prompt` and select the IPv6 address ending with `::2`.
- Example Vite configuration using `TAURI_DEV_HOST`:

```js
import { defineConfig } from 'vite';

const host = process.env.TAURI_DEV_HOST;

// https://vitejs.dev/config/
export default defineConfig({
  clearScreen: false,
  server: {
    host: host || false,
    port: 1420,
    strictPort: true,
    hmr: host
      ? {
          protocol: 'ws',
          host,
          port: 1421,
        }
      : undefined,
  },
});
```

- Projects created with create-tauri-app configure the dev server for mobile dev out of the box.
- Device selection: by default the command runs on a connected device and falls back to prompting for a simulator. Pass a name to choose upfront: `npm run tauri ios dev 'iPhone 15'`.
- Use Xcode or Android Studio with `--open`: `npm run tauri [android|ios] dev --open`. For a physical iOS device also pass `--host`: `npm run tauri [android|ios] dev --open --host`. The Tauri CLI process must keep running (cannot be killed) while the IDE is used.

#### Web Inspector on mobile

- iOS: use Safari. Enable Safari > Settings > Advanced > "Show features for web developers"; on a physical device also enable Web Inspector in Settings > Safari > Advanced. Then pick the device or simulator from Safari's Develop menu and click `localhost`.
- Android: enabled by default for emulators. For physical devices enable Developer Options (tap Build Number 7 times in Settings > About) and turn on USB Debugging. Open `chrome://inspect` in Chrome and click inspect on the matching device entry.

#### Troubleshooting

1. Error running build script on Xcode: Tauri adds an Xcode build phase that runs the Tauri CLI to compile the Rust sources as a library. It runs in the Xcode process context and may not see shell modifications such as PATH additions, so Node.js version managers may be incompatible.
2. Network permission prompt on first iOS run: the dev server must be exposed on the local network for the device to reach it. Click Allow and restart the application.

## Notes

- Every framework has its own development tooling; framework-specific values are outside the scope of this page.
- The built-in Tauri development server (plain / vanilla `frontendDist` dev server) does not support mutual authentication or encryption. Never use it on untrusted networks (see the development server security considerations in the security lifecycle page).
- Tauri APIs only work inside the app window, so the frontend cannot be opened in the system browser once Tauri APIs are used. To use browser DevTools, configure tauri-invoke-http (https://github.com/tauri-apps/tauri-invoke-http) to bridge Tauri API calls through an HTTP server.
- Source control: commit `src-tauri/Cargo.lock` with `src-tauri/Cargo.toml` (deterministic builds). Do not commit `src-tauri/target`.

## Related

- [Configuration Files](./configuration-files.md)
- [Environment Variables](./environment-variables.md)
- [Debug](./debug-overview.md)
