---
source:
  - https://bigqueryconnection.googleapis.com/$discovery/rest?version=v1
  - https://bigqueryconnection.googleapis.com/$discovery/rest?version=v1beta1
---

# BigQuery Connection API message schemas (bigqueryconnection)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/bigqueryconnection/`.

### `AuditConfig`

- Specifies the audit configuration for a service. The configuration determines which permission types are logged, and what identities, if any, are exempted from logging. An AuditConfig must have one or more AuditLogConfigs. If there are AuditConfigs for both `allServices` and a specific service, the union of the two AuditConfigs is used for that service: the log_types specified in each AuditConfig are enabled, and the exempted_members in each AuditLogConfig are exempted. Example Policy with multiple AuditConfigs: { "audit_configs": \[ { "service": "allServices", "audit_log_configs": \[ { "log_type": "DATA_READ", "exempted_members": \[ "user:jose@example.com" \] }, { "log_type": "DATA_WRITE" }, { "log_type": "ADMIN_READ" } \] }, { "service": "sampleservice.googleapis.com", "audit_log_configs": \[ { "log_type": "DATA_READ" }, { "log_type": "DATA_WRITE", "exempted_members": \[ "user:aliya@example.com" \] } \] } \] } For sampleservice, this policy enables DATA_READ, DATA_WRITE and ADMIN_READ logging. It also exempts `jose@example.com` from DATA_READ logging, and `aliya@example.com` from DATA_WRITE logging.
- Version: v1

### `AuditLogConfig`

- Provides the configuration for logging a type of permissions. Example (two `AuditLogConfig` values, the elements of `auditLogConfigs` in an `AuditConfig`, with REST JSON field names; example corrected, see Notes): `{ "logType": "DATA_READ", "exemptedMembers": [ "user:jose@example.com" ] }` and `{ "logType": "DATA_WRITE" }`. This enables 'DATA_READ' and 'DATA_WRITE' logging, while exempting jose@example.com from DATA_READ logging.
- Version: v1

### `AwsAccessRole`

- Authentication method for Amazon Web Services (AWS) that uses Google owned Google service account to assume into customer's AWS IAM Role.
- Version: v1

### `AwsProperties`

- Connection properties specific to Amazon Web Services (AWS).
- Version: v1

### `AzureProperties`

- Container for connection properties specific to Azure.
- Version: v1

### `Binding`

- Associates `members`, or principals, with a `role`.
- Version: v1

### `CloudResourceProperties`

- Container for connection properties for delegation of access to GCP resources.
- Version: v1

### `CloudSpannerProperties`

- Connection properties specific to Cloud Spanner.
- Version: v1

### `CloudSqlCredential`

- Credential info for the Cloud SQL.
- Version: v1

### `CloudSqlProperties`

- Connection properties specific to the Cloud SQL.
- Version: v1

### `Connection`

- Configuration parameters to establish connection with an external data source, except the credential attributes.
- Version: v1

### `Connection` (v1beta1)

- Configuration parameters to establish connection with an external data source, except the credential attributes.
- Version: v1beta1

### `ConnectionCredential`

- Credential to use with a connection.
- Version: v1beta1

### `ConnectorConfiguration`

- Represents concrete parameter values for Connector Configuration.
- Version: v1

### `ConnectorConfigurationAsset`

- Data Asset - a resource within instance of the system, reachable under specified endpoint. For example a database name in a SQL DB.
- Version: v1

### `ConnectorConfigurationAuthentication`

- Client authentication.
- Version: v1

### `ConnectorConfigurationEndpoint`

- Remote endpoint specification.
- Version: v1

### `ConnectorConfigurationNetwork`

- Network related configuration.
- Version: v1

### `ConnectorConfigurationParameterValue`

- Represents a value for a connector parameter.
- Version: v1

### `ConnectorConfigurationPrivateServiceConnect`

- Private Service Connect configuration.
- Version: v1

### `ConnectorConfigurationSecret`

- Secret value parameter.
- Version: v1

### `ConnectorConfigurationTls`

- TLS configuration options.
- Version: v1

### `ConnectorConfigurationTlsPrivatePki`

- Private PKI.
- Version: v1

### `ConnectorConfigurationTlsWebPki`

- Web PKI.
- Version: v1

### `ConnectorConfigurationUsernamePassword`

- Username and Password authentication.
- Version: v1

### `CrossCloudCacheOptions`

- Options for caching cross-cloud data and metadata files.
- Version: v1

### `Empty`

- A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
- Version: v1

### `Expr`

- Represents a textual expression in the Common Expression Language (CEL) syntax. CEL is a C-like expression language. The syntax and semantics of CEL are documented at https://github.com/google/cel-spec. Example (Comparison): title: "Summary size limit" description: "Determines if a summary is less than 100 chars" expression: "document.summary.size() < 100" Example (Equality): title: "Requestor is owner" description: "Determines if requestor is the document owner" expression: "document.owner == request.auth.claims.email" Example (Logic): title: "Public documents" description: "Determine whether the document should be publicly visible" expression: "document.type != 'private' && document.type != 'internal'" Example (Data Manipulation): title: "Notification string" description: "Create a notification string with a timestamp." expression: "'New message received at ' + string(document.create_time)" The exact variables and functions that may be referenced within an expression are determined by the service that evaluates it. See the service documentation for additional information.
- Version: v1

### `GetIamPolicyRequest`

- Request message for `GetIamPolicy` method.
- Version: v1

### `GetPolicyOptions`

- Encapsulates settings provided to GetIamPolicy.
- Version: v1

### `ListConnectionsResponse`

- The response for ConnectionService.ListConnections.
- Version: v1

### `MetastoreServiceConfig`

- Configuration of the Dataproc Metastore Service.
- Version: v1

### `Policy`

- An Identity and Access Management (IAM) policy, which specifies access controls for Google Cloud resources. A `Policy` is a collection of `bindings`. A `binding` binds one or more `members`, or principals, to a single `role`. Principals can be user accounts, service accounts, Google groups, and domains (such as G Suite). A `role` is a named list of permissions; each `role` can be an IAM predefined role or a user-created custom role. For some types of Google Cloud resources, a `binding` can also specify a `condition`, which is a logical expression that allows access to a resource only if the expression evaluates to `true`. A condition can add constraints based on attributes of the request, the resource, or both. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). The JSON and YAML examples of this description are shown below. For a description of IAM and its features, see the IAM documentation (https://cloud.google.com/iam/docs/).
- Version: v1

JSON example from the Discovery description (as a JSON block; the trailing comma after the `condition.expression` value is removed; see Notes):

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

### `SalesforceDataCloudProperties`

- Connection properties specific to Salesforce DataCloud. This is intended for use only by Salesforce partner projects.
- Version: v1

### `SetIamPolicyRequest`

- Request message for `SetIamPolicy` method.
- Version: v1

### `SparkHistoryServerConfig`

- Configuration of the Spark History Server.
- Version: v1

### `SparkProperties`

- Container for connection properties to execute stored procedures for Apache Spark.
- Version: v1

### `TestIamPermissionsRequest`

- Request message for `TestIamPermissions` method.
- Version: v1

### `TestIamPermissionsResponse`

- Response message for `TestIamPermissions` method.
- Version: v1

### Shape of `AuditConfig`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "auditLogConfigs": "array<AuditLogConfig>",
  "service": "string"
}
```

### Example `AuditConfig` value

A JSON value that matches the table (not a request to send as is). The values are taken from the example in the `AuditConfig` description ("An AuditConfig must have one or more AuditLogConfigs"), with the REST JSON (camelCase) field names; the description writes the proto names `audit_log_configs`, `log_type` and `exempted_members`.

```json
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
    }
  ]
}
```

## Options / Props

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

### `AwsAccessRole` fields

| Field | Type | Description |
|---|---|---|
| `iamRoleId` | string | The user’s AWS IAM Role that trusts the Google-owned AWS IAM user Connection. |
| `identity` | string | A unique Google-owned and Google-generated identity for the Connection. This identity will be used to access the user's AWS IAM Role. |

### `AwsProperties` fields

| Field | Type | Description |
|---|---|---|
| `accessRole` | AwsAccessRole | Authentication using Google owned service account to assume into customer's AWS IAM Role. |
| `crossCloudCacheOptions` | CrossCloudCacheOptions | Optional. Configuration options for cross-cloud caching of data and metadata files. |

### `AzureProperties` fields

| Field | Type | Description |
|---|---|---|
| `application` | string | Output only. The name of the Azure Active Directory Application. |
| `clientId` | string | Output only. The client id of the Azure Active Directory Application. |
| `crossCloudCacheOptions` | CrossCloudCacheOptions | Optional. Configuration options for cross-cloud caching of data and metadata files. |
| `customerTenantId` | string | The id of customer's directory that host the data. |
| `federatedApplicationClientId` | string | The client ID of the user's Azure Active Directory Application used for a federated connection. |
| `identity` | string | Output only. A unique Google-owned and Google-generated identity for the Connection. This identity will be used to access the user's Azure Active Directory Application. |
| `objectId` | string | Output only. The object id of the Azure Active Directory Application. |
| `redirectUri` | string | The URL user will be redirected to after granting consent during connection setup. |

### `Binding` fields

| Field | Type | Description |
|---|---|---|
| `condition` | Expr | The condition that is associated with this binding. If the condition evaluates to `true`, then this binding applies to the current request. If the condition evaluates to `false`, then this binding does not apply to the current request. However, a different role binding might grant the same role to one or more of the principals in this binding. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |
| `members` | `array<string>` | Specifies the principals requesting access for a Google Cloud resource. `members` can have the following values: \* `allUsers`: A special identifier that represents anyone who is on the internet; with or without a Google account. \* `allAuthenticatedUsers`: A special identifier that represents anyone who is authenticated with a Google account or a service account. Does not include identities that come from external identity providers (IdPs) through identity federation. \* `user:{emailid}`: An email address that represents a specific Google account. For example, `alice@example.com` . \* `serviceAccount:{emailid}`: An email address that represents a Google service account. For example, `my-other-app@appspot.gserviceaccount.com`. \* `serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]`: An identifier for a Kubernetes service account (https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts). For example, `my-project.svc.id.goog[my-namespace/my-kubernetes-sa]`. \* `group:{emailid}`: An email address that represents a Google group. For example, `admins@example.com`. \* `domain:{domain}`: The G Suite domain (primary) that represents all the users of that domain. For example, `google.com` or `example.com`. \* `principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workforce identity pool. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/group/{group_id}`: All workforce identities in a group. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All workforce identities with a specific attribute value. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/*`: All identities in a workforce identity pool. \* `principal://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workload identity pool. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/group/{group_id}`: A workload identity pool group. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All identities in a workload identity pool with a certain attribute. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/*`: All identities in a workload identity pool. \* `deleted:user:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a user that has been recently deleted. For example, `alice@example.com?uid=123456789012345678901`. If the user is recovered, this value reverts to `user:{emailid}` and the recovered user retains the role in the binding. \* `deleted:serviceAccount:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a service account that has been recently deleted. For example, `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901`. If the service account is undeleted, this value reverts to `serviceAccount:{emailid}` and the undeleted service account retains the role in the binding. \* `deleted:group:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a Google group that has been recently deleted. For example, `admins@example.com?uid=123456789012345678901`. If the group is recovered, this value reverts to `group:{emailid}` and the recovered group retains the role in the binding. \* `deleted:principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: Deleted single identity in a workforce identity pool. For example, `deleted:principal://iam.googleapis.com/locations/global/workforcePools/my-pool-id/subject/my-subject-attribute-value`. |
| `role` | string | Role that is assigned to the list of `members`, or principals. For example, `roles/viewer`, `roles/editor`, or `roles/owner`. For an overview of the IAM roles and permissions, see the IAM documentation (https://cloud.google.com/iam/docs/roles-overview). For a list of the available pre-defined roles, see here (https://cloud.google.com/iam/docs/understanding-roles). |

### `CloudResourceProperties` fields

| Field | Type | Description |
|---|---|---|
| `serviceAccountId` | string | Output only. The account ID of the service created for the purpose of this connection. The service account does not have any permissions associated with it when it is created. After creation, customers delegate permissions to the service account. When the connection is used in the context of an operation in BigQuery, the service account will be used to connect to the desired resources in GCP. The account ID is in the form of: `<service-1234>@gcp-sa-bigquery-cloudresource.iam.gserviceaccount.com` (placeholders restored from the source proto; see Notes) |

### `CloudSpannerProperties` fields

| Field | Type | Description |
|---|---|---|
| `database` | string | Cloud Spanner database in the form \`project/instance/database' |
| `databaseRole` | string | Optional. Cloud Spanner database role for fine-grained access control. The Cloud Spanner admin should have provisioned the database role with appropriate permissions, such as `SELECT` and `INSERT`. Other users should only use roles provided by their Cloud Spanner admins. For more details, see About fine-grained access control (https://cloud.google.com/spanner/docs/fgac-about). REQUIRES: The database role name must start with a letter, and can only contain letters, numbers, and underscores. |
| `maxParallelism` | integer (int32) | Allows setting max parallelism per query when executing on Spanner independent compute resources. If unspecified, default values of parallelism are chosen that are dependent on the Cloud Spanner instance configuration. REQUIRES: `use_parallelism` must be set. REQUIRES: `use_data_boost` must be set. |
| `useDataBoost` | boolean | If set, the request will be executed via Spanner independent compute resources. REQUIRES: `use_parallelism` must be set. |
| `useParallelism` | boolean | If parallelism should be used when reading from Cloud Spanner |
| `useServerlessAnalytics` | boolean | Deprecated: prefer use_data_boost instead. If the serverless analytics service should be used to read data from Cloud Spanner. Note: `use_parallelism` must be set when using serverless analytics. REST JSON field name: `useDataBoost` (`use_data_boost` in the description), `useParallelism` (`use_parallelism` in the description). |

### `CloudSqlCredential` fields

| Field | Type | Description |
|---|---|---|
| `password` | string | The password for the credential. |
| `username` | string | The username for the credential. |

### `CloudSqlProperties` fields

| Field | Type | Description |
|---|---|---|
| `credential` | CloudSqlCredential | Input only. Cloud SQL credential. |
| `database` | string | Database name. |
| `instanceId` | string | Cloud SQL instance ID in the form `project:location:instance`. |
| `serviceAccountId` | string | Output only. The account ID of the service used for the purpose of this connection. When the connection is used in the context of an operation in BigQuery, this service account will serve as the identity being used for connecting to the CloudSQL instance specified in this connection. |
| `type` | string enum | Type of the Cloud SQL database. Values: `DATABASE_TYPE_UNSPECIFIED`, `POSTGRES`, `MYSQL`. |

### `Connection` fields

| Field | Type | Description |
|---|---|---|
| `aws` | AwsProperties | Amazon Web Services (AWS) properties. Mutually exclusive with `cloudSql`, `azure`, `cloudSpanner`, `cloudResource`, `spark`, `salesforceDataCloud` (proto `oneof properties`; set at most one; see Notes). |
| `azure` | AzureProperties | Azure properties. Mutually exclusive with `cloudSql`, `aws`, `cloudSpanner`, `cloudResource`, `spark`, `salesforceDataCloud` (proto `oneof properties`; set at most one; see Notes). |
| `cloudResource` | CloudResourceProperties | Cloud Resource properties. Mutually exclusive with `cloudSql`, `aws`, `azure`, `cloudSpanner`, `spark`, `salesforceDataCloud` (proto `oneof properties`; set at most one; see Notes). |
| `cloudSpanner` | CloudSpannerProperties | Cloud Spanner properties. Mutually exclusive with `cloudSql`, `aws`, `azure`, `cloudResource`, `spark`, `salesforceDataCloud` (proto `oneof properties`; set at most one; see Notes). |
| `cloudSql` | CloudSqlProperties | Cloud SQL properties. Mutually exclusive with `aws`, `azure`, `cloudSpanner`, `cloudResource`, `spark`, `salesforceDataCloud` (proto `oneof properties`; set at most one; see Notes). |
| `configuration` | ConnectorConfiguration | Optional. Connector configuration. |
| `creationTime` | string (int64) | Output only. The creation timestamp of the connection. |
| `description` | string | User provided description. |
| `friendlyName` | string | User provided display name for the connection. |
| `hasCredential` | boolean | Output only. True, if credential is configured for this connection. |
| `kmsKeyName` | string | Optional. The Cloud KMS key that is used for credentials encryption. If omitted, internal Google owned encryption keys are used. Example: `projects/[kms_project_id]/locations/[region]/keyRings/[key_region]/cryptoKeys/[key]` |
| `lastModifiedTime` | string (int64) | Output only. The last update timestamp of the connection. |
| `name` | string | Output only. The resource name of the connection in the form of: `projects/{project_id}/locations/{location_id}/connections/{connection_id}` |
| `salesforceDataCloud` | SalesforceDataCloudProperties | Optional. Salesforce DataCloud properties. This field is intended for use only by Salesforce partner projects. This field contains properties for your Salesforce DataCloud connection. Mutually exclusive with `cloudSql`, `aws`, `azure`, `cloudSpanner`, `cloudResource`, `spark` (proto `oneof properties`; set at most one; see Notes). |
| `spark` | SparkProperties | Spark properties. Mutually exclusive with `cloudSql`, `aws`, `azure`, `cloudSpanner`, `cloudResource`, `salesforceDataCloud` (proto `oneof properties`; set at most one; see Notes). |

### `Connection` (v1beta1) fields

| Field | Type | Description |
|---|---|---|
| `cloudSql` | CloudSqlProperties | Cloud SQL properties. |
| `creationTime` | string (int64) | Output only. The creation timestamp of the connection. |
| `description` | string | User provided description. |
| `friendlyName` | string | User provided display name for the connection. |
| `hasCredential` | boolean | Output only. True, if credential is configured for this connection. |
| `lastModifiedTime` | string (int64) | Output only. The last update timestamp of the connection. |
| `name` | string | The resource name of the connection in the form of: `projects/{project_id}/locations/{location_id}/connections/{connection_id}` |

### `ConnectionCredential` fields

| Field | Type | Description |
|---|---|---|
| `cloudSql` | CloudSqlCredential | Credential for Cloud SQL database. |

### `ConnectorConfiguration` fields

| Field | Type | Description |
|---|---|---|
| `asset` | ConnectorConfigurationAsset | Data asset. |
| `authentication` | ConnectorConfigurationAuthentication | Client authentication. |
| `connectorId` | string | Required. Immutable. The ID of the Connector these parameters are configured for. |
| `endpoint` | ConnectorConfigurationEndpoint | Specifies how to reach the remote system this connection is pointing to. |
| `network` | ConnectorConfigurationNetwork | Networking configuration. |
| `parameters` | `map<string, ConnectorConfigurationParameterValue>` | Optional. A map of name-value pairs for connector-specific parameters. These extra configuration parameters aren't standardized in the configuration sections. To update a single parameter value, call ConnectionService.UpdateConnection with `update_mask` set to `configuration.parameters.parameter_id`. If ``parameter_id`` doesn't fit the `[a-zA-Z0-9_]+` pattern, ``parameter_id`` should be escaped with backticks—for example, ``configuration.parameters.`parameter id` ``. |
| `tls` | ConnectorConfigurationTls | Optional. TLS configuration options. |

### `ConnectorConfigurationAsset` fields

| Field | Type | Description |
|---|---|---|
| `database` | string | Name of the database. |
| `googleCloudResource` | string | Full Google Cloud resource name - https://cloud.google.com/apis/design/resource_names#full_resource_name. Example: `//library.googleapis.com/shelves/shelf1/books/book2` |

### `ConnectorConfigurationAuthentication` fields

| Field | Type | Description |
|---|---|---|
| `parameters` | `map<string, ConnectorConfigurationParameterValue>` | Optional. A map of name-value pairs for connector-specific parameters. These extra configuration parameters aren't standardized in the configuration sections. (The update-mask instructions of the Discovery text, which name the `parameters` map of `ConnectorConfiguration`, are left out; see Notes.) |
| `serviceAccount` | string | Output only. Google-managed service account associated with this connection, e.g., `service-{project_number}@gcp-sa-bigqueryconnection.iam.gserviceaccount.com`. BigQuery jobs using this connection will act as `service_account` identity while connecting to the datasource. |
| `usernamePassword` | ConnectorConfigurationUsernamePassword | Username/password authentication. |

### `ConnectorConfigurationEndpoint` fields

| Field | Type | Description |
|---|---|---|
| `hostPort` | string | Host and port in a format of `hostname:port` as defined in https://www.ietf.org/rfc/rfc3986.html#section-3.2.2 and https://www.ietf.org/rfc/rfc3986.html#section-3.2.3. |

### `ConnectorConfigurationNetwork` fields

| Field | Type | Description |
|---|---|---|
| `privateServiceConnect` | ConnectorConfigurationPrivateServiceConnect | Private Service Connect networking configuration. |

### `ConnectorConfigurationParameterValue` fields

| Field | Type | Description |
|---|---|---|
| `boolValue` | boolean | A boolean parameter value. |
| `doubleValue` | number (double) | A double parameter value. |
| `int32Value` | integer (int32) | An int32 parameter value. |
| `secretValue` | ConnectorConfigurationSecret | A secret parameter value. Allowed only for Authentication parameters. |
| `stringValue` | string | A string parameter value. |

### `ConnectorConfigurationPrivateServiceConnect` fields

| Field | Type | Description |
|---|---|---|
| `networkAttachment` | string | Required. Network Attachment name in the format of `projects/{project}/regions/{region}/networkAttachments/{networkattachment}`. |

### `ConnectorConfigurationSecret` fields

| Field | Type | Description |
|---|---|---|
| `plaintext` | string | Input only. Secret as plaintext. |
| `secretType` | string enum | Output only. Indicates type of secret. Can be used to check type of stored secret value even if it's `INPUT_ONLY`. Values: `SECRET_TYPE_UNSPECIFIED`, `PLAINTEXT`. |

### `ConnectorConfigurationTls` fields

| Field | Type | Description |
|---|---|---|
| `mode` | string enum | Optional. The mode of TLS configuration. Values: `MODE_UNSPECIFIED`, `DISABLE`, `ENCRYPT_VERIFY_NONE`, `ENCRYPT_VERIFY_CA`, `ENCRYPT_VERIFY_CA_AND_HOST`. |
| `privatePki` | ConnectorConfigurationTlsPrivatePki | Optional. Private PKI. |
| `webPki` | ConnectorConfigurationTlsWebPki | Optional. Web PKI. |

### `ConnectorConfigurationTlsPrivatePki` fields

| Field | Type | Description |
|---|---|---|
| `trustedCertificatesPem` | string | Optional. a PEM-encoded list of certificates to trust |

### `ConnectorConfigurationUsernamePassword` fields

| Field | Type | Description |
|---|---|---|
| `password` | ConnectorConfigurationSecret | Required. Password. |
| `username` | string | Required. Username. |

### `CrossCloudCacheOptions` fields

| Field | Type | Description |
|---|---|---|
| `enabled` | boolean | Optional. Whether cross-cloud caching is enabled. This only affects queries through BigQuery. If this value is `true`, read data and metadata are stored in a cache, which can increase performance and decrease network egress costs for cross-cloud queries. If this value is `false`, cross-cloud caching is disabled. |

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

### `ListConnectionsResponse` fields

| Field | Type | Description |
|---|---|---|
| `connections` | `array<Connection>` (definitions by version: [`Connection` (v1)](#connection), [`Connection` (v1beta1)](#connection-v1beta1)) | List of connections. |
| `nextPageToken` | string | Next page token. |

### `MetastoreServiceConfig` fields

| Field | Type | Description |
|---|---|---|
| `metastoreService` | string | Optional. Resource name of an existing Dataproc Metastore service. Example: \* `projects/[project_id]/locations/[region]/services/[service_id]` |

### `Policy` fields

| Field | Type | Description |
|---|---|---|
| `auditConfigs` | `array<AuditConfig>` | Specifies cloud audit logging configuration for this policy. |
| `bindings` | `array<Binding>` | Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal. The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`. |
| `etag` | string (byte) | `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy. \*\*Important:\*\* If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. |
| `version` | integer (int32) | Specifies the format of the policy. Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected. Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations: \* Getting a policy that includes a conditional role binding \* Adding a conditional role binding to a policy \* Changing a conditional role binding in a policy \* Removing any role binding, with or without a condition, from a policy that includes conditions \*\*Important:\*\* If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `SalesforceDataCloudProperties` fields

| Field | Type | Description |
|---|---|---|
| `crossCloudCacheOptions` | CrossCloudCacheOptions | Optional. Configuration options for cross-cloud caching of data and metadata files. |
| `identity` | string | Output only. A unique Google-owned and Google-generated service account identity for the connection. |
| `instanceUri` | string | The URL to the user's Salesforce DataCloud instance. |
| `tenantId` | string | The ID of the user's Salesforce tenant. |

### `SetIamPolicyRequest` fields

| Field | Type | Description |
|---|---|---|
| `policy` | Policy | REQUIRED: The complete policy to be applied to the `resource`. The size of the policy is limited to a few 10s of KB. An empty policy is a valid policy but certain Google Cloud services (such as Projects) might reject them. |
| `updateMask` | string (google-fieldmask) | OPTIONAL: A FieldMask specifying which fields of the policy to modify. Only the fields in the mask will be modified. If no mask is provided, the following default mask is used: `paths: "bindings, etag"` |

### `SparkHistoryServerConfig` fields

| Field | Type | Description |
|---|---|---|
| `dataprocCluster` | string | Optional. Resource name of an existing Dataproc Cluster to act as a Spark History Server for the connection. Example: \* `projects/[project_id]/regions/[region]/clusters/[cluster_name]` |

### `SparkProperties` fields

| Field | Type | Description |
|---|---|---|
| `metastoreServiceConfig` | MetastoreServiceConfig | Optional. Dataproc Metastore Service configuration for the connection. |
| `serviceAccountId` | string | Output only. The account ID of the service created for the purpose of this connection. The service account does not have any permissions associated with it when it is created. After creation, customers delegate permissions to the service account. When the connection is used in the context of a stored procedure for Apache Spark in BigQuery, the service account is used to connect to the desired resources in Google Cloud. The account ID is in the form of: `bqcx-<projectnumber>-<uniqueid>@gcp-sa-bigquery-consp.iam.gserviceaccount.com` (placeholders restored from the source proto; see Notes) |
| `sparkHistoryServerConfig` | SparkHistoryServerConfig | Optional. Spark History Server configuration for the connection. |

### `TestIamPermissionsRequest` fields

| Field | Type | Description |
|---|---|---|
| `permissions` | `array<string>` | The set of permissions to check for the `resource`. Permissions with wildcards (such as `*` or `storage.*`) are not allowed. For more information see IAM Overview (https://cloud.google.com/iam/docs/overview#permissions). |

### `TestIamPermissionsResponse` fields

| Field | Type | Description |
|---|---|---|
| `permissions` | `array<string>` | A subset of `TestIamPermissionsRequest.permissions` that the caller is allowed (request type name corrected; see Notes). |

## Notes

- Generated from the Discovery document(s) v1, v1beta1 of `bigqueryconnection` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Shortened from the Discovery document: the `parameters` description of `ConnectorConfigurationAuthentication` repeats the text of `ConnectorConfiguration.parameters`, including "To update a single parameter value, call ConnectionService.UpdateConnection with `update_mask` set to `configuration.parameters.parameter_id`." and the backtick-escaping example `configuration.parameters.`parameter id``. That path names the `parameters` map directly under `configuration` (`ConnectorConfiguration.parameters`), not the map under `configuration.authentication`. Neither the Discovery document nor the googleapis protos (`google/cloud/bigquery/connection/v1/connection.proto` at commit `5ce0245` has no `ConnectorConfiguration` message) state whether a single key of the authentication map can be updated with an update mask, so the table gives only the field description; the instructions are kept on `ConnectorConfiguration.parameters`.
- Corrected from the Discovery document: the JSON example in the `Policy` description (the `google.iam.v1` text shared by the IAM methods) has a trailing comma after the `condition.expression` value (`"expression": "request.time < timestamp('2020-10-01T00:00:00.000Z')", } }`), which is not valid JSON; the same comma is in the proto comment. This page shows the example as a JSON block without that comma. The Discovery text of the YAML example has lost its line breaks and indentation, so the YAML block is taken from the proto comment (`google/iam/v1/policy.proto`, https://github.com/googleapis/googleapis/blob/5ce024537af135bb2a0d3228072dd660047956aa/google/iam/v1/policy.proto, commit `5ce0245`, retrieved 2026-11-21).
- Corrected from the source proto: the service account formats in the `serviceAccountId` descriptions of `CloudResourceProperties` (`@gcp-sa-bigquery-cloudresource.iam.gserviceaccount.com`) and `SparkProperties` (`bqcx--@gcp-sa-bigquery-consp.iam.gserviceaccount.com`) lost their placeholders in the Discovery document; the proto comments read "The account ID is in the form of: `<service-1234>@gcp-sa-bigquery-cloudresource.iam.gserviceaccount.com`" and "The account ID is in the form of: `bqcx-<projectnumber>-<uniqueid>@gcp-sa-bigquery-consp.iam.gserviceaccount.com`" (backticks added) (`google/cloud/bigquery/connection/v1/connection.proto`, https://github.com/googleapis/googleapis/blob/5ce024537af135bb2a0d3228072dd660047956aa/google/cloud/bigquery/connection/v1/connection.proto, commit `5ce0245`, retrieved 2026-11-19).
- Corrected from the Discovery document: the `AuditLogConfig` description gives the example `{ "audit_log_configs": [ { "log_type": "DATA_READ", "exempted_members": [ "user:jose@example.com" ] }, { "log_type": "DATA_WRITE" } ] }`, which is the `auditLogConfigs` array of the parent `AuditConfig` written with proto field names, not an `AuditLogConfig` value; the table shows the two array elements as `AuditLogConfig` values with the REST JSON (camelCase) field names `logType` and `exemptedMembers` (for a whole `AuditConfig`, see its example value).
- Corrected from the Discovery document: the `TestIamPermissionsResponse.permissions` description reads "A subset of `TestPermissionsRequest.permissions` that the caller is allowed."; the same text is in the `google.iam.v1` proto, where the request message of `TestIamPermissions` is `TestIamPermissionsRequest` (`google/iam/v1/iam_policy.proto`, https://github.com/googleapis/googleapis/blob/5ce024537af135bb2a0d3228072dd660047956aa/google/iam/v1/iam_policy.proto, commit `5ce0245`, retrieved 2026-11-21).
- Deprecated: `CloudSpannerProperties.useServerlessAnalytics` (`deprecated: true` in the Discovery document and its description). Replacement or status stated in the description: "Deprecated: prefer use_data_boost instead." REST JSON field name: `useDataBoost` (`use_data_boost` in the description), `useParallelism` (`use_parallelism` in the description).
- Mutually exclusive fields of `Connection`: `cloudSql`, `aws`, `azure`, `cloudSpanner`, `cloudResource`, `spark`, `salesforceDataCloud` are the members of `oneof properties` in the proto (`google/cloud/bigquery/connection/v1/connection.proto`, https://github.com/googleapis/googleapis/blob/5ce024537af135bb2a0d3228072dd660047956aa/google/cloud/bigquery/connection/v1/connection.proto, commit `5ce0245`), so a message sets at most one of them. The Discovery document has no notation for `oneof` and lists them as independent fields.
- Source: https://bigqueryconnection.googleapis.com/$discovery/rest?version=v1, https://bigqueryconnection.googleapis.com/$discovery/rest?version=v1beta1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
