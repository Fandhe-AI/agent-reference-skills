---
source: https://docs.cloud.google.com/sdk/gcloud/reference/scheduler/jobs/create
---

# gcloud scheduler jobs create

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud scheduler jobs create app-engine

```text
NAME
    gcloud scheduler jobs create app-engine - create a Cloud Scheduler job with
        an App Engine target

SYNOPSIS
    gcloud scheduler jobs create app-engine (JOB : --location=LOCATION)
        --schedule=SCHEDULE [--attempt-deadline=ATTEMPT_DEADLINE]
        [--description=DESCRIPTION] [--headers=[KEY=VALUE,...]]
        [--http-method=HTTP_METHOD; default="post"]
        [--max-backoff=MAX_BACKOFF; default="3600s"]
        [--max-doublings=MAX_DOUBLINGS; default=5]
        [--max-retry-attempts=MAX_RETRY_ATTEMPTS]
        [--max-retry-duration=MAX_RETRY_DURATION]
        [--min-backoff=MIN_BACKOFF; default="5s"]
        [--relative-url=RELATIVE_URL; default="/"] [--service=SERVICE]
        [--time-zone=TIME_ZONE; default="Etc/UTC"] [--version=VERSION]
        [--message-body=MESSAGE_BODY | --message-body-from-file=PATH_TO_FILE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a Cloud Scheduler job with an App Engine target.

EXAMPLES
    The following command creates a job that sends a request to the
    '/cron-handler' path in you App Engine app every 3 hours:

        $ gcloud scheduler jobs create app-engine my-job \
            --schedule="0 */3 * * *" --relative-url="/cron-handler"

POSITIONAL ARGUMENTS
     Job resource - Job to create. The arguments in this group can be used to
     specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument job on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       JOB
          ID of the job or fully qualified identifier for the job.

          To set the job attribute:
          + provide the argument job on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the job. By default, uses the location of the current
          project's App Engine app if there is an associated app.

          To set the location attribute:
          + provide the argument job on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + defaults to App Engine's app location if not provided & an app
            exists.

REQUIRED FLAGS
     --schedule=SCHEDULE
        Schedule on which the job will be executed.

        As a general rule, execution n + 1 of a job will not begin until
        execution n has finished. Cloud Scheduler will never allow two
        simultaneously outstanding executions. For example, this implies that
        if the n+1 execution is scheduled to run at 16:00 but the n execution
        takes until 16:15, the n+1 execution will not start until 16:15. A
        scheduled start time will be delayed if the previous execution has not
        ended when its scheduled time occurs. Learn more about the cron job
        format
        (https://cloud.google.com/scheduler/docs/configuring/cron-job-schedules).

        If --retry-count > 0 and a job attempt fails, the job will be tried a
        total of --retry-count times, with exponential backoff, until the job
        succeeds or the number of retries is exhausted. Note that the next
        scheduled execution time might be skipped if the retries continue
        through that time. For more information, see Retry jobs
        (https://cloud.google.com/scheduler/docs/configuring/retry-jobs).

OPTIONAL FLAGS
     --attempt-deadline=ATTEMPT_DEADLINE
        The deadline for job attempts. If the request handler doesn't respond
        by this dealine, the request is cancelled and the attempt is marked as
        failed. For example, 20s.

     --description=DESCRIPTION
        Human-readable description of the job.

     --headers=[KEY=VALUE,...]
        KEY=VALUE pairs of HTTP headers to include in the request. Cannot be
        repeated. For example: --headers
        Accept-Language=en-us,Accept=text/plain

     --http-method=HTTP_METHOD; default="post"
        HTTP method to use for the request. HTTP_METHOD must be one of: delete,
        get, head, post, put.

     --max-backoff=MAX_BACKOFF; default="3600s"
        Maximum amount of time to wait before retrying a job after it fails.
        For example, 60s. Default is 3600s (1 hour).

     --max-doublings=MAX_DOUBLINGS; default=5
        Maximum number of times that the interval between failed job retries
        will be doubled before the increase becomes constant.

     --max-retry-attempts=MAX_RETRY_ATTEMPTS
        Number of times to retry the request if it fails or times out. Must be
        in range 0-5 inclusive. Default is 0.

     --max-retry-duration=MAX_RETRY_DURATION
        Time limit for retrying a failed job, measured from when the job was
        first run. If specified with --max-retry-attempts greater than 0, the
        job will be retried until both limits are reached. Default is 0 seconds
        (which means unlimited); however, if --max-retry-attempts is also 0, a
        job attempt won't be retried if it fails.

     --min-backoff=MIN_BACKOFF; default="5s"
        Minimum amount of time to wait before retrying a job after it fails.
        For example, 10s. Default is 5s.

     --relative-url=RELATIVE_URL; default="/"
        Relative URL to use for the request (beginning with "/").

     --service=SERVICE
        ID of the App Engine service to send the request to.

     --time-zone=TIME_ZONE; default="Etc/UTC"
        Specifies the time zone to be used in interpreting --schedule. The
        value of this field must be a time zone name from the tz database
        (https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).

        Note that some time zones include a provision for daylight savings
        time. The rules for daylight saving time are determined by the chosen
        time zone.

        For UTC use the string "utc". Default is "utc".

     --version=VERSION
        Version of the App Engine service to send the request to.

     At most one of these can be specified:

       --message-body=MESSAGE_BODY
          Data payload to be included as the body of the HTTP request. May only
          be given with compatible HTTP methods (PUT or POST).

       --message-body-from-file=PATH_TO_FILE
          Path to file containing the data payload to be included as the body
          of the HTTP request. May only be given with compatible HTTP methods
          (PUT or POST). Use a full or relative path to a local file containing
          the value of message_body.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the cloudscheduler/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/scheduler/

NOTES
    These variants are also available:

        $ gcloud alpha scheduler jobs create app-engine

        $ gcloud beta scheduler jobs create app-engine
```

### gcloud scheduler jobs create http

```text
NAME
    gcloud scheduler jobs create http - create a Cloud Scheduler job that
        triggers an action via HTTP

SYNOPSIS
    gcloud scheduler jobs create http (JOB : --location=LOCATION)
        --schedule=SCHEDULE --uri=URI [--attempt-deadline=ATTEMPT_DEADLINE]
        [--description=DESCRIPTION] [--headers=[KEY=VALUE,...]]
        [--http-method=HTTP_METHOD; default="post"]
        [--max-backoff=MAX_BACKOFF; default="3600s"]
        [--max-doublings=MAX_DOUBLINGS; default=5]
        [--max-retry-attempts=MAX_RETRY_ATTEMPTS]
        [--max-retry-duration=MAX_RETRY_DURATION]
        [--min-backoff=MIN_BACKOFF; default="5s"]
        [--time-zone=TIME_ZONE; default="Etc/UTC"]
        [--message-body=MESSAGE_BODY | --message-body-from-file=PATH_TO_FILE]
        [[--oauth-service-account-email=OAUTH_SERVICE_ACCOUNT_EMAIL
          : --oauth-token-scope=OAUTH_TOKEN_SCOPE]
          | [--oidc-service-account-email=OIDC_SERVICE_ACCOUNT_EMAIL
          : --oidc-token-audience=OIDC_TOKEN_AUDIENCE]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a Cloud Scheduler job that triggers an action via HTTP.

EXAMPLES
    The following command creates a job that sends a HTTP GET request to
    'http://example.com/path' every 3 hours:

        $ gcloud scheduler jobs create http my-job \
            --schedule="0 */3 * * *" --uri="http://example.com/path" \
            --http-method=GET

POSITIONAL ARGUMENTS
     Job resource - Job to create. The arguments in this group can be used to
     specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument job on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       JOB
          ID of the job or fully qualified identifier for the job.

          To set the job attribute:
          + provide the argument job on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the job. By default, uses the location of the current
          project's App Engine app if there is an associated app.

          To set the location attribute:
          + provide the argument job on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + defaults to App Engine's app location if not provided & an app
            exists.

REQUIRED FLAGS
     --schedule=SCHEDULE
        Schedule on which the job will be executed.

        As a general rule, execution n + 1 of a job will not begin until
        execution n has finished. Cloud Scheduler will never allow two
        simultaneously outstanding executions. For example, this implies that
        if the n+1 execution is scheduled to run at 16:00 but the n execution
        takes until 16:15, the n+1 execution will not start until 16:15. A
        scheduled start time will be delayed if the previous execution has not
        ended when its scheduled time occurs. Learn more about the cron job
        format
        (https://cloud.google.com/scheduler/docs/configuring/cron-job-schedules).

        If --retry-count > 0 and a job attempt fails, the job will be tried a
        total of --retry-count times, with exponential backoff, until the job
        succeeds or the number of retries is exhausted. Note that the next
        scheduled execution time might be skipped if the retries continue
        through that time. For more information, see Retry jobs
        (https://cloud.google.com/scheduler/docs/configuring/retry-jobs).

     --uri=URI
        The full URI path that the request will be sent to. This string must
        begin with either "http://" or "https://". For example, http://acme.com
        or https://acme.com/sales:8080. Cloud Scheduler will encode some
        characters for safety and compatibility. The maximum allowed URL length
        is 2083 characters after encoding.

OPTIONAL FLAGS
     --attempt-deadline=ATTEMPT_DEADLINE
        The deadline for job attempts. If the request handler doesn't respond
        by this dealine, the request is cancelled and the attempt is marked as
        failed. For example, 20s.

     --description=DESCRIPTION
        Human-readable description of the job.

     --headers=[KEY=VALUE,...]
        KEY=VALUE pairs of HTTP headers to include in the request. Cannot be
        repeated. For example: --headers
        Accept-Language=en-us,Accept=text/plain

     --http-method=HTTP_METHOD; default="post"
        HTTP method to use for the request. HTTP_METHOD must be one of: delete,
        get, head, post, put.

     --max-backoff=MAX_BACKOFF; default="3600s"
        Maximum amount of time to wait before retrying a job after it fails.
        For example, 60s. Default is 3600s (1 hour).

     --max-doublings=MAX_DOUBLINGS; default=5
        Maximum number of times that the interval between failed job retries
        will be doubled before the increase becomes constant.

     --max-retry-attempts=MAX_RETRY_ATTEMPTS
        Number of times to retry the request if it fails or times out. Must be
        in range 0-5 inclusive. Default is 0.

     --max-retry-duration=MAX_RETRY_DURATION
        Time limit for retrying a failed job, measured from when the job was
        first run. If specified with --max-retry-attempts greater than 0, the
        job will be retried until both limits are reached. Default is 0 seconds
        (which means unlimited); however, if --max-retry-attempts is also 0, a
        job attempt won't be retried if it fails.

     --min-backoff=MIN_BACKOFF; default="5s"
        Minimum amount of time to wait before retrying a job after it fails.
        For example, 10s. Default is 5s.

     --time-zone=TIME_ZONE; default="Etc/UTC"
        Specifies the time zone to be used in interpreting --schedule. The
        value of this field must be a time zone name from the tz database
        (https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).

        Note that some time zones include a provision for daylight savings
        time. The rules for daylight saving time are determined by the chosen
        time zone.

        For UTC use the string "utc". Default is "utc".

     At most one of these can be specified:

       --message-body=MESSAGE_BODY
          Data payload to be included as the body of the HTTP request. May only
          be given with compatible HTTP methods (PUT or POST).

       --message-body-from-file=PATH_TO_FILE
          Path to file containing the data payload to be included as the body
          of the HTTP request. May only be given with compatible HTTP methods
          (PUT or POST). Use a full or relative path to a local file containing
          the value of message_body.

     How the request sent to the target when executing the job should be
     authenticated.

     At most one of these can be specified:

       OAuth2

       --oauth-service-account-email=OAUTH_SERVICE_ACCOUNT_EMAIL
          The service account email to be used for generating an OAuth2 access
          token to be included in the request sent to the target when executing
          the job. The service account must be within the same project as the
          job. The caller must have iam.serviceAccounts.actAs permission for
          the service account. The token must be OAuth if the target is a
          Google APIs service with URL *.googleapis.com.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --oauth-token-scope=OAUTH_TOKEN_SCOPE
          The scope to be used when generating an OAuth2 access token to be
          included in the request sent to the target when executing the job. If
          not specified, "https://www.googleapis.com/auth/cloud-platform" will
          be used.

       OpenId Connect

       --oidc-service-account-email=OIDC_SERVICE_ACCOUNT_EMAIL
          The service account email to be used for generating an OpenId Connect
          token to be included in the request sent to the target when executing
          the job. The service account must be within the same project as the
          job. The caller must have iam.serviceAccounts.actAs permission for
          the service account. The OIDC token is generally used except for
          Google APIs hosted on *.googleapis.com: these APIs expect an OAuth
          token.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --oidc-token-audience=OIDC_TOKEN_AUDIENCE
          The audience to be used when generating an OpenId Connect token to be
          included in the request sent to the target when executing the job. If
          not specified, the URI specified in target will be used.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the cloudscheduler/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/scheduler/

NOTES
    These variants are also available:

        $ gcloud alpha scheduler jobs create http

        $ gcloud beta scheduler jobs create http
```

### gcloud scheduler jobs create pubsub

```text
NAME
    gcloud scheduler jobs create pubsub - create a Cloud Scheduler job with a
        Pub/Sub target

SYNOPSIS
    gcloud scheduler jobs create pubsub (JOB : --location=LOCATION)
        --schedule=SCHEDULE --topic=TOPIC
        (--attributes=ATTRIBUTES --message-body=MESSAGE_BODY
          | --message-body-from-file=PATH_TO_FILE) [--description=DESCRIPTION]
        [--max-backoff=MAX_BACKOFF; default="3600s"]
        [--max-doublings=MAX_DOUBLINGS; default=5]
        [--max-retry-attempts=MAX_RETRY_ATTEMPTS]
        [--max-retry-duration=MAX_RETRY_DURATION]
        [--min-backoff=MIN_BACKOFF; default="5s"]
        [--time-zone=TIME_ZONE; default="Etc/UTC"] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a Cloud Scheduler job with a Pub/Sub target.

EXAMPLES
    The following command creates a job that publishes a message with the body
    'Hello' to the Pub/Sub topic 'cron-topic' every 3 hours:

        $ gcloud scheduler jobs create pubsub my-job \
            --schedule="0 */3 * * *" --topic=cron-topic \
            --message-body="Hello"

POSITIONAL ARGUMENTS
     Job resource - Job to create. The arguments in this group can be used to
     specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument job on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       JOB
          ID of the job or fully qualified identifier for the job.

          To set the job attribute:
          + provide the argument job on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the job. By default, uses the location of the current
          project's App Engine app if there is an associated app.

          To set the location attribute:
          + provide the argument job on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + defaults to App Engine's app location if not provided & an app
            exists.

REQUIRED FLAGS
     --schedule=SCHEDULE
        Schedule on which the job will be executed.

        As a general rule, execution n + 1 of a job will not begin until
        execution n has finished. Cloud Scheduler will never allow two
        simultaneously outstanding executions. For example, this implies that
        if the n+1 execution is scheduled to run at 16:00 but the n execution
        takes until 16:15, the n+1 execution will not start until 16:15. A
        scheduled start time will be delayed if the previous execution has not
        ended when its scheduled time occurs. Learn more about the cron job
        format
        (https://cloud.google.com/scheduler/docs/configuring/cron-job-schedules).

        If --retry-count > 0 and a job attempt fails, the job will be tried a
        total of --retry-count times, with exponential backoff, until the job
        succeeds or the number of retries is exhausted. Note that the next
        scheduled execution time might be skipped if the retries continue
        through that time. For more information, see Retry jobs
        (https://cloud.google.com/scheduler/docs/configuring/retry-jobs).

     --topic=TOPIC
        Name of the Google Cloud Pub/Sub topic to publish to when the job runs.

     Body of the message to publish to the given topic name. Information on
     message formatting and size limits can be found at:
     https://cloud.google.com/pubsub/docs/publisher#publish

     At least one of these must be specified:

       --attributes=ATTRIBUTES
          Comma-separated list of attributes. Each attribute has the form
          "NAME=VALUE". You can specify up to 100 attributes.

       At most one of these can be specified:

         --message-body=MESSAGE_BODY
            Body of the message.

         --message-body-from-file=PATH_TO_FILE
            Path to a file containing the body of the message. Use a full or
            relative path to a local file containing the value of message_body.

OPTIONAL FLAGS
     --description=DESCRIPTION
        Human-readable description of the job.

     --max-backoff=MAX_BACKOFF; default="3600s"
        Maximum amount of time to wait before retrying a job after it fails.
        For example, 60s. Default is 3600s (1 hour).

     --max-doublings=MAX_DOUBLINGS; default=5
        Maximum number of times that the interval between failed job retries
        will be doubled before the increase becomes constant.

     --max-retry-attempts=MAX_RETRY_ATTEMPTS
        Number of times to retry the request if it fails or times out. Must be
        in range 0-5 inclusive. Default is 0.

     --max-retry-duration=MAX_RETRY_DURATION
        Time limit for retrying a failed job, measured from when the job was
        first run. If specified with --max-retry-attempts greater than 0, the
        job will be retried until both limits are reached. Default is 0 seconds
        (which means unlimited); however, if --max-retry-attempts is also 0, a
        job attempt won't be retried if it fails.

     --min-backoff=MIN_BACKOFF; default="5s"
        Minimum amount of time to wait before retrying a job after it fails.
        For example, 10s. Default is 5s.

     --time-zone=TIME_ZONE; default="Etc/UTC"
        Specifies the time zone to be used in interpreting --schedule. The
        value of this field must be a time zone name from the tz database
        (https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).

        Note that some time zones include a provision for daylight savings
        time. The rules for daylight saving time are determined by the chosen
        time zone.

        For UTC use the string "utc". Default is "utc".

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the cloudscheduler/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/scheduler/

NOTES
    These variants are also available:

        $ gcloud alpha scheduler jobs create pubsub

        $ gcloud beta scheduler jobs create pubsub
```

### gcloud beta scheduler jobs create app-engine

```text
NAME
    gcloud beta scheduler jobs create app-engine - create a Cloud Scheduler job
        with an App Engine target

SYNOPSIS
    gcloud beta scheduler jobs create app-engine (JOB : --location=LOCATION)
        --schedule=SCHEDULE [--attempt-deadline=ATTEMPT_DEADLINE]
        [--description=DESCRIPTION] [--headers=[KEY=VALUE,...]]
        [--http-method=HTTP_METHOD; default="post"]
        [--max-backoff=MAX_BACKOFF; default="3600s"]
        [--max-doublings=MAX_DOUBLINGS; default=5]
        [--max-retry-attempts=MAX_RETRY_ATTEMPTS]
        [--max-retry-duration=MAX_RETRY_DURATION]
        [--min-backoff=MIN_BACKOFF; default="5s"]
        [--relative-url=RELATIVE_URL; default="/"] [--service=SERVICE]
        [--time-zone=TIME_ZONE; default="Etc/UTC"] [--version=VERSION]
        [--message-body=MESSAGE_BODY | --message-body-from-file=PATH_TO_FILE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta scheduler jobs create http

```text
NAME
    gcloud beta scheduler jobs create http - create a Cloud Scheduler job that
        triggers an action via HTTP

SYNOPSIS
    gcloud beta scheduler jobs create http (JOB : --location=LOCATION)
        --schedule=SCHEDULE --uri=URI [--attempt-deadline=ATTEMPT_DEADLINE]
        [--description=DESCRIPTION] [--headers=[KEY=VALUE,...]]
        [--http-method=HTTP_METHOD; default="post"]
        [--max-backoff=MAX_BACKOFF; default="3600s"]
        [--max-doublings=MAX_DOUBLINGS; default=5]
        [--max-retry-attempts=MAX_RETRY_ATTEMPTS]
        [--max-retry-duration=MAX_RETRY_DURATION]
        [--min-backoff=MIN_BACKOFF; default="5s"]
        [--time-zone=TIME_ZONE; default="Etc/UTC"]
        [--message-body=MESSAGE_BODY | --message-body-from-file=PATH_TO_FILE]
        [[--oauth-service-account-email=OAUTH_SERVICE_ACCOUNT_EMAIL
          : --oauth-token-scope=OAUTH_TOKEN_SCOPE]
          | [--oidc-service-account-email=OIDC_SERVICE_ACCOUNT_EMAIL
          : --oidc-token-audience=OIDC_TOKEN_AUDIENCE]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta scheduler jobs create pubsub

```text
NAME
    gcloud beta scheduler jobs create pubsub - create a Cloud Scheduler job
        with a Pub/Sub target

SYNOPSIS
    gcloud beta scheduler jobs create pubsub (JOB : --location=LOCATION)
        --schedule=SCHEDULE --topic=TOPIC
        (--attributes=ATTRIBUTES --message-body=MESSAGE_BODY
          | --message-body-from-file=PATH_TO_FILE) [--description=DESCRIPTION]
        [--max-backoff=MAX_BACKOFF; default="3600s"]
        [--max-doublings=MAX_DOUBLINGS; default=5]
        [--max-retry-attempts=MAX_RETRY_ATTEMPTS]
        [--max-retry-duration=MAX_RETRY_DURATION]
        [--min-backoff=MIN_BACKOFF; default="5s"]
        [--time-zone=TIME_ZONE; default="Etc/UTC"] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha scheduler jobs create app-engine

```text
NAME
    gcloud alpha scheduler jobs create app-engine - create a Cloud Scheduler
        job with an App Engine target

SYNOPSIS
    gcloud alpha scheduler jobs create app-engine (JOB : --location=LOCATION)
        --schedule=SCHEDULE [--attempt-deadline=ATTEMPT_DEADLINE]
        [--description=DESCRIPTION] [--headers=[KEY=VALUE,...]]
        [--http-method=HTTP_METHOD; default="post"]
        [--max-backoff=MAX_BACKOFF; default="3600s"]
        [--max-doublings=MAX_DOUBLINGS; default=5]
        [--max-retry-attempts=MAX_RETRY_ATTEMPTS]
        [--max-retry-duration=MAX_RETRY_DURATION]
        [--min-backoff=MIN_BACKOFF; default="5s"]
        [--relative-url=RELATIVE_URL; default="/"] [--service=SERVICE]
        [--time-zone=TIME_ZONE; default="Etc/UTC"] [--version=VERSION]
        [--message-body=MESSAGE_BODY | --message-body-from-file=PATH_TO_FILE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha scheduler jobs create http

```text
NAME
    gcloud alpha scheduler jobs create http - create a Cloud Scheduler job that
        triggers an action via HTTP

SYNOPSIS
    gcloud alpha scheduler jobs create http (JOB : --location=LOCATION)
        --schedule=SCHEDULE --uri=URI [--attempt-deadline=ATTEMPT_DEADLINE]
        [--description=DESCRIPTION] [--headers=[KEY=VALUE,...]]
        [--http-method=HTTP_METHOD; default="post"]
        [--max-backoff=MAX_BACKOFF; default="3600s"]
        [--max-doublings=MAX_DOUBLINGS; default=5]
        [--max-retry-attempts=MAX_RETRY_ATTEMPTS]
        [--max-retry-duration=MAX_RETRY_DURATION]
        [--min-backoff=MIN_BACKOFF; default="5s"]
        [--time-zone=TIME_ZONE; default="Etc/UTC"]
        [--message-body=MESSAGE_BODY | --message-body-from-file=PATH_TO_FILE]
        [[--oauth-service-account-email=OAUTH_SERVICE_ACCOUNT_EMAIL
          : --oauth-token-scope=OAUTH_TOKEN_SCOPE]
          | [--oidc-service-account-email=OIDC_SERVICE_ACCOUNT_EMAIL
          : --oidc-token-audience=OIDC_TOKEN_AUDIENCE]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha scheduler jobs create pubsub

```text
NAME
    gcloud alpha scheduler jobs create pubsub - create a Cloud Scheduler job
        with a Pub/Sub target

SYNOPSIS
    gcloud alpha scheduler jobs create pubsub (JOB : --location=LOCATION)
        --schedule=SCHEDULE --topic=TOPIC
        (--attributes=ATTRIBUTES --message-body=MESSAGE_BODY
          | --message-body-from-file=PATH_TO_FILE) [--description=DESCRIPTION]
        [--max-backoff=MAX_BACKOFF; default="3600s"]
        [--max-doublings=MAX_DOUBLINGS; default=5]
        [--max-retry-attempts=MAX_RETRY_ATTEMPTS]
        [--max-retry-duration=MAX_RETRY_DURATION]
        [--min-backoff=MIN_BACKOFF; default="5s"]
        [--time-zone=TIME_ZONE; default="Etc/UTC"] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/scheduler/jobs/create (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
