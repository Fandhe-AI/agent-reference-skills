# Coordinating Runtime Dependencies for Development

## Signature / Usage

A guide for controlling startup order between dependent development services. A typical example is a frontend app's dev server waiting for an API service to finish starting. This is a local-development pattern; for CI and production, it's recommended to use the orchestration features of your CI provider or deployment platform instead.

Combining three features:

- `with` — start a required service alongside the dependent task
- `dependsOn` — wait for a readiness probe to succeed
- `persistent` — mark a task as a long-running service

Readiness probe script:

```js title="./apps/api/scripts/wait-for-ready.mjs"
const healthUrl = "http://localhost:3001/health";
const deadline = Date.now() + 60_000;

while (Date.now() < deadline) {
  try {
    const response = await fetch(healthUrl, {
      signal: AbortSignal.timeout(1_000),
    });

    if (response.ok) {
      console.log(`API is ready at ${healthUrl}`);
      process.exit(0);
    }
  } catch {
    // The service may still be starting. Try again until the deadline.
  }

  await new Promise((resolve) => setTimeout(resolve, 500));
}

console.error(`API did not become ready at ${healthUrl} within 60 seconds`);
process.exit(1);
```

Package configuration:

```json title="./apps/api/package.json"
{
  "name": "api",
  "scripts": {
    "dev": "node ./server.mjs",
    "dev:ready": "node ./scripts/wait-for-ready.mjs"
  }
}
```

```json title="./apps/web/package.json"
{
  "name": "web",
  "scripts": {
    "dev": "start-web"
  }
}
```

`turbo.json` configuration: register `dev` as uncached and persistent at the root, and register the `dev:ready` readiness-probe task as uncached.

```json title="./turbo.json"
{
  "$schema": "https://turborepo.dev/schema.json",
  "tasks": {
    "dev": {
      "cache": false,
      "persistent": true
    },
    "dev:ready": {
      "cache": false
    }
  }
}
```

In the `web` package, specify `with` and `dependsOn` to link the required service and its readiness probe.

```json title="./apps/web/turbo.json"
{
  "extends": ["//"],
  "tasks": {
    "dev": {
      "with": ["api#dev"],
      "dependsOn": ["api#dev:ready"]
    }
  }
}
```

Run:

```bash
turbo run dev --filter=web
```

When `web#dev` is selected, Turborepo adds the persistent `api#dev` task to the run via `with`, then starts `api#dev` along with the non-persistent readiness probe `api#dev:ready`.

## Notes

- Handling a persistent task and a readiness probe together requires a concurrency of at least 3.
- This pattern is for local development only. Use your CI provider's or deployment platform's orchestration and readiness features for CI and production.
