---
source: https://developers.cloudflare.com/queues/reference/wrangler-commands/, https://developers.cloudflare.com/queues/get-started/, https://developers.cloudflare.com/queues/configuration/pull-consumers/, https://developers.cloudflare.com/queues/configuration/pause-purge/, https://developers.cloudflare.com/queues/configuration/dead-letter-queues/, https://developers.cloudflare.com/queues/configuration/configure-queues/, https://developers.cloudflare.com/queues/configuration/batching-retries/, https://developers.cloudflare.com/queues/configuration/local-development/
---

# Queues

Copy-paste commands for creating and managing Cloudflare Queues, consumers, dead letter queues, and HTTP pull. Queues Wrangler commands call REST control-plane APIs, so they act on your account directly. Full flag tables for every `wrangler queues` subcommand belong to the cloudflare-wrangler skill.

## Signature / Usage

### Create a producer project

```sh
npm create cloudflare@latest -- producer-worker
```

### Create, inspect, list, and update a queue

```sh
npx wrangler queues create <MY-QUEUE-NAME>
```

```sh
npx wrangler queues list
```

```sh
npx wrangler queues info <NAME>
```

```sh
npx wrangler queues update <QUEUE-NAME> --delivery-delay-secs 60 --message-retention-period-secs 3000
```

`create` also accepts `--jurisdiction`, `--delivery-delay-secs` (0 to 86400), and `--message-retention-period-secs` (60 to 86400 on the free tier, otherwise 60 to 1209600; the limits page instead says Free retention is fixed at 24 hours).

### Delete a queue

> **Warning**: Deleting a queue is destructive and affects every producer and consumer bound to it. Confirm the queue name before running.

```sh
npx wrangler queues delete <NAME>
```

### Deploy and tail logs

```sh
npx wrangler deploy
```

```sh
npx wrangler tail
```

### Add a Worker consumer

```sh
npx wrangler queues consumer add <QUEUE-NAME> <SCRIPT-NAME>
```

Optional flags: `--batch-size`, `--batch-timeout`, `--message-retries`, `--dead-letter-queue`, `--max-concurrency`, `--retry-delay-secs`. The `consumer worker add` form takes the same arguments and flags.

```sh
npx wrangler queues consumer worker add <QUEUE-NAME> <SCRIPT-NAME>
```

### List and remove Worker consumers

```sh
npx wrangler queues consumer list <QUEUE-NAME>
```

```sh
npx wrangler queues consumer remove <QUEUE-NAME> <SCRIPT-NAME>
```

If you remove a consumer with Wrangler but keep the `[[queues.consumers]]` entry in your Wrangler configuration, later deployments of the Worker fail while re-adding the conflicting consumer. Remove the configuration entry first.

### Attach a dead letter queue (DLQ)

Adapted (not in the official docs): the official snippet uses unquoted `$QUEUE_NAME $SCRIPT_NAME` and omits `npx`; this version quotes the variables and adds `npx`.

```sh
npx wrangler queues consumer add "${QUEUE_NAME}" "${SCRIPT_NAME}" --dead-letter-queue="${NAME_OF_OTHER_QUEUE}"
```

If the named DLQ does not exist, Cloudflare creates it automatically in the same jurisdiction as the source queue. Without a DLQ, messages that exhaust their retries are deleted permanently.

### Set the retry delay for a consumer

Adapted (not in the official docs): the official snippets write the queue name as `$QUEUE-NAME` (a hyphen is not valid in a shell variable name) and run `npx wrangler@latest`; this version uses `"${QUEUE_NAME}"` and the project's installed `npx wrangler`.

```sh
npx wrangler queues consumer worker add "${QUEUE_NAME}" "${WORKER_SCRIPT_NAME}" --retry-delay-secs=60
```

```sh
npx wrangler queues consumer http add "${QUEUE_NAME}" --retry-delay-secs=60
```

### Delay delivery of all messages in a new queue

Adapted (not in the official docs): `$QUEUE-NAME` replaced by `"${QUEUE_NAME}"`, as above.

```sh
npx wrangler queues create "${QUEUE_NAME}" --delivery-delay-secs=300
```

### Enable an HTTP pull consumer

```sh
npx wrangler queues consumer http add <QUEUE-NAME>
```

Adding an HTTP consumer fails if the queue already has a consumer. Remove the Worker consumer first with `npx wrangler queues consumer worker remove <QUEUE-NAME> <SCRIPT-NAME>`. Enabling HTTP pull from a Wrangler configuration file is no longer supported.

```sh
npx wrangler queues consumer http list <QUEUE-NAME>
```

```sh
npx wrangler queues consumer http remove <QUEUE-NAME>
```

### Pull a batch over HTTP

Set `QUEUES_TOKEN` in the environment to an API token with the `com.cloudflare.api.account.queues_read` and `com.cloudflare.api.account.queues_write` permissions. Do not paste a real token into shared files or shell history.

```bash
curl "https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT_ID}/queues/${QUEUE_ID}/messages/pull" \
--header "Authorization: Bearer ${QUEUES_TOKEN}" \
--header "Content-Type: application/json" \
--data '{ "visibility_timeout_ms": 10000, "batch_size": 2 }'
```

Read and write are both required because consuming mutates queue state (acknowledgements). A paused queue answers pull requests with `409` and the message `queue_delivery_paused`.

### Pause and resume delivery

```sh
npx wrangler queues pause-delivery <QUEUE-NAME>
```

```sh
npx wrangler queues resume-delivery <QUEUE-NAME>
```

Queues keep receiving and storing messages while paused, and messages still expire after the retention period. Pausing affects both push (Worker) and HTTP pull consumers.

### Purge all messages

> **Warning**: Purging permanently deletes every message currently stored in the queue, including delayed messages. It is irreversible. In-flight messages might still be processed, and messages sent during the purge might not be purged.

```sh
npx wrangler queues purge <QUEUE-NAME>
```

Wrangler asks you to type the queue name to confirm. The `--force` flag skips that confirmation; avoid it outside disposable queues. A purge counts as one billable operation regardless of message count.

### Run producer and consumer locally

Adapted (not in the official docs): `npx wrangler@latest` is replaced by the project's installed `npx wrangler`.

```sh
npx wrangler dev
```

Adapted (not in the official docs): `npx wrangler@latest` is replaced by `npx wrangler`.

```sh
npx wrangler dev -c wrangler.jsonc -c consumer-worker/wrangler.jsonc --persist-to .wrangler/state
```

The second form runs a producer and a separate consumer Worker in one local session with shared persisted state.

### Manage event subscriptions

```sh
npx wrangler queues subscription create <queue-name> --source <source-type> --events <event1,event2> --<source-specific-option> <value>
```

```sh
npx wrangler queues subscription list <queue-name>
```

```sh
npx wrangler queues subscription delete <queue-name> --id <subscription-id>
```

Deleting a subscription asks for confirmation unless `--force` is passed.

## Notes

- `delete`, `purge`, and `consumer remove` act on the account's real queue immediately; confirm the queue name first.
- Adapted from the official docs: commands that the official pages run as `npx wrangler@latest` use `npx wrangler`, so they run the Wrangler version installed in the project (3.38.0 or later is needed for the delay flags and local delays).
- Keep `QUEUES_TOKEN` in the environment or a secret store, never in shell history or version control.
- Corrected from the official docs: the pull-consumers page calls the consumer configuration entry `[[queues.consumer]]`; the Wrangler configuration key is `queues.consumers` (`[[queues.consumers]]` in TOML), as in the configure-queues examples.

## Related

- [Wrangler commands](../references/queues/wrangler-commands.md)
- [Pull consumers](../references/queues/pull-consumers.md)
- [Pause and Purge](../references/queues/pause-purge.md)
