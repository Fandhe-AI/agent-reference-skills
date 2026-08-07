# Cloud environments

Control what Codex installs and runs during cloud chats: dependencies, tools (linters, formatters), and environment variables. Configured per repository in [Codex settings](https://chatgpt.com/codex/settings/environments).

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

- Internet access is available during the setup script phase; during the agent phase it's off by default (see agent internet access settings, `cloud-internet-access.md`).
- Environments run behind an HTTP/HTTPS network proxy for security and abuse prevention; all outbound traffic passes through it.
- This page covers cloud environment configuration in depth. For the cloud product overview (getting started, when to use cloud), see `cloud.md` in the getting-started category.

## Related

- [modes.md](./modes.md)
- [local-environment.md](./local-environment.md)
- [Codex cloud](../getting-started/cloud.md)
- [Agent internet access](../getting-started/cloud-internet-access.md)
