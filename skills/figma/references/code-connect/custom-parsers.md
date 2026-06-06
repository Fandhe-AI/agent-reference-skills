# Custom Parsers

Enable Code Connect support for languages not natively supported by implementing a custom parser. Currently in preview.

## Signature / Usage

```json
{
  "codeConnect": {
    "parser": "custom",
    "parserCommand": "node ../parserDirectory/parser.js",
    "include": ["**/*.figma.test"],
    "exclude": []
  }
}
```

## Options / Props

### `figma.config.json` fields for custom parsers

| Field | Type | Description |
|-------|------|-------------|
| `parser` | `"custom"` | Must be set to `"custom"` to activate |
| `parserCommand` | `string` | Shell command to invoke the parser (receives file paths as arguments) |
| `include` | `string[]` | File glob patterns to pass to the parser |

### Input payloads

**`ParseRequestPayload`** (sent during `publish` / `parse`):

| Field | Description |
|-------|-------------|
| File paths | List of matched files to process |
| Parser config | Configuration object from `figma.config.json` |

**`CreateRequestPayload`** (sent during `create`):

| Field | Description |
|-------|-------------|
| Destination directory | Where to write the generated file |
| Optional filename | Suggested file name |
| Source filepath + export info | Code component location |
| Figma component metadata | Component id, name, type, properties |
| Parser config | Configuration object |

### Output payloads

**`ParseResponsePayload`** (returned via stdout during `publish` / `parse`):

| Field | Required | Description |
|-------|----------|-------------|
| Code Connect documents array | Yes | Documents with template code and template data |
| `props` mapping | Yes | Prop name to prop helper mappings |
| `imports` | Yes | Import statements for the snippet |
| `language` | Yes | Syntax highlighting language identifier |
| Messages (info/warning/error) | No | Feedback messages for the CLI to display |

**`CreateResponsePayload`** (returned via stdout during `create`):

| Field | Description |
|-------|-------------|
| Created file paths | List of files the parser created |
| Parser messages | Info, warning, or error messages |

## Notes

- The API is still evolving — provide feedback via GitHub issues
- The parser command is invoked with file paths from the `include` globs; it must write its `ParseResponsePayload` to stdout
- Uses the Template API for generating Code Connect documents

## Related

- [Template API](./template-api.md)
- [Config File](./config-file.md)
- [CLI Reference](./cli-reference.md)
