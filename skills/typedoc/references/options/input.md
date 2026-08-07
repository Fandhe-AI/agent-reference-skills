# Options: Input

TypeDoc options controlling entry point discovery and source input.

## Usage

```json
{
  "entryPoints": ["src/index.ts", "src/secondary.ts"],
  "entryPointStrategy": "resolve",
  "exclude": ["**/node_modules/**", "**/*.spec.ts"]
}
```

## Options / Props

### Entry points

| Option | Type | Default | CLI | Description |
| --- | --- | --- | --- | --- |
| `entryPoints` | `string[]` (glob patterns) | auto-detected from `package.json`'s `"exports"` or `"main"` field | `--entryPoints <paths>` | Specifies documentation entry point globs. TypeDoc examines exports and builds documentation accordingly. Supports multiple files or patterns (e.g. `src/multiple/*.ts`). The `"typedoc"` conditional export takes priority over `"import"` when present. |
| `entryPointStrategy` | `"resolve" \| "expand" \| "packages" \| "merge"` | `"resolve"` | `--entryPointStrategy <strategy>` | Controls how entry points are processed. |
| `packageOptions` | `object` | none | — | Per-package configuration when using the `"packages"` strategy. Paths are resolved relative to the package directory. Has no effect unless `entryPointStrategy` is `"packages"`. |
| `alwaysCreateEntryPointModule` | `boolean` | `false` (`true` when `projectDocuments` is used) | `--alwaysCreateEntryPointModule` | Forces creation of a module wrapper for a single entry point instead of placing exports directly at the project root. |
| `projectDocuments` | `string[]` (file paths) | none | — | Markdown documents to add to the generated documentation site. |

### Filtering

| Option | Type | Default | CLI | Description |
| --- | --- | --- | --- | --- |
| `exclude` | `string[]` (minimatch patterns) | none | `--exclude <pattern>` (repeatable) | Excludes files from entry point consideration; does not affect compilation. Use TypeScript's `tsconfig.json` `exclude` for full exclusion. Exported members in excluded files are dropped from documentation. |
| `externalPattern` | `string[]` (patterns) | none | `--externalPattern <pattern>` (repeatable) | Defines patterns for files considered external. Use with `excludeExternals` to remove external modules from documentation. |
| `excludeExternals` | `boolean` | `false` | `--excludeExternals` | Prevents TypeScript files resolved as external from being documented. |
| `excludeNotDocumented` | `boolean` | `false` | `--excludeNotDocumented` | Removes symbols without a doc comment, for kinds matching `excludeNotDocumentedKinds`. |
| `excludeNotDocumentedKinds` | `string[]` | `["Module", "Namespace", "Enum", "Variable", "Function", "Class", "Interface", "Constructor", "Property", "Method", "CallSignature", "IndexSignature", "ConstructorSignature", "Accessor", "GetSignature", "SetSignature", "TypeAlias", "Reference"]` | — | Symbol kinds that `excludeNotDocumented` can remove. |
| `excludeInternal` | `boolean` | `true` if the `stripInternal` compiler option is enabled, otherwise `false` | `--excludeInternal` | Removes symbols tagged `@internal`. |
| `excludePrivate` | `boolean` | `true` | `--excludePrivate` | Removes `private` and `#private` class fields from documentation. To include `#private` fields, both this and `excludePrivateClassFields` must be `false`. |
| `excludePrivateClassFields` | `boolean` | `true` | `--excludePrivateClassFields` | Removes `#private` class fields from generated documentation. |
| `excludeProtected` | `boolean` | `false` | `--excludeProtected` | Removes protected class members from documentation. |
| `excludeReferences` | `boolean` | `false` | `--excludeReferences` | Removes re-exports of symbols already documented elsewhere. |
| `excludeCategories` | `string[]` | none | `--excludeCategories <category>` (repeatable) | Removes reflections associated with the given categories. |

### Project metadata & sources

| Option | Type | Default | CLI | Description |
| --- | --- | --- | --- | --- |
| `maxTypeConversionDepth` | `number` | `10` | `--maxTypeConversionDepth <number>` | Maximum recursion depth when converting types. |
| `name` | `string` | package name from `package.json` | `--name <name>` | Sets the project name in the documentation header. |
| `includeVersion` | `boolean` | `false` | `--includeVersion` | Includes the `package.json` version in generated documentation. |
| `disableSources` | `boolean` | `false` | `--disableSources` | Disables capturing declaration locations during conversion. |
| `sourceLinkTemplate` | `string` (URL template) | auto-generated for GitHub, GitLab, BitBucket | `--sourceLinkTemplate <template>` | Link template for source URLs. Supports `{path}`, `{line}`, `{gitRevision}` placeholders. No effect when `disableSources` is set. |
| `gitRevision` | `string` | latest commit | `--gitRevision <revision>` | Revision/branch to use for source links. Accepts the special value `{branch}` for the current branch. No effect when `disableSources` is set. |
| `gitRemote` | `string` | `"origin"` | `--gitRemote <remote>` | Git remote for source file links on GitHub, Bitbucket, or GitLab. No effect when `disableSources` is set. |
| `disableGit` | `boolean` | `false` | `--disableGit` | Prevents TypeDoc from using Git to determine source linkability. When enabled, sources are always linked even outside a Git repository. |
| `readme` | `string` (file path or `"none"`) | auto-detected | `--readme <path\|none>` | Path to the readme file shown on the index page. Set to `"none"` to disable the index page. |
| `basePath` | `string` (directory path) | none | `--basePath <path>` | Directory containing asset files used to resolve relative paths in doc comments and external documents. Also used as the default for `displayBasePath`. |

## Notes

- `entryPointStrategy` values: `resolve` (root tsconfig entry points; directories include `<directory>/index`), `expand` (recursively expands directory contents as entry points; the default before v0.22.0), `packages` (treats directories as separate projects and merges the JSON models; each package can have its own TypeDoc config), `merge` (merges `.json` files from prior TypeDoc runs made with `--json`).

## Related

- [Options: Configuration](./configuration.md)
- [Options: Output](./output.md)
- [Options: Comments](./comments.md)
- [Options: Organization](./organization.md)
- [Options: Validation](./validation.md)
- [Options: Other](./other.md)
