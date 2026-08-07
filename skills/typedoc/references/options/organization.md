# Options: Organization

TypeDoc options controlling how reflections are grouped, categorized, and sorted.

## Usage

```json
{
  "categoryOrder": ["Getting Started", "Configuration", "Advanced", "*"],
  "sort": ["static-first", "alphabetical"]
}
```

## Options / Props

| Option | Type | Default | CLI | Description |
| --- | --- | --- | --- | --- |
| `groupReferencesByType` | `boolean` | `false` | `--groupReferencesByType` | Groups re-exports of members already documented under the type the referenced member is grouped in, instead of TypeDoc's default `References` group. |
| `categorizeByGroup` | `boolean` | `false` | `--categorizeByGroup` | Categorizes reflections within groups (e.g. Properties, Methods). Set to `false` to group methods and properties of the same category together. |
| `defaultCategory` | `string` | `"Other"` | `--defaultCategory <name>` | Name of the default category used when only some elements on a page are categorized. |
| `categoryOrder` | `string[]` | none (alphabetical, unknown categories last) | — | Overrides the display order of categories. The string `*` marks the position of categories not in the list. The category `none` (case-insensitive) is reserved and renders without a category heading. |
| `groupOrder` | `string[]` | alphabetical (unknown groups last) | — | Overrides the display order of groups. The string `*` marks the position of groups not in the list. The group `none` is reserved to render without a group heading. |
| `sort` | `string[]` | `["kind", "instance-first", "alphabetical-ignoring-documents"]` | `--sort <strategy>` (repeatable) | Sort order for members. Multiple strategies apply in sequence, with earlier strategies taking precedence. |
| `sortEntryPoints` | `boolean` | `true` | `--sortEntryPoints` | Whether TypeDoc sorts top-level members according to the `sort` option. |
| `kindSortOrder` | `string[]` | `["Reference", "Project", "Module", "Namespace", "Enum", "EnumMember", "Class", "Interface", "TypeAlias", "Constructor", "Property", "Variable", "Function", "Accessor", "Method", "Parameter", "TypeParameter", "TypeLiteral", "CallSignature", "ConstructorSignature", "IndexSignature", "GetSignature", "SetSignature"]` | — | Relative order of reflections when `kind` is used in the `sort` option. |

## Notes

- `sort` available strategies: `source-order`, `alphabetical`, `enum-value-ascending`, `enum-value-descending`, `static-first`, `instance-first`, `visibility`, `required-first`, `kind`, `external-last`, `documents-first`, `documents-last`, `alphabetical-ignoring-documents`.

## Related

- [Options: Configuration](./configuration.md)
- [Options: Input](./input.md)
- [Options: Output](./output.md)
- [Options: Comments](./comments.md)
- [Options: Validation](./validation.md)
- [Options: Other](./other.md)
