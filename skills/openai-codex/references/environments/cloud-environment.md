# Codex Cloud (Legacy)

Codex Cloud (Legacy) continues to support environments for Code Review and the Linear and GitHub integrations. For the current web, mobile, and desktop experience, see [Cloud environments](./cloud-environments.md). Use environments to control what Codex installs and runs during cloud chats: dependencies, tools (linters, formatters), and environment variables. Configured in Codex settings (chatgpt.com/codex/settings/environments).

## Signature / Usage

```bash
# Manual setup script example (runs before the agent phase)
pip install pyright
poetry install --with test
pnpm install
```

## How Codex cloud chats run

1. Codex creates a container and checks out the repo at the selected branch/commit.
2. Codex runs the setup script, plus an optional maintenance script when a cached container is resumed.
3. Codex applies internet access settings: setup scripts run with internet access; agent internet access is off by default (configurable).
4. The agent runs terminal commands in a loop, editing code and validating work. If the repo has `AGENTS.md`, the agent uses it to find project-specific lint/test commands.
5. The agent shows its answer and a diff; you can open a PR or ask follow-up questions.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Default image | `universal` | Pre-installed common languages/packages/tools; pin runtime versions via **Set package versions**. See [openai/codex-universal](https://github.com/openai/codex-universal) for the reference Dockerfile. |
| Environment variables | key/value | Set for the full chat duration (setup scripts + agent phase). |
| Secrets | key/value | Extra encryption layer; available only to setup scripts, removed before the agent phase starts. |
| Automatic setup | — | For `npm`/`yarn`/`pnpm`/`pip`/`pipenv`/`poetry` projects, Codex can auto-install dependencies. |
| Setup script | bash | Custom install/build commands; runs in a separate Bash session from the agent, so `export` doesn't persist (use `~/.bashrc` or environment settings to persist vars). |
| Maintenance script | bash | Optional; runs when a cached container is resumed, to refresh dependencies against a newer commit. |

## Container caching

Codex caches container state for up to 12 hours. When cached, Codex clones the repo, checks out the default branch, runs the setup script, and caches the result. When a cached container is resumed, Codex checks out the chat's branch and runs the maintenance script. Codex invalidates the cache automatically on setup/maintenance script, environment variable, or secret changes; use **Reset cache** on the environment page otherwise. For Business/Enterprise, caches are shared workspace-wide, so invalidation affects all users of the environment.

## Notes

- This is the legacy flow (https://learn.chatgpt.com/docs/environments/cloud-environment.md), kept for Code Review and the Linear and GitHub integrations; the current web, mobile, and desktop experience is documented in [Cloud environments](./cloud-environments.md). The earlier getting-started steps based on the environment settings page (chatgpt.com/codex/settings/environments) belong to this legacy flow.
- Setup scripts can install additional packages on top of the pre-installed `universal` image (`codex-universal`).
- Internet access is available during the setup script phase and with limited or unrestricted access configured; during the agent phase it's off by default (see agent internet access settings, `../getting-started/cloud-internet-access.md`).
- Agent Security command-network requirements: on supported managed Codex Cloud execution paths, Agent Security requirements constrain command networking, while Codex Cloud environment internet settings apply separately (an allowed domain in Agent Security does not override a restriction in the environment's internet settings). These controls don't by themselves disable hosted web search, apps, or MCP. ChatGPT Work Cloud has separate capability permissions and doesn't inherit them. A managed command allowlist applies to commands using the managed proxy; approved full sandbox escalation (where policy permits it) can bypass the command proxy. Configure enforced approval and sandbox requirements and test ordinary and escalated commands (see managed-configuration.md).
- Environments run behind an HTTP/HTTPS network proxy for security and abuse prevention; all outbound traffic passes through it.
- This page covers cloud environment configuration in depth. For the cloud product overview (getting started, when to use cloud), see `cloud.md` in the getting-started category.

## Related

- [Cloud environments](./cloud-environments.md)
- [modes.md](./modes.md)
- [local-environment.md](./local-environment.md)
- [Codex cloud](../getting-started/cloud.md)
- [Agent internet access](../getting-started/cloud-internet-access.md)
