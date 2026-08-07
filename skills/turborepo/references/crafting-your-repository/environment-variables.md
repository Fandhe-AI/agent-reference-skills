# Using Environment Variables

## Options

### The four key types

| Key | Scope | Affects hash | Purpose |
| --- | --- | --- | --- |
| `env` | Per task | Yes | Variables that affect the build output |
| `globalEnv` | All tasks | Yes | Variables that affect the whole repository |
| `passThroughEnv` | Per task | No | Variables needed at runtime but that don't affect output |
| `globalPassThroughEnv` | All tasks | No | Variables needed at runtime across the whole repository |

## Usage

### Configuration example

```json
{
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

### Strict Mode vs Loose Mode

- `strict` (default): undeclared environment variables are not passed to the task
- `loose`: all of the process's environment variables are passed to the task

### Framework inference

Next.js's `NEXT_PUBLIC_*`, Vite's `VITE_*`, etc. are automatically included in the hash.

Disable with: `turbo build --framework-inference=false`

### Handling .env files

Turborepo does not automatically load `.env` files. Add them to `inputs` to include them in the hash:

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

## Notes

- Keep `.env` files in the app package, not the root.
- `eslint-config-turbo` detects variables that are missing from the hash.
- Troubleshooting: `turbo build --summarize`.
