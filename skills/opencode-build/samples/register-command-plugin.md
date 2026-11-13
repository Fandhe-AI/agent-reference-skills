---
source: https://opencode.ai/docs/build/plugins/server/
---

# Register a Command from a Plugin

Add a command with `ctx.command.transform` whose executor sends a prompt to the session.

```ts
await ctx.command.transform((editor) => {
  editor.add({
    name: "security-review",
    description: "Review changes for security issues",
    execute: async ({ sessionID, prompt, delivery }) => {
      await ctx.session.prompt({
        ...prompt,
        sessionID,
        text: `Review these changes for security issues.\n\n${prompt.text}`,
        delivery,
      })
    },
  })
})
```

Reload after external state used by the transform changes:

```ts
await ctx.command.reload()
```

## Notes

- Run this inside `setup(ctx)` of a `Plugin.define` server plugin.
- `delivery` is `"steer"` or `"queue"`.
- OpenCode commands are distinct from Claude Code slash commands (anthropic-claude-code-extend).
