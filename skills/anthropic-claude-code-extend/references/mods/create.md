<!-- source: https://code.claude.com/docs/en/plugins/mods/create / last verified: 2026-11-14 -->

# Create a mod

Have Claude write a mod from a description, or write one yourself: a plugin whose `hooks/hooks.json` names a hooks module that exports `register`. Requires Claude Code v2.1.287+.

## Signature / Usage

```json
// first-mod/.claude-plugin/plugin.json
{
  "name": "first-mod",
  "version": "0.1.0",
  "description": "Counts Claude's tool calls, shows the count beside the spinner, and adds a /tally command",
  "author": { "name": "Your Name" }
}
```

```json
// first-mod/hooks/hooks.json
{
  "description": "The first-mod hooks module",
  "modules": ["./register.js"]
}
```

```javascript
// first-mod/hooks/register.js
let calls = 0

export function register(on) {
  on('session.start', async ($, e, next) => {
    await $.command.register({
      name: 'tally',
      description: 'Show how many tool calls Claude has made',
    })
    return next(e)
  })

  on('tool.call', async ($, e, next) => {
    calls += 1
    $.ui.invalidate('ui.render')
    return next(e)
  })

  on('command.run', { command: 'tally' }, async () => {
    return { text: 'Claude has made ' + calls + ' tool calls since this mod loaded' }
  })

  on('ui.render', { component: 'Spinner' }, async ($, e, next) => {
    return next({ ...e, props: { ...e.props, suffix: ' · tool calls: ' + calls + '…' } })
  })
}
```

```bash
claude --plugin-dir ./first-mod          # load for one session, hot-reloads on save
claude -p "/tally" --plugin-dir ./first-mod
claude plugin validate ./first-mod
claude plugin test
```

## Options / Props

Every hook receives three arguments:

| Argument | Meaning |
|----------|---------|
| `$` | The mods API, in namespaces such as `$.ui` and `$.command` |
| `e` | The event's input as plain data |
| `next` | Passes the event to other mods and then Claude Code's own behavior; returns the result |

Type declarations Claude Code writes into `.claude-plugin/types/` for a mod loaded from `--plugin-dir` (interactive) or written by Claude:

| Path | What it declares |
|------|------------------|
| `claude-code/index.d.ts` | Every event, mods API namespace/method, and elements per surface |
| `claude-code-tools/index.d.ts` | Built-in tools' inputs and results (narrows on `e.tool === 'Bash'`) |
| `claude-code-mcp/index.d.ts` | Inputs of MCP tools connected at the last save |
| `index.d.ts` in a directory named for a plugin | What a plugin listed under `dependencies` adds to the mods API |
| `tsconfig.json` | Compiler options for a hooks module |

Rules for static analysis (`claude plugin validate`):

- Write each mods API call in full: `$`, namespace, method (`$.store.get('notes')`). Do not assign `$` or a namespace to a variable, destructure it, or index it dynamically (`const ui = $.ui` fails).
- `$` may be passed to a top-level function of the same file only; passing it to a method, inner function, or imported function fails (except `$.state` helpers `read` / `update`).
- Event names in `on` must be string literals; do not shadow `on` inside `register`.
- Import only relative files inside the plugin directory; the one bare import allowed is `claude-code`. Use top-level `import` declarations, not dynamic `import()` or `require`.

## Notes

- Ask Claude for a mod: it uses the built-in `plugin-authoring` skill (or run `/plugin-authoring`). It writes to `~/.claude/dev-mods/<session-id>/<mod>/`. When Claude saves the first file, Claude Code asks whether to enable hot reloading for the session. Answer **Turn them on** to load the mods in the session's mods folder when the turn ends and reload them at the end of each turn that changes them (the answer lasts for the session, including after a resume), or **Not now** to load nothing until the session next starts (delete the mod's directory to keep it from ever loading).
- In `default` and `acceptEdits` permission modes Claude Code asks before each file creation because the mods folder is a protected path; a `--plugin-dir` directory is also a protected path.
- A mod Claude wrote loads only in the session that made it, and its folder is deleted after `cleanupPeriodDays`. Copy it elsewhere and use `claude --plugin-dir` or a marketplace to keep it.
- In `auto` and `bypassPermissions` modes Claude Code can enable hot reloading without asking, and the mods load when the turn ends; mods already in a resumed session's mods folder also load without asking (interactive or `claude -p`). To be asked first, start in `default` or `acceptEdits` mode.
- A mod Claude writes does not load when nobody can approve (the session is in `dontAsk` mode, or it is the `claude -p` run that writes the mod in `default` or `acceptEdits` mode), the workspace is untrusted in an interactive session, or mods are disabled (`--safe-mode`, `--bare`, `disableAllHooks`, managed settings).
- Each reload re-runs `register`, so module-level variables reset. Keep values across reloads with `$.state` or `$.store`.
- `claude plugin validate` prints `hooks:` / `calls:` lines (plus `env reads:`, `env writes:`, `state reads:`, `state writes:`, and `gating hook without .catch: <event>` when relevant). A misspelled event reports an error such as `"tool.calls" is not an event`.
- Types for your build override any documentation page when they disagree; events and methods can change between releases.
- Claude Code caches an installed plugin by version, so increment the version to push edits to an installed copy. `claude plugin validate` fails a `name` that looks like one of Anthropic's own (for example starting with `claude-`).
- Tests: `claude plugin test` runs `*.test.ts` files with `claude-code/testing` (see the Test page).
- If your mod has no `tsconfig.json`, Claude Code adds one at the mod's root that extends the generated one, so an editor and `tsc -p ./first-mod` type-check it. `claude plugin validate` fails `$` passed to a function declared inside `register` or the hook; the `read` and `update` state helpers are the imports that can take it. A function you pass `$` to is shown as `$.store.get (via loadNotes)` in `calls:`.

### Changes from the changelog

- 2.1.323: the "Not now" choice when Claude Code asks to turn on the mods it writes in a session now says when they load. `claude plugin validate` reports the `$` nouns a mod's `engine.create` hook adds, withholds, or replaces.
- 2.1.321: mods Claude writes turn on without asking in auto and bypass modes, even with managed `allowUnsandboxedCommands: false` or `allowManagedDomainsOnly`, and don't load in `dontAsk` mode.
- 2.1.304: the `claude plugin validate` notes that predicted where a mod's hooks would run were removed.
- Source: https://code.claude.com/docs/en/plugins/mods/create.md (retrieved 2026-11-14)
- Source: https://code.claude.com/docs/en/changelog.md (2.1.304, 2.1.321, 2.1.323, retrieved 2026-11-14)

## Related

- [Mods overview](./overview.md)
- [React to events](./events.md)
- [Use the mods API](./api.md)
- [Test a mod](./test.md)
- [Troubleshoot a mod](./troubleshoot.md)
