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
- Plugins work in Chat and Work across ChatGPT on the web, desktop, and mobile, in Codex in the ChatGPT desktop app, and through the Codex CLI plugin browser — not in the IDE extension. Those surfaces draw public plugins from one universal directory shared by ChatGPT and Codex. (An earlier revision of this page said plugins were not available in Chat or mobile; the current official page lists them.)
- ChatGPT workspace controls don't install local filesystem skills or plugins; filesystem distribution doesn't assign ChatGPT workspace ownership or roles; plugin installation doesn't grant access to a connector, MCP server, or connected service. See build-skills.md for filesystem locations and authoring.

## Related

- [Plugin controls](./plugin-controls.md)
- [Roles and workspace permissions](./roles-and-workspace-permissions.md)
- [Admin rollout guide](./admin-rollout-guide.md)
