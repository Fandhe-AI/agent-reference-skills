<!-- source: https://code.claude.com/docs/en/plugins/mods/api / last verified: 2026-11-14 -->

# Use the mods API

The mods API (`$`, the first argument of every hook) lets a mod add commands and tools, call a model, run timers, message other sessions, and reach files, processes, and the network.

## Signature / Usage

```javascript
on('session.start', async ($, e, next) => {
  await $.command.register({ name: 'standup', description: 'Summarize what changed today', argumentHint: '[days]' })
  return next(e)
})

on('command.run', { command: 'standup' }, async ($, e) => {
  return { text: 'Summary for the last ' + (e.args || '1') + ' day(s): ...' }
})
```

Add a tool (Claude sees it as `mcp__<plugin-name>__<name>`):

```javascript
await $.tool.register({
  name: 'ticket',
  description: 'Look up a ticket by its id and return its title and status',
  inputSchema: { type: 'object', properties: { id: { type: 'string' } }, required: ['id'] },
})

on('tool.call', { tool: 'mcp__my-mod__ticket' }, async ($, e) => {
  const response = await $.http.fetch('https://tickets.example.com/api/' + encodeURIComponent(e.id))
  return { result: response.ok ? response.text : 'Lookup failed with status ' + response.status }
})
```

Call a model:

```javascript
const r = await $.model.complete({
  model: 'haiku',
  system: 'Reply with one word: bug, feature, or question.',
  prompt: e.args,
  maxTokens: 20,
  timeoutMs: 15000,
})
const label = r.isAnswered ? r.text.trim() : 'unknown'
```

## Options / Props

`$.model.complete` vs `$.model.fork`:

| In the request | `$.model.complete` | `$.model.fork` |
|----------------|--------------------|----------------|
| Model | The `model` you pass | The session's model |
| System prompt | Short attribution block, then your `system` | The session's system prompt |
| Messages | One user message (`prompt`) | Conversation so far, then your `prompt` |
| CLAUDE.md / project context | Not included | Included |
| Tools | None | Claude's tools (model cannot call them) |

Prompt caching: pass `prompt` (or `system`) as an array of `{ text }` blocks and set `cache: true` on the last static block, e.g. `prompt: [{ text: RULES, cache: true }, { text: e.args }]`. Check `usage.cache_creation_input_tokens` / `usage.cache_read_input_tokens` on the result.

Showing something without a turn:

| Call | What the user sees |
|------|--------------------|
| `$.ui.status(text)` | One line under the prompt until changed (`⚠ my-mod: ...`) |
| `$.ui.toast(text)` | Toast with the mod's name, disappears after a few seconds |
| `$.ui.log(text)` | Dim transcript line Claude does not read (`● my-mod: ...`); `$.ui.log('m', { to: 'debug' })` writes to the debug log |
| `$.ui.notify(text)` | Notification from the user's terminal, sent the way their `preferredNotifChannel` setting says; title is the mod's name unless you pass a non-empty `{ title }` |

`$.ui.notify` is the only one of these that answers: `{ isSent: true, channel }` or `{ isSent: false, reason }`.

| `reason` | Meaning |
|----------|---------|
| `disabled` | `preferredNotifChannel` is `notifications_disabled` |
| `no-channel` | The setting is `auto` and the terminal has no notification Claude Code can send |
| `no-surface` | The session has no terminal (`-p`, Agent SDK, desktop app, VS Code extension, cloud session), or the call came before the session started or while Claude Code is exiting |
| `refused` | Another mod's hook on `ui.notify` answered without sending |

Namespaces for outside access:

| Namespace | What it does |
|-----------|--------------|
| `$.fs` | `read`, `write`, `exists`, `stat`, `list` (non-recursive; entries `{ name, kind, size, isLink }`) |
| `$.process` | `run(['git', 'status'])` (argument list, no shell, resolves `{ exitCode, stdout, stderr }`); `spawn` streams output |
| `$.http` | `fetch(url, init)` over http/https, resolves `{ status, ok, headers, text }` |
| `$.store` | JSON key-value store of the plugin's own |
| `$.env` | `get`, `set` (write the name as a string literal) |
| `$.settings` | `read()` resolves to all settings merged into one object; `read({ source })` to one source (`user`, `project`, `local`, `flag`, `policy`); `read({ key })` to one top-level key's merged value (`undefined` when unset); both together to that key in that source. `key` needs v2.1.304+ |
| `$.session` | `messages()`, working directory, model, `usage()`, etc. |
| `$.mcp` | `call` a tool on a connected MCP server |

Sessions: `$.session.send({ to, text })` with `to` of `{ sessionId }`, `{ agentId }` (from `$.agent.list()`), or the string address of a received message; resolves `{ isDelivered: true }` or `{ isDelivered: false, reason }`. `session.receive` / `session.send` events observe messages (`e.origin.kind` such as `peer`, `peer-send-message`, `task-notification`, `scheduled-trigger`, `model`, `plugin`).

Timers:

```javascript
$.clock.every(60_000, async () => {
  const status = await $.process.run(['gh', 'pr', 'checks', '--json', 'state'])
  $.ui.status('checks: ' + summarize(status.stdout))
})
```

## Notes

- Register commands and tools in `session.start`; Claude Code waits for that hook before the first prompt. `$.command.register` throws for a taken name (e.g. `"/focus" refused: it is the built-in /focus`), and a throwing hook is skipped, so register commands last or wrap in `try` / `catch`.
- A command's returned `text` prints in the transcript and Claude reads it; return `{}` to print nothing. Add `immediate: true` to the registration to let it run while Claude is working.
- `isDeferred: false` on `$.tool.register` loads the tool upfront when MCP tool search would defer it (v2.1.293+; earlier versions ignore it).
- `$.model.*` calls use the session's credentials and bill to the user's plan, API key, or cloud provider. A Claude API failure does not reject the call: check `r.isAnswered` and read `r.reason`. Arrays of blocks need v2.1.292+. Cache TTL comes from user settings (`subagentPromptCacheTtl` for one hour); at most four breakpoints per request. Prefer `prompt` over `system` for static content when requests may go through Bedrock, Claude Platform on AWS, Google Cloud's Agent Platform, Microsoft Foundry, or an LLM gateway, or when other people run the mod.
- In a `model.complete` event hook, `e.prompt` / `e.system` are strings; `e.promptBlocks` / `e.systemBlocks` are the caller's arrays. A hook that changes the start of `prompt` removes the caller's breakpoints.
- `$.clock.every` / `$.clock.after` replace `setInterval` / `setTimeout` (delay in ms first); each returns a timer with `cancel()`. Timers stop when the module reloads. Callback errors go to the debug log and the timer runs again.
- `$.prompt.submit({ text })` starts a turn from a background job (Claude sees a sentence naming your mod as sender; `asUser: true` omits it). It waits until the session is idle, so do not await it in a handler that runs while Claude is working.
- The hooks module has no Node.js APIs, no `setTimeout`, no network or file access of its own; `URL`, `TextEncoder`, `AbortController`, `crypto.subtle` are available. Pass `next.signal` to long-running work.
- `$.process.run` rejects if the program cannot start or exceeds the timeout (30 s default). `$.http.fetch` drops all but `accept`, `accept-language`, `content-type`, `user-agent` headers on a cross-origin redirect.
- Every API call is also an event named without `$.` (e.g. `fs.read`); an earlier mod can observe, rewrite, or refuse it. A mod can refuse `$.process.spawn` after the command ran; the call then rejects with `$.process.spawn started, and a plugin withheld its result:` or `... ran, and a plugin withheld its result:`.
- A session set to refuse inbound messages refuses before `session.receive` fires. Do not base decisions on a received message's sender name.

### Calls after the user interrupts a turn

- After the user stops a running turn (Esc or **Stop**), calls that start new work are refused until the user's next input with the reason `the session was stopped and nobody has sent input since`. Apart from `$.prompt.submit` and `$.command.run`, this handling needs v2.1.304+.
- Refused `$.prompt.submit` resolves `{ drop: '<reason>' }`; refused `$.command.run` rejects with a message ending in the reason; refused `$.agent.spawn` resolves `{ deny: '<reason>' }`; refused `$.session.send` resolves `{ isDelivered: false, reason }`; refused `$.tool.call` of Bash with `run_in_background: true`, Monitor, or CronCreate resolves `{ deny: '<tool> was not run: ...' }`.
- Queued prompts and commands are dropped (`the prompt was removed from the queue before it ran` / `the command was removed from the queue before it ran`). Nothing retries them: keep the arguments and call again from a `turn.complete` hook.
- In `claude -p` and Agent SDK runs a refusal reason can also be `the run reached its --max-turns limit` (mod prompts refused from v2.1.299; subagent turns counted from v2.1.304), `the run is past its --max-budget-usd limit`, or `the host has ended its input`. A `claude -p` run whose mod submits a prompt at the end of every turn never exits without `--max-turns` or `--max-budget-usd`.
- `$.tool.call` that needs a person's approval (for example a hook or your organization answered `ask`) resolves with `{ deny: "<tool> wasn't run: this call needs a person's approval, and a mod's own call can't ask for it." }`.

### Changes from the changelog

- 2.1.325: `/cost`, `$.session.usage()`, `--max-budget-usd` and the cost and token metrics count a mod's `$.model.complete` and `$.model.classify` calls.
- 2.1.318: `$.model.fork` takes an `effort` option, so a quick side job can run at `low` whatever effort the session uses; the result reports the effort sent.
- 2.1.321: a mod's own tool calls (`$.tool.call`, `$.mcp.call`) raise no permission prompt, even under your own ask rules or in `dontAsk` and `-p` runs; deny rules and organization policy still apply.
- 2.1.304: mods' `settings.read` hooks receive each settings layer and can rewrite the merged settings, so a managed mod can make an organization's setting a ceiling.
- Source: https://code.claude.com/docs/en/plugins/mods/api.md (retrieved 2026-11-14)
- Source: https://code.claude.com/docs/en/changelog.md (2.1.325, 2.1.321, 2.1.318, 2.1.304, retrieved 2026-11-14)

## Related

- [React to events](./events.md)
- [Draw in the interface with a mod](./interface.md)
- [Mods reference](./reference.md)
- [Test a mod](./test.md)
