# Environments

| Name | Description | Path |
|------|-------------|------|
| Choosing an agent environment | An environment sets where an agent's tools and code run (in a sandbox). | [choosing-an-environment.md](./choosing-an-environment.md) |
| Cloud sandbox reference | Pre-installed languages, databases, and utilities available in Anthropic-managed cloud sandboxes (`type: cloud` environments). | [cloud-sandboxes-reference.md](./cloud-sandboxes-reference.md) |
| Cloud environment setup | Environments define the sandbox configuration where an agent runs. | [environments.md](./environments.md) |
| Custom tools in self-hosted sandboxes | Serve custom tools from a self-hosted sandbox worker, and wrap an MCP server inside your network as custom tools without running a tunnel. | [self-hosted-sandboxes-custom-tools.md](./self-hosted-sandboxes-custom-tools.md) |
| Memory stores in self-hosted sandboxes | Attach memory stores to sessions on self-hosted environments exactly as on cloud environments (list them in `resources` at session creation; up to 8 per session). | [self-hosted-sandboxes-memory.md](./self-hosted-sandboxes-memory.md) |
| Monitor and troubleshoot self-hosted workers | Read queue depth, stop sessions and workers without losing work, and fix common self-hosted sandbox failures. | [self-hosted-sandboxes-operations.md](./self-hosted-sandboxes-operations.md) |
| Self-hosted worker reference | Reference for the pre-built workers that serve a `self_hosted` environment: `ant` CLI commands and flags, environment variables, host requirements, filesystem paths, and SDK helper options. | [self-hosted-sandboxes-reference.md](./self-hosted-sandboxes-reference.md) |
| Security model | Shared responsibility model for self-hosted sandbox environments. | [self-hosted-sandboxes-security.md](./self-hosted-sandboxes-security.md) |
| Deploy self-hosted workers | Choose how self-hosted sandbox workers claim work (always-on or webhook-triggered) and where each session runs (in one process or one sandbox per session). | [self-hosted-sandboxes-workers.md](./self-hosted-sandboxes-workers.md) |
| Self-hosted sandboxes | Overview and quickstart. Run Managed Agents sessions with tool execution, files, and network egress kept in your own infrastructure. | [self-hosted-sandboxes.md](./self-hosted-sandboxes.md) |
| Authenticate with vaults | Vaults and credentials are workspace-scoped authentication primitives: register per-user credentials once and reference them by ID at session creation, instead of running your own secret store or transmitting tokens on every call. | [vaults.md](./vaults.md) |
