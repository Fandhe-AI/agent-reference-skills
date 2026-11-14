# vercel setup

Prepare your machine for coding agents in two steps: install the Vercel plugin for Claude Code, Codex, and OpenCode, and connect local coding agents to AI Gateway.

## Signature / Usage

```bash
vercel setup
vercel setup gateway
vercel setup plugin --agent codex
vercel setup skills
vercel setup skills --output .agents/skills/vercel-cli
vercel setup --dry-run
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `--agent <NAME>` | String | Limit setup to one coding agent; repeat to select more. Plugin step accepts `claude-code`, `codex`, or `opencode`; AI Gateway step accepts any agent in the supported coding agents list (e.g. `cursor`, `opencode`) |
| `--dry-run` | Boolean | Show what would change without writing any files |
| `-y, --yes` | Boolean | Skip confirmation prompts |
| `--output <DIR>` | String | `setup skills` only: directory to write the Vercel CLI skill into (default `~/.agents/skills/vercel-cli`) |
| `--all`, `--key`, `--reconfigure`, `--no-session-migration` | - | `setup gateway` only: same options as `vercel ai-gateway setup` |

### Subcommands

| Subcommand | Description |
|------------|-------------|
| `plugin` | Run only the Vercel plugin step (Claude Code, Codex, and OpenCode) |
| `gateway` | Run only the AI Gateway step |
| `skills` | Write the Vercel CLI skill matching the installed CLI version to `~/.agents/skills/vercel-cli` |

## Notes

- Step 1 installs the Vercel plugin for Claude Code, Codex, and OpenCode 2 or later. Step 2 runs the same flow as `vercel ai-gateway setup`.
- The command prompts before each step and skips agents it does not find on your machine.
- `vercel setup` without a subcommand does not write the skill; run `vercel setup skills` again after upgrading the CLI to update it. `setup skills` does not prompt and does not accept `--agent` or `--yes`.
- For `ai-gateway setup`-only options (e.g. a spend limit for a new key), run `vercel ai-gateway setup`.
- The previous `--plugin` / `--gateway` step flags are not listed in the current official page (not confirmed); use the `plugin` / `gateway` subcommands.
- Source: https://vercel.com/docs/cli/setup (fetched 2026-11-14)

## Related

- [ai-gateway.md](./ai-gateway.md)
- [agent.md](./agent.md)
- [upgrade.md](./upgrade.md)
- [global-options.md](./global-options.md)
