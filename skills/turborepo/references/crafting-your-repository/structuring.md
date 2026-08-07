# Structuring a Repository

## Usage

### Recommended directory layout

```
apps/       # Applications and services
packages/   # Libraries and tooling configuration
turbo.json
package.json
```

### Minimum requirements

1. Package manager workspace definition
2. Lockfile
3. Root `package.json`
4. Root `turbo.json`
5. Each package's `package.json`

### Workspace definition

**pnpm** (`pnpm-workspace.yaml`):
```yaml
packages:
  - "apps/*"
  - "packages/*"
```

**npm / yarn / bun** (root `package.json`):
```json
{
  "workspaces": ["apps/*", "packages/*"]
}
```

### exports field

```json
{
  "exports": {
    ".": "./src/constants.ts",
    "./add": "./src/add.ts",
    "./subtract": "./src/subtract.ts"
  }
}
```

Avoids barrel files and allows conditional exports. IDE autocomplete works correctly.

## Notes

- Nested packages are not supported (`apps/**` is invalid).
- A lockfile is required.
- A namespace prefix is recommended for package names (e.g. `@acme/name`).
- Do not access other packages via relative paths (`../`).
