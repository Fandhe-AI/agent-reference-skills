<!-- source: https://code.claude.com/docs/en/plugins/mods/events / last verified: 2026-10-17 -->

# React to events with a mod

A hook is a function Claude Code runs when a named event fires; it can observe, rewrite, or answer the event. Register with `on(eventName, [matcher], handler)`.

## Signature / Usage

```javascript
// Observe: pass the event on unchanged
on('tool.call', async ($, e, next) => {
  $.ui.log('Claude is about to use ' + e.tool)
  return next(e)
})

// Rewrite: pass a modified copy (events are deeply frozen)
on('prompt.submit', async ($, e, next) => next({ ...e, text: e.text.trim() }))

// Answer: return a result without calling next
on('tool.call', { tool: 'Bash' }, async () => {
  return { deny: 'Bash is turned off in this project. Use the file tools.' }
})

// Matchers: value, array, or regular expression
on('tool.call', { tool: ['Edit', 'Write'] }, hook)
on('tool.call', { tool: /^mcp__github__/ }, hook)
```

## Options / Props

| Goal | Return |
|------|--------|
| Rewrite the prompt | `next({ ...e, text: newText })` |
| Add text only Claude reads | `next({ ...e, context: [...(e.context ?? []), extraText] })` |
| Stop the prompt | `{ drop: 'the reason' }` |

Turn events:

| Event | When | What a hook can do |
|-------|------|--------------------|
| `turn.start` | Turn begins | Observe; `e.turnId` |
| `turn.step` | One request about to go to the model (`e.agentId` for a subagent) | Read token usage, `next({ ...e, model })`, or answer without calling the model |
| `turn.complete` | Turn ended (`e.isAborted`, `e.answer`, `e.durationMs`, `e.usage`) | Observe, or return `{ text }` for a line under the answer |

Order mods run in (first is outermost):

1. Built-in guard `sec-default@builtin`, organization mods in `prependPlugins`, then other organization mods not in `appendPlugins`
2. Mods you install (a mod runs before the mods it lists under `dependencies`; within a module, in `on` call order)
3. Mods the organization lists in `appendPlugins`
4. Other built-in mods

Failure handling:

| Case | Result |
|------|--------|
| Hook fails before calling `next` | Claude Code skips it; next handler runs |
| Hook fails after `next` resolved | That result stands; nothing runs again |
| `.catch` handler | Runs with the same event; use `next.called` and `next.error.kind` |

```javascript
on('tool.call', { tool: 'Bash' }, guard).catch(async ($, e, next) => {
  if (next.called) return next(e)
  return { deny: 'The command guard failed, so this command was not run: ' + next.error.kind }
})
```

Hold a tool call until the user decides (`$.ui.ask` resolves to the picked label, rejects when dismissed or in `claude -p`):

```javascript
answer = await $.ui.ask('Run this command? ' + e.command, ['Run it', 'Refuse'])
```

`tool.check` decision example:

```javascript
on('tool.check', { tool: 'Bash' }, async ($, e, next) => {
  const decided = await next(e)
  if (!e.input.command.includes('git push')) return decided
  const branch = await $.process.run(['git', 'branch', '--show-current'])
  if (branch.stdout.trim() !== 'main') return decided
  return { decision: 'deny', reason: 'Push from a branch other than main' }
})
```

## Notes

- `tool.call` also fires for subagent calls and MCP tools. Returning `{ result }` without `next` answers the call (no permission prompt, tool does not run); `{ deny: reason }` after `await next(e)` withholds the result from Claude but undoes nothing the tool did. Retry by calling `next(e)` again.
- Hooks in managed settings (`PreToolUse`) run before any mod's `tool.call`, and their block is final. Other `PreToolUse` hooks (other settings files, plugin `hooks/hooks.json`) run after the last mod calls `next`; a mod that answers without calling `next` keeps them from running.
- `tool.check` fires after permission rules and settings hooks decide; `next(e)` resolves to `allow`, `ask`, or `deny`. It can approve a call that a non-managed `PreToolUse` hook blocked. Prefer a permission rule such as `Bash(npm test)` for fixed commands.
- Time spent inside a mods API call such as `$.ui.ask` does not count against a hook's time limit; awaiting your own promise does, and a timed-out hook is skipped so the held command would run.
- `turn.step` hooks must be async generators: `yield* next(e)` forwards streamed pieces and evaluates to the final result with `usage` (`input_tokens`, `output_tokens`, `cache_read_input_tokens`, `cache_creation_input_tokens`, `model`). `result.serverToolUses` (v2.1.290+) lists API-run tool calls (e.g. advisor); no `tool.call` fires for them.
- A `drop` after `next(e)` let the prompt through makes the hook fail with `a drop after its next() was answered`. Text from `prompt.section` / `prompt.context` / `skill.prompt` hooks that changes between requests invalidates the prompt cache.
- Settings hook events are `classic.<Event>` (e.g. `classic.Stop`, `e` is the stdin JSON incl. `transcript_path`). `'classic.*'` matches all; `'*'` matches every event except telemetry events.
- Registering the same event twice without a matcher fails to load: `on("session.start") is registered twice without a matcher`.
- At `tool.check` and `plugin.register` a refusal returned after `next` still holds; at `tool.call` a `deny` after `next` withholds the result. For `prompt.submit` use `{ drop }`, for `config.set` `{ deny }` in a fail-closed `.catch`.
- Failure line example: `my-mod: tool.call hook skipped: threw Error: boom`.

## Related

- [Use the mods API](./api.md)
- [Draw in the interface with a mod](./interface.md)
- [Mods reference](./reference.md)
- [Test a mod](./test.md)
- [Manage mods for your organization](./admin.md)
