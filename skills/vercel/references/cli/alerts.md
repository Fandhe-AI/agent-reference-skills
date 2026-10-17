# vercel alerts

List recent alerts for a linked project, a specific project, or an entire team. Supports AI investigation summaries and alert rule management.

## Signature / Usage

```bash
vercel alerts
vercel alerts --all
vercel alerts --type usage_anomaly --since 2026-03-01T00:00:00.000Z
vercel alerts inspect <groupId>
vercel alerts rules ls
vercel alerts rules schema --type built-in
vercel alerts rules create --project my-app --body ./rule.json
vercel alerts rules inspect ar_abc123
vercel alerts rules update ar_abc123 --body ./patch.json
vercel alerts rules rm ar_abc123 --yes
```

## Options / Props

| Name | Shorthand | Description |
|------|-----------|-------------|
| `--project` | `-p` | Filter by project name or ID; overrides linked project |
| `--all` | `-a` | Show team-wide alerts; cannot combine with `--project` |
| `--type` | | Filter by alert type (repeatable or comma-separated: `usage_anomaly`, `error_anomaly`) |
| `--ai` | | Print AI investigation summaries instead of table output |
| `--since` | `-s` | Start of time range (ISO 8601). Default: last 24 hours |
| `--until` | `-u` | End of time range (ISO 8601); `--since` must be earlier |
| `--limit` | | Max alert groups to return (1–100) |
| `--format` | | `json` for structured output (returns a `groups` array) |

`inspect <groupId>`: `--format`, `-p, --project`, `-a, --all`.

`rules` subcommands:

| Subcommand | Alias | Options | Description |
|------------|-------|---------|-------------|
| `rules ls` | `list` | `-p, --project`, `-a, --all`, `--type` (repeatable / comma-separated), `--format` | List alert rules for a project (default linked) or the whole team |
| `rules schema` | | `--type`, `--format` | Show rule types, request fields, constraints, examples |
| `rules create` | `add` | `--body <file>`, `-p, --project`, `-a, --all` (built-in rule for every project), `--format` | Create a rule from a JSON body file; body must set `type` (e.g. `built-in`) |
| `rules inspect <ruleId>` | `get` | `--format` | Show one rule |
| `rules update <ruleId>` | `patch` | `--body <file>`, `-p, --project`, `-a, --all`, `--format` | Patch a rule or change its project scope |
| `rules rm <ruleId>` | `remove`, `delete` | `-y, --yes`, `--format` | Delete a rule |

## Notes

- Default scope: linked project from the last 24 hours
- `--all` requires team context
- Rule IDs (e.g. `ar_abc123`) are returned by `rules create` and shown by `rules ls`. `rules ls` retrieves every page; JSON output is `{ "rules": [...] }` (`rules schema`: `{ "schemaVersion", "ruleTypes" }`; `create` / `inspect` / `update`: `{ "rule": {...} }`; `rm`: `{ "ok": true, "ruleId", "deleted": true }`)
- Rule scope on create: set `ruleScope` in the body, or pass `--project`, or `--all` (built-in rules); do not combine `ruleScope` with `--project` / `--all`. A linked project does not supply the scope automatically
- Migration of saved rule bodies: the `alertTypes` field is rejected. Use top-level `type` and (built-in) `triggers`; `projectId` becomes `ruleScope` / `--project` / `--all`; `autosubscribeOwnersInKnock` becomes `notificationSettings.enableTeamOwnerNotifications`. Built-in filters use the schema's syntax, e.g. `statusGroup:5xx` instead of the previous OData expression
- `rules ls --type built-in` lists built-in rules; legacy trigger types such as `usage_anomaly` and `error_anomaly` are still accepted for compatibility

## Related

- [activity.md](./activity.md)
