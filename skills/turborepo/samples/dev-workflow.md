# Development Workflow

Run persistent development servers across all packages with watch mode support.

`turbo.json`:

```json
{
  "tasks": {
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
```

With a setup script that runs before dev servers start:

```json
{
  "tasks": {
    "dev": {
      "cache": false,
      "persistent": true,
      "dependsOn": ["//#dev:setup"]
    },
    "//#dev:setup": {
      "outputs": [".codegen/**"]
    }
  }
}
```

Common commands:

```bash
# Start all dev tasks across the monorepo
turbo dev

# Start dev only for the web app and its dependencies
turbo dev --filter=web

# Watch mode — reruns dependent tasks when a package changes
turbo watch dev lint
```

Run two persistent tasks in parallel using `with`:

```json
{
  "tasks": {
    "dev": {
      "with": ["api#dev"],
      "persistent": true,
      "cache": false
    }
  }
}
```

## Notes

- `"cache": false` is required for dev tasks — source changes are continuous and caching would cause stale output
- `"persistent": true` prevents other tasks from incorrectly depending on a long-running process
- `turbo watch` reruns tasks in dependent packages automatically when upstream packages change
- Teardown scripts (e.g. database cleanup) must be triggered manually: `turbo run dev:teardown`
