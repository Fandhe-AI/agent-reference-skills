---
source: https://opencode.ai/docs/build/plugins/server/#agent
---

# Agent

Read all agents or fetch one by ID, and register a transform to inspect, update, remove, or select the default agent.

## Signature / Usage

```ts
const agents = await ctx.agent.list()
const build = await ctx.agent.get({ agentID: "build" })
```

Register a transform to inspect, update, remove, or select the default agent.

```ts
await ctx.agent.transform((editor) => {
  const agents = editor.list()
  const build = editor.get("build")

  editor.default("build")
  editor.update("build", (agent) => {
    agent.description = "Builds features and fixes bugs"
  })
  editor.remove("legacy")
})
```

Reload agents after external state used by a transform changes.

```ts
await ctx.agent.reload()
```

### Reference

Schema: [`Agent.Info`](https://opencode.ai/docs/api/#schema-Agent.Info)

```ts
interface AgentContext {
  list(input?: AgentListInput, requestOptions?: RequestOptions): Promise<AgentListOutput>
  get(input: AgentGetInput, requestOptions?: RequestOptions): Promise<AgentGetOutput>
  transform(callback: (editor: AgentEditor) => void): Promise<Registration>
  reload(): Promise<void>
}

interface AgentEditor {
  list(): readonly AgentInfo[]
  get(id: string): AgentInfo | undefined
  default(id: string | undefined): void
  update(id: string, update: (agent: AgentInfo) => void): void
  remove(id: string): void
}

interface Registration {
  dispose(): Promise<void>
}
```

## Notes

- OpenCode agents are distinct from Claude Code subagents (anthropic-claude-code-extend).

## Related

- [Transforms](./transforms.md)
- [Session API](./session-api.md)
