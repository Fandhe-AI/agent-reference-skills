---
source: https://www.typescriptlang.org/tsconfig/#watch-options
---

# Watch and Build Modes + watchOptions

The `assumeChangesOnlyAffectDirectDependencies` compiler option (Watch and Build Modes category) plus the six `watchOptions` keys that configure how `tsc --watch` watches files and directories.

## Signature / Usage

```json
{
  "compilerOptions": {
    "assumeChangesOnlyAffectDirectDependencies": true
  },
  "watchOptions": {
    "watchFile": "useFsEvents",
    "watchDirectory": "useFsEvents",
    "fallbackPolling": "dynamicPriority",
    "synchronousWatchDirectory": true,
    "excludeDirectories": ["**/node_modules", "_build", "temp/*"],
    "excludeFiles": ["temp/file.ts"]
  }
}
```

## Options / Props

| Option (in `compilerOptions`) | Default | Allowed | Description |
| --- | --- | --- | --- |
| `assumeChangesOnlyAffectDirectDependencies` | — | — | Have recompiles in projects that use `incremental` and `watch` mode assume that changes within a file will only affect files directly depending on it. |

| Option (top-level `watchOptions` key) | Default | Allowed | Description |
| --- | --- | --- | --- |
| `watchFile` | `useFsEvents` (per the option text) | `fixedpollinginterval`, `prioritypollinginterval`, `dynamicprioritypolling`, `fixedchunksizepolling`, `usefsevents`, `usefseventsonparentdirectory` | Specify how the TypeScript watch mode works. |
| `watchDirectory` | `useFsEvents` (per the option text) | `usefsevents`, `fixedpollinginterval`, `dynamicprioritypolling`, `fixedchunksizepolling` | Specify how directories are watched on systems that lack recursive file-watching functionality. |
| `fallbackPolling` | — | `fixedinterval`, `priorityinterval`, `dynamicpriority`, `fixedchunksize` | Specify what approach the watcher should use if the system runs out of native file watchers. |
| `synchronousWatchDirectory` | — | — | Synchronously call callbacks and update the state of directory watchers on platforms that don't support recursive watching natively. |
| `excludeDirectories` | — | — | Remove a list of directories from the watch process. |
| `excludeFiles` | — | — | Remove a list of files from the watch mode's processing. |

## Notes

- The Default column is copied from the rendered `/tsconfig/` page; "—" means the page shows no default. The `useFsEvents` default for `watchFile` / `watchDirectory` is stated in the option description text; the Allowed values are copied as rendered (lowercase).
- The Watch Options section is mainly for cases where `fs.watch` and `fs.watchFile` have additional constraints, like on Linux; see the Configuring Watch handbook page.
- `assumeChangesOnlyAffectDirectDependencies`: only files that changed and files that directly import them are rechecked/rebuilt. A "fast & loose" watching algorithm that can drastically reduce incremental rebuild times at the expense of having to run the full build occasionally to get all compiler error messages.
- `watchFile` strategies: `fixedPollingInterval` (check every file several times a second), `priorityPollingInterval` (heuristics check some file types less frequently), `dynamicPriorityPolling` (less-frequently modified files checked less often), `useFsEvents` (the default; native OS/file system events), `useFsEventsOnParentDirectory` (native events on a file's parent directory).
- `watchDirectory` strategies: `fixedPollingInterval`, `dynamicPriorityPolling`, `useFsEvents` (the default). Applies to systems without recursive file-watching.
- `fallbackPolling`: used with file system events when the system runs out of native file watchers or does not support them. Valid values are `fixedInterval`, `priorityInterval`, `dynamicPriority`, `fixedChunkSize` (as in the Allowed column).
- The official `fallbackPolling` option text also lists `fixedPollingInterval`, `priorityPollingInterval`, `dynamicPriorityPolling` and `synchronousWatchDirectory`, but these are not `fallbackPolling` values: the first three are `watchFile` values, and `synchronousWatchDirectory` is a separate boolean option.
- `synchronousWatchDirectory`: disables deferred watching on directories. Deferred watching helps when many changes occur at once, e.g. `npm install` changing `node_modules`.
- `excludeDirectories` / `excludeFiles` reduce the number of watched files, which can reduce the number of open files TypeScript tracks on Linux.
- Changed (7.0): the TypeScript 7.0 announcement describes a new `--watch` implementation; see the project-config references and the TypeScript 7.0 version notes. The `watchOptions` keys above are as documented for 6.0 and are not re-verified against 7.0.

## Related

- [projects](./projects.md)
- [compiler-diagnostics](./compiler-diagnostics.md)
- [output-formatting](./output-formatting.md)
