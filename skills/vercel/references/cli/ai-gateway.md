# vercel ai-gateway

Manage AI Gateway resources from the Vercel CLI: API keys, budgets, routing rules, virtual models, models, leaderboards, and coding agent setup.

## Signature / Usage

```bash
vercel ai-gateway api-keys create --name my-key --limit 500 --refresh-period monthly
vercel ai-gateway budgets set project my-project --limit 200
vercel ai-gateway budgets set user --default --limit 50 --refresh-period monthly
vercel ai-gateway rules add --type rewrite --source anthropic/claude-opus-5 --destination anthropic/claude-haiku-4.5
vercel ai-gateway rules list
vercel ai-gateway virtual-models create my-model --model openai/gpt-5.1
vercel ai-gateway models ls --virtual
vercel ai-gateway models endpoints anthropic/claude-opus-5
vercel ai-gateway leaderboard models --modality text
vercel ai-gateway setup --yes
```

## Options / Props

`api-keys create`:

| Name | Description |
|------|-------------|
| `--name <NAME>` | Human-readable key name |
| `--limit <AMOUNT>` | Quota budget in dollars (min 1); CLI v59.13.0+ (older versions: `--budget`, deprecated) |
| `--refresh-period <PERIOD>` | `daily`, `weekly`, `monthly`, or `none` (default `none`) |
| `--alert-thresholds <LIST>` | Comma-separated spend percentages, subset of `50`, `75`, `100` (e.g. `75,100`) |
| `--expiration <PERIOD>` | `7d`, `30d`, `60d`, `90d`, `1y`, or `none` (default `none`) |
| `--zdr-exempt` | Exempt the key from the team's zero-data-retention only model restriction; team owners only |

Other `api-keys`: `list` / `ls` (`--format`, `--limit` page size, `--next`), `inspect <id>`, `remove <id>` (aliases `rm`, `delete`; `--yes`).

`budgets` (metered spend limits scoped to `team`, `project`, `api-key`, or `user`):

| Name | Description |
|------|-------------|
| `set <scope> [identifier] --limit / --refresh-period / --default / --format` | Create or update a budget; `--refresh-period` default `monthly`; identifier is project name or ID, key name or ID, or member email / username / user ID (none for `team`) |
| `list --scope-type <team\|project\|user\|api-key> / --defaults` | List budgets or the team's default budgets |
| `inspect <scope> [identifier] --default` | Show a budget |
| `remove <scope> [identifier] --yes / --default` | Remove a budget |

`rules`:

| Name | Description |
|------|-------------|
| `add --type <rewrite\|deny> --source --destination --reason --description --format` | Add a routing rule; `rewrite` requires `--destination`, `deny` does not |
| `list` (alias `ls`) `--include-disabled` | List rules |
| `edit <id> --enable / --disable` | Edit or toggle a rule |
| `remove <id>` (aliases `rm`, `delete`) `--yes` | Remove a rule |

`virtual-models` (called as `vmc/<slug>`):

| Name | Description |
|------|-------------|
| `create [slug] --kind <alias\|relay> / --model / --display-name / --description / --provider-order / --provider-only / --config <JSON>` | Create; `--kind` default `alias` (a relay needs `baseUrl` in `--config` and an allowlisted team); flags take precedence over `--config` |
| `list` (alias `ls`) `--include-archived` | List |
| `inspect <slug>` / `edit <slug>` / `remove <slug>` (aliases `rm`, `delete`) / `restore <slug>` | `edit` takes the create flags except `--kind` (at least one required); `remove` has no confirmation prompt |

`models`: `ls` (`--virtual`, `--no-virtual`, `--format`), `endpoints <model-id>` (`--format`).

`leaderboard` (alias `leaderboards`) subcommands `models`, `labs`, `apps`, `providers`: `--modality <all|text|image|video>`, `--metric <requests|tokens|spend|imageCount|videoCount>`, `--date <YYYY-MM-DD>`, `--format <table|json|csv>` / `-F`, `--out <FILE>` / `-o`.

`setup` (older spelling `coding-agents setup` still works):

| Name | Description |
|------|-------------|
| `--agent <NAME>` | Agent to configure; repeatable |
| `--all` | Configure every supported coding agent |
| `--key <KEY>` | Use an existing API key instead of creating one |
| `--name` / `--budget` / `--refresh-period` / `--expiration` | Settings for a newly created key (`--budget` is the spend limit in dollars, min 1) |
| `--reconfigure` | Run again when already configured (key rotation, switch team) |
| `--agent-config <AGENT=PATH>` | Override an agent's config path; repeatable |
| `--shell-rc <PATH>` | Shell startup file that receives the managed export block |
| `--base-url <URL>` | Override the gateway base URL written into agent configs |
| `--apply <edit\|prompt>` | `edit` (default) writes files; `prompt` emits an agent prompt (requires macOS Keychain) |
| `--dry-run` | Show changes without writing files or creating a key |
| `--no-backup` | Do not write `.bak` backups |
| `--no-session-migration` | Do not copy Claude Desktop / Codex Desktop sessions |
| `--no-keychain` | Write the key into config files and shell startup file instead of macOS Keychain |
| `--yes` / `-y` | Run without prompts |

## Notes

- Most subcommands accept `--format json` (`-F json`); `rules`, `models`, and `budgets set|list|inspect|remove` also accept `--json`. `setup` uses `--non-interactive` instead
- `setup` never pins a model; it writes the gateway base URL and API key into each agent's config. On macOS it stores the key in the login Keychain by default
- API keys are shown once in plaintext; store securely. `--zdr-exempt` keys can reach models without zero data retention; pair with `--expiration`
- `--default` on `budgets set|remove|inspect` needs CLI v59.13.0+; the older `budgets defaults` command group still works but prints a deprecation warning
- Routing rules are in beta and may change before general availability (still stated on the 2026-10 docs page)
- `setup` follows the CLI exit-code contract: `0` success/no-op/help, `1` operational failure, `2` usage error

## Related

- [mcp.md](./mcp.md)
