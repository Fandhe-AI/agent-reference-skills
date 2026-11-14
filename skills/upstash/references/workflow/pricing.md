# Pricing and Message Usage

Upstash Workflow is pay-as-you-go on top of QStash: a workflow run consists of several QStash messages and the total cost is determined by the number of messages used.

## Signature / Usage

Snippet taken from https://upstash.com/docs/workflow/steps/call (a `context.call` step generates two messages).

Adapted (not in the official docs): the official snippet sends `OPENAI_API_KEY` to the example third-party endpoint; a credential variable dedicated to that service is used instead.

```typescript
const { status,  headers,  body } = await context.call("sync-user-data", {
    url: "https://my-third-party-app", // Endpoint URL
    method: "POST",
    body: JSON.stringify({
      userId,
      name
    }),
    headers: {
      authorization: `Bearer ${process.env.THIRD_PARTY_API_KEY}`,
    },
  }
);
```

## Options / Props

| Step | Messages |
|------|----------|
| `context.run`, `context.sleep`, `context.sleepUntil`, `context.waitForEvent` | 1 each |
| `context.call` | 2 |
| Each step in a parallel run | 1 extra message |
| Retry after an error or unreachable endpoint (workflow endpoint or the URL in `context.call`; up to 3 times by default) | 1 per retry |

## Notes

- Adapted from the official docs: the `Authorization` header of the `context.call` snippet uses `THIRD_PARTY_API_KEY` for the destination service instead of the official `OPENAI_API_KEY`, so an OpenAI credential is not sent to an unrelated endpoint
- No charge when the app receives no traffic; current message usage and costs are shown in the console Overview tab of QStash
- Plan details: https://upstash.com/pricing/workflow
- Plan-dependent limits seen elsewhere: DLQ retention (dlq) and `waitForEvent` maximum timeout (wait-for-event)
- Source: https://upstash.com/docs/workflow/pricing (fetched 2026-11-14; no version pin on the site)

## Related

- [parallel-steps](./parallel-steps.md)
- [dlq](./dlq.md)
- [how-it-works](./how-it-works.md)
