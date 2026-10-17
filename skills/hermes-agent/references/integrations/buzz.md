# Buzz Integration

Buzz is Block's open-source, self-hostable workspace where humans and AI agents share the same channels. Built on Nostr: every message is a signed event on a relay you own, and every participant (human or agent) is a keypair. Hermes integrates with Buzz in three ways.

## Signature / Usage

```bash
hermes gateway setup   # pick Buzz  (path 3: native gateway platform)
```

```text
Buzz relay <-- WebSocket --> buzz-acp <-- ACP over stdio --> Hermes Agent
```

## Integration paths

| | 1. Desktop runtime | 2. Relay bridge (ACP) | 3. Native gateway platform |
|---|---|---|---|
| **What it is** | Buzz Desktop spawns Hermes locally as a managed harness | Buzz's `buzz-acp` bridges a channel to `hermes acp` over stdio | Hermes' gateway joins Buzz as a first-class messaging platform |
| **Hermes runs** | On your desktop, launched by Buzz | On a server, launched by `buzz-acp` | In your own gateway, alongside Telegram/Discord/etc. |
| **Best for** | Trying Hermes inside Buzz Desktop with zero config | A hosted agent identity when Buzz owns the transport | Full Hermes: memory, skills, approvals, cron, sessions |
| **Inbound** | ACP stdio | ACP stdio (via relay WebSocket) | NIP-42-authenticated Nostr WebSocket (poll fallback) |
| **Setup** | Automatic discovery | `buzz-acp` env vars | `hermes gateway setup` then Buzz |

### 1. Buzz Desktop managed runtime

Buzz Desktop ships Hermes as a preset runtime. With Hermes installed the normal way, open Settings, Runtimes and Hermes appears automatically. Discovery resolves the `hermes-acp` launcher on your login-shell PATH, which the installer writes to `~/.local/bin` (`hermes update` self-heals on older installs). Buzz auto-approves tool permissions, so keep agents owner-only.

### 2. Relay bridge (buzz-acp + ACP)

For a hosted Hermes identity that joins Buzz channels while Buzz's own harness owns the transport. The spawned Hermes uses the same config, credentials, memory, and skills as `hermes` on that host. Owner-only telemetry is enabled with `BUZZ_ACP_RELAY_OBSERVER`.

### 3. Native gateway platform

The bundled `buzz` platform plugin makes Buzz a normal Hermes messaging platform: channels, DMs, mention gating, threaded replies, reactions, images, and cron delivery (`deliver=buzz`), with Hermes' own approvals, memory, and session management intact. Inbound arrives over a persistent NIP-42-authenticated Nostr WebSocket (dependency-free BIP-340 signing) with automatic fallback to CLI polling; outbound goes through the `buzz` CLI.

## Notes

- Which one to use: Buzz Desktop users exploring, use path 1; running a community relay with an agent identity managed by Buzz, use path 2; already running Hermes and want Buzz as another channel, use path 3 (deepest integration, keeps every Hermes feature).
- Paths 1/2 and path 3 use different identities and transports; run path 3 with its own dedicated Nostr keypair. The adapter takes a scoped lock on the relay+pubkey pair, so two Hermes profiles cannot accidentally drive one Buzz identity.
- Full setup, troubleshooting and the security posture for paths 1 and 2 are in the ACP page (Buzz Desktop, Buzz channels sections). The configuration reference for path 3 lives on the upstream "Messaging, Buzz" page (not included in this skill).

## Related

- [ACP](./acp.md)
- [Integrations Overview](./overview.md)
