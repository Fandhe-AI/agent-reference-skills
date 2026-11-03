---
source: https://developers.cloudflare.com/workers/observability/logs/real-time-logs/
---

# Observability

Tail live logs from a deployed Worker with `wrangler tail`. Config: see [../references/commands/README.md](../references/commands/README.md).

## Start a log tail

```sh
npx wrangler tail
```

Run from the Worker project directory, or pass `[WORKER]` (name or route). At most 10 clients can view a Worker's logs at once.

## Tail with pretty output

```sh
npx wrangler tail --format pretty
```

`--format` accepts `"json"` or `"pretty"`.

## Filter the tail (flag table)

| Flag | Description (from the docs) |
| --- | --- |
| `--format` `"json" \| "pretty"` | The format of log entries |
| `--status` `"ok" \| "error" \| "canceled"` | Filter by invocation status |
| `--header` `string` | Filter by HTTP header |
| `--method` `string` | Filter by HTTP method |
| `--sampling-rate` `number` | Adds a percentage of requests to log sampling rate |
| `--search` `string` | Filter by a text match in console.log messages |
| `--ip` `string` | Filter by the IP address the request originates from. Use "self" to filter for your own IP |
| `--version-id` `string` | Filter by Worker version |

Pass these to `npx wrangler tail`. Use them when a high-volume Worker enters sampling mode (messages dropped); it may take up to 60 seconds to exit sampling mode after adding a filter. `--env` is a global flag for selecting the environment.

## Query tail output with jq

```sh
npx wrangler tail | jq .event.request.url
```
