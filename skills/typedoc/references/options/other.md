# Options: Other

TypeDoc options for watch mode, CLI info, and diagnostics.

## Usage

```sh
typedoc --watch --logLevel Warn
```

## Options / Props

| Option | Type | Default | CLI | Description |
| --- | --- | --- | --- | --- |
| `watch` | `boolean` | `false` | `--watch` | Uses TypeScript's incremental compiler to watch source files for changes and rebuild documentation on change. Detects changes to source files, project documents, the readme, custom assets, config files, and files imported via `@include`/`@includeCode`. Incompatible with `entryPointStrategy` set to `packages` or `merge`. |
| `preserveWatchOutput` | `boolean` | `false` | `--preserveWatchOutput` | By default `--watch` clears the screen between compilation steps. Passing `--preserveWatchOutput` disables that behavior. |
| `help` | `boolean` | `false` | `--help` | Prints all available options with short descriptions, plus the list of supported highlighting languages. |
| `version` | `boolean` | `false` | `--version` | Prints the TypeDoc version. |
| `showConfig` | `boolean` | `false` | `--showConfig` | Prints TypeDoc's resolved configuration and exits. Useful for debugging which options are set. |
| `logLevel` | `"Verbose" \| "Info" \| "Warn" \| "Error" \| "None"` | `"Info"` | `--logLevel <level>` | Log level printed to the console. |
| `skipErrorChecking` | `boolean` | `false` | `--skipErrorChecking` | Tells TypeDoc not to run type checking before converting the project. May improve generation time, but can crash if the code contains type errors. |

## Notes

- `logLevel` values: `Verbose` (all messages), `Info` (informational messages and above), `Warn` (warnings and above), `Error` (errors only), `None` (no output).

## Related

- [Options: Configuration](./configuration.md)
- [Options: Input](./input.md)
- [Options: Output](./output.md)
- [Options: Comments](./comments.md)
- [Options: Organization](./organization.md)
- [Options: Validation](./validation.md)
