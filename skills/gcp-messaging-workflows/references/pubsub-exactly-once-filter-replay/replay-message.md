---
source: https://docs.cloud.google.com/pubsub/docs/replay-message
---

# Replay a message by seeking to a snapshot or timestamp

Walkthrough of replaying acknowledged Pub/Sub messages with `gcloud`: create a snapshot, seek to it, then seek to a timestamp (which requires `--retain-acked-messages`). Seek can also discard unacknowledged messages by marking them acknowledged.

## Signature / Usage

### Create and seek to a snapshot

Create a topic and a subscription with a short ack deadline:

```bash
gcloud pubsub topics create seek-demo-topic
gcloud pubsub subscriptions create seek-demo-sub --topic=seek-demo-topic --ack-deadline=10
```

Capture the state with a snapshot:

```bash
gcloud pubsub snapshots create my-snapshot --subscription=seek-demo-sub
gcloud pubsub snapshots list
```

Publish, pull and acknowledge a message:

```bash
gcloud pubsub topics publish seek-demo-topic --message 'hello, world'
gcloud pubsub subscriptions pull --auto-ack seek-demo-sub
```

Recover the message by seeking to the snapshot:

```bash
gcloud pubsub subscriptions seek seek-demo-sub --snapshot=my-snapshot
gcloud pubsub subscriptions pull seek-demo-sub --auto-ack
```

Seek another subscription on the same topic to the same snapshot:

```bash
gcloud pubsub subscriptions create seek-demo-sub2 --topic=seek-demo-topic --ack-deadline=10
gcloud pubsub subscriptions seek seek-demo-sub2 --snapshot=my-snapshot
```

```bash
gcloud pubsub subscriptions pull seek-demo-sub2 --auto-ack
```

Clean up:

```bash
gcloud pubsub snapshots delete my-snapshot
```

### Seek to a timestamp

Retain acknowledged messages first (only needed to seek to a timestamp):

```bash
gcloud pubsub subscriptions update seek-demo-sub --retain-acked-messages
```

```bash
gcloud pubsub topics publish seek-demo-topic --message 'hello, world'
gcloud pubsub subscriptions pull --auto-ack seek-demo-sub
```

Seek back in time:

Adapted (not in the official docs): the GNU-only `date -u -d '-10 min'` is replaced with the gcloud relative duration `-pt10m` (10 minutes ago, as described in `gcloud topic datetimes`), so the command does not depend on the `date` implementation; `TS_FORMAT` is still exported for the next block.

```bash
export TS_FORMAT=%Y-%m-%dT%H:%M:%SZ
gcloud pubsub subscriptions seek seek-demo-sub --time=-pt10m
```

```bash
gcloud pubsub subscriptions pull --auto-ack seek-demo-sub
```

### Skip (purge) all past messages

Adapted (not in the official docs): Shell variable expansions are double-quoted to prevent word splitting and globbing.

```bash
gcloud pubsub topics publish seek-demo-topic --message 'hello, world'
gcloud pubsub subscriptions seek seek-demo-sub --time="$(date -u +"${TS_FORMAT}")"
```

After about 60 seconds of propagation the message is no longer delivered; check by pulling without acknowledging:

```bash
gcloud pubsub subscriptions pull seek-demo-sub
```

## Options / Props

| Item | Value |
|---|---|
| Required roles (on the project) | Service Usage Admin (`roles/serviceusage.serviceUsageAdmin`), Pub/Sub Editor (`roles/pubsub.editor`) |
| Acked-message retention | With `retain-acked-messages` set, Pub/Sub retains acknowledged messages for 7 days |
| Snapshot rule | A subscription can seek to a snapshot if its topic is the same as the snapshot's topic |
| Delivery guarantee | Delivery latency is not guaranteed; messages retained in the snapshot are delivered at least once |
| Seek propagation | About 60 seconds |
| Console | **Replay messages** dialog on the subscription page: **To a previous time point** (requires **Retain acknowledged messages**) or **To a snapshot** |

## Notes

- Adapted from the official docs: unquoted shell variable expansions in the commands are double-quoted (`"${VAR}"`).
- Data loss: seeking to the current or a future time discards undelivered messages, and seeking back replays messages already processed. Run these commands on a disposable project first; `snapshots delete` is irreversible.
- `gcloud pubsub subscriptions pull --auto-ack` acknowledges messages as they are pulled, so messages acked before processing are lost on failure; use it for demos only.
- Source inconsistency: this page says acknowledged messages are retained for 7 days, while the subscription message retention page says acknowledged messages are retained up to the configured retention duration (minimum 10 minutes, maximum 31 days) and that 7 days is the default when `--message-retention-duration` is omitted (https://docs.cloud.google.com/pubsub/docs/subscription-message-retention).
- Adapted from the official docs: the source seeks with `--time=$(date -u -d '-10 min' +$TS_FORMAT)` and notes that the date arithmetic flags differ between the GNU and BSD (macOS) versions of `date`; the example uses `--time=-pt10m` (a relative duration; `gcloud topic datetimes` says relative durations may be used in any context that expects a date/time string) instead. The purge block keeps `date -u +"${TS_FORMAT}"`, which needs no arithmetic flag.
- Seek is eventually consistent; see the replay overview for details and limits.
- The source also shows Console steps; they are omitted.
- Source: https://docs.cloud.google.com/pubsub/docs/replay-message (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [replay-overview.md](./replay-overview.md)
- [subscription-message-filter.md](./subscription-message-filter.md)
