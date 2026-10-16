<!-- source: https://platform.claude.com/docs/en/managed-agents/choosing-an-environment / last verified: 2026-10-17 -->

# Choosing an agent environment

An environment sets where an agent's tools and code run (in a sandbox). Choose between an Anthropic-managed cloud environment and a self-hosted sandbox run by a worker on your infrastructure. The agent definition (model, prompt, tools) is the same either way.

## Signature / Usage

```bash
# Switching: keep the agent, create a self_hosted environment, reference its ID in new sessions and deployments.
export ANTHROPIC_ENVIRONMENT_KEY="sk-ant-oat01-..."   # generated in the Claude Console
export ANTHROPIC_ENVIRONMENT_ID="env_..."
ant beta:worker poll --workdir /workspace
```

## Options / Props

| Aspect | Cloud environment (default) | Self-hosted sandbox |
|--------|-----------------------------|---------------------|
| Where tools and code run | An Anthropic-managed sandbox | Your worker, on your infrastructure |
| What reaches Anthropic | Conversation history, tool results, the sandbox's files and state, skills, memory stores | Conversation history, tool results, skills, memory stores. Sandbox files and processes stay on your worker |
| What you operate | Nothing | Worker hosts, their hardening, network limits, and the environment key |
| Network reach | Network rules you set on the environment | Your own network policy |
| File and GitHub repository mounting | Managed by Anthropic | Managed by you |
| Memory stores | Mounted by Anthropic at `/mnt/memory/` | Downloaded to `/mnt/memory/` and synced by the worker |
| Sandbox lifecycle | Managed by Anthropic | Managed by you |
| Choose it when | Default; tools need not run on your infrastructure | Tools must run on infrastructure you control |

## Notes

- Start with a cloud environment if unsure or new to Managed Agents; choose self-hosted only if tools must run on infrastructure you control.
- Self-hosted fits: data that cannot leave your network (what a tool returns to the model still reaches the service), internal services that are not publicly routable (Anthropic, not your worker, connects to the agent's MCP servers; an MCP tunnel, in research preview with an access request, can reach private ones with either option), and your own compliance/audit controls.
- With either option, conversation history and tool results go to the Managed Agents service; web search and web fetch tools also run on Anthropic's side. Neither option changes compliance coverage or conversation history retention.
- Features given up on self-hosted: `file` and `github_repository` session resources (stage input files yourself), repository skill discovery, environment-variable credentials in vaults, and the pre-installed runtimes/packages of a cloud sandbox.
- What carries over when switching: agent definition, API key or AWS credentials, skills, MCP servers, memory stores. New: a `self_hosted` environment, an environment key from the Claude Console, and a worker.
- Claude Platform on AWS: a self-hosted sandbox cannot use memory stores, workers do not use an environment key, and MCP tunnels are not available.
- Status: beta (`managed-agents-2026-04-01`).

## Related

- [Cloud environment setup](./environments.md)
- [Cloud sandbox reference](./cloud-sandboxes-reference.md)
- [Self-hosted sandboxes](./self-hosted-sandboxes.md)
- [Security model](./self-hosted-sandboxes-security.md)
- [Vaults](./vaults.md)
