# A2A (Agent-to-Agent)

The Hermes A2A plugin implements the open Agent2Agent protocol (v1.0): your agent can call other A2A agents as tools, and other agents can send tasks to Hermes over HTTP (JSON-RPC 2.0, Agent Card, SSE streaming, push notifications).

## Signature / Usage

```yaml
gateway:
  platforms:
    a2a:
      enabled: true
      extra:
        port: 9900
```

```bash
hermes gateway setup                          # pick A2A
hermes tools enable a2a --platform cli        # outbound tools (off by default)
hermes tools enable a2a --platform a2a        # let inbound tasks call peers (chaining)
```

Known peers:

```yaml
a2a_agents:
  researcher:
    url: "http://research-box.local:9900"
    auth: { type: bearer, token: "..." }
    timeout: 120
    capabilities: [web_search, research]
```

## Options / Props

Outbound tools (`a2a` toolset):

| Tool | Description |
|------|-------------|
| `a2a_discover(url)` | Fetch and summarize a peer's Agent Card |
| `a2a_call(agent, message, context_id?)` | Send a task; multi-turn via `context_id` |
| `a2a_list()` | Configured peers, saved conversations, metrics |
| `a2a_history(context_id)` | Recall a persisted conversation |
| `a2a_orchestrate(capability, message, mode?)` | Fan out to peers advertising a capability (`all` / `first` / `best`) |

Environment variables:

| Env var | Default | Meaning |
|---------|---------|---------|
| `A2A_PEER_TOKENS` | unset | Per-peer credentials `name:token,...` (preferred) |
| `A2A_BEARER_TOKEN` | unset | Shared token; identity falls back to caller IP |
| `A2A_HOST` | `127.0.0.1` | Bind host; only widens when a token is set. IPv6 literals such as `::1` or `::` work too, bare or bracketed (`[::1]`) |
| `A2A_PORT` | `9900` | Inbound port |
| `A2A_AGENT_NAME` | hostname-derived | Name on the Agent Card |
| `A2A_PUBLIC_URL` | unset | Routable URL advertised on the card |
| `A2A_TRUSTED_PEERS` | unset | Allow-list of authenticated identities |
| `A2A_ALLOW_ALL_USERS` | `false` | Allow any authenticated peer (dev only) |
| `A2A_RATE_LIMIT` | `60` | Requests/minute per identity |
| `A2A_MAX_PINGPONG_TURNS` | `5` | Anti-loop turn cap per context (max 20) |
| `A2A_REPLY_TIMEOUT` | `300` | Seconds to wait for the agent's reply |
| `A2A_PUSH_SECRET` | bearer token | HMAC secret for push-notification signing |
| `A2A_ADVERTISED_TOOLSETS` | all registered | Restrict skills on the Agent Card |

## Notes

- Inbound endpoints: Agent Card at `GET /.well-known/agent-card.json` (legacy `agent.json` also answers); JSON-RPC at `POST /` with `SendMessage`, `SendStreamingMessage`, `GetTask`, `ListTasks`, `CancelTask`, `SubscribeToTask`, push-notification config CRUD, plus pre-1.0 aliases (`message/send`, ...).
- No token means localhost only; remote exposure needs a bearer token and explicit `A2A_HOST`. Inbound text is filtered as untrusted, remote peers cannot invoke operator slash commands, credentials are scrubbed from replies, exchanges are logged to `~/.hermes/a2a_audit.jsonl`.
- Conversations are keyed by A2A `contextId`. For same-machine multi-agent work prefer delegation (subagents) or the kanban board; A2A is for crossing process/machine/framework boundaries.
- Behind a reverse proxy or Kubernetes Service set `A2A_PUBLIC_URL`. `401 Unauthorized` means token mismatch.

```bash
curl -X POST http://your-host:9900/ \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer <token>' \
  -d '{"jsonrpc":"2.0","id":1,"method":"SendMessage",
       "params":{"message":{"messageId":"m1","role":"ROLE_USER",
                 "parts":[{"text":"What tools do you have?"}]}}}'
```
- Source: https://hermes-agent.nousresearch.com/docs/user-guide/messaging/a2a (pinned to v0.23.1)
- No-token hardening (v0.23): without a token the server also refuses browser-originated POSTs (an `Origin` header, a cross-site `Sec-Fetch-Site`, or a non-JSON `Content-Type`) and answers only requests addressed to a loopback name (`localhost`, `127.x.x.x`, `[::1]`) or the `A2A_PUBLIC_URL` host. Troubleshooting `403`s with no token: "Host must be a loopback name..." (call it by a loopback name, set `A2A_PUBLIC_URL`, or configure a token); "Content-Type must be application/json" (add `-H 'Content-Type: application/json'`, plain `curl -d` sends a form type); "browser-originated" / "cross-site request refused" (call from a local script or SDK, or configure a token).

### Forwarded profile sessions after the ownership cutover (v0.23)

- Forwarding to another local profile submits to that profile's gateway owner; there is no fallback `hermes chat` process writing its session database. New forwarded conversations retain the exact agent, tenant, authenticated peer and context ID in their owner binding.
- Historical forwarded sessions (old titles `a2a-{agent}-{sanitized-context}`, which omitted peer and tenant identity and could already mix contexts such as `ctx/exact` and `ctx-exact`) cannot be identified safely. A matching historical title returns `runtime_coordination_required` instead of attaching a peer or starting a replacement; the session ID, title and messages stay untouched and generic CLI resume does not bypass it.
- Automatic migration of these historical sessions is not yet supported and there is no supported migration command; do not retitle or edit database rows to bypass the ownership check.

## Related

- [Messaging Gateway](./messaging.md)
