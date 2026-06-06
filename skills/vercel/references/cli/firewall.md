# vercel firewall

Manage Vercel Firewall: custom rules, IP blocks, system bypass, attack mode, and system mitigations. Custom rule and IP block changes are staged until published.

## Signature / Usage

```bash
vercel firewall overview
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
- `vercel firewall diff` reviews staged changes; `vercel firewall discard` cancels them
- Condition `type` values include: `path`, `method`, `host`, `ip_address`, `user_agent`, `geo_country`, `header`, `cookie`, `query`, `ja4_digest`, and more
- Operator values: `eq`, `neq`, `sub`, `pre`, `suf`, `re`, `ex`, `nex`, `inc`, `ninc`, `gt`, `gte`, `lt`, `lte`

## Related

- [project.md](./project.md)
