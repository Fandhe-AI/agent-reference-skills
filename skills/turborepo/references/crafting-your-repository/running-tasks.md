# Running Tasks

## Usage

### Three ways to run tasks

1. `package.json` scripts (for frequently-used tasks)
2. Global `turbo` CLI (on demand)
3. Scoping with `--filter`

### package.json scripts

```json
{
  "scripts": {
    "dev": "turbo run dev",
    "build": "turbo run build",
    "test": "turbo run test",
    "lint": "turbo run lint"
  }
}
```

### Running multiple tasks at once

```bash
turbo run build test lint check-types
```

Automatically parallelized.

### Shorthand syntax (v2.2.4+)

```bash
turbo run web#build docs#lint
```

## Options

### Filtering

| Filter | Example |
| --- | --- |
| Package name | `turbo build --filter=@acme/web` |
| Directory | `turbo lint --filter="./packages/utilities/*"` |
| Include dependents | `turbo build --filter=...ui` |
| Include dependencies | `turbo dev --filter=web...` |
| Git diff | `turbo build --filter=[HEAD^1]` |

Multiple filters are combined as an OR (union).

## Notes

- The `turbo` command should only be written in the root `package.json` (writing it in a package's own `package.json` causes recursive execution).
- Task execution order is controlled by the `turbo.json` configuration, not the order of CLI arguments.
