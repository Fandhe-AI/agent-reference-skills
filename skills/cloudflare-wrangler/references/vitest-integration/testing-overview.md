---
source: https://developers.cloudflare.com/workers/testing/
---

# Testing overview

The Workers platform provides complementary tools for testing different parts of an application. Use the Workers Vitest integration for unit tests and `createTestHarness()` for integration tests.

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

## Options / Props

| Need | Tool | What it provides |
|------|------|------------------|
| Unit tests (individual functions and modules) | Workers Vitest integration | Fast feedback; tests run inside the Workers runtime with direct access to bindings and runtime APIs; direct assertions against KV, R2, D1 or Durable Objects state; direct calls to Durable Objects |
| Integration tests (one or more Workers as a whole) | `createTestHarness()` | Exercises production Worker builds; coverage through configured HTTP routes across Workers; works with any Node.js test runner and tools such as Playwright or MSW |

## Notes

- Miniflare is not a hardened sandbox. Do not use Miniflare to run untrusted or potentially malicious Worker code directly on your machine; run the whole development process inside a secure sandbox such as a virtual machine.
- Miniflare starts a local `workerd` process. The warning applies to default local execution with `wrangler dev`, `vite dev`, `vite preview`, direct Miniflare use, and Miniflare-based testing tools. Setting `remote: true` on a binding changes which resource your code accesses, but Worker code still executes locally. Legacy `wrangler dev --remote` executes Worker code on Cloudflare.
- Miniflare is not a security boundary for untrusted code. The hosted Workers platform applies additional layers of defense in depth (https://developers.cloudflare.com/workers/reference/security-model/) that Miniflare does not provide locally.
- Vitest itself (test API, config, mocking): see the vitest skill. This package only provides the Workers runtime pool/plugin.
- `createTestHarness()` and Miniflare are covered in the miniflare category of this skill.

## Related

- [vitest-overview.md](./vitest-overview.md)
- [write-your-first-test.md](./write-your-first-test.md)
- [README.md](./README.md)
