# Options: Configuration

TypeDoc options controlling how TypeDoc is itself configured and extended.

## Usage

```json
{
  "$schema": "https://typedoc.org/schema.json",
  "entryPoints": ["./src/index.ts"],
  "out": "docs"
}
```

## Options / Props

| Option | Type | Default | CLI | Description |
| --- | --- | --- | --- | --- |
| `options` | `string` | auto-detected (`typedoc.json`, `typedoc.jsonc`, `typedoc.config.js`, `typedoc.config.cjs`, `typedoc.config.mjs`, `.config/typedoc.*`, etc.) | `--options <filename>` | Specifies a config file containing entries corresponding to command-line options. The `extends` key can load additional files before importing the current options. |
| `tsconfig` | `string` | searches the current and parent directories (like `tsc`) | `--tsconfig <path>` | Specifies the `tsconfig.json` file to read options from. TypeDoc reads the `"typedocOptions"` key and looks for a `tsdoc.json` in the same directory. |
| `compilerOptions` | `object` | none | — (config file only) | Selectively overrides TypeScript compiler options for documentation generation. Values override those from `tsconfig.json`. |
| `plugin` | `string[]` | none (no plugins loaded) | `--plugin <name>` (repeatable) | Specifies plugins to load. Can reference npm packages or local files. JavaScript config files can also specify a function directly. |

## Notes

- `options` supported file formats: JSON files are parsed as JSONC (trailing commas and comments allowed); including `$schema: "https://typedoc.org/schema.json"` is recommended. JavaScript files export an object with option keys.

## Related

- [Options: Input](./input.md)
- [Options: Output](./output.md)
- [Options: Comments](./comments.md)
- [Options: Organization](./organization.md)
- [Options: Validation](./validation.md)
- [Options: Other](./other.md)
