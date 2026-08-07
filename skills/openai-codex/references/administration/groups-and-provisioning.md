# Groups and provisioning

Understand group membership sources and their workspace access boundary.

## Overview

Groups organize ChatGPT workspace access for members and support custom roles. Group membership is separate from local runtime policy and permissions in connected systems.

## Membership management options

| Approach | Best for |
|----------|----------|
| Manually managed groups | Small, temporary groups, or groups not managed through directory sync |
| Identity-provider-managed groups (SCIM) | Membership that should follow the organization's directory and member-removal process |

## Notes

- SCIM provisioning doesn't grant permissions in GitHub, Google Drive, Slack, or another connected system, and doesn't replace local runtime requirements.
- Workspace RBAC and local runtime requirements are distinct control systems — group order doesn't imply permission precedence. See [Managed configuration](./managed-configuration.md) for documented delivery/precedence rules.

## Related

- [Roles and workspace permissions](./roles-and-workspace-permissions.md)
- [Admin rollout guide](./admin-rollout-guide.md)
- [Access tokens](./access-tokens.md)
