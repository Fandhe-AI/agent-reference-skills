---
source: https://monitoring.googleapis.com/$discovery/rest?version=v3
---

# Cloud Monitoring API message schemas (monitoring) (part 2/2)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/monitoring/`.

### `RowCountTest`

- A test that checks if the number of rows in the result set violates some threshold.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `comparison` | string enum | Required. The comparison to apply between the number of rows returned by the query and the threshold. Values: `COMPARISON_UNSPECIFIED`, `COMPARISON_GT`, `COMPARISON_GE`, `COMPARISON_LT`, `COMPARISON_LE`, `COMPARISON_EQ`, `COMPARISON_NE`. |
| `threshold` | string (int64) | Required. The value against which to compare the row count. |

### `RowLayout`

- A simplified layout that divides the available space into rows and arranges a set of widgets horizontally in each row.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `rows` | array<Row> | The rows of content to display. |

### `Scorecard`

- A widget showing the latest value of a metric, and how this value relates to one or more thresholds.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `blankView` | Empty | Will cause the Scorecard to show only the value, with no indicator to its value relative to its thresholds. |
| `breakdowns` | array<Breakdown> | Optional. The collection of breakdowns to be applied to the dataset. A breakdown is a way to slice the data. For example, you can break down the data by region. |
| `dimensions` | array<Dimension> | Optional. A dimension is a structured label, class, or category for a set of measurements in your data. |
| `gaugeView` | GaugeView | Will cause the scorecard to show a gauge chart. |
| `measures` | array<Measure> | Optional. A measure is a measured value of a property in your data. For example, rainfall in inches, number of units sold, revenue gained, etc. |
| `sparkChartView` | SparkChartView | Will cause the scorecard to show a spark chart. |
| `thresholds` | array<Threshold> | The thresholds used to determine the state of the scorecard given the time series' current value. For an actual value x, the scorecard is in a danger state if x is less than or equal to a danger threshold that triggers below, or greater than or equal to a danger threshold that triggers above. Similarly, if x is above/below a warning threshold that triggers above/below, then the scorecard is in a warning state - unless x also puts it in a danger state. (Danger trumps warning.)As an example, consider a scorecard with the following four thresholds: { value: 90, category: 'DANGER', trigger: 'ABOVE', }, { value: 70, category: 'WARNING', trigger: 'ABOVE', }, { value: 10, category: 'DANGER', trigger: 'BELOW', }, { value: 20, category: 'WARNING', trigger: 'BELOW', } Then: values less than or equal to 10 would put the scorecard in a DANGER state, values greater than 10 but less than or equal to 20 a WARNING state, values strictly between 20 and 70 an OK state, values greater than or equal to 70 but less than 90 a WARNING state, and values greater than or equal to 90 a DANGER state. |
| `timeSeriesQuery` | TimeSeriesQuery | Required. Fields for querying time series data from the Stackdriver metrics API. |

### `SectionHeader`

- A widget that defines a new section header. Sections populate a table of contents and allow easier navigation of long-form content.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dividerBelow` | boolean | Whether to insert a divider below the section in the table of contents |
| `subtitle` | string | The subtitle of the section |

### `SendNotificationChannelVerificationCodeRequest`

- The SendNotificationChannelVerificationCode request.
- Version: v3

### `Service`

- A Service is a discrete, autonomous, and network-accessible unit, designed to solve an individual concern (Wikipedia (https://en.wikipedia.org/wiki/Service-orientation)). In Cloud Monitoring, a Service acts as the root resource under which operational aspects of the service are accessible.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `appEngine` | AppEngine | Type used for App Engine services. |
| `basicService` | BasicService | Message that contains the service type and service labels of this service if it is a basic service. Documentation and examples here (https://cloud.google.com/stackdriver/docs/solutions/slo-monitoring/api/api-structures#basic-svc-w-basic-sli). |
| `cloudEndpoints` | CloudEndpoints | Type used for Cloud Endpoints services. |
| `cloudRun` | CloudRun | Type used for Cloud Run services. |
| `clusterIstio` | ClusterIstio | Type used for Istio services that live in a Kubernetes cluster. |
| `custom` | Custom | Custom service type. |
| `displayName` | string | Name used for UI elements listing this Service. |
| `gkeNamespace` | GkeNamespace | Type used for GKE Namespaces. |
| `gkeService` | GkeService | Type used for GKE Services (the Kubernetes concept of a service). |
| `gkeWorkload` | GkeWorkload | Type used for GKE Workloads. |
| `istioCanonicalService` | IstioCanonicalService | Type used for canonical services scoped to an Istio mesh. Metrics for Istio are documented here (https://istio.io/latest/docs/reference/config/metrics/) |
| `meshIstio` | MeshIstio | Type used for Istio services scoped to an Istio mesh. |
| `name` | string | Identifier. Resource name for this Service. The format is: projects/\[PROJECT_ID_OR_NUMBER\]/services/\[SERVICE_ID\] |
| `telemetry` | Telemetry | Configuration for how to query telemetry on a Service. |
| `userLabels` | object | Labels which have been used to annotate the service. Label keys must start with a letter. Label keys and values may contain lowercase letters, numbers, underscores, and dashes. Label keys and values have a maximum length of 63 characters, and must be less than 128 bytes in size. Up to 64 label entries may be stored. For labels which do not have a semantic value, the empty string may be supplied for the label value. |

### `ServiceAgentAuthentication`

- Contains information needed for generating either an OpenID Connect token (https://developers.google.com/identity/protocols/OpenIDConnect) or OAuth token (https://developers.google.com/identity/protocols/oauth2). The token will be generated for the Monitoring service agent service account.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `type` | string enum | Type of authentication. Values: `SERVICE_AGENT_AUTHENTICATION_TYPE_UNSPECIFIED`, `OIDC_TOKEN`. |

### `ServiceLevelIndicator`

- A Service-Level Indicator (SLI) describes the "performance" of a service. For some services, the SLI is well-defined. In such cases, the SLI can be described easily by referencing the well-known SLI and providing the needed parameters. Alternatively, a "custom" SLI can be defined with a query to the underlying metric store. An SLI is defined to be good_service / total_service over any queried time interval. The value of performance always falls into the range 0 <= performance <= 1. A custom SLI describes how to compute this ratio, whether this is by dividing values from a pair of time series, cutting a Distribution into good and bad counts, or counting time windows in which the service complies with a criterion. For separation of concerns, a single Service-Level Indicator measures performance for only one aspect of service quality, such as fraction of successful queries or fast-enough queries.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `basicSli` | BasicSli | Basic SLI on a well-known service type. |
| `requestBased` | RequestBasedSli | Request-based SLIs |
| `windowsBased` | WindowsBasedSli | Windows-based SLIs |

### `ServiceLevelObjective`

- A Service-Level Objective (SLO) describes a level of desired good service. It consists of a service-level indicator (SLI), a performance goal, and a period over which the objective is to be evaluated against that goal. The SLO can use SLIs defined in a number of different manners. Typical SLOs might include "99% of requests in each rolling week have latency below 200 milliseconds" or "99.5% of requests in each calendar month return successfully."
- Version: v3

| Field | Type | Description |
|---|---|---|
| `calendarPeriod` | string enum | A calendar period, semantically "since the start of the current ". At this time, only DAY, WEEK, FORTNIGHT, and MONTH are supported. Values: `CALENDAR_PERIOD_UNSPECIFIED`, `DAY`, `WEEK`, `FORTNIGHT`, `MONTH`, `QUARTER`, `HALF`, `YEAR`. |
| `displayName` | string | Name used for UI elements listing this SLO. |
| `goal` | number (double) | The fraction of service that must be good in order for this objective to be met. 0 < goal <= 0.9999. |
| `name` | string | Identifier. Resource name for this ServiceLevelObjective. The format is: projects/\[PROJECT_ID_OR_NUMBER\]/services/\[SERVICE_ID\]/serviceLevelObjectives/\[SLO_NAME\] |
| `rollingPeriod` | string (google-duration) | A rolling time period, semantically "in the past ". Must be an integer multiple of 1 day no larger than 30 days. |
| `serviceLevelIndicator` | ServiceLevelIndicator | The definition of good service, used to measure and calculate the quality of the Service's performance with respect to a single aspect of service quality. |
| `userLabels` | object | Labels which have been used to annotate the service-level objective. Label keys must start with a letter. Label keys and values may contain lowercase letters, numbers, underscores, and dashes. Label keys and values have a maximum length of 63 characters, and must be less than 128 bytes in size. Up to 64 label entries may be stored. For labels which do not have a semantic value, the empty string may be supplied for the label value. |

### `SingleViewGroup`

- A widget that groups the other widgets by using a dropdown menu. All widgets that are within the area spanned by the grouping widget are considered member widgets.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `displayType` | string enum | Optional. Determines how the widget selector will be displayed. Values: `DISPLAY_TYPE_UNSPECIFIED`, `DROPDOWN`, `TAB`. |

### `Snooze`

- A Snooze will prevent any alerts from being opened, and close any that are already open. The Snooze will work on alerts that match the criteria defined in the Snooze. The Snooze will be active from interval.start_time through interval.end_time.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `criteria` | Criteria | Required. This defines the criteria for applying the Snooze. See Criteria for more information. |
| `displayName` | string | Required. A display name for the Snooze. This can be, at most, 512 unicode characters. |
| `interval` | TimeInterval | Required. The Snooze will be active from interval.start_time through interval.end_time. interval.start_time cannot be in the past. There is a 15 second clock skew to account for the time it takes for a request to reach the API from the UI. |
| `name` | string | Required. Identifier. The name of the Snooze. The format is: projects/\[PROJECT_ID_OR_NUMBER\]/snoozes/\[SNOOZE_ID\] The ID of the Snooze will be generated by the system. |

### `SourceContext`

- SourceContext represents information about the source of a protobuf element, like the file in which it is defined.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `fileName` | string | The path-qualified name of the .proto file that contained the associated protobuf element. For example: "google/protobuf/source_context.proto". |

### `SpanAttributeFilter`

- Span attribute key and list of values to be used for filtering.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `key` | string | Key of the attribute |
| `value` | array<string> | List of attribute values for given key. Multiple values will be OR'd together. |

### `SpanContext`

- The context of a span. This is attached to an Exemplar in Distribution values during aggregation.It contains the name of a span with format: projects/\[PROJECT_ID_OR_NUMBER\]/traces/\[TRACE_ID\]/spans/\[SPAN_ID\]
- Version: v3

| Field | Type | Description |
|---|---|---|
| `spanName` | string | The resource name of the span. The format is: projects/\[PROJECT_ID_OR_NUMBER\]/traces/\[TRACE_ID\]/spans/\[SPAN_ID\] \[TRACE_ID\] is a unique identifier for a trace within a project; it is a 32-character hexadecimal encoding of a 16-byte array.\[SPAN_ID\] is a unique identifier for a span within a trace; it is a 16-character hexadecimal encoding of an 8-byte array. |

### `SpanFilters`

- First version of span filtering that is supported by the Trace component.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `apphubServices` | array<string> | Optional. Filtering for spans containing one of the Apphub service IDs in the list. Multiple values will be OR'd together. Example: "service-id1", "service-id2" |
| `apphubWorkloads` | array<string> | Optional. Filtering for spans containing one of the Apphub workload IDs in the list. Multiple values will be OR'd together. Example: "workload-id1", "workload-id2" |
| `applicationIds` | array<string> | Optional. Filtering for spans containing one of the Apphub Application IDs in the list. Multiple values will be OR'd together. |
| `attributes` | array<SpanAttributeFilter> | Optional. List of span attribute filters. Each SpanAttributeFilter key must be unique. Multiple attribute filters will be AND'd together. |
| `displayNames` | array<string> | Optional. Filtering for spans containing one of the span display names in the list. Multiple values will be OR'd together. |
| `isRootSpan` | boolean | Optional. Filters for root spans only if set to true. A root span is a span without a defined parent span ID. |
| `kinds` | array<string> | Optional. Filtering for spans containing one of the kinds in the list. Multiple values will be OR'd together. |
| `maxDuration` | string (google-duration) | Optional. Filtering for spans with a maximum duration. |
| `minDuration` | string (google-duration) | Optional. Filtering for spans with a minimum duration. |
| `services` | array<string> | Optional. Filtering for spans containing one of the services in the list. Multiple values will be OR'd together. |
| `status` | array<string> | Optional. Filtering for spans containing one of the statuses in the list. Multiple values will be OR'd together. |

### `SparkChartView`

- A sparkChart is a small chart suitable for inclusion in a table-cell or inline in text. This message contains the configuration for a sparkChart to show up on a Scorecard, showing recent trends of the scorecard's timeseries.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `minAlignmentPeriod` | string (google-duration) | The lower bound on data point frequency in the chart implemented by specifying the minimum alignment period to use in a time series query. For example, if the data is published once every 10 minutes it would not make sense to fetch and align data at one minute intervals. This field is optional and exists only as a hint.For PromQL queries, this field is used to set the minimum interval for the query step, controlling data granularity. Larger values can improve performance on long time ranges. See Querying Basics and Range Queries for more details on the PromQL step. |
| `sparkChartType` | string enum | Required. The type of sparkchart to show in this chartView. Values: `SPARK_CHART_TYPE_UNSPECIFIED`, `SPARK_LINE`, `SPARK_BAR`. |

### `SqlCondition`

- A condition that allows alerting policies to be defined using GoogleSQL. SQL conditions examine a sliding window of logs using GoogleSQL. Alert policies with SQL conditions may incur additional billing.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `booleanTest` | BooleanTest | Test the boolean value in the indicated column. |
| `daily` | Daily | Schedule the query to execute every so many days. |
| `hourly` | Hourly | Schedule the query to execute every so many hours. |
| `minutes` | Minutes | Schedule the query to execute every so many minutes. |
| `query` | string | Required. The Log Analytics SQL query to run, as a string. The query must conform to the required shape. Specifically, the query must not try to filter the input by time. A filter will automatically be applied to filter the input so that the query receives all rows received since the last time the query was run.For example, the following query extracts all log entries containing an HTTP request: SELECT timestamp, log_name, severity, http_request, resource, labels FROM my-project.global.\_Default.\_AllLogs WHERE http_request IS NOT NULL |
| `rowCountTest` | RowCountTest | Test the row count against a threshold. |

### `StatisticalTimeSeriesFilter`

- A filter that ranks streams based on their statistical relation to other streams in a request. Note: This field is deprecated and completely ignored by the API.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `numTimeSeries` | integer (int32) | How many time series to output. |
| `rankingMethod` | string enum | rankingMethod is applied to a set of time series, and then the produced value for each individual time series is used to compare a given time series to others. These are methods that cannot be applied stream-by-stream, but rather require the full context of a request to evaluate time series. Values: `METHOD_UNSPECIFIED`, `METHOD_CLUSTER_OUTLIER`. |

### `Status`

- The Status type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by gRPC (https://github.com/grpc). Each Status message contains three pieces of data: error code, error message, and error details.You can find out more about this error model and how to work with it in the API Design Guide (https://cloud.google.com/apis/design/errors).
- Version: v3

| Field | Type | Description |
|---|---|---|
| `code` | integer (int32) | The status code, which should be an enum value of google.rpc.Code. |
| `details` | array<object> | A list of messages that carry the error details. There is a common set of message types for APIs to use. |
| `message` | string | A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. |

### `StringArray`

- An array of strings
- Version: v1

| Field | Type | Description |
|---|---|---|
| `values` | array<string> | The values of the array |

### `SyntheticMonitorTarget`

- Describes a Synthetic Monitor to be invoked by Uptime.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `cloudFunctionV2` | CloudFunctionV2Target | Target a Synthetic Monitor GCFv2 instance. |

### `TableDataSet`

- Groups a time series query definition with table options.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `minAlignmentPeriod` | string (google-duration) | Optional. The lower bound on data point frequency for this data set, implemented by specifying the minimum alignment period to use in a time series query For example, if the data is published once every 10 minutes, the min_alignment_period should be at least 10 minutes. It would not make sense to fetch and align data at one minute intervals. |
| `tableDisplayOptions` | TableDisplayOptions | Optional. Table display options for configuring how the table is rendered. |
| `tableTemplate` | string | Optional. A template string for naming TimeSeries in the resulting data set. This should be a string with interpolations of the form ${label_name}, which will resolve to the label's value i.e. "${resource.labels.project_id}." |
| `timeSeriesQuery` | TimeSeriesQuery | Required. Fields for querying time series data from the Stackdriver metrics API. |

### `TableDisplayOptions`

- Table display options that can be reused.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `shownColumns` | array<string> | Optional. This field is unused and has been replaced by TimeSeriesTable.column_settings |

### `TcpCheck`

- Information required for a TCP Uptime check request.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `pingConfig` | PingConfig | Contains information needed to add pings to a TCP check. |
| `port` | integer (int32) | The TCP port on the server against which to run the check. Will be combined with host (specified within the monitored_resource) to construct the full URL. Required. |

### `Telemetry`

- Configuration for how to query telemetry on a Service.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `resourceName` | string | The full name of the resource that defines this service. Formatted as described in https://cloud.google.com/apis/design/resource_names. |

### `TemplateVariableCondition`

- A condition whose evaluation is based on the value of a template variable.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `comparator` | string enum | Comparator to use to evaluate whether the value of the template variable matches the template_variable_value. For example, if the comparator is REGEX_FULL_MATCH, template_variable_value would contain a regex that is matched against the value of the template variable. Values: `COMPARATOR_UNSPECIFIED`, `REGEX_FULL_MATCH`. |
| `templateVariable` | string | The template variable whose value is evaluated. |
| `templateVariableValue` | string | The value to compare the template variable to. For example, if the comparator is REGEX_FULL_MATCH, this field should contain a regex. |

### `Text`

- A widget that displays textual content.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `content` | string | The text content to be displayed. |
| `format` | string enum | How the text content is formatted. Values: `FORMAT_UNSPECIFIED`, `MARKDOWN`, `RAW`. |
| `style` | TextStyle | How the text is styled |

### `TextStyle`

- Properties that determine how the title and content are styled
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backgroundColor` | string | The background color as a hex string. "#RRGGBB" or "#RGB" |
| `fontSize` | string enum | Font sizes for both the title and content. The title will still be larger relative to the content. Values: `FONT_SIZE_UNSPECIFIED`, `FS_EXTRA_SMALL`, `FS_SMALL`, `FS_MEDIUM`, `FS_LARGE`, `FS_EXTRA_LARGE`. |
| `horizontalAlignment` | string enum | The horizontal alignment of both the title and content Values: `HORIZONTAL_ALIGNMENT_UNSPECIFIED`, `H_LEFT`, `H_CENTER`, `H_RIGHT`. |
| `padding` | string enum | The amount of padding around the widget Values: `PADDING_SIZE_UNSPECIFIED`, `P_EXTRA_SMALL`, `P_SMALL`, `P_MEDIUM`, `P_LARGE`, `P_EXTRA_LARGE`. |
| `pointerLocation` | string enum | The pointer location for this widget (also sometimes called a "tail") Values: `POINTER_LOCATION_UNSPECIFIED`, `PL_TOP`, `PL_RIGHT`, `PL_BOTTOM`, `PL_LEFT`, `PL_TOP_LEFT`, `PL_TOP_RIGHT`, `PL_RIGHT_TOP`, `PL_RIGHT_BOTTOM`, `PL_BOTTOM_RIGHT`, `PL_BOTTOM_LEFT`, `PL_LEFT_BOTTOM`, `PL_LEFT_TOP`. |
| `textColor` | string | The text color as a hex string. "#RRGGBB" or "#RGB" |
| `verticalAlignment` | string enum | The vertical alignment of both the title and content Values: `VERTICAL_ALIGNMENT_UNSPECIFIED`, `V_TOP`, `V_CENTER`, `V_BOTTOM`. |

### `Threshold`

- Defines a threshold for categorizing time series values.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `color` | string enum | The state color for this threshold. Color is not allowed in a XyChart. Values: `COLOR_UNSPECIFIED`, `YELLOW`, `RED`. |
| `direction` | string enum | The direction for the current threshold. Direction is not allowed in a XyChart. Values: `DIRECTION_UNSPECIFIED`, `ABOVE`, `BELOW`. |
| `label` | string | A label for the threshold. |
| `targetAxis` | string enum | The target axis to use for plotting the threshold. Target axis is not allowed in a Scorecard. Values: `TARGET_AXIS_UNSPECIFIED`, `Y1`, `Y2`. |
| `value` | number (double) | The value of the threshold. The value should be defined in the native scale of the metric. |

### `Tile`

- A single tile in the mosaic. The placement and size of the tile are configurable.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `height` | integer (int32) | The height of the tile, measured in grid blocks. Tiles must have a minimum height of 1. |
| `widget` | Widget | The informational widget contained in the tile. For example an XyChart. |
| `width` | integer (int32) | The width of the tile, measured in grid blocks. Tiles must have a minimum width of 1. |
| `xPos` | integer (int32) | The zero-indexed position of the tile in grid blocks relative to the left edge of the grid. Tiles must be contained within the specified number of columns. x_pos cannot be negative. |
| `yPos` | integer (int32) | The zero-indexed position of the tile in grid blocks relative to the top edge of the grid. y_pos cannot be negative. |

### `TimeInterval`

- Describes a time interval: Reads: A half-open time interval. It includes the end time but excludes the start time: (startTime, endTime\]. The start time must be specified, must be earlier than the end time, and should be no older than the data retention period for the metric. Writes: A closed time interval. It extends from the start time to the end time, and includes both: \[startTime, endTime\]. Valid time intervals depend on the MetricKind (https://cloud.google.com/monitoring/api/ref_v3/rest/v3/projects.metricDescriptors#MetricKind) of the metric value. The end time must not be earlier than the start time, and the end time must not be more than 25 hours in the past or more than five minutes in the future. For GAUGE metrics, the startTime value is technically optional; if no value is specified, the start time defaults to the value of the end time, and the interval represents a single point in time. If both start and end times are specified, they must be identical. Such an interval is valid only for GAUGE metrics, which are point-in-time measurements. The end time of a new interval must be at least a millisecond after the end time of the previous interval. For DELTA metrics, the start time and end time must specify a non-zero interval, with subsequent points specifying contiguous and non-overlapping intervals. For DELTA metrics, the start time of the next interval must be at least a millisecond after the end time of the previous interval. For CUMULATIVE metrics, the start time and end time must specify a non-zero interval, with subsequent points specifying the same start time and increasing end times, until an event resets the cumulative value to zero and sets a new start time for the following points. The new start time must be at least a millisecond after the end time of the previous interval. The start time of a new interval must be at least a millisecond after the end time of the previous interval because intervals are closed. If the start time of a new interval is the same as the end time of the previous interval, then data written at the new start time could overwrite data written at the previous end time.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `endTime` | string (google-datetime) | Required. The end of the time interval. |
| `startTime` | string (google-datetime) | Optional. The beginning of the time interval. The default value for the start time is the end time. The start time must not be later than the end time. |

### `TimeOfDay`

- Represents a time of day. The date and time zone are either not significant or are specified elsewhere. An API may choose to allow leap seconds. Related types are google.type.Date and google.protobuf.Timestamp.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `hours` | integer (int32) | Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time. |
| `minutes` | integer (int32) | Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59. |
| `nanos` | integer (int32) | Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999. |
| `seconds` | integer (int32) | Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds. |

### `TimeRange`

- Represents a time range.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `absoluteWindow` | Interval | Optional. Represents a time range with absolute start and end times. The start time is inclusive, and the end time is exclusive. |
| `relativeDuration` | string (google-duration) | Optional. Specifies the duration used to shift the data relative to current time as the end time. The duration must be positive. |

### `TimeSeries`

- A collection of data points that describes the time-varying values of a metric. A time series is identified by a combination of a fully-specified monitored resource and a fully-specified metric. This type is used for both listing and creating time series.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `description` | string | Input only. A detailed description of the time series that will be associated with the google.api.MetricDescriptor for the metric. Once set, this field cannot be changed through CreateTimeSeries. |
| `metadata` | MonitoredResourceMetadata | Output only. The associated monitored resource metadata. When reading a time series, this field will include metadata labels that are explicitly named in the reduction. When creating a time series, this field is ignored. |
| `metric` | Metric | The associated metric. A fully-specified metric used to identify the time series. |
| `metricKind` | string enum | The metric kind of the time series. When listing time series, this metric kind might be different from the metric kind of the associated metric if this time series is an alignment or reduction of other time series.When creating a time series, this field is optional. If present, it must be the same as the metric kind of the associated metric. If the associated metric's descriptor must be auto-created, then this field specifies the metric kind of the new descriptor and must be either GAUGE (the default) or CUMULATIVE. Values: `METRIC_KIND_UNSPECIFIED`, `GAUGE`, `DELTA`, `CUMULATIVE`. |
| `points` | array<Point> | The data points of this time series. When listing time series, points are returned in reverse time order.When creating a time series, this field must contain exactly one point and the point's type must be the same as the value type of the associated metric. If the associated metric's descriptor must be auto-created, then the value type of the descriptor is determined by the point's type, which must be BOOL, INT64, DOUBLE, or DISTRIBUTION. |
| `resource` | MonitoredResource | The associated monitored resource. Custom metrics can use only certain monitored resource types in their time series data. For more information, see Monitored resources for custom metrics (https://cloud.google.com/monitoring/custom-metrics/creating-metrics#custom-metric-resources). |
| `unit` | string | The units in which the metric value is reported. It is only applicable if the value_type is INT64, DOUBLE, or DISTRIBUTION. The unit defines the representation of the stored metric values. This field can only be changed through CreateTimeSeries when it is empty. |
| `valueType` | string enum | The value type of the time series. When listing time series, this value type might be different from the value type of the associated metric if this time series is an alignment or reduction of other time series.When creating a time series, this field is optional. If present, it must be the same as the type of the data in the points field. Values: `VALUE_TYPE_UNSPECIFIED`, `BOOL`, `INT64`, `DOUBLE`, `STRING`, `DISTRIBUTION`, `MONEY`. |

### `TimeSeriesData`

- Represents the values of a time series associated with a TimeSeriesDescriptor.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `labelValues` | array<LabelValue> | The values of the labels in the time series identifier, given in the same order as the label_descriptors field of the TimeSeriesDescriptor associated with this object. Each value must have a value of the type given in the corresponding entry of label_descriptors. |
| `pointData` | array<PointData> | The points in the time series. |

### `TimeSeriesDescriptor`

- A descriptor for the labels and points in a time series.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `labelDescriptors` | array<LabelDescriptor> | Descriptors for the labels. |
| `pointDescriptors` | array<ValueDescriptor> | Descriptors for the point data value columns. |

### `TimeSeriesFilter`

- A filter that defines a subset of time series data that is displayed in a widget. Time series data is fetched using the ListTimeSeries (https://cloud.google.com/monitoring/api/ref_v3/rest/v3/projects.timeSeries/list) method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `aggregation` | Aggregation | By default, the raw time series data is returned. Use this field to combine multiple time series for different views of the data. |
| `filter` | string | Required. The monitoring filter (https://cloud.google.com/monitoring/api/v3/filters) that identifies the metric types, resources, and projects to query. |
| `pickTimeSeriesFilter` | PickTimeSeriesFilter | Ranking based time series filter. |
| `secondaryAggregation` | Aggregation | Apply a second aggregation after aggregation is applied. |
| `statisticalTimeSeriesFilter` | StatisticalTimeSeriesFilter | Statistics based time series filter. Note: This field is deprecated and completely ignored by the API. |

### `TimeSeriesFilterRatio`

- A pair of time series filters that define a ratio computation. The output time series is the pair-wise division of each aligned element from the numerator and denominator time series.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `denominator` | RatioPart | The denominator of the ratio. |
| `numerator` | RatioPart | The numerator of the ratio. |
| `pickTimeSeriesFilter` | PickTimeSeriesFilter | Ranking based time series filter. |
| `secondaryAggregation` | Aggregation | Apply a second aggregation after the ratio is computed. |
| `statisticalTimeSeriesFilter` | StatisticalTimeSeriesFilter | Statistics based time series filter. Note: This field is deprecated and completely ignored by the API. |

### `TimeSeriesQuery`

- TimeSeriesQuery collects the set of supported methods for querying time series data from the Stackdriver metrics API.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `opsAnalyticsQuery` | OpsAnalyticsQuery | Preview: A query used to fetch a time series, category series, or numeric series with SQL. This is a preview feature and may be subject to change before final release. |
| `outputFullDuration` | boolean | Optional. If set, Cloud Monitoring will treat the full query duration as the alignment period so that there will be only 1 output value.\*Note: This could override the configured alignment period except for the cases where a series of data points are expected, like - XyChart - Scorecard's spark chart |
| `prometheusQuery` | string | A query used to fetch time series with PromQL. |
| `timeSeriesFilter` | TimeSeriesFilter | Filter parameters to fetch time series. |
| `timeSeriesFilterRatio` | TimeSeriesFilterRatio | Parameters to fetch a ratio between two time series filters. |
| `timeSeriesQueryLanguage` | string | A query used to fetch time series with MQL. |
| `traceQuery` | TraceQuery | Optional. Preview: Query for traces. This is a preview feature and may be subject to change before final release. |
| `unitOverride` | string | The unit of data contained in fetched time series. If non-empty, this unit will override any unit that accompanies fetched data. The format is the same as the unit (https://cloud.google.com/monitoring/api/ref_v3/rest/v3/projects.metricDescriptors) field in MetricDescriptor. |

### `TimeSeriesRatio`

- A TimeSeriesRatio specifies two TimeSeries to use for computing the good_service / total_service ratio. The specified TimeSeries must have ValueType = DOUBLE or ValueType = INT64 and must have MetricKind = DELTA or MetricKind = CUMULATIVE. The TimeSeriesRatio must specify exactly two of good, bad, and total, and the relationship good_service + bad_service = total_service will be assumed.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `badServiceFilter` | string | A monitoring filter (https://cloud.google.com/monitoring/api/v3/filters) specifying a TimeSeries quantifying bad service, either demanded service that was not provided or demanded service that was of inadequate quality. Must have ValueType = DOUBLE or ValueType = INT64 and must have MetricKind = DELTA or MetricKind = CUMULATIVE. |
| `goodServiceFilter` | string | A monitoring filter (https://cloud.google.com/monitoring/api/v3/filters) specifying a TimeSeries quantifying good service provided. Must have ValueType = DOUBLE or ValueType = INT64 and must have MetricKind = DELTA or MetricKind = CUMULATIVE. |
| `totalServiceFilter` | string | A monitoring filter (https://cloud.google.com/monitoring/api/v3/filters) specifying a TimeSeries quantifying total demanded service. Must have ValueType = DOUBLE or ValueType = INT64 and must have MetricKind = DELTA or MetricKind = CUMULATIVE. |

### `TimeSeriesTable`

- A table that displays time series data.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `columnSettings` | array<ColumnSettings> | Optional. The list of the persistent column settings for the table. |
| `dataSets` | array<TableDataSet> | Required. The data displayed in this table. |
| `metricVisualization` | string enum | Optional. Store rendering strategy Values: `METRIC_VISUALIZATION_UNSPECIFIED`, `NUMBER`, `BAR`. |

### `TraceQuery`

- LINT.IfChange Preview: Query for traces. This is a preview feature and may be subject to change before final release.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `resourceContainer` | string | Optional. The resource name of the project or Trace scope to fetch data from. If empty, the widget will default to the project's default Trace scope. If scope cannot be determined, then we fallback to the current project. Optional. |
| `spanDataValue` | string enum | The type of span data value to be displayed on the chart. Required. Values: `SPAN_DATA_VALUE_UNSPECIFIED`, `SPAN_COUNT`, `SPAN_DURATION`, `SPAN_DURATION_PERCENTILES`. |
| `spanFilters` | SpanFilters | First version of span filtering that we will support. Required. |

### `Treemap`

- A widget that displays hierarchical data as a treemap.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dataSets` | array<TreemapDataSet> | Required. The collection of datasets used to construct and populate the treemap. For the rendered treemap rectangles: Color is determined by the aggregated value for each grouping. Size is proportional to the count of time series aggregated within that rectangle's segment. |
| `treemapHierarchy` | array<string> | Required. Ordered labels representing the hierarchical treemap structure. |

### `TreemapDataSet`

- The data represented by the treemap. Needs to include the data itself, plus rules on how to organize it hierarchically.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `breakdowns` | array<Breakdown> | Optional. The collection of breakdowns to be applied to the dataset. A breakdown is a way to slice the data. For example, you can break down the data by region. |
| `measures` | array<Measure> | Optional. A collection of measures. A measure is a measured value of a property in your data. For example, rainfall in inches, number of units sold, revenue gained, etc. |
| `timeSeriesQuery` | TimeSeriesQuery | Required. The query that fetches the relevant data. See google.monitoring.dashboard.v1.TimeSeriesQuery |

### `Trigger`

- Specifies how many time series must fail a predicate to trigger a condition. If not specified, then a {count: 1} trigger is used.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `count` | integer (int32) | The absolute number of time series that must fail the predicate for the condition to be triggered. |
| `percent` | number (double) | The percentage of time series that must fail the predicate for the condition to be triggered. |

### `Type`

- A protocol buffer message type.New usages of this message as an alternative to DescriptorProto are strongly discouraged. This message does not reliability preserve all information necessary to model the schema and preserve semantics. Instead make use of FileDescriptorSet which preserves the necessary information.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `edition` | string | The source edition string, only valid when syntax is SYNTAX_EDITIONS. |
| `fields` | array<Field> | The list of fields. |
| `name` | string | The fully qualified message name. |
| `oneofs` | array<string> | The list of types appearing in oneof definitions in this type. |
| `options` | array<Option> | The protocol buffer options. |
| `sourceContext` | SourceContext | The source context. |
| `syntax` | string enum | The source syntax. Values: `SYNTAX_PROTO2`, `SYNTAX_PROTO3`, `SYNTAX_EDITIONS`. |

### `TypedValue`

- A single strongly-typed value.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `boolValue` | boolean | A Boolean value: true or false. |
| `distributionValue` | Distribution | A distribution value. |
| `doubleValue` | number (double) | A 64-bit double-precision floating-point number. Its magnitude is approximately ±10±300 and it has 16 significant digits of precision. |
| `int64Value` | string (int64) | A 64-bit integer. Its range is approximately ±9.2x1018. |
| `stringValue` | string | A variable-length string value. |

### `UptimeCheckConfig`

- This message configures which resources and services to monitor for availability.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `checkerType` | string enum | The type of checkers to use to execute the Uptime check. Values: `CHECKER_TYPE_UNSPECIFIED`, `STATIC_IP_CHECKERS`, `VPC_CHECKERS`. |
| `contentMatchers` | array<ContentMatcher> | The content that is expected to appear in the data returned by the target server against which the check is run. Currently, only the first entry in the content_matchers list is supported, and additional entries will be ignored. This field is optional and should only be specified if a content match is required as part of the/ Uptime check. |
| `disabled` | boolean | Whether the check is disabled or not. |
| `displayName` | string | A human-friendly name for the Uptime check configuration. The display name should be unique within a Cloud Monitoring Workspace in order to make it easier to identify; however, uniqueness is not enforced. Required. |
| `httpCheck` | HttpCheck | Contains information needed to make an HTTP or HTTPS check. |
| `internalCheckers` | array<InternalChecker> | The internal checkers that this check will egress from. If is_internal is true and this list is empty, the check will egress from all the InternalCheckers configured for the project that owns this UptimeCheckConfig. |
| `isInternal` | boolean | If this is true, then checks are made only from the 'internal_checkers'. If it is false, then checks are made only from the 'selected_regions'. It is an error to provide 'selected_regions' when is_internal is true, or to provide 'internal_checkers' when is_internal is false. |
| `logCheckFailures` | boolean | To specify whether to log the results of failed probes to Cloud Logging. |
| `monitoredResource` | MonitoredResource | The monitored resource (https://cloud.google.com/monitoring/api/resources) associated with the configuration. The following monitored resource types are valid for this field: uptime_url, gce_instance, gae_app, aws_ec2_instance, aws_elb_load_balancer k8s_service servicedirectory_service cloud_run_revision |
| `name` | string | Identifier. A unique resource name for this Uptime check configuration. The format is: projects/\[PROJECT_ID_OR_NUMBER\]/uptimeCheckConfigs/\[UPTIME_CHECK_ID\] \[PROJECT_ID_OR_NUMBER\] is the Workspace host project associated with the Uptime check.This field should be omitted when creating the Uptime check configuration; on create, the resource name is assigned by the server and included in the response. |
| `period` | string (google-duration) | How often, in seconds, the Uptime check is performed. Currently, the only supported values are 60s (1 minute), 300s (5 minutes), 600s (10 minutes), and 900s (15 minutes). Optional, defaults to 60s. |
| `resourceGroup` | ResourceGroup | The group resource associated with the configuration. |
| `selectedRegions` | array<string> | The list of regions from which the check will be run. Some regions contain one location, and others contain more than one. If this field is specified, enough regions must be provided to include a minimum of 3 locations. Not specifying this field will result in Uptime checks running from all available regions. Values: `REGION_UNSPECIFIED`, `USA`, `EUROPE`, `SOUTH_AMERICA`, `ASIA_PACIFIC`, `USA_OREGON`, `USA_IOWA`, `USA_VIRGINIA`. |
| `syntheticMonitor` | SyntheticMonitorTarget | Specifies a Synthetic Monitor to invoke. |
| `tcpCheck` | TcpCheck | Contains information needed to make a TCP check. |
| `timeout` | string (google-duration) | The maximum amount of time to wait for the request to complete (must be between 1 and 60 seconds). Required. |
| `userLabels` | object | User-supplied key/value data to be used for organizing and identifying the UptimeCheckConfig objects.The field can contain up to 64 entries. Each key and value is limited to 63 Unicode characters or 128 bytes, whichever is smaller. Labels and values can contain only lowercase letters, numerals, underscores, and dashes. Keys must begin with a letter. |

### `UptimeCheckIp`

- Contains the region, location, and list of IP addresses where checkers in the location run from.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `ipAddress` | string | The IP address from which the Uptime check originates. This is a fully specified IP address (not an IP address range). Most IP addresses, as of this publication, are in IPv4 format; however, one should not rely on the IP addresses being in IPv4 format indefinitely, and should support interpreting this field in either IPv4 or IPv6 format. |
| `location` | string | A more specific location within the region that typically encodes a particular city/town/metro (and its containing state/province or country) within the broader umbrella region category. |
| `region` | string enum | A broad region category in which the IP address is located. Values: `REGION_UNSPECIFIED`, `USA`, `EUROPE`, `SOUTH_AMERICA`, `ASIA_PACIFIC`, `USA_OREGON`, `USA_IOWA`, `USA_VIRGINIA`. |

### `ValueDescriptor`

- A descriptor for the value columns in a data point.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `key` | string | The value key. |
| `metricKind` | string enum | The value stream kind. Values: `METRIC_KIND_UNSPECIFIED`, `GAUGE`, `DELTA`, `CUMULATIVE`. |
| `unit` | string | The unit in which time_series point values are reported. unit follows the UCUM format for units as seen in https://unitsofmeasure.org/ucum.html. unit is only valid if value_type is INTEGER, DOUBLE, DISTRIBUTION. |
| `valueType` | string enum | The value type. Values: `VALUE_TYPE_UNSPECIFIED`, `BOOL`, `INT64`, `DOUBLE`, `STRING`, `DISTRIBUTION`, `MONEY`. |

### `VerifyNotificationChannelRequest`

- The VerifyNotificationChannel request.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `code` | string | Required. The verification code that was delivered to the channel as a result of invoking the SendNotificationChannelVerificationCode API method or that was retrieved from a verified channel via GetNotificationChannelVerificationCode. For example, one might have "G-123456" or "TKNZGhhd2EyN3I1MnRnMjRv" (in general, one is only guaranteed that the code is valid UTF-8; one should not make any assumptions regarding the structure or format of the code). |

### `VisibilityCondition`

- Condition that determines whether the widget should be displayed.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `templateVariableCondition` | TemplateVariableCondition | A condition whose evaluation is based on the value of a template variable. |

### `Widget`

- Widget contains a single dashboard component and configuration of how to present the component in the dashboard.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `alertChart` | AlertChart | A chart of alert policy data. |
| `blank` | Empty | A blank space. |
| `collapsibleGroup` | CollapsibleGroup | A widget that groups the other widgets. All widgets that are within the area spanned by the grouping widget are considered member widgets. |
| `errorReportingPanel` | ErrorReportingPanel | A widget that displays a list of error groups. |
| `filterControl` | FilterControl | A widget that displays an input field to change the value of a template variable. |
| `id` | string | Optional. The widget id. Ids may be made up of alphanumerics, dashes and underscores. Widget ids are optional. |
| `incidentList` | IncidentList | A widget that shows list of incidents. |
| `logsPanel` | LogsPanel | A widget that shows a stream of logs. |
| `pieChart` | PieChart | A widget that displays timeseries data as a pie chart. |
| `scorecard` | Scorecard | A scorecard summarizing time series data. |
| `sectionHeader` | SectionHeader | A widget that defines a section header for easier navigation of the dashboard. |
| `singleViewGroup` | SingleViewGroup | A widget that groups the other widgets by using a dropdown menu. |
| `text` | Text | A raw string or markdown displaying textual content. |
| `timeRange` | TimeRange | Optional. Represents a time range for the widget. When set, this time range will override the dashboard time range. Supported for line, stacked area and stacked bar widgets only. |
| `timeSeriesTable` | TimeSeriesTable | A widget that displays time series data in a tabular format. |
| `title` | string | Optional. The title of the widget. |
| `treemap` | Treemap | A widget that displays data as a treemap. |
| `visibilityCondition` | VisibilityCondition | Optional. If set, this widget is rendered only when the condition is evaluated to true. |
| `xyChart` | XyChart | A chart of time series data. |

### `WindowsBasedSli`

- A WindowsBasedSli defines good_service as the count of time windows for which the provided service was of good quality. Criteria for determining if service was good are embedded in the window_criterion.
- Version: v3

| Field | Type | Description |
|---|---|---|
| `goodBadMetricFilter` | string | A monitoring filter (https://cloud.google.com/monitoring/api/v3/filters) specifying a TimeSeries with ValueType = BOOL. The window is good if any true values appear in the window. |
| `goodTotalRatioThreshold` | PerformanceThreshold | A window is good if its performance is high enough. |
| `metricMeanInRange` | MetricRange | A window is good if the metric's value is in a good range, averaged across returned streams. |
| `metricSumInRange` | MetricRange | A window is good if the metric's value is in a good range, summed across returned streams. |
| `windowPeriod` | string (google-duration) | Duration over which window quality is evaluated. Must be an integer fraction of a day and at least 60s. |

### `XyChart`

- A chart that displays data on a 2D (X and Y axes) plane.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `chartOptions` | ChartOptions | Display options for the chart. |
| `dataSets` | array<DataSet> | Required. The data displayed in this chart. |
| `thresholds` | array<Threshold> | Threshold lines drawn horizontally across the chart. |
| `timeshiftDuration` | string (google-duration) | The duration used to display a comparison chart. A comparison chart simultaneously shows values from two similar-length time periods (e.g., week-over-week metrics). The duration must be positive, and it can only be applied to charts with data sets of LINE plot type. |
| `xAxis` | Axis | The properties applied to the x-axis. |
| `y2Axis` | Axis | The properties applied to the y2-axis. |
| `yAxis` | Axis | The properties applied to the y-axis. |

### Shape of `RowCountTest`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "comparison": "string enum",
  "threshold": "string (int64)"
}
```

## Notes

- Generated from the Discovery document(s) v3, v1 of `monitoring` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Source: https://monitoring.googleapis.com/$discovery/rest?version=v3, https://monitoring.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
