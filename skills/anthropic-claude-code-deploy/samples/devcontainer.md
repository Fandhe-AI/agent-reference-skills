<!-- source: https://code.claude.com/docs/en/devcontainer.md / last verified: 2026-08-07 -->

# Install Claude Code in a dev container

`.devcontainer/devcontainer.json` using the Claude Code Dev Container Feature, plus persisting authentication across rebuilds with a named volume.

```json .devcontainer/devcontainer.json
{
  "image": "mcr.microsoft.com/devcontainers/base:ubuntu",
  "features": {
    "ghcr.io/anthropics/devcontainer-features/claude-code:1.0": {}
  }
}
```

```json devcontainer.json (persist auth across rebuilds)
"mounts": [
  "source=claude-code-config,target=/home/node/.claude,type=volume"
],
"containerEnv": {
  "CLAUDE_CONFIG_DIR": "/home/node/.claude"
}
```

## Notes

- The version tag (`:1.0`) pins the feature's install script, not the Claude Code release; Claude Code auto-updates itself inside the container by default.
- Replace `image` with the project's own base image, or remove it when the dev container uses a Dockerfile instead.
- After editing, rebuild with **Dev Containers: Rebuild Container** from the VS Code Command Palette, then run `claude` in the container terminal to sign in.
- Claude Code stores its OAuth account, personal MCP servers, and per-project trust in `~/.claude.json`, separate from the `~/.claude` directory, so mounting a volume at `~/.claude` alone does not keep a user signed in — `CLAUDE_CONFIG_DIR` must point at the same mounted path. Replace `/home/node` with the container's actual `remoteUser` home directory.
- For cloud providers (Amazon Bedrock, Google Cloud's Agent Platform, Microsoft Foundry), pass credentials via `containerEnv` or a Codespaces secret rather than mounting host credential files.
