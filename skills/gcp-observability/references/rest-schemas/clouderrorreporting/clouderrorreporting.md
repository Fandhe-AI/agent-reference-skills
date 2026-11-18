---
source: https://clouderrorreporting.googleapis.com/$discovery/rest?version=v1beta1
---

# Error Reporting API message schemas (clouderrorreporting)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/clouderrorreporting/`.

### `DeleteEventsResponse`

- Response message for deleting error events.
- Version: v1beta1

### `ErrorContext`

- A description of the context in which an error occurred. This data should be provided by the application when reporting an error, unless the error report has been generated automatically from Google App Engine logs.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `httpRequest` | HttpRequestContext | The HTTP request which was processed when the error was triggered. |
| `reportLocation` | SourceLocation | The location in the source code where the decision was made to report the error, usually the place where it was logged. For a logged exception this would be the source line where the exception is logged, usually close to the place where it was caught. |
| `sourceReferences` | array<SourceReference> | Source code that was used to build the executable which has caused the given error message. |
| `user` | string | The user who caused or was affected by the crash. This can be a user ID, an email address, or an arbitrary token that uniquely identifies the user. When sending an error report, leave this field empty if the user was not logged in. In this case the Error Reporting system will use other data, such as remote IP address, to distinguish affected users. See `affected_users_count` in `ErrorGroupStats`. |

### `ErrorEvent`

- An error event which is returned by the Error Reporting system.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `context` | ErrorContext | Data about the context in which the error occurred. |
| `eventTime` | string (google-datetime) | Time when the event occurred as provided in the error report. If the report did not contain a timestamp, the time the error was received by the Error Reporting system is used. |
| `message` | string | The stack trace that was reported or logged by the service. |
| `serviceContext` | ServiceContext | The `ServiceContext` for which this error was reported. |

### `ErrorGroup`

- Description of a group of similar error events.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `groupId` | string | An opaque identifier of the group. This field is assigned by the Error Reporting system and always populated. In the group resource name, the `group_id` is a unique identifier for a particular error group. The identifier is derived from key parts of the error-log content and is treated as Service Data. For information about how Service Data is handled, see Google Cloud Privacy Notice (https://cloud.google.com/terms/cloud-privacy-notice). |
| `name` | string | The group resource name. Written as `projects/{projectID}/groups/{group_id}` or `projects/{projectID}/locations/{location}/groups/{group_id}` Examples: `projects/my-project-123/groups/my-group`, `projects/my-project-123/locations/us-central1/groups/my-group` In the group resource name, the `group_id` is a unique identifier for a particular error group. The identifier is derived from key parts of the error-log content and is treated as Service Data. For information about how Service Data is handled, see Google Cloud Privacy Notice (https://cloud.google.com/terms/cloud-privacy-notice). For a list of supported locations, see Supported Regions (https://cloud.google.com/logging/docs/region-support). `global` is the default when unspecified. |
| `resolutionStatus` | string enum | Error group's resolution status. An unspecified resolution status will be interpreted as OPEN Values: `RESOLUTION_STATUS_UNSPECIFIED`, `OPEN`, `ACKNOWLEDGED`, `RESOLVED`, `MUTED`. |
| `trackingIssues` | array<TrackingIssue> | Associated tracking issues. |

### `ErrorGroupStats`

- Data extracted for a specific group based on certain filter criteria, such as a given time period and/or service filter.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `affectedServices` | array<ServiceContext> | Service contexts with a non-zero error count for the given filter criteria. This list can be truncated if multiple services are affected. Refer to `num_affected_services` for the total count. |
| `affectedUsersCount` | string (int64) | Approximate number of affected users in the given group that match the filter criteria. Users are distinguished by data in the ErrorContext of the individual error events, such as their login name or their remote IP address in case of HTTP requests. The number of affected users can be zero even if the number of errors is non-zero if no data was provided from which the affected user could be deduced. Users are counted based on data in the request context that was provided in the error report. If more users are implicitly affected, such as due to a crash of the whole service, this is not reflected here. |
| `count` | string (int64) | Approximate total number of events in the given group that match the filter criteria. |
| `firstSeenTime` | string (google-datetime) | Approximate first occurrence that was ever seen for this group and which matches the given filter criteria, ignoring the time_range that was specified in the request. |
| `group` | ErrorGroup | Group data that is independent of the filter criteria. |
| `lastSeenTime` | string (google-datetime) | Approximate last occurrence that was ever seen for this group and which matches the given filter criteria, ignoring the time_range that was specified in the request. |
| `numAffectedServices` | integer (int32) | The total number of services with a non-zero error count for the given filter criteria. |
| `representative` | ErrorEvent | An arbitrary event that is chosen as representative for the whole group. The representative event is intended to be used as a quick preview for the whole group. Events in the group are usually sufficiently similar to each other such that showing an arbitrary representative provides insight into the characteristics of the group as a whole. |
| `timedCounts` | array<TimedCount> | Approximate number of occurrences over time. Timed counts returned by ListGroups are guaranteed to be: - Inside the requested time interval - Non-overlapping, and - Ordered by ascending time. |

### `HttpRequestContext`

- HTTP request data that is related to a reported error. This data should be provided by the application when reporting an error, unless the error report has been generated automatically from Google App Engine logs.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `method` | string | The type of HTTP request, such as `GET`, `POST`, etc. |
| `referrer` | string | The referrer information that is provided with the request. |
| `remoteIp` | string | The IP address from which the request originated. This can be IPv4, IPv6, or a token which is derived from the IP address, depending on the data that has been provided in the error report. |
| `responseStatusCode` | integer (int32) | The HTTP response status code for the request. |
| `url` | string | The URL of the request. |
| `userAgent` | string | The user agent information that is provided with the request. |

### `ListEventsResponse`

- Contains a set of requested error events.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `errorEvents` | array<ErrorEvent> | The error events which match the given request. |
| `nextPageToken` | string | If non-empty, more results are available. Pass this token, along with the same query parameters as the first request, to view the next page of results. |
| `timeRangeBegin` | string (google-datetime) | The timestamp specifies the start time to which the request was restricted. |

### `ListGroupStatsResponse`

- Contains a set of requested error group stats.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `errorGroupStats` | array<ErrorGroupStats> | The error group stats which match the given request. |
| `nextPageToken` | string | If non-empty, more results are available. Pass this token, along with the same query parameters as the first request, to view the next page of results. |
| `timeRangeBegin` | string (google-datetime) | The timestamp specifies the start time to which the request was restricted. The start time is set based on the requested time range. It may be adjusted to a later time if a project has exceeded the storage quota and older data has been deleted. |

### `ReportErrorEventResponse`

- Response for reporting an individual error event. Data may be added to this message in the future.
- Version: v1beta1

### `ReportedErrorEvent`

- An error event which is reported to the Error Reporting system.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `context` | ErrorContext | Optional. A description of the context in which the error occurred. |
| `eventTime` | string (google-datetime) | Optional. Time when the event occurred. If not provided, the time when the event was received by the Error Reporting system is used. If provided, the time must not exceed the logs retention period (https://cloud.google.com/logging/quotas#logs_retention_periods) in the past, or be more than 24 hours in the future. If an invalid time is provided, then an error is returned. |
| `message` | string | Required. The error message. If no `context.reportLocation` is provided, the message must contain a header (typically consisting of the exception type name and an error message) and an exception stack trace in one of the supported programming languages and formats. Supported languages are Java, Python, JavaScript, Ruby, C#, PHP, Go, and Rust. Supported stack trace formats are: \* \*\*Java\*\*: Must be the return value of `Throwable.printStackTrace()` (https://docs.oracle.com/javase/7/docs/api/java/lang/Throwable.html#printStackTrace%28%29). \* \*\*Python\*\*: Must be the return value of `traceback.format_exc()` (https://docs.python.org/2/library/traceback.html#traceback.format_exc). \* \*\*JavaScript\*\*: Must be the value of `error.stack` (https://github.com/v8/v8/wiki/Stack-Trace-API) as returned by V8. \* \*\*Ruby\*\*: Must contain frames returned by `Exception.backtrace` (https://ruby-doc.org/core-2.2.0/Exception.html#method-i-backtrace). \* \*\*C#\*\*: Must be the return value of `Exception.ToString()` (https://msdn.microsoft.com/en-us/library/system.exception.tostring.aspx). \* \*\*PHP\*\*: Must be prefixed with `"PHP (Notice\|Parse error\|Fatal error\|Warning): "` and contain the result of `(string)$exception` (https://php.net/manual/en/exception.tostring.php). \* \*\*Go\*\*: Must be the return value of `debug.Stack()` (https://pkg.go.dev/runtime/debug#Stack). \* \*\*Rust\*\*: Must contain standard `std::backtrace` (https://doc.rust-lang.org/std/backtrace/index.html) frames. Requires `RUST_BACKTRACE=1` and debug symbols enabled. |
| `serviceContext` | ServiceContext | Required. The service context in which this error has occurred. |

### `ServiceContext`

- Describes a running service that sends errors. Its version changes over time and multiple versions can run in parallel.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `resourceType` | string | Type of the MonitoredResource. List of possible values: https://cloud.google.com/monitoring/api/resources Value is set automatically for incoming errors and must not be set when reporting errors. |
| `service` | string | An identifier of the service, such as the name of the executable, job, or Google App Engine service name. This field is expected to have a low number of values that are relatively stable over time, as opposed to `version`, which can be changed whenever new code is deployed. Contains the service name for error reports extracted from Google App Engine logs or `default` if the App Engine default service is used. |
| `version` | string | Represents the source code version that the developer provided, which could represent a version label or a Git SHA-1 hash, for example. For App Engine standard environment, the version is set to the version of the app. |

### `SourceLocation`

- Indicates a location in the source code of the service for which errors are reported. `functionName` must be provided by the application when reporting an error, unless the error report contains a `message` with a supported exception stack trace. All fields are optional for the later case.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `filePath` | string | The source code filename, which can include a truncated relative path, or a full path from a production machine. |
| `functionName` | string | Human-readable name of a function or method. The value can include optional context like the class or package name. For example, `my.package.MyClass.method` in case of Java. |
| `lineNumber` | integer (int32) | 1-based. 0 indicates that the line number is unknown. |

### `SourceReference`

- A reference to a particular snapshot of the source tree used to build and deploy an application.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `repository` | string | Optional. A URI string identifying the repository. Example: "https://github.com/GoogleCloudPlatform/kubernetes.git" |
| `revisionId` | string | The canonical and persistent identifier of the deployed revision. Example (git): "0035781c50ec7aa23385dc841529ce8a4b70db1b" |

### `TimedCount`

- The number of errors in a given time period. All numbers are approximate since the error events are sampled before counting them.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `count` | string (int64) | Approximate number of occurrences in the given time period. |
| `endTime` | string (google-datetime) | End of the time period to which `count` refers (excluded). |
| `startTime` | string (google-datetime) | Start of the time period to which `count` refers (included). |

### `TrackingIssue`

- Information related to tracking the progress on resolving the error.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `url` | string | A URL pointing to a related entry in an issue tracking system. Example: `https://github.com/user/project/issues/4` |

### Shape of `ErrorContext`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "httpRequest": "HttpRequestContext",
  "reportLocation": "SourceLocation",
  "sourceReferences": "array<SourceReference>",
  "user": "string"
}
```

## Notes

- Generated from the Discovery document(s) v1beta1 of `clouderrorreporting` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Source: https://clouderrorreporting.googleapis.com/$discovery/rest?version=v1beta1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
