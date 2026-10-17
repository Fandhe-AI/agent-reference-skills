# Groups and provisioning

Understand group membership sources and their workspace access boundary.

## Overview

Groups organize ChatGPT workspace access for members and support custom roles. Group membership is separate from local runtime policy and permissions in connected systems.

## Membership management options

| Approach | Best for |
|----------|----------|
| Manually managed groups | Small, temporary groups, or groups not managed through directory sync |
| Identity-provider-managed groups (SCIM) | Membership that should follow the organization's directory and member-removal process |

## Use current setup procedures

- Workspace owners and admins can create and manage groups. Use groups for people with a shared access need (a pilot cohort, workspace operators, members needing the same supported feature). Each group has one authoritative membership source: manually managed (ChatGPT workspace administration), identity-provider managed (SCIM), or dynamic (rules evaluated against SCIM user attributes such as department or location, defined in ChatGPT Admin). Manual and identity-provider-managed groups can coexist; for identity-provider-managed groups the identity provider is the membership source and later provisioning updates can overwrite workspace-side changes.
- Group membership doesn't replace seat assignments, grant workspace feature permissions by itself, override local runtime policy, or provide access to the Platform API or connected systems. Workspace owners can assign custom roles to groups or directly to members. This page's source says an explicit **Off** in any role denies that permission even when another role grants it, whereas the roles page says ordinary role permissions combine additively (another assigned role can still grant access); check every applicable role and verify effective access. A member's seat type and product eligibility still apply.
- Verify joiners, movers, and leavers: joiners accept any pending invitation and receive the intended seat, group memberships, permissions, and features; movers need the authoritative membership source updated and effective permissions verified across all applicable roles; leavers who are SCIM-managed must be removed at the identity provider (removing only from the workspace lets a later sync restore access). The Help Center owns current SCIM provisioning behavior and setup steps.

## Notes

- SCIM provisioning doesn't grant permissions in GitHub, Google Drive, Slack, or another connected system, and doesn't replace local runtime requirements.
- Workspace RBAC and local runtime requirements are distinct control systems — group order doesn't imply permission precedence. See [Managed configuration](./managed-configuration.md) for documented delivery/precedence rules.

## Related

- [Roles and workspace permissions](./roles-and-workspace-permissions.md)
- [Admin rollout guide](./admin-rollout-guide.md)
- [Access tokens](./access-tokens.md)
