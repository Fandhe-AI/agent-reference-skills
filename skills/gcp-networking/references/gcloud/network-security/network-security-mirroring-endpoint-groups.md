---
source: https://docs.cloud.google.com/sdk/gcloud/reference/network-security/mirroring-endpoint-groups
---

# gcloud network-security mirroring-endpoint-groups

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud network-security mirroring-endpoint-groups create

```text
NAME
    gcloud network-security mirroring-endpoint-groups create - create a
        Mirroring Endpoint Group

SYNOPSIS
    gcloud network-security mirroring-endpoint-groups create
        (MIRRORING_ENDPOINT_GROUP : --location=LOCATION)
        ([--mirroring-deployment-group=MIRRORING_DEPLOYMENT_GROUP
          : --mirroring-deployment-group-location=MIRRORING_DEPLOYMENT_GROUP_LOCATION --mirroring-deployment-group-project=MIRRORING_DEPLOYMENT_GROUP_PROJECT])
        [--async] [--description=DESCRIPTION] [--labels=[KEY=VALUE,...]]
        [--max-wait=MAX_WAIT; default="20m"] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a mirroring endpoint group. Successful creation of an endpoint group
    results in an endpoint group in ACTIVE state. Check the progress of
    endpoint group creation by using gcloud network-security
    mirroring-endpoint-groups list.

    For more examples, refer to the EXAMPLES section below.

EXAMPLES
    To create a mirroring endpoint group called my-endpoint-group, in project
    ID my-project, run:        $ gcloud network-security mirroring-endpoint-groups create \
            my-endpoint-group --project=my-project --location=global \
            --mirroring-deployment-group=my-deployment-group

    OR

        $ gcloud network-security mirroring-endpoint-groups create \
            my-endpoint-group --project=my-project --location=global \
            --mirroring-deployment-group=projects/my-project/locations/\
        global/mirroringDeploymentGroups/my-deployment-group

    OR

        $ gcloud network-security mirroring-endpoint-groups create \
            projects/my-project/locations/global/mirroringEndpointGroups/\
        my-endpoint-group \
            --mirroring-deployment-group=projects/my-project/locations/\
        global/mirroringDeploymentGroups/my-deployment-group

    OR

        $ gcloud network-security mirroring-endpoint-groups create \
            my-endpoint-group --project=my-project --location=global \
            --mirroring-deployment-group=projects/my-project/locations/\
        global/mirroringDeploymentGroups/my-deployment-group \
            --description='new description'

POSITIONAL ARGUMENTS
     Mirroring endpoint group resource - Mirroring Endpoint Group. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument MIRRORING_ENDPOINT_GROUP on the command line
        with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       MIRRORING_ENDPOINT_GROUP
          ID of the mirroring endpoint group or fully qualified identifier for
          the mirroring endpoint group.

          To set the endpoint-group-id attribute:
          + provide the argument MIRRORING_ENDPOINT_GROUP on the command
            line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location of the mirroring endpoint group.

          To set the location attribute:
          + provide the argument MIRRORING_ENDPOINT_GROUP on the command line
            with a fully specified name;
          + provide the argument --location on the command line.

REQUIRED FLAGS
     This must be specified.

       Mirroring deployment group resource - Mirroring Deployment Group. The
       arguments in this group can be used to specify the attributes of this
       resource.

       --mirroring-deployment-group=MIRRORING_DEPLOYMENT_GROUP
          ID of the mirroring deployment group or fully qualified identifier
          for the mirroring deployment group.

          To set the id attribute:
          + provide the argument --mirroring-deployment-group on the command
            line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --mirroring-deployment-group-location=MIRRORING_DEPLOYMENT_GROUP_LOCATION
          Location of the mirroring deployment group.

          To set the location attribute:
          + provide the argument --mirroring-deployment-group on the command
            line with a fully specified name;
          + provide the argument --mirroring-deployment-group-location on the
            command line;
          + provide the argument --location on the command line;
          + provide the argument MIRRORING_ENDPOINT_GROUP on the command line
            with a fully specified name.

       --mirroring-deployment-group-project=MIRRORING_DEPLOYMENT_GROUP_PROJECT
          Project of the mirroring deployment group.

          To set the project attribute:
          + provide the argument --mirroring-deployment-group on the command
            line with a fully specified name;
          + provide the argument --mirroring-deployment-group-project on the
            command line;
          + provide the argument --project on the command line;
          + set the property core/project;
          + provide the argument MIRRORING_ENDPOINT_GROUP on the command line
            with a fully specified name.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete. The default is True. Enabled by default, use --no-async to
        disable.

     --description=DESCRIPTION
        Description of the endpoint

     --labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to add.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

     --max-wait=MAX_WAIT; default="20m"
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

        $ gcloud alpha network-security mirroring-endpoint-groups create

        $ gcloud beta network-security mirroring-endpoint-groups create
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud network-security mirroring-endpoint-groups create my-endpoint-group \
    --project=my-project \
    --location=global \
    --mirroring-deployment-group=projects/my-project/locations/global/mirroringDeploymentGroups/my-deployment-group

gcloud network-security mirroring-endpoint-groups create projects/my-project/locations/global/mirroringEndpointGroups/my-endpoint-group \
    --mirroring-deployment-group=projects/my-project/locations/global/mirroringDeploymentGroups/my-deployment-group

gcloud network-security mirroring-endpoint-groups create my-endpoint-group \
    --project=my-project \
    --location=global \
    --mirroring-deployment-group=projects/my-project/locations/global/mirroringDeploymentGroups/my-deployment-group \
    --description='new description'
```

### gcloud network-security mirroring-endpoint-groups delete

```text
NAME
    gcloud network-security mirroring-endpoint-groups delete - delete a
        Mirroring Endpoint Group

SYNOPSIS
    gcloud network-security mirroring-endpoint-groups delete
        (MIRRORING_ENDPOINT_GROUP : --location=LOCATION) [--async]
        [--max-wait=MAX_WAIT; default="20m"] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a mirroring endpoint group. Check the progress of endpoint group
    deletion by using gcloud network-security mirroring-endpoint-groups list.

    For more examples, refer to the EXAMPLES section below.

EXAMPLES
    To delete a mirroring endpoint group called my-endpoint-group, in project
    ID my-project, run:        $ gcloud network-security mirroring-endpoint-groups delete \
            my-endpoint-group --project=my-project --location=global

    OR

        $ gcloud network-security mirroring-endpoint-groups delete \
            projects/my-project/locations/global/mirroringEndpointGroups/\
        my-endpoint-group

POSITIONAL ARGUMENTS
     Mirroring endpoint group resource - Mirroring Endpoint Group. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument MIRRORING_ENDPOINT_GROUP on the command line
        with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       MIRRORING_ENDPOINT_GROUP
          ID of the mirroring endpoint group or fully qualified identifier for
          the mirroring endpoint group.

          To set the endpoint-group-id attribute:
          + provide the argument MIRRORING_ENDPOINT_GROUP on the command
            line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location of the mirroring endpoint group.

          To set the location attribute:
          + provide the argument MIRRORING_ENDPOINT_GROUP on the command line
            with a fully specified name;
          + provide the argument --location on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete. The default is True. Enabled by default, use --no-async to
        disable.

     --max-wait=MAX_WAIT; default="20m"
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

        $ gcloud alpha network-security mirroring-endpoint-groups delete

        $ gcloud beta network-security mirroring-endpoint-groups delete
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud network-security mirroring-endpoint-groups delete projects/my-project/locations/global/mirroringEndpointGroups/my-endpoint-group
```

### gcloud network-security mirroring-endpoint-groups describe

```text
NAME
    gcloud network-security mirroring-endpoint-groups describe - describe a
        Mirroring Endpoint Group

SYNOPSIS
    gcloud network-security mirroring-endpoint-groups describe
        (MIRRORING_ENDPOINT_GROUP : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a mirroring endpoint group.

    For more examples, refer to the EXAMPLES section below.

EXAMPLES
    To get a description of a mirroring endpoint group called my-endpoint-group
    in project ID my-project, run:        $ gcloud network-security mirroring-endpoint-groups describe \
            my-endpoint-group --project=my-project --location=global

    OR

        $ gcloud network-security mirroring-endpoint-groups describe \
            projects/my-project/locations/global/mirroringEndpointGroups/\
        my-endpoint-group

POSITIONAL ARGUMENTS
     Mirroring endpoint group resource - Mirroring Endpoint Group. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument MIRRORING_ENDPOINT_GROUP on the command line
        with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       MIRRORING_ENDPOINT_GROUP
          ID of the mirroring endpoint group or fully qualified identifier for
          the mirroring endpoint group.

          To set the endpoint-group-id attribute:
          + provide the argument MIRRORING_ENDPOINT_GROUP on the command
            line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location of the mirroring endpoint group.

          To set the location attribute:
          + provide the argument MIRRORING_ENDPOINT_GROUP on the command line
            with a fully specified name;
          + provide the argument --location on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha network-security mirroring-endpoint-groups describe

        $ gcloud beta network-security mirroring-endpoint-groups describe
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud network-security mirroring-endpoint-groups describe projects/my-project/locations/global/mirroringEndpointGroups/my-endpoint-group
```

### gcloud network-security mirroring-endpoint-groups list

```text
NAME
    gcloud network-security mirroring-endpoint-groups list - list Mirroring
        Endpoint Groups

SYNOPSIS
    gcloud network-security mirroring-endpoint-groups list
        [--location=LOCATION] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List mirroring endpoint groups.

    For more examples, refer to the EXAMPLES section below.

EXAMPLES
    To list mirroring endpoint groups in project ID my-project, run:        $ gcloud network-security mirroring-endpoint-groups list \
            --project=my-project --location=global

    OR

        $ gcloud network-security mirroring-endpoint-groups list \
            --location=global

    OR

        $ gcloud network-security mirroring-endpoint-groups list \
            --location=projects/my-project/locations/global

    OR

        $ gcloud network-security mirroring-endpoint-groups list \
            projects/my-project/locations/global/mirroringEndpointGroups

FLAGS
     Location resource - The location for a list operation This represents a
     Cloud resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * Location of the Mirroring Endpoint Group. Defaults to global with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --location=LOCATION
        ID of the location or fully qualified identifier for the location.

        To set the location attribute:
        * provide the argument --location on the command line;
        * Location of the Mirroring Endpoint Group. Defaults to global.

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

        $ gcloud alpha network-security mirroring-endpoint-groups list

        $ gcloud beta network-security mirroring-endpoint-groups list
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud network-security mirroring-endpoint-groups list
```

### gcloud network-security mirroring-endpoint-groups update

```text
NAME
    gcloud network-security mirroring-endpoint-groups update - update a
        Mirroring Endpoint Group

SYNOPSIS
    gcloud network-security mirroring-endpoint-groups update
        (MIRRORING_ENDPOINT_GROUP : --location=LOCATION) [--async]
        [--description=DESCRIPTION] [--max-wait=MAX_WAIT; default="20m"]
        [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a mirroring endpoint groups. Check the progress of endpoint group
    update by using gcloud network-security mirroring-endpoint-groups list.

    For examples refer to the EXAMPLES section below.

EXAMPLES
    To update labels k1 and k2, run:

        $ gcloud network-security mirroring-endpoint-groups update \
            my-endpoint-group --project=my-project \
            --location=us-central1-a --update-labels=k1=v1,k2=v2

    To remove labels k3 and k4, run:

        $ gcloud network-security mirroring-endpoint-groups update \
            my-endpoint-group --project=my-project \
            --location=us-central1-a --remove-labels=k3,k4

    To clear all labels from the mirroring endpoint group, run:

        $ gcloud network-security mirroring-endpoint-groups update \
            my-endpoint-group --project=my-project \
            --location=us-central1-a --clear-labels

    To update description to 'new description', run:

        $ gcloud network-security mirroring-endpoint-groups update \
            my-endpoint-group --project=my-project \
            --location=us-central1-a --description='new description'

POSITIONAL ARGUMENTS
     Mirroring endpoint group resource - Mirroring Endpoint Group. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument MIRRORING_ENDPOINT_GROUP on the command line
        with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       MIRRORING_ENDPOINT_GROUP
          ID of the mirroring endpoint group or fully qualified identifier for
          the mirroring endpoint group.

          To set the endpoint-group-id attribute:
          + provide the argument MIRRORING_ENDPOINT_GROUP on the command
            line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location of the mirroring endpoint group.

          To set the location attribute:
          + provide the argument MIRRORING_ENDPOINT_GROUP on the command line
            with a fully specified name;
          + provide the argument --location on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete. The default is True. Enabled by default, use --no-async to
        disable.

     --description=DESCRIPTION
        Description of the endpoint

     --max-wait=MAX_WAIT; default="20m"
        Time to synchronously wait for the operation to complete, after which
        the operation continues asynchronously. Ignored if --no-async isn't
        specified. See $ gcloud topic datetimes for information on time
        formats.

     --update-labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to update. If a label exists, its value
        is modified. Otherwise, a new label is created.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

     At most one of these can be specified:

       --clear-labels
          Remove all labels. If --update-labels is also specified then
          --clear-labels is applied first.

          For example, to remove all labels:

              $ gcloud network-security mirroring-endpoint-groups update \
                --clear-labels

          To remove all existing labels and create two new labels, foo and baz:

              $ gcloud network-security mirroring-endpoint-groups update \
                --clear-labels --update-labels foo=bar,baz=qux

       --remove-labels=[KEY,...]
          List of label keys to remove. If a label does not exist it is
          silently ignored. If --update-labels is also specified then
          --update-labels is applied first.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha network-security mirroring-endpoint-groups update

        $ gcloud beta network-security mirroring-endpoint-groups update
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud network-security mirroring-endpoint-groups update my-endpoint-group \
    --project=my-project \
    --location=global \
    --update-labels=k1=v1,k2=v2

gcloud network-security mirroring-endpoint-groups update my-endpoint-group \
    --project=my-project \
    --location=global \
    --remove-labels=k3,k4

gcloud network-security mirroring-endpoint-groups update my-endpoint-group \
    --project=my-project \
    --location=global \
    --clear-labels

gcloud network-security mirroring-endpoint-groups update my-endpoint-group \
    --project=my-project \
    --location=global \
    --description='new description'
```

### gcloud beta network-security mirroring-endpoint-groups create

```text
NAME
    gcloud beta network-security mirroring-endpoint-groups create - create a
        Mirroring Endpoint Group

SYNOPSIS
    gcloud beta network-security mirroring-endpoint-groups create
        (MIRRORING_ENDPOINT_GROUP : --location=LOCATION)
        (--mirroring-deployment-groups=MIRRORING_DEPLOYMENT_GROUPS,[...]
          | [--mirroring-deployment-group=MIRRORING_DEPLOYMENT_GROUP
          : --mirroring-deployment-group-location=MIRRORING_DEPLOYMENT_GROUP_LOCATION --mirroring-deployment-group-project=MIRRORING_DEPLOYMENT_GROUP_PROJECT])
        [--async] [--description=DESCRIPTION] [--labels=[KEY=VALUE,...]]
        [--max-wait=MAX_WAIT; default="20m"] [--type=TYPE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-security mirroring-endpoint-groups delete

```text
NAME
    gcloud beta network-security mirroring-endpoint-groups delete - delete a
        Mirroring Endpoint Group

SYNOPSIS
    gcloud beta network-security mirroring-endpoint-groups delete
        (MIRRORING_ENDPOINT_GROUP : --location=LOCATION) [--async]
        [--max-wait=MAX_WAIT; default="20m"] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-security mirroring-endpoint-groups describe

```text
NAME
    gcloud beta network-security mirroring-endpoint-groups describe - describe
        a Mirroring Endpoint Group

SYNOPSIS
    gcloud beta network-security mirroring-endpoint-groups describe
        (MIRRORING_ENDPOINT_GROUP : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-security mirroring-endpoint-groups list

```text
NAME
    gcloud beta network-security mirroring-endpoint-groups list - list
        Mirroring Endpoint Groups

SYNOPSIS
    gcloud beta network-security mirroring-endpoint-groups list
        [--location=LOCATION] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-security mirroring-endpoint-groups update

```text
NAME
    gcloud beta network-security mirroring-endpoint-groups update - update a
        Mirroring Endpoint Group

SYNOPSIS
    gcloud beta network-security mirroring-endpoint-groups update
        (MIRRORING_ENDPOINT_GROUP : --location=LOCATION) [--async]
        [--description=DESCRIPTION] [--max-wait=MAX_WAIT; default="20m"]
        [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-security mirroring-endpoint-groups create

```text
NAME
    gcloud alpha network-security mirroring-endpoint-groups create - create a
        Mirroring Endpoint Group

SYNOPSIS
    gcloud alpha network-security mirroring-endpoint-groups create
        (MIRRORING_ENDPOINT_GROUP : --location=LOCATION)
        (--mirroring-deployment-groups=MIRRORING_DEPLOYMENT_GROUPS,[...]
          | [--mirroring-deployment-group=MIRRORING_DEPLOYMENT_GROUP
          : --mirroring-deployment-group-location=MIRRORING_DEPLOYMENT_GROUP_LOCATION --mirroring-deployment-group-project=MIRRORING_DEPLOYMENT_GROUP_PROJECT])
        [--async] [--description=DESCRIPTION] [--labels=[KEY=VALUE,...]]
        [--max-wait=MAX_WAIT; default="20m"] [--type=TYPE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-security mirroring-endpoint-groups delete

```text
NAME
    gcloud alpha network-security mirroring-endpoint-groups delete - delete a
        Mirroring Endpoint Group

SYNOPSIS
    gcloud alpha network-security mirroring-endpoint-groups delete
        (MIRRORING_ENDPOINT_GROUP : --location=LOCATION) [--async]
        [--max-wait=MAX_WAIT; default="20m"] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-security mirroring-endpoint-groups describe

```text
NAME
    gcloud alpha network-security mirroring-endpoint-groups describe - describe
        a Mirroring Endpoint Group

SYNOPSIS
    gcloud alpha network-security mirroring-endpoint-groups describe
        (MIRRORING_ENDPOINT_GROUP : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-security mirroring-endpoint-groups list

```text
NAME
    gcloud alpha network-security mirroring-endpoint-groups list - list
        Mirroring Endpoint Groups

SYNOPSIS
    gcloud alpha network-security mirroring-endpoint-groups list
        [--location=LOCATION] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-security mirroring-endpoint-groups update

```text
NAME
    gcloud alpha network-security mirroring-endpoint-groups update - update a
        Mirroring Endpoint Group

SYNOPSIS
    gcloud alpha network-security mirroring-endpoint-groups update
        (MIRRORING_ENDPOINT_GROUP : --location=LOCATION) [--async]
        [--description=DESCRIPTION] [--max-wait=MAX_WAIT; default="20m"]
        [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the `update` examples pass `--location=us-central1-a`, but the `create`, `describe` and `delete` examples on this page put `my-endpoint-group` in `--location=global` (`projects/my-project/locations/global/...EndpointGroups/my-endpoint-group`), so the `update` examples would not find the group those examples create; the runnable form uses `--location=global`.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the last `list` example passes `projects/my-project/locations/global/mirroringEndpointGroups` as a positional argument, but the `list` SYNOPSIS takes no positional arguments (gcloud 593.0.0: "unrecognized arguments: projects/my-project/locations/global/mirroringEndpointGroups"); the runnable form drops it (to give the project and location, use `--location=projects/my-project/locations/global` as in the previous example).
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/network-security/mirroring-endpoint-groups (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
