# Concurrency

Limits the number of steps executing simultaneously across function runs. Sleeping, waiting, or paused steps do not consume concurrency capacity.

## Signature / Usage

```ts
inngest.createFunction(
  {
    id: "my-function",
    concurrency: [
      {
        scope: "account",
        key: '"openai"',
        limit: 10,
      },
      {
        scope: "fn",
        key: "event.data.account_id",
        limit: 1,
      },
    ],
  },
  { event: "ai/generate.requested" },
  async ({ event, step }) => { /* handler */ }
);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `limit` | `number` | Max concurrent steps. `0` = unlimited. |
| `scope` | `'fn' \| 'env' \| 'account'` | Boundary for the limit. `'fn'` (default) = per function; `'env'` = shared across environment; `'account'` = shared across entire account. |
| `key` | `string` (CEL expression) | Virtual queue identifier. Required when `scope` is `'env'` or `'account'`. Each unique evaluated value creates an independent queue. |

A plain `number` shorthand sets `{ limit: N }` with `scope: 'fn'`.

## Notes

- Concurrency limits steps, not function run count — functions in sleep/wait states do not count.
- Up to 2 concurrent constraints can be combined per function (array form).
- FIFO ordering is guaranteed within the same function; ordering across different functions is not.
- For multi-tenant isolation, use a `key` expression such as `"event.data.account_id"` to create per-tenant virtual queues.
- The maximum allowed `limit` value depends on your account plan.

## Related

- [Throttling](./throttling.md)
- [Priority](./priority.md)
- [Batching](./batching.md)
