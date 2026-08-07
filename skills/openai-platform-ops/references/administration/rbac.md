# RBAC (Role-Based Access Control)

Role-based access control decides who can do what across an organization and its projects, in both the API and the Dashboard. The same permissions govern both surfaces.

## Signature / Usage

Key concepts:

- **Organization**: top-level account; organization roles can grant access across all projects.
- **Project**: a workspace for keys, files, and resources; project roles grant access only within that project.
- **Groups**: collections of users assigned roles at scale; can sync from an identity provider via SCIM.
- **Roles**: bundles of permissions (e.g. Models Request, Files Write), created at org or project scope and assigned to users or groups. Users can hold multiple roles; access is the **union**.
- **Permissions**: specific actions a role allows (read models, request models, read/write files, manage keys, etc.).

## Options / Props

Selected permission areas (see the guide for the full table with preset-role columns):

| Area | What it allows | Custom role eligible |
|------|-----------------|----------------------|
| List models | List models the org has access to | Yes |
| Groups | View/manage groups | No |
| Roles | View/manage roles | No |
| Organization Admin | Manage org users, projects, invites, admin API keys, rate limits | No |
| Usage | View usage dashboard and export | Yes |
| Model capabilities | Request chat completions, audio, embeddings, images | Yes |
| Project API Keys | Manage a user's own API keys | Yes |
| Project Administration | Manage project users, service accounts, API keys, rate limits via management API | No |
| Service Accounts | View/manage project service accounts | No |

## Notes

- Allow up to 30 minutes for role changes and group sync to propagate.
- Setup flow: create groups (sync via SCIM if using an IdP) → create custom roles from least privilege → assign roles to users/groups at org or project level → verify with a non-owner account.
- Effective permissions are the union of org-level (direct + via group) and project-level (direct + via group) roles. For API-key requests, both the key's assigned permission and the calling user's project role must grant the permission.
- Best practices: model org structure in groups, separate duties (read vs write vs key management), put experiments/staging/production in separate projects, review roles/keys regularly, test as a non-owner before rollout.

## Related

- [Admin API Keys](./admin-api-keys.md)
- [Projects](./projects.md)
- [Terraform: Projects and Access](./terraform-projects-and-access.md)
