# vercel setup

Prepare your machine for coding agents in two steps: install the Vercel plugin for Claude Code and Codex, and connect local coding agents to AI Gateway.

## Signature / Usage

```bash
vercel setup
vercel setup --gateway
vercel setup --plugin --agent codex
vercel setup --dry-run
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `--plugin` | Boolean | Run only the Vercel plugin step |
| `--gateway` | Boolean | Run only the AI Gateway step |
| `--agent <NAME>` | String | Limit setup to one coding agent; repeat to select more. Plugin step accepts `claude-code` or `codex`; AI Gateway step accepts any agent in the supported coding agents list (e.g. `cursor`, `opencode`) |
| `--dry-run` | Boolean | Show what would change without writing any files |
| `-y, --yes` | Boolean | Skip confirmation prompts |

## Notes

- Step 1 installs the Vercel plugin for Claude Code and Codex. Step 2 runs the same flow as `vercel ai-gateway setup`.
- The command prompts before each step and skips agents it does not find on your machine.

## Related

- [ai-gateway.md](./ai-gateway.md)
- [agent.md](./agent.md)
- [upgrade.md](./upgrade.md)
- [global-options.md](./global-options.md)
