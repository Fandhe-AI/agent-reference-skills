---
source: https://cloudscheduler.googleapis.com/$discovery/rest?version=v1
---

# Cloud Scheduler API message schemas (cloudscheduler)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/cloudscheduler/`.

### `AppEngineHttpTarget`

- App Engine target. The job will be pushed to a job handler by means of an HTTP request via an http_method such as HTTP POST, HTTP GET, etc. The job is acknowledged by means of an HTTP response code in the range \[200 - 299\]. Error 503 is considered an App Engine system error instead of an application error. Requests returning error 503 will be retried regardless of retry configuration and not counted against retry counts. Any other response code, or a failure to receive a response before the deadline, constitutes a failed attempt.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `appEngineRouting` | AppEngineRouting | App Engine Routing setting for the job. |
| `body` | string (byte) | Body. HTTP request body. A request body is allowed only if the HTTP method is POST or PUT. It will result in invalid argument error to set a body on a job with an incompatible HttpMethod. |
| `headers` | object | HTTP request headers. This map contains the header field names and values. Headers can be set when the job is created. Cloud Scheduler sets some headers to default values: \* `User-Agent`: By default, this header is `"AppEngine-Google; (+http://code.google.com/appengine)"`. This header can be modified, but Cloud Scheduler will append `"AppEngine-Google; (+http://code.google.com/appengine)"` to the modified `User-Agent`. \* `X-CloudScheduler`: This header will be set to true. \* `X-CloudScheduler-JobName`: This header will contain the job name. \* `X-CloudScheduler-ScheduleTime`: For Cloud Scheduler jobs specified in the unix-cron format, this header will contain the job schedule as an offset of UTC parsed according to RFC3339. Remains constant across retries and can be used for job request deduplication (https://docs.cloud.google.com/scheduler/docs/overview#job-deduplication). If the job has a body and the following headers are not set by the user, Cloud Scheduler sets default values: \* `Content-Type`: This will be set to `"application/octet-stream"`. You can override this default by explicitly setting `Content-Type` to a particular media type when creating the job. For example, you can set `Content-Type` to `"application/json"`. The headers below are output only. They cannot be set or overridden: \* `Content-Length`: This is computed by Cloud Scheduler. \* `X-Google-*`: For Google internal use only. \* `X-AppEngine-*`: For Google internal use only. In addition, some App Engine headers, which contain job-specific information, are also be sent to the job handler. |
| `httpMethod` | string enum | The HTTP method to use for the request. PATCH and OPTIONS are not permitted. Values: `HTTP_METHOD_UNSPECIFIED`, `POST`, `GET`, `HEAD`, `PUT`, `DELETE`, `PATCH`, `OPTIONS`. |
| `relativeUri` | string | The relative URI. The relative URL must begin with "/" and must be a valid HTTP relative URL. It can contain a path, query string arguments, and `#` fragments. If the relative URL is empty, then the root path "/" will be used. No spaces are allowed, and the maximum length allowed is 2083 characters. |

### `AppEngineRouting`

- App Engine Routing. For more information about services, versions, and instances see An Overview of App Engine (https://cloud.google.com/appengine/docs/python/an-overview-of-app-engine), Microservices Architecture on Google App Engine (https://cloud.google.com/appengine/docs/python/microservices-on-app-engine), App Engine Standard request routing (https://cloud.google.com/appengine/docs/standard/python/how-requests-are-routed), and App Engine Flex request routing (https://cloud.google.com/appengine/docs/flexible/python/how-requests-are-routed).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `host` | string | Output only. The host that the job is sent to. For more information about how App Engine requests are routed, see here (https://cloud.google.com/appengine/docs/standard/python/how-requests-are-routed). The host is constructed as: \* `host = [application_domain_name]` `\| [service] + '.' + [application_domain_name]` `\| [version] + '.' + [application_domain_name]` `\| [version_dot_service]+ '.' + [application_domain_name]` `\| [instance] + '.' + [application_domain_name]` `\| [instance_dot_service] + '.' + [application_domain_name]` `\| [instance_dot_version] + '.' + [application_domain_name]` `\| [instance_dot_version_dot_service] + '.' + [application_domain_name]` \* `application_domain_name` = The domain name of the app, for example .appspot.com, which is associated with the job's project ID. \* `service =` service \* `version =` version \* `version_dot_service =` version `+ '.' +` service \* `instance =` instance \* `instance_dot_service =` instance `+ '.' +` service \* `instance_dot_version =` instance `+ '.' +` version \* `instance_dot_version_dot_service =` instance `+ '.' +` version `+ '.' +` service If service is empty, then the job will be sent to the service which is the default service when the job is attempted. If version is empty, then the job will be sent to the version which is the default version when the job is attempted. If instance is empty, then the job will be sent to an instance which is available when the job is attempted. If service, version, or instance is invalid, then the job will be sent to the default version of the default service when the job is attempted. |
| `instance` | string | App instance. By default, the job is sent to an instance which is available when the job is attempted. Requests can only be sent to a specific instance if manual scaling is used in App Engine Standard (https://cloud.google.com/appengine/docs/python/an-overview-of-app-engine?#scaling_types_and_instance_classes). App Engine Flex does not support instances. For more information, see App Engine Standard request routing (https://cloud.google.com/appengine/docs/standard/python/how-requests-are-routed) and App Engine Flex request routing (https://cloud.google.com/appengine/docs/flexible/python/how-requests-are-routed). |
| `service` | string | App service. By default, the job is sent to the service which is the default service when the job is attempted. |
| `version` | string | App version. By default, the job is sent to the version which is the default version when the job is attempted. |

### `CancelOperationRequest`

- The request message for Operations.CancelOperation.
- Version: v1

### `CmekConfig`

- Describes the project/location configuration of Cloud Scheduler Resources.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `kmsKeyName` | string | Optional. Resource name of the Cloud KMS key, of the form `projects/PROJECT_ID/locations/LOCATION_ID/keyRings/KEY_RING_ID/cryptoKeys/KEY_ID`, that will be used to encrypt Jobs in the region. Setting this as blank will turn off CMEK encryption. |
| `name` | string | Identifier. The config resource name which includes the project and location and must end in 'cmekConfig', in the format projects/PROJECT_ID/locations/LOCATION_ID/cmekConfig\` |

### `Empty`

- A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
- Version: v1

### `HttpTarget`

- Http target. The job will be pushed to the job handler by means of an HTTP request via an http_method such as HTTP POST, HTTP GET, etc. The job is acknowledged by means of an HTTP response code in the range \[200 - 299\]. A failure to receive a response constitutes a failed execution. For a redirected request, the response returned by the redirected request is considered.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `body` | string (byte) | HTTP request body. A request body is allowed only if the HTTP method is POST, PUT, or PATCH. It is an error to set body on a job with an incompatible HttpMethod. |
| `headers` | object | HTTP request headers. This map contains the header field names and values. The user can specify HTTP request headers to send with the job's HTTP request. Repeated headers are not supported, but a header value can contain commas. The following headers represent a subset of the headers that accompany the job's HTTP request. Some HTTP request headers are ignored or replaced. A partial list of headers that are ignored or replaced is below: \* Host: This will be computed by Cloud Scheduler and derived from uri. \* `Content-Length`: This will be computed by Cloud Scheduler. \* `User-Agent`: This will be set to `"Google-Cloud-Scheduler"`. \* `X-Google-*`: Used internally by Google. If present in an external user request, it is replaced by the internal header. \* `X-AppEngine-*`: Used internally by Google. If present in an external user request, it is replaced by the internal header. \* `X-CloudScheduler`: This header will be set to true. \* `X-CloudScheduler-JobName`: This header will contain the job name. \* `X-CloudScheduler-ScheduleTime`: For Cloud Scheduler jobs specified in the unix-cron format, this header will contain the job schedule as an offset of UTC parsed according to RFC3339. Remains constant across retries and can be used for job request deduplication (https://docs.cloud.google.com/scheduler/docs/overview#job-deduplication). If the job has a body and the following headers are not set by the user, Cloud Scheduler sets default values: \* `Content-Type`: This will be set to `"application/octet-stream"`. You can override this default by explicitly setting `Content-Type` to a particular media type when creating the job. For example, you can set `Content-Type` to `"application/json"`. The total size of headers must be less than 80KB. |
| `httpMethod` | string enum | Which HTTP method to use for the request. Values: `HTTP_METHOD_UNSPECIFIED`, `POST`, `GET`, `HEAD`, `PUT`, `DELETE`, `PATCH`, `OPTIONS`. |
| `oauthToken` | OAuthToken | If specified, an OAuth token (https://developers.google.com/identity/protocols/OAuth2) will be generated and attached as an `Authorization` header in the HTTP request. This type of authorization should generally only be used when calling Google APIs hosted on \*.googleapis.com. |
| `oidcToken` | OidcToken | If specified, an OIDC (https://developers.google.com/identity/protocols/OpenIDConnect) token will be generated and attached as an `Authorization` header in the HTTP request. This type of authorization can be used for many scenarios, including calling Cloud Run, or endpoints where you intend to validate the token yourself. |
| `uri` | string | Required. The full URI path that the request will be sent to. This string must begin with either "http://" or "https://". Some examples of valid values for uri are: `http://acme.com` and `https://acme.com/sales:8080`. Cloud Scheduler will encode some characters for safety and compatibility. The maximum allowed URL length is 2083 characters after encoding. |

### `Job`

- Configuration for a job. The maximum allowed size for a job is 1MB.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `appEngineHttpTarget` | AppEngineHttpTarget | App Engine HTTP target. |
| `attemptDeadline` | string (google-duration) | The deadline for job attempts. If the request handler does not respond by this deadline then the request is cancelled and the attempt is marked as a `DEADLINE_EXCEEDED` failure. The failed attempt can be viewed in execution logs. Cloud Scheduler will retry the job according to the RetryConfig. The default and the allowed values depend on the type of target: \* For HTTP targets, the default is 3 minutes. The deadline must be in the interval \[15 seconds, 30 minutes\]. \* For App Engine HTTP targets, 0 indicates that the request has the default deadline. The default deadline depends on the scaling type of the service: 10 minutes for standard apps with automatic scaling, 24 hours for standard apps with manual and basic scaling, and 60 minutes for flex apps. If the request deadline is set, it must be in the interval \[15 seconds, 24 hours 15 seconds\]. \* For Pub/Sub targets, this field is ignored. |
| `description` | string | Optionally caller-specified in CreateJob or UpdateJob. A human-readable description for the job. This string must not contain more than 500 characters. |
| `httpTarget` | HttpTarget | HTTP target. |
| `lastAttemptTime` | string (google-datetime) | Output only. The time the last job attempt started. |
| `name` | string | Optionally caller-specified in CreateJob, after which it becomes output only. The job name. For example: `projects/PROJECT_ID/locations/LOCATION_ID/jobs/JOB_ID`. \* `PROJECT_ID` can contain letters (\[A-Za-z\]), numbers (\[0-9\]), hyphens (-), colons (:), or periods (.). For more information, see Identifying projects \* `LOCATION_ID` is the canonical ID for the job's location. The list of available locations can be obtained by calling locations.list. For more information, see Cloud Scheduler locations. \* `JOB_ID` can contain only letters (\[A-Za-z\]), numbers (\[0-9\]), hyphens (-), or underscores (\_). The maximum length is 500 characters. |
| `pubsubTarget` | PubsubTarget | Pub/Sub target. |
| `retryConfig` | RetryConfig | Settings that determine the retry behavior. |
| `satisfiesPzs` | boolean | Output only. Whether or not this Job satisfies the requirements of physical zone separation |
| `schedule` | string | Required, except when used with UpdateJob. Describes the schedule on which the job will be executed. The schedule can be either of the following types: \* Crontab (https://en.wikipedia.org/wiki/Cron#Overview) \* English-like schedule As a general rule, execution `n + 1` of a job will not begin until execution `n` has finished. Cloud Scheduler will never allow two simultaneously outstanding executions. For example, this implies that if the `n+1`th execution is scheduled to run at 16:00 but the `n`th execution takes until 16:15, the `n+1`th execution will not start until `16:15`. A scheduled start time will be delayed if the previous execution has not ended when its scheduled time occurs. If retry_count > 0 and a job attempt fails, the job will be tried a total of retry_count times, with exponential backoff, until the next scheduled start time. If retry_count is 0, a job attempt will not be retried if it fails. Instead the Cloud Scheduler system will wait for the next scheduled execution time. Setting retry_count to 0 does not prevent failed jobs from running according to schedule after the failure. |
| `scheduleTime` | string (google-datetime) | Output only. The next time the job is scheduled. Note that this may be a retry of a previously failed attempt or the next execution time according to the schedule. |
| `state` | string enum | Output only. State of the job. Values: `STATE_UNSPECIFIED`, `ENABLED`, `PAUSED`, `DISABLED`, `UPDATE_FAILED`. |
| `status` | Status | Output only. The response from the target for the last attempted execution. |
| `timeZone` | string | Specifies the time zone to be used in interpreting schedule. The value of this field must be a time zone name from the tz database (http://en.wikipedia.org/wiki/Tz_database). Note that some time zones include a provision for daylight savings time. The rules for daylight saving time are determined by the chosen tz. For UTC use the string "utc". If a time zone is not specified, the default will be in UTC (also known as GMT). |
| `userUpdateTime` | string (google-datetime) | Output only. The creation time of the job. |

### `Job` (v1beta1)

- Configuration for a job. The maximum allowed size for a job is 1MB.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `appEngineHttpTarget` | AppEngineHttpTarget | App Engine HTTP target. |
| `attemptDeadline` | string (google-duration) | The deadline for job attempts. If the request handler does not respond by this deadline then the request is cancelled and the attempt is marked as a `DEADLINE_EXCEEDED` failure. The failed attempt can be viewed in execution logs. Cloud Scheduler will retry the job according to the RetryConfig. The default and the allowed values depend on the type of target: \* For HTTP targets, the default is 3 minutes. The deadline must be in the interval \[15 seconds, 30 minutes\]. \* For App Engine HTTP targets, 0 indicates that the request has the default deadline. The default deadline depends on the scaling type of the service: 10 minutes for standard apps with automatic scaling, 24 hours for standard apps with manual and basic scaling, and 60 minutes for flex apps. If the request deadline is set, it must be in the interval \[15 seconds, 24 hours 15 seconds\]. \* For Pub/Sub targets, this field is ignored. |
| `description` | string | Optionally caller-specified in CreateJob or UpdateJob. A human-readable description for the job. This string must not contain more than 500 characters. |
| `httpTarget` | HttpTarget | HTTP target. |
| `lastAttemptTime` | string (google-datetime) | Output only. The time the last job attempt started. |
| `legacyAppEngineCron` | boolean | Immutable. This field is used to manage the legacy App Engine Cron jobs using the Cloud Scheduler API. If the field is set to true, the job will be considered a legacy job. Note that App Engine Cron jobs have fewer features than Cloud Scheduler jobs, e.g., are only limited to App Engine targets. |
| `name` | string | Optionally caller-specified in CreateJob, after which it becomes output only. The job name. For example: `projects/PROJECT_ID/locations/LOCATION_ID/jobs/JOB_ID`. \* `PROJECT_ID` can contain letters (\[A-Za-z\]), numbers (\[0-9\]), hyphens (-), colons (:), or periods (.). For more information, see Identifying projects \* `LOCATION_ID` is the canonical ID for the job's location. The list of available locations can be obtained by calling locations.list. For more information, see Cloud Scheduler locations. \* `JOB_ID` can contain only letters (\[A-Za-z\]), numbers (\[0-9\]), hyphens (-), or underscores (\_). The maximum length is 500 characters. |
| `pubsubTarget` | PubsubTarget | Pub/Sub target. |
| `retryConfig` | RetryConfig | Settings that determine the retry behavior. |
| `satisfiesPzs` | boolean | Output only. Whether or not this Job satisfies the requirements of physical zone separation |
| `schedule` | string | Required, except when used with UpdateJob. Describes the schedule on which the job will be executed. The schedule can be either of the following types: \* Crontab (https://en.wikipedia.org/wiki/Cron#Overview) \* English-like schedule As a general rule, execution `n + 1` of a job will not begin until execution `n` has finished. Cloud Scheduler will never allow two simultaneously outstanding executions. For example, this implies that if the `n+1`th execution is scheduled to run at 16:00 but the `n`th execution takes until 16:15, the `n+1`th execution will not start until `16:15`. A scheduled start time will be delayed if the previous execution has not ended when its scheduled time occurs. If retry_count > 0 and a job attempt fails, the job will be tried a total of retry_count times, with exponential backoff, until the next scheduled start time. If retry_count is 0, a job attempt will not be retried if it fails. Instead the Cloud Scheduler system will wait for the next scheduled execution time. Setting retry_count to 0 does not prevent failed jobs from running according to schedule after the failure. |
| `scheduleTime` | string (google-datetime) | Output only. The next time the job is scheduled. Note that this may be a retry of a previously failed attempt or the next execution time according to the schedule. |
| `state` | string enum | Output only. State of the job. Values: `STATE_UNSPECIFIED`, `ENABLED`, `PAUSED`, `DISABLED`, `UPDATE_FAILED`. |
| `status` | Status | Output only. The response from the target for the last attempted execution. |
| `timeZone` | string | Specifies the time zone to be used in interpreting schedule. The value of this field must be a time zone name from the tz database (http://en.wikipedia.org/wiki/Tz_database). Note that some time zones include a provision for daylight savings time. The rules for daylight saving time are determined by the chosen tz. For UTC use the string "utc". If a time zone is not specified, the default will be in UTC (also known as GMT). |
| `userUpdateTime` | string (google-datetime) | Output only. The creation time of the job. |

### `ListJobsResponse`

- Response message for listing jobs using ListJobs.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `jobs` | array<Job> | The list of jobs. |
| `nextPageToken` | string | A token to retrieve next page of results. Pass this value in the page_token field in the subsequent call to ListJobs to retrieve the next page of results. If this is empty it indicates that there are no more results through which to paginate. The page token is valid for only 2 hours. |

### `ListLocationsResponse`

- The response message for Locations.ListLocations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `locations` | array<Location> | A list of locations that matches the specified filter in the request. |
| `nextPageToken` | string | The standard List next-page token. |

### `ListOperationsResponse`

- The response message for Operations.ListOperations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | The standard List next-page token. |
| `operations` | array<Operation> | A list of operations that matches the specified filter in the request. |
| `unreachable` | array<string> | Unordered list. Unreachable resources. Populated when the request sets `ListOperationsRequest.return_partial_success` and reads across collections. For example, when attempting to list all resources across all supported locations. |

### `Location`

- A resource that represents a Google Cloud location.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `displayName` | string | The friendly name for this location, typically a nearby city name. For example, "Tokyo". |
| `labels` | object | Cross-service attributes for the location. For example {"cloud.googleapis.com/region": "us-east1"} |
| `locationId` | string | The canonical id for this location. For example: `"us-east1"`. |
| `metadata` | object | Service-specific metadata. For example the available capacity at the given location. |
| `name` | string | Resource name for the location, which may vary between implementations. For example: `"projects/example-project/locations/us-east1"` |

### `OAuthToken`

- Contains information needed for generating an OAuth token (https://developers.google.com/identity/protocols/OAuth2). This type of authorization should generally only be used when calling Google APIs hosted on \*.googleapis.com.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `scope` | string | OAuth scope to be used for generating OAuth access token. If not specified, "https://www.googleapis.com/auth/cloud-platform" will be used. |
| `serviceAccountEmail` | string | Service account email (https://cloud.google.com/iam/docs/service-accounts) to be used for generating OAuth token. The service account must be within the same project as the job. The caller must have iam.serviceAccounts.actAs permission for the service account. |

### `OidcToken`

- Contains information needed for generating an OpenID Connect token (https://developers.google.com/identity/protocols/OpenIDConnect). This type of authorization can be used for many scenarios, including calling Cloud Run, or endpoints where you intend to validate the token yourself.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `audience` | string | Audience to be used when generating OIDC token. If not specified, the URI specified in target will be used. |
| `serviceAccountEmail` | string | Service account email (https://cloud.google.com/iam/docs/service-accounts) to be used for generating OIDC token. The service account must be within the same project as the job. The caller must have iam.serviceAccounts.actAs permission for the service account. |

### `Operation`

- This resource represents a long-running operation that is the result of a network API call.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `done` | boolean | If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. |
| `error` | Status | The error result of the operation in case of failure or cancellation. |
| `metadata` | object | Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. |
| `name` | string | The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. |
| `response` | object | The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. |

### `OperationMetadata`

- Represents the metadata of the long-running operation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `apiVersion` | string | Output only. API version used to start the operation. |
| `cancelRequested` | boolean | Output only. Identifies whether the user has requested cancellation of the operation. Operations that have been cancelled successfully have google.longrunning.Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`. |
| `createTime` | string (google-datetime) | Output only. The time the operation was created. |
| `endTime` | string (google-datetime) | Output only. The time the operation finished running. |
| `statusDetail` | string | Output only. Human-readable status of the operation, if any. |
| `target` | string | Output only. Server-defined resource path for the target of the operation. |
| `verb` | string | Output only. Name of the verb executed by the operation. |

### `PauseJobRequest`

- Request message for PauseJob.
- Version: v1

### `PubsubMessage`

- A message that is published by publishers and consumed by subscribers. The message must contain either a non-empty data field or at least one attribute. Note that client libraries represent this object differently depending on the language. See the corresponding client library documentation (https://cloud.google.com/pubsub/docs/reference/libraries) for more information. See \[quotas and limits\]( https://cloud.google.com/pubsub/quotas) for more information about message limits.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `attributes` | object | Optional. Attributes for this message. If this field is empty, the message must contain non-empty data. This can be used to filter messages on the subscription. |
| `data` | string (byte) | Optional. The message data field. If this field is empty, the message must contain at least one attribute. |
| `messageId` | string | ID of this message, assigned by the server when the message is published. Guaranteed to be unique within the topic. This value may be read by a subscriber that receives a `PubsubMessage` via a `Pull` call or a push delivery. It must not be populated by the publisher in a `Publish` call. |
| `orderingKey` | string | Optional. If non-empty, identifies related messages for which publish order should be respected. If a `Subscription` has `enable_message_ordering` set to `true`, messages published with the same non-empty `ordering_key` value will be delivered to subscribers in the order in which they are received by the Pub/Sub system. All `PubsubMessage`s published in a given `PublishRequest` must specify the same `ordering_key` value. For more information, see ordering messages (https://cloud.google.com/pubsub/docs/ordering). |
| `publishTime` | string (google-datetime) | The time at which the message was published, populated by the server when it receives the `Publish` call. It must not be populated by the publisher in a `Publish` call. |

### `PubsubTarget`

- Pub/Sub target. The job will be delivered by publishing a message to the given Pub/Sub topic.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `attributes` | object | Attributes for PubsubMessage. Pubsub message must contain either non-empty data, or at least one attribute. |
| `data` | string (byte) | The message payload for PubsubMessage. Pubsub message must contain either non-empty data, or at least one attribute. |
| `topicName` | string | Required. The name of the Cloud Pub/Sub topic to which messages will be published when a job is delivered. The topic name must be in the same format as required by Pub/Sub's PublishRequest.name (https://cloud.google.com/pubsub/docs/reference/rpc/google.pubsub.v1#publishrequest), for example `projects/PROJECT_ID/topics/TOPIC_ID`. The topic must be in the same project as the Cloud Scheduler job. |

### `ResumeJobRequest`

- Request message for ResumeJob.
- Version: v1

### `RetryConfig`

- Settings that determine the retry behavior. For more information, see Retry jobs. By default, if a job does not complete successfully (meaning that an acknowledgement is not received from the handler, then it will be retried with exponential backoff according to the settings in RetryConfig.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `maxBackoffDuration` | string (google-duration) | The maximum amount of time to wait before retrying a job after it fails. The default value of this field is 1 hour. |
| `maxDoublings` | integer (int32) | The time between retries will double `max_doublings` times. A job's retry interval starts at min_backoff_duration, then doubles `max_doublings` times, then increases linearly, and finally retries at intervals of max_backoff_duration up to retry_count times. For examples, see Retry jobs. The default value of this field is 5. |
| `maxRetryDuration` | string (google-duration) | The time limit for retrying a failed job, measured from the time when an execution was first attempted. If specified with retry_count, the job will be retried until both limits are reached. The default value for max_retry_duration is zero, which means retry duration is unlimited. However, if retry_count is also 0, a job attempt won't be retried if it fails. |
| `minBackoffDuration` | string (google-duration) | The minimum amount of time to wait before retrying a job after it fails. The default value of this field is 5 seconds. |
| `retryCount` | integer (int32) | The number of attempts that the system will make to run a job using the exponential backoff procedure described by max_doublings. The default value of retry_count is zero. If retry_count is 0 (and if max_retry_duration is also 0), a job attempt won't be retried if it fails. Instead, Cloud Scheduler system will wait for the next scheduled execution time. Setting retry_count to 0 doesn't prevent failed jobs from running according to schedule after the failure. If retry_count is set to a non-zero number, Cloud Scheduler will retry the failed job, using exponential backoff, for retry_count times until the job succeeds or the number of retries is exhausted. Note that the next scheduled execution time might be skipped if the retries continue through that time. Values greater than 5 and negative values are not allowed. |

### `RunJobRequest`

- Request message for forcing a job to run now using RunJob.
- Version: v1

### `RunJobRequest` (v1beta1)

- Request message for forcing a job to run now using RunJob.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `legacyAppEngineCron` | boolean | This field is used to manage the legacy App Engine Cron jobs using the Cloud Scheduler API. If the field is set to true, the job in the \__cron queue with the corresponding name will be forced to run instead. |

### `Status`

- The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by gRPC (https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the API Design Guide (https://cloud.google.com/apis/design/errors).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `code` | integer (int32) | The status code, which should be an enum value of google.rpc.Code. |
| `details` | array<object> | A list of messages that carry the error details. There is a common set of message types for APIs to use. |
| `message` | string | A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. |

### Shape of `AppEngineHttpTarget`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "appEngineRouting": "AppEngineRouting",
  "body": "string (byte)",
  "headers": "object",
  "httpMethod": "string enum",
  "relativeUri": "string"
}
```

## Notes

- Generated from the Discovery document(s) v1, v1beta1 of `cloudscheduler` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Descriptions are verbatim from Discovery, which drops angle-bracket placeholders of the source comments: a format such as `projects//locations/global` stands for `projects/{project}/locations/global` (likewise `"@.iam.gserviceaccount.com"` lost the account ID before `@`, and a name format ending in a collection such as `projects/*/locations/*/registrations/` lost its last ID), and an expression such as `... && in labels` lost its left operand (for example `'label_value' in labels`). Check the method or field in the product's REST reference before relying on such a format.
- Source: https://cloudscheduler.googleapis.com/$discovery/rest?version=v1, https://cloudscheduler.googleapis.com/$discovery/rest?version=v1beta1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
