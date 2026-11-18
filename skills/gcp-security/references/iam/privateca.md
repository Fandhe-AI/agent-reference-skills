---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/privateca
---

# Certificate Authority Service IAM roles and permissions

## Signature / Usage

Predefined roles of `privateca` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### CA Service Admin (`roles/privateca.admin`)

- Full access to all CA Service resources.
- Permissions (60): `privateca.caPools.create`, `privateca.caPools.createTagBinding`, `privateca.caPools.delete`, `privateca.caPools.deleteTagBinding`, `privateca.caPools.get`, `privateca.caPools.getIamPolicy`, `privateca.caPools.list`, `privateca.caPools.listEffectiveTags`, `privateca.caPools.listTagBindings`, `privateca.caPools.setIamPolicy`, `privateca.caPools.update`, `privateca.caPools.use`, `privateca.certificateAuthorities.create`, `privateca.certificateAuthorities.delete`, `privateca.certificateAuthorities.get`, `privateca.certificateAuthorities.getIamPolicy`, `privateca.certificateAuthorities.list`, `privateca.certificateAuthorities.setIamPolicy`, `privateca.certificateAuthorities.update`, `privateca.certificateRevocationLists.create`, `privateca.certificateRevocationLists.get`, `privateca.certificateRevocationLists.getIamPolicy`, `privateca.certificateRevocationLists.list`, `privateca.certificateRevocationLists.setIamPolicy`, `privateca.certificateRevocationLists.update`, `privateca.certificateTemplates.create`, `privateca.certificateTemplates.createTagBinding`, `privateca.certificateTemplates.delete`, `privateca.certificateTemplates.deleteTagBinding`, `privateca.certificateTemplates.get`, `privateca.certificateTemplates.getIamPolicy`, `privateca.certificateTemplates.list`, `privateca.certificateTemplates.listEffectiveTags`, `privateca.certificateTemplates.listTagBindings`, `privateca.certificateTemplates.setIamPolicy`, `privateca.certificateTemplates.update`, `privateca.certificateTemplates.use`, `privateca.certificates.create`, `privateca.certificates.createForSelf`, `privateca.certificates.get`, `privateca.certificates.getIamPolicy`, `privateca.certificates.list`, `privateca.certificates.setIamPolicy`, `privateca.certificates.update`, `privateca.locations.get`, `privateca.locations.list`, `privateca.operations.cancel`, `privateca.operations.delete`, `privateca.operations.get`, `privateca.operations.list`, `privateca.reusableConfigs.create`, `privateca.reusableConfigs.delete`, `privateca.reusableConfigs.get`, `privateca.reusableConfigs.getIamPolicy`, `privateca.reusableConfigs.list`, `privateca.reusableConfigs.setIamPolicy`, `privateca.reusableConfigs.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`, `storage.buckets.create`

#### CA Service Editor (`roles/privateca.editor`)

- Editor role for CA Service
- Permissions (49): `privateca.caPools.create`, `privateca.caPools.delete`, `privateca.caPools.get`, `privateca.caPools.getIamPolicy`, `privateca.caPools.list`, `privateca.caPools.listEffectiveTags`, `privateca.caPools.listTagBindings`, `privateca.caPools.update`, `privateca.caPools.use`, `privateca.certificateAuthorities.create`, `privateca.certificateAuthorities.delete`, `privateca.certificateAuthorities.get`, `privateca.certificateAuthorities.getIamPolicy`, `privateca.certificateAuthorities.list`, `privateca.certificateAuthorities.update`, `privateca.certificateRevocationLists.create`, `privateca.certificateRevocationLists.get`, `privateca.certificateRevocationLists.getIamPolicy`, `privateca.certificateRevocationLists.list`, `privateca.certificateRevocationLists.update`, `privateca.certificateTemplates.create`, `privateca.certificateTemplates.delete`, `privateca.certificateTemplates.get`, `privateca.certificateTemplates.getIamPolicy`, `privateca.certificateTemplates.list`, `privateca.certificateTemplates.listEffectiveTags`, `privateca.certificateTemplates.listTagBindings`, `privateca.certificateTemplates.update`, `privateca.certificateTemplates.use`, `privateca.certificates.create`, `privateca.certificates.createForSelf`, `privateca.certificates.get`, `privateca.certificates.getIamPolicy`, `privateca.certificates.list`, `privateca.certificates.update`, `privateca.locations.get`, `privateca.locations.list`, `privateca.operations.cancel`, `privateca.operations.delete`, `privateca.operations.get`, `privateca.operations.list`, `privateca.reusableConfigs.create`, `privateca.reusableConfigs.delete`, `privateca.reusableConfigs.get`, `privateca.reusableConfigs.getIamPolicy`, `privateca.reusableConfigs.list`, `privateca.reusableConfigs.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### CA Service Viewer (`roles/privateca.viewer`)

- Viewer role for CA Service
- Permissions (29): `privateca.caPools.get`, `privateca.caPools.getIamPolicy`, `privateca.caPools.list`, `privateca.caPools.listEffectiveTags`, `privateca.caPools.listTagBindings`, `privateca.certificateAuthorities.get`, `privateca.certificateAuthorities.getIamPolicy`, `privateca.certificateAuthorities.list`, `privateca.certificateRevocationLists.get`, `privateca.certificateRevocationLists.getIamPolicy`, `privateca.certificateRevocationLists.list`, `privateca.certificateTemplates.get`, `privateca.certificateTemplates.getIamPolicy`, `privateca.certificateTemplates.list`, `privateca.certificateTemplates.listEffectiveTags`, `privateca.certificateTemplates.listTagBindings`, `privateca.certificateTemplates.use`, `privateca.certificates.get`, `privateca.certificates.getIamPolicy`, `privateca.certificates.list`, `privateca.locations.get`, `privateca.locations.list`, `privateca.operations.get`, `privateca.operations.list`, `privateca.reusableConfigs.get`, `privateca.reusableConfigs.getIamPolicy`, `privateca.reusableConfigs.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### CA Service Auditor (`roles/privateca.auditor`)

- Read-only access to all CA Service resources.
- Permissions (24): `privateca.caPools.get`, `privateca.caPools.getIamPolicy`, `privateca.caPools.list`, `privateca.certificateAuthorities.get`, `privateca.certificateAuthorities.getIamPolicy`, `privateca.certificateAuthorities.list`, `privateca.certificateRevocationLists.get`, `privateca.certificateRevocationLists.getIamPolicy`, `privateca.certificateRevocationLists.list`, `privateca.certificateTemplates.get`, `privateca.certificateTemplates.getIamPolicy`, `privateca.certificateTemplates.list`, `privateca.certificates.get`, `privateca.certificates.getIamPolicy`, `privateca.certificates.list`, `privateca.locations.get`, `privateca.locations.list`, `privateca.operations.get`, `privateca.operations.list`, `privateca.reusableConfigs.get`, `privateca.reusableConfigs.getIamPolicy`, `privateca.reusableConfigs.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### CA Service Operation Manager (`roles/privateca.caManager`)

- Create and manage CAs, revoke certificates, create certificates templates, and read-only access for CA Service resources.
- Permissions (47): `privateca.caPools.create`, `privateca.caPools.createTagBinding`, `privateca.caPools.delete`, `privateca.caPools.deleteTagBinding`, `privateca.caPools.get`, `privateca.caPools.getIamPolicy`, `privateca.caPools.list`, `privateca.caPools.listEffectiveTags`, `privateca.caPools.listTagBindings`, `privateca.caPools.update`, `privateca.certificateAuthorities.create`, `privateca.certificateAuthorities.delete`, `privateca.certificateAuthorities.get`, `privateca.certificateAuthorities.getIamPolicy`, `privateca.certificateAuthorities.list`, `privateca.certificateAuthorities.update`, `privateca.certificateRevocationLists.get`, `privateca.certificateRevocationLists.getIamPolicy`, `privateca.certificateRevocationLists.list`, `privateca.certificateRevocationLists.update`, `privateca.certificateTemplates.create`, `privateca.certificateTemplates.createTagBinding`, `privateca.certificateTemplates.delete`, `privateca.certificateTemplates.deleteTagBinding`, `privateca.certificateTemplates.get`, `privateca.certificateTemplates.getIamPolicy`, `privateca.certificateTemplates.list`, `privateca.certificateTemplates.listEffectiveTags`, `privateca.certificateTemplates.listTagBindings`, `privateca.certificateTemplates.update`, `privateca.certificates.get`, `privateca.certificates.getIamPolicy`, `privateca.certificates.list`, `privateca.certificates.update`, `privateca.locations.get`, `privateca.locations.list`, `privateca.operations.get`, `privateca.operations.list`, `privateca.reusableConfigs.create`, `privateca.reusableConfigs.delete`, `privateca.reusableConfigs.get`, `privateca.reusableConfigs.getIamPolicy`, `privateca.reusableConfigs.list`, `privateca.reusableConfigs.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`, `storage.buckets.create`

#### CA Service Certificate Manager (`roles/privateca.certificateManager`)

- Create certificates and read-only access for CA Service resources.
- Permissions (29): `privateca.caPools.get`, `privateca.caPools.getIamPolicy`, `privateca.caPools.list`, `privateca.caPools.listEffectiveTags`, `privateca.caPools.listTagBindings`, `privateca.certificateAuthorities.get`, `privateca.certificateAuthorities.getIamPolicy`, `privateca.certificateAuthorities.list`, `privateca.certificateRevocationLists.get`, `privateca.certificateRevocationLists.getIamPolicy`, `privateca.certificateRevocationLists.list`, `privateca.certificateTemplates.get`, `privateca.certificateTemplates.getIamPolicy`, `privateca.certificateTemplates.list`, `privateca.certificateTemplates.listEffectiveTags`, `privateca.certificateTemplates.listTagBindings`, `privateca.certificates.create`, `privateca.certificates.get`, `privateca.certificates.getIamPolicy`, `privateca.certificates.list`, `privateca.locations.get`, `privateca.locations.list`, `privateca.operations.get`, `privateca.operations.list`, `privateca.reusableConfigs.get`, `privateca.reusableConfigs.getIamPolicy`, `privateca.reusableConfigs.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### CA Service Certificate Requester (`roles/privateca.certificateRequester`)

- Request certificates from CA Service.
- Permissions (1): `privateca.certificates.create`

#### CA Service Pool Reader (`roles/privateca.poolReader`)

- Read CA Pools in CA Service.
- Permissions (1): `privateca.caPools.get`

#### CA Service Certificate Template User (`roles/privateca.templateUser`)

- Read, list and use certificate templates.
- Permissions (3): `privateca.certificateTemplates.get`, `privateca.certificateTemplates.list`, `privateca.certificateTemplates.use`

#### CA Service Workload Certificate Requester (`roles/privateca.workloadCertificateRequester`)

- Request certificates from CA Service with caller's identity.
- Permissions (1): `privateca.certificates.createForSelf`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page on a whole project (the role entry on this page does not list the lowest-level resources where it can be granted; granting it on a narrower resource, where the role supports that, limits the scope):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/privateca.admin"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `privateca.caPools.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/privateca.admin`, `roles/privateca.editor`, `roles/privateca.caManager` |
| `privateca.caPools.createTagBinding` | `roles/admin`, `roles/owner`, `roles/privateca.admin`, `roles/resourcemanager.tagUser`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver`, `roles/privateca.caManager` |
| `privateca.caPools.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/privateca.admin`, `roles/privateca.editor`, `roles/privateca.caManager` |
| `privateca.caPools.deleteTagBinding` | `roles/admin`, `roles/owner`, `roles/privateca.admin`, `roles/resourcemanager.tagUser`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver`, `roles/privateca.caManager` |
| `privateca.caPools.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/privateca.admin`, `roles/privateca.editor`, `roles/privateca.viewer`, `roles/iam.supportUser`, `roles/privateca.auditor`, `roles/privateca.caManager`, `roles/privateca.certificateManager`, `roles/privateca.poolReader` (+1 service agent role) |
| `privateca.caPools.getIamPolicy` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/privateca.admin`, `roles/privateca.editor`, `roles/privateca.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/privateca.auditor`, `roles/privateca.caManager`, `roles/privateca.certificateManager` |
| `privateca.caPools.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/privateca.admin`, `roles/privateca.editor`, `roles/privateca.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/privateca.auditor`, `roles/privateca.caManager`, `roles/privateca.certificateManager`, `roles/wiz.cloudInventoryViewer` |
| `privateca.caPools.listEffectiveTags` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/privateca.admin`, `roles/privateca.editor`, `roles/privateca.viewer`, `roles/resourcemanager.tagUser`, `roles/resourcemanager.tagViewer`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/privateca.caManager`, `roles/privateca.certificateManager` |
| `privateca.caPools.listTagBindings` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/privateca.admin`, `roles/privateca.editor`, `roles/privateca.viewer`, `roles/resourcemanager.tagUser`, `roles/resourcemanager.tagViewer`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/privateca.caManager`, `roles/privateca.certificateManager` |
| `privateca.caPools.setIamPolicy` | `roles/admin`, `roles/owner`, `roles/iam.securityAdmin`, `roles/privateca.admin` |
| `privateca.caPools.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/privateca.admin`, `roles/privateca.editor`, `roles/privateca.caManager` |
| `privateca.caPools.use` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/privateca.admin`, `roles/privateca.editor` |
| `privateca.certificateAuthorities.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/privateca.admin`, `roles/privateca.editor`, `roles/privateca.caManager` |
| `privateca.certificateAuthorities.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/privateca.admin`, `roles/privateca.editor`, `roles/privateca.caManager` |
| `privateca.certificateAuthorities.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/privateca.admin`, `roles/privateca.editor`, `roles/privateca.viewer`, `roles/iam.supportUser`, `roles/privateca.auditor`, `roles/privateca.caManager`, `roles/privateca.certificateManager` |
| `privateca.certificateAuthorities.getIamPolicy` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/privateca.admin`, `roles/privateca.editor`, `roles/privateca.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/privateca.auditor`, `roles/privateca.caManager`, `roles/privateca.certificateManager` |
| `privateca.certificateAuthorities.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/privateca.admin`, `roles/privateca.editor`, `roles/privateca.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/privateca.auditor`, `roles/privateca.caManager`, `roles/privateca.certificateManager`, `roles/wiz.cloudInventoryViewer` |
| `privateca.certificateAuthorities.setIamPolicy` | `roles/admin`, `roles/owner`, `roles/iam.securityAdmin`, `roles/privateca.admin` |
| `privateca.certificateAuthorities.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/privateca.admin`, `roles/privateca.editor`, `roles/privateca.caManager` |
| `privateca.certificateRevocationLists.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/privateca.admin`, `roles/privateca.editor` |
| `privateca.certificateRevocationLists.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/privateca.admin`, `roles/privateca.editor`, `roles/privateca.viewer`, `roles/iam.supportUser`, `roles/privateca.auditor`, `roles/privateca.caManager`, `roles/privateca.certificateManager` |
| `privateca.certificateRevocationLists.getIamPolicy` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/privateca.admin`, `roles/privateca.editor`, `roles/privateca.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/privateca.auditor`, `roles/privateca.caManager`, `roles/privateca.certificateManager` |
| `privateca.certificateRevocationLists.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/privateca.admin`, `roles/privateca.editor`, `roles/privateca.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/privateca.auditor`, `roles/privateca.caManager`, `roles/privateca.certificateManager`, `roles/wiz.cloudInventoryViewer` |
| `privateca.certificateRevocationLists.setIamPolicy` | `roles/admin`, `roles/owner`, `roles/iam.securityAdmin`, `roles/privateca.admin` |
| `privateca.certificateRevocationLists.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/privateca.admin`, `roles/privateca.editor`, `roles/privateca.caManager` |
| `privateca.certificateTemplates.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/privateca.admin`, `roles/privateca.editor`, `roles/privateca.caManager` |
| `privateca.certificateTemplates.createTagBinding` | `roles/admin`, `roles/owner`, `roles/privateca.admin`, `roles/resourcemanager.tagUser`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver`, `roles/privateca.caManager` |
| `privateca.certificateTemplates.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/privateca.admin`, `roles/privateca.editor`, `roles/privateca.caManager` |
| `privateca.certificateTemplates.deleteTagBinding` | `roles/admin`, `roles/owner`, `roles/privateca.admin`, `roles/resourcemanager.tagUser`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver`, `roles/privateca.caManager` |
| `privateca.certificateTemplates.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/privateca.admin`, `roles/privateca.editor`, `roles/privateca.viewer`, `roles/iam.supportUser`, `roles/privateca.auditor`, `roles/privateca.caManager`, `roles/privateca.certificateManager`, `roles/privateca.templateUser` |
| `privateca.certificateTemplates.getIamPolicy` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/privateca.admin`, `roles/privateca.editor`, `roles/privateca.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/privateca.auditor`, `roles/privateca.caManager`, `roles/privateca.certificateManager` |
| `privateca.certificateTemplates.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/privateca.admin`, `roles/privateca.editor`, `roles/privateca.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/privateca.auditor`, `roles/privateca.caManager`, `roles/privateca.certificateManager`, `roles/privateca.templateUser`, `roles/wiz.cloudInventoryViewer` |
| `privateca.certificateTemplates.listEffectiveTags` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/privateca.admin`, `roles/privateca.editor`, `roles/privateca.viewer`, `roles/resourcemanager.tagUser`, `roles/resourcemanager.tagViewer`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/privateca.caManager`, `roles/privateca.certificateManager` |
| `privateca.certificateTemplates.listTagBindings` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/privateca.admin`, `roles/privateca.editor`, `roles/privateca.viewer`, `roles/resourcemanager.tagUser`, `roles/resourcemanager.tagViewer`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/privateca.caManager`, `roles/privateca.certificateManager` |
| `privateca.certificateTemplates.setIamPolicy` | `roles/admin`, `roles/owner`, `roles/iam.securityAdmin`, `roles/privateca.admin` |
| `privateca.certificateTemplates.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/privateca.admin`, `roles/privateca.editor`, `roles/privateca.caManager` |
| `privateca.certificateTemplates.use` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/privateca.admin`, `roles/privateca.editor`, `roles/privateca.viewer`, `roles/iam.supportUser`, `roles/privateca.templateUser` |
| `privateca.certificates.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/privateca.admin`, `roles/privateca.editor`, `roles/privateca.certificateManager`, `roles/privateca.certificateRequester` |
| `privateca.certificates.createForSelf` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/privateca.admin`, `roles/privateca.editor`, `roles/privateca.workloadCertificateRequester` |
| `privateca.certificates.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/privateca.admin`, `roles/privateca.editor`, `roles/privateca.viewer`, `roles/iam.supportUser`, `roles/privateca.auditor`, `roles/privateca.caManager`, `roles/privateca.certificateManager` |
| `privateca.certificates.getIamPolicy` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/privateca.admin`, `roles/privateca.editor`, `roles/privateca.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/privateca.auditor`, `roles/privateca.caManager`, `roles/privateca.certificateManager` |
| `privateca.certificates.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/privateca.admin`, `roles/privateca.editor`, `roles/privateca.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/privateca.auditor`, `roles/privateca.caManager`, `roles/privateca.certificateManager`, `roles/wiz.cloudInventoryViewer` (+2 service agent roles) |
| `privateca.certificates.setIamPolicy` | `roles/admin`, `roles/owner`, `roles/iam.securityAdmin`, `roles/privateca.admin` |
| `privateca.certificates.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/privateca.admin`, `roles/privateca.editor`, `roles/privateca.caManager` |
| `privateca.locations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/privateca.admin`, `roles/privateca.editor`, `roles/privateca.viewer`, `roles/iam.supportUser`, `roles/privateca.auditor`, `roles/privateca.caManager`, `roles/privateca.certificateManager` |
| `privateca.locations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/privateca.admin`, `roles/privateca.editor`, `roles/privateca.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/privateca.auditor`, `roles/privateca.caManager`, `roles/privateca.certificateManager`, `roles/wiz.cloudInventoryViewer` |
| `privateca.operations.cancel` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/privateca.admin`, `roles/privateca.editor` |
| `privateca.operations.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/privateca.admin`, `roles/privateca.editor` |
| `privateca.operations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/privateca.admin`, `roles/privateca.editor`, `roles/privateca.viewer`, `roles/iam.supportUser`, `roles/privateca.auditor`, `roles/privateca.caManager`, `roles/privateca.certificateManager` |
| `privateca.operations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/privateca.admin`, `roles/privateca.editor`, `roles/privateca.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/privateca.auditor`, `roles/privateca.caManager`, `roles/privateca.certificateManager` |
| `privateca.reusableConfigs.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/privateca.admin`, `roles/privateca.editor`, `roles/privateca.caManager` |
| `privateca.reusableConfigs.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/privateca.admin`, `roles/privateca.editor`, `roles/privateca.caManager` |
| `privateca.reusableConfigs.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/privateca.admin`, `roles/privateca.editor`, `roles/privateca.viewer`, `roles/iam.supportUser`, `roles/privateca.auditor`, `roles/privateca.caManager`, `roles/privateca.certificateManager` |
| `privateca.reusableConfigs.getIamPolicy` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/privateca.admin`, `roles/privateca.editor`, `roles/privateca.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/privateca.auditor`, `roles/privateca.caManager`, `roles/privateca.certificateManager` |
| `privateca.reusableConfigs.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/privateca.admin`, `roles/privateca.editor`, `roles/privateca.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/privateca.auditor`, `roles/privateca.caManager`, `roles/privateca.certificateManager` |
| `privateca.reusableConfigs.setIamPolicy` | `roles/admin`, `roles/owner`, `roles/iam.securityAdmin`, `roles/privateca.admin` |
| `privateca.reusableConfigs.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/privateca.admin`, `roles/privateca.editor`, `roles/privateca.caManager` |

## Notes

- Roles and permissions of the `privateca` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/privateca (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
