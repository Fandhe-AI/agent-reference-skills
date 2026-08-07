# vercel ai-gateway

Manage AI Gateway resources from the Vercel CLI: API keys, routing rules, models, and coding agent setup.

## Signature / Usage

```bash
vercel ai-gateway api-keys create --name my-key --budget 500 --refresh-period monthly
vercel ai-gateway rules add --type rewrite --source anthropic/claude-opus-4.7 --destination anthropic/claude-haiku-4.5
vercel ai-gateway rules list
vercel ai-gateway models ls
vercel ai-gateway models endpoints anthropic/claude-opus-5
vercel ai-gateway coding-agents setup --yes
```

## Options / Props

| Name | Description |
|------|-------------|
| `api-keys create --name / --budget / --refresh-period` | Create an API key, optional name and monthly/weekly/daily/none quota |
| `rules add --type <rewrite\|deny> --source --destination --reason --description` | Add a routing rule; `rewrite` requires `--destination`, `deny` does not |
| `rules edit <id> --enable / --disable` | Toggle or edit a rule by ID |
| `rules remove <id>` (alias `rm`, `delete`) | Remove a rule; `--yes` skips confirmation |
| `models ls --format json` | List available models |
| `models endpoints <model-id> --format json` | Compare provider endpoints serving a model |
| `coding-agents setup --agent / --all / --key / --dry-run / --reconfigure` | Configure Claude Code, Codex, OpenCode, or Pi to route through AI Gateway |

## Notes

- `coding-agents setup` never pins a model; it only writes the gateway base URL and API key into each agent's config
- API keys are shown once in plaintext; store securely
- Routing rules are in beta and may change before general availability
- On macOS, `coding-agents setup` stores the key in the login Keychain by default (`--no-keychain` to opt out)

## Related

- [mcp.md](./mcp.md)
