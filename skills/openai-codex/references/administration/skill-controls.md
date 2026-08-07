# Skill controls

Compare ChatGPT workspace, local filesystem, and plugin skill controls.

## Overview

Skills are reusable workflows made from instructions and supporting resources. ChatGPT workspace Skills, filesystem skills used by local clients (desktop app / CLI / IDE extension), and plugins that package skills each have separate lifecycle and access controls.

## Distribution models

| Distribution model | Use it for | Administration boundary |
|---------------------|-------------|--------------------------|
| ChatGPT workspace Skill | Sharing/installing an approved workflow through ChatGPT workspace features | ChatGPT workspace skill permissions and lifecycle controls |
| Local filesystem skill | Loading an installed workflow from a repository, user, admin, or bundled location | Filesystem distribution, local client configuration, runtime permissions |
| Plugin | Packaging one or more skills with optional connectors, MCP servers, hooks, metadata | Plugin availability/installation + separate controls for every bundled capability |

## Notes

- Moving a skill between distribution models doesn't transfer ChatGPT workspace ownership, sharing, role assignments, plugin installation state, or connector authorization — configure each capability through the control surface that owns it.
- Plugins are available with ChatGPT Work on the web, with ChatGPT Work and Codex in the desktop app, and through the Codex CLI plugin browser — not in Chat, the IDE extension, or mobile. Public plugins are drawn from one universal directory shared by ChatGPT and Codex.

## Related

- [Plugin controls](./plugin-controls.md)
- [Roles and workspace permissions](./roles-and-workspace-permissions.md)
- [Admin rollout guide](./admin-rollout-guide.md)
