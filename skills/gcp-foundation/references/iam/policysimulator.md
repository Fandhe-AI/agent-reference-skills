---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/policysimulator
---

# Policy Simulator IAM roles and permissions

## Signature / Usage

Predefined roles of `policysimulator` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### Simulator Admin (`roles/policysimulator.admin`)

- Launch stage: Beta
- Admin user that can run and access replays.
- Permissions (9): `policysimulator.accessPolicySimulationResults.list`, `policysimulator.accessPolicySimulations.create`, `policysimulator.accessPolicySimulations.get`, `policysimulator.accessPolicySimulations.list`, `policysimulator.replayResults.list`, `policysimulator.replays.create`, `policysimulator.replays.get`, `policysimulator.replays.list`, `policysimulator.replays.run`

#### OrgPolicy Simulator Admin (`roles/policysimulator.orgPolicyAdmin`)

- Launch stage: Beta
- OrgPolicy Admin that can run and access simulations.
- Permissions (13): `cloudasset.assets.analyzeOrgPolicy`, `cloudasset.assets.exportResource`, `cloudasset.assets.listResource`, `cloudasset.assets.searchAllResources`, `orgpolicy.customConstraints.get`, `orgpolicy.customConstraints.list`, `orgpolicy.policies.list`, `orgpolicy.policy.get`, `policysimulator.orgPolicyViolations.list`, `policysimulator.orgPolicyViolationsPreviews.create`, `policysimulator.orgPolicyViolationsPreviews.get`, `policysimulator.orgPolicyViolationsPreviews.list`, `resourcemanager.organizations.get`

#### Policysimulator Viewer (`roles/policysimulator.viewer`)

- Launch stage: Beta
- Viewer role for policysimulator
- Permissions (11): `policysimulator.accessPolicySimulationResults.list`, `policysimulator.accessPolicySimulations.get`, `policysimulator.accessPolicySimulations.list`, `policysimulator.orgPolicyViolations.list`, `policysimulator.orgPolicyViolationsPreviews.get`, `policysimulator.orgPolicyViolationsPreviews.list`, `policysimulator.replayResults.list`, `policysimulator.replays.get`, `policysimulator.replays.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page at its lowest-level resource (Project):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/policysimulator.admin"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `policysimulator.accessPolicySimulationResults.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/policysimulator.admin`, `roles/policysimulator.viewer`, `roles/iam.denyAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `policysimulator.accessPolicySimulations.create` | `roles/admin`, `roles/owner`, `roles/policysimulator.admin`, `roles/iam.denyAdmin` |
| `policysimulator.accessPolicySimulations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/policysimulator.admin`, `roles/policysimulator.viewer`, `roles/iam.denyAdmin`, `roles/iam.supportUser` |
| `policysimulator.accessPolicySimulations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/policysimulator.admin`, `roles/policysimulator.viewer`, `roles/iam.denyAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `policysimulator.orgPolicyViolations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/orgpolicy.policyAdmin`, `roles/policysimulator.orgPolicyAdmin`, `roles/policysimulator.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `policysimulator.orgPolicyViolationsPreviews.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/orgpolicy.policyAdmin`, `roles/policysimulator.orgPolicyAdmin` |
| `policysimulator.orgPolicyViolationsPreviews.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/orgpolicy.policyAdmin`, `roles/policysimulator.orgPolicyAdmin`, `roles/policysimulator.viewer`, `roles/iam.supportUser` |
| `policysimulator.orgPolicyViolationsPreviews.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/orgpolicy.policyAdmin`, `roles/policysimulator.orgPolicyAdmin`, `roles/policysimulator.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `policysimulator.replayResults.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/policysimulator.admin`, `roles/policysimulator.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `policysimulator.replays.create` | `roles/admin`, `roles/owner`, `roles/iam.securityAdmin`, `roles/policysimulator.admin` |
| `policysimulator.replays.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/policysimulator.admin`, `roles/policysimulator.viewer`, `roles/iam.supportUser` |
| `policysimulator.replays.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/policysimulator.admin`, `roles/policysimulator.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `policysimulator.replays.run` | `roles/admin`, `roles/owner`, `roles/iam.securityAdmin`, `roles/policysimulator.admin` |

## Notes

- Roles and permissions of the `policysimulator` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/policysimulator (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
