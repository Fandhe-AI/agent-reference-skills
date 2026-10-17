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

With an egress proxy (recommended), route outbound traffic through Squid with an allowlist:

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

Validate:

```bash
docker compose exec gateway \
  curl -sf --max-time 5 https://example.com && echo "FAIL: egress not blocked" || echo "OK: egress blocked"
```

## Notes

- Two networks: `internal` (no default route; agent, dashboard, gateway) and `egress` (internet-capable). The gateway is dual-homed so it can receive messaging-platform traffic and reach the agent.
- The default `network_mode: host` gives unrestricted outbound access; this guide adds a second layer behind the terminal backend execution boundary.
- DNS: the `internal` network can still resolve external names unless a local resolver blocks them.
- Not a substitute for sandbox terminal backends (Docker, Modal, Daytona); the local backend runs commands in the same container.
- Platform adapters need egress; add new adapters' API endpoints to the proxy allowlist.
- Source: user-guide/egress/network-isolation (v0.22.2 snapshot).

## Related

- [Egress proxy](./egress.md)
- [Egress credential-injection proxy (iron-proxy)](./egress-iron-proxy.md)
- [Security](./security.md)
