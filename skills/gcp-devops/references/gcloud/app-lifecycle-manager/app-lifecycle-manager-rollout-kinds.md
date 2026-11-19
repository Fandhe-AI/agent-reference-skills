---
source: https://docs.cloud.google.com/sdk/gcloud/reference/app-lifecycle-manager/rollout-kinds
---

# gcloud app-lifecycle-manager rollout-kinds

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud app-lifecycle-manager rollout-kinds create

```text
NAME
    gcloud app-lifecycle-manager rollout-kinds create - create a rollout kind

SYNOPSIS
    gcloud app-lifecycle-manager rollout-kinds create ROLLOUT_KIND
        --unit-kind=UNIT_KIND [--labels=[LABELS,...]] [--location=LOCATION]
        [--rollout-orchestration-strategy=ROLLOUT_ORCHESTRATION_STRATEGY]
        [--unit-filter=UNIT_FILTER]
        [--update-unit-kind-strategy=UPDATE_UNIT_KIND_STRATEGY]
        [--error-budget-allowed-count=ERROR_BUDGET_ALLOWED_COUNT
          --error-budget-allowed-percentage=ERROR_BUDGET_ALLOWED_PERCENTAGE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create an App Lifecycle Manager rollout kind.

    A rollout kind describes the settings of rollout execution for the units of
    a unit kind, such as the orchestration strategy and error budget.

EXAMPLES
    To create a rollout kind named my-rollout-kind for the unit kind
    my-unit-kind in location us-central1, run:

        $ gcloud app-lifecycle-manager rollout-kinds create \
            my-rollout-kind --location=us-central1 --unit-kind=my-unit-kind

    To create a rollout kind named my-rollout-kind that rolls out to one
    location at a time, never updates the unit kind, and has the label
    env=prod, run:

        $ gcloud app-lifecycle-manager rollout-kinds create \
            my-rollout-kind --location=us-central1 \
            --unit-kind=my-unit-kind \
            --rollout-orchestration-strategy=Google.Cloud.Simple.OneLocation\
        AtATime --update-unit-kind-strategy=never --labels=env=prod

    To create a rollout kind named my-rollout-kind that pauses rollouts when
    more than 2 units fail in a location, run:

        $ gcloud app-lifecycle-manager rollout-kinds create \
            my-rollout-kind --location=us-central1 \
            --unit-kind=my-unit-kind --error-budget-allowed-count=2

POSITIONAL ARGUMENTS
     RolloutKindId resource - Rollout kind to create. This represents a Cloud
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument rollout_kind on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument rollout_kind on the command line with a fully
        specified name;
      * provide the argument --location on the command line.

     This must be specified.

       ROLLOUT_KIND
          ID of the rolloutKindId or fully qualified identifier for the
          rolloutKindId.

          To set the rollout_kind attribute:
          + provide the argument rollout_kind on the command line.

REQUIRED FLAGS
     UnitKind resource - Unit kind that this rollout kind corresponds to.
     Rollouts stemming from this rollout kind target the units of this unit
     kind. The unit kind cannot be changed after the rollout kind is created.
     This represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --unit-kind on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument --unit-kind on the command line with a fully
        specified name;
      * provide the argument --location on the command line.

     This must be specified.

       --unit-kind=UNIT_KIND
          ID of the unitKind or fully qualified identifier for the unitKind.

          To set the unit_kind attribute:
          + provide the argument --unit-kind on the command line.

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
        For resources [rollout_kind, unit-kind], provides fallback value for
        resource location attribute. When the resource's full URI path is not
        provided, location will fallback to this flag value.

     --rollout-orchestration-strategy=ROLLOUT_ORCHESTRATION_STRATEGY
        Strategy to use for executing rollouts. Supported values are
        Google.Cloud.Simple.AllAtOnce, Google.Cloud.Simple.OneLocationAtATime,
        Google.Cloud.Progressive.Gradual.v1, and
        Google.Cloud.Progressive.SingleLocation.v1.

     --unit-filter=UNIT_FILTER
        Filter, in Common Expression Language (CEL) format, that selects the
        eligible units. The filter can only reduce, not expand, the scope of
        the rollout. For more information about CEL, see
        https://github.com/google/cel-spec.

     --update-unit-kind-strategy=UPDATE_UNIT_KIND_STRATEGY
        Strategy for updating the unit kind. By default, the unit kind is
        updated when the rollout starts. UPDATE_UNIT_KIND_STRATEGY must be one
        of:

         never
            Never update the unit kind.
         on-start
            Update the unit kind when the rollout starts.

     Error budget settings.

     Configuration for the error budget. If the number of failed units in a
     location exceeds the larger of --error-budget-allowed-count and
     --error-budget-allowed-percentage percent of the units, the rollout is
     paused. If not set, App Lifecycle Manager attempts to update all units,
     regardless of the number of failures.

     --error-budget-allowed-count=ERROR_BUDGET_ALLOWED_COUNT
        Maximum number of failed units allowed in a location without pausing
        the rollout.

     --error-budget-allowed-percentage=ERROR_BUDGET_ALLOWED_PERCENTAGE
        Maximum percentage of units allowed to fail in a location without
        pausing the rollout. Must be greater than 0 and at most 100.

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

        $ gcloud beta app-lifecycle-manager rollout-kinds create
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud app-lifecycle-manager rollout-kinds create my-rollout-kind \
    --location=us-central1 \
    --unit-kind=my-unit-kind \
    --rollout-orchestration-strategy=Google.Cloud.Simple.OneLocationAtATime \
    --update-unit-kind-strategy=never \
    --labels=env=prod
```

### gcloud app-lifecycle-manager rollout-kinds delete

```text
NAME
    gcloud app-lifecycle-manager rollout-kinds delete - delete a rollout kind

SYNOPSIS
    gcloud app-lifecycle-manager rollout-kinds delete
        (ROLLOUT_KIND : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete an App Lifecycle Manager rollout kind.

    The command prompts for confirmation before the rollout kind is deleted.

EXAMPLES
    To delete the rollout kind named my-rollout-kind in location us-central1,
    run:

        $ gcloud app-lifecycle-manager rollout-kinds delete \
            my-rollout-kind --location=us-central1

    To delete the rollout kind named my-rollout-kind in location us-central1
    without a confirmation prompt, run:

        $ gcloud app-lifecycle-manager rollout-kinds delete \
            my-rollout-kind --location=us-central1 --quiet

POSITIONAL ARGUMENTS
     RolloutKindId resource - Rollout kind to delete. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument rollout_kind on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ROLLOUT_KIND
          ID of the rolloutKindId or fully qualified identifier for the
          rolloutKindId.

          To set the rollout_kind attribute:
          + provide the argument rollout_kind on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location ID

          To set the location attribute:
          + provide the argument rollout_kind on the command line with a
            fully specified name;
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

        $ gcloud beta app-lifecycle-manager rollout-kinds delete
```

### gcloud app-lifecycle-manager rollout-kinds describe

```text
NAME
    gcloud app-lifecycle-manager rollout-kinds describe - describe a rollout
        kind

SYNOPSIS
    gcloud app-lifecycle-manager rollout-kinds describe
        (ROLLOUT_KIND : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Display the details of an App Lifecycle Manager rollout kind.

EXAMPLES
    To describe the rollout kind named my-rollout-kind in location us-central1,
    run:

        $ gcloud app-lifecycle-manager rollout-kinds describe \
            my-rollout-kind --location=us-central1

    To display only the unit kind and orchestration strategy of the rollout
    kind named my-rollout-kind in location us-central1, run:

        $ gcloud app-lifecycle-manager rollout-kinds describe \
            my-rollout-kind --location=us-central1 \
            --format="yaml(unitKind,rolloutOrchestrationStrategy)"

POSITIONAL ARGUMENTS
     RolloutKindId resource - Rollout kind to describe. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument rollout_kind on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ROLLOUT_KIND
          ID of the rolloutKindId or fully qualified identifier for the
          rolloutKindId.

          To set the rollout_kind attribute:
          + provide the argument rollout_kind on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location ID

          To set the location attribute:
          + provide the argument rollout_kind on the command line with a
            fully specified name;
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

        $ gcloud beta app-lifecycle-manager rollout-kinds describe
```

### gcloud app-lifecycle-manager rollout-kinds list

```text
NAME
    gcloud app-lifecycle-manager rollout-kinds list - list rollout kinds

SYNOPSIS
    gcloud app-lifecycle-manager rollout-kinds list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List App Lifecycle Manager rollout kinds.

    If --location is not specified, rollout kinds in all locations are listed.

EXAMPLES
    To list all rollout kinds in location us-central1, run:

        $ gcloud app-lifecycle-manager rollout-kinds list \
            --location=us-central1

    To list only the names of rollout kinds with the label env=prod in all
    locations, run:

        $ gcloud app-lifecycle-manager rollout-kinds list \
            --filter="labels.env=prod" --format="value(name)"

FLAGS
     Location resource - Location of the rollout kinds to list. This represents
     a Cloud resource. (NOTE) Some attributes are not given arguments in this
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

        $ gcloud beta app-lifecycle-manager rollout-kinds list
```

### gcloud app-lifecycle-manager rollout-kinds update

```text
NAME
    gcloud app-lifecycle-manager rollout-kinds update - update a rollout kind

SYNOPSIS
    gcloud app-lifecycle-manager rollout-kinds update
        (ROLLOUT_KIND : --location=LOCATION)
        [--rollout-orchestration-strategy=ROLLOUT_ORCHESTRATION_STRATEGY]
        [--unit-filter=UNIT_FILTER]
        [--update-unit-kind-strategy=UPDATE_UNIT_KIND_STRATEGY]
        [--clear-error-budget
          --error-budget-allowed-count=ERROR_BUDGET_ALLOWED_COUNT
          --error-budget-allowed-percentage=ERROR_BUDGET_ALLOWED_PERCENTAGE]
        [--labels=[LABELS,...]
          | --update-labels=[UPDATE_LABELS,...] --clear-labels
          | --remove-labels=REMOVE_LABELS] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update an App Lifecycle Manager rollout kind.

EXAMPLES
    To change the orchestration strategy of the rollout kind named
    my-rollout-kind in location us-central1 to roll out to all locations at
    once, run:

        $ gcloud app-lifecycle-manager rollout-kinds update \
            my-rollout-kind --location=us-central1 \
            --rollout-orchestration-strategy=Google.Cloud.Simple.AllAtOnce

    To allow up to 10% of units to fail in a location and add or update the
    label env=prod on the rollout kind named my-rollout-kind, run:

        $ gcloud app-lifecycle-manager rollout-kinds update \
            my-rollout-kind --location=us-central1 \
            --error-budget-allowed-percentage=10 --update-labels=env=prod

POSITIONAL ARGUMENTS
     RolloutKindId resource - Rollout kind to update. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument rollout_kind on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ROLLOUT_KIND
          ID of the rolloutKindId or fully qualified identifier for the
          rolloutKindId.

          To set the rollout_kind attribute:
          + provide the argument rollout_kind on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location ID

          To set the location attribute:
          + provide the argument rollout_kind on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

FLAGS
     --rollout-orchestration-strategy=ROLLOUT_ORCHESTRATION_STRATEGY
        Strategy to use for executing rollouts. Supported values are
        Google.Cloud.Simple.AllAtOnce, Google.Cloud.Simple.OneLocationAtATime,
        Google.Cloud.Progressive.Gradual.v1, and
        Google.Cloud.Progressive.SingleLocation.v1.

     --unit-filter=UNIT_FILTER
        Filter, in Common Expression Language (CEL) format, that selects the
        eligible units. The filter can only reduce, not expand, the scope of
        the rollout. For more information about CEL, see
        https://github.com/google/cel-spec.

     --update-unit-kind-strategy=UPDATE_UNIT_KIND_STRATEGY
        Strategy for updating the unit kind. If not set, the unit kind is
        updated when the rollout starts. UPDATE_UNIT_KIND_STRATEGY must be one
        of:

         never
            Never update the unit kind.
         on-start
            Update the unit kind when the rollout starts.

     Error budget settings.

     Configuration for the error budget. If the number of failed units in a
     location exceeds the larger of --error-budget-allowed-count and
     --error-budget-allowed-percentage percent of the units, the rollout is
     paused. If not set, App Lifecycle Manager attempts to update all units,
     regardless of the number of failures.

     --clear-error-budget
        Set rolloutKind.errorBudget back to default value.

     --error-budget-allowed-count=ERROR_BUDGET_ALLOWED_COUNT
        Maximum number of failed units allowed in a location without pausing
        the rollout.

     --error-budget-allowed-percentage=ERROR_BUDGET_ALLOWED_PERCENTAGE
        Maximum percentage of units allowed to fail in a location without
        pausing the rollout. Must be greater than 0 and at most 100.

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

        $ gcloud beta app-lifecycle-manager rollout-kinds update
```

### gcloud beta app-lifecycle-manager rollout-kinds create

```text
NAME
    gcloud beta app-lifecycle-manager rollout-kinds create - create a rollout
        kind

SYNOPSIS
    gcloud beta app-lifecycle-manager rollout-kinds create ROLLOUT_KIND
        --unit-kind=UNIT_KIND [--labels=[LABELS,...]] [--location=LOCATION]
        [--rollout-orchestration-strategy=ROLLOUT_ORCHESTRATION_STRATEGY]
        [--unit-filter=UNIT_FILTER]
        [--update-unit-kind-strategy=UPDATE_UNIT_KIND_STRATEGY]
        [--error-budget-allowed-count=ERROR_BUDGET_ALLOWED_COUNT
          --error-budget-allowed-percentage=ERROR_BUDGET_ALLOWED_PERCENTAGE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta app-lifecycle-manager rollout-kinds delete

```text
NAME
    gcloud beta app-lifecycle-manager rollout-kinds delete - delete a rollout
        kind

SYNOPSIS
    gcloud beta app-lifecycle-manager rollout-kinds delete
        (ROLLOUT_KIND : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta app-lifecycle-manager rollout-kinds describe

```text
NAME
    gcloud beta app-lifecycle-manager rollout-kinds describe - describe a
        rollout kind

SYNOPSIS
    gcloud beta app-lifecycle-manager rollout-kinds describe
        (ROLLOUT_KIND : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta app-lifecycle-manager rollout-kinds list

```text
NAME
    gcloud beta app-lifecycle-manager rollout-kinds list - list rollout kinds

SYNOPSIS
    gcloud beta app-lifecycle-manager rollout-kinds list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta app-lifecycle-manager rollout-kinds update

```text
NAME
    gcloud beta app-lifecycle-manager rollout-kinds update - update a rollout
        kind

SYNOPSIS
    gcloud beta app-lifecycle-manager rollout-kinds update
        (ROLLOUT_KIND : --location=LOCATION)
        [--rollout-orchestration-strategy=ROLLOUT_ORCHESTRATION_STRATEGY]
        [--unit-filter=UNIT_FILTER]
        [--update-unit-kind-strategy=UPDATE_UNIT_KIND_STRATEGY]
        [--clear-error-budget
          --error-budget-allowed-count=ERROR_BUDGET_ALLOWED_COUNT
          --error-budget-allowed-percentage=ERROR_BUDGET_ALLOWED_PERCENTAGE]
        [--labels=[LABELS,...]
          | --update-labels=[UPDATE_LABELS,...] --clear-labels
          | --remove-labels=REMOVE_LABELS] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/app-lifecycle-manager/rollout-kinds (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
