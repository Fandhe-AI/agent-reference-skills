---
source: https://opencode.ai/docs/build/plugins/server/#permissions
---

# Permissions (API)

Ask for permission before performing an action, inspect or resolve pending permission requests, and replace session-scoped permission rules.

## Signature / Usage

`assert` evaluates the session's [permission rules](https://opencode.ai/docs/permissions/), including saved approvals, and prompts the user when a rule resolves to `ask`. It resolves once the action is allowed.

```ts
execute: async (input, context) => {
  await ctx.permission.assert({
    sessionID: context.sessionID,
    agent: context.agent,
    source: { type: "tool", messageID: context.messageID, id: context.id },
    action: "deploy",
    resources: [input.environment],
    save: [input.environment],
  })
  return { content: await deploy(input.environment) }
}
```

- `action` and `resources` are matched against the rules. Any `deny` blocks the action; otherwise any `ask` prompts.
- `save` lists the patterns stored when the user chooses to always allow.
- `agent` selects whose rules apply and defaults to the session's agent. `source` attaches the prompt to a tool call.
- `metadata` passes extra detail to permission prompts and `evaluate` hooks.

A deny rule or a rejection with feedback rejects with a `Tool.Error` that carries the reason, so the model sees it and continues. A plain rejection ends the current step. Let these errors propagate rather than returning them as tool output.

Inspect or resolve pending permission requests.

```ts
const pending = await ctx.permission.list({ sessionID })
const request = await ctx.permission.get({ sessionID, requestID })
await ctx.permission.reply({ sessionID, requestID, decision: "once" })
```

Replace the session-scoped permission rules. They are evaluated after the agent's rules, and the last matching rule wins. Child sessions inherit the rules in effect when they are created.

```ts
await ctx.session.update({
  sessionID,
  permissions: [{ action: "edit", resource: "/path/to/original/checkout/**", effect: "deny" }],
})
```

## Options / Props

`ctx.permission.assert` input fields described in the prose above:

| Name | Type | Description |
| --- | --- | --- |
| `sessionID` | — | Session whose rules are evaluated. |
| `agent` | — | Selects whose rules apply; defaults to the session's agent. |
| `source` | — | Attaches the prompt to a tool call (`{ type: "tool", messageID, id }` in the example). |
| `action` | — | Matched against the rules. |
| `resources` | — | Matched against the rules. |
| `save` | — | Patterns stored when the user chooses to always allow. |
| `metadata` | — | Extra detail passed to permission prompts and `evaluate` hooks. |

## Notes

- OpenCode permissions are distinct from Claude Code permissions (anthropic-claude-code-admin) and Codex approvals (openai-codex).

## Related

- [Permission hooks](./permission-hooks.md)
- [Session API](./session-api.md)
- [Tool API](./tool-api.md)
