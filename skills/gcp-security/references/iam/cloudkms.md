---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/cloudkms
---

# Cloud Key Management Service IAM roles and permissions

## Signature / Usage

Predefined roles of `cloudkms` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Roles

#### Cloud KMS Admin (`roles/cloudkms.admin`)

- Provides access to Cloud KMS resources, except for access to restricted resource types and cryptographic operations. Lowest-level resources where you can grant this role: - CryptoKey
- Permissions (73): `cloudkms.autokeyConfigs.get`, `cloudkms.autokeyConfigs.update`, `cloudkms.cryptoKeyVersions.create`, `cloudkms.cryptoKeyVersions.delete`, `cloudkms.cryptoKeyVersions.destroy`, `cloudkms.cryptoKeyVersions.get`, `cloudkms.cryptoKeyVersions.list`, `cloudkms.cryptoKeyVersions.restore`, `cloudkms.cryptoKeyVersions.trustedImportExport`, `cloudkms.cryptoKeyVersions.update`, `cloudkms.cryptoKeyVersions.useToDecryptViaDelegation`, `cloudkms.cryptoKeyVersions.useToEncryptViaDelegation`, `cloudkms.cryptoKeys.create`, `cloudkms.cryptoKeys.delete`, `cloudkms.cryptoKeys.get`, `cloudkms.cryptoKeys.getIamPolicy`, `cloudkms.cryptoKeys.list`, `cloudkms.cryptoKeys.setIamPolicy`, `cloudkms.cryptoKeys.update`, `cloudkms.ekmConfigs.get`, `cloudkms.ekmConfigs.getIamPolicy`, `cloudkms.ekmConfigs.setIamPolicy`, `cloudkms.ekmConfigs.update`, `cloudkms.ekmConnections.create`, `cloudkms.ekmConnections.get`, `cloudkms.ekmConnections.getIamPolicy`, `cloudkms.ekmConnections.list`, `cloudkms.ekmConnections.setIamPolicy`, `cloudkms.ekmConnections.update`, `cloudkms.ekmConnections.use`, `cloudkms.ekmConnections.verifyConnectivity`, `cloudkms.folders.showEffectiveAutokeyConfig`, `cloudkms.importJobs.create`, `cloudkms.importJobs.delete`, `cloudkms.importJobs.get`, `cloudkms.importJobs.getIamPolicy`, `cloudkms.importJobs.list`, `cloudkms.importJobs.setIamPolicy`, `cloudkms.importJobs.useToImport`, `cloudkms.kajPolicyConfigs.get`, `cloudkms.kajPolicyConfigs.update`, `cloudkms.keyHandles.create`, `cloudkms.keyHandles.get`, `cloudkms.keyHandles.list`, `cloudkms.keyRings.create`, `cloudkms.keyRings.createTagBinding`, `cloudkms.keyRings.delete`, `cloudkms.keyRings.deleteTagBinding`, `cloudkms.keyRings.get`, `cloudkms.keyRings.getIamPolicy`, `cloudkms.keyRings.list`, `cloudkms.keyRings.listEffectiveTags`, `cloudkms.keyRings.listTagBindings`, `cloudkms.keyRings.setIamPolicy`, `cloudkms.locations.generateRandomBytes`, `cloudkms.locations.get`, `cloudkms.locations.list`, `cloudkms.locations.optOutKeyDeletionMsa`, `cloudkms.operations.get`, `cloudkms.projects.showEffectiveAutokeyConfig`, `cloudkms.projects.showEffectiveKajEnrollmentConfig`, `cloudkms.projects.showEffectiveKajPolicyConfig`, `cloudkms.protectedResources.search`, `cloudkms.retiredResources.get`, `cloudkms.retiredResources.list`, `cloudkms.singleTenantHsmInstanceProposals.delete`, `cloudkms.singleTenantHsmInstanceProposals.get`, `cloudkms.singleTenantHsmInstanceProposals.list`, `cloudkms.singleTenantHsmInstances.create`, `cloudkms.singleTenantHsmInstances.get`, `cloudkms.singleTenantHsmInstances.list`, `cloudkms.singleTenantHsmInstances.use`, `resourcemanager.projects.get`

#### Cloud KMS CryptoKey Encrypter/Decrypter (`roles/cloudkms.cryptoKeyEncrypterDecrypter`)

- Provides ability to use Cloud KMS resources for encrypt and decrypt operations only. Lowest-level resources where you can grant this role: - CryptoKey
- Permissions (5): `cloudkms.cryptoKeyVersions.useToDecrypt`, `cloudkms.cryptoKeyVersions.useToEncrypt`, `cloudkms.locations.get`, `cloudkms.locations.list`, `resourcemanager.projects.get`

#### Cloud KMS Viewer (`roles/cloudkms.viewer`)

- Enables Get and List operations. Lowest-level resources where you can grant this role: - CryptoKey
- Permissions (40): `cloudkms.autokeyConfigs.get`, `cloudkms.cryptoKeyVersions.get`, `cloudkms.cryptoKeyVersions.list`, `cloudkms.cryptoKeys.get`, `cloudkms.cryptoKeys.getIamPolicy`, `cloudkms.cryptoKeys.list`, `cloudkms.ekmConfigs.get`, `cloudkms.ekmConfigs.getIamPolicy`, `cloudkms.ekmConnections.get`, `cloudkms.ekmConnections.getIamPolicy`, `cloudkms.ekmConnections.list`, `cloudkms.ekmConnections.verifyConnectivity`, `cloudkms.folders.showEffectiveAutokeyConfig`, `cloudkms.importJobs.get`, `cloudkms.importJobs.getIamPolicy`, `cloudkms.importJobs.list`, `cloudkms.kajPolicyConfigs.get`, `cloudkms.keyHandles.get`, `cloudkms.keyHandles.list`, `cloudkms.keyRings.get`, `cloudkms.keyRings.getIamPolicy`, `cloudkms.keyRings.list`, `cloudkms.keyRings.listEffectiveTags`, `cloudkms.keyRings.listTagBindings`, `cloudkms.locations.generateRandomBytes`, `cloudkms.locations.get`, `cloudkms.locations.list`, `cloudkms.operations.get`, `cloudkms.projects.showEffectiveAutokeyConfig`, `cloudkms.projects.showEffectiveKajEnrollmentConfig`, `cloudkms.projects.showEffectiveKajPolicyConfig`, `cloudkms.protectableResources.list`, `cloudkms.protectedResources.search`, `cloudkms.retiredResources.get`, `cloudkms.retiredResources.list`, `cloudkms.singleTenantHsmInstanceProposals.get`, `cloudkms.singleTenantHsmInstanceProposals.list`, `cloudkms.singleTenantHsmInstances.get`, `cloudkms.singleTenantHsmInstances.list`, `resourcemanager.projects.get`

#### Cloud KMS Autokey Admin (`roles/cloudkms.autokeyAdmin`)

- Enables management of AutokeyConfig.
- Permissions (4): `cloudkms.autokeyConfigs.get`, `cloudkms.autokeyConfigs.update`, `cloudkms.folders.showEffectiveAutokeyConfig`, `cloudkms.projects.showEffectiveAutokeyConfig`

#### Cloud KMS Autokey User (`roles/cloudkms.autokeyUser`)

- Grants ability to use KeyHandle resources.
- Permissions (5): `cloudkms.keyHandles.create`, `cloudkms.keyHandles.get`, `cloudkms.keyHandles.list`, `cloudkms.operations.get`, `cloudkms.projects.showEffectiveAutokeyConfig`

#### Cloud KMS CryptoKey Decrypter (`roles/cloudkms.cryptoKeyDecrypter`)

- Provides ability to use Cloud KMS resources for decrypt operations only. Lowest-level resources where you can grant this role: - CryptoKey
- Permissions (4): `cloudkms.cryptoKeyVersions.useToDecrypt`, `cloudkms.locations.get`, `cloudkms.locations.list`, `resourcemanager.projects.get`

#### Cloud KMS CryptoKey Decrypter Via Delegation (`roles/cloudkms.cryptoKeyDecrypterViaDelegation`)

- Enables Decrypt operations via other Google Cloud services Lowest-level resources where you can grant this role: - CryptoKey
- Permissions (5): `cloudkms.cryptoKeyVersions.useToDecryptViaDelegation`, `cloudkms.locations.get`, `cloudkms.locations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Cloud KMS CryptoKey Encrypter (`roles/cloudkms.cryptoKeyEncrypter`)

- Provides ability to use Cloud KMS resources for encrypt operations only. Lowest-level resources where you can grant this role: - CryptoKey
- Permissions (4): `cloudkms.cryptoKeyVersions.useToEncrypt`, `cloudkms.locations.get`, `cloudkms.locations.list`, `resourcemanager.projects.get`

#### Cloud KMS CryptoKey Encrypter/Decrypter Via Delegation (`roles/cloudkms.cryptoKeyEncrypterDecrypterViaDelegation`)

- Enables Encrypt and Decrypt operations via other Google Cloud services Lowest-level resources where you can grant this role: - CryptoKey
- Permissions (6): `cloudkms.cryptoKeyVersions.useToDecryptViaDelegation`, `cloudkms.cryptoKeyVersions.useToEncryptViaDelegation`, `cloudkms.locations.get`, `cloudkms.locations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Cloud KMS CryptoKey Encrypter Via Delegation (`roles/cloudkms.cryptoKeyEncrypterViaDelegation`)

- Enables Encrypt operations via other Google Cloud services Lowest-level resources where you can grant this role: - CryptoKey
- Permissions (5): `cloudkms.cryptoKeyVersions.useToEncryptViaDelegation`, `cloudkms.locations.get`, `cloudkms.locations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Cloud KMS Crypto Operator (`roles/cloudkms.cryptoOperator`)

- Enables all Crypto Operations. Lowest-level resources where you can grant this role: - CryptoKey
- Permissions (10): `cloudkms.cryptoKeyVersions.useToDecapsulate`, `cloudkms.cryptoKeyVersions.useToDecrypt`, `cloudkms.cryptoKeyVersions.useToEncrypt`, `cloudkms.cryptoKeyVersions.useToSign`, `cloudkms.cryptoKeyVersions.useToVerify`, `cloudkms.cryptoKeyVersions.viewPublicKey`, `cloudkms.locations.generateRandomBytes`, `cloudkms.locations.get`, `cloudkms.locations.list`, `resourcemanager.projects.get`

#### Cloud KMS CryptoKey Decapsulator (`roles/cloudkms.decapsulator`)

- Launch stage: Beta
- Enables Decapsulate and GetPublicKey operations
- Permissions (5): `cloudkms.cryptoKeyVersions.useToDecapsulate`, `cloudkms.cryptoKeyVersions.viewPublicKey`, `cloudkms.locations.get`, `cloudkms.locations.list`, `resourcemanager.projects.get`

#### Cloud KMS EkmConnections Admin (`roles/cloudkms.ekmConnectionsAdmin`)

- Enables management of EkmConnections.
- Permissions (9): `cloudkms.ekmConfigs.get`, `cloudkms.ekmConfigs.update`, `cloudkms.ekmConnections.create`, `cloudkms.ekmConnections.get`, `cloudkms.ekmConnections.list`, `cloudkms.ekmConnections.update`, `cloudkms.ekmConnections.verifyConnectivity`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Cloud KMS Encryption Dashboard Viewer (`roles/cloudkms.encryptionDashboardViewer`)

- Enables viewing KMS encryption dashboard.
- Permissions (2): `cloudkms.cryptoKeys.list`, `cloudkms.protectableResources.list`

#### Cloud KMS Expert PQ Asymmetric Signing Key Manager (`roles/cloudkms.expertPqcSigner`)

- Enables PQ asymmetric signing key management.
- Permissions (5): `cloudkms.cryptoKeyVersions.managePqcSign`, `cloudkms.locations.get`, `cloudkms.locations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Cloud KMS Expert Raw AES-CBC Key Manager (`roles/cloudkms.expertRawAesCbc`)

- Enables raw AES-CBC keys management. Lowest-level resources where you can grant this role: - CryptoKey
- Permissions (5): `cloudkms.cryptoKeyVersions.manageRawAesCbcKeys`, `cloudkms.locations.get`, `cloudkms.locations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Cloud KMS Expert Raw AES-CTR Key Manager (`roles/cloudkms.expertRawAesCtr`)

- Enables raw AES-CTR keys management. Lowest-level resources where you can grant this role: - CryptoKey
- Permissions (5): `cloudkms.cryptoKeyVersions.manageRawAesCtrKeys`, `cloudkms.locations.get`, `cloudkms.locations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Cloud KMS Expert Raw PKCS#1 Key Manager (`roles/cloudkms.expertRawPKCS1`)

- Enables raw PKCS#1 keys management. Lowest-level resources where you can grant this role: - CryptoKey
- Permissions (5): `cloudkms.cryptoKeyVersions.manageRawPKCS1Keys`, `cloudkms.locations.get`, `cloudkms.locations.list`, `resourcemanager.projects.get`, `resourcemanager.projects.list`

#### Cloud KMS single-tenant HSM Executor (`roles/cloudkms.hsmSingleTenantExecutor`)

- Grants ability to execute SingleTenantHsmInstanceProposal resources.
- Permissions (6): `cloudkms.operations.get`, `cloudkms.singleTenantHsmInstanceProposals.execute`, `cloudkms.singleTenantHsmInstanceProposals.get`, `cloudkms.singleTenantHsmInstanceProposals.list`, `cloudkms.singleTenantHsmInstances.get`, `cloudkms.singleTenantHsmInstances.list`

#### Cloud KMS single-tenant HSM Key Creator (`roles/cloudkms.hsmSingleTenantKeyCreator`)

- Grants ability to use single-tenant HSM instances to create keys. This role must be combined with another role that grants the ability to create cryptoKeys.
- Permissions (3): `cloudkms.singleTenantHsmInstances.get`, `cloudkms.singleTenantHsmInstances.list`, `cloudkms.singleTenantHsmInstances.use`

#### Cloud KMS single-tenant HSM Proposer (`roles/cloudkms.hsmSingleTenantProposer`)

- Grants ability to create SingleTenantHsmInstances and SingleTenantHsmInstanceProposals.
- Permissions (8): `cloudkms.operations.get`, `cloudkms.singleTenantHsmInstanceProposals.create`, `cloudkms.singleTenantHsmInstanceProposals.delete`, `cloudkms.singleTenantHsmInstanceProposals.get`, `cloudkms.singleTenantHsmInstanceProposals.list`, `cloudkms.singleTenantHsmInstances.create`, `cloudkms.singleTenantHsmInstances.get`, `cloudkms.singleTenantHsmInstances.list`

#### Cloud KMS single-tenant HSM Quorum Member (`roles/cloudkms.hsmSingleTenantQuorumMember`)

- Grants ability to approve SingleTenantHsmInstanceProposal resources.
- Permissions (6): `cloudkms.operations.get`, `cloudkms.singleTenantHsmInstanceProposals.approve`, `cloudkms.singleTenantHsmInstanceProposals.get`, `cloudkms.singleTenantHsmInstanceProposals.list`, `cloudkms.singleTenantHsmInstances.get`, `cloudkms.singleTenantHsmInstances.list`

#### Cloud KMS Importer (`roles/cloudkms.importer`)

- Enables ImportCryptoKeyVersion, CreateImportJob, ListImportJobs, and GetImportJob operations
- Permissions (8): `cloudkms.cryptoKeyVersions.trustedImportExport`, `cloudkms.importJobs.create`, `cloudkms.importJobs.get`, `cloudkms.importJobs.list`, `cloudkms.importJobs.useToImport`, `cloudkms.locations.get`, `cloudkms.locations.list`, `resourcemanager.projects.get`

#### Key Access Justifications Enrollment Viewer (`roles/cloudkms.keyAccessJustificationsEnrollmentConfigViewer`)

- Grant ability to view Key Access Justification enrollment configs of a project.
- Permissions (1): `cloudkms.projects.showEffectiveKajEnrollmentConfig`

#### Key Access Justifications Policy Config Admin (`roles/cloudkms.keyAccessJustificationsPolicyConfigAdmin`)

- Grant ability to manage Key Access Justifications Policy at parent resource level.
- Permissions (3): `cloudkms.kajPolicyConfigs.get`, `cloudkms.kajPolicyConfigs.update`, `cloudkms.projects.showEffectiveKajPolicyConfig`

#### Cloud KMS Protected Resources Viewer (`roles/cloudkms.protectedResourcesViewer`)

- Enables viewing protected resources.
- Permissions (1): `cloudkms.protectedResources.search`

#### Cloud KMS CryptoKey Public Key Viewer (`roles/cloudkms.publicKeyViewer`)

- Enables GetPublicKey operations Lowest-level resources where you can grant this role: - CryptoKey
- Permissions (4): `cloudkms.cryptoKeyVersions.viewPublicKey`, `cloudkms.locations.get`, `cloudkms.locations.list`, `resourcemanager.projects.get`

#### Cloud KMS CryptoKey Signer (`roles/cloudkms.signer`)

- Enables Sign operations Lowest-level resources where you can grant this role: - CryptoKey
- Permissions (4): `cloudkms.cryptoKeyVersions.useToSign`, `cloudkms.locations.get`, `cloudkms.locations.list`, `resourcemanager.projects.get`

#### Cloud KMS CryptoKey Signer/Verifier (`roles/cloudkms.signerVerifier`)

- Enables Sign, Verify, and GetPublicKey operations Lowest-level resources where you can grant this role: - CryptoKey
- Permissions (6): `cloudkms.cryptoKeyVersions.useToSign`, `cloudkms.cryptoKeyVersions.useToVerify`, `cloudkms.cryptoKeyVersions.viewPublicKey`, `cloudkms.locations.get`, `cloudkms.locations.list`, `resourcemanager.projects.get`

#### Cloud KMS CryptoKey Verifier (`roles/cloudkms.verifier`)

- Enables Verify and GetPublicKey operations Lowest-level resources where you can grant this role: - CryptoKey
- Permissions (5): `cloudkms.cryptoKeyVersions.useToVerify`, `cloudkms.cryptoKeyVersions.viewPublicKey`, `cloudkms.locations.get`, `cloudkms.locations.list`, `resourcemanager.projects.get`

#### Cloud KMS Organization Service Agent (`roles/cloudkms.orgServiceAgent`)

- Gives Cloud KMS organization-level service account access to managed resources. > \[!WARNING\] > \*\*Warning:\*\* Do not grant service agent roles to any principals except service agents (https://docs.cloud.google.com/iam/docs/service-agents).
- Permissions (3): `cloudasset.assets.listResource`, `cloudasset.assets.searchAllIamPolicies`, `cloudasset.assets.searchAllResources`

#### Cloud KMS Service Agent (`roles/cloudkms.serviceAgent`)

- Gives Cloud KMS service account access to managed resources. > \[!WARNING\] > \*\*Warning:\*\* Do not grant service agent roles to any principals except service agents (https://docs.cloud.google.com/iam/docs/service-agents).
- Permissions (9): `cloudasset.assets.listCloudkmsCryptoKeys`, `cloudasset.assets.listResource`, `cloudasset.assets.searchAllIamPolicies`, `cloudasset.assets.searchAllResources`, `cloudkms.cryptoKeys.create`, `cloudkms.cryptoKeys.getIamPolicy`, `cloudkms.cryptoKeys.setIamPolicy`, `cloudkms.keyRings.create`, `cloudkms.keyRings.get`

#### Cloud KMS KACLS Service Agent (`roles/cloudkmskacls.serviceAgent`)

- Grants Cloud KMS KACLS Service Agent access to KMS resource permissions to perform DEK encryption/decryption. > \[!WARNING\] > \*\*Warning:\*\* Do not grant service agent roles to any principals except service agents (https://docs.cloud.google.com/iam/docs/service-agents).
- Permissions (3): `cloudkms.cryptoKeyVersions.useToDecrypt`, `cloudkms.cryptoKeyVersions.useToEncrypt`, `cloudkms.cryptoKeys.get`

### Example: grant a role

Generated example (not in the official docs) granting the first role on this page on a whole project (the role's lowest-level resource is CryptoKey; granting it there instead limits the scope, but this example does not show that command):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:EMAIL_ADDRESS" \
  --role="roles/cloudkms.admin"
```

### Permissions and the roles that contain them

| Permission | Roles |
|---|---|
| `cloudkms.autokeyConfigs.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudkms.admin`, `roles/cloudkms.viewer`, `roles/cloudkms.autokeyAdmin`, `roles/iam.databasesAdmin`, `roles/iam.mlEngineer`, `roles/iam.securityAuditor`, `roles/iam.siteReliabilityEngineer`, `roles/iam.supportUser` |
| `cloudkms.autokeyConfigs.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudkms.admin`, `roles/cloudkms.autokeyAdmin` |
| `cloudkms.cryptoKeyVersions.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudkms.admin` |
| `cloudkms.cryptoKeyVersions.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudkms.admin` |
| `cloudkms.cryptoKeyVersions.destroy` | `roles/admin`, `roles/owner`, `roles/cloudkms.admin` |
| `cloudkms.cryptoKeyVersions.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudkms.admin`, `roles/cloudkms.viewer`, `roles/container.cloudKmsKeyUser`, `roles/iam.databasesAdmin`, `roles/iam.mlEngineer`, `roles/iam.securityAuditor`, `roles/iam.siteReliabilityEngineer`, `roles/iam.supportUser` |
| `cloudkms.cryptoKeyVersions.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudkms.admin`, `roles/cloudkms.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.databasesAdmin`, `roles/iam.mlEngineer`, `roles/iam.securityAuditor`, `roles/iam.siteReliabilityEngineer`, `roles/iam.supportUser`, `roles/wiz.cloudInventoryViewer` |
| `cloudkms.cryptoKeyVersions.managePqcSign` | `roles/admin`, `roles/owner`, `roles/cloudkms.expertPqcSigner` |
| `cloudkms.cryptoKeyVersions.manageRawAesCbcKeys` | `roles/admin`, `roles/owner`, `roles/cloudkms.expertRawAesCbc` |
| `cloudkms.cryptoKeyVersions.manageRawAesCtrKeys` | `roles/admin`, `roles/owner`, `roles/cloudkms.expertRawAesCtr` |
| `cloudkms.cryptoKeyVersions.manageRawPKCS1Keys` | `roles/admin`, `roles/owner`, `roles/cloudkms.expertRawPKCS1` |
| `cloudkms.cryptoKeyVersions.restore` | `roles/admin`, `roles/owner`, `roles/cloudkms.admin` |
| `cloudkms.cryptoKeyVersions.trustedImportExport` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudkms.admin`, `roles/cloudkms.importer` |
| `cloudkms.cryptoKeyVersions.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudkms.admin` |
| `cloudkms.cryptoKeyVersions.useToDecapsulate` | `roles/admin`, `roles/owner`, `roles/cloudkms.cryptoOperator`, `roles/cloudkms.decapsulator` |
| `cloudkms.cryptoKeyVersions.useToDecrypt` | `roles/admin`, `roles/owner`, `roles/cloudkms.cryptoKeyEncrypterDecrypter`, `roles/cloudkms.cryptoKeyDecrypter`, `roles/cloudkms.cryptoOperator`, `roles/iam.dataScientist`, `roles/iam.devOps`, `roles/wiz.workloadScanner` (+2 service agent roles) |
| `cloudkms.cryptoKeyVersions.useToDecryptViaDelegation` | `roles/admin`, `roles/owner`, `roles/cloudkms.admin`, `roles/cloudkms.cryptoKeyDecrypterViaDelegation`, `roles/cloudkms.cryptoKeyEncrypterDecrypterViaDelegation` |
| `cloudkms.cryptoKeyVersions.useToEncrypt` | `roles/admin`, `roles/owner`, `roles/cloudkms.cryptoKeyEncrypterDecrypter`, `roles/cloudkms.cryptoKeyEncrypter`, `roles/cloudkms.cryptoOperator`, `roles/iam.dataScientist`, `roles/iam.devOps`, `roles/wiz.workloadScanner` (+1 service agent role) |
| `cloudkms.cryptoKeyVersions.useToEncryptViaDelegation` | `roles/admin`, `roles/owner`, `roles/cloudkms.admin`, `roles/cloudkms.cryptoKeyEncrypterDecrypterViaDelegation`, `roles/cloudkms.cryptoKeyEncrypterViaDelegation` |
| `cloudkms.cryptoKeyVersions.useToSign` | `roles/admin`, `roles/owner`, `roles/cloudkms.cryptoOperator`, `roles/cloudkms.signer`, `roles/cloudkms.signerVerifier`, `roles/container.cloudKmsKeyUser` |
| `cloudkms.cryptoKeyVersions.useToVerify` | `roles/admin`, `roles/owner`, `roles/cloudkms.cryptoOperator`, `roles/cloudkms.signerVerifier`, `roles/cloudkms.verifier`, `roles/container.cloudKmsKeyUser` |
| `cloudkms.cryptoKeyVersions.viewPublicKey` | `roles/admin`, `roles/owner`, `roles/cloudkms.cryptoOperator`, `roles/cloudkms.decapsulator`, `roles/cloudkms.publicKeyViewer`, `roles/cloudkms.signerVerifier`, `roles/cloudkms.verifier`, `roles/container.cloudKmsKeyUser` |
| `cloudkms.cryptoKeys.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudkms.admin` (+2 service agent roles) |
| `cloudkms.cryptoKeys.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudkms.admin` |
| `cloudkms.cryptoKeys.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudkms.admin`, `roles/cloudkms.viewer`, `roles/container.cloudKmsKeyUser`, `roles/iam.databasesAdmin`, `roles/iam.mlEngineer`, `roles/iam.securityAuditor`, `roles/iam.siteReliabilityEngineer`, `roles/iam.supportUser`, `roles/securedlandingzone.bqdwProjectRemediator` (+3 service agent roles) |
| `cloudkms.cryptoKeys.getIamPolicy` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudkms.admin`, `roles/cloudkms.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.databasesAdmin`, `roles/iam.mlEngineer`, `roles/iam.securityAuditor`, `roles/iam.siteReliabilityEngineer`, `roles/iam.supportUser`, `roles/securedlandingzone.bqdwProjectRemediator`, `roles/wiz.cloudInventoryViewer` (+1 service agent role) |
| `cloudkms.cryptoKeys.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudkms.admin`, `roles/cloudkms.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/cloudkms.encryptionDashboardViewer`, `roles/iam.databasesAdmin`, `roles/iam.mlEngineer`, `roles/iam.securityAuditor`, `roles/iam.siteReliabilityEngineer`, `roles/iam.supportUser`, `roles/securedlandingzone.bqdwProjectRemediator`, `roles/wiz.cloudInventoryViewer` (+2 service agent roles) |
| `cloudkms.cryptoKeys.setIamPolicy` | `roles/admin`, `roles/owner`, `roles/cloudkms.admin`, `roles/iam.securityAdmin`, `roles/securedlandingzone.bqdwProjectRemediator` (+1 service agent role) |
| `cloudkms.cryptoKeys.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudkms.admin`, `roles/securedlandingzone.bqdwProjectRemediator` |
| `cloudkms.ekmConfigs.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudkms.admin`, `roles/cloudkms.viewer`, `roles/cloudkms.ekmConnectionsAdmin`, `roles/iam.databasesAdmin`, `roles/iam.mlEngineer`, `roles/iam.securityAuditor`, `roles/iam.siteReliabilityEngineer`, `roles/iam.supportUser` |
| `cloudkms.ekmConfigs.getIamPolicy` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudkms.admin`, `roles/cloudkms.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.databasesAdmin`, `roles/iam.mlEngineer`, `roles/iam.securityAuditor`, `roles/iam.siteReliabilityEngineer`, `roles/iam.supportUser` |
| `cloudkms.ekmConfigs.setIamPolicy` | `roles/admin`, `roles/owner`, `roles/cloudkms.admin`, `roles/iam.securityAdmin` |
| `cloudkms.ekmConfigs.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudkms.admin`, `roles/cloudkms.ekmConnectionsAdmin` |
| `cloudkms.ekmConnections.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudkms.admin`, `roles/cloudkms.ekmConnectionsAdmin` |
| `cloudkms.ekmConnections.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudkms.admin`, `roles/cloudkms.viewer`, `roles/cloudkms.ekmConnectionsAdmin`, `roles/iam.databasesAdmin`, `roles/iam.mlEngineer`, `roles/iam.securityAuditor`, `roles/iam.siteReliabilityEngineer`, `roles/iam.supportUser` (+1 service agent role) |
| `cloudkms.ekmConnections.getIamPolicy` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudkms.admin`, `roles/cloudkms.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.databasesAdmin`, `roles/iam.mlEngineer`, `roles/iam.securityAuditor`, `roles/iam.siteReliabilityEngineer`, `roles/iam.supportUser` (+1 service agent role) |
| `cloudkms.ekmConnections.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudkms.admin`, `roles/cloudkms.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/cloudkms.ekmConnectionsAdmin`, `roles/iam.databasesAdmin`, `roles/iam.mlEngineer`, `roles/iam.securityAuditor`, `roles/iam.siteReliabilityEngineer`, `roles/iam.supportUser` (+1 service agent role) |
| `cloudkms.ekmConnections.setIamPolicy` | `roles/admin`, `roles/owner`, `roles/cloudkms.admin`, `roles/iam.securityAdmin` |
| `cloudkms.ekmConnections.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudkms.admin`, `roles/cloudkms.ekmConnectionsAdmin` |
| `cloudkms.ekmConnections.use` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudkms.admin` |
| `cloudkms.ekmConnections.verifyConnectivity` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudkms.admin`, `roles/cloudkms.viewer`, `roles/cloudkms.ekmConnectionsAdmin`, `roles/iam.databasesAdmin`, `roles/iam.mlEngineer`, `roles/iam.securityAuditor`, `roles/iam.siteReliabilityEngineer`, `roles/iam.supportUser` (+1 service agent role) |
| `cloudkms.folders.showEffectiveAutokeyConfig` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudkms.admin`, `roles/cloudkms.viewer`, `roles/cloudkms.autokeyAdmin`, `roles/iam.databasesAdmin`, `roles/iam.mlEngineer`, `roles/iam.securityAuditor`, `roles/iam.siteReliabilityEngineer`, `roles/iam.supportUser` |
| `cloudkms.importJobs.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudkms.admin`, `roles/cloudkms.importer` |
| `cloudkms.importJobs.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudkms.admin` |
| `cloudkms.importJobs.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudkms.admin`, `roles/cloudkms.viewer`, `roles/cloudkms.importer`, `roles/iam.databasesAdmin`, `roles/iam.mlEngineer`, `roles/iam.securityAuditor`, `roles/iam.siteReliabilityEngineer`, `roles/iam.supportUser` |
| `cloudkms.importJobs.getIamPolicy` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudkms.admin`, `roles/cloudkms.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.databasesAdmin`, `roles/iam.mlEngineer`, `roles/iam.securityAuditor`, `roles/iam.siteReliabilityEngineer`, `roles/iam.supportUser` |
| `cloudkms.importJobs.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudkms.admin`, `roles/cloudkms.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/cloudkms.importer`, `roles/iam.databasesAdmin`, `roles/iam.mlEngineer`, `roles/iam.securityAuditor`, `roles/iam.siteReliabilityEngineer`, `roles/iam.supportUser`, `roles/wiz.cloudInventoryViewer` |
| `cloudkms.importJobs.setIamPolicy` | `roles/admin`, `roles/owner`, `roles/cloudkms.admin`, `roles/iam.securityAdmin` |
| `cloudkms.importJobs.useToImport` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudkms.admin`, `roles/cloudkms.importer` |
| `cloudkms.kajPolicyConfigs.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudkms.admin`, `roles/cloudkms.viewer`, `roles/cloudkms.keyAccessJustificationsPolicyConfigAdmin`, `roles/iam.databasesAdmin`, `roles/iam.mlEngineer`, `roles/iam.securityAuditor`, `roles/iam.siteReliabilityEngineer`, `roles/iam.supportUser` |
| `cloudkms.kajPolicyConfigs.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudkms.admin`, `roles/cloudkms.keyAccessJustificationsPolicyConfigAdmin` |
| `cloudkms.keyHandles.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/alloydb.admin`, `roles/apigee.admin`, `roles/apigee.editor`, `roles/apihub.admin`, `roles/artifactregistry.admin`, `roles/backupdr.admin`, `roles/bigquery.admin`, `roles/bigquery.dataEditor`, `roles/bigquery.dataOwner`, `roles/bigquery.studioAdmin`, `roles/bigquery.studioUser`, `roles/bigquery.user`, `roles/bigtable.admin`, `roles/cloudkms.admin`, `roles/cloudsql.admin`, `roles/composer.admin`, `roles/compute.admin`, `roles/compute.instanceAdmin`, `roles/compute.instanceAdmin.v1`, `roles/compute.storageAdmin`, `roles/container.admin`, `roles/container.clusterAdmin`, `roles/dataflow.admin`, `roles/dataproc.admin`, `roles/dataproc.editor`, `roles/datastream.admin`, `roles/documentai.admin`, `roles/documentai.editor`, `roles/file.admin`, `roles/file.editor`, `roles/firebase.admin`, `roles/gkebackup.admin`, `roles/memorystore.admin`, `roles/pubsub.admin`, `roles/pubsub.editor`, `roles/redis.admin`, `roles/secretmanager.admin`, `roles/securesourcemanager.admin`, `roles/spanner.admin`, `roles/storage.admin`, `roles/vmmigration.admin`, `roles/workflows.admin`, `roles/workflows.editor`, `roles/workstations.admin`, `roles/apihub.provisioningAdmin`, `roles/cloudkms.autokeyUser`, `roles/composer.environmentAndStorageObjectAdmin`, `roles/composer.worker`, `roles/dataflow.developer`, `roles/dataproc.serverlessEditor`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver`, `roles/firebase.developAdmin`, `roles/iam.dataScientist`, `roles/iam.databasesAdmin`, `roles/iam.devOps`, `roles/iam.infrastructureAdmin`, `roles/iam.mlEngineer`, `roles/iam.networkAdmin`, `roles/iam.siteReliabilityEngineer`, `roles/notebooks.legacyAdmin`, `roles/run.sourceDeveloper`, `roles/securesourcemanager.instanceOwner`, `roles/spanner.databaseAdmin` |
| `cloudkms.keyHandles.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/alloydb.admin`, `roles/apigee.admin`, `roles/apigee.editor`, `roles/apihub.admin`, `roles/artifactregistry.admin`, `roles/backupdr.admin`, `roles/bigquery.admin`, `roles/bigquery.dataEditor`, `roles/bigquery.dataOwner`, `roles/bigquery.studioAdmin`, `roles/bigquery.studioUser`, `roles/bigquery.user`, `roles/bigtable.admin`, `roles/cloudkms.admin`, `roles/cloudkms.viewer`, `roles/cloudsql.admin`, `roles/composer.admin`, `roles/compute.admin`, `roles/compute.instanceAdmin`, `roles/compute.instanceAdmin.v1`, `roles/compute.storageAdmin`, `roles/container.admin`, `roles/container.clusterAdmin`, `roles/dataflow.admin`, `roles/dataproc.admin`, `roles/dataproc.editor`, `roles/datastream.admin`, `roles/documentai.admin`, `roles/documentai.editor`, `roles/file.admin`, `roles/file.editor`, `roles/firebase.admin`, `roles/gkebackup.admin`, `roles/memorystore.admin`, `roles/pubsub.admin`, `roles/pubsub.editor`, `roles/redis.admin`, `roles/secretmanager.admin`, `roles/securesourcemanager.admin`, `roles/spanner.admin`, `roles/storage.admin`, `roles/vmmigration.admin`, `roles/workflows.admin`, `roles/workflows.editor`, `roles/workstations.admin`, `roles/apihub.provisioningAdmin`, `roles/cloudkms.autokeyUser`, `roles/composer.environmentAndStorageObjectAdmin`, `roles/composer.worker`, `roles/dataflow.developer`, `roles/dataproc.serverlessEditor`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver`, `roles/firebase.developAdmin`, `roles/iam.dataScientist`, `roles/iam.databasesAdmin`, `roles/iam.devOps`, `roles/iam.infrastructureAdmin`, `roles/iam.mlEngineer`, `roles/iam.networkAdmin`, `roles/iam.securityAuditor`, `roles/iam.siteReliabilityEngineer`, `roles/iam.supportUser`, `roles/notebooks.legacyAdmin`, `roles/run.sourceDeveloper`, `roles/securesourcemanager.instanceOwner`, `roles/spanner.databaseAdmin` |
| `cloudkms.keyHandles.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/alloydb.admin`, `roles/apigee.admin`, `roles/apigee.editor`, `roles/apihub.admin`, `roles/artifactregistry.admin`, `roles/backupdr.admin`, `roles/bigquery.admin`, `roles/bigquery.dataEditor`, `roles/bigquery.dataOwner`, `roles/bigquery.studioAdmin`, `roles/bigquery.studioUser`, `roles/bigquery.user`, `roles/bigtable.admin`, `roles/cloudkms.admin`, `roles/cloudkms.viewer`, `roles/cloudsql.admin`, `roles/composer.admin`, `roles/compute.admin`, `roles/compute.instanceAdmin`, `roles/compute.instanceAdmin.v1`, `roles/compute.storageAdmin`, `roles/container.admin`, `roles/container.clusterAdmin`, `roles/dataflow.admin`, `roles/dataproc.admin`, `roles/dataproc.editor`, `roles/datastream.admin`, `roles/documentai.admin`, `roles/documentai.editor`, `roles/file.admin`, `roles/file.editor`, `roles/firebase.admin`, `roles/gkebackup.admin`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/memorystore.admin`, `roles/pubsub.admin`, `roles/pubsub.editor`, `roles/redis.admin`, `roles/secretmanager.admin`, `roles/securesourcemanager.admin`, `roles/spanner.admin`, `roles/storage.admin`, `roles/vmmigration.admin`, `roles/workflows.admin`, `roles/workflows.editor`, `roles/workstations.admin`, `roles/apihub.provisioningAdmin`, `roles/cloudkms.autokeyUser`, `roles/composer.environmentAndStorageObjectAdmin`, `roles/composer.worker`, `roles/dataflow.developer`, `roles/dataproc.serverlessEditor`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver`, `roles/firebase.developAdmin`, `roles/iam.dataScientist`, `roles/iam.databasesAdmin`, `roles/iam.devOps`, `roles/iam.infrastructureAdmin`, `roles/iam.mlEngineer`, `roles/iam.networkAdmin`, `roles/iam.securityAuditor`, `roles/iam.siteReliabilityEngineer`, `roles/iam.supportUser`, `roles/notebooks.legacyAdmin`, `roles/run.sourceDeveloper`, `roles/securesourcemanager.instanceOwner`, `roles/spanner.databaseAdmin` |
| `cloudkms.keyRings.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudkms.admin` (+2 service agent roles) |
| `cloudkms.keyRings.createTagBinding` | `roles/admin`, `roles/owner`, `roles/cloudkms.admin`, `roles/resourcemanager.tagUser`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver` |
| `cloudkms.keyRings.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudkms.admin` |
| `cloudkms.keyRings.deleteTagBinding` | `roles/admin`, `roles/owner`, `roles/cloudkms.admin`, `roles/resourcemanager.tagUser`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver` |
| `cloudkms.keyRings.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudkms.admin`, `roles/cloudkms.viewer`, `roles/iam.databasesAdmin`, `roles/iam.mlEngineer`, `roles/iam.securityAuditor`, `roles/iam.siteReliabilityEngineer`, `roles/iam.supportUser` (+1 service agent role) |
| `cloudkms.keyRings.getIamPolicy` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudkms.admin`, `roles/cloudkms.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.databasesAdmin`, `roles/iam.mlEngineer`, `roles/iam.securityAuditor`, `roles/iam.siteReliabilityEngineer`, `roles/iam.supportUser`, `roles/securedlandingzone.bqdwProjectRemediator`, `roles/wiz.cloudInventoryViewer` |
| `cloudkms.keyRings.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudkms.admin`, `roles/cloudkms.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.databasesAdmin`, `roles/iam.mlEngineer`, `roles/iam.securityAuditor`, `roles/iam.siteReliabilityEngineer`, `roles/iam.supportUser`, `roles/wiz.cloudInventoryViewer` (+2 service agent roles) |
| `cloudkms.keyRings.listEffectiveTags` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudkms.admin`, `roles/cloudkms.viewer`, `roles/resourcemanager.tagUser`, `roles/resourcemanager.tagViewer`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver`, `roles/iam.databasesAdmin`, `roles/iam.mlEngineer`, `roles/iam.securityAuditor`, `roles/iam.siteReliabilityEngineer`, `roles/iam.supportUser` |
| `cloudkms.keyRings.listTagBindings` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudkms.admin`, `roles/cloudkms.viewer`, `roles/resourcemanager.tagUser`, `roles/resourcemanager.tagViewer`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver`, `roles/iam.databasesAdmin`, `roles/iam.mlEngineer`, `roles/iam.securityAuditor`, `roles/iam.siteReliabilityEngineer`, `roles/iam.supportUser` |
| `cloudkms.keyRings.setIamPolicy` | `roles/admin`, `roles/owner`, `roles/cloudkms.admin`, `roles/iam.securityAdmin`, `roles/securedlandingzone.bqdwProjectRemediator` |
| `cloudkms.locations.generateRandomBytes` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudkms.admin`, `roles/cloudkms.viewer`, `roles/cloudkms.cryptoOperator`, `roles/iam.databasesAdmin`, `roles/iam.mlEngineer`, `roles/iam.securityAuditor`, `roles/iam.siteReliabilityEngineer`, `roles/iam.supportUser` |
| `cloudkms.locations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudkms.admin`, `roles/cloudkms.cryptoKeyEncrypterDecrypter`, `roles/cloudkms.viewer`, `roles/cloudkms.cryptoKeyDecrypter`, `roles/cloudkms.cryptoKeyDecrypterViaDelegation`, `roles/cloudkms.cryptoKeyEncrypter`, `roles/cloudkms.cryptoKeyEncrypterDecrypterViaDelegation`, `roles/cloudkms.cryptoKeyEncrypterViaDelegation`, `roles/cloudkms.cryptoOperator`, `roles/cloudkms.decapsulator`, `roles/cloudkms.expertPqcSigner`, `roles/cloudkms.expertRawAesCbc`, `roles/cloudkms.expertRawAesCtr`, `roles/cloudkms.expertRawPKCS1`, `roles/cloudkms.importer`, `roles/cloudkms.publicKeyViewer`, `roles/cloudkms.signer`, `roles/cloudkms.signerVerifier`, `roles/cloudkms.verifier`, `roles/container.cloudKmsKeyUser`, `roles/iam.dataScientist`, `roles/iam.databasesAdmin`, `roles/iam.devOps`, `roles/iam.mlEngineer`, `roles/iam.securityAuditor`, `roles/iam.siteReliabilityEngineer`, `roles/iam.supportUser`, `roles/wiz.workloadScanner` (+1 service agent role) |
| `cloudkms.locations.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudkms.admin`, `roles/cloudkms.cryptoKeyEncrypterDecrypter`, `roles/cloudkms.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/cloudkms.cryptoKeyDecrypter`, `roles/cloudkms.cryptoKeyDecrypterViaDelegation`, `roles/cloudkms.cryptoKeyEncrypter`, `roles/cloudkms.cryptoKeyEncrypterDecrypterViaDelegation`, `roles/cloudkms.cryptoKeyEncrypterViaDelegation`, `roles/cloudkms.cryptoOperator`, `roles/cloudkms.decapsulator`, `roles/cloudkms.expertPqcSigner`, `roles/cloudkms.expertRawAesCbc`, `roles/cloudkms.expertRawAesCtr`, `roles/cloudkms.expertRawPKCS1`, `roles/cloudkms.importer`, `roles/cloudkms.publicKeyViewer`, `roles/cloudkms.signer`, `roles/cloudkms.signerVerifier`, `roles/cloudkms.verifier`, `roles/container.cloudKmsKeyUser`, `roles/iam.dataScientist`, `roles/iam.databasesAdmin`, `roles/iam.devOps`, `roles/iam.mlEngineer`, `roles/iam.securityAuditor`, `roles/iam.siteReliabilityEngineer`, `roles/iam.supportUser`, `roles/wiz.cloudInventoryViewer`, `roles/wiz.workloadScanner` (+1 service agent role) |
| `cloudkms.locations.optOutKeyDeletionMsa` | `roles/admin`, `roles/owner`, `roles/cloudkms.admin` |
| `cloudkms.operations.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/alloydb.admin`, `roles/apigee.admin`, `roles/apigee.editor`, `roles/apihub.admin`, `roles/artifactregistry.admin`, `roles/backupdr.admin`, `roles/bigquery.admin`, `roles/bigquery.dataEditor`, `roles/bigquery.dataOwner`, `roles/bigquery.studioAdmin`, `roles/bigquery.studioUser`, `roles/bigquery.user`, `roles/bigtable.admin`, `roles/cloudkms.admin`, `roles/cloudkms.viewer`, `roles/cloudsql.admin`, `roles/composer.admin`, `roles/compute.admin`, `roles/compute.instanceAdmin`, `roles/compute.instanceAdmin.v1`, `roles/compute.storageAdmin`, `roles/container.admin`, `roles/container.clusterAdmin`, `roles/dataflow.admin`, `roles/dataproc.admin`, `roles/dataproc.editor`, `roles/datastream.admin`, `roles/documentai.admin`, `roles/documentai.editor`, `roles/file.admin`, `roles/file.editor`, `roles/firebase.admin`, `roles/gkebackup.admin`, `roles/memorystore.admin`, `roles/pubsub.admin`, `roles/pubsub.editor`, `roles/redis.admin`, `roles/secretmanager.admin`, `roles/securesourcemanager.admin`, `roles/spanner.admin`, `roles/storage.admin`, `roles/vmmigration.admin`, `roles/workflows.admin`, `roles/workflows.editor`, `roles/workstations.admin`, `roles/apihub.provisioningAdmin`, `roles/cloudkms.autokeyUser`, `roles/cloudkms.hsmSingleTenantExecutor`, `roles/cloudkms.hsmSingleTenantProposer`, `roles/cloudkms.hsmSingleTenantQuorumMember`, `roles/composer.environmentAndStorageObjectAdmin`, `roles/composer.worker`, `roles/dataflow.developer`, `roles/dataproc.serverlessEditor`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver`, `roles/firebase.developAdmin`, `roles/iam.dataScientist`, `roles/iam.databasesAdmin`, `roles/iam.devOps`, `roles/iam.infrastructureAdmin`, `roles/iam.mlEngineer`, `roles/iam.networkAdmin`, `roles/iam.securityAuditor`, `roles/iam.siteReliabilityEngineer`, `roles/iam.supportUser`, `roles/notebooks.legacyAdmin`, `roles/run.sourceDeveloper`, `roles/securesourcemanager.instanceOwner`, `roles/spanner.databaseAdmin` |
| `cloudkms.projects.showEffectiveAutokeyConfig` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/alloydb.admin`, `roles/apigee.admin`, `roles/apigee.editor`, `roles/apihub.admin`, `roles/artifactregistry.admin`, `roles/backupdr.admin`, `roles/bigquery.admin`, `roles/bigquery.dataEditor`, `roles/bigquery.dataOwner`, `roles/bigquery.studioAdmin`, `roles/bigquery.studioUser`, `roles/bigquery.user`, `roles/bigtable.admin`, `roles/cloudkms.admin`, `roles/cloudkms.viewer`, `roles/cloudsql.admin`, `roles/composer.admin`, `roles/compute.admin`, `roles/compute.instanceAdmin`, `roles/compute.instanceAdmin.v1`, `roles/compute.storageAdmin`, `roles/container.admin`, `roles/container.clusterAdmin`, `roles/dataflow.admin`, `roles/dataproc.admin`, `roles/dataproc.editor`, `roles/datastream.admin`, `roles/documentai.admin`, `roles/documentai.editor`, `roles/file.admin`, `roles/file.editor`, `roles/firebase.admin`, `roles/gkebackup.admin`, `roles/memorystore.admin`, `roles/pubsub.admin`, `roles/pubsub.editor`, `roles/redis.admin`, `roles/secretmanager.admin`, `roles/securesourcemanager.admin`, `roles/spanner.admin`, `roles/storage.admin`, `roles/vmmigration.admin`, `roles/workflows.admin`, `roles/workflows.editor`, `roles/workstations.admin`, `roles/apihub.provisioningAdmin`, `roles/cloudkms.autokeyAdmin`, `roles/cloudkms.autokeyUser`, `roles/composer.environmentAndStorageObjectAdmin`, `roles/composer.worker`, `roles/dataflow.developer`, `roles/dataproc.serverlessEditor`, `roles/dlp.orgdriver`, `roles/dlp.projectdriver`, `roles/firebase.developAdmin`, `roles/iam.dataScientist`, `roles/iam.databasesAdmin`, `roles/iam.devOps`, `roles/iam.infrastructureAdmin`, `roles/iam.mlEngineer`, `roles/iam.networkAdmin`, `roles/iam.securityAuditor`, `roles/iam.siteReliabilityEngineer`, `roles/iam.supportUser`, `roles/notebooks.legacyAdmin`, `roles/run.sourceDeveloper`, `roles/securesourcemanager.instanceOwner`, `roles/spanner.databaseAdmin` |
| `cloudkms.projects.showEffectiveKajEnrollmentConfig` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudkms.admin`, `roles/cloudkms.viewer`, `roles/cloudkms.keyAccessJustificationsEnrollmentConfigViewer`, `roles/iam.databasesAdmin`, `roles/iam.mlEngineer`, `roles/iam.securityAuditor`, `roles/iam.siteReliabilityEngineer`, `roles/iam.supportUser` |
| `cloudkms.projects.showEffectiveKajPolicyConfig` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudkms.admin`, `roles/cloudkms.viewer`, `roles/cloudkms.keyAccessJustificationsPolicyConfigAdmin`, `roles/iam.databasesAdmin`, `roles/iam.mlEngineer`, `roles/iam.securityAuditor`, `roles/iam.siteReliabilityEngineer`, `roles/iam.supportUser` |
| `cloudkms.protectableResources.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudkms.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/cloudkms.encryptionDashboardViewer`, `roles/iam.databasesAdmin`, `roles/iam.mlEngineer`, `roles/iam.securityAuditor`, `roles/iam.siteReliabilityEngineer`, `roles/iam.supportUser` |
| `cloudkms.protectedResources.search` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudkms.admin`, `roles/cloudkms.viewer`, `roles/cloudkms.protectedResourcesViewer`, `roles/iam.databasesAdmin`, `roles/iam.mlEngineer`, `roles/iam.securityAuditor`, `roles/iam.siteReliabilityEngineer`, `roles/iam.supportUser` |
| `cloudkms.retiredResources.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudkms.admin`, `roles/cloudkms.viewer`, `roles/iam.databasesAdmin`, `roles/iam.mlEngineer`, `roles/iam.securityAuditor`, `roles/iam.siteReliabilityEngineer`, `roles/iam.supportUser` |
| `cloudkms.retiredResources.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudkms.admin`, `roles/cloudkms.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/iam.databasesAdmin`, `roles/iam.mlEngineer`, `roles/iam.securityAuditor`, `roles/iam.siteReliabilityEngineer`, `roles/iam.supportUser` |
| `cloudkms.singleTenantHsmInstanceProposals.approve` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudkms.hsmSingleTenantQuorumMember` |
| `cloudkms.singleTenantHsmInstanceProposals.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudkms.hsmSingleTenantProposer` |
| `cloudkms.singleTenantHsmInstanceProposals.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudkms.admin`, `roles/cloudkms.hsmSingleTenantProposer` |
| `cloudkms.singleTenantHsmInstanceProposals.execute` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudkms.hsmSingleTenantExecutor` |
| `cloudkms.singleTenantHsmInstanceProposals.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudkms.admin`, `roles/cloudkms.viewer`, `roles/cloudkms.hsmSingleTenantExecutor`, `roles/cloudkms.hsmSingleTenantProposer`, `roles/cloudkms.hsmSingleTenantQuorumMember`, `roles/iam.databasesAdmin`, `roles/iam.mlEngineer`, `roles/iam.securityAuditor`, `roles/iam.siteReliabilityEngineer`, `roles/iam.supportUser` |
| `cloudkms.singleTenantHsmInstanceProposals.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudkms.admin`, `roles/cloudkms.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/cloudkms.hsmSingleTenantExecutor`, `roles/cloudkms.hsmSingleTenantProposer`, `roles/cloudkms.hsmSingleTenantQuorumMember`, `roles/iam.databasesAdmin`, `roles/iam.mlEngineer`, `roles/iam.securityAuditor`, `roles/iam.siteReliabilityEngineer`, `roles/iam.supportUser` |
| `cloudkms.singleTenantHsmInstances.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudkms.admin`, `roles/cloudkms.hsmSingleTenantProposer` |
| `cloudkms.singleTenantHsmInstances.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudkms.admin`, `roles/cloudkms.viewer`, `roles/cloudkms.hsmSingleTenantExecutor`, `roles/cloudkms.hsmSingleTenantKeyCreator`, `roles/cloudkms.hsmSingleTenantProposer`, `roles/cloudkms.hsmSingleTenantQuorumMember`, `roles/iam.databasesAdmin`, `roles/iam.mlEngineer`, `roles/iam.securityAuditor`, `roles/iam.siteReliabilityEngineer`, `roles/iam.supportUser` |
| `cloudkms.singleTenantHsmInstances.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/cloudkms.admin`, `roles/cloudkms.viewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/cloudkms.hsmSingleTenantExecutor`, `roles/cloudkms.hsmSingleTenantKeyCreator`, `roles/cloudkms.hsmSingleTenantProposer`, `roles/cloudkms.hsmSingleTenantQuorumMember`, `roles/iam.databasesAdmin`, `roles/iam.mlEngineer`, `roles/iam.securityAuditor`, `roles/iam.siteReliabilityEngineer`, `roles/iam.supportUser` |
| `cloudkms.singleTenantHsmInstances.use` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/cloudkms.admin`, `roles/cloudkms.hsmSingleTenantKeyCreator` |

## Notes

- Roles and permissions of the `cloudkms` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/cloudkms (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
