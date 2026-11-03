---
source: https://developers.cloudflare.com/workers/testing/test-harness/
---

# Integration test harness (createTestHarness)

`createTestHarness()` is a Wrangler API for integration testing from any Node.js test runner. It runs one or more Workers from Wrangler projects or Vite projects using the Cloudflare Vite plugin.

## Signature / Usage

Snippet taken from https://developers.cloudflare.com/workers/testing/test-harness/get-started/#create-a-test-harness.

```ts
import { createTestHarness } from "wrangler";

const server = createTestHarness({
	workers: [{ configPath: "./wrangler.jsonc" }],
});
```

## Notes

- Features: runs production build output from Wrangler or the Cloudflare Vite plugin; dispatches requests and events to one or more Workers; provides access to bindings and local storage; captures logs and diagnostic output from the Workers runtime.
- Complete example: https://github.com/cloudflare/workers-sdk/tree/main/fixtures/create-test-harness-example
- API reference lives in the Wrangler API docs (`createTestHarness`).
- Test runner APIs (describe/it/expect): see the vitest skill.

## Related

- [test-harness-get-started.md](./test-harness-get-started.md)
- [test-harness-configure.md](./test-harness-configure.md)
- [test-harness-prepare-test-state.md](./test-harness-prepare-test-state.md)
- [test-harness-interact-with-workers.md](./test-harness-interact-with-workers.md)
- [test-harness-integrations.md](./test-harness-integrations.md)
- [../commands/api.md](../commands/api.md)
