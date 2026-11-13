---
source: https://opencode.ai/docs/build/plugins/server/#commands
---

# Commands

Read the commands available at a location and register commands with a transform.

## Signature / Usage

```ts
const commands = await ctx.command.list()
```

Register commands with a transform. The executor receives the session, prompt attachments, and requested delivery mode.

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

Reload commands after external state used by a transform changes.

```ts
await ctx.command.reload()
```

### Reference

Schemas: [`Command.Info`](https://opencode.ai/docs/api/#schema-Command.Info), [`Session.Inbox.Delivery`](https://opencode.ai/docs/api/#schema-Session.Inbox.Delivery)

```ts
interface CommandContext {
  list(input?: CommandListInput, requestOptions?: RequestOptions): Promise<CommandListOutput>
  transform(callback: (editor: CommandEditor) => void): Promise<Registration>
  reload(): Promise<void>
}

interface CommandEditor {
  add(definition: CommandDefinition): void
}

interface CommandDefinition {
  name: string
  description?: string
  execute(input: CommandInvocation): Promise<void>
}

interface CommandInvocation {
  sessionID: string
  prompt: PromptInput
  delivery: "steer" | "queue"
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `name` | `string` | Command name. |
| `description` | `string` (optional) | Command description. |
| `execute` | `(input: CommandInvocation) => Promise<void>` | Receives `sessionID`, `prompt`, and `delivery` (`"steer"` or `"queue"`). |

## Notes

- OpenCode commands are distinct from Claude Code slash commands (anthropic-claude-code-extend).
- V1 `command.execute.before` has no one-to-one global hook; register a command here when the plugin owns it (see Migrate plugins from V1).

## Related

- [Session API](./session-api.md)
- [Migrate plugins from V1](./migrate-v1.md)
