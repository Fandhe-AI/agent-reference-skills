# Kanban Multi-Gateway Deployment

Hermes supports several gateway processes running concurrently, one per profile (default, writer, admin, coder, researcher). Only one gateway owns the kanban dispatcher; notification delivery is profile-owned.

## Signature / Usage

On every non-owning profile gateway, add to `~/.hermes/config.yaml`:

```yaml
kanban:
  dispatch_in_gateway: false
```

Or set the env var: `HERMES_KANBAN_DISPATCH_IN_GATEWAY=false`

## Options / Props

| Gateway role | dispatch_in_gateway | Opens subscribed board DBs? | Dispatcher | Notifier |
|---|---|---|---|---|
| default (confirmed dispatch-lock owner) | true (default) | yes | yes | owned profiles + legacy unstamped subscriptions |
| writer, admin, coder, etc. | false | yes, when the profile has subscriptions | no | that gateway's owned profiles |

## Notes

- Source: https://hermes-agent.nousresearch.com/docs/user-guide/features/kanban-multi-gateway (pinned to v0.22.2)
- The dispatching owner (typically `default`) needs no change. Dispatch is single-owner so gateways do not race to spawn the same work.
- Each gateway polls only subscriptions for profiles whose platform adapters it hosts; an atomic event claim prevents duplicate delivery across watcher processes. Non-dispatch gateways still deliver for their own adapters and skip boards with no subscriptions owned by their profiles.
- A `changes_requested` review event is delivered as an actionable review-BLOCK notification. Subscriptions using `notify+wake` also wake the exact originating chat/thread/session; `notify` is passive-only and `wake` wake-only. Review feedback never creates, unblocks, requeues or otherwise mutates a task.
- Since v0.22.2, gateway multiplexing is on by default (`gateway.multiplex_profiles` defaults to `true`; `false` is retired and rewritten to `true`), so a single host gateway serves every profile. A named profile runs its own gateway only with `gateway.standalone: true` in that profile's own `profiles/<name>/config.yaml` (a temporary compatibility shim) or `--force`; the per-profile setup on this page applies to that case. Source: https://hermes-agent.nousresearch.com/docs/user-guide/multi-profile-gateways

## Related

- [Multiplexing gateway](../architecture/multiplexing-gateway.md)
- [Kanban Multi-Agent](./kanban.md)
- [Kanban worker lanes](./kanban-worker-lanes.md)
