---
source: https://developers.cloudflare.com/workers/testing/vitest-integration/test-apis/
---

# Vitest Scheduled, Queue, and Durable Object Tests

Call `scheduled()` and `queue()` handlers directly and inspect a Durable Object with `runInDurableObject`.

```ts
import { env } from "cloudflare:workers";
import { createScheduledController, createExecutionContext, waitOnExecutionContext } from "cloudflare:test";
import { it, expect } from "vitest";
import worker from "./index.mjs";

it("calls scheduled handler", async () => {
  const ctrl = createScheduledController({
    scheduledTime: new Date(1000),
    cron: "30 * * * *"
  });
  const ctx = createExecutionContext();
  await worker.scheduled(ctrl, env, ctx);
  await waitOnExecutionContext(ctx);
});
```

```ts
import { env } from "cloudflare:workers";
import { createMessageBatch, createExecutionContext, getQueueResult } from "cloudflare:test";
import { it, expect } from "vitest";
import worker from "./index.mjs";

it("calls queue handler", async () => {
  const batch = createMessageBatch("my-queue", [
    {
      id: "message-1",
      timestamp: new Date(1000),
      body: "body-1"
    }
  ]);
  const ctx = createExecutionContext();
  await worker.queue(batch, env, ctx);
  const result = await getQueueResult(batch, ctx);
  expect(result.ackAll).toBe(false);
  expect(result.retryBatch).toMatchObject({ retry: false });
  expect(result.explicitAcks).toStrictEqual(["message-1"]);
  expect(result.retryMessages).toStrictEqual([]);
});
```

Adapted (not in the official docs): the class extends `DurableObject` (imported from `cloudflare:workers`) and awaits the storage write; see Notes.

```ts
import { DurableObject } from "cloudflare:workers";

export class Counter extends DurableObject {
  async fetch(request: Request): Promise<Response> {
    let count = (await this.ctx.storage.get<number>("count")) ?? 0;
    await this.ctx.storage.put("count", ++count);
    return new Response(count.toString());
  }
}
```

```ts
import { env } from "cloudflare:workers";
import { runInDurableObject } from "cloudflare:test";
import { it, expect } from "vitest";
import { Counter } from "./index.ts";

it("increments count", async () => {
  const id = env.COUNTER.newUniqueId();
  const stub = env.COUNTER.get(id);
  let response = await stub.fetch("https://example.com");
  expect(await response.text()).toBe("1");

  response = await runInDurableObject(stub, async (instance: Counter, state) => {
    expect(instance).toBeInstanceOf(Counter);
    expect(await state.storage.get<number>("count")).toBe(1);

    const request = new Request("https://example.com");
    return instance.fetch(request);
  });
  expect(await response.text()).toBe("2");
});
```

## Notes

- Adapted from the official docs: the official `Counter` is a plain class with `constructor(readonly state: DurableObjectState)` and an un-awaited `void this.state.storage.put(...)`. This sample uses `extends DurableObject` (`this.ctx.storage`) and awaits the write; the test is unchanged. `Counter` must be exported from the `main` Worker and bound as `COUNTER` in the Wrangler config.
- The `scheduled`/`queue` tests need a Worker whose default export defines those handlers.
- `runInDurableObject` temporarily replaces the object's `fetch()` with the callback; it works only for stubs of Durable Objects defined in the `main` Worker.
- Other helpers: `runDurableObjectAlarm`, `evictDurableObject`, `listDurableObjectIds`, `reset()`, `abortAllDurableObjects()`.
- See [../references/vitest-integration/README.md](../references/vitest-integration/README.md).
