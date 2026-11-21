---
source:
  - https://bigquerydatapolicy.googleapis.com/$discovery/rest?version=v2
  - https://bigquerydatapolicy.googleapis.com/$discovery/rest?version=v1
---

# BigQuery Data Policy API message schemas (bigquerydatapolicy)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/bigquerydatapolicy/`.

### `AddGranteesRequest`

- Request message for the AddGrantees method.
- Version: v2

### `AuditConfig`

- Specifies the audit configuration for a service. The configuration determines which permission types are logged, and what identities, if any, are exempted from logging. An AuditConfig must have one or more AuditLogConfigs. If there are AuditConfigs for both `allServices` and a specific service, the union of the two AuditConfigs is used for that service: the log_types specified in each AuditConfig are enabled, and the exempted_members in each AuditLogConfig are exempted. The `Policy` example of this description is shown below with the REST JSON field names. For sampleservice, this policy enables DATA_READ, DATA_WRITE and ADMIN_READ logging. It also exempts `jose@example.com` from DATA_READ logging, and `aliya@example.com` from DATA_WRITE logging.
- Version: v2

Adapted (not in the official docs): the `Policy` example of the Discovery `AuditConfig` description, with the proto field names `audit_configs`, `audit_log_configs`, `log_type` and `exempted_members` written as the REST JSON names `auditConfigs`, `auditLogConfigs`, `logType` and `exemptedMembers` (see Notes).

```json
{
  "auditConfigs": [
    {
      "service": "allServices",
      "auditLogConfigs": [
        {
          "logType": "DATA_READ",
          "exemptedMembers": [
            "user:jose@example.com"
          ]
        },
        {
          "logType": "DATA_WRITE"
        },
        {
          "logType": "ADMIN_READ"
        }
      ]
    },
    {
      "service": "sampleservice.googleapis.com",
      "auditLogConfigs": [
        {
          "logType": "DATA_READ"
        },
        {
          "logType": "DATA_WRITE",
          "exemptedMembers": [
            "user:aliya@example.com"
          ]
        }
      ]
    }
  ]
}
```

### `AuditLogConfig`

- Provides the configuration for logging a type of permissions. Example (two `AuditLogConfig` values, the elements of `auditLogConfigs` in an `AuditConfig`, with REST JSON field names; example corrected, see Notes): `{ "logType": "DATA_READ", "exemptedMembers": [ "user:jose@example.com" ] }` and `{ "logType": "DATA_WRITE" }`. This enables 'DATA_READ' and 'DATA_WRITE' logging, while exempting jose@example.com from DATA_READ logging.
- Version: v2

### `Binding`

- Associates `members`, or principals, with a `role`.
- Version: v2

### `CreateDataPolicyRequest`

- Request message for the CreateDataPolicy method.
- Version: v2

### `DataGovernanceTag`

- This is a namespaced name specifying the key and the value. For example: `project-id/pii/sensitive`.
- Version: v2

### `DataMaskingPolicy`

- The policy used to specify data masking rule.
- Version: v2

### `DataPolicy`

- Represents the label-policy binding.
- Version: v2

### `DataPolicy` (v1)

- Represents the label-policy binding.
- Version: v1

### `Empty`

- A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
- Version: v2

### `Expr`

- Represents a textual expression in the Common Expression Language (CEL) syntax. CEL is a C-like expression language. The syntax and semantics of CEL are documented at https://github.com/google/cel-spec. Example (Comparison): title: "Summary size limit" description: "Determines if a summary is less than 100 chars" expression: "document.summary.size() < 100" Example (Equality): title: "Requestor is owner" description: "Determines if requestor is the document owner" expression: "document.owner == request.auth.claims.email" Example (Logic): title: "Public documents" description: "Determine whether the document should be publicly visible" expression: "document.type != 'private' && document.type != 'internal'" Example (Data Manipulation): title: "Notification string" description: "Create a notification string with a timestamp." expression: "'New message received at ' + string(document.create_time)" The exact variables and functions that may be referenced within an expression are determined by the service that evaluates it. See the service documentation for additional information.
- Version: v2

### `GetIamPolicyRequest`

- Request message for `GetIamPolicy` method.
- Version: v2

### `GetPolicyOptions`

- Encapsulates settings provided to GetIamPolicy.
- Version: v2

### `ListDataPoliciesResponse`

- Response message for the ListDataPolicies method.
- Version: v2

### `Policy`

- An Identity and Access Management (IAM) policy, which specifies access controls for Google Cloud resources. A `Policy` is a collection of `bindings`. A `binding` binds one or more `members`, or principals, to a single `role`. Principals can be user accounts, service accounts, Google groups, and domains (such as G Suite). A `role` is a named list of permissions; each `role` can be an IAM predefined role or a user-created custom role. For some types of Google Cloud resources, a `binding` can also specify a `condition`, which is a logical expression that allows access to a resource only if the expression evaluates to `true`. A condition can add constraints based on attributes of the request, the resource, or both. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). The JSON and YAML examples of this description are shown below. For a description of IAM and its features, see the IAM documentation (https://cloud.google.com/iam/docs/).
- Version: v2

Adapted (not in the official docs): the JSON example of the Discovery `Policy` description, quoted as a JSON block; only the trailing comma after the `condition.expression` value is removed, so that the block is valid JSON (see Notes).

```json
{
  "bindings": [
    {
      "role": "roles/resourcemanager.organizationAdmin",
      "members": [
        "user:mike@example.com",
        "group:admins@example.com",
        "domain:google.com",
        "serviceAccount:my-project-id@appspot.gserviceaccount.com"
      ]
    },
    {
      "role": "roles/resourcemanager.organizationViewer",
      "members": [
        "user:eve@example.com"
      ],
      "condition": {
        "title": "expirable access",
        "description": "Does not grant access after Sep 2020",
        "expression": "request.time < timestamp('2020-10-01T00:00:00.000Z')"
      }
    }
  ],
  "etag": "BwWWja0YfJA=",
  "version": 3
}
```

YAML example from the description (line breaks and indentation restored from the source proto; see Notes):

```yaml
bindings:
- members:
  - user:mike@example.com
  - group:admins@example.com
  - domain:google.com
  - serviceAccount:my-project-id@appspot.gserviceaccount.com
  role: roles/resourcemanager.organizationAdmin
- members:
  - user:eve@example.com
  role: roles/resourcemanager.organizationViewer
  condition:
    title: expirable access
    description: Does not grant access after Sep 2020
    expression: request.time < timestamp('2020-10-01T00:00:00.000Z')
etag: BwWWja0YfJA=
version: 3
```

### `RemoveGranteesRequest`

- Request message for the RemoveGrantees method.
- Version: v2

### `RenameDataPolicyRequest`

- Request message for the RenameDataPolicy method.
- Version: v1

### `SetIamPolicyRequest`

- Request message for `SetIamPolicy` method.
- Version: v2

### `TestIamPermissionsRequest`

- Request message for `TestIamPermissions` method.
- Version: v2

### `TestIamPermissionsResponse`

- Response message for `TestIamPermissions` method.
- Version: v2

### Shape of `AddGranteesRequest`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "grantees": "array<string>"
}
```

### Example `AddGranteesRequest` value

Generated from the field types (not in the official docs): a JSON value that matches the table, with empty strings, `0` (`1` where the description allows only positive values), `false`, empty arrays and objects, and for an enum its first value other than `*_UNSPECIFIED`. int64 values are JSON strings, as in the Discovery `format`. It shows the JSON shape only; it is not a request to send as is (fill in the values the method needs, and omit output-only fields in requests).

```json
{
  "grantees": []
}
```

## Options / Props

### `AddGranteesRequest` fields

| Field | Type | Description |
|---|---|---|
| `grantees` | `array<string>` | Required. IAM principal that should be granted Fine Grained Access to the underlying data goverened by the data policy. The target data policy is the one named in the URL path (`{+dataPolicy}` of `addGrantees` / `removeGrantees`, a required path parameter); the request body carries only `grantees` (corrected; see Notes). Uses the IAM V2 principal syntax (https://cloud.google.com/iam/docs/principal-identifiers#v2). Supported principal types: \* User \* Group \* Service account |

### `AuditConfig` fields

| Field | Type | Description |
|---|---|---|
| `auditLogConfigs` | `array<AuditLogConfig>` | The configuration for logging of each type of permission. |
| `service` | string | Specifies a service that will be enabled for audit logging. For example, `storage.googleapis.com`, `cloudsql.googleapis.com`. `allServices` is a special value that covers all services. |

### `AuditLogConfig` fields

| Field | Type | Description |
|---|---|---|
| `exemptedMembers` | `array<string>` | Specifies the identities that do not cause logging for this type of permission. Follows the same format of Binding.members. |
| `logType` | string enum | The log type that this config enables. Values: `LOG_TYPE_UNSPECIFIED`, `ADMIN_READ`, `DATA_WRITE`, `DATA_READ`. |

### `Binding` fields

| Field | Type | Description |
|---|---|---|
| `condition` | Expr | The condition that is associated with this binding. If the condition evaluates to `true`, then this binding applies to the current request. If the condition evaluates to `false`, then this binding does not apply to the current request. However, a different role binding might grant the same role to one or more of the principals in this binding. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |
| `members` | `array<string>` | Specifies the principals requesting access for a Google Cloud resource. `members` can have the following values: \* `allUsers`: A special identifier that represents anyone who is on the internet; with or without a Google account. \* `allAuthenticatedUsers`: A special identifier that represents anyone who is authenticated with a Google account or a service account. Does not include identities that come from external identity providers (IdPs) through identity federation. \* `user:{emailid}`: An email address that represents a specific Google account. For example, `alice@example.com` . \* `serviceAccount:{emailid}`: An email address that represents a Google service account. For example, `my-other-app@appspot.gserviceaccount.com`. \* `serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]`: An identifier for a Kubernetes service account (https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts). For example, `my-project.svc.id.goog[my-namespace/my-kubernetes-sa]`. \* `group:{emailid}`: An email address that represents a Google group. For example, `admins@example.com`. \* `domain:{domain}`: The G Suite domain (primary) that represents all the users of that domain. For example, `google.com` or `example.com`. \* `principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workforce identity pool. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/group/{group_id}`: All workforce identities in a group. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All workforce identities with a specific attribute value. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/*`: All identities in a workforce identity pool. \* `principal://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workload identity pool. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/group/{group_id}`: A workload identity pool group. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All identities in a workload identity pool with a certain attribute. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/*`: All identities in a workload identity pool. \* `deleted:user:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a user that has been recently deleted. For example, `alice@example.com?uid=123456789012345678901`. If the user is recovered, this value reverts to `user:{emailid}` and the recovered user retains the role in the binding. \* `deleted:serviceAccount:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a service account that has been recently deleted. For example, `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901`. If the service account is undeleted, this value reverts to `serviceAccount:{emailid}` and the undeleted service account retains the role in the binding. \* `deleted:group:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a Google group that has been recently deleted. For example, `admins@example.com?uid=123456789012345678901`. If the group is recovered, this value reverts to `group:{emailid}` and the recovered group retains the role in the binding. \* `deleted:principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: Deleted single identity in a workforce identity pool. For example, `deleted:principal://iam.googleapis.com/locations/global/workforcePools/my-pool-id/subject/my-subject-attribute-value`. |
| `role` | string | Role that is assigned to the list of `members`, or principals. For example, `roles/viewer`, `roles/editor`, or `roles/owner`. For an overview of the IAM roles and permissions, see the IAM documentation (https://cloud.google.com/iam/docs/roles-overview). For a list of the available pre-defined roles, see here (https://cloud.google.com/iam/docs/understanding-roles). |

### `CreateDataPolicyRequest` fields

| Field | Type | Description |
|---|---|---|
| `dataPolicy` | DataPolicy (definition for this version: [`DataPolicy` (v2)](#datapolicy)) | Required. The data policy to create. The `name` field does not need to be provided for the data policy creation. |
| `dataPolicyId` | string | Required. User-assigned (human readable) ID of the data policy that needs to be unique within a project. Used as {data_policy_id} in part of the resource name. |

### `DataGovernanceTag` fields

| Field | Type | Description |
|---|---|---|
| `key` | string | Optional. Tag keys are globally unique. Tag key is expected to be in the namespaced format, for example `parent-id/pii` where `parent-id` is the ID of the parent organization or project resource for this tag key. |
| `value` | string | Optional. Specifies the tag value as the short name, for example `sensitive`. |

### `DataMaskingPolicy` fields

| Field | Type | Description |
|---|---|---|
| `predefinedExpression` | string enum | Optional. A predefined masking expression. Mutually exclusive with `routine` (proto `oneof masking_expression`; set at most one; see Notes). Values: `PREDEFINED_EXPRESSION_UNSPECIFIED`, `SHA256`, `ALWAYS_NULL`, `DEFAULT_MASKING_VALUE`, `LAST_FOUR_CHARACTERS`, `FIRST_FOUR_CHARACTERS`, `EMAIL_MASK`, `DATE_YEAR_MASK`, `RANDOM_HASH`. |
| `routine` | string | Optional. The name of the BigQuery routine that contains the custom masking routine, in the format of `projects/{project_number}/datasets/{dataset_id}/routines/{routine_id}`. Mutually exclusive with `predefinedExpression` (proto `oneof masking_expression`; set at most one; see Notes). |

### `DataPolicy` fields

| Field | Type | Description |
|---|---|---|
| `dataGovernanceTag` | DataGovernanceTag | Optional. Data Governance tag bound to the Data Policy. |
| `dataMaskingPolicy` | DataMaskingPolicy | Optional. The data masking policy that specifies the data masking rule to use. It must be set if the data policy type is DATA_MASKING_POLICY. |
| `dataPolicyId` | string | Output only. User-assigned (human readable) ID of the data policy that needs to be unique within a project. Used as {data_policy_id} in part of the resource name. |
| `dataPolicyType` | string enum | Required. Type of data policy. Values: `DATA_POLICY_TYPE_UNSPECIFIED`, `DATA_MASKING_POLICY`, `RAW_DATA_ACCESS_POLICY`, `COLUMN_LEVEL_SECURITY_POLICY`. |
| `etag` | string | The etag for this Data Policy. This field is used for UpdateDataPolicy calls. If Data Policy exists, this field is required and must match the server's etag. It will also be populated in the response of GetDataPolicy, CreateDataPolicy, and UpdateDataPolicy calls. |
| `grantees` | `array<string>` | Optional. The list of IAM principals that have Fine Grained Access to the underlying data goverened by this data policy. Uses the IAM V2 principal syntax (https://cloud.google.com/iam/docs/principal-identifiers#v2) Only supports principal types users, groups, serviceaccounts, cloudidentity. This field is supported in V2 Data Policy only. In case of V1 data policies (i.e. verion = 1 and policy_tag is set), this field is not populated. |
| `matchingCondition` | string | Optional. Matching condition specified as a SQL expression string. Data Governance Tag matcher functions are: `COLUMN_HAS_TAG_KEY(keyName STRING) -> BOOL` `COLUMN_MATCH_TAG(keyName STRING, valueShortName STRING) -> BOOL` For example: `COLUMN_HAS_TAG_KEY('project-id/pii') AND COLUMN_MATCH_TAG('project-id/pii', 'ssn')` |
| `name` | string | Identifier. Resource name of this data policy, in the format of `projects/{project_number}/locations/{location_id}/dataPolicies/{data_policy_id}`. |
| `policyTag` | string | Output only. Policy tag resource name, in the format of `projects/{project_number}/locations/{location_id}/taxonomies/{taxonomy_id}/policyTags/{policyTag_id}`. policy_tag is supported only for V1 data policies. |
| `version` | string enum | Output only. The version of the Data Policy resource. Values: `VERSION_UNSPECIFIED`, `V1`, `V2`. |

### `DataPolicy` (v1) fields

| Field | Type | Description |
|---|---|---|
| `dataMaskingPolicy` | DataMaskingPolicy | The data masking policy that specifies the data masking rule to use. |
| `dataPolicyId` | string | User-assigned (human readable) ID of the data policy that needs to be unique within a project. Used as {data_policy_id} in part of the resource name. |
| `dataPolicyType` | string enum | Required. Data policy type. Type of data policy. Values: `DATA_POLICY_TYPE_UNSPECIFIED`, `COLUMN_LEVEL_SECURITY_POLICY`, `DATA_MASKING_POLICY`. |
| `name` | string | Output only. Resource name of this data policy, in the format of `projects/{project_number}/locations/{location_id}/dataPolicies/{data_policy_id}`. |
| `policyTag` | string | Policy tag resource name, in the format of `projects/{project_number}/locations/{location_id}/taxonomies/{taxonomy_id}/policyTags/{policyTag_id}`. |

### `Expr` fields

| Field | Type | Description |
|---|---|---|
| `description` | string | Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI. |
| `expression` | string | Textual representation of an expression in Common Expression Language syntax. |
| `location` | string | Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file. |
| `title` | string | Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression. |

### `GetIamPolicyRequest` fields

| Field | Type | Description |
|---|---|---|
| `options` | GetPolicyOptions | OPTIONAL: A `GetPolicyOptions` object for specifying options to `GetIamPolicy`. |

### `GetPolicyOptions` fields

| Field | Type | Description |
|---|---|---|
| `requestedPolicyVersion` | integer (int32) | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `ListDataPoliciesResponse` fields

| Field | Type | Description |
|---|---|---|
| `dataPolicies` | `array<DataPolicy>` (definitions by version: [`DataPolicy` (v2)](#datapolicy), [`DataPolicy` (v1)](#datapolicy-v1)) | Data policies that belong to the requested project. |
| `nextPageToken` | string | Token used to retrieve the next page of results, or empty if there are no more results. |

### `Policy` fields

| Field | Type | Description |
|---|---|---|
| `auditConfigs` | `array<AuditConfig>` | Specifies cloud audit logging configuration for this policy. |
| `bindings` | `array<Binding>` | Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal. The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`. |
| `etag` | string (byte) | `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy. \*\*Important:\*\* If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. |
| `version` | integer (int32) | Specifies the format of the policy. Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected. Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations: \* Getting a policy that includes a conditional role binding \* Adding a conditional role binding to a policy \* Changing a conditional role binding in a policy \* Removing any role binding, with or without a condition, from a policy that includes conditions \*\*Important:\*\* If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `RemoveGranteesRequest` fields

| Field | Type | Description |
|---|---|---|
| `grantees` | `array<string>` | Required. IAM principal that should be revoked from Fine Grained Access to the underlying data goverened by the data policy. The target data policy is the one named in the URL path (`{+dataPolicy}` of `addGrantees` / `removeGrantees`, a required path parameter); the request body carries only `grantees` (corrected; see Notes). Uses the IAM V2 principal syntax (https://cloud.google.com/iam/docs/principal-identifiers#v2). Supported principal types: \* User \* Group \* Service account |

### `RenameDataPolicyRequest` fields

| Field | Type | Description |
|---|---|---|
| `newDataPolicyId` | string | Required. The new data policy id. |

### `SetIamPolicyRequest` fields

| Field | Type | Description |
|---|---|---|
| `policy` | Policy | REQUIRED: The complete policy to be applied to the `resource`. The size of the policy is limited to a few 10s of KB. An empty policy is a valid policy but certain Google Cloud services (such as Projects) might reject them. |
| `updateMask` | string (google-fieldmask) | OPTIONAL: A FieldMask specifying which fields of the policy to modify. Only the fields in the mask will be modified. If no mask is provided, the following default mask is used: `paths: "bindings, etag"` |

### `TestIamPermissionsRequest` fields

| Field | Type | Description |
|---|---|---|
| `permissions` | `array<string>` | The set of permissions to check for the `resource`. Permissions with wildcards (such as `*` or `storage.*`) are not allowed. For more information see IAM Overview (https://cloud.google.com/iam/docs/overview#permissions). |

### `TestIamPermissionsResponse` fields

| Field | Type | Description |
|---|---|---|
| `permissions` | `array<string>` | A subset of `TestIamPermissionsRequest.permissions` that the caller is allowed (request type name corrected; see Notes). |

## Notes

- Generated from the Discovery document(s) v2, v1 of `bigquerydatapolicy` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Adapted from the Discovery document: the `AuditConfig` description embeds an "Example Policy with multiple AuditConfigs" in one line with the proto field names (`audit_configs`, `audit_log_configs`, `log_type`, `exempted_members`); this page shows it as a JSON block of a `Policy` with the REST JSON (camelCase) field names; the values are unchanged.
- Corrected from the Discovery document: the JSON example in the `Policy` description (the `google.iam.v1` text shared by the IAM methods) has a trailing comma after the `condition.expression` value (`"expression": "request.time < timestamp('2020-10-01T00:00:00.000Z')", } }`), which is not valid JSON; the same comma is in the proto comment. This page shows the example as a JSON block without that comma. The Discovery text of the YAML example has lost its line breaks and indentation, so the YAML block is taken from the proto comment (`google/iam/v1/policy.proto`, https://github.com/googleapis/googleapis/blob/5ce024537af135bb2a0d3228072dd660047956aa/google/iam/v1/policy.proto, commit `5ce0245`, retrieved 2026-11-21).
- Corrected from the Discovery document: the `AuditLogConfig` description gives the example `{ "audit_log_configs": [ { "log_type": "DATA_READ", "exempted_members": [ "user:jose@example.com" ] }, { "log_type": "DATA_WRITE" } ] }`, which is the `auditLogConfigs` array of the parent `AuditConfig` written with proto field names, not an `AuditLogConfig` value; the table shows the two array elements as `AuditLogConfig` values with the REST JSON (camelCase) field names `logType` and `exemptedMembers` (a whole `AuditConfig` with the same values in REST JSON: `{ "service": "allServices", "auditLogConfigs": [ { "logType": "DATA_READ", "exemptedMembers": [ "user:jose@example.com" ] }, { "logType": "DATA_WRITE" } ] }`).
- Corrected from the Discovery document: the `grantees` descriptions of `AddGranteesRequest` and `RemoveGranteesRequest` read "The target data policy is determined by the `data_policy` field."; in the proto, `data_policy` is a field of the request message that the HTTP binding maps to the URL path (`post: "/v2/{data_policy=projects/*/locations/*/dataPolicies/*}:addGrantees"`, likewise `:removeGrantees`), and the Discovery document has no `dataPolicy` property in these request schemas; the methods take it as the required path parameter `dataPolicy` (`v2/{+dataPolicy}:addGrantees`, `v2/{+dataPolicy}:removeGrantees`), so the policy name goes in the URL, not in the body (`google/cloud/bigquery/datapolicies/v2/datapolicy.proto`, https://github.com/googleapis/googleapis/blob/5ce024537af135bb2a0d3228072dd660047956aa/google/cloud/bigquery/datapolicies/v2/datapolicy.proto, commit `5ce0245`, retrieved 2026-11-21).
- Corrected from the Discovery document: the `TestIamPermissionsResponse.permissions` description reads "A subset of `TestPermissionsRequest.permissions` that the caller is allowed."; the same text is in the `google.iam.v1` proto, where the request message of `TestIamPermissions` is `TestIamPermissionsRequest` (`google/iam/v1/iam_policy.proto`, https://github.com/googleapis/googleapis/blob/5ce024537af135bb2a0d3228072dd660047956aa/google/iam/v1/iam_policy.proto, commit `5ce0245`, retrieved 2026-11-21).
- Mutually exclusive fields of `DataMaskingPolicy`: `predefinedExpression`, `routine` are the members of `oneof masking_expression` in the proto (`google/cloud/bigquery/datapolicies/v2/datapolicy.proto`, https://github.com/googleapis/googleapis/blob/5ce024537af135bb2a0d3228072dd660047956aa/google/cloud/bigquery/datapolicies/v2/datapolicy.proto, commit `5ce0245`), so a message contains at most one of them (for output-only fields, the response contains at most one). The Discovery document has no notation for `oneof` and lists them as independent fields.
- Source: https://bigquerydatapolicy.googleapis.com/$discovery/rest?version=v2, https://bigquerydatapolicy.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
