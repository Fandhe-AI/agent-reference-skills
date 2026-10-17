---
source: https://vite.dev/guide/build#rebuild-on-files-changes
---

# Rebuild on Files Changes

Enable the Rolldown watcher with `vite build --watch`, or adjust the underlying `WatcherOptions` via `build.watch`.

## Signature / Usage

```bash
vite build --watch
```

```js
// vite.config.js
export default defineConfig({
  build: {
    watch: {
      // https://rolldown.rs/reference/InputOptions.watch
    },
  },
})
```

## Notes

- With `--watch`, changes to files to be bundled trigger a rebuild.
- Changes to the config and its dependencies require restarting the build command.
- `WatcherOptions` reference: https://rolldown.rs/reference/InputOptions.watch

## Related

- [Customizing the Build](./customizing-build.md)
