---
source: https://vite.dev/guide/troubleshooting#hmr
---

# Troubleshooting: HMR

Causes when HMR does not work, file changes are not detected, or a full reload happens instead of HMR.

## Signature / Usage

Log the circular dependency path that triggered a full reload:

```bash
vite --debug hmr
```

## Notes

- Vite detects a file change but HMR is not working: a file may be imported with a different case. For example, `src/foo.js` exists and `src/bar.js` contains `import './Foo.js' // should be './foo.js'` (related issue vitejs/vite#964).
- Vite does not detect a file change: when running Vite with WSL2, Vite cannot watch file changes in some conditions. See the `server.watch` option.
- A full reload happens instead of HMR: if HMR is not handled by Vite or a plugin, a full reload happens as it is the only way to refresh the state. If HMR is handled but within a circular dependency, a full reload also happens to recover the execution order; break the loop.

## Related

- [troubleshooting-dev-server.md](./troubleshooting-dev-server.md)
- [../config-dev/server-watch.md](../config-dev/server-watch.md)
- [../features/hot-module-replacement.md](../features/hot-module-replacement.md)
