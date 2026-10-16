<!-- source: https://code.claude.com/docs/en/plugins/measure.md / last verified: 2026-10-17 -->

# Measure plugin cost and usage

See a plugin's token cost, check whether it is still used, and pick telemetry events for organization-wide plugin questions.

## Signature / Usage

```bash
# run in your shell, not at the Claude Code prompt
claude plugin details formatter
claude --plugin-dir ./formatter plugin details formatter
```

```text
Component inventory
  Skills (3)  format-all, format-code, lint-fix
  Agents (1)  style-reviewer
  Hooks (1)  PostToolUse  (harness-only — no model context cost)
  MCP servers (1)  formatter-tools  (tool schemas resolved at runtime; not counted)
Projected token cost
  Always-on:   ~146 tok   added to every session
```

## Options / Props

| Output section | Meaning |
| --- | --- |
| Component inventory | What Claude Code found; commands counted with skills; hooks and MCP servers get no cost estimate |
| Always-on | Tokens from names plus `description` and `when_to_use` of skills, agents, commands, added to every session |
| Per-component | Always-on share and on-invoke cost (body loaded only when it runs) |

| Usage signal (user runs on own machine) | Detail |
| --- | --- |
| `/plugin` Installed tab, **Not used recently** | After at least 14 days and 10 sessions unused; details show `Last used:` |
| `/skill-doctor` | Skill cost and use; flags never-invoked skills; opens the `/plugin` **Stats** tab in interactive sessions |
| `/doctor` | Recommends disabling unused skills, MCP servers, plugins |
| `/usage` | Share of usage by skills, subagents, plugins, MCP servers (Pro, Max, Team, Enterprise) |

| Fleet question | OpenTelemetry event / attribute |
| --- | --- |
| Which plugins get installed | `claude_code.plugin_installed` |
| Active in how many sessions | `claude_code.plugin_loaded` |
| Which skills activate | `claude_code.skill_activated` (`plugin.name`, `marketplace.name`) |
| What hooks report | `claude_code.hook_plugin_metrics` (official-marketplace plugin hooks only) |
| API spend | `plugin.name` / `marketplace.name` on the cost counter |

## Notes

- To lower the always-on figure: shorten skill and agent descriptions; split large plugins. Shorter descriptions can stop skills triggering, so verify with a `tool_used: Skill` grader in an eval suite.
- Plugins in the official marketplace show **Context cost** (`Every turn:` / `When invoked:`) in the `/plugin` details pane; highlighted at 2,000 tokens or more. Plugins in your own marketplace have none.
- To see MCP tool cost, run `/context` in a session and read the `MCP tools` category. Token counts are estimates.
- Claude Code does not report usage back to plugin authors; usage is recorded on each installer's machine.
- **Not used recently** never applies to `--plugin-dir` / skills-directory plugins, managed-settings or seed-directory plugins, plugins containing a theme, output style, monitor, or workflow; an LSP plugin whose server is active counts as used. It is hidden when `strictKnownMarketplaces` is set.
- Non-official plugin names are redacted in telemetry by default (`third-party`, or omitted; `skill.name` is `custom_skill`); set `OTEL_LOG_TOOL_DETAILS=1` for real names. `plugin_id_hash` still identifies each plugin on `plugin_loaded`.
- Enterprise plan Analytics API: `GET /v1/organizations/analytics/plugins` returns per-plugin per-day install and invocation counts across Claude Code and Cowork; requires an API key with the `read:analytics` scope.

## Related

- [Plugin security and trust](./plugin-security.md)
- [Test plugins with evals](./plugin-evals.md)
- [Plugin components](./plugin-components.md)
