# mcp-tunnels

| Name | Description | Path |
|------|-------------|------|
| Architecture and components | Canonical terminology for MCP tunnel deployments: components, the two credential-provisioning modes, and the connection model. | [concepts.md](./concepts.md) |
| Deploy MCP tunnels with Docker Compose | Install the hardened MCP tunnel stack on a VM using Docker Compose, with or without programmatic access (Workload Identity Federation). | [deploy-compose.md](./deploy-compose.md) |
| Deploy MCP tunnels with Helm | Install the tunnel stack as a single Kubernetes Deployment using the Anthropic Helm chart, with or without programmatic access. | [deploy-helm.md](./deploy-helm.md) |
| Manage tunnels in the Console | Create tunnels, register CA certificates, retrieve the tunnel token, and attach tunneled MCP servers to agents from the Claude Console. | [console.md](./console.md) |
| MCP tunnels | Securely connect Claude to MCP servers running in a private network without opening inbound ports or exposing services to the public internet. Research preview, requires request access. | [overview.md](./overview.md) |
| MCP tunnels quickstart | Shortest path to a working tunnel: local Docker Compose deployment with manual credential provisioning and a sample FastMCP "hello" server. | [quickstart.md](./quickstart.md) |
| MCP tunnels reference | Proxy configuration fields, the Tunnels REST API, certificate requirements, and the `setup` component's subcommands and flags. | [reference.md](./reference.md) |
| MCP tunnels security | Hardening best practices, breach-response steps, and tunnel teardown procedure for MCP tunnel deployments. | [security.md](./security.md) |
| Troubleshoot MCP tunnels | Diagnose connectivity, TLS, IP validation, and OAuth routing issues, layer by layer: outbound connection to the tunnel edge, inner TLS to the proxy, then routing/IP validation toward the upstream. | [troubleshooting.md](./troubleshooting.md) |
