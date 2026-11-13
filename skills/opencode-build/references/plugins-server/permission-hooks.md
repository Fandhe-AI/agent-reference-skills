---
source: https://opencode.ai/docs/build/plugins/server/#hooks
---

# Permission Hooks

Review permission decisions after configured rules are evaluated and before an action runs or a permission prompt is published.

## Signature / Usage

```ts
await ctx.permission.hook("evaluate", async (event) => {
  if (event.action === "read") return

  const messages = await ctx.session.context({ sessionID: event.sessionID })
  const review = await ctx.generate.text({
    model: { providerID: "anthropic", id: "claude-sonnet-5-5" },
    prompt: buildSafetyPrompt({ messages, action: event.action, resources: event.resources }),
  })
  const decision = parseDecision(review.text)

  event.effect = decision.effect
  event.message = decision.reason
})
```

Permission hooks follow these rules:

- Hooks run for `allow` and `ask` decisions.
- An explicit configured `deny` is final and does not invoke the hook.
- A hook may change `effect` to `allow`, `ask`, or `deny`.
- `message` appears in an escalated permission request or becomes the denial reason.

### Reference

```ts
interface PermissionEvaluation {
  readonly sessionID: string
  readonly agent?: string
  readonly action: string
  readonly resources: readonly string[]
  readonly metadata?: Record<string, unknown>
  readonly source?: { type: "tool"; messageID: string; id: string }
  effect: "allow" | "ask" | "deny"
  message?: string
}
```

## Notes

- Source inconsistency: this example uses `ctx.generate.text`, which the official docs elsewhere call deprecated in favor of `ctx.experimental.generate.text`.
- `buildSafetyPrompt` and `parseDecision` are placeholders you implement. The hook can change `event.effect` to `allow`, so validate the parsed decision against `allow` / `ask` / `deny` and fall back to `ask` or `deny` when parsing fails.
- V1 `permission.ask` migrates to `ctx.permission.hook("evaluate", ...)`.
- OpenCode permissions and hooks are distinct from Claude Code permissions and PreToolUse hooks (anthropic-claude-code-admin / anthropic-claude-code-extend).

## Related

- [Permission API](./permission-api.md)
- [Generate (experimental)](./generate.md)
