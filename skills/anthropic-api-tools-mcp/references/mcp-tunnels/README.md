# MCP Tunnels

Claude API から MCP サーバーへ接続する消費側インフラ。Claude Code の MCP 設定は anthropic-claude-code-extend を参照。

| Name | Description | Path |
|------|-------------|------|
| Architecture and components | MCP tunnel stack terminology・credential provisioning mode・connection model | [concepts.md](./concepts.md) |
| Console | Console で tunnel 管理・CA 証明書登録・token rotation・org limit | [console.md](./console.md) |
| Deploy MCP tunnels with Docker Compose | Docker Compose deployment・hardening・programmatic access (WIF) | [deploy-compose.md](./deploy-compose.md) |
| Deploy MCP tunnels with Helm | Kubernetes Helm deployment・Workload Identity Federation・cert renewal | [deploy-helm.md](./deploy-helm.md) |
| MCP tunnels | Private network MCP server への安全接続・research preview・security layer | [overview.md](./overview.md) |
| MCP tunnels quickstart | Docker Compose local deployment・FastMCP hello server・manual credential | [quickstart.md](./quickstart.md) |
| MCP tunnels reference | Proxy config field・Tunnels REST API・setup subcommand・certificate requirement | [reference.md](./reference.md) |
| MCP tunnels security | Hardening best practice・breach response flow・teardown procedure・OAuth requirement | [security.md](./security.md) |
| Troubleshoot MCP tunnels | Connectivity・TLS・routing 診断・layer-by-layer troubleshooting | [troubleshooting.md](./troubleshooting.md) |
