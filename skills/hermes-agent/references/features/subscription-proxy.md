# Subscription Proxy

A local HTTP server that lets external OpenAI-compatible apps (OpenViking, Karakeep, Open WebUI, ...) use your Hermes-managed provider subscription (Nous Portal or xAI) as their LLM endpoint. The proxy attaches and refreshes the real credential.

## Signature / Usage

```bash
hermes portal            # one-time OAuth login for Nous Portal
hermes proxy start       # listens on http://127.0.0.1:8645/v1
hermes proxy providers   # shipped adapters: nous, xai
hermes proxy status
hermes proxy start --host 0.0.0.0 --port 8645   # expose on LAN (see Notes)
```

Client configuration:

```text
Base URL:   http://127.0.0.1:8645/v1
API key:    anything (e.g. "sk-unused")
Model:      Hermes-4-70B    # or Hermes-4.3-36B, Hermes-4-405B
```

## Allowed paths (Nous Portal)

| Path | Purpose |
|------|---------|
| `/v1/chat/completions` | Chat completions (streaming and non-streaming) |
| `/v1/completions` | Legacy text completions |
| `/v1/embeddings` | Embeddings |
| `/v1/models` | Model list |

Other paths return 404 with an error pointing at the allowed paths.

## Notes

- Differs from the API server: the API server exposes the agent (toolset, memory, skills; auth via `API_SERVER_KEY`); the proxy is raw model passthrough with no tool calls and accepts any bearer.
- Default bind is `127.0.0.1`. The proxy refuses requests whose `Host` is not its own address and browser requests from another site (`Origin` mismatch, `Sec-Fetch-Site` of `cross-site`/`same-site`). A wildcard bind skips the `Host` check and refuses every web page request. The proxy has no auth; anyone reaching it uses your subscription, so use a firewall, VPN or authenticated reverse proxy.
- `hermes proxy status` reports `ready`, `not logged in` (run `hermes portal`) or `credentials need attention` (refresh token revoked).
- The proxy forwards the body verbatim with `Authorization: Bearer <minted-key>`, preserves SSE streaming, and logs no request bodies. Portal tier RPM/TPM limits apply across the whole proxy; no pooling.
- New providers implement `UpstreamAdapter` in `hermes_cli/proxy/adapters/<provider>.py` and register it in `adapters/__init__.py`; non-OpenAI-compatible protocols are out of scope.
- OpenViking example (`~/.openviking/ov.conf`): `"vlm": {"provider": "openai", "model": "Hermes-4-70B", "api_base": "http://127.0.0.1:8645/v1", "api_key": "unused-proxy-attaches-real-creds"}`. Karakeep: `OPENAI_API_BASE_URL=http://127.0.0.1:8645/v1`, `OPENAI_API_KEY=any-non-empty-string`, `INFERENCE_TEXT_MODEL=Hermes-4-70B`.
- Source: https://hermes-agent.nousresearch.com/docs/user-guide/features/subscription-proxy (pinned to v0.22.2)

## Related

- [Tool Gateway](./tool-gateway.md)
- [Memory Providers](./memory-providers.md)
