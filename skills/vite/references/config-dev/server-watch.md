---
source: https://vite.dev/config/server-options#server-watch
---

# server.watch

File system watcher options passed on to chokidar.

## Signature / Usage

```js
export default defineConfig({
  server: {
    watch: { usePolling: true },
  },
})
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `server.watch` | `object \| null` | Options passed to chokidar. `null` disables watching: `server.watcher` provides a compatible event emitter, but `add` / `unwatch` have no effect |

## Notes

- When bundled-dev mode is enabled, Rolldown watch options (e.g. `usePolling`, `pollInterval`, `useDebounce`, `debounceDuration`, `include`, `exclude`) are also accepted. The chokidar-only options are still used by the chokidar watcher, which keeps watching files outside the module graph, such as config file dependencies and env files.
- The watcher watches `root` and skips `.git/`, `node_modules/`, `test-results/`, and Vite's `cacheDir` and `build.outDir` by default. On a watched file update, Vite applies HMR and updates the page only if needed.
- It is currently not possible to watch files and packages in `node_modules` (vitejs/vite issue #8619).
- WSL2: file system watching does not work when a file is edited by Windows applications (non-WSL2 process), due to a WSL2 limitation; this also applies to Docker with a WSL2 backend. Recommended: edit files with WSL2 applications and move the project outside a Windows filesystem. Alternative: `{ usePolling: true }` (leads to high CPU utilization).

## Related

- [server-warmup.md](./server-warmup.md)
- [server-fs.md](./server-fs.md)
