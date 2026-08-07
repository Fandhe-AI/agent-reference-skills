# Editor Integration

IDE autocompletion and validation for `turbo.json` via JSON Schema, ESLint integration, and the Language Server.

## Signature / Usage

```json
// Version-pinned web-based schema (recommended for v2.5.7+)
{
  "$schema": "https://v2-5-7.turborepo.dev/schema.json"
}
```

```json
// Local schema via node_modules (v2.4+)
{
  "$schema": "./node_modules/turbo/schema.json"
}
```

Under a monorepo package, a relative path such as `../../node_modules/turbo/schema.json` may be needed. For versions before 2.5.7, use the unversioned `https://turborepo.dev/schema.json`.

## Notes

- The version-pinned web-based schema is recommended from v2.5.7 onward; it automatically stays in sync with the installed version
- `eslint-config-turbo` validates environment variable usage via ESLint, preventing missing configuration across the monorepo
- The Turborepo Language Server detects invalid glob patterns, references to non-existent tasks, and undefined package dependencies that the JSON Schema alone cannot catch. The official extension is distributed on the VSCode Extension Marketplace and works with any Language Server Protocol-compatible editor

## Related

- [Installation](./installation.md)
- [Add to Existing Repository](./add-to-existing.md)
