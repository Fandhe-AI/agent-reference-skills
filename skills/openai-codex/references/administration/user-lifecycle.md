# User lifecycle management

Give employees the right ChatGPT workspace access when they join, update it when they move, and remove it when they leave, including seats, group-based roles, Codex access tokens, and connected systems.

## Signature / Usage

SSO verifies identity; provisioning adds the employee to a workspace; neither alone decides seat, feature permissions, local runtime policy, or external-system access. Lifecycle milestones: **Join** (provision access, groups, roles, seat), **Move** (update groups, remove only obsolete direct roles), **Leave** (remove workspace access, revoke tokens, review connected systems).

Token review for a departing employee starts at the Access tokens page (workspace owner or admin):

```text
https://chatgpt.com/admin/access-tokens
```

## Options / Props

### Supported plans

| Capability | Plans |
| --- | --- |
| Directory sync (SCIM) | ChatGPT Enterprise, Edu, Healthcare |
| Custom roles / RBAC | Enterprise, Edu, Healthcare, Teachers |
| Codex access tokens | Business and Enterprise |
| Codex-only seats | Eligible Enterprise and qualifying existing Business workspaces; not Edu, Teachers, Healthcare |

### Join methods

| Method | Access begins | Remove access in |
| --- | --- | --- |
| Manual invitation | Owner/admin invites | Workspace member administration |
| Automatic Account Creation | Eligible-domain employee signs in | Workspace administration and the identity flow |
| Directory Sync with SCIM | IdP admin assigns the employee | IdP application or provisioning group |

### Lifecycle steps

| Stage | Key steps |
| --- | --- |
| Connect group | Owner records existing **Workspace settings > Groups**; IdP admin identifies the exact IdP group; reconcile same-name groups first (a matching group becomes SCIM-managed); owner enables **Enable Directory Sync** (**Use SCIM only for this workspace** or **Keep the option to expand across products**); confirm SCIM badge; assign a custom role under **Permissions & roles > Custom roles** |
| Provision | Assign employee in IdP; wait for sync; verify email, seat type, SCIM badge in **Members**; verify group and role; have a representative employee sign in |
| Move | Add to destination group before removing from the old one; preserve shared group-role assignments; remove outdated **Direct roles**; review effective permissions; check **Members > Change seat type**; verify gained and lost actions |
| Leave (SCIM) | Remove ChatGPT application assignment and every access-granting provisioning group in the IdP (not the shared groups); confirm sync completed |
| Leave (manual) | Owner/admin removes the member from **Workspace settings > Members** |
| Tokens | Identify tokens and workflows; create replacement (service account, or new owner with token permission and local Codex permission; select **Codex** scope if **Scopes** shows); update stored secret and verify; revoke departing employee's tokens |

### Troubleshooting

| Symptom | Corrective action |
| --- | --- |
| Can sign in but can't find workspace | Correct assignment or email mapping |
| Wrong seat | Owner reviews the default seat type and seat options |
| Team change doesn't remove a feature | Remove from obsolete groups; revoke only that employee's obsolete direct roles |
| Manual group became SCIM-managed | Reconcile membership in the IdP and review affected access |
| Removed employee returns | Remove in the IdP, not only in workspace settings |
| Departing employee still has a token | Rotate required automation credential, then revoke |
| Connected app still allows access | Service owner removes access using that system's controls |

## Notes

- Don't enable Automatic Account Creation and SCIM together; users added by Automatic Account Creation may not be SCIM-managed, so IdP removal may not remove workspace access.
- SCIM-provisioned users inherit the default seat type from **Workspace settings > Identity & access**; a custom role can't grant access the seat doesn't include. Business workspaces can keep or add Codex-only seats only if they had a Codex seat (or a qualifying pending invitation) before June 24, 2026.
- Removing local Codex permission suspends a person's tokens but doesn't revoke them; restoring the permission reactivates them. Owners and admins can revoke any workspace token; a member with token permission revokes only their own. An administrator can't create a personal token for another user.
- Converting a ChatGPT seat to a Codex-only seat removes access to chats, memories, projects, and other ChatGPT features without deleting data.
- Most IdPs sync every 30 to 40 minutes; custom-role changes take about five minutes. You can't force a SCIM sync; don't remove and recreate a member to work around delay.
- Leaving members' projects and custom GPTs are reassigned to a workspace owner (returned on rejoin); private conversations and files aren't transferred. Retention: Enterprise and Edu follow workspace retention policy; Business keeps chats, files, and canvases indefinitely.
- If the member used local computer access with Work Cloud, include **Allow local computer access** and connected computers in offboarding; disabling it interrupts running Work turns.
- Workspace provisioning doesn't manage repositories, Google Drive, Slack, plugins and bundled skills, hosted Codex environments, managed devices, or separate Platform API organizations and keys.
- Source: https://learn.chatgpt.com/docs/enterprise/user-lifecycle (retrieved 2026-11-14).

## Related

- [Groups and provisioning](./groups-and-provisioning.md)
- [Dynamic groups](./dynamic-groups.md)
- [Roles and workspace permissions](./roles-and-workspace-permissions.md)
- [Access tokens](./access-tokens.md)
- [Service accounts](./service-accounts.md)
- [Admin rollout guide](./admin-rollout-guide.md)
- [Compliance API](./compliance-api.md)
