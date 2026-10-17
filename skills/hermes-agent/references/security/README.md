# security

| Name | Description | Path |
|------|-------------|------|
| Egress credential-injection proxy (iron-proxy) | A local iron-proxy daemon (Apache-2.0, Go) on the host terminates TLS for Docker terminal sandbox traffic and swaps opaque proxy tokens for the real API keys before forwarding upstream. | [egress-iron-proxy.md](./egress-iron-proxy.md) |
| Network Egress Isolation (Docker) | Segment Docker networks so the agent sandbox can only reach allowlisted hosts. | [egress-network-isolation.md](./egress-network-isolation.md) |
| Egress proxy | Optional outbound credential-injection firewall for remote terminal sandboxes. | [egress.md](./egress.md) |
| Bitwarden Secrets Manager | Pull API keys from Bitwarden Secrets Manager at process startup instead of storing them in plaintext in `~/.hermes/.env`. | [secrets-bitwarden.md](./secrets-bitwarden.md) |
| Command Helper Secret Source | Resolve credentials by running your own helper command at startup. | [secrets-command.md](./secrets-command.md) |
| 1Password | Resolve provider API keys from 1Password at process startup via the official `op` CLI, referencing items as `op://vault/item/field` instead of storing plaintext in `~/.hermes/.env`. | [secrets-onepassword.md](./secrets-onepassword.md) |
| Secrets | Hermes can pull API keys from external secret managers at process startup instead of storing them in `~/.hermes/.env`. | [secrets.md](./secrets.md) |
| Security | Hermes Agent implements a defense-in-depth architecture across five distinct security boundaries, covering everything from user authorization through container isolation to prompt injection prevention. | [security.md](./security.md) |
