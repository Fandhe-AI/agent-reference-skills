<!-- source: https://code.claude.com/docs/en/sandbox-environments.md / last verified: 2026-08-07 -->

# Choose a sandbox environment

Compares Claude Code isolation options — from the built-in per-command Bash sandbox to a fully separate virtual machine — and how to pick one for a threat model.

## Options / Props

| Approach | What is isolated | Requires Docker | Setup effort |
|---|---|---|---|
| Sandboxed Bash tool | Bash commands and child processes only | No | Minimal (macOS) / low (Linux, WSL2) |
| Sandbox runtime (`@anthropic-ai/sandbox-runtime`) | Whole Claude Code process: file tools, MCP servers, hooks | No | Low |
| Dev container | Full development environment | Yes | Medium |
| Custom container | Full development environment | Yes | Medium–high |
| Virtual machine | Full operating system | No | High |
| Claude Code on the web | Full OS, hosted by Anthropic | No | None (needs Claude subscription, GitHub for web launch) |

| Goal | Start with |
|---|---|
| Reduce prompts on your own machine | Sandboxed Bash tool via `/sandbox` |
| Unattended work with `--dangerously-skip-permissions` / auto mode | Dev container, any container/VM, or the sandbox runtime |
| Isolate MCP servers and hooks too, without Docker | Sandbox runtime |
| Work on an untrusted repository | Dedicated VM, or Claude Code on the web |
| Standardize across a team | Dev container committed to the repo |
| No local setup device | Claude Code on the web |

## Example

```json
// ~/.srt-settings.json
{
  "allowWrite": ["$PROJECT_DIR", "~/.claude", "~/.claude.json", "/tmp"],
  "allowedDomains": ["api.anthropic.com", "claude.ai", "platform.claude.com"]
}
```

```bash
npx @anthropic-ai/sandbox-runtime claude
```

## Notes

- The sandboxed Bash tool alone does **not** cover file tools (Read/Edit/WebFetch — gated by permission rules instead), MCP servers, or hooks, which run unconstrained on the host; use the sandbox runtime or a container/VM to put the whole process behind one OS boundary.
- `--dangerously-skip-permissions` removes prompts entirely except explicit `ask` rules, org-`ask` connector tools, `requiresUserInteraction` MCP tools, and `rm -rf /`/`~` circuit breakers — always pair it with a container, VM, or the sandbox runtime.
- Auto mode's classifier is a per-action control, not an isolation boundary; it adds defense in depth but doesn't require an isolation boundary the way `--dangerously-skip-permissions` does.
- Sandbox runtime: denies network by default, confines writes to built-in runtime paths; configure `~/.srt-settings.json` (or `--settings`) with `allowWrite` for the project dir, `~/.claude`, `~/.claude.json`, `/tmp`, and `allowedDomains` for `api.anthropic.com`/`claude.ai`/`platform.claude.com`. Launch with `npx @anthropic-ai/sandbox-runtime claude`.
- Organizational enforcement: only the built-in Bash sandbox is enforceable by Claude Code itself (via managed settings); dev containers/custom containers/VMs require external device-management or software-allowlisting tools.
- Native Windows hosts: use a container/VM, or run the Bash sandbox inside WSL2.

## Related

- [sandboxing](./sandboxing.md)
- [permission-modes](./permission-modes.md)
- [security](./security.md)
