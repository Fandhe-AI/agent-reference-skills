# Sign in with ChatGPT through a gateway

Keep an existing model gateway while moving Codex to Sign in with ChatGPT, so eligible ChatGPT workspace features and controls (for example voice mode) work alongside the gateway.

## Signature / Usage

Existing command-backed gateway auth places the gateway key in `Authorization`; with ChatGPT sign-in that header carries the ChatGPT token, so the gateway credential moves elsewhere. Add the provider to the workspace's cloud-managed `requirements.toml`.

Option A: reuse the credential command through a launch helper (gateway key sent in a separate header). Remove the `auth` block; command-backed auth cannot be combined with `requires_openai_auth = true`.

```toml
# requirements.toml
model_provider = "enterprise_gateway"

[model_providers.enterprise_gateway]
name = "Enterprise gateway"
base_url = "https://gateway.example.com/backend-api/codex" # Keep the gateway route.
requires_openai_auth = true # Use the ChatGPT credential for OpenAI.
env_http_headers = { "X-Gateway-Key" = "GATEWAY_KEY" } # Send the same gateway key separately.
```

```sh
codex_with_gateway() (
  set -eu
  GATEWAY_KEY=$(/usr/local/bin/fetch-gateway-token)
  test -n "$GATEWAY_KEY"
  export GATEWAY_KEY
  exec codex "$@"
)

codex_with_gateway
```

Resulting request headers:

```http
Authorization: Bearer <ChatGPT token>
ChatGPT-Account-ID: <workspace ID, when available>
X-Gateway-Key: <same gateway key returned by your command>
```

Option B: native gateway OAuth (authorization code with PKCE, public client):

```toml
# requirements.toml
model_provider = "enterprise_gateway"

[model_providers.enterprise_gateway]
name = "Enterprise gateway"
base_url = "https://gateway.example.com/backend-api/codex" # Keep the gateway route.
requires_openai_auth = true # Use the ChatGPT credential for OpenAI.

[model_providers.enterprise_gateway.gateway_oauth] # Add gateway OAuth.
authorization_url = "https://login.example.com/oauth/authorize"
token_url = "https://login.example.com/oauth/token"
client_id = "YOUR_PUBLIC_CLIENT_ID"
delivery = { kind = "cookie", name = "auth-openid" } # Add gateway auth as a cookie.
# redirect_port = 43127
```

Optional routing headers (either option):

```toml
[model_providers.enterprise_gateway.http_headers]
x-portkey-config = "<gateway-routing-config-id>"
x-portkey-metadata = '{"tool_id":"codex"}'
```

## Notes

- The gateway's Codex-compatible base URL must proxy `/models` and `/responses` to `https://chatgpt.com/backend-api/codex`. These requirements apply after users sign in with ChatGPT and don't restrict other sign-in methods.
- Option A: the helper runs once per launch; Codex does not rerun it or refresh the header, so relaunch after the key expires. If `GATEWAY_KEY` is empty, Codex omits `X-Gateway-Key`. For desktop, your launch integration must supply `GATEWAY_KEY` to the app process. The gateway must accept `X-Gateway-Key`, validate it, and remove it before forwarding.
- Option B: the gateway needs an OAuth authorization server. Codex uses a free loopback port by default; if the identity provider requires a fixed redirect URI set `redirect_port` and register `http://127.0.0.1:43127/callback` (for the example port). It needs a browser and reachable loopback callback, has no device-code fallback, and without a refresh token users repeat browser sign-in when the access token expires.
- Use `env_http_headers` for routing header values read from the Codex process environment; test that the gateway receives both headers and selects the intended route.
- Codex sends the ChatGPT `Authorization` header, any `ChatGPT-Account-ID`, and the gateway header or cookie; the gateway verifies and removes its credential and forwards the ChatGPT headers unchanged. The gateway can see request data and both credentials: redact them in logs and never forward gateway credentials upstream.
- Requires a Codex build that supports managed model-provider requirements (and native gateway OAuth for Option B); older builds may ignore or reject unsupported fields.
- This route covers model-provider requests only; ChatGPT sign-in, MCP, plugins, and other app connections can use different paths. A generic OpenAI `/v1/models` response is insufficient: Codex expects a `models` array.
- Voice: this setup does not enable ChatGPT Voice. The experimental `experimental_realtime_webrtc_call_base_url` setting in `~/.codex/config.toml` changes only the HTTP base URL for call creation, not the sideband connection, media, or model requests; verify with OpenAI before use.
- Source: https://learn.chatgpt.com/docs/enterprise/sign-in-with-chatgpt-through-a-gateway (retrieved 2026-10).

## Related

- [Use API/provider credentials through a gateway](./connect-to-a-gateway.md)
- [Roll out a gateway](./roll-out-a-gateway.md)
- [Gateway compatibility requirements](./gateway-compatibility.md)
- [Managed configuration](./managed-configuration.md)
