# figma.config.json

Project-level configuration file placed at the repository root that controls how Code Connect discovers, parses, and publishes component files.

## Signature / Usage

```json
{
  "codeConnect": {
    "include": ["**/*.figma.ts"],
    "exclude": ["test/**", "build/**"],
    "parser": "react",
    "label": "React",
    "language": "jsx"
  }
}
```

## Options / Props

### Common fields

| Field | Type | Description |
|-------|------|-------------|
| `include` | `string[]` | Glob patterns for Code Connect files to parse |
| `exclude` | `string[]` | Glob patterns to exclude from parsing |
| `parser` | `string` | Override auto-detection: `react`, `html`, `swift`, `compose`, `custom` |
| `label` | `string` | Label shown in Figma Dev Mode for code snippets |
| `language` | `string` | Syntax highlighting language (see supported values below) |
| `interactiveSetupFigmaFileUrl` | `string` | Figma file URL used during interactive setup |
| `documentUrlSubstitutions` | `object` | Key-value substitutions run on Figma node URLs (useful for multiple files) |
| `defaultBranch` | `string` | Default branch name for source code link generation |

Supported `language` values: `jsx`, `tsx`, `typescript`, `javascript`, `swift`, `kotlin`, `html`, `css`, `json`, `graphql`, `python`, `go`, `rust`, `bash`, `sql`, `xml`, `dart`, `cpp`, `ruby`, `plaintext`

### React-specific fields

| Field | Type | Description |
|-------|------|-------------|
| `importPaths` | `object` | Map glob patterns to package import paths (e.g., `"src/components/*": "@ui/components"`) |
| `paths` | `object` | Must mirror TypeScript `tsconfig.json` path aliases for correct import resolution |
| `imports` | `string[]` | Override generated import statements with explicit strings |

### SwiftUI-specific fields

| Field | Type | Description |
|-------|------|-------------|
| `xcodeprojPath` | `string` | Path to the `.xcodeproj` file (defaults to first found) |
| `swiftPackagePath` | `string` | Alternative to `xcodeprojPath` for `Package.swift` projects |
| `sourcePackagesPath` | `string` | Location of the Source Packages directory |
| `importMapping` | `object` | Map glob patterns to module names for correct import resolution |

### Custom parser fields

| Field | Type | Description |
|-------|------|-------------|
| `parserCommand` | `string` | Command to invoke the custom parser (e.g., `node parser.js`) |

## Notes

- Auto-detection checks `package.json` for React/HTML projects and `Package.swift` / `*.xcodeproj` for Swift projects
- `documentUrlSubstitutions` is particularly useful in monorepos or when maintaining multiple Figma files without editing every Code Connect file

## Related

- [CLI Quickstart](./quickstart.md)
- [CLI Reference](./cli-reference.md)
- [Template Files](./template-files.md)
- [Custom Parsers](./custom-parsers.md)
