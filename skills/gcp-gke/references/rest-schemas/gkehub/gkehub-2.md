---
source: https://gkehub.googleapis.com/$discovery/rest?version=v2
---

# GKE Hub API message schemas (gkehub) (part 2/2)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/gkehub/`.

### `MembershipBinding`

- MembershipBinding is a subresource of a Membership, representing what Fleet Scopes (or other, future Fleet resources) a Membership is bound to.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. When the membership binding was created. |
| `deleteTime` | string (google-datetime) | Output only. When the membership binding was deleted. |
| `labels` | object | Optional. Labels for this MembershipBinding. |
| `name` | string | The resource name for the membershipbinding itself `projects/{project}/locations/{location}/memberships/{membership}/bindings/{membershipbinding}` |
| `scope` | string | A Scope resource name in the format `projects/*/locations/*/scopes/*`. |
| `state` | MembershipBindingLifecycleState | Output only. State of the membership binding resource. |
| `uid` | string | Output only. Google-generated UUID for this resource. This is unique across all membershipbinding resources. If a membershipbinding resource is deleted and another resource with the same name is created, it gets a different uid. |
| `updateTime` | string (google-datetime) | Output only. When the membership binding was last updated. |

### `MembershipBindingLifecycleState`

- MembershipBindingLifecycleState describes the state of a Binding resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `code` | string enum | Output only. The current state of the MembershipBinding resource. Values: `CODE_UNSPECIFIED`, `CREATING`, `READY`, `DELETING`, `UPDATING`. |

### `MembershipEndpoint`

- MembershipEndpoint contains information needed to contact a Kubernetes API, endpoint and any additional Kubernetes metadata.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `applianceCluster` | ApplianceCluster | Optional. Specific information for a GDC Edge Appliance cluster. |
| `edgeCluster` | EdgeCluster | Optional. Specific information for a Google Edge cluster. |
| `gkeCluster` | GkeCluster | Optional. Specific information for a GKE on Google Cloud cluster. |
| `googleManaged` | boolean | Output only. Whether the lifecycle of this membership is managed by a google cluster platform service. |
| `kubernetesMetadata` | KubernetesMetadata | Output only. Useful Kubernetes-specific metadata. |
| `kubernetesResource` | KubernetesResource | Optional. The in-cluster Kubernetes Resources that should be applied for a correctly registered cluster, in the steady state. These resources: \* Ensure that the cluster is exclusively registered to one and only one Hub Membership. \* Propagate Workload Pool Information available in the Membership Authority field. \* Ensure proper initial configuration of default Hub Features. |
| `multiCloudCluster` | MultiCloudCluster | Optional. Specific information for a GKE Multi-Cloud cluster. |
| `onPremCluster` | OnPremCluster | Optional. Specific information for a GKE On-Prem cluster. An onprem user-cluster who has no resourceLink is not allowed to use this field, it should have a nil "type" instead. |

### `MembershipEndpoint` (v1beta1)

- MembershipEndpoint contains information needed to contact a Kubernetes API, endpoint and any additional Kubernetes metadata.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `applianceCluster` | ApplianceCluster | Optional. Specific information for a GDC Edge Appliance cluster. |
| `edgeCluster` | EdgeCluster | Optional. Specific information for a Google Edge cluster. |
| `gkeCluster` | GkeCluster | Optional. Specific information for a GKE-on-Google Cloud cluster. |
| `kubernetesMetadata` | KubernetesMetadata | Output only. Useful Kubernetes-specific metadata. |
| `kubernetesResource` | KubernetesResource | Optional. The in-cluster Kubernetes Resources that should be applied for a correctly registered cluster, in the steady state. These resources: \* Ensure that the cluster is exclusively registered to one and only one Hub Membership. \* Propagate Workload Pool Information available in the Membership Authority field. \* Ensure proper initial configuration of default Hub Features. |
| `multiCloudCluster` | MultiCloudCluster | Optional. Specific information for a GKE Multi-Cloud cluster. |
| `onPremCluster` | OnPremCluster | Optional. Specific information for a GKE On-Prem cluster. An onprem user-cluster who has no resourceLink is not allowed to use this field, it should have a nil "type" instead. |

### `MembershipFeature`

- MembershipFeature represents the settings and status of a Fleet Feature enabled on a single Fleet Membership.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. When the MembershipFeature resource was created. |
| `deleteTime` | string (google-datetime) | Output only. When the MembershipFeature resource was deleted. |
| `labels` | object | Google Cloud labels for this MembershipFeature. |
| `lifecycleState` | LifecycleState | Output only. Lifecycle information of the resource itself. |
| `name` | string | Output only. The resource name of the membershipFeature, in the format: `projects/{project}/locations/{location}/memberships/{membership}/features/{feature}`. Note that `membershipFeatures` is shortened to `features` in the resource name. (see https://google.aip.dev/122#collection-identifiers) |
| `spec` | FeatureSpec | Optional. Spec of this membershipFeature. |
| `state` | FeatureState | Output only. State of the this membershipFeature. |
| `updateTime` | string (google-datetime) | Output only. When the MembershipFeature resource was last updated. |

### `MembershipFeatureSpec`

- MembershipFeatureSpec contains configuration information for a single Membership.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `configmanagement` | ConfigManagementMembershipSpec | Config Management-specific spec. |
| `fleetobservability` | FleetObservabilityMembershipSpec | Fleet observability membership spec |
| `identityservice` | IdentityServiceMembershipSpec | Identity Service-specific spec. |
| `mesh` | ServiceMeshMembershipSpec | Anthos Service Mesh-specific spec |
| `origin` | Origin | Whether this per-Membership spec was inherited from a fleet-level default. This field can be updated by users by either overriding a Membership config (updated to USER implicitly) or setting to FLEET explicitly. |
| `policycontroller` | PolicyControllerMembershipSpec | Policy Controller spec. |

### `MembershipFeatureSpec` (v1alpha)

- MembershipFeatureSpec contains configuration information for a single Membership.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `cloudbuild` | CloudBuildMembershipSpec | Cloud Build-specific spec |
| `configmanagement` | ConfigManagementMembershipSpec | Config Management-specific spec. |
| `fleetobservability` | FleetObservabilityMembershipSpec | Fleet observability membership spec |
| `identityservice` | IdentityServiceMembershipSpec | Identity Service-specific spec. |
| `mesh` | ServiceMeshMembershipSpec | Anthos Service Mesh-specific spec |
| `namespaceactuation` | NamespaceActuationMembershipSpec | FNS Actuation membership spec |
| `origin` | Origin | Whether this per-Membership spec was inherited from a fleet-level default. This field can be updated by users by either overriding a Membership config (updated to USER implicitly) or setting to FLEET explicitly. |
| `policycontroller` | PolicyControllerMembershipSpec | Policy Controller spec. |
| `workloadcertificate` | MembershipSpec | Workload Certificate spec. |

### `MembershipFeatureSpec` (v1beta)

- MembershipFeatureSpec contains configuration information for a single Membership.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `cloudbuild` | MembershipSpec | Cloud Build-specific spec |
| `configmanagement` | ConfigManagementMembershipSpec | Config Management-specific spec. |
| `fleetobservability` | FleetObservabilityMembershipSpec | Fleet observability membership spec |
| `identityservice` | IdentityServiceMembershipSpec | Identity Service-specific spec. |
| `mesh` | ServiceMeshMembershipSpec | Anthos Service Mesh-specific spec |
| `origin` | Origin | Whether this per-Membership spec was inherited from a fleet-level default. This field can be updated by users by either overriding a Membership config (updated to USER implicitly) or setting to FLEET explicitly. |
| `policycontroller` | PolicyControllerMembershipSpec | Policy Controller spec. |

### `MembershipFeatureState`

- MembershipFeatureState contains Feature status information for a single Membership.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `appdevexperience` | AppDevExperienceFeatureState | Appdevexperience specific state. |
| `clusterupgrade` | ClusterUpgradeMembershipState | ClusterUpgrade state. |
| `configmanagement` | ConfigManagementMembershipState | Config Management-specific state. |
| `fleetobservability` | FleetObservabilityMembershipState | Fleet observability membership state. |
| `identityservice` | IdentityServiceMembershipState | Identity Service-specific state. |
| `policycontroller` | PolicyControllerMembershipState | Policycontroller-specific state. |
| `servicemesh` | ServiceMeshMembershipState | Service Mesh-specific state. |
| `state` | FeatureState | The high-level state of this Feature for a single membership. |
| `workloadidentity` | WorkloadIdentityMembershipState | Workload Identity membership specific state. |

### `MembershipFeatureState` (v1alpha)

- MembershipFeatureState contains Feature status information for a single Membership.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `appdevexperience` | AppDevExperienceFeatureState | Appdevexperience specific state. |
| `clusterupgrade` | ClusterUpgradeMembershipState | ClusterUpgrade state. |
| `configmanagement` | ConfigManagementMembershipState | Config Management-specific state. |
| `fleetobservability` | FleetObservabilityMembershipState | Fleet observability membership state. |
| `identityservice` | IdentityServiceMembershipState | Identity Service-specific state. |
| `metering` | MeteringMembershipState | Metering-specific state. |
| `namespaceactuation` | NamespaceActuationMembershipState | FNS Actuation membership state |
| `policycontroller` | PolicyControllerMembershipState | Policycontroller-specific state. |
| `servicemesh` | ServiceMeshMembershipState | Service Mesh-specific state. |
| `state` | FeatureState | The high-level state of this Feature for a single membership. |
| `workloadidentity` | WorkloadIdentityMembershipState | Workload Identity membership specific state. |

### `MembershipFeatureState` (v1beta)

- MembershipFeatureState contains Feature status information for a single Membership.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `appdevexperience` | AppDevExperienceFeatureState | Appdevexperience specific state. |
| `clusterupgrade` | ClusterUpgradeMembershipState | ClusterUpgrade state. |
| `configmanagement` | ConfigManagementMembershipState | Config Management-specific state. |
| `fleetobservability` | FleetObservabilityMembershipState | Fleet observability membership state. |
| `identityservice` | IdentityServiceMembershipState | Identity Service-specific state. |
| `metering` | MeteringMembershipState | Metering-specific state. |
| `policycontroller` | PolicyControllerMembershipState | Policycontroller-specific state. |
| `servicemesh` | ServiceMeshMembershipState | Service Mesh-specific state. |
| `state` | FeatureState | The high-level state of this Feature for a single membership. |
| `workloadidentity` | WorkloadIdentityMembershipState | Workload Identity membership specific state. |

### `MembershipSpec`

- \*\*Cloud Build\*\*: Configurations for each Cloud Build enabled cluster.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `securityPolicy` | string enum | Whether it is allowed to run the privileged builds on the cluster or not. Values: `SECURITY_POLICY_UNSPECIFIED`, `NON_PRIVILEGED`, `PRIVILEGED`. |
| `version` | string | Version of the cloud build software on the cluster. |

### `MembershipSpec` (v1alpha)

- \*\*Workload Certificate\*\*: The membership-specific input for WorkloadCertificate feature.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `certificateManagement` | string enum | Specifies workload certificate management. Values: `CERTIFICATE_MANAGEMENT_UNSPECIFIED`, `DISABLED`, `ENABLED`. |

### `MembershipState`

- MembershipState describes the state of a Membership resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `code` | string enum | Output only. The current state of the Membership resource. Values: `CODE_UNSPECIFIED`, `CREATING`, `READY`, `DELETING`, `UPDATING`, `SERVICE_UPDATING`. |

### `MembershipState` (v1beta1)

- State of the Membership resource.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `code` | string enum | Output only. The current state of the Membership resource. Values: `CODE_UNSPECIFIED`, `CREATING`, `READY`, `DELETING`, `UPDATING`, `SERVICE_UPDATING`. |
| `description` | string | This field is never set by the Hub Service. |
| `updateTime` | string (google-datetime) | This field is never set by the Hub Service. |

### `MeteringMembershipState`

- \*\*Metering\*\*: Per-Membership Feature State.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `lastMeasurementTime` | string (google-datetime) | The time stamp of the most recent measurement of the number of vCPUs in the cluster. |
| `preciseLastMeasuredClusterVcpuCapacity` | number (float) | The vCPUs capacity in the cluster according to the most recent measurement (1/1000 precision). |

### `MeteringState`

- \*\*Metering\*\*: State for a single membership, analyzed and reported by feature controller.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `lastMeasurementTime` | string (google-datetime) | The time stamp of the most recent measurement of the number of vCPUs in the cluster. |
| `preciseLastMeasuredClusterVcpuCapacity` | number (float) | The vCPUs capacity in the cluster according to the most recent measurement (1/1000 precision). |

### `MonitoringConfig`

- MonitoringConfig informs Fleet-based applications/services/UIs how the metrics for the underlying cluster is reported to cloud monitoring services. It can be set from empty to non-empty, but can't be mutated directly to prevent accidentally breaking the constinousty of metrics.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cluster` | string | Optional. Cluster name used to report metrics. For Anthos on VMWare/Baremetal/MultiCloud clusters, it would be in format {cluster_type}/{cluster_name}, e.g., "awsClusters/cluster_1". |
| `clusterHash` | string | Optional. For GKE and Multicloud clusters, this is the UUID of the cluster resource. For VMWare and Baremetal clusters, this is the kube-system UID. |
| `kubernetesMetricsPrefix` | string | Optional. Kubernetes system metrics, if available, are written to this prefix. This defaults to kubernetes.io for GKE, and kubernetes.io/anthos for Anthos eventually. Noted: Anthos MultiCloud will have kubernetes.io prefix today but will migration to be under kubernetes.io/anthos. |
| `location` | string | Optional. Location used to report Metrics |
| `projectId` | string | Optional. Project used to report Metrics |

### `MultiCloudCluster`

- MultiCloudCluster contains information specific to GKE Multi-Cloud clusters.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `clusterMissing` | boolean | Output only. If cluster_missing is set then it denotes that API(gkemulticloud.googleapis.com) resource for this GKE Multi-Cloud cluster no longer exists. |
| `resourceLink` | string | Immutable. Self-link of the Google Cloud resource for the GKE Multi-Cloud cluster. For example: //gkemulticloud.googleapis.com/projects/my-project/locations/us-west1-a/awsClusters/my-cluster //gkemulticloud.googleapis.com/projects/my-project/locations/us-west1-a/azureClusters/my-cluster //gkemulticloud.googleapis.com/projects/my-project/locations/us-west1-a/attachedClusters/my-cluster |

### `MultiClusterIngressFeatureSpec`

- \*\*Multi-cluster Ingress\*\*: The configuration for the MultiClusterIngress feature.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `configMembership` | string | Fully-qualified Membership name which hosts the MultiClusterIngress CRD. Example: `projects/foo-proj/locations/global/memberships/bar` |

### `MultiClusterIngressFeatureSpec` (v1beta)

- \*\*Multi-cluster Ingress\*\*: The configuration for the MultiClusterIngress feature.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `billing` | string enum | Deprecated: This field will be ignored and should not be set. Customer's billing structure. Values: `BILLING_UNSPECIFIED`, `PAY_AS_YOU_GO`, `ANTHOS_LICENSE`. |
| `configMembership` | string | Fully-qualified Membership name which hosts the MultiClusterIngress CRD. Example: `projects/foo-proj/locations/global/memberships/bar` |

### `Namespace`

- Namespace represents a namespace across the Fleet
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. When the namespace was created. |
| `deleteTime` | string (google-datetime) | Output only. When the namespace was deleted. |
| `labels` | object | Optional. Labels for this Namespace. |
| `name` | string | The resource name for the namespace `projects/{project}/locations/{location}/namespaces/{namespace}` |
| `namespaceLabels` | object | Optional. Namespace-level cluster namespace labels. These labels are applied to the related namespace of the member clusters bound to the parent Scope. Scope-level labels (`namespace_labels` in the Fleet Scope resource) take precedence over Namespace-level labels if they share a key. Keys and values must be Kubernetes-conformant. |
| `scope` | string | Required. Scope associated with the namespace |
| `state` | NamespaceLifecycleState | Output only. State of the namespace resource. |
| `uid` | string | Output only. Google-generated UUID for this resource. This is unique across all namespace resources. If a namespace resource is deleted and another resource with the same name is created, it gets a different uid. |
| `updateTime` | string (google-datetime) | Output only. When the namespace was last updated. |

### `NamespaceActuationFeatureSpec`

- An empty spec for actuation feature. This is required since Feature proto requires a spec.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `actuationMode` | string enum | actuation_mode controls the behavior of the controller Values: `ACTUATION_MODE_UNSPECIFIED`, `ACTUATION_MODE_CREATE_AND_DELETE_IF_CREATED`, `ACTUATION_MODE_ADD_AND_REMOVE_FLEET_LABELS`. |

### `NamespaceActuationFeatureState`

- NamespaceActuation Feature State.
- Version: v1alpha

### `NamespaceActuationMembershipSpec`

- \*\*Namespace Actuation\*\*: The membership-specific input for NamespaceActuation feature.
- Version: v1alpha

### `NamespaceActuationMembershipState`

- \*\*Namespace Actuation\*\*: An empty state left as an example membership-specific Feature state.
- Version: v1alpha

### `NamespaceLifecycleState`

- NamespaceLifecycleState describes the state of a Namespace resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `code` | string enum | Output only. The current state of the Namespace resource. Values: `CODE_UNSPECIFIED`, `CREATING`, `READY`, `DELETING`, `UPDATING`. |

### `OnPremCluster`

- OnPremCluster contains information specific to GKE On-Prem clusters.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `adminCluster` | boolean | Immutable. Whether the cluster is an admin cluster. |
| `clusterMissing` | boolean | Output only. If cluster_missing is set then it denotes that API(gkeonprem.googleapis.com) resource for this GKE On-Prem cluster no longer exists. |
| `clusterType` | string enum | Immutable. The on prem cluster's type. Values: `CLUSTERTYPE_UNSPECIFIED`, `BOOTSTRAP`, `HYBRID`, `STANDALONE`, `USER`. |
| `resourceLink` | string | Immutable. Self-link of the Google Cloud resource for the GKE On-Prem cluster. For example: //gkeonprem.googleapis.com/projects/my-project/locations/us-west1-a/vmwareClusters/my-cluster //gkeonprem.googleapis.com/projects/my-project/locations/us-west1-a/bareMetalClusters/my-cluster |

### `Operation`

- This resource represents a long-running operation that is the result of a network API call.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `done` | boolean | If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. |
| `error` | GoogleRpcStatus | The error result of the operation in case of failure or cancellation. |
| `metadata` | object | Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. |
| `name` | string | The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. |
| `response` | object | The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. |

### `OperationMetadata`

- Metadata of the long-running operation.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `apiVersion` | string | Output only. API version used to start the operation. |
| `cancelRequested` | boolean | Output only. Identifies whether the user has requested cancellation of the operation. Operations that have successfully been cancelled have Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. |
| `createTime` | string (google-datetime) | Output only. The time the operation was created. |
| `endTime` | string (google-datetime) | Output only. The time the operation finished running. |
| `statusDetail` | string | Output only. Human-readable status of the operation, if any. |
| `target` | string | Output only. Server-defined resource path for the target of the operation. |
| `verb` | string | Output only. Name of the verb executed by the operation. |

### `OperationalState`

- Operational state of the Rollout Sequence.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `reasons` | array<string> | Output only. Reasons for the Rollout Sequence state. Values: `REASON_UNSPECIFIED`, `FLEET_FEATURE_DELETED_ERROR`, `FLEET_DELETED_ERROR`, `EMPTY_STAGE_WARNING`, `MIXED_RELEASE_CHANNELS_WARNING`, `INTERNAL_ERROR`, `NO_CLUSTERS_IN_SEQUENCE`. |
| `state` | string enum | Output only. State of the Rollout Sequence. Values: `STATE_CODE_UNSPECIFIED`, `ACTIVE`, `WARNING`, `ERROR`, `INITIALIZING`. |
| `stateChangeTime` | string (google-datetime) | Output only. The timestamp at which the operational state was last changed. Used to track how long it has been in the current state. |

### `Origin`

- Origin defines where this FeatureSpec originated from.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `type` | string enum | Type specifies which type of origin is set. Values: `TYPE_UNSPECIFIED`, `FLEET`, `FLEET_OUT_OF_SYNC`, `USER`. |

### `PauseRolloutRequest`

- Request message for pausing a rollout.
- Version: v1

### `PerStageSoakDurationOverrides`

- Configuration for per-stage soak duration overrides.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `stageOverrides` | object | Required. A mapping of stage numbers to their respective desired soak durations. Key is the stage number, value is the desired soak duration. Stages omitted from the map will receive the standard soak duration configured on the sequence for that stage. |

### `Policy`

- An Identity and Access Management (IAM) policy, which specifies access controls for Google Cloud resources. A `Policy` is a collection of `bindings`. A `binding` binds one or more `members`, or principals, to a single `role`. Principals can be user accounts, service accounts, Google groups, and domains (such as G Suite). A `role` is a named list of permissions; each `role` can be an IAM predefined role or a user-created custom role. For some types of Google Cloud resources, a `binding` can also specify a `condition`, which is a logical expression that allows access to a resource only if the expression evaluates to `true`. A condition can add constraints based on attributes of the request, the resource, or both. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). \*\*JSON example:\*\* { "bindings": \[ { "role": "roles/resourcemanager.organizationAdmin", "members": \[ "user:mike@example.com", "group:admins@example.com", "domain:google.com", "serviceAccount:my-project-id@appspot.gserviceaccount.com" \] }, { "role": "roles/resourcemanager.organizationViewer", "members": \[ "user:eve@example.com" \], "condition": { "title": "expirable access", "description": "Does not grant access after Sep 2020", "expression": "request.time < timestamp('2020-10-01T00:00:00.000Z')", } } \], "etag": "BwWWja0YfJA=", "version": 3 } \*\*YAML example:\*\* bindings: - members: - user:mike@example.com - group:admins@example.com - domain:google.com - serviceAccount:my-project-id@appspot.gserviceaccount.com role: roles/resourcemanager.organizationAdmin - members: - user:eve@example.com role: roles/resourcemanager.organizationViewer condition: title: expirable access description: Does not grant access after Sep 2020 expression: request.time < timestamp('2020-10-01T00:00:00.000Z') etag: BwWWja0YfJA= version: 3 For a description of IAM and its features, see the IAM documentation (https://cloud.google.com/iam/docs/).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `auditConfigs` | array<AuditConfig> | Specifies cloud audit logging configuration for this policy. |
| `bindings` | array<Binding> | Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal. The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`. |
| `etag` | string (byte) | `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy. \*\*Important:\*\* If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. |
| `version` | integer (int32) | Specifies the format of the policy. Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected. Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations: \* Getting a policy that includes a conditional role binding \* Adding a conditional role binding to a policy \* Changing a conditional role binding in a policy \* Removing any role binding, with or without a condition, from a policy that includes conditions \*\*Important:\*\* If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `PolicyBinding`

- Binauthz policy that applies to this cluster.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | The relative resource name of the binauthz platform policy to audit. GKE platform policies have the following format: `projects/{project_number}/platforms/gke/policies/{policy_id}`. |

### `PolicyControllerBundleInstallSpec`

- BundleInstallSpec is the specification configuration for a single managed bundle.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `exemptedNamespaces` | array<string> | the set of namespaces to be exempted from the bundle |

### `PolicyControllerHubConfig`

- Configuration for Policy Controller
- Version: v2

| Field | Type | Description |
|---|---|---|
| `auditIntervalSeconds` | string (int64) | Sets the interval for Policy Controller Audit Scans (in seconds). When set to 0, this disables audit functionality altogether. |
| `constraintViolationLimit` | string (int64) | The maximum number of audit violations to be stored in a constraint. If not set, the internal default (currently 20) will be used. |
| `deploymentConfigs` | object | Map of deployment configs to deployments (“admission”, “audit”, “mutation”). |
| `exemptableNamespaces` | array<string> | The set of namespaces that are excluded from Policy Controller checks. Namespaces do not need to currently exist on the cluster. |
| `installSpec` | string enum | The install_spec represents the intended state specified by the latest request that mutated install_spec in the feature spec, not the lifecycle state of the feature observed by the Hub feature controller that is reported in the feature state. Values: `INSTALL_SPEC_UNSPECIFIED`, `INSTALL_SPEC_NOT_INSTALLED`, `INSTALL_SPEC_ENABLED`, `INSTALL_SPEC_SUSPENDED`, `INSTALL_SPEC_DETACHED`. |
| `logDeniesEnabled` | boolean | Logs all denies and dry run failures. |
| `monitoring` | PolicyControllerMonitoringConfig | Monitoring specifies the configuration of monitoring. |
| `mutationEnabled` | boolean | Enables the ability to mutate resources using Policy Controller. |
| `policyContent` | PolicyControllerPolicyContentSpec | Specifies the desired policy content on the cluster |
| `referentialRulesEnabled` | boolean | Enables the ability to use Constraint Templates that reference to objects other than the object currently being evaluated. |

### `PolicyControllerMembershipSpec`

- \*\*Policy Controller\*\*: Configuration for a single cluster. Intended to parallel the PolicyController CR.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `policyControllerHubConfig` | PolicyControllerHubConfig | Policy Controller configuration for the cluster. |
| `version` | string | Version of Policy Controller installed. |

### `PolicyControllerMembershipState`

- \*\*Policy Controller\*\*: State for a single cluster.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `componentStates` | object | Currently these include (also serving as map keys): 1. "admission" 2. "audit" 3. "mutation" |
| `policyContentState` | PolicyControllerPolicyContentState | The overall content state observed by the Hub Feature controller. |
| `state` | string enum | The overall Policy Controller lifecycle state observed by the Hub Feature controller. Values: `LIFECYCLE_STATE_UNSPECIFIED`, `NOT_INSTALLED`, `INSTALLING`, `ACTIVE`, `UPDATING`, `DECOMMISSIONING`, `CLUSTER_ERROR`, `HUB_ERROR`, `SUSPENDED`, `DETACHED`. |

### `PolicyControllerMonitoringConfig`

- MonitoringConfig specifies the backends Policy Controller should export metrics to. For example, to specify metrics should be exported to Cloud Monitoring and Prometheus, specify backends: \["cloudmonitoring", "prometheus"\]
- Version: v2

| Field | Type | Description |
|---|---|---|
| `backends` | array<string> | Specifies the list of backends Policy Controller will export to. An empty list would effectively disable metrics export. Values: `MONITORING_BACKEND_UNSPECIFIED`, `PROMETHEUS`, `CLOUD_MONITORING`. |

### `PolicyControllerOnClusterState`

- OnClusterState represents the state of a sub-component of Policy Controller.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `details` | string | Surface potential errors or information logs. |
| `state` | string enum | The lifecycle state of this component. Values: `LIFECYCLE_STATE_UNSPECIFIED`, `NOT_INSTALLED`, `INSTALLING`, `ACTIVE`, `UPDATING`, `DECOMMISSIONING`, `CLUSTER_ERROR`, `HUB_ERROR`, `SUSPENDED`, `DETACHED`. |

### `PolicyControllerPolicyContentSpec`

- PolicyContentSpec defines the user's desired content configuration on the cluster.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `bundles` | object | map of bundle name to BundleInstallSpec. The bundle name maps to the `bundleName` key in the `policycontroller.gke.io/constraintData` annotation on a constraint. |
| `templateLibrary` | PolicyControllerTemplateLibraryConfig | Configures the installation of the Template Library. |

### `PolicyControllerPolicyContentState`

- The state of the policy controller policy content
- Version: v2

| Field | Type | Description |
|---|---|---|
| `bundleStates` | object | The state of the any bundles included in the chosen version of the manifest |
| `referentialSyncConfigState` | PolicyControllerOnClusterState | The state of the referential data sync configuration. This could represent the state of either the syncSet object(s) or the config object, depending on the version of PoCo configured by the user. |
| `templateLibraryState` | PolicyControllerOnClusterState | The state of the template library |

### `PolicyControllerPolicyControllerDeploymentConfig`

- Deployment-specific configuration.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `containerResources` | PolicyControllerResourceRequirements | Container resource requirements. |
| `podAffinity` | string enum | Pod affinity configuration. Values: `AFFINITY_UNSPECIFIED`, `NO_AFFINITY`, `ANTI_AFFINITY`. |
| `podAntiAffinity` | boolean | Pod anti-affinity enablement. Deprecated: use `pod_affinity` instead. |
| `podTolerations` | array<PolicyControllerToleration> | Pod tolerations of node taints. |
| `replicaCount` | string (int64) | Pod replica count. |

### `PolicyControllerResourceList`

- ResourceList contains container resource requirements.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `cpu` | string | CPU requirement expressed in Kubernetes resource units. |
| `memory` | string | Memory requirement expressed in Kubernetes resource units. |

### `PolicyControllerResourceRequirements`

- ResourceRequirements describes the compute resource requirements.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `limits` | PolicyControllerResourceList | Limits describes the maximum amount of compute resources allowed for use by the running container. |
| `requests` | PolicyControllerResourceList | Requests describes the amount of compute resources reserved for the container by the kube-scheduler. |

### `PolicyControllerSpec`

- \*\*Policy Controller\*\*: Configuration for a single cluster. Intended to parallel the PolicyController CR.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `policyControllerHubConfig` | PolicyControllerHubConfig | Policy Controller configuration for the cluster. |
| `version` | string | Version of Policy Controller installed. |

### `PolicyControllerState`

- \*\*Policy Controller\*\*: State for a single cluster.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `componentStates` | object | Currently these include (also serving as map keys): 1. "admission" 2. "audit" 3. "mutation" |
| `policyContentState` | PolicyControllerPolicyContentState | The overall content state observed by the Hub Feature controller. |
| `state` | string enum | The overall Policy Controller lifecycle state observed by the Hub Feature controller. Values: `LIFECYCLE_STATE_UNSPECIFIED`, `NOT_INSTALLED`, `INSTALLING`, `ACTIVE`, `UPDATING`, `DECOMMISSIONING`, `CLUSTER_ERROR`, `HUB_ERROR`, `SUSPENDED`, `DETACHED`. |

### `PolicyControllerTemplateLibraryConfig`

- The config specifying which default library templates to install.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `installation` | string enum | Configures the manner in which the template library is installed on the cluster. Values: `INSTALLATION_UNSPECIFIED`, `NOT_INSTALLED`, `ALL`. |

### `PolicyControllerToleration`

- Toleration of a node taint.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `effect` | string | Matches a taint effect. |
| `key` | string | Matches a taint key (not necessarily unique). |
| `operator` | string | Matches a taint operator. |
| `value` | string | Matches a taint value. |

### `RBACRoleBinding`

- RBACRoleBinding represents a rbacrolebinding across the Fleet
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. When the rbacrolebinding was created. |
| `deleteTime` | string (google-datetime) | Output only. When the rbacrolebinding was deleted. |
| `group` | string | group is the group, as seen by the kubernetes cluster. |
| `labels` | object | Optional. Labels for this RBACRolebinding. |
| `name` | string | The resource name for the rbacrolebinding `projects/{project}/locations/{location}/scopes/{scope}/rbacrolebindings/{rbacrolebinding}` or `projects/{project}/locations/{location}/memberships/{membership}/rbacrolebindings/{rbacrolebinding}` |
| `role` | Role | Required. Role to bind to the principal |
| `state` | RBACRoleBindingLifecycleState | Output only. State of the rbacrolebinding resource. |
| `uid` | string | Output only. Google-generated UUID for this resource. This is unique across all rbacrolebinding resources. If a rbacrolebinding resource is deleted and another resource with the same name is created, it gets a different uid. |
| `updateTime` | string (google-datetime) | Output only. When the rbacrolebinding was last updated. |
| `user` | string | user is the name of the user as seen by the kubernetes cluster, example "alice" or "alice@domain.tld" |

### `RBACRoleBindingActuationFeatureSpec`

- \*\*RBAC RoleBinding Actuation\*\*: The Hub-wide input for the RBACRoleBindingActuation feature.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `allowedCustomRoles` | array<string> | The list of allowed custom roles (ClusterRoles). If a ClusterRole is not part of this list, it cannot be used in a Scope RBACRoleBinding. If a ClusterRole in this list is in use, it cannot be removed from the list. |

### `RBACRoleBindingActuationFeatureState`

- \*\*RBAC RoleBinding Actuation\*\*: An empty state left as an example Hub-wide Feature state.
- Version: v1

### `RBACRoleBindingActuationRBACRoleBindingState`

- RBACRoleBindingState is the status of an RBACRoleBinding which exists on a membership.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `description` | string | The reason for the failure. |
| `state` | string enum | Output only. The state of the RBACRoleBinding. Values: `ROLE_BINDING_STATE_UNSPECIFIED`, `OK`, `CUSTOM_ROLE_MISSING_FROM_CLUSTER`. |
| `updateTime` | string (google-datetime) | The time the RBACRoleBinding status was last updated. |

### `RBACRoleBindingActuationSpec`

- \*\*RBAC RoleBinding Actuation\*\*: The membership-specific input for RBACRoleBindingActuation feature.
- Version: v2

### `RBACRoleBindingActuationState`

- \*\*RBAC RoleBinding Actuation\*\*: A membership-specific Feature state for the RBACRoleBindingActuation fleet feature.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `rbacrolebindingStates` | object | Output only. The state of RBACRoleBindings using custom roles that exist on the cluster, keyed by RBACRoleBinding resource name with format: projects/{project}/locations/{location}/scopes/{scope}/rbacrolebindings/{rbacrolebinding}. |

### `RBACRoleBindingLifecycleState`

- RBACRoleBindingLifecycleState describes the state of a RbacRoleBinding resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `code` | string enum | Output only. The current state of the rbacrolebinding resource. Values: `CODE_UNSPECIFIED`, `CREATING`, `READY`, `DELETING`, `UPDATING`. |

### `ResourceManifest`

- ResourceManifest represents a single Kubernetes resource to be applied to the cluster.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `clusterScoped` | boolean | Output only. Whether the resource provided in the manifest is `cluster_scoped`. If unset, the manifest is assumed to be namespace scoped. This field is used for REST mapping when applying the resource in a cluster. |
| `manifest` | string | Output only. YAML manifest of the resource. |

### `ResourceOptions`

- ResourceOptions represent options for Kubernetes resource generation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `connectVersion` | string | Optional. The Connect agent version to use for connect_resources. Defaults to the latest GKE Connect version. The version must be a currently supported version, obsolete versions will be rejected. |
| `k8sGitVersion` | string | Optional. Git version of the Kubernetes cluster. This is only used to gate the Connect Agent migration to svc.id.goog on GDC-SO 1.33.100 patch and above. |
| `k8sVersion` | string | Optional. Major and minor version of the Kubernetes cluster. This is only used to determine which version to use for the CustomResourceDefinition resources, `apiextensions/v1beta1` or`apiextensions/v1`. |
| `v1beta1Crd` | boolean | Optional. Use `apiextensions/v1beta1` instead of `apiextensions/v1` for CustomResourceDefinition resources. This option should be set for clusters with Kubernetes apiserver versions <1.16. |

### `ResumeRolloutRequest`

- Request message for resuming a rollout.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `scheduleOffset` | string (google-duration) | Optional. The duration to offset the Rollout schedule by. |
| `validateOnly` | boolean | Optional. If set, resume rollout will be executed in dry-run mode. |

### `Role`

- Role is the type for Kubernetes roles
- Version: v1

| Field | Type | Description |
|---|---|---|
| `customRole` | string | Optional. custom_role is the name of a custom KubernetesClusterRole to use. |
| `predefinedRole` | string enum | predefined_role is the Kubernetes default role to use Values: `UNKNOWN`, `ADMIN`, `EDIT`, `VIEW`, `ANTHOS_SUPPORT`. |

### `Rollout`

- Rollout contains the Rollout metadata and configuration. Next ID: 32
- Version: v1

| Field | Type | Description |
|---|---|---|
| `completeTime` | string (google-datetime) | Output only. The timestamp at which the Rollout was completed. |
| `createTime` | string (google-datetime) | Output only. The timestamp at which the Rollout was created. |
| `deleteTime` | string (google-datetime) | Output only. The timestamp at the Rollout was deleted. |
| `displayName` | string | Optional. Human readable display name of the Rollout. |
| `etag` | string | Output only. etag of the Rollout Ex. abc1234 |
| `ignoreClusterDisruptionBudgets` | boolean | Optional. If set to true, the rollout will ignore the disruption budgets of the clusters. |
| `ignoreMaintenancePolicies` | boolean | Optional. If set to true, the rollout will ignore any maintenance policies (Maintenance Windows and Maintenance Exclusions) set on the clusters. |
| `intent` | string enum | Output only. The intent of the rollout. Values: `ROLLOUT_INTENT_UNSPECIFIED`, `REGULAR_UPGRADE`, `CONTROL_PLANE_PATCH_ENFORCEMENT`, `END_OF_SUPPORT_ENFORCEMENT`, `PARTIAL_PATCH`. |
| `labels` | object | Optional. Labels for this Rollout. |
| `membershipStates` | object | Output only. States of upgrading control plane or node pool targets of a single cluster (GKE Hub membership) that's part of this Rollout. The key is the membership name of the cluster. The value is the state of the cluster. |
| `name` | string | Identifier. The full, unique resource name of this Rollout in the format of `projects/{project}/locations/global/rollouts/{rollout}`. |
| `prioritized` | boolean | Optional. If set to true, conflicting rollouts will be paused, to allow this rollout to progress through the sequence. Conflicting rollouts running on the first stage will be canceled, to allow this rollout to be created. |
| `rolloutSequence` | string | Optional. Immutable. The full, unique resource name of the rollout sequence that initiatied this Rollout. In the format of `projects/{project}/locations/global/rolloutSequences/{rollout_sequence}`. |
| `stageSoakDurationOverrides` | object | Optional. Overrides the soak durations for specific stages of the rollout. Key is the stage number, value is the desired soak duration. Stages omitted from the map will receive the standard soak duration configured on the sequence for that stage. |
| `stages` | array<RolloutStage> | Output only. The stages of the Rollout. |
| `state` | string enum | Output only. State specifies various states of the Rollout. Values: `STATE_UNSPECIFIED`, `RUNNING`, `PAUSED`, `CANCELLED`, `COMPLETED`. |
| `stateReason` | string | Output only. A human-readable description explaining the reason for the current state. |
| `stateReasonType` | string enum | Output only. StateReasonType specifies the reason type of the Rollout state. Values: `STATE_REASON_TYPE_UNSPECIFIED`, `PAUSED_BY_USER`, `PAUSED_BY_SYSTEM_CONFIG`, `PAUSED_WAITING_FOR_NEXT_STAGE`, `CANCELLED_BY_USER`, `CANCELLED_PAUSED_TOO_LONG`, `CANCELLED_SUPERSEDED`, `CANCELLED_INCOMPATIBLE_ROLLOUT_SEQUENCE`, `CANCELLED_SUPERSEDED_BY_USER_ROLLOUT`. |
| `trigger` | string enum | Output only. The trigger of the rollout. Values: `ROLLOUT_TRIGGER_UNSPECIFIED`, `USER`, `GKE`. |
| `uid` | string | Output only. Google-generated UUID for this resource. This is unique across all Rollout resources. If a Rollout resource is deleted and another resource with the same name is created, it gets a different uid. |
| `updateTime` | string (google-datetime) | Output only. The timestamp at which the Rollout was last updated. |
| `versionUpgrade` | VersionUpgrade | Optional. Config for version upgrade of clusters. |

### `RolloutCreationScope`

- The scope for automatic rollout creation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `upgradeTypes` | array<string> | Optional. The list of enabled upgrade types. Values: `UPGRADE_TYPE_UNSPECIFIED`, `CONTROL_PLANE_MINOR`, `CONTROL_PLANE_PATCH`, `NODE_MINOR`, `NODE_PATCH`. |

### `RolloutMembershipState`

- Metadata about single cluster (GKE Hub membership) that's part of this Rollout.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `lastUpdateTime` | string (google-datetime) | Optional. Output only. The time this status and any related Rollout-specific details for the membership were updated. |
| `stageAssignment` | integer (int32) | Output only. The stage assignment of this cluster in this rollout. |
| `targets` | array<RolloutTarget> | Output only. The targets of the rollout - clusters or node pools that are being upgraded. All targets belongs to the same cluster, identified by the membership name (key of membership_states map). |

### `RolloutSequence`

- RolloutSequence defines the desired order of upgrades. Next ID: 22
- Version: v1

| Field | Type | Description |
|---|---|---|
| `autoUpgradeConfig` | AutoUpgradeConfig | Optional. Configuration for automatic upgrades. If this message is `unset`, the system applies default behavior. |
| `computedReleaseChannel` | string enum | Output only. The computed release channel used for the Rollout Sequence. Values: `GKE_RELEASE_CHANNEL_UNSPECIFIED`, `RAPID`, `REGULAR`, `STABLE`, `EXTENDED`, `NO_CHANNEL`. |
| `createTime` | string (google-datetime) | Output only. The timestamp at which the Rollout Sequence was created. |
| `deleteTime` | string (google-datetime) | Output only. The timestamp at the Rollout Sequence was deleted. |
| `displayName` | string | Optional. Human readable display name of the Rollout Sequence. |
| `effectiveAutoUpgradeConfig` | AutoUpgradeConfig | Output only. The resolved auto-upgrade options which are in effect. |
| `etag` | string | Output only. etag of the Rollout Sequence Ex. abc1234 |
| `ignoredClustersSelector` | ClusterSelector | Optional. Selector for clusters to exclude from the Rollout Sequence. |
| `labels` | object | Optional. Labels for this Rollout Sequence. |
| `lastQualifiedControlPlaneVersion` | string | Output only. The last qualified control plane version. |
| `lastQualifiedNodeVersion` | string | Output only. The last qualified node version. |
| `name` | string | Identifier. Name of the rollout sequence in the format of: projects/{PROJECT_ID}/locations/global/rolloutSequences/{NAME} |
| `operationalState` | OperationalState | Output only. Operational state of the Rollout Sequence. |
| `stages` | array<Stage> | Required. Ordered list of stages that constitutes this Rollout. |
| `targetControlPlaneVersion` | string | Output only. The target control plane version of the Rollout Sequence. |
| `targetNodeVersion` | string | Output only. The target node version of the Rollout Sequence. |
| `uid` | string | Output only. Google-generated UUID for this resource. This is unique across all Rollout Sequence resources. If a Rollout Sequence resource is deleted and another resource with the same name is created, it gets a different uid. |
| `updateTime` | string (google-datetime) | Output only. The timestamp at which the Rollout Sequence was last updated. |

### `RolloutStage`

- Stage represents a single stage in the Rollout.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `clusterSelector` | ClusterSelector | Output only. The selector from the sequence that was used to create this stage. Example CEL expression: resource.labels.canary == 'true' |
| `endTime` | string (google-datetime) | Optional. Output only. The time at which the stage ended. |
| `fleetProjects` | array<string> | Output only. The fleet projects from the sequence that was used to create this stage. Expected format: projects/{project_number} |
| `soakDuration` | string (google-duration) | Optional. Duration to soak after this stage before starting the next stage. |
| `stageNumber` | integer (int32) | Output only. The stage number to which this status applies. |
| `startTime` | string (google-datetime) | Optional. Output only. The time at which the stage started. |
| `state` | string enum | Output only. The state of the stage. Values: `STATE_UNSPECIFIED`, `PENDING`, `RUNNING`, `SOAKING`, `COMPLETED`, `PAUSED`. |

### `RolloutTarget`

- Metadata about the status of targets (clusters or node pools) involved in the Rollout.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cluster` | string | Optional. Output only. The resource link of the Cluster resource upgraded in this Rollout. It is formatted as: `//{api_service}/projects/{project_number}/locations/{location}/clusters/{cluster_name}`. . |
| `nodePool` | string | Optional. Output only. The resource link of the NodePool resource upgraded in this Rollout. It is formatted as: `//{api_service}/projects/{project_number}/locations/{location}/clusters/{cluster_name}/nodePools/{node_pool_name}`. |
| `operation` | string | Optional. Output only. The operation resource name performing the mutation. |
| `reason` | string | Optional. Output only. A human-readable description of the current status. |
| `state` | string enum | Output only. The high-level, machine-readable status of this Rollout for the target. Values: `STATE_UNSPECIFIED`, `PENDING`, `RUNNING`, `FAILED`, `SUCCEEDED`, `PAUSED`, `REMOVED`, `INELIGIBLE`, `SKIPPED`. |

### `Scope`

- Scope represents a Scope in a Fleet.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. When the scope was created. |
| `deleteTime` | string (google-datetime) | Output only. When the scope was deleted. |
| `labels` | object | Optional. Labels for this Scope. |
| `name` | string | The resource name for the scope `projects/{project}/locations/{location}/scopes/{scope}` |
| `namespaceLabels` | object | Optional. Scope-level cluster namespace labels. For the member clusters bound to the Scope, these labels are applied to each namespace under the Scope. Scope-level labels take precedence over Namespace-level labels (`namespace_labels` in the Fleet Namespace resource) if they share a key. Keys and values must be Kubernetes-conformant. |
| `state` | ScopeLifecycleState | Output only. State of the scope resource. |
| `uid` | string | Output only. Google-generated UUID for this resource. This is unique across all scope resources. If a scope resource is deleted and another resource with the same name is created, it gets a different uid. |
| `updateTime` | string (google-datetime) | Output only. When the scope was last updated. |

### `ScopeFeatureSpec`

- ScopeFeatureSpec contains feature specs for a fleet scope.
- Version: v1

### `ScopeFeatureSpec` (v1alpha)

- ScopeFeatureSpec contains feature specs for a fleet scope.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `clusterupgrade` | ClusterUpgradeScopeSpec | Spec for the ClusterUpgrade feature at the scope level |

### `ScopeFeatureState`

- ScopeFeatureState contains Scope-wide Feature status information.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `state` | FeatureState | Output only. The "running state" of the Feature in this Scope. |

### `ScopeFeatureState` (v1alpha)

- ScopeFeatureState contains Scope-wide Feature status information.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `clusterupgrade` | ClusterUpgradeScopeState | State for the ClusterUpgrade feature at the scope level |
| `state` | FeatureState | Output only. The "running state" of the Feature in this Scope. |

### `ScopeLifecycleState`

- ScopeLifecycleState describes the state of a Scope resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `code` | string enum | Output only. The current state of the scope resource. Values: `CODE_UNSPECIFIED`, `CREATING`, `READY`, `DELETING`, `UPDATING`. |

### `SecurityPostureConfig`

- SecurityPostureConfig defines the flags needed to enable/disable features for the Security Posture API.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `mode` | string enum | Sets which mode to use for Security Posture features. Values: `MODE_UNSPECIFIED`, `DISABLED`, `BASIC`, `ENTERPRISE`. |
| `vulnerabilityMode` | string enum | Sets which mode to use for vulnerability scanning. Values: `VULNERABILITY_MODE_UNSPECIFIED`, `VULNERABILITY_DISABLED`, `VULNERABILITY_BASIC`, `VULNERABILITY_ENTERPRISE`. |

### `ServiceMeshAnalysisMessage`

- AnalysisMessage is a single message produced by an analyzer, and it used to communicate to the end user about the state of their Service Mesh configuration.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `args` | object | A UI can combine these args with a template (based on message_base.type) to produce an internationalized message. |
| `description` | string | A human readable description of what the error means. It is suitable for non-internationalize display purposes. |
| `messageBase` | ServiceMeshAnalysisMessageBase | Details common to all types of Istio and ServiceMesh analysis messages. |
| `resourcePaths` | array<string> | A list of strings specifying the resource identifiers that were the cause of message generation. A "path" here may be: \* MEMBERSHIP_ID if the cause is a specific member cluster \* MEMBERSHIP_ID/(NAMESPACE\/)?RESOURCETYPE/NAME if the cause is a resource in a cluster |

### `ServiceMeshAnalysisMessageBase`

- AnalysisMessageBase describes some common information that is needed for all messages.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `documentationUrl` | string | A url pointing to the Service Mesh or Istio documentation for this specific error type. |
| `level` | string enum | Represents how severe a message is. Values: `LEVEL_UNSPECIFIED`, `ERROR`, `WARNING`, `INFO`. |
| `type` | ServiceMeshType | Represents the specific type of a message. |

### `ServiceMeshCondition`

- Condition being reported.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `code` | string enum | Unique identifier of the condition which describes the condition recognizable to the user. Values: `CODE_UNSPECIFIED`, `MESH_IAM_PERMISSION_DENIED`, `MESH_IAM_CROSS_PROJECT_PERMISSION_DENIED`, `CNI_CONFIG_UNSUPPORTED`, `GKE_SANDBOX_UNSUPPORTED`, `NODEPOOL_WORKLOAD_IDENTITY_FEDERATION_REQUIRED`, `CNI_INSTALLATION_FAILED`, `CNI_POD_UNSCHEDULABLE`, `CLUSTER_HAS_ZERO_NODES`, `CANONICAL_SERVICE_ERROR`, `UNSUPPORTED_MULTIPLE_CONTROL_PLANES`, `VPCSC_GA_SUPPORTED`, `DEPRECATED_SPEC_CONTROL_PLANE_MANAGEMENT`, `DEPRECATED_SPEC_CONTROL_PLANE_MANAGEMENT_SAFE`, `CONFIG_APPLY_INTERNAL_ERROR`, `CONFIG_VALIDATION_ERROR`, `CONFIG_VALIDATION_WARNING`, `QUOTA_EXCEEDED_BACKEND_SERVICES`, `QUOTA_EXCEEDED_HEALTH_CHECKS`, `QUOTA_EXCEEDED_HTTP_ROUTES`, `QUOTA_EXCEEDED_TCP_ROUTES`, `QUOTA_EXCEEDED_TLS_ROUTES`, `QUOTA_EXCEEDED_TRAFFIC_POLICIES`, `QUOTA_EXCEEDED_ENDPOINT_POLICIES`, `QUOTA_EXCEEDED_GATEWAYS`, `QUOTA_EXCEEDED_MESHES`, `QUOTA_EXCEEDED_SERVER_TLS_POLICIES`, `QUOTA_EXCEEDED_CLIENT_TLS_POLICIES`, `QUOTA_EXCEEDED_SERVICE_LB_POLICIES`, `QUOTA_EXCEEDED_HTTP_FILTERS`, `QUOTA_EXCEEDED_TCP_FILTERS`, `QUOTA_EXCEEDED_NETWORK_ENDPOINT_GROUPS`, `CONFIG_APPLY_BLOCKED`, `LEGACY_MC_SECRETS`, `WORKLOAD_IDENTITY_REQUIRED`, `NON_STANDARD_BINARY_USAGE`, `UNSUPPORTED_GATEWAY_CLASS`, `MANAGED_CNI_NOT_ENABLED`, `MISSING_CONTROL_PLANE_CONFIG`, `SHARED_VPC_MISSING_PERMISSIONS`, `REQUIRED_ORG_POLICY_DISABLED`, `MODERNIZATION_INCOMPATIBLE_POD_ANNOTATION`, `MODERNIZATION_INCOMPATIBLE_CONFIG`, `MODERNIZATION_INCOMPATIBLE_GATEWAY_POD_SCALE`, `MODERNIZATION_REQUIRES_MANUAL_WORKLOAD_RESTART`, `MODERNIZATION_UNEVICTABLE_POD_DISRUPTION_BUDGET`, `MODERNIZATION_SCHEDULED`, `MODERNIZATION_IN_PROGRESS`, `MODERNIZATION_COMPLETED`, `MODERNIZATION_ABORTED`, `MODERNIZATION_PREPARING`, `MODERNIZATION_STALLED`, `MODERNIZATION_PREPARED`, `MODERNIZATION_MIGRATING_WORKLOADS`, `MODERNIZATION_ROLLING_BACK_CLUSTER`, `MODERNIZATION_AWAITING_MANUAL_WORKLOAD_RESTART`, `MODERNIZATION_WILL_BE_SCHEDULED`, `MODERNIZATION_MANUAL`, `MODERNIZATION_ELIGIBLE`, `MODERNIZATION_MODERNIZING`, `MODERNIZATION_MODERNIZED_SOAKING`, `MODERNIZATION_FINALIZED`, `MODERNIZATION_ROLLING_BACK_FLEET`, `MODERNIZATION_MODERNIZED`, `MODERNIZATION_REQUIRES_CUSTOMER_TRIGGER`, `MODERNIZATION_COMPATIBLE`, `MODERNIZATION_INCOMPATIBLE`, `MODERNIZATION_INCOMPATIBLE_FLEET_SCALE`, `MODERNIZATION_INCOMPATIBLE_FLEET_QUOTA`. |
| `details` | string | A short summary about the issue. |
| `documentationLink` | string | Links contains actionable information. |
| `severity` | string enum | Severity level of the condition. Values: `SEVERITY_UNSPECIFIED`, `ERROR`, `WARNING`, `INFO`. |

### `ServiceMeshControlPlaneManagement`

- Status of control plane management.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `details` | array<ServiceMeshStatusDetails> | Explanation of state. |
| `implementation` | string enum | Output only. Implementation of managed control plane. Values: `IMPLEMENTATION_UNSPECIFIED`, `ISTIOD`, `TRAFFIC_DIRECTOR`, `UPDATING`. |
| `state` | string enum | LifecycleState of control plane management. Values: `LIFECYCLE_STATE_UNSPECIFIED`, `DISABLED`, `FAILED_PRECONDITION`, `PROVISIONING`, `ACTIVE`, `STALLED`, `NEEDS_ATTENTION`, `DEGRADED`, `DEPROVISIONING`. |

### `ServiceMeshDataPlaneManagement`

- Status of data plane management. Only reported per-member.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `details` | array<ServiceMeshStatusDetails> | Explanation of the status. |
| `state` | string enum | Lifecycle status of data plane management. Values: `LIFECYCLE_STATE_UNSPECIFIED`, `DISABLED`, `FAILED_PRECONDITION`, `PROVISIONING`, `ACTIVE`, `STALLED`, `NEEDS_ATTENTION`, `DEGRADED`, `DEPROVISIONING`. |

### `ServiceMeshFeatureCondition`

- Condition being reported.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `code` | string enum | Unique identifier of the condition which describes the condition recognizable to the user. Values: `CODE_UNSPECIFIED`, `MESH_IAM_PERMISSION_DENIED`, `MESH_IAM_CROSS_PROJECT_PERMISSION_DENIED`, `CNI_CONFIG_UNSUPPORTED`, `GKE_SANDBOX_UNSUPPORTED`, `NODEPOOL_WORKLOAD_IDENTITY_FEDERATION_REQUIRED`, `CNI_INSTALLATION_FAILED`, `CNI_POD_UNSCHEDULABLE`, `CLUSTER_HAS_ZERO_NODES`, `CANONICAL_SERVICE_ERROR`, `UNSUPPORTED_MULTIPLE_CONTROL_PLANES`, `VPCSC_GA_SUPPORTED`, `DEPRECATED_SPEC_CONTROL_PLANE_MANAGEMENT`, `DEPRECATED_SPEC_CONTROL_PLANE_MANAGEMENT_SAFE`, `CONFIG_APPLY_INTERNAL_ERROR`, `CONFIG_VALIDATION_ERROR`, `CONFIG_VALIDATION_WARNING`, `QUOTA_EXCEEDED_BACKEND_SERVICES`, `QUOTA_EXCEEDED_HEALTH_CHECKS`, `QUOTA_EXCEEDED_HTTP_ROUTES`, `QUOTA_EXCEEDED_TCP_ROUTES`, `QUOTA_EXCEEDED_TLS_ROUTES`, `QUOTA_EXCEEDED_TRAFFIC_POLICIES`, `QUOTA_EXCEEDED_ENDPOINT_POLICIES`, `QUOTA_EXCEEDED_GATEWAYS`, `QUOTA_EXCEEDED_MESHES`, `QUOTA_EXCEEDED_SERVER_TLS_POLICIES`, `QUOTA_EXCEEDED_CLIENT_TLS_POLICIES`, `QUOTA_EXCEEDED_SERVICE_LB_POLICIES`, `QUOTA_EXCEEDED_HTTP_FILTERS`, `QUOTA_EXCEEDED_TCP_FILTERS`, `QUOTA_EXCEEDED_NETWORK_ENDPOINT_GROUPS`, `CONFIG_APPLY_BLOCKED`, `LEGACY_MC_SECRETS`, `WORKLOAD_IDENTITY_REQUIRED`, `NON_STANDARD_BINARY_USAGE`, `UNSUPPORTED_GATEWAY_CLASS`, `MANAGED_CNI_NOT_ENABLED`, `MISSING_CONTROL_PLANE_CONFIG`, `SHARED_VPC_MISSING_PERMISSIONS`, `REQUIRED_ORG_POLICY_DISABLED`, `MODERNIZATION_INCOMPATIBLE_POD_ANNOTATION`, `MODERNIZATION_INCOMPATIBLE_CONFIG`, `MODERNIZATION_INCOMPATIBLE_GATEWAY_POD_SCALE`, `MODERNIZATION_REQUIRES_MANUAL_WORKLOAD_RESTART`, `MODERNIZATION_SCHEDULED`, `MODERNIZATION_IN_PROGRESS`, `MODERNIZATION_COMPLETED`, `MODERNIZATION_ABORTED`, `MODERNIZATION_PREPARING`, `MODERNIZATION_STALLED`, `MODERNIZATION_PREPARED`, `MODERNIZATION_MIGRATING_WORKLOADS`, `MODERNIZATION_ROLLING_BACK_CLUSTER`, `MODERNIZATION_AWAITING_MANUAL_WORKLOAD_RESTART`, `MODERNIZATION_WILL_BE_SCHEDULED`, `MODERNIZATION_MANUAL`, `MODERNIZATION_ELIGIBLE`, `MODERNIZATION_MODERNIZING`, `MODERNIZATION_MODERNIZED_SOAKING`, `MODERNIZATION_FINALIZED`, `MODERNIZATION_ROLLING_BACK_FLEET`, `MODERNIZATION_MODERNIZED`, `MODERNIZATION_REQUIRES_CUSTOMER_TRIGGER`, `MODERNIZATION_COMPATIBLE`, `MODERNIZATION_INCOMPATIBLE`, `MODERNIZATION_INCOMPATIBLE_FLEET_SCALE`, `MODERNIZATION_INCOMPATIBLE_FLEET_QUOTA`. |
| `details` | string | A short summary about the issue. |
| `documentationLink` | string | Links contains actionable information. |
| `severity` | string enum | Severity level of the condition. Values: `SEVERITY_UNSPECIFIED`, `ERROR`, `WARNING`, `INFO`. |

### `ServiceMeshFeatureSpec`

- \*\*Service Mesh\*\*: Spec for the fleet for the servicemesh feature
- Version: v1

| Field | Type | Description |
|---|---|---|
| `modernizationCompatibility` | string enum | Optional. Specifies modernization compatibility for the fleet. Values: `MODERNIZATION_COMPATIBILITY_UNSPECIFIED`, `VALIDATION_ENABLED`, `VALIDATION_DISABLED`. |
| `modernizationStrategy` | string enum | Optional. Declares your intended modernization strategy for the fleet. Values: `MODERNIZATION_STRATEGY_UNSPECIFIED`, `AUTOMATIC`, `DEFERRED`. |

### `ServiceMeshFeatureState`

- \*\*Service Mesh\*\*: State for the whole Hub, as analyzed by the Service Mesh Hub Controller.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `conditions` | array<ServiceMeshFeatureCondition> | Output only. List of conditions reported for this feature. |

### `ServiceMeshFeatureState` (v1alpha)

- \*\*Service Mesh\*\*: State for the whole Hub, as analyzed by the Service Mesh Hub Controller.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `analysisMessages` | array<ServiceMeshAnalysisMessage> | Output only. Results of running Service Mesh analyzers. |
| `conditions` | array<ServiceMeshFeatureCondition> | Output only. List of conditions reported for this feature. |

### `ServiceMeshMembershipSpec`

- \*\*Service Mesh\*\*: Spec for a single Membership for the servicemesh feature
- Version: v1

| Field | Type | Description |
|---|---|---|
| `configApi` | string enum | Optional. Specifies the API that will be used for configuring the mesh workloads. Values: `CONFIG_API_UNSPECIFIED`, `CONFIG_API_ISTIO`, `CONFIG_API_GATEWAY`. |
| `controlPlane` | string enum | Deprecated: use `management` instead Enables automatic control plane management. Values: `CONTROL_PLANE_MANAGEMENT_UNSPECIFIED`, `AUTOMATIC`, `MANUAL`. |
| `management` | string enum | Optional. Enables automatic Service Mesh management. Values: `MANAGEMENT_UNSPECIFIED`, `MANAGEMENT_AUTOMATIC`, `MANAGEMENT_MANUAL`, `MANAGEMENT_NOT_INSTALLED`. |

### `ServiceMeshMembershipSpec` (v1alpha)

- \*\*Service Mesh\*\*: Spec for a single Membership for the servicemesh feature
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `configApi` | string enum | Optional. Specifies the API that will be used for configuring the mesh workloads. Values: `CONFIG_API_UNSPECIFIED`, `CONFIG_API_ISTIO`, `CONFIG_API_GATEWAY`. |
| `controlPlane` | string enum | Deprecated: use `management` instead Enables automatic control plane management. Values: `CONTROL_PLANE_MANAGEMENT_UNSPECIFIED`, `AUTOMATIC`, `MANUAL`. |
| `defaultChannel` | string enum | Determines which release channel to use for default injection and service mesh APIs. Values: `CHANNEL_UNSPECIFIED`, `RAPID`, `REGULAR`, `STABLE`. |
| `management` | string enum | Optional. Enables automatic Service Mesh management. Values: `MANAGEMENT_UNSPECIFIED`, `MANAGEMENT_AUTOMATIC`, `MANAGEMENT_MANUAL`, `MANAGEMENT_NOT_INSTALLED`. |

### `ServiceMeshMembershipState`

- \*\*Service Mesh\*\*: State for a single Membership, as analyzed by the Service Mesh Hub Controller.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `conditions` | array<ServiceMeshCondition> | Output only. List of conditions reported for this membership. |
| `controlPlaneManagement` | ServiceMeshControlPlaneManagement | Output only. Status of control plane management |
| `dataPlaneManagement` | ServiceMeshDataPlaneManagement | Output only. Status of data plane management. |

### `ServiceMeshMembershipState` (v1alpha)

- \*\*Service Mesh\*\*: State for a single Membership, as analyzed by the Service Mesh Hub Controller.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `analysisMessages` | array<ServiceMeshAnalysisMessage> | Output only. Results of running Service Mesh analyzers. |
| `conditions` | array<ServiceMeshCondition> | Output only. List of conditions reported for this membership. |
| `configApiVersion` | string | The API version (i.e. Istio CRD version) for configuring service mesh in this cluster. This version is influenced by the `default_channel` field. |
| `controlPlaneManagement` | ServiceMeshControlPlaneManagement | Output only. Status of control plane management |
| `dataPlaneManagement` | ServiceMeshDataPlaneManagement | Output only. Status of data plane management. |

### `ServiceMeshSpec`

- \*\*Service Mesh\*\*: Spec for a single Membership for the servicemesh feature
- Version: v2

| Field | Type | Description |
|---|---|---|
| `configApi` | string enum | Optional. Specifies the API that will be used for configuring the mesh workloads. Values: `CONFIG_API_UNSPECIFIED`, `CONFIG_API_ISTIO`, `CONFIG_API_GATEWAY`. |
| `controlPlane` | string enum | Deprecated: use `management` instead Enables automatic control plane management. Values: `CONTROL_PLANE_MANAGEMENT_UNSPECIFIED`, `AUTOMATIC`, `MANUAL`. |
| `defaultChannel` | string enum | Determines which release channel to use for default injection and service mesh APIs. Values: `CHANNEL_UNSPECIFIED`, `RAPID`, `REGULAR`, `STABLE`. |
| `management` | string enum | Optional. Enables automatic Service Mesh management. Values: `MANAGEMENT_UNSPECIFIED`, `MANAGEMENT_AUTOMATIC`, `MANAGEMENT_MANUAL`, `MANAGEMENT_NOT_INSTALLED`. |

### `ServiceMeshState`

- \*\*Service Mesh\*\*: State for a single Membership, as analyzed by the Service Mesh Hub Controller.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `analysisMessages` | array<ServiceMeshAnalysisMessage> | Output only. Results of running Service Mesh analyzers. |
| `conditions` | array<ServiceMeshCondition> | Output only. List of conditions reported for this membership. |
| `configApiVersion` | string | The API version (i.e. Istio CRD version) for configuring service mesh in this cluster. This version is influenced by the `default_channel` field. |
| `controlPlaneManagement` | ServiceMeshControlPlaneManagement | Output only. Status of control plane management |
| `dataPlaneManagement` | ServiceMeshDataPlaneManagement | Output only. Status of data plane management. |

### `ServiceMeshStatusDetails`

- Structured and human-readable details for a status.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `code` | string | A machine-readable code that further describes a broad status. |
| `details` | string | Human-readable explanation of code. |

### `ServiceMeshType`

- A unique identifier for the type of message. Display_name is intended to be human-readable, code is intended to be machine readable. There should be a one-to-one mapping between display_name and code. (i.e. do not re-use display_names or codes between message types.) See istio.analysis.v1alpha1.AnalysisMessageBase.Type
- Version: v2

| Field | Type | Description |
|---|---|---|
| `code` | string | A 7 character code matching `^IST[0-9]{4}$` or `^ASM[0-9]{4}$`, intended to uniquely identify the message type. (e.g. "IST0001" is mapped to the "InternalError" message type.) |
| `displayName` | string | A human-readable name for the message type. e.g. "InternalError", "PodMissingProxy". This should be the same for all messages of the same type. (This corresponds to the `name` field in open-source Istio.) |

### `SetIamPolicyRequest`

- Request message for `SetIamPolicy` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `policy` | Policy | REQUIRED: The complete policy to be applied to the `resource`. The size of the policy is limited to a few 10s of KB. An empty policy is a valid policy but certain Google Cloud services (such as Projects) might reject them. |
| `updateMask` | string (google-fieldmask) | OPTIONAL: A FieldMask specifying which fields of the policy to modify. Only the fields in the mask will be modified. If no mask is provided, the following default mask is used: `paths: "bindings, etag"` |

### `Stage`

- Rollout stage.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `clusterSelector` | ClusterSelector | Optional. Filter members of fleets (above) to a subset of clusters. If not specified, all clusters in the fleets are selected. |
| `fleetProjects` | array<string> | Required. List of Fleet projects to select the clusters from. Expected format: projects/{project} |
| `soakDuration` | string (google-duration) | Optional. Soak time after upgrading all the clusters in the stage. |

### `State`

- High-level state of a MembershipFeature.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `code` | string enum | The high-level, machine-readable status of this MembershipFeature. Values: `CODE_UNSPECIFIED`, `OK`, `WARNING`, `ERROR`. |
| `description` | string | A human-readable description of the current status. |
| `updateTime` | string (google-datetime) | The time this status and any related Feature-specific details were updated. |

### `Status`

- Status specifies state for the subcomponent.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `code` | string enum | Code specifies AppDevExperienceFeature's subcomponent ready state. Values: `CODE_UNSPECIFIED`, `OK`, `FAILED`, `UNKNOWN`. |
| `description` | string | Description is populated if Code is Failed, explaining why it has failed. |

### `TestIamPermissionsRequest`

- Request message for `TestIamPermissions` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `permissions` | array<string> | The set of permissions to check for the `resource`. Permissions with wildcards (such as `*` or `storage.*`) are not allowed. For more information see IAM Overview (https://cloud.google.com/iam/docs/overview#permissions). |

### `TestIamPermissionsResponse`

- Response message for `TestIamPermissions` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `permissions` | array<string> | A subset of `TestPermissionsRequest.permissions` that the caller is allowed. |

### `TypeMeta`

- TypeMeta is the type information needed for content unmarshalling of Kubernetes resources in the manifest.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `apiVersion` | string | APIVersion of the resource (e.g. v1). |
| `kind` | string | Kind of the resource (e.g. Deployment). |

### `UpgradeRolloutSequenceRequest`

- Request message for upgrading a rollout sequence.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `force` | boolean | Optional. If set to true, any rollout already running on the first stage of the sequence will be cancelled to allow for the creation of the new rollout. |
| `ignoreClusterDisruptionBudgets` | boolean | Optional. If set to true, the rollout will ignore the disruption budgets of the clusters. |
| `ignoreMaintenancePolicies` | boolean | Optional. If set to true, the rollout will ignore any maintenance policies (Maintenance Windows and Maintenance Exclusions) set on the clusters. |
| `patchOnly` | boolean | Optional. If set to true, the rollout will only upgrade clusters that match the minor version of the `version` field, but are on an earlier patch version. |
| `prioritized` | boolean | Optional. If set to true, conflicting rollouts will be paused, to allow this rollout to progress through the sequence. Conflicting rollouts running on the first stage will be canceled, to allow this rollout to be created. |
| `soakDurationOverrideAllStages` | string (google-duration) | Optional. Overrides the soak duration for all stages of the rollout. |
| `soakDurationOverridePerStage` | PerStageSoakDurationOverrides | Optional. Overrides the soak durations for specific stages of the rollout. |
| `upgradeType` | string enum | Required. The type of upgrade. Values: `UPGRADE_TYPE_UNSPECIFIED`, `CONTROL_PLANE`, `NODE`. |
| `version` | string | Required. GKE version to upgrade to. A valid GKE version available on the release channel used by the sequence. Patch versions from less conservative channels are allowed if their minor version is already available in the sequence's channel. This is similar to single-cluster upgrade rules, see https://cloud.google.com/kubernetes-engine/docs/how-to/upgrading-a-cluster#supported-versions Example: With the following versions available on the RAPID and REGULAR channels: \* REGULAR: 1.35.3-gke.123000 \* RAPID: 1.36.4-gke.321000, 1.35.6-gke.045000 Valid versions are 1.35.3-gke.123, 1.35.6-gke.045000 Aliases like `latest` are supported. For more information on valid upgrade versions and specifying cluster versions, see: https://cloud.google.com/kubernetes-engine/versioning#specifying_cluster_version |

### `ValidateCreateMembershipRequest`

- Request message for the `GkeHub.ValidateCreateMembership` method.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `membership` | Membership | Required. Membership resource to be created. |
| `membershipId` | string | Required. Client chosen membership id. |

### `ValidateCreateMembershipResponse`

- Response message for the `GkeHub.ValidateCreateMembership` method.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `validationResults` | array<ValidationResult> | Wraps all the validator results. |

### `ValidateExclusivityResponse`

- The response of exclusivity artifacts validation result status.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `status` | GoogleRpcStatus | The validation result. \* `OK` means that exclusivity is validated, assuming the manifest produced by GenerateExclusivityManifest is successfully applied. \* `ALREADY_EXISTS` means that the Membership CRD is already owned by another Hub. See `status.message` for more information. |

### `ValidationResult`

- ValidationResults are results set by each validator running during ValidateCreateMembership.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `result` | string | Additional information for the validation. |
| `success` | boolean | Whether the validation is passed or not. |
| `validator` | string enum | Validator type to validate membership with. Values: `VALIDATOR_TYPE_UNSPECIFIED`, `MEMBERSHIP_ID`, `CROSS_PROJECT_PERMISSION`, `FLEET_ALLOWED_FOR_PROJECT_GUARDRAIL`. |

### `VersionUpgrade`

- Config for version upgrade of clusters.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `desiredVersion` | string | Optional. Desired version of the component. |
| `type` | string enum | Optional. Type of version upgrade specifies which component should be upgraded. Values: `TYPE_UNSPECIFIED`, `TYPE_CONTROL_PLANE`, `TYPE_NODE_POOL`. |

### `WorkloadCertificateSpec`

- \*\*WorkloadCertificate\*\*: The membership-specific input for WorkloadCertificate feature.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `certificateManagement` | string enum | CertificateManagement specifies workload certificate management. Values: `CERTIFICATE_MANAGEMENT_UNSPECIFIED`, `DISABLED`, `ENABLED`. |

### `WorkloadIdentityFeatureSpec`

- \*\*WorkloadIdentity\*\*: Global feature specification.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `scopeTenancyPool` | string | Pool to be used for Workload Identity. This pool in trust-domain mode is used with Fleet Tenancy, so that sameness can be enforced. ex: projects/example/locations/global/workloadidentitypools/custompool |

### `WorkloadIdentityFeatureState`

- \*\*WorkloadIdentity\*\*: Global feature state.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `namespaceStateDetails` | object | The state of the IAM namespaces for the fleet. |
| `namespaceStates` | object | Deprecated, this field will be erased after code is changed to use the new field. |
| `scopeTenancyWorkloadIdentityPool` | string | The full name of the scope-tenancy pool for the fleet. |
| `workloadIdentityPool` | string | The full name of the svc.id.goog pool for the fleet. |
| `workloadIdentityPoolStateDetails` | object | The state of the Workload Identity Pools for the fleet. |

### `WorkloadIdentityIdentityProviderStateDetail`

- IdentityProviderStateDetail represents the state of an Identity Provider.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `code` | string enum | The state of the Identity Provider. Values: `IDENTITY_PROVIDER_STATE_UNSPECIFIED`, `IDENTITY_PROVIDER_STATE_OK`, `IDENTITY_PROVIDER_STATE_ERROR`. |
| `description` | string | A human-readable description of the current state or returned error. |

### `WorkloadIdentityMembershipState`

- \*\*WorkloadIdentity\*\*: The membership-specific state for WorkloadIdentity feature.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `description` | string | Deprecated, this field will be erased after code is changed to use the new field. |
| `identityProviderStateDetails` | object | The state of the Identity Providers corresponding to the membership. |

### `WorkloadIdentityNamespaceStateDetail`

- NamespaceStateDetail represents the state of a IAM namespace.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `code` | string enum | The state of the IAM namespace. Values: `NAMESPACE_STATE_UNSPECIFIED`, `NAMESPACE_STATE_OK`, `NAMESPACE_STATE_ERROR`. |
| `description` | string | A human-readable description of the current state or returned error. |

### `WorkloadIdentityState`

- \*\*WorkloadIdentity\*\*: The membership-specific state for WorkloadIdentity feature.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `description` | string | Deprecated, this field will be erased after code is changed to use the new field. |
| `identityProviderStateDetails` | object | The state of the Identity Providers corresponding to the membership. |

### `WorkloadIdentityWorkloadIdentityPoolStateDetail`

- WorkloadIdentityPoolStateDetail represents the state of the Workload Identity Pools for the fleet.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `code` | string enum | The state of the Workload Identity Pool. Values: `WORKLOAD_IDENTITY_POOL_STATE_UNSPECIFIED`, `WORKLOAD_IDENTITY_POOL_STATE_OK`, `WORKLOAD_IDENTITY_POOL_STATE_ERROR`. |
| `description` | string | A human-readable description of the current state or returned error. |

### Shape of `MembershipBinding`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "createTime": "string (google-datetime)",
  "deleteTime": "string (google-datetime)",
  "labels": "object",
  "name": "string",
  "scope": "string",
  "state": "MembershipBindingLifecycleState",
  "uid": "string",
  "updateTime": "string (google-datetime)"
}
```

## Notes

- Generated from the Discovery document(s) v2, v1, v1beta1, v1beta, v1alpha of `gkehub` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Corrected from the official docs (the Discovery text above is verbatim): the fleet namespace resource name (the `name` field of the `Namespace` type and the `name` parameter of `gkehub.projects.locations.scopes.namespaces.patch`) is described as `projects/{project}/locations/{location}/namespaces/{namespace}`, but the Discovery path pattern of the `scopes.namespaces` methods is `projects/[^/]+/locations/[^/]+/scopes/[^/]+/namespaces/[^/]+`; use `projects/{project}/locations/{location}/scopes/{scope}/namespaces/{namespace}`.
- Adapted from the official docs: Google-internal `go/aip/N` links in the Discovery descriptions are replaced with the public AIP pages `https://google.aip.dev/N`.
- Source: https://gkehub.googleapis.com/$discovery/rest?version=v2, https://gkehub.googleapis.com/$discovery/rest?version=v1, https://gkehub.googleapis.com/$discovery/rest?version=v1beta1, https://gkehub.googleapis.com/$discovery/rest?version=v1beta, https://gkehub.googleapis.com/$discovery/rest?version=v1alpha (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
