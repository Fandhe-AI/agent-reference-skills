# vercel monitors

Manage monitors (the rules that decide when Vercel alerts your team) from the terminal. Replaces the deprecated `vercel alerts rules` command tree.

## Signature / Usage

```bash
# List monitors for the linked project
vercel monitors ls

# Add a monitor from a JSON body file
vercel monitors add --project my-app --body ./monitor.json
```

```bash
vercel monitors ls --all --format json
vercel monitors ls --project my-app --type custom
vercel monitors schema --type built-in
vercel monitors schema --type custom --format json
vercel monitors inspect ar_abc123 --format json
vercel monitors rm ar_abc123 --yes
vercel monitors update ar_abc123 --body ./patch.json
vercel monitors update ar_abc123 --project my-app
```

Built-in error anomaly monitor body (`monitor.json`):

```json
{
  "type": "built-in",
  "name": "Production server errors",
  "triggers": {
    "mode": "selected",
    "items": [
      {
        "type": "error_anomaly",
        "filter": "statusGroup:5xx AND route:/api/*"
      }
    ]
  },
  "matchMinimumSeverityLevel": "high"
}
```

Custom threshold monitor body (`monitor.json`):

```json
{
  "type": "custom",
  "name": "Checkout server errors",
  "severity": "high",
  "evaluation": {
    "window": "5m",
    "query": {
      "metrics": {
        "errors": {
          "metric": "vercel.request.count",
          "aggregation": "count",
          "filter": "httpStatus >= 500"
        }
      },
      "outputs": ["errors"]
    }
  },
  "trigger": {
    "type": "threshold",
    "output": "errors",
    "operator": "gt",
    "threshold": 20
  }
}
```

Patch body (`patch.json`):

```json
{
  "name": "Critical production errors",
  "matchMinimumSeverityLevel": "critical"
}
```

Notification destinations:

```bash
vercel monitors notifications ls ar_example
vercel monitors notifications link ar_example --slack-channel C123 --slack-installation-id icfg_example
vercel monitors notifications link ar_example --webhook wh_example --critical-only
vercel monitors notifications update ar_example --webhook wh_example --no-critical-only
vercel monitors notifications unlink ar_example --slack-channel C123
```

## Options / Props

### Subcommands

| Command | Aliases | Description |
|---------|---------|-------------|
| `ls` | `list` | List monitors for a project or team |
| `schema` | None | Show monitor types, request fields, constraints, examples |
| `add` | `create` (deprecated) | Add a monitor from a JSON body file |
| `inspect` | `get` | Show one monitor by ID |
| `rm` | `remove`, `delete` | Delete a monitor |
| `update` | `patch` | Patch a monitor or change its project scope |
| `notifications` | None | List and manage linked Slack channels and webhooks |

### ls / schema / add / inspect / rm / update options

| Option | Applies to | Description |
|--------|------------|-------------|
| `-p, --project` | `ls`, `add`, `update` | Project by name or ID (`ls`: monitors affecting it; `add`/`update`: apply the monitor to it) |
| `-a, --all` | `ls`, `add`, `update` | `ls`: every accessible monitor in the team. `add`/`update`: apply a built-in monitor to every project |
| `--type` | `ls`, `schema` | Monitor type. On `ls` repeatable and comma-separated |
| `--body` | `add`, `update` | Path to a JSON file (full body for `add`, partial for `update`) |
| `--format` | all | Output format; supports `json` |
| `-y, --yes` | `rm` | Skip the confirmation prompt |

### notifications options

| Option | Commands | Description |
|--------|----------|-------------|
| `--slack-channel <CHANNEL_ID>` | `link`, `update`, `unlink` | Slack channel by ID. Use either this or `--webhook` |
| `--slack-installation-id <INSTALLATION_ID>` | `link`, `update`, `unlink` | Slack installation. Requires `--slack-channel`; optional only when the team has exactly one completed installation |
| `--webhook <WEBHOOK_ID>` | `link`, `update`, `unlink` | Account webhook by ID. Can't combine with Slack options |
| `--critical-only` | `link`, `update` | Deliver only alerts escalated to Critical by Vercel Agent |
| `--no-critical-only` | `update` | Remove the Critical-only restriction. Can't combine with `--critical-only` |
| `--json`, `--format json` | all notification commands | Structured JSON on stdout |

### JSON output shapes

| Command | Output shape |
|---------|--------------|
| `monitors ls` | `{ "monitors": [...] }` |
| `monitors schema` | `{ "schemaVersion": number, "monitorTypes": [...] }` |
| `monitors add`, `inspect`, `update` | `{ "monitor": {...} }` |
| `monitors rm` | `{ "ok": true, "monitorId": "ar_...", "deleted": true }` |
| `notifications ls` | `notifications`: object mapping monitor IDs to destination arrays |
| `notifications ls <monitorId>` | `notifications`: array of destinations |
| `notifications link` / `update` / `unlink` | `success` and `notification` |

## Notes

- Monitor IDs come from `monitors add` and `monitors ls`; they are unique within a team (use `--scope <team>` for another team).
- `ls` uses `built-in` and `custom` as types. For compatibility, `--type` also accepts built-in trigger types such as `usage_anomaly` / `error_anomaly` and `custom_alert`. `ls` retrieves every page before printing.
- `add`: body must set `type` (`built-in` or `custom`). Select scope with `ruleScope` in the body, `--project`, or `--all` (built-in only); don't combine `ruleScope` with `--project` / `--all`. A linked project is not used automatically. Custom monitors require `--project` and don't support `--all`. Use `vercel monitors schema --type <type>` for validated examples and constraints; run `vercel metrics schema <metric-or-prefix>` before authoring a custom body.
- `create` is a deprecated alias of `add` and prints a deprecation warning.
- `update`: needs `--body`, `--project`, or `--all`; omitted body fields stay unchanged and `type` is optional. The default monitor accepts notification updates only; a custom monitor with `querySupported: false` accepts `name`, `severity`, and `notificationSettings` only. The team's default monitor can't be deleted.
- Migrating bodies: `alertTypes` becomes top-level `type` (plus `triggers` for built-in); `projectId` becomes `ruleScope` / `--project` / `--all`; `autosubscribeOwnersInKnock` becomes `notificationSettings.enableTeamOwnerNotifications`; `customAlert.queryJsonString` becomes `evaluation.query`; `triggerType` / `triggerOperator` / `triggerThreshold` become `trigger`; `formula.left` / `formula.right` become `evaluation.query.formulas` and `outputs`. Bodies with the previous fields are rejected. Filters use the current schema syntax (for example `statusGroup:5xx`).
- Migrating from `vercel alerts rules`: `ls`, `schema`, `create` (now `add`), `inspect`, `rm`, `update` map one-to-one onto `vercel monitors`. JSON keys rename `rules` to `monitors`, `ruleTypes` to `monitorTypes`, `rule` to `monitor`, `ruleId` to `monitorId`.
- Validation failures return an `error` object with `code` and `message`, plus an `issues` array of field paths when available.
- `notifications`: sign in with `vercel login` or a token; no linked project needed; in non-interactive mode pass `--scope` unless linked. With no subcommand it runs `ls`; without a monitor ID it lists destinations for every readable monitor. Link a Slack channel only after installing the Vercel app and inviting it to the channel. Link webhooks by ID (find with `vercel webhooks list`). `link`/`update`/`unlink` apply without confirmation; unlink doesn't delete the webhook or uninstall Slack. `update` needs exactly one of `--critical-only` / `--no-critical-only`; its `patch` alias is deprecated. Each mutation takes one monitor ID and exactly one destination. In non-interactive mode JSON also includes `status`, `message`, `next`, per-monitor `monitorId`, and mutation `action`.
- Source: https://vercel.com/docs/cli/monitors (fetched 2026-11-14)

## Related

- [alerts.md](./alerts.md)
- [webhooks.md](./webhooks.md)
- [metrics.md](./metrics.md)
