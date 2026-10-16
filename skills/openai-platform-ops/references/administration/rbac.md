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
| External Keys | View and manage keys for Enterprise Key Management (EKM) | No |
| IP allowlist | View and manage IP allowlist | No |
| mTLS | View and manage mutual TLS settings | No |
| OIDC | View and manage OIDC configuration | No |
| Model capabilities | Request chat completions, audio, embeddings, images | Yes |
| Assistants | Create and retrieve Assistants | Yes |
| Threads | Create and retrieve Threads/Messages/Runs | Yes |
| Evals | Create, retrieve, and delete Evals | Yes |
| Fine-tuning | Create and retrieve fine tuning jobs | Yes |
| Files | Create and retrieve files | Yes |
| Vector Stores | Create and retrieve vector stores | Yes |
| Responses API | Create responses | Yes |
| Prompts | Create and retrieve prompts to use as context for Responses API and Realtime API | Yes |
| Webhooks | Create and view webhooks in your project | Yes |
| Datasets | Create and retrieve Datasets | Yes |
| Apps | Create, manage, and submit apps for review in the Dashboard | Yes |
| Tunnels | Inspect, use, and manage organization-scoped tunnels (`Read`, `Use`, `Manage`) | Yes |
| Project API Keys | Manage a user's own API keys | Yes |
| Project Administration | Manage project users, service accounts, API keys, rate limits via management API | No |
| Batch | Create and manage batch jobs | No |
| Service Accounts | View/manage project service accounts | No |
| Voices | Create and retrieve voices | No |
| Agent Builder | Create and manage agents and workflows in Agent Builder | Yes |

### Batch permission implications

- Batch Read (`api.batch.read`) additionally grants Files Read (`api.files.read`) for `/v1/files`.
- Batch Write (`api.batch.write`) additionally grants: Batch Read; List models (`api.model.read` and `model.read`) for `/v1/models`; Files Read and Write (`api.files.read` and `api.files.write`) for `/v1/files`; Model capabilities Request (`api.model.request` and `model.request`) for `/v1/audio`, `/v1/chat/completions`, `/v1/embeddings`, `/v1/images`, `/v1/moderations`, `/v1/realtime`, and `/v1/responses`.

## Notes

- Allow up to 30 minutes for role changes and group sync to propagate.
- Setup flow: create groups (sync via SCIM if using an IdP) → create custom roles from least privilege → assign roles to users/groups at org or project level → verify with a non-owner account.
- Effective permissions are the union of org-level (direct + via group) and project-level (direct + via group) roles. For API-key requests, both the key's assigned permission and the calling user's project role must grant the permission.
- Best practices: model org structure in groups, separate duties (read vs write vs key management), put experiments/staging/production in separate projects, review roles/keys regularly, test as a non-owner before rollout.

## Related

- [Admin API Keys](./admin-api-keys.md)
- [Projects](./projects.md)
- [Terraform: Projects and Access](./terraform-projects-and-access.md)
