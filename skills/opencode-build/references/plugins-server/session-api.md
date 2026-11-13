---
source: https://opencode.ai/docs/build/plugins/server/#sessions
---

# Sessions (API)

Create, read, list, prompt, interrupt, compact, and remove sessions from a plugin.

## Signature / Usage

Create or read a session.

```ts
const created = await ctx.session.create({ title: "Review" })
const session = await ctx.session.get({ sessionID })
const messages = await ctx.session.context({ sessionID })
```

List sessions a page at a time. To get the next page, pass `cursor.next` back as `cursor`. The cursor remembers your filters, so you don't need to repeat them.

```ts
const page = await ctx.session.list({ directory: ctx.location.directory, limit: 20 })
const next = page.cursor.next ? await ctx.session.list({ cursor: page.cursor.next, limit: 20 }) : undefined
```

Change the agent or model used by subsequent requests.

```ts
await ctx.session.switchAgent({ sessionID, agent: "build" })
await ctx.session.switchModel({ sessionID, model: { providerID: "anthropic", id: "claude-sonnet-5-5" } })
```

Send user prompts, transient generation requests, commands, or synthetic messages.

```ts
const prompt = await ctx.session.prompt({ sessionID, text: "Review the current changes" })
const generated = await ctx.session.generate({ sessionID, prompt: "Summarize this project" })
await ctx.session.command({ sessionID, name: "review", text: "--staged" })
const synthetic = await ctx.session.synthetic({ sessionID, text: "Deployment completed" })
```

`generate` returns the `text` along with the call's `tokens` and `cost`, in the same shape an assistant message reports them.

Rename, interrupt, or wait for a session.

```ts
await ctx.session.update({ sessionID, title: "Review" })
await ctx.session.interrupt({ sessionID, resume: false })
await ctx.session.wait({ sessionID })
```

Remove a temporary session with `remove`. Removal stops active execution and recursively deletes child sessions.

```ts
await ctx.session.remove({ sessionID })
```

Request compaction with `compact`. It returns the admitted inbox item, not a completed summary; compaction runs at the next step boundary by default. Pass `delivery: "queue"` to preserve queue order instead.

```ts
const compaction = await ctx.session.compact({ sessionID })
```

Attach, list, or remove keyed session instruction entries with `instructions.entry`. Entries render as `<context key="...">` blocks in the session's instructions, and updates or removals are announced at the next step boundary without queuing a message turn.

```ts
await ctx.session.instructions.entry.put({ sessionID, key: "deploy-target", value: "production" })
const entries = await ctx.session.instructions.entry.list({ sessionID })
await ctx.session.instructions.entry.remove({ sessionID, key: "deploy-target" })
```

### Reference

Schemas: [`Session.Info`](https://opencode.ai/docs/api/#schema-Session.Info), [`Model.Ref`](https://opencode.ai/docs/api/#schema-Model.Ref), [`Session.Inbox.User`](https://opencode.ai/docs/api/#schema-Session.Inbox.User), [`Session.Inbox.Synthetic`](https://opencode.ai/docs/api/#schema-Session.Inbox.Synthetic), [`InstructionEntry.Info`](https://opencode.ai/docs/api/#schema-InstructionEntry.Info)

```ts
interface SessionContext {
  create(input?: SessionCreateInput, requestOptions?: RequestOptions): Promise<SessionInfo>
  get(input: SessionGetInput, requestOptions?: RequestOptions): Promise<SessionInfo>
  remove(input: SessionRemoveInput, requestOptions?: RequestOptions): Promise<void>
  context(input: SessionContextInput, requestOptions?: RequestOptions): Promise<readonly SessionMessageInfo[]>
  instructions: {
    entry: {
      list(
        input: ExperimentalSessionInstructionsEntryListInput,
        requestOptions?: RequestOptions,
      ): Promise<readonly InstructionEntryInfo[]>
      put(input: ExperimentalSessionInstructionsEntryPutInput, requestOptions?: RequestOptions): Promise<void>
      remove(input: ExperimentalSessionInstructionsEntryRemoveInput, requestOptions?: RequestOptions): Promise<void>
    }
  }
  switchAgent(input: SessionSwitchAgentInput, requestOptions?: RequestOptions): Promise<void>
  switchModel(input: SessionSwitchModelInput, requestOptions?: RequestOptions): Promise<void>
  update(input: SessionUpdateInput, requestOptions?: RequestOptions): Promise<void>
  move(input: SessionMoveInput, requestOptions?: RequestOptions): Promise<void>
  prompt(input: SessionPromptInput, requestOptions?: RequestOptions): Promise<SessionInboxUser>
  generate(input: SessionGenerateInput, requestOptions?: RequestOptions): Promise<{ text: string }>
  command(input: SessionCommandInput, requestOptions?: RequestOptions): Promise<void>
  compact(input: SessionCompactInput, requestOptions?: RequestOptions): Promise<SessionInboxCompaction>
  synthetic(input: SessionSyntheticInput, requestOptions?: RequestOptions): Promise<SessionInboxSynthetic>
  interrupt(input: SessionInterruptInput, requestOptions?: RequestOptions): Promise<{ interrupted: boolean }>
  wait(input: ExperimentalSessionWaitInput, requestOptions?: RequestOptions): Promise<void>
}
```

## Notes

- Source inconsistency: the prose says `generate` returns `text` along with `tokens` and `cost`, while the interface above types it as `Promise<{ text: string }>`. Both are transcribed as written.
- `move` appears in the interface but is not described in the prose.
- Model IDs in examples are transcribed as written in the official docs.

## Related

- [Session hooks: prompt admission and forks](./session-hooks-prompt.md)
- [Permission API](./permission-api.md)
- [Generate (experimental)](./generate.md)
