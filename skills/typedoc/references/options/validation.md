# Options: Validation

TypeDoc options controlling documentation validation and required-documentation checks.

## Usage

```json
{
  "validation": {
    "notExported": true,
    "invalidLink": true,
    "invalidPath": true,
    "rewrittenLink": true,
    "notDocumented": false,
    "unusedMergeModuleWith": true
  },
  "treatWarningsAsErrors": true
}
```

## Options / Props

| Option | Type | Default | CLI | Description |
| --- | --- | --- | --- | --- |
| `validation` | `object` | `{ "notExported": true, "invalidLink": true, "invalidPath": true, "rewrittenLink": true, "notDocumented": false, "unusedMergeModuleWith": true }` | `--validation.invalidLink`, `--validation`, etc. | Specifies which validation steps TypeDoc should run against generated documentation. |
| `treatWarningsAsErrors` | `boolean` | `false` | `--treatWarningsAsErrors` | Makes TypeDoc treat all reported warnings as fatal errors that can prevent documentation generation. |
| `treatValidationWarningsAsErrors` | `boolean` | `false` | `--treatValidationWarningsAsErrors` | A narrower version of `treatWarningsAsErrors` that applies only to warnings raised during project validation. |
| `intentionallyNotExported` | `string[]` | none | — | Lists symbols intentionally excluded from output that should not generate warnings. Also supports a path-qualified form. |
| `requiredToBeDocumented` | `string[]` | `["Enum", "EnumMember", "Variable", "Function", "Class", "Interface", "Property", "Method", "Accessor", "TypeAlias"]` | — | Sets which reflection types must be documented. Used by `validation.notDocumented`. |
| `packagesRequiringDocumentation` | `string[]` | package name from `package.json` | — | Specifies which packages require documentation. |
| `intentionallyNotDocumented` | `string[]` | none | — | Selectively ignores undocumented fields. Used by `validation.notDocumented`. Supports dot-separated fully qualified names. |

## Notes

- `validation` sub-options: `notExported` (warns when a referenced type is not exported), `invalidLink` (warns on unresolvable `@link` tags), `invalidPath` (warns on relative path links that don't resolve to a file), `rewrittenLink` (warns when a `@link` tag resolves but its target lacks a unique URL), `notDocumented` (warns on reflections without a doc comment), `unusedMergeModuleWith` (warns on unresolved `@mergeModuleWith` tags).

## Related

- [Options: Configuration](./configuration.md)
- [Options: Input](./input.md)
- [Options: Output](./output.md)
- [Options: Comments](./comments.md)
- [Options: Organization](./organization.md)
- [Options: Other](./other.md)
