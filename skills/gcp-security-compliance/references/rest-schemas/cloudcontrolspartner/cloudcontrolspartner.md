---
source: https://cloudcontrolspartner.googleapis.com/$discovery/rest?version=v1
---

# Cloud Controls Partner API message schemas (cloudcontrolspartner)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/cloudcontrolspartner/`.

### `AccessApprovalRequest`

- Details about the Access request.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Identifier. Format: `organizations/{organization}/locations/{location}/customers/{customer}/workloads/{workload}/accessApprovalRequests/{access_approval_request}` |
| `requestTime` | string (google-datetime) | The time at which approval was requested. |
| `requestedExpirationTime` | string (google-datetime) | The requested expiration for the approval. If the request is approved, access will be granted from the time of approval until the expiration time. |
| `requestedReason` | AccessReason | The justification for which approval is being requested. |

### `AccessReason`

- Reason for the access.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `detail` | string | More detail about certain reason types. See comments for each type above. |
| `type` | string enum | Type of access justification. Values: `TYPE_UNSPECIFIED`, `CUSTOMER_INITIATED_SUPPORT`, `GOOGLE_INITIATED_SERVICE`, `GOOGLE_INITIATED_REVIEW`, `THIRD_PARTY_DATA_REQUEST`, `GOOGLE_RESPONSE_TO_PRODUCTION_ALERT`, `CLOUD_INITIATED_ACCESS`. |

### `ConnectionError`

- Information around the error that occurred if the connection state is anything other than available or unspecified
- Version: v1

| Field | Type | Description |
|---|---|---|
| `errorDomain` | string | The error domain for the error |
| `errorMessage` | string | The error message for the error |

### `Console`

- Remediation instructions to resolve violation via cloud console
- Version: v1

| Field | Type | Description |
|---|---|---|
| `additionalLinks` | array<string> | Additional urls for more information about steps |
| `consoleUris` | array<string> | Link to console page where violations can be resolved |
| `steps` | array<string> | Steps to resolve violation via cloud console |

### `Customer`

- Contains metadata around a Cloud Controls Partner Customer
- Version: v1

| Field | Type | Description |
|---|---|---|
| `customerOnboardingState` | CustomerOnboardingState | Output only. Container for customer onboarding steps |
| `displayName` | string | Required. Display name for the customer |
| `isOnboarded` | boolean | Output only. Indicates whether a customer is fully onboarded |
| `name` | string | Identifier. Format: `organizations/{organization}/locations/{location}/customers/{customer}` |
| `organizationDomain` | string | Output only. The customer organization domain, extracted from CRM Organization’s display_name field. e.g. "google.com" |

### `CustomerOnboardingState`

- Container for customer onboarding steps
- Version: v1

| Field | Type | Description |
|---|---|---|
| `onboardingSteps` | array<CustomerOnboardingStep> | List of customer onboarding steps |

### `CustomerOnboardingStep`

- Container for customer onboarding information
- Version: v1

| Field | Type | Description |
|---|---|---|
| `completionState` | string enum | Output only. Current state of the step Values: `COMPLETION_STATE_UNSPECIFIED`, `PENDING`, `SUCCEEDED`, `FAILED`, `NOT_APPLICABLE`. |
| `completionTime` | string (google-datetime) | The completion time of the onboarding step |
| `startTime` | string (google-datetime) | The starting time of the onboarding step |
| `step` | string enum | The onboarding step Values: `STEP_UNSPECIFIED`, `KAJ_ENROLLMENT`, `CUSTOMER_ENVIRONMENT`. |

### `EkmConnection`

- Details about the EKM connection
- Version: v1

| Field | Type | Description |
|---|---|---|
| `connectionError` | ConnectionError | The connection error that occurred if any |
| `connectionName` | string | Resource name of the EKM connection in the format: projects/{project}/locations/{location}/ekmConnections/{ekm_connection} |
| `connectionState` | string enum | Output only. The connection state Values: `CONNECTION_STATE_UNSPECIFIED`, `AVAILABLE`, `NOT_AVAILABLE`, `ERROR`, `PERMISSION_DENIED`. |

### `EkmConnections`

- The EKM connections associated with a workload
- Version: v1

| Field | Type | Description |
|---|---|---|
| `ekmConnections` | array<EkmConnection> | The EKM connections associated with the workload |
| `name` | string | Identifier. Format: `organizations/{organization}/locations/{location}/customers/{customer}/workloads/{workload}/ekmConnections` |

### `EkmMetadata`

- Holds information needed by Mudbray to use partner EKMs for workloads.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `ekmEndpointUri` | string | Endpoint for sending requests to the EKM for key provisioning during Assured Workload creation. |
| `ekmSolution` | string enum | The Cloud EKM partner. Values: `EKM_SOLUTION_UNSPECIFIED`, `FORTANIX`, `FUTUREX`, `THALES`, `VIRTRU`. |

### `Empty`

- A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
- Version: v1

### `Gcloud`

- Remediation instructions to resolve violation via gcloud cli
- Version: v1

| Field | Type | Description |
|---|---|---|
| `additionalLinks` | array<string> | Additional urls for more information about steps |
| `gcloudCommands` | array<string> | Gcloud command to resolve violation |
| `steps` | array<string> | Steps to resolve violation via gcloud cli |

### `Instructions`

- Instructions to remediate violation
- Version: v1

| Field | Type | Description |
|---|---|---|
| `consoleInstructions` | Console | Remediation instructions to resolve violation via cloud console |
| `gcloudInstructions` | Gcloud | Remediation instructions to resolve violation via gcloud cli |

### `ListAccessApprovalRequestsResponse`

- Response message for list access requests.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `accessApprovalRequests` | array<AccessApprovalRequest> | List of access approval requests |
| `nextPageToken` | string | A token that can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListCustomersResponse`

- Response message for list customer Customers requests
- Version: v1

| Field | Type | Description |
|---|---|---|
| `customers` | array<Customer> | List of customers |
| `nextPageToken` | string | A token that can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListViolationsResponse`

- Response message for list customer violation requests
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token that can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |
| `unreachable` | array<string> | Workloads that could not be reached due to permission errors or any other error. Ref: https://google.aip.dev/217 |
| `violations` | array<Violation> | List of violation |

### `ListWorkloadsResponse`

- Response message for list customer workloads requests.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token that can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |
| `unreachable` | array<string> | Locations that could not be reached. |
| `workloads` | array<Workload> | List of customer workloads |

### `OperationMetadata`

- Represents the metadata of the long-running operation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `apiVersion` | string | Output only. API version used to start the operation. |
| `createTime` | string (google-datetime) | Output only. The time the operation was created. |
| `endTime` | string (google-datetime) | Output only. The time the operation finished running. |
| `requestedCancellation` | boolean | Output only. Identifies whether the user has requested cancellation of the operation. Operations that have been cancelled successfully have Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. |
| `statusMessage` | string | Output only. Human-readable status of the operation, if any. |
| `target` | string | Output only. Server-defined resource path for the target of the operation. |
| `verb` | string | Output only. Name of the verb executed by the operation. |

### `Partner`

- Message describing Partner resource
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. Time the resource was created |
| `ekmSolutions` | array<EkmMetadata> | List of Google Cloud supported EKM partners supported by the partner |
| `name` | string | Identifier. The resource name of the partner. Format: `organizations/{organization}/locations/{location}/partner` Example: "organizations/123456/locations/us-central1/partner" |
| `operatedCloudRegions` | array<string> | List of Google Cloud regions that the partner sells services to customers. Valid Google Cloud regions found here: https://cloud.google.com/compute/docs/regions-zones |
| `partnerProjectId` | string | Google Cloud project ID in the partner's Google Cloud organization for receiving enhanced Logs for Partners. |
| `skus` | array<Sku> | List of SKUs the partner is offering |
| `updateTime` | string (google-datetime) | Output only. The last time the resource was updated |

### `PartnerPermissions`

- The permissions granted to the partner for a workload
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Identifier. Format: `organizations/{organization}/locations/{location}/customers/{customer}/workloads/{workload}/partnerPermissions` |
| `partnerPermissions` | array<string> | The partner permissions granted for the workload Values: `PERMISSION_UNSPECIFIED`, `ACCESS_TRANSPARENCY_AND_EMERGENCY_ACCESS_LOGS`, `ASSURED_WORKLOADS_MONITORING`, `ACCESS_APPROVAL_REQUESTS`, `ASSURED_WORKLOADS_EKM_CONNECTION_STATUS`, `ACCESS_TRANSPARENCY_LOGS_SUPPORT_CASE_VIEWER`. |

### `Remediation`

- Represents remediation guidance to resolve compliance violation for AssuredWorkload
- Version: v1

| Field | Type | Description |
|---|---|---|
| `compliantValues` | array<string> | Values that can resolve the violation For example: for list org policy violations, this will either be the list of allowed or denied values |
| `instructions` | Instructions | Required. Remediation instructions to resolve violations |
| `remediationType` | string enum | Output only. Remediation type based on the type of org policy values violated Values: `REMEDIATION_TYPE_UNSPECIFIED`, `REMEDIATION_BOOLEAN_ORG_POLICY_VIOLATION`, `REMEDIATION_LIST_ALLOWED_VALUES_ORG_POLICY_VIOLATION`, `REMEDIATION_LIST_DENIED_VALUES_ORG_POLICY_VIOLATION`, `REMEDIATION_RESTRICT_CMEK_CRYPTO_KEY_PROJECTS_ORG_POLICY_VIOLATION`, `REMEDIATION_RESOURCE_VIOLATION`. |

### `Sku`

- Represents the SKU a partner owns inside Google Cloud to sell to customers.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `displayName` | string | Display name of the product identified by the SKU. A partner may want to show partner branded names for their offerings such as local sovereign cloud solutions. |
| `id` | string | Argentum product SKU, that is associated with the partner offerings to customers used by Syntro for billing purposes. SKUs can represent resold Google products or support services. |

### `Violation`

- Details of resource Violation
- Version: v1

| Field | Type | Description |
|---|---|---|
| `beginTime` | string (google-datetime) | Output only. Time of the event which triggered the Violation. |
| `category` | string | Output only. Category under which this violation is mapped. e.g. Location, Service Usage, Access, Encryption, etc. |
| `description` | string | Output only. Description for the Violation. e.g. OrgPolicy gcp.resourceLocations has non compliant value. |
| `folderId` | string (int64) | The folder_id of the violation |
| `name` | string | Identifier. Format: `organizations/{organization}/locations/{location}/customers/{customer}/workloads/{workload}/violations/{violation}` |
| `nonCompliantOrgPolicy` | string | Output only. Immutable. Name of the OrgPolicy which was modified with non-compliant change and resulted this violation. Format: `projects/{project_number}/policies/{constraint_name}` `folders/{folder_id}/policies/{constraint_name}` `organizations/{organization_id}/policies/{constraint_name}` |
| `remediation` | Remediation | Output only. Compliance violation remediation |
| `resolveTime` | string (google-datetime) | Output only. Time of the event which fixed the Violation. If the violation is ACTIVE this will be empty. |
| `state` | string enum | Output only. State of the violation Values: `STATE_UNSPECIFIED`, `RESOLVED`, `UNRESOLVED`, `EXCEPTION`. |
| `updateTime` | string (google-datetime) | Output only. The last time when the Violation record was updated. |

### `Workload`

- Contains metadata around the Workload resource (https://cloud.google.com/assured-workloads/docs/reference/rest/Shared.Types/Workload) in the Assured Workloads API.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. Time the resource was created. |
| `folder` | string | Output only. The name of container folder of the assured workload |
| `folderId` | string (int64) | Output only. Folder id this workload is associated with |
| `isOnboarded` | boolean | Indicates whether a workload is fully onboarded. |
| `keyManagementProjectId` | string | The project id of the key management project for the workload |
| `location` | string | The Google Cloud location of the workload |
| `name` | string | Identifier. Format: `organizations/{organization}/locations/{location}/customers/{customer}/workloads/{workload}` |
| `partner` | string enum | Partner associated with this workload. Values: `PARTNER_UNSPECIFIED`, `PARTNER_LOCAL_CONTROLS_BY_S3NS`, `PARTNER_SOVEREIGN_CONTROLS_BY_T_SYSTEMS`, `PARTNER_SOVEREIGN_CONTROLS_BY_SIA_MINSAIT`, `PARTNER_SOVEREIGN_CONTROLS_BY_PSN`, `PARTNER_SOVEREIGN_CONTROLS_BY_CNTXT`, `PARTNER_SOVEREIGN_CONTROLS_BY_CNTXT_NO_EKM`, `PARTNER_SPAIN_DATA_BOUNDARY_BY_TELEFONICA`. |
| `workloadOnboardingState` | WorkloadOnboardingState | Container for workload onboarding steps. |

### `WorkloadOnboardingState`

- Container for workload onboarding steps.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `onboardingSteps` | array<WorkloadOnboardingStep> | List of workload onboarding steps. |

### `WorkloadOnboardingStep`

- Container for workload onboarding information.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `completionState` | string enum | Output only. The completion state of the onboarding step. Values: `COMPLETION_STATE_UNSPECIFIED`, `PENDING`, `SUCCEEDED`, `FAILED`, `NOT_APPLICABLE`. |
| `completionTime` | string (google-datetime) | The completion time of the onboarding step. |
| `startTime` | string (google-datetime) | The starting time of the onboarding step. |
| `step` | string enum | The onboarding step. Values: `STEP_UNSPECIFIED`, `EKM_PROVISIONED`, `SIGNED_ACCESS_APPROVAL_CONFIGURED`. |

### Shape of `AccessApprovalRequest`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "name": "string",
  "requestTime": "string (google-datetime)",
  "requestedExpirationTime": "string (google-datetime)",
  "requestedReason": "AccessReason"
}
```

## Notes

- Generated from the Discovery document(s) v1 of `cloudcontrolspartner` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Source: https://cloudcontrolspartner.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
