---
source: https://docs.cloud.google.com/sdk/gcloud/reference/spanner/samples
---

# gcloud spanner samples

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud spanner samples backend

```text
NAME
    gcloud spanner samples backend - run the backend gRPC service for the given
        Cloud Spanner sample app

SYNOPSIS
    gcloud spanner samples backend APPNAME --instance-id=INSTANCE_ID
        [--database-id=DATABASE_ID] [--duration=DURATION; default="1h"]
        [--port=PORT] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command starts the backend gRPC service for the given sample
    application. Before starting the service, create the database and load any
    initial data with:

        $ gcloud spanner samples init APPNAME --instance-id=INSTANCE_ID

    After starting the service, generate traffic with:

        $ gcloud spanner samples workload APPNAME

    To run all three steps together, use:

        $ gcloud spanner samples run APPNAME --instance-id=INSTANCE_ID

EXAMPLES
    To run the backend gRPC service for the 'finance' sample app using instance
    'my-instance', run:

        $ gcloud spanner samples backend finance --instance-id=my-instance

POSITIONAL ARGUMENTS
     APPNAME
        The sample app name, e.g. "finance".

REQUIRED FLAGS
     --instance-id=INSTANCE_ID
        The Cloud Spanner instance ID for the sample app.

OPTIONAL FLAGS
     --database-id=DATABASE_ID
        The Cloud Spanner database ID for the sample app.

     --duration=DURATION; default="1h"
        Duration of time allowed to run before stopping the service.

     --port=PORT
        Port on which to receive gRPC requests.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha spanner samples backend

        $ gcloud beta spanner samples backend
```

### gcloud spanner samples init

```text
NAME
    gcloud spanner samples init - initialize a Cloud Spanner sample app

SYNOPSIS
    gcloud spanner samples init APPNAME --instance-id=INSTANCE_ID
        [--database-id=DATABASE_ID] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command creates a Cloud Spanner database in the given instance for the
    sample app and loads any initial data required by the application.

EXAMPLES
    To initialize the 'finance' sample app using instance 'my-instance', run:

        $ gcloud spanner samples init finance --instance-id=my-instance

    To initialize the 'finance-graph' sample app using instance 'my-instance',
    run:

        $ gcloud spanner samples init finance-graph --instance-id=my-instance

POSITIONAL ARGUMENTS
     APPNAME
        The sample app name, e.g. "finance", "finance-graph".

REQUIRED FLAGS
     --instance-id=INSTANCE_ID
        The Cloud Spanner instance ID for the sample app.

OPTIONAL FLAGS
     --database-id=DATABASE_ID
        ID of the new Cloud Spanner database to create for the sample app.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha spanner samples init

        $ gcloud beta spanner samples init
```

### gcloud spanner samples list

```text
NAME
    gcloud spanner samples list - list available sample applications

SYNOPSIS
    gcloud spanner samples list [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List available sample applications.

EXAMPLES
    To list available sample applications, run:

        $ gcloud spanner samples list

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

        $ gcloud alpha spanner samples list

        $ gcloud beta spanner samples list
```

### gcloud spanner samples run

```text
NAME
    gcloud spanner samples run - run the given Cloud Spanner sample app

SYNOPSIS
    gcloud spanner samples run APPNAME --instance-id=INSTANCE_ID [--no-cleanup]
        [--database-id=DATABASE_ID] [--duration=DURATION; default="1h"]
        [--skip-init] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Each Cloud Spanner sample application includes a backend gRPC service
    backed by a Cloud Spanner database and a workload script that generates
    service traffic. This command creates and initializes the Cloud Spanner
    database and runs both the backend service and workload script.

    These sample apps are open source and available at
    https://github.com/GoogleCloudPlatform/cloud-spanner-samples.

    To see a list of available sample apps, run:

        $ gcloud spanner samples list

EXAMPLES
    To run the 'finance' sample app using instance 'my-instance', run:

        $ gcloud spanner samples run finance --instance-id=my-instance

POSITIONAL ARGUMENTS
     APPNAME
        The sample app name, e.g. "finance".

REQUIRED FLAGS
     --instance-id=INSTANCE_ID
        The Cloud Spanner instance ID for the sample app.

OPTIONAL FLAGS
     --cleanup
        Delete the instance after running the sample app. Enabled by default,
        use --no-cleanup to disable.

     --database-id=DATABASE_ID
        ID of the new Cloud Spanner database to create for the sample app.

     --duration=DURATION; default="1h"
        Duration of time allowed to run the sample app before stopping the
        service.

     --skip-init
        Use an existing database instead of creating a new one.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha spanner samples run

        $ gcloud beta spanner samples run
```

### gcloud spanner samples workload

```text
NAME
    gcloud spanner samples workload - generate gRPC traffic for a given sample
        app's backend service

SYNOPSIS
    gcloud spanner samples workload APPNAME [--duration=DURATION; default="1h"]
        [--port=PORT] [--target-qps=TARGET_QPS] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Before sending traffic to the backend service, create the database and
    start the service with:

        $ gcloud spanner samples init APPNAME --instance-id=INSTANCE_ID
        $ gcloud spanner samples backend APPNAME --instance-id=INSTANCE_ID

    To run all three steps together, use:

        $ gcloud spanner samples run APPNAME --instance-id=INSTANCE_ID

EXAMPLES
    To generate traffic for the 'finance' sample app, run:

        $ gcloud spanner samples workload finance

POSITIONAL ARGUMENTS
     APPNAME
        The sample app name, e.g. "finance".

FLAGS
     --duration=DURATION; default="1h"
        Duration of time allowed to run before stopping the workload.

     --port=PORT
        Port of the running backend service.

     --target-qps=TARGET_QPS
        Target requests per second.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha spanner samples workload

        $ gcloud beta spanner samples workload
```

### gcloud beta spanner samples backend

```text
NAME
    gcloud beta spanner samples backend - run the backend gRPC service for the
        given Cloud Spanner sample app

SYNOPSIS
    gcloud beta spanner samples backend APPNAME --instance-id=INSTANCE_ID
        [--database-id=DATABASE_ID] [--duration=DURATION; default="1h"]
        [--port=PORT] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta spanner samples init

```text
NAME
    gcloud beta spanner samples init - initialize a Cloud Spanner sample app

SYNOPSIS
    gcloud beta spanner samples init APPNAME --instance-id=INSTANCE_ID
        [--database-id=DATABASE_ID] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta spanner samples list

```text
NAME
    gcloud beta spanner samples list - list available sample applications

SYNOPSIS
    gcloud beta spanner samples list [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta spanner samples run

```text
NAME
    gcloud beta spanner samples run - run the given Cloud Spanner sample app

SYNOPSIS
    gcloud beta spanner samples run APPNAME --instance-id=INSTANCE_ID
        [--no-cleanup] [--database-id=DATABASE_ID]
        [--duration=DURATION; default="1h"] [--skip-init]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta spanner samples workload

```text
NAME
    gcloud beta spanner samples workload - generate gRPC traffic for a given
        sample app's backend service

SYNOPSIS
    gcloud beta spanner samples workload APPNAME
        [--duration=DURATION; default="1h"] [--port=PORT]
        [--target-qps=TARGET_QPS] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha spanner samples backend

```text
NAME
    gcloud alpha spanner samples backend - run the backend gRPC service for the
        given Cloud Spanner sample app

SYNOPSIS
    gcloud alpha spanner samples backend APPNAME --instance-id=INSTANCE_ID
        [--database-id=DATABASE_ID] [--duration=DURATION; default="1h"]
        [--port=PORT] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha spanner samples init

```text
NAME
    gcloud alpha spanner samples init - initialize a Cloud Spanner sample app

SYNOPSIS
    gcloud alpha spanner samples init APPNAME --instance-id=INSTANCE_ID
        [--database-id=DATABASE_ID] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha spanner samples list

```text
NAME
    gcloud alpha spanner samples list - list available sample applications

SYNOPSIS
    gcloud alpha spanner samples list [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha spanner samples run

```text
NAME
    gcloud alpha spanner samples run - run the given Cloud Spanner sample app

SYNOPSIS
    gcloud alpha spanner samples run APPNAME --instance-id=INSTANCE_ID
        [--no-cleanup] [--database-id=DATABASE_ID]
        [--duration=DURATION; default="1h"] [--skip-init]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha spanner samples workload

```text
NAME
    gcloud alpha spanner samples workload - generate gRPC traffic for a given
        sample app's backend service

SYNOPSIS
    gcloud alpha spanner samples workload APPNAME
        [--duration=DURATION; default="1h"] [--port=PORT]
        [--target-qps=TARGET_QPS] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/spanner/samples (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
