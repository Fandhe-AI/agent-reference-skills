---
source: https://docs.cloud.google.com/sdk/gcloud/reference/ids/endpoints
---

# gcloud ids endpoints

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud ids endpoints create

```text
NAME
    gcloud ids endpoints create - create a Cloud IDS endpoint

SYNOPSIS
    gcloud ids endpoints create (ENDPOINT : --zone=ZONE) --network=NETWORK
        --severity=SEVERITY [--async] [--description=DESCRIPTION]
        [--enable-traffic-logs] [--labels=[KEY=VALUE,...]]
        [--max-wait=MAX_WAIT; default="60m"]
        [--threat-exceptions=[exc1,exc2,...,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create an endpoint for the specified VPC network. Successful creation of an
    endpoint results in an endpoint in READY state. Check the progress of
    endpoint creation by using gcloud alpha ids endpoints list.

    For more examples, refer to the EXAMPLES section below.

EXAMPLES
    To create an endpoint called my-endpoint for VPC network my-net, in zone
    us-central1-a, alerting on LOW threats or higher, run:

        $ gcloud ids endpoints create my-endpoint --network=my-net \
            --zone=us-central1-a --project=my-project --severity=LOW

    To create an endpoint called my-endpoint for VPC network my-net, in zone
    us-central1-a, alerting on LOW threats or higher, excluding threat IDs 1000
    and 2000, run:

        $ gcloud ids endpoints create my-endpoint --network=my-net \
            --zone=us-central1-a --project=my-project --severity=LOW \
            --threat-exceptions=1000,2000

POSITIONAL ARGUMENTS
     Endpoint resource - endpoint. The arguments in this group can be used to
     specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument endpoint on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ENDPOINT
          ID of the endpoint or fully qualified identifier for the endpoint.

          To set the endpoint attribute:
          + provide the argument endpoint on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --zone=ZONE
          Zone of the endpoint.

          To set the zone attribute:
          + provide the argument endpoint on the command line with a fully
            specified name;
          + provide the argument --zone on the command line.

REQUIRED FLAGS
     --network=NETWORK
        Name of the VPC network to monitor

     --severity=SEVERITY
        Minimum severity of threats to report on. SEVERITY must be one of:
        INFORMATIONAL, LOW, MEDIUM, HIGH, CRITICAL.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete. The default is True. Enabled by default, use --no-async to
        disable.

     --description=DESCRIPTION
        Description of the endpoint.

     --enable-traffic-logs
        Whether to enable traffic logs on the endpoint. Enabling traffic logs
        can generate a large number of logs which can increase costs in Cloud
        Logging.

     --labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to add.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

     --max-wait=MAX_WAIT; default="60m"
        Time to synchronously wait for the operation to complete, after which
        the operation continues asynchronously. Ignored if --no-async isn't
        specified. See $ gcloud topic datetimes for information on time
        formats.

     --threat-exceptions=[exc1,exc2,...,...]
        List of threat IDs to be excepted from alerting. Passing empty list
        clears the exceptions.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha ids endpoints create

        $ gcloud beta ids endpoints create
```

### gcloud ids endpoints delete

```text
NAME
    gcloud ids endpoints delete - delete a Cloud IDS endpoint

SYNOPSIS
    gcloud ids endpoints delete (ENDPOINT : --zone=ZONE) [--async]
        [--max-wait=MAX_WAIT; default="60m"] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a Cloud IDS endpoint.

EXAMPLES
    To delete an endpoint called my-ep in project my-project and zone
    us-central1-a, run:

        $ gcloud ids endpoints delete my-ep --project=my-project \
            --zone=us-central1-a

    OR

        $ gcloud ids endpoints delete \
            projects/myproject/locations/us-central1-a/endpoints/my-ep

POSITIONAL ARGUMENTS
     Endpoint resource - endpoint. The arguments in this group can be used to
     specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument endpoint on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ENDPOINT
          ID of the endpoint or fully qualified identifier for the endpoint.

          To set the endpoint attribute:
          + provide the argument endpoint on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --zone=ZONE
          Zone of the endpoint.

          To set the zone attribute:
          + provide the argument endpoint on the command line with a fully
            specified name;
          + provide the argument --zone on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete. The default is True. Enabled by default, use --no-async to
        disable.

     --max-wait=MAX_WAIT; default="60m"
        Time to synchronously wait for the operation to complete, after which
        the operation continues asynchronously. Ignored if --no-async isn't
        specified. See $ gcloud topic datetimes for information on time
        formats.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha ids endpoints delete

        $ gcloud beta ids endpoints delete
```

### gcloud ids endpoints describe

```text
NAME
    gcloud ids endpoints describe - describe a Cloud IDS endpoint

SYNOPSIS
    gcloud ids endpoints describe (ENDPOINT : --zone=ZONE)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a Cloud IDS endpoint.

EXAMPLES
    To get a description of a endpoint called my-ep in project my-project and
    zone us-central1-a, run:

        $ gcloud ids endpoints describe my-ep --project=my-project \
            --zone=us-central1-a

    OR

        $ gcloud ids endpoints describe \
            projects/myproject/locations/us-central1-a/endpoints/my-ep

POSITIONAL ARGUMENTS
     Endpoint resource - endpoint. The arguments in this group can be used to
     specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument endpoint on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ENDPOINT
          ID of the endpoint or fully qualified identifier for the endpoint.

          To set the endpoint attribute:
          + provide the argument endpoint on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --zone=ZONE
          Zone of the endpoint.

          To set the zone attribute:
          + provide the argument endpoint on the command line with a fully
            specified name;
          + provide the argument --zone on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha ids endpoints describe

        $ gcloud beta ids endpoints describe
```

### gcloud ids endpoints list

```text
NAME
    gcloud ids endpoints list - list Cloud IDS endpoints

SYNOPSIS
    gcloud ids endpoints list [--project=PROJECT_ID] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List Cloud IDS endpoints in a project.

EXAMPLES
        $ gcloud ids endpoints list --project=my-project

    The project is automatically read from the core/project property if it is
    defined.

COMMONLY USED FLAGS
     --project=PROJECT_ID
        The Google Cloud project ID to use for this invocation. If omitted,
        then the current project is assumed; the current project can be listed
        using gcloud config list --format='text(core.project)' and can be set
        using gcloud config set project PROJECTID.

        --project and its fallback core/project property play two roles in the
        invocation: they specify both the project of the resource to operate
        on, and the project for API enablement checks, quota, and billing. To
        specify a different project for quota and billing, use the
        --billing-project flag or the billing/quota_project property.

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

        $ gcloud alpha ids endpoints list

        $ gcloud beta ids endpoints list
```

### gcloud ids endpoints update

```text
NAME
    gcloud ids endpoints update - update an existing Cloud IDS endpoint

SYNOPSIS
    gcloud ids endpoints update (ENDPOINT : --zone=ZONE) [--async]
        [--max-wait=MAX_WAIT; default="60m"]
        [--threat-exceptions=[exc1,exc2,...,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update the endpoint for the specified VPC network. Check the progress of
    endpoint update by using gcloud alpha ids endpoints list.

    For more examples, refer to the EXAMPLES section below.

EXAMPLES
    To update an endpoint called my-endpoint, excluding threat IDs 1000 and
    2000, run:

        $ gcloud ids endpoints update my-endpoint \
            --threat-exceptions=1000,2000

    To update an endpoint called my-endpoint, clearing the excluded threat
    list, run:

        $ gcloud ids endpoints update my-endpoint --threat-exceptions=

POSITIONAL ARGUMENTS
     Endpoint resource - endpoint. The arguments in this group can be used to
     specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument endpoint on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ENDPOINT
          ID of the endpoint or fully qualified identifier for the endpoint.

          To set the endpoint attribute:
          + provide the argument endpoint on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --zone=ZONE
          Zone of the endpoint.

          To set the zone attribute:
          + provide the argument endpoint on the command line with a fully
            specified name;
          + provide the argument --zone on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete. The default is True. Enabled by default, use --no-async to
        disable.

     --max-wait=MAX_WAIT; default="60m"
        Time to synchronously wait for the operation to complete, after which
        the operation continues asynchronously. Ignored if --no-async isn't
        specified. See $ gcloud topic datetimes for information on time
        formats.

     --threat-exceptions=[exc1,exc2,...,...]
        List of threat IDs to be excepted from alerting. Passing empty list
        clears the exceptions.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha ids endpoints update

        $ gcloud beta ids endpoints update
```

### gcloud beta ids endpoints create

```text
NAME
    gcloud beta ids endpoints create - create a Cloud IDS endpoint

SYNOPSIS
    gcloud beta ids endpoints create (ENDPOINT : --zone=ZONE) --network=NETWORK
        --severity=SEVERITY [--async] [--description=DESCRIPTION]
        [--enable-traffic-logs] [--labels=[KEY=VALUE,...]]
        [--max-wait=MAX_WAIT; default="60m"]
        [--threat-exceptions=[exc1,exc2,...,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta ids endpoints delete

```text
NAME
    gcloud beta ids endpoints delete - delete a Cloud IDS endpoint

SYNOPSIS
    gcloud beta ids endpoints delete (ENDPOINT : --zone=ZONE) [--async]
        [--max-wait=MAX_WAIT; default="60m"] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta ids endpoints describe

```text
NAME
    gcloud beta ids endpoints describe - describe a Cloud IDS endpoint

SYNOPSIS
    gcloud beta ids endpoints describe (ENDPOINT : --zone=ZONE)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta ids endpoints list

```text
NAME
    gcloud beta ids endpoints list - list Cloud IDS endpoints

SYNOPSIS
    gcloud beta ids endpoints list [--project=PROJECT_ID] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta ids endpoints update

```text
NAME
    gcloud beta ids endpoints update - update an existing Cloud IDS endpoint

SYNOPSIS
    gcloud beta ids endpoints update (ENDPOINT : --zone=ZONE) [--async]
        [--max-wait=MAX_WAIT; default="60m"]
        [--threat-exceptions=[exc1,exc2,...,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha ids endpoints create

```text
NAME
    gcloud alpha ids endpoints create - create a Cloud IDS endpoint

SYNOPSIS
    gcloud alpha ids endpoints create (ENDPOINT : --zone=ZONE)
        --network=NETWORK --severity=SEVERITY [--async]
        [--description=DESCRIPTION] [--enable-traffic-logs]
        [--labels=[KEY=VALUE,...]] [--max-wait=MAX_WAIT; default="60m"]
        [--threat-exceptions=[exc1,exc2,...,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha ids endpoints delete

```text
NAME
    gcloud alpha ids endpoints delete - delete a Cloud IDS endpoint

SYNOPSIS
    gcloud alpha ids endpoints delete (ENDPOINT : --zone=ZONE) [--async]
        [--max-wait=MAX_WAIT; default="60m"] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha ids endpoints describe

```text
NAME
    gcloud alpha ids endpoints describe - describe a Cloud IDS endpoint

SYNOPSIS
    gcloud alpha ids endpoints describe (ENDPOINT : --zone=ZONE)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha ids endpoints list

```text
NAME
    gcloud alpha ids endpoints list - list Cloud IDS endpoints

SYNOPSIS
    gcloud alpha ids endpoints list [--project=PROJECT_ID]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha ids endpoints update

```text
NAME
    gcloud alpha ids endpoints update - update an existing Cloud IDS endpoint

SYNOPSIS
    gcloud alpha ids endpoints update (ENDPOINT : --zone=ZONE) [--async]
        [--max-wait=MAX_WAIT; default="60m"]
        [--threat-exceptions=[exc1,exc2,...,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/ids/endpoints (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
