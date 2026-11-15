---
source: https://docs.cloud.google.com/resource-manager/docs/organization-policy/org-policy-constraints
---

# Organization Policy Constraints Reference

Catalog of Google-managed organization policy constraints: automatically enforced defaults, managed constraints (`*.managed.*`), and legacy managed constraints (list / boolean). Descriptions are condensed from the official page; the official page holds full text and values.

## Signature / Usage

Snippet taken from https://docs.cloud.google.com/resource-manager/docs/organization-policy/using-constraints (inspect a managed constraint):

```bash
gcloud org-policies describe-custom-constraint CONSTRAINT_NAME \
    --organization=ORGANIZATION_ID
```

For example `iam.managed.disableServiceAccountKeyUpload`. List managed constraints with `gcloud org-policies list-custom-constraints --organization=ORGANIZATION_ID`.

### Automatically enforced constraints

Google-managed default behavior restricts operations even with no policy defined (override with a policy):

```text
constraints/appengine.runtimeDeploymentExemption                 (legacy)
constraints/cloudbuild.disableCreateDefaultServiceAccount        (legacy)
constraints/cloudbuild.useBuildServiceAccount                    (legacy)
constraints/cloudbuild.useComputeServiceAccount                  (legacy)
constraints/commerceorggovernance.marketplaceServices            (legacy)
constraints/compute.managed.blockPreviewFeatures                 (managed)
constraints/compute.sharedReservationsOwnerProjects              (legacy)
constraints/iam.allowServiceAccountCredentialLifetimeExtension   (legacy)
constraints/iam.disableCrossProjectServiceAccountUsage           (legacy)
constraints/iam.managed.disableServiceAccountApiKeyCreation      (managed)
constraints/iam.serviceAccountKeyExposureResponse                (legacy)
constraints/resourcemanager.allowedExportDestinations            (legacy)
constraints/resourcemanager.allowedImportSources                 (legacy)
constraints/resourcemanager.allowEnabledServicesForExport        (legacy)
constraints/vertexai.allowedPartnerModelFeatures                 (legacy)
```

## Options / Props

### Managed constraints

| Service | Constraint | Behavior |
|---------|-----------|----------|
| Compute Engine | `compute.managed.allowedVlanAttachmentEncryption` | List; allowed VLAN attachment encryption settings; set `IPSEC` to force encrypted attachments |
| Compute Engine | `compute.managed.blockPreviewFeatures` | Blocks Compute Alpha API preview features unless explicitly allowed; then individual features can be enabled per project |
| Compute Engine | `compute.managed.disableNestedVirtualization` | Boolean (Preview); disables hardware-accelerated nested virtualization |
| Compute Engine | `compute.managed.disableSerialPortAccess` | Preview; blocks setting `serial-port-enable` to true; does not affect VMs already true; exempt VMs via tags + conditional rules |
| Compute Engine | `compute.managed.disableSerialPortLogging` | Preview; disables serial port logging to Stackdriver; can break services such as GKE that rely on it |
| Compute Engine | `compute.managed.disallowGlobalDns` | Preview; restricts global internal DNS (gDNS) for projects with ZonalOnly DNS |
| Compute Engine | `compute.managed.requireOsConfig` | Preview; requires VM Manager (OS Config) on new projects; blocks metadata updates that disable it |
| Compute Engine | `compute.managed.requireOsLogin` | Preview; requires OS Login on new projects; blocks metadata updates that disable it |
| Compute Engine | `compute.managed.restrictProtocolForwardingCreationForTypes` | List `INTERNAL` / `EXTERNAL` allowlist for protocol forwarding |
| Compute Engine | `compute.managed.vmCanIpForward` | Preview; denies create/update of VMs with IP forwarding (exempt by tag) |
| Compute Engine | `compute.managed.vmExternalIpAccess` | Preview; denies VMs with IPv4 external IPs (IPv6 not restricted; exempt by tag) |
| GKE | `container.managed.denyServiceExternalIPs` | Require DenyServiceExternalIPs admission controller |
| GKE | `container.managed.disableABAC` | Reject enabling legacy ABAC |
| GKE | `container.managed.disableInsecureKubeletReadOnlyPort` | Keep kubelet read-only port 10255 disabled |
| GKE | `container.managed.disableLegacyClientCertificateIssuance` | Don't enable client certificate authentication |
| GKE | `container.managed.disableRBACSystemBindings` | Disable bindings to `system:anonymous` / `system:authenticated` / `system:unauthenticated` |
| GKE | `container.managed.disallowDefaultComputeServiceAccount` | Don't use the default Compute Engine SA for cluster / node pool |
| GKE | `container.managed.enableBinaryAuthorization` | Require Binary Authorization |
| GKE | `container.managed.enableCloudLogging` | Require at least default Cloud Logging |
| GKE | `container.managed.enableControlPlaneDNSOnlyAccess` | Require DNS-based endpoint, disable IP-based endpoints |
| GKE | `container.managed.enableGoogleGroupsRBAC` | Require Google Groups for RBAC |
| GKE | `container.managed.enableNetworkPolicy` | Require network policy enforcement or Dataplane V2 |
| GKE | `container.managed.enablePrivateNodes` | Require private nodes |
| GKE | `container.managed.enableSecretsEncryption` | Require secrets encryption with self-managed keys |
| GKE | `container.managed.enableSecurityBulletinNotifications` | Require Security Bulletin notifications |
| GKE | `container.managed.enableShieldedNodes` | Require Shielded Nodes |
| GKE | `container.managed.enableWorkloadIdentityFederation` | Require Workload Identity Federation for GKE |
| Dataflow | `dataflow.managed.blockProjectSshKeys` | Block project-wide SSH keys on worker VMs |
| Dataflow | `dataflow.managed.disableUsePublicIps` | Disable public IPs on worker VMs |
| Essential Contacts | `essentialcontacts.managed.allowedContactDomains` | `allowedDomains` list of the form `@example.com`; no effect on existing contacts |
| Multiple services | `gcp.managed.mcpAllowedServices` | Enforced by default with an empty list: no MCP endpoint can be enabled until services are allow-listed |
| IAM | `iam.managed.allowedPolicyMembers` | Organization principal sets allowed to be granted roles; your own organization is not automatically allowed; enforcing can block folder/project creation due to automatic Folder Admin/Editor and Owner grants |
| IAM | `iam.managed.disableServiceAccountApiKeyCreation` | Disables API keys bound to service accounts |
| IAM | `iam.managed.disableServiceAccountCreation` | Boolean; disables service account creation |
| IAM | `iam.managed.disableServiceAccountKeyCreation` | Blocks service account key creation |
| IAM | `iam.managed.disableServiceAccountKeyUpload` | Boolean; disables uploading public keys to service accounts |
| IAM | `iam.managed.preventPrivilegedBasicRolesForDefaultServiceAccounts` | Prevents granting Editor / Owner to Compute Engine and App Engine default SAs; can cause permission issues for services using them |
| IAM | `iam.managed.workloadIdentityPoolAwsAccounts` | Allowed AWS account IDs for workload identity federation |
| IAM | `iam.managed.workloadIdentityPoolProviders` | Allowed external identity providers (URIs) for workloads |
| Managed Kafka | `managedkafka.managed.disableKafkaConnectClusterCreateAndUpdate` | Boolean |
| Pub/Sub | `pubsub.managed.disableSubscriptionMessageTransforms`, `pubsub.managed.disableTopicMessageTransforms` | Assured Workloads constraints; do not configure manually |
| Cloud Run | `run.managed.requireInvokerIam` | Requires the IAM invoker check on Cloud Run services |
| Spanner | `spanner.managed.restrictCloudSpannerEditions` | Denied editions |

### Legacy managed constraints (names by service)

| Service | Constraints |
|---------|-------------|
| Vertex AI Workbench | `ainotebooks.accessMode` (list, `is:`), `ainotebooks.disableFileDownloads`, `ainotebooks.disableRootAccess`, `ainotebooks.disableTerminal`, `ainotebooks.environmentOptions` (list, VM `ainotebooks-vm/PROJECT_ID/IMAGE_TYPE/CONSTRAINED_VALUE`, container `ainotebooks-container/REPOSITORY:TAG`), `ainotebooks.requireAutoUpgradeSchedule`, `ainotebooks.restrictPublicIp`, `ainotebooks.restrictVpcNetworks` |
| Vertex AI | `vertexai.allowedGenAIModels`, `vertexai.allowedModels`, `vertexai.allowedPartnerModelFeatures`, `vertexai.disableGenAIGoogleSearchGrounding`, `vertexai.genAIGroundingSources` |
| App Engine | `appengine.disableCodeDownload`, `appengine.runtimeDeploymentExemption` |
| BigQuery | `bigquery.disableBQOmniAWS`, `bigquery.disableBQOmniAzure` |
| Cloud Build | `cloudbuild.allowedIntegrations`, `cloudbuild.disableCreateDefaultServiceAccount`, `cloudbuild.useBuildServiceAccount`, `cloudbuild.useComputeServiceAccount`, `cloudbuild.allowedWorkerPools` |
| Cloud Deploy | `clouddeploy.disableServiceLabelGeneration` |
| Cloud Run functions | `cloudfunctions.allowedIngressSettings`, `cloudfunctions.allowedVpcConnectorEgressSettings`, `cloudfunctions.requireVPCConnector`, `cloudfunctions.restrictAllowedGenerations` |
| Cloud KMS | `cloudkms.allowedProtectionLevels`, `cloudkms.disableBeforeDestroy`, `cloudkms.minimumDestroyScheduledDuration` |
| Cloud Scheduler | `cloudscheduler.allowedTargetTypes` |
| Cloud SQL | `sql.restrictAuthorizedNetworks`, `sql.restrictNoncompliantDiagnosticDataAccess`, `sql.restrictNoncompliantResourceCreation`, `sql.restrictPublicIp` |
| Marketplace | `commerceorggovernance.disablePublicMarketplace`, `commerceorggovernance.marketplaceServices` |
| Compute Engine (networking / policy) | `compute.allowedVlanAttachmentEncryption`, `compute.disableAllIpv6`, `compute.disableGlobalCloudArmorPolicy`, `compute.disableGlobalLoadBalancing`, `compute.disableGlobalSelfManagedSslCertificate`, `compute.disableGuestAttributesAccess`, `compute.disableHybridCloudIpv6`, `compute.disableInstanceDataAccessApis`, `compute.disableInternetNetworkEndpointGroup`, `compute.disablePrivateServiceConnectCreationForConsumers`, `compute.disableVpcExternalIpv6`, `compute.disableVpcInternalIpv6`, `compute.requireSslPolicy`, `compute.requireVpcFlowLogs`, `compute.restrictCloudNATUsage`, `compute.restrictCrossProjectServices`, `compute.restrictDedicatedInterconnectUsage`, `compute.restrictLoadBalancerCreationForTypes`, `compute.restrictPartnerInterconnectUsage`, `compute.restrictPrivateServiceConnectConsumer`, `compute.restrictPrivateServiceConnectProducer`, `compute.restrictProtocolForwardingCreationForTypes`, `compute.restrictSharedVpcBackendServices`, `compute.restrictSharedVpcHostProjects`, `compute.restrictSharedVpcSubnetworks`, `compute.restrictVpcPeering`, `compute.restrictVpnPeerIPs`, `compute.setNewProjectDefaultToZonalDNSOnly`, `compute.skipDefaultNetworkCreation` |
| Compute Engine (VM / storage) | `compute.disableGlobalSerialPortAccess`, `compute.disableNestedVirtualization`, `compute.disableNonFIPSMachineTypes`, `compute.disableSerialPortAccess`, `compute.disableSerialPortLogging`, `compute.disableSshInBrowser`, `compute.enableComplianceMemoryProtection`, `compute.requireBasicQuotaInResponse`, `compute.requireOsConfig`, `compute.requireOsLogin`, `compute.requireShieldedVm`, `compute.restrictNonConfidentialComputing`, `compute.sharedReservationsOwnerProjects`, `compute.storageResourceUseRestrictions`, `compute.trustedImageProjects`, `compute.vmCanIpForward`, `compute.vmExternalIpAccess` |
| IAP | `iap.requireGlobalIapWebDisabled`, `iap.requireRegionalIapWebDisabled` |
| GKE | `container.restrictNoncompliantDiagnosticDataAccess` |
| Dataform / Datastream | `dataform.restrictGitRemotes`, `datastream.disablePublicConnectivity` |
| Essential Contacts | `essentialcontacts.allowedContactDomains`, `essentialcontacts.disableProjectSecurityContacts` |
| Firestore | `firestore.requireP4SAforImportExport` |
| Healthcare API | `gcp.disableCloudLogging` |
| IAM | `iam.allowServiceAccountCredentialLifetimeExtension`, `iam.allowedPolicyMemberDomains` (domain restricted sharing), `iam.disableAuditLoggingExemption`, `iam.disableCrossProjectServiceAccountUsage`, `iam.disableServiceAccountCreation`, `iam.disableServiceAccountKeyCreation`, `iam.disableServiceAccountKeyUpload`, `iam.disableWorkloadIdentityClusterCreation`, `iam.serviceAccountKeyExpiryHours`, `iam.serviceAccountKeyExposureResponse`, `iam.workloadIdentityPoolAwsAccounts`, `iam.workloadIdentityPoolProviders`, `iam.automaticIamGrantsForDefaultServiceAccounts`, `iam.restrictCrossProjectServiceAccountLienRemoval` |
| Cloud Service Mesh | `meshconfig.allowedVpcscModes` |
| VM Manager | `osconfig.restrictInlineScriptAndOutputFileUsage` |
| Pub/Sub | `pubsub.enforceInTransitRegions` |
| Resource Manager | `compute.restrictXpnProjectLienRemoval`, `resourcemanager.accessBoundaries`, `resourcemanager.allowEnabledServicesForExport`, `resourcemanager.allowedExportDestinations`, `resourcemanager.allowedImportSources` |
| Cloud Run | `run.allowedBinaryAuthorizationPolicies`, `run.allowedIngress`, `run.allowedVPCEgress` |
| Multiple services | `gcp.resourceLocations`, `gcp.restrictCmekCryptoKeyProjects`, `gcp.restrictEndpointUsage`, `gcp.restrictNonCmekServices`, `gcp.restrictServiceUsage`, `gcp.restrictTLSCipherSuites`, `gcp.restrictTLSVersion`, `serviceuser.services` |
| Spanner | `spanner.assuredWorkloadsAdvancedServiceControls`, `spanner.disableMultiRegionInstanceIfNoLocationSelected` |
| Cloud Storage | `gcp.detailedAuditLoggingMode`, `storage.publicAccessPrevention`, `storage.restrictAuthTypes`, `storage.retentionPolicySeconds`, `storage.secureHttpTransport`, `storage.softDeletePolicySeconds`, `storage.uniformBucketLevelAccess` |

## Notes

- Many managed constraints are Public Preview; exempt individual VMs by tagging them and using conditional rules (see `tags-condition.md`).
- Enforcing `iam.managed.allowedPolicyMembers` or the Editor/Owner default-SA constraint can block folder / project creation or break services that use default service accounts; test with dry-run first.
- Retired or renamed legacy names (for example `constraints/compute.disableSerialPortAccess` vs `compute.managed.disableSerialPortAccess`) coexist; managed constraints are designed to replace legacy equivalents.
- Constraints mentioned in the task scope that carry their own guides: domain restricted sharing, service accounts, locations, resource usage restriction (see `domain-restricted-sharing.md`, `service-account-constraints.md`, `resource-locations.md`, `resource-service-usage.md`). KMS / CMEK constraints (`gcp.restrictNonCmekServices`, `gcp.restrictCmekCryptoKeyProjects`, `cloudkms.*`) are used with gcp-security.
- Source: https://docs.cloud.google.com/resource-manager/docs/organization-policy/org-policy-constraints
- Retrieved 2026-11-14. Content is CC BY 4.0; code examples are Apache 2.0.

## Related

- [overview.md](./overview.md)
- [using-constraints.md](./using-constraints.md)
- [domain-restricted-sharing.md](./domain-restricted-sharing.md)
- [service-account-constraints.md](./service-account-constraints.md)
- [resource-locations.md](./resource-locations.md)
- [resource-service-usage.md](./resource-service-usage.md)
