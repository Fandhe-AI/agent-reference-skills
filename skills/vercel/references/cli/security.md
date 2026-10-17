# vercel security

Run your team's security checks from the terminal. Surfaces the same checks as the team's Security Dashboard, lists the findings behind each check, and can output the raw report as JSON.

## Signature / Usage

```bash
# Run all checks for the current team
vercel security

# List every finding across all checks
vercel security check --findings

# Deep-dive one check and list its findings
vercel security check [check-name]

# Output the raw report as JSON
vercel security check --json

vercel security check --project my-app
vercel security check [check-name] --limit 200
vercel security check --json | jq '.report'
```

`check` is the default subcommand, so `vercel security` and `vercel security check` are equivalent. Pass one or more check slugs to run only those checks.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `--findings` | Boolean | List individual findings under each check, including muted ones. Implied when you pass a check slug |
| `--limit <N>` | Number | Max findings per check. Default 100, API caps at 200. Violation counts stay exact when findings are capped |
| `-p, --project <NAME>` | String | Scope the report to one project by name or ID |
| `-F, --format <FORMAT>` | String | Output format. Only `json` is supported |
| `--json` | Boolean | Shorthand for `--format json`; outputs the raw API response |
| `check` (argument) | String | Optional, one or more check slugs. Unknown slugs fail immediately with the list of valid slugs |

Available checks:

| Slug | Risk | What it checks |
|------|------|----------------|
| `members-no-mfa` | high | Team members without multi-factor authentication |
| `members-too-many-owners` | high | Team owners to review |
| `pats-no-expiration` | high | Personal access tokens that never expire |
| `env-vars-creds-instead-of-oidc` | high | Long-lived credentials where OIDC is available |
| `depl-no-git-fork-protection` | high | Projects without Git fork deploy prevention |
| `proj-no-preview-depl-protection` | high | Projects without preview deployment protection |
| `env-vars-non-sensitive` | medium | Environment variables not marked Sensitive |
| `env-vars-non-sensitive-stale` | medium | Environment variables older than 90 days |
| `env-vars-exposed-web-app-fwk` | medium | Environment variables exposed via a web application framework |

Check status values:

| Status | Meaning |
|--------|---------|
| `failing` | One or more violations found |
| `passing` | No violations found |
| `muted` | Every finding for the check is muted |
| `no access` | Your role lacks permission to read the data for this check |
| `error` | The check could not be computed |

## Notes

- Checks run against the current team; if no team is selected, run `vercel switch` first.
- The summary table has columns `Check`, `Risk`, `Status`, `Violations`, `Muted`, `Description`. Muted findings appear dimmed and tagged `(muted)`. When a check has more violations than shown, `Showing N of M findings` is printed; raise the cap with `--limit`.
- In non-interactive environments the JSON report is written to stdout automatically, and every error path emits a structured JSON payload with a machine-readable `reason` and suggested follow-up commands.
- Exit code `0`: report produced, even when checks are failing or muted. Exit code `1`: unknown slug, invalid flag, missing team scope, or failed API request. Gate CI on the report contents, not the exit code.
- The report can contain member emails, token names, and project settings. Treat output as sensitive and do not write it to shared or public logs.
- Source: https://vercel.com/docs/cli/security

## Related

- [alerts.md](./alerts.md)
- [activity.md](./activity.md)
- [switch.md](./switch.md)
- [global-options.md](./global-options.md)
