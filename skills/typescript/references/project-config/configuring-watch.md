---
source: https://www.typescriptlang.org/docs/handbook/configuring-watch.html
---

# Configuring Watch

As of TypeScript 3.8, the compiler exposes configuration controlling how it watches files and directories. Before that, configuration required environment variables, which are still available.

## Signature / Usage

The suggested method is the `watchOptions` section of `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "es2020",
    "moduleResolution": "node"
  },

  "watchOptions": {
    // Use native file system events for files and directories
    "watchFile": "useFsEvents",
    "watchDirectory": "useFsEvents",

    // Poll files for updates more frequently when they're updated a lot.
    "fallbackPolling": "dynamicPriority",

    // Don't coalesce watch notification
    "synchronousWatchDirectory": true,

    // Two additional settings for reducing the amount of possible files to track
    "excludeDirectories": ["**/node_modules", "_build"],
    "excludeFiles": ["build/fileWhichChangesOften.ts"]
  }
}
```

## Options / Props

| `TSC_WATCHFILE` value | Description |
|-------|-------------|
| `PriorityPollingInterval` | Use `fs.watchFile`, but use different polling intervals for source files, config files and missing files |
| `DynamicPriorityPolling` | Use a dynamic queue where frequently modified files are polled at shorter intervals, and unchanged files are polled less frequently |
| `UseFsEvents` | Use `fs.watch`. On operating systems that limit the number of active watches, fall back to `fs.watchFile` when a watcher fails to be created. |
| `UseFsEventsWithFallbackDynamicPolling` | Use `fs.watch`. On operating systems that limit the number of active watches, fall back to dynamic polling queues (as explained in `DynamicPriorityPolling`) |
| `UseFsEventsOnParentDirectory` | Use `fs.watch` on the parent directories of included files (lower CPU usage than pure `fs.watchFile` but potentially lower accuracy). |
| default (no value) | If `TSC_NONPOLLING_WATCHER` is set to true, use `UseFsEventsOnParentDirectory`. Otherwise, watch files using `fs.watchFile` with `250ms` as the timeout for any file. |

| `TSC_WATCHDIRECTORY` value | Description |
|-------|-------------|
| `RecursiveDirectoryUsingFsWatchFile` | Use `fs.watchFile` to watch included directories and child directories. |
| `RecursiveDirectoryUsingDynamicPriorityPolling` | Use a dynamic polling queue to poll changes to included directories and child directories. |
| default (no value) | Use `fs.watch` to watch included directories and child directories. |

## Notes

- `TSC_WATCHFILE` and `TSC_WATCHDIRECTORY` are environment variables. `TSC_WATCHDIRECTORY` is for platforms without native recursive directory watching; it is ignored where that is supported.
- The 6.0 compiler's `--watch` relies on Node's `fs.watch` (event-based, OS dependent, may hit per-OS watch limits, lighter on CPU) and `fs.watchFile` (polling, most reliable, costs CPU proportional to the number of watched files). Recursive directory watching is supported on Windows and macOS, but not on Linux.
- Changed (7.0): TypeScript 7 ships a rebuilt `--watch` mode powered by a file-watcher based on the Parcel bundler's `@parcel/watcher`, ported to Go; the Node `fs.watch` / `fs.watchFile` background above describes the pre-7.0 implementation. The `typescript-go` v7.0.2 README lists Watch mode as "prototype" ("Watches files and rebuilds, but no incremental rechecking. Not optimized"), while the 7.0 announcement blog describes a completely rebuilt mode. The page does not state whether `watchOptions` and `TSC_WATCHFILE` / `TSC_WATCHDIRECTORY` are still honored in 7.0; this is unconfirmed. Sources: https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/ and https://github.com/microsoft/typescript-go/blob/typescript/v7.0.2/README.md.
- Full descriptions of each `watchOptions` setting are in the tsconfig reference watch options page.

## Related

- [watch-options.md](../tsconfig/watch-options.md)
- [compiler-options-cli.md](./compiler-options-cli.md)
- [project-references.md](./project-references.md)
