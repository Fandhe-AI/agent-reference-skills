# Hosted Rooms Across Local Profile Owners

How hosted (group) room execution seats profiles served by different local gateways, using the canonical session authority and private control sockets.

## Signature / Usage

A profile that another local gateway owns joins a room only as an explicit destination in the source profile's configuration:

```yaml
hosted_rooms:
  profiles:
    helper: /absolute/path/to/profiles/helper
```

## Notes

- Each profile runs its own ordinary gateway process and owns only its own state database. The source room driver contacts destination owners through their private OS-authenticated control sockets; it never launches a legacy session worker or opens a destination database.
- A room may seat the gateway's own profile and, under `gateway.multiplex_profiles`, every profile the multiplexer serves (each with its own authority and database). For a host-scoped connection (Desktop's shared socket, the dashboard; Desktop's New Group Chat) no configuration is needed. A connection bound to one profile seats that profile plus the profiles its `hosted_rooms.profiles` entries name; an entry naming a served profile must point at its served home.
- The entry name must match the destination profile name, and the destination needs a live owner: its own gateway (a `gateway.standalone` profile) or another local multiplexer that serves it. One home answers to one name. An entry naming a home already seated under another name, or malformed, is ignored with one log line (only a new member naming it is refused; existing rooms keep running).
- Directory existence alone does not authorize execution: a profile installed but not served here is refused at room creation, naming the member. A served profile whose `profiles/<name>` directory is a link is refused too. Configuration entries are exposed as roster metadata without reading the destination config or sessions.
- Execution between two profiles on the same multiplexer is covered by in-process tests against the real private control socket; it is not yet certified on a live multi-profile install.
- The destination reverse-checks room ownership, membership, durable task identity, hosted generation and frozen prompt with the source at submit and again before dequeue, and keeps a source-namespaced binding in its own database. An unavailable source or destination fails closed; retained work is not silently rerouted. The producer interface is private (not available to public WebSocket clients); local same-OS-user trust applies to the control sockets.
- Recovery: startup publishes adapters before hosted recovery and canonical supervision replaces the legacy room driver. Completed retries recover the same receipt without new inference. Started work after an owner crash is unknown and pauses followers; Retry cannot replay it. The owner must use Discard with the exact room, member, task and hosted generation (repeating it recovers a lost acknowledgement).
- Desktop discovers canonical groups and sends controls to the captured connection, profile and room; unknown work offers confirmed Discard, never Retry. Renderer-only groups need explicit new canonical-room creation (history is not replayed). The canonical workspace handles text and execution controls; attachment publication is a separate room capability.
- Source: https://hermes-agent.nousresearch.com/docs/developer-guide/hosted-profile-owners (pinned to v0.23.1)

## Related

- [Multiplexing Gateway](../architecture/multiplexing-gateway.md)
- [Gateway Session Lifecycle](../architecture/gateway-session-lifecycle.md)
- [Gateway Local Sessions](../architecture/gateway-local-sessions.md)
