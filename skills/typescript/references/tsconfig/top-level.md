---
source: https://www.typescriptlang.org/tsconfig/#root-fields
---

# Top Level fields (files / extends / include / exclude / references)

Root options of a `tsconfig.json` that control how the TypeScript or JavaScript project is set up: which files are part of the program, which base config is inherited, and which projects are referenced.

## Signature / Usage

```json
{
  "extends": "./configs/base",
  "compilerOptions": {},
  "include": ["src/**/*", "tests/**/*"],
  "exclude": ["node_modules"],
  "files": ["core.ts", "sys.ts"],
  "references": [{ "path": "../core" }]
}
```

## Options / Props

| Option | Default | Allowed | Description |
| --- | --- | --- | --- |
| `files` | `false` (as rendered on the official page) | — | Include a list of files. This does not support glob patterns, as opposed to `include`. |
| `extends` | `false` (as rendered on the official page) | — | Specify one or more path or node module references to base configuration files from which settings are inherited. |
| `include` | `[]` if `files` is specified; `**/*` otherwise. | — | Specify a list of glob patterns that match files to be included in compilation. |
| `exclude` | node_modules bower_components jspm_packages `outDir` | — | Filters results from the `include` option. |
| `references` | `false` (as rendered on the official page) | — | Specify an array of objects that specify paths for projects. Used in project references. |

## Notes

- `files`: specifies an allowlist of files to include in the program. An error occurs if any of the files can't be found. Useful when you only have a small number of files and don't need a glob; otherwise use `include`.
- `extends`: the value is a string containing a path to another configuration file to inherit from; the path may use Node.js style resolution. The base configuration is loaded first, then overridden by the inheriting file. All relative paths are resolved relative to the configuration file they originated in.
- `files`, `include` and `exclude` from the inheriting config file overwrite those from the base config file; circularity between configuration files is not allowed. Currently the only top-level property excluded from inheritance is `references`.
- `include`: filenames or patterns are resolved relative to the directory containing the `tsconfig.json` file. Wildcards: `*` matches zero or more characters (excluding directory separators), `?` matches any one character (excluding directory separators), `**/` matches any directory nested to any level.
- `include`: if the last path segment of a pattern has no file extension or wildcard, it is treated as a directory, and files with supported extensions inside it are included (`.ts`, `.tsx`, and `.d.ts` by default, with `.js` and `.jsx` if `allowJs` is true).
- `exclude`: only changes which files are found by `include`. A file in `exclude` can still become part of the program through an `import`, a `types` inclusion, a `/// <reference` directive, or the `files` list. It does not prevent a file from being included.
- `references`: project references split a program into smaller pieces to improve build and editor interaction times and enforce logical separation between components. See the Project References handbook section.

`extends` example from the official page:

```json
{
  "extends": "./configs/base",
  "files": ["main.ts", "supplemental.ts"]
}
```

## Related

- [projects](./projects.md)
- [type-checking](./type-checking.md)
