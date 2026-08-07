# Environments

Managed Agents の実行環境（クラウドサンドボックス / セルフホストサンドボックス / vaults）。Agent SDK 自前ホスティングは anthropic-agent-sdk を参照。

| Name | Description | Path |
|------|-------------|------|
| Cloud sandbox reference | Pre-installed languages, databases, and utilities available in Anthropic-managed cloud sandboxes. | [cloud-sandboxes-reference.md](./cloud-sandboxes-reference.md) |
| Cloud environment setup | Define sandbox configuration (cloud or self-hosted) where agents run; specify packages and networking. | [environments.md](./environments.md) |
| Security model | Shared responsibility model for self-hosted sandboxes; Anthropic secures control plane, caller secures infrastructure. | [self-hosted-sandboxes-security.md](./self-hosted-sandboxes-security.md) |
| Self-hosted sandboxes | Run agent sessions with tool execution, files, and network egress kept in your own infrastructure. | [self-hosted-sandboxes.md](./self-hosted-sandboxes.md) |
| Authenticate with vaults | Register credentials once and reference by ID at session creation instead of transmitting tokens per call. | [vaults.md](./vaults.md) |
