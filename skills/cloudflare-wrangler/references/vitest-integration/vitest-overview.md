---
source: https://developers.cloudflare.com/workers/testing/vitest-integration/
---

# Vitest integration overview

Cloudflare recommends the Workers Vitest integration for unit testing Workers and Pages Functions projects. The `@cloudflare/vitest-plugin` Vite plugin runs Vitest tests inside the Workers runtime.

## Signature / Usage

Snippet taken from https://developers.cloudflare.com/workers/testing/vitest-integration/write-your-first-test/#define-vitest-configuration.

```ts
import { cloudflareTest } from "@cloudflare/vitest-plugin";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [
		cloudflareTest({
			wrangler: { configPath: "./wrangler.jsonc" },
		}),
	],
});
```

## Notes

- The integration supports both unit tests and integration tests.
- Provides direct access to Workers runtime APIs and bindings.
- Implements isolated per-test-file storage.
- Runs tests fully locally using Miniflare.
- Leverages Vitest's hot-module reloading for near instant reruns.
- Supports projects with multiple Workers.
- Vitest itself (test API, config, mocking): see the vitest skill. This package only provides the Workers runtime pool/plugin.
- Relationship of `@cloudflare/vitest-pool-workers` and `@cloudflare/vitest-plugin`: the overview page only says "If you use `@cloudflare/vitest-pool-workers`, refer to Migrate to Vitest plugin". The migration page states "`@cloudflare/vitest-plugin` replaces `@cloudflare/vitest-pool-workers`. The package API and Vitest configuration are unchanged." See [migrate-to-vitest-plugin.md](./migrate-to-vitest-plugin.md).

## Related

- [write-your-first-test.md](./write-your-first-test.md)
- [configuration.md](./configuration.md)
- [test-apis.md](./test-apis.md)
- [testing-overview.md](./testing-overview.md)
