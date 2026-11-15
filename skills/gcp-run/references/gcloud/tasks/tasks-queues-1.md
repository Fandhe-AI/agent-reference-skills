---
source: https://docs.cloud.google.com/sdk/gcloud/reference/tasks/queues
---

# gcloud tasks queues (part 1/2)

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud tasks queues add-iam-policy-binding

```text
NAME
    gcloud tasks queues add-iam-policy-binding - add IAM policy binding for a
        tasks queue

SYNOPSIS
    gcloud tasks queues add-iam-policy-binding (QUEUE : --location=LOCATION)
        --member=PRINCIPAL --role=ROLE [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Add an IAM policy binding to a tasks queue's access policy.

EXAMPLES
    To add an IAM policy binding for the role of 'roles/editor' for the user
    'test-user@gmail.com' with queue 'my-queue' and location='my-location',
    run:

        $ gcloud tasks queues add-iam-policy-binding my-queue \
            --location='my-location' --member='user:test-user@gmail.com' \
            --role='roles/editor'

    See https://cloud.google.com/iam/docs/managing-policies for details of
    policy role and member types.

POSITIONAL ARGUMENTS
     Queue resource - The task queue for which to add IAM policy binding to.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument queue on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       QUEUE
          ID of the queue or fully qualified identifier for the queue.

          To set the queue attribute:
          + provide the argument queue on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location name.

          To set the location attribute:
          + provide the argument queue on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

REQUIRED FLAGS
     --member=PRINCIPAL
        The principal to add the binding for. Should be of the form
        user|group|serviceAccount:email or domain:domain.

        Examples: user:test-user@gmail.com, group:admins@example.com,
        serviceAccount:test123@example.domain.com, or
        domain:example.domain.com.

        Some resources also accept the following special values:
        * allUsers - Special identifier that represents anyone who is on the
          internet, with or without a Google account.
        * allAuthenticatedUsers - Special identifier that represents anyone
          who is authenticated with a Google account or a service account.

     --role=ROLE
        Role name to assign to the principal. The role name is the complete
        path of a predefined role, such as roles/logging.viewer, or the role ID
        for a custom role, such as
        organizations/{ORGANIZATION_ID}/roles/logging.viewer.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the cloudtasks/v2 API. The full documentation for this
    API can be found at: https://cloud.google.com/tasks/

NOTES
    These variants are also available:

        $ gcloud alpha tasks queues add-iam-policy-binding

        $ gcloud beta tasks queues add-iam-policy-binding
```

### gcloud tasks queues create

```text
NAME
    gcloud tasks queues create - create a Cloud Tasks queue

SYNOPSIS
    gcloud tasks queues create QUEUE
        [--http-header-override=HEADER_FIELD: HEADER_VALUE]
        [--http-method-override=HTTP_METHOD_OVERRIDE]
        [--http-uri-override=KEY:VALUE,[KEY:VALUE,...]] [--location=LOCATION]
        [--log-sampling-ratio=LOG_SAMPLING_RATIO] [--max-attempts=MAX_ATTEMPTS]
        [--max-backoff=MAX_BACKOFF]
        [--max-concurrent-dispatches=MAX_CONCURRENT_DISPATCHES]
        [--max-dispatches-per-second=MAX_DISPATCHES_PER_SECOND]
        [--max-doublings=MAX_DOUBLINGS]
        [--max-retry-duration=MAX_RETRY_DURATION] [--min-backoff=MIN_BACKOFF]
        [--routing-override=KEY:VALUE,[...]]
        [[--http-oauth-service-account-email-override=HTTP_OAUTH_SERVICE_ACCOUNT_EMAIL_OVERRIDE : --http-oauth-token-scope-override=HTTP_OAUTH_TOKEN_SCOPE_OVERRIDE] | [--http-oidc-service-account-email-override=HTTP_OIDC_SERVICE_ACCOUNT_EMAIL_OVERRIDE : --http-oidc-token-audience-override=HTTP_OIDC_TOKEN_AUDIENCE_OVERRIDE]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    The flags available to this command represent the fields of a queue that
    are mutable.

EXAMPLES
    To create a Cloud Tasks queue:

        $ gcloud tasks queues create my-queue --max-attempts=10 \
          --max-retry-duration=5s --max-doublings=4 --min-backoff=1s \
          --max-backoff=10s --max-dispatches-per-second=100 \
          --max-concurrent-dispatches=10 --routing-override=service:abc

POSITIONAL ARGUMENTS
     QUEUE
        The queue to create.

FLAGS
     --http-header-override=HEADER_FIELD: HEADER_VALUE
        If provided, the specified HTTP headers override the existing headers
        for all tasks in the queue. If a task has a header with the same Key as
        a queue-level header override, then the value of the task header will
        be overriden with the value of the queue-level header. Otherwise, the
        queue-level header will be added to the task headers. Header values can
        contain commas. This flag can be repeated. Repeated header fields will
        have their values overridden.

     --http-method-override=HTTP_METHOD_OVERRIDE
        If provided, the specified HTTP method type override is used for all
        tasks in the queue, no matter what is set at the task-level.

     --http-uri-override=KEY:VALUE,[KEY:VALUE,...]
        If provided, the specified HTTP target URI override is used for all
        tasks in the queue depending on what is set as the mode. Allowed values
        for mode are: ALWAYS, IF_NOT_EXISTS. If not set, mode defaults to
        ALWAYS.

        KEY must be at least one of: [scheme, host, port, path, query, mode].
        Any missing keys will use the default.

     --location=LOCATION
        The location where we want to manage the queue or task. If not
        specified, uses the location of the current project's App Engine app if
        there is an associated app.

     --log-sampling-ratio=LOG_SAMPLING_RATIO
        Specifies the fraction of operations to write to Cloud Logging. This
        field may contain any value between 0.0 and 1.0, inclusive. 0.0 is the
        default and means that no operations are logged.

     --max-attempts=MAX_ATTEMPTS
        The maximum number of attempts per task in the queue.

     --max-backoff=MAX_BACKOFF
        The maximum amount of time to wait before retrying a task after it
        fails. Must be a string that ends in 's', such as "5s".

     --max-concurrent-dispatches=MAX_CONCURRENT_DISPATCHES
        The maximum number of concurrent tasks that Cloud Tasks allows to be
        dispatched for this queue. After this threshold has been reached, Cloud
        Tasks stops dispatching tasks until the number of outstanding requests
        decreases.

     --max-dispatches-per-second=MAX_DISPATCHES_PER_SECOND
        The maximum rate at which tasks are dispatched from this queue.

     --max-doublings=MAX_DOUBLINGS
        The time between retries will double maxDoublings times.

        A tasks retry interval starts at minBackoff, then doubles maxDoublings
        times, then increases linearly, and finally retries retries at
        intervals of maxBackoff up to maxAttempts times.

        For example, if minBackoff is 10s, maxBackoff is 300s, and maxDoublings
        is 3, then the a task will first be retried in 10s. The retry interval
        will double three times, and then increase linearly by 2^3 * 10s.
        Finally, the task will retry at intervals of maxBackoff until the task
        has been attempted maxAttempts times. Thus, the requests will retry at
        10s, 20s, 40s, 80s, 160s, 240s, 300s, 300s.

     --max-retry-duration=MAX_RETRY_DURATION
        The time limit for retrying a failed task, measured from when the task
        was first run. Once the --max-retry-duration time has passed and the
        task has been attempted --max-attempts times, no further attempts will
        be made and the task will be deleted.

        Must be a string that ends in 's', such as "5s".

     --min-backoff=MIN_BACKOFF
        The minimum amount of time to wait before retrying a task after it
        fails. Must be a string that ends in 's', such as "5s".

     --routing-override=KEY:VALUE,[...]
        If provided, the specified App Engine route is used for all tasks in
        the queue, no matter what is set is at the task-level.

        KEY must be at least one of: [service, version, instance]. Any missing
        keys will use the default.

     If specified, all Authorization headers in the HttpRequest.headers field
     will be overridden for any tasks executed on this queue.

     At most one of these can be specified:

       OAuth2

       --http-oauth-service-account-email-override=HTTP_OAUTH_SERVICE_ACCOUNT_EMAIL_OVERRIDE
          The service account email to be used for generating an OAuth2 access
          token to be included in the request sent to the target when executing
          the task. The service account must be within the same project as the
          queue. The caller must have 'iam.serviceAccounts.actAs' permission
          for the service account.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --http-oauth-token-scope-override=HTTP_OAUTH_TOKEN_SCOPE_OVERRIDE
          The scope to be used when generating an OAuth2 access token to be
          included in the request sent to the target when executing the task.
          If not specified, 'https://www.googleapis.com/auth/cloud-platform'
          will be used.

       OpenId Connect

       --http-oidc-service-account-email-override=HTTP_OIDC_SERVICE_ACCOUNT_EMAIL_OVERRIDE
          The service account email to be used for generating an OpenID Connect
          token to be included in the request sent to the target when executing
          the task. The service account must be within the same project as the
          queue. The caller must have 'iam.serviceAccounts.actAs' permission
          for the service account.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --http-oidc-token-audience-override=HTTP_OIDC_TOKEN_AUDIENCE_OVERRIDE
          The audience to be used when generating an OpenID Connect token to be
          included in the request sent to the target when executing the task.
          If not specified, the URI specified in the target will be used.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha tasks queues create

        $ gcloud beta tasks queues create
```

### gcloud tasks queues delete

```text
NAME
    gcloud tasks queues delete - delete a queue

SYNOPSIS
    gcloud tasks queues delete QUEUE [--location=LOCATION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a queue.

EXAMPLES
    To delete a queue:

        $ gcloud tasks queues delete my-queue

POSITIONAL ARGUMENTS
     QUEUE
        The queue to delete.

FLAGS
     --location=LOCATION
        The location where we want to manage the queue or task. If not
        specified, uses the location of the current project's App Engine app if
        there is an associated app.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha tasks queues delete

        $ gcloud beta tasks queues delete
```

### gcloud tasks queues describe

```text
NAME
    gcloud tasks queues describe - show details about a queue

SYNOPSIS
    gcloud tasks queues describe QUEUE [--location=LOCATION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Show details about a queue.

EXAMPLES
    To describe queue:

        $ gcloud tasks queues describe my-queue

POSITIONAL ARGUMENTS
     QUEUE
        The queue to describe.

FLAGS
     --location=LOCATION
        The location where we want to manage the queue or task. If not
        specified, uses the location of the current project's App Engine app if
        there is an associated app.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha tasks queues describe

        $ gcloud beta tasks queues describe
```

### gcloud tasks queues get-iam-policy

```text
NAME
    gcloud tasks queues get-iam-policy - get the IAM policy for a queue

SYNOPSIS
    gcloud tasks queues get-iam-policy (QUEUE : --location=LOCATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud tasks queues get-iam-policy displays the IAM policy associated with
    a queue. If formatted as JSON, the output can be edited and used as a
    policy file for set-iam-policy. The output includes an "etag" field
    identifying the version emitted and allowing detection of concurrent policy
    updates; see $ gcloud tasks queues set-iam-policy for additional details.

EXAMPLES
    To print the IAM policy for a given queue, run:

        $ gcloud tasks queues get-iam-policy my-queue

POSITIONAL ARGUMENTS
     Queue resource - The Cloud Tasks queue for which to display the IAM
     policy. The arguments in this group can be used to specify the attributes
     of this resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument queue on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       QUEUE
          ID of the queue or fully qualified identifier for the queue.

          To set the queue attribute:
          + provide the argument queue on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location name.

          To set the location attribute:
          + provide the argument queue on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

LIST COMMAND FLAGS
     --filter=EXPRESSION
        Apply a Boolean filter EXPRESSION to each resource item to be listed.
        If the expression evaluates True, then that item is listed. For more
        details and examples of filter expressions, run $ gcloud topic filters.
        This flag interacts with other flags that are applied in this order:
        --flatten, --sort-by, --filter, --limit.

     --limit=LIMIT
        Maximum number of resources to list. The default is unlimited. This
        flag interacts with other flags that are applied in this order:
        --flatten, --sort-by, --filter, --limit.

     --page-size=PAGE_SIZE
        Some services group resource list output into pages. This flag
        specifies the maximum number of resources per page. The default is
        determined by the service if it supports paging, otherwise it is
        unlimited (no paging). Paging may be applied before or after --filter
        and --limit depending on the service.

     --sort-by=[FIELD,...]
        Comma-separated list of resource field key names to sort by. The
        default order is ascending. Prefix a field with ``~'' for descending
        order on that field. This flag interacts with other flags that are
        applied in this order: --flatten, --sort-by, --filter, --limit.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the cloudtasks/v2 API. The full documentation for this
    API can be found at: https://cloud.google.com/tasks/

NOTES
    These variants are also available:

        $ gcloud alpha tasks queues get-iam-policy

        $ gcloud beta tasks queues get-iam-policy
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud tasks queues get-iam-policy my-queue \
    --location=us-central1
```

### gcloud tasks queues list

```text
NAME
    gcloud tasks queues list - list all queues

SYNOPSIS
    gcloud tasks queues list [--location=LOCATION] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List all queues.

EXAMPLES
    To list all queues:

        $ gcloud tasks queues list

FLAGS
     --location=LOCATION
        The location where we want to manage the queue or task. If not
        specified, uses the location of the current project's App Engine app if
        there is an associated app.

LIST COMMAND FLAGS
     --filter=EXPRESSION
        Apply a Boolean filter EXPRESSION to each resource item to be listed.
        If the expression evaluates True, then that item is listed. For more
        details and examples of filter expressions, run $ gcloud topic filters.
        This flag interacts with other flags that are applied in this order:
        --flatten, --sort-by, --filter, --limit.

     --limit=LIMIT
        Maximum number of resources to list. The default is unlimited. This
        flag interacts with other flags that are applied in this order:
        --flatten, --sort-by, --filter, --limit.

     --page-size=PAGE_SIZE
        Some services group resource list output into pages. This flag
        specifies the maximum number of resources per page. The default is
        determined by the service if it supports paging, otherwise it is
        unlimited (no paging). Paging may be applied before or after --filter
        and --limit depending on the service.

     --sort-by=[FIELD,...]
        Comma-separated list of resource field key names to sort by. The
        default order is ascending. Prefix a field with ``~'' for descending
        order on that field. This flag interacts with other flags that are
        applied in this order: --flatten, --sort-by, --filter, --limit.

     --uri
        Print a list of resource URIs instead of the default output, and change
        the command output to a list of URIs. If this flag is used with
        --format, the formatting is applied on this URI list. To display URIs
        alongside other keys instead, use the uri() transform.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha tasks queues list

        $ gcloud beta tasks queues list
```

### gcloud tasks queues pause

```text
NAME
    gcloud tasks queues pause - pause a queue

SYNOPSIS
    gcloud tasks queues pause QUEUE [--location=LOCATION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    If a queue is paused then the system will stop executing the tasks in the
    queue until it is resumed. Tasks can still be added when the queue is
    paused.

EXAMPLES
    To pause a queue:

        $ gcloud tasks queues pause my-queue

POSITIONAL ARGUMENTS
     QUEUE
        The queue to pause.

FLAGS
     --location=LOCATION
        The location where we want to manage the queue or task. If not
        specified, uses the location of the current project's App Engine app if
        there is an associated app.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha tasks queues pause

        $ gcloud beta tasks queues pause
```

### gcloud tasks queues purge

```text
NAME
    gcloud tasks queues purge - purge a queue by deleting all of its tasks

SYNOPSIS
    gcloud tasks queues purge QUEUE [--location=LOCATION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command purges a queue by deleting all of its tasks. Purge operations
    can take up to one minute to take effect. Tasks might be dispatched before
    the purge takes effect. A purge is irreversible. All tasks created before
    this command is run are permanently deleted.

EXAMPLES
    To purge a queue:

        $ gcloud tasks queues purge my-queue

POSITIONAL ARGUMENTS
     QUEUE
        The queue to purge.

FLAGS
     --location=LOCATION
        The location where we want to manage the queue or task. If not
        specified, uses the location of the current project's App Engine app if
        there is an associated app.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha tasks queues purge

        $ gcloud beta tasks queues purge
```

### gcloud tasks queues remove-iam-policy-binding

```text
NAME
    gcloud tasks queues remove-iam-policy-binding - remove IAM policy binding
        of tasks queue

SYNOPSIS
    gcloud tasks queues remove-iam-policy-binding (QUEUE : --location=LOCATION)
        --member=PRINCIPAL --role=ROLE [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Remove an IAM policy binding of a tasks queue's access policy.

EXAMPLES
    To remove an IAM policy binding for the role of 'roles/editor' for the user
    'test-user@gmail.com' with queue 'my-queue' and location='my-location',
    run:

        $ gcloud tasks queues remove-iam-policy-binding my-queue \
            --location='my-location' --member='user:test-user@gmail.com' \
            --role='roles/editor'

    See https://cloud.google.com/iam/docs/managing-policies for details of
    policy role and member types.

POSITIONAL ARGUMENTS
     Queue resource - The task queue for which to remove IAM policy binding
     from. The arguments in this group can be used to specify the attributes of
     this resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument queue on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       QUEUE
          ID of the queue or fully qualified identifier for the queue.

          To set the queue attribute:
          + provide the argument queue on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location name.

          To set the location attribute:
          + provide the argument queue on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

REQUIRED FLAGS
     --member=PRINCIPAL
        The principal to remove the binding for. Should be of the form
        user|group|serviceAccount:email or domain:domain.

        Examples: user:test-user@gmail.com, group:admins@example.com,
        serviceAccount:test123@example.domain.com, or
        domain:example.domain.com.

        Deleted principals have an additional deleted: prefix and a ?uid=UID
        suffix, where UID is a unique identifier for the principal. Example:
        deleted:user:test-user@gmail.com?uid=123456789012345678901.

        Some resources also accept the following special values:
        * allUsers - Special identifier that represents anyone who is on the
          internet, with or without a Google account.
        * allAuthenticatedUsers - Special identifier that represents anyone
          who is authenticated with a Google account or a service account.

     --role=ROLE
        The role to remove the principal from.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the cloudtasks/v2 API. The full documentation for this
    API can be found at: https://cloud.google.com/tasks/

NOTES
    These variants are also available:

        $ gcloud alpha tasks queues remove-iam-policy-binding

        $ gcloud beta tasks queues remove-iam-policy-binding
```

### gcloud tasks queues resume

```text
NAME
    gcloud tasks queues resume - request to resume a paused or disabled queue

SYNOPSIS
    gcloud tasks queues resume QUEUE [--location=LOCATION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Request to resume a paused or disabled queue.

EXAMPLES
    To resume a queue:

        $ gcloud tasks queues resume my-queue

POSITIONAL ARGUMENTS
     QUEUE
        The queue to resume.

FLAGS
     --location=LOCATION
        The location where we want to manage the queue or task. If not
        specified, uses the location of the current project's App Engine app if
        there is an associated app.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha tasks queues resume

        $ gcloud beta tasks queues resume
```

### gcloud tasks queues set-iam-policy

```text
NAME
    gcloud tasks queues set-iam-policy - set the IAM policy for a queue

SYNOPSIS
    gcloud tasks queues set-iam-policy (QUEUE : --location=LOCATION)
        POLICY_FILE [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command replaces the existing IAM policy for a queue, given a queue
    and a file encoded in JSON or YAML that contains the IAM policy. If the
    given policy file specifies an "etag" value, then the replacement will
    succeed only if the policy already in place matches that etag. (An etag
    obtained via get-iam-policy will prevent the replacement if the policy for
    the queue has been subsequently updated.) A policy file that does not
    contain an etag value will replace any existing policy for the queue.

EXAMPLES
    To set the IAM policy for a queue:

        $ gcloud tasks queues set-iam-policy my-queue policy-file.json

POSITIONAL ARGUMENTS
     Queue resource - The queue for which to set the IAM policy. The arguments
     in this group can be used to specify the attributes of this resource.
     (NOTE) Some attributes are not given arguments in this group but can be
     set in other ways.

     To set the project attribute:
      * provide the argument queue on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       QUEUE
          ID of the queue or fully qualified identifier for the queue.

          To set the queue attribute:
          + provide the argument queue on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location name.

          To set the location attribute:
          + provide the argument queue on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

     POLICY_FILE
        Path to a local JSON or YAML formatted file containing a valid policy.

        The output of the get-iam-policy command is a valid file, as is any
        JSON or YAML file conforming to the structure of a Policy
        (https://cloud.google.com/iam/reference/rest/v1/Policy).

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the cloudtasks/v2 API. The full documentation for this
    API can be found at: https://cloud.google.com/tasks/

NOTES
    These variants are also available:

        $ gcloud alpha tasks queues set-iam-policy

        $ gcloud beta tasks queues set-iam-policy
```

### gcloud tasks queues update

```text
NAME
    gcloud tasks queues update - update a Cloud Tasks queue

SYNOPSIS
    gcloud tasks queues update QUEUE [--location=LOCATION]
        [--clear-http-header-override
          | --http-header-override=HEADER_FIELD: HEADER_VALUE]
        [--clear-http-method-override
          | --http-method-override=HTTP_METHOD_OVERRIDE]
        [--clear-http-oauth-service-account-email-override
          | --http-oauth-service-account-email-override=HTTP_OAUTH_SERVICE_ACCOUNT_EMAIL_OVERRIDE]
        [--clear-http-oauth-token-scope-override
          | --http-oauth-token-scope-override=HTTP_OAUTH_TOKEN_SCOPE_OVERRIDE]
        [--clear-http-oidc-service-account-email-override
          | --http-oidc-service-account-email-override=HTTP_OIDC_SERVICE_ACCOUNT_EMAIL_OVERRIDE]
        [--clear-http-oidc-token-audience-override
          | --http-oidc-token-audience-override=HTTP_OIDC_TOKEN_AUDIENCE_OVERRIDE]
        [--clear-http-uri-override
          | --http-uri-override=KEY:VALUE,[KEY:VALUE,...]]
        [--clear-log-sampling-ratio | --log-sampling-ratio=LOG_SAMPLING_RATIO]
        [--clear-max-attempts | --max-attempts=MAX_ATTEMPTS]
        [--clear-max-backoff | --max-backoff=MAX_BACKOFF]
        [--clear-max-concurrent-dispatches
          | --max-concurrent-dispatches=MAX_CONCURRENT_DISPATCHES]
        [--clear-max-dispatches-per-second
          | --max-dispatches-per-second=MAX_DISPATCHES_PER_SECOND]
        [--clear-max-doublings | --max-doublings=MAX_DOUBLINGS]
        [--clear-max-retry-duration | --max-retry-duration=MAX_RETRY_DURATION]
        [--clear-min-backoff | --min-backoff=MIN_BACKOFF]
        [--clear-routing-override | --routing-override=KEY:VALUE,[...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    The flags available to this command represent the fields of a queue that
    are mutable.

EXAMPLES
    To update a Cloud Tasks queue:

        $ gcloud tasks queues update my-queue --clear-max-attempts \
          --clear-max-retry-duration --clear-max-doublings \
          --clear-min-backoff --clear-max-backoff \
          --clear-max-dispatches-per-second \
          --clear-max-concurrent-dispatches --clear-routing-override

POSITIONAL ARGUMENTS
     QUEUE
        The queue to update.

FLAGS
     --location=LOCATION
        The location where we want to manage the queue or task. If not
        specified, uses the location of the current project's App Engine app if
        there is an associated app.

     At most one of these can be specified:

       --clear-http-header-override
          Clear the field corresponding to --http-header-override.

       --http-header-override=HEADER_FIELD: HEADER_VALUE
          If provided, the specified HTTP headers override the existing headers
          for all tasks in the queue. If a task has a header with the same Key
          as a queue-level header override, then the value of the task header
          will be overriden with the value of the queue-level header.
          Otherwise, the queue-level header will be added to the task headers.
          Header values can contain commas. This flag can be repeated. Repeated
          header fields will have their values overridden.

     At most one of these can be specified:

       --clear-http-method-override
          Clear the field corresponding to --http-method-override.

       --http-method-override=HTTP_METHOD_OVERRIDE
          If provided, the specified HTTP method type override is used for all
          tasks in the queue, no matter what is set at the task-level.

     At most one of these can be specified:

       --clear-http-oauth-service-account-email-override
          Clear the field corresponding to
          --http-oauth-service-account-email-override.

       --http-oauth-service-account-email-override=HTTP_OAUTH_SERVICE_ACCOUNT_EMAIL_OVERRIDE
          The service account email to be used for generating an OAuth2 access
          token to be included in the request sent to the target when executing
          the task. The service account must be within the same project as the
          queue. The caller must have 'iam.serviceAccounts.actAs' permission
          for the service account.

     At most one of these can be specified:

       --clear-http-oauth-token-scope-override
          Clear the field corresponding to --http-oauth-token-scope-override.

       --http-oauth-token-scope-override=HTTP_OAUTH_TOKEN_SCOPE_OVERRIDE
          The scope to be used when generating an OAuth2 access token to be
          included in the request sent to the target when executing the task.
          If not specified, 'https://www.googleapis.com/auth/cloud-platform'
          will be used.

     At most one of these can be specified:

       --clear-http-oidc-service-account-email-override
          Clear the field corresponding to
          --http-oidc-service-account-email-override.

       --http-oidc-service-account-email-override=HTTP_OIDC_SERVICE_ACCOUNT_EMAIL_OVERRIDE
          The service account email to be used for generating an OpenID Connect
          token to be included in the request sent to the target when executing
          the task. The service account must be within the same project as the
          queue. The caller must have 'iam.serviceAccounts.actAs' permission
          for the service account.

     At most one of these can be specified:

       --clear-http-oidc-token-audience-override
          Clear the field corresponding to --http-oidc-token-audience-override.

       --http-oidc-token-audience-override=HTTP_OIDC_TOKEN_AUDIENCE_OVERRIDE
          The audience to be used when generating an OpenID Connect token to be
          included in the request sent to the target when executing the task.
          If not specified, the URI specified in the target will be used.

     At most one of these can be specified:

       --clear-http-uri-override
          Clear the field corresponding to --http-uri-override.

       --http-uri-override=KEY:VALUE,[KEY:VALUE,...]
          If provided, the specified HTTP target URI override is used for all
          tasks in the queue depending on what is set as the mode. Allowed
          values for mode are: ALWAYS, IF_NOT_EXISTS. If not set, mode defaults
          to ALWAYS.

          KEY must be at least one of: [scheme, host, port, path, query, mode].
          Any missing keys will use the default.

     At most one of these can be specified:

       --clear-log-sampling-ratio
          Clear the field corresponding to --log-sampling-ratio.

       --log-sampling-ratio=LOG_SAMPLING_RATIO
          Specifies the fraction of operations to write to Cloud Logging. This
          field may contain any value between 0.0 and 1.0, inclusive. 0.0 is
          the default and means that no operations are logged.

     At most one of these can be specified:

       --clear-max-attempts
          Clear the field corresponding to --max-attempts.

       --max-attempts=MAX_ATTEMPTS
          The maximum number of attempts per task in the queue.

     At most one of these can be specified:

       --clear-max-backoff
          Clear the field corresponding to --max-backoff.

       --max-backoff=MAX_BACKOFF
          The maximum amount of time to wait before retrying a task after it
          fails. Must be a string that ends in 's', such as "5s".

     At most one of these can be specified:

       --clear-max-concurrent-dispatches
          Clear the field corresponding to --max-concurrent-dispatches.

       --max-concurrent-dispatches=MAX_CONCURRENT_DISPATCHES
          The maximum number of concurrent tasks that Cloud Tasks allows to be
          dispatched for this queue. After this threshold has been reached,
          Cloud Tasks stops dispatching tasks until the number of outstanding
          requests decreases.

     At most one of these can be specified:

       --clear-max-dispatches-per-second
          Clear the field corresponding to --max-dispatches-per-second.

       --max-dispatches-per-second=MAX_DISPATCHES_PER_SECOND
          The maximum rate at which tasks are dispatched from this queue.

     At most one of these can be specified:

       --clear-max-doublings
          Clear the field corresponding to --max-doublings.

       --max-doublings=MAX_DOUBLINGS
          The time between retries will double maxDoublings times.

          A tasks retry interval starts at minBackoff, then doubles
          maxDoublings times, then increases linearly, and finally retries
          retries at intervals of maxBackoff up to maxAttempts times.

          For example, if minBackoff is 10s, maxBackoff is 300s, and
          maxDoublings is 3, then the a task will first be retried in 10s. The
          retry interval will double three times, and then increase linearly by
          2^3 * 10s. Finally, the task will retry at intervals of maxBackoff
          until the task has been attempted maxAttempts times. Thus, the
          requests will retry at 10s, 20s, 40s, 80s, 160s, 240s, 300s, 300s.

     At most one of these can be specified:

       --clear-max-retry-duration
          Clear the field corresponding to --max-retry-duration.

       --max-retry-duration=MAX_RETRY_DURATION
          The time limit for retrying a failed task, measured from when the
          task was first run. Once the --max-retry-duration time has passed and
          the task has been attempted --max-attempts times, no further attempts
          will be made and the task will be deleted.

          Must be a string that ends in 's', such as "5s".

     At most one of these can be specified:

       --clear-min-backoff
          Clear the field corresponding to --min-backoff.

       --min-backoff=MIN_BACKOFF
          The minimum amount of time to wait before retrying a task after it
          fails. Must be a string that ends in 's', such as "5s".

     At most one of these can be specified:

       --clear-routing-override
          Clear the field corresponding to --routing-override.

       --routing-override=KEY:VALUE,[...]
          If provided, the specified App Engine route is used for all tasks in
          the queue, no matter what is set is at the task-level.

          KEY must be at least one of: [service, version, instance]. Any
          missing keys will use the default.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha tasks queues update

        $ gcloud beta tasks queues update
```

### gcloud beta tasks queues add-iam-policy-binding

```text
NAME
    gcloud beta tasks queues add-iam-policy-binding - add IAM policy binding
        for a tasks queue

SYNOPSIS
    gcloud beta tasks queues add-iam-policy-binding
        (QUEUE : --location=LOCATION) --member=PRINCIPAL --role=ROLE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta tasks queues create

```text
NAME
    gcloud beta tasks queues create - create a Cloud Tasks queue

SYNOPSIS
    gcloud beta tasks queues create QUEUE
        [--http-header-override=HEADER_FIELD: HEADER_VALUE]
        [--http-method-override=HTTP_METHOD_OVERRIDE]
        [--http-uri-override=KEY:VALUE,[KEY:VALUE,...]] [--location=LOCATION]
        [--log-sampling-ratio=LOG_SAMPLING_RATIO] [--max-attempts=MAX_ATTEMPTS]
        [--max-backoff=MAX_BACKOFF]
        [--max-concurrent-dispatches=MAX_CONCURRENT_DISPATCHES]
        [--max-dispatches-per-second=MAX_DISPATCHES_PER_SECOND]
        [--max-doublings=MAX_DOUBLINGS]
        [--max-retry-duration=MAX_RETRY_DURATION] [--min-backoff=MIN_BACKOFF]
        [--routing-override=KEY:VALUE,[...]] [--type=TYPE; default="push"]
        [[--http-oauth-service-account-email-override=HTTP_OAUTH_SERVICE_ACCOUNT_EMAIL_OVERRIDE : --http-oauth-token-scope-override=HTTP_OAUTH_TOKEN_SCOPE_OVERRIDE] | [--http-oidc-service-account-email-override=HTTP_OIDC_SERVICE_ACCOUNT_EMAIL_OVERRIDE : --http-oidc-token-audience-override=HTTP_OIDC_TOKEN_AUDIENCE_OVERRIDE]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta tasks queues create-app-engine-queue

```text
NAME
    gcloud beta tasks queues create-app-engine-queue - create a Cloud Tasks
        queue

SYNOPSIS
    gcloud beta tasks queues create-app-engine-queue QUEUE
        [--location=LOCATION] [--log-sampling-ratio=LOG_SAMPLING_RATIO]
        [--max-attempts=MAX_ATTEMPTS] [--max-backoff=MAX_BACKOFF]
        [--max-concurrent-dispatches=MAX_CONCURRENT_DISPATCHES]
        [--max-dispatches-per-second=MAX_DISPATCHES_PER_SECOND]
        [--max-doublings=MAX_DOUBLINGS]
        [--max-retry-duration=MAX_RETRY_DURATION] [--min-backoff=MIN_BACKOFF]
        [--routing-override=KEY:VALUE,[...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta tasks queues create-pull-queue

```text
NAME
    gcloud beta tasks queues create-pull-queue - create a pull queue

SYNOPSIS
    gcloud beta tasks queues create-pull-queue QUEUE [--location=LOCATION]
        [--max-attempts=MAX_ATTEMPTS] [--max-retry-duration=MAX_RETRY_DURATION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta tasks queues delete

```text
NAME
    gcloud beta tasks queues delete - delete a queue

SYNOPSIS
    gcloud beta tasks queues delete QUEUE [--location=LOCATION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta tasks queues describe

```text
NAME
    gcloud beta tasks queues describe - show details about a queue

SYNOPSIS
    gcloud beta tasks queues describe QUEUE [--location=LOCATION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta tasks queues get-iam-policy

```text
NAME
    gcloud beta tasks queues get-iam-policy - get the IAM policy for a queue

SYNOPSIS
    gcloud beta tasks queues get-iam-policy (QUEUE : --location=LOCATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta tasks queues list

```text
NAME
    gcloud beta tasks queues list - list all queues including their type

SYNOPSIS
    gcloud beta tasks queues list [--location=LOCATION] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta tasks queues pause

```text
NAME
    gcloud beta tasks queues pause - pause a queue

SYNOPSIS
    gcloud beta tasks queues pause QUEUE [--location=LOCATION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta tasks queues purge

```text
NAME
    gcloud beta tasks queues purge - purge a queue by deleting all of its tasks

SYNOPSIS
    gcloud beta tasks queues purge QUEUE [--location=LOCATION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta tasks queues remove-iam-policy-binding

```text
NAME
    gcloud beta tasks queues remove-iam-policy-binding - remove IAM policy
        binding of tasks queue

SYNOPSIS
    gcloud beta tasks queues remove-iam-policy-binding
        (QUEUE : --location=LOCATION) --member=PRINCIPAL --role=ROLE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta tasks queues resume

```text
NAME
    gcloud beta tasks queues resume - request to resume a paused or disabled
        queue

SYNOPSIS
    gcloud beta tasks queues resume QUEUE [--location=LOCATION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta tasks queues set-iam-policy

```text
NAME
    gcloud beta tasks queues set-iam-policy - set the IAM policy for a queue

SYNOPSIS
    gcloud beta tasks queues set-iam-policy (QUEUE : --location=LOCATION)
        POLICY_FILE [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta tasks queues update

```text
NAME
    gcloud beta tasks queues update - update a Cloud Tasks queue

SYNOPSIS
    gcloud beta tasks queues update QUEUE [--location=LOCATION]
        [--type=TYPE; default="push"]
        [--clear-http-header-override
          | --http-header-override=HEADER_FIELD: HEADER_VALUE]
        [--clear-http-method-override
          | --http-method-override=HTTP_METHOD_OVERRIDE]
        [--clear-http-oauth-service-account-email-override
          | --http-oauth-service-account-email-override=HTTP_OAUTH_SERVICE_ACCOUNT_EMAIL_OVERRIDE]
        [--clear-http-oauth-token-scope-override
          | --http-oauth-token-scope-override=HTTP_OAUTH_TOKEN_SCOPE_OVERRIDE]
        [--clear-http-oidc-service-account-email-override
          | --http-oidc-service-account-email-override=HTTP_OIDC_SERVICE_ACCOUNT_EMAIL_OVERRIDE]
        [--clear-http-oidc-token-audience-override
          | --http-oidc-token-audience-override=HTTP_OIDC_TOKEN_AUDIENCE_OVERRIDE]
        [--clear-http-uri-override
          | --http-uri-override=KEY:VALUE,[KEY:VALUE,...]]
        [--clear-log-sampling-ratio | --log-sampling-ratio=LOG_SAMPLING_RATIO]
        [--clear-max-attempts | --max-attempts=MAX_ATTEMPTS]
        [--clear-max-backoff | --max-backoff=MAX_BACKOFF]
        [--clear-max-concurrent-dispatches
          | --max-concurrent-dispatches=MAX_CONCURRENT_DISPATCHES]
        [--clear-max-dispatches-per-second
          | --max-dispatches-per-second=MAX_DISPATCHES_PER_SECOND]
        [--clear-max-doublings | --max-doublings=MAX_DOUBLINGS]
        [--clear-max-retry-duration | --max-retry-duration=MAX_RETRY_DURATION]
        [--clear-min-backoff | --min-backoff=MIN_BACKOFF]
        [--clear-routing-override | --routing-override=KEY:VALUE,[...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta tasks queues update-app-engine-queue

```text
NAME
    gcloud beta tasks queues update-app-engine-queue - update a Cloud Tasks
        queue

SYNOPSIS
    gcloud beta tasks queues update-app-engine-queue QUEUE
        [--location=LOCATION]
        [--clear-log-sampling-ratio | --log-sampling-ratio=LOG_SAMPLING_RATIO]
        [--clear-max-attempts | --max-attempts=MAX_ATTEMPTS]
        [--clear-max-backoff | --max-backoff=MAX_BACKOFF]
        [--clear-max-concurrent-dispatches
          | --max-concurrent-dispatches=MAX_CONCURRENT_DISPATCHES]
        [--clear-max-dispatches-per-second
          | --max-dispatches-per-second=MAX_DISPATCHES_PER_SECOND]
        [--clear-max-doublings | --max-doublings=MAX_DOUBLINGS]
        [--clear-max-retry-duration | --max-retry-duration=MAX_RETRY_DURATION]
        [--clear-min-backoff | --min-backoff=MIN_BACKOFF]
        [--clear-routing-override | --routing-override=KEY:VALUE,[...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha tasks queues add-iam-policy-binding

```text
NAME
    gcloud alpha tasks queues add-iam-policy-binding - add IAM policy binding
        for a tasks queue

SYNOPSIS
    gcloud alpha tasks queues add-iam-policy-binding
        (QUEUE : --location=LOCATION) --member=PRINCIPAL --role=ROLE
        [--condition=[KEY=VALUE,...] | --condition-from-file=PATH_TO_FILE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha tasks queues create

```text
NAME
    gcloud alpha tasks queues create - create a Cloud Tasks queue

SYNOPSIS
    gcloud alpha tasks queues create QUEUE
        [--http-header-override=HEADER_FIELD: HEADER_VALUE]
        [--http-method-override=HTTP_METHOD_OVERRIDE]
        [--http-uri-override=KEY:VALUE,[KEY:VALUE,...]] [--location=LOCATION]
        [--max-attempts=MAX_ATTEMPTS] [--max-backoff=MAX_BACKOFF]
        [--max-concurrent-tasks=MAX_CONCURRENT_TASKS]
        [--max-doublings=MAX_DOUBLINGS]
        [--max-retry-duration=MAX_RETRY_DURATION]
        [--max-tasks-dispatched-per-second=MAX_TASKS_DISPATCHED_PER_SECOND]
        [--min-backoff=MIN_BACKOFF] [--routing-override=KEY:VALUE,[...]]
        [[--http-oauth-service-account-email-override=HTTP_OAUTH_SERVICE_ACCOUNT_EMAIL_OVERRIDE : --http-oauth-token-scope-override=HTTP_OAUTH_TOKEN_SCOPE_OVERRIDE] | [--http-oidc-service-account-email-override=HTTP_OIDC_SERVICE_ACCOUNT_EMAIL_OVERRIDE : --http-oidc-token-audience-override=HTTP_OIDC_TOKEN_AUDIENCE_OVERRIDE]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha tasks queues create-app-engine-queue

```text
NAME
    gcloud alpha tasks queues create-app-engine-queue - create a Cloud Tasks
        queue

SYNOPSIS
    gcloud alpha tasks queues create-app-engine-queue QUEUE
        [--location=LOCATION] [--max-attempts=MAX_ATTEMPTS]
        [--max-backoff=MAX_BACKOFF]
        [--max-concurrent-tasks=MAX_CONCURRENT_TASKS]
        [--max-doublings=MAX_DOUBLINGS]
        [--max-retry-duration=MAX_RETRY_DURATION]
        [--max-tasks-dispatched-per-second=MAX_TASKS_DISPATCHED_PER_SECOND]
        [--min-backoff=MIN_BACKOFF] [--routing-override=KEY:VALUE,[...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha tasks queues create-pull-queue

```text
NAME
    gcloud alpha tasks queues create-pull-queue - create a pull queue

SYNOPSIS
    gcloud alpha tasks queues create-pull-queue QUEUE [--location=LOCATION]
        [--max-attempts=MAX_ATTEMPTS] [--max-retry-duration=MAX_RETRY_DURATION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha tasks queues delete

```text
NAME
    gcloud alpha tasks queues delete - delete a queue

SYNOPSIS
    gcloud alpha tasks queues delete QUEUE [--location=LOCATION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha tasks queues describe

```text
NAME
    gcloud alpha tasks queues describe - show details about a queue

SYNOPSIS
    gcloud alpha tasks queues describe QUEUE [--location=LOCATION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha tasks queues get-iam-policy

```text
NAME
    gcloud alpha tasks queues get-iam-policy - get the IAM policy for a queue

SYNOPSIS
    gcloud alpha tasks queues get-iam-policy (QUEUE : --location=LOCATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha tasks queues list

```text
NAME
    gcloud alpha tasks queues list - list all queues

SYNOPSIS
    gcloud alpha tasks queues list [--location=LOCATION] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha tasks queues pause

```text
NAME
    gcloud alpha tasks queues pause - pause a queue

SYNOPSIS
    gcloud alpha tasks queues pause QUEUE [--location=LOCATION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha tasks queues purge

```text
NAME
    gcloud alpha tasks queues purge - purge a queue by deleting all of its
        tasks

SYNOPSIS
    gcloud alpha tasks queues purge QUEUE [--location=LOCATION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha tasks queues remove-iam-policy-binding

```text
NAME
    gcloud alpha tasks queues remove-iam-policy-binding - remove IAM policy
        binding of a tasks queue

SYNOPSIS
    gcloud alpha tasks queues remove-iam-policy-binding
        (QUEUE : --location=LOCATION) --member=PRINCIPAL --role=ROLE
        [--all | --condition=[KEY=VALUE,...]
          | --condition-from-file=PATH_TO_FILE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha tasks queues resume

```text
NAME
    gcloud alpha tasks queues resume - request to resume a paused or disabled
        queue

SYNOPSIS
    gcloud alpha tasks queues resume QUEUE [--location=LOCATION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha tasks queues set-iam-policy

```text
NAME
    gcloud alpha tasks queues set-iam-policy - set the IAM policy for a queue

SYNOPSIS
    gcloud alpha tasks queues set-iam-policy (QUEUE : --location=LOCATION)
        POLICY_FILE [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the `get-iam-policy` example passes only `my-queue`; the queue resource takes its location from a fully specified name or `--location` (no property sets it), and gcloud 593.0.0 fails with "Error parsing [queue]" without it, so the runnable form adds `--location=us-central1`.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/tasks/queues (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
