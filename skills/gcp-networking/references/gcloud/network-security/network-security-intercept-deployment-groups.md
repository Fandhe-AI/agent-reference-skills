---
source: https://docs.cloud.google.com/sdk/gcloud/reference/network-security/intercept-deployment-groups
---

# gcloud network-security intercept-deployment-groups

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud network-security intercept-deployment-groups create

```text
NAME
    gcloud network-security intercept-deployment-groups create - create an
        Intercept Deployment Group

SYNOPSIS
    gcloud network-security intercept-deployment-groups create
        (INTERCEPT_DEPLOYMENT_GROUP : --location=LOCATION) --network=NETWORK
        [--async] [--description=DESCRIPTION] [--labels=[KEY=VALUE,...]]
        [--max-wait=MAX_WAIT; default="20m"] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create an intercept deployment group. Successful creation of a deployment
    group results in a deployment group in ACTIVE state. Check the progress of
    deployment group creation by using gcloud network-security
    intercept-deployment-groups list.

    For more examples, refer to the EXAMPLES section below.

EXAMPLES
    To create a intercept deployment group called my-deployment-group, in
    project ID my-project, run:        $ gcloud network-security intercept-deployment-groups create \
            my-deployment-group --project=my-project --location=global \
            --network=my-network

    OR

        $ gcloud network-security intercept-deployment-groups create \
            my-deployment-group --project=my-project --location=global \
            --network=projects/my-project/global/networks/my-network

    OR

        $ gcloud network-security intercept-deployment-groups create \
            projects/my-project/locations/global/interceptDeploymentGroups/\
        my-deployment-group \
            --network=projects/my-project/global/networks/my-network

    OR

        $ gcloud network-security intercept-deployment-groups create \
            projects/my-project/locations/global/interceptDeploymentGroups/\
        my-deployment-group \
            --network=projects/my-project/global/networks/my-network \
            --description='new description'

POSITIONAL ARGUMENTS
     Intercept deployment group resource - Intercept Deployment Group. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument INTERCEPT_DEPLOYMENT_GROUP on the command line
        with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       INTERCEPT_DEPLOYMENT_GROUP
          ID of the intercept deployment group or fully qualified identifier
          for the intercept deployment group.

          To set the deployment-group-id attribute:
          + provide the argument INTERCEPT_DEPLOYMENT_GROUP on the command
            line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location of the intercept deployment group.

          To set the location attribute:
          + provide the argument INTERCEPT_DEPLOYMENT_GROUP on the command
            line with a fully specified name;
          + provide the argument --location on the command line.

REQUIRED FLAGS
     Network resource - Intercept Deployment Group. This represents a Cloud
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument --network on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --network=NETWORK
          ID of the network or fully qualified identifier for the network.

          To set the network-name attribute:
          + provide the argument --network on the command line.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete. The default is True. Enabled by default, use --no-async to
        disable.

     --description=DESCRIPTION
        Description of the deployment group.

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

        $ gcloud alpha network-security intercept-deployment-groups create

        $ gcloud beta network-security intercept-deployment-groups create
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud network-security intercept-deployment-groups create projects/my-project/locations/global/interceptDeploymentGroups/my-deployment-group \
    --network=projects/my-project/global/networks/my-network

gcloud network-security intercept-deployment-groups create projects/my-project/locations/global/interceptDeploymentGroups/my-deployment-group \
    --network=projects/my-project/global/networks/my-network \
    --description='new description'
```

### gcloud network-security intercept-deployment-groups delete

```text
NAME
    gcloud network-security intercept-deployment-groups delete - delete an
        Intercept Deployment Group

SYNOPSIS
    gcloud network-security intercept-deployment-groups delete
        (INTERCEPT_DEPLOYMENT_GROUP : --location=LOCATION) [--async]
        [--max-wait=MAX_WAIT; default="20m"] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete an intercept deployment group. Check the progress of deployment
    group deletion by using gcloud network-security intercept-deployment-groups
    list.

    For more examples, refer to the EXAMPLES section below.

EXAMPLES
    To delete an intercept deployment group called my-deployment-group, in
    project ID my-project, run:

        $ gcloud network-security intercept-deployment-groups delete \
            my-deployment-group --project=my-project --location=global

    OR

        $ gcloud network-security intercept-deployment-groups delete \
            projects/my-project/locations/global/interceptDeploymentGroups/\
        my-deployment-group

POSITIONAL ARGUMENTS
     Intercept deployment group resource - Intercept Deployment Group. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument INTERCEPT_DEPLOYMENT_GROUP on the command line
        with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       INTERCEPT_DEPLOYMENT_GROUP
          ID of the intercept deployment group or fully qualified identifier
          for the intercept deployment group.

          To set the deployment-group-id attribute:
          + provide the argument INTERCEPT_DEPLOYMENT_GROUP on the command
            line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location of the intercept deployment group.

          To set the location attribute:
          + provide the argument INTERCEPT_DEPLOYMENT_GROUP on the command
            line with a fully specified name;
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

        $ gcloud alpha network-security intercept-deployment-groups delete

        $ gcloud beta network-security intercept-deployment-groups delete
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud network-security intercept-deployment-groups delete projects/my-project/locations/global/interceptDeploymentGroups/my-deployment-group
```

### gcloud network-security intercept-deployment-groups describe

```text
NAME
    gcloud network-security intercept-deployment-groups describe - describe an
        Intercept Deployment Group

SYNOPSIS
    gcloud network-security intercept-deployment-groups describe
        (INTERCEPT_DEPLOYMENT_GROUP : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe an intercept deployment group.

    For more examples, refer to the EXAMPLES section below.

EXAMPLES
    To get a description of an intercept deployment group called
    my-deployment-group in project ID my-project, run:

        $ gcloud network-security intercept-deployment-groups describe \
            my-deployment-group --project=my-project --location=global

    OR

        $ gcloud network-security intercept-deployment-groups describe \
            projects/my-project/locations/global/interceptDeploymentGroups/\
        my-deployment-group

POSITIONAL ARGUMENTS
     Intercept deployment group resource - Intercept Deployment Group. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument INTERCEPT_DEPLOYMENT_GROUP on the command line
        with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       INTERCEPT_DEPLOYMENT_GROUP
          ID of the intercept deployment group or fully qualified identifier
          for the intercept deployment group.

          To set the deployment-group-id attribute:
          + provide the argument INTERCEPT_DEPLOYMENT_GROUP on the command
            line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location of the intercept deployment group.

          To set the location attribute:
          + provide the argument INTERCEPT_DEPLOYMENT_GROUP on the command
            line with a fully specified name;
          + provide the argument --location on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha network-security intercept-deployment-groups describe

        $ gcloud beta network-security intercept-deployment-groups describe
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud network-security intercept-deployment-groups describe projects/my-project/locations/global/interceptDeploymentGroups/my-deployment-group
```

### gcloud network-security intercept-deployment-groups list

```text
NAME
    gcloud network-security intercept-deployment-groups list - list Intercept
        Deployment Groups

SYNOPSIS
    gcloud network-security intercept-deployment-groups list
        [--location=LOCATION] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List intercept deployment groups.

    For more examples, refer to the EXAMPLES section below.

EXAMPLES
    To list intercept deployment groups in project ID my-project, run:

        $ gcloud network-security intercept-deployment-groups list \
            --location=global --project=my-project

    OR

        $ gcloud network-security intercept-deployment-groups list \
            --location=global

FLAGS
     Location resource - The location for a list operation This represents a
     Cloud resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * Location of the Intercept Deployment Group. Defaults to global with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --location=LOCATION
        ID of the location or fully qualified identifier for the location.

        To set the location attribute:
        * provide the argument --location on the command line;
        * Location of the Intercept Deployment Group. Defaults to global.

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

        $ gcloud alpha network-security intercept-deployment-groups list

        $ gcloud beta network-security intercept-deployment-groups list
```

### gcloud network-security intercept-deployment-groups update

```text
NAME
    gcloud network-security intercept-deployment-groups update - update an
        Intercept Deployment Group

SYNOPSIS
    gcloud network-security intercept-deployment-groups update
        (INTERCEPT_DEPLOYMENT_GROUP : --location=LOCATION) [--async]
        [--description=DESCRIPTION] [--max-wait=MAX_WAIT; default="20m"]
        [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update an intercept deployment group. Check the progress of deployment
    group update by using gcloud network-security intercept-deployment-groups
    list.

    For examples refer to the EXAMPLES section below.

EXAMPLES
    To update labels k1 and k2, run:

        $ gcloud network-security intercept-deployment-groups update \
            my-deployment-group --project=my-project --location=global \
            --update-labels=k1=v1,k2=v2

    To remove labels k3 and k4, run:

        $ gcloud network-security intercept-deployment-groups update \
            my-deployment-group --project=my-project --location=global \
            --remove-labels=k3,k4

    To clear all labels from the intercept deployment group, run:

        $ gcloud network-security intercept-deployment-groups update \
            my-deployment-group --project=my-project --location=global \
            --clear-labels

    To update description to 'new description', run:

        $ gcloud network-security intercept-deployment-groups update \
            my-deployment-group --project=my-project --location=global \
            --description='new description'

POSITIONAL ARGUMENTS
     Intercept deployment group resource - Intercept Deployment Group. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument INTERCEPT_DEPLOYMENT_GROUP on the command line
        with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       INTERCEPT_DEPLOYMENT_GROUP
          ID of the intercept deployment group or fully qualified identifier
          for the intercept deployment group.

          To set the deployment-group-id attribute:
          + provide the argument INTERCEPT_DEPLOYMENT_GROUP on the command
            line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location of the intercept deployment group.

          To set the location attribute:
          + provide the argument INTERCEPT_DEPLOYMENT_GROUP on the command
            line with a fully specified name;
          + provide the argument --location on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete. The default is True. Enabled by default, use --no-async to
        disable.

     --description=DESCRIPTION
        Description of the deployment group.

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

              $ gcloud network-security intercept-deployment-groups update \
                --clear-labels

          To remove all existing labels and create two new labels, foo and baz:

              $ gcloud network-security intercept-deployment-groups update \
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

        $ gcloud alpha network-security intercept-deployment-groups update

        $ gcloud beta network-security intercept-deployment-groups update
```

### gcloud beta network-security intercept-deployment-groups create

```text
NAME
    gcloud beta network-security intercept-deployment-groups create - create an
        Intercept Deployment Group

SYNOPSIS
    gcloud beta network-security intercept-deployment-groups create
        (INTERCEPT_DEPLOYMENT_GROUP : --location=LOCATION) --network=NETWORK
        [--async] [--description=DESCRIPTION] [--labels=[KEY=VALUE,...]]
        [--max-wait=MAX_WAIT; default="20m"] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-security intercept-deployment-groups delete

```text
NAME
    gcloud beta network-security intercept-deployment-groups delete - delete an
        Intercept Deployment Group

SYNOPSIS
    gcloud beta network-security intercept-deployment-groups delete
        (INTERCEPT_DEPLOYMENT_GROUP : --location=LOCATION) [--async]
        [--max-wait=MAX_WAIT; default="20m"] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-security intercept-deployment-groups describe

```text
NAME
    gcloud beta network-security intercept-deployment-groups describe -
        describe an Intercept Deployment Group

SYNOPSIS
    gcloud beta network-security intercept-deployment-groups describe
        (INTERCEPT_DEPLOYMENT_GROUP : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-security intercept-deployment-groups list

```text
NAME
    gcloud beta network-security intercept-deployment-groups list - list
        Intercept Deployment Groups

SYNOPSIS
    gcloud beta network-security intercept-deployment-groups list
        [--location=LOCATION] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-security intercept-deployment-groups update

```text
NAME
    gcloud beta network-security intercept-deployment-groups update - update an
        Intercept Deployment Group

SYNOPSIS
    gcloud beta network-security intercept-deployment-groups update
        (INTERCEPT_DEPLOYMENT_GROUP : --location=LOCATION) [--async]
        [--description=DESCRIPTION] [--max-wait=MAX_WAIT; default="20m"]
        [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-security intercept-deployment-groups create

```text
NAME
    gcloud alpha network-security intercept-deployment-groups create - create
        an Intercept Deployment Group

SYNOPSIS
    gcloud alpha network-security intercept-deployment-groups create
        (INTERCEPT_DEPLOYMENT_GROUP : --location=LOCATION) --network=NETWORK
        [--async] [--description=DESCRIPTION] [--labels=[KEY=VALUE,...]]
        [--max-wait=MAX_WAIT; default="20m"] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-security intercept-deployment-groups delete

```text
NAME
    gcloud alpha network-security intercept-deployment-groups delete - delete
        an Intercept Deployment Group

SYNOPSIS
    gcloud alpha network-security intercept-deployment-groups delete
        (INTERCEPT_DEPLOYMENT_GROUP : --location=LOCATION) [--async]
        [--max-wait=MAX_WAIT; default="20m"] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-security intercept-deployment-groups describe

```text
NAME
    gcloud alpha network-security intercept-deployment-groups describe -
        describe an Intercept Deployment Group

SYNOPSIS
    gcloud alpha network-security intercept-deployment-groups describe
        (INTERCEPT_DEPLOYMENT_GROUP : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-security intercept-deployment-groups list

```text
NAME
    gcloud alpha network-security intercept-deployment-groups list - list
        Intercept Deployment Groups

SYNOPSIS
    gcloud alpha network-security intercept-deployment-groups list
        [--location=LOCATION] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-security intercept-deployment-groups update

```text
NAME
    gcloud alpha network-security intercept-deployment-groups update - update
        an Intercept Deployment Group

SYNOPSIS
    gcloud alpha network-security intercept-deployment-groups update
        (INTERCEPT_DEPLOYMENT_GROUP : --location=LOCATION) [--async]
        [--description=DESCRIPTION] [--max-wait=MAX_WAIT; default="20m"]
        [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/network-security/intercept-deployment-groups (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
