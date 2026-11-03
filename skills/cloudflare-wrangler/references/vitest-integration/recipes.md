---
source: https://developers.cloudflare.com/workers/testing/vitest-integration/recipes/
---

# Recipes and examples

Example projects demonstrating unit and integration tests for Workers using the `@cloudflare/vitest-plugin` package.

## Signature / Usage

Snippet taken from https://developers.cloudflare.com/workers/testing/vitest-integration/write-your-first-test/#integration-tests.

```ts
import { exports } from "cloudflare:workers";
import { describe, it, expect } from "vitest";

describe("Hello World worker", () => {
	it("responds with not found and proper status for /404", async () => {
		const response = await exports.default.fetch("http://example.com/404");
		expect(response.status).toBe(404);
		expect(await response.text()).toBe("Not found");
	});
});
```

## Options / Props

All under https://github.com/cloudflare/workers-sdk/tree/main/fixtures/vitest-plugin-examples/ (directory name in parentheses):

| Recipe | Directory |
|--------|-----------|
| Basic unit and integration tests for Workers using `exports.default` | `basics-unit-integration-self` |
| Basic unit and integration tests for Pages Functions using `exports.default` | `pages-functions-unit-integration-self` |
| Basic integration tests using an auxiliary Worker | `basics-integration-auxiliary` |
| Tests using KV, R2 and the Cache API | `kv-r2-caches` |
| Tests using D1 with migrations | `d1` |
| Tests using Durable Objects with direct access | `durable-objects` |
| Tests using Workflows | `workflows` |
| Tests using Queue producers and consumers | `queues` |
| Tests using Pipelines | `pipelines` |
| Tests using Hyperdrive with a Vitest managed TCP server | `hyperdrive` |
| Mock outbound requests with `@msw/cloudflare` | `request-mocking` |
| Tests using multiple auxiliary Workers and request mocks | `multiple-workers` |
| Tests importing WebAssembly modules | `web-assembly` |
| Tests using JSRPC with entrypoints and Durable Objects | `rpc` |
| Tests using `ctx.exports` to access Worker exports | `context-exports` |
| Resolve modules with Vite dependency pre-bundling | `module-resolution` |
| Mock Workers AI and Vectorize bindings in unit tests | `ai-vectorize` |
| Tests using the Images binding | `images` |
| Tests mocking Workers Assets | `workers-assets` |

## Related

- [write-your-first-test.md](./write-your-first-test.md)
- [test-apis.md](./test-apis.md)
- [known-issues.md](./known-issues.md)
