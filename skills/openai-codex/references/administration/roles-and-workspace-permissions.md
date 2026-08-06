# Roles and workspace permissions

Separate ChatGPT workspace access from local runtime, API, plugin, and source-system controls. The canonical map of administration boundaries.

## Overview

Administration spans six control boundaries. Granting access at one boundary doesn't grant access at another.

## Control boundaries

| Boundary | Controls | Doesn't control | Current source |
|----------|----------|------------------|-----------------|
| ChatGPT workspace | Membership, seats, built-in admin roles, role-based access to workspace features | Local agent permissions, Platform API org access, connected-service permissions | ChatGPT workspace access / RBAC (Help Center) |
| Local clients | Runtime behavior for the ChatGPT desktop app, Codex CLI, IDE extension: approvals, filesystem/network access, permission profiles, allowed integrations | A ChatGPT seat, feature/model entitlement, external data access | [Managed configuration](./managed-configuration.md), Permissions |
| Codex cloud | Eligibility for hosted Codex workflows and available cloud environments | Local runtime policy, source-system repo permissions | Cloud environments |
| Platform API | Org/project membership, API keys, model access, usage, billing | ChatGPT workspace membership, local-client access, Codex cloud access | OpenAI API Platform |
| Plugins | Plugin availability/installation, bundled skills, connector access, supported connector actions | Authorization in the connected service, broader local/cloud runtime permissions | [Plugin controls](./plugin-controls.md) |
| Connected systems | Which repos/files/messages/actions the authenticated account can access | ChatGPT workspace, plugin, Codex cloud, Platform API entitlement | The connected service's own admin controls |

## Notes

- A request must pass every applicable boundary. Workspace access can make a plugin available, but the connected service still decides which data the signed-in account can read.
- In workspace settings, **Codex Local** is a grouping label for local access and access-token controls, not a separate product; **Allow members to use Codex Local** covers the ChatGPT desktop app, Codex CLI, and IDE extension.
- Managed configuration is a separate layer constraining supported runtime behavior — it doesn't change seat, workspace role, model entitlement, or external-system permissions.

## Related

- [Admin rollout guide](./admin-rollout-guide.md)
- [Groups and provisioning](./groups-and-provisioning.md)
- [Workspace model availability](./workspace-model-availability.md)
- [Access tokens](./access-tokens.md)
- [Managed configuration](./managed-configuration.md)
- [Authentication](./authentication.md)
