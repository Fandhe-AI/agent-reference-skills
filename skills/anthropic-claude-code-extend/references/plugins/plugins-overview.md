<!-- source: https://code.claude.com/docs/en/plugins/overview.md / last verified: 2026-10-17 -->

# Plugins overview

A Claude Code plugin is a directory of skills, agents, hooks, MCP servers, or other components that Claude Code installs and loads as one unit. Most plugins come from a marketplace (a catalog listing plugins and where to fetch each).

## Signature / Usage

```text
/plugin                                              # Discover tab lists plugins from your marketplaces
/plugin install commit-commands@claude-plugins-official
claude plugin disable <plugin>                       # stop it without uninstalling
```

Manifest location: `.claude-plugin/plugin.json` (name, optional version / description / metadata). Components a plugin can hold:

| Component | What it is |
| --- | --- |
| Skills | `SKILL.md` instructions Claude loads when relevant; also runnable as a command (e.g. `/my-plugin:review`) |
| Agents | Subagent definitions Claude can delegate to |
| Hooks | Commands run at lifecycle points (e.g. after every edit) |
| Hooks module (mod) | Hooks written as JavaScript functions; can draw panes and add commands. A plugin that has one is called a mod |
| MCP servers | Tool servers connected while the plugin is enabled |

## Options / Props

| Install scope | Enabled for |
| --- | --- |
| User | You, in every project on this computer |
| Project | Everyone in the repository via committed `.claude/settings.json`; each collaborator still installs it on their own machine |
| Local | You, in this repository only |

| Marketplace tier | Meaning |
| --- | --- |
| Official | Anthropic official names, e.g. `claude-plugins-official`, demo `claude-code-plugins`; accepted only for sources under `github.com/anthropics/` |
| Community | Anthropic community names, e.g. `claude-community` |
| Third-party | Every other marketplace, including one your coworker or organization publishes |

| Layer an installed plugin must be present in | Where |
| --- | --- |
| Settings | Lists added marketplaces and enabled plugins |
| Disk | `~/.claude/plugins/` |
| Session | Plugins load at startup or when reloaded |

## Notes

- Skills, subagents, hooks, and MCP servers work without a plugin; use a plugin to package several as one unit, share with teammates, or publish versioned releases.
- An enabled plugin is part of every session: for each skill, agent, and command Claude can invoke on its own, name and description are in context every turn (counts toward usage and the context window). Full text loads only on use.
- MCP servers a plugin defines run alongside each session where it is enabled, and its hooks fire at their events. What a plugin runs, it runs as you.
- Plugins in Anthropic's official marketplace show a **Context cost** estimate in the `/plugin` details pane before install.
- Claude Code adds the official marketplace the first time you start an interactive terminal session, unless a managed policy blocks it. Community and demo marketplaces are not added automatically.
- A plugin marketplace is not Claude Marketplace (claude.com/marketplace, a website). Claude Code in VS Code / JetBrains is an extension, not a Claude Code plugin.
- A cloud session (including claude.ai/code) does not load plugins from local settings.
- While developing, no marketplace is needed: load a plugin from its folder with `--plugin-dir`.

## Related

- [Create plugins](./plugins.md)
- [Plugin components](./plugin-components.md)
- [Plugin security and trust](./plugin-security.md)
- [Anthropic's marketplaces](./anthropic-marketplaces.md)
- [Plugin loading reference](./plugin-loading.md)
- [Manage plugins for your organization](./plugins-org.md)
