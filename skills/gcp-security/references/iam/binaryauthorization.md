---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/binaryauthorization
---

# Binary Authorization IAM roles and permissions

## Signature / Usage

Predefined roles of `binaryauthorization` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### Binary Authorization Admin (`roles/binaryauthorization.admin`)

- Admin role for Binary Authorization
- Permissions (25): `binaryauthorization.attestors.create`, `binaryauthorization.attestors.delete`, `binaryauthorization.attestors.get`, `binaryauthorization.attestors.getIamPolicy`, `binaryauthorization.attestors.list`, `binaryauthorization.attestors.setIamPolicy`, `binaryauthorization.attestors.update`, `binaryauthorization.attestors.verifyImageAttested`, `binaryauthorization.continuousValidationConfig.get`, `binaryauthorization.continuousValidationConfig.getIamPolicy`, `binaryauthorization.continuousValidationConfig.setIamPolicy`, `binaryauthorization.continuousValidationConfig.update`, `binaryauthorization.platformPolicies.create`, `binaryauthorization.platformPolicies.delete`, `binaryauthorization.platformPolicies.evaluatePolicy`, `binaryauthorization.platformPolicies.get`, `binaryauthorization.platformPolicies.list`, `binaryauthorization.platformPolicies.replace`, `binaryauthorization.policy.evaluatePolicy`, `binaryauthorization.policy.get`, `binaryauthorization.policy.getIamPolicy`, `binaryauthorization.policy.setIamPolicy`, `binaryauthorization.policy.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Binary Authorization Editor (`roles/binaryauthorization.editor`)

- Editor role for Binary Authorization
- Permissions (22): `binaryauthorization.attestors.create`, `binaryauthorization.attestors.delete`, `binaryauthorization.attestors.get`, `binaryauthorization.attestors.getIamPolicy`, `binaryauthorization.attestors.list`, `binaryauthorization.attestors.update`, `binaryauthorization.attestors.verifyImageAttested`, `binaryauthorization.continuousValidationConfig.get`, `binaryauthorization.continuousValidationConfig.getIamPolicy`, `binaryauthorization.continuousValidationConfig.update`, `binaryauthorization.platformPolicies.create`, `binaryauthorization.platformPolicies.delete`, `binaryauthorization.platformPolicies.evaluatePolicy`, `binaryauthorization.platformPolicies.get`, `binaryauthorization.platformPolicies.list`, `binaryauthorization.platformPolicies.replace`, `binaryauthorization.policy.evaluatePolicy`, `binaryauthorization.policy.get`, `binaryauthorization.policy.getIamPolicy`, `binaryauthorization.policy.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Binary Authorization Viewer (`roles/binaryauthorization.viewer`)

- Viewer role for Binary Authorization
- Permissions (14): `binaryauthorization.attestors.get`, `binaryauthorization.attestors.getIamPolicy`, `binaryauthorization.attestors.list`, `binaryauthorization.attestors.verifyImageAttested`, `binaryauthorization.continuousValidationConfig.get`, `binaryauthorization.continuousValidationConfig.getIamPolicy`, `binaryauthorization.platformPolicies.evaluatePolicy`, `binaryauthorization.platformPolicies.get`, `binaryauthorization.platformPolicies.list`, `binaryauthorization.policy.evaluatePolicy`, `binaryauthorization.policy.get`, `binaryauthorization.policy.getIamPolicy`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Binary Authorization Attestor Admin (`roles/binaryauthorization.attestorsAdmin`)

- Administrator of Binary Authorization Attestors
- Permissions (10): `binaryauthorization.attestors.create`, `binaryauthorization.attestors.delete`, `binaryauthorization.attestors.get`, `binaryauthorization.attestors.getIamPolicy`, `binaryauthorization.attestors.list`, `binaryauthorization.attestors.setIamPolicy`, `binaryauthorization.attestors.update`, `binaryauthorization.attestors.verifyImageAttested`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Binary Authorization Attestor Editor (`roles/binaryauthorization.attestorsEditor`)

- Editor of Binary Authorization Attestors
- Permissions (8): `binaryauthorization.attestors.create`, `binaryauthorization.attestors.delete`, `binaryauthorization.attestors.get`, `binaryauthorization.attestors.list`, `binaryauthorization.attestors.update`, `binaryauthorization.attestors.verifyImageAttested`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Binary Authorization Attestor Image Verifier (`roles/binaryauthorization.attestorsVerifier`)

- Caller of Binary Authorization Attestors VerifyImageAttested
- Permissions (5): `binaryauthorization.attestors.get`, `binaryauthorization.attestors.list`, `binaryauthorization.attestors.verifyImageAttested`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Binary Authorization Attestor Viewer (`roles/binaryauthorization.attestorsViewer`)

- Viewer of Binary Authorization Attestors
- Permissions (4): `binaryauthorization.attestors.get`, `binaryauthorization.attestors.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Binary Authorization Policy Administrator (`roles/binaryauthorization.policyAdmin`)

- Administrator of Binary Authorization Policy
- Permissions (17): `binaryauthorization.continuousValidationConfig.get`, `binaryauthorization.continuousValidationConfig.getIamPolicy`, `binaryauthorization.continuousValidationConfig.setIamPolicy`, `binaryauthorization.continuousValidationConfig.update`, `binaryauthorization.platformPolicies.create`, `binaryauthorization.platformPolicies.delete`, `binaryauthorization.platformPolicies.evaluatePolicy`, `binaryauthorization.platformPolicies.get`, `binaryauthorization.platformPolicies.list`, `binaryauthorization.platformPolicies.replace`, `binaryauthorization.policy.evaluatePolicy`, `binaryauthorization.policy.get`, `binaryauthorization.policy.getIamPolicy`, `binaryauthorization.policy.setIamPolicy`, `binaryauthorization.policy.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Binary Authorization Policy Editor (`roles/binaryauthorization.policyEditor`)

- Editor of Binary Authorization Policy
- Permissions (13): `binaryauthorization.continuousValidationConfig.get`, `binaryauthorization.continuousValidationConfig.update`, `binaryauthorization.platformPolicies.create`, `binaryauthorization.platformPolicies.delete`, `binaryauthorization.platformPolicies.evaluatePolicy`, `binaryauthorization.platformPolicies.get`, `binaryauthorization.platformPolicies.list`, `binaryauthorization.platformPolicies.replace`, `binaryauthorization.policy.evaluatePolicy`, `binaryauthorization.policy.get`, `binaryauthorization.policy.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Binary Authorization Policy Evaluator (`roles/binaryauthorization.policyEvaluator`)

- Evaluator of Binary Authorization Policy
- Permissions (7): `binaryauthorization.platformPolicies.evaluatePolicy`, `binaryauthorization.platformPolicies.get`, `binaryauthorization.platformPolicies.list`, `binaryauthorization.policy.evaluatePolicy`, `binaryauthorization.policy.get`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Binary Authorization Policy Viewer (`roles/binaryauthorization.policyViewer`)

- Viewer of Binary Authorization Policy
- Permissions (6): `binaryauthorization.continuousValidationConfig.get`, `binaryauthorization.platformPolicies.get`, `binaryauthorization.platformPolicies.list`, `binaryauthorization.policy.get`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Binary Authorization Service Agent (`roles/binaryauthorization.serviceAgent`)

- Can read Notes and Occurrences from the Container Analysis Service to find and verify signatures. > \[!WARNING\] > \*\*Warning:\*\* Do not grant service agent roles to any principals except service agents (https://docs.cloud.google.com/iam/docs/service-agents).
- Permissions (20): `artifactregistry.dockerimages.get`, `artifactregistry.repositories.downloadArtifacts`, `binaryauthorization.attestors.get`, `binaryauthorization.attestors.list`, `binaryauthorization.attestors.verifyImageAttested`, `binaryauthorization.platformPolicies.evaluatePolicy`, `binaryauthorization.policy.evaluatePolicy`, `cloudasset.assets.exportResource`, `cloudasset.feeds.create`, `cloudasset.feeds.delete`, `cloudasset.feeds.get`, `cloudasset.feeds.update`, `containeranalysis.notes.get`, `containeranalysis.notes.list`, `containeranalysis.notes.listOccurrences`, `containeranalysis.occurrences.get`, `containeranalysis.occurrences.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`, `storage.objects.list`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page on a whole project (the role entry on this page does not list the lowest-level resources where it can be granted; granting it on a narrower resource, where the role supports that, limits the scope):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/binaryauthorization.admin"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `binaryauthorization.attestors.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/binaryauthorization.admin`, `roles/binaryauthorization.editor`, `roles/binaryauthorization.attestorsAdmin`, `roles/binaryauthorization.attestorsEditor` (+1 service agent role) |
| `binaryauthorization.attestors.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/binaryauthorization.admin`, `roles/binaryauthorization.editor`, `roles/binaryauthorization.attestorsAdmin`, `roles/binaryauthorization.attestorsEditor` (+1 service agent role) |
| `binaryauthorization.attestors.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/binaryauthorization.admin`, `roles/binaryauthorization.editor`, `roles/binaryauthorization.viewer`, `roles/binaryauthorization.attestorsAdmin`, `roles/binaryauthorization.attestorsEditor`, `roles/binaryauthorization.attestorsVerifier`, `roles/binaryauthorization.attestorsViewer`, `roles/iam.supportUser` (+2 service agent roles) |
| `binaryauthorization.attestors.getIamPolicy` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/binaryauthorization.admin`, `roles/binaryauthorization.editor`, `roles/binaryauthorization.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/binaryauthorization.attestorsAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `binaryauthorization.attestors.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/binaryauthorization.admin`, `roles/binaryauthorization.editor`, `roles/binaryauthorization.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/binaryauthorization.attestorsAdmin`, `roles/binaryauthorization.attestorsEditor`, `roles/binaryauthorization.attestorsVerifier`, `roles/binaryauthorization.attestorsViewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/wiz.cloudInventoryViewer` (+2 service agent roles) |
| `binaryauthorization.attestors.setIamPolicy` | `roles/admin`, `roles/owner`, `roles/binaryauthorization.admin`, `roles/iam.securityAdmin`, `roles/binaryauthorization.attestorsAdmin` |
| `binaryauthorization.attestors.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/binaryauthorization.admin`, `roles/binaryauthorization.editor`, `roles/binaryauthorization.attestorsAdmin`, `roles/binaryauthorization.attestorsEditor` (+1 service agent role) |
| `binaryauthorization.attestors.verifyImageAttested` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/binaryauthorization.admin`, `roles/binaryauthorization.editor`, `roles/binaryauthorization.viewer`, `roles/binaryauthorization.attestorsAdmin`, `roles/binaryauthorization.attestorsEditor`, `roles/binaryauthorization.attestorsVerifier`, `roles/iam.supportUser` (+2 service agent roles) |
| `binaryauthorization.continuousValidationConfig.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/binaryauthorization.admin`, `roles/binaryauthorization.editor`, `roles/binaryauthorization.viewer`, `roles/binaryauthorization.policyAdmin`, `roles/binaryauthorization.policyEditor`, `roles/binaryauthorization.policyViewer`, `roles/iam.devOps`, `roles/iam.supportUser` |
| `binaryauthorization.continuousValidationConfig.getIamPolicy` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/binaryauthorization.admin`, `roles/binaryauthorization.editor`, `roles/binaryauthorization.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/binaryauthorization.policyAdmin`, `roles/iam.devOps`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `binaryauthorization.continuousValidationConfig.setIamPolicy` | `roles/admin`, `roles/owner`, `roles/binaryauthorization.admin`, `roles/iam.securityAdmin`, `roles/binaryauthorization.policyAdmin`, `roles/iam.devOps` |
| `binaryauthorization.continuousValidationConfig.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/binaryauthorization.admin`, `roles/binaryauthorization.editor`, `roles/binaryauthorization.policyAdmin`, `roles/binaryauthorization.policyEditor`, `roles/iam.devOps` |
| `binaryauthorization.platformPolicies.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/binaryauthorization.admin`, `roles/binaryauthorization.editor`, `roles/binaryauthorization.policyAdmin`, `roles/binaryauthorization.policyEditor`, `roles/iam.devOps` |
| `binaryauthorization.platformPolicies.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/binaryauthorization.admin`, `roles/binaryauthorization.editor`, `roles/binaryauthorization.policyAdmin`, `roles/binaryauthorization.policyEditor`, `roles/iam.devOps` |
| `binaryauthorization.platformPolicies.evaluatePolicy` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/binaryauthorization.admin`, `roles/binaryauthorization.editor`, `roles/binaryauthorization.viewer`, `roles/binaryauthorization.policyAdmin`, `roles/binaryauthorization.policyEditor`, `roles/binaryauthorization.policyEvaluator`, `roles/iam.devOps`, `roles/iam.supportUser` (+3 service agent roles) |
| `binaryauthorization.platformPolicies.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/binaryauthorization.admin`, `roles/binaryauthorization.editor`, `roles/binaryauthorization.viewer`, `roles/binaryauthorization.policyAdmin`, `roles/binaryauthorization.policyEditor`, `roles/binaryauthorization.policyEvaluator`, `roles/binaryauthorization.policyViewer`, `roles/iam.devOps`, `roles/iam.supportUser` (+1 service agent role) |
| `binaryauthorization.platformPolicies.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/binaryauthorization.admin`, `roles/binaryauthorization.editor`, `roles/binaryauthorization.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/binaryauthorization.policyAdmin`, `roles/binaryauthorization.policyEditor`, `roles/binaryauthorization.policyEvaluator`, `roles/binaryauthorization.policyViewer`, `roles/iam.devOps`, `roles/iam.securityAuditor`, `roles/iam.supportUser` (+1 service agent role) |
| `binaryauthorization.platformPolicies.replace` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/binaryauthorization.admin`, `roles/binaryauthorization.editor`, `roles/binaryauthorization.policyAdmin`, `roles/binaryauthorization.policyEditor`, `roles/iam.devOps` |
| `binaryauthorization.policy.evaluatePolicy` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/binaryauthorization.admin`, `roles/binaryauthorization.editor`, `roles/binaryauthorization.viewer`, `roles/binaryauthorization.policyAdmin`, `roles/binaryauthorization.policyEditor`, `roles/binaryauthorization.policyEvaluator`, `roles/iam.devOps`, `roles/iam.supportUser` (+5 service agent roles) |
| `binaryauthorization.policy.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/binaryauthorization.admin`, `roles/binaryauthorization.editor`, `roles/binaryauthorization.viewer`, `roles/binaryauthorization.policyAdmin`, `roles/binaryauthorization.policyEditor`, `roles/binaryauthorization.policyEvaluator`, `roles/binaryauthorization.policyViewer`, `roles/iam.devOps`, `roles/iam.supportUser` (+6 service agent roles) |
| `binaryauthorization.policy.getIamPolicy` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/binaryauthorization.admin`, `roles/binaryauthorization.editor`, `roles/binaryauthorization.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/binaryauthorization.policyAdmin`, `roles/iam.devOps`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `binaryauthorization.policy.setIamPolicy` | `roles/admin`, `roles/owner`, `roles/binaryauthorization.admin`, `roles/iam.securityAdmin`, `roles/binaryauthorization.policyAdmin`, `roles/iam.devOps` |
| `binaryauthorization.policy.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/binaryauthorization.admin`, `roles/binaryauthorization.editor`, `roles/binaryauthorization.policyAdmin`, `roles/binaryauthorization.policyEditor`, `roles/iam.devOps` |

## Notes

- Roles and permissions of the `binaryauthorization` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/binaryauthorization (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
