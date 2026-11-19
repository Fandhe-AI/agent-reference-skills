---
source: https://docs.cloud.google.com/sdk/gcloud/reference/app-lifecycle-manager/unit-operations
---

# gcloud app-lifecycle-manager unit-operations

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud app-lifecycle-manager unit-operations create

```text
NAME
    gcloud app-lifecycle-manager unit-operations create - create a unit
        operation

SYNOPSIS
    gcloud app-lifecycle-manager unit-operations create UNIT_OPERATION
        --unit=UNIT [--cancel] [--labels=[LABELS,...]] [--location=LOCATION]
        [--parent-unit-operation=PARENT_UNIT_OPERATION] [--rollout=ROLLOUT]
        [--schedule-start-time=SCHEDULE_START_TIME]
        [--deprovision | --provision
          --provision-input-variables=[type=TYPE],
          [value=VALUE],[variable=VARIABLE]
          --provision-release=PROVISION_RELEASE | --upgrade
          --upgrade-input-variables=[type=TYPE],
          [value=VALUE],[variable=VARIABLE] --upgrade-release=UPGRADE_RELEASE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create an App Lifecycle Manager unit operation.

    A unit operation encapsulates the intent to change or interact with the
    service component represented by a specific unit. For example, a unit
    operation can provision, upgrade, or deprovision the unit. Multiple unit
    operations can be requested and scheduled, but only one runs at a time.

EXAMPLES
    To create a unit operation named my-unit-operation in location us-central1
    that provisions the unit my-unit with the release my-release, run:

        $ gcloud app-lifecycle-manager unit-operations create \
            my-unit-operation --location=us-central1 --unit=my-unit \
            --provision --provision-release=my-release

    To create a unit operation named my-unit-operation that deprovisions the
    unit my-unit, run:

        $ gcloud app-lifecycle-manager unit-operations create \
            my-unit-operation --location=us-central1 --unit=my-unit \
            --deprovision

    To create a unit operation named my-unit-operation that upgrades the unit
    my-unit to the release my-new-release with the input variable instance_name
    set to my-instance, scheduled to start at 2099-01-01T10:00:00Z, run:

        $ gcloud app-lifecycle-manager unit-operations create \
            my-unit-operation --location=us-central1 --unit=my-unit \
            --upgrade --upgrade-release=my-new-release \
            --upgrade-input-variables=variable=instance_name,\
        value=my-instance,type=string \
            --schedule-start-time=2099-01-01T10:00:00Z

POSITIONAL ARGUMENTS
     UnitOperation resource - Unit operation to create. This represents a Cloud
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument unit_operation on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument unit_operation on the command line with a fully
        specified name;
      * provide the argument --location on the command line.

     This must be specified.

       UNIT_OPERATION
          ID of the unitOperation or fully qualified identifier for the
          unitOperation.

          To set the unit_operation attribute:
          + provide the argument unit_operation on the command line.

REQUIRED FLAGS
     Unit resource - Unit that the unit operation acts upon. The unit cannot be
     changed after the unit operation is created. This represents a Cloud
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument --unit on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument --unit on the command line with a fully
        specified name;
      * provide the argument --location on the command line.

     This must be specified.

       --unit=UNIT
          ID of the unit or fully qualified identifier for the unit.

          To set the unit attribute:
          + provide the argument --unit on the command line.

OPTIONAL FLAGS
     --cancel
        Attempt to cancel the operation. Cancellation might fail if the
        operation is already running.

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
        For resources [parent-unit-operation, provision-release, rollout, unit,
        unit_operation, upgrade-release], provides fallback value for resource
        location attribute. When the resource's full URI path is not provided,
        location will fallback to this flag value.

     ParentUnitOperation resource - Parent unit operation. If an operation
     creates child operations as part of its workflow, set this flag on each
     child operation to the parent unit operation for tracing. This represents
     a Cloud resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument --parent-unit-operation on the command line with
        a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument --parent-unit-operation on the command line with
        a fully specified name;
      * provide the argument --location on the command line.

     --parent-unit-operation=PARENT_UNIT_OPERATION
        ID of the parentUnitOperation or fully qualified identifier for the
        parentUnitOperation.

        To set the unit-operation attribute:
        * provide the argument --parent-unit-operation on the command line.

     RolloutId resource - Rollout that created this unit operation. The rollout
     cannot be changed after it is set and is used only for filtering. If a
     dependent unit and unit operation are created as part of another unit
     operation, they use the same rollout. This represents a Cloud resource.
     (NOTE) Some attributes are not given arguments in this group but can be
     set in other ways.

     To set the project attribute:
      * provide the argument --rollout on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument --rollout on the command line with a fully
        specified name;
      * provide the argument --location on the command line.

     --rollout=ROLLOUT
        ID of the rolloutId or fully qualified identifier for the rolloutId.

        To set the rollout attribute:
        * provide the argument --rollout on the command line.

     Time specification to schedule the operation.

     --schedule-start-time=SCHEDULE_START_TIME
        Start time of the operation. If not set, the start of the next
        maintenance window is used.

     Unit operation type.

     At most one of these can be specified:

       Deprovision operation, which deprovisions the underlying resources
       represented by the unit. The operation can run only if the unit is
       provisioned.

       --deprovision
          Deprovision the unit.

       Provision operation, which provisions the underlying resources
       represented by the unit. The operation can run only if the unit is not
       provisioned.

       --provision
          Provision the unit.

       --provision-input-variables=[type=TYPE],[value=VALUE],[variable=VARIABLE]
          Input variables for the provision operation. A maximum of 100 input
          variables can be specified.

           type
              Name of a supported variable type. Supported types are string,
              int, bool, struct, and list.

           value
              String-encoded value for the variable. Values of type struct or
              list must be JSON-encoded strings.

           variable
              Required, Name of the variable from the actuation configuration.

          Shorthand Example:

              --provision-input-variables=type=string,value=string,variable=string --provision-input-variables=type=string,value=string,variable=string

          JSON Example:

              --provision-input-variables='[{"type": "string", "value": "string", "variable": "string"}]'

          File Example:

              --provision-input-variables=path_to_file.(yaml|json)

       Release resource - Release to use for the unit. This represents a Cloud
       resource. (NOTE) Some attributes are not given arguments in this group
       but can be set in other ways.

       To set the project attribute:
        + provide the argument --provision-release on the command line with a
          fully specified name;
        + provide the argument --project on the command line;
        + set the property core/project.

       To set the location attribute:
        + provide the argument --provision-release on the command line with a
          fully specified name;
        + provide the argument --location on the command line.

       --provision-release=PROVISION_RELEASE
          ID of the release or fully qualified identifier for the release.

          To set the release attribute:
          + provide the argument --provision-release on the command line.

       Upgrade operation, which upgrades a provisioned unit, possibly including
       the underlying resources represented by the unit. The operation can run
       only if the unit is provisioned.

       --upgrade
          Upgrade the unit.

       --upgrade-input-variables=[type=TYPE],[value=VALUE],[variable=VARIABLE]
          Input variables for the upgrade operation. A maximum of 100 input
          variables can be specified.

           type
              Name of a supported variable type. Supported types are string,
              int, bool, struct, and list.

           value
              String-encoded value for the variable. Values of type struct or
              list must be JSON-encoded strings.

           variable
              Required, Name of the variable from the actuation configuration.

          Shorthand Example:

              --upgrade-input-variables=type=string,value=string,variable=string --upgrade-input-variables=type=string,value=string,variable=string

          JSON Example:

              --upgrade-input-variables='[{"type": "string", "value": "string", "variable": "string"}]'

          File Example:

              --upgrade-input-variables=path_to_file.(yaml|json)

       Release resource - Release to use for the unit. This represents a Cloud
       resource. (NOTE) Some attributes are not given arguments in this group
       but can be set in other ways.

       To set the project attribute:
        + provide the argument --upgrade-release on the command line with a
          fully specified name;
        + provide the argument --project on the command line;
        + set the property core/project.

       To set the location attribute:
        + provide the argument --upgrade-release on the command line with a
          fully specified name;
        + provide the argument --location on the command line.

       --upgrade-release=UPGRADE_RELEASE
          ID of the release or fully qualified identifier for the release.

          To set the release attribute:
          + provide the argument --upgrade-release on the command line.

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

        $ gcloud beta app-lifecycle-manager unit-operations create
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud app-lifecycle-manager unit-operations create my-unit-operation \
    --location=us-central1 \
    --unit=my-unit \
    --upgrade \
    --upgrade-release=my-new-release \
    --upgrade-input-variables=variable=instance_name,value=my-instance,type=string \
    --schedule-start-time=2099-01-01T10:00:00Z
```

### gcloud app-lifecycle-manager unit-operations delete

```text
NAME
    gcloud app-lifecycle-manager unit-operations delete - delete a unit
        operation

SYNOPSIS
    gcloud app-lifecycle-manager unit-operations delete
        (UNIT_OPERATION : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete an App Lifecycle Manager unit operation.

    The command prompts for confirmation before the unit operation is deleted.

EXAMPLES
    To delete the unit operation named my-unit-operation in location
    us-central1, run:

        $ gcloud app-lifecycle-manager unit-operations delete \
            my-unit-operation --location=us-central1

    To delete the unit operation named my-unit-operation in location
    us-central1 without a confirmation prompt, run:

        $ gcloud app-lifecycle-manager unit-operations delete \
            my-unit-operation --location=us-central1 --quiet

POSITIONAL ARGUMENTS
     UnitOperation resource - Unit operation to delete. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument unit_operation on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       UNIT_OPERATION
          ID of the unitOperation or fully qualified identifier for the
          unitOperation.

          To set the unit_operation attribute:
          + provide the argument unit_operation on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location ID

          To set the location attribute:
          + provide the argument unit_operation on the command line with a
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

        $ gcloud beta app-lifecycle-manager unit-operations delete
```

### gcloud app-lifecycle-manager unit-operations describe

```text
NAME
    gcloud app-lifecycle-manager unit-operations describe - describe a unit
        operation

SYNOPSIS
    gcloud app-lifecycle-manager unit-operations describe
        (UNIT_OPERATION : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Display the details of an App Lifecycle Manager unit operation.

EXAMPLES
    To describe the unit operation named my-unit-operation in location
    us-central1, run:

        $ gcloud app-lifecycle-manager unit-operations describe \
            my-unit-operation --location=us-central1

    To display only the unit and state of the unit operation named
    my-unit-operation in location us-central1, run:

        $ gcloud app-lifecycle-manager unit-operations describe \
            my-unit-operation --location=us-central1 \
            --format="yaml(unit,state)"

POSITIONAL ARGUMENTS
     UnitOperation resource - Unit operation to describe. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument unit_operation on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       UNIT_OPERATION
          ID of the unitOperation or fully qualified identifier for the
          unitOperation.

          To set the unit_operation attribute:
          + provide the argument unit_operation on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location ID

          To set the location attribute:
          + provide the argument unit_operation on the command line with a
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

        $ gcloud beta app-lifecycle-manager unit-operations describe
```

### gcloud app-lifecycle-manager unit-operations list

```text
NAME
    gcloud app-lifecycle-manager unit-operations list - list unit operations

SYNOPSIS
    gcloud app-lifecycle-manager unit-operations list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List App Lifecycle Manager unit operations.

    If --location is not specified, unit operations in all locations are
    listed.

EXAMPLES
    To list all unit operations in location us-central1, run:

        $ gcloud app-lifecycle-manager unit-operations list \
            --location=us-central1

    To list only the names of unit operations with the label env=prod in all
    locations, run:

        $ gcloud app-lifecycle-manager unit-operations list \
            --filter="labels.env=prod" --format="value(name)"

FLAGS
     Location resource - Location of the unit operations to list. This
     represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

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

        $ gcloud beta app-lifecycle-manager unit-operations list
```

### gcloud app-lifecycle-manager unit-operations update

```text
NAME
    gcloud app-lifecycle-manager unit-operations update - update a unit
        operation

SYNOPSIS
    gcloud app-lifecycle-manager unit-operations update UNIT_OPERATION
        [--cancel] [--location=LOCATION]
        [--schedule-start-time=SCHEDULE_START_TIME]
        [--clear-parent-unit-operation
          | --parent-unit-operation=PARENT_UNIT_OPERATION]
        [--clear-rollout | --rollout=ROLLOUT]
        [--deprovision | --provision --clear-provision-release
          | --provision-release=PROVISION_RELEASE
          --provision-input-variables=[type=TYPE],
          [value=VALUE],[variable=VARIABLE]
          | --add-provision-input-variables=[type=TYPE],
          [value=VALUE],[variable=VARIABLE] --clear-provision-input-variables
          | --remove-provision-input-variables=[type=TYPE],
          [value=VALUE],[variable=VARIABLE] | --upgrade --clear-upgrade-release
          | --upgrade-release=UPGRADE_RELEASE
          --upgrade-input-variables=[type=TYPE],
          [value=VALUE],[variable=VARIABLE]
          | --add-upgrade-input-variables=[type=TYPE],
          [value=VALUE],[variable=VARIABLE] --clear-upgrade-input-variables
          | --remove-upgrade-input-variables=[type=TYPE],
          [value=VALUE],[variable=VARIABLE]]
        [--labels=[LABELS,...]
          | --update-labels=[UPDATE_LABELS,...] --clear-labels
          | --remove-labels=REMOVE_LABELS] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update an App Lifecycle Manager unit operation.

    Use --cancel to request cancellation of a unit operation.

EXAMPLES
    To request cancellation of the unit operation named my-unit-operation in
    location us-central1, run:

        $ gcloud app-lifecycle-manager unit-operations update \
            my-unit-operation --location=us-central1 --cancel

    To reschedule the unit operation named my-unit-operation to start at
    2099-01-02T10:00:00Z and add or update the label env=prod, run:

        $ gcloud app-lifecycle-manager unit-operations update \
            my-unit-operation --location=us-central1 \
            --schedule-start-time=2099-01-02T10:00:00Z \
            --update-labels=env=prod

POSITIONAL ARGUMENTS
     UnitOperation resource - Unit operation to update. This represents a Cloud
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument unit_operation on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument unit_operation on the command line with a fully
        specified name;
      * provide the argument --location on the command line.

     This must be specified.

       UNIT_OPERATION
          ID of the unitOperation or fully qualified identifier for the
          unitOperation.

          To set the unit_operation attribute:
          + provide the argument unit_operation on the command line.

FLAGS
     --cancel
        Attempt to cancel the operation. Cancellation might fail if the
        operation is already running.

     --location=LOCATION
        For resources [parent-unit-operation, provision-release, rollout,
        unit_operation, upgrade-release], provides fallback value for resource
        location attribute. When the resource's full URI path is not provided,
        location will fallback to this flag value.

     Time specification to schedule the operation.

     --schedule-start-time=SCHEDULE_START_TIME
        Start time of the operation. If not set, the start of the next
        maintenance window is used.

     Update parent_unit_operation.

     At most one of these can be specified:

       --clear-parent-unit-operation
          Clear parent_unit_operation value and set to null.

       ParentUnitOperation resource - Set parent_unit_operation to new value.

       Parent unit operation. If an operation creates child operations as part
       of its workflow, set this flag on each child operation to the parent
       unit operation for tracing. This represents a Cloud resource. (NOTE)
       Some attributes are not given arguments in this group but can be set in
       other ways.

       To set the project attribute:
        + provide the argument --parent-unit-operation on the command line
          with a fully specified name;
        + provide the argument --project on the command line;
        + set the property core/project.

       To set the location attribute:
        + provide the argument --parent-unit-operation on the command line
          with a fully specified name;
        + provide the argument --location on the command line.

       --parent-unit-operation=PARENT_UNIT_OPERATION
          ID of the parentUnitOperation or fully qualified identifier for the
          parentUnitOperation.

          To set the unit-operation attribute:
          + provide the argument --parent-unit-operation on the command line.

     Update rollout.

     At most one of these can be specified:

       --clear-rollout
          Clear rollout value and set to null.

       RolloutId resource - Set rollout to new value.

       Rollout that created this unit operation. The rollout cannot be changed
       after it is set and is used only for filtering. If a dependent unit and
       unit operation are created as part of another unit operation, they use
       the same rollout. This represents a Cloud resource. (NOTE) Some
       attributes are not given arguments in this group but can be set in other
       ways.

       To set the project attribute:
        + provide the argument --rollout on the command line with a fully
          specified name;
        + provide the argument --project on the command line;
        + set the property core/project.

       To set the location attribute:
        + provide the argument --rollout on the command line with a fully
          specified name;
        + provide the argument --location on the command line.

       --rollout=ROLLOUT
          ID of the rolloutId or fully qualified identifier for the rolloutId.

          To set the rollout attribute:
          + provide the argument --rollout on the command line.

     Unit operation type.

     At most one of these can be specified:

       Deprovision operation, which deprovisions the underlying resources
       represented by the unit. The operation can run only if the unit is
       provisioned.

       --deprovision
          Deprovision the unit.

       Provision operation, which provisions the underlying resources
       represented by the unit. The operation can run only if the unit is not
       provisioned.

       --provision
          Provision the unit.

       Update provision_release.

       At most one of these can be specified:

         --clear-provision-release
            Clear provision_release value and set to null.

         Release resource - Set provision_release to new value.

         Release to use for the unit. This represents a Cloud resource. (NOTE)
         Some attributes are not given arguments in this group but can be set
         in other ways.

         To set the project attribute:
          - provide the argument --provision-release on the command line with
            a fully specified name;
          - provide the argument --project on the command line;
          - set the property core/project.

         To set the location attribute:
          - provide the argument --provision-release on the command line with
            a fully specified name;
          - provide the argument --location on the command line.

         --provision-release=PROVISION_RELEASE
            ID of the release or fully qualified identifier for the release.

            To set the release attribute:
            - provide the argument --provision-release on the command line.

       Update provision_input_variables.

       At most one of these can be specified:

         --provision-input-variables=[type=TYPE],[value=VALUE],[variable=VARIABLE]
            Set provision_input_variables to new value. Input variables for the
            provision operation. A maximum of 100 input variables can be
            specified.

             type
                Name of a supported variable type. Supported types are string,
                int, bool, struct, and list.

             value
                String-encoded value for the variable. Values of type struct or
                list must be JSON-encoded strings.

             variable
                Required, Name of the variable from the actuation
                configuration.

            Shorthand Example:

                --provision-input-variables=type=string,value=string,variable=string --provision-input-variables=type=string,value=string,variable=string

            JSON Example:

                --provision-input-variables='[{"type": "string", "value": "string", "variable": "string"}]'

            File Example:

                --provision-input-variables=path_to_file.(yaml|json)

         Or at least one of these can be specified:

           --add-provision-input-variables=[type=TYPE],[value=VALUE],[variable=VARIABLE]
              Add new value to provision_input_variables list. Input variables
              for the provision operation. A maximum of 100 input variables can
              be specified.

               type
                  Name of a supported variable type. Supported types are
                  string, int, bool, struct, and list.

               value
                  String-encoded value for the variable. Values of type struct
                  or list must be JSON-encoded strings.

               variable
                  Required, Name of the variable from the actuation
                  configuration.

              Shorthand Example:

                  --add-provision-input-variables=type=string,value=string,variable=string --add-provision-input-variables=type=string,value=string,variable=string

              JSON Example:

                  --add-provision-input-variables='[{"type": "string", "value": "string", "variable": "string"}]'

              File Example:

                  --add-provision-input-variables=path_to_file.(yaml|json)

           At most one of these can be specified:

             --clear-provision-input-variables
                Clear provision_input_variables value and set to empty list.

             --remove-provision-input-variables=[type=TYPE],[value=VALUE],[variable=VARIABLE]
                Remove existing value from provision_input_variables list.
                Input variables for the provision operation. A maximum of 100
                input variables can be specified.

                 type
                    Name of a supported variable type. Supported types are
                    string, int, bool, struct, and list.

                 value
                    String-encoded value for the variable. Values of type
                    struct or list must be JSON-encoded strings.

                 variable
                    Required, Name of the variable from the actuation
                    configuration.

                Shorthand Example:

                    --remove-provision-input-variables=type=string,value=string,variable=string --remove-provision-input-variables=type=string,value=string,variable=string

                JSON Example:

                    --remove-provision-input-variables='[{"type": "string", "value": "string", "variable": "string"}]'

                File Example:

                    --remove-provision-input-variables=path_to_file.(yaml|json)

       Upgrade operation, which upgrades a provisioned unit, possibly including
       the underlying resources represented by the unit. The operation can run
       only if the unit is provisioned.

       --upgrade
          Upgrade the unit.

       Update upgrade_release.

       At most one of these can be specified:

         --clear-upgrade-release
            Clear upgrade_release value and set to null.

         Release resource - Set upgrade_release to new value.

         Release to use for the unit. This represents a Cloud resource. (NOTE)
         Some attributes are not given arguments in this group but can be set
         in other ways.

         To set the project attribute:
          - provide the argument --upgrade-release on the command line with a
            fully specified name;
          - provide the argument --project on the command line;
          - set the property core/project.

         To set the location attribute:
          - provide the argument --upgrade-release on the command line with a
            fully specified name;
          - provide the argument --location on the command line.

         --upgrade-release=UPGRADE_RELEASE
            ID of the release or fully qualified identifier for the release.

            To set the release attribute:
            - provide the argument --upgrade-release on the command line.

       Update upgrade_input_variables.

       At most one of these can be specified:

         --upgrade-input-variables=[type=TYPE],[value=VALUE],[variable=VARIABLE]
            Set upgrade_input_variables to new value. Input variables for the
            upgrade operation. A maximum of 100 input variables can be
            specified.

             type
                Name of a supported variable type. Supported types are string,
                int, bool, struct, and list.

             value
                String-encoded value for the variable. Values of type struct or
                list must be JSON-encoded strings.

             variable
                Required, Name of the variable from the actuation
                configuration.

            Shorthand Example:

                --upgrade-input-variables=type=string,value=string,variable=string --upgrade-input-variables=type=string,value=string,variable=string

            JSON Example:

                --upgrade-input-variables='[{"type": "string", "value": "string", "variable": "string"}]'

            File Example:

                --upgrade-input-variables=path_to_file.(yaml|json)

         Or at least one of these can be specified:

           --add-upgrade-input-variables=[type=TYPE],[value=VALUE],[variable=VARIABLE]
              Add new value to upgrade_input_variables list. Input variables
              for the upgrade operation. A maximum of 100 input variables can
              be specified.

               type
                  Name of a supported variable type. Supported types are
                  string, int, bool, struct, and list.

               value
                  String-encoded value for the variable. Values of type struct
                  or list must be JSON-encoded strings.

               variable
                  Required, Name of the variable from the actuation
                  configuration.

              Shorthand Example:

                  --add-upgrade-input-variables=type=string,value=string,variable=string --add-upgrade-input-variables=type=string,value=string,variable=string

              JSON Example:

                  --add-upgrade-input-variables='[{"type": "string", "value": "string", "variable": "string"}]'

              File Example:

                  --add-upgrade-input-variables=path_to_file.(yaml|json)

           At most one of these can be specified:

             --clear-upgrade-input-variables
                Clear upgrade_input_variables value and set to empty list.

             --remove-upgrade-input-variables=[type=TYPE],[value=VALUE],[variable=VARIABLE]
                Remove existing value from upgrade_input_variables list. Input
                variables for the upgrade operation. A maximum of 100 input
                variables can be specified.

                 type
                    Name of a supported variable type. Supported types are
                    string, int, bool, struct, and list.

                 value
                    String-encoded value for the variable. Values of type
                    struct or list must be JSON-encoded strings.

                 variable
                    Required, Name of the variable from the actuation
                    configuration.

                Shorthand Example:

                    --remove-upgrade-input-variables=type=string,value=string,variable=string --remove-upgrade-input-variables=type=string,value=string,variable=string

                JSON Example:

                    --remove-upgrade-input-variables='[{"type": "string", "value": "string", "variable": "string"}]'

                File Example:

                    --remove-upgrade-input-variables=path_to_file.(yaml|json)

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

        $ gcloud beta app-lifecycle-manager unit-operations update
```

### gcloud beta app-lifecycle-manager unit-operations create

```text
NAME
    gcloud beta app-lifecycle-manager unit-operations create - create a unit
        operation

SYNOPSIS
    gcloud beta app-lifecycle-manager unit-operations create UNIT_OPERATION
        --unit=UNIT [--cancel] [--labels=[LABELS,...]] [--location=LOCATION]
        [--parent-unit-operation=PARENT_UNIT_OPERATION] [--rollout=ROLLOUT]
        [--schedule-start-time=SCHEDULE_START_TIME]
        [--deprovision | --flag-update=FLAG_UPDATE | --provision
          --provision-input-variables=[type=TYPE],
          [value=VALUE],[variable=VARIABLE]
          --provision-release=PROVISION_RELEASE | --upgrade
          --upgrade-input-variables=[type=TYPE],
          [value=VALUE],[variable=VARIABLE] --upgrade-release=UPGRADE_RELEASE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta app-lifecycle-manager unit-operations delete

```text
NAME
    gcloud beta app-lifecycle-manager unit-operations delete - delete a unit
        operation

SYNOPSIS
    gcloud beta app-lifecycle-manager unit-operations delete
        (UNIT_OPERATION : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta app-lifecycle-manager unit-operations describe

```text
NAME
    gcloud beta app-lifecycle-manager unit-operations describe - describe a
        unit operation

SYNOPSIS
    gcloud beta app-lifecycle-manager unit-operations describe
        (UNIT_OPERATION : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta app-lifecycle-manager unit-operations list

```text
NAME
    gcloud beta app-lifecycle-manager unit-operations list - list unit
        operations

SYNOPSIS
    gcloud beta app-lifecycle-manager unit-operations list
        [--location=LOCATION] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta app-lifecycle-manager unit-operations update

```text
NAME
    gcloud beta app-lifecycle-manager unit-operations update - update a unit
        operation

SYNOPSIS
    gcloud beta app-lifecycle-manager unit-operations update UNIT_OPERATION
        [--cancel] [--location=LOCATION]
        [--schedule-start-time=SCHEDULE_START_TIME]
        [--clear-parent-unit-operation
          | --parent-unit-operation=PARENT_UNIT_OPERATION]
        [--clear-rollout | --rollout=ROLLOUT]
        [--deprovision | --flag-update=FLAG_UPDATE
          | --provision --clear-provision-release
          | --provision-release=PROVISION_RELEASE
          --provision-input-variables=[type=TYPE],
          [value=VALUE],[variable=VARIABLE]
          | --add-provision-input-variables=[type=TYPE],
          [value=VALUE],[variable=VARIABLE] --clear-provision-input-variables
          | --remove-provision-input-variables=[type=TYPE],
          [value=VALUE],[variable=VARIABLE] | --upgrade --clear-upgrade-release
          | --upgrade-release=UPGRADE_RELEASE
          --upgrade-input-variables=[type=TYPE],
          [value=VALUE],[variable=VARIABLE]
          | --add-upgrade-input-variables=[type=TYPE],
          [value=VALUE],[variable=VARIABLE] --clear-upgrade-input-variables
          | --remove-upgrade-input-variables=[type=TYPE],
          [value=VALUE],[variable=VARIABLE]]
        [--labels=[LABELS,...]
          | --update-labels=[UPDATE_LABELS,...] --clear-labels
          | --remove-labels=REMOVE_LABELS] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/app-lifecycle-manager/unit-operations (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
