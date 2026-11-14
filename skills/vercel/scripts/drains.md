# Drains

List, create, update, pause, and delete Drains (forward logs, traces, Web Analytics, and Speed Insights to external endpoints)

Authenticate with `vercel login` or a token; the current team is used (use `--scope` for another team). `vercel drains` without a subcommand lists drains. All subcommands support `--json`. Pass the drain ID shown by `list` as `<drain>`.

## Signature / Usage

### Listing

```sh
vercel drains
vercel drains list --scope my-team
```

Filter by project and output as JSON (`drains` and `pagination`).

```sh
vercel drains list --project my-app --json
```

Fetch the next page (pass the `pagination.next` cursor to `--next`; it is `null` on the last page).

```sh
vercel drains list --limit 10 --json
vercel drains list --limit 10 --next your_next_cursor_here --json
```

### Inspecting details

Text output shows only the endpoint host (use `--show-full-url` for the path and query). JSON output includes the full URL, which may contain credentials (the signing secret is not included, and delivery header values are masked).

```sh
vercel drains inspect drn_example
vercel drains inspect drn_example --json
```

### Creating

Create for a custom HTTP endpoint. `--name` / `--type` / `--url` are required. `--type` is `logs` / `traces` / `analytics` / `speed-insights`; `--encoding` defaults to `json` (`json` / `ndjson` for `logs` / `analytics` / `speed-insights`, `json` / `proto` for `traces`).

```sh
vercel drains create --name app-logs --type logs --url https://example.com/drain
```

Filter by project, environment, and source (`--environment` and `--source` apply to logs only).

```sh
vercel drains create --name production-logs --type logs --url https://example.com/drain --project my-app,my-api --environment production --source lambda
```

Send 10% of traces to an OTLP HTTP endpoint with Protobuf encoding.

```sh
vercel drains create --name app-traces --type traces --url https://example.com/v1/traces --encoding proto --sample-rate 10
```

Pass the signing secret (for the `x-vercel-signature` header) with `--secret`. Specifying `-` reads it from stdin, so it does not remain in command-line arguments. Delivery headers use `--header "Name: value"` (repeatable). For endpoint authentication and signing, see [securing drains](https://vercel.com/docs/drains/security).

### Updating

Pass the drain ID and at least one option to change (creation options other than `--type` can be used; `--header` / `--project` / `--source` / `--environment` replace the existing values rather than adding to them).

```sh
vercel drains update drn_example --url https://example.com/new-drain
vercel drains update drn_example --sample-rate 100
```

Send data for all projects again (cannot be combined with `--project`).

```sh
vercel drains update drn_example --all
```

### Pausing and resuming

Data generated while paused is not sent and cannot be recovered after resuming. `pause` asks for confirmation, so add `--yes` (`-y`) in scripts or with `--json`. `resume` needs no confirmation.

```sh
vercel drains pause drn_example
vercel drains resume drn_example
```

```sh
vercel drains pause drn_example --yes --json
```

### Deleting

> **Warning**: Deletion is permanent and cannot be undone.

```sh
vercel drains delete drn_example
```

In scripts or with JSON output, skip confirmation with `--yes` (`-y`).

```sh
vercel drains delete drn_example --yes --json
```

## Notes

- Source: https://vercel.com/docs/cli/drains (fetched 2026-11-14)
- If `create` fails with an unknown result, check with `vercel drains list` that it was not already created before retrying.
