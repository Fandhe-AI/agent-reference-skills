# Environment Variables

Declare environment variables so Turborepo includes them in cache hash computation.

```json
{
  "$schema": "https://turborepo.com/schema.json",
  "globalEnv": ["NODE_ENV"],
  "globalPassThroughEnv": ["AWS_ACCESS_KEY_ID"],
  "tasks": {
    "build": {
      "env": ["MY_API_URL", "MY_API_KEY"],
      "passThroughEnv": ["CI"]
    }
  }
}
```

Include `.env` files in the hash so cache invalidates when secrets change:

```json
{
  "globalDependencies": [".env"],
  "tasks": {
    "build": {
      "inputs": ["$TURBO_DEFAULT$", ".env*"]
    }
  }
}
```

Debug which variables are (or are not) affecting the cache:

```bash
turbo build --summarize
```

## Notes

- `env` and `globalEnv`: variable value is hashed — a change triggers a cache miss
- `passThroughEnv` and `globalPassThroughEnv`: variable is available at runtime but does not affect the hash
- In `strict` mode (default), undeclared variables are not passed to tasks at all; use `loose` mode only when migrating
- Framework-specific prefixes (`NEXT_PUBLIC_*`, `VITE_*`, etc.) are inferred automatically and included in the hash
- Place `.env` files inside the app package, not the repo root, for tighter scoping
