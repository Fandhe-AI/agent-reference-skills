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

## Assign workspace access

- Seat vs admin role vs custom role: a seat determines which product surfaces a member can access (seat types can include ChatGPT and Codex seats). Built-in roles determine administrative authority: **Owner** manages workspace-wide settings, **Admin** manages supported operations and groups, **Member** has no administrative rights, **Analytics Viewer** can access workspace analytics. Custom roles define which supported features a member can use; they don't replace seat or plan eligibility, grant permissions in a connected system, or change local runtime requirements.
- Workspace default, then targeted custom roles: only workspace owners can configure RBAC and create custom roles; roles can be assigned through groups (manual or SCIM-synced) or directly, and a member can receive more than one. For eligible permissions **Default** inherits the workspace setting, **On** grants access through that role, **Off** doesn't grant access through that role; ordinary role permissions combine additively, so review direct and group-received roles. Lockdown Mode and product eligibility apply separately.
- Work Local and Work Cloud: **Work Cloud** governs supported cloud Work tasks; with independent controls, **Work Local** without **Work Cloud** allows local work in the desktop app but not cloud tasks. Local Codex access uses **Allow members to use Codex locally** (**Codex Local**); changing **Use Work locally** doesn't change local Codex access or replace local runtime requirements. Some workspaces show a combined **Codex and Work Local** section (**Allow members to use Codex and Work Locally** controls both). **Cloud browser use** and **Cloud network access** are under Admin Console > Permissions & roles > Workspace capabilities > Cloud computer capabilities, shared by Work Cloud and dots; disabling one doesn't disable the other.
- Codex Cloud: **Use Codex in the cloud** controls access to run tasks in Codex Cloud; **Manage workspace environments** (nested under it, requires Cloud access, off by default) controls creating and editing environments shared with the workspace. Members with Cloud access can create and edit their own personal environments without the management permission; access to a shared environment doesn't grant authority to change its configuration. Verify both workflows with representative identities, each with access to connected repositories and services.
- Computer History: off by default for Business and Enterprise workspaces; members can't turn it on until a workspace owner grants access. Enterprise owners can grant it by role under **Workspace Settings > Permissions & roles > Computer History** (**Enable Computer History**); this only allows assigned members to opt in from the desktop app on macOS and choose which apps and websites contribute.
- Local computer access with Work Cloud (ChatGPT Work): enabled by a workspace owner via **Allow local computer access**, nested under Work Cloud (you don't need **Use Codex locally on the ChatGPT desktop app**); the permission doesn't grant a seat, connected-app access, operating-system permissions, or unrestricted device access.
- Local runtime policy: permission profiles and managed requirements can constrain commands, filesystem access, network access, approvals, and other local runtime behavior for the desktop app, CLI, and IDE extension; they don't change the user's seat, workspace role, model entitlement, or external-system permissions. A local permission profile can restrict a run but can't grant a workspace feature or model. Cloud-managed requirements additionally depend on ChatGPT sign-in and plan eligibility.

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
