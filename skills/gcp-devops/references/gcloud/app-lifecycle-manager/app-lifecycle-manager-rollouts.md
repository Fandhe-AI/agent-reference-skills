---
source: https://docs.cloud.google.com/sdk/gcloud/reference/app-lifecycle-manager/rollouts
---

# gcloud app-lifecycle-manager rollouts

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud app-lifecycle-manager rollouts create

```text
NAME
    gcloud app-lifecycle-manager rollouts create - create a rollout

SYNOPSIS
    gcloud app-lifecycle-manager rollouts create ROLLOUT --release=RELEASE
        [--labels=[LABELS,...]] [--location=LOCATION]
        [--rollout-kind=ROLLOUT_KIND]
        [--rollout-orchestration-strategy=ROLLOUT_ORCHESTRATION_STRATEGY]
        [--unit-filter=UNIT_FILTER]
        [--control-action=CONTROL_ACTION : --[no-]retry-failed-operations]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create an App Lifecycle Manager rollout.

    A rollout represents a single execution of rolling out a release to the
    target units, including its results. The rollout follows the settings of
    the rollout kind that it stems from.

EXAMPLES
    To create a rollout named my-rollout in location us-central1 that rolls out
    the release my-release according to the rollout kind my-rollout-kind, run:

        $ gcloud app-lifecycle-manager rollouts create my-rollout \
            --location=us-central1 --release=my-release \
            --rollout-kind=my-rollout-kind

    To create a rollout named my-rollout that rolls out the release my-release
    only to units that have the label env=prod, run:

        $ gcloud app-lifecycle-manager rollouts create my-rollout \
            --location=us-central1 --release=my-release \
            --rollout-kind=my-rollout-kind \
            --unit-filter="unit.labels['env'] == 'prod'"

    To create a rollout named my-rollout that rolls out to all locations at
    once and has the label env=prod, run:

        $ gcloud app-lifecycle-manager rollouts create my-rollout \
            --location=us-central1 --release=my-release \
            --rollout-kind=my-rollout-kind \
            --rollout-orchestration-strategy=Google.Cloud.Simple.AllAtOnce \
            --labels=env=prod

POSITIONAL ARGUMENTS
     RolloutId resource - Rollout to create. This represents a Cloud resource.
     (NOTE) Some attributes are not given arguments in this group but can be
     set in other ways.

     To set the project attribute:
      * provide the argument rollout on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument rollout on the command line with a fully
        specified name;
      * provide the argument --location on the command line.

     This must be specified.

       ROLLOUT
          ID of the rolloutId or fully qualified identifier for the rolloutId.

          To set the rollout attribute:
          + provide the argument rollout on the command line.

REQUIRED FLAGS
     --release=RELEASE
        ID of the release or fully qualified identifier for the release.

        To set the release attribute:
        * provide the argument --release on the command line.

OPTIONAL FLAGS
     --labels=[LABELS,...]
        Labels on the resource, which can be used for categorization, similar
        to Kubernetes resource labels.

         KEY
            Keys must start with a lowercase character and contain only hyphens
            (-), underscores (_), lowercase characters, and numbers.

         VALUE
            Values must contain only hyphens (-), underscores (_), lowercase
            characters, and numbers.

        Shorthand Example:

            --labels=string=string

        JSON Example:

            --labels='{"string": "string"}'

        File Example:

            --labels=path_to_file.(yaml|json)

     --location=LOCATION
        For resources [release, rollout, rollout-kind], provides fallback value
        for resource location attribute. When the resource's full URI path is
        not provided, location will fallback to this flag value.

     RolloutKindId resource - Rollout kind that this rollout stems from and
     adheres to. The rollout kind cannot be changed after the rollout is
     created. This represents a Cloud resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --rollout-kind on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument --rollout-kind on the command line with a fully
        specified name;
      * provide the argument --location on the command line.

     --rollout-kind=ROLLOUT_KIND
        ID of the rolloutKindId or fully qualified identifier for the
        rolloutKindId.

        To set the rollout-kind attribute:
        * provide the argument --rollout-kind on the command line.

     --rollout-orchestration-strategy=ROLLOUT_ORCHESTRATION_STRATEGY
        Strategy to use for executing this rollout. Supported values are
        Google.Cloud.Simple.AllAtOnce, Google.Cloud.Simple.OneLocationAtATime,
        Google.Cloud.Progressive.Gradual.v1, and
        Google.Cloud.Progressive.SingleLocation.v1. If not set, the strategy
        from the rollout kind is used.

     --unit-filter=UNIT_FILTER
        Filter, in Common Expression Language (CEL) format, that selects the
        eligible units. The filter can only reduce, not expand, the scope of
        the rollout. If empty, the unit filter from the rollout kind is used.
        For more information about CEL, see https://github.com/google/cel-spec.

     Rollout control, which requests a change to the execution of the rollout,
     such as pausing or canceling it. Requests can only be made when the
     rollout is in a non-terminal state.

     --control-action=CONTROL_ACTION
        Action to perform on the rollout. By default, the rollout runs until it
        naturally reaches a terminal state. CONTROL_ACTION must be one of:

         cancel
            Cancel the rollout permanently.
         pause
            Pause the rollout until it is resumed (that is, until the run
            action is requested).
         run
            Run the rollout until it naturally reaches a terminal state. A
            rollout requested to run progresses through all natural rollout
            states, such as from running to succeeded or from running to
            failed. If errors that can be retried occur during the rollout, the
            rollout is paused by default and can be resumed by requesting the
            run action again.

        This flag argument must be specified if any of the other arguments in
        this group are specified.

     Action parameters.

     Parameters for the run action that control the behavior of the rollout
     when it is resumed from a paused state. By default, the rollout retries
     failed operations when resumed. Can be specified only when
     --control-action=run.

     --[no-]retry-failed-operations
        Retry failed operations when the rollout is resumed. Applies only if
        the rollout is paused. Use --retry-failed-operations to enable and
        --no-retry-failed-operations to disable.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the saasservicemgmt/v1 API. The full documentation for
    this API can be found at:
    https://docs.cloud.google.com/app-lifecycle-manager

NOTES
    This variant is also available:

        $ gcloud beta app-lifecycle-manager rollouts create
```

### gcloud app-lifecycle-manager rollouts delete

```text
NAME
    gcloud app-lifecycle-manager rollouts delete - delete a rollout

SYNOPSIS
    gcloud app-lifecycle-manager rollouts delete
        (ROLLOUT : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete an App Lifecycle Manager rollout.

    The command prompts for confirmation before the rollout is deleted.

EXAMPLES
    To delete the rollout named my-rollout in location us-central1, run:

        $ gcloud app-lifecycle-manager rollouts delete my-rollout \
            --location=us-central1

    To delete the rollout named my-rollout in location us-central1 without a
    confirmation prompt, run:

        $ gcloud app-lifecycle-manager rollouts delete my-rollout \
            --location=us-central1 --quiet

POSITIONAL ARGUMENTS
     RolloutId resource - Rollout to delete. The arguments in this group can be
     used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument rollout on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ROLLOUT
          ID of the rolloutId or fully qualified identifier for the rolloutId.

          To set the rollout attribute:
          + provide the argument rollout on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location ID

          To set the location attribute:
          + provide the argument rollout on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the saasservicemgmt/v1 API. The full documentation for
    this API can be found at:
    https://docs.cloud.google.com/app-lifecycle-manager

NOTES
    This variant is also available:

        $ gcloud beta app-lifecycle-manager rollouts delete
```

### gcloud app-lifecycle-manager rollouts describe

```text
NAME
    gcloud app-lifecycle-manager rollouts describe - describe a rollout

SYNOPSIS
    gcloud app-lifecycle-manager rollouts describe
        (ROLLOUT : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Display the details of an App Lifecycle Manager rollout.

EXAMPLES
    To describe the rollout named my-rollout in location us-central1, run:

        $ gcloud app-lifecycle-manager rollouts describe my-rollout \
            --location=us-central1

    To display only the release and state of the rollout named my-rollout in
    location us-central1, run:

        $ gcloud app-lifecycle-manager rollouts describe my-rollout \
            --location=us-central1 --format="yaml(release,state)"

POSITIONAL ARGUMENTS
     RolloutId resource - Rollout to describe. The arguments in this group can
     be used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument rollout on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ROLLOUT
          ID of the rolloutId or fully qualified identifier for the rolloutId.

          To set the rollout attribute:
          + provide the argument rollout on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location ID

          To set the location attribute:
          + provide the argument rollout on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the saasservicemgmt/v1 API. The full documentation for
    this API can be found at:
    https://docs.cloud.google.com/app-lifecycle-manager

NOTES
    This variant is also available:

        $ gcloud beta app-lifecycle-manager rollouts describe
```

### gcloud app-lifecycle-manager rollouts list

```text
NAME
    gcloud app-lifecycle-manager rollouts list - list rollouts

SYNOPSIS
    gcloud app-lifecycle-manager rollouts list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List App Lifecycle Manager rollouts.

    If --location is not specified, rollouts in all locations are listed.

EXAMPLES
    To list all rollouts in location us-central1, run:

        $ gcloud app-lifecycle-manager rollouts list --location=us-central1

    To list only the names of rollouts with the label env=prod in all
    locations, run:

        $ gcloud app-lifecycle-manager rollouts list \
            --filter="labels.env=prod" --format="value(name)"

FLAGS
     Location resource - Location of the rollouts to list. This represents a
     Cloud resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * if left empty, will use the wildcard '-' to list all locations with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --location=LOCATION
        ID of the location or fully qualified identifier for the location.

        To set the location attribute:
        * provide the argument --location on the command line;
        * if left empty, will use the wildcard '-' to list all locations.

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

API REFERENCE
    This command uses the saasservicemgmt/v1 API. The full documentation for
    this API can be found at:
    https://docs.cloud.google.com/app-lifecycle-manager

NOTES
    This variant is also available:

        $ gcloud beta app-lifecycle-manager rollouts list
```

### gcloud app-lifecycle-manager rollouts update

```text
NAME
    gcloud app-lifecycle-manager rollouts update - update a rollout

SYNOPSIS
    gcloud app-lifecycle-manager rollouts update
        (ROLLOUT : --location=LOCATION)
        [--rollout-orchestration-strategy=ROLLOUT_ORCHESTRATION_STRATEGY]
        [--unit-filter=UNIT_FILTER]
        [--clear-control
          --control-action=CONTROL_ACTION --[no-]retry-failed-operations]
        [--labels=[LABELS,...]
          | --update-labels=[UPDATE_LABELS,...] --clear-labels
          | --remove-labels=REMOVE_LABELS] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update an App Lifecycle Manager rollout.

    Use --control-action to pause, resume, or cancel a rollout.

EXAMPLES
    To pause the rollout named my-rollout in location us-central1, run:

        $ gcloud app-lifecycle-manager rollouts update my-rollout \
            --location=us-central1 --control-action=pause

    To resume the paused rollout named my-rollout without retrying its failed
    operations, run:

        $ gcloud app-lifecycle-manager rollouts update my-rollout \
            --location=us-central1 --control-action=run \
            --no-retry-failed-operations

    To cancel the rollout named my-rollout permanently, run:

        $ gcloud app-lifecycle-manager rollouts update my-rollout \
            --location=us-central1 --control-action=cancel

POSITIONAL ARGUMENTS
     RolloutId resource - Rollout to update. The arguments in this group can be
     used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument rollout on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ROLLOUT
          ID of the rolloutId or fully qualified identifier for the rolloutId.

          To set the rollout attribute:
          + provide the argument rollout on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location ID

          To set the location attribute:
          + provide the argument rollout on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

FLAGS
     --rollout-orchestration-strategy=ROLLOUT_ORCHESTRATION_STRATEGY
        Strategy to use for executing this rollout. Supported values are
        Google.Cloud.Simple.AllAtOnce, Google.Cloud.Simple.OneLocationAtATime,
        Google.Cloud.Progressive.Gradual.v1, and
        Google.Cloud.Progressive.SingleLocation.v1. If not set when the rollout
        is created, the strategy from the rollout kind is used.

     --unit-filter=UNIT_FILTER
        Filter, in Common Expression Language (CEL) format, that selects the
        eligible units. The filter can only reduce, not expand, the scope of
        the rollout. If empty, the unit filter from the rollout kind is used.
        For more information about CEL, see https://github.com/google/cel-spec.

     Rollout control, which requests a change to the execution of the rollout,
     such as pausing or canceling it. Requests can only be made when the
     rollout is in a non-terminal state.

     --clear-control
        Set rollout.control back to default value.

     --control-action=CONTROL_ACTION
        Action to perform on the rollout. If no action is set, the rollout runs
        until it naturally reaches a terminal state. CONTROL_ACTION must be one
        of:

         cancel
            Cancel the rollout permanently.
         pause
            Pause the rollout until it is resumed (that is, until the run
            action is requested).
         run
            Run the rollout until it naturally reaches a terminal state. A
            rollout requested to run progresses through all natural rollout
            states, such as from running to succeeded or from running to
            failed. If errors that can be retried occur during the rollout, the
            rollout is paused by default and can be resumed by requesting the
            run action again.

     Action parameters.

     Parameters for the run action that control the behavior of the rollout
     when it is resumed from a paused state. By default, the rollout retries
     failed operations when resumed. Can be specified only when
     --control-action=run.

     --[no-]retry-failed-operations
        Retry failed operations when the rollout is resumed. Applies only if
        the rollout is paused. Use --retry-failed-operations to enable and
        --no-retry-failed-operations to disable.

     Update labels.

     At most one of these can be specified:

       --labels=[LABELS,...]
          Set labels to new value. Labels on the resource, which can be used
          for categorization, similar to Kubernetes resource labels.

           KEY
              Keys must start with a lowercase character and contain only
              hyphens (-), underscores (_), lowercase characters, and numbers.

           VALUE
              Values must contain only hyphens (-), underscores (_), lowercase
              characters, and numbers.

          Shorthand Example:

              --labels=string=string

          JSON Example:

              --labels='{"string": "string"}'

          File Example:

              --labels=path_to_file.(yaml|json)

       Or at least one of these can be specified:

         --update-labels=[UPDATE_LABELS,...]
            Update labels value or add key value pair. Labels on the resource,
            which can be used for categorization, similar to Kubernetes
            resource labels.

             KEY
                Keys must start with a lowercase character and contain only
                hyphens (-), underscores (_), lowercase characters, and
                numbers.

             VALUE
                Values must contain only hyphens (-), underscores (_),
                lowercase characters, and numbers.

            Shorthand Example:

                --update-labels=string=string

            JSON Example:

                --update-labels='{"string": "string"}'

            File Example:

                --update-labels=path_to_file.(yaml|json)

         At most one of these can be specified:

           --clear-labels
              Clear labels value and set to empty map.

           --remove-labels=REMOVE_LABELS
              Remove existing value from map labels. Sets remove_labels value.

              Shorthand Example:

                  --remove-labels=string,string

              JSON Example:

                  --remove-labels=["string"]

              File Example:

                  --remove-labels=path_to_file.(yaml|json)

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the saasservicemgmt/v1 API. The full documentation for
    this API can be found at:
    https://docs.cloud.google.com/app-lifecycle-manager

NOTES
    This variant is also available:

        $ gcloud beta app-lifecycle-manager rollouts update
```

### gcloud beta app-lifecycle-manager rollouts create

```text
NAME
    gcloud beta app-lifecycle-manager rollouts create - create a rollout

SYNOPSIS
    gcloud beta app-lifecycle-manager rollouts create ROLLOUT
        (--flag-release=FLAG_RELEASE | --release=RELEASE)
        [--labels=[LABELS,...]] [--location=LOCATION]
        [--rollout-kind=ROLLOUT_KIND]
        [--rollout-orchestration-strategy=ROLLOUT_ORCHESTRATION_STRATEGY]
        [--unit-filter=UNIT_FILTER]
        [--control-action=CONTROL_ACTION : --[no-]retry-failed-operations]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta app-lifecycle-manager rollouts delete

```text
NAME
    gcloud beta app-lifecycle-manager rollouts delete - delete a rollout

SYNOPSIS
    gcloud beta app-lifecycle-manager rollouts delete
        (ROLLOUT : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta app-lifecycle-manager rollouts describe

```text
NAME
    gcloud beta app-lifecycle-manager rollouts describe - describe a rollout

SYNOPSIS
    gcloud beta app-lifecycle-manager rollouts describe
        (ROLLOUT : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta app-lifecycle-manager rollouts list

```text
NAME
    gcloud beta app-lifecycle-manager rollouts list - list rollouts

SYNOPSIS
    gcloud beta app-lifecycle-manager rollouts list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta app-lifecycle-manager rollouts update

```text
NAME
    gcloud beta app-lifecycle-manager rollouts update - update a rollout

SYNOPSIS
    gcloud beta app-lifecycle-manager rollouts update
        (ROLLOUT : --location=LOCATION)
        [--rollout-orchestration-strategy=ROLLOUT_ORCHESTRATION_STRATEGY]
        [--unit-filter=UNIT_FILTER]
        [--clear-control
          --control-action=CONTROL_ACTION --[no-]retry-failed-operations]
        [--labels=[LABELS,...]
          | --update-labels=[UPDATE_LABELS,...] --clear-labels
          | --remove-labels=REMOVE_LABELS] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/app-lifecycle-manager/rollouts (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
