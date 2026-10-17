---
source: https://www.typescriptlang.org/docs/handbook/project-references.html
---

# tsc Build Mode

Commands for build mode `tsc --build` (`tsc -b`) with project references.

## Build project references

```sh
tsc -b                            # Use the tsconfig.json in the current directory
tsc -b src                        # Use src/tsconfig.json
tsc -b foo/prd.tsconfig.json bar  # Use foo/prd.tsconfig.json and bar/tsconfig.json
```

Finds referenced projects, detects whether they are up to date, and builds out-of-date projects in dependency order. `tsc` reorders the arguments as needed.

## Verbose build

```sh
tsc -b --verbose
```

Prints detailed logging. Can be combined with other flags except `--clean` (rejected with TS6370; see Watch mode).

## Dry run

```sh
tsc -b --dry
```

Shows what would be done without building.

## Force-build all projects

```sh
tsc -b --force
```

Treats all projects as out of date. May be needed after version-control operations when build outputs are committed.

## Delete outputs

> **Warning**: deletes the build outputs of the specified projects. Run it in a disposable environment or when the outputs can be regenerated, and check the targets with `--dry` first.

```sh
tsc -b --clean
tsc -b --clean --dry
```

`--clean` can be combined with `--dry`.

## Watch mode

```sh
tsc -b --watch
tsc -b --watch --preserveWatchOutput
```

The Project References page says `--watch` may not be combined with any flag except `--verbose`; in the compiler, the combinations rejected with TS6370 are `--watch` + `--clean` and `--watch` + `--dry` (and `--clean` with `--force` / `--verbose`). Build-compatible options such as `--preserveWatchOutput` are accepted.

## Skip downstream projects on upstream errors

```sh
tsc -b --stopBuildOnErrors
```

The option description is "Skip building downstream projects on error in upstream project". Usage under `tsc -b` is confirmed only from the official option md; other combinations need verification.
