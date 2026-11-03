---
source: https://developers.cloudflare.com/workers/testing/vitest-integration/test-apis/
---

# Vitest Workflow Introspection

Disable sleeps, mock an event, and await completion of a Workflow instance in a test.

```ts
import { env } from "cloudflare:workers";
import { introspectWorkflowInstance } from "cloudflare:test";

it("should disable all sleeps, mock an event and complete", async () => {
  // 1. CONFIGURATION
  await using instance = await introspectWorkflowInstance(env.MY_WORKFLOW, "123456");
  await instance.modify(async (m) => {
    await m.disableSleeps();
    await m.mockEvent({
      type: "user-approval",
      payload: { approved: true, approverId: "user-123" },
    });
  });

  // 2. EXECUTION
  await env.MY_WORKFLOW.create({ id: "123456" });

  // 3. ASSERTION
  await expect(instance.waitForStatus("complete")).resolves.not.toThrow();
  const output = await instance.getOutput();
  expect(output).toEqual({ success: true });

  // 4. DISPOSE: is implicit and automatic here.
});
```

For a Workflow declared in the Wrangler `exports` field, add a test-only binding:

```ts
import { cloudflareTest } from "@cloudflare/vitest-plugin";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [
		cloudflareTest({
			wrangler: {
				configPath: "./wrangler.jsonc",
			},
			miniflare: {
				// Test-only binding to the Workflow declared in `exports`
				workflows: {
					MY_WORKFLOW: { name: "my-workflow", className: "MyWorkflow" },
				},
			},
		}),
	],
});
```

## Notes

- Introspectors must be disposed (`await using` or `dispose()`), otherwise instance state leaks into later tests.
- Use `introspectWorkflow(env.MY_WORKFLOW)` plus `modifyAll` when instance IDs are unknown.
- Requires `@cloudflare/vitest-plugin` 1.0.0 or later; `exports`-declared Workflows need 1.3.0 or later.
- Docs bug: the page's "apply all modifier functions" example calls `instance.dispose()` inside `catch` rather than `finally`, so it does not dispose on success. Prefer `await using`.
- See [../references/vitest-integration/README.md](../references/vitest-integration/README.md).
