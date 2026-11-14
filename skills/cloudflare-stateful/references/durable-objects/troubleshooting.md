---
source: https://developers.cloudflare.com/durable-objects/observability/troubleshooting/
---

# Troubleshooting

Debugging Durable Objects with `wrangler dev` and `wrangler tail`, and resolving common runtime and deployment errors.

## Signature / Usage

Snippet taken from https://developers.cloudflare.com/durable-objects/best-practices/error-handling/

```ts
const doStub = env.ErrorThrowingObject.getByName(userId);
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `Exceeded the account's spending cap for Durable Objects` | error | — | The account reached a Durable Objects spending limit. Raise it above current spend, turn it off or remove it under Billing > Spend Management (changes can take a few minutes); the block also expires at the next billing period. Review alarm recovery before resuming. |
| `Error: Durable Object is overloaded. Too many requests queued.` | error | — | Total count of queued requests is too high. |
| `Error: Durable Object is overloaded. Too much data queued.` | error | — | Total size of data in queued requests is too high. |
| `Error: Durable Object is overloaded. Requests queued for too long.` | error | — | The oldest queued request has waited too long. |
| `Error: Durable Object is overloaded. Too many requests for the same object within a 10 second window.` | error | — | More extreme overload over a short span. |
| `Your account is generating too much load on Durable Objects. Please back off and try again later.` | error | — | Stub-creation rate limit. |
| `Durable Object reset because its code was updated.` | error | — | A code update was applied before the object hibernated. |
| `Durable Object storage operation exceeded timeout which caused object to be reset.` | error | — | A storage operation hit the time limit. |
| `Your account is doing too many concurrent storage operations. Please back off and try again later.` | error | — | Too many concurrent storage operations. |

## Notes

- `wrangler tail` shows a live feed of console and exception logs for both Worker and Durable Object requests, after `npx wrangler deploy`. `wrangler dev` is also available. Command details are in the cloudflare-wrangler skill.
- "No event handlers were registered. This script does nothing.": check that `main` (and `dir`) in the Wrangler configuration point to the file with your Worker code, with the `.mjs` extension if using ES modules syntax in a `.js` file.
- "Cannot apply `--delete-class` migration to class ... without also removing the binding that references it": this message comes from the legacy `--delete-class` / migrations flow; remove the corresponding binding under `durable_objects` before applying again. For current class deletion see the exports page.
- Overload: one object cannot do more work than a single thread allows. Do less work per request or split requests among more objects. Overload errors have an `.overloaded` property, used to avoid retrying them.
- Stub creation rate limit: lookups are usually cached, so retrying after a short wait for recently accessed objects is safe; spread lookups across requests.
- Code-update reset: "reset" refers to in-memory state only; data persisted with `ctx.storage` is unaffected. Make operations retryable and persist important state. Applies to `immediate` strategies and `deferred` ones reaching `max_delay`.
- Storage timeout: in objects with many key-value pairs `deleteAll()` can exceed the time limit; each call makes progress and it is safe to retry until it succeeds.
- Concurrent storage operations: back off, and use the multi-key `get(keys)` instead of many single `get(key)` calls.
- Spending cap: held alarms older than seven days are deleted; see the spend-management page.
- Source: https://developers.cloudflare.com/durable-objects/observability/troubleshooting/index.md (cloudflare-docs production 34d908a, fetched 2026-11-14)

## Related

- [Error handling](./error-handling.md)
- [Spending limits](./spend-management.md)
- [Code updates](./code-updates.md)
- [Known issues](./known-issues.md)
- [Limits](./limits.md)
- [Class exports (declarative)](./migrations.md)
