# Egress credential-injection proxy (iron-proxy)

A local iron-proxy daemon (Apache-2.0, Go) on the host terminates TLS for Docker terminal sandbox traffic and swaps opaque proxy tokens for the real API keys before forwarding upstream. The sandbox never holds real keys.

## Signature / Usage

```bash
hermes egress install        # pinned iron-proxy binary, SHA-256 verified
hermes egress setup          # generates CA, mints proxy tokens, writes proxy.yaml
hermes egress start
hermes egress status
```

Full subcommand tree:

```
hermes egress install [--force]
hermes egress setup [--tunnel-port N] [--from-bitwarden | --no-bitwarden] [--rotate-tokens]
hermes egress start | stop | restart | reload
hermes egress status [--show-tokens]
hermes egress disable
hermes egress config
```

## Options / Props

`proxy:` section in `~/.hermes/config.yaml`:

| Name | Type | Description |
|------|------|-------------|
| enabled | bool (default false) | Master switch; false is a complete no-op |
| tunnel_port | int (default 9090) | Tunnel listener port; plain-HTTP forward listener is `tunnel_port + 1` |
| auto_install | bool (default true) | Auto-download the pinned binary on first use |
| credential_source | `env` \| `bitwarden` | Where iron-proxy looks up real secrets; `bitwarden` refetches on each proxy start and requires `secrets.bitwarden.enabled: true` |
| enforce_on_docker | bool (default true) | Refuse to start a Docker sandbox if the proxy is enabled but not running |
| allow_env_fallback | bool (default false) | In bitwarden mode, fall back to host env when BWS is unavailable (migration only) |
| upstream_deny_cidrs | list \| null | SSRF deny list; null = safe default (loopback, link-local incl. 169.254.169.254, RFC1918, IPv6 ULA, IPv4-mapped-v6, CGNAT, RFC2544); `[]` opts out |
| extra_allowed_hosts | list | Extra upstream hosts; wildcards like `*.foo.com` match subdomains but not the bare domain |

```yaml
proxy:
  enabled: false
  tunnel_port: 9090
  auto_install: true
  credential_source: env
  enforce_on_docker: true
  allow_env_fallback: false
  upstream_deny_cidrs: null
  extra_allowed_hosts: []
```

Default allowed upstream hosts: `openrouter.ai`, `*.openrouter.ai`, `api.openai.com`, `api.anthropic.com`, `generativelanguage.googleapis.com`, `api.x.ai`, `api.mistral.ai`, `api.groq.com`, `api.together.xyz`, `api.deepseek.com`, `inference.nousresearch.com`.

Covered auth schemes:

| Provider | Env var | Swapped in |
|----------|---------|------------|
| OpenRouter, OpenAI, Groq, Together, DeepSeek, Mistral, xAI, Nous | `*_API_KEY` | `Authorization` header |
| Anthropic native | `ANTHROPIC_API_KEY` | `x-api-key` + `Authorization` |
| Azure OpenAI | `AZURE_OPENAI_API_KEY` | `api-key` + `Authorization` |
| Google AI Studio (Gemini) | `GEMINI_API_KEY` / `GOOGLE_API_KEY` | `x-goog-api-key` header or `?key=` query |

State directory `~/.hermes/proxy/` (dir `0o700`): `ca.crt` (0644), `ca.key` (0600), `proxy.yaml`, `mappings.json`, `mappings.json.rotated-*`, `iron-proxy.pid`, `iron-proxy.nonce`, `iron-proxy.log`, `audit.log` (all 0600).

## Notes

- Docker backend only in this release; Modal, Daytona, SSH, and Singularity get no proxy env vars or CA mounts.
- Not the inbound `hermes proxy` command (OAuth aggregator reverse proxy). Does not rewrite credentials for in-process LLM calls made by the host process.
- The sandbox gets `HTTPS_PROXY=http://host.docker.internal:9090`, `HTTP_PROXY=http://host.docker.internal:9091`, `REQUESTS_CA_BUNDLE` / `SSL_CERT_FILE` / `CURL_CA_BUNDLE` / `NODE_EXTRA_CA_CERTS` pointing at the mounted CA (`/etc/ssl/certs/hermes-egress-ca.crt`), `NODE_OPTIONS=--use-openssl-ca` appended, `HERMES_EGRESS_PROXY=1`, standard provider env names set to proxy tokens, plus `HERMES_PROXY_TOKEN_<ENV_NAME>` aliases.
- Bind policy: never `0.0.0.0`. Linux binds the docker bridge gateway (`172.17.0.1:<tunnel_port>` by default; falls back to loopback if no bridge); Docker Desktop (macOS/Windows) binds `127.0.0.1`.
- Uncovered providers (sandbox holds real credentials): `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY` (SigV4) and `GOOGLE_APPLICATION_CREDENTIALS` (Vertex OAuth). Shown as warnings in the wizard and `hermes egress status`.
- Bitwarden mode: `hermes egress setup --from-bitwarden` sets `credential_source: bitwarden`; secrets are refetched via `bws secret list <project_id>` on every daemon start (rotate in the web app, then `hermes egress stop && hermes egress start`). Fails loud when the BWS token, `secrets.bitwarden.project_id`, or mapped values are missing. Re-running `setup` without either flag preserves the existing `credential_source`.
- Token rotation: `setup` preserves existing tokens; `--rotate-tokens` mints new ones (prompts for `rotate` on a tty; backs up `mappings.json` to `mappings.json.rotated-<timestamp>`). Running containers keep old tokens and 401 until restarted. `hermes egress reload` hot-reloads allowlist/mapping edits; `restart` is needed for upstream secret changes.
- Logging on pinned iron-proxy v0.39.0: all daemon and per-request records go to `iron-proxy.log` (line-delimited JSON); `audit.log` is a 0-byte placeholder for v0.40+ (`log.audit_path`). Do not point monitoring at it yet.
- `docker_env` that overrides egress-control vars (`HTTPS_PROXY`, `HTTP_PROXY`, `NO_PROXY`, `REQUESTS_CA_BUNDLE`, `SSL_CERT_FILE`, `CURL_CA_BUNDLE`, `NODE_EXTRA_CA_CERTS`) or mapped provider env names makes sandbox start fail when `enforce_on_docker: true`; likewise `docker_forward_env` of protected keys and `docker_extra_args` overriding proxy env/network.
- Does NOT protect against: a compromised host process, loss of the trusted-proxy boundary (stolen CA key / hijacked endpoint), raw-socket bypass (Node.js only partially mitigated), credential files mounted into Docker, exfiltration to allowlisted hosts, uncovered providers, or same-uid reads of iron-proxy process memory.
- Limitations (v1): no native Windows binary (Linux / macOS / WSL); the CA is a 10-year self-signed cert and rotation is manual; iron-proxy v0.39 supports a single bind per daemon.
- Linux firewall (e.g. ufw default-deny) may block container-to-host traffic: `sudo ufw allow in on docker0 to any port 9090 proto tcp` (and 9091).
- Source: https://hermes-agent.nousresearch.com/docs/user-guide/egress/iron-proxy (pinned to v0.22.2). Upstream: github.com/ironsh/iron-proxy, docs.iron.sh.

## Related

- [Egress proxy](./egress.md)
- [Network Egress Isolation (Docker)](./egress-network-isolation.md)
- [Bitwarden Secrets Manager](./secrets-bitwarden.md)
- [Security](./security.md)
