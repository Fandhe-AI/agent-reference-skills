---
source: https://docs.cloud.google.com/netapp/volumes/docs/plan-and-prepare/iam
---

# Configure IAM permissions for NetApp Volumes

NetApp Volumes uses IAM predefined roles `roles/netapp.admin` and `roles/netapp.viewer`. IAM only controls administrative operations (create and delete volumes); access to file data is controlled by NFS and SMB access control.

## Signature / Usage

Roles and required companion permissions for custom roles (literal values from the source):

```text
roles/netapp.admin    (basic Owner and Editor include these permissions)
roles/netapp.viewer   (read-only)
Custom roles must include: resourcemanager.projects.get, resourcemanager.projects.list
```

Snippet: literal role IDs from this page (the twin has no code).

## Options / Props

Selected permissions by resource from the source page (Admin has all of these, plus others the table omits such as `netapp.quotaRules.*`; Viewer has only the `list` / `get` entries):

| Resource | Permissions (`netapp.<resource>.<verb>`) | Viewer |
|---|---|---|
| locations | list, get | list, get |
| volumes | create, list, get, update, delete, restore, revert | list, get |
| storagePools | create, list, get, update, delete, validateDirectoryService | list, get |
| snapshots | create, list, get, update, delete | list, get |
| backups | create, list, get, update, delete | list, get |
| backupVaults | create, list, get, update, delete | list, get |
| backupPolicies | create, list, get, update, delete | list, get |
| replications | create, list, get, update, delete, stop, resume, reverse, establishPeering, sync | list, get |
| activeDirectories | create, get, list, update, delete | get, list |
| kmsConfigs | create, get, list, update, delete, verify, encrypt | get, list |
| hostGroups | create, delete, update, list, get | list, get |
| operations | list, get, cancel, delete | list, get |
| ontap | get, post, patch, delete (ONTAP-mode API calls) | get |

## Notes

- Source inconsistency: the NetApp Volumes IAM page leaves the Viewer cell for the ONTAP-mode permissions empty, but the IAM roles reference lists `netapp.ontap.get` in `roles/netapp.viewer`; the table follows the IAM roles reference.
- Grant `roles/netapp.admin` or `roles/netapp.viewer` on the project; project Owner and Editor include the admin permissions.
- Custom roles must include both `resourcemanager.projects.get` and `resourcemanager.projects.list` to query project resources.
- The NetApp Volumes Admin role allows deleting volumes, pools, snapshots and backups; grant it narrowly.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/netapp (IAM roles reference; retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/netapp/volumes/docs/plan-and-prepare/iam (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [networking.md](./networking.md)
- [create-storage-pool.md](./create-storage-pool.md)
