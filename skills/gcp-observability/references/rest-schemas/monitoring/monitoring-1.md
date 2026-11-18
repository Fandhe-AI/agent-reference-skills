---
source: https://monitoring.googleapis.com/$discovery/rest?version=v3
---

# Cloud Monitoring API message schemas (monitoring) (part 1/2)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/monitoring/`.

### `Aggregation`

- Describes how to combine multiple time series to provide a different view of the data. Aggregation of time series is done in two steps. First, each time series in the set is aligned to the same time interval boundaries, then the set of time series is optionally reduced in number.Alignment consists of applying the per_series_aligner operation to each time series after its data has been divided into regular alignment_period time intervals. This process takes all of the data points in an alignment period, applies a mathematical transformation such as averaging, minimum, maximum, delta, etc., and converts them into a single data point per period.Reduction is when the aligned and transformed time series can optionally be combined, reducing the number of time series through similar mathematical transformations. Reduction involves applying a cross_series_reducer to all the time series, optionally sorting the time series into subsets with group_by_fields, and applying the reducer to each subset.The raw time series data can contain a huge amount of information from multiple sources. Alignment and reduction transforms this mass of data into a more manageable and representative collection of data, for example "the 95% latency across the average of all tasks in a cluster". This representative data can be more easily graphed and comprehended, and the individual time series data is still available for later drilldown. For more details, see Filtering and aggregation (https://cloud.google.com/monitoring/api/v3/aggregation).
- Version: v3

| Field | Type | Description |
|---|---|---|
| `alignmentPeriod` | string (google-duration) | The alignment_period specifies a time interval, in seconds, that is used to divide the data in all the time series into consistent blocks of time. This will be done before the per-series aligner can be applied to the data.The value must be at least 60 seconds. If a per-series aligner other than ALIGN_NONE is specified, this field is required or an error is returned. If no per-series aligner is specified, or the aligner ALIGN_NONE is specified, then this field is ignored.The maximum value of the alignment_period is 104 weeks (2 years) for charts, and 90,000 seconds (25 hours) for alerting policies. |
| `crossSeriesReducer` | string enum | The reduction operation to be used to combine time series into a single time series, where the value of each data point in the resulting series is a function of all the already aligned values in the input time series.Not all reducer operations can be applied to all time series. The valid choices depend on the metric_kind and the value_type of the original time series. Reduction can yield a time series with a different metric_kind or value_type than the input time series.Time series data must first be aligned (see per_series_aligner) in order to perform cross-time series reduction. If cross_series_reducer is specified, then per_series_aligner must be specified, and must not be ALIGN_NONE. An alignment_period must also be specified; otherwise, an error is returned. Values: `REDUCE_NONE`, `REDUCE_MEAN`, `REDUCE_MIN`, `REDUCE_MAX`, `REDUCE_SUM`, `REDUCE_STDDEV`, `REDUCE_COUNT`, `REDUCE_COUNT_TRUE`, `REDUCE_COUNT_FALSE`, `REDUCE_FRACTION_TRUE`, `REDUCE_PERCENTILE_99`, `REDUCE_PERCENTILE_95`, `REDUCE_PERCENTILE_50`, `REDUCE_PERCENTILE_05`. |
| `groupByFields` | array<string> | The set of fields to preserve when cross_series_reducer is specified. The group_by_fields determine how the time series are partitioned into subsets prior to applying the aggregation operation. Each subset contains time series that have the same value for each of the grouping fields. Each individual time series is a member of exactly one subset. The cross_series_reducer is applied to each subset of time series. It is not possible to reduce across different resource types, so this field implicitly contains resource.type. Fields not specified in group_by_fields are aggregated away. If group_by_fields is not specified and all the time series have the same resource type, then the time series are aggregated into a single output time series. If cross_series_reducer is not defined, this field is ignored. |
| `perSeriesAligner` | string enum | An Aligner describes how to bring the data points in a single time series into temporal alignment. Except for ALIGN_NONE, all alignments cause all the data points in an alignment_period to be mathematically grouped together, resulting in a single data point for each alignment_period with end timestamp at the end of the period.Not all alignment operations may be applied to all time series. The valid choices depend on the metric_kind and value_type of the original time series. Alignment can change the metric_kind or the value_type of the time series.Time series data must be aligned in order to perform cross-time series reduction. If cross_series_reducer is specified, then per_series_aligner must be specified and not equal to ALIGN_NONE and alignment_period must be specified; otherwise, an error is returned. Values: `ALIGN_NONE`, `ALIGN_DELTA`, `ALIGN_RATE`, `ALIGN_INTERPOLATE`, `ALIGN_NEXT_OLDER`, `ALIGN_MIN`, `ALIGN_MAX`, `ALIGN_MEAN`, `ALIGN_COUNT`, `ALIGN_SUM`, `ALIGN_STDDEV`, `ALIGN_COUNT_TRUE`, `ALIGN_COUNT_FALSE`, `ALIGN_FRACTION_TRUE`, `ALIGN_PERCENTILE_99`, `ALIGN_PERCENTILE_95`, `ALIGN_PERCENTILE_50`, `ALIGN_PERCENTILE_05`, `ALIGN_PERCENT_CHANGE`. |

### `AggregationFunction`

- Preview: An identifier for an aggregation function. Aggregation functions are SQL functions that group or transform data from multiple points to a single point. This is a preview feature and may be subject to change before final release.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `parameters` | array<Parameter> | Optional. Parameters applied to the aggregation function. Only used for functions that require them. |
| `type` | string | Required. The type of aggregation function, must be one of the following: "none" - no function. "percentile" - APPROX_QUANTILES() - 1 parameter numeric value "average" - AVG() "count" - COUNT() "count-distinct" - COUNT(DISTINCT) "count-distinct-approx" - APPROX_COUNT_DISTINCT() "max" - MAX() "min" - MIN() "sum" - SUM() |

### `Alert`

- An alert is the representation of a violation of an alert policy. It is a read-only resource that cannot be modified by the accompanied API.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `closeTime` | string (google-datetime) | The time when the alert was closed. |
| `log` | LogMetadata | The log information associated with the alert. This field is only populated for log-based alerts. |
| `metadata` | MonitoredResourceMetadata | The metadata of the monitored resource. |
| `metric` | Metric | The metric type and any metric labels preserved from the incident's generating condition. |
| `name` | string | Identifier. The name of the alert.The format is: projects/\[PROJECT_ID_OR_NUMBER\]/alerts/\[ALERT_ID\] The \[ALERT_ID\] is a system-assigned unique identifier for the alert. |
| `openTime` | string (google-datetime) | The time when the alert was opened. |
| `policy` | PolicySnapshot | The snapshot of the alert policy that generated this alert. |
| `resource` | MonitoredResource | The monitored resource type and any monitored resource labels preserved from the incident's generating condition. |
| `state` | string enum | Output only. The current state of the alert. Values: `STATE_UNSPECIFIED`, `OPEN`, `CLOSED`. |

### `AlertChart`

- A chart that displays alert policy data.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Required. The resource name of the alert policy. The format is: projects/\[PROJECT_ID_OR_NUMBER\]/alertPolicies/\[ALERT_POLICY_ID\] |

### `AlertPolicy`

- A description of the conditions under which some aspect of your system is considered to be "unhealthy" and the ways to notify people or services about this state. For an overview of alerting policies, see Introduction to Alerting (https://cloud.google.com/monitoring/alerts/).
- Version: v3

| Field | Type | Description |
|---|---|---|
| `alertStrategy` | AlertStrategy | Control over how this alerting policy's notification channels are notified. |
| `combiner` | string enum | How to combine the results of multiple conditions to determine if an incident should be opened. If condition_time_series_query_language is present, this must be COMBINE_UNSPECIFIED. Values: `COMBINE_UNSPECIFIED`, `AND`, `OR`, `AND_WITH_MATCHING_RESOURCE`. |
| `conditions` | array<Condition> | A list of conditions for the policy. The conditions are combined by AND or OR according to the combiner field. If the combined conditions evaluate to true, then an incident is created. A policy can have from one to six conditions. If condition_time_series_query_language is present, it must be the only condition. If condition_monitoring_query_language is present, it must be the only condition. |
| `creationRecord` | MutationRecord | A read-only record of the creation of the alerting policy. If provided in a call to create or update, this field will be ignored. |
| `displayName` | string | A short name or phrase used to identify the policy in dashboards, notifications, and incidents. To avoid confusion, don't use the same display name for multiple policies in the same project. The name is limited to 512 Unicode characters.The convention for the display_name of a PrometheusQueryLanguageCondition is "{rule group name}/{alert name}", where the {rule group name} and {alert name} should be taken from the corresponding Prometheus configuration file. This convention is not enforced. In any case the display_name is not a unique key of the AlertPolicy. |
| `documentation` | Documentation | Documentation that is included with notifications and incidents related to this policy. Best practice is for the documentation to include information to help responders understand, mitigate, escalate, and correct the underlying problems detected by the alerting policy. Notification channels that have limited capacity might not show this documentation. |
| `enabled` | boolean | Whether or not the policy is enabled. On write, the default interpretation if unset is that the policy is enabled. On read, clients should not make any assumption about the state if it has not been populated. The field should always be populated on List and Get operations, unless a field projection has been specified that strips it out. |
| `mutationRecord` | MutationRecord | A read-only record of the most recent change to the alerting policy. If provided in a call to create or update, this field will be ignored. |
| `name` | string | Identifier. Required if the policy exists. The resource name for this policy. The format is: projects/\[PROJECT_ID_OR_NUMBER\]/alertPolicies/\[ALERT_POLICY_ID\] \[ALERT_POLICY_ID\] is assigned by Cloud Monitoring when the policy is created. When calling the alertPolicies.create method, do not include the name field in the alerting policy passed as part of the request. |
| `notificationChannels` | array<string> | Identifies the notification channels to which notifications should be sent when incidents are opened or closed or when new violations occur on an already opened incident. Each element of this array corresponds to the name field in each of the NotificationChannel objects that are returned from the ListNotificationChannels method. The format of the entries in this field is: projects/\[PROJECT_ID_OR_NUMBER\]/notificationChannels/\[CHANNEL_ID\] |
| `severity` | string enum | Optional. The severity of an alerting policy indicates how important incidents generated by that policy are. The severity level will be displayed on the Incident detail page and in notifications. Values: `SEVERITY_UNSPECIFIED`, `CRITICAL`, `ERROR`, `WARNING`. |
| `userLabels` | object | User-supplied key/value data to be used for organizing and identifying the AlertPolicy objects.The field can contain up to 64 entries. Each key and value is limited to 63 Unicode characters or 128 bytes, whichever is smaller. Labels and values can contain only lowercase letters, numerals, underscores, and dashes. Keys must begin with a letter.Note that Prometheus {alert name} is a valid Prometheus label names (https://prometheus.io/docs/concepts/data_model/#metric-names-and-labels), whereas Prometheus {rule group} is an unrestricted UTF-8 string. This means that they cannot be stored as-is in user labels, because they may contain characters that are not allowed in user-label values. |
| `validity` | Status | Read-only description of how the alerting policy is invalid. This field is only set when the alerting policy is invalid. An invalid alerting policy will not generate incidents. |

### `AlertStrategy`

- Control over how the notification channels in notification_channels are notified when this alert fires.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `autoClose` | string (google-duration) | If an alerting policy that was active has no data for this long, any open incidents will close |
| `notificationChannelStrategy` | array<NotificationChannelStrategy> | Control how notifications will be sent out, on a per-channel basis. |
| `notificationPrompts` | array<string> | For log-based alert policies, the notification prompts is always OPENED. For non log-based alert policies, the notification prompts can be OPENED or OPENED, CLOSED. Values: `NOTIFICATION_PROMPT_UNSPECIFIED`, `OPENED`, `CLOSED`. |
| `notificationRateLimit` | NotificationRateLimit | Required for log-based alerting policies, i.e. policies with a LogMatch condition.This limit is not implemented for alerting policies that do not have a LogMatch condition. |

### `AppEngine`

- App Engine service. Learn more at https://cloud.google.com/appengine.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `moduleId` | string | The ID of the App Engine module underlying this service. Corresponds to the module_id resource label in the gae_app monitored resource (https://cloud.google.com/monitoring/api/resources#tag_gae_app). |

### `AvailabilityCriteria`

- Future parameters for the availability SLI.
- Version: v3

### `Axis`

- A chart axis.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `label` | string | The label of the axis. |
| `scale` | string enum | The axis scale. By default, a linear scale is used. Values: `SCALE_UNSPECIFIED`, `LINEAR`, `LOG10`. |

### `BasicAuthentication`

- The authentication parameters to provide to the specified resource or URL that requires a username and password. Currently, only Basic HTTP authentication (https://tools.ietf.org/html/rfc7617) is supported in Uptime checks.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `password` | string | The password to use when authenticating with the HTTP server. |
| `username` | string | The username to use when authenticating with the HTTP server. |

### `BasicService`

- A well-known service type, defined by its service type and service labels. Documentation and examples here (https://cloud.google.com/stackdriver/docs/solutions/slo-monitoring/api/api-structures#basic-svc-w-basic-sli).
- Version: v3

| Field | Type | Description |
|---|---|---|
| `serviceLabels` | object | Labels that specify the resource that emits the monitoring data which is used for SLO reporting of this Service. Documentation and valid values for given service types here (https://cloud.google.com/stackdriver/docs/solutions/slo-monitoring/api/api-structures#basic-svc-w-basic-sli). |
| `serviceType` | string | The type of service that this basic service defines, e.g. APP_ENGINE service type. Documentation and valid values here (https://cloud.google.com/stackdriver/docs/solutions/slo-monitoring/api/api-structures#basic-svc-w-basic-sli). |

### `BasicSli`

- An SLI measuring performance on a well-known service type. Performance will be computed on the basis of pre-defined metrics. The type of the service_resource determines the metrics to use and the service_resource.labels and metric_labels are used to construct a monitoring filter to filter that metric down to just the data relevant to this service.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `availability` | AvailabilityCriteria | Good service is defined to be the count of requests made to this service that return successfully. |
| `latency` | LatencyCriteria | Good service is defined to be the count of requests made to this service that are fast enough with respect to latency.threshold. |
| `location` | array<string> | OPTIONAL: The set of locations to which this SLI is relevant. Telemetry from other locations will not be used to calculate performance for this SLI. If omitted, this SLI applies to all locations in which the Service has activity. For service types that don't support breaking down by location, setting this field will result in an error. |
| `method` | array<string> | OPTIONAL: The set of RPCs to which this SLI is relevant. Telemetry from other methods will not be used to calculate performance for this SLI. If omitted, this SLI applies to all the Service's methods. For service types that don't support breaking down by method, setting this field will result in an error. |
| `version` | array<string> | OPTIONAL: The set of API versions to which this SLI is relevant. Telemetry from other API versions will not be used to calculate performance for this SLI. If omitted, this SLI applies to all API versions. For service types that don't support breaking down by version, setting this field will result in an error. |

### `BooleanTest`

- A test that uses an alerting result in a boolean column produced by the SQL query.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `column` | string | Required. The name of the column containing the boolean value. If the value in a row is NULL, that row is ignored. |

### `Breakdown`

- Preview: A breakdown is an aggregation applied to the measures over a specified column. A breakdown can result in multiple series across a category for the provided measure. This is a preview feature and may be subject to change before final release.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `aggregationFunction` | AggregationFunction | Required. The Aggregation function is applied across all data in each breakdown created. |
| `column` | string | Required. The name of the column in the dataset containing the breakdown values. |
| `limit` | integer (int32) | Required. A limit to the number of breakdowns. If set to zero then all possible breakdowns are applied. The list of breakdowns is dependent on the value of the sort_order field. |
| `sortOrder` | string enum | Required. The sort order is applied to the values of the breakdown column. Values: `SORT_ORDER_UNSPECIFIED`, `SORT_ORDER_NONE`, `SORT_ORDER_ASCENDING`, `SORT_ORDER_DESCENDING`. |

### `BucketOptions`

- BucketOptions describes the bucket boundaries used to create a histogram for the distribution. The buckets can be in a linear sequence, an exponential sequence, or each bucket can be specified explicitly. BucketOptions does not include the number of values in each bucket.A bucket has an inclusive lower bound and exclusive upper bound for the values that are counted for that bucket. The upper bound of a bucket must be strictly greater than the lower bound. The sequence of N buckets for a distribution consists of an underflow bucket (number 0), zero or more finite buckets (number 1 through N - 2) and an overflow bucket (number N - 1). The buckets are contiguous: the lower bound of bucket i (i > 0) is the same as the upper bound of bucket i - 1. The buckets span the whole range of finite values: lower bound of the underflow bucket is -infinity and the upper bound of the overflow bucket is +infinity. The finite buckets are so-called because both bounds are finite.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `explicitBuckets` | Explicit | The explicit buckets. |
| `exponentialBuckets` | Exponential | The exponential buckets. |
| `linearBuckets` | Linear | The linear bucket. |

### `ChartOptions`

- Options to control visual rendering of a chart.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `displayHorizontal` | boolean | Preview: Configures whether the charted values are shown on the horizontal or vertical axis. By default, values are represented the vertical axis. This is a preview feature and may be subject to change before final release. |
| `mode` | string enum | The chart mode. Values: `MODE_UNSPECIFIED`, `COLOR`, `X_RAY`, `STATS`. |

### `CloudEndpoints`

- Cloud Endpoints service. Learn more at https://cloud.google.com/endpoints.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `service` | string | The name of the Cloud Endpoints service underlying this service. Corresponds to the service resource label in the api monitored resource (https://cloud.google.com/monitoring/api/resources#tag_api). |

### `CloudFunctionV2Target`

- A Synthetic Monitor deployed to a Cloud Functions V2 instance.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `cloudRunRevision` | MonitoredResource | Output only. The cloud_run_revision Monitored Resource associated with the GCFv2. The Synthetic Monitor execution results (metrics, logs, and spans) are reported against this Monitored Resource. This field is output only. |
| `name` | string | Required. Fully qualified GCFv2 resource name i.e. projects/{project}/locations/{location}/functions/{function} Required. |

### `CloudRun`

- Cloud Run service. Learn more at https://cloud.google.com/run.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `location` | string | The location the service is run. Corresponds to the location resource label in the cloud_run_revision monitored resource (https://cloud.google.com/monitoring/api/resources#tag_cloud_run_revision). |
| `serviceName` | string | The name of the Cloud Run service. Corresponds to the service_name resource label in the cloud_run_revision monitored resource (https://cloud.google.com/monitoring/api/resources#tag_cloud_run_revision). |

### `ClusterIstio`

- Istio service scoped to a single Kubernetes cluster. Learn more at https://istio.io. Clusters running OSS Istio will have their services ingested as this type.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `clusterName` | string | The name of the Kubernetes cluster in which this Istio service is defined. Corresponds to the cluster_name resource label in k8s_cluster resources. |
| `location` | string | The location of the Kubernetes cluster in which this Istio service is defined. Corresponds to the location resource label in k8s_cluster resources. |
| `serviceName` | string | The name of the Istio service underlying this service. Corresponds to the destination_service_name metric label in Istio metrics. |
| `serviceNamespace` | string | The namespace of the Istio service underlying this service. Corresponds to the destination_service_namespace metric label in Istio metrics. |

### `CollapsibleGroup`

- A widget that groups the other widgets. All widgets that are within the area spanned by the grouping widget are considered member widgets.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `collapsed` | boolean | The collapsed state of the widget on first page load. |

### `CollectdPayload`

- A collection of data points sent from a collectd-based plugin. See the collectd documentation for more information.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `endTime` | string (google-datetime) | The end time of the interval. |
| `metadata` | object | The measurement metadata. Example: "process_id" -> 12345 |
| `plugin` | string | The name of the plugin. Example: "disk". |
| `pluginInstance` | string | The instance name of the plugin Example: "hdcl". |
| `startTime` | string (google-datetime) | The start time of the interval. |
| `type` | string | The measurement type. Example: "memory". |
| `typeInstance` | string | The measurement type instance. Example: "used". |
| `values` | array<CollectdValue> | The measured values during this time interval. Each value must have a different data_source_name. |

### `CollectdPayloadError`

- Describes the error status for payloads that were not written.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `error` | Status | Records the error status for the payload. If this field is present, the partial errors for nested values won't be populated. |
| `index` | integer (int32) | The zero-based index in CreateCollectdTimeSeriesRequest.collectd_payloads. |
| `valueErrors` | array<CollectdValueError> | Records the error status for values that were not written due to an error.Failed payloads for which nothing is written will not include partial value errors. |

### `CollectdValue`

- A single data point from a collectd-based plugin.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `dataSourceName` | string | The data source for the collectd value. For example, there are two data sources for network measurements: "rx" and "tx". |
| `dataSourceType` | string enum | The type of measurement. Values: `UNSPECIFIED_DATA_SOURCE_TYPE`, `GAUGE`, `COUNTER`, `DERIVE`, `ABSOLUTE`. |
| `value` | TypedValue | The measurement value. |

### `CollectdValueError`

- Describes the error status for values that were not written.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `error` | Status | Records the error status for the value. |
| `index` | integer (int32) | The zero-based index in CollectdPayload.values within the parent CreateCollectdTimeSeriesRequest.collectd_payloads. |

### `Column`

- Defines the layout properties and content for a column.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `weight` | string (int64) | The relative weight of this column. The column weight is used to adjust the width of columns on the screen (relative to peers). Greater the weight, greater the width of the column on the screen. If omitted, a value of 1 is used while rendering. |
| `widgets` | array<Widget> | The display widgets arranged vertically in this column. |

### `ColumnLayout`

- A simplified layout that divides the available space into vertical columns and arranges a set of widgets vertically in each column.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `columns` | array<Column> | The columns of content to display. |

### `ColumnSettings`

- The persistent settings for a table's columns.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `alignment` | string enum | Optional. Whether the column should be left / middle / right aligned Values: `CELL_ALIGNMENT_UNSPECIFIED`, `LEFT`, `CENTER`, `RIGHT`. |
| `column` | string | Required. The id of the column. |
| `displayName` | string | Optional. Display name of the column |
| `thresholds` | array<Threshold> | Optional. The thresholds used to determine how the table cell should be rendered given the time series' current value. |
| `visible` | boolean | Required. Whether the column should be visible on page load. |

### `ColumnSortingOptions`

- Data structure to storing column's sort strategy
- Version: v1

| Field | Type | Description |
|---|---|---|
| `column` | string | Optional. Column name to sort data by |
| `direction` | string enum | Optional. A sorting direction that determines ascending or descending order. This is a legacy field kept for backwards compatibility with table. Values: `SORT_ORDER_UNSPECIFIED`, `SORT_ORDER_NONE`, `SORT_ORDER_ASCENDING`, `SORT_ORDER_DESCENDING`. |

### `Condition`

- A condition is a true/false test that determines when an alerting policy should open an incident. If a condition evaluates to true, it signifies that something is wrong.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `conditionAbsent` | MetricAbsence | A condition that checks that a time series continues to receive new data points. |
| `conditionMatchedLog` | LogMatch | A condition that checks for log messages matching given constraints. If set, no other conditions can be present. |
| `conditionMonitoringQueryLanguage` | MonitoringQueryLanguageCondition | A condition that uses the Monitoring Query Language to define alerts. |
| `conditionPrometheusQueryLanguage` | PrometheusQueryLanguageCondition | A condition that uses the Prometheus query language to define alerts. |
| `conditionSql` | SqlCondition | A condition that periodically evaluates a SQL query result. |
| `conditionThreshold` | MetricThreshold | A condition that compares a time series against a threshold. |
| `displayName` | string | A short name or phrase used to identify the condition in dashboards, notifications, and incidents. To avoid confusion, don't use the same display name for multiple conditions in the same policy. |
| `name` | string | Required if the condition exists. The unique resource name for this condition. Its format is: projects/\[PROJECT_ID_OR_NUMBER\]/alertPolicies/\[POLICY_ID\]/conditions/\[CONDITION_ID\] \[CONDITION_ID\] is assigned by Cloud Monitoring when the condition is created as part of a new or updated alerting policy.When calling the alertPolicies.create method, do not include the name field in the conditions of the requested alerting policy. Cloud Monitoring creates the condition identifiers and includes them in the new policy.When calling the alertPolicies.update method to update a policy, including a condition name causes the existing condition to be updated. Conditions without names are added to the updated policy. Existing conditions are deleted if they are not updated.Best practice is to preserve \[CONDITION_ID\] if you make only small changes, such as those to condition thresholds, durations, or trigger values. Otherwise, treat the change as a new condition and let the existing condition be deleted. |

### `ContentMatcher`

- Optional. Used to perform content matching. This allows matching based on substrings and regular expressions, together with their negations. Only the first 4 MB of an HTTP or HTTPS check's response (and the first 1 MB of a TCP check's response) are examined for purposes of content matching.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `content` | string | String, regex or JSON content to match. Maximum 1024 bytes. An empty content string indicates no content matching is to be performed. |
| `jsonPathMatcher` | JsonPathMatcher | Matcher information for MATCHES_JSON_PATH and NOT_MATCHES_JSON_PATH |
| `matcher` | string enum | The type of content matcher that will be applied to the server output, compared to the content string when the check is run. Values: `CONTENT_MATCHER_OPTION_UNSPECIFIED`, `CONTAINS_STRING`, `NOT_CONTAINS_STRING`, `MATCHES_REGEX`, `NOT_MATCHES_REGEX`, `MATCHES_JSON_PATH`, `NOT_MATCHES_JSON_PATH`. |

### `CreateCollectdTimeSeriesRequest`

- The CreateCollectdTimeSeries request.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `collectdPayloads` | array<CollectdPayload> | The collectd payloads representing the time series data. You must not include more than a single point for each time series, so no two payloads can have the same values for all of the fields plugin, plugin_instance, type, and type_instance. |
| `collectdVersion` | string | The version of collectd that collected the data. Example: "5.3.0-192.el6". |
| `resource` | MonitoredResource | The monitored resource associated with the time series. |

### `CreateCollectdTimeSeriesResponse`

- The CreateCollectdTimeSeries response.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `payloadErrors` | array<CollectdPayloadError> | Records the error status for points that were not written due to an error in the request.Failed requests for which nothing is written will return an error response instead. Requests where data points were rejected by the backend will set summary instead. |
| `summary` | CreateTimeSeriesSummary | Aggregate statistics from writing the payloads. This field is omitted if all points were successfully written, so that the response is empty. This is for backwards compatibility with clients that log errors on any non-empty response. |

### `CreateTimeSeriesRequest`

- The CreateTimeSeries request.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `timeSeries` | array<TimeSeries> | Required. The new data to be added to a list of time series. Adds at most one data point to each of several time series. The new data point must be more recent than any other point in its time series. Each TimeSeries value must fully specify a unique time series by supplying all label values for the metric and the monitored resource.The maximum number of TimeSeries objects per Create request is 200. |

### `CreateTimeSeriesSummary`

- Summary of the result of a failed request to write data to a time series.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `errors` | array<Error> | The number of points that failed to be written. Order is not guaranteed. |
| `successPointCount` | integer (int32) | The number of points that were successfully written. |
| `totalPointCount` | integer (int32) | The number of points in the request. |

### `Criteria`

- Criteria specific to the AlertPolicys that this Snooze applies to. The Snooze will suppress alerts that come from one of the AlertPolicys whose names are supplied.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `filter` | string | Optional. When you define a snooze, you can also define a filter for that snooze. The filter is a string containing one or more key-value pairs. The string uses the standard https://google.aip.dev/160 filter syntax. If you define a filter for a snooze, then the snooze can only apply to one alert policy. When the snooze is active, incidents won't be created when the incident would have key-value pairs (labels) that match those specified by the filter in the snooze.Snooze filters support resource, metric, and metadata labels. If multiple labels are used, then they must be connected with an AND operator. For example, the following filter applies the snooze to incidents that have a resource label with an instance ID of 1234567890, a metric label with an instance name of test_group, a metadata user label with a key of foo and a value of bar, and a metadata system label with a key of region and a value of us-central1: "filter": "resource.labels.instance_id=\"1234567890\" AND metric.labels.instance_name=\"test_group\" AND metadata.user_labels.foo=\"bar\" AND metadata.system_labels.region=\"us-central1\"" |
| `policies` | array<string> | The specific AlertPolicy names for the alert that should be snoozed. The format is: projects/\[PROJECT_ID_OR_NUMBER\]/alertPolicies/\[POLICY_ID\] There is a limit of 16 policies per snooze. This limit is checked during snooze creation. Exactly 1 alert policy is required if filter is specified at the same time. |

### `Custom`

- Use a custom service to designate a service that you want to monitor when none of the other service types (like App Engine, Cloud Run, or a GKE type) matches your intended service.
- Version: v3

### `Daily`

- Used to schedule the query to run every so many days.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `executionTime` | TimeOfDay | Optional. The time of day (in UTC) at which the query should run. If left unspecified, the server picks an arbitrary time of day and runs the query at the same time each day. |
| `periodicity` | integer (int32) | Required. The number of days between runs. Must be greater than or equal to 1 day and less than or equal to 31 days. |

### `Dashboard`

- A Google Stackdriver dashboard. Dashboards define the content and layout of pages in the Stackdriver web application.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `annotations` | DashboardAnnotations | Configuration for event annotations to display on this dashboard. |
| `columnLayout` | ColumnLayout | The content is divided into equally spaced columns and the widgets are arranged vertically. |
| `dashboardFilters` | array<DashboardFilter> | Filters to reduce the amount of data charted based on the filter criteria. |
| `displayName` | string | Required. The mutable, human-readable name. |
| `etag` | string | etag is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. An etag is returned in the response to GetDashboard, and users are expected to put that etag in the request to UpdateDashboard to ensure that their change will be applied to the same version of the Dashboard configuration. The field should not be passed during dashboard creation. |
| `gridLayout` | GridLayout | Content is arranged with a basic layout that re-flows a simple list of informational elements like widgets or tiles. |
| `labels` | object | Labels applied to the dashboard |
| `mosaicLayout` | MosaicLayout | The content is arranged as a grid of tiles, with each content widget occupying one or more grid blocks. |
| `name` | string | Identifier. The resource name of the dashboard. |
| `rowLayout` | RowLayout | The content is divided into equally spaced rows and the widgets are arranged horizontally. |

### `DashboardAnnotations`

- Dashboard-level configuration for annotations
- Version: v1

| Field | Type | Description |
|---|---|---|
| `defaultResourceNames` | array<string> | Dashboard level defaults for names of logging resources to search for events. Currently only projects are supported. Each individual EventAnnotation may have its own overrides. If both this field and the per annotation field is empty, then the scoping project is used. Limit: 50 projects. For example: “projects/some-project-id” |
| `eventAnnotations` | array<EventAnnotation> | List of annotation configurations for this dashboard. Each entry specifies one event type. |

### `DashboardFilter`

- A filter to reduce the amount of data charted in relevant widgets.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `filterType` | string enum | The specified filter type Values: `FILTER_TYPE_UNSPECIFIED`, `RESOURCE_LABEL`, `METRIC_LABEL`, `USER_METADATA_LABEL`, `SYSTEM_METADATA_LABEL`, `GROUP`, `VALUE_ONLY`. |
| `labelKey` | string | Optional. The key for the label. This must be omitted if the filter_type is VALUE_ONLY but is required otherwise. |
| `stringArray` | StringArray | A list of possible string values for the filter |
| `stringArrayValue` | StringArray | An array of variable-length string values. If this field is set, value_type must be set to STRING_ARRAY or VALUE_TYPE_UNSPECIFIED |
| `stringValue` | string | A variable-length string value. If this field is set, value_type must be set to STRING or VALUE_TYPE_UNSPECIFIED |
| `templateVariable` | string | The placeholder text that can be referenced in a filter string or MQL query. If omitted, the dashboard filter will be applied to all relevant widgets in the dashboard. |
| `timeSeriesQuery` | TimeSeriesQuery | A query to run to fetch possible values for the filter. Only OpsAnalyticsQueries are supported |
| `valueType` | string enum | The type of the filter value. If value_type is not provided, it will be inferred from the default_value. If neither value_type nor default_value is provided, value_type will be set to STRING by default. Values: `VALUE_TYPE_UNSPECIFIED`, `STRING`, `STRING_ARRAY`. |

### `DataSet`

- Groups a time series query definition with charting options.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `breakdowns` | array<Breakdown> | Optional. The collection of breakdowns to be applied to the dataset. |
| `dimensions` | array<Dimension> | Optional. A collection of dimension columns. |
| `legendTemplate` | string | A template string for naming TimeSeries in the resulting data set. This should be a string with interpolations of the form ${label_name}, which will resolve to the label's value. |
| `measures` | array<Measure> | Optional. A collection of measures. |
| `minAlignmentPeriod` | string (google-duration) | Optional. The lower bound on data point frequency for this data set, implemented by specifying the minimum alignment period to use in a time series query. For example, if the data is published once every 10 minutes, the min_alignment_period should be at least 10 minutes. It would not make sense to fetch and align data at one minute intervals.For PromQL queries, this field is used to set the minimum interval for the query step, controlling data granularity. Larger values can improve performance on long time ranges. See Querying Basics and Range Queries for more details on the PromQL step. |
| `plotType` | string enum | How this data should be plotted on the chart. Values: `PLOT_TYPE_UNSPECIFIED`, `LINE`, `STACKED_AREA`, `STACKED_BAR`, `HEATMAP`. |
| `sort` | array<ColumnSortingOptions> | Optional. A collection of sort options, affects the order of the data and legend. |
| `targetAxis` | string enum | Optional. The target axis to use for plotting the metric. Values: `TARGET_AXIS_UNSPECIFIED`, `Y1`, `Y2`. |
| `timeSeriesQuery` | TimeSeriesQuery | Required. Fields for querying time series data from the Stackdriver metrics API. |

### `Dimension`

- A chart dimension. Dimensions are a structured label, class, or category for a set of measurements in your data.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `column` | string | Required. For widgets that use SQL queries, set the value to the name of the column in the results table whose data is charted. For a histogram that uses a time series query, set the value of this field to metric_value. |
| `columnType` | string | Optional. The type of the dimension column. This is relevant only if one of the bin_size fields is set. If it is empty, the type TIMESTAMP or INT64 will be assumed based on which bin_size field is set. If populated, this should be set to one of the following types: DATE, TIME, DATETIME, TIMESTAMP, BIGNUMERIC, INT64, NUMERIC, FLOAT64. |
| `floatBinSize` | number (double) | Optional. float_bin_size is used when the column type used for a dimension is a floating point numeric column. |
| `maxBinCount` | integer (int32) | For widgets that use SQL queries, the limit to the number of bins to generate. When 0 is specified, the maximum count is not enforced. For a histogram that uses a time series query, the exact number of bins to generate. If not specified or the value is 0, then the histogram determines the number of bins to use. |
| `numericBinSize` | integer (int32) | numeric_bin_size is used when the column type used for a dimension is numeric or string. If the column field is set to metric_value, then numericBinSize overrides maxBinCount. |
| `sortColumn` | string | The column name to sort on for binning. This column can be the same column as this dimension or any other column used as a measure in the results. If sort_order is set to NONE, then this value is not used. |
| `sortOrder` | string enum | The sort order applied to the sort column. Values: `SORT_ORDER_UNSPECIFIED`, `SORT_ORDER_NONE`, `SORT_ORDER_ASCENDING`, `SORT_ORDER_DESCENDING`. |
| `timeBinSize` | string (google-duration) | time_bin_size is used when the data type of the specified dimension is a time type and the bin size is determined by a time duration. If column_type is DATE, this must be a whole value multiple of 1 day. If column_type is TIME, this must be less than or equal to 24 hours. |
| `xMax` | number (double) | The maximum value for the x-axis. |
| `xMin` | number (double) | The minimum value for the x-axis. |

### `Distribution`

- Distribution contains summary statistics for a population of values. It optionally contains a histogram representing the distribution of those values across a set of buckets.The summary statistics are the count, mean, sum of the squared deviation from the mean, the minimum, and the maximum of the set of population of values. The histogram is based on a sequence of buckets and gives a count of values that fall into each bucket. The boundaries of the buckets are given either explicitly or by formulas for buckets of fixed or exponentially increasing widths.Although it is not forbidden, it is generally a bad idea to include non-finite values (infinities or NaNs) in the population of values, as this will render the mean and sum_of_squared_deviation fields meaningless.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `bucketCounts` | array<string> | Required in the Cloud Monitoring API v3. The values for each bucket specified in bucket_options. The sum of the values in bucketCounts must equal the value in the count field of the Distribution object. The order of the bucket counts follows the numbering schemes described for the three bucket types. The underflow bucket has number 0; the finite buckets, if any, have numbers 1 through N-2; and the overflow bucket has number N-1. The size of bucket_counts must not be greater than N. If the size is less than N, then the remaining buckets are assigned values of zero. |
| `bucketOptions` | BucketOptions | Required in the Cloud Monitoring API v3. Defines the histogram bucket boundaries. |
| `count` | string (int64) | The number of values in the population. Must be non-negative. This value must equal the sum of the values in bucket_counts if a histogram is provided. |
| `exemplars` | array<Exemplar> | Must be in increasing order of value field. |
| `mean` | number (double) | The arithmetic mean of the values in the population. If count is zero then this field must be zero. |
| `range` | Range | If specified, contains the range of the population values. The field must not be present if the count is zero. This field is presently ignored by the Cloud Monitoring API v3. |
| `sumOfSquaredDeviation` | number (double) | The sum of squared deviations from the mean of the values in the population. For values x_i this is: Sum\[i=1..n\]((x_i - mean)^2) Knuth, "The Art of Computer Programming", Vol. 2, page 232, 3rd edition describes Welford's method for accumulating this sum in one pass.If count is zero then this field must be zero. |

### `DistributionCut`

- A DistributionCut defines a TimeSeries and thresholds used for measuring good service and total service. The TimeSeries must have ValueType = DISTRIBUTION and MetricKind = DELTA or MetricKind = CUMULATIVE. The computed good_service will be the estimated count of values in the Distribution that fall within the specified min and max.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `distributionFilter` | string | A monitoring filter (https://cloud.google.com/monitoring/api/v3/filters) specifying a TimeSeries aggregating values. Must have ValueType = DISTRIBUTION and MetricKind = DELTA or MetricKind = CUMULATIVE. |
| `range` | GoogleMonitoringV3Range | Range of values considered "good." For a one-sided range, set one bound to an infinite value. |

### `Documentation`

- Documentation that is included in the notifications and incidents pertaining to this policy.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `content` | string | The body of the documentation, interpreted according to mime_type. The content may not exceed 8,192 Unicode characters and may not exceed more than 10,240 bytes when encoded in UTF-8 format, whichever is smaller. This text can be templatized by using variables (https://cloud.google.com/monitoring/alerts/doc-variables#doc-vars). |
| `links` | array<Link> | Optional. Links to content such as playbooks, repositories, and other resources. This field can contain up to 3 entries. |
| `mimeType` | string | The format of the content field. Presently, only the value "text/markdown" is supported. See Markdown (https://en.wikipedia.org/wiki/Markdown) for more information. |
| `subject` | string | Optional. The subject line of the notification. The subject line may not exceed 10,240 bytes. In notifications generated by this policy, the contents of the subject line after variable expansion will be truncated to 255 bytes or shorter at the latest UTF-8 character boundary. The 255-byte limit is recommended by this thread (https://stackoverflow.com/questions/1592291/what-is-the-email-subject-length-limit). It is both the limit imposed by some third-party ticketing products and it is common to define textual fields in databases as VARCHAR(255).The contents of the subject line can be templatized by using variables (https://cloud.google.com/monitoring/alerts/doc-variables#doc-vars). If this field is missing or empty, a default subject line will be generated. |

### `DroppedLabels`

- A set of (label, value) pairs that were removed from a Distribution time series during aggregation and then added as an attachment to a Distribution.Exemplar.The full label set for the exemplars is constructed by using the dropped pairs in combination with the label values that remain on the aggregated Distribution time series. The constructed full label set can be used to identify the specific entity, such as the instance or job, which might be contributing to a long-tail. However, with dropped labels, the storage requirements are reduced because only the aggregated distribution values for a large group of time series are stored.Note that there are no guarantees on ordering of the labels from exemplar-to-exemplar and from distribution-to-distribution in the same stream, and there may be duplicates. It is up to clients to resolve any ambiguities.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `label` | object | Map from label to its value, for all labels dropped in any aggregation. |

### `Empty`

- A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
- Version: v3

### `Error`

- Detailed information about an error category.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `pointCount` | integer (int32) | The number of points that couldn't be written because of status. |
| `status` | Status | The status of the requested write operation. |

### `ErrorReportingPanel`

- A widget that displays a list of error groups.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `projectNames` | array<string> | The resource name of the Google Cloud Platform project. Written as projects/{projectID} or projects/{projectNumber}, where {projectID} and {projectNumber} can be found in the Google Cloud console (https://support.google.com/cloud/answer/6158840).Examples: projects/my-project-123, projects/5551234. |
| `services` | array<string> | An identifier of the service, such as the name of the executable, job, or Google App Engine service name. This field is expected to have a low number of values that are relatively stable over time, as opposed to version, which can be changed whenever new code is deployed.Contains the service name for error reports extracted from Google App Engine logs or default if the App Engine default service is used. |
| `versions` | array<string> | Represents the source code version that the developer provided, which could represent a version label or a Git SHA-1 hash, for example. For App Engine standard environment, the version is set to the version of the app. |

### `EventAnnotation`

- Annotation configuration for one event type on a dashboard
- Version: v1

| Field | Type | Description |
|---|---|---|
| `displayName` | string | Solely for UI display. Should not be used programmatically. |
| `enabled` | boolean | Whether or not to show the events on the dashboard by default |
| `eventType` | string enum | The type of event to display. Values: `EVENT_TYPE_UNSPECIFIED`, `GKE_WORKLOAD_DEPLOYMENT`, `GKE_POD_CRASH`, `GKE_POD_UNSCHEDULABLE`, `GKE_CONTAINER_CREATION_FAILED`, `GKE_CLUSTER_CREATE_DELETE`, `GKE_CLUSTER_UPDATE`, `GKE_NODE_POOL_UPDATE`, `GKE_CLUSTER_AUTOSCALER`, `GKE_POD_AUTOSCALER`, `VM_TERMINATION`, `VM_GUEST_OS_ERROR`, `VM_START_FAILED`, `MIG_UPDATE`, `MIG_AUTOSCALER`, `CLOUD_RUN_DEPLOYMENT`, `CLOUD_SQL_FAILOVER`, `CLOUD_SQL_START_STOP`, `CLOUD_SQL_STORAGE`, `UPTIME_CHECK_FAILURE`, `CLOUD_ALERTING_ALERT`, `SERVICE_HEALTH_INCIDENT`, `SAP_BACKINT`, `SAP_AVAILABILITY`, `SAP_OPERATIONS`, `INTERCONNECT_MAINTENANCE_STARTED`, `INTERCONNECT_MAINTENANCE_COMPLETED`, `VPN_TRAFFIC_SELECTOR_NARROWING`, `VPN_MAINTENANCE`. |
| `filter` | string | string filtering the events - event dependant. Example values: "resource.labels.pod_name = 'pod-1'" "protoPayload.authenticationInfo.principalEmail='user@example.com'" |
| `resourceNames` | array<string> | Per annotation level override for the names of logging resources to search for events. Currently only projects are supported. If both this field and the per annotation field is empty, it will default to the host project. Limit: 50 projects. For example: “projects/another-project-id” |

### `Exemplar`

- Exemplars are example points that may be used to annotate aggregated distribution values. They are metadata that gives information about a particular value added to a Distribution bucket, such as a trace ID that was active when a value was added. They may contain further information, such as a example values and timestamps, origin, etc.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `attachments` | array<object> | Contextual information about the example value. Examples are:Trace: type.googleapis.com/google.monitoring.v3.SpanContextLiteral string: type.googleapis.com/google.protobuf.StringValueLabels dropped during aggregation: type.googleapis.com/google.monitoring.v3.DroppedLabelsThere may be only a single attachment of any given message type in a single exemplar, and this is enforced by the system. |
| `timestamp` | string (google-datetime) | The observation (sampling) time of the above value. |
| `value` | number (double) | Value of the exemplar point. This value determines to which bucket the exemplar belongs. |

### `Explicit`

- Specifies a set of buckets with arbitrary widths.There are size(bounds) + 1 (= N) buckets. Bucket i has the following boundaries:Upper bound (0 <= i < N-1): boundsi Lower bound (1 <= i < N); boundsi - 1The bounds field must contain at least one element. If bounds has only one element, then there are no finite buckets, and that single element is the common boundary of the overflow and underflow buckets.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `bounds` | array<number> | The values must be monotonically increasing. |

### `Exponential`

- Specifies an exponential sequence of buckets that have a width that is proportional to the value of the lower bound. Each bucket represents a constant relative uncertainty on a specific value in the bucket.There are num_finite_buckets + 2 (= N) buckets. Bucket i has the following boundaries:Upper bound (0 <= i < N-1): scale \* (growth_factor ^ i).Lower bound (1 <= i < N): scale \* (growth_factor ^ (i - 1)).
- Version: v3

| Field | Type | Description |
|---|---|---|
| `growthFactor` | number (double) | Must be greater than 1. |
| `numFiniteBuckets` | integer (int32) | Must be greater than 0. |
| `scale` | number (double) | Must be greater than 0. |

### `Field`

- A single field of a message type.New usages of this message as an alternative to FieldDescriptorProto are strongly discouraged. This message does not reliability preserve all information necessary to model the schema and preserve semantics. Instead make use of FileDescriptorSet which preserves the necessary information.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `cardinality` | string enum | The field cardinality. Values: `CARDINALITY_UNKNOWN`, `CARDINALITY_OPTIONAL`, `CARDINALITY_REQUIRED`, `CARDINALITY_REPEATED`. |
| `defaultValue` | string | The string value of the default value of this field. Proto2 syntax only. |
| `jsonName` | string | The field JSON name. |
| `kind` | string enum | The field type. Values: `TYPE_UNKNOWN`, `TYPE_DOUBLE`, `TYPE_FLOAT`, `TYPE_INT64`, `TYPE_UINT64`, `TYPE_INT32`, `TYPE_FIXED64`, `TYPE_FIXED32`, `TYPE_BOOL`, `TYPE_STRING`, `TYPE_GROUP`, `TYPE_MESSAGE`, `TYPE_BYTES`, `TYPE_UINT32`, `TYPE_ENUM`, `TYPE_SFIXED32`, `TYPE_SFIXED64`, `TYPE_SINT32`, `TYPE_SINT64`. |
| `name` | string | The field name. |
| `number` | integer (int32) | The field number. |
| `oneofIndex` | integer (int32) | The index of the field type in Type.oneofs, for message or enumeration types. The first type has index 1; zero means the type is not in the list. |
| `options` | array<Option> | The protocol buffer options. |
| `packed` | boolean | Whether to use alternative packed wire representation. |
| `typeUrl` | string | The field type URL, without the scheme, for message or enumeration types. Example: "type.googleapis.com/google.protobuf.Timestamp". |

### `FilterControl`

- A widget that displays an input field to change the value of a template variable.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `templateVariable` | string | Name of the template variable the widget affects. |

### `ForecastOptions`

- Options used when forecasting the time series and testing the predicted value against the threshold.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `forecastHorizon` | string (google-duration) | Required. The length of time into the future to forecast whether a time series will violate the threshold. If the predicted value is found to violate the threshold, and the violation is observed in all forecasts made for the configured duration, then the time series is considered to be failing. The forecast horizon can range from 1 hour to 60 hours. |

### `GaugeView`

- A gauge chart shows where the current value sits within a pre-defined range. The upper and lower bounds should define the possible range of values for the scorecard's query (inclusive).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `lowerBound` | number (double) | The lower bound for this gauge chart. The value of the chart should always be greater than or equal to this. |
| `upperBound` | number (double) | The upper bound for this gauge chart. The value of the chart should always be less than or equal to this. |

### `GetNotificationChannelVerificationCodeRequest`

- The GetNotificationChannelVerificationCode request.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `expireTime` | string (google-datetime) | The desired expiration time. If specified, the API will guarantee that the returned code will not be valid after the specified timestamp; however, the API cannot guarantee that the returned code will be valid for at least as long as the requested time (the API puts an upper bound on the amount of time for which a code may be valid). If omitted, a default expiration will be used, which may be less than the max permissible expiration (so specifying an expiration may extend the code's lifetime over omitting an expiration, even though the API does impose an upper limit on the maximum expiration that is permitted). |

### `GetNotificationChannelVerificationCodeResponse`

- The GetNotificationChannelVerificationCode request.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `code` | string | The verification code, which may be used to verify other channels that have an equivalent identity (i.e. other channels of the same type with the same fingerprint such as other email channels with the same email address or other sms channels with the same number). |
| `expireTime` | string (google-datetime) | The expiration time associated with the code that was returned. If an expiration was provided in the request, this is the minimum of the requested expiration in the request and the max permitted expiration. |

### `GkeNamespace`

- GKE Namespace. The field names correspond to the resource metadata labels on monitored resources that fall under a namespace (for example, k8s_container or k8s_pod).
- Version: v3

| Field | Type | Description |
|---|---|---|
| `clusterName` | string | The name of the parent cluster. |
| `location` | string | The location of the parent cluster. This may be a zone or region. |
| `namespaceName` | string | The name of this namespace. |
| `projectId` | string | Output only. The project this resource lives in. For legacy services migrated from the Custom type, this may be a distinct project from the one parenting the service itself. |

### `GkeService`

- GKE Service. The "service" here represents a Kubernetes service object (https://kubernetes.io/docs/concepts/services-networking/service). The field names correspond to the resource labels on k8s_service monitored resources (https://cloud.google.com/monitoring/api/resources#tag_k8s_service).
- Version: v3

| Field | Type | Description |
|---|---|---|
| `clusterName` | string | The name of the parent cluster. |
| `location` | string | The location of the parent cluster. This may be a zone or region. |
| `namespaceName` | string | The name of the parent namespace. |
| `projectId` | string | Output only. The project this resource lives in. For legacy services migrated from the Custom type, this may be a distinct project from the one parenting the service itself. |
| `serviceName` | string | The name of this service. |

### `GkeWorkload`

- A GKE Workload (Deployment, StatefulSet, etc). The field names correspond to the metadata labels on monitored resources that fall under a workload (for example, k8s_container or k8s_pod).
- Version: v3

| Field | Type | Description |
|---|---|---|
| `clusterName` | string | The name of the parent cluster. |
| `location` | string | The location of the parent cluster. This may be a zone or region. |
| `namespaceName` | string | The name of the parent namespace. |
| `projectId` | string | Output only. The project this resource lives in. For legacy services migrated from the Custom type, this may be a distinct project from the one parenting the service itself. |
| `topLevelControllerName` | string | The name of this workload. |
| `topLevelControllerType` | string | The type of this workload (for example, "Deployment" or "DaemonSet") |

### `GoogleMonitoringV3Range`

- Range of numerical values within min and max.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `max` | number (double) | Range maximum. |
| `min` | number (double) | Range minimum. |

### `GridLayout`

- A basic layout divides the available space into vertical columns of equal width and arranges a list of widgets using a row-first strategy.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `columns` | string (int64) | The number of columns into which the view's width is divided. If omitted or set to zero, a system default will be used while rendering. |
| `widgets` | array<Widget> | The informational elements that are arranged into the columns row-first. |

### `Group`

- The description of a dynamic collection of monitored resources. Each group has a filter that is matched against monitored resources and their associated metadata. If a group's filter matches an available monitored resource, then that resource is a member of that group. Groups can contain any number of monitored resources, and each monitored resource can be a member of any number of groups.Groups can be nested in parent-child hierarchies. The parentName field identifies an optional parent for each group. If a group has a parent, then the only monitored resources available to be matched by the group's filter are the resources contained in the parent group. In other words, a group contains the monitored resources that match its filter and the filters of all the group's ancestors. A group without a parent can contain any monitored resource.For example, consider an infrastructure running a set of instances with two user-defined tags: "environment" and "role". A parent group has a filter, environment="production". A child of that parent group has a filter, role="transcoder". The parent group contains all instances in the production environment, regardless of their roles. The child group contains instances that have the transcoder role and are in the production environment.The monitored resources contained in a group can change at any moment, depending on what resources exist and what filters are associated with the group and its ancestors.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `displayName` | string | A user-assigned name for this group, used only for display purposes. |
| `filter` | string | The filter used to determine which monitored resources belong to this group. |
| `isCluster` | boolean | If true, the members of this group are considered to be a cluster. The system can perform additional analysis on groups that are clusters. |
| `name` | string | Output only. The name of this group. The format is: projects/\[PROJECT_ID_OR_NUMBER\]/groups/\[GROUP_ID\] When creating a group, this field is ignored and a new name is created consisting of the project specified in the call to CreateGroup and a unique \[GROUP_ID\] that is generated automatically. |
| `parentName` | string | The name of the group's parent, if it has one. The format is: projects/\[PROJECT_ID_OR_NUMBER\]/groups/\[GROUP_ID\] For groups with no parent, parent_name is the empty string, "". |

### `Hourly`

- Used to schedule the query to run every so many hours.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `minuteOffset` | integer (int32) | Optional. The number of minutes after the hour (in UTC) to run the query. Must be greater than or equal to 0 minutes and less than or equal to 59 minutes. If left unspecified, then an arbitrary offset is used. |
| `periodicity` | integer (int32) | Required. The number of hours between runs. Must be greater than or equal to 1 hour and less than or equal to 48 hours. |

### `HttpBody`

- Message that represents an arbitrary HTTP body. It should only be used for payload formats that can't be represented as JSON, such as raw binary or an HTML page.This message can be used both in streaming and non-streaming API methods in the request as well as the response.It can be used as a top-level request field, which is convenient if one wants to extract parameters from either the URL or HTTP template into the request fields and also want access to the raw HTTP body.Example: message GetResourceRequest { // A unique request id. string request_id = 1; // The raw HTTP body is bound to this field. google.api.HttpBody http_body = 2; } service ResourceService { rpc GetResource(GetResourceRequest) returns (google.api.HttpBody); rpc UpdateResource(google.api.HttpBody) returns (google.protobuf.Empty); } Example with streaming methods: service CaldavService { rpc GetCalendar(stream google.api.HttpBody) returns (stream google.api.HttpBody); rpc UpdateCalendar(stream google.api.HttpBody) returns (stream google.api.HttpBody); } Use of this type only changes how the request and response bodies are handled, all other features will continue to work unchanged.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `contentType` | string | The HTTP Content-Type header value specifying the content type of the body. |
| `data` | string (byte) | The HTTP request/response body as raw binary. |
| `extensions` | array<object> | Application specific response metadata. Must be set in the first response for streaming APIs. |

### `HttpCheck`

- Information involved in an HTTP/HTTPS Uptime check request.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `acceptedResponseStatusCodes` | array<ResponseStatusCode> | If present, the check will only pass if the HTTP response status code is in this set of status codes. If empty, the HTTP status code will only pass if the HTTP status code is 200-299. |
| `authInfo` | BasicAuthentication | The authentication information. Optional when creating an HTTP check; defaults to empty. Do not set both auth_method and auth_info. |
| `body` | string (byte) | The request body associated with the HTTP POST request. If content_type is URL_ENCODED, the body passed in must be URL-encoded. Users can provide a Content-Length header via the headers field or the API will do so. If the request_method is GET and body is not empty, the API will return an error. The maximum byte size is 1 megabyte.Note: If client libraries aren't used (which performs the conversion automatically) base64 encode your body data since the field is of bytes type. |
| `contentType` | string enum | The content type header to use for the check. The following configurations result in errors: 1. Content type is specified in both the headers field and the content_type field. 2. Request method is GET and content_type is not TYPE_UNSPECIFIED 3. Request method is POST and content_type is TYPE_UNSPECIFIED. 4. Request method is POST and a "Content-Type" header is provided via headers field. The content_type field should be used instead. Values: `TYPE_UNSPECIFIED`, `URL_ENCODED`, `USER_PROVIDED`. |
| `customContentType` | string | A user provided content type header to use for the check. The invalid configurations outlined in the content_type field apply to custom_content_type, as well as the following: 1. content_type is URL_ENCODED and custom_content_type is set. 2. content_type is USER_PROVIDED and custom_content_type is not set. |
| `headers` | object | The list of headers to send as part of the Uptime check request. If two headers have the same key and different values, they should be entered as a single header, with the value being a comma-separated list of all the desired values as described at https://www.w3.org/Protocols/rfc2616/rfc2616.txt (page 31). Entering two separate headers with the same key in a Create call will cause the first to be overwritten by the second. The maximum number of headers allowed is 100. |
| `maskHeaders` | boolean | Boolean specifying whether to encrypt the header information. Encryption should be specified for any headers related to authentication that you do not wish to be seen when retrieving the configuration. The server will be responsible for encrypting the headers. On Get/List calls, if mask_headers is set to true then the headers will be obscured with \*\*\*\*\*\*. |
| `path` | string | Optional (defaults to "/"). The path to the page against which to run the check. Will be combined with the host (specified within the monitored_resource) and port to construct the full URL. If the provided path does not begin with "/", a "/" will be prepended automatically. |
| `pingConfig` | PingConfig | Contains information needed to add pings to an HTTP check. |
| `port` | integer (int32) | Optional (defaults to 80 when use_ssl is false, and 443 when use_ssl is true). The TCP port on the HTTP server against which to run the check. Will be combined with host (specified within the monitored_resource) and path to construct the full URL. |
| `requestMethod` | string enum | The HTTP request method to use for the check. If set to METHOD_UNSPECIFIED then request_method defaults to GET. Values: `METHOD_UNSPECIFIED`, `GET`, `POST`. |
| `serviceAgentAuthentication` | ServiceAgentAuthentication | If specified, Uptime will generate and attach an OIDC JWT token for the Monitoring service agent service account as an Authorization header in the HTTP request when probing. |
| `useSsl` | boolean | If true, use HTTPS instead of HTTP to run the check. |
| `validateSsl` | boolean | Boolean specifying whether to include SSL certificate validation as a part of the Uptime check. Only applies to checks where monitored_resource is set to uptime_url. If use_ssl is false, setting validate_ssl to true has no effect. |

### `IncidentList`

- A widget that displays a list of incidents
- Version: v1

| Field | Type | Description |
|---|---|---|
| `monitoredResources` | array<MonitoredResource> | Optional. The monitored resource for which incidents are listed. The resource doesn't need to be fully specified. That is, you can specify the resource type but not the values of the resource labels. The resource type and labels are used for filtering. |
| `policyNames` | array<string> | Optional. A list of alert policy names to filter the incident list by. Don't include the project ID prefix in the policy name. For example, use alertPolicies/utilization. |

### `InternalChecker`

- An internal checker allows Uptime checks to run on private/internal GCP resources.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `displayName` | string | The checker's human-readable name. The display name should be unique within a Cloud Monitoring Metrics Scope in order to make it easier to identify; however, uniqueness is not enforced. |
| `gcpZone` | string | The GCP zone the Uptime check should egress from. Only respected for internal Uptime checks, where internal_network is specified. |
| `name` | string | A unique resource name for this InternalChecker. The format is: projects/\[PROJECT_ID_OR_NUMBER\]/internalCheckers/\[INTERNAL_CHECKER_ID\] \[PROJECT_ID_OR_NUMBER\] is the Cloud Monitoring Metrics Scope project for the Uptime check config associated with the internal checker. |
| `network` | string | The GCP VPC network (https://cloud.google.com/vpc/docs/vpc) where the internal resource lives (ex: "default"). |
| `peerProjectId` | string | The GCP project ID where the internal checker lives. Not necessary the same as the Metrics Scope project. |
| `state` | string enum | The current operational state of the internal checker. Values: `UNSPECIFIED`, `CREATING`, `RUNNING`. |

### `Interval`

- Represents a time interval, encoded as a Timestamp start (inclusive) and a Timestamp end (exclusive).The start must be less than or equal to the end. When the start equals the end, the interval is empty (matches no time). When both start and end are unspecified, the interval matches any time.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `endTime` | string (google-datetime) | Optional. Exclusive end of the interval.If specified, a Timestamp matching this interval will have to be before the end. |
| `startTime` | string (google-datetime) | Optional. Inclusive start of the interval.If specified, a Timestamp matching this interval will have to be the same or after the start. |

### `IstioCanonicalService`

- Canonical service scoped to an Istio mesh. Anthos clusters running ASM >= 1.6.8 will have their services ingested as this type.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `canonicalService` | string | The name of the canonical service underlying this service. Corresponds to the destination_canonical_service_name metric label in label in Istio metrics (https://cloud.google.com/monitoring/api/metrics_istio). |
| `canonicalServiceNamespace` | string | The namespace of the canonical service underlying this service. Corresponds to the destination_canonical_service_namespace metric label in Istio metrics (https://cloud.google.com/monitoring/api/metrics_istio). |
| `meshUid` | string | Identifier for the Istio mesh in which this canonical service is defined. Corresponds to the mesh_uid metric label in Istio metrics (https://cloud.google.com/monitoring/api/metrics_istio). |

### `JsonPathMatcher`

- Information needed to perform a JSONPath content match. Used for ContentMatcherOption::MATCHES_JSON_PATH and ContentMatcherOption::NOT_MATCHES_JSON_PATH.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `jsonMatcher` | string enum | The type of JSONPath match that will be applied to the JSON output (ContentMatcher.content) Values: `JSON_PATH_MATCHER_OPTION_UNSPECIFIED`, `EXACT_MATCH`, `REGEX_MATCH`. |
| `jsonPath` | string | JSONPath within the response output pointing to the expected ContentMatcher::content to match against. |

### `LabelDescriptor`

- A description of a label.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `description` | string | A human-readable description for the label. |
| `key` | string | The key for this label. The key must meet the following criteria: Does not exceed 100 characters. Matches the following regular expression: \[a-zA-Z\]\[a-zA-Z0-9\_\]\* The first character must be an upper- or lower-case letter. The remaining characters must be letters, digits, or underscores. |
| `valueType` | string enum | The type of data that can be assigned to the label. Values: `STRING`, `BOOL`, `INT64`. |

### `LabelValue`

- A label value.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `boolValue` | boolean | A bool label value. |
| `int64Value` | string (int64) | An int64 label value. |
| `stringValue` | string | A string label value. |

### `LatencyCriteria`

- Parameters for a latency threshold SLI.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `threshold` | string (google-duration) | Good service is defined to be the count of requests made to this service that return in no more than threshold. |

### `Linear`

- Specifies a linear sequence of buckets that all have the same width (except overflow and underflow). Each bucket represents a constant absolute uncertainty on the specific value in the bucket.There are num_finite_buckets + 2 (= N) buckets. Bucket i has the following boundaries:Upper bound (0 <= i < N-1): offset + (width \* i).Lower bound (1 <= i < N): offset + (width \* (i - 1)).
- Version: v3

| Field | Type | Description |
|---|---|---|
| `numFiniteBuckets` | integer (int32) | Must be greater than 0. |
| `offset` | number (double) | Lower bound of the first bucket. |
| `width` | number (double) | Must be greater than 0. |

### `Link`

- Links to content such as playbooks, repositories, and other resources.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `displayName` | string | A short display name for the link. The display name must not be empty or exceed 63 characters. Example: "playbook". |
| `url` | string | The url of a webpage. A url can be templatized by using variables in the path or the query parameters. The total length of a URL should not exceed 2083 characters before and after variable expansion. Example: "https://my_domain.com/playbook?name=${resource.name}" |

### `ListAlertPoliciesResponse`

- The protocol for the ListAlertPolicies response.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `alertPolicies` | array<AlertPolicy> | The returned alert policies. |
| `nextPageToken` | string | If there might be more results than were returned, then this field is set to a non-empty value. To see the additional results, use that value as page_token in the next call to this method. |
| `totalSize` | integer (int32) | The total number of alert policies in all pages. This number is only an estimate, and may change in subsequent pages. https://aip.dev/158 |

### `ListAlertsResponse`

- The ListAlerts response.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `alerts` | array<Alert> | The list of alerts. |
| `nextPageToken` | string | If not empty, indicates that there may be more results that match the request. Use the value in the page_token field in a subsequent request to fetch the next set of results. The token is encrypted and only guaranteed to return correct results for 72 hours after it is created. If empty, all results have been returned. |
| `totalSize` | integer (int32) | The estimated total number of matching results for this query. |

### `ListDashboardsResponse`

- The ListDashboards request.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dashboards` | array<Dashboard> | The list of requested dashboards. |
| `nextPageToken` | string | If there are more results than have been returned, then this field is set to a non-empty value. To see the additional results, use that value as page_token in the next call to this method. |

### `ListGroupMembersResponse`

- The ListGroupMembers response.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `members` | array<MonitoredResource> | A set of monitored resources in the group. |
| `nextPageToken` | string | If there are more results than have been returned, then this field is set to a non-empty value. To see the additional results, use that value as page_token in the next call to this method. |
| `totalSize` | integer (int32) | The total number of elements matching this request. |

### `ListGroupsResponse`

- The ListGroups response.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `group` | array<Group> | The groups that match the specified filters. |
| `nextPageToken` | string | If there are more results than have been returned, then this field is set to a non-empty value. To see the additional results, use that value as page_token in the next call to this method. |

### `ListMetricDescriptorsResponse`

- The ListMetricDescriptors response.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `metricDescriptors` | array<MetricDescriptor> | The metric descriptors that are available to the project and that match the value of filter, if present. |
| `nextPageToken` | string | If there are more results than have been returned, then this field is set to a non-empty value. To see the additional results, use that value as page_token in the next call to this method. |

### `ListMetricsScopesByMonitoredProjectResponse`

- Response for the ListMetricsScopesByMonitoredProject method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `metricsScopes` | array<MetricsScope> | A set of all metrics scopes that the specified monitored project has been added to. |

### `ListMonitoredResourceDescriptorsResponse`

- The ListMonitoredResourceDescriptors response.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | If there are more results than have been returned, then this field is set to a non-empty value. To see the additional results, use that value as page_token in the next call to this method. |
| `resourceDescriptors` | array<MonitoredResourceDescriptor> | The monitored resource descriptors that are available to this project and that match filter, if present. |

### `ListNotificationChannelDescriptorsResponse`

- The ListNotificationChannelDescriptors response.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `channelDescriptors` | array<NotificationChannelDescriptor> | The monitored resource descriptors supported for the specified project, optionally filtered. |
| `nextPageToken` | string | If not empty, indicates that there may be more results that match the request. Use the value in the page_token field in a subsequent request to fetch the next set of results. If empty, all results have been returned. |

### `ListNotificationChannelsResponse`

- The ListNotificationChannels response.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | If not empty, indicates that there may be more results that match the request. Use the value in the page_token field in a subsequent request to fetch the next set of results. If empty, all results have been returned. |
| `notificationChannels` | array<NotificationChannel> | The notification channels defined for the specified project. |
| `totalSize` | integer (int32) | The total number of notification channels in all pages. This number is only an estimate, and may change in subsequent pages. https://aip.dev/158 |

### `ListServiceLevelObjectivesResponse`

- The ListServiceLevelObjectives response.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | If there are more results than have been returned, then this field is set to a non-empty value. To see the additional results, use that value as page_token in the next call to this method. |
| `serviceLevelObjectives` | array<ServiceLevelObjective> | The ServiceLevelObjectives matching the specified filter. |

### `ListServicesResponse`

- The ListServices response.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | If there are more results than have been returned, then this field is set to a non-empty value. To see the additional results, use that value as page_token in the next call to this method. |
| `services` | array<Service> | The Services matching the specified filter. |

### `ListSnoozesResponse`

- The results of a successful ListSnoozes call, containing the matching Snoozes.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | Page token for repeated calls to ListSnoozes, to fetch additional pages of results. If this is empty or missing, there are no more pages. |
| `snoozes` | array<Snooze> | Snoozes matching this list call. |

### `ListTimeSeriesResponse`

- The ListTimeSeries response.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `executionErrors` | array<Status> | Query execution errors that may have caused the time series data returned to be incomplete. |
| `nextPageToken` | string | If there are more results than have been returned, then this field is set to a non-empty value. To see the additional results, use that value as page_token in the next call to this method. |
| `timeSeries` | array<TimeSeries> | One or more time series that match the filter included in the request. |
| `unit` | string | The unit in which all time_series point values are reported. unit follows the UCUM format for units as seen in https://unitsofmeasure.org/ucum.html. If different time_series have different units (for example, because they come from different metric types, or a unit is absent), then unit will be "{not_a_unit}". |
| `unreachable` | array<string> | Cloud regions that were unreachable which may have caused incomplete data to be returned. |

### `ListUptimeCheckConfigsResponse`

- The protocol for the ListUptimeCheckConfigs response.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | This field represents the pagination token to retrieve the next page of results. If the value is empty, it means no further results for the request. To retrieve the next page of results, the value of the next_page_token is passed to the subsequent List method call (in the request message's page_token field). |
| `totalSize` | integer (int32) | The total number of Uptime check configurations for the project, irrespective of any pagination. |
| `uptimeCheckConfigs` | array<UptimeCheckConfig> | The returned Uptime check configurations. |

### `ListUptimeCheckIpsResponse`

- The protocol for the ListUptimeCheckIps response.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | This field represents the pagination token to retrieve the next page of results. If the value is empty, it means no further results for the request. To retrieve the next page of results, the value of the next_page_token is passed to the subsequent List method call (in the request message's page_token field). NOTE: this field is not yet implemented |
| `uptimeCheckIps` | array<UptimeCheckIp> | The returned list of IP addresses (including region and location) that the checkers run from. |

### `LogMatch`

- A condition type that checks whether a log message in the scoping project (https://cloud.google.com/monitoring/api/v3#project_name) satisfies the given filter. Logs from other projects in the metrics scope are not evaluated.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `filter` | string | Required. A logs-based filter. See Advanced Logs Queries (https://cloud.google.com/logging/docs/view/advanced-queries) for how this filter should be constructed. |
| `labelExtractors` | object | Optional. A map from a label key to an extractor expression, which is used to extract the value for this label key. Each entry in this map is a specification for how data should be extracted from log entries that match filter. Each combination of extracted values is treated as a separate rule for the purposes of triggering notifications. Label keys and corresponding values can be used in notifications generated by this condition.Please see the documentation on logs-based metric valueExtractors (https://cloud.google.com/logging/docs/reference/v2/rest/v2/projects.metrics#LogMetric.FIELDS.value_extractor) for syntax and examples. |

### `LogMetadata`

- Information about the log for log-based alerts.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `extractedLabels` | object | The labels extracted from the log. |

### `LogsPanel`

- A widget that displays a stream of log.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `filter` | string | A filter that chooses which log entries to return. See Advanced Logs Queries (https://cloud.google.com/logging/docs/view/advanced-queries). Only log entries that match the filter are returned. An empty filter matches all log entries. |
| `resourceNames` | array<string> | The names of logging resources to collect logs for. Currently projects and storage views are supported. If empty, the widget will default to the host project. |

### `Measure`

- A chart measure. Measures represent a measured property in your chart data such as rainfall in inches, number of units sold, revenue gained, etc.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `aggregationFunction` | AggregationFunction | Required. The aggregation function applied to the input column. This must not be set to "none" unless binning is disabled on the dimension. The aggregation function is used to group points on the dimension bins. |
| `column` | string | Required. The column name within in the dataset used for the measure. |

### `MeshIstio`

- Istio service scoped to an Istio mesh. Anthos clusters running ASM < 1.6.8 will have their services ingested as this type.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `meshUid` | string | Identifier for the mesh in which this Istio service is defined. Corresponds to the mesh_uid metric label in Istio metrics. |
| `serviceName` | string | The name of the Istio service underlying this service. Corresponds to the destination_service_name metric label in Istio metrics. |
| `serviceNamespace` | string | The namespace of the Istio service underlying this service. Corresponds to the destination_service_namespace metric label in Istio metrics. |

### `Metric`

- A specific metric, identified by specifying values for all of the labels of a MetricDescriptor.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `labels` | object | The set of label values that uniquely identify this metric. All labels listed in the MetricDescriptor must be assigned values. |
| `type` | string | An existing metric type, see google.api.MetricDescriptor. For example, custom.googleapis.com/invoice/paid/amount. |

### `MetricAbsence`

- A condition type that checks that monitored resources are reporting data. The configuration defines a metric and a set of monitored resources. The predicate is considered in violation when a time series for the specified metric of a monitored resource does not include any data in the specified duration.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `aggregations` | array<Aggregation> | Specifies the alignment of data points in individual time series as well as how to combine the retrieved time series together (such as when aggregating multiple streams on each resource to a single stream for each resource or when aggregating streams across all members of a group of resources). Multiple aggregations are applied in the order specified.This field is similar to the one in the ListTimeSeries request (https://cloud.google.com/monitoring/api/ref_v3/rest/v3/projects.timeSeries/list). It is advisable to use the ListTimeSeries method when debugging this field. |
| `duration` | string (google-duration) | Required. The amount of time that a time series must fail to report new data to be considered failing. The minimum value of this field is 120 seconds. Larger values that are a multiple of a minute--for example, 240 or 300 seconds--are supported. If an invalid value is given, an error will be returned. |
| `filter` | string | Required. A filter (https://cloud.google.com/monitoring/api/v3/filters) that identifies which time series should be compared with the threshold.The filter is similar to the one that is specified in the ListTimeSeries request (https://cloud.google.com/monitoring/api/ref_v3/rest/v3/projects.timeSeries/list) (that call is useful to verify the time series that will be retrieved / processed). The filter must specify the metric type and the resource type. Optionally, it can specify resource labels and metric labels. This field must not exceed 2048 Unicode characters in length. |
| `trigger` | Trigger | The number/percent of time series for which the comparison must hold in order for the condition to trigger. If unspecified, then the condition will trigger if the comparison is true for any of the time series that have been identified by filter and aggregations. |

### `MetricDescriptor`

- Defines a metric type and its schema. Once a metric descriptor is created, deleting or altering it stops data collection and makes the metric type's existing data unusable.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `description` | string | A detailed description of the metric, which can be used in documentation. |
| `displayName` | string | A concise name for the metric, which can be displayed in user interfaces. Use sentence case without an ending period, for example "Request count". This field is optional but it is recommended to be set for any metrics associated with user-visible concepts, such as Quota. |
| `labels` | array<LabelDescriptor> | The set of labels that can be used to describe a specific instance of this metric type. For example, the appengine.googleapis.com/http/server/response_latencies metric type has a label for the HTTP response code, response_code, so you can look at latencies for successful responses or just for responses that failed. |
| `launchStage` | string enum | Optional. The launch stage of the metric definition. Values: `LAUNCH_STAGE_UNSPECIFIED`, `UNIMPLEMENTED`, `PRELAUNCH`, `EARLY_ACCESS`, `ALPHA`, `BETA`, `GA`, `DEPRECATED`. |
| `metadata` | MetricDescriptorMetadata | Optional. Metadata which can be used to guide usage of the metric. |
| `metricKind` | string enum | Whether the metric records instantaneous values, changes to a value, etc. Some combinations of metric_kind and value_type might not be supported. Values: `METRIC_KIND_UNSPECIFIED`, `GAUGE`, `DELTA`, `CUMULATIVE`. |
| `monitoredResourceTypes` | array<string> | Read-only. If present, then a time series, which is identified partially by a metric type and a MonitoredResourceDescriptor, that is associated with this metric type can only be associated with one of the monitored resource types listed here. |
| `name` | string | The resource name of the metric descriptor. |
| `type` | string | The metric type, including its DNS name prefix. The type is not URL-encoded. All user-defined metric types have the DNS name custom.googleapis.com or external.googleapis.com. Metric types should use a natural hierarchical grouping. For example: "custom.googleapis.com/invoice/paid/amount" "external.googleapis.com/prometheus/up" "appengine.googleapis.com/http/server/response_latencies" |
| `unit` | string | The units in which the metric value is reported. It is only applicable if the value_type is INT64, DOUBLE, or DISTRIBUTION. The unit defines the representation of the stored metric values.Different systems might scale the values to be more easily displayed (so a value of 0.02kBy might be displayed as 20By, and a value of 3523kBy might be displayed as 3.5MBy). However, if the unit is kBy, then the value of the metric is always in thousands of bytes, no matter how it might be displayed.If you want a custom metric to record the exact number of CPU-seconds used by a job, you can create an INT64 CUMULATIVE metric whose unit is s{CPU} (or equivalently 1s{CPU} or just s). If the job uses 12,005 CPU-seconds, then the value is written as 12005.Alternatively, if you want a custom metric to record data in a more granular way, you can create a DOUBLE CUMULATIVE metric whose unit is ks{CPU}, and then write the value 12.005 (which is 12005/1000), or use Kis{CPU} and write 11.723 (which is 12005/1024).The supported units are a subset of The Unified Code for Units of Measure (https://unitsofmeasure.org/ucum.html) standard:Basic units (UNIT) bit bit By byte s second min minute h hour d day 1 dimensionlessPrefixes (PREFIX) k kilo (10^3) M mega (10^6) G giga (10^9) T tera (10^12) P peta (10^15) E exa (10^18) Z zetta (10^21) Y yotta (10^24) m milli (10^-3) u micro (10^-6) n nano (10^-9) p pico (10^-12) f femto (10^-15) a atto (10^-18) z zepto (10^-21) y yocto (10^-24) Ki kibi (2^10) Mi mebi (2^20) Gi gibi (2^30) Ti tebi (2^40) Pi pebi (2^50)GrammarThe grammar also includes these connectors: / division or ratio (as an infix operator). For examples, kBy/{email} or MiBy/10ms (although you should almost never have /s in a metric unit; rates should always be computed at query time from the underlying cumulative or delta value). . multiplication or composition (as an infix operator). For examples, GBy.d or k{watt}.h.The grammar for a unit is as follows: Expression = Component { "." Component } { "/" Component } ; Component = ( \[ PREFIX \] UNIT \| "%" ) \[ Annotation \] \| Annotation \| "1" ; Annotation = "{" NAME "}" ; Notes: Annotation is just a comment if it follows a UNIT. If the annotation is used alone, then the unit is equivalent to 1. For examples, {request}/s == 1/s, By{transmitted}/s == By/s. NAME is a sequence of non-blank printable ASCII characters not containing { or }. 1 represents a unitary dimensionless unit (https://en.wikipedia.org/wiki/Dimensionless_quantity) of 1, such as in 1/s. It is typically used when none of the basic units are appropriate. For example, "new users per day" can be represented as 1/d or {new-users}/d (and a metric value 5 would mean "5 new users). Alternatively, "thousands of page views per day" would be represented as 1000/d or k1/d or k{page_views}/d (and a metric value of 5.3 would mean "5300 page views per day"). % represents dimensionless value of 1/100, and annotates values giving a percentage (so the metric values are typically in the range of 0..100, and a metric value 3 means "3 percent"). 10^2.% indicates a metric contains a ratio, typically in the range 0..1, that will be multiplied by 100 and displayed as a percentage (so a metric value 0.03 means "3 percent"). |
| `valueType` | string enum | Whether the measurement is an integer, a floating-point number, etc. Some combinations of metric_kind and value_type might not be supported. Values: `VALUE_TYPE_UNSPECIFIED`, `BOOL`, `INT64`, `DOUBLE`, `STRING`, `DISTRIBUTION`, `MONEY`. |

### `MetricDescriptorMetadata`

- Additional annotations that can be used to guide the usage of a metric.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `ingestDelay` | string (google-duration) | The delay of data points caused by ingestion. Data points older than this age are guaranteed to be ingested and available to be read, excluding data loss due to errors. |
| `launchStage` | string enum | Deprecated. Must use the MetricDescriptor.launch_stage instead. Values: `LAUNCH_STAGE_UNSPECIFIED`, `UNIMPLEMENTED`, `PRELAUNCH`, `EARLY_ACCESS`, `ALPHA`, `BETA`, `GA`, `DEPRECATED`. |
| `samplePeriod` | string (google-duration) | The sampling period of metric data points. For metrics which are written periodically, consecutive data points are stored at this time interval, excluding data loss due to errors. Metrics with a higher granularity have a smaller sampling period. |
| `timeSeriesResourceHierarchyLevel` | array<string> | The scope of the timeseries data of the metric. Values: `TIME_SERIES_RESOURCE_HIERARCHY_LEVEL_UNSPECIFIED`, `PROJECT`, `ORGANIZATION`, `FOLDER`. |

### `MetricRange`

- A MetricRange is used when each window is good when the value x of a single TimeSeries satisfies range.min <= x <= range.max. The provided TimeSeries must have ValueType = INT64 or ValueType = DOUBLE and MetricKind = GAUGE.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `range` | GoogleMonitoringV3Range | Range of values considered "good." For a one-sided range, set one bound to an infinite value. |
| `timeSeries` | string | A monitoring filter (https://cloud.google.com/monitoring/api/v3/filters) specifying the TimeSeries to use for evaluating window quality. |

### `MetricThreshold`

- A condition type that compares a collection of time series against a threshold.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `aggregations` | array<Aggregation> | Specifies the alignment of data points in individual time series as well as how to combine the retrieved time series together (such as when aggregating multiple streams on each resource to a single stream for each resource or when aggregating streams across all members of a group of resources). Multiple aggregations are applied in the order specified.This field is similar to the one in the ListTimeSeries request (https://cloud.google.com/monitoring/api/ref_v3/rest/v3/projects.timeSeries/list). It is advisable to use the ListTimeSeries method when debugging this field. |
| `comparison` | string enum | The comparison to apply between the time series (indicated by filter and aggregation) and the threshold (indicated by threshold_value). The comparison is applied on each time series, with the time series on the left-hand side and the threshold on the right-hand side.Only COMPARISON_LT and COMPARISON_GT are supported currently. Values: `COMPARISON_UNSPECIFIED`, `COMPARISON_GT`, `COMPARISON_GE`, `COMPARISON_LT`, `COMPARISON_LE`, `COMPARISON_EQ`, `COMPARISON_NE`. |
| `denominatorAggregations` | array<Aggregation> | Specifies the alignment of data points in individual time series selected by denominatorFilter as well as how to combine the retrieved time series together (such as when aggregating multiple streams on each resource to a single stream for each resource or when aggregating streams across all members of a group of resources).When computing ratios, the aggregations and denominator_aggregations fields must use the same alignment period and produce time series that have the same periodicity and labels. |
| `denominatorFilter` | string | A filter (https://cloud.google.com/monitoring/api/v3/filters) that identifies a time series that should be used as the denominator of a ratio that will be compared with the threshold. If a denominator_filter is specified, the time series specified by the filter field will be used as the numerator.The filter must specify the metric type and optionally may contain restrictions on resource type, resource labels, and metric labels. This field may not exceed 2048 Unicode characters in length. |
| `duration` | string (google-duration) | Required. The amount of time that a time series must violate the threshold to be considered failing. Currently, only values that are a multiple of a minute--e.g., 0, 60, 120, or 300 seconds--are supported. If an invalid value is given, an error will be returned. When choosing a duration, it is useful to keep in mind the frequency of the underlying time series data (which may also be affected by any alignments specified in the aggregations field); a good duration is long enough so that a single outlier does not generate spurious alerts, but short enough that unhealthy states are detected and alerted on quickly. |
| `evaluationMissingData` | string enum | A condition control that determines how metric-threshold conditions are evaluated when data stops arriving. To use this control, the value of the duration field must be greater than or equal to 60 seconds. Values: `EVALUATION_MISSING_DATA_UNSPECIFIED`, `EVALUATION_MISSING_DATA_INACTIVE`, `EVALUATION_MISSING_DATA_ACTIVE`, `EVALUATION_MISSING_DATA_NO_OP`. |
| `filter` | string | Required. A filter (https://cloud.google.com/monitoring/api/v3/filters) that identifies which time series should be compared with the threshold.The filter is similar to the one that is specified in the ListTimeSeries request (https://cloud.google.com/monitoring/api/ref_v3/rest/v3/projects.timeSeries/list) (that call is useful to verify the time series that will be retrieved / processed). The filter must specify the metric type and the resource type. Optionally, it can specify resource labels and metric labels. This field must not exceed 2048 Unicode characters in length. |
| `forecastOptions` | ForecastOptions | When this field is present, the MetricThreshold condition forecasts whether the time series is predicted to violate the threshold within the forecast_horizon. When this field is not set, the MetricThreshold tests the current value of the timeseries against the threshold. |
| `thresholdValue` | number (double) | A value against which to compare the time series. |
| `trigger` | Trigger | The number/percent of time series for which the comparison must hold in order for the condition to trigger. If unspecified, then the condition will trigger if the comparison is true for any of the time series that have been identified by filter and aggregations, or by the ratio, if denominator_filter and denominator_aggregations are specified. |

### `MetricsScope`

- Represents a Metrics Scope (https://cloud.google.com/monitoring/settings#concept-scope) in Cloud Monitoring, which specifies one or more Google projects and zero or more AWS accounts to monitor together.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The time when this Metrics Scope was created. |
| `monitoredProjects` | array<MonitoredProject> | Output only. The list of projects monitored by this Metrics Scope. |
| `name` | string | Immutable. The resource name of the Monitoring Metrics Scope. On input, the resource name can be specified with the scoping project ID or number. On output, the resource name is specified with the scoping project number. Example: locations/global/metricsScopes/{SCOPING_PROJECT_ID_OR_NUMBER} |
| `updateTime` | string (google-datetime) | Output only. The time when this Metrics Scope record was last updated. |

### `Minutes`

- Used to schedule the query to run every so many minutes.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `periodicity` | integer (int32) | Required. Number of minutes between runs. The interval must be greater than or equal to 5 minutes and less than or equal to 1440 minutes. |

### `MonitoredProject`

- A project being monitored (https://cloud.google.com/monitoring/settings/multiple-projects#create-multi) by a Metrics Scope.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The time when this MonitoredProject was created. |
| `isTombstoned` | boolean | Output only. Set if the project has been tombstoned by the user. |
| `name` | string | Immutable. The resource name of the MonitoredProject. On input, the resource name includes the scoping project ID and monitored project ID. On output, it contains the equivalent project numbers. Example: locations/global/metricsScopes/{SCOPING_PROJECT_ID_OR_NUMBER}/projects/{MONITORED_PROJECT_ID_OR_NUMBER} |

### `MonitoredResource`

- An object representing a resource that can be used for monitoring, logging, billing, or other purposes. Examples include virtual machine instances, databases, and storage devices such as disks. The type field identifies a MonitoredResourceDescriptor object that describes the resource's schema. Information in the labels field identifies the actual resource and its attributes according to the schema. For example, a particular Compute Engine VM instance could be represented by the following object, because the MonitoredResourceDescriptor for "gce_instance" has labels "project_id", "instance_id" and "zone": { "type": "gce_instance", "labels": { "project_id": "my-project", "instance_id": "12345678901234", "zone": "us-central1-a" }}
- Version: v3

| Field | Type | Description |
|---|---|---|
| `labels` | object | Required. Values for all of the labels listed in the associated monitored resource descriptor. For example, Compute Engine VM instances use the labels "project_id", "instance_id", and "zone". |
| `type` | string | Required. The monitored resource type. This field must match the type field of a MonitoredResourceDescriptor object. For example, the type of a Compute Engine VM instance is gce_instance. For a list of types, see Monitoring resource types (https://cloud.google.com/monitoring/api/resources) and Logging resource types (https://cloud.google.com/logging/docs/api/v2/resource-list). |

### `MonitoredResourceDescriptor`

- An object that describes the schema of a MonitoredResource object using a type name and a set of labels. For example, the monitored resource descriptor for Google Compute Engine VM instances has a type of "gce_instance" and specifies the use of the labels "instance_id" and "zone" to identify particular VM instances.Different APIs can support different monitored resource types. APIs generally provide a list method that returns the monitored resource descriptors used by the API.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `description` | string | Optional. A detailed description of the monitored resource type that might be used in documentation. |
| `displayName` | string | Optional. A concise name for the monitored resource type that might be displayed in user interfaces. It should be a Title Cased Noun Phrase, without any article or other determiners. For example, "Google Cloud SQL Database". |
| `labels` | array<LabelDescriptor> | Required. A set of labels used to describe instances of this monitored resource type. For example, an individual Google Cloud SQL database is identified by values for the labels "database_id" and "zone". |
| `launchStage` | string enum | Optional. The launch stage of the monitored resource definition. Values: `LAUNCH_STAGE_UNSPECIFIED`, `UNIMPLEMENTED`, `PRELAUNCH`, `EARLY_ACCESS`, `ALPHA`, `BETA`, `GA`, `DEPRECATED`. |
| `name` | string | Optional. The resource name of the monitored resource descriptor: "projects/{project_id}/monitoredResourceDescriptors/{type}" where {type} is the value of the type field in this object and {project_id} is a project ID that provides API-specific context for accessing the type. APIs that do not use project information can use the resource name format "monitoredResourceDescriptors/{type}". |
| `type` | string | Required. The monitored resource type. For example, the type "cloudsql_database" represents databases in Google Cloud SQL. For a list of types, see Monitored resource types (https://cloud.google.com/monitoring/api/resources) and Logging resource types (https://cloud.google.com/logging/docs/api/v2/resource-list). |

### `MonitoredResourceMetadata`

- Auxiliary metadata for a MonitoredResource object. MonitoredResource objects contain the minimum set of information to uniquely identify a monitored resource instance. There is some other useful auxiliary metadata. Monitoring and Logging use an ingestion pipeline to extract metadata for cloud resources of all types, and store the metadata in this message.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `systemLabels` | object | Output only. Values for predefined system metadata labels. System labels are a kind of metadata extracted by Google, including "machine_image", "vpc", "subnet_id", "security_group", "name", etc. System label values can be only strings, Boolean values, or a list of strings. For example: { "name": "my-test-instance", "security_group": \["a", "b", "c"\], "spot_instance": false } |
| `userLabels` | object | Output only. A map of user-defined metadata labels. |

### `MonitoringQueryLanguageCondition`

- A condition type that allows alerting policies to be defined using Monitoring Query Language (https://cloud.google.com/monitoring/mql).
- Version: v3

| Field | Type | Description |
|---|---|---|
| `duration` | string (google-duration) | Optional. The amount of time that a time series must violate the threshold to be considered failing. Currently, only values that are a multiple of a minute--e.g., 0, 60, 120, or 300 seconds--are supported. If an invalid value is given, an error will be returned. When choosing a duration, it is useful to keep in mind the frequency of the underlying time series data (which may also be affected by any alignments specified in the aggregations field); a good duration is long enough so that a single outlier does not generate spurious alerts, but short enough that unhealthy states are detected and alerted on quickly. The default value is zero. |
| `evaluationMissingData` | string enum | A condition control that determines how metric-threshold conditions are evaluated when data stops arriving. Values: `EVALUATION_MISSING_DATA_UNSPECIFIED`, `EVALUATION_MISSING_DATA_INACTIVE`, `EVALUATION_MISSING_DATA_ACTIVE`, `EVALUATION_MISSING_DATA_NO_OP`. |
| `query` | string | Monitoring Query Language (https://cloud.google.com/monitoring/mql) query that outputs a boolean stream. |
| `trigger` | Trigger | The number/percent of time series for which the comparison must hold in order for the condition to trigger. If unspecified, then the condition will trigger if the comparison is true for any of the time series that have been identified by filter and aggregations, or by the ratio, if denominator_filter and denominator_aggregations are specified. |

### `MosaicLayout`

- A mosaic layout divides the available space into a grid of blocks, and overlays the grid with tiles. Unlike GridLayout, tiles may span multiple grid blocks and can be placed at arbitrary locations in the grid.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `columns` | integer (int32) | The number of columns in the mosaic grid. The number of columns must be between 1 and 48, inclusive. |
| `tiles` | array<Tile> | The tiles to display. |

### `MutationRecord`

- Describes a change made to a configuration.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `mutateTime` | string (google-datetime) | When the change occurred. |
| `mutatedBy` | string | The email address of the user making the change. |

### `NotificationChannel`

- A NotificationChannel is a medium through which an alert is delivered when a policy violation is detected. Examples of channels include email, SMS, and third-party messaging applications. Fields containing sensitive information like authentication tokens or contact info are only partially populated on retrieval.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `creationRecord` | MutationRecord | Record of the creation of this channel. |
| `description` | string | An optional human-readable description of this notification channel. This description may provide additional details, beyond the display name, for the channel. This may not exceed 1024 Unicode characters. |
| `displayName` | string | An optional human-readable name for this notification channel. It is recommended that you specify a non-empty and unique name in order to make it easier to identify the channels in your project, though this is not enforced. The display name is limited to 512 Unicode characters. |
| `enabled` | boolean | Whether notifications are forwarded to the described channel. This makes it possible to disable delivery of notifications to a particular channel without removing the channel from all alerting policies that reference the channel. This is a more convenient approach when the change is temporary and you want to receive notifications from the same set of alerting policies on the channel at some point in the future. |
| `labels` | object | Configuration fields that define the channel and its behavior. The permissible and required labels are specified in the NotificationChannelDescriptor.labels of the NotificationChannelDescriptor corresponding to the type field. |
| `mutationRecords` | array<MutationRecord> | Records of the modification of this channel. |
| `name` | string | Identifier. The full REST resource name for this channel. The format is: projects/\[PROJECT_ID_OR_NUMBER\]/notificationChannels/\[CHANNEL_ID\] The \[CHANNEL_ID\] is automatically assigned by the server on creation. |
| `type` | string | The type of the notification channel. This field matches the value of the NotificationChannelDescriptor.type field. |
| `userLabels` | object | User-supplied key/value data that does not need to conform to the corresponding NotificationChannelDescriptor's schema, unlike the labels field. This field is intended to be used for organizing and identifying the NotificationChannel objects.The field can contain up to 64 entries. Each key and value is limited to 63 Unicode characters or 128 bytes, whichever is smaller. Labels and values can contain only lowercase letters, numerals, underscores, and dashes. Keys must begin with a letter. |
| `verificationStatus` | string enum | Indicates whether this channel has been verified or not. On a ListNotificationChannels or GetNotificationChannel operation, this field is expected to be populated.If the value is UNVERIFIED, then it indicates that the channel is non-functioning (it both requires verification and lacks verification); otherwise, it is assumed that the channel works.If the channel is neither VERIFIED nor UNVERIFIED, it implies that the channel is of a type that does not require verification or that this specific channel has been exempted from verification because it was created prior to verification being required for channels of this type.This field cannot be modified using a standard UpdateNotificationChannel operation. To change the value of this field, you must call VerifyNotificationChannel. Values: `VERIFICATION_STATUS_UNSPECIFIED`, `UNVERIFIED`, `VERIFIED`. |

### `NotificationChannelDescriptor`

- A description of a notification channel. The descriptor includes the properties of the channel and the set of labels or fields that must be specified to configure channels of a given type.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `description` | string | A human-readable description of the notification channel type. The description may include a description of the properties of the channel and pointers to external documentation. |
| `displayName` | string | A human-readable name for the notification channel type. This form of the name is suitable for a user interface. |
| `labels` | array<LabelDescriptor> | The set of labels that must be defined to identify a particular channel of the corresponding type. Each label includes a description for how that field should be populated. |
| `launchStage` | string enum | The product launch stage for channels of this type. Values: `LAUNCH_STAGE_UNSPECIFIED`, `UNIMPLEMENTED`, `PRELAUNCH`, `EARLY_ACCESS`, `ALPHA`, `BETA`, `GA`, `DEPRECATED`. |
| `name` | string | The full REST resource name for this descriptor. The format is: projects/\[PROJECT_ID_OR_NUMBER\]/notificationChannelDescriptors/\[TYPE\] In the above, \[TYPE\] is the value of the type field. |
| `supportedTiers` | array<string> | The tiers that support this notification channel; the project service tier must be one of the supported_tiers. Values: `SERVICE_TIER_UNSPECIFIED`, `SERVICE_TIER_BASIC`, `SERVICE_TIER_PREMIUM`. |
| `type` | string | The type of notification channel, such as "email" and "sms". To view the full list of channels, see Channel descriptors (https://cloud.google.com/monitoring/alerts/using-channels-api#ncd). Notification channel types are globally unique. |

### `NotificationChannelStrategy`

- Control over how the notification channels in notification_channels are notified when this alert fires, on a per-channel basis.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `notificationChannelNames` | array<string> | The full REST resource name for the notification channels that these settings apply to. Each of these correspond to the name field in one of the NotificationChannel objects referenced in the notification_channels field of this AlertPolicy. The format is: projects/\[PROJECT_ID_OR_NUMBER\]/notificationChannels/\[CHANNEL_ID\] |
| `renotifyInterval` | string (google-duration) | The frequency at which to send reminder notifications for open incidents. The value must be between 30 minutes and 24 hours. |

### `NotificationRateLimit`

- Control over the rate of notifications sent to this alerting policy's notification channels.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `period` | string (google-duration) | Not more than one notification per period. |

### `Operation`

- This resource represents a long-running operation that is the result of a network API call.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `done` | boolean | If the value is false, it means the operation is still in progress. If true, the operation is completed, and either error or response is available. |
| `error` | Status | The error result of the operation in case of failure or cancellation. |
| `metadata` | object | Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. |
| `name` | string | The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the name should be a resource name ending with operations/{unique_id}. |
| `response` | object | The normal, successful response of the operation. If the original method returns no data on success, such as Delete, the response is google.protobuf.Empty. If the original method is standard Get/Create/Update, the response should be the resource. For other methods, the response should have the type XxxResponse, where Xxx is the original method name. For example, if the original method name is TakeSnapshot(), the inferred response type is TakeSnapshotResponse. |

### `OperationMetadata`

- Contains metadata for longrunning operation for the edit Metrics Scope endpoints.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | The time when the batch request was received. |
| `state` | string enum | Current state of the batch operation. Values: `STATE_UNSPECIFIED`, `CREATED`, `RUNNING`, `DONE`, `CANCELLED`. |
| `updateTime` | string (google-datetime) | The time when the operation result was last updated. |

### `OpsAnalyticsQuery`

- Preview: A query that produces an aggregated response and supporting data. This is a preview feature and may be subject to change before final release.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `sql` | string | A SQL query to fetch time series, category series, or numeric series data. |

### `Option`

- A protocol buffer option, which can be attached to a message, field, enumeration, etc.New usages of this message as an alternative to FileOptions, MessageOptions, FieldOptions, EnumOptions, EnumValueOptions, ServiceOptions, or MethodOptions are strongly discouraged.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `name` | string | The option's name. For protobuf built-in options (options defined in descriptor.proto), this is the short name. For example, "map_entry". For custom options, it should be the fully-qualified name. For example, "google.api.http". |
| `value` | object | The option's value packed in an Any message. If the value is a primitive, the corresponding wrapper type defined in google/protobuf/wrappers.proto should be used. If the value is an enum, it should be stored as an int32 value using the google.protobuf.Int32Value type. |

### `Parameter`

- Preview: Parameter value applied to the aggregation function. This is a preview feature and may be subject to change before final release.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `doubleValue` | number (double) | A floating-point parameter value. |
| `intValue` | string (int64) | An integer parameter value. |

### `PerformanceThreshold`

- A PerformanceThreshold is used when each window is good when that window has a sufficiently high performance.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `basicSliPerformance` | BasicSli | BasicSli to evaluate to judge window quality. |
| `performance` | RequestBasedSli | RequestBasedSli to evaluate to judge window quality. |
| `threshold` | number (double) | If window performance >= threshold, the window is counted as good. |

### `PickTimeSeriesFilter`

- Describes a ranking-based time series filter. Each input time series is ranked with an aligner. The filter will allow up to num_time_series time series to pass through it, selecting them based on the relative ranking.For example, if ranking_method is METHOD_MEAN,direction is BOTTOM, and num_time_series is 3, then the 3 times series with the lowest mean values will pass through the filter.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `direction` | string enum | How to use the ranking to select time series that pass through the filter. Values: `DIRECTION_UNSPECIFIED`, `TOP`, `BOTTOM`. |
| `interval` | Interval | Select the top N streams/time series within this time interval |
| `numTimeSeries` | integer (int32) | How many time series to allow to pass through the filter. |
| `rankingMethod` | string enum | ranking_method is applied to each time series independently to produce the value which will be used to compare the time series to other time series. Values: `METHOD_UNSPECIFIED`, `METHOD_MEAN`, `METHOD_MAX`, `METHOD_MIN`, `METHOD_SUM`, `METHOD_LATEST`. |

### `PieChart`

- A widget that displays timeseries data as a pie or a donut.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `chartType` | string enum | Required. Indicates the visualization type for the PieChart. Values: `PIE_CHART_TYPE_UNSPECIFIED`, `PIE`, `DONUT`. |
| `dataSets` | array<PieChartDataSet> | Required. The queries for the chart's data. |
| `showLabels` | boolean | Optional. Indicates whether or not the pie chart should show slices' labels |

### `PieChartDataSet`

- Groups a time series query definition.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dimensions` | array<Dimension> | A dimension is a structured label, class, or category for a set of measurements in your data. |
| `measures` | array<Measure> | A measure is a measured value of a property in your data. For example, rainfall in inches, number of units sold, revenue gained, etc. |
| `minAlignmentPeriod` | string (google-duration) | Optional. The lower bound on data point frequency for this data set, implemented by specifying the minimum alignment period to use in a time series query. For example, if the data is published once every 10 minutes, the min_alignment_period should be at least 10 minutes. It would not make sense to fetch and align data at one minute intervals. |
| `sliceNameTemplate` | string | Optional. A template for the name of the slice. This name will be displayed in the legend and the tooltip of the pie chart. It replaces the auto-generated names for the slices. For example, if the template is set to ${resource.labels.zone}, the zone's value will be used for the name instead of the default name. |
| `timeSeriesQuery` | TimeSeriesQuery | Required. The query for the PieChart. See, google.monitoring.dashboard.v1.TimeSeriesQuery. |

### `PingConfig`

- Information involved in sending ICMP pings alongside public HTTP/TCP checks. For HTTP, the pings are performed for each part of the redirect chain.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `pingsCount` | integer (int32) | Number of ICMP pings. A maximum of 3 ICMP pings is currently supported. |

### `Point`

- A single data point in a time series.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `interval` | TimeInterval | The time interval to which the data point applies. For GAUGE metrics, the start time is optional, but if it is supplied, it must equal the end time. For DELTA metrics, the start and end time should specify a non-zero interval, with subsequent points specifying contiguous and non-overlapping intervals. For CUMULATIVE metrics, the start and end time should specify a non-zero interval, with subsequent points specifying the same start time and increasing end times, until an event resets the cumulative value to zero and sets a new start time for the following points. |
| `value` | TypedValue | The value of the data point. |

### `PointData`

- A point's value columns and time interval. Each point has one or more point values corresponding to the entries in point_descriptors field in the TimeSeriesDescriptor associated with this object.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `timeInterval` | TimeInterval | The time interval associated with the point. |
| `values` | array<TypedValue> | The values that make up the point. |

### `PolicySnapshot`

- The state of the policy at the time the alert was generated.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `displayName` | string | The display name of the alert policy. |
| `name` | string | The name of the alert policy resource. In the form of "projects/PROJECT_ID_OR_NUMBER/alertPolicies/ALERT_POLICY_ID". |
| `severity` | string enum | The severity of the alert policy. Values: `SEVERITY_UNSPECIFIED`, `CRITICAL`, `ERROR`, `WARNING`. |
| `userLabels` | object | The user labels for the alert policy. |

### `PrometheusQueryLanguageCondition`

- A condition type that allows alerting policies to be defined using Prometheus Query Language (PromQL) (https://prometheus.io/docs/prometheus/latest/querying/basics/).The PrometheusQueryLanguageCondition message contains information from a Prometheus alerting rule and its associated rule group.A Prometheus alerting rule is described here (https://prometheus.io/docs/prometheus/latest/configuration/alerting_rules/). The semantics of a Prometheus alerting rule is described here (https://prometheus.io/docs/prometheus/latest/configuration/recording_rules/#rule).A Prometheus rule group is described here (https://prometheus.io/docs/prometheus/latest/configuration/recording_rules/). The semantics of a Prometheus rule group is described here (https://prometheus.io/docs/prometheus/latest/configuration/recording_rules/#rule_group).Because Cloud Alerting has no representation of a Prometheus rule group resource, we must embed the information of the parent rule group inside each of the conditions that refer to it. We must also update the contents of all Prometheus alerts in case the information of their rule group changes.The PrometheusQueryLanguageCondition protocol buffer combines the information of the corresponding rule group and alerting rule. The structure of the PrometheusQueryLanguageCondition protocol buffer does NOT mimic the structure of the Prometheus rule group and alerting rule YAML declarations. The PrometheusQueryLanguageCondition protocol buffer may change in the future to support future rule group and/or alerting rule features. There are no new such features at the present time (2023-06-26).
- Version: v3

| Field | Type | Description |
|---|---|---|
| `alertRule` | string | Optional. The alerting rule name of this alert in the corresponding Prometheus configuration file.Some external tools may require this field to be populated correctly in order to refer to the original Prometheus configuration file. The rule group name and the alert name are necessary to update the relevant AlertPolicies in case the definition of the rule group changes in the future.This field is optional. If this field is not empty, then it must be a valid Prometheus label name (https://prometheus.io/docs/concepts/data_model/#metric-names-and-labels). This field may not exceed 2048 Unicode characters in length. |
| `disableMetricValidation` | boolean | Optional. Whether to disable metric existence validation for this condition.This allows alerting policies to be defined on metrics that do not yet exist, improving advanced customer workflows such as configuring alerting policies using Terraform.Users with the monitoring.alertPolicyViewer role are able to see the name of the non-existent metric in the alerting policy condition. |
| `duration` | string (google-duration) | Optional. Alerts are considered firing once their PromQL expression was evaluated to be "true" for this long. Alerts whose PromQL expression was not evaluated to be "true" for long enough are considered pending. Must be a non-negative duration or missing. This field is optional. Its default value is zero. |
| `evaluationInterval` | string (google-duration) | Optional. How often this rule should be evaluated. Must be a positive multiple of 30 seconds or missing. This field is optional. Its default value is 30 seconds. If this PrometheusQueryLanguageCondition was generated from a Prometheus alerting rule, then this value should be taken from the enclosing rule group. |
| `labels` | object | Optional. Labels to add to or overwrite in the PromQL query result. Label names must be valid (https://prometheus.io/docs/concepts/data_model/#metric-names-and-labels). Label values can be templatized by using variables (https://cloud.google.com/monitoring/alerts/doc-variables#doc-vars). The only available variable names are the names of the labels in the PromQL result, including "\__name_\_" and "value". "labels" may be empty. |
| `query` | string | Required. The PromQL expression to evaluate. Every evaluation cycle this expression is evaluated at the current time, and all resultant time series become pending/firing alerts. This field must not be empty. |
| `ruleGroup` | string | Optional. The rule group name of this alert in the corresponding Prometheus configuration file.Some external tools may require this field to be populated correctly in order to refer to the original Prometheus configuration file. The rule group name and the alert name are necessary to update the relevant AlertPolicies in case the definition of the rule group changes in the future.This field is optional. If this field is not empty, then it must contain a valid UTF-8 string. This field may not exceed 2048 Unicode characters in length. |

### `QueryExemplarsRequest`

- QueryExemplarsRequest holds all parameters of the Prometheus upstream API for querying exemplars.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `end` | string | The end time to evaluate the query for. Either floating point UNIX seconds or RFC3339 formatted timestamp. |
| `query` | string | A PromQL query string. Query language documentation: https://prometheus.io/docs/prometheus/latest/querying/basics/. |
| `start` | string | The start time to evaluate the query for. Either floating point UNIX seconds or RFC3339 formatted timestamp. |

### `QueryInstantRequest`

- QueryInstantRequest holds all parameters of the Prometheus upstream instant query API plus GCM specific parameters.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `query` | string | A PromQL query string. Query language documentation: https://prometheus.io/docs/prometheus/latest/querying/basics/. |
| `time` | string | The single point in time to evaluate the query for. Either floating point UNIX seconds or RFC3339 formatted timestamp. |
| `timeout` | string | An upper bound timeout for the query. Either a Prometheus duration string (https://prometheus.io/docs/prometheus/latest/querying/basics/#time-durations) or floating point seconds. This non-standard encoding must be used for compatibility with the open source API. Clients may still implement timeouts at the connection level while ignoring this field. |

### `QueryLabelsRequest`

- QueryLabelsRequest holds all parameters of the Prometheus upstream API for returning a list of label names.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `end` | string | The end time to evaluate the query for. Either floating point UNIX seconds or RFC3339 formatted timestamp. |
| `match` | string | A list of matchers encoded in the Prometheus label matcher format to constrain the values to series that satisfy them. |
| `start` | string | The start time to evaluate the query for. Either floating point UNIX seconds or RFC3339 formatted timestamp. |

### `QueryRangeRequest`

- QueryRangeRequest holds all parameters of the Prometheus upstream range query API plus GCM specific parameters.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `end` | string | The end time to evaluate the query for. Either floating point UNIX seconds or RFC3339 formatted timestamp. |
| `query` | string | A PromQL query string. Query language documentation: https://prometheus.io/docs/prometheus/latest/querying/basics/. |
| `start` | string | The start time to evaluate the query for. Either floating point UNIX seconds or RFC3339 formatted timestamp. |
| `step` | string | The resolution of query result. Either a Prometheus duration string (https://prometheus.io/docs/prometheus/latest/querying/basics/#time-durations) or floating point seconds. This non-standard encoding must be used for compatibility with the open source API. Clients may still implement timeouts at the connection level while ignoring this field. |
| `timeout` | string | An upper bound timeout for the query. Either a Prometheus duration string (https://prometheus.io/docs/prometheus/latest/querying/basics/#time-durations) or floating point seconds. This non-standard encoding must be used for compatibility with the open source API. Clients may still implement timeouts at the connection level while ignoring this field. |

### `QuerySeriesRequest`

- QuerySeries holds all parameters of the Prometheus upstream API for querying series.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `end` | string | The end time to evaluate the query for. Either floating point UNIX seconds or RFC3339 formatted timestamp. |
| `start` | string | The start time to evaluate the query for. Either floating point UNIX seconds or RFC3339 formatted timestamp. |

### `QueryTimeSeriesRequest`

- The QueryTimeSeries request. For information about the status of Monitoring Query Language (MQL), see the MQL deprecation notice (https://cloud.google.com/stackdriver/docs/deprecations/mql).
- Version: v3

| Field | Type | Description |
|---|---|---|
| `pageSize` | integer (int32) | A positive number that is the maximum number of time_series_data to return. |
| `pageToken` | string | If this field is not empty then it must contain the nextPageToken value returned by a previous call to this method. Using this field causes the method to return additional results from the previous method call. |
| `query` | string | Required. The query in the Monitoring Query Language (https://cloud.google.com/monitoring/mql/reference) format. The default time zone is in UTC. |

### `QueryTimeSeriesResponse`

- The QueryTimeSeries response. For information about the status of Monitoring Query Language (MQL), see the MQL deprecation notice (https://cloud.google.com/stackdriver/docs/deprecations/mql).
- Version: v3

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | If there are more results than have been returned, then this field is set to a non-empty value. To see the additional results, use that value as page_token in the next call to this method. |
| `partialErrors` | array<Status> | Query execution errors that may have caused the time series data returned to be incomplete. The available data will be available in the response. |
| `timeSeriesData` | array<TimeSeriesData> | The time series data. |
| `timeSeriesDescriptor` | TimeSeriesDescriptor | The descriptor for the time series data. |

### `Range`

- The range of the population values.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `max` | number (double) | The maximum of the population values. |
| `min` | number (double) | The minimum of the population values. |

### `RatioPart`

- Describes a query to build the numerator or denominator of a TimeSeriesFilterRatio.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `aggregation` | Aggregation | By default, the raw time series data is returned. Use this field to combine multiple time series for different views of the data. |
| `filter` | string | Required. The monitoring filter (https://cloud.google.com/monitoring/api/v3/filters) that identifies the metric types, resources, and projects to query. |

### `RequestBasedSli`

- Service Level Indicators for which atomic units of service are counted directly.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `distributionCut` | DistributionCut | distribution_cut is used when good_service is a count of values aggregated in a Distribution that fall into a good range. The total_service is the total count of all values aggregated in the Distribution. |
| `goodTotalRatio` | TimeSeriesRatio | good_total_ratio is used when the ratio of good_service to total_service is computed from two TimeSeries. |

### `ResourceGroup`

- The resource submessage for group checks. It can be used instead of a monitored resource, when multiple resources are being monitored.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `groupId` | string | The group of resources being monitored. Should be only the \[GROUP_ID\], and not the full-path projects/\[PROJECT_ID_OR_NUMBER\]/groups/\[GROUP_ID\]. |
| `resourceType` | string enum | The resource type of the group members. Values: `RESOURCE_TYPE_UNSPECIFIED`, `INSTANCE`, `AWS_ELB_LOAD_BALANCER`. |

### `ResponseStatusCode`

- A status to accept. Either a status code class like "2xx", or an integer status code like "200".
- Version: v3

| Field | Type | Description |
|---|---|---|
| `statusClass` | string enum | A class of status codes to accept. Values: `STATUS_CLASS_UNSPECIFIED`, `STATUS_CLASS_1XX`, `STATUS_CLASS_2XX`, `STATUS_CLASS_3XX`, `STATUS_CLASS_4XX`, `STATUS_CLASS_5XX`, `STATUS_CLASS_ANY`. |
| `statusValue` | integer (int32) | A status code to accept. |

### `Row`

- Defines the layout properties and content for a row.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `weight` | string (int64) | The relative weight of this row. The row weight is used to adjust the height of rows on the screen (relative to peers). Greater the weight, greater the height of the row on the screen. If omitted, a value of 1 is used while rendering. |
| `widgets` | array<Widget> | The display widgets arranged horizontally in this row. |

### Shape of `Aggregation`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "alignmentPeriod": "string (google-duration)",
  "crossSeriesReducer": "string enum",
  "groupByFields": "array<string>",
  "perSeriesAligner": "string enum"
}
```

## Notes

- Generated from the Discovery document(s) v3, v1 of `monitoring` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Descriptions are verbatim from Discovery, which drops angle-bracket placeholders of the source comments: a format such as `projects//locations/global` stands for `projects/{project}/locations/global` (likewise `"@.iam.gserviceaccount.com"` lost the account ID before `@`, and a name format ending in a collection such as `projects/*/locations/*/registrations/` lost its last ID), and an expression such as `... && in labels` lost its left operand (for example `'label_value' in labels`). Check the method or field in the product's REST reference before relying on such a format.
- Source: https://monitoring.googleapis.com/$discovery/rest?version=v3, https://monitoring.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
