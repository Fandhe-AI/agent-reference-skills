---
source: https://www.typescriptlang.org/docs/handbook/compiler-options.html
---

# tsc CLI Options

A high-level overview of the CLI compiler options for `tsc`. Running `tsc` locally compiles the closest project defined by a `tsconfig.json`, or you can compile a set of TypeScript files by passing in a glob of files. When input files are specified on the command line, `tsconfig.json` files are ignored.

## Signature / Usage

```sh
# Run a compile based on a backwards look through the fs for a tsconfig.json
tsc

# Emit JS for just the index.ts with the compiler defaults
tsc index.ts

# Emit JS for any .ts files in the folder src, with the default settings
tsc src/*.ts

# Emit files referenced in with the compiler settings from tsconfig.production.json
tsc --project tsconfig.production.json

# Emit d.ts files for a js file with showing compiler options which are booleans
tsc index.js --declaration --emitDeclarationOnly

# Emit a single .js file from two files via compiler options which take string arguments
tsc app.ts util.ts --target esnext --outfile index.js
```

## Options / Props

| CLI command flag | Type | Description |
|------|------|-------------|
| `--all` | boolean | Show all compiler options. |
| `--help` | boolean | Gives local information for help on the CLI. |
| `--ignoreConfig` | boolean | Ignore the tsconfig found and build with commandline options and files. |
| `--init` | boolean | Initializes a TypeScript project and creates a tsconfig.json file. |
| `--listFilesOnly` | boolean | Print names of files that are part of the compilation and then stop processing. |
| `--locale` | string | Set the language of the messaging from TypeScript. This does not affect emit. |
| `--project` | string | Compile the project given the path to its configuration file, or to a folder with a 'tsconfig.json'. |
| `--showConfig` | boolean | Print the final configuration instead of building. |
| `--version` | boolean | Print the compiler's version. |

| Build option flag | Type | Description |
|------|------|-------------|
| `--build` | boolean | Build one or more projects and their dependencies, if out of date. |
| `--clean` | boolean | Delete the outputs of all projects. |
| `--dry` | boolean | Show what would be built (or deleted, if specified with '--clean'). |
| `--force` | boolean | Build all projects, including those that appear to be up to date. |
| `--verbose` | boolean | Enable verbose logging. |
| `--stopBuildOnErrors` | boolean | Skip building downstream projects on error in upstream project. |

| Watch option flag | Type | Description |
|------|------|-------------|
| `--watch` | boolean | Watch input files. |
| `--watchFile` | `fixedpollinginterval`, `prioritypollinginterval`, `dynamicprioritypolling`, `fixedchunksizepolling`, `usefsevents`, `usefseventsonparentdirectory` | Specify how the TypeScript watch mode works. |
| `--watchDirectory` | `usefsevents`, `fixedpollinginterval`, `dynamicprioritypolling`, `fixedchunksizepolling` | Specify how directories are watched on systems that lack recursive file-watching functionality. |
| `--fallbackPolling` | `fixedinterval`, `priorityinterval`, `dynamicpriority`, `fixedchunksize` | Specify what approach the watcher should use if the system runs out of native file watchers. |
| `--synchronousWatchDirectory` | boolean | Synchronously call callbacks and update the state of directory watchers on platforms that don't support recursive watching natively. |
| `--excludeDirectories` | list | Remove a list of directories from the watch process. |
| `--excludeFiles` | list | Remove a list of files from the watch mode's processing. |

7.0 parallelism flags (not listed on the 6.0-built documentation page; from the 7.0 announcement blog):

| Flag | Type | Description |
|------|------|-------------|
| `--checkers` | number | Experimental. Number of type-checking workers; default 4. `--checkers 1` makes type-checking effectively single-threaded. |
| `--builders` | number | Experimental. Number of parallel project reference builders when running under `--build`. |
| `--singleThreaded` | boolean | Disable parallelization entirely: caps type-checking workers to 1 and does parsing and emitting in a single thread. |

The page also contains a "Compiler Flags" table that repeats every tsconfig compiler option as a CLI flag (name, type, default, one-line description). Those options are documented in the tsconfig reference category pages; their Default / Allowed values come from the compiler.

## Notes

- `--locale` cannot be set via `tsconfig.json`, only via the host environment or the CLI flag, e.g. `tsc --locale ru`. Locales supported as of TypeScript 3.7 (as listed in the source): `pr-BR` (Brazilian Portuguese), `zh-TW` (listed as Chinese (Simplified)), `zh-CN` (listed as Chinese (Traditional)), `cs-CZ`, `en-US`, `fr-FR`, `de-DE`, `it-IT`, `ja-JP`, `ko-KR`, `pl-PL`, `ru-RU`, `es-ES`, `tr-TR`. The Chinese rows and `pr-BR` are reproduced as written in the source and look inconsistent; verify before relying on them.
- `--verbose`, `--force`, `--clean`, `--stopBuildOnErrors` and `--locale` are CLI-only: their option docs exist but they are not rendered on the tsconfig reference page.
- Changed (7.0): command line builds cannot take file paths when the current directory contains a `tsconfig.json` file unless passed an explicit `--ignoreConfig` flag (7.0 announcement blog).
- Changed (7.0): `stableTypeOrdering` is `true` by default and cannot be turned off; it was introduced in 6.0 (the CLI table here lists `--stableTypeOrdering`: "Ensure types are ordered stably and deterministically across compilations").
- Changed (7.0): `--checkers` / `--builders` default `--checkers 4`; `--checkers` and `--builders` multiply (e.g. 4 x 4 = up to 16 type-checkers). Varying `--checkers` may rarely surface order-dependent results, so fixing a value across environments helps reproducibility.
- Deprecated (6.0) / Removed (7.0): CLI flags for `--target es5`, `--downlevelIteration`, `--moduleResolution node10` / `classic`, `--module amd|umd|systemjs|none`, `--baseUrl`, `--esModuleInterop false`, `--allowSyntheticDefaultImports false`, `--alwaysStrict false` appear in the Compiler Flags table but are errors in 7.0 (blog list). `--outFile` is described by the 6.0 release notes as removed from 6.0 (and the example above using `--outfile` is from the 6.0-built page).
- 7.0 type-checking and command-line behavior is intended to match TypeScript 6.0 (blog); `typescript-go` README lists "Commandline and tsconfig.json parsing" as done, "though tsconfig errors may not be as helpful".

## Related

- [tsconfig-json.md](./tsconfig-json.md)
- [project-references.md](./project-references.md)
- [configuring-watch.md](./configuring-watch.md)
- [compiler-options-in-msbuild.md](./compiler-options-in-msbuild.md)
