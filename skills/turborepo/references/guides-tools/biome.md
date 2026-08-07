# Biome

Fast formatter and linter. Recommended to run as a root task.

## Usage

```json
{
  "scripts": {
    "format-and-lint": "biome check .",
    "format-and-lint:fix": "biome check . --write"
  }
}
```

```json
{
  "tasks": {
    "//#format-and-lint": {},
    "//#format-and-lint:fix": { "cache": false }
  }
}
```

## Notes

- Because it runs as a root task, version bumps or config changes invalidate the cache for all tasks.
