---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/iam
---

# Identity and Access Management IAM roles and permissions (part 4/4)

## Signature / Usage

Predefined roles of `iam` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

### Service Account Admin (`roles/iam.serviceAccountAdmin`)

- Create and manage service accounts. Lowest-level resources where you can grant this role: - Service Account
- Permissions (19): `iam.serviceAccountApiKeyBindings.create`, `iam.serviceAccountApiKeyBindings.delete`, `iam.serviceAccountApiKeyBindings.undelete`, `iam.serviceAccounts.create`, `iam.serviceAccounts.createTagBinding`, `iam.serviceAccounts.delete`, `iam.serviceAccounts.deleteTagBinding`, `iam.serviceAccounts.disable`, `iam.serviceAccounts.enable`, `iam.serviceAccounts.get`, `iam.serviceAccounts.getIamPolicy`, `iam.serviceAccounts.list`, `iam.serviceAccounts.listEffectiveTags`, `iam.serviceAccounts.listTagBindings`, `iam.serviceAccounts.setIamPolicy`, `iam.serviceAccounts.undelete`, `iam.serviceAccounts.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Create Service Accounts (`roles/iam.serviceAccountCreator`)

- Access to create service accounts.
- Permissions (5): `iam.serviceAccounts.create`, `iam.serviceAccounts.get`, `iam.serviceAccounts.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Service Account Key Admin (`roles/iam.serviceAccountKeyAdmin`)

- Create and manage (and rotate) service account keys. Lowest-level resources where you can grant this role: - Service Account
- Permissions (10): `iam.serviceAccountKeys.create`, `iam.serviceAccountKeys.delete`, `iam.serviceAccountKeys.disable`, `iam.serviceAccountKeys.enable`, `iam.serviceAccountKeys.get`, `iam.serviceAccountKeys.list`, `iam.serviceAccounts.get`, `iam.serviceAccounts.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Service Account Token Creator (`roles/iam.serviceAccountTokenCreator`)

- Impersonate service accounts (create OAuth2 access tokens, sign blobs or JWTs, etc). Lowest-level resources where you can grant this role: - Service Account
- Permissions (9): `iam.serviceAccounts.get`, `iam.serviceAccounts.getAccessToken`, `iam.serviceAccounts.getOpenIdToken`, `iam.serviceAccounts.implicitDelegation`, `iam.serviceAccounts.list`, `iam.serviceAccounts.signBlob`, `iam.serviceAccounts.signJwt`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Service Account User (`roles/iam.serviceAccountUser`)

- Run operations as the service account. Lowest-level resources where you can grant this role: - Service Account
- Permissions (5): `iam.serviceAccounts.actAs`, `iam.serviceAccounts.get`, `iam.serviceAccounts.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### View Service Accounts (`roles/iam.serviceAccountViewer`)

- Read access to service accounts, metadata, and keys.
- Permissions (9): `iam.serviceAccountKeys.get`, `iam.serviceAccountKeys.list`, `iam.serviceAccounts.get`, `iam.serviceAccounts.getIamPolicy`, `iam.serviceAccounts.list`, `iam.serviceAccounts.listEffectiveTags`, `iam.serviceAccounts.listTagBindings`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### IAM Viewer (`roles/iam.viewer`)

- Read-only access to all IAM resources
- Permissions (55): `iam.accesspolicies.get`, `iam.accesspolicies.list`, `iam.accesspolicies.searchPolicyBindings`, `iam.denypolicies.get`, `iam.denypolicies.list`, `iam.googleapis.com/oauthClientCredentials.get`, `iam.googleapis.com/oauthClientCredentials.list`, `iam.googleapis.com/oauthClients.get`, `iam.googleapis.com/oauthClients.list`, `iam.googleapis.com/workforcePoolProviderKeys.get`, `iam.googleapis.com/workforcePoolProviderKeys.list`, `iam.googleapis.com/workforcePoolProviderScimGroups.get`, `iam.googleapis.com/workforcePoolProviderScimGroups.list`, `iam.googleapis.com/workforcePoolProviderScimUsers.get`, `iam.googleapis.com/workforcePoolProviderScimUsers.list`, `iam.googleapis.com/workforcePoolProviders.computeUserAttributes`, `iam.googleapis.com/workforcePoolProviders.get`, `iam.googleapis.com/workforcePoolProviders.list`, `iam.googleapis.com/workforcePools.get`, `iam.googleapis.com/workforcePools.getIamPolicy`, `iam.googleapis.com/workforcePools.list`, `iam.googleapis.com/workforcePools.searchPolicyBindings`, `iam.googleapis.com/workloadIdentityPoolManagedIdentities.get`, `iam.googleapis.com/workloadIdentityPoolManagedIdentities.getAttestationRules`, `iam.googleapis.com/workloadIdentityPoolManagedIdentities.list`, `iam.googleapis.com/workloadIdentityPoolNamespaces.get`, `iam.googleapis.com/workloadIdentityPoolNamespaces.list`, `iam.googleapis.com/workloadIdentityPoolProviderKeys.get`, `iam.googleapis.com/workloadIdentityPoolProviderKeys.list`, `iam.googleapis.com/workloadIdentityPoolProviders.get`, `iam.googleapis.com/workloadIdentityPoolProviders.list`, `iam.googleapis.com/workloadIdentityPools.get`, `iam.googleapis.com/workloadIdentityPools.getAttestationRules`, `iam.googleapis.com/workloadIdentityPools.getIamPolicy`, `iam.googleapis.com/workloadIdentityPools.list`, `iam.googleapis.com/workspacePools.searchPolicyBindings`, `iam.policybindings.get`, `iam.policybindings.list`, `iam.principalaccessboundarypolicies.get`, `iam.principalaccessboundarypolicies.list`, `iam.principalaccessboundarypolicies.searchPolicyBindings`, `iam.roles.get`, `iam.roles.list`, `iam.roles.listEffectiveTags`, `iam.roles.listTagBindings`, `iam.serviceAccountKeys.get`, `iam.serviceAccountKeys.list`, `iam.serviceAccounts.get`, `iam.serviceAccounts.getIamPolicy`, `iam.serviceAccounts.list`, `iam.serviceAccounts.listEffectiveTags`, `iam.serviceAccounts.listTagBindings`, `iam.workloadIdentityPools.searchPolicyBindings`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Workload Identity User (`roles/iam.workloadIdentityUser`)

- Impersonate service accounts from federated workloads.
- Permissions (4): `iam.serviceAccounts.get`, `iam.serviceAccounts.getAccessToken`, `iam.serviceAccounts.getOpenIdToken`, `iam.serviceAccounts.list`

### Access Policy User (`roles/iam.accessPolicyUser`)

- Launch stage: Beta
- Access Policies user role, with permissions to view access policies, and to bind and unbind access policies to targets.
- Permissions (4): `iam.accesspolicies.bind`, `iam.accesspolicies.get`, `iam.accesspolicies.list`, `iam.accesspolicies.unbind`

### Access Policy Viewer (`roles/iam.accessPolicyViewer`)

- Launch stage: Beta
- Access Policy Viewer role, with permissions to read access policies and view associated policy bindings.
- Permissions (3): `iam.accesspolicies.get`, `iam.accesspolicies.list`, `iam.accesspolicies.searchPolicyBindings`

### Deny Admin (`roles/iam.denyAdmin`)

- Deny admin role, with permissions to read and modify deny policies Lowest-level resources where you can grant this role: - Organization
- Permissions (11): `cloudasset.assets.listResource`, `iam.denypolicies.create`, `iam.denypolicies.delete`, `iam.denypolicies.get`, `iam.denypolicies.list`, `iam.denypolicies.update`, `policyanalyzer.resourceAuthorizationActivities.query`, `policysimulator.accessPolicySimulationResults.list`, `policysimulator.accessPolicySimulations.create`, `policysimulator.accessPolicySimulations.get`, `policysimulator.accessPolicySimulations.list`

### Deny Reviewer (`roles/iam.denyReviewer`)

- Deny Reviewer role, with permissions to read deny policies Lowest-level resources where you can grant this role: - Organization
- Permissions (2): `iam.denypolicies.get`, `iam.denypolicies.list`

### IAM OAuth Client Admin (`roles/iam.oauthClientAdmin`)

- Full rights to create and manage OAuth clients.
- Permissions (13): `iam.googleapis.com/oauthClientCredentials.create`, `iam.googleapis.com/oauthClientCredentials.delete`, `iam.googleapis.com/oauthClientCredentials.get`, `iam.googleapis.com/oauthClientCredentials.list`, `iam.googleapis.com/oauthClientCredentials.update`, `iam.googleapis.com/oauthClients.create`, `iam.googleapis.com/oauthClients.delete`, `iam.googleapis.com/oauthClients.get`, `iam.googleapis.com/oauthClients.list`, `iam.googleapis.com/oauthClients.undelete`, `iam.googleapis.com/oauthClients.update`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### IAM OAuth Client Viewer (`roles/iam.oauthClientViewer`)

- Read access to a particular instance of an OAuth client.
- Permissions (6): `iam.googleapis.com/oauthClientCredentials.get`, `iam.googleapis.com/oauthClientCredentials.list`, `iam.googleapis.com/oauthClients.get`, `iam.googleapis.com/oauthClients.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### IAM Operation Viewer (`roles/iam.operationViewer`)

- Operation user role, with permissions to view and list operations in IAM v3
- Permissions (1): `iam.operations.get`

### Organization Role Administrator (`roles/iam.organizationRoleAdmin`)

- Provides access to administer all custom roles in the organization and the projects below it. Lowest-level resources where you can grant this role: - Organization
- Permissions (15): `iam.roles.create`, `iam.roles.createTagBinding`, `iam.roles.delete`, `iam.roles.deleteTagBinding`, `iam.roles.get`, `iam.roles.list`, `iam.roles.listEffectiveTags`, `iam.roles.listTagBindings`, `iam.roles.undelete`, `iam.roles.update`, `resourcemanager.organizations.get`, `resourcemanager.organizations.getIamPolicy`, `resourcemanager.projects.get`, `resourcemanager.projects.getIamPolicy`, `resourcemanager.projects.list`

### Organization Role Viewer (`roles/iam.organizationRoleViewer`)

- Provides read access to all custom roles in the organization and the projects below it. Lowest-level resources where you can grant this role: - Organization
- Permissions (9): `iam.roles.get`, `iam.roles.list`, `iam.roles.listEffectiveTags`, `iam.roles.listTagBindings`, `resourcemanager.organizations.get`, `resourcemanager.organizations.getIamPolicy`, `resourcemanager.projects.get`, `resourcemanager.projects.getIamPolicy`, `resourcemanager.projects.list`

### Principal Access Boundary Policy Admin (`roles/iam.principalAccessBoundaryAdmin`)

- Full management of Principal Access Boundary policies and their bindings to principal sets, including the ability to simulate policy impacts.
- Permissions (10): `cloudasset.assets.listResource`, `cloudasset.assets.searchAllResources`, `iam.principalaccessboundarypolicies.bind`, `iam.principalaccessboundarypolicies.create`, `iam.principalaccessboundarypolicies.delete`, `iam.principalaccessboundarypolicies.get`, `iam.principalaccessboundarypolicies.list`, `iam.principalaccessboundarypolicies.searchPolicyBindings`, `iam.principalaccessboundarypolicies.unbind`, `iam.principalaccessboundarypolicies.update`

### Principal Access Boundary Policy User (`roles/iam.principalAccessBoundaryUser`)

- View Principal Access Boundary policies and manage policy bindings to associate them with principal sets.
- Permissions (4): `iam.principalaccessboundarypolicies.bind`, `iam.principalaccessboundarypolicies.get`, `iam.principalaccessboundarypolicies.list`, `iam.principalaccessboundarypolicies.unbind`

### SCIM Data Syncer (`roles/iam.scimSyncer`)

- Rights to sync users and groups from external identity providers.
- Permissions (12): `iam.googleapis.com/workforcePoolProviderScimGroups.create`, `iam.googleapis.com/workforcePoolProviderScimGroups.delete`, `iam.googleapis.com/workforcePoolProviderScimGroups.get`, `iam.googleapis.com/workforcePoolProviderScimGroups.list`, `iam.googleapis.com/workforcePoolProviderScimGroups.patch`, `iam.googleapis.com/workforcePoolProviderScimGroups.put`, `iam.googleapis.com/workforcePoolProviderScimUsers.create`, `iam.googleapis.com/workforcePoolProviderScimUsers.delete`, `iam.googleapis.com/workforcePoolProviderScimUsers.get`, `iam.googleapis.com/workforcePoolProviderScimUsers.list`, `iam.googleapis.com/workforcePoolProviderScimUsers.patch`, `iam.googleapis.com/workforcePoolProviderScimUsers.put`

### Service Account API Key Binding Admin (`roles/iam.serviceAccountApiKeyBindingAdmin`)

- Create and delete service account API Key bindings
- Permissions (3): `iam.serviceAccountApiKeyBindings.create`, `iam.serviceAccountApiKeyBindings.delete`, `iam.serviceAccountApiKeyBindings.undelete`

### Delete Service Accounts (`roles/iam.serviceAccountDeleter`)

- Access to delete service accounts.
- Permissions (5): `iam.serviceAccounts.delete`, `iam.serviceAccounts.get`, `iam.serviceAccounts.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Service Account OpenID Connect Identity Token Creator (`roles/iam.serviceAccountOpenIdTokenCreator`)

- Create OpenID Connect (OIDC) identity tokens
- Permissions (1): `iam.serviceAccounts.getOpenIdToken`

### IAM Workforce Pool Admin (`roles/iam.workforcePoolAdmin`)

- Full rights to create and manage all workforce pools in the org, along with the ability to delegate permissions to other admins.
- Permissions (39): `iam.googleapis.com/workforcePoolProviderKeys.create`, `iam.googleapis.com/workforcePoolProviderKeys.delete`, `iam.googleapis.com/workforcePoolProviderKeys.get`, `iam.googleapis.com/workforcePoolProviderKeys.list`, `iam.googleapis.com/workforcePoolProviderKeys.undelete`, `iam.googleapis.com/workforcePoolProviderScimGroups.create`, `iam.googleapis.com/workforcePoolProviderScimGroups.delete`, `iam.googleapis.com/workforcePoolProviderScimGroups.get`, `iam.googleapis.com/workforcePoolProviderScimGroups.list`, `iam.googleapis.com/workforcePoolProviderScimGroups.patch`, `iam.googleapis.com/workforcePoolProviderScimGroups.put`, `iam.googleapis.com/workforcePoolProviderScimUsers.create`, `iam.googleapis.com/workforcePoolProviderScimUsers.delete`, `iam.googleapis.com/workforcePoolProviderScimUsers.get`, `iam.googleapis.com/workforcePoolProviderScimUsers.list`, `iam.googleapis.com/workforcePoolProviderScimUsers.patch`, `iam.googleapis.com/workforcePoolProviderScimUsers.put`, `iam.googleapis.com/workforcePoolProviders.computeUserAttributes`, `iam.googleapis.com/workforcePoolProviders.create`, `iam.googleapis.com/workforcePoolProviders.delete`, `iam.googleapis.com/workforcePoolProviders.get`, `iam.googleapis.com/workforcePoolProviders.list`, `iam.googleapis.com/workforcePoolProviders.undelete`, `iam.googleapis.com/workforcePoolProviders.update`, `iam.googleapis.com/workforcePoolSubjects.delete`, `iam.googleapis.com/workforcePoolSubjects.revokeSessions`, `iam.googleapis.com/workforcePoolSubjects.undelete`, `iam.googleapis.com/workforcePools.create`, `iam.googleapis.com/workforcePools.createPolicyBinding`, `iam.googleapis.com/workforcePools.delete`, `iam.googleapis.com/workforcePools.deletePolicyBinding`, `iam.googleapis.com/workforcePools.get`, `iam.googleapis.com/workforcePools.getIamPolicy`, `iam.googleapis.com/workforcePools.list`, `iam.googleapis.com/workforcePools.searchPolicyBindings`, `iam.googleapis.com/workforcePools.setIamPolicy`, `iam.googleapis.com/workforcePools.undelete`, `iam.googleapis.com/workforcePools.update`, `iam.googleapis.com/workforcePools.updatePolicyBinding`

### IAM Workforce Pool Editor (`roles/iam.workforcePoolEditor`)

- Gives permission to edit workforce pools. Lowest-level resources where you can grant this role: - Workforce pool
- Permissions (12): `iam.googleapis.com/workforcePoolProviderKeys.get`, `iam.googleapis.com/workforcePoolProviderKeys.list`, `iam.googleapis.com/workforcePools.get`, `iam.googleapis.com/workforcePools.list`, `iam.googleapis.com/workforcePools.update`, `iam.googleapis.com/workforcePoolProviders.computeUserAttributes`, `iam.googleapis.com/workforcePoolProviders.create`, `iam.googleapis.com/workforcePoolProviders.delete`, `iam.googleapis.com/workforcePoolProviders.get`, `iam.googleapis.com/workforcePoolProviders.list`, `iam.googleapis.com/workforcePoolProviders.undelete`, `iam.googleapis.com/workforcePoolProviders.update`

### IAM Workforce Pool Viewer (`roles/iam.workforcePoolViewer`)

- Rights to read workforce pool.
- Permissions (7): `iam.googleapis.com/workforcePoolProviderKeys.get`, `iam.googleapis.com/workforcePoolProviderKeys.list`, `iam.googleapis.com/workforcePoolProviders.computeUserAttributes`, `iam.googleapis.com/workforcePoolProviders.get`, `iam.googleapis.com/workforcePoolProviders.list`, `iam.googleapis.com/workforcePools.get`, `iam.googleapis.com/workforcePools.list`

### IAM Workload Identity Pool Admin (`roles/iam.workloadIdentityPoolAdmin`)

- Launch stage: Beta
- Full rights to create and manage workload identity pools.
- Permissions (41): `iam.googleapis.com/workloadIdentityPoolManagedIdentities.create`, `iam.googleapis.com/workloadIdentityPoolManagedIdentities.delete`, `iam.googleapis.com/workloadIdentityPoolManagedIdentities.get`, `iam.googleapis.com/workloadIdentityPoolManagedIdentities.getAttestationRules`, `iam.googleapis.com/workloadIdentityPoolManagedIdentities.list`, `iam.googleapis.com/workloadIdentityPoolManagedIdentities.setAttestationRules`, `iam.googleapis.com/workloadIdentityPoolManagedIdentities.undelete`, `iam.googleapis.com/workloadIdentityPoolManagedIdentities.update`, `iam.googleapis.com/workloadIdentityPoolNamespaces.create`, `iam.googleapis.com/workloadIdentityPoolNamespaces.delete`, `iam.googleapis.com/workloadIdentityPoolNamespaces.get`, `iam.googleapis.com/workloadIdentityPoolNamespaces.list`, `iam.googleapis.com/workloadIdentityPoolNamespaces.undelete`, `iam.googleapis.com/workloadIdentityPoolNamespaces.update`, `iam.googleapis.com/workloadIdentityPoolProviderKeys.create`, `iam.googleapis.com/workloadIdentityPoolProviderKeys.delete`, `iam.googleapis.com/workloadIdentityPoolProviderKeys.get`, `iam.googleapis.com/workloadIdentityPoolProviderKeys.list`, `iam.googleapis.com/workloadIdentityPoolProviderKeys.undelete`, `iam.googleapis.com/workloadIdentityPoolProviders.create`, `iam.googleapis.com/workloadIdentityPoolProviders.delete`, `iam.googleapis.com/workloadIdentityPoolProviders.get`, `iam.googleapis.com/workloadIdentityPoolProviders.list`, `iam.googleapis.com/workloadIdentityPoolProviders.undelete`, `iam.googleapis.com/workloadIdentityPoolProviders.update`, `iam.googleapis.com/workloadIdentityPools.create`, `iam.googleapis.com/workloadIdentityPools.delete`, `iam.googleapis.com/workloadIdentityPools.get`, `iam.googleapis.com/workloadIdentityPools.getAttestationRules`, `iam.googleapis.com/workloadIdentityPools.getIamPolicy`, `iam.googleapis.com/workloadIdentityPools.list`, `iam.googleapis.com/workloadIdentityPools.setAttestationRules`, `iam.googleapis.com/workloadIdentityPools.setIamPolicy`, `iam.googleapis.com/workloadIdentityPools.undelete`, `iam.googleapis.com/workloadIdentityPools.update`, `iam.workloadIdentityPools.createPolicyBinding`, `iam.workloadIdentityPools.deletePolicyBinding`, `iam.workloadIdentityPools.searchPolicyBindings`, `iam.workloadIdentityPools.updatePolicyBinding`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### IAM Workload Identity Pool Viewer (`roles/iam.workloadIdentityPoolViewer`)

- Launch stage: Beta
- Read access to workload identity pools.
- Permissions (15): `iam.googleapis.com/workloadIdentityPoolManagedIdentities.get`, `iam.googleapis.com/workloadIdentityPoolManagedIdentities.getAttestationRules`, `iam.googleapis.com/workloadIdentityPoolManagedIdentities.list`, `iam.googleapis.com/workloadIdentityPoolNamespaces.get`, `iam.googleapis.com/workloadIdentityPoolNamespaces.list`, `iam.googleapis.com/workloadIdentityPoolProviderKeys.get`, `iam.googleapis.com/workloadIdentityPoolProviderKeys.list`, `iam.googleapis.com/workloadIdentityPoolProviders.get`, `iam.googleapis.com/workloadIdentityPoolProviders.list`, `iam.googleapis.com/workloadIdentityPools.get`, `iam.googleapis.com/workloadIdentityPools.getAttestationRules`, `iam.googleapis.com/workloadIdentityPools.getIamPolicy`, `iam.googleapis.com/workloadIdentityPools.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

### Workspace Pool IAM Admin (`roles/iam.workspacePoolAdmin`)

- IAM workspace pool admin able to bind IAM policies to Dasher accounts.
- Permissions (4): `iam.googleapis.com/workspacePools.createPolicyBinding`, `iam.googleapis.com/workspacePools.deletePolicyBinding`, `iam.googleapis.com/workspacePools.searchPolicyBindings`, `iam.googleapis.com/workspacePools.updatePolicyBinding`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page at its lowest-level resource (Service Account):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/iam.serviceAccountAdmin"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `iam.accesspolicies.bind` | `roles/admin`, `roles/owner`, `roles/iam.accessPolicyAdmin`, `roles/iam.admin`, `roles/iam.accessPolicyUser` |
| `iam.accesspolicies.create` | `roles/admin`, `roles/owner`, `roles/iam.accessPolicyAdmin`, `roles/iam.admin` |
| `iam.accesspolicies.delete` | `roles/admin`, `roles/owner`, `roles/iam.accessPolicyAdmin`, `roles/iam.admin` |
| `iam.accesspolicies.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.accessPolicyAdmin`, `roles/iam.admin`, `roles/iam.editor`, `roles/iam.viewer`, `roles/iam.accessPolicyUser`, `roles/iam.accessPolicyViewer`, `roles/iam.supportUser` |
| `iam.accesspolicies.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.accessPolicyAdmin`, `roles/iam.admin`, `roles/iam.editor`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.viewer`, `roles/iam.accessPolicyUser`, `roles/iam.accessPolicyViewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `iam.accesspolicies.searchPolicyBindings` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.accessPolicyAdmin`, `roles/iam.admin`, `roles/iam.editor`, `roles/iam.viewer`, `roles/iam.accessPolicyViewer`, `roles/iam.supportUser` |
| `iam.accesspolicies.unbind` | `roles/admin`, `roles/owner`, `roles/iam.accessPolicyAdmin`, `roles/iam.admin`, `roles/iam.accessPolicyUser` |
| `iam.accesspolicies.update` | `roles/admin`, `roles/owner`, `roles/iam.accessPolicyAdmin`, `roles/iam.admin` |
| `iam.denypolicies.create` | `roles/iam.denyAdmin` |
| `iam.denypolicies.delete` | `roles/iam.denyAdmin` |
| `iam.denypolicies.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.admin`, `roles/iam.editor`, `roles/iam.viewer`, `roles/iam.denyAdmin`, `roles/iam.denyReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` (+2 service agent roles) |
| `iam.denypolicies.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.admin`, `roles/iam.editor`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.viewer`, `roles/iam.denyAdmin`, `roles/iam.denyReviewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` (+2 service agent roles) |
| `iam.denypolicies.update` | `roles/iam.denyAdmin` |
| `iam.googleapis.com/oauthClientCredentials.create` | `roles/admin`, `roles/owner`, `roles/iam.admin`, `roles/iam.oauthClientAdmin` |
| `iam.googleapis.com/oauthClientCredentials.delete` | `roles/admin`, `roles/owner`, `roles/iam.admin`, `roles/iam.oauthClientAdmin` |
| `iam.googleapis.com/oauthClientCredentials.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.admin`, `roles/iam.editor`, `roles/iam.viewer`, `roles/iam.oauthClientAdmin`, `roles/iam.oauthClientViewer`, `roles/iam.supportUser` |
| `iam.googleapis.com/oauthClientCredentials.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.admin`, `roles/iam.editor`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.viewer`, `roles/iam.oauthClientAdmin`, `roles/iam.oauthClientViewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `iam.googleapis.com/oauthClientCredentials.update` | `roles/admin`, `roles/owner`, `roles/iam.admin`, `roles/iam.oauthClientAdmin` |
| `iam.googleapis.com/oauthClients.create` | `roles/admin`, `roles/owner`, `roles/iam.admin`, `roles/iam.oauthClientAdmin` |
| `iam.googleapis.com/oauthClients.delete` | `roles/admin`, `roles/owner`, `roles/iam.admin`, `roles/iam.oauthClientAdmin` |
| `iam.googleapis.com/oauthClients.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.admin`, `roles/iam.editor`, `roles/iam.viewer`, `roles/iam.oauthClientAdmin`, `roles/iam.oauthClientViewer`, `roles/iam.supportUser` |
| `iam.googleapis.com/oauthClients.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.admin`, `roles/iam.editor`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.viewer`, `roles/iam.oauthClientAdmin`, `roles/iam.oauthClientViewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `iam.googleapis.com/oauthClients.undelete` | `roles/admin`, `roles/owner`, `roles/iam.admin`, `roles/iam.oauthClientAdmin` |
| `iam.googleapis.com/oauthClients.update` | `roles/admin`, `roles/owner`, `roles/iam.admin`, `roles/iam.oauthClientAdmin` |
| `iam.googleapis.com/workforcePoolProviderKeys.create` | `roles/admin`, `roles/owner`, `roles/iam.admin`, `roles/iam.workforcePoolAdmin` |
| `iam.googleapis.com/workforcePoolProviderKeys.delete` | `roles/admin`, `roles/owner`, `roles/iam.admin`, `roles/iam.workforcePoolAdmin` |
| `iam.googleapis.com/workforcePoolProviderKeys.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.admin`, `roles/iam.editor`, `roles/iam.viewer`, `roles/iam.supportUser`, `roles/iam.workforcePoolAdmin`, `roles/iam.workforcePoolEditor`, `roles/iam.workforcePoolViewer` |
| `iam.googleapis.com/workforcePoolProviderKeys.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.admin`, `roles/iam.editor`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/iam.workforcePoolAdmin`, `roles/iam.workforcePoolEditor`, `roles/iam.workforcePoolViewer` |
| `iam.googleapis.com/workforcePoolProviderKeys.undelete` | `roles/admin`, `roles/owner`, `roles/iam.admin`, `roles/iam.workforcePoolAdmin` |
| `iam.googleapis.com/workforcePoolProviderScimGroups.create` | `roles/admin`, `roles/owner`, `roles/iam.admin`, `roles/iam.scimSyncer`, `roles/iam.workforcePoolAdmin` |
| `iam.googleapis.com/workforcePoolProviderScimGroups.delete` | `roles/admin`, `roles/owner`, `roles/iam.admin`, `roles/iam.scimSyncer`, `roles/iam.workforcePoolAdmin` |
| `iam.googleapis.com/workforcePoolProviderScimGroups.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.admin`, `roles/iam.editor`, `roles/iam.viewer`, `roles/iam.scimSyncer`, `roles/iam.supportUser`, `roles/iam.workforcePoolAdmin`, `roles/wiz.cloudInventoryViewer` |
| `iam.googleapis.com/workforcePoolProviderScimGroups.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.admin`, `roles/iam.editor`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.viewer`, `roles/iam.scimSyncer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/iam.workforcePoolAdmin`, `roles/wiz.cloudInventoryViewer` |
| `iam.googleapis.com/workforcePoolProviderScimGroups.patch` | `roles/admin`, `roles/owner`, `roles/iam.admin`, `roles/iam.scimSyncer`, `roles/iam.workforcePoolAdmin` |
| `iam.googleapis.com/workforcePoolProviderScimGroups.put` | `roles/admin`, `roles/owner`, `roles/iam.admin`, `roles/iam.scimSyncer`, `roles/iam.workforcePoolAdmin` |
| `iam.googleapis.com/workforcePoolProviderScimUsers.create` | `roles/admin`, `roles/owner`, `roles/iam.admin`, `roles/iam.scimSyncer`, `roles/iam.workforcePoolAdmin` |
| `iam.googleapis.com/workforcePoolProviderScimUsers.delete` | `roles/admin`, `roles/owner`, `roles/iam.admin`, `roles/iam.scimSyncer`, `roles/iam.workforcePoolAdmin` |
| `iam.googleapis.com/workforcePoolProviderScimUsers.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.admin`, `roles/iam.editor`, `roles/iam.viewer`, `roles/iam.scimSyncer`, `roles/iam.supportUser`, `roles/iam.workforcePoolAdmin`, `roles/wiz.cloudInventoryViewer` |
| `iam.googleapis.com/workforcePoolProviderScimUsers.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.admin`, `roles/iam.editor`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.viewer`, `roles/iam.scimSyncer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/iam.workforcePoolAdmin`, `roles/wiz.cloudInventoryViewer` |
| `iam.googleapis.com/workforcePoolProviderScimUsers.patch` | `roles/admin`, `roles/owner`, `roles/iam.admin`, `roles/iam.scimSyncer`, `roles/iam.workforcePoolAdmin` |
| `iam.googleapis.com/workforcePoolProviderScimUsers.put` | `roles/admin`, `roles/owner`, `roles/iam.admin`, `roles/iam.scimSyncer`, `roles/iam.workforcePoolAdmin` |
| `iam.googleapis.com/workforcePoolProviders.computeUserAttributes` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.admin`, `roles/iam.editor`, `roles/iam.viewer`, `roles/iam.supportUser`, `roles/iam.workforcePoolAdmin`, `roles/iam.workforcePoolEditor`, `roles/iam.workforcePoolViewer` |
| `iam.googleapis.com/workforcePoolProviders.create` | `roles/admin`, `roles/owner`, `roles/iam.admin`, `roles/iam.workforcePoolAdmin`, `roles/iam.workforcePoolEditor` |
| `iam.googleapis.com/workforcePoolProviders.delete` | `roles/admin`, `roles/owner`, `roles/iam.admin`, `roles/iam.workforcePoolAdmin`, `roles/iam.workforcePoolEditor` |
| `iam.googleapis.com/workforcePoolProviders.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.admin`, `roles/iam.editor`, `roles/iam.viewer`, `roles/iam.supportUser`, `roles/iam.workforcePoolAdmin`, `roles/iam.workforcePoolEditor`, `roles/iam.workforcePoolViewer` |
| `iam.googleapis.com/workforcePoolProviders.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.admin`, `roles/iam.editor`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/iam.workforcePoolAdmin`, `roles/iam.workforcePoolEditor`, `roles/iam.workforcePoolViewer`, `roles/wiz.cloudInventoryViewer` |
| `iam.googleapis.com/workforcePoolProviders.undelete` | `roles/admin`, `roles/owner`, `roles/iam.admin`, `roles/iam.workforcePoolAdmin`, `roles/iam.workforcePoolEditor` |
| `iam.googleapis.com/workforcePoolProviders.update` | `roles/admin`, `roles/owner`, `roles/iam.admin`, `roles/iam.workforcePoolAdmin`, `roles/iam.workforcePoolEditor` |
| `iam.googleapis.com/workforcePoolSubjects.delete` | `roles/admin`, `roles/owner`, `roles/iam.admin`, `roles/iam.workforcePoolAdmin` |
| `iam.googleapis.com/workforcePoolSubjects.revokeSessions` | `roles/admin`, `roles/owner`, `roles/iam.admin`, `roles/iam.workforcePoolAdmin` |
| `iam.googleapis.com/workforcePoolSubjects.undelete` | `roles/admin`, `roles/owner`, `roles/iam.admin`, `roles/iam.workforcePoolAdmin` |
| `iam.googleapis.com/workforcePools.create` | `roles/admin`, `roles/owner`, `roles/iam.admin`, `roles/iam.workforcePoolAdmin` |
| `iam.googleapis.com/workforcePools.createPolicyBinding` | `roles/admin`, `roles/owner`, `roles/iam.admin`, `roles/iam.workforcePoolAdmin` |
| `iam.googleapis.com/workforcePools.delete` | `roles/admin`, `roles/owner`, `roles/iam.admin`, `roles/iam.workforcePoolAdmin` |
| `iam.googleapis.com/workforcePools.deletePolicyBinding` | `roles/admin`, `roles/owner`, `roles/iam.admin`, `roles/iam.workforcePoolAdmin` |
| `iam.googleapis.com/workforcePools.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.admin`, `roles/iam.editor`, `roles/iam.viewer`, `roles/iam.supportUser`, `roles/iam.workforcePoolAdmin`, `roles/iam.workforcePoolEditor`, `roles/iam.workforcePoolViewer` |
| `iam.googleapis.com/workforcePools.getIamPolicy` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.admin`, `roles/iam.editor`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/iam.workforcePoolAdmin` |
| `iam.googleapis.com/workforcePools.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.admin`, `roles/iam.editor`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/iam.workforcePoolAdmin`, `roles/iam.workforcePoolEditor`, `roles/iam.workforcePoolViewer`, `roles/wiz.cloudInventoryViewer` |
| `iam.googleapis.com/workforcePools.searchPolicyBindings` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.admin`, `roles/iam.editor`, `roles/iam.viewer`, `roles/iam.supportUser`, `roles/iam.workforcePoolAdmin` |
| `iam.googleapis.com/workforcePools.setIamPolicy` | `roles/admin`, `roles/owner`, `roles/iam.admin`, `roles/iam.securityAdmin`, `roles/iam.workforcePoolAdmin` |
| `iam.googleapis.com/workforcePools.undelete` | `roles/admin`, `roles/owner`, `roles/iam.admin`, `roles/iam.workforcePoolAdmin` |
| `iam.googleapis.com/workforcePools.update` | `roles/admin`, `roles/owner`, `roles/iam.admin`, `roles/iam.workforcePoolAdmin`, `roles/iam.workforcePoolEditor` |
| `iam.googleapis.com/workforcePools.updatePolicyBinding` | `roles/admin`, `roles/owner`, `roles/iam.admin`, `roles/iam.workforcePoolAdmin` |
| `iam.googleapis.com/workloadIdentityPoolManagedIdentities.create` | `roles/admin`, `roles/owner`, `roles/iam.admin`, `roles/iam.workloadIdentityPoolAdmin` |
| `iam.googleapis.com/workloadIdentityPoolManagedIdentities.delete` | `roles/admin`, `roles/owner`, `roles/iam.admin`, `roles/iam.workloadIdentityPoolAdmin` |
| `iam.googleapis.com/workloadIdentityPoolManagedIdentities.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.admin`, `roles/iam.editor`, `roles/iam.viewer`, `roles/iam.supportUser`, `roles/iam.workloadIdentityPoolAdmin`, `roles/iam.workloadIdentityPoolViewer` |
| `iam.googleapis.com/workloadIdentityPoolManagedIdentities.getAttestationRules` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.admin`, `roles/iam.editor`, `roles/iam.viewer`, `roles/iam.supportUser`, `roles/iam.workloadIdentityPoolAdmin`, `roles/iam.workloadIdentityPoolViewer` |
| `iam.googleapis.com/workloadIdentityPoolManagedIdentities.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.admin`, `roles/iam.editor`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/iam.workloadIdentityPoolAdmin`, `roles/iam.workloadIdentityPoolViewer` |
| `iam.googleapis.com/workloadIdentityPoolManagedIdentities.setAttestationRules` | `roles/admin`, `roles/owner`, `roles/iam.admin`, `roles/iam.workloadIdentityPoolAdmin` |
| `iam.googleapis.com/workloadIdentityPoolManagedIdentities.undelete` | `roles/admin`, `roles/owner`, `roles/iam.admin`, `roles/iam.workloadIdentityPoolAdmin` |
| `iam.googleapis.com/workloadIdentityPoolManagedIdentities.update` | `roles/admin`, `roles/owner`, `roles/iam.admin`, `roles/iam.workloadIdentityPoolAdmin` |
| `iam.googleapis.com/workloadIdentityPoolNamespaces.create` | `roles/admin`, `roles/owner`, `roles/iam.admin`, `roles/iam.workloadIdentityPoolAdmin` |
| `iam.googleapis.com/workloadIdentityPoolNamespaces.delete` | `roles/admin`, `roles/owner`, `roles/iam.admin`, `roles/iam.workloadIdentityPoolAdmin` |
| `iam.googleapis.com/workloadIdentityPoolNamespaces.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.admin`, `roles/iam.editor`, `roles/iam.viewer`, `roles/iam.supportUser`, `roles/iam.workloadIdentityPoolAdmin`, `roles/iam.workloadIdentityPoolViewer` |
| `iam.googleapis.com/workloadIdentityPoolNamespaces.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.admin`, `roles/iam.editor`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/iam.workloadIdentityPoolAdmin`, `roles/iam.workloadIdentityPoolViewer` |
| `iam.googleapis.com/workloadIdentityPoolNamespaces.undelete` | `roles/admin`, `roles/owner`, `roles/iam.admin`, `roles/iam.workloadIdentityPoolAdmin` |
| `iam.googleapis.com/workloadIdentityPoolNamespaces.update` | `roles/admin`, `roles/owner`, `roles/iam.admin`, `roles/iam.workloadIdentityPoolAdmin` |
| `iam.googleapis.com/workloadIdentityPoolProviderKeys.create` | `roles/admin`, `roles/owner`, `roles/iam.admin`, `roles/iam.workloadIdentityPoolAdmin` |
| `iam.googleapis.com/workloadIdentityPoolProviderKeys.delete` | `roles/admin`, `roles/owner`, `roles/iam.admin`, `roles/iam.workloadIdentityPoolAdmin` |
| `iam.googleapis.com/workloadIdentityPoolProviderKeys.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.admin`, `roles/iam.editor`, `roles/iam.viewer`, `roles/iam.supportUser`, `roles/iam.workloadIdentityPoolAdmin`, `roles/iam.workloadIdentityPoolViewer` |
| `iam.googleapis.com/workloadIdentityPoolProviderKeys.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.admin`, `roles/iam.editor`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/iam.workloadIdentityPoolAdmin`, `roles/iam.workloadIdentityPoolViewer`, `roles/wiz.cloudInventoryViewer` |
| `iam.googleapis.com/workloadIdentityPoolProviderKeys.undelete` | `roles/admin`, `roles/owner`, `roles/iam.admin`, `roles/iam.workloadIdentityPoolAdmin` |
| `iam.googleapis.com/workloadIdentityPoolProviders.create` | `roles/admin`, `roles/owner`, `roles/iam.admin`, `roles/iam.workloadIdentityPoolAdmin` |
| `iam.googleapis.com/workloadIdentityPoolProviders.delete` | `roles/admin`, `roles/owner`, `roles/iam.admin`, `roles/iam.workloadIdentityPoolAdmin` |
| `iam.googleapis.com/workloadIdentityPoolProviders.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.admin`, `roles/iam.editor`, `roles/iam.viewer`, `roles/iam.supportUser`, `roles/iam.workloadIdentityPoolAdmin`, `roles/iam.workloadIdentityPoolViewer` |
| `iam.googleapis.com/workloadIdentityPoolProviders.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.admin`, `roles/iam.editor`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/iam.workloadIdentityPoolAdmin`, `roles/iam.workloadIdentityPoolViewer`, `roles/wiz.cloudInventoryViewer` (+2 service agent roles) |
| `iam.googleapis.com/workloadIdentityPoolProviders.undelete` | `roles/admin`, `roles/owner`, `roles/iam.admin`, `roles/iam.workloadIdentityPoolAdmin` |
| `iam.googleapis.com/workloadIdentityPoolProviders.update` | `roles/admin`, `roles/owner`, `roles/iam.admin`, `roles/iam.workloadIdentityPoolAdmin` |
| `iam.googleapis.com/workloadIdentityPools.create` | `roles/admin`, `roles/owner`, `roles/iam.admin`, `roles/iam.workloadIdentityPoolAdmin` |
| `iam.googleapis.com/workloadIdentityPools.delete` | `roles/admin`, `roles/owner`, `roles/iam.admin`, `roles/iam.workloadIdentityPoolAdmin` |
| `iam.googleapis.com/workloadIdentityPools.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.admin`, `roles/iam.editor`, `roles/iam.viewer`, `roles/iam.supportUser`, `roles/iam.workloadIdentityPoolAdmin`, `roles/iam.workloadIdentityPoolViewer` (+1 service agent role) |
| `iam.googleapis.com/workloadIdentityPools.getAttestationRules` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.admin`, `roles/iam.editor`, `roles/iam.viewer`, `roles/iam.supportUser`, `roles/iam.workloadIdentityPoolAdmin`, `roles/iam.workloadIdentityPoolViewer` |
| `iam.googleapis.com/workloadIdentityPools.getIamPolicy` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.admin`, `roles/iam.editor`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/iam.workloadIdentityPoolAdmin`, `roles/iam.workloadIdentityPoolViewer` |
| `iam.googleapis.com/workloadIdentityPools.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.admin`, `roles/iam.editor`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/iam.workloadIdentityPoolAdmin`, `roles/iam.workloadIdentityPoolViewer`, `roles/wiz.cloudInventoryViewer` (+2 service agent roles) |
| `iam.googleapis.com/workloadIdentityPools.setAttestationRules` | `roles/admin`, `roles/owner`, `roles/iam.admin`, `roles/iam.workloadIdentityPoolAdmin` |
| `iam.googleapis.com/workloadIdentityPools.setIamPolicy` | `roles/admin`, `roles/owner`, `roles/iam.admin`, `roles/iam.securityAdmin`, `roles/iam.workloadIdentityPoolAdmin` |
| `iam.googleapis.com/workloadIdentityPools.undelete` | `roles/admin`, `roles/owner`, `roles/iam.admin`, `roles/iam.workloadIdentityPoolAdmin` |
| `iam.googleapis.com/workloadIdentityPools.update` | `roles/admin`, `roles/owner`, `roles/iam.admin`, `roles/iam.workloadIdentityPoolAdmin` |
| `iam.googleapis.com/workspacePools.createPolicyBinding` | `roles/admin`, `roles/owner`, `roles/iam.admin`, `roles/iam.workspacePoolAdmin` |
| `iam.googleapis.com/workspacePools.deletePolicyBinding` | `roles/admin`, `roles/owner`, `roles/iam.admin`, `roles/iam.workspacePoolAdmin` |
| `iam.googleapis.com/workspacePools.searchPolicyBindings` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.admin`, `roles/iam.editor`, `roles/iam.viewer`, `roles/iam.supportUser`, `roles/iam.workspacePoolAdmin` |
| `iam.googleapis.com/workspacePools.updatePolicyBinding` | `roles/admin`, `roles/owner`, `roles/iam.admin`, `roles/iam.workspacePoolAdmin` |
| `iam.operations.get` | `roles/admin`, `roles/owner`, `roles/iam.admin`, `roles/iam.operationViewer` |
| `iam.policybindings.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.admin`, `roles/iam.editor`, `roles/iam.viewer`, `roles/resourcemanager.folderAdmin`, `roles/resourcemanager.organizationAdmin`, `roles/resourcemanager.projectIamAdmin`, `roles/iam.supportUser`, `roles/resourcemanager.folderIamAdmin` |
| `iam.policybindings.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.admin`, `roles/iam.editor`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.viewer`, `roles/resourcemanager.folderAdmin`, `roles/resourcemanager.organizationAdmin`, `roles/resourcemanager.projectIamAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/resourcemanager.folderIamAdmin` |
| `iam.principalaccessboundarypolicies.bind` | `roles/iam.principalAccessBoundaryAdmin`, `roles/iam.principalAccessBoundaryUser` |
| `iam.principalaccessboundarypolicies.create` | `roles/iam.principalAccessBoundaryAdmin` |
| `iam.principalaccessboundarypolicies.delete` | `roles/iam.principalAccessBoundaryAdmin` |
| `iam.principalaccessboundarypolicies.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.admin`, `roles/iam.editor`, `roles/iam.principalAccessBoundaryViewer`, `roles/iam.viewer`, `roles/iam.principalAccessBoundaryAdmin`, `roles/iam.principalAccessBoundaryUser`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `iam.principalaccessboundarypolicies.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.admin`, `roles/iam.editor`, `roles/iam.principalAccessBoundaryViewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.viewer`, `roles/iam.principalAccessBoundaryAdmin`, `roles/iam.principalAccessBoundaryUser`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `iam.principalaccessboundarypolicies.searchPolicyBindings` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.admin`, `roles/iam.editor`, `roles/iam.principalAccessBoundaryViewer`, `roles/iam.viewer`, `roles/iam.principalAccessBoundaryAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `iam.principalaccessboundarypolicies.unbind` | `roles/iam.principalAccessBoundaryAdmin`, `roles/iam.principalAccessBoundaryUser` |
| `iam.principalaccessboundarypolicies.update` | `roles/iam.principalAccessBoundaryAdmin` |
| `iam.roles.create` | `roles/admin`, `roles/owner`, `roles/iam.admin`, `roles/iam.roleAdmin`, `roles/iam.organizationRoleAdmin` (+1 service agent role) |
| `iam.roles.createTagBinding` | `roles/admin`, `roles/owner`, `roles/iam.admin`, `roles/iam.roleAdmin`, `roles/resourcemanager.tagUser`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver`, `roles/iam.organizationRoleAdmin` |
| `iam.roles.delete` | `roles/admin`, `roles/owner`, `roles/iam.admin`, `roles/iam.roleAdmin`, `roles/iam.organizationRoleAdmin` (+1 service agent role) |
| `iam.roles.deleteTagBinding` | `roles/admin`, `roles/owner`, `roles/iam.admin`, `roles/iam.roleAdmin`, `roles/resourcemanager.tagUser`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver`, `roles/iam.organizationRoleAdmin` |
| `iam.roles.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.admin`, `roles/iam.editor`, `roles/iam.roleAdmin`, `roles/iam.roleViewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.viewer`, `roles/accesscontextmanager.vpcScTroubleshooterViewer`, `roles/artifactregistry.containerRegistryMigrationAdmin`, `roles/iam.databasesAdmin`, `roles/iam.organizationRoleAdmin`, `roles/iam.organizationRoleViewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/wiz.cloudInventoryViewer` (+6 service agent roles) |
| `iam.roles.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.admin`, `roles/iam.editor`, `roles/iam.roleAdmin`, `roles/iam.roleViewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.viewer`, `roles/iam.databasesAdmin`, `roles/iam.organizationRoleAdmin`, `roles/iam.organizationRoleViewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/wiz.cloudInventoryViewer` (+1 service agent role) |
| `iam.roles.listEffectiveTags` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.admin`, `roles/iam.editor`, `roles/iam.roleAdmin`, `roles/iam.roleViewer`, `roles/iam.viewer`, `roles/resourcemanager.tagUser`, `roles/resourcemanager.tagViewer`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver`, `roles/iam.databasesAdmin`, `roles/iam.organizationRoleAdmin`, `roles/iam.organizationRoleViewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `iam.roles.listTagBindings` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.admin`, `roles/iam.editor`, `roles/iam.roleAdmin`, `roles/iam.roleViewer`, `roles/iam.viewer`, `roles/resourcemanager.tagUser`, `roles/resourcemanager.tagViewer`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver`, `roles/iam.databasesAdmin`, `roles/iam.organizationRoleAdmin`, `roles/iam.organizationRoleViewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `iam.roles.undelete` | `roles/admin`, `roles/owner`, `roles/iam.admin`, `roles/iam.roleAdmin`, `roles/iam.organizationRoleAdmin` |
| `iam.roles.update` | `roles/admin`, `roles/owner`, `roles/iam.admin`, `roles/iam.roleAdmin`, `roles/iam.organizationRoleAdmin` (+1 service agent role) |
| `iam.serviceAccountApiKeyBindings.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/iam.admin`, `roles/iam.editor`, `roles/iam.serviceAccountAdmin`, `roles/iam.devOps`, `roles/iam.serviceAccountApiKeyBindingAdmin` |
| `iam.serviceAccountApiKeyBindings.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/iam.admin`, `roles/iam.editor`, `roles/iam.serviceAccountAdmin`, `roles/iam.devOps`, `roles/iam.serviceAccountApiKeyBindingAdmin` |
| `iam.serviceAccountApiKeyBindings.undelete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/iam.admin`, `roles/iam.editor`, `roles/iam.serviceAccountAdmin`, `roles/iam.devOps`, `roles/iam.serviceAccountApiKeyBindingAdmin` |
| `iam.serviceAccountKeys.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/assuredoss.admin`, `roles/iam.admin`, `roles/iam.editor`, `roles/iam.serviceAccountKeyAdmin`, `roles/securitycenter.admin` |
| `iam.serviceAccountKeys.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/iam.admin`, `roles/iam.editor`, `roles/iam.serviceAccountKeyAdmin` (+1 service agent role) |
| `iam.serviceAccountKeys.disable` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/iam.admin`, `roles/iam.editor`, `roles/iam.serviceAccountKeyAdmin` |
| `iam.serviceAccountKeys.enable` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/iam.admin`, `roles/iam.editor`, `roles/iam.serviceAccountKeyAdmin` |
| `iam.serviceAccountKeys.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.admin`, `roles/iam.editor`, `roles/iam.serviceAccountKeyAdmin`, `roles/iam.serviceAccountViewer`, `roles/iam.viewer`, `roles/iam.supportUser` (+1 service agent role) |
| `iam.serviceAccountKeys.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.admin`, `roles/iam.editor`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.serviceAccountKeyAdmin`, `roles/iam.serviceAccountViewer`, `roles/iam.viewer`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/wiz.cloudInventoryViewer` (+2 service agent roles) |
| `iam.serviceAccounts.actAs` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/iam.admin`, `roles/iam.editor`, `roles/iam.serviceAccountUser`, `roles/backupdr.computeEngineOperator`, `roles/dataproc.hubAgent`, `roles/iam.dataScientist`, `roles/iam.databasesAdmin`, `roles/iam.devOps` (+36 service agent roles) |
| `iam.serviceAccounts.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/assuredoss.admin`, `roles/iam.admin`, `roles/iam.editor`, `roles/iam.serviceAccountAdmin`, `roles/iam.serviceAccountCreator`, `roles/securitycenter.admin`, `roles/assuredoss.projectAdmin`, `roles/earthengine.appsPublisher`, `roles/iam.devOps` (+3 service agent roles) |
| `iam.serviceAccounts.createTagBinding` | `roles/admin`, `roles/owner`, `roles/iam.admin`, `roles/iam.serviceAccountAdmin`, `roles/resourcemanager.tagUser`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver`, `roles/iam.devOps` |
| `iam.serviceAccounts.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/iam.admin`, `roles/iam.editor`, `roles/iam.serviceAccountAdmin`, `roles/iam.devOps`, `roles/iam.serviceAccountDeleter` (+1 service agent role) |
| `iam.serviceAccounts.deleteTagBinding` | `roles/admin`, `roles/owner`, `roles/iam.admin`, `roles/iam.serviceAccountAdmin`, `roles/resourcemanager.tagUser`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver`, `roles/iam.devOps` |
| `iam.serviceAccounts.disable` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/iam.admin`, `roles/iam.editor`, `roles/iam.serviceAccountAdmin`, `roles/earthengine.appsPublisher`, `roles/iam.devOps` (+1 service agent role) |
| `iam.serviceAccounts.enable` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/iam.admin`, `roles/iam.editor`, `roles/iam.serviceAccountAdmin`, `roles/earthengine.appsPublisher`, `roles/iam.devOps` |
| `iam.serviceAccounts.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/assuredoss.admin`, `roles/iam.admin`, `roles/iam.editor`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.serviceAccountAdmin`, `roles/iam.serviceAccountCreator`, `roles/iam.serviceAccountKeyAdmin`, `roles/iam.serviceAccountTokenCreator`, `roles/iam.serviceAccountUser`, `roles/iam.serviceAccountViewer`, `roles/iam.viewer`, `roles/iam.workloadIdentityUser`, `roles/securitycenter.admin`, `roles/workstations.admin`, `roles/assuredoss.projectAdmin`, `roles/backupdr.computeEngineOperator`, `roles/cloudmigration.inframanager`, `roles/dataproc.hubAgent`, `roles/earthengine.appsPublisher`, `roles/iam.dataScientist`, `roles/iam.databasesAdmin`, `roles/iam.devOps`, `roles/iam.securityAuditor`, `roles/iam.serviceAccountDeleter`, `roles/iam.supportUser`, `roles/wiz.cloudInventoryViewer` (+21 service agent roles) |
| `iam.serviceAccounts.getAccessToken` | `roles/iam.serviceAccountTokenCreator`, `roles/iam.workloadIdentityUser` (+30 service agent roles) |
| `iam.serviceAccounts.getIamPolicy` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.admin`, `roles/iam.editor`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.serviceAccountAdmin`, `roles/iam.serviceAccountViewer`, `roles/iam.viewer`, `roles/composer.ServiceAgentV2Ext`, `roles/earthengine.appsPublisher`, `roles/iam.devOps`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/wiz.cloudInventoryViewer` (+2 service agent roles) |
| `iam.serviceAccounts.getOpenIdToken` | `roles/iam.serviceAccountTokenCreator`, `roles/iam.workloadIdentityUser`, `roles/iam.serviceAccountOpenIdTokenCreator` (+19 service agent roles) |
| `iam.serviceAccounts.implicitDelegation` | `roles/iam.serviceAccountTokenCreator` (+5 service agent roles) |
| `iam.serviceAccounts.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudjobdiscovery.admin`, `roles/iam.admin`, `roles/iam.editor`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.serviceAccountAdmin`, `roles/iam.serviceAccountCreator`, `roles/iam.serviceAccountKeyAdmin`, `roles/iam.serviceAccountTokenCreator`, `roles/iam.serviceAccountUser`, `roles/iam.serviceAccountViewer`, `roles/iam.viewer`, `roles/iam.workloadIdentityUser`, `roles/workloadmanager.admin`, `roles/workstations.admin`, `roles/backupdr.computeEngineOperator`, `roles/cloudmigration.inframanager`, `roles/dataproc.hubAgent`, `roles/iam.dataScientist`, `roles/iam.databasesAdmin`, `roles/iam.devOps`, `roles/iam.securityAuditor`, `roles/iam.serviceAccountDeleter`, `roles/iam.supportUser`, `roles/wiz.cloudInventoryViewer`, `roles/workloadmanager.deploymentAdmin` (+15 service agent roles) |
| `iam.serviceAccounts.listEffectiveTags` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.admin`, `roles/iam.editor`, `roles/iam.serviceAccountAdmin`, `roles/iam.serviceAccountViewer`, `roles/iam.viewer`, `roles/resourcemanager.tagUser`, `roles/resourcemanager.tagViewer`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver`, `roles/iam.devOps`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `iam.serviceAccounts.listTagBindings` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.admin`, `roles/iam.editor`, `roles/iam.serviceAccountAdmin`, `roles/iam.serviceAccountViewer`, `roles/iam.viewer`, `roles/resourcemanager.tagUser`, `roles/resourcemanager.tagViewer`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver`, `roles/iam.devOps`, `roles/iam.securityAuditor`, `roles/iam.supportUser` |
| `iam.serviceAccounts.setIamPolicy` | `roles/admin`, `roles/owner`, `roles/iam.admin`, `roles/iam.securityAdmin`, `roles/iam.serviceAccountAdmin`, `roles/composer.ServiceAgentV2Ext`, `roles/earthengine.appsPublisher`, `roles/iam.devOps` |
| `iam.serviceAccounts.signBlob` | `roles/iam.serviceAccountTokenCreator` (+8 service agent roles) |
| `iam.serviceAccounts.signJwt` | `roles/iam.serviceAccountTokenCreator` (+6 service agent roles) |
| `iam.serviceAccounts.undelete` | `roles/admin`, `roles/owner`, `roles/iam.admin`, `roles/iam.serviceAccountAdmin`, `roles/iam.devOps` |
| `iam.serviceAccounts.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/iam.admin`, `roles/iam.editor`, `roles/iam.serviceAccountAdmin`, `roles/iam.devOps` (+1 service agent role) |
| `iam.workloadIdentityPools.createPolicyBinding` | `roles/admin`, `roles/owner`, `roles/iam.admin`, `roles/iam.workloadIdentityPoolAdmin` |
| `iam.workloadIdentityPools.deletePolicyBinding` | `roles/admin`, `roles/owner`, `roles/iam.admin`, `roles/iam.workloadIdentityPoolAdmin` |
| `iam.workloadIdentityPools.searchPolicyBindings` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/iam.admin`, `roles/iam.editor`, `roles/iam.viewer`, `roles/iam.supportUser`, `roles/iam.workloadIdentityPoolAdmin` |
| `iam.workloadIdentityPools.updatePolicyBinding` | `roles/admin`, `roles/owner`, `roles/iam.admin`, `roles/iam.workloadIdentityPoolAdmin` |

## Notes

- Roles and permissions of the `iam` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/iam (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
