---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/confidentialcomputing
---

# Confidential Computing IAM roles and permissions

## Signature / Usage

Predefined roles of `confidentialcomputing` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### Confidentialcomputing Admin (`roles/confidentialcomputing.admin`)

- Admin role for confidentialcomputing
- Permissions (7): `confidentialcomputing.challenges.create`, `confidentialcomputing.challenges.verify`, `confidentialcomputing.challenges.verifygke`, `confidentialcomputing.locations.get`, `confidentialcomputing.locations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Confidentialcomputing Viewer (`roles/confidentialcomputing.viewer`)

- Viewer role for confidentialcomputing
- Permissions (4): `confidentialcomputing.locations.get`, `confidentialcomputing.locations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Confidential GKE Workload User (`roles/confidentialcomputing.gkeWorkloadUser`)

- Grants the ability to generate a GKE attestation token and run a workload in a GKE cluster.
- Permissions (5): `confidentialcomputing.challenges.create`, `confidentialcomputing.challenges.verifygke`, `confidentialcomputing.locations.get`, `confidentialcomputing.locations.list`, `logging.logEntries.create`

#### Confidential Space Workload User (`roles/confidentialcomputing.workloadUser`)

- Grants the ability to generate an attestation token and run a workload in a VM. Intended for service accounts that run on Confidential Space VMs.
- Permissions (5): `confidentialcomputing.challenges.create`, `confidentialcomputing.challenges.verify`, `confidentialcomputing.locations.get`, `confidentialcomputing.locations.list`, `logging.logEntries.create`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page on a whole project (the role entry on this page does not list the lowest-level resources where it can be granted; granting it on a narrower resource, where the role supports that, limits the scope):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/confidentialcomputing.admin"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `confidentialcomputing.challenges.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/confidentialcomputing.admin`, `roles/confidentialcomputing.gkeWorkloadUser`, `roles/confidentialcomputing.workloadUser` |
| `confidentialcomputing.challenges.verify` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/confidentialcomputing.admin`, `roles/confidentialcomputing.workloadUser` |
| `confidentialcomputing.challenges.verifygke` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/confidentialcomputing.admin`, `roles/confidentialcomputing.gkeWorkloadUser` |
| `confidentialcomputing.locations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/confidentialcomputing.admin`, `roles/confidentialcomputing.viewer`, `roles/confidentialcomputing.gkeWorkloadUser`, `roles/confidentialcomputing.workloadUser`, `roles/iam.supportUser` |
| `confidentialcomputing.locations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/confidentialcomputing.admin`, `roles/confidentialcomputing.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/confidentialcomputing.gkeWorkloadUser`, `roles/confidentialcomputing.workloadUser`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |

## Notes

- Roles and permissions of the `confidentialcomputing` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/confidentialcomputing (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
