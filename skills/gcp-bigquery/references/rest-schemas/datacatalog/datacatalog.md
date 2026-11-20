---
source:
  - https://datacatalog.googleapis.com/$discovery/rest?version=v1
  - https://datacatalog.googleapis.com/$discovery/rest?version=v1beta1
---

# Google Cloud Data Catalog API message schemas (datacatalog)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/datacatalog/`.

### `Binding`

- Associates `members`, or principals, with a `role`.
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

### `GoogleCloudDatacatalogV1BigQueryConnectionSpec`

- Specification for the BigQuery connection.
- Version: v1

### `GoogleCloudDatacatalogV1BigQueryDateShardedSpec`

- Specification for a group of BigQuery tables with the `[prefix]YYYYMMDD` name pattern. For more information, see Introduction to partitioned tables (https://cloud.google.com/bigquery/docs/partitioned-tables#partitioning_versus_sharding).
- Version: v1

### `GoogleCloudDatacatalogV1BigQueryRoutineSpec`

- Fields specific for BigQuery routines.
- Version: v1

### `GoogleCloudDatacatalogV1BigQueryTableSpec`

- Describes a BigQuery table.
- Version: v1

### `GoogleCloudDatacatalogV1BusinessContext`

- Business Context of the entry.
- Version: v1

### `GoogleCloudDatacatalogV1CloudBigtableInstanceSpec`

- Specification that applies to Instance entries that are part of `CLOUD_BIGTABLE` system. (user_specified_type)
- Version: v1

### `GoogleCloudDatacatalogV1CloudBigtableInstanceSpecCloudBigtableClusterSpec`

- Spec that applies to clusters of an Instance of Cloud Bigtable.
- Version: v1

### `GoogleCloudDatacatalogV1CloudBigtableSystemSpec`

- Specification that applies to all entries that are part of `CLOUD_BIGTABLE` system (user_specified_type)
- Version: v1

### `GoogleCloudDatacatalogV1CloudSqlBigQueryConnectionSpec`

- Specification for the BigQuery connection to a Cloud SQL instance.
- Version: v1

### `GoogleCloudDatacatalogV1ColumnSchema`

- A column within a schema. Columns can be nested inside other columns.
- Version: v1

### `GoogleCloudDatacatalogV1ColumnSchemaFieldElementType`

- Represents the type of a field element.
- Version: v1

### `GoogleCloudDatacatalogV1ColumnSchemaLookerColumnSpec`

- Column info specific to Looker System.
- Version: v1

### `GoogleCloudDatacatalogV1CommonUsageStats`

- Common statistics on the entry's usage. They can be set on any system.
- Version: v1

### `GoogleCloudDatacatalogV1Contacts`

- Contact people for the entry.
- Version: v1

### `GoogleCloudDatacatalogV1ContactsPerson`

- A contact person for the entry.
- Version: v1

### `GoogleCloudDatacatalogV1CrossRegionalSource`

- Cross-regional source used to import an existing taxonomy into a different region.
- Version: v1

### `GoogleCloudDatacatalogV1DataSource`

- Physical location of an entry.
- Version: v1

### `GoogleCloudDatacatalogV1DataSourceConnectionSpec`

- Specification that applies to a data source connection. Valid only for entries with the `DATA_SOURCE_CONNECTION` type. Only one of internal specs can be set at the time, and cannot be changed later.
- Version: v1

### `GoogleCloudDatacatalogV1DatabaseTableSpec`

- Specification that applies to a table resource. Valid only for entries with the `TABLE` type.
- Version: v1

### `GoogleCloudDatacatalogV1DatabaseTableSpecDatabaseViewSpec`

- Specification that applies to database view.
- Version: v1

### `GoogleCloudDatacatalogV1DataplexExternalTable`

- External table registered by Dataplex Universal Catalog. Dataplex Universal Catalog publishes data discovered from an asset into multiple other systems (BigQuery, DPMS) in form of tables. We call them "external tables". External tables are also synced into the Data Catalog. This message contains pointers to those external tables (fully qualified name, resource name et cetera) within the Data Catalog.
- Version: v1

### `GoogleCloudDatacatalogV1DataplexFilesetSpec`

- Entry specification for a Dataplex Universal Catalog fileset.
- Version: v1

### `GoogleCloudDatacatalogV1DataplexSpec`

- Common Dataplex Universal Catalog fields.
- Version: v1

### `GoogleCloudDatacatalogV1DataplexTableSpec`

- Entry specification for a Dataplex Universal Catalog table.
- Version: v1

### `GoogleCloudDatacatalogV1DatasetSpec`

- Specification that applies to a dataset. Valid only for entries with the `DATASET` type.
- Version: v1

### `GoogleCloudDatacatalogV1DumpItem`

- Wrapper for any item that can be contained in the dump.
- Version: v1

### `GoogleCloudDatacatalogV1Entry`

- Entry metadata. A Data Catalog entry represents another resource in Google Cloud Platform (such as a BigQuery dataset or a Pub/Sub topic) or outside of it. You can use the `linked_resource` field in the entry resource to refer to the original resource ID of the source system. An entry resource contains resource details, for example, its schema. Additionally, you can attach flexible metadata to an entry in the form of a Tag.
- Version: v1

### `GoogleCloudDatacatalogV1EntryOverview`

- Entry overview fields for rich text descriptions of entries.
- Version: v1

### `GoogleCloudDatacatalogV1ExportTaxonomiesResponse`

- Response message for ExportTaxonomies.
- Version: v1

### `GoogleCloudDatacatalogV1FeatureOnlineStoreSpec`

- Detail description of the source information of a Vertex Feature Online Store.
- Version: v1

### `GoogleCloudDatacatalogV1FilesetSpec`

- Specification that applies to a fileset. Valid only for entries with the 'FILESET' type.
- Version: v1

### `GoogleCloudDatacatalogV1GcsFileSpec`

- Specification of a single file in Cloud Storage.
- Version: v1

### `GoogleCloudDatacatalogV1GcsFilesetSpec`

- Describes a Cloud Storage fileset entry.
- Version: v1

### `GoogleCloudDatacatalogV1GraphSpec`

- Specification that applies to a graph.
- Version: v1

### `GoogleCloudDatacatalogV1GraphSpecGraphElementTable`

- Element table definition.
- Version: v1

### `GoogleCloudDatacatalogV1GraphSpecGraphElementTableGraphNodeReference`

- A reference to a source or destination node in a graph edge.
- Version: v1

### `GoogleCloudDatacatalogV1GraphSpecGraphElementTableLabelAndProperties`

- The label and its properties. Each label is associated with a set of properties.
- Version: v1

### `GoogleCloudDatacatalogV1GraphSpecGraphElementTableProperty`

- A property declaration.
- Version: v1

### `GoogleCloudDatacatalogV1ImportEntriesMetadata`

- Metadata message for long-running operation returned by the ImportEntries.
- Version: v1

### `GoogleCloudDatacatalogV1ImportEntriesResponse`

- Response message for long-running operation returned by the ImportEntries.
- Version: v1

### `GoogleCloudDatacatalogV1ImportTaxonomiesRequest`

- Request message for ImportTaxonomies.
- Version: v1

### `GoogleCloudDatacatalogV1ImportTaxonomiesResponse`

- Response message for ImportTaxonomies.
- Version: v1

### `GoogleCloudDatacatalogV1InlineSource`

- Inline source containing taxonomies to import.
- Version: v1

### `GoogleCloudDatacatalogV1ListPolicyTagsResponse`

- Response message for ListPolicyTags.
- Version: v1

### `GoogleCloudDatacatalogV1ListTaxonomiesResponse`

- Response message for ListTaxonomies.
- Version: v1

### `GoogleCloudDatacatalogV1LookerSystemSpec`

- Specification that applies to entries that are part `LOOKER` system (user_specified_type)
- Version: v1

### `GoogleCloudDatacatalogV1MigrationConfig`

- The configuration related to the migration to Dataplex Universal Catalog applied to an organization or project. It is the response message for SetConfig and RetrieveEffectiveConfig.
- Version: v1

### `GoogleCloudDatacatalogV1ModelSpec`

- Specification that applies to a model. Valid only for entries with the `MODEL` type.
- Version: v1

### `GoogleCloudDatacatalogV1OrganizationConfig`

- The configuration related to the migration from Data Catalog to Dataplex Universal Catalog that has been applied to an organization and any projects under it. It is the response message for RetrieveConfig.
- Version: v1

### `GoogleCloudDatacatalogV1PersonalDetails`

- Entry metadata relevant only to the user and private to them.
- Version: v1

### `GoogleCloudDatacatalogV1PhysicalSchema`

- Native schema used by a resource represented as an entry. Used by query engines for deserializing and parsing source data.
- Version: v1

### `GoogleCloudDatacatalogV1PhysicalSchemaAvroSchema`

- Schema in Avro JSON format.
- Version: v1

### `GoogleCloudDatacatalogV1PhysicalSchemaCsvSchema`

- Marks a CSV-encoded data source.
- Version: v1

### `GoogleCloudDatacatalogV1PhysicalSchemaOrcSchema`

- Marks an ORC-encoded data source.
- Version: v1

### `GoogleCloudDatacatalogV1PhysicalSchemaParquetSchema`

- Marks a Parquet-encoded data source.
- Version: v1

### `GoogleCloudDatacatalogV1PhysicalSchemaProtobufSchema`

- Schema in protocol buffer format.
- Version: v1

### `GoogleCloudDatacatalogV1PhysicalSchemaThriftSchema`

- Schema in Thrift format.
- Version: v1

### `GoogleCloudDatacatalogV1PolicyTag`

- Denotes one policy tag in a taxonomy, for example, SSN. Policy tags can be defined in a hierarchy. For example: + Geolocation + LatLong + City + ZipCode Where the "Geolocation" policy tag contains three children.
- Version: v1

### `GoogleCloudDatacatalogV1ReconcileTagsMetadata`

- Long-running operation metadata message returned by the ReconcileTags.
- Version: v1

### `GoogleCloudDatacatalogV1ReconcileTagsResponse`

- Long-running operation response message returned by ReconcileTags.
- Version: v1

### `GoogleCloudDatacatalogV1ReplaceTaxonomyRequest`

- Request message for ReplaceTaxonomy.
- Version: v1

### `GoogleCloudDatacatalogV1RoutineSpec`

- Specification that applies to a routine. Valid only for entries with the `ROUTINE` type.
- Version: v1

### `GoogleCloudDatacatalogV1RoutineSpecArgument`

- Input or output argument of a function or stored procedure.
- Version: v1

### `GoogleCloudDatacatalogV1Schema`

- Represents a schema, for example, a BigQuery, GoogleSQL, or Avro schema.
- Version: v1

### `GoogleCloudDatacatalogV1SearchCatalogRequest`

- Request message for SearchCatalog.
- Version: v1

### `GoogleCloudDatacatalogV1SearchCatalogRequestScope`

- The criteria that select the subspace used for query matching.
- Version: v1

### `GoogleCloudDatacatalogV1SearchCatalogResponse`

- Response message for SearchCatalog.
- Version: v1

### `GoogleCloudDatacatalogV1SearchCatalogResult`

- Result in the response to a search request. Each result captures details of one entry that matches the search.
- Version: v1

### `GoogleCloudDatacatalogV1SerializedPolicyTag`

- A nested protocol buffer that represents a policy tag and all its descendants.
- Version: v1

### `GoogleCloudDatacatalogV1SerializedTaxonomy`

- A nested protocol buffer that represents a taxonomy and the hierarchy of its policy tags. Used for taxonomy replacement, import, and export.
- Version: v1

### `GoogleCloudDatacatalogV1ServiceSpec`

- Specification that applies to a Service resource. Valid only for entries with the `SERVICE` type.
- Version: v1

### `GoogleCloudDatacatalogV1SetConfigRequest`

- Request message for SetConfig.
- Version: v1

### `GoogleCloudDatacatalogV1SpannerTableSpec`

- Specification of a Spanner table.
- Version: v1

### `GoogleCloudDatacatalogV1SpannerTableSpecSpannerForeignKey`

- Specification of a Spanner foreign key.
- Version: v1

### `GoogleCloudDatacatalogV1SpannerTableSpecSpannerForeignKeyForeignKeyColumnMapping`

- Column mapping for a Spanner foreign key.
- Version: v1

### `GoogleCloudDatacatalogV1SpannerTableSpecSpannerPrimaryKey`

- Specification of a Spanner primary key.
- Version: v1

### `GoogleCloudDatacatalogV1SqlDatabaseSystemSpec`

- Specification that applies to entries that are part `SQL_DATABASE` system (user_specified_type)
- Version: v1

### `GoogleCloudDatacatalogV1StorageProperties`

- Details the properties of the underlying storage.
- Version: v1

### `GoogleCloudDatacatalogV1SystemTimestamps`

- Timestamps associated with this resource in a particular system.
- Version: v1

### `GoogleCloudDatacatalogV1TableSpec`

- Normal BigQuery table specification.
- Version: v1

### `GoogleCloudDatacatalogV1Tag`

- Tags contain custom metadata and are attached to Data Catalog resources. Tags conform with the specification of their tag template. See Data Catalog IAM (https://cloud.google.com/data-catalog/docs/concepts/iam) for information on the permissions needed to create or view tags.
- Version: v1

### `GoogleCloudDatacatalogV1TagField`

- Contains the value and additional information on a field within a Tag.
- Version: v1

### `GoogleCloudDatacatalogV1TagFieldEnumValue`

- An enum value.
- Version: v1

### `GoogleCloudDatacatalogV1TaggedEntry`

- Wrapper containing Entry and information about Tags that should and should not be attached to it.
- Version: v1

### `GoogleCloudDatacatalogV1Taxonomy`

- A taxonomy is a collection of hierarchical policy tags that classify data along a common axis. For example, a "data sensitivity" taxonomy might contain the following policy tags: + PII + Account number + Age + SSN + Zipcode + Financials + Revenue A "data origin" taxonomy might contain the following policy tags: + User data + Employee data + Partner data + Public data
- Version: v1

### `GoogleCloudDatacatalogV1TaxonomyService`

- The source system of the Taxonomy.
- Version: v1

### `GoogleCloudDatacatalogV1UsageSignal`

- The set of all usage signals that Data Catalog stores. Note: Usually, these signals are updated daily. In rare cases, an update may fail but will be performed again on the next day.
- Version: v1

### `GoogleCloudDatacatalogV1UsageStats`

- Detailed statistics on the entry's usage. Usage statistics have the following limitations: - Only BigQuery tables have them. - They only include BigQuery query jobs. - They might be underestimated because wildcard table references are not yet counted. For more information, see Querying multiple tables using a wildcard table (https://cloud.google.com/bigquery/docs/querying-wildcard-tables)
- Version: v1

### `GoogleCloudDatacatalogV1VertexDatasetSpec`

- Specification for vertex dataset resources.
- Version: v1

### `GoogleCloudDatacatalogV1VertexModelSourceInfo`

- Detail description of the source information of a Vertex model.
- Version: v1

### `GoogleCloudDatacatalogV1VertexModelSpec`

- Specification for vertex model resources.
- Version: v1

### `GoogleCloudDatacatalogV1ViewSpec`

- Table view specification.
- Version: v1

### `GoogleCloudDatacatalogV1beta1ExportTaxonomiesResponse`

- Response message for ExportTaxonomies.
- Version: v1beta1

### `GoogleCloudDatacatalogV1beta1ImportTaxonomiesRequest`

- Request message for ImportTaxonomies.
- Version: v1beta1

### `GoogleCloudDatacatalogV1beta1ImportTaxonomiesResponse`

- Response message for ImportTaxonomies.
- Version: v1beta1

### `GoogleCloudDatacatalogV1beta1InlineSource`

- Inline source used for taxonomies import.
- Version: v1beta1

### `GoogleCloudDatacatalogV1beta1ListPolicyTagsResponse`

- Response message for ListPolicyTags.
- Version: v1beta1

### `GoogleCloudDatacatalogV1beta1ListTaxonomiesResponse`

- Response message for ListTaxonomies.
- Version: v1beta1

### `GoogleCloudDatacatalogV1beta1PolicyTag`

- Denotes one policy tag in a taxonomy (e.g. ssn). Policy Tags can be defined in a hierarchy. For example, consider the following hierarchy: Geolocation -> (LatLong, City, ZipCode). PolicyTag "Geolocation" contains three child policy tags: "LatLong", "City", and "ZipCode".
- Version: v1beta1

### `GoogleCloudDatacatalogV1beta1SearchCatalogRequest`

- Request message for SearchCatalog.
- Version: v1beta1

### `GoogleCloudDatacatalogV1beta1SearchCatalogRequestScope`

- The criteria that select the subspace used for query matching.
- Version: v1beta1

### `GoogleCloudDatacatalogV1beta1SearchCatalogResponse`

- Response message for SearchCatalog.
- Version: v1beta1

### `GoogleCloudDatacatalogV1beta1SearchCatalogResult`

- A result that appears in the response of a search request. Each result captures details of one entry that matches the search.
- Version: v1beta1

### `GoogleCloudDatacatalogV1beta1SerializedPolicyTag`

- Message representing one policy tag when exported as a nested proto.
- Version: v1beta1

### `GoogleCloudDatacatalogV1beta1SerializedTaxonomy`

- Message capturing a taxonomy and its policy tag hierarchy as a nested proto. Used for taxonomy import/export and mutation.
- Version: v1beta1

### `GoogleCloudDatacatalogV1beta1SystemTimestamps`

- Timestamps about this resource according to a particular system.
- Version: v1beta1

### `GoogleCloudDatacatalogV1beta1Taxonomy`

- A taxonomy is a collection of policy tags that classify data along a common axis. For instance a data \*sensitivity\* taxonomy could contain policy tags denoting PII such as age, zipcode, and SSN. A data \*origin\* taxonomy could contain policy tags to distinguish user data, employee data, partner data, public data.
- Version: v1beta1

### `GoogleCloudDatacatalogV1beta1TaxonomyService`

- The source system of the Taxonomy.
- Version: v1beta1

### `ListOperationsResponse`

- The response message for Operations.ListOperations.
- Version: v1

### `Operation`

- This resource represents a long-running operation that is the result of a network API call.
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

### `SetIamPolicyRequest`

- Request message for `SetIamPolicy` method.
- Version: v1

### `Status`

- The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by gRPC (https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the API Design Guide (https://cloud.google.com/apis/design/errors).
- Version: v1

### `TestIamPermissionsRequest`

- Request message for `TestIamPermissions` method.
- Version: v1

### `TestIamPermissionsResponse`

- Response message for `TestIamPermissions` method.
- Version: v1

### Shape of `Binding`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "condition": "Expr",
  "members": "array<string>",
  "role": "string"
}
```

### Example `Binding` value

Adapted (not in the official docs): `role` is `roles/datacatalog.viewer`, a predefined role of this service listed under `references/iam/`, and `members` has one placeholder principal (`user:jose@example.com`, the address used in the IAM examples of the Discovery descriptions), because the `Policy.bindings` description requires at least one principal per binding. Check which roles can be granted on the resource of the method before you use the value. The value matches the table; it is not a request to send as is.

```json
{
  "role": "roles/datacatalog.viewer",
  "members": [
    "user:jose@example.com"
  ]
}
```

## Options / Props

### `Binding` fields

| Field | Type | Description |
|---|---|---|
| `condition` | Expr | The condition that is associated with this binding. If the condition evaluates to `true`, then this binding applies to the current request. If the condition evaluates to `false`, then this binding does not apply to the current request. However, a different role binding might grant the same role to one or more of the principals in this binding. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |
| `members` | `array<string>` | Specifies the principals requesting access for a Google Cloud resource. `members` can have the following values: \* `allUsers`: A special identifier that represents anyone who is on the internet; with or without a Google account. \* `allAuthenticatedUsers`: A special identifier that represents anyone who is authenticated with a Google account or a service account. Does not include identities that come from external identity providers (IdPs) through identity federation. \* `user:{emailid}`: An email address that represents a specific Google account. For example, `alice@example.com` . \* `serviceAccount:{emailid}`: An email address that represents a Google service account. For example, `my-other-app@appspot.gserviceaccount.com`. \* `serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]`: An identifier for a Kubernetes service account (https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts). For example, `my-project.svc.id.goog[my-namespace/my-kubernetes-sa]`. \* `group:{emailid}`: An email address that represents a Google group. For example, `admins@example.com`. \* `domain:{domain}`: The G Suite domain (primary) that represents all the users of that domain. For example, `google.com` or `example.com`. \* `principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workforce identity pool. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/group/{group_id}`: All workforce identities in a group. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All workforce identities with a specific attribute value. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/*`: All identities in a workforce identity pool. \* `principal://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workload identity pool. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/group/{group_id}`: A workload identity pool group. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All identities in a workload identity pool with a certain attribute. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/*`: All identities in a workload identity pool. \* `deleted:user:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a user that has been recently deleted. For example, `alice@example.com?uid=123456789012345678901`. If the user is recovered, this value reverts to `user:{emailid}` and the recovered user retains the role in the binding. \* `deleted:serviceAccount:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a service account that has been recently deleted. For example, `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901`. If the service account is undeleted, this value reverts to `serviceAccount:{emailid}` and the undeleted service account retains the role in the binding. \* `deleted:group:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a Google group that has been recently deleted. For example, `admins@example.com?uid=123456789012345678901`. If the group is recovered, this value reverts to `group:{emailid}` and the recovered group retains the role in the binding. \* `deleted:principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: Deleted single identity in a workforce identity pool. For example, `deleted:principal://iam.googleapis.com/locations/global/workforcePools/my-pool-id/subject/my-subject-attribute-value`. |
| `role` | string | Role that is assigned to the list of `members`, or principals. For example, `roles/viewer`, `roles/editor`, or `roles/owner`. For an overview of the IAM roles and permissions, see the IAM documentation (https://cloud.google.com/iam/docs/roles-overview). For a list of the available pre-defined roles, see here (https://cloud.google.com/iam/docs/understanding-roles). |

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

### `GoogleCloudDatacatalogV1BigQueryConnectionSpec` fields

| Field | Type | Description |
|---|---|---|
| `cloudSql` | GoogleCloudDatacatalogV1CloudSqlBigQueryConnectionSpec | Specification for the BigQuery connection to a Cloud SQL instance. |
| `connectionType` | string enum | The type of the BigQuery connection. Values: `CONNECTION_TYPE_UNSPECIFIED`, `CLOUD_SQL`. |
| `hasCredential` | boolean | True if there are credentials attached to the BigQuery connection; false otherwise. |

### `GoogleCloudDatacatalogV1BigQueryDateShardedSpec` fields

| Field | Type | Description |
|---|---|---|
| `dataset` | string | Output only. The Data Catalog resource name of the dataset entry the current table belongs to. For example: `projects/{PROJECT_ID}/locations/{LOCATION}/entrygroups/{ENTRY_GROUP_ID}/entries/{ENTRY_ID}`. |
| `latestShardResource` | string | Output only. BigQuery resource name of the latest shard. |
| `shardCount` | string (int64) | Output only. Total number of shards. |
| `tablePrefix` | string | Output only. The table name prefix of the shards. The name of any given shard is `[table_prefix]YYYYMMDD`. For example, for the `MyTable20180101` shard, the `table_prefix` is `MyTable`. |

### `GoogleCloudDatacatalogV1BigQueryRoutineSpec` fields

| Field | Type | Description |
|---|---|---|
| `importedLibraries` | `array<string>` | Paths of the imported libraries. |

### `GoogleCloudDatacatalogV1BigQueryTableSpec` fields

| Field | Type | Description |
|---|---|---|
| `tableSourceType` | string enum | Output only. The table source type. Values: `TABLE_SOURCE_TYPE_UNSPECIFIED`, `BIGQUERY_VIEW`, `BIGQUERY_TABLE`, `BIGQUERY_MATERIALIZED_VIEW`. |
| `tableSpec` | GoogleCloudDatacatalogV1TableSpec | Specification of a BigQuery table. Populated only if the `table_source_type` is `BIGQUERY_TABLE`. Mutually exclusive with `viewSpec` (proto `oneof type_spec`; set at most one; see Notes). |
| `viewSpec` | GoogleCloudDatacatalogV1ViewSpec | Table view specification. Populated only if the `table_source_type` is `BIGQUERY_VIEW`. Mutually exclusive with `tableSpec` (proto `oneof type_spec`; set at most one; see Notes). |

### `GoogleCloudDatacatalogV1BusinessContext` fields

| Field | Type | Description |
|---|---|---|
| `contacts` | GoogleCloudDatacatalogV1Contacts | Contact people for the entry. |
| `entryOverview` | GoogleCloudDatacatalogV1EntryOverview | Entry overview fields for rich text descriptions of entries. |

### `GoogleCloudDatacatalogV1CloudBigtableInstanceSpec` fields

| Field | Type | Description |
|---|---|---|
| `cloudBigtableClusterSpecs` | `array<GoogleCloudDatacatalogV1CloudBigtableInstanceSpecCloudBigtableClusterSpec>` | The list of clusters for the Instance. |

### `GoogleCloudDatacatalogV1CloudBigtableInstanceSpecCloudBigtableClusterSpec` fields

| Field | Type | Description |
|---|---|---|
| `displayName` | string | Name of the cluster. |
| `linkedResource` | string | A link back to the parent resource, in this case Instance. |
| `location` | string | Location of the cluster, typically a Cloud zone. |
| `type` | string | Type of the resource. For a cluster this would be "CLUSTER". |

### `GoogleCloudDatacatalogV1CloudBigtableSystemSpec` fields

| Field | Type | Description |
|---|---|---|
| `instanceDisplayName` | string | Display name of the Instance. This is user specified and different from the resource name. |

### `GoogleCloudDatacatalogV1CloudSqlBigQueryConnectionSpec` fields

| Field | Type | Description |
|---|---|---|
| `database` | string | Database name. |
| `instanceId` | string | Cloud SQL instance ID in the format of `project:location:instance`. |
| `type` | string enum | Type of the Cloud SQL database. Values: `DATABASE_TYPE_UNSPECIFIED`, `POSTGRES`, `MYSQL`. |

### `GoogleCloudDatacatalogV1ColumnSchema` fields

| Field | Type | Description |
|---|---|---|
| `column` | string | Required. Name of the column. Must be a UTF-8 string without dots (.). The maximum size is 64 bytes. |
| `defaultValue` | string | Optional. Default value for the column. |
| `description` | string | Optional. Description of the column. Default value is an empty string. The description must be a UTF-8 string with the maximum size of 2000 bytes. |
| `gcRule` | string | Optional. Garbage collection policy for the column or column family. Applies to systems like Cloud Bigtable. |
| `highestIndexingType` | string enum | Optional. Most important inclusion of this column. Values: `INDEXING_TYPE_UNSPECIFIED`, `INDEXING_TYPE_NONE`, `INDEXING_TYPE_NON_UNIQUE`, `INDEXING_TYPE_UNIQUE`, `INDEXING_TYPE_PRIMARY_KEY`. |
| `lookerColumnSpec` | GoogleCloudDatacatalogV1ColumnSchemaLookerColumnSpec | Looker specific column info of this column. |
| `mode` | string | Optional. A column's mode indicates whether values in this column are required, nullable, or repeated. Only `NULLABLE`, `REQUIRED`, and `REPEATED` values are supported. Default mode is `NULLABLE`. |
| `ordinalPosition` | integer (int32) | Optional. Ordinal position |
| `rangeElementType` | GoogleCloudDatacatalogV1ColumnSchemaFieldElementType | Optional. The subtype of the RANGE, if the type of this field is RANGE. If the type is RANGE, this field is required. Possible values for the field element type of a RANGE include: \* DATE \* DATETIME \* TIMESTAMP |
| `subcolumns` | `array<GoogleCloudDatacatalogV1ColumnSchema>` | Optional. Schema of sub-columns. A column can have zero or more sub-columns. |
| `type` | string | Required. Type of the column. Must be a UTF-8 string with the maximum size of 128 bytes. |

### `GoogleCloudDatacatalogV1ColumnSchemaFieldElementType` fields

| Field | Type | Description |
|---|---|---|
| `type` | string | Required. The type of a field element. See ColumnSchema.type. |

### `GoogleCloudDatacatalogV1ColumnSchemaLookerColumnSpec` fields

| Field | Type | Description |
|---|---|---|
| `type` | string enum | Looker specific column type of this column. Values: `LOOKER_COLUMN_TYPE_UNSPECIFIED`, `DIMENSION`, `DIMENSION_GROUP`, `FILTER`, `MEASURE`, `PARAMETER`. |

### `GoogleCloudDatacatalogV1CommonUsageStats` fields

| Field | Type | Description |
|---|---|---|
| `viewCount` | string (int64) | View count in source system. |

### `GoogleCloudDatacatalogV1Contacts` fields

| Field | Type | Description |
|---|---|---|
| `people` | `array<GoogleCloudDatacatalogV1ContactsPerson>` | The list of contact people for the entry. |

### `GoogleCloudDatacatalogV1ContactsPerson` fields

| Field | Type | Description |
|---|---|---|
| `designation` | string | Designation of the person, for example, Data Steward. |
| `email` | string | Email of the person in the format of `john.doe@xyz`, `<john.doe@xyz>`, or `John Doe<john.doe@xyz>` (angle-bracket parts restored from the source proto; see Notes). |

### `GoogleCloudDatacatalogV1CrossRegionalSource` fields

| Field | Type | Description |
|---|---|---|
| `taxonomy` | string | Required. The resource name of the source taxonomy to import. |

### `GoogleCloudDatacatalogV1DataSource` fields

| Field | Type | Description |
|---|---|---|
| `resource` | string | Full name of a resource as defined by the service. For example: `//bigquery.googleapis.com/projects/{PROJECT_ID}/locations/{LOCATION}/datasets/{DATASET_ID}/tables/{TABLE_ID}` |
| `service` | string enum | Service that physically stores the data. Values: `SERVICE_UNSPECIFIED`, `CLOUD_STORAGE`, `BIGQUERY`. |
| `sourceEntry` | string | Output only. Data Catalog entry name, if applicable. |
| `storageProperties` | GoogleCloudDatacatalogV1StorageProperties | Detailed properties of the underlying storage. |

### `GoogleCloudDatacatalogV1DataSourceConnectionSpec` fields

| Field | Type | Description |
|---|---|---|
| `bigqueryConnectionSpec` | GoogleCloudDatacatalogV1BigQueryConnectionSpec | Output only. Fields specific to BigQuery connections. |

### `GoogleCloudDatacatalogV1DatabaseTableSpec` fields

| Field | Type | Description |
|---|---|---|
| `databaseViewSpec` | GoogleCloudDatacatalogV1DatabaseTableSpecDatabaseViewSpec | Spec what applies to tables that are actually views. Not set for "real" tables. |
| `dataplexTable` | GoogleCloudDatacatalogV1DataplexTableSpec | Output only. Fields specific to a Dataplex Universal Catalog table and present only in the Dataplex Universal Catalog table entries. |
| `type` | string enum | Type of this table. Values: `TABLE_TYPE_UNSPECIFIED`, `NATIVE`, `EXTERNAL`. |

### `GoogleCloudDatacatalogV1DatabaseTableSpecDatabaseViewSpec` fields

| Field | Type | Description |
|---|---|---|
| `baseTable` | string | Name of a singular table this view reflects one to one. Mutually exclusive with `sqlQuery` (proto `oneof source_definition`; set at most one; see Notes). |
| `sqlQuery` | string | SQL query used to generate this view. Mutually exclusive with `baseTable` (proto `oneof source_definition`; set at most one; see Notes). |
| `viewType` | string enum | Type of this view. Values: `VIEW_TYPE_UNSPECIFIED`, `STANDARD_VIEW`, `MATERIALIZED_VIEW`. |

### `GoogleCloudDatacatalogV1DataplexExternalTable` fields

| Field | Type | Description |
|---|---|---|
| `dataCatalogEntry` | string | Name of the Data Catalog entry representing the external table. |
| `fullyQualifiedName` | string | Fully qualified name (FQN) of the external table. |
| `googleCloudResource` | string | Google Cloud resource name of the external table. |
| `system` | string enum | Service in which the external table is registered. Values: `INTEGRATED_SYSTEM_UNSPECIFIED`, `BIGQUERY`, `CLOUD_PUBSUB`, `DATAPROC_METASTORE`, `DATAPLEX`, `CLOUD_SPANNER`, `CLOUD_BIGTABLE`, `CLOUD_SQL`, `LOOKER`, `VERTEX_AI`. |

### `GoogleCloudDatacatalogV1DataplexFilesetSpec` fields

| Field | Type | Description |
|---|---|---|
| `dataplexSpec` | GoogleCloudDatacatalogV1DataplexSpec | Common Dataplex Universal Catalog fields. |

### `GoogleCloudDatacatalogV1DataplexSpec` fields

| Field | Type | Description |
|---|---|---|
| `asset` | string | Fully qualified resource name of an asset in Dataplex Universal Catalog, to which the underlying data source (Cloud Storage bucket or BigQuery dataset) of the entity is attached. |
| `compressionFormat` | string | Compression format of the data, e.g., zip, gzip etc. |
| `dataFormat` | GoogleCloudDatacatalogV1PhysicalSchema | Format of the data. |
| `projectId` | string | Project ID of the underlying Cloud Storage or BigQuery data. Note that this may not be the same project as the corresponding Dataplex Universal Catalog lake / zone / asset. |

### `GoogleCloudDatacatalogV1DataplexTableSpec` fields

| Field | Type | Description |
|---|---|---|
| `dataplexSpec` | GoogleCloudDatacatalogV1DataplexSpec | Common Dataplex Universal Catalog fields. |
| `externalTables` | `array<GoogleCloudDatacatalogV1DataplexExternalTable>` | List of external tables registered by Dataplex Universal Catalog in other systems based on the same underlying data. External tables allow to query this data in those systems. |
| `userManaged` | boolean | Indicates if the table schema is managed by the user or not. |

### `GoogleCloudDatacatalogV1DatasetSpec` fields

| Field | Type | Description |
|---|---|---|
| `vertexDatasetSpec` | GoogleCloudDatacatalogV1VertexDatasetSpec | Vertex AI Dataset specific fields |

### `GoogleCloudDatacatalogV1DumpItem` fields

| Field | Type | Description |
|---|---|---|
| `taggedEntry` | GoogleCloudDatacatalogV1TaggedEntry | Entry and its tags. |

### `GoogleCloudDatacatalogV1Entry` fields

| Field | Type | Description |
|---|---|---|
| `bigqueryDateShardedSpec` | GoogleCloudDatacatalogV1BigQueryDateShardedSpec | Output only. Specification for a group of BigQuery tables with the `[prefix]YYYYMMDD` name pattern. For more information, see Introduction to partitioned tables (https://cloud.google.com/bigquery/docs/partitioned-tables#partitioning_versus_sharding). Mutually exclusive with `gcsFilesetSpec`, `bigqueryTableSpec` (proto `oneof type_spec`; set at most one; see Notes). |
| `bigqueryTableSpec` | GoogleCloudDatacatalogV1BigQueryTableSpec | Output only. Specification that applies to a BigQuery table. Valid only for entries with the `TABLE` type. Mutually exclusive with `gcsFilesetSpec`, `bigqueryDateShardedSpec` (proto `oneof type_spec`; set at most one; see Notes). |
| `businessContext` | GoogleCloudDatacatalogV1BusinessContext | Business Context of the entry. Not supported for BigQuery datasets |
| `cloudBigtableSystemSpec` | GoogleCloudDatacatalogV1CloudBigtableSystemSpec | Specification that applies to Cloud Bigtable system. Only settable when `integrated_system` is equal to `CLOUD_BIGTABLE` Mutually exclusive with `sqlDatabaseSystemSpec`, `lookerSystemSpec` (proto `oneof system_spec`; set at most one; see Notes). |
| `dataSource` | GoogleCloudDatacatalogV1DataSource | Output only. Physical location of the entry. |
| `dataSourceConnectionSpec` | GoogleCloudDatacatalogV1DataSourceConnectionSpec | Specification that applies to a data source connection. Valid only for entries with the `DATA_SOURCE_CONNECTION` type. Mutually exclusive with `databaseTableSpec`, `routineSpec`, `datasetSpec`, `filesetSpec`, `serviceSpec`, `modelSpec`, `featureOnlineStoreSpec` (proto `oneof spec`; set at most one; see Notes). |
| `databaseTableSpec` | GoogleCloudDatacatalogV1DatabaseTableSpec | Specification that applies to a table resource. Valid only for entries with the `TABLE` or `EXPLORE` type. Mutually exclusive with `dataSourceConnectionSpec`, `routineSpec`, `datasetSpec`, `filesetSpec`, `serviceSpec`, `modelSpec`, `featureOnlineStoreSpec` (proto `oneof spec`; set at most one; see Notes). |
| `datasetSpec` | GoogleCloudDatacatalogV1DatasetSpec | Specification that applies to a dataset. Mutually exclusive with `databaseTableSpec`, `dataSourceConnectionSpec`, `routineSpec`, `filesetSpec`, `serviceSpec`, `modelSpec`, `featureOnlineStoreSpec` (proto `oneof spec`; set at most one; see Notes). |
| `description` | string | Entry description that can consist of several sentences or paragraphs that describe entry contents. The description must not contain Unicode non-characters as well as C0 and C1 control codes except tabs (HT), new lines (LF), carriage returns (CR), and page breaks (FF). The maximum size is 2000 bytes when encoded in UTF-8. Default value is an empty string. |
| `displayName` | string | Display name of an entry. The maximum size is 500 bytes when encoded in UTF-8. Default value is an empty string. |
| `featureOnlineStoreSpec` | GoogleCloudDatacatalogV1FeatureOnlineStoreSpec | FeatureonlineStore spec for Vertex AI Feature Store. Mutually exclusive with `databaseTableSpec`, `dataSourceConnectionSpec`, `routineSpec`, `datasetSpec`, `filesetSpec`, `serviceSpec`, `modelSpec` (proto `oneof spec`; set at most one; see Notes). |
| `filesetSpec` | GoogleCloudDatacatalogV1FilesetSpec | Specification that applies to a fileset resource. Valid only for entries with the `FILESET` type. Mutually exclusive with `databaseTableSpec`, `dataSourceConnectionSpec`, `routineSpec`, `datasetSpec`, `serviceSpec`, `modelSpec`, `featureOnlineStoreSpec` (proto `oneof spec`; set at most one; see Notes). |
| `fullyQualifiedName` | string | Fully Qualified Name (FQN) (https://cloud.google.com//data-catalog/docs/fully-qualified-names) of the resource. Set automatically for entries representing resources from synced systems. Settable only during creation, and read-only later. Can be used for search and lookup of the entries. |
| `gcsFilesetSpec` | GoogleCloudDatacatalogV1GcsFilesetSpec | Specification that applies to a Cloud Storage fileset. Valid only for entries with the `FILESET` type. Mutually exclusive with `bigqueryTableSpec`, `bigqueryDateShardedSpec` (proto `oneof type_spec`; set at most one; see Notes). |
| `graphSpec` | GoogleCloudDatacatalogV1GraphSpec | Spec for graph. |
| `integratedSystem` | string enum | Output only. Indicates the entry's source system that Data Catalog integrates with, such as BigQuery, Pub/Sub, or Dataproc Metastore. Mutually exclusive with `userSpecifiedSystem` (proto `oneof system`; set at most one; see Notes). Values: `INTEGRATED_SYSTEM_UNSPECIFIED`, `BIGQUERY`, `CLOUD_PUBSUB`, `DATAPROC_METASTORE`, `DATAPLEX`, `CLOUD_SPANNER`, `CLOUD_BIGTABLE`, `CLOUD_SQL`, `LOOKER`, `VERTEX_AI`. |
| `labels` | `map<string, string>` | Cloud labels attached to the entry. In Data Catalog, you can create and modify labels attached only to custom entries. Synced entries have unmodifiable labels that come from the source system. |
| `linkedResource` | string | The resource this metadata entry refers to. For Google Cloud Platform resources, `linked_resource` is the Full Resource Name (https://cloud.google.com/apis/design/resource_names#full_resource_name). For example, the `linked_resource` for a table resource from BigQuery is: `//bigquery.googleapis.com/projects/{PROJECT_ID}/datasets/{DATASET_ID}/tables/{TABLE_ID}` Output only when the entry is one of the types in the `EntryType` enum. For entries with a `user_specified_type`, this field is optional and defaults to an empty string. The resource string must contain only letters (a-z, A-Z), numbers (0-9), underscores (\_), periods (.), colons (:), slashes (/), dashes (-), and hashes (#). The maximum size is 200 bytes when encoded in UTF-8. |
| `lookerSystemSpec` | GoogleCloudDatacatalogV1LookerSystemSpec | Specification that applies to Looker sysstem. Only settable when `user_specified_system` is equal to `LOOKER` Mutually exclusive with `sqlDatabaseSystemSpec`, `cloudBigtableSystemSpec` (proto `oneof system_spec`; set at most one; see Notes). |
| `modelSpec` | GoogleCloudDatacatalogV1ModelSpec | Model specification. Mutually exclusive with `databaseTableSpec`, `dataSourceConnectionSpec`, `routineSpec`, `datasetSpec`, `filesetSpec`, `serviceSpec`, `featureOnlineStoreSpec` (proto `oneof spec`; set at most one; see Notes). |
| `name` | string | Output only. Identifier. The resource name of an entry in URL format. Note: The entry itself and its child resources might not be stored in the location specified in its name. |
| `personalDetails` | GoogleCloudDatacatalogV1PersonalDetails | Output only. Additional information related to the entry. Private to the current user. |
| `routineSpec` | GoogleCloudDatacatalogV1RoutineSpec | Specification that applies to a user-defined function or procedure. Valid only for entries with the `ROUTINE` type. Mutually exclusive with `databaseTableSpec`, `dataSourceConnectionSpec`, `datasetSpec`, `filesetSpec`, `serviceSpec`, `modelSpec`, `featureOnlineStoreSpec` (proto `oneof spec`; set at most one; see Notes). |
| `schema` | GoogleCloudDatacatalogV1Schema | Schema of the entry. An entry might not have any schema attached to it. |
| `serviceSpec` | GoogleCloudDatacatalogV1ServiceSpec | Specification that applies to a Service resource. Mutually exclusive with `databaseTableSpec`, `dataSourceConnectionSpec`, `routineSpec`, `datasetSpec`, `filesetSpec`, `modelSpec`, `featureOnlineStoreSpec` (proto `oneof spec`; set at most one; see Notes). |
| `sourceSystemTimestamps` | GoogleCloudDatacatalogV1SystemTimestamps | Timestamps from the underlying resource, not from the Data Catalog entry. Output only when the entry has a system listed in the `IntegratedSystem` enum. For entries with `user_specified_system`, this field is optional and defaults to an empty timestamp. |
| `spannerTableSpec` | GoogleCloudDatacatalogV1SpannerTableSpec | Specification of a Spanner table. |
| `sqlDatabaseSystemSpec` | GoogleCloudDatacatalogV1SqlDatabaseSystemSpec | Specification that applies to a relational database system. Only settable when `user_specified_system` is equal to `SQL_DATABASE` Mutually exclusive with `lookerSystemSpec`, `cloudBigtableSystemSpec` (proto `oneof system_spec`; set at most one; see Notes). |
| `type` | string enum | The type of the entry; the values of the `EntryType` enum are listed below. Mutually exclusive with `userSpecifiedType` (proto `oneof entry_type`; set at most one; see Notes). Values: `ENTRY_TYPE_UNSPECIFIED`, `TABLE`, `MODEL`, `DATA_STREAM`, `FILESET`, `CLUSTER`, `DATABASE`, `DATA_SOURCE_CONNECTION`, `ROUTINE`, `LAKE`, `ZONE`, `SERVICE`, `DATABASE_SCHEMA`, `DASHBOARD`, `EXPLORE`, `LOOK`, `FEATURE_ONLINE_STORE`, `FEATURE_VIEW`, `FEATURE_GROUP`, `GRAPH`, `NODE`, `EDGE`. |
| `usageSignal` | GoogleCloudDatacatalogV1UsageSignal | Resource usage statistics. |
| `userSpecifiedSystem` | string | Indicates the entry's source system that Data Catalog doesn't automatically integrate with. The `user_specified_system` string has the following limitations: \* Is case insensitive. \* Must begin with a letter or underscore. \* Can only contain letters, numbers, and underscores. \* Must be at least 1 character and at most 64 characters long. Mutually exclusive with `integratedSystem` (proto `oneof system`; set at most one; see Notes). |
| `userSpecifiedType` | string | Custom entry type that doesn't match any of the values allowed for input and listed in the `EntryType` enum. When creating an entry, first check the type values in the enum. If there are no appropriate types for the new entry, provide a custom value, for example, `my_special_type`. The `user_specified_type` string has the following limitations: \* Is case insensitive. \* Must begin with a letter or underscore. \* Can only contain letters, numbers, and underscores. \* Must be at least 1 character and at most 64 characters long. Mutually exclusive with `type` (proto `oneof entry_type`; set at most one; see Notes). |

### `GoogleCloudDatacatalogV1EntryOverview` fields

| Field | Type | Description |
|---|---|---|
| `overview` | string | Entry overview with support for rich text. The overview must only contain Unicode characters, and should be formatted using HTML. The maximum length is 10 MiB as this value holds HTML descriptions including encoded images. The maximum length of the text without images is 100 KiB. |

### `GoogleCloudDatacatalogV1ExportTaxonomiesResponse` fields

| Field | Type | Description |
|---|---|---|
| `taxonomies` | `array<GoogleCloudDatacatalogV1SerializedTaxonomy>` | List of taxonomies and policy tags as nested protocol buffers. |

### `GoogleCloudDatacatalogV1FeatureOnlineStoreSpec` fields

| Field | Type | Description |
|---|---|---|
| `storageType` | string enum | Output only. Type of underlying storage for the FeatureOnlineStore. Values: `STORAGE_TYPE_UNSPECIFIED`, `BIGTABLE`, `OPTIMIZED`. |

### `GoogleCloudDatacatalogV1FilesetSpec` fields

| Field | Type | Description |
|---|---|---|
| `dataplexFileset` | GoogleCloudDatacatalogV1DataplexFilesetSpec | Fields specific to a Dataplex Universal Catalog fileset and present only in the Dataplex Universal Catalog fileset entries. |

### `GoogleCloudDatacatalogV1GcsFileSpec` fields

| Field | Type | Description |
|---|---|---|
| `filePath` | string | Required. Full file path. Example: `gs://bucket_name/a/b.txt`. |
| `gcsTimestamps` | GoogleCloudDatacatalogV1SystemTimestamps | Output only. Creation, modification, and expiration timestamps of a Cloud Storage file. |
| `sizeBytes` | string (int64) | Output only. File size in bytes. |

### `GoogleCloudDatacatalogV1GcsFilesetSpec` fields

| Field | Type | Description |
|---|---|---|
| `filePatterns` | `array<string>` | Required. Patterns to identify a set of files in Google Cloud Storage. For more information, see Wildcard Names (https://cloud.google.com/storage/docs/wildcards). Note: Currently, bucket wildcards are not supported. Examples of valid `file_patterns`: \* `gs://bucket_name/dir/*`: matches all files in `bucket_name/dir` directory \* `gs://bucket_name/dir/**`: matches all files in `bucket_name/dir` and all subdirectories \* `gs://bucket_name/file*`: matches files prefixed by `file` in `bucket_name` \* `gs://bucket_name/??.txt`: matches files with two characters followed by `.txt` in `bucket_name` \* `gs://bucket_name/[aeiou].txt`: matches files that contain a single vowel character followed by `.txt` in `bucket_name` \* `gs://bucket_name/[a-m].txt`: matches files that contain `a`, `b`, ... or `m` followed by `.txt` in `bucket_name` \* `gs://bucket_name/a/*/b`: matches all files in `bucket_name` that match the `a/*/b` pattern, such as `a/c/b`, `a/d/b` \* `gs://another_bucket/a.txt`: matches `gs://another_bucket/a.txt` You can combine wildcards to match complex sets of files, for example: `gs://bucket_name/[a-m]??.j*g` |
| `sampleGcsFileSpecs` | `array<GoogleCloudDatacatalogV1GcsFileSpec>` | Output only. Sample files contained in this fileset, not all files contained in this fileset are represented here. |

### `GoogleCloudDatacatalogV1GraphSpec` fields

| Field | Type | Description |
|---|---|---|
| `edgeTables` | `array<GoogleCloudDatacatalogV1GraphSpecGraphElementTable>` | Optional. Edge tables of the graph. |
| `name` | string | Output only. Fully qualified graph name. e.g. `named_catalog.MyGraph` |
| `nodeTables` | `array<GoogleCloudDatacatalogV1GraphSpecGraphElementTable>` | Required. Node tables of the graph. |

### `GoogleCloudDatacatalogV1GraphSpecGraphElementTable` fields

| Field | Type | Description |
|---|---|---|
| `alias` | string | Required. The alias name of the graph element. |
| `dataSource` | string | Required. The name of the data source. This is either a table name or a view name that is used for graph element input source. E.g. `Person` table or `PersonView` view. |
| `destinationNodeReference` | GoogleCloudDatacatalogV1GraphSpecGraphElementTableGraphNodeReference | Optional. The destination node reference of the edge. |
| `dynamicLabelColumn` | string | Optional. If set, this is the input column for dynamic label in schemaless data model. |
| `dynamicPropertiesColumn` | string | Optional. If set, this is the input column for dynamic properties in schemaless data model. |
| `elementKeys` | `array<string>` | Required. The name of the keys of the elements in the table. |
| `inputSource` | string enum | Required. The input source of the graph element. Values: `INPUT_SOURCE_UNSPECIFIED`, `TABLE`, `VIEW`. |
| `kind` | string enum | Required. The kind of the graph element. Values: `KIND_UNSPECIFIED`, `NODE`, `EDGE`. |
| `labelAndProperties` | `array<GoogleCloudDatacatalogV1GraphSpecGraphElementTableLabelAndProperties>` | Required. The labels and their properties for the graph element. |
| `sourceNodeReference` | GoogleCloudDatacatalogV1GraphSpecGraphElementTableGraphNodeReference | Optional. The source node reference of the edge. |

### `GoogleCloudDatacatalogV1GraphSpecGraphElementTableGraphNodeReference` fields

| Field | Type | Description |
|---|---|---|
| `edgeTableColumns` | `array<string>` | Required. The referencing columns in the edge table. The size of `edge_table_columns` must be equal to the size of `node_table_columns`. |
| `nodeAlias` | string | Required. The reference to the source/destination node of the edge. This name must be a valid `alias` of a node element in the same graph. Example, `Person` node can be a source node name of an edge element `Person_to_Address`. |
| `nodeTableColumns` | `array<string>` | Required. The referenced columns of the source node table. |

### `GoogleCloudDatacatalogV1GraphSpecGraphElementTableLabelAndProperties` fields

| Field | Type | Description |
|---|---|---|
| `label` | string | Required. The name of the label. |
| `properties` | `array<GoogleCloudDatacatalogV1GraphSpecGraphElementTableProperty>` | Optional. The properties associated with the label. |

### `GoogleCloudDatacatalogV1GraphSpecGraphElementTableProperty` fields

| Field | Type | Description |
|---|---|---|
| `name` | string | Required. Property name. |
| `type` | string | Required. Property data type. |

### `GoogleCloudDatacatalogV1ImportEntriesMetadata` fields

| Field | Type | Description |
|---|---|---|
| `errors` | `array<Status>` | Partial errors that are encountered during the ImportEntries operation. There is no guarantee that all the encountered errors are reported. However, if no errors are reported, it means that no errors were encountered. |
| `state` | string enum | State of the import operation. Values: `IMPORT_STATE_UNSPECIFIED`, `IMPORT_QUEUED`, `IMPORT_IN_PROGRESS`, `IMPORT_DONE`, `IMPORT_OBSOLETE`. |

### `GoogleCloudDatacatalogV1ImportEntriesResponse` fields

| Field | Type | Description |
|---|---|---|
| `deletedEntriesCount` | string (int64) | Number of entries deleted as a result of import operation. |
| `upsertedEntriesCount` | string (int64) | Cumulative number of entries created and entries updated as a result of import operation. |

### `GoogleCloudDatacatalogV1ImportTaxonomiesRequest` fields

| Field | Type | Description |
|---|---|---|
| `crossRegionalSource` | GoogleCloudDatacatalogV1CrossRegionalSource | Cross-regional source taxonomy to import. Mutually exclusive with `inlineSource` (proto `oneof source`; set at most one; see Notes). |
| `inlineSource` | GoogleCloudDatacatalogV1InlineSource | Inline source taxonomy to import. Mutually exclusive with `crossRegionalSource` (proto `oneof source`; set at most one; see Notes). |

### `GoogleCloudDatacatalogV1ImportTaxonomiesResponse` fields

| Field | Type | Description |
|---|---|---|
| `taxonomies` | `array<GoogleCloudDatacatalogV1Taxonomy>` | Imported taxonomies. |

### `GoogleCloudDatacatalogV1InlineSource` fields

| Field | Type | Description |
|---|---|---|
| `taxonomies` | `array<GoogleCloudDatacatalogV1SerializedTaxonomy>` | Required. Taxonomies to import. |

### `GoogleCloudDatacatalogV1ListPolicyTagsResponse` fields

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | Pagination token of the next results page. Empty if there are no more results in the list. |
| `policyTags` | `array<GoogleCloudDatacatalogV1PolicyTag>` | The policy tags that belong to the taxonomy. |

### `GoogleCloudDatacatalogV1ListTaxonomiesResponse` fields

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | Pagination token of the next results page. Empty if there are no more results in the list. |
| `taxonomies` | `array<GoogleCloudDatacatalogV1Taxonomy>` | Taxonomies that the project contains. |

### `GoogleCloudDatacatalogV1LookerSystemSpec` fields

| Field | Type | Description |
|---|---|---|
| `parentInstanceDisplayName` | string | Name of the parent Looker Instance. Empty if it does not exist. |
| `parentInstanceId` | string | ID of the parent Looker Instance. Empty if it does not exist. Example value: `someinstance.looker.com` |
| `parentModelDisplayName` | string | Name of the parent Model. Empty if it does not exist. |
| `parentModelId` | string | ID of the parent Model. Empty if it does not exist. |
| `parentViewDisplayName` | string | Name of the parent View. Empty if it does not exist. |
| `parentViewId` | string | ID of the parent View. Empty if it does not exist. |

### `GoogleCloudDatacatalogV1MigrationConfig` fields

| Field | Type | Description |
|---|---|---|
| `catalogUiExperience` | string enum | Opt-in status for the UI switch to Dataplex Universal Catalog. Values: `CATALOG_UI_EXPERIENCE_UNSPECIFIED`, `CATALOG_UI_EXPERIENCE_ENABLED`, `CATALOG_UI_EXPERIENCE_DISABLED`. |
| `tagTemplateMigration` | string enum | Opt-in status for the migration of Tag Templates to Dataplex Universal Catalog. Values: `TAG_TEMPLATE_MIGRATION_UNSPECIFIED`, `TAG_TEMPLATE_MIGRATION_ENABLED`, `TAG_TEMPLATE_MIGRATION_DISABLED`. |
| `templateMigrationEnabledTime` | string (google-datetime) | The time when the Tag Template migration was enabled. If the Tag Template migration is not enabled, this field is not set. |

### `GoogleCloudDatacatalogV1ModelSpec` fields

| Field | Type | Description |
|---|---|---|
| `vertexModelSpec` | GoogleCloudDatacatalogV1VertexModelSpec | Specification for vertex model resources. |

### `GoogleCloudDatacatalogV1OrganizationConfig` fields

| Field | Type | Description |
|---|---|---|
| `config` | `map<string, GoogleCloudDatacatalogV1MigrationConfig>` | Map of organizations and project resource names and their configuration. The format for the map keys is `organizations/{organizationId}` or `projects/{projectId}`. |

### `GoogleCloudDatacatalogV1PersonalDetails` fields

| Field | Type | Description |
|---|---|---|
| `starTime` | string (google-datetime) | Set if the entry is starred; unset otherwise. |
| `starred` | boolean | True if the entry is starred by the user; false otherwise. |

### `GoogleCloudDatacatalogV1PhysicalSchema` fields

| Field | Type | Description |
|---|---|---|
| `avro` | GoogleCloudDatacatalogV1PhysicalSchemaAvroSchema | Schema in Avro JSON format. Mutually exclusive with `thrift`, `protobuf`, `parquet`, `orc`, `csv` (proto `oneof schema`; set at most one; see Notes). |
| `csv` | GoogleCloudDatacatalogV1PhysicalSchemaCsvSchema | Marks a CSV-encoded data source. Mutually exclusive with `avro`, `thrift`, `protobuf`, `parquet`, `orc` (proto `oneof schema`; set at most one; see Notes). |
| `orc` | GoogleCloudDatacatalogV1PhysicalSchemaOrcSchema | Marks an ORC-encoded data source. Mutually exclusive with `avro`, `thrift`, `protobuf`, `parquet`, `csv` (proto `oneof schema`; set at most one; see Notes). |
| `parquet` | GoogleCloudDatacatalogV1PhysicalSchemaParquetSchema | Marks a Parquet-encoded data source. Mutually exclusive with `avro`, `thrift`, `protobuf`, `orc`, `csv` (proto `oneof schema`; set at most one; see Notes). |
| `protobuf` | GoogleCloudDatacatalogV1PhysicalSchemaProtobufSchema | Schema in protocol buffer format. Mutually exclusive with `avro`, `thrift`, `parquet`, `orc`, `csv` (proto `oneof schema`; set at most one; see Notes). |
| `thrift` | GoogleCloudDatacatalogV1PhysicalSchemaThriftSchema | Schema in Thrift format. Mutually exclusive with `avro`, `protobuf`, `parquet`, `orc`, `csv` (proto `oneof schema`; set at most one; see Notes). |

### `GoogleCloudDatacatalogV1PhysicalSchemaAvroSchema` fields

| Field | Type | Description |
|---|---|---|
| `text` | string | JSON source of the Avro schema. |

### `GoogleCloudDatacatalogV1PhysicalSchemaProtobufSchema` fields

| Field | Type | Description |
|---|---|---|
| `text` | string | Protocol buffer source of the schema. |

### `GoogleCloudDatacatalogV1PhysicalSchemaThriftSchema` fields

| Field | Type | Description |
|---|---|---|
| `text` | string | Thrift IDL source of the schema. |

### `GoogleCloudDatacatalogV1PolicyTag` fields

| Field | Type | Description |
|---|---|---|
| `childPolicyTags` | `array<string>` | Output only. Resource names of child policy tags of this policy tag. |
| `description` | string | Description of this policy tag. If not set, defaults to empty. The description must contain only Unicode characters, tabs, newlines, carriage returns and page breaks, and be at most 2000 bytes long when encoded in UTF-8. |
| `displayName` | string | Required. User-defined name of this policy tag. The name can't start or end with spaces and must be unique within the parent taxonomy, contain only Unicode letters, numbers, underscores, dashes and spaces, and be at most 200 bytes long when encoded in UTF-8. |
| `name` | string | Identifier. Resource name of this policy tag in the URL format. The policy tag manager generates unique taxonomy IDs and policy tag IDs. |
| `parentPolicyTag` | string | Resource name of this policy tag's parent policy tag. If empty, this is a top level tag. If not set, defaults to an empty string. For example, for the "LatLong" policy tag in the example above, this field contains the resource name of the "Geolocation" policy tag, and, for "Geolocation", this field is empty. |

### `GoogleCloudDatacatalogV1ReconcileTagsMetadata` fields

| Field | Type | Description |
|---|---|---|
| `errors` | `map<string, Status>` | Maps the name of each tagged column (or empty string for a sole entry) to tagging operation status. |
| `state` | string enum | State of the reconciliation operation. Values: `RECONCILIATION_STATE_UNSPECIFIED`, `RECONCILIATION_QUEUED`, `RECONCILIATION_IN_PROGRESS`, `RECONCILIATION_DONE`. |

### `GoogleCloudDatacatalogV1ReconcileTagsResponse` fields

| Field | Type | Description |
|---|---|---|
| `createdTagsCount` | string (int64) | Number of tags created in the request. |
| `deletedTagsCount` | string (int64) | Number of tags deleted in the request. |
| `updatedTagsCount` | string (int64) | Number of tags updated in the request. |

### `GoogleCloudDatacatalogV1ReplaceTaxonomyRequest` fields

| Field | Type | Description |
|---|---|---|
| `serializedTaxonomy` | GoogleCloudDatacatalogV1SerializedTaxonomy | Required. Taxonomy to update along with its child policy tags. |

### `GoogleCloudDatacatalogV1RoutineSpec` fields

| Field | Type | Description |
|---|---|---|
| `bigqueryRoutineSpec` | GoogleCloudDatacatalogV1BigQueryRoutineSpec | Fields specific for BigQuery routines. |
| `definitionBody` | string | The body of the routine. |
| `language` | string | The language the routine is written in. The exact value depends on the source system. For BigQuery routines, possible values are: \* `SQL` \* `JAVASCRIPT` |
| `returnType` | string | Return type of the argument. The exact value depends on the source system and the language. |
| `routineArguments` | `array<GoogleCloudDatacatalogV1RoutineSpecArgument>` | Arguments of the routine. |
| `routineType` | string enum | The type of the routine. Values: `ROUTINE_TYPE_UNSPECIFIED`, `SCALAR_FUNCTION`, `PROCEDURE`. |

### `GoogleCloudDatacatalogV1RoutineSpecArgument` fields

| Field | Type | Description |
|---|---|---|
| `mode` | string enum | Specifies whether the argument is input or output. Values: `MODE_UNSPECIFIED`, `IN`, `OUT`, `INOUT`. |
| `name` | string | The name of the argument. A return argument of a function might not have a name. |
| `type` | string | Type of the argument. The exact value depends on the source system and the language. |

### `GoogleCloudDatacatalogV1Schema` fields

| Field | Type | Description |
|---|---|---|
| `columns` | `array<GoogleCloudDatacatalogV1ColumnSchema>` | The unified GoogleSQL-like schema of columns. The overall maximum number of columns and nested columns is 10,000. The maximum nested depth is 15 levels. |

### `GoogleCloudDatacatalogV1SearchCatalogRequest` fields

| Field | Type | Description |
|---|---|---|
| `adminSearch` | boolean | Optional. If set, use searchAll permission granted on organizations from `include_org_ids` and projects from `include_project_ids` instead of the fine grained per resource permissions when filtering the search results. The only allowed `order_by` criteria for admin_search mode is `default`. Using this flags guarantees a full recall of the search results. |
| `orderBy` | string | Specifies the order of results. Currently supported case-sensitive values are: \* `relevance` that can only be descending \* `last_modified_timestamp [asc\|desc]` with descending (`desc`) as default \* `default` that can only be descending Search queries don't guarantee full recall. Results that match your query might not be returned, even in subsequent result pages. Additionally, returned (and not returned) results can vary if you repeat search queries. If you are experiencing recall issues and you don't have to fetch the results in any specific order, consider setting this parameter to `default`. If this parameter is omitted, it defaults to the descending `relevance`. |
| `pageSize` | integer (int32) | Upper bound on the number of results you can get in a single response. Can't be negative or 0, defaults to 10 in this case. The maximum number is 1000. If exceeded, throws an "invalid argument" exception. |
| `pageToken` | string | Optional. Pagination token that, if specified, returns the next page of search results. If empty, returns the first page. This token is returned in the SearchCatalogResponse.next_page_token field of the response to a previous SearchCatalogRequest call. |
| `query` | string | Optional. The query string with a minimum of 3 characters and specific syntax. For more information, see Data Catalog search syntax (https://cloud.google.com/data-catalog/docs/how-to/search-reference). An empty query string returns all data assets (in the specified scope) that you have access to. A query string can be a simple `xyz` or qualified by predicates: \* `name:x` \* `column:y` \* `description:z` |
| `scope` | GoogleCloudDatacatalogV1SearchCatalogRequestScope | Required. The scope of this search request. The `scope` is invalid if `include_org_ids`, `include_project_ids` are empty AND `include_gcp_public_datasets` is set to `false`. In this case, the request returns an error. |

### `GoogleCloudDatacatalogV1SearchCatalogRequestScope` fields

| Field | Type | Description |
|---|---|---|
| `includeGcpPublicDatasets` | boolean | If `true`, include Google Cloud public datasets in search results. By default, they are excluded. See Google Cloud Public Datasets for more information. |
| `includeOrgIds` | `array<string>` | The list of organization IDs to search within. To find your organization ID, follow the steps from \[Creating and managing organizations\] (/resource-manager/docs/creating-managing-organization). |
| `includeProjectIds` | `array<string>` | The list of project IDs to search within. For more information on the distinction between project names, IDs, and numbers, see Projects. |
| `includePublicTagTemplates` | boolean | Optional. This field is deprecated. The search mechanism for public and private tag templates is the same. |
| `restrictedLocations` | `array<string>` | Optional. The list of locations to search within. If empty, all locations are searched. Returns an error if any location in the list isn't one of the Supported regions (https://cloud.google.com/data-catalog/docs/concepts/regions#supported_regions). If a location is unreachable, its name is returned in the `SearchCatalogResponse.unreachable` field. To get additional information on the error, repeat the search request and set the location name as the value of this parameter. |
| `starredOnly` | boolean | Optional. If `true`, search only among starred entries. By default, all results are returned, starred or not. |

### `GoogleCloudDatacatalogV1SearchCatalogResponse` fields

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | Pagination token that can be used in subsequent calls to retrieve the next page of results. |
| `results` | `array<GoogleCloudDatacatalogV1SearchCatalogResult>` | Search results. |
| `totalSize` | integer (int32) | The approximate total number of entries matched by the query. |
| `unreachable` | `array<string>` | Unreachable locations. Search results don't include data from those locations. To get additional information on an error, repeat the search request and restrict it to specific locations by setting the `SearchCatalogRequest.scope.restricted_locations` parameter. |

### `GoogleCloudDatacatalogV1SearchCatalogResult` fields

| Field | Type | Description |
|---|---|---|
| `description` | string | Entry description that can consist of several sentences or paragraphs that describe entry contents. |
| `displayName` | string | The display name of the result. |
| `fullyQualifiedName` | string | Fully qualified name (FQN) of the resource. FQNs take two forms: \* For non-regionalized resources: `{SYSTEM}:{PROJECT}.{PATH_TO_RESOURCE_SEPARATED_WITH_DOTS}` \* For regionalized resources: `{SYSTEM}:{PROJECT}.{LOCATION_ID}.{PATH_TO_RESOURCE_SEPARATED_WITH_DOTS}` Example for a DPMS table: `dataproc_metastore:PROJECT_ID.LOCATION_ID.INSTANCE_ID.DATABASE_ID.TABLE_ID` |
| `integratedSystem` | string enum | Output only. The source system that Data Catalog automatically integrates with, such as BigQuery, Cloud Pub/Sub, or Dataproc Metastore. Mutually exclusive with `userSpecifiedSystem` (proto `oneof system`; set at most one; see Notes). Values: `INTEGRATED_SYSTEM_UNSPECIFIED`, `BIGQUERY`, `CLOUD_PUBSUB`, `DATAPROC_METASTORE`, `DATAPLEX`, `CLOUD_SPANNER`, `CLOUD_BIGTABLE`, `CLOUD_SQL`, `LOOKER`, `VERTEX_AI`. |
| `linkedResource` | string | The full name of the Google Cloud resource the entry belongs to. For more information, see \[Full Resource Name\] (/apis/design/resource_names#full_resource_name). Example: `//bigquery.googleapis.com/projects/PROJECT_ID/datasets/DATASET_ID/tables/TABLE_ID` |
| `modifyTime` | string (google-datetime) | The last modification timestamp of the entry in the source system. |
| `relativeResourceName` | string | The relative name of the resource in URL format. Examples: \* `projects/{PROJECT_ID}/locations/{LOCATION_ID}/entryGroups/{ENTRY_GROUP_ID}/entries/{ENTRY_ID}` \* `projects/{PROJECT_ID}/tagTemplates/{TAG_TEMPLATE_ID}` |
| `searchResultSubtype` | string | Sub-type of the search result. A dot-delimited full type of the resource. The same type you specify in the `type` search predicate. Examples: `entry.table`, `entry.dataStream`, `tagTemplate`. |
| `searchResultType` | string enum | Type of the search result. You can use this field to determine which get method to call to fetch the full resource. Values: `SEARCH_RESULT_TYPE_UNSPECIFIED`, `ENTRY`, `TAG_TEMPLATE`, `ENTRY_GROUP`. |
| `userSpecifiedSystem` | string | Custom source system that you can manually integrate Data Catalog with. Mutually exclusive with `integratedSystem` (proto `oneof system`; set at most one; see Notes). |

### `GoogleCloudDatacatalogV1SerializedPolicyTag` fields

| Field | Type | Description |
|---|---|---|
| `childPolicyTags` | `array<GoogleCloudDatacatalogV1SerializedPolicyTag>` | Children of the policy tag, if any. |
| `description` | string | Description of the serialized policy tag. At most 2000 bytes when encoded in UTF-8. If not set, defaults to an empty description. |
| `displayName` | string | Required. Display name of the policy tag. At most 200 bytes when encoded in UTF-8. |
| `policyTag` | string | Resource name of the policy tag. This field is ignored when calling `ImportTaxonomies`. |

### `GoogleCloudDatacatalogV1SerializedTaxonomy` fields

| Field | Type | Description |
|---|---|---|
| `activatedPolicyTypes` | `array<string enum>` | A list of policy types that are activated per taxonomy. Values: `POLICY_TYPE_UNSPECIFIED`, `FINE_GRAINED_ACCESS_CONTROL`. |
| `description` | string | Description of the serialized taxonomy. At most 2000 bytes when encoded in UTF-8. If not set, defaults to an empty description. |
| `displayName` | string | Required. Display name of the taxonomy. At most 200 bytes when encoded in UTF-8. |
| `policyTags` | `array<GoogleCloudDatacatalogV1SerializedPolicyTag>` | Top level policy tags associated with the taxonomy, if any. |

### `GoogleCloudDatacatalogV1ServiceSpec` fields

| Field | Type | Description |
|---|---|---|
| `cloudBigtableInstanceSpec` | GoogleCloudDatacatalogV1CloudBigtableInstanceSpec | Specification that applies to Instance entries of `CLOUD_BIGTABLE` system. |

### `GoogleCloudDatacatalogV1SetConfigRequest` fields

| Field | Type | Description |
|---|---|---|
| `catalogUiExperience` | string enum | Opt-in status for the UI switch to Dataplex Universal Catalog. Mutually exclusive with `tagTemplateMigration` (proto `oneof configuration`; set at most one; see Notes). Values: `CATALOG_UI_EXPERIENCE_UNSPECIFIED`, `CATALOG_UI_EXPERIENCE_ENABLED`, `CATALOG_UI_EXPERIENCE_DISABLED`. |
| `tagTemplateMigration` | string enum | Opt-in status for the migration of Tag Templates to Dataplex Universal Catalog. Mutually exclusive with `catalogUiExperience` (proto `oneof configuration`; set at most one; see Notes). Values: `TAG_TEMPLATE_MIGRATION_UNSPECIFIED`, `TAG_TEMPLATE_MIGRATION_ENABLED`, `TAG_TEMPLATE_MIGRATION_DISABLED`. |

### `GoogleCloudDatacatalogV1SpannerTableSpec` fields

| Field | Type | Description |
|---|---|---|
| `foreignKeys` | `array<GoogleCloudDatacatalogV1SpannerTableSpecSpannerForeignKey>` | Output only. The foreign keys of the table. |
| `primaryKey` | GoogleCloudDatacatalogV1SpannerTableSpecSpannerPrimaryKey | Output only. The primary key of the table. |

### `GoogleCloudDatacatalogV1SpannerTableSpecSpannerForeignKey` fields

| Field | Type | Description |
|---|---|---|
| `columnMappings` | `array<GoogleCloudDatacatalogV1SpannerTableSpecSpannerForeignKeyForeignKeyColumnMapping>` | Output only. The ordered list of column mappings for this foreign key. |
| `entry` | string | Output only. The table name this foreign key referenced to. Format: `projects/{PROJECT_ID}/locations/{LOCATION}/entryGroups/{ENTRY_GROUP_ID}/entries/{ENTRY_ID}` |
| `name` | string | Output only. The constraint_name of the foreign key, for example, FK_CustomerOrder. |

### `GoogleCloudDatacatalogV1SpannerTableSpecSpannerForeignKeyForeignKeyColumnMapping` fields

| Field | Type | Description |
|---|---|---|
| `column` | string | Output only. The column in the current table that is part of the foreign key. |
| `referenceColumn` | string | Output only. The column in the referenced table that is part of the foreign key. |

### `GoogleCloudDatacatalogV1SpannerTableSpecSpannerPrimaryKey` fields

| Field | Type | Description |
|---|---|---|
| `columns` | `array<string>` | Output only. Column names of the primary key. |

### `GoogleCloudDatacatalogV1SqlDatabaseSystemSpec` fields

| Field | Type | Description |
|---|---|---|
| `databaseVersion` | string | Version of the database engine. |
| `instanceHost` | string | Host of the SQL database enum InstanceHost { UNDEFINED = 0; SELF_HOSTED = 1; CLOUD_SQL = 2; AMAZON_RDS = 3; AZURE_SQL = 4; } Host of the enclousing database instance. |
| `sqlEngine` | string | SQL Database Engine. enum SqlEngine { UNDEFINED = 0; MY_SQL = 1; POSTGRE_SQL = 2; SQL_SERVER = 3; } Engine of the enclosing database instance. |

### `GoogleCloudDatacatalogV1StorageProperties` fields

| Field | Type | Description |
|---|---|---|
| `filePattern` | `array<string>` | Patterns to identify a set of files for this fileset. Examples of a valid `file_pattern`: \* `gs://bucket_name/dir/*`: matches all files in the `bucket_name/dir` directory \* `gs://bucket_name/dir/**`: matches all files in the `bucket_name/dir` and all subdirectories recursively \* `gs://bucket_name/file*`: matches files prefixed by `file` in `bucket_name` \* `gs://bucket_name/??.txt`: matches files with two characters followed by `.txt` in `bucket_name` \* `gs://bucket_name/[aeiou].txt`: matches files that contain a single vowel character followed by `.txt` in `bucket_name` \* `gs://bucket_name/[a-m].txt`: matches files that contain `a`, `b`, ... or `m` followed by `.txt` in `bucket_name` \* `gs://bucket_name/a/*/b`: matches all files in `bucket_name` that match the `a/*/b` pattern, such as `a/c/b`, `a/d/b` \* `gs://another_bucket/a.txt`: matches `gs://another_bucket/a.txt` |
| `fileType` | string | File type in MIME format, for example, `text/plain`. |

### `GoogleCloudDatacatalogV1SystemTimestamps` fields

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Creation timestamp of the resource within the given system. |
| `expireTime` | string (google-datetime) | Output only. Expiration timestamp of the resource within the given system. Currently only applicable to BigQuery resources. |
| `updateTime` | string (google-datetime) | Timestamp of the last modification of the resource or its metadata within a given system. Note: Depending on the source system, not every modification updates this timestamp. For example, BigQuery timestamps every metadata modification but not data or permission changes. |

### `GoogleCloudDatacatalogV1TableSpec` fields

| Field | Type | Description |
|---|---|---|
| `groupedEntry` | string | Output only. If the table is date-sharded, that is, it matches the `[prefix]YYYYMMDD` name pattern, this field is the Data Catalog resource name of the date-sharded grouped entry. For example: `projects/{PROJECT_ID}/locations/{LOCATION}/entrygroups/{ENTRY_GROUP_ID}/entries/{ENTRY_ID}`. Otherwise, `grouped_entry` is empty. |

### `GoogleCloudDatacatalogV1Tag` fields

| Field | Type | Description |
|---|---|---|
| `column` | string | Resources like entry can have schemas associated with them. This scope allows you to attach tags to an individual column based on that schema. To attach a tag to a nested column, separate column names with a dot (`.`). Example: `column.nested_column`. |
| `dataplexTransferStatus` | string enum | Output only. Denotes the transfer status of the Tag Template. Values: `DATAPLEX_TRANSFER_STATUS_UNSPECIFIED`, `MIGRATED`, `TRANSFERRED`. |
| `fields` | `map<string, GoogleCloudDatacatalogV1TagField>` | Required. Maps the ID of a tag field to its value and additional information about that field. Tag template defines valid field IDs. A tag must have at least 1 field and at most 500 fields. |
| `name` | string | Identifier. The resource name of the tag in URL format where tag ID is a system-generated identifier. Note: The tag itself might not be stored in the location specified in its name. |
| `template` | string | Required. The resource name of the tag template this tag uses. Example: `projects/{PROJECT_ID}/locations/{LOCATION}/tagTemplates/{TAG_TEMPLATE_ID}` This field cannot be modified after creation. |
| `templateDisplayName` | string | Output only. The display name of the tag template. |

### `GoogleCloudDatacatalogV1TagField` fields

| Field | Type | Description |
|---|---|---|
| `boolValue` | boolean | The value of a tag field with a boolean type. Mutually exclusive with `doubleValue`, `stringValue`, `timestampValue`, `enumValue`, `richtextValue` (proto `oneof kind`; set at most one; see Notes). |
| `displayName` | string | Output only. The display name of this field. |
| `doubleValue` | number (double) | The value of a tag field with a double type. Mutually exclusive with `stringValue`, `boolValue`, `timestampValue`, `enumValue`, `richtextValue` (proto `oneof kind`; set at most one; see Notes). |
| `enumValue` | GoogleCloudDatacatalogV1TagFieldEnumValue | The value of a tag field with an enum type. This value must be one of the allowed values listed in this enum. Mutually exclusive with `doubleValue`, `stringValue`, `boolValue`, `timestampValue`, `richtextValue` (proto `oneof kind`; set at most one; see Notes). |
| `order` | integer (int32) | Output only. The order of this field with respect to other fields in this tag. Can be set by Tag. For example, a higher value can indicate a more important field. The value can be negative. Multiple fields can have the same order, and field orders within a tag don't have to be sequential. |
| `richtextValue` | string | The value of a tag field with a rich text type. The maximum length is 10 MiB as this value holds HTML descriptions including encoded images. The maximum length of the text without images is 100 KiB. Mutually exclusive with `doubleValue`, `stringValue`, `boolValue`, `timestampValue`, `enumValue` (proto `oneof kind`; set at most one; see Notes). |
| `stringValue` | string | The value of a tag field with a string type. The maximum length is 2000 UTF-8 characters. Mutually exclusive with `doubleValue`, `boolValue`, `timestampValue`, `enumValue`, `richtextValue` (proto `oneof kind`; set at most one; see Notes). |
| `timestampValue` | string (google-datetime) | The value of a tag field with a timestamp type. Mutually exclusive with `doubleValue`, `stringValue`, `boolValue`, `enumValue`, `richtextValue` (proto `oneof kind`; set at most one; see Notes). |

### `GoogleCloudDatacatalogV1TagFieldEnumValue` fields

| Field | Type | Description |
|---|---|---|
| `displayName` | string | The display name of the enum value. |

### `GoogleCloudDatacatalogV1TaggedEntry` fields

| Field | Type | Description |
|---|---|---|
| `absentTags` | `array<GoogleCloudDatacatalogV1Tag>` | Optional. Tags that should be deleted from the Data Catalog. Caller should populate template name and column only. |
| `presentTags` | `array<GoogleCloudDatacatalogV1Tag>` | Optional. Tags that should be ingested into the Data Catalog. Caller should populate template name, column and fields. |
| `v1Entry` | GoogleCloudDatacatalogV1Entry | Non-encrypted Data Catalog v1 Entry. |

### `GoogleCloudDatacatalogV1Taxonomy` fields

| Field | Type | Description |
|---|---|---|
| `activatedPolicyTypes` | `array<string enum>` | Optional. A list of policy types that are activated for this taxonomy. If not set, defaults to an empty list. Values: `POLICY_TYPE_UNSPECIFIED`, `FINE_GRAINED_ACCESS_CONTROL`. |
| `description` | string | Optional. Description of this taxonomy. If not set, defaults to empty. The description must contain only Unicode characters, tabs, newlines, carriage returns, and page breaks, and be at most 2000 bytes long when encoded in UTF-8. |
| `displayName` | string | Required. User-defined name of this taxonomy. The name can't start or end with spaces, must contain only Unicode letters, numbers, underscores, dashes, and spaces, and be at most 200 bytes long when encoded in UTF-8. The taxonomy display name must be unique within an organization. |
| `name` | string | Identifier. Resource name of this taxonomy in URL format. Note: Policy tag manager generates unique taxonomy IDs. |
| `policyTagCount` | integer (int32) | Output only. Number of policy tags in this taxonomy. |
| `service` | GoogleCloudDatacatalogV1TaxonomyService | Output only. Identity of the service which owns the Taxonomy. This field is only populated when the taxonomy is created by a Google Cloud service. Currently only 'DATAPLEX' is supported. |
| `taxonomyTimestamps` | GoogleCloudDatacatalogV1SystemTimestamps | Output only. Creation and modification timestamps of this taxonomy. |

### `GoogleCloudDatacatalogV1TaxonomyService` fields

| Field | Type | Description |
|---|---|---|
| `identity` | string | The service agent for the service. |
| `name` | string enum | The Google Cloud service name. Values: `MANAGING_SYSTEM_UNSPECIFIED`, `MANAGING_SYSTEM_DATAPLEX`, `MANAGING_SYSTEM_OTHER`. |

### `GoogleCloudDatacatalogV1UsageSignal` fields

| Field | Type | Description |
|---|---|---|
| `commonUsageWithinTimeRange` | `map<string, GoogleCloudDatacatalogV1CommonUsageStats>` | Common usage statistics over each of the predefined time ranges. Supported time ranges are `{"24H", "7D", "30D", "Lifetime"}`. |
| `favoriteCount` | string (int64) | Favorite count in the source system. |
| `updateTime` | string (google-datetime) | The end timestamp of the duration of usage statistics. |
| `usageWithinTimeRange` | `map<string, GoogleCloudDatacatalogV1UsageStats>` | Output only. BigQuery usage statistics over each of the predefined time ranges. Supported time ranges are `{"24H", "7D", "30D"}`. |

### `GoogleCloudDatacatalogV1UsageStats` fields

| Field | Type | Description |
|---|---|---|
| `totalCancellations` | number (float) | The number of cancelled attempts to use the underlying entry. |
| `totalCompletions` | number (float) | The number of successful uses of the underlying entry. |
| `totalExecutionTimeForCompletionsMillis` | number (float) | Total time spent only on successful uses, in milliseconds. |
| `totalFailures` | number (float) | The number of failed attempts to use the underlying entry. |

### `GoogleCloudDatacatalogV1VertexDatasetSpec` fields

| Field | Type | Description |
|---|---|---|
| `dataItemCount` | string (int64) | The number of DataItems in this Dataset. Only apply for non-structured Dataset. |
| `dataType` | string enum | Type of the dataset. Values: `DATA_TYPE_UNSPECIFIED`, `TABLE`, `IMAGE`, `TEXT`, `VIDEO`, `CONVERSATION`, `TIME_SERIES`, `DOCUMENT`, `TEXT_TO_SPEECH`, `TRANSLATION`, `STORE_VISION`, `ENTERPRISE_KNOWLEDGE_GRAPH`, `TEXT_PROMPT`. |

### `GoogleCloudDatacatalogV1VertexModelSourceInfo` fields

| Field | Type | Description |
|---|---|---|
| `copy` | boolean | If this Model is copy of another Model. If true then source_type pertains to the original. |
| `sourceType` | string enum | Type of the model source. Values: `MODEL_SOURCE_TYPE_UNSPECIFIED`, `AUTOML`, `CUSTOM`, `BQML`, `MODEL_GARDEN`, `GENIE`, `CUSTOM_TEXT_EMBEDDING`, `MARKETPLACE`. |

### `GoogleCloudDatacatalogV1VertexModelSpec` fields

| Field | Type | Description |
|---|---|---|
| `containerImageUri` | string | URI of the Docker image to be used as the custom container for serving predictions. |
| `versionAliases` | `array<string>` | User provided version aliases so that a model version can be referenced via alias |
| `versionDescription` | string | The description of this version. |
| `versionId` | string | The version ID of the model. |
| `vertexModelSourceInfo` | GoogleCloudDatacatalogV1VertexModelSourceInfo | Source of a Vertex model. |

### `GoogleCloudDatacatalogV1ViewSpec` fields

| Field | Type | Description |
|---|---|---|
| `viewQuery` | string | Output only. The query that defines the table view. |

### `GoogleCloudDatacatalogV1beta1ExportTaxonomiesResponse` fields

| Field | Type | Description |
|---|---|---|
| `taxonomies` | `array<GoogleCloudDatacatalogV1beta1SerializedTaxonomy>` | List of taxonomies and policy tags in a tree structure. |

### `GoogleCloudDatacatalogV1beta1ImportTaxonomiesRequest` fields

| Field | Type | Description |
|---|---|---|
| `inlineSource` | GoogleCloudDatacatalogV1beta1InlineSource | Inline source used for taxonomies to be imported. |

### `GoogleCloudDatacatalogV1beta1ImportTaxonomiesResponse` fields

| Field | Type | Description |
|---|---|---|
| `taxonomies` | `array<GoogleCloudDatacatalogV1beta1Taxonomy>` | Taxonomies that were imported. |

### `GoogleCloudDatacatalogV1beta1InlineSource` fields

| Field | Type | Description |
|---|---|---|
| `taxonomies` | `array<GoogleCloudDatacatalogV1beta1SerializedTaxonomy>` | Required. Taxonomies to be imported. |

### `GoogleCloudDatacatalogV1beta1ListPolicyTagsResponse` fields

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | Token used to retrieve the next page of results, or empty if there are no more results in the list. |
| `policyTags` | `array<GoogleCloudDatacatalogV1beta1PolicyTag>` | The policy tags that are in the requested taxonomy. |

### `GoogleCloudDatacatalogV1beta1ListTaxonomiesResponse` fields

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | Token used to retrieve the next page of results, or empty if there are no more results in the list. |
| `taxonomies` | `array<GoogleCloudDatacatalogV1beta1Taxonomy>` | Taxonomies that the project contains. |

### `GoogleCloudDatacatalogV1beta1PolicyTag` fields

| Field | Type | Description |
|---|---|---|
| `childPolicyTags` | `array<string>` | Output only. Resource names of child policy tags of this policy tag. |
| `description` | string | Description of this policy tag. It must: contain only unicode characters, tabs, newlines, carriage returns and page breaks; and be at most 2000 bytes long when encoded in UTF-8. If not set, defaults to an empty description. If not set, defaults to an empty description. |
| `displayName` | string | Required. User defined name of this policy tag. It must: be unique within the parent taxonomy; contain only unicode letters, numbers, underscores, dashes and spaces; not start or end with spaces; and be at most 200 bytes long when encoded in UTF-8. |
| `name` | string | Identifier. Resource name of this policy tag, whose format is: "projects/{project_number}/locations/{location_id}/taxonomies/{taxonomy_id}/policyTags/{id}". |
| `parentPolicyTag` | string | Resource name of this policy tag's parent policy tag (e.g. for the "LatLong" policy tag in the example above, this field contains the resource name of the "Geolocation" policy tag). If empty, it means this policy tag is a top level policy tag (e.g. this field is empty for the "Geolocation" policy tag in the example above). If not set, defaults to an empty string. |

### `GoogleCloudDatacatalogV1beta1SearchCatalogRequest` fields

| Field | Type | Description |
|---|---|---|
| `orderBy` | string | Specifies the ordering of results, currently supported case-sensitive choices are: \* `relevance`, only supports descending \* `last_modified_timestamp [asc\|desc]`, defaults to descending if not specified \* `default` that can only be descending If not specified, defaults to `relevance` descending. |
| `pageSize` | integer (int32) | Number of results in the search page. If <=0 then defaults to 10. Max limit for page_size is 1000. Throws an invalid argument for page_size > 1000. |
| `pageToken` | string | Optional. Pagination token returned in an earlier SearchCatalogResponse.next_page_token, which indicates that this is a continuation of a prior SearchCatalogRequest call, and that the system should return the next page of data. If empty, the first page is returned. |
| `query` | string | Optional. The query string in search query syntax. An empty query string will result in all data assets (in the specified scope) that the user has access to. Query strings can be simple as "x" or more qualified as: \* name:x \* column:x \* description:y Note: Query tokens need to have a minimum of 3 characters for substring matching to work correctly. See Data Catalog Search Syntax (https://cloud.google.com/data-catalog/docs/how-to/search-reference) for more information. |
| `scope` | GoogleCloudDatacatalogV1beta1SearchCatalogRequestScope | Required. The scope of this search request. A `scope` that has empty `include_org_ids`, `include_project_ids` AND false `include_gcp_public_datasets` is considered invalid. Data Catalog will return an error in such a case. |

### `GoogleCloudDatacatalogV1beta1SearchCatalogRequestScope` fields

| Field | Type | Description |
|---|---|---|
| `includeGcpPublicDatasets` | boolean | If `true`, include Google Cloud public datasets in the search results. Info on Google Cloud public datasets is available at https://cloud.google.com/public-datasets/. By default, Google Cloud public datasets are excluded. |
| `includeOrgIds` | `array<string>` | The list of organization IDs to search within. To find your organization ID, follow instructions in https://cloud.google.com/resource-manager/docs/creating-managing-organization. |
| `includeProjectIds` | `array<string>` | The list of project IDs to search within. To learn more about the distinction between project names/IDs/numbers, go to https://cloud.google.com/docs/overview/#projects. |
| `restrictedLocations` | `array<string>` | Optional. The list of locations to search within. 1. If empty, search will be performed in all locations; 2. If any of the locations are NOT in the valid locations list, error will be returned; 3. Otherwise, search only the given locations for matching results. Typical usage is to leave this field empty. When a location is unreachable as returned in the `SearchCatalogResponse.unreachable` field, users can repeat the search request with this parameter set to get additional information on the error. Valid locations: \* asia-east1 \* asia-east2 \* asia-northeast1 \* asia-northeast2 \* asia-northeast3 \* asia-south1 \* asia-southeast1 \* australia-southeast1 \* eu \* europe-north1 \* europe-west1 \* europe-west2 \* europe-west3 \* europe-west4 \* europe-west6 \* global \* northamerica-northeast1 \* southamerica-east1 \* us \* us-central1 \* us-east1 \* us-east4 \* us-west1 \* us-west2 |

### `GoogleCloudDatacatalogV1beta1SearchCatalogResponse` fields

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | The token that can be used to retrieve the next page of results. |
| `results` | `array<GoogleCloudDatacatalogV1beta1SearchCatalogResult>` | Search results. |
| `totalSize` | integer (int32) | The approximate total number of entries matched by the query. |
| `unreachable` | `array<string>` | Unreachable locations. Search result does not include data from those locations. Users can get additional information on the error by repeating the search request with a more restrictive parameter -- setting the value for `SearchDataCatalogRequest.scope.restricted_locations`. |

### `GoogleCloudDatacatalogV1beta1SearchCatalogResult` fields

| Field | Type | Description |
|---|---|---|
| `linkedResource` | string | The full name of the cloud resource the entry belongs to. See: https://cloud.google.com/apis/design/resource_names#full_resource_name. Example: \* `//bigquery.googleapis.com/projects/projectId/datasets/datasetId/tables/tableId` |
| `modifyTime` | string (google-datetime) | Last-modified timestamp of the entry from the managing system. |
| `relativeResourceName` | string | The relative resource name of the resource in URL format. Examples: \* `projects/{project_id}/locations/{location_id}/entryGroups/{entry_group_id}/entries/{entry_id}` \* `projects/{project_id}/tagTemplates/{tag_template_id}` |
| `searchResultSubtype` | string | Sub-type of the search result. This is a dot-delimited description of the resource's full type, and is the same as the value callers would provide in the "type" search facet. Examples: `entry.table`, `entry.dataStream`, `tagTemplate`. |
| `searchResultType` | string enum | Type of the search result. This field can be used to determine which Get method to call to fetch the full resource. Values: `SEARCH_RESULT_TYPE_UNSPECIFIED`, `ENTRY`, `TAG_TEMPLATE`, `ENTRY_GROUP`. |

### `GoogleCloudDatacatalogV1beta1SerializedPolicyTag` fields

| Field | Type | Description |
|---|---|---|
| `childPolicyTags` | `array<GoogleCloudDatacatalogV1beta1SerializedPolicyTag>` | Children of the policy tag if any. |
| `description` | string | Description of the serialized policy tag. The length of the description is limited to 2000 bytes when encoded in UTF-8. If not set, defaults to an empty description. |
| `displayName` | string | Required. Display name of the policy tag. Max 200 bytes when encoded in UTF-8. |
| `policyTag` | string | Resource name of the policy tag. This field will be ignored when calling ImportTaxonomies. |

### `GoogleCloudDatacatalogV1beta1SerializedTaxonomy` fields

| Field | Type | Description |
|---|---|---|
| `activatedPolicyTypes` | `array<string enum>` | A list of policy types that are activated for a taxonomy. Values: `POLICY_TYPE_UNSPECIFIED`, `FINE_GRAINED_ACCESS_CONTROL`. |
| `description` | string | Description of the serialized taxonomy. The length of the description is limited to 2000 bytes when encoded in UTF-8. If not set, defaults to an empty description. |
| `displayName` | string | Required. Display name of the taxonomy. Max 200 bytes when encoded in UTF-8. |
| `policyTags` | `array<GoogleCloudDatacatalogV1beta1SerializedPolicyTag>` | Top level policy tags associated with the taxonomy if any. |

### `GoogleCloudDatacatalogV1beta1SystemTimestamps` fields

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | The creation time of the resource within the given system. |
| `expireTime` | string (google-datetime) | Output only. The expiration time of the resource within the given system. Currently only apllicable to BigQuery resources. |
| `updateTime` | string (google-datetime) | The last-modified time of the resource within the given system. |

### `GoogleCloudDatacatalogV1beta1Taxonomy` fields

| Field | Type | Description |
|---|---|---|
| `activatedPolicyTypes` | `array<string enum>` | Optional. A list of policy types that are activated for this taxonomy. If not set, defaults to an empty list. Values: `POLICY_TYPE_UNSPECIFIED`, `FINE_GRAINED_ACCESS_CONTROL`. |
| `description` | string | Optional. Description of this taxonomy. It must: contain only unicode characters, tabs, newlines, carriage returns and page breaks; and be at most 2000 bytes long when encoded in UTF-8. If not set, defaults to an empty description. |
| `displayName` | string | Required. User defined name of this taxonomy. It must: contain only unicode letters, numbers, underscores, dashes and spaces; not start or end with spaces; and be at most 200 bytes long when encoded in UTF-8. The taxonomy display name must be unique within an organization. |
| `name` | string | Identifier. Resource name of this taxonomy, whose format is: "projects/{project_number}/locations/{location_id}/taxonomies/{id}". |
| `policyTagCount` | integer (int32) | Output only. Number of policy tags contained in this taxonomy. |
| `service` | GoogleCloudDatacatalogV1beta1TaxonomyService | Output only. Identity of the service which owns the Taxonomy. This field is only populated when the taxonomy is created by a Google Cloud service. Currently only 'DATAPLEX' is supported. |
| `taxonomyTimestamps` | GoogleCloudDatacatalogV1beta1SystemTimestamps | Output only. Timestamps about this taxonomy. Only create_time and update_time are used. |

### `GoogleCloudDatacatalogV1beta1TaxonomyService` fields

| Field | Type | Description |
|---|---|---|
| `identity` | string | The service agent for the service. |
| `name` | string enum | The Google Cloud service name. Values: `MANAGING_SYSTEM_UNSPECIFIED`, `MANAGING_SYSTEM_DATAPLEX`, `MANAGING_SYSTEM_OTHER`. |

### `ListOperationsResponse` fields

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | The standard List next-page token. |
| `operations` | `array<Operation>` | A list of operations that matches the specified filter in the request. |
| `unreachable` | `array<string>` | Unordered list. Unreachable resources. Populated when the request sets `ListOperationsRequest.return_partial_success` and reads across collections. For example, when attempting to list all resources across all supported locations. |

### `Operation` fields

| Field | Type | Description |
|---|---|---|
| `done` | boolean | If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. |
| `error` | Status | The error result of the operation in case of failure or cancellation. |
| `metadata` | `map<string, any>` | Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. |
| `name` | string | The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. |
| `response` | `map<string, any>` | The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. |

### `Policy` fields

| Field | Type | Description |
|---|---|---|
| `bindings` | `array<Binding>` | Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal. The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`. |
| `etag` | string (byte) | `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy. \*\*Important:\*\* If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. |
| `version` | integer (int32) | Specifies the format of the policy. Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected. Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations: \* Getting a policy that includes a conditional role binding \* Adding a conditional role binding to a policy \* Changing a conditional role binding in a policy \* Removing any role binding, with or without a condition, from a policy that includes conditions \*\*Important:\*\* If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `SetIamPolicyRequest` fields

| Field | Type | Description |
|---|---|---|
| `policy` | Policy | REQUIRED: The complete policy to be applied to the `resource`. The size of the policy is limited to a few 10s of KB. An empty policy is a valid policy but certain Google Cloud services (such as Projects) might reject them. |

### `Status` fields

| Field | Type | Description |
|---|---|---|
| `code` | integer (int32) | The status code, which should be an enum value of google.rpc.Code. |
| `details` | `array<map<string, any>>` | A list of messages that carry the error details. There is a common set of message types for APIs to use. |
| `message` | string | A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. |

### `TestIamPermissionsRequest` fields

| Field | Type | Description |
|---|---|---|
| `permissions` | `array<string>` | The set of permissions to check for the `resource`. Permissions with wildcards (such as `*` or `storage.*`) are not allowed. For more information see IAM Overview (https://cloud.google.com/iam/docs/overview#permissions). |

### `TestIamPermissionsResponse` fields

| Field | Type | Description |
|---|---|---|
| `permissions` | `array<string>` | A subset of `TestIamPermissionsRequest.permissions` that the caller is allowed (request type name corrected; see Notes). |

## Notes

- Generated from the Discovery document(s) v1, v1beta1 of `datacatalog` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Adapted (not in the official docs): the example `Binding` value is not generated with an empty `role` and `members` (the Discovery `Policy.bindings` description says that each binding must contain at least one principal); it uses the `viewer` role of this service from the IAM roles reference (https://docs.cloud.google.com/iam/docs/roles-permissions, see `references/iam/`), or the basic Viewer role when the service has none, and one placeholder principal.
- Corrected from the Discovery document: the JSON example in the `Policy` description (the `google.iam.v1` text shared by the IAM methods) has a trailing comma after the `condition.expression` value (`"expression": "request.time < timestamp('2020-10-01T00:00:00.000Z')", } }`), which is not valid JSON; the same comma is in the proto comment. This page shows the example as a JSON block without that comma. The Discovery text of the YAML example has lost its line breaks and indentation, so the YAML block is taken from the proto comment (`google/iam/v1/policy.proto`, https://github.com/googleapis/googleapis/blob/5ce024537af135bb2a0d3228072dd660047956aa/google/iam/v1/policy.proto, commit `5ce0245`, retrieved 2026-11-21).
- Deprecated (partly): the Data Catalog deprecations page lists Data Catalog with deprecated date "February 3, 2025" and shutdown date "June 1, 2026", and says "This deprecation applies to Data Catalog metadata search and cataloging features (such as custom entries, entry groups, and tag templates). The Policy Tag Manager service (taxonomies and policy tags), which is used for column-level access control and dynamic data masking in BigQuery, isn't deprecated and continues to be served under the `datacatalog.googleapis.com` API endpoint. The `datacatalog.googleapis.com` API must remain enabled for projects that use BigQuery policy tags."; for metadata search and cataloging it points to Knowledge Catalog (https://docs.cloud.google.com/dataplex/docs/transition-to-dataplex-catalog) (https://docs.cloud.google.com/data-catalog/docs/deprecations, retrieved 2026-11-19). The Discovery documents used here (`datacatalog` v1 and v1beta1, retrieved 2026-11-14) contain `catalog.search`, the organization and project config methods, the v1 long-running operations and the Policy Tag Manager methods (taxonomies, policy tags); they contain no entry group, entry, tag or tag template methods, so this skill does not list those (they belong to the shut-down cataloging features).
- Corrected from the source proto: the `email` formats of `GoogleCloudDatacatalogV1ContactsPerson` lost their angle-bracket parts in the Discovery document (the second format is empty and the third is shown as `John Doe`); the proto comment reads "Email of the person in the format of `john.doe@xyz`, `<john.doe@xyz>`, or `John Doe<john.doe@xyz>`." (`google/cloud/datacatalog/v1/datacatalog.proto`, https://github.com/googleapis/googleapis/blob/5ce024537af135bb2a0d3228072dd660047956aa/google/cloud/datacatalog/v1/datacatalog.proto, commit `5ce0245`, retrieved 2026-11-19).
- Adapted from the Discovery document: the `type` description of `GoogleCloudDatacatalogV1Entry` reads "The type of the entry. For details, see `EntryType`." with a link to the `entrytype` anchor of the official REST reference page; that anchor does not exist on this page, so the cell refers to the enum values listed in the same cell.
- Corrected from the Discovery document: the `TestIamPermissionsResponse.permissions` description reads "A subset of `TestPermissionsRequest.permissions` that the caller is allowed."; the same text is in the `google.iam.v1` proto, where the request message of `TestIamPermissions` is `TestIamPermissionsRequest` (`google/iam/v1/iam_policy.proto`, https://github.com/googleapis/googleapis/blob/5ce024537af135bb2a0d3228072dd660047956aa/google/iam/v1/iam_policy.proto, commit `5ce0245`, retrieved 2026-11-21).
- Descriptions not marked as corrected are verbatim from Discovery, which drops angle-bracket placeholders of the source comments (on this page: `GoogleCloudDatacatalogV1Entry.fullyQualifiedName`): a format such as `projects//locations/global` stands for `projects/{project}/locations/global` (likewise `"@.iam.gserviceaccount.com"` lost the account ID before `@`, and a name format ending in a collection such as `projects/*/locations/*/registrations/` lost its last ID), and an expression such as `... && in labels` lost its left operand (for example `'label_value' in labels`). Check the method or field in the product's REST reference before relying on such a format.
- Deprecated: `GoogleCloudDatacatalogV1SearchCatalogRequestScope.includePublicTagTemplates` (v1) (`deprecated: true` in the Discovery document and its description). The Discovery document states no replacement.
- Mutually exclusive fields of `GoogleCloudDatacatalogV1BigQueryTableSpec`: `viewSpec`, `tableSpec` are the members of `oneof type_spec` in the proto (`google/cloud/datacatalog/v1/table_spec.proto`, https://github.com/googleapis/googleapis/blob/5ce024537af135bb2a0d3228072dd660047956aa/google/cloud/datacatalog/v1/table_spec.proto, commit `5ce0245`), so a message sets at most one of them. The Discovery document has no notation for `oneof` and lists them as independent fields.
- Mutually exclusive fields of `GoogleCloudDatacatalogV1DatabaseTableSpecDatabaseViewSpec`: `baseTable`, `sqlQuery` are the members of `oneof source_definition` in the proto (`google/cloud/datacatalog/v1/datacatalog.proto`, https://github.com/googleapis/googleapis/blob/5ce024537af135bb2a0d3228072dd660047956aa/google/cloud/datacatalog/v1/datacatalog.proto, commit `5ce0245`), so a message sets at most one of them. The Discovery document has no notation for `oneof` and lists them as independent fields.
- Mutually exclusive fields of `GoogleCloudDatacatalogV1Entry`: `type`, `userSpecifiedType` are the members of `oneof entry_type` in the proto (`google/cloud/datacatalog/v1/datacatalog.proto`, https://github.com/googleapis/googleapis/blob/5ce024537af135bb2a0d3228072dd660047956aa/google/cloud/datacatalog/v1/datacatalog.proto, commit `5ce0245`), so a message sets at most one of them. The Discovery document has no notation for `oneof` and lists them as independent fields.
- Mutually exclusive fields of `GoogleCloudDatacatalogV1Entry`: `integratedSystem`, `userSpecifiedSystem` are the members of `oneof system` in the proto (`google/cloud/datacatalog/v1/datacatalog.proto`, https://github.com/googleapis/googleapis/blob/5ce024537af135bb2a0d3228072dd660047956aa/google/cloud/datacatalog/v1/datacatalog.proto, commit `5ce0245`), so a message sets at most one of them. The Discovery document has no notation for `oneof` and lists them as independent fields.
- Mutually exclusive fields of `GoogleCloudDatacatalogV1Entry`: `sqlDatabaseSystemSpec`, `lookerSystemSpec`, `cloudBigtableSystemSpec` are the members of `oneof system_spec` in the proto (`google/cloud/datacatalog/v1/datacatalog.proto`, https://github.com/googleapis/googleapis/blob/5ce024537af135bb2a0d3228072dd660047956aa/google/cloud/datacatalog/v1/datacatalog.proto, commit `5ce0245`), so a message sets at most one of them. The Discovery document has no notation for `oneof` and lists them as independent fields.
- Mutually exclusive fields of `GoogleCloudDatacatalogV1Entry`: `gcsFilesetSpec`, `bigqueryTableSpec`, `bigqueryDateShardedSpec` are the members of `oneof type_spec` in the proto (`google/cloud/datacatalog/v1/datacatalog.proto`, https://github.com/googleapis/googleapis/blob/5ce024537af135bb2a0d3228072dd660047956aa/google/cloud/datacatalog/v1/datacatalog.proto, commit `5ce0245`), so a message sets at most one of them. The Discovery document has no notation for `oneof` and lists them as independent fields.
- Mutually exclusive fields of `GoogleCloudDatacatalogV1Entry`: `databaseTableSpec`, `dataSourceConnectionSpec`, `routineSpec`, `datasetSpec`, `filesetSpec`, `serviceSpec`, `modelSpec`, `featureOnlineStoreSpec` are the members of `oneof spec` in the proto (`google/cloud/datacatalog/v1/datacatalog.proto`, https://github.com/googleapis/googleapis/blob/5ce024537af135bb2a0d3228072dd660047956aa/google/cloud/datacatalog/v1/datacatalog.proto, commit `5ce0245`), so a message sets at most one of them. The Discovery document has no notation for `oneof` and lists them as independent fields.
- Mutually exclusive fields of `GoogleCloudDatacatalogV1ImportTaxonomiesRequest`: `inlineSource`, `crossRegionalSource` are the members of `oneof source` in the proto (`google/cloud/datacatalog/v1/policytagmanagerserialization.proto`, https://github.com/googleapis/googleapis/blob/5ce024537af135bb2a0d3228072dd660047956aa/google/cloud/datacatalog/v1/policytagmanagerserialization.proto, commit `5ce0245`), so a message sets at most one of them. The Discovery document has no notation for `oneof` and lists them as independent fields.
- Mutually exclusive fields of `GoogleCloudDatacatalogV1PhysicalSchema`: `avro`, `thrift`, `protobuf`, `parquet`, `orc`, `csv` are the members of `oneof schema` in the proto (`google/cloud/datacatalog/v1/physical_schema.proto`, https://github.com/googleapis/googleapis/blob/5ce024537af135bb2a0d3228072dd660047956aa/google/cloud/datacatalog/v1/physical_schema.proto, commit `5ce0245`), so a message sets at most one of them. The Discovery document has no notation for `oneof` and lists them as independent fields.
- Mutually exclusive fields of `GoogleCloudDatacatalogV1SearchCatalogResult`: `integratedSystem`, `userSpecifiedSystem` are the members of `oneof system` in the proto (`google/cloud/datacatalog/v1/search.proto`, https://github.com/googleapis/googleapis/blob/5ce024537af135bb2a0d3228072dd660047956aa/google/cloud/datacatalog/v1/search.proto, commit `5ce0245`), so a message sets at most one of them. The Discovery document has no notation for `oneof` and lists them as independent fields.
- Mutually exclusive fields of `GoogleCloudDatacatalogV1SetConfigRequest`: `tagTemplateMigration`, `catalogUiExperience` are the members of `oneof configuration` in the proto (`google/cloud/datacatalog/v1/datacatalog.proto`, https://github.com/googleapis/googleapis/blob/5ce024537af135bb2a0d3228072dd660047956aa/google/cloud/datacatalog/v1/datacatalog.proto, commit `5ce0245`), so a message sets at most one of them. The Discovery document has no notation for `oneof` and lists them as independent fields.
- Mutually exclusive fields of `GoogleCloudDatacatalogV1TagField`: `doubleValue`, `stringValue`, `boolValue`, `timestampValue`, `enumValue`, `richtextValue` are the members of `oneof kind` in the proto (`google/cloud/datacatalog/v1/tags.proto`, https://github.com/googleapis/googleapis/blob/5ce024537af135bb2a0d3228072dd660047956aa/google/cloud/datacatalog/v1/tags.proto, commit `5ce0245`), so a message sets at most one of them. The Discovery document has no notation for `oneof` and lists them as independent fields.
- Source: https://datacatalog.googleapis.com/$discovery/rest?version=v1, https://datacatalog.googleapis.com/$discovery/rest?version=v1beta1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
