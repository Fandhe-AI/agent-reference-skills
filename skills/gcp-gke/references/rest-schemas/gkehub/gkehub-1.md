---
source: https://gkehub.googleapis.com/$discovery/rest?version=v2
---

# GKE Hub API message schemas (gkehub) (part 1/2)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/gkehub/`.

### `AppDevExperienceFeatureSpec`

- Spec for App Dev Experience Feature.
- Version: v1

### `AppDevExperienceFeatureState`

- State for App Dev Exp Feature.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `networkingInstallSucceeded` | Status | Status of subcomponent that detects configured Service Mesh resources. |

### `AppDevExperienceState`

- State for App Dev Exp Feature.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `networkingInstallSucceeded` | AppDevExperienceStatus | Status of subcomponent that detects configured Service Mesh resources. |

### `AppDevExperienceStatus`

- Status specifies state for the subcomponent.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `code` | string enum | Code specifies AppDevExperienceFeature's subcomponent ready state. Values: `CODE_UNSPECIFIED`, `OK`, `FAILED`, `UNKNOWN`. |
| `description` | string | Description is populated if Code is Failed, explaining why it has failed. |

### `ApplianceCluster`

- ApplianceCluster contains information specific to GDC Edge Appliance Clusters.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `resourceLink` | string | Immutable. Self-link of the Google Cloud resource for the Appliance Cluster. For example: //transferappliance.googleapis.com/projects/my-project/locations/us-west1-a/appliances/my-appliance |

### `AuditConfig`

- Specifies the audit configuration for a service. The configuration determines which permission types are logged, and what identities, if any, are exempted from logging. An AuditConfig must have one or more AuditLogConfigs. If there are AuditConfigs for both `allServices` and a specific service, the union of the two AuditConfigs is used for that service: the log_types specified in each AuditConfig are enabled, and the exempted_members in each AuditLogConfig are exempted. Example Policy with multiple AuditConfigs: { "audit_configs": \[ { "service": "allServices", "audit_log_configs": \[ { "log_type": "DATA_READ", "exempted_members": \[ "user:jose@example.com" \] }, { "log_type": "DATA_WRITE" }, { "log_type": "ADMIN_READ" } \] }, { "service": "sampleservice.googleapis.com", "audit_log_configs": \[ { "log_type": "DATA_READ" }, { "log_type": "DATA_WRITE", "exempted_members": \[ "user:aliya@example.com" \] } \] } \] } For sampleservice, this policy enables DATA_READ, DATA_WRITE and ADMIN_READ logging. It also exempts `jose@example.com` from DATA_READ logging, and `aliya@example.com` from DATA_WRITE logging.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `auditLogConfigs` | array<AuditLogConfig> | The configuration for logging of each type of permission. |
| `service` | string | Specifies a service that will be enabled for audit logging. For example, `storage.googleapis.com`, `cloudsql.googleapis.com`. `allServices` is a special value that covers all services. |

### `AuditLogConfig`

- Provides the configuration for logging a type of permissions. Example: { "audit_log_configs": \[ { "log_type": "DATA_READ", "exempted_members": \[ "user:jose@example.com" \] }, { "log_type": "DATA_WRITE" } \] } This enables 'DATA_READ' and 'DATA_WRITE' logging, while exempting jose@example.com from DATA_READ logging.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `exemptedMembers` | array<string> | Specifies the identities that do not cause logging for this type of permission. Follows the same format of Binding.members. |
| `logType` | string enum | The log type that this config enables. Values: `LOG_TYPE_UNSPECIFIED`, `ADMIN_READ`, `DATA_WRITE`, `DATA_READ`. |

### `Authority`

- Authority encodes how Google will recognize identities from this Membership. See the workload identity documentation for more details: https://cloud.google.com/kubernetes-engine/docs/how-to/workload-identity
- Version: v1

| Field | Type | Description |
|---|---|---|
| `identityProvider` | string | Output only. An identity provider that reflects the `issuer` in the workload identity pool. |
| `issuer` | string | Optional. A JSON Web Token (JWT) issuer URI. `issuer` must start with `https://` and be a valid URL with length <2000 characters, it must use `location` rather than `zone` for GKE clusters. If set, then Google will allow valid OIDC tokens from this issuer to authenticate within the workload_identity_pool. OIDC discovery will be performed on this URI to validate tokens from the issuer. Clearing `issuer` disables Workload Identity. `issuer` cannot be directly modified; it must be cleared (and Workload Identity disabled) before using a new issuer (and re-enabling Workload Identity). |
| `oidcJwks` | string (byte) | Optional. OIDC verification keys for this Membership in JWKS format (RFC 7517). When this field is set, OIDC discovery will NOT be performed on `issuer`, and instead OIDC tokens will be validated using this field. |
| `scopeTenancyIdentityProvider` | string | Optional. Output only. The identity provider for the scope-tenancy workload identity pool. |
| `scopeTenancyWorkloadIdentityPool` | string | Optional. Output only. The name of the scope-tenancy workload identity pool. This pool is set in the fleet-level feature. |
| `workloadIdentityPool` | string | Output only. The name of the workload identity pool in which `issuer` will be recognized. There is a single Workload Identity Pool per Hub that is shared between all Memberships that belong to that Hub. For a Hub hosted in {PROJECT_ID}, the workload pool format is `{PROJECT_ID}.hub.id.goog`, although this is subject to change in newer versions of this API. |

### `AutoUpgradeConfig`

- Configuration for automatic upgrades.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enforcedRollouts` | object | Output only. Mandatory Safety Policies (Always active) which cannot be disabled. The key is the policy ID (e.g., "ENFORCED_CONTROL_PLANE_PATCH") and the value is a human-readable description. |
| `rolloutCreationScope` | RolloutCreationScope | Optional. Specifies the scope of automation for the creation of rollouts. Represents the types of rollouts (version upgrades) the sequence should initiate automatically. If this field is `unset`, it defaults to all types. If this field is `set` but the internal `upgrade_types` list is `empty`, most automatic rollouts are disabled for this sequence. Exceptions are rollouts enforcing our security policies (e.g. such as end-of-support and outdated control plane patch enforcements). These policy enforcements cannot be disabled. |

### `BinaryAuthorizationConfig`

- BinaryAuthorizationConfig defines the fleet level configuration of binary authorization feature.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `evaluationMode` | string enum | Optional. Mode of operation for binauthz policy evaluation. Values: `EVALUATION_MODE_UNSPECIFIED`, `DISABLED`, `POLICY_BINDINGS`. |
| `policyBindings` | array<PolicyBinding> | Optional. Binauthz policies that apply to this cluster. |

### `Binding`

- Associates `members`, or principals, with a `role`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `condition` | Expr | The condition that is associated with this binding. If the condition evaluates to `true`, then this binding applies to the current request. If the condition evaluates to `false`, then this binding does not apply to the current request. However, a different role binding might grant the same role to one or more of the principals in this binding. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |
| `members` | array<string> | Specifies the principals requesting access for a Google Cloud resource. `members` can have the following values: \* `allUsers`: A special identifier that represents anyone who is on the internet; with or without a Google account. \* `allAuthenticatedUsers`: A special identifier that represents anyone who is authenticated with a Google account or a service account. Does not include identities that come from external identity providers (IdPs) through identity federation. \* `user:{emailid}`: An email address that represents a specific Google account. For example, `alice@example.com` . \* `serviceAccount:{emailid}`: An email address that represents a Google service account. For example, `my-other-app@appspot.gserviceaccount.com`. \* `serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]`: An identifier for a Kubernetes service account (https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts). For example, `my-project.svc.id.goog[my-namespace/my-kubernetes-sa]`. \* `group:{emailid}`: An email address that represents a Google group. For example, `admins@example.com`. \* `domain:{domain}`: The G Suite domain (primary) that represents all the users of that domain. For example, `google.com` or `example.com`. \* `principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workforce identity pool. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/group/{group_id}`: All workforce identities in a group. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All workforce identities with a specific attribute value. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/*`: All identities in a workforce identity pool. \* `principal://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workload identity pool. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/group/{group_id}`: A workload identity pool group. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All identities in a workload identity pool with a certain attribute. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/*`: All identities in a workload identity pool. \* `deleted:user:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a user that has been recently deleted. For example, `alice@example.com?uid=123456789012345678901`. If the user is recovered, this value reverts to `user:{emailid}` and the recovered user retains the role in the binding. \* `deleted:serviceAccount:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a service account that has been recently deleted. For example, `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901`. If the service account is undeleted, this value reverts to `serviceAccount:{emailid}` and the undeleted service account retains the role in the binding. \* `deleted:group:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a Google group that has been recently deleted. For example, `admins@example.com?uid=123456789012345678901`. If the group is recovered, this value reverts to `group:{emailid}` and the recovered group retains the role in the binding. \* `deleted:principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: Deleted single identity in a workforce identity pool. For example, `deleted:principal://iam.googleapis.com/locations/global/workforcePools/my-pool-id/subject/my-subject-attribute-value`. |
| `role` | string | Role that is assigned to the list of `members`, or principals. For example, `roles/viewer`, `roles/editor`, or `roles/owner`. For an overview of the IAM roles and permissions, see the IAM documentation (https://cloud.google.com/iam/docs/roles-overview). For a list of the available pre-defined roles, see here (https://cloud.google.com/iam/docs/understanding-roles). |

### `CancelOperationRequest`

- The request message for Operations.CancelOperation.
- Version: v2

### `CancelRolloutRequest`

- Request message for cancelling a rollout.
- Version: v1

### `CloudAuditLoggingFeatureSpec`

- \*\*Cloud Audit Logging\*\*: Spec for Audit Logging Allowlisting.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `allowlistedServiceAccounts` | array<string> | Service account that should be allowlisted to send the audit logs; eg cloudauditlogging@gcp-project.iam.gserviceaccount.com. These accounts must already exist, but do not need to have any permissions granted to them. The customer's entitlements will be checked prior to allowlisting (i.e. the customer must be an Anthos customer.) |

### `CloudBuildMembershipSpec`

- \*\*Cloud Build\*\*: Configurations for each Cloud Build enabled cluster.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `securityPolicy` | string enum | Whether it is allowed to run the privileged builds on the cluster or not. Values: `SECURITY_POLICY_UNSPECIFIED`, `NON_PRIVILEGED`, `PRIVILEGED`. |
| `version` | string | Version of the cloud build software on the cluster. |

### `CloudBuildSpec`

- \*\*Cloud Build\*\*: Configurations for each Cloud Build enabled cluster.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `securityPolicy` | string enum | Whether it is allowed to run the privileged builds on the cluster or not. Values: `SECURITY_POLICY_UNSPECIFIED`, `NON_PRIVILEGED`, `PRIVILEGED`. |
| `version` | string | Version of the cloud build software on the cluster. |

### `ClusterSelector`

- Selector for clusters.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `labelSelector` | string | Required. A valid CEL (Common Expression Language) expression which evaluates `resource.labels`. |

### `ClusterUpgradeFleetSpec`

- \*\*ClusterUpgrade\*\*: The configuration for the fleet-level ClusterUpgrade feature.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `gkeUpgradeOverrides` | array<ClusterUpgradeGKEUpgradeOverride> | Allow users to override some properties of each GKE upgrade. |
| `postConditions` | ClusterUpgradePostConditions | Required. Post conditions to evaluate to mark an upgrade COMPLETE. Required. |
| `upstreamFleets` | array<string> | This fleet consumes upgrades that have COMPLETE status code in the upstream fleets. See UpgradeStatus.Code for code definitions. The fleet name should be either fleet project number or id. This is defined as repeated for future proof reasons. Initial implementation will enforce at most one upstream fleet. |

### `ClusterUpgradeFleetSpec` (v1alpha)

- \*\*ClusterUpgrade\*\*: The configuration for the fleet-level ClusterUpgrade feature.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `gkeUpgradeOverrides` | array<ClusterUpgradeGKEUpgradeOverride> | Allow users to override some properties of each GKE upgrade. |
| `postConditions` | ClusterUpgradePostConditions | Required. Post conditions to evaluate to mark an upgrade COMPLETE. Required. |
| `upgradeEngine` | string enum | Output only. The effective upgrade engine for the fleet. Values: `UPGRADE_ENGINE_UNSPECIFIED`, `SEQUENCING_V1`, `SEQUENCING_V2`. |
| `upstreamFleets` | array<string> | This fleet consumes upgrades that have COMPLETE status code in the upstream fleets. See UpgradeStatus.Code for code definitions. The fleet name should be either fleet project number or id. This is defined as repeated for future proof reasons. Initial implementation will enforce at most one upstream fleet. |

### `ClusterUpgradeFleetState`

- \*\*ClusterUpgrade\*\*: The state for the fleet-level ClusterUpgrade feature.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `downstreamFleets` | array<string> | This fleets whose upstream_fleets contain the current fleet. The fleet name should be either fleet project number or id. |
| `gkeState` | ClusterUpgradeGKEUpgradeFeatureState | Feature state for GKE clusters. |
| `ignored` | object | A list of memberships ignored by the feature. For example, manually upgraded clusters can be ignored if they are newer than the default versions of its release channel. The membership resource is in the format: `projects/{p}/locations/{l}/membership/{m}`. |

### `ClusterUpgradeGKEUpgrade`

- GKEUpgrade represents a GKE provided upgrade, e.g., control plane upgrade.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `name` | string | Name of the upgrade, e.g., "k8s_control_plane". |
| `version` | string | Version of the upgrade, e.g., "1.22.1-gke.100". |

### `ClusterUpgradeGKEUpgradeFeatureCondition`

- GKEUpgradeFeatureCondition describes the condition of the feature for GKE clusters at a certain point of time.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `reason` | string | Reason why the feature is in this status. |
| `status` | string | Status of the condition, one of True, False, Unknown. |
| `type` | string | Type of the condition, for example, "ready". |
| `updateTime` | string (google-datetime) | Last timestamp the condition was updated. |

### `ClusterUpgradeGKEUpgradeFeatureState`

- GKEUpgradeFeatureState contains feature states for GKE clusters in the scope.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `conditions` | array<ClusterUpgradeGKEUpgradeFeatureCondition> | Current conditions of the feature. |
| `upgradeState` | array<ClusterUpgradeGKEUpgradeState> | Upgrade state. It will eventually replace `state`. |

### `ClusterUpgradeGKEUpgradeOverride`

- Properties of a GKE upgrade that can be overridden by the user. For example, a user can skip soaking by overriding the soaking to 0.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `postConditions` | ClusterUpgradePostConditions | Required. Post conditions to override for the specified upgrade (name + version). Required. |
| `upgrade` | ClusterUpgradeGKEUpgrade | Required. Which upgrade to override. Required. |

### `ClusterUpgradeGKEUpgradeState`

- GKEUpgradeState is a GKEUpgrade and its state at the scope and fleet level.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `stats` | object | Number of GKE clusters in each status code. |
| `status` | ClusterUpgradeUpgradeStatus | Status of the upgrade. |
| `upgrade` | ClusterUpgradeGKEUpgrade | Which upgrade to track the state. |

### `ClusterUpgradeIgnoredMembership`

- IgnoredMembership represents a membership ignored by the feature. A membership can be ignored because it was manually upgraded to a newer version than RC default.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `ignoredTime` | string (google-datetime) | Time when the membership was first set to ignored. |
| `reason` | string | Reason why the membership is ignored. |

### `ClusterUpgradeMembershipGKEUpgradeState`

- MembershipGKEUpgradeState is a GKEUpgrade and its state per-membership.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `status` | ClusterUpgradeUpgradeStatus | Status of the upgrade. |
| `upgrade` | ClusterUpgradeGKEUpgrade | Which upgrade to track the state. |

### `ClusterUpgradeMembershipState`

- Per-membership state for this feature.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `ignored` | ClusterUpgradeIgnoredMembership | Whether this membership is ignored by the feature. For example, manually upgraded clusters can be ignored if they are newer than the default versions of its release channel. |
| `upgrades` | array<ClusterUpgradeMembershipGKEUpgradeState> | Actual upgrade state against desired. |

### `ClusterUpgradeMembershipState` (v1alpha)

- Per-membership state for this feature.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `ignored` | ClusterUpgradeIgnoredMembership | Whether this membership is ignored by the feature. For example, manually upgraded clusters can be ignored if they are newer than the default versions of its release channel. |
| `scopes` | array<string> | Fully qualified scope names that this clusters is bound to which also have rollout sequencing enabled. |
| `upgrades` | array<ClusterUpgradeMembershipGKEUpgradeState> | Actual upgrade state against desired. |

### `ClusterUpgradePostConditions`

- Post conditional checks after an upgrade has been applied on all eligible clusters.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `soaking` | string (google-duration) | Required. Amount of time to "soak" after a rollout has been finished before marking it COMPLETE. Cannot exceed 30 days. Required. |

### `ClusterUpgradeScopeSpec`

- \*\*ClusterUpgrade\*\*: The configuration for the scope-level ClusterUpgrade feature.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `gkeUpgradeOverrides` | array<ClusterUpgradeGKEUpgradeOverride> | Allow users to override some properties of each GKE upgrade. |
| `postConditions` | ClusterUpgradePostConditions | Required. Post conditions to evaluate to mark an upgrade COMPLETE. Required. |
| `upstreamScopes` | array<string> | This scope consumes upgrades that have COMPLETE status code in the upstream scopes. See UpgradeStatus.Code for code definitions. The scope name should be in the form: `projects/{p}/locations/global/scopes/{s}` Where {p} is the project, {s} is a valid Scope in this project. {p} WILL match the Feature's project. This is defined as repeated for future proof reasons. Initial implementation will enforce at most one upstream scope. |

### `ClusterUpgradeScopeState`

- \*\*ClusterUpgrade\*\*: The state for the scope-level ClusterUpgrade feature.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `downstreamScopes` | array<string> | This scopes whose upstream_scopes contain the current scope. The scope name should be in the form: `projects/{p}/locations/gloobal/scopes/{s}` Where {p} is the project, {s} is a valid Scope in this project. {p} WILL match the Feature's project. |
| `gkeState` | ClusterUpgradeGKEUpgradeFeatureState | Feature state for GKE clusters. |
| `ignored` | object | A list of memberships ignored by the feature. For example, manually upgraded clusters can be ignored if they are newer than the default versions of its release channel. The membership resource is in the format: `projects/{p}/locations/{l}/membership/{m}`. |

### `ClusterUpgradeState`

- Per-membership state for this feature.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `ignored` | ClusterUpgradeIgnoredMembership | Whether this membership is ignored by the feature. For example, manually upgraded clusters can be ignored if they are newer than the default versions of its release channel. |
| `upgrades` | array<ClusterUpgradeMembershipGKEUpgradeState> | Actual upgrade state against desired. |

### `ClusterUpgradeUpgradeStatus`

- UpgradeStatus provides status information for each upgrade.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `code` | string enum | Status code of the upgrade. Values: `CODE_UNSPECIFIED`, `INELIGIBLE`, `PENDING`, `IN_PROGRESS`, `SOAKING`, `FORCED_SOAKING`, `COMPLETE`. |
| `reason` | string | Reason for this status. |
| `updateTime` | string (google-datetime) | Last timestamp the status was updated. |

### `CommonFeatureSpec`

- CommonFeatureSpec contains Fleet-wide configuration information
- Version: v1

| Field | Type | Description |
|---|---|---|
| `appdevexperience` | AppDevExperienceFeatureSpec | Appdevexperience specific spec. |
| `clusterupgrade` | ClusterUpgradeFleetSpec | ClusterUpgrade (fleet-based) feature spec. |
| `dataplanev2` | DataplaneV2FeatureSpec | DataplaneV2 feature spec. |
| `fleetobservability` | FleetObservabilityFeatureSpec | FleetObservability feature spec. |
| `mesh` | ServiceMeshFeatureSpec | Servicemesh feature spec. |
| `multiclusteringress` | MultiClusterIngressFeatureSpec | Multicluster Ingress-specific spec. |
| `rbacrolebindingactuation` | RBACRoleBindingActuationFeatureSpec | RBAC Role Binding Actuation feature spec |
| `workloadidentity` | WorkloadIdentityFeatureSpec | Workload Identity feature spec. |

### `CommonFeatureSpec` (v1alpha)

- CommonFeatureSpec contains Fleet-wide configuration information
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `appdevexperience` | AppDevExperienceFeatureSpec | Appdevexperience specific spec. |
| `cloudauditlogging` | CloudAuditLoggingFeatureSpec | Cloud Audit Logging-specific spec. |
| `clusterupgrade` | ClusterUpgradeFleetSpec | ClusterUpgrade (fleet-based) feature spec. |
| `dataplanev2` | DataplaneV2FeatureSpec | DataplaneV2 feature spec. |
| `fleetobservability` | FleetObservabilityFeatureSpec | FleetObservability feature spec. |
| `mesh` | ServiceMeshFeatureSpec | Servicemesh feature spec. |
| `multiclusteringress` | MultiClusterIngressFeatureSpec | Multicluster Ingress-specific spec. |
| `namespaceactuation` | NamespaceActuationFeatureSpec | Namespace Actuation feature spec |
| `rbacrolebindingactuation` | RBACRoleBindingActuationFeatureSpec | RBAC Role Binding Actuation feature spec |
| `workloadcertificate` | FeatureSpec | Workload Certificate spec. |
| `workloadidentity` | WorkloadIdentityFeatureSpec | Workload Identity feature spec. |

### `CommonFeatureState`

- CommonFeatureState contains Fleet-wide Feature status information.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `appdevexperience` | AppDevExperienceFeatureState | Appdevexperience specific state. |
| `clusterupgrade` | ClusterUpgradeFleetState | ClusterUpgrade fleet-level state. |
| `fleetobservability` | FleetObservabilityFeatureState | FleetObservability feature state. |
| `rbacrolebindingactuation` | RBACRoleBindingActuationFeatureState | RBAC Role Binding Actuation feature state |
| `servicemesh` | ServiceMeshFeatureState | Service Mesh-specific state. |
| `state` | FeatureState | Output only. The "running state" of the Feature in this Fleet. |
| `workloadidentity` | WorkloadIdentityFeatureState | WorkloadIdentity fleet-level state. |

### `CommonFeatureState` (v1alpha)

- CommonFeatureState contains Fleet-wide Feature status information.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `appdevexperience` | AppDevExperienceFeatureState | Appdevexperience specific state. |
| `clusterupgrade` | ClusterUpgradeFleetState | ClusterUpgrade fleet-level state. |
| `fleetobservability` | FleetObservabilityFeatureState | FleetObservability feature state. |
| `namespaceactuation` | NamespaceActuationFeatureState | Namespace Actuation feature state. |
| `rbacrolebindingactuation` | RBACRoleBindingActuationFeatureState | RBAC Role Binding Actuation feature state |
| `servicemesh` | ServiceMeshFeatureState | Service Mesh-specific state. |
| `state` | FeatureState | Output only. The "running state" of the Feature in this Fleet. |
| `workloadidentity` | WorkloadIdentityFeatureState | WorkloadIdentity fleet-level state. |

### `CommonFleetDefaultMemberConfigSpec`

- CommonFleetDefaultMemberConfigSpec contains default configuration information for memberships of a fleet
- Version: v1

| Field | Type | Description |
|---|---|---|
| `configmanagement` | ConfigManagementMembershipSpec | Config Management-specific spec. |
| `identityservice` | IdentityServiceMembershipSpec | Identity Service-specific spec. |
| `mesh` | ServiceMeshMembershipSpec | Anthos Service Mesh-specific spec |
| `policycontroller` | PolicyControllerMembershipSpec | Policy Controller spec. |

### `CompliancePostureConfig`

- Deprecated: Compliance Posture is no longer supported. For more details, see https://cloud.google.com/kubernetes-engine/docs/deprecations/posture-management-deprecation. CompliancePostureConfig defines the settings needed to enable/disable features for the Compliance Posture.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `complianceStandards` | array<ComplianceStandard> | List of enabled compliance standards. |
| `mode` | string enum | Defines the enablement mode for Compliance Posture. Values: `MODE_UNSPECIFIED`, `DISABLED`, `ENABLED`. |

### `ComplianceStandard`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `standard` | string | Name of the compliance standard. |

### `ConfigManagementBinauthzConfig`

- Configuration for Binauthz.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `enabled` | boolean | Whether binauthz is enabled in this cluster. |

### `ConfigManagementBinauthzState`

- State for Binauthz.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `version` | ConfigManagementBinauthzVersion | The version of binauthz that is installed. |
| `webhook` | string enum | The state of the binauthz webhook. Values: `DEPLOYMENT_STATE_UNSPECIFIED`, `NOT_INSTALLED`, `INSTALLED`, `ERROR`, `PENDING`. |

### `ConfigManagementBinauthzVersion`

- The version of binauthz.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `webhookVersion` | string | The version of the binauthz webhook. |

### `ConfigManagementConfigSync`

- Configuration for Config Sync
- Version: v2

| Field | Type | Description |
|---|---|---|
| `deploymentOverrides` | array<ConfigManagementDeploymentOverride> | Optional. Configuration for deployment overrides. Applies only to Config Sync deployments with containers that are not a root or namespace reconciler: `reconciler-manager`, `otel-collector`, `resource-group-controller-manager`, `admission-webhook`. To override a root or namespace reconciler, use the rootsync or reposync fields at https://docs.cloud.google.com/kubernetes-engine/config-sync/docs/reference/rootsync-reposync-fields#override-resources instead. |
| `enabled` | boolean | Optional. Enables the installation of Config Sync. If set to true, the Feature will manage Config Sync resources, and apply the other ConfigSync fields if they exist. If set to false, the Feature will ignore all other ConfigSync fields and delete the Config Sync resources. If omitted, ConfigSync is considered enabled if the git or oci field is present. |
| `git` | ConfigManagementGitConfig | Optional. Git repo configuration for the cluster. |
| `metricsGcpServiceAccountEmail` | string | Optional. The Email of the Google Cloud Service Account (GSA) used for exporting Config Sync metrics to Cloud Monitoring and Cloud Monarch when Workload Identity is enabled. The GSA should have the Monitoring Metric Writer (roles/monitoring.metricWriter) IAM role. The Kubernetes ServiceAccount `default` in the namespace `config-management-monitoring` should be bound to the GSA. Deprecated: If Workload Identity Federation for GKE is enabled, Google Cloud Service Account is no longer needed for exporting Config Sync metrics: https://cloud.google.com/kubernetes-engine/enterprise/config-sync/docs/how-to/monitor-config-sync-cloud-monitoring#custom-monitoring. |
| `oci` | ConfigManagementOciConfig | Optional. OCI repo configuration for the cluster. |
| `preventDrift` | boolean | Optional. Set to true to enable the Config Sync admission webhook to prevent drifts. If set to false, disables the Config Sync admission webhook and does not prevent drifts. Defaults to false. See https://docs.cloud.google.com/kubernetes-engine/config-sync/docs/how-to/prevent-config-drift for details. |
| `sourceFormat` | string | Optional. Specifies whether the Config Sync repo is in `hierarchy` or `unstructured` mode. Defaults to `hierarchy`. See https://docs.cloud.google.com/kubernetes-engine/config-sync/docs/concepts/configs#organize-configs for an explanation. |
| `stopSyncing` | boolean | Optional. Set to true to stop syncing configs for a single cluster. Default to false. |

### `ConfigManagementConfigSyncDeploymentState`

- The state of ConfigSync's deployment on a cluster.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `admissionWebhook` | string enum | Deployment state of admission-webhook. Values: `DEPLOYMENT_STATE_UNSPECIFIED`, `NOT_INSTALLED`, `INSTALLED`, `ERROR`, `PENDING`. |
| `gitSync` | string enum | Deployment state of the git-sync pod. Values: `DEPLOYMENT_STATE_UNSPECIFIED`, `NOT_INSTALLED`, `INSTALLED`, `ERROR`, `PENDING`. |
| `importer` | string enum | Deployment state of the importer pod. Values: `DEPLOYMENT_STATE_UNSPECIFIED`, `NOT_INSTALLED`, `INSTALLED`, `ERROR`, `PENDING`. |
| `monitor` | string enum | Deployment state of the monitor pod. Values: `DEPLOYMENT_STATE_UNSPECIFIED`, `NOT_INSTALLED`, `INSTALLED`, `ERROR`, `PENDING`. |
| `otelCollector` | string enum | Deployment state of otel-collector Values: `DEPLOYMENT_STATE_UNSPECIFIED`, `NOT_INSTALLED`, `INSTALLED`, `ERROR`, `PENDING`. |
| `reconcilerManager` | string enum | Deployment state of reconciler-manager pod. Values: `DEPLOYMENT_STATE_UNSPECIFIED`, `NOT_INSTALLED`, `INSTALLED`, `ERROR`, `PENDING`. |
| `resourceGroupControllerManager` | string enum | Deployment state of resource-group-controller-manager Values: `DEPLOYMENT_STATE_UNSPECIFIED`, `NOT_INSTALLED`, `INSTALLED`, `ERROR`, `PENDING`. |
| `rootReconciler` | string enum | Deployment state of root-reconciler. Values: `DEPLOYMENT_STATE_UNSPECIFIED`, `NOT_INSTALLED`, `INSTALLED`, `ERROR`, `PENDING`. |
| `syncer` | string enum | Deployment state of the syncer pod. Values: `DEPLOYMENT_STATE_UNSPECIFIED`, `NOT_INSTALLED`, `INSTALLED`, `ERROR`, `PENDING`. |

### `ConfigManagementConfigSyncError`

- Errors pertaining to the installation of Config Sync
- Version: v2

| Field | Type | Description |
|---|---|---|
| `errorMessage` | string | A string representing the user facing error message |

### `ConfigManagementConfigSyncState`

- State information for ConfigSync.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `clusterLevelStopSyncingState` | string enum | Output only. Whether syncing resources to the cluster is stopped at the cluster level. Values: `STOP_SYNCING_STATE_UNSPECIFIED`, `NOT_STOPPED`, `PENDING`, `STOPPED`. |
| `crCount` | integer (int32) | Output only. The number of RootSync and RepoSync CRs in the cluster. |
| `deploymentState` | ConfigManagementConfigSyncDeploymentState | Output only. Information about the deployment of ConfigSync, including the version. of the various Pods deployed |
| `errors` | array<ConfigManagementConfigSyncError> | Output only. Errors pertaining to the installation of Config Sync. |
| `reposyncCrd` | string enum | Output only. The state of the Reposync CRD Values: `CRD_STATE_UNSPECIFIED`, `NOT_INSTALLED`, `INSTALLED`, `TERMINATING`, `INSTALLING`. |
| `rootsyncCrd` | string enum | Output only. The state of the RootSync CRD Values: `CRD_STATE_UNSPECIFIED`, `NOT_INSTALLED`, `INSTALLED`, `TERMINATING`, `INSTALLING`. |
| `state` | string enum | Output only. The state of CS This field summarizes the other fields in this message. Values: `STATE_UNSPECIFIED`, `CONFIG_SYNC_NOT_INSTALLED`, `CONFIG_SYNC_INSTALLED`, `CONFIG_SYNC_ERROR`, `CONFIG_SYNC_PENDING`. |
| `syncState` | ConfigManagementSyncState | Output only. The state of ConfigSync's process to sync configs to a cluster. |
| `version` | ConfigManagementConfigSyncVersion | Output only. The version of ConfigSync deployed. |

### `ConfigManagementConfigSyncVersion`

- Specific versioning information pertaining to ConfigSync's Pods.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `admissionWebhook` | string | Version of the deployed admission-webhook pod. |
| `gitSync` | string | Version of the deployed git-sync pod. |
| `importer` | string | Version of the deployed importer pod. |
| `monitor` | string | Version of the deployed monitor pod. |
| `otelCollector` | string | Version of the deployed otel-collector pod |
| `reconcilerManager` | string | Version of the deployed reconciler-manager pod. |
| `resourceGroupControllerManager` | string | Version of the deployed resource-group-controller-manager pod |
| `rootReconciler` | string | Version of the deployed reconciler container in root-reconciler pod. |
| `syncer` | string | Version of the deployed syncer pod. |

### `ConfigManagementContainerOverride`

- Configuration for a container override.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `containerName` | string | Required. The name of the container. |
| `cpuLimit` | string | Optional. The cpu limit of the container. Use the following CPU resource units: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#meaning-of-cpu. |
| `cpuRequest` | string | Optional. The cpu request of the container. Use the following CPU resource units: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#meaning-of-cpu. |
| `memoryLimit` | string | Optional. The memory limit of the container. Use the following memory resource units: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#meaning-of-memory. |
| `memoryRequest` | string | Optional. The memory request of the container. Use the following memory resource units: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#meaning-of-memory. |

### `ConfigManagementDeploymentOverride`

- Configuration for a deployment override.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `containers` | array<ConfigManagementContainerOverride> | Optional. The containers of the deployment resource to be overridden. |
| `deploymentName` | string | Required. The name of the deployment resource to be overridden. |
| `deploymentNamespace` | string | Required. The namespace of the deployment resource to be overridden. |

### `ConfigManagementErrorResource`

- Model for a config file in the git repo with an associated Sync error.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `resourceGvk` | ConfigManagementGroupVersionKind | Group/version/kind of the resource that is causing an error |
| `resourceName` | string | Metadata name of the resource that is causing an error |
| `resourceNamespace` | string | Namespace of the resource that is causing an error |
| `sourcePath` | string | Path in the git repo of the erroneous config |

### `ConfigManagementGatekeeperDeploymentState`

- State of Policy Controller installation.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `gatekeeperAudit` | string enum | Status of gatekeeper-audit deployment. Values: `DEPLOYMENT_STATE_UNSPECIFIED`, `NOT_INSTALLED`, `INSTALLED`, `ERROR`, `PENDING`. |
| `gatekeeperControllerManagerState` | string enum | Status of gatekeeper-controller-manager pod. Values: `DEPLOYMENT_STATE_UNSPECIFIED`, `NOT_INSTALLED`, `INSTALLED`, `ERROR`, `PENDING`. |
| `gatekeeperMutation` | string enum | Status of the pod serving the mutation webhook. Values: `DEPLOYMENT_STATE_UNSPECIFIED`, `NOT_INSTALLED`, `INSTALLED`, `ERROR`, `PENDING`. |

### `ConfigManagementGitConfig`

- Git repo configuration for a single cluster.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `gcpServiceAccountEmail` | string | Optional. The Google Cloud Service Account Email used for auth when secret_type is `gcpserviceaccount`. Annotates the `RootSync` or `RepoSync` controller's Kubernetes Service Account. |
| `httpsProxy` | string | Optional. URL for the HTTPS proxy to be used when communicating with the Git repo. Defines an HTTPS_PROXY environment variable and only accepts `https` or unadorned URLs. For example, `https://proxy.internal.business.co:443` or `proxy.internal.business.co:443`. If using an unadorned URL, make sure the communication between your proxy server and Git host is secure. Rejects `http://` URLs. Only specify when secret_type is `cookiefile`, `token`, or `none`. |
| `policyDir` | string | Optional. The path within the Git repository that represents the top level of the repo to sync. Default: the root directory of the repository. |
| `secretType` | string | Required. Type of secret configured for access to the Git repo. Must be one of `ssh`, `cookiefile`, `gcenode`, `token`, `gcpserviceaccount`, `githubapp` or `none`. The validation of this is case-sensitive. |
| `syncBranch` | string | Optional. The branch of the repository to sync from. Default: master. |
| `syncRepo` | string | Required. The URL of the Git repository to use as the source of truth. |
| `syncRev` | string | Optional. Git revision (tag or hash) or branch to sync from. Default `HEAD`. If not `HEAD`, takes precedence over `sync_branch` field. When using a hash, must be a full hash, and not an abbreviated form. |
| `syncWaitSecs` | string (int64) | Optional. Period in seconds between consecutive syncs. Default: 15. |

### `ConfigManagementGroupVersionKind`

- A Kubernetes object's GVK.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `group` | string | Kubernetes Group |
| `kind` | string | Kubernetes Kind |
| `version` | string | Kubernetes Version |

### `ConfigManagementHierarchyControllerConfig`

- Configuration for Hierarchy Controller.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `enableHierarchicalResourceQuota` | boolean | Whether hierarchical resource quota is enabled in this cluster. |
| `enablePodTreeLabels` | boolean | Whether pod tree labels are enabled in this cluster. |
| `enabled` | boolean | Whether Hierarchy Controller is enabled in this cluster. |

### `ConfigManagementHierarchyControllerDeploymentState`

- Deployment state for Hierarchy Controller
- Version: v2

| Field | Type | Description |
|---|---|---|
| `extension` | string enum | The deployment state for Hierarchy Controller extension (e.g. v0.7.0-hc.1). Values: `DEPLOYMENT_STATE_UNSPECIFIED`, `NOT_INSTALLED`, `INSTALLED`, `ERROR`, `PENDING`. |
| `hnc` | string enum | The deployment state for open source HNC (e.g. v0.7.0-hc.0). Values: `DEPLOYMENT_STATE_UNSPECIFIED`, `NOT_INSTALLED`, `INSTALLED`, `ERROR`, `PENDING`. |

### `ConfigManagementHierarchyControllerState`

- State for Hierarchy Controller.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `state` | ConfigManagementHierarchyControllerDeploymentState | The deployment state for Hierarchy Controller. |
| `version` | ConfigManagementHierarchyControllerVersion | The version for Hierarchy Controller. |

### `ConfigManagementHierarchyControllerVersion`

- Version for Hierarchy Controller.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `extension` | string | Version for Hierarchy Controller extension. |
| `hnc` | string | Version for open source HNC. |

### `ConfigManagementInstallError`

- Errors pertaining to the installation of ACM.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `errorMessage` | string | A string representing the user facing error message. |

### `ConfigManagementMembershipSpec`

- \*\*Anthos Config Management\*\*: Configuration for a single cluster. Intended to parallel the ConfigManagement CR.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cluster` | string | Optional. User-specified cluster name used by the Config Sync cluster-name-selector annotation or ClusterSelector object, for applying configs to only a subset of clusters. Read more about the cluster-name-selector annotation and ClusterSelector object at https://docs.cloud.google.com/kubernetes-engine/config-sync/docs/how-to/cluster-scoped-objects#limiting-configs. Only set this field if a name different from the cluster's fleet membership name is used by the Config Sync cluster-name-selector annotation or ClusterSelector. |
| `configSync` | ConfigManagementConfigSync | Optional. Config Sync configuration for the cluster. |
| `hierarchyController` | ConfigManagementHierarchyControllerConfig | Optional. Hierarchy Controller configuration for the cluster. Deprecated: Configuring Hierarchy Controller through the configmanagement feature is no longer recommended. Use https://github.com/kubernetes-sigs/hierarchical-namespaces instead. |
| `management` | string enum | Optional. Deprecated: Automatic Feature management is in Preview and is unavailable in version 1.21.0 and later, after which Config Sync only supports manual upgrades. If set to manual upgrades, clear this field instead, which is behaviorally equivalent but helps prevent compatibility issues with newer fields. Values: `MANAGEMENT_UNSPECIFIED`, `MANAGEMENT_AUTOMATIC`, `MANAGEMENT_MANUAL`. |
| `policyController` | ConfigManagementPolicyController | Optional. Policy Controller configuration for the cluster. Deprecated: Configuring Policy Controller through the configmanagement feature is no longer recommended. Use the policycontroller feature instead. |
| `version` | string | Optional. Version of Config Sync to install. Defaults to the latest supported Config Sync version if the config_sync field is enabled. See supported versions at https://cloud.google.com/kubernetes-engine/config-sync/docs/get-support-config-sync#version_support_policy. |

### `ConfigManagementMembershipSpec` (v1beta)

- \*\*Anthos Config Management\*\*: Configuration for a single cluster. Intended to parallel the ConfigManagement CR.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `binauthz` | ConfigManagementBinauthzConfig | Optional. Deprecated: Binauthz configuration will be ignored and should not be set. |
| `cluster` | string | Optional. User-specified cluster name used by the Config Sync cluster-name-selector annotation or ClusterSelector object, for applying configs to only a subset of clusters. Read more about the cluster-name-selector annotation and ClusterSelector object at https://docs.cloud.google.com/kubernetes-engine/config-sync/docs/how-to/cluster-scoped-objects#limiting-configs. Only set this field if a name different from the cluster's fleet membership name is used by the Config Sync cluster-name-selector annotation or ClusterSelector. |
| `configSync` | ConfigManagementConfigSync | Optional. Config Sync configuration for the cluster. |
| `hierarchyController` | ConfigManagementHierarchyControllerConfig | Optional. Hierarchy Controller configuration for the cluster. Deprecated: Configuring Hierarchy Controller through the configmanagement feature is no longer recommended. Use https://github.com/kubernetes-sigs/hierarchical-namespaces instead. |
| `management` | string enum | Optional. Deprecated: Automatic Feature management is in Preview and is unavailable in version 1.21.0 and later, after which Config Sync only supports manual upgrades. If set to manual upgrades, clear this field instead, which is behaviorally equivalent but helps prevent compatibility issues with newer fields. Values: `MANAGEMENT_UNSPECIFIED`, `MANAGEMENT_AUTOMATIC`, `MANAGEMENT_MANUAL`. |
| `policyController` | ConfigManagementPolicyController | Optional. Policy Controller configuration for the cluster. Deprecated: Configuring Policy Controller through the configmanagement feature is no longer recommended. Use the policycontroller feature instead. |
| `version` | string | Optional. Version of Config Sync to install. Defaults to the latest supported Config Sync version if the config_sync field is enabled. See supported versions at https://cloud.google.com/kubernetes-engine/config-sync/docs/get-support-config-sync#version_support_policy. |

### `ConfigManagementMembershipState`

- \*\*Anthos Config Management\*\*: State for a single cluster.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `clusterName` | string | Output only. This field is set to the `cluster_name` field of the Membership Spec if it is not empty. Otherwise, it is set to the cluster's fleet membership name. |
| `configSyncState` | ConfigManagementConfigSyncState | Output only. Current sync status |
| `hierarchyControllerState` | ConfigManagementHierarchyControllerState | Output only. Hierarchy Controller status |
| `kubernetesApiServerVersion` | string | Output only. The Kubernetes API server version of the cluster. |
| `membershipSpec` | ConfigManagementMembershipSpec | Output only. Membership configuration in the cluster. This represents the actual state in the cluster, while the MembershipSpec in the FeatureSpec represents the intended state |
| `operatorState` | ConfigManagementOperatorState | Output only. Current install status of ACM's Operator |
| `policyControllerState` | ConfigManagementPolicyControllerState | Output only. PolicyController status |

### `ConfigManagementMembershipState` (v1beta)

- \*\*Anthos Config Management\*\*: State for a single cluster.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `binauthzState` | ConfigManagementBinauthzState | Output only. Binauthz status |
| `clusterName` | string | Output only. This field is set to the `cluster_name` field of the Membership Spec if it is not empty. Otherwise, it is set to the cluster's fleet membership name. |
| `configSyncState` | ConfigManagementConfigSyncState | Output only. Current sync status |
| `hierarchyControllerState` | ConfigManagementHierarchyControllerState | Output only. Hierarchy Controller status |
| `kubernetesApiServerVersion` | string | Output only. The Kubernetes API server version of the cluster. |
| `membershipSpec` | ConfigManagementMembershipSpec | Output only. Membership configuration in the cluster. This represents the actual state in the cluster, while the MembershipSpec in the FeatureSpec represents the intended state |
| `operatorState` | ConfigManagementOperatorState | Output only. Current install status of ACM's Operator |
| `policyControllerState` | ConfigManagementPolicyControllerState | Output only. PolicyController status |

### `ConfigManagementOciConfig`

- OCI repo configuration for a single cluster.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `gcpServiceAccountEmail` | string | Optional. The Google Cloud Service Account Email used for auth when secret_type is `gcpserviceaccount`. Annotates the `RootSync` or `RepoSync` controller's Kubernetes Service Account. |
| `policyDir` | string | Optional. The absolute path of the directory that contains the local resources. Default: the root directory of the image. |
| `secretType` | string | Required. Type of secret configured for access to the OCI repo. Must be one of `gcenode`, `gcpserviceaccount`, `k8sserviceaccount` or `none`. The validation of this is case-sensitive. |
| `syncRepo` | string | Required. The OCI image repository URL for the package to sync from. e.g. `LOCATION-docker.pkg.dev/PROJECT_ID/REPOSITORY_NAME/PACKAGE_NAME`. |
| `syncWaitSecs` | string (int64) | Optional. Period in seconds between consecutive syncs. Default: 15. |

### `ConfigManagementOperatorState`

- State information for an ACM's Operator.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `deploymentState` | string enum | The state of the Operator's deployment. Values: `DEPLOYMENT_STATE_UNSPECIFIED`, `NOT_INSTALLED`, `INSTALLED`, `ERROR`, `PENDING`. |
| `errors` | array<ConfigManagementInstallError> | Install errors. |
| `version` | string | The semenatic version number of the operator. |

### `ConfigManagementPolicyController`

- Configuration for Policy Controller
- Version: v2

| Field | Type | Description |
|---|---|---|
| `auditIntervalSeconds` | string (int64) | Sets the interval for Policy Controller Audit Scans (in seconds). When set to 0, this disables audit functionality altogether. |
| `enabled` | boolean | Enables the installation of Policy Controller. If false, the rest of PolicyController fields take no effect. |
| `exemptableNamespaces` | array<string> | The set of namespaces that are excluded from Policy Controller checks. Namespaces do not need to currently exist on the cluster. |
| `logDeniesEnabled` | boolean | Logs all denies and dry run failures. |
| `monitoring` | ConfigManagementPolicyControllerMonitoring | Monitoring specifies the configuration of monitoring. |
| `mutationEnabled` | boolean | Enable or disable mutation in policy controller. If true, mutation CRDs, webhook and controller deployment will be deployed to the cluster. |
| `referentialRulesEnabled` | boolean | Enables the ability to use Constraint Templates that reference to objects other than the object currently being evaluated. |
| `templateLibraryInstalled` | boolean | Installs the default template library along with Policy Controller. |
| `updateTime` | string (google-datetime) | Output only. Last time this membership spec was updated. |

### `ConfigManagementPolicyControllerMigration`

- State for the migration of PolicyController from ACM -> PoCo Hub.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `copyTime` | string (google-datetime) | Last time this membership spec was copied to PoCo feature. |
| `stage` | string enum | Stage of the migration. Values: `STAGE_UNSPECIFIED`, `ACM_MANAGED`, `POCO_MANAGED`. |

### `ConfigManagementPolicyControllerMonitoring`

- PolicyControllerMonitoring specifies the backends Policy Controller should export metrics to. For example, to specify metrics should be exported to Cloud Monitoring and Prometheus, specify backends: \["cloudmonitoring", "prometheus"\]
- Version: v2

| Field | Type | Description |
|---|---|---|
| `backends` | array<string> | Specifies the list of backends Policy Controller will export to. An empty list would effectively disable metrics export. Values: `MONITORING_BACKEND_UNSPECIFIED`, `PROMETHEUS`, `CLOUD_MONITORING`. |

### `ConfigManagementPolicyControllerState`

- State for PolicyControllerState.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `deploymentState` | ConfigManagementGatekeeperDeploymentState | The state about the policy controller installation. |
| `migration` | ConfigManagementPolicyControllerMigration | Record state of ACM -> PoCo Hub migration for this feature. |
| `version` | ConfigManagementPolicyControllerVersion | The version of Gatekeeper Policy Controller deployed. |

### `ConfigManagementPolicyControllerVersion`

- The build version of Gatekeeper Policy Controller is using.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `version` | string | The gatekeeper image tag that is composed of ACM version, git tag, build number. |

### `ConfigManagementSpec`

- \*\*Anthos Config Management\*\*: Configuration for a single cluster. Intended to parallel the ConfigManagement CR.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `binauthz` | ConfigManagementBinauthzConfig | Optional. Deprecated: Binauthz configuration will be ignored and should not be set. |
| `cluster` | string | Optional. User-specified cluster name used by the Config Sync cluster-name-selector annotation or ClusterSelector object, for applying configs to only a subset of clusters. Read more about the cluster-name-selector annotation and ClusterSelector object at https://docs.cloud.google.com/kubernetes-engine/config-sync/docs/how-to/cluster-scoped-objects#limiting-configs. Only set this field if a name different from the cluster's fleet membership name is used by the Config Sync cluster-name-selector annotation or ClusterSelector. |
| `configSync` | ConfigManagementConfigSync | Optional. Config Sync configuration for the cluster. |
| `hierarchyController` | ConfigManagementHierarchyControllerConfig | Optional. Hierarchy Controller configuration for the cluster. Deprecated: Configuring Hierarchy Controller through the configmanagement feature is no longer recommended. Use https://github.com/kubernetes-sigs/hierarchical-namespaces instead. |
| `management` | string enum | Optional. Deprecated: Automatic Feature management is in Preview and is unavailable in version 1.21.0 and later, after which Config Sync only supports manual upgrades. If set to manual upgrades, clear this field instead, which is behaviorally equivalent but helps prevent compatibility issues with newer fields. Values: `MANAGEMENT_UNSPECIFIED`, `MANAGEMENT_AUTOMATIC`, `MANAGEMENT_MANUAL`. |
| `policyController` | ConfigManagementPolicyController | Optional. Policy Controller configuration for the cluster. Deprecated: Configuring Policy Controller through the configmanagement feature is no longer recommended. Use the policycontroller feature instead. |
| `version` | string | Optional. Version of Config Sync to install. Defaults to the latest supported Config Sync version if the config_sync field is enabled. See supported versions at https://cloud.google.com/kubernetes-engine/config-sync/docs/get-support-config-sync#version_support_policy. |

### `ConfigManagementState`

- \*\*Anthos Config Management\*\*: State for a single cluster.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `binauthzState` | ConfigManagementBinauthzState | Output only. Binauthz status. |
| `clusterName` | string | Output only. This field is set to the `cluster_name` field of the Membership Spec if it is not empty. Otherwise, it is set to the cluster's fleet membership name. |
| `configSyncState` | ConfigManagementConfigSyncState | Output only. Current sync status. |
| `hierarchyControllerState` | ConfigManagementHierarchyControllerState | Output only. Hierarchy Controller status. |
| `kubernetesApiServerVersion` | string | Output only. The Kubernetes API server version of the cluster. |
| `membershipSpec` | ConfigManagementSpec | Output only. Membership configuration in the cluster. This represents the actual state in the cluster, while the MembershipSpec in the FeatureSpec represents the intended state. |
| `operatorState` | ConfigManagementOperatorState | Output only. Current install status of ACM's Operator. |
| `policyControllerState` | ConfigManagementPolicyControllerState | Output only. PolicyController status. |

### `ConfigManagementSyncError`

- An ACM created error representing a problem syncing configurations.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `code` | string | An ACM defined error code |
| `errorMessage` | string | A description of the error |
| `errorResources` | array<ConfigManagementErrorResource> | A list of config(s) associated with the error, if any |

### `ConfigManagementSyncState`

- State indicating an ACM's progress syncing configurations to a cluster.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `code` | string enum | Sync status code. Values: `SYNC_CODE_UNSPECIFIED`, `SYNCED`, `PENDING`, `ERROR`, `NOT_CONFIGURED`, `NOT_INSTALLED`, `UNAUTHORIZED`, `UNREACHABLE`. |
| `errors` | array<ConfigManagementSyncError> | A list of errors resulting from problematic configs. This list will be truncated after 100 errors, although it is unlikely for that many errors to simultaneously exist. |
| `importToken` | string | Token indicating the state of the importer. |
| `lastSync` | string | Deprecated: use last_sync_time instead. Timestamp of when ACM last successfully synced the repo. The time format is specified in https://golang.org/pkg/time/#Time.String |
| `lastSyncTime` | string (google-datetime) | Timestamp type of when ACM last successfully synced the repo. |
| `sourceToken` | string | Token indicating the state of the repo. |
| `syncToken` | string | Token indicating the state of the syncer. |

### `ConnectAgentResource`

- ConnectAgentResource represents a Kubernetes resource manifest for Connect Agent deployment.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `manifest` | string | YAML manifest of the resource. |
| `type` | TypeMeta | Kubernetes type of the resource. |

### `DataplaneV2FeatureSpec`

- \*\*Dataplane V2\*\*: Spec
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enableEncryption` | boolean | Enable dataplane-v2 based encryption for multiple clusters. |

### `DefaultClusterConfig`

- DefaultClusterConfig describes the default cluster configurations to be applied to all clusters born-in-fleet.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `binaryAuthorizationConfig` | BinaryAuthorizationConfig | Optional. Enable/Disable binary authorization features for the cluster. |
| `compliancePostureConfig` | CompliancePostureConfig | Optional. Deprecated: Compliance Posture is no longer supported. For more details, see https://cloud.google.com/kubernetes-engine/docs/deprecations/posture-management-deprecation. Enable/Disable Compliance Posture features for the cluster. Note that on UpdateFleet, only full replacement of this field is allowed. Users are not allowed for partial updates through field mask. |
| `securityPostureConfig` | SecurityPostureConfig | Optional. Enable/Disable Security Posture features for the cluster. |

### `EdgeCluster`

- EdgeCluster contains information specific to Google Edge Clusters.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `resourceLink` | string | Immutable. Self-link of the Google Cloud resource for the Edge Cluster. For example: //edgecontainer.googleapis.com/projects/my-project/locations/us-west1-a/clusters/my-cluster |

### `Empty`

- A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
- Version: v2

### `Expr`

- Represents a textual expression in the Common Expression Language (CEL) syntax. CEL is a C-like expression language. The syntax and semantics of CEL are documented at https://github.com/google/cel-spec. Example (Comparison): title: "Summary size limit" description: "Determines if a summary is less than 100 chars" expression: "document.summary.size() < 100" Example (Equality): title: "Requestor is owner" description: "Determines if requestor is the document owner" expression: "document.owner == request.auth.claims.email" Example (Logic): title: "Public documents" description: "Determine whether the document should be publicly visible" expression: "document.type != 'private' && document.type != 'internal'" Example (Data Manipulation): title: "Notification string" description: "Create a notification string with a timestamp." expression: "'New message received at ' + string(document.create_time)" The exact variables and functions that may be referenced within an expression are determined by the service that evaluates it. See the service documentation for additional information.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `description` | string | Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI. |
| `expression` | string | Textual representation of an expression in Common Expression Language syntax. |
| `location` | string | Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file. |
| `title` | string | Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression. |

### `Feature`

- Feature represents the settings and status of any Fleet Feature.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. When the Feature resource was created. |
| `deleteTime` | string (google-datetime) | Output only. When the Feature resource was deleted. |
| `fleetDefaultMemberConfig` | CommonFleetDefaultMemberConfigSpec | Optional. Feature configuration applicable to all memberships of the fleet. |
| `labels` | object | Labels for this Feature. |
| `membershipSpecs` | object | Optional. Membership-specific configuration for this Feature. If this Feature does not support any per-Membership configuration, this field may be unused. The keys indicate which Membership the configuration is for, in the form: `projects/{p}/locations/{l}/memberships/{m}` Where {p} is the project, {l} is a valid location and {m} is a valid Membership in this project at that location. {p} WILL match the Feature's project. {p} will always be returned as the project number, but the project ID is also accepted during input. If the same Membership is specified in the map twice (using the project ID form, and the project number form), exactly ONE of the entries will be saved, with no guarantees as to which. For this reason, it is recommended the same format be used for all entries when mutating a Feature. |
| `membershipStates` | object | Output only. Membership-specific Feature status. If this Feature does report any per-Membership status, this field may be unused. The keys indicate which Membership the state is for, in the form: `projects/{p}/locations/{l}/memberships/{m}` Where {p} is the project number, {l} is a valid location and {m} is a valid Membership in this project at that location. {p} MUST match the Feature's project number. |
| `name` | string | Output only. The full, unique name of this Feature resource in the format `projects/*/locations/*/features/*`. |
| `resourceState` | FeatureResourceState | Output only. State of the Feature resource itself. |
| `scopeSpecs` | object | Optional. Scope-specific configuration for this Feature. If this Feature does not support any per-Scope configuration, this field may be unused. The keys indicate which Scope the configuration is for, in the form: `projects/{p}/locations/global/scopes/{s}` Where {p} is the project, {s} is a valid Scope in this project. {p} WILL match the Feature's project. {p} will always be returned as the project number, but the project ID is also accepted during input. If the same Scope is specified in the map twice (using the project ID form, and the project number form), exactly ONE of the entries will be saved, with no guarantees as to which. For this reason, it is recommended the same format be used for all entries when mutating a Feature. |
| `scopeStates` | object | Output only. Scope-specific Feature status. If this Feature does report any per-Scope status, this field may be unused. The keys indicate which Scope the state is for, in the form: `projects/{p}/locations/global/scopes/{s}` Where {p} is the project, {s} is a valid Scope in this project. {p} WILL match the Feature's project. |
| `spec` | CommonFeatureSpec | Optional. Fleet-wide Feature configuration. If this Feature does not support any Fleet-wide configuration, this field may be unused. |
| `state` | CommonFeatureState | Output only. The Fleet-wide Feature state. |
| `unreachable` | array<string> | Output only. List of locations that could not be reached while fetching this feature. |
| `updateTime` | string (google-datetime) | Output only. When the Feature resource was last updated. |

### `FeatureResourceState`

- FeatureResourceState describes the state of a Feature \*resource\* in the GkeHub API. See `FeatureState` for the "running state" of the Feature in the Fleet and across Memberships.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `state` | string enum | The current state of the Feature resource in the Hub API. Values: `STATE_UNSPECIFIED`, `ENABLING`, `ACTIVE`, `DISABLING`, `UPDATING`, `SERVICE_UPDATING`. |

### `FeatureSpec`

- FeatureSpec contains user input per-feature spec information.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `cloudbuild` | CloudBuildSpec | Cloudbuild-specific FeatureSpec. |
| `configmanagement` | ConfigManagementSpec | Config Management FeatureSpec. |
| `identityservice` | IdentityServiceSpec | IdentityService FeatureSpec. |
| `origin` | Origin | Whether this per-Feature spec was inherited from a fleet-level default. This field can be updated by users by either overriding a Feature config (updated to USER implicitly) or setting to FLEET explicitly. |
| `policycontroller` | PolicyControllerSpec | Policycontroller-specific FeatureSpec. |
| `rbacrolebindingactuation` | RBACRoleBindingActuationSpec | Rbacrolebindingactuation-specific FeatureSpec. |
| `servicemesh` | ServiceMeshSpec | ServiceMesh Feature Spec. |
| `workloadcertificate` | WorkloadCertificateSpec | Workloadcertificate-specific FeatureSpec. |

### `FeatureSpec` (v1alpha)

- \*\*Workload Certificate\*\*: The Hub-wide input for the WorkloadCertificate feature.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `defaultConfig` | MembershipSpec | Specifies default membership spec. Users can override the default in the member_configs for each member. |
| `provisionGoogleCa` | string enum | Immutable. Specifies CA configuration. Values: `GOOGLE_CA_PROVISIONING_UNSPECIFIED`, `DISABLED`, `ENABLED`, `ENABLED_WITH_MANAGED_CA`, `ENABLED_WITH_DEFAULT_CA`. |

### `FeatureState`

- FeatureState contains high-level state information and per-feature state information for this MembershipFeature.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `appdevexperience` | AppDevExperienceState | Appdevexperience specific state. |
| `clusterupgrade` | ClusterUpgradeState | Cluster upgrade state. |
| `configmanagement` | ConfigManagementState | Config Management state |
| `identityservice` | IdentityServiceState | Identity service state |
| `metering` | MeteringState | Metering state |
| `policycontroller` | PolicyControllerState | Policy Controller state |
| `rbacrolebindingactuation` | RBACRoleBindingActuationState | RBAC Role Binding Actuation state |
| `servicemesh` | ServiceMeshState | Service mesh state |
| `state` | State | The high-level state of this MembershipFeature. |
| `workloadidentity` | WorkloadIdentityState | Workload Identity state |

### `FeatureState` (v1)

- FeatureState describes the high-level state of a Feature. It may be used to describe a Feature's state at the environ-level, or per-membershop, depending on the context.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `code` | string enum | The high-level, machine-readable status of this Feature. Values: `CODE_UNSPECIFIED`, `OK`, `WARNING`, `ERROR`. |
| `description` | string | A human-readable description of the current status. |
| `updateTime` | string (google-datetime) | The time this status and any related Feature-specific details were updated. |

### `Fleet`

- Fleet contains the Fleet-wide metadata and configuration.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. When the Fleet was created. |
| `defaultClusterConfig` | DefaultClusterConfig | Optional. The default cluster configurations to apply across the fleet. |
| `deleteTime` | string (google-datetime) | Output only. When the Fleet was deleted. |
| `displayName` | string | Optional. A user-assigned display name of the Fleet. When present, it must be between 4 to 30 characters. Allowed characters are: lowercase and uppercase letters, numbers, hyphen, single-quote, double-quote, space, and exclamation point. Example: `Production Fleet` |
| `labels` | object | Optional. Labels for this Fleet. |
| `name` | string | Output only. The full, unique resource name of this fleet in the format of `projects/{project}/locations/{location}/fleets/{fleet}`. Each Google Cloud project can have at most one fleet resource, named "default". |
| `state` | FleetLifecycleState | Output only. State of the namespace resource. |
| `uid` | string | Output only. Google-generated UUID for this resource. This is unique across all Fleet resources. If a Fleet resource is deleted and another resource with the same name is created, it gets a different uid. |
| `updateTime` | string (google-datetime) | Output only. When the Fleet was last updated. |

### `FleetLifecycleState`

- FleetLifecycleState describes the state of a Fleet resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `code` | string enum | Output only. The current state of the Fleet resource. Values: `CODE_UNSPECIFIED`, `CREATING`, `READY`, `DELETING`, `UPDATING`. |

### `FleetObservabilityFeatureError`

- All error details of the fleet observability feature.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `code` | string | The code of the error. |
| `description` | string | A human-readable description of the current status. |

### `FleetObservabilityFeatureSpec`

- \*\*Fleet Observability\*\*: The Hub-wide input for the FleetObservability feature.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `loggingConfig` | FleetObservabilityLoggingConfig | Specified if fleet logging feature is enabled for the entire fleet. If UNSPECIFIED, fleet logging feature is disabled for the entire fleet. |

### `FleetObservabilityFeatureState`

- \*\*FleetObservability\*\*: Hub-wide Feature for FleetObservability feature. state.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `logging` | FleetObservabilityFleetObservabilityLoggingState | The feature state of default logging. |
| `monitoring` | FleetObservabilityFleetObservabilityMonitoringState | The feature state of fleet monitoring. |

### `FleetObservabilityFleetObservabilityBaseFeatureState`

- Base state for fleet observability feature.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `code` | string enum | The high-level, machine-readable status of this Feature. Values: `CODE_UNSPECIFIED`, `OK`, `ERROR`. |
| `errors` | array<FleetObservabilityFeatureError> | Errors after reconciling the monitoring and logging feature if the code is not OK. |

### `FleetObservabilityFleetObservabilityLoggingState`

- Feature state for logging feature.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `defaultLog` | FleetObservabilityFleetObservabilityBaseFeatureState | The base feature state of fleet default log. |
| `scopeLog` | FleetObservabilityFleetObservabilityBaseFeatureState | The base feature state of fleet scope log. |

### `FleetObservabilityFleetObservabilityMonitoringState`

- Feature state for monitoring feature.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `state` | FleetObservabilityFleetObservabilityBaseFeatureState | The base feature state of fleet monitoring feature. |

### `FleetObservabilityLoggingConfig`

- LoggingConfig defines the configuration for different types of logs.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `defaultConfig` | FleetObservabilityRoutingConfig | Specified if applying the default routing config to logs not specified in other configs. |
| `fleetScopeLogsConfig` | FleetObservabilityRoutingConfig | Specified if applying the routing config to all logs for all fleet scopes. |

### `FleetObservabilityMembershipSpec`

- \*\*FleetObservability\*\*: The membership-specific input for FleetObservability feature.
- Version: v1

### `FleetObservabilityMembershipState`

- \*\*FleetObservability\*\*: Membership-specific Feature state for fleetobservability.
- Version: v1

### `FleetObservabilityRoutingConfig`

- RoutingConfig configures the behaviour of fleet logging feature.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `mode` | string enum | mode configures the logs routing mode. Values: `MODE_UNSPECIFIED`, `COPY`, `MOVE`. |

### `ForceCompleteRolloutStageRequest`

- Request message for force-completing a rollout stage.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `stageNumber` | integer (int32) | Required. The stage number to force-complete. |

### `GenerateConnectManifestResponse`

- GenerateConnectManifestResponse contains manifest information for installing/upgrading a Connect agent.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `manifest` | array<ConnectAgentResource> | The ordered list of Kubernetes resources that need to be applied to the cluster for GKE Connect agent installation/upgrade. |

### `GenerateExclusivityManifestResponse`

- The response of the exclusivity artifacts manifests for the client to apply.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `crManifest` | string | The YAML manifest of the membership CR to apply if a new version of the CR is available. Empty if no update needs to be applied. |
| `crdManifest` | string | The YAML manifest of the membership CRD to apply if a newer version of the CRD is available. Empty if no update needs to be applied. |

### `GenerateMembershipRBACRoleBindingYAMLResponse`

- Response for GenerateRBACRoleBindingYAML.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `roleBindingsYaml` | string | a yaml text blob including the RBAC policies. |

### `GkeCluster`

- GkeCluster contains information specific to GKE clusters.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `clusterMissing` | boolean | Output only. If cluster_missing is set then it denotes that the GKE cluster no longer exists in the GKE Control Plane. |
| `resourceLink` | string | Immutable. Self-link of the Google Cloud resource for the GKE cluster. For example: //container.googleapis.com/projects/my-project/locations/us-west1-a/clusters/my-cluster Zonal clusters are also supported. |

### `GoogleRpcStatus`

- The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by gRPC (https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the API Design Guide (https://cloud.google.com/apis/design/errors).
- Version: v2

| Field | Type | Description |
|---|---|---|
| `code` | integer (int32) | The status code, which should be an enum value of google.rpc.Code. |
| `details` | array<object> | A list of messages that carry the error details. There is a common set of message types for APIs to use. |
| `message` | string | A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. |

### `IdentityServiceAuthMethod`

- Configuration of an auth method for a member/cluster. Only one authentication method (e.g., OIDC and LDAP) can be set per AuthMethod.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `azureadConfig` | IdentityServiceAzureADConfig | AzureAD specific Configuration. |
| `googleConfig` | IdentityServiceGoogleConfig | GoogleConfig specific configuration |
| `ldapConfig` | IdentityServiceLdapConfig | LDAP specific configuration. |
| `name` | string | Identifier for auth config. |
| `oidcConfig` | IdentityServiceOidcConfig | OIDC specific configuration. |
| `proxy` | string | Proxy server address to use for auth method. |
| `samlConfig` | IdentityServiceSamlConfig | SAML specific configuration. |

### `IdentityServiceAzureADConfig`

- Configuration for the AzureAD Auth flow.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `clientId` | string | ID for the registered client application that makes authentication requests to the Azure AD identity provider. |
| `clientSecret` | string | Input only. Unencrypted AzureAD client secret will be passed to the GKE Hub CLH. |
| `encryptedClientSecret` | string (byte) | Output only. Encrypted AzureAD client secret. |
| `groupFormat` | string | Optional. Format of the AzureAD groups that the client wants for auth. |
| `kubectlRedirectUri` | string | The redirect URL that kubectl uses for authorization. |
| `tenant` | string | Kind of Azure AD account to be authenticated. Supported values are or for accounts belonging to a specific tenant. |
| `userClaim` | string | Optional. Claim in the AzureAD ID Token that holds the user details. |

### `IdentityServiceDiagnosticInterface`

- Configuration options for the AIS diagnostic interface.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `enabled` | boolean | Determines whether to enable the diagnostic interface. |
| `expirationTime` | string (google-datetime) | Determines the expiration time of the diagnostic interface enablement. When reached, requests to the interface would be automatically rejected. |

### `IdentityServiceGoogleConfig`

- Configuration for the Google Plugin Auth flow.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `disable` | boolean | Disable automatic configuration of Google Plugin on supported platforms. |

### `IdentityServiceGroupConfig`

- Contains the properties for locating and authenticating groups in the directory.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `baseDn` | string | Required. The location of the subtree in the LDAP directory to search for group entries. |
| `filter` | string | Optional. Optional filter to be used when searching for groups a user belongs to. This can be used to explicitly match only certain groups in order to reduce the amount of groups returned for each user. This defaults to "(objectClass=Group)". |
| `idAttribute` | string | Optional. The identifying name of each group a user belongs to. For example, if this is set to "distinguishedName" then RBACs and other group expectations should be written as full DNs. This defaults to "distinguishedName". |

### `IdentityServiceIdentityServiceOptions`

- Holds non-protocol-related configuration options.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `diagnosticInterface` | IdentityServiceDiagnosticInterface | Configuration options for the AIS diagnostic interface. |
| `sessionDuration` | string (google-duration) | Determines the lifespan of STS tokens issued by Anthos Identity Service. |

### `IdentityServiceLdapConfig`

- Configuration for the LDAP Auth flow.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `group` | IdentityServiceGroupConfig | Optional. Contains the properties for locating and authenticating groups in the directory. |
| `server` | IdentityServiceServerConfig | Required. Server settings for the external LDAP server. |
| `serviceAccount` | IdentityServiceServiceAccountConfig | Required. Contains the credentials of the service account which is authorized to perform the LDAP search in the directory. The credentials can be supplied by the combination of the DN and password or the client certificate. |
| `user` | IdentityServiceUserConfig | Required. Defines where users exist in the LDAP directory. |

### `IdentityServiceMembershipSpec`

- \*\*Anthos Identity Service\*\*: Configuration for a single Membership.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `authMethods` | array<IdentityServiceAuthMethod> | A member may support multiple auth methods. |
| `identityServiceOptions` | IdentityServiceIdentityServiceOptions | Optional. non-protocol-related configuration options. |

### `IdentityServiceMembershipState`

- \*\*Anthos Identity Service\*\*: State for a single Membership.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `failureReason` | string | The reason of the failure. |
| `installedVersion` | string | Installed AIS version. This is the AIS version installed on this member. The values makes sense iff state is OK. |
| `memberConfig` | IdentityServiceMembershipSpec | Last reconciled membership configuration |
| `state` | string enum | Deployment state on this member Values: `DEPLOYMENT_STATE_UNSPECIFIED`, `OK`, `ERROR`. |

### `IdentityServiceOidcConfig`

- Configuration for OIDC Auth flow.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `certificateAuthorityData` | string | PEM-encoded CA for OIDC provider. |
| `clientId` | string | ID for OIDC client application. |
| `clientSecret` | string | Input only. Unencrypted OIDC client secret will be passed to the GKE Hub CLH. |
| `deployCloudConsoleProxy` | boolean | Flag to denote if reverse proxy is used to connect to auth provider. This flag should be set to true when provider is not reachable by Google Cloud Console. |
| `enableAccessToken` | boolean | Enable access token. |
| `encryptedClientSecret` | string (byte) | Output only. Encrypted OIDC Client secret |
| `extraParams` | string | Comma-separated list of key-value pairs. |
| `groupPrefix` | string | Prefix to prepend to group name. |
| `groupsClaim` | string | Claim in OIDC ID token that holds group information. |
| `issuerUri` | string | URI for the OIDC provider. This should point to the level below .well-known/openid-configuration. |
| `kubectlRedirectUri` | string | Registered redirect uri to redirect users going through OAuth flow using kubectl plugin. |
| `scopes` | string | Comma-separated list of identifiers. |
| `userClaim` | string | Claim in OIDC ID token that holds username. |
| `userPrefix` | string | Prefix to prepend to user name. |

### `IdentityServiceSamlConfig`

- Configuration for the SAML Auth flow.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `attributeMapping` | object | Optional. The mapping of additional user attributes like nickname, birthday and address etc.. `key` is the name of this additional attribute. `value` is a string presenting as CEL(common expression language, (internal link)) used for getting the value from the resources. Take nickname as an example, in this case, `key` is "attribute.nickname" and `value` is "assertion.nickname". |
| `groupPrefix` | string | Optional. Prefix to prepend to group name. |
| `groupsAttribute` | string | Optional. The SAML attribute to read groups from. This value is expected to be a string and will be passed along as-is (with the option of being prefixed by the `group_prefix`). |
| `identityProviderCertificates` | array<string> | Required. The list of IdP certificates to validate the SAML response against. |
| `identityProviderId` | string | Required. The entity ID of the SAML IdP. |
| `identityProviderSsoUri` | string | Required. The URI where the SAML IdP exposes the SSO service. |
| `userAttribute` | string | Optional. The SAML attribute to read username from. If unspecified, the username will be read from the NameID element of the assertion in SAML response. This value is expected to be a string and will be passed along as-is (with the option of being prefixed by the `user_prefix`). |
| `userPrefix` | string | Optional. Prefix to prepend to user name. |

### `IdentityServiceServerConfig`

- Server settings for the external LDAP server.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `certificateAuthorityData` | string (byte) | Optional. Contains a Base64 encoded, PEM formatted certificate authority certificate for the LDAP server. This must be provided for the "ldaps" and "startTLS" connections. |
| `connectionType` | string | Optional. Defines the connection type to communicate with the LDAP server. If `starttls` or `ldaps` is specified, the certificate_authority_data should not be empty. |
| `host` | string | Required. Defines the hostname or IP of the LDAP server. Port is optional and will default to 389, if unspecified. For example, "ldap.server.example" or "10.10.10.10:389". |

### `IdentityServiceServiceAccountConfig`

- Contains the credentials of the service account which is authorized to perform the LDAP search in the directory. The credentials can be supplied by the combination of the DN and password or the client certificate.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `simpleBindCredentials` | IdentityServiceSimpleBindCredentials | Credentials for basic auth. |

### `IdentityServiceSimpleBindCredentials`

- The structure holds the LDAP simple binding credential.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `dn` | string | Required. The distinguished name(DN) of the service account object/user. |
| `encryptedPassword` | string (byte) | Output only. The encrypted password of the service account object/user. |
| `password` | string | Required. Input only. The password of the service account object/user. |

### `IdentityServiceSpec`

- \*\*IdentityService\*\*: Configuration for a single membership.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `authMethods` | array<IdentityServiceAuthMethod> | A member may support multiple auth methods. |
| `identityServiceOptions` | IdentityServiceIdentityServiceOptions | Optional. non-protocol-related configuration options. |

### `IdentityServiceState`

- \*\*IdentityService\*\*: State for a single membership, analyzed and reported by feature controller.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `failureReason` | string | The reason of the failure. |
| `installedVersion` | string | Installed AIS version. This is the AIS version installed on this member. The values makes sense iff state is OK. |
| `memberConfig` | IdentityServiceSpec | Last reconciled membership configuration |
| `state` | string enum | Deployment state on this member Values: `DEPLOYMENT_STATE_UNSPECIFIED`, `OK`, `ERROR`. |

### `IdentityServiceUserConfig`

- Defines where users exist in the LDAP directory.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `baseDn` | string | Required. The location of the subtree in the LDAP directory to search for user entries. |
| `filter` | string | Optional. Filter to apply when searching for the user. This can be used to further restrict the user accounts which are allowed to login. This defaults to "(objectClass=User)". |
| `idAttribute` | string | Optional. Determines which attribute to use as the user's identity after they are authenticated. This is distinct from the loginAttribute field to allow users to login with a username, but then have their actual identifier be an email address or full Distinguished Name (DN). For example, setting loginAttribute to "sAMAccountName" and identifierAttribute to "userPrincipalName" would allow a user to login as "bsmith", but actual RBAC policies for the user would be written as "bsmith@example.com". Using "userPrincipalName" is recommended since this will be unique for each user. This defaults to "userPrincipalName". |
| `loginAttribute` | string | Optional. The name of the attribute which matches against the input username. This is used to find the user in the LDAP database e.g. "(=)" and is combined with the optional filter field. This defaults to "userPrincipalName". |

### `KubernetesMetadata`

- KubernetesMetadata provides informational metadata for Memberships representing Kubernetes clusters.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `kubernetesApiServerVersion` | string | Output only. Kubernetes API server version string as reported by `/version`. |
| `memoryMb` | integer (int32) | Output only. The total memory capacity as reported by the sum of all Kubernetes nodes resources, defined in MB. |
| `nodeCount` | integer (int32) | Output only. Node count as reported by Kubernetes nodes resources. |
| `nodeProviderId` | string | Output only. Node providerID as reported by the first node in the list of nodes on the Kubernetes endpoint. On Kubernetes platforms that support zero-node clusters (like GKE on Google Cloud), the node_count will be zero and the node_provider_id will be empty. |
| `updateTime` | string (google-datetime) | Output only. The time at which these details were last updated. This update_time is different from the Membership-level update_time since EndpointDetails are updated internally for API consumers. |
| `vcpuCount` | integer (int32) | Output only. vCPU count as reported by Kubernetes nodes resources. |

### `KubernetesResource`

- KubernetesResource contains the YAML manifests and configuration for Membership Kubernetes resources in the cluster. After CreateMembership or UpdateMembership, these resources should be re-applied in the cluster.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `connectResources` | array<ResourceManifest> | Output only. The Kubernetes resources for installing the GKE Connect agent This field is only populated in the Membership returned from a successful long-running operation from CreateMembership or UpdateMembership. It is not populated during normal GetMembership or ListMemberships requests. To get the resource manifest after the initial registration, the caller should make a UpdateMembership call with an empty field mask. |
| `membershipCrManifest` | string | Input only. The YAML representation of the Membership CR. This field is ignored for GKE clusters where Hub can read the CR directly. Callers should provide the CR that is currently present in the cluster during CreateMembership or UpdateMembership, or leave this field empty if none exists. The CR manifest is used to validate the cluster has not been registered with another Membership. |
| `membershipResources` | array<ResourceManifest> | Output only. Additional Kubernetes resources that need to be applied to the cluster after Membership creation, and after every update. This field is only populated in the Membership returned from a successful long-running operation from CreateMembership or UpdateMembership. It is not populated during normal GetMembership or ListMemberships requests. To get the resource manifest after the initial registration, the caller should make a UpdateMembership call with an empty field mask. |
| `resourceOptions` | ResourceOptions | Optional. Options for Kubernetes resource generation. |

### `LifecycleState`

- LifecycleState describes the state of a MembershipFeature \*resource\* in the GkeHub API. See `FeatureState` for the "running state" of the MembershipFeature.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `state` | string enum | Output only. The current state of the Feature resource in the Hub API. Values: `STATE_UNSPECIFIED`, `ENABLING`, `ACTIVE`, `DISABLING`, `UPDATING`, `SERVICE_UPDATING`. |

### `ListAdminClusterMembershipsResponse`

- Response message for the `GkeHub.ListAdminClusterMemberships` method.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `adminClusterMemberships` | array<Membership> | The list of matching Memberships of admin clusters. |
| `nextPageToken` | string | A token to request the next page of resources from the `ListAdminClusterMemberships` method. The value of an empty string means that there are no more resources to return. |
| `unreachable` | array<string> | List of locations that could not be reached while fetching this list. |

### `ListBoundMembershipsResponse`

- List of Memberships bound to a Scope.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `memberships` | array<Membership> | The list of Memberships bound to the given Scope. |
| `nextPageToken` | string | A token to request the next page of resources from the `ListBoundMemberships` method. The value of an empty string means that there are no more resources to return. |
| `unreachable` | array<string> | List of locations that could not be reached while fetching this list. |

### `ListFeaturesResponse`

- Response message for the `GkeHub.ListFeatures` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token to request the next page of resources from the `ListFeatures` method. The value of an empty string means that there are no more resources to return. |
| `resources` | array<Feature> | The list of matching Features |

### `ListFleetsResponse`

- Response message for the `GkeHub.ListFleetsResponse` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `fleets` | array<Fleet> | The list of matching fleets. |
| `nextPageToken` | string | A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. The token is only valid for 1h. |

### `ListLocationsResponse`

- The response message for Locations.ListLocations.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `locations` | array<Location> | A list of locations that matches the specified filter in the request. |
| `nextPageToken` | string | The standard List next-page token. |

### `ListMembershipBindingsResponse`

- List of MembershipBindings.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `membershipBindings` | array<MembershipBinding> | The list of membership_bindings |
| `nextPageToken` | string | A token to request the next page of resources from the `ListMembershipBindings` method. The value of an empty string means that there are no more resources to return. |
| `unreachable` | array<string> | List of locations that could not be reached while fetching this list. |

### `ListMembershipFeaturesResponse`

- Response message for the `GkeHubFeature.ListMembershipFeatures` method.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `membershipFeatures` | array<MembershipFeature> | The list of matching MembershipFeatures. |
| `nextPageToken` | string | A token to request the next page of resources from the `ListMembershipFeatures` method. The value of an empty string means that there are no more resources to return. |
| `unreachable` | array<string> | List of locations that could not be reached while fetching this list. |

### `ListMembershipRBACRoleBindingsResponse`

- List of Membership RBACRoleBindings.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token to request the next page of resources from the `ListMembershipRBACRoleBindings` method. The value of an empty string means that there are no more resources to return. |
| `rbacrolebindings` | array<RBACRoleBinding> | The list of Membership RBACRoleBindings. |
| `unreachable` | array<string> | List of locations that could not be reached while fetching this list. |

### `ListMembershipsResponse`

- Response message for the `GkeHub.ListMemberships` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token to request the next page of resources from the `ListMemberships` method. The value of an empty string means that there are no more resources to return. |
| `resources` | array<Membership> | The list of matching Memberships. |
| `unreachable` | array<string> | List of locations that could not be reached while fetching this list. |

### `ListOperationsResponse`

- The response message for Operations.ListOperations.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | The standard List next-page token. |
| `operations` | array<Operation> | A list of operations that matches the specified filter in the request. |
| `unreachable` | array<string> | Unordered list. Unreachable resources. Populated when the request sets `ListOperationsRequest.return_partial_success` and reads across collections. For example, when attempting to list all resources across all supported locations. |

### `ListPermittedScopesResponse`

- List of permitted Scopes.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token to request the next page of resources from the `ListPermittedScopes` method. The value of an empty string means that there are no more resources to return. |
| `scopes` | array<Scope> | The list of permitted Scopes |

### `ListRolloutSequencesResponse`

- Response message for listing rollout sequences.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |
| `rolloutSequences` | array<RolloutSequence> | The rollout sequences from the specified parent resource. |

### `ListRolloutsResponse`

- Response message for listing rollouts.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |
| `rollouts` | array<Rollout> | The rollouts from the specified parent resource. |

### `ListScopeNamespacesResponse`

- List of fleet namespaces.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token to request the next page of resources from the `ListNamespaces` method. The value of an empty string means that there are no more resources to return. |
| `scopeNamespaces` | array<Namespace> | The list of fleet namespaces |

### `ListScopeRBACRoleBindingsResponse`

- List of Scope RBACRoleBindings.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token to request the next page of resources from the `ListScopeRBACRoleBindings` method. The value of an empty string means that there are no more resources to return. |
| `rbacrolebindings` | array<RBACRoleBinding> | The list of Scope RBACRoleBindings. |

### `ListScopesResponse`

- List of Scopes.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token to request the next page of resources from the `ListScopes` method. The value of an empty string means that there are no more resources to return. |
| `scopes` | array<Scope> | The list of Scopes |

### `Location`

- A resource that represents a Google Cloud location.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `displayName` | string | The friendly name for this location, typically a nearby city name. For example, "Tokyo". |
| `labels` | object | Cross-service attributes for the location. For example {"cloud.googleapis.com/region": "us-east1"} |
| `locationId` | string | The canonical id for this location. For example: `"us-east1"`. |
| `metadata` | object | Service-specific metadata. For example the available capacity at the given location. |
| `name` | string | Resource name for the location, which may vary between implementations. For example: `"projects/example-project/locations/us-east1"` |

### `Membership`

- Membership contains information about a member cluster.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `authority` | Authority | Optional. How to identify workloads from this Membership. See the documentation on Workload Identity for more details: https://cloud.google.com/kubernetes-engine/docs/how-to/workload-identity |
| `clusterTier` | string enum | Output only. The tier of the cluster. Values: `CLUSTER_TIER_UNSPECIFIED`, `STANDARD`, `ENTERPRISE`. |
| `createTime` | string (google-datetime) | Output only. When the Membership was created. |
| `deleteTime` | string (google-datetime) | Output only. When the Membership was deleted. |
| `description` | string | Output only. Description of this membership, limited to 63 characters. Must match the regex: `a-zA-Z0-9*` This field is present for legacy purposes. |
| `endpoint` | MembershipEndpoint | Optional. Endpoint information to reach this member. |
| `externalId` | string | Optional. An externally-generated and managed ID for this Membership. This ID may be modified after creation, but this is not recommended. The ID must match the regex: `a-zA-Z0-9*` If this Membership represents a Kubernetes cluster, this value should be set to the UID of the `kube-system` namespace object. |
| `labels` | object | Optional. Labels for this membership. These labels are not leveraged by multi-cluster features, instead, we prefer cluster labels, which can be set on GKE cluster or other cluster types. |
| `lastConnectionTime` | string (google-datetime) | Output only. For clusters using Connect, the timestamp of the most recent connection established with Google Cloud. This time is updated every several minutes, not continuously. For clusters that do not use GKE Connect, or that have never connected successfully, this field will be unset. |
| `membershipType` | string enum | Output only. The type of the membership. Values: `MEMBERSHIP_TYPE_UNSPECIFIED`, `LIGHTWEIGHT`. |
| `monitoringConfig` | MonitoringConfig | Optional. The monitoring config information for this membership. |
| `name` | string | Output only. The full, unique name of this Membership resource in the format `projects/*/locations/*/memberships/{membership_id}`, set during creation. `membership_id` must be a valid RFC 1123 compliant DNS label: 1. At most 63 characters in length 2. It must consist of lower case alphanumeric characters or `-` 3. It must start and end with an alphanumeric character Which can be expressed as the regex: `[a-z0-9]([-a-z0-9]*[a-z0-9])?`, with a maximum length of 63 characters. |
| `state` | MembershipState | Output only. State of the Membership resource. |
| `uniqueId` | string | Output only. Google-generated UUID for this resource. This is unique across all Membership resources. If a Membership resource is deleted and another resource with the same name is created, it gets a different unique_id. |
| `updateTime` | string (google-datetime) | Output only. When the Membership was last updated. |

### `Membership` (v1beta1)

- Membership contains information about a member cluster.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `authority` | Authority | Optional. How to identify workloads from this Membership. See the documentation on Workload Identity for more details: https://cloud.google.com/kubernetes-engine/docs/how-to/workload-identity |
| `createTime` | string (google-datetime) | Output only. When the Membership was created. |
| `deleteTime` | string (google-datetime) | Output only. When the Membership was deleted. |
| `description` | string | Optional. Description of this membership, limited to 63 characters. Must match the regex: `a-zA-Z0-9*` |
| `endpoint` | MembershipEndpoint | Optional. Endpoint information to reach this member. |
| `externalId` | string | Optional. An externally-generated and managed ID for this Membership. This ID may be modified after creation, but this is not recommended. For GKE clusters, external_id is managed by the Hub API and updates will be ignored. The ID must match the regex: `a-zA-Z0-9*` If this Membership represents a Kubernetes cluster, this value should be set to the UID of the `kube-system` namespace object. |
| `infrastructureType` | string enum | Optional. The infrastructure type this Membership is running on. Values: `INFRASTRUCTURE_TYPE_UNSPECIFIED`, `ON_PREM`, `MULTI_CLOUD`. |
| `labels` | object | Optional. Google Cloud labels for this membership. These labels are not leveraged by multi-cluster features, instead, we prefer cluster labels, which can be set on GKE cluster or other cluster types. |
| `lastConnectionTime` | string (google-datetime) | Output only. For clusters using Connect, the timestamp of the most recent connection established with Google Cloud. This time is updated every several minutes, not continuously. For clusters that do not use GKE Connect, or that have never connected successfully, this field will be unset. |
| `membershipType` | string enum | Output only. The type of the membership. Values: `MEMBERSHIP_TYPE_UNSPECIFIED`, `LIGHTWEIGHT`. |
| `monitoringConfig` | MonitoringConfig | Optional. The monitoring config information for this membership. |
| `name` | string | Output only. The full, unique name of this Membership resource in the format `projects/*/locations/*/memberships/{membership_id}`, set during creation. `membership_id` must be a valid RFC 1123 compliant DNS label: 1. At most 63 characters in length 2. It must consist of lower case alphanumeric characters or `-` 3. It must start and end with an alphanumeric character Which can be expressed as the regex: `[a-z0-9]([-a-z0-9]*[a-z0-9])?`, with a maximum length of 63 characters. |
| `state` | MembershipState | Output only. State of the Membership resource. |
| `uniqueId` | string | Output only. Google-generated UUID for this resource. This is unique across all Membership resources. If a Membership resource is deleted and another resource with the same name is created, it gets a different unique_id. |
| `updateTime` | string (google-datetime) | Output only. When the Membership was last updated. |

### Shape of `AppDevExperienceFeatureState`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "networkingInstallSucceeded": "Status"
}
```

## Notes

- Generated from the Discovery document(s) v2, v1, v1beta1, v1beta, v1alpha of `gkehub` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Google-internal `go/` short links in the Discovery descriptions are replaced with `(internal link)`; they are not reachable outside Google.
- Source: https://gkehub.googleapis.com/$discovery/rest?version=v2, https://gkehub.googleapis.com/$discovery/rest?version=v1, https://gkehub.googleapis.com/$discovery/rest?version=v1beta1, https://gkehub.googleapis.com/$discovery/rest?version=v1beta, https://gkehub.googleapis.com/$discovery/rest?version=v1alpha (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
