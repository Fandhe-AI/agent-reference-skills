# Egress proxy

Optional outbound credential-injection firewall for remote terminal sandboxes. The sandbox only ever holds opaque proxy tokens; real API keys never leave the host.

## Signature / Usage

```bash
hermes egress install
hermes egress setup
hermes egress start
hermes egress status
```

## Notes

- The only implementation documented is iron-proxy, a single-binary TLS-intercepting proxy from ironsh/iron-proxy, lazy-installed and managed by `hermes egress`. See [egress-iron-proxy.md](./egress-iron-proxy.md).
- Source: https://hermes-agent.nousresearch.com/docs/user-guide/egress (pinned to v0.22.2)

## Related

- [Egress credential-injection proxy (iron-proxy)](./egress-iron-proxy.md)
- [Network Egress Isolation (Docker)](./egress-network-isolation.md)
- [Security](./security.md)
