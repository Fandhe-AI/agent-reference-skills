# vercel firewall

Manage Vercel Firewall: custom rules, IP blocks, system bypass, attack mode, and system mitigations. Custom rule and IP block changes are staged until published.

## Signature / Usage

```bash
vercel firewall overview
vercel firewall status
vercel firewall traffic list --since 1h --limit 20
vercel firewall traffic inspect ip 1.2.3.4 --action deny
vercel firewall alerts list
vercel firewall persistent-actions list --since 6h --limit 50
vercel firewall bot-management
vercel firewall system-bypass add 10.0.0.1 --domain example.com --yes
vercel firewall system-mitigations pause --yes
vercel firewall rules list
vercel firewall rules add "Block bots" \
  --condition '{"type":"user_agent","op":"sub","value":"crawler"}' \
  --action deny --yes
vercel firewall rules update "My Rule" --action challenge --duration 5m --yes
vercel firewall ip-blocks block 1.2.3.4 --yes
vercel firewall attack-mode enable --duration 24h --yes
vercel firewall diff
vercel firewall publish --confirm-name my-app
```

## Options / Props

### rules add / rules update

| Name | Description |
|------|-------------|
| `--ai <PROMPT>` | Generate/modify rule from natural language (interactive TTY only) |
| `--data <JSON>` | Create (`add`) or replace (`update`) a rule from a full JSON payload; use it instead of `--ai` / interactive mode in scripts and CI |
| `--condition <JSON>` | Add condition as JSON `{type, op, value, key?, neg?}` (repeatable) |
| `--or` | Start a new OR group between `--condition` flags |
| `--action <TYPE>` | Action: `deny`, `challenge`, `log`, `bypass`, `rate_limit`, `redirect` |
| `--duration` | Action persistence duration (makes the action persistent for the matched client): `1m`, `5m`, `15m`, `30m`, `1h` |
| `--description` | Rule description (max 256 chars) |
| `--no-enable` | (`add`, `update`) Create the rule disabled (new rules are enabled by default) or disable it along with other changes |
| `--enable` | (`update` only) Enable the rule along with other changes; to only enable/disable use `rules enable` / `rules disable` |
| `--rate-limit-window` | Rate limit time window in seconds (10–3600) |
| `--rate-limit-requests` | Max requests per window (1–10,000,000) |
| `--rate-limit-keys` | Count by: `ip` (default), `ja4`, `header:<name>` (repeatable) |
| `--rate-limit-algo` | Algorithm: `fixed_window` (default), `token_bucket` |
| `--rate-limit-action` | Action when limit exceeded: `rate_limit` (default), `deny`, `challenge`, `log` |
| `--redirect-url` | Redirect destination URL or path |
| `--redirect-permanent` | Use 301 (default: 307) |
| `--name` | Rename the rule (`update` only) |
| `--category <CATEGORY>` | Seen only in an official example (`rules update ai-bots --category ai-crawlers --action deny`); not documented in the options list |
| `-y, --yes` | Skip confirmation prompt |

### overview / status / bot-management

| Name | Description |
|------|-------------|
| `--json` | Output as JSON |
| `--project <name-or-id>` | Project name or ID, defaulting to the linked project |

### traffic list / traffic inspect

| Name | Description |
|------|-------------|
| `-s, --since <time>` / `-u, --until <time>` | Window start (default 24 hours ago) / end (default now); relative (`1h`, `24h`, `7d`) or ISO 8601 |
| `--limit <number>` | Rows per top list (`list`, default 5) or in the breakdown (`inspect`, default 10) |
| `--dimension <dim>` | (`list`) Top list to include; repeatable or comma-separated; default every dimension except `country` and `action` |
| `--group-by <dim>` | (`inspect`) Dimension to break the traffic down by; any dimension but the one inspected |
| `--alert <alert-id>` | Scope the window and rule to one alert from `alerts list` |
| `--query <expr>` | KQL filter expression; repeatable, ANDed |
| `--ip` / `--ja4` / `--asn` / `--user-agent` / `--path` / `--rule` / `--host` / `--bot` / `--country` / `--action` | Narrow results to requests matching that dimension value |
| `--json` / `--project` | JSON output / project |

### alerts list / inspect, persistent-actions list / inspect

| Name | Description |
|------|-------------|
| `-s, --since` / `-u, --until` | Window; `alerts list` default 24 hours ago, `persistent-actions` default one hour ago |
| `--limit <number>` | (`persistent-actions list`) Number of actions, default 10 |
| `--host <hostname>` / `--action <action>` | (`persistent-actions inspect`) Select a specific action for the IP |
| `--paths` | (`persistent-actions inspect`) Include top request paths |
| `--json` / `--project` | JSON output / project |

### rules list / inspect / enable / disable / remove / move

| Name | Description |
|------|-------------|
| `rules list --expand` | Show full condition and action details for each rule |
| `rules list --team-level` | List custom rules alone (no managed bot rules) |
| `rules inspect <name-or-id>` | Show a custom rule or managed bot rule (e.g. `bot-protection`); `--json` available on `list` / `inspect` |
| `rules enable` / `disable` / `remove <name-or-id>` | Staged changes; `-y, --yes` skips confirmation |
| `rules move <name-or-id>` | Pass exactly one of `--position <NUMBER>` (1-based), `--first`, `--last`; `-y, --yes` |

### system-bypass add / remove

| Name | Description |
|------|-------------|
| `--domain <DOMAIN>` | Scope to a domain (default all domains; `add` accepts wildcard like `"*.example.com"`; `remove` scopes the removal) |
| `--notes <TEXT>` | (`add`) Note on the rule |
| `-y, --yes` | Skip confirmation |

### ip-blocks block / unblock

| Name | Description |
|------|-------------|
| `--hostname <HOST>` | Scope block (default: all hosts) or narrow unblock to a hostname; `unblock` accepts `<id-or-ip>` |
| `--notes` | Note attached to the IP block rule |
| `-y, --yes` | Skip confirmation |

### list / diff / publish / discard

| Name | Description |
|------|-------------|
| `ip-blocks list`, `system-bypass list` | List entries; `--json` |
| `diff` | Review staged changes (added, removed, modified, enabled, disabled, with field-level detail); `--json` |
| `publish --confirm-name <name>` | Publish without the prompt (e.g. in scripts) by passing the project name; if it does not match the project, nothing is published |
| `discard -y, --yes` | Discard all staged drafts and revert to production configuration |

### attack-mode enable

| Name | Description |
|------|-------------|
| `--duration` | How long to keep attack mode active: `1h` (default), `6h`, `24h` |
| `-y, --yes` | Skip confirmation |

## Notes

- **Staging**: `rules add/edit/remove` and `ip-blocks block/unblock` are staged; run `vercel firewall publish` to apply
- **Immediate**: `system-bypass`, `attack-mode`, `system-mitigations` take effect without publishing
- Read-only reporting subcommands: `overview` (config plus last day of activity; needs no Observability Plus), `status` (config in evaluation order: bypass, system mitigations, attack challenge mode, IP blocks, custom rules, managed rulesets), `traffic` (`list` / `ls`, `inspect`), `alerts` (`list` / `ls`, `inspect`), `persistent-actions` (`list` / `ls`, `inspect <ip>`), `bot-management`. Traffic, alerts and persistent actions need a team scope; traffic windows beyond plan retention (e.g. `--since 7d`) require Observability Plus (extends to 30 days)
- Traffic dimensions: `ip`, `ja4`, `asn`, `user-agent`, `path`, `rule`, `host`, `bot`, `country`, `action`. `traffic inspect` returns a not-found error when the value has no traffic in the window; use `unknown-bot <category>` for unknown bot traffic
- `bot-management` lists the managed rules Bot Protection (`bot-protection`: off/log/challenge), AI Bots (`ai-bots`: allow/log/challenge/deny) and BotID (`bot-id`: basic/deep-analysis; deep analysis not on Hobby), project-only. Change them with `rules update <slug> --action ...` (staged, then publish); `rules add|remove|enable|disable|move` refuse these slugs. `rules list --team-level` lists custom rules alone
- `system-mitigations pause` pauses automatic DDoS protection for 24 hours (you remain responsible for usage fees from traffic that would have been blocked); `resume` re-enables. `system-bypass` entries take effect immediately; use a custom rule with a bypass action to allow traffic your own custom rules block
- `vercel firewall diff` reviews staged changes; `vercel firewall discard --yes` cancels them; in a terminal `publish` lists the staged changes and asks to confirm
- Renamed vs the previous fetch: `rules edit` is now `rules update`, `rules reorder` is now `rules move`, `rules add --json` is now `--data`, `--disabled` / `--enabled` are now `--no-enable` / `--enable`, `--filter` is now `--query`, `--top` is now `--limit`; the old names are not confirmed in the current official docs
- `--ai` and interactive modes need a TTY; in scripts and CI use `--condition` or `--data`. `--condition` sets are ANDed; `--or` starts a new OR group. `header` / `cookie` / `query` conditions need a `key`; `"neg": true` negates a condition; omit `value` for `ex` / `nex`. `rules update --description ""` clears the description
- `traffic inspect <dimension> <value>` takes a rule id for `rule`; text output of `traffic list` shows rule names while `--json` keeps the id as `value`
- Condition `type` values: `path`, `raw_path`, `target_path`, `route`, `server_action`, `method`, `host`, `protocol`, `scheme`, `environment`, `region`, `ip_address`, `user_agent`, `geo_country`, `geo_continent`, `geo_country_region`, `geo_city`, `geo_as_number`, `header`, `cookie`, `query`, `ja4_digest`, `ja3_digest` (Enterprise only), `rate_limit_api_id`
- Operator values: `eq`, `neq`, `sub`, `pre`, `suf`, `re`, `ex`, `nex`, `inc`, `ninc`, `gt`, `gte`, `lt`, `lte`
- Actions: `deny` (403), `challenge`, `log`, `bypass` (skips remaining custom rules, not system-level mitigations), `rate_limit`, `redirect`; `--duration` on a `deny` e.g. `30m` blocks the client for that time after the first match
- Attack mode lets known legitimate bots through without a challenge
- Source: https://vercel.com/docs/cli/firewall (fetched 2026-11-14)

## Related

- [project.md](./project.md)
