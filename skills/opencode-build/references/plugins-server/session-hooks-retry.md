---
source: https://opencode.ai/docs/build/plugins/server/#hooks
---

# Session Hooks: Retry Policy

Override the retry decision for a provider failure or replace its delay in milliseconds.

## Signature / Usage

The hook runs after OpenCode classifies the failure and proposes its policy, but before any retry is scheduled. It does not expose how OpenCode internally performs the next attempt.

```ts
await ctx.session.hook("retry", (event) => {
  if (event.error.status === 429) {
    event.decision = { retry: true, delay: 10_000 }
    return
  }
  if (event.error.type === "provider.invalid-request" && event.attempt === 2) {
    event.decision = { retry: true, delay: 0 }
    return
  }
  if (event.attempt >= 3) event.decision = { retry: false }
})
```

Retry hooks can change OpenCode's initial `decision` by making a terminal failure retryable or vetoing a proposed retry.

Retry decisions follow these rules:

- Multiple hooks run in registration order, and later hooks see the current decision.
- The built-in maximum attempt count remains a hard limit.
- `attempt` is the physical attempt under consideration. The initial request is `1`, so the first retry is `2`.
- Invalid delays such as `NaN`, infinity, or negative values fall back to the computed delay.
- Context-overflow recovery is separate because it compacts the conversation instead of retrying the same request.

### Reference

```ts
type RetryDecision = { retry: false } | { retry: true; delay: number }

interface SessionRetryHook {
  readonly sessionID: string
  readonly agent: string
  readonly model: { providerID: string; id: string; variant?: string }
  readonly error: { type: string; message: string; status?: number }
  readonly attempt: number
  decision: RetryDecision
}
```

## Notes

- OpenCode plugin hooks are distinct from Claude Code hooks (anthropic-claude-code-extend).

## Related

- [Session hooks: model resolve and native HTTP](./session-hooks-model.md)
- [Hooks overview](./hooks-overview.md)
