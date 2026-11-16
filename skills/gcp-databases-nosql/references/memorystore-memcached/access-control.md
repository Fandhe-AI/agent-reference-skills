---
source: https://docs.cloud.google.com/memorystore/docs/memcached/access-control
---

# Access control and permissions

IAM roles and permissions for Memorystore for Memcached. All permissions apply at the project level; they cannot be applied per instance. Custom roles and console/gcloud users must include `resourcemanager.projects.get` and `resourcemanager.projects.list`. See `gcp-foundation` for IAM basics.

## Signature / Usage

### Inspect an instance (requires `memcache.instances.get`)

```bash
gcloud memcache instances describe my-memcache-instance \
    --region=us-central1
```

## Options / Props

### Predefined roles

| Role | Name | Memcached permissions | Description |
|---|---|---|---|
| `roles/owner` | Owner | `memcache.*` | Full access to all Google Cloud resources; manage user access |
| `roles/editor` | Editor | All `memcache` permissions except `*.getIamPolicy` and `*.setIamPolicy` | Read-write on all resources, no permission changes |
| `roles/viewer` | Viewer | `memcache.*.get`, `memcache.*.list` | Read-only |
| `roles/memcache.admin` | Memcached Admin | `memcache.*` | Full control of Memcached resources |
| `roles/memcache.editor` | Memcached Editor | All except `memcache.instances.create`, `.delete`, `.applySoftwareUpdate`, `.upgrade` | Manage instances; cannot create or delete |
| `roles/memcache.viewer` | Memcached Viewer | All except `memcache.instances.create`, `.delete`, `.update`, `memcache.operations.delete`, `memcache.instances.applyParameters`, `.updateParameters`, `.applySoftwareUpdate`, `.upgrade` | Read-only on Memcached resources |

### Permissions and roles

| Permission | Memcached roles |
|---|---|
| `memcache.instances.list`, `.get` | Admin, Editor, Viewer |
| `memcache.instances.create`, `.delete`, `.upgrade` | Admin |
| `memcache.instances.update`, `.applyParameters`, `.updateParameters`, `.applySoftwareUpdate` | Admin, Editor |
| `memcache.locations.list`, `.get` | Admin, Editor, Viewer |
| `memcache.operations.list`, `.get` | Admin, Editor, Viewer |
| `memcache.operations.delete` | Admin, Editor |

### Console tasks

| Task | Additional permissions |
|---|---|
| Instance listing page | `memcache.instances.get`, `memcache.instances.list` |
| Create and edit an instance | `memcache.instances.create`, `.get`, `.list`, `.update`, `.applyParameters`, `.updateParameters`, `.applySoftwareUpdate`, `compute.networks.list` |
| Delete an instance | `memcache.instances.delete`, `.get`, `.list` |
| Connect from Cloud Shell | `memcache.instances.get`, `.list`, `.update` |
| Upgrade Memcached version | `memcache.instances.upgrade` |
| View instance information | `memcache.instances.get`, `monitoring.timeSeries.list` |

### gcloud commands

| Command | Required permissions |
|---|---|
| `gcloud memcache instances create` | `memcache.instances.get`, `memcache.instances.create` |
| `gcloud memcache instances delete` | `memcache.instances.delete` |
| `gcloud memcache instances update` | `memcache.instances.get`, `.update`, `.updateParameters` |
| `gcloud memcache instances upgrade` | `memcache.instances.upgrade` |
| `gcloud memcache instances list` | `memcache.instances.list` |
| `gcloud memcache instances describe` | `memcache.instances.get` |
| `gcloud memcache instances apply-parameters` | `memcache.instances.applyParameters` |
| `gcloud beta memcache instances apply-software-update` | `memcache.instances.applySoftwareUpdate` |
| `gcloud memcache operations list` / `describe` | `memcache.operations.list` / `memcache.operations.get` |
| `gcloud memcache regions list` / `describe` | `memcache.locations.list` / `memcache.locations.get` |
| `gcloud memcache zones list` | `memcache.locations.list` |

### API methods

| Method | Permission |
|---|---|
| `locations.get` / `locations.list` | `memcache.locations.get` / `.list` |
| `instances.create` / `delete` / `get` / `list` / `upgrade` | `memcache.instances.create` / `.delete` / `.get` / `.list` / `.upgrade` |
| `instances.patch` | `memcache.instances.update` |
| `instances.updateParameters` / `applyParameters` / `applySoftwareUpdate` | `memcache.instances.updateParameters` / `.applyParameters` / `.applySoftwareUpdate` |
| `operations.get` / `operations.list` | `memcache.operations.get` / `.list` |

### Maintenance policy permissions

| Action | Permission |
|---|---|
| Create an instance with a maintenance policy | `memcache.instances.create` |
| Create or modify policies on an existing instance | `memcache.instances.update` |
| View maintenance policy settings | `memcache.instances.get` |
| Reschedule maintenance | `memcache.instances.rescheduleMaintenance` |

## Notes

- Instance-level authentication is not available; data-plane access is controlled by VPC network reachability.
- Calling API methods also requires the OAuth scopes described on each method's reference page.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/memcache/instances/describe (the access control page has no code).
- Source: https://docs.cloud.google.com/memorystore/docs/memcached/access-control (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-manage-instances.md](./create-manage-instances.md)
- [about-maintenance.md](./about-maintenance.md)
- [monitor-instances.md](./monitor-instances.md)
