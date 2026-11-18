---
source: https://accessapproval.googleapis.com/$discovery/rest?version=v1
---

# Access Approval API message schemas (accessapproval)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/accessapproval/`.

### `AccessApprovalServiceAccount`

- Access Approval service account related to a project/folder/organization.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `accountEmail` | string | Email address of the service account. |
| `name` | string | The resource name of the Access Approval service account. Format is one of: \* "projects/{project}/serviceAccount" \* "folders/{folder}/serviceAccount" \* "organizations/{organization}/serviceAccount" |

### `AccessApprovalSettings`

- Settings on a Project/Folder/Organization related to Access Approval.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `activeKeyVersion` | string | The asymmetric crypto key version to use for signing approval requests. Empty active_key_version indicates that a Google-managed key should be used for signing. This property will be ignored if set by an ancestor of this resource, and new non-empty values may not be set. |
| `ancestorHasActiveKeyVersion` | boolean | Output only. This field is read only (not settable via UpdateAccessApprovalSettings method). If the field is true, that indicates that an ancestor of this Project or Folder has set active_key_version (this field will always be unset for the organization since organizations do not have ancestors). |
| `ancestorsEnrolledServices` | array<EnrolledService> | Output only. Field to differentiate ancestor enrolled services from locally enrolled services. |
| `approvalPolicy` | CustomerApprovalApprovalPolicy | Optional. Policy configuration for Access Approval that sets the operating mode. The available policies are Transparency, Streamlined Support, and Approval Required. |
| `effectiveApprovalPolicy` | CustomerApprovalApprovalPolicy | Output only. Effective policy applied for Access Approval, inclusive of inheritance. |
| `enrolledAncestor` | boolean | Output only. This field is read only (not settable via UpdateAccessApprovalSettings method). If the field is true, that indicates that at least one service is enrolled for Access Approval in one or more ancestors of the Project or Folder (this field will always be unset for the organization since organizations do not have ancestors). |
| `enrolledServices` | array<EnrolledService> | A list of Google Cloud Services for which the given resource has Access Approval enrolled. Access requests for the resource given by name against any of these services contained here will be required to have explicit approval. If name refers to an organization, enrollment can be done for individual services. If name refers to a folder or project, enrollment can only be done on an all or nothing basis. If a cloud_product is repeated in this list, the first entry will be honored and all following entries will be discarded. |
| `invalidKeyVersion` | boolean | Output only. This field is read only (not settable via UpdateAccessApprovalSettings method). If the field is true, that indicates that there is some configuration issue with the active_key_version configured at this level in the resource hierarchy (e.g. it doesn't exist or the Access Approval service account doesn't have the correct permissions on it, etc.) This key version is not necessarily the effective key version at this level, as key versions are inherited top-down. |
| `name` | string | The resource name of the settings. Format is one of: \* "projects/{project}/accessApprovalSettings" \* "folders/{folder}/accessApprovalSettings" \* "organizations/{organization}/accessApprovalSettings" |
| `notificationEmails` | array<string> | A list of email addresses to which notifications relating to approval requests should be sent. Notifications relating to a resource will be sent to all emails in the settings of ancestor resources of that resource. A maximum of 50 email addresses are allowed. |
| `notificationPubsubTopic` | string | Optional. A pubsub topic that notifications relating to access approval are published to. Notifications include pre-approved accesses. |
| `preferNoBroadApprovalRequests` | boolean | This field is used to set a preference for granularity of an access approval request. If true, Google personnel will be asked to send resource-level requests when possible. If false, Google personnel will be asked to send requests at the project level. |
| `preferredRequestExpirationDays` | integer (int32) | Set the default access approval request expiration time. This value is able to be set directly by the customer at the time of approval, overriding this suggested value. We recommend setting this value to 30 days. |
| `requestScopeMaxWidthPreference` | string enum | Optional. A setting that indicates the maximum scope of an Access Approval request: either organization, folder, or project. Google administrators will be asked to send requests no broader than the configured scope. Values: `REQUEST_SCOPE_MAX_WIDTH_PREFERENCE_UNSPECIFIED`, `ORGANIZATION`, `FOLDER`, `PROJECT`. |
| `requireCustomerVisibleJustification` | boolean | Optional. When enabled, Google will only be able to send approval requests for access reasons with a customer accessible case ID in the reason detail. Also known as "Require customer initiated support case justification" |

### `AccessLocations`

- Physical assigned office and physical location of the Google administrator performing the access.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `principalOfficeCountry` | string | The "home office" location of the Google administrator. A two-letter country code (ISO 3166-1 alpha-2), such as "US", "DE" or "GB" or a region code. In some limited situations Google systems may refer refer to a region code instead of a country code. Possible Region Codes: \* ASI: Asia \* EUR: Europe \* OCE: Oceania \* AFR: Africa \* NAM: North America \* SAM: South America \* ANT: Antarctica \* ANY: Any location |
| `principalPhysicalLocationCountry` | string | Physical location of the Google administrator at the time of the access. A two-letter country code (ISO 3166-1 alpha-2), such as "US", "DE" or "GB" or a region code. In some limited situations Google systems may refer refer to a region code instead of a country code. Possible Region Codes: \* ASI: Asia \* EUR: Europe \* OCE: Oceania \* AFR: Africa \* NAM: North America \* SAM: South America \* ANT: Antarctica \* ANY: Any location |

### `AccessReason`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `detail` | string | More detail about certain reason types. See comments for each type above. |
| `type` | string enum | Type of access reason. Values: `TYPE_UNSPECIFIED`, `CUSTOMER_INITIATED_SUPPORT`, `GOOGLE_INITIATED_SERVICE`, `GOOGLE_INITIATED_REVIEW`, `THIRD_PARTY_DATA_REQUEST`, `GOOGLE_RESPONSE_TO_PRODUCTION_ALERT`, `CLOUD_INITIATED_ACCESS`. |

### `ApprovalRequest`

- A request for the customer to approve access to a resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `approve` | ApproveDecision | Access was approved. |
| `dismiss` | DismissDecision | The request was dismissed. |
| `name` | string | The resource name of the request. Format is "{projects\|folders\|organizations}/{id}/approvalRequests/{approval_request}". |
| `requestTime` | string (google-datetime) | The time at which approval was requested. |
| `requestedAugmentedInfo` | AugmentedInfo | This field contains the augmented information of the request. |
| `requestedDuration` | string (google-duration) | The requested access duration. |
| `requestedExpiration` | string (google-datetime) | The original requested expiration for the approval. Calculated by adding the requested_duration to the request_time. |
| `requestedLocations` | AccessLocations | The locations for which approval is being requested. |
| `requestedReason` | AccessReason | The access reason for which approval is being requested. |
| `requestedResourceName` | string | The resource for which approval is being requested. The format of the resource name is defined at https://cloud.google.com/apis/design/resource_names. The resource name here may either be a "full" resource name (e.g. "//library.googleapis.com/shelves/shelf1/books/book2") or a "relative" resource name (e.g. "shelves/shelf1/books/book2") as described in the resource name specification. |
| `requestedResourceProperties` | ResourceProperties | Properties related to the resource represented by requested_resource_name. |

### `ApproveApprovalRequestMessage`

- Request to approve an ApprovalRequest.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `expireTime` | string (google-datetime) | The expiration time of this approval. |

### `ApproveDecision`

- A decision that has been made to approve access to a resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `approveTime` | string (google-datetime) | The time at which approval was granted. |
| `autoApproved` | boolean | True when the request has been auto-approved. |
| `expireTime` | string (google-datetime) | The time at which the approval expires. |
| `invalidateTime` | string (google-datetime) | If set, denotes the timestamp at which the approval is invalidated. |
| `policyApproved` | boolean | True when the request has been approved by the customer's defined policy. |
| `signatureInfo` | SignatureInfo | The signature for the ApprovalRequest and details on how it was signed. |

### `AugmentedInfo`

- This field contains the augmented information of the request. Requires augmented administrative access to be enabled.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `command` | string | For command-line tools, the full command-line exactly as entered by the actor without adding any additional characters (such as quotation marks). |

### `CustomerApprovalApprovalPolicy`

- Represents all the policies that can be set for Customer Approval.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `justificationBasedApprovalPolicy` | string enum | Optional. Policy for approval based on the justification given. Values: `JUSTIFICATION_BASED_APPROVAL_POLICY_UNSPECIFIED`, `JUSTIFICATION_BASED_APPROVAL_ENABLED_ALL`, `JUSTIFICATION_BASED_APPROVAL_ENABLED_EXTERNAL_JUSTIFICATIONS`, `JUSTIFICATION_BASED_APPROVAL_NOT_ENABLED`, `JUSTIFICATION_BASED_APPROVAL_INHERITED`. |

### `DismissApprovalRequestMessage`

- Request to dismiss an approval request.
- Version: v1

### `DismissDecision`

- A decision that has been made to dismiss an approval request.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dismissTime` | string (google-datetime) | The time at which the approval request was dismissed. |
| `implicit` | boolean | This field will be true if the ApprovalRequest was implicitly dismissed due to inaction by the access approval approvers (the request is not acted on by the approvers before the exiration time). |

### `Empty`

- A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
- Version: v1

### `EnrolledService`

- Represents the enrollment of a cloud resource into a specific service.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cloudProduct` | string | The product for which Access Approval will be enrolled. Allowed values are listed below (case-sensitive): \* all \* GA \* Access Context Manager \* Anthos Identity Service \* AlloyDB for PostgreSQL \* Apigee \* Application Integration \* App Hub \* Artifact Registry \* Anthos Service Mesh \* Access Transparency \* BigQuery \* Certificate Authority Service \* Cloud Bigtable \* CCAI Assist and Knowledge \* Cloud Dataflow \* Cloud Dataproc \* CEP Security Gateway \* Compliance Evaluation Service \* Cloud Firestore \* Cloud Healthcare API \* Chronicle \* Cloud AI Companion Gateway - Titan \* Google Cloud Armor \* Cloud Asset Inventory \* Cloud Asset Search \* Cloud Deploy \* Cloud DNS \* Cloud Latency \* Cloud Memorystore for Redis \* CloudNet Control \* Cloud Riptide \* Cloud Tasks \* Cloud Trace \* Cloud Data Transfer \* Cloud Composer \* Integration Connectors \* Contact Center AI Insights \* Cloud Pub/Sub \* Cloud Run \* Resource Manager \* Cloud Spanner \* Database Center \* Cloud Dataform \* Cloud Data Fusion \* Dataplex \* Dialogflow Customer Experience Edition \* Cloud DLP \* Document AI \* Edge Container \* Edge Network \* Cloud EKM \* Eventarc \* Firebase Data Connect \* Firebase Rules \* App Engine \* Cloud Build \* Compute Engine \* Cloud Functions (2nd Gen) \* Cloud Filestore \* Cloud Interconnect \* Cloud NetApp Volumes \* Cloud Storage \* Generative AI App Builder \* Google Kubernetes Engine \* Backup for GKE API \* GKE Connect \* GKE Hub \* Hoverboard \* Cloud HSM \* Cloud Identity and Access Management \* Cloud Identity-Aware Proxy \* Infrastructure Manager \* Identity Storage Service \* Key Access Justifications \* Cloud Key Management Service \* Cloud Logging \* Looker (Google Cloud core) \* Looker Studio \* Management Hub \* Model Armor \* Cloud Monitoring \* Cloud NAT \* Connectivity Hub \* External passthrough Network Load Balancer \* OIDC One \* Organization Policy Service \* Org Lifecycle \* Persistent Disk \* Parameter Manager \* Private Services Access \* Regional Internal Application Load Balancer \* Storage Batch Operations \* Cloud Security Command Center \* Secure Source Manager \* Seeker \* Service Provisioning \* Speaker ID \* Secret Manager \* Cloud SQL \* Cloud Speech-to-Text \* Traffic Director \* Cloud Text-to-Speech \* USPS Andromeda \* Vertex AI \* Virtual Private Cloud (VPC) \* VPC Access \* VPC Service Controls Troubleshooter \* VPC virtnet \* Cloud Workstations \* Web Risk Note: These values are supported as input for legacy purposes, but will not be returned from the API. \* all \* ga-only \* appengine.googleapis.com \* artifactregistry.googleapis.com \* bigquery.googleapis.com \* bigtable.googleapis.com \* container.googleapis.com \* cloudkms.googleapis.com \* cloudresourcemanager.googleapis.com \* cloudsql.googleapis.com \* compute.googleapis.com \* dataflow.googleapis.com \* dataproc.googleapis.com \* dlp.googleapis.com \* iam.googleapis.com \* logging.googleapis.com \* orgpolicy.googleapis.com \* pubsub.googleapis.com \* spanner.googleapis.com \* secretmanager.googleapis.com \* speakerid.googleapis.com \* storage.googleapis.com Calls to UpdateAccessApprovalSettings using 'all' or any of the XXX.googleapis.com will be translated to the associated product name ('all', 'App Engine', etc.). Note: 'all' will enroll the resource in all products supported at both 'GA' and 'Preview' levels. More information about levels of support is available at https://cloud.google.com/access-approval/docs/supported-services |
| `enrollmentLevel` | string enum | The enrollment level of the service. Values: `ENROLLMENT_LEVEL_UNSPECIFIED`, `BLOCK_ALL`. |

### `InvalidateApprovalRequestMessage`

- Request to invalidate an existing approval.
- Version: v1

### `ListApprovalRequestsResponse`

- Response to listing of ApprovalRequest objects.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `approvalRequests` | array<ApprovalRequest> | Approval request details. |
| `nextPageToken` | string | Token to retrieve the next page of results, or empty if there are no more. |

### `ResourceProperties`

- The properties associated with the resource of the request.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `excludesDescendants` | boolean | Whether an approval will exclude the descendants of the resource being requested. |

### `SignatureInfo`

- Information about the digital signature of the resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `customerKmsKeyVersion` | string | The resource name of the customer CryptoKeyVersion used for signing. |
| `googleKeyAlgorithm` | string enum | The hashing algorithm used for signature verification. It will only be present in the case of Google managed keys. Values: `CRYPTO_KEY_VERSION_ALGORITHM_UNSPECIFIED`, `GOOGLE_SYMMETRIC_ENCRYPTION`, `AES_128_GCM`, `AES_256_GCM`, `AES_128_CBC`, `AES_256_CBC`, `AES_128_CTR`, `AES_256_CTR`, `RSA_SIGN_PSS_2048_SHA256`, `RSA_SIGN_PSS_3072_SHA256`, `RSA_SIGN_PSS_4096_SHA256`, `RSA_SIGN_PSS_4096_SHA512`, `RSA_SIGN_PKCS1_2048_SHA256`, `RSA_SIGN_PKCS1_3072_SHA256`, `RSA_SIGN_PKCS1_4096_SHA256`, `RSA_SIGN_PKCS1_4096_SHA512`, `RSA_SIGN_RAW_PKCS1_2048`, `RSA_SIGN_RAW_PKCS1_3072`, `RSA_SIGN_RAW_PKCS1_4096`, `RSA_DECRYPT_OAEP_2048_SHA256`, `RSA_DECRYPT_OAEP_3072_SHA256`, `RSA_DECRYPT_OAEP_4096_SHA256`, `RSA_DECRYPT_OAEP_4096_SHA512`, `RSA_DECRYPT_OAEP_2048_SHA1`, `RSA_DECRYPT_OAEP_3072_SHA1`, `RSA_DECRYPT_OAEP_4096_SHA1`, `EC_SIGN_P256_SHA256`, `EC_SIGN_P384_SHA384`, `EC_SIGN_SECP256K1_SHA256`, `EC_SIGN_ED25519`, `HMAC_SHA256`, `HMAC_SHA1`, `HMAC_SHA384`, `HMAC_SHA512`, `HMAC_SHA224`, `EXTERNAL_SYMMETRIC_ENCRYPTION`, `ML_KEM_768`, `ML_KEM_1024`, `KEM_XWING`, `PQ_SIGN_ML_DSA_44`, `PQ_SIGN_ML_DSA_65`, `PQ_SIGN_ML_DSA_87`, `PQ_SIGN_SLH_DSA_SHA2_128S`, `PQ_SIGN_HASH_SLH_DSA_SHA2_128S_SHA256`, `PQ_SIGN_ML_DSA_44_EXTERNAL_MU`, `PQ_SIGN_ML_DSA_65_EXTERNAL_MU`, `PQ_SIGN_ML_DSA_87_EXTERNAL_MU`, `KEM_ECDH_P256`, `KEM_ECDH_P384`, `AES_256_KWP`. |
| `googlePublicKeyPem` | string | The public key for the Google default signing, encoded in PEM format. The signature was created using a private key which may be verified using this public key. |
| `serializedApprovalRequest` | string (byte) | The ApprovalRequest that is serialized without the SignatureInfo message field. This data is used with the hashing algorithm to generate the digital signature, and it can be used for signature verification. |
| `signature` | string (byte) | The digital signature. |

### Shape of `AccessApprovalServiceAccount`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "accountEmail": "string",
  "name": "string"
}
```

## Notes

- Generated from the Discovery document(s) v1 of `accessapproval` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Source: https://accessapproval.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
