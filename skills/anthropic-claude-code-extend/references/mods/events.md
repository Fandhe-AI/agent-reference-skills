<!-- source: https://code.claude.com/docs/en/plugins/mods/events / last verified: 2026-11-14 -->

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
- `tool.check` fires after permission rules and settings hooks decide; `next(e)` resolves to `allow`, `ask`, or `deny`, and no permission prompt appears while `next(e)` runs. Whether a mod's `allow` can replace a rule or `PreToolUse` decision depends on the built-in guard: with the guard loaded, a user's mod by default can't approve a call that a `deny` rule refuses, an `ask` rule prompts for, or any `PreToolUse` hook blocked (see the admin page). Prefer a permission rule such as `Bash(npm test)` for fixed commands.
- `tool.check` fields: `e.input` (the tool's arguments), `e.agentId` and `e.ceiling` (v2.1.290+), and `e.isReadOnly` (v2.1.304+): `true` when the tool reports the call as read-only, otherwise absent, not `false`. Read, Grep, Glob, and WebSearch report every call read-only; Bash does when the command passes the built-in read-only command check; an MCP tool does when the server sets `readOnlyHint` to `true`. The value is the tool's own report (WebFetch and Agent calls report read-only), so do not approve a call on this field alone. To handle only read-only calls put `isReadOnly: true` in the matcher, e.g. `on('tool.check', { tool: 'Bash', isReadOnly: true }, hook)`; test `e.isReadOnly` in the body for the rest, because `isReadOnly: false` in a matcher never runs the hook.
- In plan mode, for a call that isn't read-only (such as a file edit), a `tool.check` hook can tighten the decision `next(e)` returns but can't loosen it.
- Time spent inside a mods API call such as `$.ui.ask` does not count against a hook's time limit; awaiting your own promise does, and a timed-out hook is skipped so the held command would run.
- `turn.step` hooks must be async generators: `yield* next(e)` forwards streamed pieces and evaluates to the final result with `usage` (`input_tokens`, `output_tokens`, `cache_read_input_tokens`, `cache_creation_input_tokens`, `model`). `result.serverToolUses` (v2.1.290+) lists API-run tool calls (e.g. advisor); no `tool.call` fires for them.
- A `drop` after `next(e)` let the prompt through makes the hook fail with `a drop after its next() was answered`. Text from `prompt.section` / `prompt.context` / `skill.prompt` hooks that changes between requests invalidates the prompt cache.
- Settings hook events are `classic.<Event>` (e.g. `classic.Stop`, `e` is the stdin JSON incl. `transcript_path`). `'classic.*'` matches all; `'*'` matches every event except telemetry events.
- To hook another mod's controls, panes, or row above the prompt, add `plugin` to the matcher: `{ plugin: 'other-mod' }` (name without marketplace) or `{ plugin: '*' }` for every mod. Without it, a hook on `ui.press`, `ui.input`, `ui.select`, or `ui.focus` skips other mods' controls, and a `ui.render` hook skips their panes and rows above the prompt. A wildcard hook with no matcher (`on('*', hook)`, `on('ui.*', hook)`) still runs for every mod; a wildcard with a matcher needs `plugin` too. `{ plugin: '*' }` needs v2.1.323+ (earlier, a hook with no `plugin` ran for every mod and `{ plugin: '*' }` did not run); on both versions use `{ plugin: /./ }` for `ui.press` / `ui.input` / `ui.select`, and `on('ui.*', hook)` with a `next.event` check for `ui.focus` / `ui.render`.
- `settings.read` hook: fires for a mod's `$.settings.read` and, from v2.1.304, on Claude Code's own merged-settings read (after the session's mods load, and again when settings or loaded plugins change). `e.layers` (v2.1.304+) is one `{ source, settings }` per source in use, lowest precedence first: `plugin`, `user`, `project`, `local`, `flag`, `policy` (empty in `claude plugin test`); `plugin` is a layer name only, not a `source` to pass to `$.settings.read`. `e.source` is the one source a mod asked for (absent on Claude Code's own read). `next.origin` is `{ plugin: 'engine', tier: 'core' }` on Claude Code's own read, otherwise the calling mod. A hook returns `next(e)`, `{ value }` (replaces each changed key's whole value if it fits the key's schema; on a mod's read that mod's call resolves to it, so return a whole object), or `{ deny: reason }` (Claude Code keeps the settings as merged before any hook answered; a mod's call rejects with `<calling mod>: $.settings.read: <reason>`). `next(e)` resolves to `{ value }` or `{ deny }`. Where the built-in guard loads, it can skip this hook in a mod you install or load with `--plugin-dir` (debug log: `settings.read bypassed by cc-plugin-sec-default`). A key Claude Code reads from each source separately (such as `env`) is not changed by editing the merged `value`.
- A `turn.step` request that names a model alias such as `haiku` fails with a model error before v2.1.309; update or use a full model id.

### Changes from the changelog

- 2.1.304: a mod's `tool.check` answer accepts `decider: "person"`: only the permission dialog or a host's callback can approve the ask, and it is refused with the mod's reason where nobody can be asked. `e.isReadOnly` is set on `tool.check` when the tool call is read-only. A transcript line now names the event and the plugin when a plugin that runs first skips one of your mod's hooks.
- 2.1.323: a `*`, namespace, or negated hook on `engine.create` now only observes; to add or withhold a `$` noun, hook `engine.create` by name.
- 2.1.318: what a mod attaches at `prompt.submit` stays in the user's turn rather than going out as a system message.
- Source: https://code.claude.com/docs/en/plugins/mods/events.md (retrieved 2026-11-14)
- Source: https://code.claude.com/docs/en/changelog.md (2.1.304, 2.1.318, 2.1.323, retrieved 2026-11-14)
- Registering the same event twice without a matcher fails to load: `on("session.start") is registered twice without a matcher`.
- At `tool.check` and `plugin.register` a refusal returned after `next` still holds; at `tool.call` a `deny` after `next` withholds the result. For `prompt.submit` use `{ drop }`, for `config.set` `{ deny }` in a fail-closed `.catch`.
- Failure line example: `my-mod: tool.call hook skipped: threw Error: boom`.

## Related

- [Use the mods API](./api.md)
- [Draw in the interface with a mod](./interface.md)
- [Mods reference](./reference.md)
- [Test a mod](./test.md)
- [Manage mods for your organization](./admin.md)
