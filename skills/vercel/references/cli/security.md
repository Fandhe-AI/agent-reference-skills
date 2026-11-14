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

# List open Security Review vulnerabilities
vercel security vulnerabilities
vercel security vulnerabilities inspect my-app/12
vercel security vulnerabilities dismiss my-app/12 --reason false-positive
vercel security vulnerabilities reopen my-app/12
vercel security vulnerabilities --project my-app --environment production --severity critical
vercel security vulnerabilities --repository acme/app
vercel security vulnerabilities dismiss my-app/12 --reason accepted-risk --message "Internal tool behind SSO"
```

`check` is the default subcommand, so `vercel security` and `vercel security check` are equivalent. Pass one or more check slugs to run only those checks.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `--findings` | Boolean | List individual findings under each check, including muted ones. Implied when you pass a check slug |
| `-n, --limit <N>` | Number | Max findings per check. Default 100, maximum 200; a higher value fails the command. Violation counts stay exact when findings are capped |
| `-p, --project <NAME_OR_ID>` | String | Scope the report to one project by name or ID |
| `--json` | Boolean | Output the raw report as JSON |
| `check` (argument) | String | Optional, one or more check slugs. Unknown slugs fail immediately with the list of valid slugs |

### vulnerabilities

Lists and triages the vulnerabilities Security Review reports (same ones as the team's Vulnerabilities dashboard). `list` is the default subcommand. Each vulnerability has a reference: `<project>/<number>` for a project, or `<owner>/<repo>/<number>` for a repository; `inspect`, `dismiss`, and `reopen` take the reference or the vulnerability ID.

`list` options (open vulnerabilities by default, 20 at a time, Production and most severe first):

| Name | Type | Description |
|------|------|-------------|
| `-p, --project <NAME_OR_ID>` | String | Only list vulnerabilities in this project |
| `--repository <REPOSITORY>` | String | Only list vulnerabilities in this Git repository (`<owner>/<repo>`), including projects deployed from it; any other format fails |
| `-e, --environment <ENVIRONMENT>` | String | Only list vulnerabilities in this environment |
| `--git-branch <BRANCH>` | String | Only list vulnerabilities on this Git branch |
| `--status <STATUS>` | String | Comma-separated: `open`, `closed`, `dismissed`, or `all` (default `open`) |
| `--severity <SEVERITY>` | String | Comma-separated: `critical`, `high`, `medium`, `low` |
| `-q, --query <TEXT>` | String | Search titles, summaries, and descriptions |
| `-n, --limit <NUMBER>` | Number | Number to return (default 20, maximum 100) |
| `--next <CURSOR>` | String | Show the next page, using the cursor from the previous page |
| `--json` | Boolean | Output as JSON without descriptions and fixes, with a `pagination.next` cursor |

`dismiss` options:

| Name | Type | Description |
|------|------|-------------|
| `--reason <REASON>` | String | `false-positive` or `accepted-risk`; without it the command prompts in a terminal and fails in non-interactive runs or with `--json` |
| `--message <TEXT>` | String | Note recorded with the dismissal, up to 500 characters |
| `--json` | Boolean | Output the vulnerability and the outcome as JSON |

`inspect` shows one vulnerability in full (`--json` outputs it as JSON); `reopen` reopens a dismissed vulnerability (`--json` supported).

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
- Exit code `0`: report produced, even when checks are failing or muted. Exit code `1`: missing team scope or failed API request. Exit code `2`: unknown slug or invalid flag. Gate CI on the report contents, not the exit code.
- Muting individual findings does not change a check's status to `muted`; muted findings do not count as violations, so the check is `failing` or `passing` based on the rest. `muted` means the whole check is muted
- `vulnerabilities`: dismissing an already-dismissed vulnerability changes nothing and exits `0` (JSON outcome `unchanged`); a different reason or message fails, so reopen then dismiss again. Closed vulnerabilities cannot be dismissed or reopened. If Security Review is not enabled for the team the command fails. Output is JSON only with `--json`; non-terminal `list` prints tab-separated rows. Vulnerability output includes source code and exploit details: treat it as sensitive
- The earlier `-F, --format` flag is not in the current official page
- The report can contain member emails, token names, and project settings. Treat output as sensitive and do not write it to shared or public logs.
- Source: https://vercel.com/docs/cli/security (fetched 2026-11-14)

## Related

- [alerts.md](./alerts.md)
- [activity.md](./activity.md)
- [switch.md](./switch.md)
- [global-options.md](./global-options.md)
