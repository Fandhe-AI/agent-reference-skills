# Getting Started with Code Connect CLI

Install the CLI, configure your project, write template or framework-specific files, and publish connections to Figma.

## Signature / Usage

```bash
# Install globally
npm install --global @figma/code-connect@latest

# Publish all Code Connect files
npx figma connect publish --token=<PERSONAL_ACCESS_TOKEN>

# Or set token via environment variable
export FIGMA_ACCESS_TOKEN=<token>
npx figma connect publish
```

## Options / Props

### Requirements

| Requirement | Detail |
|-------------|--------|
| Node.js | v18 or newer |
| Personal access token | Code Connect scope: `Write`; File content scope: `Read` |

### Project configuration (`figma.config.json`)

```json
{
  "codeConnect": {
    "include": ["**/*.figma.ts"],
    "label": "React",
    "language": "jsx"
  }
}
```

### TypeScript type definitions (`tsconfig.json`)

```json
{
  "compilerOptions": {
    "types": ["@figma/code-connect/figma-types"]
  }
}
```

## Notes

- Adjust `label` and `language` in `figma.config.json` to match your framework (e.g., `"Swift"` / `"swift"` for SwiftUI)
- Template files use the `.figma.ts` (or `.figma.js`) extension by convention
- Each file requires a metadata comment `// url=https://www.figma.com/...` pointing to the Figma component node

## Related

- [Config File Reference](./config-file.md)
- [CLI Reference](./cli-reference.md)
- [React Integration](./react.md)
- [Template Files](./template-files.md)
