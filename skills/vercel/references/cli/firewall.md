# vercel firewall

Manage Vercel Firewall: custom rules, IP blocks, system bypass, attack mode, and system mitigations. Custom rule and IP block changes are staged until published.

## Signature / Usage

```bash
vercel firewall overview
vercel firewall status
vercel firewall traffic list --since 1h --top 20
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
vercel firewall rules edit "My Rule" --action challenge --duration 5m --yes
vercel firewall ip-blocks block 1.2.3.4 --yes
vercel firewall attack-mode enable --duration 24h --yes
vercel firewall diff
vercel firewall publish --yes
```

## Options / Props

### rules add / rules edit

| Name | Description |
|------|-------------|
| `--ai <PROMPT>` | Generate/modify rule from natural language (interactive TTY only) |
| `--json <PAYLOAD>` | Create/replace rule from full JSON payload |
| `--condition <JSON>` | Add condition as JSON `{type, op, value, key?, neg?}` (repeatable) |
| `--or` | Start a new OR group between `--condition` flags |
| `--action <TYPE>` | Action: `deny`, `challenge`, `log`, `bypass`, `rate_limit`, `redirect` |
| `--duration` | Action persistence duration: `1m`, `5m`, `15m`, `30m`, `1h` |
| `--description` | Rule description (max 256 chars) |
| `--disabled` | Create/set rule in disabled state |
| `--enabled` | Enable rule (edit only; mutually exclusive with `--disabled`) |
| `--rate-limit-window` | Rate limit time window in seconds (10–3600) |
| `--rate-limit-requests` | Max requests per window (1–10,000,000) |
| `--rate-limit-keys` | Count by: `ip` (default), `ja4`, `header:<name>` (repeatable) |
| `--rate-limit-algo` | Algorithm: `fixed_window` (default), `token_bucket` |
| `--rate-limit-action` | Action when limit exceeded: `rate_limit` (default), `deny`, `challenge`, `log` |
| `--redirect-url` | Redirect destination URL or path |
| `--redirect-permanent` | Use 301 (default: 307) |
| `--name` | Rename the rule (edit only) |
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
| `--top <number>` | Rows per top list (`list`, default 5) or in the breakdown (`inspect`, default 10) |
| `--dimension <dim>` | (`list`) Top list to include; repeatable or comma-separated; default every dimension except `country` and `action` |
| `--group-by <dim>` | (`inspect`) Dimension to break the traffic down by; any dimension but the one inspected |
| `--alert <alert-id>` | Scope the window and rule to one alert from `alerts list` |
| `--filter <expr>` | KQL filter; repeatable, ANDed |
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

### rules reorder

Pass exactly one of `--position <NUMBER>` (1-based), `--first`, `--last`; `-y, --yes`. Alias `move`.

### system-bypass add / remove

| Name | Description |
|------|-------------|
| `--domain <DOMAIN>` | Scope to a domain (default all domains; `add` accepts wildcard like `"*.example.com"`) |
| `--notes <TEXT>` | (`add`) Note on the rule |
| `-y, --yes` | Skip confirmation |

### ip-blocks block / unblock

| Name | Description |
|------|-------------|
| `--hostname` | Scope block/unblock to a specific hostname |
| `--notes` | Note attached to the IP block rule |
| `-y, --yes` | Skip confirmation |

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
- `bot-management` lists the managed rules Bot Protection (`bot-protection`: off/log/challenge), AI Bots (`ai-bots`: allow/log/challenge/deny) and BotID (`bot-id`: basic/deep-analysis; deep analysis not on Hobby), project-only. Change them with `rules edit <slug> --action ...` (staged, then publish); `rules add|remove|enable|disable|reorder` refuse these slugs. `rules list --team-level` lists custom rules alone
- `system-mitigations pause` pauses automatic DDoS protection for 24 hours (you remain responsible for usage fees from traffic that would have been blocked); `resume` re-enables. `system-bypass` entries take effect immediately; use a custom rule with a bypass action to allow traffic your own custom rules block
- `vercel firewall diff` reviews staged changes; `vercel firewall discard` cancels them
- Condition `type` values include: `path`, `method`, `host`, `ip_address`, `user_agent`, `geo_country`, `header`, `cookie`, `query`, `ja4_digest`, and more
- Operator values: `eq`, `neq`, `sub`, `pre`, `suf`, `re`, `ex`, `nex`, `inc`, `ninc`, `gt`, `gte`, `lt`, `lte`

## Related

- [project.md](./project.md)
