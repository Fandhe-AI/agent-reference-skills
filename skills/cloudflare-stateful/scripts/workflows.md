---
source: https://developers.cloudflare.com/workflows/reference/wrangler-commands/, https://developers.cloudflare.com/workflows/get-started/guide/, https://developers.cloudflare.com/workflows/build/trigger-workflows/, https://developers.cloudflare.com/workflows/build/local-development/, https://developers.cloudflare.com/workflows/build/events-and-parameters/
---

# Workflows

Copy-paste commands for creating, running, triggering, and managing Cloudflare Workflows and their instances. Commands act on your deployed account by default; add `--local` to target a `wrangler dev` session. Full flag tables for `wrangler workflows` belong to the cloudflare-wrangler skill.

## Signature / Usage

### Create a project from the starter template

```sh
npm create cloudflare@latest workflows-starter -- --template "cloudflare/workflows-starter"
```

To build from scratch instead, create a Worker project with `npm create cloudflare@latest -- my-workflow`.

### Run locally

```sh
npx wrangler dev
```

### Deploy

```sh
npx wrangler deploy
```

Python Workflows use the same commands (`npx wrangler dev` and `npx wrangler deploy`).

### List and describe Workflows

```sh
npx wrangler workflows list
```

```sh
npx wrangler workflows describe <NAME>
```

### Trigger a Workflow

Adapted (not in the official docs): `npx wrangler@latest` is replaced by the project's installed `npx wrangler`; see Notes.

```sh
npx wrangler workflows trigger workflows-starter '{"some":"data"}'
```

`workflows trigger <NAME> [PARAMS]` takes the instance parameters as a JSON string. `--id` sets a custom instance ID; otherwise a random UUIDv4 is used.

### List instances

```sh
npx wrangler workflows instances list <NAME>
```

Filter with `--status` (one of queued, running, paused, errored, terminated, complete), `--date-start`, `--date-end`, `--page`, and `--per-page`.

### Describe an instance

```sh
npx wrangler workflows instances describe <NAME> [ID]
```

Pass `latest` instead of an ID to describe the most recent instance. `--step-output` (default true) and `--truncate-output-limit` (default 5000) control step output.

### Send an event to an instance

```sh
npx wrangler workflows instances send-event <NAME> <ID>
```

`--type` (the event type) is required. `--payload` takes a JSON string such as `'{"key": "value"}'` and defaults to `{}`. `<ID>` may be `latest`.

### Pause and resume an instance

```sh
npx wrangler workflows instances pause <NAME> <ID>
```

```sh
npx wrangler workflows instances resume <NAME> <ID>
```

If the Workflow has reached its maximum concurrent instances, a resumed instance may be queued until a concurrency slot is free.

### Terminate an instance

> **Warning**: A terminated instance cannot be resumed.

```sh
npx wrangler workflows instances terminate <WORKFLOW_NAME> <INSTANCE_ID> --rollback
```

`--rollback` runs registered rollback handlers before terminating; omit it to terminate without running them. For a local instance during `wrangler dev`, add `--local`.

### Restart an instance

```sh
npx wrangler workflows instances restart <NAME> <ID>
```

Optionally restart from a step with `--from-step-name`, `--from-step-count` (1-based occurrence, defaults to 1), and `--from-step-type` (defaults to `do`).

### Delete instances

> **Warning**: Instance deletion is destructive. Wrangler accepts up to 100 IDs total per call; `latest` deletes the most recently created instance.

```sh
npx wrangler workflows instances delete <WORKFLOW_NAME> <INSTANCE_ID>
npx wrangler workflows instances delete <WORKFLOW_NAME> <INSTANCE_ID> <INSTANCE_ID>
npx wrangler workflows instances delete <WORKFLOW_NAME> latest
npx wrangler workflows instances delete <WORKFLOW_NAME> --filename ./instance-ids.json
# For local Workflow instances during wrangler dev:
npx wrangler workflows instances delete <WORKFLOW_NAME> <INSTANCE_ID> --local
```

The file passed to `--filename` holds a top-level JSON array of strings:

```json
["instance-abc", "instance-def"]
```

### Delete a Workflow

> **Warning**: Deleting a Workflow is destructive and affects all of its instances. Confirm the name first.

```sh
npx wrangler workflows delete <NAME>
```

### Manage Workflows against a local dev session

The `--local` flag requires Wrangler 4.79.0 or greater (4.142.0 or above for Workflows declared only in `exports`). While `npx wrangler dev` is running:

```sh
npx wrangler workflows list --local
```

```sh
npx wrangler workflows trigger my-workflow --local
```

```sh
npx wrangler workflows instances describe my-workflow <INSTANCE_ID> --local
```

All commands accept `--port` to target a specific `wrangler dev` session (default 8787).

## Notes

- Adapted from the official docs: the official guide runs `npx wrangler@latest workflows trigger ...` and `npx wrangler@latest dev|deploy` for Python; these use `npx wrangler`, the version installed in the project. `wrangler workflows` needs Wrangler 3.83.0 or greater, and `--local` needs 4.79.0 or greater.
- Without `--local`, these commands act on the deployed Workflow in your account; `terminate`, `restart`, and `delete` change or remove real instance state.
- `send-event` payloads reach the instance's `waitForEvent` step; send only data your Workflow validates.

## Related

- [Wrangler workflows commands](../references/workflows/wrangler-commands.md)
- [Local development](../references/workflows/local-development.md)
