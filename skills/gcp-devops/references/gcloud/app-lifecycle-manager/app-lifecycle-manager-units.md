---
source: https://docs.cloud.google.com/sdk/gcloud/reference/app-lifecycle-manager/units
---

# gcloud app-lifecycle-manager units

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud app-lifecycle-manager units create

```text
NAME
    gcloud app-lifecycle-manager units create - create a unit

SYNOPSIS
    gcloud app-lifecycle-manager units create UNIT [--application=APPLICATION]
        [--labels=[LABELS,...]] [--location=LOCATION]
        [--maintenance-pinned-until-time=MAINTENANCE_PINNED_UNTIL_TIME]
        [--management-mode=MANAGEMENT_MODE] [--tenant=TENANT]
        [--unit-kind=UNIT_KIND] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create an App Lifecycle Manager unit.

    A unit is an instance of a unit kind whose lifecycle is managed through an
    actuation engine, for example, one based on Terraform. Units are the
    building blocks of a tenant. Use unit operations to provision, upgrade, or
    deprovision a unit.

EXAMPLES
    To create a unit named my-unit of the unit kind my-unit-kind in location
    us-central1, run:

        $ gcloud app-lifecycle-manager units create my-unit \
            --location=us-central1 --unit-kind=my-unit-kind

    To create a unit named my-unit that belongs to the tenant my-tenant, is
    managed by the user, and has the label env=prod, run:

        $ gcloud app-lifecycle-manager units create my-unit \
            --location=us-central1 --unit-kind=my-unit-kind \
            --tenant=my-tenant --management-mode=user --labels=env=prod

POSITIONAL ARGUMENTS
     Unit resource - Unit to create. This represents a Cloud resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument unit on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument unit on the command line with a fully specified
        name;
      * provide the argument --location on the command line.

     This must be specified.

       UNIT
          ID of the unit or fully qualified identifier for the unit.

          To set the unit attribute:
          + provide the argument unit on the command line.

FLAGS
     --application=APPLICATION
        App Hub application that this unit belongs to. All resources deployed
        in this unit are associated with the specified application.

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
        For resources [unit, tenant, unit-kind], provides fallback value for
        resource location attribute. When the resource's full URI path is not
        provided, location will fallback to this flag value.

     Requested directives for performing future maintenance on the unit. These
     directives include a request for the unit to skip maintenance for a period
     of time and remain pinned to its current release. They also include
     controls for postponing scheduled maintenance.

     --maintenance-pinned-until-time=MAINTENANCE_PINNED_UNTIL_TIME
        Time until which the release of the unit is pinned. Until this time,
        changes to the release of the unit are rejected, and rollouts do not
        request an upgrade of the unit.

     --management-mode=MANAGEMENT_MODE
        Management mode of the unit, which indicates whether the lifecycle of
        the unit is controlled by the user or by the system. The management
        mode cannot be changed after the unit is created. MANAGEMENT_MODE must
        be one of:

         system
            The system decides when to deprovision and delete the unit. The
            unit can still be deprovisioned or deleted manually.
         user
            The user manages the lifecycle of the unit.

     Tenant resource - Tenant that this unit belongs to. For example, the
     tenant informs the maintenance policies to use for scheduling future
     updates on the unit. The tenant is optional and cannot be changed after
     the unit is created. This represents a Cloud resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument --tenant on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument --tenant on the command line with a fully
        specified name;
      * provide the argument --location on the command line.

     --tenant=TENANT
        ID of the tenant or fully qualified identifier for the tenant.

        To set the tenant attribute:
        * provide the argument --tenant on the command line.

     UnitKind resource - Unit kind that this unit belongs to. The unit kind
     cannot be changed after it is set. This represents a Cloud resource.
     (NOTE) Some attributes are not given arguments in this group but can be
     set in other ways.

     To set the project attribute:
      * provide the argument --unit-kind on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument --unit-kind on the command line with a fully
        specified name;
      * provide the argument --location on the command line.

     --unit-kind=UNIT_KIND
        ID of the unitKind or fully qualified identifier for the unitKind.

        To set the unit-kind attribute:
        * provide the argument --unit-kind on the command line.

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

        $ gcloud beta app-lifecycle-manager units create
```

### gcloud app-lifecycle-manager units delete

```text
NAME
    gcloud app-lifecycle-manager units delete - delete a unit

SYNOPSIS
    gcloud app-lifecycle-manager units delete (UNIT : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete an App Lifecycle Manager unit.

    The command prompts for confirmation before the unit is deleted.

EXAMPLES
    To delete the unit named my-unit in location us-central1, run:

        $ gcloud app-lifecycle-manager units delete my-unit \
            --location=us-central1

    To delete the unit named my-unit in location us-central1 without a
    confirmation prompt, run:

        $ gcloud app-lifecycle-manager units delete my-unit \
            --location=us-central1 --quiet

POSITIONAL ARGUMENTS
     Unit resource - Unit to delete. The arguments in this group can be used to
     specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument unit on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       UNIT
          ID of the unit or fully qualified identifier for the unit.

          To set the unit attribute:
          + provide the argument unit on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location ID

          To set the location attribute:
          + provide the argument unit on the command line with a fully
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

        $ gcloud beta app-lifecycle-manager units delete
```

### gcloud app-lifecycle-manager units describe

```text
NAME
    gcloud app-lifecycle-manager units describe - describe a unit

SYNOPSIS
    gcloud app-lifecycle-manager units describe (UNIT : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Display the details of an App Lifecycle Manager unit.

EXAMPLES
    To describe the unit named my-unit in location us-central1, run:

        $ gcloud app-lifecycle-manager units describe my-unit \
            --location=us-central1

    To display only the state and current release of the unit named my-unit in
    location us-central1, run:

        $ gcloud app-lifecycle-manager units describe my-unit \
            --location=us-central1 --format="yaml(state,release)"

POSITIONAL ARGUMENTS
     Unit resource - Unit to describe. The arguments in this group can be used
     to specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument unit on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       UNIT
          ID of the unit or fully qualified identifier for the unit.

          To set the unit attribute:
          + provide the argument unit on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location ID

          To set the location attribute:
          + provide the argument unit on the command line with a fully
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

        $ gcloud beta app-lifecycle-manager units describe
```

### gcloud app-lifecycle-manager units list

```text
NAME
    gcloud app-lifecycle-manager units list - list units

SYNOPSIS
    gcloud app-lifecycle-manager units list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List App Lifecycle Manager units.

    If --location is not specified, units in all locations are listed.

EXAMPLES
    To list all units in location us-central1, run:

        $ gcloud app-lifecycle-manager units list --location=us-central1

    To list only the names of units with the label env=prod in all locations,
    run:

        $ gcloud app-lifecycle-manager units list \
            --filter="labels.env=prod" --format="value(name)"

FLAGS
     Location resource - Location of the units to list. This represents a Cloud
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

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

        $ gcloud beta app-lifecycle-manager units list
```

### gcloud app-lifecycle-manager units update

```text
NAME
    gcloud app-lifecycle-manager units update - update a unit

SYNOPSIS
    gcloud app-lifecycle-manager units update UNIT [--location=LOCATION]
        [--maintenance-pinned-until-time=MAINTENANCE_PINNED_UNTIL_TIME]
        [--application=APPLICATION | --clear-application]
        [--clear-tenant | --tenant=TENANT]
        [--clear-unit-kind | --unit-kind=UNIT_KIND]
        [--labels=[LABELS,...]
          | --update-labels=[UPDATE_LABELS,...] --clear-labels
          | --remove-labels=REMOVE_LABELS] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update an App Lifecycle Manager unit.

EXAMPLES
    To add or update the label env=prod on the unit named my-unit in location
    us-central1, run:

        $ gcloud app-lifecycle-manager units update my-unit \
            --location=us-central1 --update-labels=env=prod

    To pin the current release of the unit named my-unit until the end of 2099,
    run:

        $ gcloud app-lifecycle-manager units update my-unit \
            --location=us-central1 \
            --maintenance-pinned-until-time=2099-12-31T23:59:59Z

POSITIONAL ARGUMENTS
     Unit resource - Unit to update. This represents a Cloud resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument unit on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument unit on the command line with a fully specified
        name;
      * provide the argument --location on the command line.

     This must be specified.

       UNIT
          ID of the unit or fully qualified identifier for the unit.

          To set the unit attribute:
          + provide the argument unit on the command line.

FLAGS
     --location=LOCATION
        For resources [unit, tenant, unit-kind], provides fallback value for
        resource location attribute. When the resource's full URI path is not
        provided, location will fallback to this flag value.

     Requested directives for performing future maintenance on the unit. These
     directives include a request for the unit to skip maintenance for a period
     of time and remain pinned to its current release. They also include
     controls for postponing scheduled maintenance.

     --maintenance-pinned-until-time=MAINTENANCE_PINNED_UNTIL_TIME
        Time until which the release of the unit is pinned. Until this time,
        changes to the release of the unit are rejected, and rollouts do not
        request an upgrade of the unit.

     Update application.

     At most one of these can be specified:

       --application=APPLICATION
          Set application to new value.

       --clear-application
          Clear application value and set to null.

     Update tenant.

     At most one of these can be specified:

       --clear-tenant
          Clear tenant value and set to null.

       Tenant resource - Set tenant to new value.

       Tenant that this unit belongs to. For example, the tenant informs the
       maintenance policies to use for scheduling future updates on the unit.
       The tenant is optional and cannot be changed after the unit is created.
       This represents a Cloud resource. (NOTE) Some attributes are not given
       arguments in this group but can be set in other ways.

       To set the project attribute:
        + provide the argument --tenant on the command line with a fully
          specified name;
        + provide the argument --project on the command line;
        + set the property core/project.

       To set the location attribute:
        + provide the argument --tenant on the command line with a fully
          specified name;
        + provide the argument --location on the command line.

       --tenant=TENANT
          ID of the tenant or fully qualified identifier for the tenant.

          To set the tenant attribute:
          + provide the argument --tenant on the command line.

     Update unit_kind.

     At most one of these can be specified:

       --clear-unit-kind
          Clear unit_kind value and set to null.

       UnitKind resource - Set unit_kind to new value.

       Unit kind that this unit belongs to. The unit kind cannot be changed
       after it is set. This represents a Cloud resource. (NOTE) Some
       attributes are not given arguments in this group but can be set in other
       ways.

       To set the project attribute:
        + provide the argument --unit-kind on the command line with a fully
          specified name;
        + provide the argument --project on the command line;
        + set the property core/project.

       To set the location attribute:
        + provide the argument --unit-kind on the command line with a fully
          specified name;
        + provide the argument --location on the command line.

       --unit-kind=UNIT_KIND
          ID of the unitKind or fully qualified identifier for the unitKind.

          To set the unit-kind attribute:
          + provide the argument --unit-kind on the command line.

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

        $ gcloud beta app-lifecycle-manager units update
```

### gcloud beta app-lifecycle-manager units create

```text
NAME
    gcloud beta app-lifecycle-manager units create - create a unit

SYNOPSIS
    gcloud beta app-lifecycle-manager units create UNIT
        [--application=APPLICATION] [--flag-revisions=[FLAG_REVISIONS,...]]
        [--labels=[LABELS,...]] [--location=LOCATION]
        [--maintenance-pinned-until-time=MAINTENANCE_PINNED_UNTIL_TIME]
        [--management-mode=MANAGEMENT_MODE] [--tenant=TENANT]
        [--unit-kind=UNIT_KIND] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta app-lifecycle-manager units delete

```text
NAME
    gcloud beta app-lifecycle-manager units delete - delete a unit

SYNOPSIS
    gcloud beta app-lifecycle-manager units delete (UNIT : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta app-lifecycle-manager units describe

```text
NAME
    gcloud beta app-lifecycle-manager units describe - describe a unit

SYNOPSIS
    gcloud beta app-lifecycle-manager units describe
        (UNIT : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta app-lifecycle-manager units list

```text
NAME
    gcloud beta app-lifecycle-manager units list - list units

SYNOPSIS
    gcloud beta app-lifecycle-manager units list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta app-lifecycle-manager units update

```text
NAME
    gcloud beta app-lifecycle-manager units update - update a unit

SYNOPSIS
    gcloud beta app-lifecycle-manager units update UNIT [--location=LOCATION]
        [--maintenance-pinned-until-time=MAINTENANCE_PINNED_UNTIL_TIME]
        [--application=APPLICATION | --clear-application]
        [--clear-tenant | --tenant=TENANT]
        [--clear-unit-kind | --unit-kind=UNIT_KIND]
        [--flag-revisions=[FLAG_REVISIONS,...]
          | --add-flag-revisions=[ADD_FLAG_REVISIONS,...]
          --clear-flag-revisions
          | --remove-flag-revisions=[REMOVE_FLAG_REVISIONS,...]]
        [--labels=[LABELS,...]
          | --update-labels=[UPDATE_LABELS,...] --clear-labels
          | --remove-labels=REMOVE_LABELS] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/app-lifecycle-manager/units (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
