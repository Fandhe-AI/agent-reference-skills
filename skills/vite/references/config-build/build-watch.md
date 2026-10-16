---
source: https://vite.dev/config/build-options#build-watch
---

# build.watch

Enable the Rolldown watcher for builds.

## Signature / Usage

```js
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    watch: {},
  },
})
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `build.watch` | `WatcherOptions \| null` | `null` | Set to `{}` to enable Rolldown watcher. Mostly used with build-only plugins or integration processes. `WatcherOptions` follows Rolldown's `InputOptions.watch` |

## Notes

- File system watching may not work with Windows Subsystem for Linux (WSL) 2; see `server.watch` for details.
- Migration (v7 → v8): `build.rollupOptions.watch.chokidar` was removed; use `build.rolldownOptions.watch.watcher`.

## Related

- [build-rolldown-options.md](./build-rolldown-options.md)
