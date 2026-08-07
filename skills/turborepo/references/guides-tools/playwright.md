# Playwright

## Usage

Environment variable setup (Strict Mode compatible):

```json
{
  "tasks": {
    "e2e": { "passThroughEnv": ["PLAYWRIGHT_*"] }
  }
}
```

Or globally:

```json
{ "globalPassThroughEnv": ["PLAYWRIGHT_*"] }
```

Task graph design:

```json
{ "tasks": { "e2e": { "dependsOn": ["^build"] } } }
```

To skip upstream builds:

```bash
turbo run e2e --filter=@repo/playwright-myapp --only
```

Shared utility package: use `peerDependencies` to avoid installing Playwright redundantly.

```json
{
  "name": "@repo/playwright-utilities",
  "peerDependencies": { "playwright": "workspace:*" }
}
```
