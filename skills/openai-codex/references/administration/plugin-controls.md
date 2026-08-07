# Plugin controls

Understand plugin availability, connector-backed capabilities, actions, and connected-system access.

## Overview

Workspace administrators govern plugin availability and connector access in ChatGPT and Codex through six distinct layers.

## Control layers

| Layer | Governs |
|-------|---------|
| Plugin availability | Whether plugins are accessible to users |
| Bundled skills | Reusable instructions shipped with installed plugins |
| Connector access | Whether connector-backed capabilities can be used |
| Connector actions | Which operations users can perform (read-only vs. custom vs. all) |
| Source authorization | External data access through authenticated identities in the connected service |
| Runtime permissions | Agent capabilities during execution |

## Management locations

- Workspace settings (web and desktop surfaces)
- CLI plugin browser (command-line installations)
- Workspace apps / Permissions & Roles sections

## Notes

- For an initial rollout, start with everyday plugin categories (email, calendar, file/document systems such as Google Drive or Notion), read-only actions before write access, and review ownership/scopes/data impact first.
- Connectors operate transiently for non-synced use and respect per-user authorization; chats that use plugins remain available through the Compliance API regardless of sync status.
- Business, Enterprise, and Edu customer data isn't used for model training through plugin connectors.

## Related

- [Skill controls](./skill-controls.md)
- [Roles and workspace permissions](./roles-and-workspace-permissions.md)
- [Admin rollout guide](./admin-rollout-guide.md)
