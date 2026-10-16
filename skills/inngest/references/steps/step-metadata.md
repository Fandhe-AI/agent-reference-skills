# step.metadata

Step tool that attaches custom key-value metadata to a function run. Like every step tool it takes a memoization ID, executes exactly once, and appears as its own step in the trace. Shown in the Inngest dashboard trace view.

## Signature / Usage

Setup: add `metadataMiddleware()` to the Inngest client. This makes `step.metadata()` available in function handlers and `inngest.metadata` on the client.

```ts
import { Inngest } from "inngest";
import { metadataMiddleware } from "inngest/experimental";

const inngest = new Inngest({
  id: "my-app",
  middleware: [metadataMiddleware()],
});
```

```ts
await step.metadata("record-payment-info").update({
  paymentId: charge.id,
  processor: "stripe",
  amount: event.data.amount,
});
```

Add metadata without creating an extra step, from inside `step.run()` (batched with the step output):

```ts
const user = await step.run("fetch-user", async () => {
  const user = await fetchUser(event.data.userId);
  await inngest.metadata.update({ company: user.company });
  return user;
});
```

Batch several updates in one memoized step with `.do()`:

```ts
await step.metadata("update-all-statuses").do(async (builder) => {
  await builder.update({ phase: "started", initiator: "system" }, "workflow");
  await builder.update({ estimatedDuration: 30 }, "timing");
});
```

Scope to a run, step, or extended trace span, or update a different run:

```ts
await step.metadata("run-status").run().update({ priority: "high" });
await step.metadata("step-annotation").step("process-data").update({ recordsProcessed: 1500 });
await step.metadata("span-details").span(spanId).update({ externalCallDuration: 230 });
await step.metadata("record-score").run(event.data.runId).update({ qualityScore: score.quality });

// From outside a function
await inngest.metadata.run(runId).update({ approvedBy: "admin@example.com" });
```

## Options / Props

| Name (`MetadataBuilder` returned by `step.metadata(memoId)`) | Type | Description |
|------|------|-------------|
| `.run(id?)` | `(id?: string) => MetadataBuilder` | Scope to a run. Omit `id` for the current run. |
| `.step(id?)` | `(id?: string) => MetadataBuilder` | Scope to a step. Omit `id` for the current step. Defaults to the current or latest attempt. |
| `.span(id)` | `(id: string) => MetadataBuilder` | Scope to an extended trace span. |
| `.update(values, kind?)` | `(values: Record<string, unknown>, kind?: string) => Promise<void>` | Send the metadata update. `kind` defaults to `"default"`. |
| `.do(fn)` | `(fn: (builder: MetadataBuilder) => Promise<void>) => Promise<void>` | Batch multiple updates in a single memoized step. |

`inngest.metadata` is the client-level builder with the same scoping methods and `.update()`, but without `.do()`. It can be called inside `step.run()`, in the function body, or from external contexts.

Scopes:

| Scope | Builder method | Default when... |
|-------|----------------|-----------------|
| `run` | `.run(id?)` | Outside `step.run()` |
| `step` | `.step(id?)` | Inside `step.run()` |
| `extended_trace` | `.span(id)` | Never (must be explicit) |

Kinds (second argument of `.update()`):

| Kind string | Stored as | Dashboard label |
|-------------|-----------|-----------------|
| omitted or `"default"` | `userland.default` | User Metadata |
| `"billing"` | `userland.billing` | User Metadata (billing) |
| `"analytics"` | `userland.analytics` | User Metadata (analytics) |

Built-in (read-only, platform-managed) kinds:

| Kind | Label in dashboard | Description |
|------|--------------------|-------------|
| `inngest.ai` | AI Metadata | LLM/AI metadata, including input/output tokens, model, latency, and cost when available |
| `inngest.http` | HTTP Metadata | HTTP request details: method, status code, request/response sizes |
| `inngest.http.timing` | HTTP Timing | Timing breakdown: DNS, TCP, TLS, TTFB, transfer |
| `inngest.response_headers` | Response Headers | HTTP response header key-value pairs |
| `inngest.warnings` | Warnings | Warning messages from the execution engine |

Size limits (enforced server-side):

| Limit | Maximum | Description |
|-------|---------|-------------|
| Per update | 64 KB | Maximum size of a single metadata update (span) |
| Per run | 1 MB | Cumulative size of all metadata across the run |

## Notes

- Builder methods are chainable and self-removing: after `.run()` you cannot also call `.step()` on the same builder.
- Without an explicit scope, `.update()` auto-detects: inside `step.run()` it targets the current step's attempt; outside it targets the `run` scope.
- Metadata is always attached at the step attempt level. Each retry attempt gets its own metadata; previous attempts' metadata is preserved.
- Updates with the same kind and scope are merged. The only supported operation is `merge`; individual keys cannot be deleted or replaced.
- The `inngest.*` kind namespace is reserved for system use; custom kinds must not use this prefix.
- Size is the sum of `len(key) + len(JSON.stringify(value))` per entry. Exceeding a limit returns HTTP `413` (`"Metadata span exceeds maximum size of 64KB"` / `"Cumulative metadata size exceeds limit"`) which surfaces as an exception in the function. For large payloads, store the data externally and attach only a reference ID or URL.
- `inngest.metadata.update()` in the function body outside `step.run()` is not durable: it re-fires on every re-execution. Use `step.metadata()` or call it inside `step.run()`.
- When targeting a different run, the update is sent via REST API (not batched).
- TypeScript SDK only; Python and Go support is planned but not yet available.
- Automatic extraction of AI metadata from OpenTelemetry spans is on by default; set `aiMetadata: false` on the Inngest client to opt out.
- Imported from `inngest/experimental` (v4 reference).

## Related

- [step.run](./step-run.md)
- [step.sleep](./step-sleep.md)
- [step.waitForEvent](./step-wait-for-event.md)
