---
source: https://bigquerydatatransfer.googleapis.com/$discovery/rest?version=v1
---

# BigQuery Data Transfer API message schemas (bigquerydatatransfer)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/bigquerydatatransfer/`.

### `CheckValidCredsRequest`

- A request to determine whether the user has valid credentials. This method is used to limit the number of OAuth popups in the user interface. The user id is inferred from the API call context. If the data source has the Google+ authorization type, this method returns false, as it cannot be determined whether the credentials are already valid merely based on the user id.
- Version: v1

### `CheckValidCredsResponse`

- A response indicating whether the credentials exist and are valid.
- Version: v1

### `DataSource`

- Defines the properties and custom parameters for a data source.
- Version: v1

### `DataSourceParameter`

- A parameter used to define custom fields in a data source definition.
- Version: v1

### `DataplexConfiguration`

- Configuration for Dataplex destination.
- Version: v1

### `EmailPreferences`

- Represents preferences for sending email notifications for transfer run events.
- Version: v1

### `Empty`

- A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
- Version: v1

### `EncryptionConfiguration`

- Represents the encryption configuration for a transfer.
- Version: v1

### `EnrollDataSourcesRequest`

- A request to enroll a set of data sources so they are visible in the BigQuery UI's `Transfer` tab.
- Version: v1

### `EventDrivenSchedule`

- Options customizing EventDriven transfers schedule.
- Version: v1

### `HierarchyDetail`

- Details about the hierarchy.
- Version: v1

### `ListDataSourcesResponse`

- Returns list of supported data sources and their metadata.
- Version: v1

### `ListLocationsResponse`

- The response message for Locations.ListLocations.
- Version: v1

### `ListTransferConfigsResponse`

- The returned list of pipelines in the project.
- Version: v1

### `ListTransferLogsResponse`

- The returned list transfer run messages.
- Version: v1

### `ListTransferResourcesResponse`

- Response for the `ListTransferResources` RPC.
- Version: v1

### `ListTransferRunsResponse`

- The returned list of pipelines in the project.
- Version: v1

### `Location`

- A resource that represents a Google Cloud location.
- Version: v1

### `ManualSchedule`

- Options customizing manual transfers schedule.
- Version: v1

### `MetadataDestination`

- The metadata destination of the transfer config.
- Version: v1

### `ParameterConfig`

- Configuration for data source parameters.
- Version: v1

### `PartitionDetail`

- Partition details related to hierarchy.
- Version: v1

### `ScheduleOptions`

- Options customizing the data transfer schedule.
- Version: v1

### `ScheduleOptionsV2`

- V2 options customizing different types of data transfer schedule. This field supports existing time-based and manual transfer schedule. Also supports Event-Driven transfer schedule. ScheduleOptionsV2 cannot be used together with ScheduleOptions/Schedule.
- Version: v1

### `ScheduleTransferRunsRequest`

- A request to schedule transfer runs for a time range.
- Version: v1

### `ScheduleTransferRunsResponse`

- A response to schedule transfer runs for a time range.
- Version: v1

### `StartManualTransferRunsRequest`

- A request to start manual transfer runs.
- Version: v1

### `StartManualTransferRunsResponse`

- A response to start manual transfer runs.
- Version: v1

### `Status`

- The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by gRPC (https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the API Design Guide (https://cloud.google.com/apis/design/errors).
- Version: v1

### `TableDetail`

- Table details related to hierarchy.
- Version: v1

### `TimeBasedSchedule`

- Options customizing the time based transfer schedule. Options are migrated from the original ScheduleOptions message.
- Version: v1

### `TimeRange`

- A specification for a time range, this will request transfer runs with run_time between start_time (inclusive) and end_time (exclusive).
- Version: v1

### `TransferConfig`

- Represents a data transfer configuration. A transfer configuration contains all metadata needed to perform a data transfer. For example, `destination_dataset_id` specifies where data should be stored. When a new transfer configuration is created, the specified `destination_dataset_id` is created when needed and shared with the appropriate data source service account.
- Version: v1

### `TransferMessage`

- Represents a user facing message for a particular data transfer run.
- Version: v1

### `TransferResource`

- Resource (table/partition) that is being transferred.
- Version: v1

### `TransferResourceStatusDetail`

- Status details of the resource being transferred.
- Version: v1

### `TransferRun`

- Represents a data transfer run.
- Version: v1

### `TransferRunBrief`

- Basic information about a transfer run.
- Version: v1

### `TransferStatusMetric`

- Metrics for tracking the transfer status.
- Version: v1

### `TransferStatusSummary`

- Status summary of the resource being transferred.
- Version: v1

### `UnenrollDataSourcesRequest`

- A request to unenroll a set of data sources so they are no longer visible in the BigQuery UI's `Transfer` tab.
- Version: v1

### `UserInfo`

- Information about a user.
- Version: v1

### Shape of `CheckValidCredsResponse`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "hasValidCreds": "boolean"
}
```

### Example `CheckValidCredsResponse` value

Generated from the field types (not in the official docs): a JSON value that matches the table, with empty strings, `0`, `false`, empty arrays and objects, and for an enum its first value other than `*_UNSPECIFIED`. int64 values are JSON strings, as in the Discovery `format`. It shows the JSON shape only; it is not a request to send as is (fill in the values the method needs, and omit output-only fields in requests).

```json
{
  "hasValidCreds": false
}
```

## Options / Props

### `CheckValidCredsResponse` fields

| Field | Type | Description |
|---|---|---|
| `hasValidCreds` | boolean | If set to `true`, the credentials exist and are valid. |

### `DataSource` fields

| Field | Type | Description |
|---|---|---|
| `authorizationType` | string enum | Indicates the type of authorization. Values: `AUTHORIZATION_TYPE_UNSPECIFIED`, `AUTHORIZATION_CODE`, `GOOGLE_PLUS_AUTHORIZATION_CODE`, `FIRST_PARTY_OAUTH`. |
| `clientId` | string | Data source client id which should be used to receive refresh token. |
| `dataRefreshType` | string enum | Specifies whether the data source supports automatic data refresh for the past few days, and how it's supported. For some data sources, data might not be complete until a few days later, so it's useful to refresh data automatically. Values: `DATA_REFRESH_TYPE_UNSPECIFIED`, `SLIDING_WINDOW`, `CUSTOM_SLIDING_WINDOW`. |
| `dataSourceId` | string | Data source id. |
| `defaultDataRefreshWindowDays` | integer (int32) | Default data refresh window on days. Only meaningful when `data_refresh_type` = `SLIDING_WINDOW`. |
| `defaultSchedule` | string | Default data transfer schedule. Examples of valid schedules include: `1st,3rd monday of month 15:30`, `every wed,fri of jan,jun 13:15`, and `first sunday of quarter 00:00`. |
| `description` | string | User friendly data source description string. |
| `displayName` | string | User friendly data source name. |
| `helpUrl` | string | Url for the help document for this data source. |
| `manualRunsDisabled` | boolean | Disables backfilling and manual run scheduling for the data source. |
| `minimumScheduleInterval` | string (google-duration) | The minimum interval for scheduler to schedule runs. |
| `name` | string | Output only. Data source resource name. |
| `parameters` | `array<DataSourceParameter>` | Data source parameters. |
| `scopes` | `array<string>` | Api auth scopes for which refresh token needs to be obtained. These are scopes needed by a data source to prepare data and ingest them into BigQuery, e.g., https://www.googleapis.com/auth/bigquery |
| `supportsCustomSchedule` | boolean | Specifies whether the data source supports a user defined schedule, or operates on the default schedule. When set to `true`, user can override default schedule. |
| `supportsMultipleTransfers` | boolean | Deprecated. This field has no effect. |
| `transferType` | string enum | Deprecated. This field has no effect. Values: `TRANSFER_TYPE_UNSPECIFIED`, `BATCH`, `STREAMING`. |
| `updateDeadlineSeconds` | integer (int32) | The number of seconds to wait for an update from the data source before the Data Transfer Service marks the transfer as FAILED. |

### `DataSourceParameter` fields

| Field | Type | Description |
|---|---|---|
| `allowedValues` | `array<string>` | All possible values for the parameter. |
| `deprecated` | boolean | If true, it should not be used in new transfers, and it should not be visible to users. |
| `description` | string | Parameter description. |
| `displayName` | string | Parameter display name in the user interface. |
| `fields` | `array<DataSourceParameter>` | Deprecated. This field has no effect. |
| `immutable` | boolean | Cannot be changed after initial creation. |
| `maxListSize` | string (int64) | For list parameters, the max size of the list. |
| `maxValue` | number (double) | For integer and double values specifies maximum allowed value. |
| `minValue` | number (double) | For integer and double values specifies minimum allowed value. |
| `paramId` | string | Parameter identifier. |
| `recurse` | boolean | Deprecated. This field has no effect. |
| `repeated` | boolean | Deprecated. This field has no effect. |
| `required` | boolean | Is parameter required. |
| `secretManagerAllowed` | boolean | Output only. If true, the parameter value can be provided through Secret Manager. |
| `type` | string enum | Parameter type. Values: `TYPE_UNSPECIFIED`, `STRING`, `INTEGER`, `DOUBLE`, `BOOLEAN`, `RECORD`, `PLUS_PAGE`, `LIST`. |
| `validationDescription` | string | Description of the requirements for this field, in case the user input does not fulfill the regex pattern or min/max values. |
| `validationHelpUrl` | string | URL to a help document to further explain the naming requirements. |
| `validationRegex` | string | Regular expression which can be used for parameter validation. |

### `DataplexConfiguration` fields

| Field | Type | Description |
|---|---|---|
| `entryGroup` | string | Required. The Dataplex Universal Catalog entry group for importing the metadata. entry_group has the format of `projects/{project_id}/locations/{region}/entryGroups/{entry_group_id}`. |

### `EmailPreferences` fields

| Field | Type | Description |
|---|---|---|
| `enableFailureEmail` | boolean | If true, email notifications will be sent on transfer run failures. |

### `EncryptionConfiguration` fields

| Field | Type | Description |
|---|---|---|
| `kmsKeyName` | string | The name of the KMS key used for encrypting BigQuery data. |

### `EnrollDataSourcesRequest` fields

| Field | Type | Description |
|---|---|---|
| `dataSourceIds` | `array<string>` | Data sources that are enrolled. It is required to provide at least one data source id. |

### `EventDrivenSchedule` fields

| Field | Type | Description |
|---|---|---|
| `pubsubSubscription` | string | Pub/Sub subscription name used to receive events. Only Google Cloud Storage data source support this option. Format: projects/{project}/subscriptions/{subscription} |

### `HierarchyDetail` fields

| Field | Type | Description |
|---|---|---|
| `partitionDetail` | PartitionDetail | Optional. Partition details related to hierarchy. |
| `tableDetail` | TableDetail | Optional. Table details related to hierarchy. |

### `ListDataSourcesResponse` fields

| Field | Type | Description |
|---|---|---|
| `dataSources` | `array<DataSource>` | List of supported data sources and their transfer settings. |
| `nextPageToken` | string | Output only. The next-pagination token. For multiple-page list results, this token can be used as the `ListDataSourcesRequest.page_token` to request the next page of list results. |

### `ListLocationsResponse` fields

| Field | Type | Description |
|---|---|---|
| `locations` | `array<Location>` | A list of locations that matches the specified filter in the request. |
| `nextPageToken` | string | The standard List next-page token. |

### `ListTransferConfigsResponse` fields

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | Output only. The next-pagination token. For multiple-page list results, this token can be used as the `ListTransferConfigsRequest.page_token` to request the next page of list results. |
| `transferConfigs` | `array<TransferConfig>` | Output only. The stored pipeline transfer configurations. |

### `ListTransferLogsResponse` fields

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | Output only. The next-pagination token. For multiple-page list results, this token can be used as the `GetTransferRunLogRequest.page_token` to request the next page of list results. |
| `transferMessages` | `array<TransferMessage>` | Output only. The stored pipeline transfer messages. |

### `ListTransferResourcesResponse` fields

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | Output only. A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |
| `transferResources` | `array<TransferResource>` | Output only. The transfer resources. |

### `ListTransferRunsResponse` fields

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | Output only. The next-pagination token. For multiple-page list results, this token can be used as the `ListTransferRunsRequest.page_token` to request the next page of list results. |
| `transferRuns` | `array<TransferRun>` | Output only. The stored pipeline transfer runs. |

### `Location` fields

| Field | Type | Description |
|---|---|---|
| `displayName` | string | The friendly name for this location, typically a nearby city name. For example, "Tokyo". |
| `labels` | `map<string, string>` | Cross-service attributes for the location. For example {"cloud.googleapis.com/region": "us-east1"} |
| `locationId` | string | The canonical id for this location. For example: `"us-east1"`. |
| `metadata` | `map<string, any>` | Service-specific metadata. For example the available capacity at the given location. |
| `name` | string | Resource name for the location, which may vary between implementations. For example: `"projects/example-project/locations/us-east1"` |

### `MetadataDestination` fields

| Field | Type | Description |
|---|---|---|
| `dataplexConfiguration` | DataplexConfiguration | The Dataplex Universal Catalog configuration. |

### `ParameterConfig` fields

| Field | Type | Description |
|---|---|---|
| `secretManagerManagedParams` | `array<string>` | Optional. The list of parameters that are stored in Secret Manager. The value of a parameter included in this list will be interpreted as a Secret Manager key version resource name instead of a raw value. The raw value will be retrieved from Secret Manager upon execution. |

### `PartitionDetail` fields

| Field | Type | Description |
|---|---|---|
| `table` | string | Optional. Name of the table which has the partitions. |

### `ScheduleOptions` fields

| Field | Type | Description |
|---|---|---|
| `disableAutoScheduling` | boolean | If true, automatic scheduling of data transfer runs for this configuration will be disabled. The runs can be started on ad-hoc basis using StartManualTransferRuns API. When automatic scheduling is disabled, the TransferConfig.schedule field will be ignored. |
| `endTime` | string (google-datetime) | Defines time to stop scheduling transfer runs. A transfer run cannot be scheduled at or after the end time. The end time can be changed at any moment. The time when a data transfer can be triggered manually is not limited by this option. |
| `startTime` | string (google-datetime) | Specifies time to start scheduling transfer runs. The first run will be scheduled at or after the start time according to a recurrence pattern defined in the schedule string. The start time can be changed at any moment. The time when a data transfer can be triggered manually is not limited by this option. |

### `ScheduleOptionsV2` fields

| Field | Type | Description |
|---|---|---|
| `eventDrivenSchedule` | EventDrivenSchedule | Event driven transfer schedule options. If set, the transfer will be scheduled upon events arrial. |
| `manualSchedule` | ManualSchedule | Manual transfer schedule. If set, the transfer run will not be auto-scheduled by the system, unless the client invokes StartManualTransferRuns. This is equivalent to disable_auto_scheduling = true. |
| `timeBasedSchedule` | TimeBasedSchedule | Time based transfer schedule options. This is the default schedule option. |

### `ScheduleTransferRunsRequest` fields

| Field | Type | Description |
|---|---|---|
| `endTime` | string (google-datetime) | Required. End time of the range of transfer runs. For example, `"2017-05-30T00:00:00+00:00"`. |
| `startTime` | string (google-datetime) | Required. Start time of the range of transfer runs. For example, `"2017-05-25T00:00:00+00:00"`. |

### `ScheduleTransferRunsResponse` fields

| Field | Type | Description |
|---|---|---|
| `runs` | `array<TransferRun>` | The transfer runs that were scheduled. |

### `StartManualTransferRunsRequest` fields

| Field | Type | Description |
|---|---|---|
| `requestedRunTime` | string (google-datetime) | A run_time timestamp for historical data files or reports that are scheduled to be transferred by the scheduled transfer run. requested_run_time must be a past time and cannot include future time values. |
| `requestedTimeRange` | TimeRange | A time_range start and end timestamp for historical data files or reports that are scheduled to be transferred by the scheduled transfer run. requested_time_range must be a past time and cannot include future time values. |

### `StartManualTransferRunsResponse` fields

| Field | Type | Description |
|---|---|---|
| `runs` | `array<TransferRun>` | The transfer runs that were created. |

### `Status` fields

| Field | Type | Description |
|---|---|---|
| `code` | integer (int32) | The status code, which should be an enum value of google.rpc.Code. |
| `details` | `array<map<string, any>>` | A list of messages that carry the error details. There is a common set of message types for APIs to use. |
| `message` | string | A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. |

### `TableDetail` fields

| Field | Type | Description |
|---|---|---|
| `partitionCount` | string (int64) | Optional. Total number of partitions being tracked within the table. |

### `TimeBasedSchedule` fields

| Field | Type | Description |
|---|---|---|
| `endTime` | string (google-datetime) | Defines time to stop scheduling transfer runs. A transfer run cannot be scheduled at or after the end time. The end time can be changed at any moment. |
| `schedule` | string | Data transfer schedule. If the data source does not support a custom schedule, this should be empty. If it is empty, the default value for the data source will be used. The specified times are in UTC. Examples of valid format: `1st,3rd monday of month 15:30`, `every wed,fri of jan,jun 13:15`, and `first sunday of quarter 00:00`. See more explanation about the format here: https://cloud.google.com/appengine/docs/flexible/python/scheduling-jobs-with-cron-yaml#the_schedule_format NOTE: The minimum interval time between recurring transfers depends on the data source; refer to the documentation for your data source. |
| `startTime` | string (google-datetime) | Specifies time to start scheduling transfer runs. The first run will be scheduled at or after the start time according to a recurrence pattern defined in the schedule string. The start time can be changed at any moment. |

### `TimeRange` fields

| Field | Type | Description |
|---|---|---|
| `endTime` | string (google-datetime) | End time of the range of transfer runs. For example, `"2017-05-30T00:00:00+00:00"`. The end_time must not be in the future. Creates transfer runs where run_time is in the range between start_time (inclusive) and end_time (exclusive). |
| `startTime` | string (google-datetime) | Start time of the range of transfer runs. For example, `"2017-05-25T00:00:00+00:00"`. The start_time must be strictly less than the end_time. Creates transfer runs where run_time is in the range between start_time (inclusive) and end_time (exclusive). |

### `TransferConfig` fields

| Field | Type | Description |
|---|---|---|
| `dataRefreshWindowDays` | integer (int32) | The number of days to look back to automatically refresh the data. For example, if `data_refresh_window_days = 10`, then every day BigQuery reingests data for \[today-10, today-1\], rather than ingesting data for just \[today-1\]. Only valid if the data source supports the feature. Set the value to 0 to use the default value. |
| `dataSourceId` | string | Data source ID. This cannot be changed once data transfer is created. The full list of available data source IDs can be returned through an API call: https://cloud.google.com/bigquery-transfer/docs/reference/datatransfer/rest/v1/projects.locations.dataSources/list |
| `datasetRegion` | string | Output only. Region in which BigQuery dataset is located. |
| `destinationDatasetId` | string | The BigQuery target dataset id. |
| `disabled` | boolean | Is this config disabled. When set to true, no runs will be scheduled for this transfer config. |
| `displayName` | string | User specified display name for the data transfer. |
| `emailPreferences` | EmailPreferences | Email notifications will be sent according to these preferences to the email address of the user who owns this transfer config. |
| `encryptionConfiguration` | EncryptionConfiguration | The encryption configuration part. Currently, it is only used for the optional KMS key name. The BigQuery service account of your project must be granted permissions to use the key. Read methods will return the key name applied in effect. Write methods will apply the key if it is present, or otherwise try to apply project default keys if it is absent. |
| `error` | Status | Output only. Error code with detailed information about reason of the latest config failure. |
| `managedTableType` | string enum | The classification of the destination table. Values: `MANAGED_TABLE_TYPE_UNSPECIFIED`, `NATIVE`, `BIGLAKE`. |
| `metadataDestination` | MetadataDestination | The metadata destination of the transfer config. |
| `name` | string | Identifier. The resource name of the transfer config. Transfer config names have the form either `projects/{project_id}/locations/{region}/transferConfigs/{config_id}` or `projects/{project_id}/transferConfigs/{config_id}`, where `config_id` is usually a UUID, even though it is not guaranteed or required. The name is ignored when creating a transfer config. |
| `nextRunTime` | string (google-datetime) | Output only. Next time when data transfer will run. |
| `notificationPubsubTopic` | string | Pub/Sub topic where notifications will be sent after transfer runs associated with this transfer config finish. The format for specifying a pubsub topic is: `projects/{project_id}/topics/{topic_id}` |
| `ownerInfo` | UserInfo | Output only. Information about the user whose credentials are used to transfer data. Populated only for `transferConfigs.get` requests. In case the user information is not available, this field will not be populated. |
| `paramConfig` | ParameterConfig | Optional. The config for values in `params`. |
| `params` | `map<string, any>` | Parameters specific to each data source. For more information see the bq tab in the 'Setting up a data transfer' section for each data source. For example the parameters for Cloud Storage transfers are listed here: https://cloud.google.com/bigquery-transfer/docs/cloud-storage-transfer#bq |
| `schedule` | string | Data transfer schedule. If the data source does not support a custom schedule, this should be empty. If it is empty, the default value for the data source will be used. The specified times are in UTC. Examples of valid format: `1st,3rd monday of month 15:30`, `every wed,fri of jan,jun 13:15`, and `first sunday of quarter 00:00`. See more explanation about the format here: https://cloud.google.com/appengine/docs/flexible/python/scheduling-jobs-with-cron-yaml#the_schedule_format NOTE: The minimum interval time between recurring transfers depends on the data source; refer to the documentation for your data source. |
| `scheduleOptions` | ScheduleOptions | Options customizing the data transfer schedule. |
| `scheduleOptionsV2` | ScheduleOptionsV2 | Options customizing different types of data transfer schedule. This field replaces "schedule" and "schedule_options" fields. ScheduleOptionsV2 cannot be used together with ScheduleOptions/Schedule. |
| `state` | string enum | Output only. State of the most recently updated transfer run. Values: `TRANSFER_STATE_UNSPECIFIED`, `PENDING`, `RUNNING`, `SUCCEEDED`, `FAILED`, `CANCELLED`. |
| `updateTime` | string (google-datetime) | Output only. Data transfer modification time. Ignored by server on input. |
| `userId` | string (int64) | Deprecated. Unique ID of the user on whose behalf transfer is done. |

### `TransferMessage` fields

| Field | Type | Description |
|---|---|---|
| `messageText` | string | Message text. |
| `messageTime` | string (google-datetime) | Time when message was logged. |
| `severity` | string enum | Message severity. Values: `MESSAGE_SEVERITY_UNSPECIFIED`, `INFO`, `WARNING`, `ERROR`. |

### `TransferResource` fields

| Field | Type | Description |
|---|---|---|
| `destination` | string enum | Optional. Resource destination. Values: `RESOURCE_DESTINATION_UNSPECIFIED`, `RESOURCE_DESTINATION_BIGQUERY`, `RESOURCE_DESTINATION_DATAPROC_METASTORE`, `RESOURCE_DESTINATION_BIGLAKE_METASTORE`, `RESOURCE_DESTINATION_BIGLAKE_REST_CATALOG`, `RESOURCE_DESTINATION_BIGLAKE_HIVE_CATALOG`. |
| `hierarchyDetail` | HierarchyDetail | Optional. Details about the hierarchy. |
| `lastSuccessfulRun` | TransferRunBrief | Output only. Run details for the last successful run. |
| `latestRun` | TransferRunBrief | Optional. Run details for the latest run. |
| `latestStatusDetail` | TransferResourceStatusDetail | Optional. Status details for the latest run. |
| `name` | string | Identifier. Resource name. |
| `type` | string enum | Optional. Resource type. Values: `RESOURCE_TYPE_UNSPECIFIED`, `RESOURCE_TYPE_TABLE`, `RESOURCE_TYPE_PARTITION`. |
| `updateTime` | string (google-datetime) | Output only. Time when the resource was last updated. |

### `TransferResourceStatusDetail` fields

| Field | Type | Description |
|---|---|---|
| `completedPercentage` | number (double) | Output only. Percentage of the transfer completed. Valid values: 0-100. |
| `error` | Status | Optional. Transfer error details for the resource. |
| `state` | string enum | Optional. Transfer state of the resource. Values: `RESOURCE_TRANSFER_STATE_UNSPECIFIED`, `RESOURCE_TRANSFER_PENDING`, `RESOURCE_TRANSFER_RUNNING`, `RESOURCE_TRANSFER_SUCCEEDED`, `RESOURCE_TRANSFER_FAILED`, `RESOURCE_TRANSFER_CANCELLED`. |
| `summary` | TransferStatusSummary | Optional. Transfer status summary of the resource. |

### `TransferRun` fields

| Field | Type | Description |
|---|---|---|
| `dataSourceId` | string | Output only. Data source id. |
| `destinationDatasetId` | string | Output only. The BigQuery target dataset id. |
| `emailPreferences` | EmailPreferences | Output only. Email notifications will be sent according to these preferences to the email address of the user who owns the transfer config this run was derived from. |
| `endTime` | string (google-datetime) | Output only. Time when transfer run ended. Parameter ignored by server for input requests. |
| `errorStatus` | Status | Status of the transfer run. |
| `name` | string | Identifier. The resource name of the transfer run. Transfer run names have the form `projects/{project_id}/locations/{location}/transferConfigs/{config_id}/runs/{run_id}`. The name is ignored when creating a transfer run. |
| `notificationPubsubTopic` | string | Output only. Pub/Sub topic where a notification will be sent after this transfer run finishes. The format for specifying a pubsub topic is: `projects/{project_id}/topics/{topic_id}` |
| `parameterConfig` | ParameterConfig | Output only. The parameter config of the transfer run. |
| `params` | `map<string, any>` | Output only. Parameters specific to each data source. For more information see the bq tab in the 'Setting up a data transfer' section for each data source. For example the parameters for Cloud Storage transfers are listed here: https://cloud.google.com/bigquery-transfer/docs/cloud-storage-transfer#bq |
| `runTime` | string (google-datetime) | For batch transfer runs, specifies the date and time of the data should be ingested. |
| `schedule` | string | Output only. Describes the schedule of this transfer run if it was created as part of a regular schedule. For batch transfer runs that are scheduled manually, this is empty. NOTE: the system might choose to delay the schedule depending on the current load, so `schedule_time` doesn't always match this. |
| `scheduleTime` | string (google-datetime) | Minimum time after which a transfer run can be started. |
| `startTime` | string (google-datetime) | Output only. Time when transfer run was started. Parameter ignored by server for input requests. |
| `state` | string enum | Data transfer run state. Ignored for input requests. Values: `TRANSFER_STATE_UNSPECIFIED`, `PENDING`, `RUNNING`, `SUCCEEDED`, `FAILED`, `CANCELLED`. |
| `updateTime` | string (google-datetime) | Output only. Last time the data transfer run state was updated. |
| `userId` | string (int64) | Deprecated. Unique ID of the user on whose behalf transfer is done. |

### `TransferRunBrief` fields

| Field | Type | Description |
|---|---|---|
| `run` | string | Optional. Run URI. The format must be: `projects/{project}/locations/{location}/transferConfigs/{transfer_config}/runs/{run}` (corrected from `/run/{run}`; see Notes) |
| `startTime` | string (google-datetime) | Optional. Start time of the transfer run. |

### `TransferStatusMetric` fields

| Field | Type | Description |
|---|---|---|
| `completed` | string (int64) | Optional. Number of units transferred successfully. |
| `failed` | string (int64) | Optional. Number of units that failed to transfer. |
| `pending` | string (int64) | Optional. Number of units pending transfer. |
| `total` | string (int64) | Optional. Total number of units for the transfer. |
| `unit` | string enum | Optional. Unit for measuring progress (e.g., BYTES). Values: `TRANSFER_STATUS_UNIT_UNSPECIFIED`, `TRANSFER_STATUS_UNIT_BYTES`, `TRANSFER_STATUS_UNIT_OBJECTS`. |

### `TransferStatusSummary` fields

| Field | Type | Description |
|---|---|---|
| `metrics` | `array<TransferStatusMetric>` | Optional. List of transfer status metrics. |
| `progressUnit` | string enum | Input only. Unit based on which transfer status progress should be calculated. Values: `TRANSFER_STATUS_UNIT_UNSPECIFIED`, `TRANSFER_STATUS_UNIT_BYTES`, `TRANSFER_STATUS_UNIT_OBJECTS`. |

### `UnenrollDataSourcesRequest` fields

| Field | Type | Description |
|---|---|---|
| `dataSourceIds` | `array<string>` | Data sources that are unenrolled. It is required to provide at least one data source id. |

### `UserInfo` fields

| Field | Type | Description |
|---|---|---|
| `email` | string | E-mail address of the user. |

## Notes

- Generated from the Discovery document(s) v1 of `bigquerydatatransfer` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Corrected from the official docs: the `TransferRunBrief.run` description gives the format `projects/{project}/locations/{location}/transferConfigs/{transfer_config}/run/{run}`; the collection is `runs` (the bigquerydatatransfer.v1 Discovery path pattern of `projects.locations.transferConfigs.runs.get` is `projects/[^/]+/locations/[^/]+/transferConfigs/[^/]+/runs/[^/]+`), so the value has the form `projects/{project}/locations/{location}/transferConfigs/{transfer_config}/runs/{run}`.
- Deprecated: `DataSource.supportsMultipleTransfers` (`deprecated: true` in the Discovery document and its description). Replacement or status stated in the description: "This field has no effect."
- Deprecated: `DataSource.transferType` (`deprecated: true` in the Discovery document and its description). Replacement or status stated in the description: "This field has no effect."
- Deprecated: `DataSourceParameter.fields` (its Discovery description). Replacement or status stated in the description: "This field has no effect."
- Deprecated: `DataSourceParameter.recurse` (its Discovery description). Replacement or status stated in the description: "This field has no effect."
- Deprecated: `DataSourceParameter.repeated` (its Discovery description). Replacement or status stated in the description: "This field has no effect."
- Deprecated: `TransferConfig.userId` (its Discovery description). The Discovery document states no replacement.
- Deprecated: `TransferRun.userId` (its Discovery description). The Discovery document states no replacement.
- Source: https://bigquerydatatransfer.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
