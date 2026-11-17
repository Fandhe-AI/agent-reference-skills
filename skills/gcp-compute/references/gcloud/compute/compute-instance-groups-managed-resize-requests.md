---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/instance-groups/managed/resize-requests
---

# gcloud compute instance-groups managed resize-requests

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute instance-groups managed resize-requests cancel

```text
NAME
    gcloud compute instance-groups managed resize-requests cancel - cancel a
        Compute Engine managed instance group resize request

SYNOPSIS
    gcloud compute instance-groups managed resize-requests cancel NAME
        --resize-requests=RESIZE_REQUEST_NAMES,[...]
        [--region=REGION | --zone=ZONE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute instance-groups managed resize-requests cancel cancels one
    or more Compute Engine managed instance group resize requests.

    You can only cancel a resize request when it is in the ACCEPTED state.

EXAMPLES
    To cancel a resize request for a managed instance group, run the following
    command:

        $ gcloud compute instance-groups managed resize-requests cancel \
            my-mig --resize-requests=resize-request-1

POSITIONAL ARGUMENTS
     NAME
        Name of the managed instance group to operate on.

REQUIRED FLAGS
     --resize-requests=RESIZE_REQUEST_NAMES,[...]
        A list of comma-separated names of resize requests to cancel.

OPTIONAL FLAGS
     At most one of these can be specified:

       --region=REGION
          Region of the managed instance group to operate on. If not specified,
          you might be prompted to select a region (interactive mode only).

          A list of regions can be fetched by running:

              $ gcloud compute regions list

          Overrides the default compute/region property value for this command
          invocation.

       --zone=ZONE
          Zone of the managed instance group to operate on. If not specified,
          you might be prompted to select a zone (interactive mode only).

          A list of zones can be fetched by running:

              $ gcloud compute zones list

          Overrides the default compute/zone property value for this command
          invocation.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute instance-groups managed resize-requests cancel

        $ gcloud beta compute instance-groups managed resize-requests cancel
```

### gcloud compute instance-groups managed resize-requests create

```text
NAME
    gcloud compute instance-groups managed resize-requests create - create a
        Compute Engine managed instance group resize request

SYNOPSIS
    gcloud compute instance-groups managed resize-requests create NAME
        --resize-request=RESIZE_REQUEST_NAME
        (--instances=INSTANCE,[INSTANCE,...] | --resize-by=RESIZE_BY)
        [--requested-run-duration=REQUESTED_RUN_DURATION]
        [--region=REGION | --zone=ZONE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a Compute Engine managed instance group resize request.

EXAMPLES
    To create a resize request for a managed instance group, run the following
    command:

        $ gcloud compute instance-groups managed resize-requests create \
            my-mig --resize-request=resize-request-1 --resize-by=1 \
            --requested-run-duration=3d1h30s

POSITIONAL ARGUMENTS
     NAME
        Name of the managed instance group to operate on.

REQUIRED FLAGS
     --resize-request=RESIZE_REQUEST_NAME
        The name of the resize request to create.

     Exactly one of these must be specified:

       --instances=INSTANCE,[INSTANCE,...]
          A comma-separated list of instance names. The number of names you
          provide determines the number of instances to create with this resize
          request. The group's target size increases by this count.

       --resize-by=RESIZE_BY
          The number of instances to create with this resize request. Instances
          have automatically-generated names. The group's target size increases
          by this number.

OPTIONAL FLAGS
     --requested-run-duration=REQUESTED_RUN_DURATION
        The time you need the requested VMs to run before being automatically
        deleted. The value must be formatted as the number of days, hours,
        minutes, or seconds followed by d, h, m, and s respectively. For
        example, specify 30m for a duration of 30 minutes or 1d2h3m4s for 1
        day, 2 hours, 3 minutes, and 4 seconds. The value must be between 10m
        (10 minutes) and 7d (7 days).

            If you want the managed instance group to consume a reservation or use
            FLEX_START provisioning model, then this flag is optional. Otherwise,
            it's required.

     At most one of these can be specified:

       --region=REGION
          Region of the managed instance group to operate on. If not specified,
          you might be prompted to select a region (interactive mode only).

          A list of regions can be fetched by running:

              $ gcloud compute regions list

          Overrides the default compute/region property value for this command
          invocation.

       --zone=ZONE
          Zone of the managed instance group to operate on. If not specified,
          you might be prompted to select a zone (interactive mode only).

          A list of zones can be fetched by running:

              $ gcloud compute zones list

          Overrides the default compute/zone property value for this command
          invocation.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute instance-groups managed resize-requests create

        $ gcloud beta compute instance-groups managed resize-requests create
```

### gcloud compute instance-groups managed resize-requests delete

```text
NAME
    gcloud compute instance-groups managed resize-requests delete - delete a
        Compute Engine managed instance group resize request

SYNOPSIS
    gcloud compute instance-groups managed resize-requests delete NAME
        --resize-requests=RESIZE_REQUEST_NAMES,[...]
        [--region=REGION | --zone=ZONE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute instance-groups managed resize-requests delete deletes one
    or more Compute Engine managed instance group resize requests.

    You can only delete a request when it is in a state SUCCEEDED, FAILED, or
    CANCELLED.

EXAMPLES
    To delete a resize request for a managed instance group, run the following
    command:

        $ gcloud compute instance-groups managed resize-requests delete \
            my-mig --resize-requests=resize-request-1

POSITIONAL ARGUMENTS
     NAME
        Name of the managed instance group to operate on.

REQUIRED FLAGS
     --resize-requests=RESIZE_REQUEST_NAMES,[...]
        A list of comma-separated names of resize requests to delete.

OPTIONAL FLAGS
     At most one of these can be specified:

       --region=REGION
          Region of the managed instance group to operate on. If not specified,
          you might be prompted to select a region (interactive mode only).

          A list of regions can be fetched by running:

              $ gcloud compute regions list

          Overrides the default compute/region property value for this command
          invocation.

       --zone=ZONE
          Zone of the managed instance group to operate on. If not specified,
          you might be prompted to select a zone (interactive mode only).

          A list of zones can be fetched by running:

              $ gcloud compute zones list

          Overrides the default compute/zone property value for this command
          invocation.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute instance-groups managed resize-requests delete

        $ gcloud beta compute instance-groups managed resize-requests delete
```

### gcloud compute instance-groups managed resize-requests describe

```text
NAME
    gcloud compute instance-groups managed resize-requests describe - describe
        a Compute Engine managed instance group resize request resource

SYNOPSIS
    gcloud compute instance-groups managed resize-requests describe NAME
        --resize-request=RESIZE_REQUEST_NAME [--region=REGION | --zone=ZONE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute instance-groups managed resize-requests describe describes a
    Compute Engine managed instance group resize request resource.

EXAMPLES
    To describe a resize request for a managed instance group, run the
    following command:

        $ gcloud compute instance-groups managed resize-requests describe \
            my-mig --resize-request=resize-request-1

POSITIONAL ARGUMENTS
     NAME
        Name of the managed instance group to operate on.

REQUIRED FLAGS
     --resize-request=RESIZE_REQUEST_NAME
        The name of the resize request to describe.

OPTIONAL FLAGS
     At most one of these can be specified:

       --region=REGION
          Region of the managed instance group to operate on. If not specified,
          you might be prompted to select a region (interactive mode only).

          A list of regions can be fetched by running:

              $ gcloud compute regions list

          Overrides the default compute/region property value for this command
          invocation.

       --zone=ZONE
          Zone of the managed instance group to operate on. If not specified,
          you might be prompted to select a zone (interactive mode only).

          A list of zones can be fetched by running:

              $ gcloud compute zones list

          Overrides the default compute/zone property value for this command
          invocation.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute instance-groups managed resize-requests \
            describe

        $ gcloud beta compute instance-groups managed resize-requests \
            describe
```

### gcloud compute instance-groups managed resize-requests list

```text
NAME
    gcloud compute instance-groups managed resize-requests list - list Compute
        Engine managed instance group resize requests

SYNOPSIS
    gcloud compute instance-groups managed resize-requests list NAME
        [--region=REGION | --zone=ZONE] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute instance-groups managed resize-requests list displays all
    Compute Engine resize requests in a managed instance group.

EXAMPLES
    To list all resize requests in a managed instance group in table form, run:

        $ gcloud compute instance-groups managed resize-requests list \
            example-managed-instance-group --zone=us-central1-a

    To list the URIs of all resize requests in a managed instance group, run:

        $ gcloud compute instance-groups managed resize-requests list \
            example-managed-instance-group --zone=us-central1-a --uri

POSITIONAL ARGUMENTS
     NAME
        Name of the managed instance group to operate on.

FLAGS
     At most one of these can be specified:

       --region=REGION
          Region of the managed instance group to operate on. If not specified,
          you might be prompted to select a region (interactive mode only).

          A list of regions can be fetched by running:

              $ gcloud compute regions list

          Overrides the default compute/region property value for this command
          invocation.

       --zone=ZONE
          Zone of the managed instance group to operate on. If not specified,
          you might be prompted to select a zone (interactive mode only).

          A list of zones can be fetched by running:

              $ gcloud compute zones list

          Overrides the default compute/zone property value for this command
          invocation.

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

        $ gcloud alpha compute instance-groups managed resize-requests list

        $ gcloud beta compute instance-groups managed resize-requests list
```

### gcloud beta compute instance-groups managed resize-requests cancel

```text
NAME
    gcloud beta compute instance-groups managed resize-requests cancel - cancel
        a Compute Engine managed instance group resize request

SYNOPSIS
    gcloud beta compute instance-groups managed resize-requests cancel NAME
        --resize-requests=RESIZE_REQUEST_NAMES,[...]
        [--region=REGION | --zone=ZONE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute instance-groups managed resize-requests create

```text
NAME
    gcloud beta compute instance-groups managed resize-requests create - create
        a Compute Engine managed instance group resize request

SYNOPSIS
    gcloud beta compute instance-groups managed resize-requests create NAME
        --resize-request=RESIZE_REQUEST_NAME
        (--instances=INSTANCE,[INSTANCE,...] | --resize-by=RESIZE_BY)
        [--requested-run-duration=REQUESTED_RUN_DURATION]
        [--region=REGION | --zone=ZONE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute instance-groups managed resize-requests delete

```text
NAME
    gcloud beta compute instance-groups managed resize-requests delete - delete
        a Compute Engine managed instance group resize request

SYNOPSIS
    gcloud beta compute instance-groups managed resize-requests delete NAME
        --resize-requests=RESIZE_REQUEST_NAMES,[...]
        [--region=REGION | --zone=ZONE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute instance-groups managed resize-requests describe

```text
NAME
    gcloud beta compute instance-groups managed resize-requests describe -
        describe a Compute Engine managed instance group resize request
        resource

SYNOPSIS
    gcloud beta compute instance-groups managed resize-requests describe NAME
        --resize-request=RESIZE_REQUEST_NAME [--region=REGION | --zone=ZONE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute instance-groups managed resize-requests list

```text
NAME
    gcloud beta compute instance-groups managed resize-requests list - list
        Compute Engine managed instance group resize requests

SYNOPSIS
    gcloud beta compute instance-groups managed resize-requests list NAME
        [--region=REGION | --zone=ZONE] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute instance-groups managed resize-requests cancel

```text
NAME
    gcloud alpha compute instance-groups managed resize-requests cancel -
        cancel a Compute Engine managed instance group resize request

SYNOPSIS
    gcloud alpha compute instance-groups managed resize-requests cancel NAME
        (--resize-request=RESIZE_REQUEST_NAME
          | --resize-requests=RESIZE_REQUEST_NAMES,[...])
        [--region=REGION | --zone=ZONE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute instance-groups managed resize-requests create

```text
NAME
    gcloud alpha compute instance-groups managed resize-requests create -
        create a Compute Engine managed instance group resize request

SYNOPSIS
    gcloud alpha compute instance-groups managed resize-requests create NAME
        --resize-request=RESIZE_REQUEST_NAME
        (--instances=INSTANCE,[INSTANCE,...] | --resize-by=RESIZE_BY)
        [--requested-run-duration=REQUESTED_RUN_DURATION]
        [--region=REGION | --zone=ZONE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute instance-groups managed resize-requests delete

```text
NAME
    gcloud alpha compute instance-groups managed resize-requests delete -
        delete a Compute Engine managed instance group resize request

SYNOPSIS
    gcloud alpha compute instance-groups managed resize-requests delete NAME
        --resize-requests=RESIZE_REQUEST_NAMES,[...]
        [--region=REGION | --zone=ZONE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute instance-groups managed resize-requests describe

```text
NAME
    gcloud alpha compute instance-groups managed resize-requests describe -
        describe a Compute Engine managed instance group resize request
        resource

SYNOPSIS
    gcloud alpha compute instance-groups managed resize-requests describe NAME
        --resize-request=RESIZE_REQUEST_NAME [--region=REGION | --zone=ZONE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute instance-groups managed resize-requests list

```text
NAME
    gcloud alpha compute instance-groups managed resize-requests list - list
        Compute Engine managed instance group resize requests

SYNOPSIS
    gcloud alpha compute instance-groups managed resize-requests list NAME
        [--region=REGION | --zone=ZONE] [--no-color] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/instance-groups/managed/resize-requests (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
