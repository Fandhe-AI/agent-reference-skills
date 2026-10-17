---
source: https://www.typescriptlang.org/docs/handbook/project-references.html
---

# Project References (tsc --build)

Project references let you structure a TypeScript program into smaller pieces (TypeScript 3.0 and newer) to improve build times, enforce logical separation between components, and organize code. `tsc --build` (`-b`) is a build-orchestrator mode that works with them.

## Signature / Usage

```json
{
    "compilerOptions": {
        // The usual
    },
    "references": [
        { "path": "../src" }
    ]
}
```

The `path` of each reference can point to a directory containing a `tsconfig.json`, or to the config file itself (which may have any name).

```shell
 > tsc -b                            # Use the tsconfig.json in the current directory
 > tsc -b src                        # Use src/tsconfig.json
 > tsc -b foo/prd.tsconfig.json bar  # Use foo/prd.tsconfig.json and bar/tsconfig.json
```

## Options / Props

| `tsc -b` flag | Type | Description |
|------|------|-------------|
| `--verbose` | boolean | Prints out verbose logging to explain what's going on (may be combined with any other flag). Enable verbose logging. |
| `--dry` | boolean | Shows what would be done but doesn't actually build anything. |
| `--clean` | boolean | Deletes the outputs of the specified projects (may be combined with `--dry`). |
| `--force` | boolean | Act as if all projects are out of date. Build all projects, including those that appear to be up to date. |
| `--watch` | boolean | Watch mode (may not be combined with any flag except `--verbose`). |
| `--stopBuildOnErrors` | boolean | Skip building downstream projects on error in upstream project. |

## Notes

- When you reference a project: importing modules from it loads its output declaration file (`.d.ts`); if it produces an `outFile`, that `.d.ts` is visible in this project; build mode builds the referenced project if needed.
- Referenced projects must enable `composite`. This sets `rootDir` (if not explicitly set) to the directory containing the `tsconfig` file, requires all implementation files to be matched by `include` or listed in `files`, and requires `declaration` to be on.
- Enable `declarationMap` to use "Go to Definition" and Rename across project boundaries in supported editors.
- `tsc` does not automatically build dependencies unless invoked with `--build`.
- Before 5.6: `tsc -b` effectively acts as if `noEmitOnError` is enabled for all projects.
- Changed (5.6): `--build` no longer assumes `noEmitOnError`; it continues building downstream projects when upstream projects have errors and generates outputs on a best-effort basis. Use `--stopBuildOnErrors` to stop building downstream projects on error, and `noEmitOnError` to suppress emit itself (TypeScript 5.6 release notes, https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-6.html, "Allow --build with Intermediate Errors"; the release notes text misspells the flag as `--stopOnBuildErrors`).
- If you check in build outputs (`.js`, `.d.ts`, `.d.ts.map`), you may need a `--force` build after certain source control operations, depending on whether timestamps are preserved.
- Build order of files passed on the command line does not matter; `tsc` re-orders so dependencies are built first.
- Solution pattern: a "solution" `tsconfig.json` that only has `references` to leaf projects and sets `files` to an empty array (an empty `files` array is not an error since 3.0 when at least one `reference` exists). Use configuration file inheritance (`extends`) to centralize common options.
- Relative modules: put a `tsconfig.json` in each subdirectory and set `outDir` to an explicit subfolder of the output folder, or set `rootDir` to the common root of all project folders.
- MSBuild: add `<TypeScriptBuildMode>true</TypeScriptBuildMode>` to the proj file to enable build mode; existing TypeScript project properties are not respected, manage settings in tsconfig.
- To disable the in-memory `.d.ts` generation in VS Code for very large composite projects, use `disableSourceOfProjectReferenceRedirect`.
- Changed (7.0): `--builders` controls the number of parallel project reference builders under `--build`; it multiplies with `--checkers` (e.g. `--checkers 4 --builders 4` allows up to 16 type-checkers). Varying builders should not change results. Source: https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/.
- Deprecated (6.0) / Removed (7.0 blog list does not include it): the 6.0 release notes state `outFile` has been removed from TypeScript 6.0; the "Structuring for outFiles" layout in the original page therefore applies only to older versions.
- `typescript-go` README lists "Build mode / project references" as done in 7.0.

## Related

- [compiler-options-cli.md](./compiler-options-cli.md)
- [configuring-watch.md](./configuring-watch.md)
- [tsconfig-json.md](./tsconfig-json.md)
- projects.md
