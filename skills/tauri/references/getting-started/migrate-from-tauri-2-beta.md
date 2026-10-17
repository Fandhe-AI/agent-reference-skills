---
source: https://v2.tauri.app/start/migrate/from-tauri-2-beta/
---

# Upgrade from Tauri 2.0 Beta

Guide for upgrading a Tauri 2.0 beta application to the Tauri 2.0 release candidate: core plugin permission identifiers and the dev server network exposure change.

## Signature / Usage

Automated migration:

```sh
npm install @tauri-apps/cli@latest
npm run tauri migrate
# or
cargo install tauri-cli --version "^2.0.0" --locked
cargo tauri migrate
```

Core plugin permission identifiers now need the `core:` prefix:

```json
"permissions": [
    "core:path:default",
    "core:event:default",
    "core:window:default",
    "core:app:default",
    "core:image:default",
    "core:resources:default",
    "core:menu:default",
    "core:tray:default"
]
```

Or use the new special `core:default` permission set, which contains all default permissions of all core plugins:

```json
"permissions": [
    "core:default"
]
```

Vite configuration, 2.0.0-beta:

```js
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { internalIpV4Sync } from 'internal-ip';

const mobile = !!/android|ios/.exec(process.env.TAURI_ENV_PLATFORM);

export default defineConfig({
  plugins: [svelte()],
  clearScreen: false,
  server: {
    host: mobile ? '0.0.0.0' : false,
    port: 1420,
    strictPort: true,
    hmr: mobile
      ? {
          protocol: 'ws',
          host: internalIpV4Sync(),
          port: 1421,
        }
      : undefined,
  },
});
```

Vite configuration, 2.0.0:

```js
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

const host = process.env.TAURI_DEV_HOST;

export default defineConfig({
  plugins: [svelte()],
  clearScreen: false,
  server: {
    host: host || false,
    port: 1420,
    strictPort: true,
    hmr: host
      ? {
          protocol: 'ws',
          host: host,
          port: 1430,
        }
      : undefined,
  },
});
```

## Notes

- Core plugin identifiers changed in PR #10390: prepend all core permission identifiers in your capabilities with `core:` or switch to `core:default` and remove the old core plugin identifiers.
- The built-in mobile development server (PR #10437, PR #10456) no longer exposes network wide and tunnels traffic from the local machine directly to the device.
- This improvement does not automatically apply on iOS devices (directly or from Xcode); the public network address is the default. Workaround: open Xcode to start a connection between your macOS machine and the connected iOS device, then run `tauri ios dev --force-ip-prompt` and select the iOS device's TUN address (ends with `::2`).
- Instead of checking whether `TAURI_ENV_PLATFORM` matches `android` or `ios`, check the `TAURI_DEV_HOST` environment variable. The `internal-ip` npm package is no longer required.
- The source's permissions array ends with a trailing comma; removed so the snippet is valid JSON.
- Removed the unused `unocss/vite` import from the source's 2.0.0 example; it is unrelated to the migration and fails without unocss installed.
- Tauri capabilities / permissions (ACL) are Tauri's own system, unrelated to Claude Code permissions (anthropic-claude-code-admin) or MCP capabilities (mcp-spec). The Vite config is Tauri-side integration only; Vite itself is covered by the vite skill.

## Related

- [Upgrade from Tauri 1.0](./migrate-from-tauri-1.md)
- [Frontend: Vite](./frontend-vite.md)
