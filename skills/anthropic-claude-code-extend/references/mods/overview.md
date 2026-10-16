<!-- source: https://code.claude.com/docs/en/plugins/mods/overview / last verified: 2026-10-17 -->

# Mods overview

A mod is a plugin made of JavaScript or TypeScript event handlers (hooks) that Claude Code calls inside its own process, so it can draw interface, rewrite tool calls and prompts, and add commands. Requires Claude Code v2.1.287+ in the terminal (Desktop app: v2.1.286+).

## Signature / Usage

```text
first-mod/
├── .claude-plugin/
│   └── plugin.json
└── hooks/
    ├── hooks.json
    └── register.js
```

```javascript
// hooks/register.js
let calls = 0

export function register(on) {
  on('tool.call', async ($, e, next) => {
    calls += 1
    $.ui.invalidate('ui.render')
    return next(e)
  })

  on('ui.render', { component: 'Spinner' }, async ($, e, next) => {
    return next({ ...e, props: { ...e.props, suffix: ' · tool calls: ' + calls + '…' } })
  })
}
```

```bash
# Install a mod (a plugin) from a marketplace
claude plugin install token-chart@your-org
# Inspect what a mod handles and calls without running it
claude plugin validate ./some-mod
```

## Options / Props

What a hook can do with an event:

| Choice | Meaning |
|--------|---------|
| Observe | Note the event and return `next(e)` unchanged |
| Rewrite | Call `next` with a modified copy of the event |
| Answer | Return a result without calling `next`; the usual behavior does not run |

Where mods run:

| Where you run Claude Code | Hooks run | What the mod draws appears |
|---------------------------|-----------|----------------------------|
| `claude` in a terminal (incl. editor terminal, JetBrains plugin) | Yes | Yes |
| Code tab of the Desktop app, except WSL | Yes | Yes, except terminal-only elements |
| WSL session in the Desktop app | No (plugins unavailable) | No |
| VS Code extension chat panel | Yes | Yes, extension 2.1.299+ in a session that fetches feature flags |
| `claude -p` and the Agent SDK | Yes | No |
| Remote Control | Yes, in the session on your machine | In the terminal on your machine |
| Cloud session | Yes, for a plugin that reaches the cloud session | No |

Mods vs. other extension points:

| | Mod | Settings hook | Skill | MCP server |
|---|-----|---------------|-------|------------|
| What it is | Functions in a plugin run in Claude Code's process | Shell command, HTTP request, or prompt on a lifecycle event | `SKILL.md` instructions | External process/service giving tools |
| Can draw in the interface | Yes | No | No | No |
| What you write | JavaScript or TypeScript | Script and `settings.json` entry | Markdown | Server in any language |

Built-in mods (shown under **Built-in** in `/plugin`):

| Name in `/plugin` | What it does |
|-------------------|--------------|
| `cc-plugin-agents-md` | Loads `AGENTS.md` as project instructions |
| `cc-plugin-diff` | Takes over `/diff` and draws its pane |
| `cc-plugin-plugin-authoring` | Provides the `plugin-authoring` skill for writing mods |
| `cc-plugin-sec-default` | Guards what the organization manages from user-installed mods |
| `cc-plugin-telemetry` | Sends analytics records of Claude Code and built-in mods |
| `cc-plugin-you-should-know` | Side agent shows a note above the prompt (off until enabled) |

Turning mods off:

| Scope | How |
|-------|-----|
| One mod | Disable or uninstall its plugin in the **Installed** tab of `/plugin` |
| Every installed mod, one session | `claude --safe-mode` |
| Every installed mod, every session | `"disableAllHooks": true` in `~/.claude/settings.json` |

## Notes

- A mod runs with the user's permissions and is not sandboxed. It can read/write files, start processes, make network requests, read environment variables and settings (including API keys), see every prompt and tool call, approve tool calls before the user is asked, and spend the user's model usage. Install mods only from trusted authors and marketplaces.
- A mod cannot change the permission prompt. Sandboxing isolates Bash commands Claude runs, but a process a mod starts runs outside it.
- On these pages "hook" means a mod's handler; the settings-file kind is a "settings hook".
- `/plugin` shows a line such as `1 mod active · first-mod`; built-in mods are omitted from it. After installing from the shell while a session is open, run `/reload-plugins`.
- `disableAllHooks` and the organization's `allowManagedModsOnly` stop only the mod; the plugin's skills, commands, agents, and MCP servers still load. `--safe-mode`, `--bare`, and `disableAllHooks` do not stop built-in mods.
- `CLAUDE_CODE_ENABLE_FUNCTION_HOOKS` from early access is ignored in v2.1.287+; setting it to `0` does not keep mods off.
- Sample mods (unsupported) live in `claude-code/mods` of the `anthropics/claude-code-playground` repo: `token-weather`, `blast-radius`, `replay-theater`. Built-in mod sources are in the `mods` directory of the `anthropics/claude-code` repo (`diff`, `agents-md`, `sec-default`, `telemetry`).
- Try a mod for one session with `claude --plugin-dir <dir>`.

## Related

- [Create a mod](./create.md)
- [Draw in the interface](./interface.md)
- [React to events](./events.md)
- [Use the mods API](./api.md)
- [Test a mod](./test.md)
- [Troubleshoot a mod](./troubleshoot.md)
- [Manage mods for your organization](./admin.md)
- [Mods reference](./reference.md)
