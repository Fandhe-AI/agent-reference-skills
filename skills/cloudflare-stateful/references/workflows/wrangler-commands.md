---
source: https://developers.cloudflare.com/workflows/reference/wrangler-commands/
---

# Wrangler workflows commands

Summary of `wrangler workflows` subcommands for managing Workflows and their instances; full flag documentation lives in the cloudflare-wrangler skill.

## Signature / Usage

```sh
npx wrangler workflows list
npx wrangler workflows describe <NAME>
npx wrangler workflows delete <NAME>
npx wrangler workflows trigger <NAME> [PARAMS]
npx wrangler workflows instances list <NAME>
npx wrangler workflows instances describe <NAME> [ID]
npx wrangler workflows instances send-event <NAME> <ID>
npx wrangler workflows instances terminate <NAME> <ID>
npx wrangler workflows instances restart <NAME> <ID>
npx wrangler workflows instances pause <NAME> <ID>
npx wrangler workflows instances resume <NAME> <ID>
npx wrangler workflows instances delete <NAME> [ID]
```

## Options / Props

Flags shared by every subcommand:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| --local | boolean | — | Interact with a local dev session |
| --port | number | 8787 | Port of the local dev session |
| --json | boolean | false | Output the raw API response as JSON |

Subcommand-specific flags and arguments:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `list` --page | number | 1 | Show a specific page of the listing |
| `list` --per-page | number | — | Maximum workflows per page |
| `describe` / `delete` `<NAME>` | string (required) | — | Workflow name; `delete` also deletes the Workflow's instances |
| `trigger` `<NAME>` | string (required) | — | Workflow name |
| `trigger` `[PARAMS]` | string | — | Params for the instance, encoded as a JSON string |
| `trigger` --id | string | random UUIDv4 | Custom instance ID |
| `instances list` --reverse | boolean | false | Reverse order of the instances table |
| `instances list` --status | string | — | Filter by status: queued, running, paused, errored, terminated, complete |
| `instances list` --date-start | string | — | Only instances created at or after this ISO 8601 date |
| `instances list` --date-end | string | — | Only instances created at or before this ISO 8601 date (a date without time covers the whole UTC day) |
| `instances list` --page / --per-page | number | 1 / — | Pagination |
| `instances describe` `[ID]` | string | latest | Instance ID, or `latest` |
| `instances describe` --step-output | boolean | true | Include step output (set false to avoid clutter) |
| `instances describe` --truncate-output-limit | number | 5000 | Truncate step output after this many characters |
| `instances send-event` `<ID>` | string (required) | — | Instance ID, or `latest` |
| `instances send-event` --type | string (required) | — | Workflow event type |
| `instances send-event` --payload | string | `{}` | JSON string payload (for example `'{"key": "value"}'`) |
| `instances terminate` --rollback | boolean | false | Run registered rollback handlers before terminating |
| `instances restart` --from-step-name | string | — | Step name to restart from |
| `instances restart` --from-step-count | number | 1 | 1-based occurrence of the step name/type |
| `instances restart` --from-step-type | string | do | Step type, used when a name is shared across types |
| `instances delete` `[ID]` | string | — | Instance IDs (`latest` deletes the most recent) |
| `instances delete` --filename | string | — | JSON file containing an array of instance IDs |

## Notes

- `<ID>` accepts `latest` for the most recent instance on describe, send-event, terminate, restart, pause, resume, and delete.
- Wrangler global flags (`--config`, `--env`, `--cwd`, `--env-file`, `--profile`, version, and so on) are covered in the cloudflare-wrangler skill, as are the command pages for the rest of Wrangler.
- `terminate` is irreversible and `delete` removes state; run them only against the intended Workflow.
- `--local` requires Wrangler 4.79.0 or greater and a running `wrangler dev` session; see [local-development.md](./local-development.md).

## Related

- [local-development.md](./local-development.md)
- [trigger-workflows.md](./trigger-workflows.md)
- [workflow-instance.md](./workflow-instance.md)
