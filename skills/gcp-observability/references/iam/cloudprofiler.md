---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/cloudprofiler
---

# Cloud Profiler IAM roles and permissions

## Signature / Usage

Predefined roles of `cloudprofiler` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### Cloud Profiler Admin (`roles/cloudprofiler.admin`)

- Admin role for Cloud Profiler
- Permissions (5): `cloudprofiler.profiles.create`, `cloudprofiler.profiles.list`, `cloudprofiler.profiles.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Cloud Profiler Viewer (`roles/cloudprofiler.viewer`)

- Viewer role for Cloud Profiler
- Permissions (3): `cloudprofiler.profiles.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Cloud Profiler Agent (`roles/cloudprofiler.agent`)

- Cloud Profiler agents are allowed to register and provide the profiling data.
- Permissions (2): `cloudprofiler.profiles.create`, `cloudprofiler.profiles.update`

#### Cloud Profiler User (`roles/cloudprofiler.user`)

- Cloud Profiler users are allowed to query and view the profiling data.
- Permissions (16): `cloudprofiler.profiles.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`, `serviceusage.catalogs.listMembers`, `serviceusage.consumerpolicy.analyze`, `serviceusage.consumerpolicy.get`, `serviceusage.effectivepolicy.get`, `serviceusage.groups.list`, `serviceusage.groups.listExpandedMembers`, `serviceusage.groups.listMembers`, `serviceusage.quotas.get`, `serviceusage.services.get`, `serviceusage.services.list`, `serviceusage.services.listApis`, `serviceusage.services.listDependentServices`, `serviceusage.values.test`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page on a whole project (the role entry on this page does not list the lowest-level resources where it can be granted; granting it on a narrower resource, where the role supports that, limits the scope):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/cloudprofiler.admin"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `cloudprofiler.profiles.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudprofiler.admin`, `roles/cloudprofiler.agent`, `roles/dataproc.worker` |
| `cloudprofiler.profiles.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudprofiler.admin`, `roles/cloudprofiler.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/cloudprofiler.user`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `cloudprofiler.profiles.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudprofiler.admin`, `roles/cloudprofiler.agent`, `roles/dataproc.worker` |

## Notes

- Roles and permissions of the `cloudprofiler` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/cloudprofiler (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
