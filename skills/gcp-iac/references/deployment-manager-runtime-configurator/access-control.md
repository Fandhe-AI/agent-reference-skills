---
source: https://docs.cloud.google.com/deployment-manager/runtime-configurator/access-control
---

# Runtime Configurator Access Control

The Runtime Configurator (Beta) access-control page lists only the IAM basic roles (owner, editor, viewer) and says there are no predefined roles; the IAM reference does list `roles/runtimeconfig.*` roles (see Notes). Grant them on the project or on the Config resource (`projects.configs.setIamPolicy`). Each API method needs a specific `runtimeconfig.*` permission.

## Signature / Usage

Check a config you can read (needs `runtimeconfig.configs.get`):

```bash
gcloud beta runtime-config configs describe my-config
```

## Options / Props

### Permissions by method

| Method | Required permission | Roles that allow it |
|--------|---------------------|---------------------|
| `projects.configs.create` | `runtimeconfig.configs.create` | `roles/owner`, `roles/editor` |
| `projects.configs.delete` | `runtimeconfig.configs.delete` | `roles/owner`, `roles/editor` |
| `projects.configs.get` | `runtimeconfig.configs.get` | `roles/owner`, `roles/editor`, `roles/viewer` |
| `projects.configs.list` | `runtimeconfig.configs.list` | `roles/owner`, `roles/editor`, `roles/viewer` |
| `projects.configs.update` | `runtimeconfig.configs.update` | `roles/owner`, `roles/editor` |
| `projects.configs.operations.get` | `runtimeconfig.configs.operations.get` | `roles/owner`, `roles/editor`, `roles/viewer` |
| `projects.configs.variables.create` | `runtimeconfig.variables.create` | `roles/owner`, `roles/editor` |
| `projects.configs.variables.delete` | `runtimeconfig.variables.delete` | `roles/owner`, `roles/editor` |
| `projects.configs.variables.get` | `runtimeconfig.variables.get` | `roles/owner`, `roles/editor`, `roles/viewer` |
| `projects.configs.variables.list` | `runtimeconfig.variables.list` | `roles/owner`, `roles/editor`, `roles/viewer` |
| `projects.configs.variables.update` | `runtimeconfig.variables.update` | `roles/owner`, `roles/editor` |
| `projects.configs.variables.watch` | `runtimeconfig.variables.watch` | `roles/owner`, `roles/editor`, `roles/viewer` |
| `projects.configs.waiters.create` | `runtimeconfig.waiters.create` | `roles/owner`, `roles/editor` |
| `projects.configs.waiters.delete` | `runtimeconfig.waiters.delete` | `roles/owner`, `roles/editor` |
| `projects.configs.waiters.get` | `runtimeconfig.waiters.get` | `roles/owner`, `roles/editor`, `roles/viewer` |
| `projects.configs.waiters.list` | `runtimeconfig.waiters.list` | `roles/owner`, `roles/editor`, `roles/viewer` |

## Notes

- Beta: subject to the "Pre-GA Offerings Terms".
- `roles/owner` and `roles/editor` are broad basic roles that grant far more than Runtime Configurator. The access-control page names no narrower role; grant at the Config resource level instead of the project where possible.
- The access-control page says "There are no predefined roles for Runtime Configurator." The IAM roles and permissions reference (https://docs.cloud.google.com/iam/docs/roles-permissions/runtimeconfig, retrieved 2026-11-19) does list Cloud RuntimeConfig Admin (`roles/runtimeconfig.admin`), Runtimeconfig Editor (`roles/runtimeconfig.editor`) and Runtimeconfig Viewer (`roles/runtimeconfig.viewer`); check that reference before granting a basic role.
- The table is copied from the access-control page. For `projects.configs.operations.get` it names `runtimeconfig.configs.operations.get`; the IAM roles and permissions reference lists `runtimeconfig.operations.get` and `runtimeconfig.operations.list` instead.
- IAM is covered in `gcp-foundation`.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/beta/runtime-config/configs/describe (gcloud 593.0.0 help, retrieved 2026-11-19)
- Source: https://docs.cloud.google.com/deployment-manager/runtime-configurator/access-control (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [runtime-configurator.md](./runtime-configurator.md)
- [create-and-delete-runtimeconfig-resources.md](./create-and-delete-runtimeconfig-resources.md)
