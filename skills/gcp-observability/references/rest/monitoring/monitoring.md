---
source: https://monitoring.googleapis.com/$discovery/rest?version=v3
---

# Cloud Monitoring API REST API (monitoring)

## Signature / Usage

Base URL: `https://monitoring.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v3).

### `monitoring.folders.timeSeries.list`

- Versions: v3
- `GET https://monitoring.googleapis.com/v3/{+name}/timeSeries`
- Lists time series that match a filter.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/monitoring`, `https://www.googleapis.com/auth/monitoring.read`
- Request: —; Response: `ListTimeSeriesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The project (https://cloud.google.com/monitoring/api/v3#project_name), organization or folder on which to execute the request. The format is: projects/\[PROJECT_ID_OR_NUMBER\] organizations/\[ORGANIZATION_ID\] folders/\[FOLDER_ID\] |
| `aggregation.alignmentPeriod` | query | string (google-duration) | no | The alignment_period specifies a time interval, in seconds, that is used to divide the data in all the time series into consistent blocks of time. This will be done before the per-series aligner can be applied to the data.The value must be at least 60 seconds. If a per-series aligner other than ALIGN_NONE is specified, this field is required or an error is returned. If no per-series aligner is specified, or the aligner ALIGN_NONE is specified, then this field is ignored.The maximum value of the alignment_period is 104 weeks (2 years) for charts, and 90,000 seconds (25 hours) for alerting policies. |
| `aggregation.crossSeriesReducer` | query | string enum | no | The reduction operation to be used to combine time series into a single time series, where the value of each data point in the resulting series is a function of all the already aligned values in the input time series.Not all reducer operations can be applied to all time series. The valid choices depend on the metric_kind and the value_type of the original time series. Reduction can yield a time series with a different metric_kind or value_type than the input time series.Time series data must first be aligned (see per_series_aligner) in order to perform cross-time series reduction. If cross_series_reducer is specified, then per_series_aligner must be specified, and must not be ALIGN_NONE. An alignment_period must also be specified; otherwise, an error is returned. Values: `REDUCE_NONE`, `REDUCE_MEAN`, `REDUCE_MIN`, `REDUCE_MAX`, `REDUCE_SUM`, `REDUCE_STDDEV`, `REDUCE_COUNT`, `REDUCE_COUNT_TRUE`, `REDUCE_COUNT_FALSE`, `REDUCE_FRACTION_TRUE`, `REDUCE_PERCENTILE_99`, `REDUCE_PERCENTILE_95`, `REDUCE_PERCENTILE_50`, `REDUCE_PERCENTILE_05`. |
| `aggregation.groupByFields` | query | repeated string | no | The set of fields to preserve when cross_series_reducer is specified. The group_by_fields determine how the time series are partitioned into subsets prior to applying the aggregation operation. Each subset contains time series that have the same value for each of the grouping fields. Each individual time series is a member of exactly one subset. The cross_series_reducer is applied to each subset of time series. It is not possible to reduce across different resource types, so this field implicitly contains resource.type. Fields not specified in group_by_fields are aggregated away. If group_by_fields is not specified and all the time series have the same resource type, then the time series are aggregated into a single output time series. If cross_series_reducer is not defined, this field is ignored. |
| `aggregation.perSeriesAligner` | query | string enum | no | An Aligner describes how to bring the data points in a single time series into temporal alignment. Except for ALIGN_NONE, all alignments cause all the data points in an alignment_period to be mathematically grouped together, resulting in a single data point for each alignment_period with end timestamp at the end of the period.Not all alignment operations may be applied to all time series. The valid choices depend on the metric_kind and value_type of the original time series. Alignment can change the metric_kind or the value_type of the time series.Time series data must be aligned in order to perform cross-time series reduction. If cross_series_reducer is specified, then per_series_aligner must be specified and not equal to ALIGN_NONE and alignment_period must be specified; otherwise, an error is returned. Values: `ALIGN_NONE`, `ALIGN_DELTA`, `ALIGN_RATE`, `ALIGN_INTERPOLATE`, `ALIGN_NEXT_OLDER`, `ALIGN_MIN`, `ALIGN_MAX`, `ALIGN_MEAN`, `ALIGN_COUNT`, `ALIGN_SUM`, `ALIGN_STDDEV`, `ALIGN_COUNT_TRUE`, `ALIGN_COUNT_FALSE`, `ALIGN_FRACTION_TRUE`, `ALIGN_PERCENTILE_99`, `ALIGN_PERCENTILE_95`, `ALIGN_PERCENTILE_50`, `ALIGN_PERCENTILE_05`, `ALIGN_PERCENT_CHANGE`. |
| `filter` | query | string | yes | Required. A monitoring filter (https://cloud.google.com/monitoring/api/v3/filters) that specifies which time series should be returned. The filter must specify a single metric type, and can additionally specify metric labels and other information. For example: metric.type = "compute.googleapis.com/instance/cpu/usage_time" AND metric.labels.instance_name = "my-instance-name" |
| `interval.endTime` | query | string (google-datetime) | yes | Required. The end of the time interval. |
| `interval.startTime` | query | string (google-datetime) | no | Optional. The beginning of the time interval. The default value for the start time is the end time. The start time must not be later than the end time. |
| `orderBy` | query | string | no | Unsupported: must be left blank. The points in each time series are currently returned in reverse time order (most recent to oldest). |
| `pageSize` | query | integer (int32) | no | A positive number that is the maximum number of results to return. If page_size is empty or more than 100,000 results, the effective page_size is 100,000 results. If view is set to FULL, this is the maximum number of Points returned. If view is set to HEADERS, this is the maximum number of TimeSeries returned. |
| `pageToken` | query | string | no | If this field is not empty then it must contain the nextPageToken value returned by a previous call to this method. Using this field causes the method to return additional results from the previous method call. |
| `secondaryAggregation.alignmentPeriod` | query | string (google-duration) | no | The alignment_period specifies a time interval, in seconds, that is used to divide the data in all the time series into consistent blocks of time. This will be done before the per-series aligner can be applied to the data.The value must be at least 60 seconds. If a per-series aligner other than ALIGN_NONE is specified, this field is required or an error is returned. If no per-series aligner is specified, or the aligner ALIGN_NONE is specified, then this field is ignored.The maximum value of the alignment_period is 104 weeks (2 years) for charts, and 90,000 seconds (25 hours) for alerting policies. |
| `secondaryAggregation.crossSeriesReducer` | query | string enum | no | The reduction operation to be used to combine time series into a single time series, where the value of each data point in the resulting series is a function of all the already aligned values in the input time series.Not all reducer operations can be applied to all time series. The valid choices depend on the metric_kind and the value_type of the original time series. Reduction can yield a time series with a different metric_kind or value_type than the input time series.Time series data must first be aligned (see per_series_aligner) in order to perform cross-time series reduction. If cross_series_reducer is specified, then per_series_aligner must be specified, and must not be ALIGN_NONE. An alignment_period must also be specified; otherwise, an error is returned. Values: `REDUCE_NONE`, `REDUCE_MEAN`, `REDUCE_MIN`, `REDUCE_MAX`, `REDUCE_SUM`, `REDUCE_STDDEV`, `REDUCE_COUNT`, `REDUCE_COUNT_TRUE`, `REDUCE_COUNT_FALSE`, `REDUCE_FRACTION_TRUE`, `REDUCE_PERCENTILE_99`, `REDUCE_PERCENTILE_95`, `REDUCE_PERCENTILE_50`, `REDUCE_PERCENTILE_05`. |
| `secondaryAggregation.groupByFields` | query | repeated string | no | The set of fields to preserve when cross_series_reducer is specified. The group_by_fields determine how the time series are partitioned into subsets prior to applying the aggregation operation. Each subset contains time series that have the same value for each of the grouping fields. Each individual time series is a member of exactly one subset. The cross_series_reducer is applied to each subset of time series. It is not possible to reduce across different resource types, so this field implicitly contains resource.type. Fields not specified in group_by_fields are aggregated away. If group_by_fields is not specified and all the time series have the same resource type, then the time series are aggregated into a single output time series. If cross_series_reducer is not defined, this field is ignored. |
| `secondaryAggregation.perSeriesAligner` | query | string enum | no | An Aligner describes how to bring the data points in a single time series into temporal alignment. Except for ALIGN_NONE, all alignments cause all the data points in an alignment_period to be mathematically grouped together, resulting in a single data point for each alignment_period with end timestamp at the end of the period.Not all alignment operations may be applied to all time series. The valid choices depend on the metric_kind and value_type of the original time series. Alignment can change the metric_kind or the value_type of the time series.Time series data must be aligned in order to perform cross-time series reduction. If cross_series_reducer is specified, then per_series_aligner must be specified and not equal to ALIGN_NONE and alignment_period must be specified; otherwise, an error is returned. Values: `ALIGN_NONE`, `ALIGN_DELTA`, `ALIGN_RATE`, `ALIGN_INTERPOLATE`, `ALIGN_NEXT_OLDER`, `ALIGN_MIN`, `ALIGN_MAX`, `ALIGN_MEAN`, `ALIGN_COUNT`, `ALIGN_SUM`, `ALIGN_STDDEV`, `ALIGN_COUNT_TRUE`, `ALIGN_COUNT_FALSE`, `ALIGN_FRACTION_TRUE`, `ALIGN_PERCENTILE_99`, `ALIGN_PERCENTILE_95`, `ALIGN_PERCENTILE_50`, `ALIGN_PERCENTILE_05`, `ALIGN_PERCENT_CHANGE`. |
| `view` | query | string enum | yes | Required. Specifies which information is returned about the time series. Values: `FULL`, `HEADERS`. |

### `monitoring.locations.global.metricsScopes.get`

- Versions: v1
- `GET https://monitoring.googleapis.com/v1/{+name}`
- Returns a specific Metrics Scope, including the list of projects monitored by the specified Metrics Scope.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/monitoring`, `https://www.googleapis.com/auth/monitoring.read`
- Request: —; Response: `MetricsScope`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the Metrics Scope. Example: locations/global/metricsScopes/{SCOPING_PROJECT_ID_OR_NUMBER} |

### `monitoring.locations.global.metricsScopes.listMetricsScopesByMonitoredProject`

- Versions: v1
- `GET https://monitoring.googleapis.com/v1/locations/global/metricsScopes:listMetricsScopesByMonitoredProject`
- Returns a list of every Metrics Scope that a specific MonitoredProject has been added to. The metrics scope representing the specified monitored project will always be the first entry in the response.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/monitoring`, `https://www.googleapis.com/auth/monitoring.read`
- Request: —; Response: `ListMetricsScopesByMonitoredProjectResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `monitoredResourceContainer` | query | string | yes | Required. The resource name of the Monitored Project being requested. Example: projects/{MONITORED_PROJECT_ID_OR_NUMBER} |

### `monitoring.locations.global.metricsScopes.projects.create`

- Versions: v1
- `POST https://monitoring.googleapis.com/v1/{+parent}/projects`
- Adds a MonitoredProject with the given project ID to the specified Metrics Scope.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/monitoring`, `https://www.googleapis.com/auth/monitoring.write`
- Request: `MonitoredProject`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the existing Metrics Scope that will monitor this project. Example: locations/global/metricsScopes/{SCOPING_PROJECT_ID_OR_NUMBER} |

### `monitoring.locations.global.metricsScopes.projects.delete`

- Versions: v1
- `DELETE https://monitoring.googleapis.com/v1/{+name}`
- Deletes a MonitoredProject from the specified Metrics Scope.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/monitoring`, `https://www.googleapis.com/auth/monitoring.write`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the MonitoredProject. Example: locations/global/metricsScopes/{SCOPING_PROJECT_ID_OR_NUMBER}/projects/{MONITORED_PROJECT_ID_OR_NUMBER}Authorization requires the following Google IAM (https://cloud.google.com/iam) permissions on both the Metrics Scope and on the MonitoredProject: monitoring.metricsScopes.link |

### `monitoring.operations.get`

- Versions: v1
- `GET https://monitoring.googleapis.com/v1/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/monitoring`, `https://www.googleapis.com/auth/monitoring.read`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `monitoring.organizations.timeSeries.list`

- Versions: v3
- `GET https://monitoring.googleapis.com/v3/{+name}/timeSeries`
- Lists time series that match a filter.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/monitoring`, `https://www.googleapis.com/auth/monitoring.read`
- Request: —; Response: `ListTimeSeriesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The project (https://cloud.google.com/monitoring/api/v3#project_name), organization or folder on which to execute the request. The format is: projects/\[PROJECT_ID_OR_NUMBER\] organizations/\[ORGANIZATION_ID\] folders/\[FOLDER_ID\] |
| `aggregation.alignmentPeriod` | query | string (google-duration) | no | The alignment_period specifies a time interval, in seconds, that is used to divide the data in all the time series into consistent blocks of time. This will be done before the per-series aligner can be applied to the data.The value must be at least 60 seconds. If a per-series aligner other than ALIGN_NONE is specified, this field is required or an error is returned. If no per-series aligner is specified, or the aligner ALIGN_NONE is specified, then this field is ignored.The maximum value of the alignment_period is 104 weeks (2 years) for charts, and 90,000 seconds (25 hours) for alerting policies. |
| `aggregation.crossSeriesReducer` | query | string enum | no | The reduction operation to be used to combine time series into a single time series, where the value of each data point in the resulting series is a function of all the already aligned values in the input time series.Not all reducer operations can be applied to all time series. The valid choices depend on the metric_kind and the value_type of the original time series. Reduction can yield a time series with a different metric_kind or value_type than the input time series.Time series data must first be aligned (see per_series_aligner) in order to perform cross-time series reduction. If cross_series_reducer is specified, then per_series_aligner must be specified, and must not be ALIGN_NONE. An alignment_period must also be specified; otherwise, an error is returned. Values: `REDUCE_NONE`, `REDUCE_MEAN`, `REDUCE_MIN`, `REDUCE_MAX`, `REDUCE_SUM`, `REDUCE_STDDEV`, `REDUCE_COUNT`, `REDUCE_COUNT_TRUE`, `REDUCE_COUNT_FALSE`, `REDUCE_FRACTION_TRUE`, `REDUCE_PERCENTILE_99`, `REDUCE_PERCENTILE_95`, `REDUCE_PERCENTILE_50`, `REDUCE_PERCENTILE_05`. |
| `aggregation.groupByFields` | query | repeated string | no | The set of fields to preserve when cross_series_reducer is specified. The group_by_fields determine how the time series are partitioned into subsets prior to applying the aggregation operation. Each subset contains time series that have the same value for each of the grouping fields. Each individual time series is a member of exactly one subset. The cross_series_reducer is applied to each subset of time series. It is not possible to reduce across different resource types, so this field implicitly contains resource.type. Fields not specified in group_by_fields are aggregated away. If group_by_fields is not specified and all the time series have the same resource type, then the time series are aggregated into a single output time series. If cross_series_reducer is not defined, this field is ignored. |
| `aggregation.perSeriesAligner` | query | string enum | no | An Aligner describes how to bring the data points in a single time series into temporal alignment. Except for ALIGN_NONE, all alignments cause all the data points in an alignment_period to be mathematically grouped together, resulting in a single data point for each alignment_period with end timestamp at the end of the period.Not all alignment operations may be applied to all time series. The valid choices depend on the metric_kind and value_type of the original time series. Alignment can change the metric_kind or the value_type of the time series.Time series data must be aligned in order to perform cross-time series reduction. If cross_series_reducer is specified, then per_series_aligner must be specified and not equal to ALIGN_NONE and alignment_period must be specified; otherwise, an error is returned. Values: `ALIGN_NONE`, `ALIGN_DELTA`, `ALIGN_RATE`, `ALIGN_INTERPOLATE`, `ALIGN_NEXT_OLDER`, `ALIGN_MIN`, `ALIGN_MAX`, `ALIGN_MEAN`, `ALIGN_COUNT`, `ALIGN_SUM`, `ALIGN_STDDEV`, `ALIGN_COUNT_TRUE`, `ALIGN_COUNT_FALSE`, `ALIGN_FRACTION_TRUE`, `ALIGN_PERCENTILE_99`, `ALIGN_PERCENTILE_95`, `ALIGN_PERCENTILE_50`, `ALIGN_PERCENTILE_05`, `ALIGN_PERCENT_CHANGE`. |
| `filter` | query | string | yes | Required. A monitoring filter (https://cloud.google.com/monitoring/api/v3/filters) that specifies which time series should be returned. The filter must specify a single metric type, and can additionally specify metric labels and other information. For example: metric.type = "compute.googleapis.com/instance/cpu/usage_time" AND metric.labels.instance_name = "my-instance-name" |
| `interval.endTime` | query | string (google-datetime) | yes | Required. The end of the time interval. |
| `interval.startTime` | query | string (google-datetime) | no | Optional. The beginning of the time interval. The default value for the start time is the end time. The start time must not be later than the end time. |
| `orderBy` | query | string | no | Unsupported: must be left blank. The points in each time series are currently returned in reverse time order (most recent to oldest). |
| `pageSize` | query | integer (int32) | no | A positive number that is the maximum number of results to return. If page_size is empty or more than 100,000 results, the effective page_size is 100,000 results. If view is set to FULL, this is the maximum number of Points returned. If view is set to HEADERS, this is the maximum number of TimeSeries returned. |
| `pageToken` | query | string | no | If this field is not empty then it must contain the nextPageToken value returned by a previous call to this method. Using this field causes the method to return additional results from the previous method call. |
| `secondaryAggregation.alignmentPeriod` | query | string (google-duration) | no | The alignment_period specifies a time interval, in seconds, that is used to divide the data in all the time series into consistent blocks of time. This will be done before the per-series aligner can be applied to the data.The value must be at least 60 seconds. If a per-series aligner other than ALIGN_NONE is specified, this field is required or an error is returned. If no per-series aligner is specified, or the aligner ALIGN_NONE is specified, then this field is ignored.The maximum value of the alignment_period is 104 weeks (2 years) for charts, and 90,000 seconds (25 hours) for alerting policies. |
| `secondaryAggregation.crossSeriesReducer` | query | string enum | no | The reduction operation to be used to combine time series into a single time series, where the value of each data point in the resulting series is a function of all the already aligned values in the input time series.Not all reducer operations can be applied to all time series. The valid choices depend on the metric_kind and the value_type of the original time series. Reduction can yield a time series with a different metric_kind or value_type than the input time series.Time series data must first be aligned (see per_series_aligner) in order to perform cross-time series reduction. If cross_series_reducer is specified, then per_series_aligner must be specified, and must not be ALIGN_NONE. An alignment_period must also be specified; otherwise, an error is returned. Values: `REDUCE_NONE`, `REDUCE_MEAN`, `REDUCE_MIN`, `REDUCE_MAX`, `REDUCE_SUM`, `REDUCE_STDDEV`, `REDUCE_COUNT`, `REDUCE_COUNT_TRUE`, `REDUCE_COUNT_FALSE`, `REDUCE_FRACTION_TRUE`, `REDUCE_PERCENTILE_99`, `REDUCE_PERCENTILE_95`, `REDUCE_PERCENTILE_50`, `REDUCE_PERCENTILE_05`. |
| `secondaryAggregation.groupByFields` | query | repeated string | no | The set of fields to preserve when cross_series_reducer is specified. The group_by_fields determine how the time series are partitioned into subsets prior to applying the aggregation operation. Each subset contains time series that have the same value for each of the grouping fields. Each individual time series is a member of exactly one subset. The cross_series_reducer is applied to each subset of time series. It is not possible to reduce across different resource types, so this field implicitly contains resource.type. Fields not specified in group_by_fields are aggregated away. If group_by_fields is not specified and all the time series have the same resource type, then the time series are aggregated into a single output time series. If cross_series_reducer is not defined, this field is ignored. |
| `secondaryAggregation.perSeriesAligner` | query | string enum | no | An Aligner describes how to bring the data points in a single time series into temporal alignment. Except for ALIGN_NONE, all alignments cause all the data points in an alignment_period to be mathematically grouped together, resulting in a single data point for each alignment_period with end timestamp at the end of the period.Not all alignment operations may be applied to all time series. The valid choices depend on the metric_kind and value_type of the original time series. Alignment can change the metric_kind or the value_type of the time series.Time series data must be aligned in order to perform cross-time series reduction. If cross_series_reducer is specified, then per_series_aligner must be specified and not equal to ALIGN_NONE and alignment_period must be specified; otherwise, an error is returned. Values: `ALIGN_NONE`, `ALIGN_DELTA`, `ALIGN_RATE`, `ALIGN_INTERPOLATE`, `ALIGN_NEXT_OLDER`, `ALIGN_MIN`, `ALIGN_MAX`, `ALIGN_MEAN`, `ALIGN_COUNT`, `ALIGN_SUM`, `ALIGN_STDDEV`, `ALIGN_COUNT_TRUE`, `ALIGN_COUNT_FALSE`, `ALIGN_FRACTION_TRUE`, `ALIGN_PERCENTILE_99`, `ALIGN_PERCENTILE_95`, `ALIGN_PERCENTILE_50`, `ALIGN_PERCENTILE_05`, `ALIGN_PERCENT_CHANGE`. |
| `view` | query | string enum | yes | Required. Specifies which information is returned about the time series. Values: `FULL`, `HEADERS`. |

### `monitoring.projects.alertPolicies.create`

- Versions: v3
- `POST https://monitoring.googleapis.com/v3/{+name}/alertPolicies`
- Creates a new alerting policy.Design your application to single-thread API calls that modify the state of alerting policies in a single project. This includes calls to CreateAlertPolicy, DeleteAlertPolicy and UpdateAlertPolicy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/monitoring`
- Request: `AlertPolicy`; Response: `AlertPolicy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The project (https://cloud.google.com/monitoring/api/v3#project_name) in which to create the alerting policy. The format is: projects/\[PROJECT_ID_OR_NUMBER\] Note that this field names the parent container in which the alerting policy will be written, not the name of the created policy. \|name\| must be a host project of a Metrics Scope, otherwise INVALID_ARGUMENT error will return. The alerting policy that is returned will have a name that contains a normalized representation of this name as a prefix but adds a suffix of the form /alertPolicies/\[ALERT_POLICY_ID\], identifying the policy in the container. |

### `monitoring.projects.alertPolicies.delete`

- Versions: v3
- `DELETE https://monitoring.googleapis.com/v3/{+name}`
- Deletes an alerting policy.Design your application to single-thread API calls that modify the state of alerting policies in a single project. This includes calls to CreateAlertPolicy, DeleteAlertPolicy and UpdateAlertPolicy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/monitoring`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The alerting policy to delete. The format is: projects/\[PROJECT_ID_OR_NUMBER\]/alertPolicies/\[ALERT_POLICY_ID\] For more information, see AlertPolicy. |

### `monitoring.projects.alertPolicies.get`

- Versions: v3
- `GET https://monitoring.googleapis.com/v3/{+name}`
- Gets a single alerting policy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/monitoring`, `https://www.googleapis.com/auth/monitoring.read`
- Request: —; Response: `AlertPolicy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The alerting policy to retrieve. The format is: projects/\[PROJECT_ID_OR_NUMBER\]/alertPolicies/\[ALERT_POLICY_ID\] |

### `monitoring.projects.alertPolicies.list`

- Versions: v3
- `GET https://monitoring.googleapis.com/v3/{+name}/alertPolicies`
- Lists the existing alerting policies for the workspace.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/monitoring`, `https://www.googleapis.com/auth/monitoring.read`
- Request: —; Response: `ListAlertPoliciesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The project (https://cloud.google.com/monitoring/api/v3#project_name) whose alert policies are to be listed. The format is: projects/\[PROJECT_ID_OR_NUMBER\] Note that this field names the parent container in which the alerting policies to be listed are stored. To retrieve a single alerting policy by name, use the GetAlertPolicy operation, instead. |
| `filter` | query | string | no | Optional. If provided, this field specifies the criteria that must be met by alert policies to be included in the response.For more details, see sorting and filtering (https://cloud.google.com/monitoring/api/v3/sorting-and-filtering). |
| `orderBy` | query | string | no | Optional. A comma-separated list of fields by which to sort the result. Supports the same set of field references as the filter field. Entries can be prefixed with a minus sign to sort by the field in descending order.For more details, see sorting and filtering (https://cloud.google.com/monitoring/api/v3/sorting-and-filtering). |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of results to return in a single response. |
| `pageToken` | query | string | no | Optional. If this field is not empty then it must contain the nextPageToken value returned by a previous call to this method. Using this field causes the method to return more results from the previous method call. |

### `monitoring.projects.alertPolicies.patch`

- Versions: v3
- `PATCH https://monitoring.googleapis.com/v3/{+name}`
- Updates an alerting policy. You can either replace the entire policy with a new one or replace only certain fields in the current alerting policy by specifying the fields to be updated via updateMask. Returns the updated alerting policy.Design your application to single-thread API calls that modify the state of alerting policies in a single project. This includes calls to CreateAlertPolicy, DeleteAlertPolicy and UpdateAlertPolicy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/monitoring`
- Request: `AlertPolicy`; Response: `AlertPolicy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. Required if the policy exists. The resource name for this policy. The format is: projects/\[PROJECT_ID_OR_NUMBER\]/alertPolicies/\[ALERT_POLICY_ID\] \[ALERT_POLICY_ID\] is assigned by Cloud Monitoring when the policy is created. When calling the alertPolicies.create method, do not include the name field in the alerting policy passed as part of the request. |
| `updateMask` | query | string (google-fieldmask) | no | Optional. A list of alerting policy field names. If this field is not empty, each listed field in the existing alerting policy is set to the value of the corresponding field in the supplied policy (alert_policy), or to the field's default value if the field is not in the supplied alerting policy. Fields not listed retain their previous value.Examples of valid field masks include display_name, documentation, documentation.content, documentation.mime_type, user_labels, user_label.nameofkey, enabled, conditions, combiner, etc.If this field is empty, then the supplied alerting policy replaces the existing policy. It is the same as deleting the existing policy and adding the supplied policy, except for the following: The new policy will have the same \[ALERT_POLICY_ID\] as the former policy. This gives you continuity with the former policy in your notifications and incidents. Conditions in the new policy will keep their former \[CONDITION_ID\] if the supplied condition includes the name field with that \[CONDITION_ID\]. If the supplied condition omits the name field, then a new \[CONDITION_ID\] is created. |

### `monitoring.projects.alerts.get`

- Versions: v3
- `GET https://monitoring.googleapis.com/v3/{+name}`
- Gets a single alert.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/monitoring`, `https://www.googleapis.com/auth/monitoring.read`
- Request: —; Response: `Alert`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the alert.The format is: projects/\[PROJECT_ID_OR_NUMBER\]/alerts/\[ALERT_ID\] The \[ALERT_ID\] is a system-assigned unique identifier for the alert. |

### `monitoring.projects.alerts.list`

- Versions: v3
- `GET https://monitoring.googleapis.com/v3/{+parent}/alerts`
- Lists the existing alerts for the metrics scope of the project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/monitoring`, `https://www.googleapis.com/auth/monitoring.read`
- Request: —; Response: `ListAlertsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The name of the project to list alerts for. |
| `filter` | query | string | no | Optional. An alert is returned if there is a match on any fields belonging to the alert or its subfields. |
| `orderBy` | query | string | no | Optional. A comma-separated list of fields in Alert to use for sorting. The default sort direction is ascending. To specify descending order for a field, add a desc modifier. The following fields are supported: open_time close_timeFor example, close_time desc, open_time will return the alerts closed most recently, with ties broken in the order of older alerts listed first.If the field is not set, the results are sorted by open_time desc. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of results to return in a single response. If not set to a positive number, at most 50 alerts will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. |
| `pageToken` | query | string | no | Optional. If non-empty, page_token must contain a value returned as the next_page_token in a previous response to request the next set of results. |

### `monitoring.projects.collectdTimeSeries.create`

- Versions: v3
- `POST https://monitoring.googleapis.com/v3/{+name}/collectdTimeSeries`
- Cloud Monitoring Agent only: Creates a new time series.This method is only for use by the Cloud Monitoring Agent. Use projects.timeSeries.create instead.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/monitoring`, `https://www.googleapis.com/auth/monitoring.write`
- Request: `CreateCollectdTimeSeriesRequest`; Response: `CreateCollectdTimeSeriesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The project (https://cloud.google.com/monitoring/api/v3#project_name) in which to create the time series. The format is: projects/\[PROJECT_ID_OR_NUMBER\] |

### `monitoring.projects.dashboards.create`

- Versions: v1
- `POST https://monitoring.googleapis.com/v1/{+parent}/dashboards`
- Creates a new custom dashboard. For examples on how you can use this API to create dashboards, see Managing dashboards by API (https://cloud.google.com/monitoring/dashboards/api-dashboard). This method requires the monitoring.dashboards.create permission on the specified project. For more information about permissions, see Cloud Identity and Access Management (https://cloud.google.com/iam).
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/monitoring`, `https://www.googleapis.com/auth/monitoring.write`
- Request: `Dashboard`; Response: `Dashboard`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The project on which to execute the request. The format is: projects/\[PROJECT_ID_OR_NUMBER\] The \[PROJECT_ID_OR_NUMBER\] must match the dashboard resource name. |
| `validateOnly` | query | boolean | no | If set, validate the request and preview the review, but do not actually save it. |

### `monitoring.projects.dashboards.delete`

- Versions: v1
- `DELETE https://monitoring.googleapis.com/v1/{+name}`
- Deletes an existing custom dashboard.This method requires the monitoring.dashboards.delete permission on the specified dashboard. For more information, see Cloud Identity and Access Management (https://cloud.google.com/iam).
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/monitoring`, `https://www.googleapis.com/auth/monitoring.write`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the Dashboard. The format is: projects/\[PROJECT_ID_OR_NUMBER\]/dashboards/\[DASHBOARD_ID\] |

### `monitoring.projects.dashboards.get`

- Versions: v1
- `GET https://monitoring.googleapis.com/v1/{+name}`
- Fetches a specific dashboard.This method requires the monitoring.dashboards.get permission on the specified dashboard. For more information, see Cloud Identity and Access Management (https://cloud.google.com/iam).
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/monitoring`, `https://www.googleapis.com/auth/monitoring.read`
- Request: —; Response: `Dashboard`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the Dashboard. The format is one of: dashboards/\[DASHBOARD_ID\] (for system dashboards) projects/\[PROJECT_ID_OR_NUMBER\]/dashboards/\[DASHBOARD_ID\] (for custom dashboards). |

### `monitoring.projects.dashboards.list`

- Versions: v1
- `GET https://monitoring.googleapis.com/v1/{+parent}/dashboards`
- Lists the existing dashboards.This method requires the monitoring.dashboards.list permission on the specified project. For more information, see Cloud Identity and Access Management (https://cloud.google.com/iam).
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/monitoring`, `https://www.googleapis.com/auth/monitoring.read`
- Request: —; Response: `ListDashboardsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The scope of the dashboards to list. The format is: projects/\[PROJECT_ID_OR_NUMBER\] |
| `pageSize` | query | integer (int32) | no | A positive number that is the maximum number of results to return. If unspecified, a default of 1000 is used. |
| `pageToken` | query | string | no | Optional. If this field is not empty then it must contain the nextPageToken value returned by a previous call to this method. Using this field causes the method to return additional results from the previous method call. |

### `monitoring.projects.dashboards.patch`

- Versions: v1
- `PATCH https://monitoring.googleapis.com/v1/{+name}`
- Replaces an existing custom dashboard with a new definition.This method requires the monitoring.dashboards.update permission on the specified dashboard. For more information, see Cloud Identity and Access Management (https://cloud.google.com/iam).
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/monitoring`, `https://www.googleapis.com/auth/monitoring.write`
- Request: `Dashboard`; Response: `Dashboard`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The resource name of the dashboard. |
| `validateOnly` | query | boolean | no | If set, validate the request and preview the review, but do not actually save it. |

### `monitoring.projects.groups.create`

- Versions: v3
- `POST https://monitoring.googleapis.com/v3/{+name}/groups`
- Creates a new group.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/monitoring`
- Request: `Group`; Response: `Group`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The project (https://cloud.google.com/monitoring/api/v3#project_name) in which to create the group. The format is: projects/\[PROJECT_ID_OR_NUMBER\] |
| `validateOnly` | query | boolean | no | If true, validate this request but do not create the group. |

### `monitoring.projects.groups.delete`

- Versions: v3
- `DELETE https://monitoring.googleapis.com/v3/{+name}`
- Deletes an existing group.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/monitoring`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The group to delete. The format is: projects/\[PROJECT_ID_OR_NUMBER\]/groups/\[GROUP_ID\] |
| `recursive` | query | boolean | no | If this field is true, then the request means to delete a group with all its descendants. Otherwise, the request means to delete a group only when it has no descendants. The default value is false. |

### `monitoring.projects.groups.get`

- Versions: v3
- `GET https://monitoring.googleapis.com/v3/{+name}`
- Gets a single group.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/monitoring`, `https://www.googleapis.com/auth/monitoring.read`
- Request: —; Response: `Group`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The group to retrieve. The format is: projects/\[PROJECT_ID_OR_NUMBER\]/groups/\[GROUP_ID\] |

### `monitoring.projects.groups.list`

- Versions: v3
- `GET https://monitoring.googleapis.com/v3/{+name}/groups`
- Lists the existing groups.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/monitoring`, `https://www.googleapis.com/auth/monitoring.read`
- Request: —; Response: `ListGroupsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The project (https://cloud.google.com/monitoring/api/v3#project_name) whose groups are to be listed. The format is: projects/\[PROJECT_ID_OR_NUMBER\] |
| `ancestorsOfGroup` | query | string | no | A group name. The format is: projects/\[PROJECT_ID_OR_NUMBER\]/groups/\[GROUP_ID\] Returns groups that are ancestors of the specified group. The groups are returned in order, starting with the immediate parent and ending with the most distant ancestor. If the specified group has no immediate parent, the results are empty. |
| `childrenOfGroup` | query | string | no | A group name. The format is: projects/\[PROJECT_ID_OR_NUMBER\]/groups/\[GROUP_ID\] Returns groups whose parent_name field contains the group name. If no groups have this parent, the results are empty. |
| `descendantsOfGroup` | query | string | no | A group name. The format is: projects/\[PROJECT_ID_OR_NUMBER\]/groups/\[GROUP_ID\] Returns the descendants of the specified group. This is a superset of the results returned by the children_of_group filter, and includes children-of-children, and so forth. |
| `pageSize` | query | integer (int32) | no | A positive number that is the maximum number of results to return. |
| `pageToken` | query | string | no | If this field is not empty then it must contain the next_page_token value returned by a previous call to this method. Using this field causes the method to return additional results from the previous method call. |

### `monitoring.projects.groups.members.list`

- Versions: v3
- `GET https://monitoring.googleapis.com/v3/{+name}/members`
- Lists the monitored resources that are members of a group.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/monitoring`, `https://www.googleapis.com/auth/monitoring.read`
- Request: —; Response: `ListGroupMembersResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The group whose members are listed. The format is: projects/\[PROJECT_ID_OR_NUMBER\]/groups/\[GROUP_ID\] |
| `filter` | query | string | no | An optional list filter (https://cloud.google.com/monitoring/api/learn_more#filtering) describing the members to be returned. The filter may reference the type, labels, and metadata of monitored resources that comprise the group. For example, to return only resources representing Compute Engine VM instances, use this filter: `resource.type = "gce_instance"` |
| `interval.endTime` | query | string (google-datetime) | conditional | Required. The end of the time interval. |
| `interval.startTime` | query | string (google-datetime) | no | Optional. The beginning of the time interval. The default value for the start time is the end time. The start time must not be later than the end time. |
| `pageSize` | query | integer (int32) | no | A positive number that is the maximum number of results to return. |
| `pageToken` | query | string | no | If this field is not empty then it must contain the next_page_token value returned by a previous call to this method. Using this field causes the method to return additional results from the previous method call. |

### `monitoring.projects.groups.update`

- Versions: v3
- `PUT https://monitoring.googleapis.com/v3/{+name}`
- Updates an existing group. You can change any group attributes except name.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/monitoring`
- Request: `Group`; Response: `Group`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Output only. The name of this group. The format is: projects/\[PROJECT_ID_OR_NUMBER\]/groups/\[GROUP_ID\] When creating a group, this field is ignored and a new name is created consisting of the project specified in the call to CreateGroup and a unique \[GROUP_ID\] that is generated automatically. |
| `validateOnly` | query | boolean | no | If true, validate this request but do not update the existing group. |

### `monitoring.projects.location.prometheus.api.v1.label.values`

- Versions: v1
- `GET https://monitoring.googleapis.com/v1/{+name}/location/{location}/prometheus/api/v1/label/{label}/values`
- Lists possible values for a given label name.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/monitoring`, `https://www.googleapis.com/auth/monitoring.read`
- Request: —; Response: `HttpBody`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The workspace on which to execute the request. It is not part of the open source API but used as a request path prefix to distinguish different virtual Prometheus instances of Google Prometheus Engine. The format is: projects/PROJECT_ID_OR_NUMBER. |
| `location` | path | string | yes | Location of the resource information. Has to be "global" now. |
| `label` | path | string | yes | The label name for which values are queried. |
| `end` | query | string | no | The end time to evaluate the query for. Either floating point UNIX seconds or RFC3339 formatted timestamp. |
| `match` | query | string | no | A list of matchers encoded in the Prometheus label matcher format to constrain the values to series that satisfy them. |
| `start` | query | string | no | The start time to evaluate the query for. Either floating point UNIX seconds or RFC3339 formatted timestamp. |

### `monitoring.projects.location.prometheus.api.v1.labels`

- Versions: v1
- `POST https://monitoring.googleapis.com/v1/{+name}/location/{location}/prometheus/api/v1/labels`
- Lists labels for metrics.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/monitoring`, `https://www.googleapis.com/auth/monitoring.read`
- Request: `QueryLabelsRequest`; Response: `HttpBody`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The workspace on which to execute the request. It is not part of the open source API but used as a request path prefix to distinguish different virtual Prometheus instances of Google Prometheus Engine. The format is: projects/PROJECT_ID_OR_NUMBER. |
| `location` | path | string | yes | Location of the resource information. Has to be "global" now. |

### `monitoring.projects.location.prometheus.api.v1.metadata.list`

- Versions: v1
- `GET https://monitoring.googleapis.com/v1/{+name}/location/{location}/prometheus/api/v1/metadata`
- Lists metadata for metrics.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/monitoring`, `https://www.googleapis.com/auth/monitoring.read`
- Request: —; Response: `HttpBody`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The workspace on which to execute the request. It is not part of the open source API but used as a request path prefix to distinguish different virtual Prometheus instances of Google Prometheus Engine. The format is: projects/PROJECT_ID_OR_NUMBER. |
| `location` | path | string | yes | Location of the resource information. Has to be "global" for now. |
| `limit` | query | string (int64) | no | Maximum number of metrics to return. |
| `metric` | query | string | no | The metric name for which to query metadata. If unset, all metric metadata is returned. |

### `monitoring.projects.location.prometheus.api.v1.query`

- Versions: v1
- `POST https://monitoring.googleapis.com/v1/{+name}/location/{location}/prometheus/api/v1/query`
- Evaluate a PromQL query at a single point in time.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/monitoring`, `https://www.googleapis.com/auth/monitoring.read`
- Request: `QueryInstantRequest`; Response: `HttpBody`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The project on which to execute the request. Data associcated with the project's workspace stored under the The format is: projects/PROJECT_ID_OR_NUMBER. Open source API but used as a request path prefix to distinguish different virtual Prometheus instances of Google Prometheus Engine. |
| `location` | path | string | yes | Location of the resource information. Has to be "global" now. |

### `monitoring.projects.location.prometheus.api.v1.query_exemplars`

- Versions: v1
- `POST https://monitoring.googleapis.com/v1/{+name}/location/{location}/prometheus/api/v1/query_exemplars`
- Lists exemplars relevant to a given PromQL query,
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/monitoring`, `https://www.googleapis.com/auth/monitoring.read`
- Request: `QueryExemplarsRequest`; Response: `HttpBody`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The project on which to execute the request. Data associcated with the project's workspace stored under the The format is: projects/PROJECT_ID_OR_NUMBER. Open source API but used as a request path prefix to distinguish different virtual Prometheus instances of Google Prometheus Engine. |
| `location` | path | string | yes | Location of the resource information. Has to be "global" now. |

### `monitoring.projects.location.prometheus.api.v1.query_range`

- Versions: v1
- `POST https://monitoring.googleapis.com/v1/{+name}/location/{location}/prometheus/api/v1/query_range`
- Evaluate a PromQL query with start, end time range.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/monitoring`, `https://www.googleapis.com/auth/monitoring.read`
- Request: `QueryRangeRequest`; Response: `HttpBody`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The project on which to execute the request. Data associcated with the project's workspace stored under the The format is: projects/PROJECT_ID_OR_NUMBER. Open source API but used as a request path prefix to distinguish different virtual Prometheus instances of Google Prometheus Engine. |
| `location` | path | string | yes | Location of the resource information. Has to be "global" now. |

### `monitoring.projects.location.prometheus.api.v1.series`

- Versions: v1
- `POST https://monitoring.googleapis.com/v1/{+name}/location/{location}/prometheus/api/v1/series`
- Lists metadata for metrics.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/monitoring`, `https://www.googleapis.com/auth/monitoring.read`
- Request: `QuerySeriesRequest`; Response: `HttpBody`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The workspace on which to execute the request. It is not part of the open source API but used as a request path prefix to distinguish different virtual Prometheus instances of Google Prometheus Engine. The format is: projects/PROJECT_ID_OR_NUMBER. |
| `location` | path | string | yes | Location of the resource information. Has to be "global" for now. |

### `monitoring.projects.metricDescriptors.create`

- Versions: v3
- `POST https://monitoring.googleapis.com/v3/{+name}/metricDescriptors`
- Creates a new metric descriptor. The creation is executed asynchronously. User-created metric descriptors define custom metrics (https://cloud.google.com/monitoring/custom-metrics). The metric descriptor is updated if it already exists, except that metric labels are never removed.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/monitoring`, `https://www.googleapis.com/auth/monitoring.write`
- Request: `MetricDescriptor`; Response: `MetricDescriptor`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The project (https://cloud.google.com/monitoring/api/v3#project_name) on which to execute the request. The format is: 4 projects/PROJECT_ID_OR_NUMBER |

### `monitoring.projects.metricDescriptors.delete`

- Versions: v3
- `DELETE https://monitoring.googleapis.com/v3/{+name}`
- Deletes a metric descriptor. Only user-created custom metrics (https://cloud.google.com/monitoring/custom-metrics) can be deleted.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/monitoring`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The metric descriptor on which to execute the request. The format is: projects/\[PROJECT_ID_OR_NUMBER\]/metricDescriptors/\[METRIC_ID\] An example of \[METRIC_ID\] is: "custom.googleapis.com/my_test_metric". |

### `monitoring.projects.metricDescriptors.get`

- Versions: v3
- `GET https://monitoring.googleapis.com/v3/{+name}`
- Gets a single metric descriptor.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/monitoring`, `https://www.googleapis.com/auth/monitoring.read`, `https://www.googleapis.com/auth/monitoring.write`
- Request: —; Response: `MetricDescriptor`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The metric descriptor on which to execute the request. The format is: projects/\[PROJECT_ID_OR_NUMBER\]/metricDescriptors/\[METRIC_ID\] An example value of \[METRIC_ID\] is "compute.googleapis.com/instance/disk/read_bytes_count". |

### `monitoring.projects.metricDescriptors.list`

- Versions: v3
- `GET https://monitoring.googleapis.com/v3/{+name}/metricDescriptors`
- Lists metric descriptors that match a filter.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/monitoring`, `https://www.googleapis.com/auth/monitoring.read`, `https://www.googleapis.com/auth/monitoring.write`
- Request: —; Response: `ListMetricDescriptorsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The project (https://cloud.google.com/monitoring/api/v3#project_name) on which to execute the request. The format is: projects/\[PROJECT_ID_OR_NUMBER\] |
| `activeOnly` | query | boolean | no | Optional. If true, only metrics and monitored resource types that have recent data (within roughly 25 hours) will be included in the response. - If a metric descriptor enumerates monitored resource types, only the monitored resource types for which the metric type has recent data will be included in the returned metric descriptor, and if none of them have recent data, the metric descriptor will not be returned. - If a metric descriptor does not enumerate the compatible monitored resource types, it will be returned only if the metric type has recent data for some monitored resource type. The returned descriptor will not enumerate any monitored resource types. |
| `filter` | query | string | no | Optional. If this field is empty, all custom and system-defined metric descriptors are returned. Otherwise, the filter (https://cloud.google.com/monitoring/api/v3/filters) specifies which metric descriptors are to be returned. For example, the following filter matches all custom metrics (https://cloud.google.com/monitoring/custom-metrics): metric.type = starts_with("custom.googleapis.com/") |
| `pageSize` | query | integer (int32) | no | Optional. A positive number that is the maximum number of results to return. The default and maximum value is 10,000. If a page_size <= 0 or > 10,000 is submitted, will instead return a maximum of 10,000 results. |
| `pageToken` | query | string | no | Optional. If this field is not empty then it must contain the nextPageToken value returned by a previous call to this method. Using this field causes the method to return additional results from the previous method call. |

### `monitoring.projects.monitoredResourceDescriptors.get`

- Versions: v3
- `GET https://monitoring.googleapis.com/v3/{+name}`
- Gets a single monitored resource descriptor.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/monitoring`, `https://www.googleapis.com/auth/monitoring.read`, `https://www.googleapis.com/auth/monitoring.write`
- Request: —; Response: `MonitoredResourceDescriptor`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The monitored resource descriptor to get. The format is: projects/\[PROJECT_ID_OR_NUMBER\]/monitoredResourceDescriptors/\[RESOURCE_TYPE\] The \[RESOURCE_TYPE\] is a predefined type, such as cloudsql_database. |

### `monitoring.projects.monitoredResourceDescriptors.list`

- Versions: v3
- `GET https://monitoring.googleapis.com/v3/{+name}/monitoredResourceDescriptors`
- Lists monitored resource descriptors that match a filter.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/monitoring`, `https://www.googleapis.com/auth/monitoring.read`, `https://www.googleapis.com/auth/monitoring.write`
- Request: —; Response: `ListMonitoredResourceDescriptorsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The project (https://cloud.google.com/monitoring/api/v3#project_name) on which to execute the request. The format is: projects/\[PROJECT_ID_OR_NUMBER\] |
| `filter` | query | string | no | An optional filter (https://cloud.google.com/monitoring/api/v3/filters) describing the descriptors to be returned. The filter can reference the descriptor's type and labels. For example, the following filter returns only Google Compute Engine descriptors that have an id label: resource.type = starts_with("gce\_") AND resource.label:id |
| `pageSize` | query | integer (int32) | no | A positive number that is the maximum number of results to return. |
| `pageToken` | query | string | no | If this field is not empty then it must contain the nextPageToken value returned by a previous call to this method. Using this field causes the method to return additional results from the previous method call. |

### `monitoring.projects.notificationChannelDescriptors.get`

- Versions: v3
- `GET https://monitoring.googleapis.com/v3/{+name}`
- Gets a single channel descriptor. The descriptor indicates which fields are expected / permitted for a notification channel of the given type.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/monitoring`, `https://www.googleapis.com/auth/monitoring.read`
- Request: —; Response: `NotificationChannelDescriptor`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The channel type for which to execute the request. The format is: projects/\[PROJECT_ID_OR_NUMBER\]/notificationChannelDescriptors/\[CHANNEL_TYPE\] |

### `monitoring.projects.notificationChannelDescriptors.list`

- Versions: v3
- `GET https://monitoring.googleapis.com/v3/{+name}/notificationChannelDescriptors`
- Lists the descriptors for supported channel types. The use of descriptors makes it possible for new channel types to be dynamically added.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/monitoring`, `https://www.googleapis.com/auth/monitoring.read`
- Request: —; Response: `ListNotificationChannelDescriptorsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The REST resource name of the parent from which to retrieve the notification channel descriptors. The expected syntax is: projects/\[PROJECT_ID_OR_NUMBER\] Note that this names (https://cloud.google.com/monitoring/api/v3#project_name) the parent container in which to look for the descriptors; to retrieve a single descriptor by name, use the GetNotificationChannelDescriptor operation, instead. |
| `pageSize` | query | integer (int32) | no | The maximum number of results to return in a single response. If not set to a positive number, a reasonable value will be chosen by the service. |
| `pageToken` | query | string | no | If non-empty, page_token must contain a value returned as the next_page_token in a previous response to request the next set of results. |

### `monitoring.projects.notificationChannels.create`

- Versions: v3
- `POST https://monitoring.googleapis.com/v3/{+name}/notificationChannels`
- Creates a new notification channel, representing a single notification endpoint such as an email address, SMS number, or PagerDuty service.Design your application to single-thread API calls that modify the state of notification channels in a single project. This includes calls to CreateNotificationChannel, DeleteNotificationChannel and UpdateNotificationChannel.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/monitoring`
- Request: `NotificationChannel`; Response: `NotificationChannel`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The project (https://cloud.google.com/monitoring/api/v3#project_name) on which to execute the request. The format is: projects/\[PROJECT_ID_OR_NUMBER\] This names the container into which the channel will be written, this does not name the newly created channel. The resulting channel's name will have a normalized version of this field as a prefix, but will add /notificationChannels/\[CHANNEL_ID\] to identify the channel. |

### `monitoring.projects.notificationChannels.delete`

- Versions: v3
- `DELETE https://monitoring.googleapis.com/v3/{+name}`
- Deletes a notification channel.Design your application to single-thread API calls that modify the state of notification channels in a single project. This includes calls to CreateNotificationChannel, DeleteNotificationChannel and UpdateNotificationChannel.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/monitoring`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The channel for which to execute the request. The format is: projects/\[PROJECT_ID_OR_NUMBER\]/notificationChannels/\[CHANNEL_ID\] |
| `force` | query | boolean | no | If true, the notification channel will be deleted regardless of its use in alert policies (the policies will be updated to remove the channel). If false, this operation will fail if the notification channel is referenced by existing alerting policies. |

### `monitoring.projects.notificationChannels.get`

- Versions: v3
- `GET https://monitoring.googleapis.com/v3/{+name}`
- Gets a single notification channel. The channel includes the relevant configuration details with which the channel was created. However, the response may truncate or omit passwords, API keys, or other private key matter and thus the response may not be 100% identical to the information that was supplied in the call to the create method.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/monitoring`, `https://www.googleapis.com/auth/monitoring.read`
- Request: —; Response: `NotificationChannel`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The channel for which to execute the request. The format is: projects/\[PROJECT_ID_OR_NUMBER\]/notificationChannels/\[CHANNEL_ID\] |

### `monitoring.projects.notificationChannels.getVerificationCode`

- Versions: v3
- `POST https://monitoring.googleapis.com/v3/{+name}:getVerificationCode`
- Requests a verification code for an already verified channel that can then be used in a call to VerifyNotificationChannel() on a different channel with an equivalent identity in the same or in a different project. This makes it possible to copy a channel between projects without requiring manual reverification of the channel. If the channel is not in the verified state, this method will fail (in other words, this may only be used if the SendNotificationChannelVerificationCode and VerifyNotificationChannel paths have already been used to put the given channel into the verified state).There is no guarantee that the verification codes returned by this method will be of a similar structure or form as the ones that are delivered to the channel via SendNotificationChannelVerificationCode; while VerifyNotificationChannel() will recognize both the codes delivered via SendNotificationChannelVerificationCode() and returned from GetNotificationChannelVerificationCode(), it is typically the case that the verification codes delivered via SendNotificationChannelVerificationCode() will be shorter and also have a shorter expiration (e.g. codes such as "G-123456") whereas GetVerificationCode() will typically return a much longer, websafe base 64 encoded string that has a longer expiration time.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/monitoring`
- Request: `GetNotificationChannelVerificationCodeRequest`; Response: `GetNotificationChannelVerificationCodeResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The notification channel for which a verification code is to be generated and retrieved. This must name a channel that is already verified; if the specified channel is not verified, the request will fail. |

### `monitoring.projects.notificationChannels.list`

- Versions: v3
- `GET https://monitoring.googleapis.com/v3/{+name}/notificationChannels`
- Lists the notification channels that have been created for the project. To list the types of notification channels that are supported, use the ListNotificationChannelDescriptors method.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/monitoring`, `https://www.googleapis.com/auth/monitoring.read`
- Request: —; Response: `ListNotificationChannelsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The project (https://cloud.google.com/monitoring/api/v3#project_name) on which to execute the request. The format is: projects/\[PROJECT_ID_OR_NUMBER\] This names the container in which to look for the notification channels; it does not name a specific channel. To query a specific channel by REST resource name, use the GetNotificationChannel operation. |
| `filter` | query | string | no | Optional. If provided, this field specifies the criteria that must be met by notification channels to be included in the response.For more details, see sorting and filtering (https://cloud.google.com/monitoring/api/v3/sorting-and-filtering). |
| `orderBy` | query | string | no | Optional. A comma-separated list of fields by which to sort the result. Supports the same set of fields as in filter. Entries can be prefixed with a minus sign to sort in descending rather than ascending order.For more details, see sorting and filtering (https://cloud.google.com/monitoring/api/v3/sorting-and-filtering). |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of results to return in a single response. If not set to a positive number, a reasonable value will be chosen by the service. |
| `pageToken` | query | string | no | Optional. If non-empty, page_token must contain a value returned as the next_page_token in a previous response to request the next set of results. |

### `monitoring.projects.notificationChannels.patch`

- Versions: v3
- `PATCH https://monitoring.googleapis.com/v3/{+name}`
- Updates a notification channel. Fields not specified in the field mask remain unchanged.Design your application to single-thread API calls that modify the state of notification channels in a single project. This includes calls to CreateNotificationChannel, DeleteNotificationChannel and UpdateNotificationChannel.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/monitoring`
- Request: `NotificationChannel`; Response: `NotificationChannel`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The full REST resource name for this channel. The format is: projects/\[PROJECT_ID_OR_NUMBER\]/notificationChannels/\[CHANNEL_ID\] The \[CHANNEL_ID\] is automatically assigned by the server on creation. |
| `updateMask` | query | string (google-fieldmask) | no | Optional. The fields to update. |

### `monitoring.projects.notificationChannels.sendVerificationCode`

- Versions: v3
- `POST https://monitoring.googleapis.com/v3/{+name}:sendVerificationCode`
- Causes a verification code to be delivered to the channel. The code can then be supplied in VerifyNotificationChannel to verify the channel.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/monitoring`
- Request: `SendNotificationChannelVerificationCodeRequest`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The notification channel to which to send a verification code. |

### `monitoring.projects.notificationChannels.verify`

- Versions: v3
- `POST https://monitoring.googleapis.com/v3/{+name}:verify`
- Verifies a NotificationChannel by proving receipt of the code delivered to the channel as a result of calling SendNotificationChannelVerificationCode.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/monitoring`
- Request: `VerifyNotificationChannelRequest`; Response: `NotificationChannel`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The notification channel to verify. |

### `monitoring.projects.snoozes.create`

- Versions: v3
- `POST https://monitoring.googleapis.com/v3/{+parent}/snoozes`
- Creates a Snooze that will prevent alerts, which match the provided criteria, from being opened. The Snooze applies for a specific time interval.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/monitoring`
- Request: `Snooze`; Response: `Snooze`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The project (https://cloud.google.com/monitoring/api/v3#project_name) in which a Snooze should be created. The format is: projects/\[PROJECT_ID_OR_NUMBER\] |

### `monitoring.projects.snoozes.get`

- Versions: v3
- `GET https://monitoring.googleapis.com/v3/{+name}`
- Retrieves a Snooze by name.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/monitoring`, `https://www.googleapis.com/auth/monitoring.read`
- Request: —; Response: `Snooze`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The ID of the Snooze to retrieve. The format is: projects/\[PROJECT_ID_OR_NUMBER\]/snoozes/\[SNOOZE_ID\] |

### `monitoring.projects.snoozes.list`

- Versions: v3
- `GET https://monitoring.googleapis.com/v3/{+parent}/snoozes`
- Lists the Snoozes associated with a project. Can optionally pass in filter, which specifies predicates to match Snoozes.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/monitoring`, `https://www.googleapis.com/auth/monitoring.read`
- Request: —; Response: `ListSnoozesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The project (https://cloud.google.com/monitoring/api/v3#project_name) whose Snoozes should be listed. The format is: projects/\[PROJECT_ID_OR_NUMBER\] |
| `filter` | query | string | no | Optional. Optional filter to restrict results to the given criteria. The following fields are supported. interval.start_time interval.end_timeFor example: interval.start_time > "2022-03-11T00:00:00-08:00" AND interval.end_time < "2022-03-12T00:00:00-08:00" |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of results to return for a single query. The server may further constrain the maximum number of results returned in a single page. The value should be in the range 1, 1000. If the value given is outside this range, the server will decide the number of results to be returned. |
| `pageToken` | query | string | no | Optional. The next_page_token from a previous call to ListSnoozesRequest to get the next page of results. |

### `monitoring.projects.snoozes.patch`

- Versions: v3
- `PATCH https://monitoring.googleapis.com/v3/{+name}`
- Updates a Snooze, identified by its name, with the parameters in the given Snooze object.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/monitoring`
- Request: `Snooze`; Response: `Snooze`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Identifier. The name of the Snooze. The format is: projects/\[PROJECT_ID_OR_NUMBER\]/snoozes/\[SNOOZE_ID\] The ID of the Snooze will be generated by the system. |
| `updateMask` | query | string (google-fieldmask) | yes | Required. The fields to update.For each field listed in update_mask: If the Snooze object supplied in the UpdateSnoozeRequest has a value for that field, the value of the field in the existing Snooze will be set to the value of the field in the supplied Snooze. If the field does not have a value in the supplied Snooze, the field in the existing Snooze is set to its default value.Fields not listed retain their existing value.The following are the field names that are accepted in update_mask: display_name interval.start_time interval.end_timeThat said, the start time and end time of the Snooze determines which fields can legally be updated. Before attempting an update, users should consult the documentation for UpdateSnoozeRequest, which talks about which fields can be updated. |

### `monitoring.projects.timeSeries.create`

- Versions: v3
- `POST https://monitoring.googleapis.com/v3/{+name}/timeSeries`
- Creates or adds data to one or more time series. The response is empty if all time series in the request were written. If any time series could not be written, a corresponding failure message is included in the error response. This method does not support resource locations constraint of an organization policy (https://cloud.google.com/resource-manager/docs/organization-policy/defining-locations#setting_the_organization_policy).
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/monitoring`, `https://www.googleapis.com/auth/monitoring.write`
- Request: `CreateTimeSeriesRequest`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The project (https://cloud.google.com/monitoring/api/v3#project_name) on which to execute the request. The format is: projects/\[PROJECT_ID_OR_NUMBER\] |

### `monitoring.projects.timeSeries.createService`

- Versions: v3
- `POST https://monitoring.googleapis.com/v3/{+name}/timeSeries:createService`
- Creates or adds data to one or more service time series. A service time series is a time series for a metric from a Google Cloud service. The response is empty if all time series in the request were written. If any time series could not be written, a corresponding failure message is included in the error response. This endpoint rejects writes to user-defined metrics. This method is only for use by Google Cloud services. Use projects.timeSeries.create instead.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/monitoring`, `https://www.googleapis.com/auth/monitoring.write`
- Request: `CreateTimeSeriesRequest`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The project (https://cloud.google.com/monitoring/api/v3#project_name) on which to execute the request. The format is: projects/\[PROJECT_ID_OR_NUMBER\] |

### `monitoring.projects.timeSeries.list`

- Versions: v3
- `GET https://monitoring.googleapis.com/v3/{+name}/timeSeries`
- Lists time series that match a filter.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/monitoring`, `https://www.googleapis.com/auth/monitoring.read`
- Request: —; Response: `ListTimeSeriesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The project (https://cloud.google.com/monitoring/api/v3#project_name), organization or folder on which to execute the request. The format is: projects/\[PROJECT_ID_OR_NUMBER\] organizations/\[ORGANIZATION_ID\] folders/\[FOLDER_ID\] |
| `aggregation.alignmentPeriod` | query | string (google-duration) | no | The alignment_period specifies a time interval, in seconds, that is used to divide the data in all the time series into consistent blocks of time. This will be done before the per-series aligner can be applied to the data.The value must be at least 60 seconds. If a per-series aligner other than ALIGN_NONE is specified, this field is required or an error is returned. If no per-series aligner is specified, or the aligner ALIGN_NONE is specified, then this field is ignored.The maximum value of the alignment_period is 104 weeks (2 years) for charts, and 90,000 seconds (25 hours) for alerting policies. |
| `aggregation.crossSeriesReducer` | query | string enum | no | The reduction operation to be used to combine time series into a single time series, where the value of each data point in the resulting series is a function of all the already aligned values in the input time series.Not all reducer operations can be applied to all time series. The valid choices depend on the metric_kind and the value_type of the original time series. Reduction can yield a time series with a different metric_kind or value_type than the input time series.Time series data must first be aligned (see per_series_aligner) in order to perform cross-time series reduction. If cross_series_reducer is specified, then per_series_aligner must be specified, and must not be ALIGN_NONE. An alignment_period must also be specified; otherwise, an error is returned. Values: `REDUCE_NONE`, `REDUCE_MEAN`, `REDUCE_MIN`, `REDUCE_MAX`, `REDUCE_SUM`, `REDUCE_STDDEV`, `REDUCE_COUNT`, `REDUCE_COUNT_TRUE`, `REDUCE_COUNT_FALSE`, `REDUCE_FRACTION_TRUE`, `REDUCE_PERCENTILE_99`, `REDUCE_PERCENTILE_95`, `REDUCE_PERCENTILE_50`, `REDUCE_PERCENTILE_05`. |
| `aggregation.groupByFields` | query | repeated string | no | The set of fields to preserve when cross_series_reducer is specified. The group_by_fields determine how the time series are partitioned into subsets prior to applying the aggregation operation. Each subset contains time series that have the same value for each of the grouping fields. Each individual time series is a member of exactly one subset. The cross_series_reducer is applied to each subset of time series. It is not possible to reduce across different resource types, so this field implicitly contains resource.type. Fields not specified in group_by_fields are aggregated away. If group_by_fields is not specified and all the time series have the same resource type, then the time series are aggregated into a single output time series. If cross_series_reducer is not defined, this field is ignored. |
| `aggregation.perSeriesAligner` | query | string enum | no | An Aligner describes how to bring the data points in a single time series into temporal alignment. Except for ALIGN_NONE, all alignments cause all the data points in an alignment_period to be mathematically grouped together, resulting in a single data point for each alignment_period with end timestamp at the end of the period.Not all alignment operations may be applied to all time series. The valid choices depend on the metric_kind and value_type of the original time series. Alignment can change the metric_kind or the value_type of the time series.Time series data must be aligned in order to perform cross-time series reduction. If cross_series_reducer is specified, then per_series_aligner must be specified and not equal to ALIGN_NONE and alignment_period must be specified; otherwise, an error is returned. Values: `ALIGN_NONE`, `ALIGN_DELTA`, `ALIGN_RATE`, `ALIGN_INTERPOLATE`, `ALIGN_NEXT_OLDER`, `ALIGN_MIN`, `ALIGN_MAX`, `ALIGN_MEAN`, `ALIGN_COUNT`, `ALIGN_SUM`, `ALIGN_STDDEV`, `ALIGN_COUNT_TRUE`, `ALIGN_COUNT_FALSE`, `ALIGN_FRACTION_TRUE`, `ALIGN_PERCENTILE_99`, `ALIGN_PERCENTILE_95`, `ALIGN_PERCENTILE_50`, `ALIGN_PERCENTILE_05`, `ALIGN_PERCENT_CHANGE`. |
| `filter` | query | string | yes | Required. A monitoring filter (https://cloud.google.com/monitoring/api/v3/filters) that specifies which time series should be returned. The filter must specify a single metric type, and can additionally specify metric labels and other information. For example: metric.type = "compute.googleapis.com/instance/cpu/usage_time" AND metric.labels.instance_name = "my-instance-name" |
| `interval.endTime` | query | string (google-datetime) | yes | Required. The end of the time interval. |
| `interval.startTime` | query | string (google-datetime) | no | Optional. The beginning of the time interval. The default value for the start time is the end time. The start time must not be later than the end time. |
| `orderBy` | query | string | no | Unsupported: must be left blank. The points in each time series are currently returned in reverse time order (most recent to oldest). |
| `pageSize` | query | integer (int32) | no | A positive number that is the maximum number of results to return. If page_size is empty or more than 100,000 results, the effective page_size is 100,000 results. If view is set to FULL, this is the maximum number of Points returned. If view is set to HEADERS, this is the maximum number of TimeSeries returned. |
| `pageToken` | query | string | no | If this field is not empty then it must contain the nextPageToken value returned by a previous call to this method. Using this field causes the method to return additional results from the previous method call. |
| `secondaryAggregation.alignmentPeriod` | query | string (google-duration) | no | The alignment_period specifies a time interval, in seconds, that is used to divide the data in all the time series into consistent blocks of time. This will be done before the per-series aligner can be applied to the data.The value must be at least 60 seconds. If a per-series aligner other than ALIGN_NONE is specified, this field is required or an error is returned. If no per-series aligner is specified, or the aligner ALIGN_NONE is specified, then this field is ignored.The maximum value of the alignment_period is 104 weeks (2 years) for charts, and 90,000 seconds (25 hours) for alerting policies. |
| `secondaryAggregation.crossSeriesReducer` | query | string enum | no | The reduction operation to be used to combine time series into a single time series, where the value of each data point in the resulting series is a function of all the already aligned values in the input time series.Not all reducer operations can be applied to all time series. The valid choices depend on the metric_kind and the value_type of the original time series. Reduction can yield a time series with a different metric_kind or value_type than the input time series.Time series data must first be aligned (see per_series_aligner) in order to perform cross-time series reduction. If cross_series_reducer is specified, then per_series_aligner must be specified, and must not be ALIGN_NONE. An alignment_period must also be specified; otherwise, an error is returned. Values: `REDUCE_NONE`, `REDUCE_MEAN`, `REDUCE_MIN`, `REDUCE_MAX`, `REDUCE_SUM`, `REDUCE_STDDEV`, `REDUCE_COUNT`, `REDUCE_COUNT_TRUE`, `REDUCE_COUNT_FALSE`, `REDUCE_FRACTION_TRUE`, `REDUCE_PERCENTILE_99`, `REDUCE_PERCENTILE_95`, `REDUCE_PERCENTILE_50`, `REDUCE_PERCENTILE_05`. |
| `secondaryAggregation.groupByFields` | query | repeated string | no | The set of fields to preserve when cross_series_reducer is specified. The group_by_fields determine how the time series are partitioned into subsets prior to applying the aggregation operation. Each subset contains time series that have the same value for each of the grouping fields. Each individual time series is a member of exactly one subset. The cross_series_reducer is applied to each subset of time series. It is not possible to reduce across different resource types, so this field implicitly contains resource.type. Fields not specified in group_by_fields are aggregated away. If group_by_fields is not specified and all the time series have the same resource type, then the time series are aggregated into a single output time series. If cross_series_reducer is not defined, this field is ignored. |
| `secondaryAggregation.perSeriesAligner` | query | string enum | no | An Aligner describes how to bring the data points in a single time series into temporal alignment. Except for ALIGN_NONE, all alignments cause all the data points in an alignment_period to be mathematically grouped together, resulting in a single data point for each alignment_period with end timestamp at the end of the period.Not all alignment operations may be applied to all time series. The valid choices depend on the metric_kind and value_type of the original time series. Alignment can change the metric_kind or the value_type of the time series.Time series data must be aligned in order to perform cross-time series reduction. If cross_series_reducer is specified, then per_series_aligner must be specified and not equal to ALIGN_NONE and alignment_period must be specified; otherwise, an error is returned. Values: `ALIGN_NONE`, `ALIGN_DELTA`, `ALIGN_RATE`, `ALIGN_INTERPOLATE`, `ALIGN_NEXT_OLDER`, `ALIGN_MIN`, `ALIGN_MAX`, `ALIGN_MEAN`, `ALIGN_COUNT`, `ALIGN_SUM`, `ALIGN_STDDEV`, `ALIGN_COUNT_TRUE`, `ALIGN_COUNT_FALSE`, `ALIGN_FRACTION_TRUE`, `ALIGN_PERCENTILE_99`, `ALIGN_PERCENTILE_95`, `ALIGN_PERCENTILE_50`, `ALIGN_PERCENTILE_05`, `ALIGN_PERCENT_CHANGE`. |
| `view` | query | string enum | yes | Required. Specifies which information is returned about the time series. Values: `FULL`, `HEADERS`. |

### `monitoring.projects.timeSeries.query`

- Versions: v3
- `POST https://monitoring.googleapis.com/v3/{+name}/timeSeries:query`
- Queries time series by using Monitoring Query Language (MQL). We recommend using PromQL instead of MQL. For more information about the status of MQL, see the MQL deprecation notice (https://cloud.google.com/stackdriver/docs/deprecations/mql).
- Deprecated: `deprecated: true` in the Discovery document
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/monitoring`, `https://www.googleapis.com/auth/monitoring.read`
- Request: `QueryTimeSeriesRequest`; Response: `QueryTimeSeriesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The project (https://cloud.google.com/monitoring/api/v3#project_name) on which to execute the request. The format is: projects/\[PROJECT_ID_OR_NUMBER\] |

### `monitoring.projects.uptimeCheckConfigs.create`

- Versions: v3
- `POST https://monitoring.googleapis.com/v3/{+parent}/uptimeCheckConfigs`
- Creates a new Uptime check configuration.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/monitoring`
- Request: `UptimeCheckConfig`; Response: `UptimeCheckConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The project (https://cloud.google.com/monitoring/api/v3#project_name) in which to create the Uptime check. The format is: projects/\[PROJECT_ID_OR_NUMBER\] |

### `monitoring.projects.uptimeCheckConfigs.delete`

- Versions: v3
- `DELETE https://monitoring.googleapis.com/v3/{+name}`
- Deletes an Uptime check configuration. Note that this method will fail if the Uptime check configuration is referenced by an alert policy or other dependent configs that would be rendered invalid by the deletion.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/monitoring`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The Uptime check configuration to delete. The format is: projects/\[PROJECT_ID_OR_NUMBER\]/uptimeCheckConfigs/\[UPTIME_CHECK_ID\] |

### `monitoring.projects.uptimeCheckConfigs.get`

- Versions: v3
- `GET https://monitoring.googleapis.com/v3/{+name}`
- Gets a single Uptime check configuration.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/monitoring`, `https://www.googleapis.com/auth/monitoring.read`
- Request: —; Response: `UptimeCheckConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The Uptime check configuration to retrieve. The format is: projects/\[PROJECT_ID_OR_NUMBER\]/uptimeCheckConfigs/\[UPTIME_CHECK_ID\] |

### `monitoring.projects.uptimeCheckConfigs.list`

- Versions: v3
- `GET https://monitoring.googleapis.com/v3/{+parent}/uptimeCheckConfigs`
- Lists the existing valid Uptime check configurations for the project (leaving out any invalid configurations).
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/monitoring`, `https://www.googleapis.com/auth/monitoring.read`
- Request: —; Response: `ListUptimeCheckConfigsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The project (https://cloud.google.com/monitoring/api/v3#project_name) whose Uptime check configurations are listed. The format is: projects/\[PROJECT_ID_OR_NUMBER\] |
| `filter` | query | string | no | If provided, this field specifies the criteria that must be met by uptime checks to be included in the response.For more details, see Filtering syntax (https://cloud.google.com/monitoring/api/v3/sorting-and-filtering#filter_syntax). |
| `pageSize` | query | integer (int32) | no | The maximum number of results to return in a single response. The server may further constrain the maximum number of results returned in a single page. If the page_size is <=0, the server will decide the number of results to be returned. |
| `pageToken` | query | string | no | If this field is not empty then it must contain the nextPageToken value returned by a previous call to this method. Using this field causes the method to return more results from the previous method call. |

### `monitoring.projects.uptimeCheckConfigs.patch`

- Versions: v3
- `PATCH https://monitoring.googleapis.com/v3/{+name}`
- Updates an Uptime check configuration. You can either replace the entire configuration with a new one or replace only certain fields in the current configuration by specifying the fields to be updated via updateMask. Returns the updated configuration.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/monitoring`
- Request: `UptimeCheckConfig`; Response: `UptimeCheckConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. A unique resource name for this Uptime check configuration. The format is: projects/\[PROJECT_ID_OR_NUMBER\]/uptimeCheckConfigs/\[UPTIME_CHECK_ID\] \[PROJECT_ID_OR_NUMBER\] is the Workspace host project associated with the Uptime check.This field should be omitted when creating the Uptime check configuration; on create, the resource name is assigned by the server and included in the response. |
| `updateMask` | query | string (google-fieldmask) | no | Optional. If present, only the listed fields in the current Uptime check configuration are updated with values from the new configuration. If this field is empty, then the current configuration is completely replaced with the new configuration. |

### `monitoring.services.create`

- Versions: v3
- `POST https://monitoring.googleapis.com/v3/{+parent}/services`
- Create a Service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/monitoring`
- Request: `Service`; Response: `Service`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Resource name (https://cloud.google.com/monitoring/api/v3#project_name) of the parent Metrics Scope. The format is: projects/\[PROJECT_ID_OR_NUMBER\] |
| `serviceId` | query | string | no | Optional. The Service id to use for this Service. If omitted, an id will be generated instead. Must match the pattern \[a-z0-9\-\]+ |

### `monitoring.services.delete`

- Versions: v3
- `DELETE https://monitoring.googleapis.com/v3/{+name}`
- Soft delete this Service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/monitoring`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Resource name of the Service to delete. The format is: projects/\[PROJECT_ID_OR_NUMBER\]/services/\[SERVICE_ID\] |

### `monitoring.services.get`

- Versions: v3
- `GET https://monitoring.googleapis.com/v3/{+name}`
- Get the named Service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/monitoring`, `https://www.googleapis.com/auth/monitoring.read`
- Request: —; Response: `Service`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Resource name of the Service. The format is: projects/\[PROJECT_ID_OR_NUMBER\]/services/\[SERVICE_ID\] |

### `monitoring.services.list`

- Versions: v3
- `GET https://monitoring.googleapis.com/v3/{+parent}/services`
- List Services for this Metrics Scope.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/monitoring`, `https://www.googleapis.com/auth/monitoring.read`
- Request: —; Response: `ListServicesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Resource name of the parent containing the listed services, either a project (https://cloud.google.com/monitoring/api/v3#project_name) or a Monitoring Metrics Scope. The formats are: projects/\[PROJECT_ID_OR_NUMBER\] workspaces/\[HOST_PROJECT_ID_OR_NUMBER\] |
| `filter` | query | string | no | A filter specifying what Services to return. The filter supports filtering on a particular service-identifier type or one of its attributes.To filter on a particular service-identifier type, the identifier_case refers to which option in the identifier field is populated. For example, the filter identifier_case = "CUSTOM" would match all services with a value for the custom field. Valid options include "CUSTOM", "APP_ENGINE", "MESH_ISTIO", and the other options listed at https://cloud.google.com/monitoring/api/ref_v3/rest/v3/services#ServiceTo filter on an attribute of a service-identifier type, apply the filter name by using the snake case of the service-identifier type and the attribute of that service-identifier type, and join the two with a period. For example, to filter by the meshUid field of the MeshIstio service-identifier type, you must filter on mesh_istio.mesh_uid = "123" to match all services with mesh UID "123". Service-identifier types and their attributes are described at https://cloud.google.com/monitoring/api/ref_v3/rest/v3/services#Service |
| `pageSize` | query | integer (int32) | no | A non-negative number that is the maximum number of results to return. When 0, use default page size. |
| `pageToken` | query | string | no | If this field is not empty then it must contain the nextPageToken value returned by a previous call to this method. Using this field causes the method to return additional results from the previous method call. |

### `monitoring.services.patch`

- Versions: v3
- `PATCH https://monitoring.googleapis.com/v3/{+name}`
- Update this Service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/monitoring`
- Request: `Service`; Response: `Service`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. Resource name for this Service. The format is: projects/\[PROJECT_ID_OR_NUMBER\]/services/\[SERVICE_ID\] |
| `updateMask` | query | string (google-fieldmask) | no | A set of field paths defining which fields to use for the update. |

### `monitoring.services.serviceLevelObjectives.create`

- Versions: v3
- `POST https://monitoring.googleapis.com/v3/{+parent}/serviceLevelObjectives`
- Create a ServiceLevelObjective for the given Service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/monitoring`
- Request: `ServiceLevelObjective`; Response: `ServiceLevelObjective`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Resource name of the parent Service. The format is: projects/\[PROJECT_ID_OR_NUMBER\]/services/\[SERVICE_ID\] |
| `serviceLevelObjectiveId` | query | string | no | Optional. The ServiceLevelObjective id to use for this ServiceLevelObjective. If omitted, an id will be generated instead. Must match the pattern ^\[a-zA-Z0-9-\_:.\]+$ |

### `monitoring.services.serviceLevelObjectives.delete`

- Versions: v3
- `DELETE https://monitoring.googleapis.com/v3/{+name}`
- Delete the given ServiceLevelObjective.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/monitoring`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Resource name of the ServiceLevelObjective to delete. The format is: projects/\[PROJECT_ID_OR_NUMBER\]/services/\[SERVICE_ID\]/serviceLevelObjectives/\[SLO_NAME\] |

### `monitoring.services.serviceLevelObjectives.get`

- Versions: v3
- `GET https://monitoring.googleapis.com/v3/{+name}`
- Get a ServiceLevelObjective by name.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/monitoring`, `https://www.googleapis.com/auth/monitoring.read`
- Request: —; Response: `ServiceLevelObjective`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Resource name of the ServiceLevelObjective to get. The format is: projects/\[PROJECT_ID_OR_NUMBER\]/services/\[SERVICE_ID\]/serviceLevelObjectives/\[SLO_NAME\] |
| `view` | query | string enum | no | View of the ServiceLevelObjective to return. If DEFAULT, return the ServiceLevelObjective as originally defined. If EXPLICIT and the ServiceLevelObjective is defined in terms of a BasicSli, replace the BasicSli with a RequestBasedSli spelling out how the SLI is computed. Values: `VIEW_UNSPECIFIED`, `FULL`, `EXPLICIT`. |

### `monitoring.services.serviceLevelObjectives.list`

- Versions: v3
- `GET https://monitoring.googleapis.com/v3/{+parent}/serviceLevelObjectives`
- List the ServiceLevelObjectives for the given Service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/monitoring`, `https://www.googleapis.com/auth/monitoring.read`
- Request: —; Response: `ListServiceLevelObjectivesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Resource name of the parent containing the listed SLOs, either a project or a Monitoring Metrics Scope. The formats are: projects/\[PROJECT_ID_OR_NUMBER\]/services/\[SERVICE_ID\] workspaces/\[HOST_PROJECT_ID_OR_NUMBER\]/services/- |
| `filter` | query | string | no | A filter specifying what ServiceLevelObjectives to return. |
| `pageSize` | query | integer (int32) | no | A non-negative number that is the maximum number of results to return. When 0, use default page size. |
| `pageToken` | query | string | no | If this field is not empty then it must contain the nextPageToken value returned by a previous call to this method. Using this field causes the method to return additional results from the previous method call. |
| `view` | query | string enum | no | View of the ServiceLevelObjectives to return. If DEFAULT, return each ServiceLevelObjective as originally defined. If EXPLICIT and the ServiceLevelObjective is defined in terms of a BasicSli, replace the BasicSli with a RequestBasedSli spelling out how the SLI is computed. Values: `VIEW_UNSPECIFIED`, `FULL`, `EXPLICIT`. |

### `monitoring.services.serviceLevelObjectives.patch`

- Versions: v3
- `PATCH https://monitoring.googleapis.com/v3/{+name}`
- Update the given ServiceLevelObjective.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/monitoring`
- Request: `ServiceLevelObjective`; Response: `ServiceLevelObjective`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. Resource name for this ServiceLevelObjective. The format is: projects/\[PROJECT_ID_OR_NUMBER\]/services/\[SERVICE_ID\]/serviceLevelObjectives/\[SLO_NAME\] |
| `updateMask` | query | string (google-fieldmask) | no | A set of field paths defining which fields to use for the update. |

### `monitoring.uptimeCheckIps.list`

- Versions: v3
- `GET https://monitoring.googleapis.com/v3/uptimeCheckIps`
- Returns the list of IP addresses that checkers run from.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/monitoring`, `https://www.googleapis.com/auth/monitoring.read`
- Request: —; Response: `ListUptimeCheckIpsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `pageSize` | query | integer (int32) | no | The maximum number of results to return in a single response. The server may further constrain the maximum number of results returned in a single page. If the page_size is <=0, the server will decide the number of results to be returned. NOTE: this field is not yet implemented |
| `pageToken` | query | string | no | If this field is not empty then it must contain the nextPageToken value returned by a previous call to this method. Using this field causes the method to return more results from the previous method call. NOTE: this field is not yet implemented |

### Example request skeleton

Generated from the Discovery entry of `monitoring.folders.timeSeries.list` (not in the official docs); replace the `{...}` path variables and required query parameters (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://monitoring.googleapis.com/v3/{+name}/timeSeries?filter={filter}&interval.endTime={interval.endTime}&view={view}"
```

## Notes

- Generated from the Discovery document(s) v3, v1 of `monitoring` (retrieved 2026-11-14). Resources on this page: folders, locations, operations, organizations, projects, services, uptimeCheckIps.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are `yes` unless a note below names an alternative route without them.
- Message schemas (the request and response types named above) are defined in the `schemas` section of the Discovery documents in Source.
- Deprecated methods (`deprecated: true` in Discovery): `monitoring.projects.timeSeries.query`. Avoid them in new code.
- `interval.endTime` in `monitoring.folders.timeSeries.list`, `monitoring.organizations.timeSeries.list`, `monitoring.projects.timeSeries.list` is `yes`, not `conditional`: although it is a `parent.child` parameter, its parent `interval` is required in `ListTimeSeriesRequest` ("Required. The time interval for which results should be returned."; `TimeInterval interval = 4 [(google.api.field_behavior) = REQUIRED];`, `google/monitoring/v3/metric_service.proto`, https://github.com/googleapis/googleapis/blob/6f8ddc394a90ea2c6a355afd2e9d21f56622df14/google/monitoring/v3/metric_service.proto, commit `6f8ddc3`, retrieved 2026-11-18).
- Source: https://monitoring.googleapis.com/$discovery/rest?version=v3, https://monitoring.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
