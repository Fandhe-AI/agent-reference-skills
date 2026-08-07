# Options: Comments

TypeDoc options controlling how doc comments are parsed and rendered.

## Usage

```json
{
  "commentStyle": "jsdoc",
  "blockTags": ["@example", "@remarks", "@param", "@returns", "@throws", "@see", "@customTag"],
  "externalSymbolLinkMappings": {
    "global": {
      "Promise": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise"
    }
  }
}
```

## Options / Props

| Option | Type | Default | CLI | Description |
| --- | --- | --- | --- | --- |
| `commentStyle` | `"jsdoc" \| "block" \| "line" \| "all"` | `"jsdoc"` | `--commentStyle <style>` | Comment syntax TypeDoc parses. |
| `useTsLinkResolution` | `boolean` | `true` | `--useTsLinkResolution` | Whether `{@link}` tags are resolved using TypeScript's resolution rules. |
| `preserveLinkText` | `boolean` | `true` | `--preserveLinkText` | Whether `{@link}` tags render the full original link text or only the target reflection name. |
| `jsDocCompatibility` | `object` | `{ "exampleTag": true, "defaultTag": true, "inheritDocTag": true, "ignoreUnescapedBraces": true }` | `--jsDocCompatibility` / `--jsDocCompatibility.<property>` | Handles conflicts between JSDoc and the TSDoc standard. |
| `suppressCommentWarningsInDeclarationFiles` | `boolean` | `false` | `--suppressCommentWarningsInDeclarationFiles` | Suppresses warnings about unrecognized tags inside `.d.ts` files. |
| `blockTags` | `string[]` | TypeDoc's standard block tags | — | Valid block tags. Custom tags can be added by extending `OptionDefaults.blockTags`; also configurable via `tsdoc.json`. |
| `inlineTags` | `string[]` | TypeDoc's standard inline tags | — | Valid inline tags. Custom tags can be added by extending `OptionDefaults.inlineTags`; also configurable via `tsdoc.json`. |
| `modifierTags` | `string[]` | TypeDoc's standard modifier tags | — | Valid modifier tags. Custom tags can be added by extending `OptionDefaults.modifierTags`; also configurable via `tsdoc.json`. |
| `cascadedModifierTags` | `string[]` | none | — | Modifier tags that should cascade to all child reflections. |
| `excludeTags` | `string[]` | none | `--excludeTags` | Tags to strip during comment parsing. Useful for projects that use apiDoc for REST API documentation. |
| `notRenderedTags` | `string[]` | none | `--notRenderedTags` | Tags kept on the comment but excluded from rendered output. Intended for tags with rendering instructions or meaning for post-deserialization processing in packages mode. |
| `preservedTypeAnnotationTags` | `string[]` | none | — | Block tags whose type annotation should be preserved so its content appears in the rendered documentation. |
| `externalSymbolLinkMappings` | `object` (package name to export-name-URL mapping) | none | — | Maps external types to documentation URLs. |

## Notes

- `jsDocCompatibility` sub-keys: `exampleTag` (code block inference for `@example`), `defaultTag` (code block inference for `@default`), `inheritDocTag` (case handling for `@inheritDoc`), `ignoreUnescapedBraces` (brace-escaping warnings).
- `commentStyle` values: `jsdoc` (block comments starting with `/**`), `block` (all block comments), `line` (`//` comments), `all` (both block and line). Non-JSDoc comments can degrade VSCode IntelliSense quality.
- `externalSymbolLinkMappings` supports `.`-separated namespaced names, both `@types` packages and the original module, a special `global` package for global types, and `"#"` to mark a type as resolved without creating a link. Example:
  ```json
  {
    "externalSymbolLinkMappings": {
      "typescript": {
        "CompilerOptions": "https://www.typescriptlang.org/tsconfig"
      }
    }
  }
  ```

## Related

- [Options: Configuration](./configuration.md)
- [Options: Input](./input.md)
- [Options: Output](./output.md)
- [Options: Organization](./organization.md)
- [Options: Validation](./validation.md)
- [Options: Other](./other.md)
