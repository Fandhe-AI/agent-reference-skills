# Task Pipeline

Define task execution order and dependency relationships in `turbo.json`.

```json
{
  "$schema": "https://turborepo.com/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "test": {
      "dependsOn": ["build"]
    },
    "lint": {},
    "deploy": {
      "dependsOn": ["^build"],
      "cache": false
    }
  }
}
```

Key `dependsOn` patterns:

| Pattern | Meaning |
| --- | --- |
| `["^build"]` | Run all dependency packages' `build` first (topological) |
| `["build"]` | Run `build` in the same package first |
| `["utils#build"]` | Run `build` only in the `utils` package first |
| `[]` or omitted | No dependencies — runs in parallel with other tasks |

## Notes

- `"^build"` is the most common pattern: ensures all upstream dependencies are built before the current package
- Tasks without `dependsOn` run in parallel automatically
- `"cache": false` is required for side-effectful tasks such as `deploy` or `publish`
- `outputs` must be declared for file artifacts to be cached and restored
