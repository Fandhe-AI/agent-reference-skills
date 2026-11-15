---
source: https://databasecenter.googleapis.com/$discovery/rest?version=v1beta
---

# Database Center API message schemas (databasecenter)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/databasecenter/`.

### `AdditionalDetail`

- Details related to signal.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `automatedBackupPolicyInfo` | AutomatedBackupPolicyInfo | Automated backup policy information applies to signals with type SIGNAL_TYPE_NO_AUTOMATED_BACKUP_POLICY. |
| `backupRunInfo` | BackupRunInfo | Backup run information applies to signals with types SIGNAL_TYPE_LAST_BACKUP_FAILED and SIGNAL_TYPE_LAST_BACKUP_OLD. |
| `deletionProtectionInfo` | DeletionProtectionInfo | Deletion protection information applies to signals with type SIGNAL_TYPE_NO_DELETION_PROTECTION |
| `inefficientQueryInfo` | InefficientQueryInfo | Inefficient query information applies to signals with type SIGNAL_TYPE_INEFFICIENT_QUERY. |
| `maintenanceRecommendationInfo` | MaintenanceRecommendationInfo | Maintenance recommendation information applies to signals with type SIGNAL_TYPE_RECOMMENDED_MAINTENANCE_POLICIES. |
| `outdatedMinorVersionInfo` | OutdatedMinorVersionInfo | Outdated minor version information applies to signals with type SIGNAL_TYPE_OUTDATED_MINOR_VERSION. |
| `recommendationInfo` | RecommendationInfo | Recommendation information applies to recommendations. |
| `resourceSuspensionInfo` | ResourceSuspensionInfo | Resource suspension information applies to signals with type SIGNAL_TYPE_RESOURCE_SUSPENDED. |
| `sccInfo` | SCCInfo | SCC information applies to SCC signals. |
| `shortBackupRetentionInfo` | RetentionSettingsInfo | Short backup retention information applies to signals with type SIGNAL_TYPE_SHORT_BACKUP_RETENTION. |
| `signalEventTime` | string (google-datetime) | Event time when signal was recorded by source service. |
| `signalSource` | string enum | Where the signal is coming from. |
| `signalType` | string enum | Type of the signal. |

### `Affiliation`

- Affiliation information of a resource
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `fullResourceName` | string | Optional. Full resource name |
| `lineages` | array<Lineage> | Optional. Multiple lineages can be created from a resource. For example, a resource can be replicated to multiple target resources. In this case, there will be multiple lineages for the resource, one for each target resource. |
| `resourceId` | string | Optional. resource id of affiliated resource |

### `AggregateFleetResponse`

- The response message to aggregate a fleet by some group by fields.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token that can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |
| `resourceGroupsTotalCount` | integer (int32) | Count of all resource groups in the fleet. This includes counts from all pages. |
| `resourceTotalCount` | integer (int32) | Count of all resources in the fleet. This includes counts from all pages. |
| `rows` | array<AggregateFleetRow> | Represents a row grouped by the fields in the input. |
| `totalSize` | string (int64) | Output only. The total number of rows in the entire list. |
| `unreachable` | array<string> | Unordered list. List of unreachable regions from where data could not be retrieved. |

### `AggregateFleetRow`

- Individual row grouped by a particular dimension.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `deltaDetails` | DeltaDetails | Optional. Delta counts and details of resources which were added to/deleted from fleet. |
| `dimension` | array<Dimension> | Group by dimension. |
| `resourceGroupsCount` | integer (int32) | Number of resource groups that have a particular dimension. |
| `resourcesCount` | integer (int32) | Number of resources that have a particular dimension. |

### `AggregateIssueStatsRequest`

- AggregateIssueStatsRequest represents the input to the AggregateIssueStats method.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `baselineDate` | Date | Optional. The baseline date w.r.t. which the delta counts are calculated. If not set, delta counts are not included in the response and the response indicates the current state of the fleet. |
| `filter` | string | Optional. The expression to filter resources. Supported fields are: `full_resource_name`, `resource_type`, `container`, `product.type`, `product.engine`, `product.version`, `location`, `labels`, `issues`, fields of availability_info, data_protection_info,'resource_name', etc. The expression is a list of zero or more restrictions combined via logical operators `AND` and `OR`. When `AND` and `OR` are both used in the expression, parentheses must be appropriately used to group the combinations. Example: `location="us-east1"` Example: `container="projects/123" OR container="projects/456"` Example: `(container="projects/123" OR container="projects/456") AND location="us-east1"` |
| `parent` | string | Required. Parent can be a project, a folder, or an organization. The search is limited to the resources within the `scope`. The allowed values are: \* projects/{PROJECT_ID} (e.g., "projects/foo-bar") \* projects/{PROJECT_NUMBER} (e.g., "projects/12345678") \* folders/{FOLDER_NUMBER} (e.g., "folders/1234567") \* organizations/{ORGANIZATION_NUMBER} (e.g., "organizations/123456") |
| `signalTypeGroups` | array<SignalTypeGroup> | Optional. Lists of signal types that are issues. |

### `AggregateIssueStatsResponse`

- The response message containing one of more group of relevant health issues for database resources.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `issueGroupStats` | array<IssueGroupStats> | List of issue group stats where each group contains stats for resources having a particular combination of relevant issues. |
| `totalResourceGroupsCount` | integer (int32) | Total count of the resource filtered in based on the user given filter. |
| `totalResourcesCount` | integer (int32) | Total count of the resources filtered in based on the user given filter. |
| `unreachable` | array<string> | Unordered list. List of unreachable regions from where data could not be retrieved. |

### `AggregateQueryStatsRequest`

- AggregateQueryStatsRequest represents the input to the AggregateQueryStats method.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `filter` | string | Optional. The expression to filter resources. Supported fields are: `full_resource_name`, `resource_type`, `container`, `product.type`, `product.engine`, `product.version`, `location`, `labels`, `issues`, fields of availability_info, data_protection_info,'resource_name', etc. The expression is a list of zero or more restrictions combined via logical operators `AND` and `OR`. When `AND` and `OR` are both used in the expression, parentheses must be appropriately used to group the combinations. Example: `location="us-east1"` Example: `container="projects/123" OR container="projects/456"` Example: `(container="projects/123" OR container="projects/456") AND location="us-east1"` Additional specific fields for query stats are: `metric_window`, `query_hash`, `normalized_query`. Example: `metric_window="LAST_ONE_DAY"` (Possible values for `metric_window` are: `LAST_ONE_DAY`, `LAST_ONE_WEEK`, `LAST_TWO_WEEKS`) Example: `query_hash="12345678"` Example: `normalized_query="SELECT * FROM table"` |
| `orderBy` | string | Optional. The expression to order the results by. Example: `order_by="execution_count"` Example: `order_by="execution_count desc"` Supported order by fields are `execution_count`, `rows_processed`, `total_cpu_time`, `avg_cpu_time`. |
| `pageSize` | integer (int32) | Optional. If unspecified, at most 100 query stats will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. |
| `pageToken` | string | Optional. A page token, received from a previous `AggregateQueryStatsRequest` call. Provide this to retrieve the subsequent page. All parameters except page_token should match the parameters in the call that provided the page token. |

### `AggregateQueryStatsResponse`

- The response message containing relevant query stats for database resources.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token that can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |
| `queryStats` | array<QueryStatsInfo> | List of query stats where each group contains stats for resources having a particular combination of relevant query stats. |
| `unreachable` | array<string> | Unordered list. List of unreachable regions from where data could not be retrieved. |

### `AutomatedBackupPolicyInfo`

- Automated backup policy signal info
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `isEnabled` | boolean | Is automated policy enabled. |
| `subResource` | SubResource | Optional. Sub resource details associated with the signal. |

### `BackupDRConfig`

- BackupDRConfig to capture the backup and disaster recovery details of database resource.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `backupdrManaged` | boolean | Indicates if the resource is managed by BackupDR. |

### `BackupRunInfo`

- Metadata about latest backup run state for a database resource.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `endTime` | string (google-datetime) | The time the backup operation completed. |
| `errorMessage` | string | Additional information about the error encountered. |
| `operationErrorType` | string enum | Optional. OperationErrorType to expose specific error when backup operation of database resource failed, that is state is FAILED. |
| `startTime` | string (google-datetime) | The time the backup operation started. |
| `state` | string enum | Output only. The state of this run. |
| `subResource` | SubResource | Optional. Sub resource details associated with the backup run. |

### `DatabaseResource`

- DatabaseResource represents every individually configured database unit representing compute and/or storage.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `affiliations` | array<Affiliation> | Optional. Affiliation details of the resource. |
| `backupdrConfig` | BackupDRConfig | Optional. Backup and disaster recovery details for the resource. |
| `childResources` | array<DatabaseResource> | List of children associated with a database group. |
| `container` | string | Specifies where the resource is created. For Google Cloud resources, it is the full name of the project. |
| `edition` | string enum | The edition of the resource. |
| `fullResourceName` | string | The full resource name, based on CAIS resource name format https://cloud.google.com/asset-inventory/docs/resource-name-format Example: `//cloudsql.googleapis.com/projects/project-number/instances/mysql-1` `//cloudsql.googleapis.com/projects/project-number/instances/postgres-1` `//spanner.googleapis.com/projects/project-number/instances/spanner-instance-1` `//alloydb.googleapis.com/projects/project-number/locations/us-central1/clusters/c1` `//alloydb.googleapis.com/projects/project-number/locations/us-central1/clusters/c1/instances/i1` |
| `labels` | array<Label> | Labels applied on the resource. The requirements for labels assigned to Google Cloud resources may be found at https://cloud.google.com/resource-manager/docs/labels-overview#requirements |
| `location` | string | The location of the resources. It supports returning only regional locations in Google Cloud. These are of the form: "us-central1", "us-east1", etc. See https://cloud.google.com/about/locations for a list of such regions. |
| `machineConfig` | MachineConfig | Machine configuration like CPU, memory, etc for the resource. |
| `maintenanceInfo` | MaintenanceInfo | Optional. The maintenance information of the resource. |
| `metrics` | Metrics | Observable metrics for the resource e.g. CPU utilization, memory utilization, etc. |
| `product` | Product | The product this resource represents. |
| `resourceCategory` | string enum | The category of the resource. |
| `resourceName` | string | The name of the resource(The last part of the full resource name). Example: For full resource name - `//cloudsql.googleapis.com/projects/project-number/instances/mysql-1`, resource name - `mysql-1` For full resource name - `//cloudsql.googleapis.com/projects/project-number/instances/postgres-1` , resource name - `postgres-1` Note: In some cases, there might be more than one resource with the same resource name. |
| `resourceType` | string | The type of resource defined according to the pattern: {Service Name}/{Type}. Ex: sqladmin.googleapis.com/Instance alloydb.googleapis.com/Cluster alloydb.googleapis.com/Instance spanner.googleapis.com/Instance |
| `signalGroups` | array<SignalGroup> | The list of signal groups and count of issues related to the resource. Only those signals which have been requested would be included. |
| `subResourceType` | string enum | Subtype of the resource specified at creation time. |
| `tags` | array<Tag> | Tags applied on the resource. The requirements for tags assigned to Google Cloud resources may be found at https://cloud.google.com/resource-manager/docs/tags/tags-overview |

### `DatabaseResourceGroup`

- DatabaseResourceGroup represents all resources that serve a common data set. It is considered notionally as a single entity, powered by any number of units of compute and storage.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `rootResources` | array<DatabaseResource> | A database resource that serves as a root of the group of database resources. It is repeated just in case we have the concept of multiple roots in the future, however, it will only be populated with a single value for now. |
| `signalGroups` | array<IssueCount> | The filtered signal groups and the count of issues associated with the resources that have been filtered in. |

### `DatabaseResourceIssue`

- DatabaseResource and Issue associated with it.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `resource` | DatabaseResource | Resource associated with the issue. |
| `signal` | Signal | Signal associated with the issue. |

### `Date`

- Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: \* A full date, with non-zero year, month, and day values. \* A month and day, with a zero year (for example, an anniversary). \* A year on its own, with a zero month and a zero day. \* A year and month, with a zero day (for example, a credit card expiration date). Related types: \* google.type.TimeOfDay \* google.type.DateTime \* google.protobuf.Timestamp
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `day` | integer (int32) | Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant. |
| `month` | integer (int32) | Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day. |
| `year` | integer (int32) | Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year. |

### `DeletionProtectionInfo`

- Deletion protection signal info for a database resource.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `deletionProtectionEnabled` | boolean | Is deletion protection enabled. |
| `subResource` | SubResource | Optional. Sub resource details associated with the signal. |

### `DeltaDetails`

- Captures the details of items that have increased or decreased in some bucket when compared to some point in history. It is currently used to capture the delta of resources that have been added or removed in the fleet as well as to capture the resources that have a change in Issue/Signal status.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `decreasedResources` | array<ResourceDetails> | Details of resources that have decreased. |
| `increasedResources` | array<ResourceDetails> | Details of resources that have increased. |

### `Dimension`

- Dimension used to aggregate the fleet.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `container` | string | Specifies where the resource is created. For Google Cloud resources, it is the full name of the project. |
| `edition` | string enum | The edition of the resource. |
| `hasDenyMaintenanceSchedules` | boolean | Whether the resource has deny maintenance schedules. |
| `hasMaintenanceSchedule` | boolean | Whether the resource has a maintenance schedule. |
| `labelKey` | string | Label key of the resource. |
| `labelSource` | string | Label source of the resource. |
| `labelValue` | string | Label value of the resource. |
| `location` | string | The location of the resources. It supports returning only regional locations in Google Cloud. |
| `managementType` | string enum | The management type of the resource. |
| `productEngine` | string enum | Engine refers to underlying database binary running in an instance. |
| `productType` | string enum | Type to identify a product |
| `productVersion` | string | Version of the underlying database engine |
| `resourceCategory` | string enum | The category of the resource. |
| `resourceType` | string | The type of resource defined according to the pattern: {Service Name}/{Type}. Ex: sqladmin.googleapis.com/Instance alloydb.googleapis.com/Cluster alloydb.googleapis.com/Instance spanner.googleapis.com/Instance |
| `subResourceType` | string enum | Subtype of the resource specified at creation time. |
| `tagInherited` | boolean | Tag inheritance value of the resource. |
| `tagKey` | string | Tag key of the resource. |
| `tagSource` | string | Tag source of the resource. |
| `tagValue` | string | Tag value of the resource. |

### `InefficientQueryInfo`

- Metadata about inefficient query signal info for a database resource.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `database` | string | Name of the database where index is required. For example, "db1", which is the name of the database present in the instance. |
| `impactedQueriesCount` | string (int64) | Count of queries to be impacted if index is applied |
| `sqlIndexStatement` | string | SQL statement of the index. Based on the ddl type, this will be either CREATE INDEX or DROP INDEX. |
| `storageCostBytes` | string (int64) | Cost of additional disk usage in bytes |
| `table` | string | Name of the table where index is required |

### `IssueCount`

- Count of issues for a group of signals.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `displayName` | string | Title of a signal group corresponding to the request. |
| `issueCount` | integer (int32) | The count of the number of issues associated with those resources that are explicitly filtered in by the filters present in the request. A signal is an issue when its SignalStatus field is set to SIGNAL_STATUS_ISSUE. |

### `IssueGroupStats`

- IssueGroupStats refers to stats for a particulare combination of relevant health issues of database resources.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `displayName` | string | Database resource level health card name. This will corresponds to one of the requested input group names. |
| `healthyResourceGroupsCount` | integer (int32) | The number of resource groups from the total groups as defined above that are healthy with respect to all of the specified issues. |
| `healthyResourcesCount` | integer (int32) | The number of resources from the total defined above in field total_resources_count that are healthy with respect to all of the specified issues. |
| `issueStats` | array<IssueStats> | List of issues stats containing count of resources having particular issue category. |
| `resourceGroupsCount` | integer (int32) | Total count of the groups of resources returned by the filter that also have one or more resources for which any of the specified issues are applicable. |
| `resourcesCount` | integer (int32) | Total count of resources returned by the filter for which any of the specified issues are applicable. |

### `IssueStats`

- IssueStats holds stats for a particular signal category.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `deltaDetails` | DeltaDetails | Optional. Delta counts and details of resources for which issue was raised or fixed. |
| `issueSeverity` | string enum | Severity of the issue. |
| `resourceCount` | integer (int32) | Number of resources having issues of a given type. |
| `signalType` | string enum | Type of signal which is an issue. |

### `Label`

- Label is a key value pair applied to a resource.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `key` | string | The key part of the label. |
| `source` | string | The source of the Label. Source is empty if the label is directly attached to the resource and not inherited. |
| `value` | string | The value part of the label. |

### `Lineage`

- lineage information of the affiliated resources This captures source, target and process which created the lineage.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `processFqn` | string | Optional. FQN of process which created the lineage i.e. dataplex, datastream etc. |
| `processType` | string enum | Optional. Type of process which created the lineage. |
| `sourceFqn` | string | Optional. FQN of source table / column |
| `targetFqn` | string | Optional. FQN of target table / column |

### `MachineConfig`

- MachineConfig describes the configuration of a machine specific to a Database Resource.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `baselineSlotCount` | string (int64) | Optional. Baseline slots for BigQuery Reservations. Baseline slots are in increments of 50. |
| `maxReservationSlotCount` | string (int64) | Optional. Max slots for BigQuery Reservations. Max slots are in increments of 50. |
| `memorySizeBytes` | string (int64) | Memory size in bytes. |
| `shardCount` | integer (int32) | Optional. The number of Shards (if applicable). |
| `vcpuCount` | number (double) | Optional. The number of vCPUs (if applicable). |

### `MaintenanceInfo`

- MaintenanceInfo to capture the maintenance details of database resource.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `currentVersionReleaseDate` | Date | Output only. The date when the maintenance version was released. |
| `denyMaintenanceSchedules` | array<ResourceMaintenanceDenySchedule> | Optional. List of Deny maintenance period for the database resource. |
| `maintenanceSchedule` | ResourceMaintenanceSchedule | Optional. Maintenance window for the database resource. |
| `maintenanceVersion` | string | Output only. Current Maintenance version of the database resource. Example: "MYSQL_8_0_41.R20250531.01_15" |
| `possibleFailureReasons` | array<string> | Output only. List of possible reasons why the maintenance is not completed. This is an optional field and is only populated if there are any reasons for failures recorded for the maintenance by DB Center. FAILURE maintenance status may not always have a failure reason. |
| `previousMaintenanceVersion` | string | Output only. Previous maintenance version of the database resource. Example: "MYSQL_8_0_41.R20250531.01_15". This is available once a minor version maintenance is complete on a database resource. |
| `state` | string enum | Output only. Resource maintenance state. This is to capture the current state of the maintenance. |
| `upcomingMaintenance` | UpcomingMaintenance | Output only. Upcoming maintenance window for the database resource. This is only populated for an engine, if upcoming maintenance is scheduled for the resource. This schedule is generated per engine and engine version, and there is only one upcoming maintenance window at any given time. In case of upcoming maintenance, the maintenance_state will be set to SCHEDULED first, and then IN_PROGRESS when the maintenance window starts. |

### `MaintenanceRecommendationInfo`

- Info associated with maintenance recommendation.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `resourceMaintenanceSchedules` | array<ResourceMaintenanceSchedule> | Optional. List of recommended maintenance schedules for the database resource. |

### `MetricData`

- MetricData represents the metric data for a database resource.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `observationTime` | string (google-datetime) | The time the metric was observed in the metric source service. |
| `value` | TypedValue | The value associated with the metric. |

### `Metrics`

- Metrics represents the metrics for a database resource.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `currentMemoryUsedBytes` | MetricData | Current memory used by the resource in bytes. |
| `currentStorageUsedBytes` | MetricData | Current storage used by the resource in bytes. |
| `nodeCount` | MetricData | Number of nodes in instance for spanner or bigtable. |
| `p95CpuUtilization` | MetricData | P95 CPU utilization observed for the resource. The value is a fraction between 0.0 and 1.0 (may momentarily exceed 1.0 in some cases). |
| `p99CpuUtilization` | MetricData | P99 CPU utilization observed for the resource. The value is a fraction between 0.0 and 1.0 (may momentarily exceed 1.0 in some cases). |
| `peakMemoryUtilization` | MetricData | Peak memory utilization observed for the resource. The value is a fraction between 0.0 and 1.0 (may momentarily exceed 1.0 in some cases). |
| `peakNumberConnections` | MetricData | Peak number of connections observed for the resource. The value is a positive integer. |
| `peakStorageUtilization` | MetricData | Peak storage utilization observed for the resource. The value is a fraction between 0.0 and 1.0 (may momentarily exceed 1.0 in some cases). |
| `processingUnitCount` | MetricData | Number of processing units in spanner. |

### `OutdatedMinorVersionInfo`

- Info associated with outdated minor version.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `recommendedMinorVersion` | string | Recommended minor version of the underlying database engine. Example values: For MySQL, it could be "8.0.35", "5.7.25" etc. For PostgreSQL, it could be "14.4", "15.5" etc. |

### `Product`

- Product specification for databasecenter resources.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `engine` | string enum | Optional. The specific engine that the underlying database is running. |
| `minorVersion` | string | Optional. Minor version of the underlying database engine. Example values: For MySQL, it could be "8.0.35", "5.7.25" etc. For PostgreSQL, it could be "14.4", "15.5" etc. |
| `type` | string enum | Optional. Type of specific database product. It could be CloudSQL, AlloyDB etc.. |
| `version` | string | Optional. Version of the underlying database engine. Example values: For MySQL, it could be "8.0", "5.7" etc. For Postgres, it could be "14", "15" etc. |

### `QueryDatabaseResourceGroupsRequest`

- QueryDatabaseResourceGroupsRequest is the request to get a list of database groups.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `filter` | string | Optional. The expression to filter resources. The following fields are filterable: \* full_resource_name \* resource_type \* container \* product.type \* product.engine \* product.version \* location \* labels \* resource_category \* machine_config.cpu_count \* machine_config.memory_size_bytes \* machine_config.shard_count \* resource_name \* tags \* backupdr_config.backupdr_managed \* edition \* modes The expression is a list of zero or more restrictions combined via logical operators `AND` and `OR`. When `AND` and `OR` are both used in the expression, parentheses must be appropriately used to group the combinations. Example: `location="us-east1"` Example: `container="projects/123" OR container="projects/456"` Example: `(container="projects/123" OR container="projects/456") AND location="us-east1"` Example: `full_resource_name=~"test"` Example: `full_resource_name=~"test.*master"` |
| `orderBy` | string | Optional. A field that specifies the sort order of the results. The following fields are sortable: \* full_resource_name \* product.type \* product.engine \* product.version \* container \* issue_count \* machine_config.vcpu_count \* machine_config.memory_size_bytes \* machine_config.shard_count \* resource_name \* issue_severity \* signal_type \* location \* resource_type \* instance_type \* edition \* modes \* metrics.p99_cpu_utilization \* metrics.p95_cpu_utilization \* metrics.current_storage_used_bytes \* metrics.node_count \* metrics.processing_unit_count \* metrics.current_memory_used_bytes \* metrics.peak_storage_utilization \* metrics.peak_number_connections \* metrics.peak_memory_utilization The default order is ascending. Add "DESC" after the field name to indicate descending order. Add "ASC" after the field name to indicate ascending order. It only supports a single field at a time. For example: `order_by = "full_resource_name"` sorts response in ascending order `order_by = "full_resource_name DESC"` sorts response in descending order `order_by = "issue_count DESC"` sorts response in descending order of count of all issues associated with a resource. More explicitly, `order_by = "full_resource_name, product"` is not supported. |
| `pageSize` | integer (int32) | Optional. If unspecified, at most 50 resource groups will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. |
| `pageToken` | string | Optional. A page token, received from a previous `QueryDatabaseResourceGroupsRequest` call. Provide this to retrieve the subsequent page. All parameters except page_token should match the parameters in the call that provided the page page token. |
| `parent` | string | Required. Parent can be a project, a folder, or an organization. The search is limited to the resources within the `scope`. The allowed values are: \* projects/{PROJECT_ID} (e.g., "projects/foo-bar") \* projects/{PROJECT_NUMBER} (e.g., "projects/12345678") \* folders/{FOLDER_NUMBER} (e.g., "folders/1234567") \* organizations/{ORGANIZATION_NUMBER} (e.g., "organizations/123456") |
| `signalFilters` | array<SignalFilter> | Optional. Filters based on signals. The list will be ORed together and then ANDed with the `filters` field above. |
| `signalProductsFilters` | array<SignalProductsFilters> | Optional. Filters based on signal and product. The filter list will be ORed across pairs and ANDed within a signal and products pair. |
| `signalTypeGroups` | array<SignalTypeGroup> | Optional. Groups of signal types that are requested. |

### `QueryDatabaseResourceGroupsResponse`

- QueryDatabaseResourceGroupsResponse represents the response message containing a list of resource groups.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token that can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |
| `resourceGroups` | array<DatabaseResourceGroup> | List of database resource groups that pass the filter. |
| `totalSize` | string (int64) | Output only. The total number of resource groups in the entire list. |
| `unreachable` | array<string> | Unordered list. List of unreachable regions from where data could not be retrieved. |

### `QueryIssuesRequest`

- QueryIssuesRequest is the request to get a list of issues.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `filter` | string | Optional. Supported fields are: 'product', `location`, `issue_severity`, 'tags', 'labels', |
| `orderBy` | string | Optional. Following fields are sortable: SignalType Product Location IssueSeverity The default order is ascending. Add "DESC" after the field name to indicate descending order. Add "ASC" after the field name to indicate ascending order. It only supports a single field at a time. |
| `pageSize` | integer (int32) | Optional. If unspecified, at most 50 issues will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. |
| `pageToken` | string | Optional. A page token, received from a previous `QueryIssues` call. Provide this to retrieve the subsequent page. All parameters except page size should match the parameters used in the call that provided the page token. |
| `parent` | string | Required. Parent can be a project, a folder, or an organization. The list is limited to the one attached to resources within the `scope` that a user has access to. The allowed values are: \* projects/{PROJECT_ID} (e.g., "projects/foo-bar") \* projects/{PROJECT_NUMBER} (e.g., "projects/12345678") \* folders/{FOLDER_NUMBER} (e.g., "folders/1234567") \* organizations/{ORGANIZATION_NUMBER} (e.g., "organizations/123456") |
| `signalProductsFilters` | array<SignalProductsFilters> | Optional. Filters based on signal and product. The filter list will be ORed across pairs and ANDed within a signal and products pair. |

### `QueryIssuesResponse`

- QueryIssuesResponse is the response containing a list of issues.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token that can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |
| `resourceIssues` | array<DatabaseResourceIssue> | List of issues and resource details. |
| `unreachable` | array<string> | Unordered list. List of unreachable regions from where data could not be retrieved. |

### `QueryMetrics`

- QueryMetrics contains the metrics related to the query execution.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `avgCpuTime` | string (google-duration) | The average execution period of the query across all runs. |
| `executionCount` | string (int64) | The number of times the query was executed. |
| `metricsWindow` | string enum | The window over which the metrics are aggregated. |
| `rowsProcessed` | string (int64) | The average number of rows processed by the query across all runs. |
| `totalCpuTime` | string (google-duration) | The total CPU time consumed by the query across all runs. |

### `QueryProductsResponse`

- QueryProductsResponse represents the response containing a list of products.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token that can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages |
| `products` | array<Product> | List of database products returned. |
| `unreachable` | array<string> | Unordered list. List of unreachable regions from where data could not be retrieved. |

### `QueryStats`

- QueryStats contains the stats for a particular combination of query_hash, query_string and resource_type.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `inefficientQueryInfo` | InefficientQueryInfo | Information about inefficient query. |
| `normalizedQuery` | string | The query string is normalized query without any PII data. |
| `queryHash` | string | The query hash of the query. |
| `queryMetrics` | QueryMetrics | Metrics related to the query performance. |
| `resourceIds` | array<ResourceId> | The resource ids for which the query stats are collected. |
| `resourceType` | string | The type of the resource. sqladmin.googleapis.com/Instance alloydb.googleapis.com/Cluster alloydb.googleapis.com/Instance |

### `QueryStatsInfo`

- QueryStatsInfo contains the aggregated and detailed query stats for a particular combination of relevant query stats for queries having same normalized query.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `aggregatedQueryStats` | QueryStats | Aggregated query stats for the resources for same normalized query. |
| `queryStats` | array<QueryStats> | List of query stats for the resources in the group. This stats is stats at resource level for the resources having same normalized query. |

### `RecommendationInfo`

- Info associated with recommendation.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `recommender` | string | Name of recommendation. Examples: organizations/1234/locations/us-central1/recommenders/google.cloudsql.instance.PerformanceRecommender/recommendations/9876 |
| `recommenderId` | string | ID of recommender. Examples: "google.cloudsql.instance.PerformanceRecommender" |
| `recommenderSubtype` | string | Contains an identifier for a subtype of recommendations produced for the same recommender. Subtype is a function of content and impact, meaning a new subtype might be added when significant changes to `content` or `primary_impact.category` are introduced. See the Recommenders section to see a list of subtypes for a given Recommender. Examples: For recommender = "google.cloudsql.instance.PerformanceRecommender", recommender_subtype can be "MYSQL_HIGH_NUMBER_OF_OPEN_TABLES_BEST_PRACTICE"/"POSTGRES_HIGH_TRANSACTION_ID_UTILIZATION_BEST_PRACTICE" |

### `RegulatoryStandard`

- Compliances associated with signals.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `standard` | string | Name of industry compliance standards, such as such as CIS, PCI, and OWASP. |
| `version` | string | Version of the standard or benchmark, for example, 1.1. |

### `ResourceDetails`

- Capture the resource details for resources that are included in the delta counts.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `container` | string | Specifies where the resource is created. For Google Cloud resources, it is the full name of the project. |
| `fullResourceName` | string | Full resource name of the resource. |
| `location` | string | Location of the resource. |
| `product` | Product | Product type of the resource. |

### `ResourceId`

- ResourceId contains the identifier for a database resource, including the full resource name, resource type, and product.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `fullResourceName` | string | The full resource name of the resource. |
| `product` | Product | The product of the resource, including the type, engine, and version. |
| `resourceType` | string | The type of the resource. sqladmin.googleapis.com/Instance alloydb.googleapis.com/Cluster alloydb.googleapis.com/Instance |

### `ResourceMaintenanceDenySchedule`

- Deny maintenance period for the database resource. It specifies the time range during which the maintenance cannot start. This is configured by the customer.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `endDate` | Date | Optional. Deny period end date. |
| `startDate` | Date | Optional. The start date of the deny maintenance period. |
| `time` | TimeOfDay | Optional. Time in UTC when the deny period starts on start_date and ends on end_date. |

### `ResourceMaintenanceSchedule`

- Maintenance window for the database resource. It specifies preferred time and day of the week and phase in some cases, when the maintenance can start.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `day` | string enum | Optional. Preferred day of the week for maintenance, e.g. MONDAY, TUESDAY, etc. |
| `phase` | string enum | Optional. Phase of the maintenance window. This is to capture order of maintenance. For example, for Cloud SQL resources, this can be used to capture if the maintenance window is in Week1, Week2, Week5, etc. Non production resources are usually part of early phase. For more details, refer to Cloud SQL resources - https://cloud.google.com/sql/docs/mysql/maintenance |
| `startTime` | TimeOfDay | Optional. Preferred time to start the maintenance operation on the specified day. |

### `ResourceSuspensionInfo`

- Resource suspension info for a database resource.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `resourceSuspended` | boolean | Is resource suspended. |
| `suspensionReason` | string enum | Suspension reason for the resource. |

### `RetentionSettingsInfo`

- Metadata about backup retention settings for a database resource.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `durationBasedRetention` | string (google-duration) | Duration based retention period i.e. 172800 seconds (2 days) |
| `quantityBasedRetention` | integer (int32) | Number of backups that will be retained. |
| `subResource` | SubResource | Optional. Sub resource details associated with the backup configuration. |
| `timestampBasedRetentionTime` | string (google-datetime) | Timestamp based retention period i.e. till 2024-05-01T00:00:00Z |

### `SCCInfo`

- Info associated with SCC signals.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `category` | string | Name by which SCC calls this signal. |
| `externalUri` | string | External URI which points to a SCC page associated with the signal. |
| `regulatoryStandards` | array<RegulatoryStandard> | Compliances that are associated with the signal. |
| `signal` | string | Name of the signal. |

### `Signal`

- Represents a signal.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `additionalDetails` | array<AdditionalDetail> | Additional information related to the signal. In the case of composite signals, this field encapsulates details associated with granular signals, having a signal status of "ISSUE"; signals with a status of "OK" are not included. For granular signals, it encompasses information relevant to the signal, regardless of the signal status. |
| `issueCreateTime` | string (google-datetime) | Timestamp when the issue was created (when signal status is ISSUE). |
| `issueSeverity` | string enum | Severity of the issue. |
| `signalStatus` | string enum | Status of the signal. |
| `signalType` | string enum | Type of the signal. |

### `SignalFilter`

- A filter for Signals. If signal_type is left unset, all signals should be returned. For example, the following filter returns all issues. signal_filter: { signal_status: SIGNAL_STATUS_ISSUE; } Another example, the following filter returns issues of the given type: signal_filter: { type: SIGNAL_TYPE_NO_PROMOTABLE_REPLICA signal_status: ISSUE } If signal_status is left unset or set to SIGNAL_STATE_UNSPECIFIED, an error should be returned.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `signalStatus` | string enum | Optional. Represents the status of the Signal for which the filter is for. |
| `signalType` | string enum | Optional. Represents the type of the Signal for which the filter is for. |

### `SignalGroup`

- A group of signals and their counts.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `displayName` | string | Title of a signal group corresponding to the request. |
| `issueCount` | integer (int32) | When applied to a DatabaseResource represents count of issues associated with the resource. A signal is an issue when its SignalStatus field is set to SIGNAL_STATUS_ISSUE. |
| `signals` | array<Signal> | List of signals present in the group and associated with the resource. Only applies to a DatabaseResource. |

### `SignalProductsFilters`

- SignalProductsFilters represents a signal and list of supported products.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `products` | array<Product> | Optional. Product type of the resource. The version of the product will be ignored in filtering. |
| `signalType` | string enum | Optional. The type of signal. |

### `SignalTypeGroup`

- A group of signal types that specifies what the user is interested in. Used by QueryDatabaseResourceGroups API. Example: signal_type_group { name = "AVAILABILITY" types = \[SIGNAL_TYPE_NO_PROMOTABLE_REPLICA\] }
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `displayName` | string | Required. The display name of a signal group. |
| `signalTypes` | array<string> | Optional. List of signal types present in the group. |

### `SubResource`

- Sub resource details For Spanner/Bigtable instance certain data protection settings are at sub resource level like database/table. This message is used to capture such sub resource details.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `container` | string | Specifies where the resource is created. For Google Cloud resources, it is the full name of the project. |
| `fullResourceName` | string | Optional. Resource name associated with the sub resource where backup settings are configured. E.g."//spanner.googleapis.com/projects/project1/instances/inst1/databases/db1" for Spanner where backup retention is configured on database within an instance OPTIONAL |
| `product` | Product | Optional. Product information associated with the sub resource where backup retention settings are configured. e.g. product: { type : PRODUCT_TYPE_SPANNER engine : ENGINE_CLOUD_SPANNER_WITH_POSTGRES_DIALECT } for Spanner where backup is configured on database within an instance OPTIONAL |
| `resourceType` | string | Optional. Resource type associated with the sub resource where backup settings are configured. E.g. "spanner.googleapis.com/Database" for Spanner where backup retention is configured on database within an instance OPTIONAL |

### `Tag`

- Tag is a key value pair attached to a resource.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `inherited` | boolean | Indicates the inheritance status of a tag value attached to the given resource. If the tag value is inherited from one of the resource's ancestors, inherited will be true. If false, then the tag value is directly attached to the resource. |
| `key` | string | — |
| `source` | string | The source of the tag. According to https://cloud.google.com/resource-manager/docs/tags/tags-overview#tags_and_labels, tags can be created only at the project or organization level. Tags can be inherited from different project as well not just the current project where the database resource is present. Format: "projects/{PROJECT_ID}", "projects/{PROJECT_NUMBER}", "organizations/{ORGANIZATION_ID}" |
| `value` | string | The value part of the tag. |

### `TimeOfDay`

- Represents a time of day. The date and time zone are either not significant or are specified elsewhere. An API may choose to allow leap seconds. Related types are google.type.Date and `google.protobuf.Timestamp`.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `hours` | integer (int32) | Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time. |
| `minutes` | integer (int32) | Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59. |
| `nanos` | integer (int32) | Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999. |
| `seconds` | integer (int32) | Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds. |

### `TypedValue`

- TypedValue represents the value of the metric based on data type.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `doubleValue` | number (double) | The value of the metric as double. |
| `int64Value` | string (int64) | The value of the metric as int. |

### `UpcomingMaintenance`

- Upcoming maintenance window for the database resource.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `endTime` | string (google-datetime) | Output only. End time of the upcoming maintenance. This is only populated for an engine, if end time is public for the engine. |
| `startTime` | string (google-datetime) | Output only. Start time of the upcoming maintenance. Start time is always populated when an upcoming maintenance is scheduled. |

### Shape of `AdditionalDetail`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "automatedBackupPolicyInfo": "AutomatedBackupPolicyInfo",
  "backupRunInfo": "BackupRunInfo",
  "deletionProtectionInfo": "DeletionProtectionInfo",
  "inefficientQueryInfo": "InefficientQueryInfo",
  "maintenanceRecommendationInfo": "MaintenanceRecommendationInfo",
  "outdatedMinorVersionInfo": "OutdatedMinorVersionInfo",
  "recommendationInfo": "RecommendationInfo",
  "resourceSuspensionInfo": "ResourceSuspensionInfo",
  "sccInfo": "SCCInfo",
  "shortBackupRetentionInfo": "RetentionSettingsInfo",
  "signalEventTime": "string (google-datetime)",
  "signalSource": "string enum",
  "signalType": "string enum"
}
```

## Notes

- Generated from the Discovery document(s) of `databasecenter` (retrieved 2026-11-14); a type shared by several versions shows the preferred version.
- Source: https://databasecenter.googleapis.com/$discovery/rest?version=v1beta (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
