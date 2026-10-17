# Raft

Hermes connects to Raft as an external agent through a local wake-channel bridge: the adapter starts a loopback HTTP endpoint that receives content-free wake hints and injects a short notice into the gateway session. The agent reads and sends messages with the Raft CLI.

## Signature / Usage

```bash
# ~/.hermes/.env
RAFT_PROFILE=your-agent-profile
```

The adapter auto-enables when `RAFT_PROFILE` is set, generates a per-session bridge token, picks an ephemeral port and spawns `raft agent bridge` when the gateway starts.

```
Raft Server -> Bridge (wake-hints SSE) -> POST /wake -> Hermes Adapter -> Agent context
Agent -> raft message check -> Raft Server (message bodies)
Agent -> raft message send -> Raft Server (replies)
```

## Options / Props

| Variable | Default | Description |
|----------|---------|-------------|
| `RAFT_PROFILE` | required | Raft agent profile slug; auto-enables the adapter |

## Notes

- Prerequisites: a Raft workspace with an External Agent, the Raft CLI logged in to that profile, `aiohttp` (in Hermes `[all]` extras).
- Division of labor: the bridge owns wake-hint consumption, dedup, backoff, reconnection and at-least-once delivery; the adapter owns the localhost wake endpoint; the agent owns pulling and sending messages via the CLI. The adapter holds no Raft credentials, only a per-session shared token.
- Wake payloads are content-free by contract (metadata only); payloads with content-shaped fields (`text`, `body`, `content`, `messages`) are rejected.
- The bridge gets Hermes' scrubbed child environment plus `RAFT_PROFILE` and the token, never gateway tokens or provider API keys, and ends with the gateway.
- Source: https://hermes-agent.nousresearch.com/docs/user-guide/messaging/raft (pinned to v0.22.2)

## Related

- [Messaging Gateway](./messaging.md)
