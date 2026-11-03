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

```ts
export class Counter {
  constructor(readonly state: DurableObjectState) {}

  async fetch(request: Request): Promise<Response> {
    let count = (await this.state.storage.get<number>("count")) ?? 0;
    void this.state.storage.put("count", ++count);
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

- `runInDurableObject` temporarily replaces the object's `fetch()` with the callback; it works only for stubs of Durable Objects defined in the `main` Worker.
- Other helpers: `runDurableObjectAlarm`, `evictDurableObject`, `listDurableObjectIds`, `reset()`, `abortAllDurableObjects()`.
- See [../references/vitest-integration/README.md](../references/vitest-integration/README.md).
