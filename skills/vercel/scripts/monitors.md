# Monitors

Create, list, update, and delete monitors (rules that raise alerts) and manage notification destinations (Slack / webhook)

`vercel monitors` replaces the deprecated `vercel alerts rules` (options and request bodies are the same; JSON output keys change: `rules` -> `monitors`, `ruleTypes` -> `monitorTypes`, `rule` -> `monitor`, `ruleId` -> `monitorId`). `add` returns the monitor ID and `ls` shows it.

## Signature / Usage

### Listing monitors

Shows monitors affecting the linked project (alias `list`).

```sh
vercel monitors ls
```

Show all monitors in the team.

```sh
vercel monitors ls --all
```

Specify a project and show only custom monitors (`--type` is `built-in` / `custom`; repeatable or comma-separated).

```sh
vercel monitors ls --project my-app --type custom
```

Output as JSON (`{ "monitors": [...] }`).

```sh
vercel monitors ls --all --format json
```

### Inspecting the schema

Lists the available monitor types. With a type specified, shows the fields, constraints, and examples usable for create and update.

```sh
vercel monitors schema
```

```sh
vercel monitors schema --type built-in
vercel monitors schema --type custom --format json
```

Before writing a custom monitor body, check the metric names, aggregations, and dimensions.

```sh
vercel metrics schema <metric-or-prefix>
```

### Adding a monitor

Add from a JSON file. `type` in the body is required and is `built-in` or `custom`. Specify the target project with exactly one of `ruleScope` in the body, `--project <name-or-id>`, or `--all` (built-in monitors only) (`ruleScope` cannot be combined with `--project` / `--all`; the linked project is not used automatically). Custom monitors require `--project` and cannot use `--all`.

Example body for a built-in error anomaly detection monitor (`monitor.json`).

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

```sh
vercel monitors add --project my-app --body ./monitor.json
```

Example body for a custom threshold monitor (`monitor.json`).

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

```sh
vercel monitors add --project my-app --body ./monitor.json
```

### Inspecting, updating, and deleting monitors

```sh
vercel monitors inspect ar_abc123
vercel monitors inspect ar_abc123 --format json
```

Update fields with a partial body (`patch.json`) (one of `--body` / `--project` / `--all` is required).

```json
{
  "name": "Critical production errors",
  "matchMinimumSeverityLevel": "critical"
}
```

```sh
vercel monitors update ar_abc123 --body ./patch.json
```

Change only the project scope.

```sh
vercel monitors update ar_abc123 --project my-app
```

> **Warning**: Deletion cannot be undone. The team's default monitors cannot be deleted.

```sh
vercel monitors rm ar_abc123
```

Delete without confirmation.

```sh
vercel monitors rm ar_abc123 --yes
```

### Managing notification destinations (Slack / webhook)

Authenticate with `vercel login` or a token. The team of the linked project is used; specify another team with `--scope <team>`. Running without a subcommand runs `ls`.

```sh
vercel monitors notifications
vercel monitors notifications ls ar_example
vercel monitors notifications ar_example --json
```

Link a Slack channel (the Vercel app must be installed and invited to the channel beforehand; `--slack-installation-id` can be omitted if there is only one installation).

```sh
vercel monitors notifications link ar_example --slack-channel C123
vercel monitors notifications link ar_example --slack-channel C123 --slack-installation-id icfg_example
```

Link an existing account webhook (pass the ID, not the URL; find the ID with `vercel webhooks list`). `--critical-only` notifies only for alerts that Vercel Agent has escalated to Critical.

```sh
vercel monitors notifications link ar_example --webhook wh_example
vercel monitors notifications link ar_example --webhook wh_example --critical-only
```

Change delivery settings (exactly one of `--critical-only` or `--no-critical-only` is required).

```sh
vercel monitors notifications update ar_example --slack-channel C123 --critical-only
vercel monitors notifications update ar_example --webhook wh_example --no-critical-only
```

Unlink (does not delete the webhook itself or uninstall the Slack app; `link` / `update` / `unlink` take effect immediately without a confirmation prompt).

```sh
vercel monitors notifications unlink ar_example --slack-channel C123
vercel monitors notifications unlink ar_example --webhook wh_example
```

## Notes

- Source: https://vercel.com/docs/cli/monitors (fetched 2026-11-14)
