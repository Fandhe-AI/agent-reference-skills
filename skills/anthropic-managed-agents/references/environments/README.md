# Environments

| Name | Description | Path |
|------|-------------|------|
| Choosing an agent environment | Choose between an Anthropic-managed cloud environment and a self-hosted sandbox for tool and code execution. | [choosing-an-environment.md](./choosing-an-environment.md) |
| Cloud sandbox reference | Pre-installed languages, databases, and utilities in Anthropic-managed cloud sandboxes. | [cloud-sandboxes-reference.md](./cloud-sandboxes-reference.md) |
| Cloud environment setup | Sandbox configuration where an agent runs; each session gets its own isolated Linux container. | [environments.md](./environments.md) |
| Custom tools in self-hosted sandboxes | Serve custom tools from a self-hosted sandbox worker without exposing your Claude API key on the worker host. | [self-hosted-sandboxes-custom-tools.md](./self-hosted-sandboxes-custom-tools.md) |
| Memory stores in self-hosted sandboxes | Attach memory stores to sessions on self-hosted environments; the worker downloads and syncs them. | [self-hosted-sandboxes-memory.md](./self-hosted-sandboxes-memory.md) |
| Monitor and troubleshoot self-hosted workers | Read queue depth, stop sessions and workers without losing work, and fix common sandbox failures. | [self-hosted-sandboxes-operations.md](./self-hosted-sandboxes-operations.md) |
| Self-hosted worker reference | ant CLI commands and flags, environment variables, host requirements, and SDK helper options for workers. | [self-hosted-sandboxes-reference.md](./self-hosted-sandboxes-reference.md) |
| Security model | Shared responsibility model for self-hosted sandboxes: Anthropic secures the control plane, the rest is yours. | [self-hosted-sandboxes-security.md](./self-hosted-sandboxes-security.md) |
| Deploy self-hosted workers | Choose always-on or webhook-triggered work claiming, and one process or one sandbox per session. | [self-hosted-sandboxes-workers.md](./self-hosted-sandboxes-workers.md) |
| Self-hosted sandboxes | Overview and quickstart for running sessions with tool execution and files on your own infrastructure. | [self-hosted-sandboxes.md](./self-hosted-sandboxes.md) |
| Authenticate with vaults | Workspace-scoped vaults register per-user credentials that are referenced by ID at session creation. | [vaults.md](./vaults.md) |
