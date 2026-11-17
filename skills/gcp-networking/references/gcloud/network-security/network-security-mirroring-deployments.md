---
source: https://docs.cloud.google.com/sdk/gcloud/reference/network-security/mirroring-deployments
---

# gcloud network-security mirroring-deployments

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud network-security mirroring-deployments create

```text
NAME
    gcloud network-security mirroring-deployments create - create a Mirroring
        Deployment

SYNOPSIS
    gcloud network-security mirroring-deployments create
        (MIRRORING_DEPLOYMENT : --location=LOCATION)
        (--forwarding-rule=FORWARDING_RULE
          : --forwarding-rule-location=FORWARDING_RULE_LOCATION)
        (--mirroring-deployment-group=MIRRORING_DEPLOYMENT_GROUP
          : --mirroring-deployment-group-location=MIRRORING_DEPLOYMENT_GROUP_LOCATION)
        [--async] [--description=DESCRIPTION] [--labels=[KEY=VALUE,...]]
        [--max-wait=MAX_WAIT; default="20m"] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a mirroring deployment. Successful creation of a deployment results
    in a deployment in ACTIVE state. Check the progress of deployment creation
    by using gcloud network-security mirroring-deployments list.

    For more examples, refer to the EXAMPLES section below.

EXAMPLES
    To create a mirroring deployment called my-deployment, in project ID
    my-project and zone us-central1-a, run:        $ gcloud network-security mirroring-deployments create \
            my-deployment --project=my-project --location=us-central1-a \
            --deployment-group-location=global \
            --forwarding-rule=my-forwarding-rule \
            --forwarding-rule-location=us-central1 \
            --mirroring-deployment-group=my-deployment-group

    OR

        $ gcloud network-security mirroring-deployments create \
            my-deployment --project=my-project --location=us-central1-a \
            --forwarding-rule=projects/my-project/regions/us-central1/\
        forwardingRules/my-forwarding-rule \
            --mirroring-deployment-group=projects/my-project/locations/\
        global/mirroringDeploymentGroups/my-deployment-group

    OR

        $ gcloud network-security mirroring-deployments create \
            projects/my-project/locations/us-central1/mirroringDeployments/\
        my-deployment \
            --forwarding-rule=projects/my-project/regions/us-central1/\
        forwardingRules/my-forwarding-rule \
            --mirroring-deployment-group=projects/my-project/locations/\
        global/mirroringDeploymentGroups/my-deployment-group

    OR

        $ gcloud network-security mirroring-deployments create \
            projects/my-project/locations/us-central1/mirroringDeployments/\
        my-deployment \
            --forwarding-rule=projects/my-project/regions/us-central1/\
        forwardingRules/my-forwarding-rule \
            --mirroring-deployment-group=projects/my-project/locations/\
        global/mirroringDeploymentGroups/my-deployment-group \
            --description="my-description"

POSITIONAL ARGUMENTS
     Mirroring deployment resource - Mirroring Deployment. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument MIRRORING_DEPLOYMENT on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       MIRRORING_DEPLOYMENT
          ID of the mirroring deployment or fully qualified identifier for the
          mirroring deployment.

          To set the deployment-id attribute:
          + provide the argument MIRRORING_DEPLOYMENT on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location of the mirroring deployment.

          To set the location attribute:
          + provide the argument MIRRORING_DEPLOYMENT on the command line
            with a fully specified name;
          + provide the argument --location on the command line.

REQUIRED FLAGS
     ForwardingRule resource - Mirroring Deployment Forwarding Rule. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument --forwarding-rule on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --forwarding-rule=FORWARDING_RULE
          ID of the forwardingRule or fully qualified identifier for the
          forwardingRule.

          To set the forwarding-rule-id attribute:
          + provide the argument --forwarding-rule on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --forwarding-rule-location=FORWARDING_RULE_LOCATION
          The Cloud region for the forwardingRule.

          To set the forwarding-rule-location attribute:
          + provide the argument --forwarding-rule on the command line with a
            fully specified name;
          + provide the argument --forwarding-rule-location on the command
            line.

     Mirroring deployment group resource - Mirroring Deployment Group. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument --mirroring-deployment-group on the command line
        with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

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
          + provide the argument
            networksecurity.projects.locations.mirroringDeployments on the
            command line with a fully specified name.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete. The default is True. Enabled by default, use --no-async to
        disable.

     --description=DESCRIPTION
        Description of the mirroring deployment

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

        $ gcloud alpha network-security mirroring-deployments create

        $ gcloud beta network-security mirroring-deployments create
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined and the corrections listed in Notes are applied.

```bash
gcloud network-security mirroring-deployments create my-deployment \
    --project=my-project \
    --location=us-central1-a \
    --mirroring-deployment-group-location=global \
    --forwarding-rule=my-forwarding-rule \
    --forwarding-rule-location=us-central1 \
    --mirroring-deployment-group=my-deployment-group

gcloud network-security mirroring-deployments create my-deployment \
    --project=my-project \
    --location=us-central1-a \
    --forwarding-rule=projects/my-project/regions/us-central1/forwardingRules/my-forwarding-rule \
    --mirroring-deployment-group=projects/my-project/locations/global/mirroringDeploymentGroups/my-deployment-group

gcloud network-security mirroring-deployments create projects/my-project/locations/us-central1/mirroringDeployments/my-deployment \
    --forwarding-rule=projects/my-project/regions/us-central1/forwardingRules/my-forwarding-rule \
    --mirroring-deployment-group=projects/my-project/locations/global/mirroringDeploymentGroups/my-deployment-group

gcloud network-security mirroring-deployments create projects/my-project/locations/us-central1/mirroringDeployments/my-deployment \
    --forwarding-rule=projects/my-project/regions/us-central1/forwardingRules/my-forwarding-rule \
    --mirroring-deployment-group=projects/my-project/locations/global/mirroringDeploymentGroups/my-deployment-group \
    --description="my-description"
```

### gcloud network-security mirroring-deployments delete

```text
NAME
    gcloud network-security mirroring-deployments delete - delete a Mirroring
        Deployment

SYNOPSIS
    gcloud network-security mirroring-deployments delete
        (MIRRORING_DEPLOYMENT : --location=LOCATION) [--async]
        [--max-wait=MAX_WAIT; default="20m"] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a mirroring deployment. Check the progress of deployment deletion by
    using gcloud network-security mirroring-deployments list.

    For more examples, refer to the EXAMPLES section below.

EXAMPLES
    To delete a mirroring deployment called my-deployment in location
    us-central1, run:

        $ gcloud network-security mirroring-deployments delete \
            my-deployment --location=us-central1-a --project=my-project

POSITIONAL ARGUMENTS
     Mirroring deployment resource - Mirroring Deployment. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument MIRRORING_DEPLOYMENT on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       MIRRORING_DEPLOYMENT
          ID of the mirroring deployment or fully qualified identifier for the
          mirroring deployment.

          To set the deployment-id attribute:
          + provide the argument MIRRORING_DEPLOYMENT on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location of the mirroring deployment.

          To set the location attribute:
          + provide the argument MIRRORING_DEPLOYMENT on the command line
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

        $ gcloud alpha network-security mirroring-deployments delete

        $ gcloud beta network-security mirroring-deployments delete
```

### gcloud network-security mirroring-deployments describe

```text
NAME
    gcloud network-security mirroring-deployments describe - describe a
        Mirroring Deployment

SYNOPSIS
    gcloud network-security mirroring-deployments describe
        (MIRRORING_DEPLOYMENT : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a mirroring deployment.

    For more examples, refer to the EXAMPLES section below.

EXAMPLES
    To get a description of a mirroring deployment called my-deployment in zone
    us-central1-a, run:

        $ gcloud network-security mirroring-deployments describe \
            my-deployment --location=us-central1-a --project=my-project

    OR

        $ gcloud network-security mirroring-deployments describe \
            projects/my-project/locations/us-central1-a/\
        mirroringDeployments/my-deployment

POSITIONAL ARGUMENTS
     Mirroring deployment resource - Mirroring Deployment. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument MIRRORING_DEPLOYMENT on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       MIRRORING_DEPLOYMENT
          ID of the mirroring deployment or fully qualified identifier for the
          mirroring deployment.

          To set the deployment-id attribute:
          + provide the argument MIRRORING_DEPLOYMENT on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location of the mirroring deployment.

          To set the location attribute:
          + provide the argument MIRRORING_DEPLOYMENT on the command line
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

        $ gcloud alpha network-security mirroring-deployments describe

        $ gcloud beta network-security mirroring-deployments describe
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud network-security mirroring-deployments describe projects/my-project/locations/us-central1-a/mirroringDeployments/my-deployment
```

### gcloud network-security mirroring-deployments list

```text
NAME
    gcloud network-security mirroring-deployments list - list Mirroring
        Deployments

SYNOPSIS
    gcloud network-security mirroring-deployments list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List mirroring deployments.

    For more examples, refer to the EXAMPLES section below.

EXAMPLES
    To list mirroring deployments in project my-project and zone us-central1-a,
    run:

        $ gcloud network-security mirroring-deployments list \
            --project=my-project --location=us-central1-a

    To list mirroring deployments from all zones, run:

        $ gcloud network-security mirroring-deployments list \
            --project=my-project --location=-

FLAGS
     Location resource - Zone of the deployment This represents a Cloud
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * Location of the Mirroring Deployment. Defaults to a wildcard with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --location=LOCATION
        ID of the location or fully qualified identifier for the location.

        To set the location attribute:
        * provide the argument --location on the command line;
        * Location of the Mirroring Deployment. Defaults to a wildcard.

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

        $ gcloud alpha network-security mirroring-deployments list

        $ gcloud beta network-security mirroring-deployments list
```

### gcloud network-security mirroring-deployments update

```text
NAME
    gcloud network-security mirroring-deployments update - update a Mirroring
        Deployment

SYNOPSIS
    gcloud network-security mirroring-deployments update
        (MIRRORING_DEPLOYMENT : --location=LOCATION) [--async]
        [--description=DESCRIPTION] [--max-wait=MAX_WAIT; default="20m"]
        [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a mirroring deployment. Check the progress of deployment update by
    using gcloud network-security mirroring-deployments list.

    For examples refer to the EXAMPLES section below.

EXAMPLES
    To update labels k1 and k2, run:

        $ gcloud network-security mirroring-deployments update \
            my-deployment --project=my-project --location=us-central1-a \
            --update-labels=k1=v1,k2=v2

    To remove labels k3 and k4, run:

        $ gcloud network-security mirroring-deployments update \
            my-deployment --project=my-project --location=us-central1-a \
            --remove-labels=k3,k4

    To clear all labels from the mirroring deployment, run:

        $ gcloud network-security mirroring-deployments update \
            my-deploymen --project=my-project --location=us-central1-a \
            --clear-labels

    To update description to 'new description', run:

        $ gcloud network-security mirroring-deployments update \
            my-deploymen --project=my-project --location=us-central1-a \
            --description="new description"

POSITIONAL ARGUMENTS
     Mirroring deployment resource - Mirroring Deployment. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument MIRRORING_DEPLOYMENT on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       MIRRORING_DEPLOYMENT
          ID of the mirroring deployment or fully qualified identifier for the
          mirroring deployment.

          To set the deployment-id attribute:
          + provide the argument MIRRORING_DEPLOYMENT on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location of the mirroring deployment.

          To set the location attribute:
          + provide the argument MIRRORING_DEPLOYMENT on the command line
            with a fully specified name;
          + provide the argument --location on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete. The default is True. Enabled by default, use --no-async to
        disable.

     --description=DESCRIPTION
        Description of the mirroring deployment

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

              $ gcloud network-security mirroring-deployments update --clear-labels

          To remove all existing labels and create two new labels, foo and baz:

              $ gcloud network-security mirroring-deployments update \
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

        $ gcloud alpha network-security mirroring-deployments update

        $ gcloud beta network-security mirroring-deployments update
```

### gcloud beta network-security mirroring-deployments create

```text
NAME
    gcloud beta network-security mirroring-deployments create - create a
        Mirroring Deployment

SYNOPSIS
    gcloud beta network-security mirroring-deployments create
        (MIRRORING_DEPLOYMENT : --location=LOCATION)
        (--forwarding-rule=FORWARDING_RULE
          : --forwarding-rule-location=FORWARDING_RULE_LOCATION)
        (--mirroring-deployment-group=MIRRORING_DEPLOYMENT_GROUP
          : --mirroring-deployment-group-location=MIRRORING_DEPLOYMENT_GROUP_LOCATION)
        [--async] [--description=DESCRIPTION] [--labels=[KEY=VALUE,...]]
        [--max-wait=MAX_WAIT; default="20m"] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-security mirroring-deployments delete

```text
NAME
    gcloud beta network-security mirroring-deployments delete - delete a
        Mirroring Deployment

SYNOPSIS
    gcloud beta network-security mirroring-deployments delete
        (MIRRORING_DEPLOYMENT : --location=LOCATION) [--async]
        [--max-wait=MAX_WAIT; default="20m"] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-security mirroring-deployments describe

```text
NAME
    gcloud beta network-security mirroring-deployments describe - describe a
        Mirroring Deployment

SYNOPSIS
    gcloud beta network-security mirroring-deployments describe
        (MIRRORING_DEPLOYMENT : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-security mirroring-deployments list

```text
NAME
    gcloud beta network-security mirroring-deployments list - list Mirroring
        Deployments

SYNOPSIS
    gcloud beta network-security mirroring-deployments list
        [--location=LOCATION] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-security mirroring-deployments update

```text
NAME
    gcloud beta network-security mirroring-deployments update - update a
        Mirroring Deployment

SYNOPSIS
    gcloud beta network-security mirroring-deployments update
        (MIRRORING_DEPLOYMENT : --location=LOCATION) [--async]
        [--description=DESCRIPTION] [--max-wait=MAX_WAIT; default="20m"]
        [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-security mirroring-deployments create

```text
NAME
    gcloud alpha network-security mirroring-deployments create - create a
        Mirroring Deployment

SYNOPSIS
    gcloud alpha network-security mirroring-deployments create
        (MIRRORING_DEPLOYMENT : --location=LOCATION)
        (--forwarding-rule=FORWARDING_RULE
          : --forwarding-rule-location=FORWARDING_RULE_LOCATION)
        (--mirroring-deployment-group=MIRRORING_DEPLOYMENT_GROUP
          : --mirroring-deployment-group-location=MIRRORING_DEPLOYMENT_GROUP_LOCATION)
        [--async] [--description=DESCRIPTION] [--labels=[KEY=VALUE,...]]
        [--max-wait=MAX_WAIT; default="20m"] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-security mirroring-deployments delete

```text
NAME
    gcloud alpha network-security mirroring-deployments delete - delete a
        Mirroring Deployment

SYNOPSIS
    gcloud alpha network-security mirroring-deployments delete
        (MIRRORING_DEPLOYMENT : --location=LOCATION) [--async]
        [--max-wait=MAX_WAIT; default="20m"] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-security mirroring-deployments describe

```text
NAME
    gcloud alpha network-security mirroring-deployments describe - describe a
        Mirroring Deployment

SYNOPSIS
    gcloud alpha network-security mirroring-deployments describe
        (MIRRORING_DEPLOYMENT : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-security mirroring-deployments list

```text
NAME
    gcloud alpha network-security mirroring-deployments list - list Mirroring
        Deployments

SYNOPSIS
    gcloud alpha network-security mirroring-deployments list
        [--location=LOCATION] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-security mirroring-deployments update

```text
NAME
    gcloud alpha network-security mirroring-deployments update - update a
        Mirroring Deployment

SYNOPSIS
    gcloud alpha network-security mirroring-deployments update
        (MIRRORING_DEPLOYMENT : --location=LOCATION) [--async]
        [--description=DESCRIPTION] [--max-wait=MAX_WAIT; default="20m"]
        [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the first `create` example passes `--deployment-group-location=global`, which is not a flag of this command (gcloud 593.0.0: "unrecognized arguments: --deployment-group-location=global (did you mean '--mirroring-deployment-group-location'?)"); the runnable form uses `--mirroring-deployment-group-location`, the flag in the SYNOPSIS.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the first `create` example puts `$ gcloud` on the same line as `run:`; the runnable form starts the command on its own line.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/network-security/mirroring-deployments (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
