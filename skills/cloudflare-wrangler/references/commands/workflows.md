---
source: https://developers.cloudflare.com/workers/wrangler/commands/workflows/
---

# Workflows

Manage and configure Workflows using Wrangler.

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

Descriptions:

- `workflows list`: List Workflows associated to account
- `workflows describe`: Describe Workflow resource
- `workflows delete`: Delete workflow - when deleting a workflow, it will also delete it's own instances
- `workflows trigger`: Trigger a workflow, creating a new instance. Can optionally take a JSON string to pass a parameter into the workflow instance
- `workflows instances list`: Instance related commands (list, describe, terminate, pause, resume)
- `workflows instances describe`: Describe a workflow instance - see its logs, retries and errors
- `workflows instances send-event`: Send an event to a workflow instance
- `workflows instances terminate`: Terminate a workflow instance
- `workflows instances restart`: Restart a workflow instance
- `workflows instances pause`: Pause a workflow instance
- `workflows instances resume`: Resume a workflow instance
- `workflows instances delete`: Delete workflow instances

## Options / Props

Every `workflows` command accepts these flags (on the official page they are listed per command):

| Flag | Type | Default | Description |
| --- | --- | --- | --- |
| `--local` | boolean | — | Interact with local dev session |
| `--port` | number | 8787 | Port of the local dev session (default: 8787) |
| `--json` | boolean | false | Output the raw API response as JSON |

### `workflows list`

| Flag | Type | Default | Description |
| --- | --- | --- | --- |
| `--page` | number | 1 | Show a sepecific page from the listing, can configure page size using "per-page" |
| `--per-page` | number | — | Configure the maximum number of workflows to show per page |

### `workflows describe`

| Flag | Type | Description |
| --- | --- | --- |
| `<NAME>` | string (required) | Name of the workflow |

### `workflows delete`

| Flag | Type | Description |
| --- | --- | --- |
| `<NAME>` | string (required) | Name of the workflow |

### `workflows trigger`

| Flag | Type | Default | Description |
| --- | --- | --- | --- |
| `<NAME>` | string (required) | — | Name of the workflow |
| `[PARAMS]` | string | (empty) | Params for the workflow instance, encoded as a JSON string |
| `--id` | string | — | Custom instance ID, if not provided it will default to a random UUIDv4 |

### `workflows instances list`

| Flag | Type | Default | Description |
| --- | --- | --- | --- |
| `<NAME>` | string (required) | — | Name of the workflow |
| `--reverse` | boolean | false | Reverse order of the instances table |
| `--status` | string | — | Filters list by instance status (can be one of: queued, running, paused, errored, terminated, complete) |
| `--date-start` | string | — | Only list instances created at or after this date (ISO 8601, e.g. 2026-01-01 or 2026-01-01T13:00:00Z) |
| `--date-end` | string | — | Only list instances created at or before this date (ISO 8601). A date without a time covers the whole UTC day, so 2026-01-31 includes everything up to 2026-01-31T23:59:59.999Z |
| `--page` | number | 1 | Show a sepecific page from the listing, can configure page size using "per-page" |
| `--per-page` | number | — | Configure the maximum number of instances to show per page |

### `workflows instances describe`

| Flag | Type | Default | Description |
| --- | --- | --- | --- |
| `<NAME>` | string (required) | — | Name of the workflow |
| `[ID]` | string | latest | ID of the instance - instead of an UUID you can type 'latest' to get the latest instance and describe it |
| `--step-output` | boolean | true | Don't output the step output since it might clutter the terminal |
| `--truncate-output-limit` | number | 5000 | Truncate step output after x characters |

### `workflows instances send-event`

| Flag | Type | Default | Description |
| --- | --- | --- | --- |
| `<NAME>` | string (required) | — | Name of the workflow |
| `<ID>` | string (required) | — | ID of the instance - instead of an UUID you can type 'latest' to get the latest instance and send an event to it |
| `--type` | string (required) | — | Type of the workflow event |
| `--payload` | string | {} | JSON string for the workflow event (e.g., '{"key": "value"}') |

### `workflows instances terminate`

| Flag | Type | Default | Description |
| --- | --- | --- | --- |
| `<NAME>` | string (required) | — | Name of the workflow |
| `<ID>` | string (required) | — | ID of the instance - instead of an UUID you can type 'latest' to get the latest instance and describe it |
| `--rollback` | boolean | false | Run registered rollback handlers before terminating |

### `workflows instances restart`

| Flag | Type | Description |
| --- | --- | --- |
| `<NAME>` | string (required) | Name of the workflow |
| `<ID>` | string (required) | ID of the instance - instead of an UUID you can type 'latest' to get the latest instance and describe it |
| `--from-step-name` | string | Name of the step to restart from |
| `--from-step-count` | number | 1-based occurrence of the step name/type to restart from (defaults to 1) |
| `--from-step-type` | string | Step type to restart from, used when the same name is shared across step types (defaults to do) |

### `workflows instances pause`

| Flag | Type | Description |
| --- | --- | --- |
| `<NAME>` | string (required) | Name of the workflow |
| `<ID>` | string (required) | ID of the instance - instead of an UUID you can type 'latest' to get the latest instance and pause it |

### `workflows instances resume`

| Flag | Type | Description |
| --- | --- | --- |
| `<NAME>` | string (required) | Name of the workflow |
| `<ID>` | string (required) | ID of the instance - instead of an UUID you can type 'latest' to get the latest instance and resume it |

### `workflows instances delete`

| Flag | Type | Description |
| --- | --- | --- |
| `<NAME>` | string (required) | Name of the workflow |
| `[ID]` | string | IDs of the instances - you can type 'latest' to get the latest instance and delete it |
| `--filename` | string | Path to a JSON file containing an array of instance IDs |

## Notes

- The `wrangler workflows` command requires Wrangler version `3.83.0` or greater. Use `npx wrangler@latest` to always use the latest Wrangler version when invoking commands.
- All `wrangler workflows` commands support the `--local` flag to target a Workflow running in a local `wrangler dev` session instead of production. Use `--port` to specify the port of the dev session (defaults to `8787`). The `--local` flag requires Wrangler version `4.79.0` or greater. For more information, refer to the Workflows local development docs.
- Docs inconsistency: the official page links `wrangler dev` to the "general" commands page anchor `#dev`, but `dev` is documented on the Workers commands page.
- Typos in the official flag text (kept verbatim): "sepecific", "it's own instances".
- Workflows runtime API (`WorkflowEntrypoint`, `step.do`) belongs to the cloudflare-workers skill.
- Each command also accepts the global flags; see the global flags page.

## Related

- [Workers](./workers.md)
- [Global flags](./global-flags.md)
