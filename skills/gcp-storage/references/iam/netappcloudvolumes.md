---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/netappcloudvolumes
---

# NetApp Cloud Volumes Service IAM roles and permissions

## Signature / Usage

Predefined roles of `netappcloudvolumes` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### NetApp Cloud Volumes Admin (`roles/netappcloudvolumes.admin`)

- Launch stage: Beta
- This role is managed by NetApp, not Google.
- Permissions (32): `cloudvolumesgcp-api.netapp.com/*`, `cloudvolumesgcp-api.netapp.com/activeDirectories.create`, `cloudvolumesgcp-api.netapp.com/activeDirectories.delete`, `cloudvolumesgcp-api.netapp.com/activeDirectories.get`, `cloudvolumesgcp-api.netapp.com/activeDirectories.list`, `cloudvolumesgcp-api.netapp.com/activeDirectories.update`, `cloudvolumesgcp-api.netapp.com/ipRanges.list`, `cloudvolumesgcp-api.netapp.com/jobs.get`, `cloudvolumesgcp-api.netapp.com/jobs.list`, `cloudvolumesgcp-api.netapp.com/regions.list`, `cloudvolumesgcp-api.netapp.com/serviceLevels.list`, `cloudvolumesgcp-api.netapp.com/snapshots.create`, `cloudvolumesgcp-api.netapp.com/snapshots.delete`, `cloudvolumesgcp-api.netapp.com/snapshots.get`, `cloudvolumesgcp-api.netapp.com/snapshots.list`, `cloudvolumesgcp-api.netapp.com/snapshots.update`, `cloudvolumesgcp-api.netapp.com/volumereplication.authorize`, `cloudvolumesgcp-api.netapp.com/volumereplication.break`, `cloudvolumesgcp-api.netapp.com/volumereplication.create`, `cloudvolumesgcp-api.netapp.com/volumereplication.delete`, `cloudvolumesgcp-api.netapp.com/volumereplication.get`, `cloudvolumesgcp-api.netapp.com/volumereplication.list`, `cloudvolumesgcp-api.netapp.com/volumereplication.release`, `cloudvolumesgcp-api.netapp.com/volumereplication.resync`, `cloudvolumesgcp-api.netapp.com/volumereplication.update`, `cloudvolumesgcp-api.netapp.com/volumes.create`, `cloudvolumesgcp-api.netapp.com/volumes.delete`, `cloudvolumesgcp-api.netapp.com/volumes.get`, `cloudvolumesgcp-api.netapp.com/volumes.list`, `cloudvolumesgcp-api.netapp.com/volumes.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### NetApp Cloud Volumes Viewer (`roles/netappcloudvolumes.viewer`)

- Launch stage: Beta
- This role is managed by NetApp, not Google.
- Permissions (13): `cloudvolumesgcp-api.netapp.com/activeDirectories.get`, `cloudvolumesgcp-api.netapp.com/activeDirectories.list`, `cloudvolumesgcp-api.netapp.com/ipRanges.list`, `cloudvolumesgcp-api.netapp.com/jobs.get`, `cloudvolumesgcp-api.netapp.com/jobs.list`, `cloudvolumesgcp-api.netapp.com/regions.list`, `cloudvolumesgcp-api.netapp.com/serviceLevels.list`, `cloudvolumesgcp-api.netapp.com/snapshots.get`, `cloudvolumesgcp-api.netapp.com/snapshots.list`, `cloudvolumesgcp-api.netapp.com/volumes.get`, `cloudvolumesgcp-api.netapp.com/volumes.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page on a whole project (the role entry on this page does not list the lowest-level resources where it can be granted; granting it on a narrower resource, where the role supports that, limits the scope):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/netappcloudvolumes.admin"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `cloudvolumesgcp-api.netapp.com/activeDirectories.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/netappcloudvolumes.admin` |
| `cloudvolumesgcp-api.netapp.com/activeDirectories.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/netappcloudvolumes.admin` |
| `cloudvolumesgcp-api.netapp.com/activeDirectories.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/netappcloudvolumes.admin`, `roles/netappcloudvolumes.viewer`, `roles/iam.supportUser` |
| `cloudvolumesgcp-api.netapp.com/activeDirectories.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/netappcloudvolumes.admin`, `roles/netappcloudvolumes.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `cloudvolumesgcp-api.netapp.com/activeDirectories.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/netappcloudvolumes.admin` |
| `cloudvolumesgcp-api.netapp.com/ipRanges.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/netappcloudvolumes.admin`, `roles/netappcloudvolumes.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `cloudvolumesgcp-api.netapp.com/jobs.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/netappcloudvolumes.admin`, `roles/netappcloudvolumes.viewer`, `roles/iam.supportUser` |
| `cloudvolumesgcp-api.netapp.com/jobs.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/netappcloudvolumes.admin`, `roles/netappcloudvolumes.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `cloudvolumesgcp-api.netapp.com/regions.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/netappcloudvolumes.admin`, `roles/netappcloudvolumes.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `cloudvolumesgcp-api.netapp.com/serviceLevels.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/netappcloudvolumes.admin`, `roles/netappcloudvolumes.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `cloudvolumesgcp-api.netapp.com/snapshots.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/netappcloudvolumes.admin` |
| `cloudvolumesgcp-api.netapp.com/snapshots.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/netappcloudvolumes.admin` |
| `cloudvolumesgcp-api.netapp.com/snapshots.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/netappcloudvolumes.admin`, `roles/netappcloudvolumes.viewer`, `roles/iam.supportUser` |
| `cloudvolumesgcp-api.netapp.com/snapshots.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/netappcloudvolumes.admin`, `roles/netappcloudvolumes.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `cloudvolumesgcp-api.netapp.com/snapshots.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/netappcloudvolumes.admin` |
| `cloudvolumesgcp-api.netapp.com/volumereplication.authorize` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/netappcloudvolumes.admin` |
| `cloudvolumesgcp-api.netapp.com/volumereplication.break` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/netappcloudvolumes.admin` |
| `cloudvolumesgcp-api.netapp.com/volumereplication.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/netappcloudvolumes.admin` |
| `cloudvolumesgcp-api.netapp.com/volumereplication.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/netappcloudvolumes.admin` |
| `cloudvolumesgcp-api.netapp.com/volumereplication.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/netappcloudvolumes.admin`, `roles/iam.supportUser` |
| `cloudvolumesgcp-api.netapp.com/volumereplication.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/netappcloudvolumes.admin`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `cloudvolumesgcp-api.netapp.com/volumereplication.release` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/netappcloudvolumes.admin` |
| `cloudvolumesgcp-api.netapp.com/volumereplication.resync` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/netappcloudvolumes.admin` |
| `cloudvolumesgcp-api.netapp.com/volumereplication.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/netappcloudvolumes.admin` |
| `cloudvolumesgcp-api.netapp.com/volumes.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/netappcloudvolumes.admin` |
| `cloudvolumesgcp-api.netapp.com/volumes.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/netappcloudvolumes.admin` |
| `cloudvolumesgcp-api.netapp.com/volumes.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/netappcloudvolumes.admin`, `roles/netappcloudvolumes.viewer`, `roles/iam.supportUser` |
| `cloudvolumesgcp-api.netapp.com/volumes.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/netappcloudvolumes.admin`, `roles/netappcloudvolumes.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `cloudvolumesgcp-api.netapp.com/volumes.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/netappcloudvolumes.admin` |

## Notes

- Roles and permissions of the `netappcloudvolumes` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/netappcloudvolumes (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
