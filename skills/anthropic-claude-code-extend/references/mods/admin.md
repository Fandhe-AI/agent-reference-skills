<!-- source: https://code.claude.com/docs/en/plugins/mods/admin / last verified: 2026-10-17 -->

# Manage mods for your organization

Control mods through managed settings: stop user-installed mods, allow only the organization's own, review what a mod can do, and enforce policy with a policy mod. Mods are on by default in Claude Code v2.1.286+.

## Signature / Usage

Stop every user-brought mod from running its hooks (option on the built-in guard):

```json
{
  "pluginConfigs": {
    "cc-plugin-sec-default@builtin": {
      "options": {
        "allowManagedModsOnly": true
      }
    }
  }
}
```

Allow only the organization's mods and run a policy mod first:

```json
{
  "extraKnownMarketplaces": {
    "acme-tools": {
      "source": { "source": "directory", "path": "/opt/acme/claude-plugins" }
    }
  },
  "enabledPlugins": { "acme-guard@acme-tools": true },
  "prependPlugins": ["acme-guard@acme-tools", "sec-default@builtin"],
  "pluginConfigs": {
    "cc-plugin-sec-default@builtin": {
      "options": { "allowManagedModsOnly": true }
    }
  },
  "disableSideloadFlags": true
}
```

Review a mod without running it:

```bash
claude plugin validate ./some-mod
```

```text
  ❯ ./register.js hooks: session.start, tool.call, ui.render{component=Pane}
  ❯ ./register.js calls: $.fs.read, $.http.fetch, $.store.set, $.ui.open
```

## Options / Props

Policy table:

| What you want | Settings |
|---------------|----------|
| No installed mod runs, settings hooks untouched | `allowManagedModsOnly`; deploy no mods of your own |
| No installed mods and no hooks at all, managed hooks included | `disableAllHooks: true` |
| Only your organization's mods | Guard's `allowManagedModsOnly` and install your mods so they count as yours |
| Any mod from approved marketplaces | Keep marketplace restrictions and set `disableSideloadFlags: true` |
| Any mod, with your own mod checking the others | Install your mod and list it with `sec-default@builtin` in `prependPlugins` |

Settings:

| Setting | Effect |
|---------|--------|
| `allowManagedModsOnly` | Option on the guard: users' own mods refused; settings hooks, status lines, `/goal` keep working |
| `allowModsToOverrideDenyRules` | Option on the guard: a user's mod may approve a call a `deny` rule refuses (unset: deny rules take precedence) |
| `allowManagedHooksOnly` | Only the organization's mods and built-in mods load; also blocks hooks in users' own settings files |
| `disableAllHooks` | In managed settings stops mods in every installed plugin (yours included) and every settings-file hook; custom status lines and `/goal` stop |
| `disableSideloadFlags` | Rejects `--plugin-dir` and `--plugin-url` (also `--agents`, `--mcp-config`) and keeps Claude-written mods from loading |
| `prependPlugins` / `appendPlugins` | Plugin ids run before / after users' mods, in listed order |

What a user can load by plugin controls:

| Your plugin controls | What a user can load as a mod |
|----------------------|-------------------------------|
| None | Any marketplace, any `--plugin-dir`, Claude-written mods |
| Marketplace allowlist | Allowed marketplaces or `--plugin-dir`; Claude-written mods only when the allowlist includes `skills-dir` |
| Allowlist and `disableSideloadFlags` | Only allowed marketplaces |

Calls to look for in `calls:`:

| Call | Meaning |
|------|---------|
| `$.fs.read`, `$.fs.write` | Reads / writes files anywhere the user can |
| `$.process.run`, `$.process.spawn` | Starts programs as the user |
| `$.http.fetch` | Network requests |
| `$.env.get`, `$.settings.read` | Reads env vars and settings (may hold API keys); `env reads:` names each variable |
| `$.env.set` | Sets an env var for Claude Code and everything it starts; `env writes:` names each |
| `$.mcp.call` | Calls a connected MCP server tool under session permission rules |
| `$.model.complete` | Uses the user's plan or API key |
| `$.prompt.submit` | Submits a prompt, possibly as the user's own words |
| `$.session.send` | Messages another session, subagent, or teammate |

Hooks lines: `tool.call` / `prompt.submit` mean the mod sees and can change every tool call / prompt; `session.append` can rewrite each conversation row; `ui.render{component=AskUserQuestion}` can redraw the question dialog; `tool.check` can approve or deny a call before a permission prompt.

A mod counts as the organization's only when all hold: managed `enabledPlugins` sets it `true`; managed settings name its marketplace as a directory on the machine by absolute path (an `extraKnownMarketplaces` entry does that); the marketplace lists the plugin by a relative path so Claude Code loads it in place.

Policy mod using `plugin.register`:

```javascript
// acme-guard/hooks/register.js
const BLOCKED_CALLS = ['process.run', 'process.spawn']

export function register(on) {
  on('plugin.register', async ($, e, next) => {
    const blocked = e.uses.calls.filter((call) => BLOCKED_CALLS.includes(call))
    if (e.tier === 'user' && blocked.length > 0) {
      return { refuse: 'Acme policy: mods may not call ' + blocked.join(', ') }
    }
    return next(e)
  })

  on('tool.call', async ($, e, next) => {
    $.ui.log('audit tool.call ' + e.tool, { to: 'debug' })
    return next(e)
  })

  on('fs.write', async ($, e, next) => {
    $.ui.log('audit fs.write by ' + next.origin.plugin + ' ' + JSON.stringify(e.path), { to: 'debug' })
    return next(e)
  })
}
```

Fail closed with `.catch`:

```javascript
on('plugin.register', checkMod).catch(async ($, e, next) => {
  if (e.tier !== 'user') return next(e)
  return { refuse: 'Acme policy check failed, so this mod was not loaded' }
})
```

## Notes

- Default behavior: mods are on; the built-in guard `sec-default@builtin` (shown as `cc-plugin-sec-default`) loads ahead of every user mod and cannot be turned off, when the machine has managed settings or the user signs in with a Team or Enterprise plan (API key, Bedrock, Google Cloud's Agent Platform, or Microsoft Foundry users get it only with managed settings). It protects managed hooks' inputs/decisions, the system prompt, managed `CLAUDE.md` and instructions, what mods read as settings, and managed MCP servers' tools and descriptions.
- Deny rules and managed `PreToolUse` hooks apply to Claude's tool calls only, not to a mod's own `$.fs` / `$.process` calls (with `Read(.env)` denied a mod can still `$.fs.read` it). To limit those, keep user mods from loading or handle the call in a policy mod. A user's mod can approve calls an `ask` rule would prompt for or a non-managed `PreToolUse` hook blocked; in auto mode an approved call skips the classifier.
- Managed `PreToolUse` hooks run before any mod sees a tool call and again on a rewritten call; other `PreToolUse` hooks run after the last mod.
- Network: if the policy does not allow WebFetch, every mod's `$.http.fetch` is refused. Turning WebFetch off with `CLAUDE_CODE_DISABLE_WEB_FETCH` or a `WebFetch` deny rule does not stop mods' `$.http.fetch`; hook `http.fetch` in a policy mod (with a refusing `.catch`) or block user mods. `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC` stops only built-in mods and fetches carrying Anthropic credentials (before v2.1.288 it stopped every mod's fetch). Nothing here covers programs a mod starts with `$.process.run`.
- Guard options are read only from managed settings under `cc-plugin-sec-default@builtin` in `pluginConfigs` (`prependPlugins` accepts `sec-default@builtin` too; `pluginConfigs` does not). If you set `prependPlugins`, name the guard in it or neither option applies. The guard fails closed: unreadable managed settings refuses every user mod; an unchecked deny rule refuses the call.
- A plugin Claude Code copies into its cache (GitHub, git, URL, or npm source) counts as a user's even when managed `enabledPlugins` enables it: `prependPlugins` / `appendPlugins` skip it, `allowManagedModsOnly` refuses it, `allowManagedHooksOnly` blocks it. Make the marketplace directory and parents admin-writable only; managed settings from the claude.ai admin console carry the keys but cannot place the directory on a machine.
- `prependPlugins` / `appendPlugins` are read only from managed settings; users may set them in `~/.claude/settings.json` only on a machine with no managed settings and not signed in with Team/Enterprise. Setting `prependPlugins` replaces the default, so name `sec-default@builtin`. Debug log confirms: `hooks module acme-guard@acme-tools loaded ... tier prepend`, or `prependPlugins names ..., which is not an enabled managed plugin with a hooks module; skipped`.
- `CLAUDE_CODE_ENABLE_FUNCTION_HOOKS=0` from early access is ignored in v2.1.287+; replace it with `allowManagedModsOnly`.
- `--safe-mode` turns installed mods off, yours included; three worker crashes unload every non-built-in mod (yours too) until `/reload-plugins`. A `plugin.register` hook that throws or times out is skipped, so the check fails open unless a `.catch` handler refuses.
- Built-in mods are not affected by these settings; each has its own switch (see Mods overview).

## Related

- [Mods overview](./overview.md)
- [Mods reference](./reference.md)
- [React to events](./events.md)
- [Test a mod](./test.md)
- [Troubleshoot a mod](./troubleshoot.md)
