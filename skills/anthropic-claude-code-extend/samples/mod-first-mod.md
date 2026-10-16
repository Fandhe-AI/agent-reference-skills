<!-- source: https://code.claude.com/docs/en/plugins/mods/create.md / last verified: 2026-10-17 -->

# Mod: first-mod

A three-file mod that counts Claude's tool calls, shows the count beside the spinner, and adds a `/tally` command.

```text
first-mod/
├── .claude-plugin/
│   └── plugin.json
└── hooks/
    ├── hooks.json
    └── register.js
```

```json first-mod/.claude-plugin/plugin.json
{
  "name": "first-mod",
  "version": "0.1.0",
  "description": "Counts Claude's tool calls, shows the count beside the spinner, and adds a /tally command",
  "author": { "name": "Your Name" }
}
```

```json first-mod/hooks/hooks.json
{
  "description": "The first-mod hooks module",
  "modules": ["./register.js"]
}
```

```javascript first-mod/hooks/register.js
// The count, shared by the hooks below
let calls = 0

// Claude Code calls this once when the mod loads
export function register(on) {
  // Runs when the session starts, before your first prompt
  on('session.start', async ($, e, next) => {
    // Add the /tally command
    await $.command.register({
      name: 'tally',
      description: 'Show how many tool calls Claude has made',
    })
    // Let the session start as usual
    return next(e)
  })

  // Runs each time Claude is about to use a tool
  on('tool.call', async ($, e, next) => {
    calls += 1
    // Ask Claude Code to draw the interface again, so the new count shows
    $.ui.invalidate('ui.render')
    // Let the tool run as usual
    return next(e)
  })

  // Runs when you type /tally, and only then, because of the matcher
  on('command.run', { command: 'tally' }, async () => {
    // The text to print in the transcript
    return { text: 'Claude has made ' + calls + ' tool calls since this mod loaded' }
  })

  // Runs each time Claude Code draws the spinner
  on('ui.render', { component: 'Spinner' }, async ($, e, next) => {
    // Keep Claude Code's spinner, with the count added after its word
    return next({ ...e, props: { ...e.props, suffix: ' · tool calls: ' + calls + '…' } })
  })
}
```

Load it for one session, or check the command non-interactively:

```bash
claude --plugin-dir ./first-mod
claude -p "/tally" --plugin-dir ./first-mod
claude plugin validate ./first-mod
```

## Notes

- A mod is a plugin whose `hooks/hooks.json` has a `modules` key pointing to the hooks module; this is distinct from settings hooks (shell-command hooks, see hooks.md in the hook reference). Requires Claude Code v2.1.287 or later.
- Every hook receives `$` (mods API), `e` (event), and `next` (pass the event on). Return `next(e)` to observe, return a result without calling `next` to answer, or call `next` with a modified copy to rewrite.
- `--plugin-dir` hot-reloads the hooks module on file change; each reload runs `register` again, so `calls` resets to `0`.
- Write the event name in each `on` call as a string literal so static analysis in `claude plugin validate` can find every hook.
