# Network Egress Isolation (Docker)

Segment Docker networks so the agent sandbox can only reach allowlisted hosts. Primarily a defense against prompt-injection exfiltration via `curl`, `wget`, or raw HTTP from tool-generated shell commands.

## Signature / Usage

```yaml
# docker-compose.override.yml
networks:
  internal:
    driver: bridge
    internal: true          # no default route, no internet
  egress:
    driver: bridge

services:
  gateway:
    network_mode: ""        # clear the host-mode default
    networks:
      - internal
      - egress              # needs outbound for Telegram, LLM APIs
    ports:
      - "127.0.0.1:9119:9119"   # dashboard proxy, localhost only

  dashboard:
    network_mode: ""
    networks:
      - internal            # internal only, no egress needed
```

With an egress proxy (recommended), route outbound traffic through Squid with an allowlist (official example, as published):

```yaml
services:
  gateway:
    network_mode: ""
    networks: [internal, egress]
    environment:
      - HTTP_PROXY=http://egress-proxy:3128
      - HTTPS_PROXY=http://egress-proxy:3128
      - NO_PROXY=hermes,hermes-dashboard,localhost
  egress-proxy:
    image: ubuntu/squid:6.10-24.04_edge
    networks:
      - egress
    volumes:
      - ./config/squid-allowlist.conf:/etc/squid/conf.d/allowlist.conf:ro
    restart: unless-stopped
```

```
# config/squid-allowlist.conf
acl allowed_hosts dstdomain api.openai.com
acl allowed_hosts dstdomain api.anthropic.com
http_access allow CONNECT allowed_hosts
http_access deny all
```

Hardened variant (adapted, not in the official page): keep the gateway on `internal` only and dual-home the proxy, so the allowlist cannot be bypassed from the gateway:

```yaml
services:
  gateway:
    network_mode: ""
    networks: [internal]
    environment:
      - HTTP_PROXY=http://egress-proxy:3128
      - HTTPS_PROXY=http://egress-proxy:3128
      - NO_PROXY=hermes,hermes-dashboard,localhost
  egress-proxy:
    image: ubuntu/squid:6.10-24.04_edge
    networks: [internal, egress]
    volumes:
      - ./config/squid-allowlist.conf:/etc/squid/conf.d/allowlist.conf:ro
    restart: unless-stopped
```

Validate (official check, as published; it treats any curl failure as success):

```bash
docker compose exec gateway \
  curl -sf --max-time 5 https://example.com && echo "FAIL: egress not blocked" || echo "OK: egress blocked"
```

Validate (adapted, distinguishes the cases):

```bash
# (a) allowed host via proxy: expect 200 or 401
docker compose exec gateway \
  curl -s -o /dev/null -w '%{http_code}\n' --max-time 5 https://api.openai.com/v1/models
# (b) denied host via proxy: expect the Squid CONNECT response 403
docker compose exec gateway \
  curl -s -o /dev/null -w '%{http_connect}\n' --max-time 5 https://example.com
# (c) direct, bypassing the proxy: expect failure (curl exit 6, 7 or 28)
docker compose exec gateway \
  curl -s -o /dev/null --noproxy '*' --max-time 5 https://example.com; echo "exit=$?"
```

Treat any other status code or exit code as FAIL. Check (c) only succeeds as a block in the hardened variant.

## Notes

- Two networks: `internal` (no default route; agent, dashboard, gateway) and `egress` (internet-capable).
- Official claim: the gateway is dual-homed so it can receive messaging-platform traffic and reach the agent.
- Caveat: in the official example the gateway is attached to the internet-capable `egress` network, so `HTTP(S)_PROXY` is advisory only — any process in the gateway can bypass Squid (e.g. `curl --noproxy '*'`). To enforce the allowlist, keep the gateway on `internal` only and dual-home the proxy instead (hardened variant above; not verified against the official docs).
- Hardened variant trade-off: with the gateway on `internal` only, inbound traffic (published ports, messaging-platform webhooks) cannot reach it directly; HTTP-inbound adapters then need a separate ingress path, while outbound-polling adapters work through the proxy.
- Adapted: the official check treats any curl failure as success; this version distinguishes allowed, proxy-denied and direct-bypass cases.
- The default `network_mode: host` gives unrestricted outbound access; this guide adds a second layer behind the terminal backend execution boundary.
- DNS: the `internal` network can still resolve external names unless a local resolver blocks them.
- Not a substitute for sandbox terminal backends (Docker, Modal, Daytona); the local backend runs commands in the same container.
- Platform adapters need egress; add new adapters' API endpoints to the proxy allowlist.
- Source: https://hermes-agent.nousresearch.com/docs/user-guide/egress/network-isolation (pinned to v0.22.2)

## Related

- [Egress proxy](./egress.md)
- [Egress credential-injection proxy (iron-proxy)](./egress-iron-proxy.md)
- [Security](./security.md)
