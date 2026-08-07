<!-- source: https://code.claude.com/docs/en/permission-modes.md / last verified: 2026-08-07 -->

# Choose a permission mode

Permission modes control how often Claude Code pauses to ask before editing files, running commands, or making network requests.

## Signature / Usage

```bash
claude --permission-mode plan
claude --permission-mode acceptEdits
claude --dangerously-skip-permissions   # equivalent to --permission-mode bypassPermissions
```

```json
// settings file
{ "permissions": { "defaultMode": "acceptEdits" } }
```

## Options / Props

| Mode | What runs without asking | Best for |
|---|---|---|
| `default` (labeled Manual) | Reads only | Getting started, sensitive work |
| `acceptEdits` | Reads, file edits, common filesystem commands (`mkdir`, `touch`, `mv`, `cp`, etc.) | Iterating on reviewed code |
| `plan` | Reads, plus classifier-approved commands when auto mode is available | Exploring before changing |
| `auto` | Everything, with background classifier safety checks | Long tasks, fewer prompts |
| `dontAsk` | Only pre-approved tools | Locked-down CI/scripts |
| `bypassPermissions` | Everything (including protected-path writes) | Isolated containers/VMs only |

- `Shift+Tab` cycles `default → acceptEdits → plan` (plus `bypassPermissions`/`auto` if enabled). `dontAsk` never appears in the cycle.
- Auto mode requires: any plan; Team/Enterprise has it on by default (admins can disable via `permissions.disableAutoMode`); model Opus 4.6+/Sonnet 4.6+/Fable 5 on the Anthropic API (Sonnet 5/Opus 4.7+/Fable 5 only on Bedrock/Agent Platform/Foundry/gateway); available on Anthropic API, Claude Platform on AWS, Bedrock, Agent Platform, Foundry, signed-in Claude apps gateway.
- `defaultMode: "auto"` is only honored from `~/.claude/settings.json` (user settings) — Claude Code ignores it from project/local settings so a repo can't grant itself auto mode.

## Notes

- Auto mode's classifier blocks-by-default categories include: `curl | bash`, sending sensitive data externally, production deploys/migrations, mass cloud-storage deletion, granting IAM/repo permissions, force push, `git reset --hard`/`git clean -fd`, `terraform destroy`-class commands, writing to secret managers, merging unapproved PRs, opening tunnels/reverse shells, printing live credentials, disarming safety flags (`--insecure`), and writes to Claude Code's own session transcripts.
- Classifier fallback: 3 consecutive or 20 total blocks in a session pause auto mode and resume normal prompting; thresholds aren't configurable.
- Protected paths (`.git`, `.claude`, `.vscode`, `.gitconfig`, `.npmrc`, shell rc files, etc.) are never auto-approved except in `bypassPermissions` mode or planning sessions with bypass permissions available — even a matching `permissions.allow` rule doesn't change this.
- `bypassPermissions` still prompts for explicit `ask` rules, org-`ask` connector tools, `requiresUserInteraction` MCP tools, and `rm -rf /` / `rm -rf ~` circuit breakers. Refuses to start as root/sudo on Linux/macOS outside a recognized sandbox.
- The Agent SDK's `canUseTool` permission callback (programmatic, per-tool-call approval) is a separate mechanism from these CLI permission modes; see anthropic-agent-sdk for that API. The `settings.json` `defaultMode` basics here belong to Claude Code itself; see anthropic-claude-code for general settings usage.

## Related

- [permissions](./permissions.md)
- [sandboxing](./sandboxing.md)
- [sandbox-environments](./sandbox-environments.md)
