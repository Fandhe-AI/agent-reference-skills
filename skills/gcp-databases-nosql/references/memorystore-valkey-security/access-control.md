---
source: https://docs.cloud.google.com/memorystore/docs/valkey/access-control
---

# Access control (Memorystore for Valkey IAM)

IAM predefined roles and permissions for Memorystore for Valkey, custom role requirements, and the extra roles for in-transit encryption and service connection policies. IAM changes take on the order of minutes to take effect.

## Signature / Usage

Snippet taken from https://docs.cloud.google.com/memorystore/docs/valkey/manage-iam-auth (grants the connection role to a service account on a project).

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
--member="serviceAccount:SA_NAME@PROJECT_ID.iam.gserviceaccount.com" \
--role=roles/"ROLE_NAME"
```

Replace ROLE_NAME with `memorystore.dbConnectionUser`.

## Options / Props

### Predefined roles

| Role | Name | Memorystore permissions | Description |
|------|------|-------------------------|-------------|
| `roles/owner` | Owner | `memorystore.*` | Full access and control for all Google Cloud resources; manage user access |
| `roles/editor` | Editor | All `memorystore` permissions except `*.getIamPolicy` and `*.setIamPolicy` | Read-write access to all Google Cloud and Valkey resources |
| `roles/viewer` | Viewer | `memorystore.*.get`, `memorystore.*.list` | Read-only access to all Google Cloud resources |
| `roles/memorystore.admin` | Memorystore Admin | `memorystore.*` | Full control for all Memorystore for Valkey resources |
| `roles/memorystore.viewer` | Memorystore Viewer | All except `memorystore.instances.create`, `.delete`, `.update`, `.connect`, `memorystore.operations.delete` | Read-only |
| `roles/memorystore.dbConnectionUser` | Memorystore Database Connection User | `memorystore.instances.connect` | For users who authenticate with IAM authentication |

### Permissions and their roles

| Permission | Memorystore role | Basic role |
|------------|------------------|------------|
| `memorystore.instances.list` | Admin, Viewer | Viewer |
| `memorystore.instances.get` | Admin, Viewer | Viewer |
| `memorystore.instances.create` | Admin | Editor |
| `memorystore.instances.update` | Admin | Editor |
| `memorystore.instances.connect` | Admin, Database Connection User | Editor |
| `memorystore.instances.rescheduleMaintenance` | Admin | Owner |

### In-transit encryption permissions

| Permission | Create instance with in-transit encryption | Download the CA |
|------------|-----|-----|
| `memorystore.instances.create` | yes | no |
| `memorystore.instances.get` | no | yes |

### Service connection policy role

The Network Admin needs `networkconnectivity.consumerNetworkAdmin`, which grants `networkconnectivity.serviceconnectionpolicies.create`, `.list`, `.get`, `.delete` and `.update`.

## Notes

- Custom roles for Memorystore for Valkey must include `resourcemanager.projects.get` and `resourcemanager.projects.list`; otherwise the Google Cloud console does not function correctly.
- Grant a role with the IAM "Grant or revoke a single role" procedure; see `gcp-foundation` for IAM basics.
- Managed Valkey on Google Cloud; distinct from Upstash Redis (`upstash`).
- Corrected from the official docs: the source lists a `roles/memorystore.editor` ("Memorystore Editor") role, gives it `memorystore.instances.list` / `.get` / `.update`, and names Owner as the basic role for `memorystore.instances.create` and `.connect`. the IAM roles reference (`references/iam/memorystore.md`) has no `roles/memorystore.editor` (only `memorystore.admin`, `memorystore.viewer`, `memorystore.dbConnectionUser` and `memorystore.serviceAgent`) and grants `create`, `update` and `connect` to the basic Editor role too, so the tables follow the IAM reference. `memorystore.instances.rescheduleMaintenance` is not listed in the IAM roles reference; its row is kept as written in the source.
- Source: https://docs.cloud.google.com/memorystore/docs/valkey/access-control (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [about-iam-auth.md](./about-iam-auth.md)
- [networking.md](./networking.md)
- [security-overview.md](./security-overview.md)
