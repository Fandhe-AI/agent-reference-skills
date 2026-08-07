# Add to Existing Repository

## Signature / Usage

```bash
# Step 1: Install Turborepo
pnpm add turbo --global
pnpm add turbo --save-dev --workspace-root
```

```json
// Step 2: Create turbo.json
{
  "$schema": "https://turborepo.dev/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**"]
    },
    "check-types": {
      "dependsOn": ["^check-types"]
    },
    "dev": {
      "persistent": true,
      "cache": false
    }
  }
}
```

```
# Step 3: Add to .gitignore
.turbo
```

```json
// Step 4: Add packageManager field
{
  "packageManager": "pnpm@10.0.0"
}
```

```yaml
# Step 5: Configure workspace structure (monorepo only)
# pnpm-workspace.yaml
packages:
  - "apps/*"
  - "packages/*"
```

```bash
# Step 6: Run tasks
turbo build check-types
```

## Options / Props

| Repository Type | Description |
| --- | --- |
| Single-Package Workspace | A single package created with e.g. `create-next-app`. No extra setup required |
| Multi-Package Workspace (monorepo) | Multiple packages managed via the package manager's workspace feature |

## Notes

- Expected output on re-run, showing the cache hit:

```
Cached: 2 cached, 2 total
Time: 185ms >>> FULL TURBO
```

## Related

- [Installation](./installation.md)
- [Editor Integration](./editor-integration.md)
