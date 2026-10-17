---
source: https://www.typescriptlang.org/tsconfig/#Output_Formatting_6256
---

# Output Formatting options

Three options that control how compiler messages are printed: error truncation, watch-mode screen clearing and colorized output.

## Signature / Usage

```json
{
  "compilerOptions": {
    "noErrorTruncation": true,
    "preserveWatchOutput": true,
    "pretty": true
  }
}
```

## Options / Props

| Option | Default | Allowed | Description |
| --- | --- | --- | --- |
| `noErrorTruncation` | — | — | Disable truncating types in error messages. |
| `preserveWatchOutput` | — | — | Disable wiping the console in watch mode. |
| `pretty` | `true` | — | Enable color and formatting in TypeScript's output to make compiler errors easier to read. |

## Notes

- The Default column is copied from the rendered `/tsconfig/` page; "—" means the page shows no default for that option.
- `noErrorTruncation`: do not truncate error messages; the default is `false`, so very long types in messages are truncated.
- `preserveWatchOutput`: keeps outdated console output in watch mode instead of clearing the screen on every change.
- `pretty`: stylizes errors and messages with color and context; on by default.
- Changed (7.0): the Go-based compiler is documented to produce the same errors, locations and messages as 6.0 (typescript-go README); the 7.0 announcement describes a new `--watch` implementation, covered in the project-config references.

## Related

- [compiler-diagnostics](./compiler-diagnostics.md)
- [watch-options](./watch-options.md)
