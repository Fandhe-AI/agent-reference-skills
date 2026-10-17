---
source: https://www.typescriptlang.org/tsconfig/#Projects_6255
---

# Projects options

Six options for composite projects, project references and incremental builds (`.tsbuildinfo`).

## Signature / Usage

```json
{
  "compilerOptions": {
    "composite": true,
    "incremental": true,
    "tsBuildInfoFile": "./.tsbuildinfo"
  }
}
```

## Options / Props

| Option | Default | Allowed | Description |
| --- | --- | --- | --- |
| `composite` | — | — | Enable constraints that allow a TypeScript project to be used with project references. |
| `disableReferencedProjectLoad` | — | — | Reduce the number of projects loaded automatically by TypeScript. |
| `disableSolutionSearching` | — | — | Opt a project out of multi-project reference checking when editing. |
| `disableSourceOfProjectReferenceRedirect` | — | — | Disable preferring source files instead of declaration files when referencing composite projects. |
| `incremental` | `true` if `composite`; `false` otherwise. | — | Save .tsbuildinfo files to allow for incremental compilation of projects. |
| `tsBuildInfoFile` | `.tsbuildinfo` | — | The file to store `.tsbuildinfo` incremental build information in. |

## Notes

- The Default column is copied from the rendered `/tsconfig/` page; "—" means the page shows no default for that option.
- `composite`: enforces constraints so build tools (including `tsc --build`) can quickly determine whether a project has been built. When on: `rootDir`, if not explicitly set, defaults to the directory containing the `tsconfig.json`; all implementation files must be matched by `include` or listed in `files` (otherwise `tsc` reports which files were not specified); `declaration` defaults to `true`.
- Default changed (6.0): `rootDir` now defaults to `.` (the directory containing `tsconfig.json`) regardless of `composite`, per the 6.0 release notes.
- `disableReferencedProjectLoad`: in multi-project programs TypeScript loads all available projects for editor features such as Find All References; for large projects this flag makes projects load dynamically as files are opened.
- `disableSolutionSearching`: excludes a composite project from multi-project features like find all references or jump to definition; improves responsiveness in large composite projects.
- `disableSourceOfProjectReferenceRedirect`: goes back to the pre-3.7 behavior where `.d.ts` files are the boundaries between modules; since 3.7 the source `.ts` files are the source of truth.
- `incremental`: saves project graph information from the last compilation to `.tsbuildinfo` files next to the compilation output; not used at runtime and safe to delete. Use `tsBuildInfoFile` to control where they go.
- `tsBuildInfoFile` default depends on other settings: with `outFile` it is `<outFile>.tsbuildinfo`; with `rootDir` and `outDir` it is `<outDir>/<relative path to config from rootDir>/<config name>.tsbuildinfo`; with only `outDir` it is `<outDir>/<config name>.tsbuildinfo`; otherwise `<config name>.tsbuildinfo` (the rendered page spells these two as `.tsbuildInfo`; the emitted extension is lowercase `.tsbuildinfo`).
- `outFile` was removed in 6.0 per the 6.0 release notes (listed under a "Deprecated" heading; see the emit page), so the `outFile` branch of the `tsBuildInfoFile` default only applies on older versions.
- The CLI-only build flags `verbose`, `force`, `clean` and `stopBuildOnErrors` are not rendered on the `/tsconfig/` page; see the project-config references instead.

## Related

- [top-level](./top-level.md)
- [emit](./emit.md)
- [watch-options](./watch-options.md)
