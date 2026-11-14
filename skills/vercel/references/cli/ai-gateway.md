# vercel ai-gateway

Manage AI Gateway resources from the Vercel CLI: API keys, budgets, routing rules, virtual models, models, leaderboards, and coding agent setup.

## Signature / Usage

```bash
vercel ai-gateway api-keys create --name my-key --amount 500 --refresh-period monthly
vercel ai-gateway budgets set project my-project --amount 200
vercel ai-gateway budgets set user --default --amount 50 --refresh-period monthly
vercel ai-gateway rules add --type rewrite --source anthropic/claude-opus-5 --destination anthropic/claude-haiku-4.5
vercel ai-gateway rules list
vercel ai-gateway rules update rule_123 --no-enable
vercel ai-gateway api-keys list --state any --sort createdAt:desc --limit 50 --json
vercel ai-gateway virtual-models create my-model --model openai/gpt-5.1
vercel ai-gateway virtual-models update my-model --model anthropic/claude-sonnet-4.5
vercel ai-gateway models list --virtual
vercel ai-gateway models endpoints anthropic/claude-opus-5
vercel ai-gateway leaderboard models --modality text
vercel ai-gateway leaderboard models --format csv --output models.csv
vercel ai-gateway setup --yes
```

## Options / Props

`api-keys create`:

| Name | Description |
|------|-------------|
| `--name <NAME>` | Human-readable key name |
| `--amount <USD>` | Quota budget in dollars (min 1) |
| `--refresh-period <PERIOD>` | `daily`, `weekly`, `monthly`, or `none` (default `none`) |
| `--alert-thresholds <LIST>` | Comma-separated spend percentages, subset of `50`, `75`, `100` (e.g. `75,100`) |
| `--expiration <PERIOD>` | `7d`, `30d`, `60d`, `90d`, `1y`, or `none` (default `none`) |
| `--zdr-exempt` | Exempt the key from the team's zero-data-retention only model restriction; team owners only |

`api-keys list`:

| Name | Description |
|------|-------------|
| `--query <TEXT>`, `-q` | Only keys whose name or key suffix contains the text (case-insensitive) |
| `--creator <USER>` | Only keys created by one member: email, username, user ID, or `me` |
| `--state <STATE>` | `active` (default), `expired`, `deleted`, or `any`; expired keys are hidden unless `expired` / `any` |
| `--sort <FIELD>` | `createdAt`, `lastActiveAt`, `name`, or `expiresAt`, optionally `:asc` / `:desc` (default `lastActiveAt:desc`) |
| `--limit <NUMBER>` | Keys per page (default 20, max 100) |
| `--next <CURSOR>` | Next page, using `pagination.next` from the previous result |
| `--json` | Full key payload as JSON |

Other `api-keys`: `inspect <id>` (`--json`; shows a `zdr exempt` row for exempt keys), `revoke <id>` (`--yes` / `-y`, `--json`).

`budgets` (metered spend limits scoped to `team`, `project`, `api-key`, or `user`):

| Name | Description |
|------|-------------|
| `set <scope> [identifier] --amount / --refresh-period / --default / --json` | Create or update a budget; `--amount` in dollars (min 1); `--refresh-period` default `monthly`; identifier is project name or ID, key name or ID (a shared name errors, use the ID), or member email / username / user ID (none for `team` or a default) |
| `list --scope-type <team\|project\|user\|api-key> / --defaults / --json` | List budgets or the team's default budgets |
| `inspect <scope> [identifier] --default / --json` | Show a budget |
| `remove <scope> [identifier] --yes / --default / --json` | Remove a budget; a project, key, or member covered by a default falls back to it |

`rules`:

| Name | Description |
|------|-------------|
| `add --type <rewrite\|deny> --source --destination --reason --description --json` | Add a routing rule; `--type` and `--source` required; `rewrite` requires `--destination`, `deny` does not |
| `list --include-disabled` | List rules |
| `update <id>` | Change destination, reason, or description; `--no-enable` turns a rule off, `--enable` turns it back on |
| `remove <id> --yes` | Remove a rule |

`virtual-models` (called as `vmc/<slug>`; every subcommand accepts `--json`):

| Name | Description |
|------|-------------|
| `create [slug] --kind <alias\|relay> / --model / --display-name / --description / --provider-order / --provider-only / --config <JSON>` | Create (prompts when run with no arguments); `--kind` default `alias` (a relay needs `baseUrl` in `--config` and an allowlisted team); flags take precedence over `--config`; `--model` required unless `modelSlug` is in `--config` |
| `list --include-archived` | List; archived hidden by default |
| `inspect <slug>` / `update <slug>` / `delete <slug>` / `restore <slug>` | `update` takes the create flags except `--kind` (at least one required); `delete` has no confirmation prompt and the configuration is kept so `restore` works |

`models`: `list` (`--virtual`, `--no-virtual`, `--json`), `endpoints <model-id>` (`--json`; includes throughput and tags).

`leaderboard` (alias `leaderboards`) subcommands `models`, `labs`, `apps`, `providers`:

| Name | Description |
|------|-------------|
| `--modality <all\|text\|image\|video>` | Default `all`; `models` and `labs` |
| `--metric <requests\|tokens\|spend\|imageCount\|videoCount>` | Default `requests`; `models` and `labs` |
| `--date <YYYY-MM-DD>` | Day for the table view (default most recent); `models` and `labs` |
| `--format <table\|json\|csv>` | Default `table` in a terminal, `json` otherwise |
| `--output <PATH>`, `-o` | Write the payload to a file instead of stdout |

`setup`:

| Name | Description |
|------|-------------|
| `--agent <NAME>` | Agent to configure; repeatable; in runs without prompts also grants consent for that agent's warnings |
| `--all` | Configure every supported coding agent, detected or not |
| `--key <KEY>` | Use an existing API key instead of creating one |
| `--name` / `--amount` / `--refresh-period` / `--expiration` | Settings for a newly created key (`--amount` is the spend limit in dollars, min 1) |
| `--scope <SLUG>` (`-S`) | Team that owns a newly created key (global option) |
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

- Most subcommands accept `--json`; `leaderboard` takes `--format json` instead, and `setup` uses `--non-interactive`. The previous page revision listed `--format json` / `-F json` for most subcommands (not confirmed in the current official page)
- Renames in the current official page versus the previous revision: `--limit` / `--budget` for dollar amounts became `--amount` (for `api-keys create`, `budgets set`, `setup`; `--limit` is now the page size of `api-keys list`); `api-keys remove` is `revoke`; `rules edit` / `rules remove` became `rules update` / `rules remove`; `virtual-models edit` / `remove` are `update` / `delete`; `models ls` is `models list`; `leaderboard --out` is `--output`; `--default` budgets are documented without a CLI version gate. Old spellings are not confirmed in the current docs
- `setup` never pins a model; it writes the gateway base URL and API key into each agent's config. On macOS the key goes to the login Keychain by default (service "Vercel AI Gateway"; Pi, Cline, ForgeCode, Kimi CLI, OpenHands, and ZCode always keep the key in their own config files). Re-running reuses the existing key; open a new terminal and restart agents afterwards
- With `--yes`, agents default to those detected (error if none; pass `--agent` or `--all`), a new unlimited non-expiring key is created unless `--key` is given, and `.bak` backups are written. `--non-interactive` (also automatic inside a coding agent without a TTY) prints one JSON object that contains the full API key, so treat it as a secret
- API keys are shown once in plaintext; store securely. `--zdr-exempt` keys can reach models without zero data retention; pair with `--expiration`
- Routing rules are in beta and may change before general availability (stated on the 2026-10 docs page)
- `setup` follows the CLI exit-code contract: `0` success/no-op/help, `1` operational failure, `2` usage error (an invalid option value in human-readable output exits `1`)
- Source: https://vercel.com/docs/cli/ai-gateway (fetched 2026-11-14)

## Related

- [mcp.md](./mcp.md)
