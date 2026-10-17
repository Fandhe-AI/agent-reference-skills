# Egress proxy

Optional outbound credential-injection firewall for remote terminal sandboxes. The sandbox only ever holds opaque proxy tokens; real API keys never leave the host. (Docker backend only; see Notes)

## Signature / Usage

```bash
hermes egress install
hermes egress setup
hermes egress start
hermes egress status
```

## Notes

- Scope caveat: the "real API keys never leave the host" guarantee applies only to the Docker terminal backend with covered providers (see the provider table in [egress-iron-proxy.md](./egress-iron-proxy.md)). Modal, Daytona, SSH, and Singularity get no proxy env vars or CA mounts, and uncovered providers (AWS SigV4 `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY`, Vertex `GOOGLE_APPLICATION_CREDENTIALS`) still leave real credentials in the sandbox. Per https://hermes-agent.nousresearch.com/docs/user-guide/egress/iron-proxy (v0.22.2).
- The only implementation documented is iron-proxy, a single-binary TLS-intercepting proxy from ironsh/iron-proxy, lazy-installed and managed by `hermes egress`. See [egress-iron-proxy.md](./egress-iron-proxy.md).
- Source: https://hermes-agent.nousresearch.com/docs/user-guide/egress (pinned to v0.22.2)

## Related

- [Egress credential-injection proxy (iron-proxy)](./egress-iron-proxy.md)
- [Network Egress Isolation (Docker)](./egress-network-isolation.md)
- [Security](./security.md)
