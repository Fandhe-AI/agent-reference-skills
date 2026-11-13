# samples

| Name | Description | Path |
| --- | --- | --- |
| ACP Client (Zed) | Run OpenCode as an Agent Client Protocol agent from an editor such as Zed. | [acp-zed.md](./acp-zed.md) |
| Agent Skill | Give an agent reusable task instructions with a `SKILL.md` and restrict loading by permission. | [agent-skill.md](./agent-skill.md) |
| AGENTS.md Instructions | Give OpenCode persistent project guidance with `AGENTS.md` and extra configured instruction files. | [agents-md-instructions.md](./agents-md-instructions.md) |
| Config Variable Substitution | Keep secrets out of `opencode.jsonc` with `{env:NAME}` and `{file:path}` references. | [config-variables.md](./config-variables.md) |
| Custom Agent | Define a read-only reviewer subagent as a Markdown file that the main agent can launch. | [custom-agent.md](./custom-agent.md) |
| Custom Slash Command | Turn a prompt template into a `/review` command with a Markdown file or JSONC entry. | [custom-command.md](./custom-command.md) |
| Custom OpenAI-Compatible Provider | Add a provider whose API is not in the catalog, defining credential, package, endpoint, and first model together. | [custom-provider.md](./custom-provider.md) |
| Formatters | Format files after OpenCode's `write`, `edit`, or `patch` tools change them. | [formatters.md](./formatters.md) |
| GitHub Actions with opencode run | Review the default branch on every push using `opencode run` in standalone mode. | [github-actions-run.md](./github-actions-run.md) |
| Custom Keybinds | Customize TUI key bindings and the leader key in `cli.json`. | [keybinds.md](./keybinds.md) |
| Local Models (Ollama, LM Studio, vLLM) | Use locally served models; OpenCode discovers them without an account connection. | [local-models-ollama.md](./local-models-ollama.md) |
| Add MCP Servers | Add a remote and a local MCP server from the CLI or by hand under `mcp.servers`. | [mcp-servers.md](./mcp-servers.md) |
| Minimal opencode.jsonc | Create a project `opencode.jsonc` with the schema for editor validation and a default model. | [minimal-config.md](./minimal-config.md) |
| Permission Rules | Ask before shell commands, allow routine Git inspection, and deny `git push` commands. | [permissions-rules.md](./permissions-rules.md) |
| Policies: Provider Allowlist | Restrict OpenCode to one custom provider with `provider.use` policy statements. | [policies-provider-allowlist.md](./policies-provider-allowlist.md) |
