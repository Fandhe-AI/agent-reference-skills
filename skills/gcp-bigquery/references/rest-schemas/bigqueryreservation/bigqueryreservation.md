---
source: https://bigqueryreservation.googleapis.com/$discovery/rest?version=v1
---

# BigQuery Reservation API message schemas (bigqueryreservation)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/bigqueryreservation/`.

### `Assignment`

- An assignment allows a project to submit jobs of a certain type using slots from the specified reservation.
- Version: v1

### `AuditConfig`

- Specifies the audit configuration for a service. The configuration determines which permission types are logged, and what identities, if any, are exempted from logging. An AuditConfig must have one or more AuditLogConfigs. If there are AuditConfigs for both `allServices` and a specific service, the union of the two AuditConfigs is used for that service: the log_types specified in each AuditConfig are enabled, and the exempted_members in each AuditLogConfig are exempted. The `Policy` example of this description is shown below with the REST JSON field names. For sampleservice, this policy enables DATA_READ, DATA_WRITE and ADMIN_READ logging. It also exempts `jose@example.com` from DATA_READ logging, and `aliya@example.com` from DATA_WRITE logging.
- Version: v1

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
- Version: v1

### `Autoscale`

- Auto scaling settings.
- Version: v1

### `BiReservation`

- Represents a BI Reservation.
- Version: v1

### `Binding`

- Associates `members`, or principals, with a `role`.
- Version: v1

### `CapacityCommitment`

- Capacity commitment is a way to purchase compute capacity for BigQuery jobs (in the form of slots) with some committed period of usage. Annual commitments renew by default. Commitments can be removed after their commitment end time passes. In order to remove annual commitment, its plan needs to be changed to monthly or flex first. A capacity commitment resource exists as a child resource of the admin project.
- Version: v1

### `Empty`

- A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
- Version: v1

### `Expr`

- Represents a textual expression in the Common Expression Language (CEL) syntax. CEL is a C-like expression language. The syntax and semantics of CEL are documented at https://github.com/google/cel-spec. Example (Comparison): title: "Summary size limit" description: "Determines if a summary is less than 100 chars" expression: "document.summary.size() < 100" Example (Equality): title: "Requestor is owner" description: "Determines if requestor is the document owner" expression: "document.owner == request.auth.claims.email" Example (Logic): title: "Public documents" description: "Determine whether the document should be publicly visible" expression: "document.type != 'private' && document.type != 'internal'" Example (Data Manipulation): title: "Notification string" description: "Create a notification string with a timestamp." expression: "'New message received at ' + string(document.create_time)" The exact variables and functions that may be referenced within an expression are determined by the service that evaluates it. See the service documentation for additional information.
- Version: v1

### `FailoverReservationRequest`

- The request for ReservationService.FailoverReservation.
- Version: v1

### `ListAssignmentsResponse`

- The response for ReservationService.ListAssignments.
- Version: v1

### `ListCapacityCommitmentsResponse`

- The response for ReservationService.ListCapacityCommitments.
- Version: v1

### `ListReservationGroupsResponse`

- The response for ReservationService.ListReservationGroups.
- Version: v1

### `ListReservationsResponse`

- The response for ReservationService.ListReservations.
- Version: v1

### `MergeCapacityCommitmentsRequest`

- The request for ReservationService.MergeCapacityCommitments.
- Version: v1

### `MoveAssignmentRequest`

- The request for ReservationService.MoveAssignment. \*\*Note\*\*: "bigquery.reservationAssignments.create" permission is required on the destination_id. \*\*Note\*\*: "bigquery.reservationAssignments.create" and "bigquery.reservationAssignments.delete" permission are required on the related assignee.
- Version: v1

### `Policy`

- An Identity and Access Management (IAM) policy, which specifies access controls for Google Cloud resources. A `Policy` is a collection of `bindings`. A `binding` binds one or more `members`, or principals, to a single `role`. Principals can be user accounts, service accounts, Google groups, and domains (such as G Suite). A `role` is a named list of permissions; each `role` can be an IAM predefined role or a user-created custom role. For some types of Google Cloud resources, a `binding` can also specify a `condition`, which is a logical expression that allows access to a resource only if the expression evaluates to `true`. A condition can add constraints based on attributes of the request, the resource, or both. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). The JSON and YAML examples of this description are shown below. For a description of IAM and its features, see the IAM documentation (https://cloud.google.com/iam/docs/).
- Version: v1

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

### `ReplicationStatus`

- Disaster Recovery(DR) replication status of the reservation.
- Version: v1

### `Reservation`

- A reservation is a mechanism used to guarantee slots to users.
- Version: v1

### `ReservationGroup`

- A reservation group is a container for reservations.
- Version: v1

### `SchedulingPolicy`

- The scheduling policy controls how a reservation's resources are distributed.
- Version: v1

### `SearchAllAssignmentsResponse`

- The response for ReservationService.SearchAllAssignments.
- Version: v1

### `SearchAssignmentsResponse`

- The response for ReservationService.SearchAssignments.
- Version: v1

### `SetIamPolicyRequest`

- Request message for `SetIamPolicy` method.
- Version: v1

### `SplitCapacityCommitmentRequest`

- The request for ReservationService.SplitCapacityCommitment.
- Version: v1

### `SplitCapacityCommitmentResponse`

- The response for ReservationService.SplitCapacityCommitment.
- Version: v1

### `Status`

- The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by gRPC (https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the API Design Guide (https://cloud.google.com/apis/design/errors).
- Version: v1

### `TableReference`

- Fully qualified reference to BigQuery table. Internally stored as google.cloud.bi.v1.BqTableReference.
- Version: v1

### `TestIamPermissionsRequest`

- Request message for `TestIamPermissions` method.
- Version: v1

### `TestIamPermissionsResponse`

- Response message for `TestIamPermissions` method.
- Version: v1

### `UpgradeEditionRequest`

- The request for ReservationService.UpgradeEdition. You must specify at least one reservation or capacity commitment.
- Version: v1

### `UpgradeEditionResponse`

- The response for ReservationService.UpgradeEdition.
- Version: v1

### Shape of `Assignment`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "assignee": "string",
  "condition": "Expr",
  "enableGeminiInBigquery": "boolean",
  "jobType": "string enum",
  "name": "string",
  "precedence": "string (int64)",
  "principal": "string",
  "schedulingPolicy": "SchedulingPolicy",
  "state": "string enum"
}
```

### Example `Assignment` value

Generated from the field types (not in the official docs): a JSON value that matches the table, with empty strings, `0` (`1` where the description allows only positive values), `false`, empty arrays and objects, and for an enum its first value other than `*_UNSPECIFIED`. int64 values are JSON strings, as in the Discovery `format`. It shows the JSON shape only; it is not a request to send as is (fill in the values the method needs, and omit output-only fields in requests). Deprecated fields are left out (`enableGeminiInBigquery`; see the table and Notes).

```json
{
  "assignee": "",
  "condition": {},
  "jobType": "PIPELINE",
  "name": "",
  "precedence": "0",
  "principal": "",
  "schedulingPolicy": {},
  "state": "PENDING"
}
```

## Options / Props

### `Assignment` fields

| Field | Type | Description |
|---|---|---|
| `assignee` | string | Optional. The resource which will use the reservation. E.g. `projects/myproject`, `folders/123`, or `organizations/456`. |
| `condition` | Expr | Optional. Common Expression Language (CEL) condition that defines the matching criteria for this assignment. The condition must resolve to a boolean value. Supported variables will be added later. |
| `enableGeminiInBigquery` | boolean | Optional. Deprecated: "Gemini in BigQuery" is now available by default for all BigQuery editions and should not be explicitly set. Controls if "Gemini in BigQuery" (https://cloud.google.com/gemini/docs/bigquery/overview) features should be enabled for this reservation assignment. |
| `jobType` | string enum | Optional. Which type of jobs will use the reservation. Values: `JOB_TYPE_UNSPECIFIED`, `PIPELINE`, `QUERY`, `ML_EXTERNAL`, `BACKGROUND`, `CONTINUOUS`, `BACKGROUND_CHANGE_DATA_CAPTURE`, `BACKGROUND_COLUMN_METADATA_INDEX`, `BACKGROUND_SEARCH_INDEX_REFRESH`, `AUTOMATIC_MATERIALIZED_VIEW_REFRESH`. |
| `name` | string | Output only. Name of the resource. E.g.: `projects/myproject/locations/US/reservations/team1-prod/assignments/123`. The assignment_id must only contain lower case alphanumeric characters or dashes and the max length is 64 characters. |
| `precedence` | string (int64) | Optional. Specifies the priority precedence for this assignment. Used to resolve ambiguity when multiple assignments match a single job. Higher numerical values represent higher priority (e.g., 20 is higher than 10). If unspecified, it defaults to 0. Multiple assignments can share the same precedence, but it is recommended to use unique precedence values for assignments within the same assignee scope. |
| `principal` | string | Optional. Represents the principal for this assignment. If not empty, jobs run by this principal utilize the associated reservation. Otherwise, jobs fall back to using the reservation assigned to the project, folder, or organization, in that order. If no reservation is assigned at any of these levels, on-demand capacity is used. The supported formats are: \* `principal://goog/subject/USER_EMAIL_ADDRESS` for users, \* `principal://iam.googleapis.com/projects/-/serviceAccounts/SA_EMAIL_ADDRESS` for service accounts, \* `principal://iam.googleapis.com/projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/POOL_ID/subject/SUBJECT_ID` for workload identity pool identities. \* The special value `unknown_or_deleted_user` represents principals which cannot be read from the user info service, for example, deleted users. |
| `schedulingPolicy` | SchedulingPolicy | Optional. The scheduling policy to use for jobs and queries of this assignee when running under the associated reservation. The scheduling policy controls how the reservation's resources are distributed. This overrides the default scheduling policy specified on the reservation. This feature is not yet generally available. |
| `state` | string enum | Output only. State of the assignment. Values: `STATE_UNSPECIFIED`, `PENDING`, `ACTIVE`. |

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

### `Autoscale` fields

| Field | Type | Description |
|---|---|---|
| `currentSlots` | string (int64) | Output only. The slot capacity added to this reservation when autoscale happens. Will be between \[0, max_slots\]. Note: after users reduce max_slots, it may take a while before it can be propagated, so current_slots may stay in the original value and could be larger than max_slots for that brief period (less than one minute) |
| `maxSlots` | string (int64) | Optional. Number of slots to be scaled when needed. |

### `BiReservation` fields

| Field | Type | Description |
|---|---|---|
| `name` | string | Identifier. The resource name of the singleton BI reservation. Reservation names have the form `projects/{project_id}/locations/{location_id}/biReservation`. |
| `preferredTables` | `array<TableReference>` | Optional. Preferred tables to use BI capacity for. |
| `size` | string (int64) | Optional. Size of a reservation, in bytes. |
| `updateTime` | string (google-datetime) | Output only. The last update timestamp of a reservation. |

### `Binding` fields

| Field | Type | Description |
|---|---|---|
| `condition` | Expr | The condition that is associated with this binding. If the condition evaluates to `true`, then this binding applies to the current request. If the condition evaluates to `false`, then this binding does not apply to the current request. However, a different role binding might grant the same role to one or more of the principals in this binding. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |
| `members` | `array<string>` | Specifies the principals requesting access for a Google Cloud resource. `members` can have the following values: \* `allUsers`: A special identifier that represents anyone who is on the internet; with or without a Google account. \* `allAuthenticatedUsers`: A special identifier that represents anyone who is authenticated with a Google account or a service account. Does not include identities that come from external identity providers (IdPs) through identity federation. \* `user:{emailid}`: An email address that represents a specific Google account. For example, `alice@example.com` . \* `serviceAccount:{emailid}`: An email address that represents a Google service account. For example, `my-other-app@appspot.gserviceaccount.com`. \* `serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]`: An identifier for a Kubernetes service account (https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts). For example, `my-project.svc.id.goog[my-namespace/my-kubernetes-sa]`. \* `group:{emailid}`: An email address that represents a Google group. For example, `admins@example.com`. \* `domain:{domain}`: The G Suite domain (primary) that represents all the users of that domain. For example, `google.com` or `example.com`. \* `principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workforce identity pool. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/group/{group_id}`: All workforce identities in a group. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All workforce identities with a specific attribute value. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/*`: All identities in a workforce identity pool. \* `principal://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workload identity pool. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/group/{group_id}`: A workload identity pool group. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All identities in a workload identity pool with a certain attribute. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/*`: All identities in a workload identity pool. \* `deleted:user:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a user that has been recently deleted. For example, `alice@example.com?uid=123456789012345678901`. If the user is recovered, this value reverts to `user:{emailid}` and the recovered user retains the role in the binding. \* `deleted:serviceAccount:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a service account that has been recently deleted. For example, `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901`. If the service account is undeleted, this value reverts to `serviceAccount:{emailid}` and the undeleted service account retains the role in the binding. \* `deleted:group:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a Google group that has been recently deleted. For example, `admins@example.com?uid=123456789012345678901`. If the group is recovered, this value reverts to `group:{emailid}` and the recovered group retains the role in the binding. \* `deleted:principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: Deleted single identity in a workforce identity pool. For example, `deleted:principal://iam.googleapis.com/locations/global/workforcePools/my-pool-id/subject/my-subject-attribute-value`. |
| `role` | string | Role that is assigned to the list of `members`, or principals. For example, `roles/viewer`, `roles/editor`, or `roles/owner`. For an overview of the IAM roles and permissions, see the IAM documentation (https://cloud.google.com/iam/docs/roles-overview). For a list of the available pre-defined roles, see here (https://cloud.google.com/iam/docs/understanding-roles). |

### `CapacityCommitment` fields

| Field | Type | Description |
|---|---|---|
| `commitmentEndTime` | string (google-datetime) | Output only. The end of the current commitment period. It is applicable only for ACTIVE capacity commitments. Note after renewal, commitment_end_time is the time the renewed commitment expires. So itwould be at a time after commitment_start_time + committed period, because we don't change commitment_start_time , |
| `commitmentStartTime` | string (google-datetime) | Output only. The start of the current commitment period. It is applicable only for ACTIVE capacity commitments. Note after the commitment is renewed, commitment_start_time won't be changed. It refers to the start time of the original commitment. |
| `edition` | string enum | Optional. Edition of the capacity commitment. Values: `EDITION_UNSPECIFIED`, `STANDARD`, `ENTERPRISE`, `ENTERPRISE_PLUS`. |
| `failureStatus` | Status | Output only. For FAILED commitment plan, provides the reason of failure. |
| `isFlatRate` | boolean | Output only. If true, the commitment is a flat-rate commitment, otherwise, it's an edition commitment. |
| `multiRegionAuxiliary` | boolean | Applicable only for commitments located within one of the BigQuery multi-regions (US or EU). If set to true, this commitment is placed in the organization's secondary region which is designated for disaster recovery purposes. If false, this commitment is placed in the organization's default region. NOTE: this is a preview feature. Project must be allow-listed in order to set this field. Deprecated (`deprecated: true` in the Discovery document; see Notes). |
| `name` | string | Output only. The resource name of the capacity commitment, e.g., `projects/myproject/locations/US/capacityCommitments/123` The commitment_id must only contain lower case alphanumeric characters or dashes. It must start with a letter and must not end with a dash. Its maximum length is 64 characters. |
| `plan` | string enum | Optional. Capacity commitment commitment plan. Values: `COMMITMENT_PLAN_UNSPECIFIED`, `FLEX`, `FLEX_FLAT_RATE`, `TRIAL`, `MONTHLY`, `MONTHLY_FLAT_RATE`, `ANNUAL`, `ANNUAL_FLAT_RATE`, `THREE_YEAR`, `NONE`. |
| `renewalPlan` | string enum | Optional. The plan this capacity commitment is converted to after commitment_end_time passes. Once the plan is changed, committed period is extended according to commitment plan. Only applicable for ANNUAL and TRIAL commitments. Values: `COMMITMENT_PLAN_UNSPECIFIED`, `FLEX`, `FLEX_FLAT_RATE`, `TRIAL`, `MONTHLY`, `MONTHLY_FLAT_RATE`, `ANNUAL`, `ANNUAL_FLAT_RATE`, `THREE_YEAR`, `NONE`. |
| `slotCount` | string (int64) | Optional. Number of slots in this commitment. |
| `state` | string enum | Output only. State of the commitment. Values: `STATE_UNSPECIFIED`, `PENDING`, `ACTIVE`, `FAILED`. |

### `Expr` fields

| Field | Type | Description |
|---|---|---|
| `description` | string | Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI. |
| `expression` | string | Textual representation of an expression in Common Expression Language syntax. |
| `location` | string | Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file. |
| `title` | string | Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression. |

### `FailoverReservationRequest` fields

| Field | Type | Description |
|---|---|---|
| `failoverMode` | string enum | Optional. A parameter that determines how writes that are pending replication are handled after a failover is initiated. If not specified, HARD failover mode is used by default. Values: `FAILOVER_MODE_UNSPECIFIED`, `SOFT`, `HARD`. |

### `ListAssignmentsResponse` fields

| Field | Type | Description |
|---|---|---|
| `assignments` | `array<Assignment>` | List of assignments visible to the user. |
| `nextPageToken` | string | Token to retrieve the next page of results, or empty if there are no more results in the list. |

### `ListCapacityCommitmentsResponse` fields

| Field | Type | Description |
|---|---|---|
| `capacityCommitments` | `array<CapacityCommitment>` | List of capacity commitments visible to the user. |
| `nextPageToken` | string | Token to retrieve the next page of results, or empty if there are no more results in the list. |

### `ListReservationGroupsResponse` fields

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | Token to retrieve the next page of results, or empty if there are no more results in the list. |
| `reservationGroups` | `array<ReservationGroup>` | List of reservations visible to the user. |

### `ListReservationsResponse` fields

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | Token to retrieve the next page of results, or empty if there are no more results in the list. |
| `reservations` | `array<Reservation>` | List of reservations visible to the user. |

### `MergeCapacityCommitmentsRequest` fields

| Field | Type | Description |
|---|---|---|
| `capacityCommitmentId` | string | Optional. The optional resulting capacity commitment ID. Capacity commitment name will be generated automatically if this field is empty. This field must only contain lower case alphanumeric characters or dashes. The first and last character cannot be a dash. Max length is 64 characters. |
| `capacityCommitmentIds` | `array<string>` | Ids of capacity commitments to merge. These capacity commitments must exist under admin project and location specified in the parent. ID is the last portion of capacity commitment name e.g., 'abc' for projects/myproject/locations/US/capacityCommitments/abc |

### `MoveAssignmentRequest` fields

| Field | Type | Description |
|---|---|---|
| `assignmentId` | string | The optional assignment ID. A new assignment name is generated if this field is empty. This field can contain only lowercase alphanumeric characters or dashes. Max length is 64 characters. |
| `destinationId` | string | The new reservation ID, e.g.: `projects/myotherproject/locations/US/reservations/team2-prod` |

### `Policy` fields

| Field | Type | Description |
|---|---|---|
| `auditConfigs` | `array<AuditConfig>` | Specifies cloud audit logging configuration for this policy. |
| `bindings` | `array<Binding>` | Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal. The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`. |
| `etag` | string (byte) | `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy. \*\*Important:\*\* If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. |
| `version` | integer (int32) | Specifies the format of the policy. Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected. Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations: \* Getting a policy that includes a conditional role binding \* Adding a conditional role binding to a policy \* Changing a conditional role binding in a policy \* Removing any role binding, with or without a condition, from a policy that includes conditions \*\*Important:\*\* If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `ReplicationStatus` fields

| Field | Type | Description |
|---|---|---|
| `error` | Status | Output only. The last error encountered while trying to replicate changes from the primary to the secondary. This field is only available if the replication has not succeeded since. |
| `lastErrorTime` | string (google-datetime) | Output only. The time at which the last error was encountered while trying to replicate changes from the primary to the secondary. This field is only available if the replication has not succeeded since. |
| `lastReplicationTime` | string (google-datetime) | Output only. A timestamp corresponding to the last change on the primary that was successfully replicated to the secondary. |
| `softFailoverStartTime` | string (google-datetime) | Output only. The time at which a soft failover for the reservation and its associated datasets was initiated. After this field is set, all subsequent changes to the reservation will be rejected unless a hard failover overrides this operation. This field will be cleared once the failover is complete. |

### `Reservation` fields

| Field | Type | Description |
|---|---|---|
| `autoscale` | Autoscale | Optional. The configuration parameters for the auto scaling feature. |
| `concurrency` | string (int64) | Optional. Job concurrency target which sets a soft upper bound on the number of jobs that can run concurrently in this reservation. This is a soft target due to asynchronous nature of the system and various optimizations for small queries. Default value is 0 which means that concurrency target will be automatically computed by the system. NOTE: this field is exposed as target job concurrency in the Information Schema, DDL and BigQuery CLI. |
| `creationTime` | string (google-datetime) | Output only. Creation time of the reservation. |
| `edition` | string enum | Optional. Edition of the reservation. Values: `EDITION_UNSPECIFIED`, `STANDARD`, `ENTERPRISE`, `ENTERPRISE_PLUS`. |
| `ignoreIdleSlots` | boolean | Optional. If false, any query or pipeline job using this reservation will use idle slots from other reservations within the same admin project. If true, a query or pipeline job using this reservation will execute with the slot capacity specified in the slot_capacity field at most. |
| `labels` | `map<string, string>` | Optional. The labels associated with this reservation. You can use these to organize and group your reservations. You can set this property when you create or update a reservation. |
| `maxSlots` | string (int64) | Optional. The overall max slots for the reservation, covering slot_capacity (baseline), idle slots (if ignore_idle_slots is false) and scaled slots. If present, the reservation won't use more than the specified number of slots, even if there is demand and supply (from idle slots). NOTE: capping a reservation's idle slot usage is best effort and its usage may exceed the max_slots value. However, in terms of autoscale.current_slots (which accounts for the additional added slots), it will never exceed the max_slots - baseline. This field must be set together with the scaling_mode enum value, otherwise the request will be rejected with error code `google.rpc.Code.INVALID_ARGUMENT`. If the max_slots and scaling_mode are set, the autoscale or autoscale.max_slots field must be unset. Otherwise the request will be rejected with error code `google.rpc.Code.INVALID_ARGUMENT`. However, the autoscale field may still be in the output. The autopscale.max_slots will always show as 0 and the autoscaler.current_slots will represent the current slots from autoscaler excluding idle slots. For example, if the max_slots is 1000 and scaling_mode is AUTOSCALE_ONLY, then in the output, the autoscaler.max_slots will be 0 and the autoscaler.current_slots may be any value between 0 and 1000. If the max_slots is 1000, scaling_mode is ALL_SLOTS, the baseline is 100 and idle slots usage is 200, then in the output, the autoscaler.max_slots will be 0 and the autoscaler.current_slots will not be higher than 700. If the max_slots is 1000, scaling_mode is IDLE_SLOTS_ONLY, then in the output, the autoscaler field will be null. If the max_slots and scaling_mode are set, then the ignore_idle_slots field must be aligned with the scaling_mode enum value.(See details in ScalingMode comments). Otherwise the request will be rejected with error code `google.rpc.Code.INVALID_ARGUMENT`. Please note, the max_slots is for user to manage the part of slots greater than the baseline. Therefore, we don't allow users to set max_slots smaller or equal to the baseline as it will not be meaningful. If the field is present and slot_capacity>=max_slots, requests will be rejected with error code `google.rpc.Code.INVALID_ARGUMENT`. Please note that if max_slots is set to 0, we will treat it as unset. Customers can set max_slots to 0 and set scaling_mode to SCALING_MODE_UNSPECIFIED to disable the max_slots feature. |
| `multiRegionAuxiliary` | boolean | Applicable only for reservations located within one of the BigQuery multi-regions (US or EU). If set to true, this reservation is placed in the organization's secondary region which is designated for disaster recovery purposes. If false, this reservation is placed in the organization's default region. NOTE: this is a preview feature. Project must be allow-listed in order to set this field. Deprecated (`deprecated: true` in the Discovery document; see Notes). |
| `name` | string | Identifier. The resource name of the reservation, e.g., `projects/*/locations/*/reservations/team1-prod`. The reservation_id must only contain lower case alphanumeric characters or dashes. It must start with a letter and must not end with a dash. Its maximum length is 64 characters. |
| `originalPrimaryLocation` | string | Output only. The location where the reservation was originally created. This is set only during the failover reservation's creation. All billing charges for the failover reservation will be applied to this location. |
| `primaryLocation` | string | Output only. The current location of the reservation's primary replica. This field is only set for reservations using the managed disaster recovery feature. |
| `replicationStatus` | ReplicationStatus | Output only. The Disaster Recovery(DR) replication status of the reservation. This is only available for the primary replicas of DR/failover reservations and provides information about the both the staleness of the secondary and the last error encountered while trying to replicate changes from the primary to the secondary. If this field is blank, it means that the reservation is either not a DR reservation or the reservation is a DR secondary or that any replication operations on the reservation have succeeded. |
| `reservationGroup` | string | Optional. The reservation group that this reservation belongs to. You can set this property when you create or update a reservation. Reservations do not need to belong to a reservation group. Format: projects/{project}/locations/{location}/reservationGroups/{reservation_group} or just {reservation_group} |
| `reservationGroupPath` | `array<string>` | Output only. The reservation group path of the reservation from root to leaf. The order of elements matters: the first element is the top level group and the last element is the direct parent reservation group. For example, if a reservation is under group-1 -> group-2 -> group-3, then the reservation group path is \["group-1", "group-2", "group-3"\]. |
| `scalingMode` | string enum | Optional. The scaling mode for the reservation. If the field is present but max_slots is not present, requests will be rejected with error code `google.rpc.Code.INVALID_ARGUMENT`. Values: `SCALING_MODE_UNSPECIFIED`, `AUTOSCALE_ONLY`, `IDLE_SLOTS_ONLY`, `ALL_SLOTS`. |
| `schedulingPolicy` | SchedulingPolicy | Optional. The scheduling policy to use for jobs and queries running under this reservation. The scheduling policy controls how the reservation's resources are distributed. This feature is not yet generally available. |
| `secondaryLocation` | string | Optional. The current location of the reservation's secondary replica. This field is only set for reservations using the managed disaster recovery feature. Users can set this in create reservation calls to create a failover reservation or in update reservation calls to convert a non-failover reservation to a failover reservation(or vice versa). |
| `slotCapacity` | string (int64) | Optional. Baseline slots available to this reservation. A slot is a unit of computational power in BigQuery, and serves as the unit of parallelism. Queries using this reservation might use more slots during runtime if ignore_idle_slots is set to false, or autoscaling is enabled. The total slot_capacity of the reservation and its siblings may exceed the total slot_count of capacity commitments. In that case, the exceeding slots will be charged with the autoscale SKU. You can increase the number of baseline slots in a reservation every few minutes. If you want to decrease your baseline slots, you are limited to once an hour if you have recently changed your baseline slot capacity and your baseline slots exceed your committed slots. Otherwise, you can decrease your baseline slots every few minutes. |
| `updateTime` | string (google-datetime) | Output only. Last update time of the reservation. |

### `ReservationGroup` fields

| Field | Type | Description |
|---|---|---|
| `creationTime` | string (google-datetime) | Output only. Creation time of the reservation group. |
| `name` | string | Identifier. The resource name of the reservation group, e.g., `projects/*/locations/*/reservationGroups/team1-prod`. The reservation_group_id must only contain lower case alphanumeric characters or dashes. It must start with a letter and must not end with a dash. Its maximum length is 64 characters. |
| `parentGroup` | string | Optional. The parent reservation group of the reservation group. Format: `projects/*/locations/*/reservationGroups/team1-prod` for non-root reservation groups, or `projects/*/locations/*` for root reservation groups. |
| `updateTime` | string (google-datetime) | Output only. Last update time of the reservation group via a user operation. This timestamp is updated only when an update operation explicitly targets this reservation group directly. It is not updated when parent or child groups are created, updated, or deleted. |

### `SchedulingPolicy` fields

| Field | Type | Description |
|---|---|---|
| `concurrency` | string (int64) | Optional. If present and > 0, the reservation will attempt to limit the concurrency of jobs running for any particular project within it to the given value. This feature is not yet generally available. |
| `maxSlots` | string (int64) | Optional. If present and > 0, the reservation will attempt to limit the slot consumption of queries running for any particular project within it to the given value. This feature is not yet generally available. |

### `SearchAllAssignmentsResponse` fields

| Field | Type | Description |
|---|---|---|
| `assignments` | `array<Assignment>` | List of assignments visible to the user. |
| `nextPageToken` | string | Token to retrieve the next page of results, or empty if there are no more results in the list. |

### `SearchAssignmentsResponse` fields

| Field | Type | Description |
|---|---|---|
| `assignments` | `array<Assignment>` | List of assignments visible to the user. |
| `nextPageToken` | string | Token to retrieve the next page of results, or empty if there are no more results in the list. |

### `SetIamPolicyRequest` fields

| Field | Type | Description |
|---|---|---|
| `policy` | Policy | REQUIRED: The complete policy to be applied to the `resource`. The size of the policy is limited to a few 10s of KB. An empty policy is a valid policy but certain Google Cloud services (such as Projects) might reject them. |
| `updateMask` | string (google-fieldmask) | OPTIONAL: A FieldMask specifying which fields of the policy to modify. Only the fields in the mask will be modified. If no mask is provided, the following default mask is used: `paths: "bindings, etag"` |

### `SplitCapacityCommitmentRequest` fields

| Field | Type | Description |
|---|---|---|
| `slotCount` | string (int64) | Number of slots in the capacity commitment after the split. |

### `SplitCapacityCommitmentResponse` fields

| Field | Type | Description |
|---|---|---|
| `first` | CapacityCommitment | First capacity commitment, result of a split. |
| `second` | CapacityCommitment | Second capacity commitment, result of a split. |

### `Status` fields

| Field | Type | Description |
|---|---|---|
| `code` | integer (int32) | The status code, which should be an enum value of google.rpc.Code. |
| `details` | `array<map<string, any>>` | A list of messages that carry the error details. There is a common set of message types for APIs to use. |
| `message` | string | A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. |

### `TableReference` fields

| Field | Type | Description |
|---|---|---|
| `datasetId` | string | Optional. The ID of the dataset in the above project. |
| `projectId` | string | Optional. The assigned project ID of the project. |
| `tableId` | string | Optional. The ID of the table in the above dataset. |

### `TestIamPermissionsRequest` fields

| Field | Type | Description |
|---|---|---|
| `permissions` | `array<string>` | The set of permissions to check for the `resource`. Permissions with wildcards (such as `*` or `storage.*`) are not allowed. For more information see IAM Overview (https://cloud.google.com/iam/docs/overview#permissions). |

### `TestIamPermissionsResponse` fields

| Field | Type | Description |
|---|---|---|
| `permissions` | `array<string>` | A subset of `TestIamPermissionsRequest.permissions` that the caller is allowed (request type name corrected; see Notes). |

### `UpgradeEditionRequest` fields

| Field | Type | Description |
|---|---|---|
| `capacityCommitments` | `array<string>` | Optional. The resource names of the capacity commitments to upgrade, in the format `projects/{project}/locations/{location}/capacityCommitments/{capacity_commitment}`. For example, `projects/myproject/locations/us-west1/capacityCommitments/123`. These capacity commitments must be in the `ACTIVE` state and must exist under the specified `parent`. The `commitment_start_time` and `commitment_end_time` fields don't change after the upgrade. |
| `reservations` | `array<string>` | Optional. The resource names of the reservations to upgrade, in the format `projects/{project}/locations/{location}/reservations/{reservation}`. For example, `projects/myproject/locations/us-west1/reservations/team1-prod`. These reservations must exist under the specified `parent`. |
| `targetEdition` | string enum | The edition to upgrade the capacity commitments and reservations to. Supported values are `ENTERPRISE` and `ENTERPRISE_PLUS`. Values: `EDITION_UNSPECIFIED`, `STANDARD`, `ENTERPRISE`, `ENTERPRISE_PLUS`. |

### `UpgradeEditionResponse` fields

| Field | Type | Description |
|---|---|---|
| `capacityCommitments` | `array<CapacityCommitment>` | The updated capacity commitments after the upgrade. |
| `reservations` | `array<Reservation>` | The updated reservations after the upgrade. |

## Notes

- Generated from the Discovery document(s) v1 of `bigqueryreservation` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Adapted from the Discovery document: the `AuditConfig` description embeds an "Example Policy with multiple AuditConfigs" in one line with the proto field names (`audit_configs`, `audit_log_configs`, `log_type`, `exempted_members`); this page shows it as a JSON block of a `Policy` with the REST JSON (camelCase) field names; the values are unchanged.
- Corrected from the Discovery document: the JSON example in the `Policy` description (the `google.iam.v1` text shared by the IAM methods) has a trailing comma after the `condition.expression` value (`"expression": "request.time < timestamp('2020-10-01T00:00:00.000Z')", } }`), which is not valid JSON; the same comma is in the proto comment. This page shows the example as a JSON block without that comma. The Discovery text of the YAML example has lost its line breaks and indentation, so the YAML block is taken from the proto comment (`google/iam/v1/policy.proto`, https://github.com/googleapis/googleapis/blob/5ce024537af135bb2a0d3228072dd660047956aa/google/iam/v1/policy.proto, commit `5ce0245`, retrieved 2026-11-21).
- Corrected from the Discovery document: the `AuditLogConfig` description gives the example `{ "audit_log_configs": [ { "log_type": "DATA_READ", "exempted_members": [ "user:jose@example.com" ] }, { "log_type": "DATA_WRITE" } ] }`, which is the `auditLogConfigs` array of the parent `AuditConfig` written with proto field names, not an `AuditLogConfig` value; the table shows the two array elements as `AuditLogConfig` values with the REST JSON (camelCase) field names `logType` and `exemptedMembers` (a whole `AuditConfig` with the same values in REST JSON: `{ "service": "allServices", "auditLogConfigs": [ { "logType": "DATA_READ", "exemptedMembers": [ "user:jose@example.com" ] }, { "logType": "DATA_WRITE" } ] }`).
- Corrected from the Discovery document: the `TestIamPermissionsResponse.permissions` description reads "A subset of `TestPermissionsRequest.permissions` that the caller is allowed."; the same text is in the `google.iam.v1` proto, where the request message of `TestIamPermissions` is `TestIamPermissionsRequest` (`google/iam/v1/iam_policy.proto`, https://github.com/googleapis/googleapis/blob/5ce024537af135bb2a0d3228072dd660047956aa/google/iam/v1/iam_policy.proto, commit `5ce0245`, retrieved 2026-11-21).
- Deprecated: `Assignment.enableGeminiInBigquery` (`deprecated: true` in the Discovery document and its description). Replacement or status stated in the description: "Deprecated: "Gemini in BigQuery" is now available by default for all BigQuery editions and should not be explicitly set."
- Deprecated: `CapacityCommitment.multiRegionAuxiliary` (`deprecated: true` in the Discovery document). The Discovery document states no replacement.
- Deprecated: `Reservation.multiRegionAuxiliary` (`deprecated: true` in the Discovery document). The Discovery document states no replacement.
- Source: https://bigqueryreservation.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
