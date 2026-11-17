---
source: https://docs.cloud.google.com/sdk/gcloud/reference/oracle-database/cloud-exadata-infrastructures
---

# gcloud oracle-database cloud-exadata-infrastructures

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud oracle-database cloud-exadata-infrastructures configure-exascale

```text
NAME
    gcloud oracle-database cloud-exadata-infrastructures configure-exascale -
        configure Exascale Storage for a Cloud Exadata Infrastructure

SYNOPSIS
    gcloud oracle-database cloud-exadata-infrastructures configure-exascale
        (CLOUD_EXADATA_INFRASTRUCTURE : --location=LOCATION)
        --total-storage-size-gb=TOTAL_STORAGE_SIZE_GB [--async]
        [--request-id=REQUEST_ID]
        [--total-vm-storage-size-gb=TOTAL_VM_STORAGE_SIZE_GB]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Configure Exascale Storage for a Cloud Exadata Infrastructure. This
    operation updates the total storage allocated for Exascale Storage.

EXAMPLES
    To configure Exascale for a Cloud Exadata Infrastructure with id
    my-instance in the location us-east4 with 1000 GB of total storage, run:

        $ gcloud oracle-database cloud-exadata-infrastructures \
            configure-exascale my-instance --location=us-east4 \
            --total-storage-size-gb=1000

POSITIONAL ARGUMENTS
     CloudExadataInfrastructure resource - The name of the Cloud Exadata
     Infrastructure in the following format:
     projects/{project}/locations/{location}/cloudExadataInfrastructures/{cloud_exadata_infrastructure}.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument cloud_exadata_infrastructure on the command line
        with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CLOUD_EXADATA_INFRASTRUCTURE
          ID of the cloudExadataInfrastructure or fully qualified identifier
          for the cloudExadataInfrastructure.

          To set the cloud_exadata_infrastructure attribute:
          + provide the argument cloud_exadata_infrastructure on the command
            line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the cloudExadataInfrastructure resource.

          To set the location attribute:
          + provide the argument cloud_exadata_infrastructure on the command
            line with a fully specified name;
          + provide the argument --location on the command line.

REQUIRED FLAGS
     --total-storage-size-gb=TOTAL_STORAGE_SIZE_GB
        The total storage to be allocated to Exascale in GBs.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --request-id=REQUEST_ID
        An optional ID to identify the request.

     --total-vm-storage-size-gb=TOTAL_VM_STORAGE_SIZE_GB
        Storage size needed for VM storage on Exascale in GBs.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the oracledatabase/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/oracle/database/docs
```

### gcloud oracle-database cloud-exadata-infrastructures create

```text
NAME
    gcloud oracle-database cloud-exadata-infrastructures create - create a new
        ExadataInfrastructure

SYNOPSIS
    gcloud oracle-database cloud-exadata-infrastructures create
        (CLOUD_EXADATA_INFRASTRUCTURE : --location=LOCATION) [--async]
        [--display-name=DISPLAY_NAME] [--gcp-oracle-zone=GCP_ORACLE_ZONE]
        [--labels=[LABELS,...]] [--request-id=REQUEST_ID]
        [[--properties-shape=PROPERTIES_SHAPE
          : --properties-compute-count=PROPERTIES_COMPUTE_COUNT
          --properties-customer-contacts=[email=EMAIL]
          --properties-database-server-type=PROPERTIES_DATABASE_SERVER_TYPE
          --properties-storage-count=PROPERTIES_STORAGE_COUNT
          --properties-storage-server-type=PROPERTIES_STORAGE_SERVER_TYPE
          --properties-total-storage-size-gb=PROPERTIES_TOTAL_STORAGE_SIZE_GB
          --maintenance-window-custom-action-timeout-mins=MAINTENANCE_WINDOW_CUSTOM_ACTION_TIMEOUT_MINS --maintenance-window-days-of-week=[MAINTENANCE_WINDOW_DAYS_OF_WEEK,
          ...]
          --maintenance-window-hours-of-day=[MAINTENANCE_WINDOW_HOURS_OF_DAY,
          ...] --maintenance-window-is-custom-action-timeout-enabled
          --maintenance-window-lead-time-week=MAINTENANCE_WINDOW_LEAD_TIME_WEEK
          --maintenance-window-months=[MAINTENANCE_WINDOW_MONTHS,...]
          --maintenance-window-patching-mode=MAINTENANCE_WINDOW_PATCHING_MODE
          --maintenance-window-preference=MAINTENANCE_WINDOW_PREFERENCE
          --maintenance-window-weeks-of-month=[MAINTENANCE_WINDOW_WEEKS_OF_MONTH,
          ...]]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Creates a new ExadataInfrastructure.

EXAMPLES
    Choose an available system shapes in your location by running gcloud
    oracle-database db-system-shapes list --location=us-east4. To create
    Exadata Infrastructure instance with id my-instance in the location
    us-east4 with display-name my instance, compute count 2 and choosen shape
    "Exadata.FOO", run:

        $ gcloud oracle-database cloud-exadata-infrastructures create \
            my-instance --location=us-east4 --display-name="my instance" \
            --properties-shape=Exadata.FOO --properties-compute-count=2 \
            --properties-storage-count=3

POSITIONAL ARGUMENTS
     CloudExadataInfrastructure resource - Identifier. The name of the Exadata
     Infrastructure resource with the format:
     projects/{project}/locations/{region}/cloudExadataInfrastructures/{cloud_exadata_infrastructure}
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument cloud_exadata_infrastructure on the command line
        with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CLOUD_EXADATA_INFRASTRUCTURE
          ID of the cloudExadataInfrastructure or fully qualified identifier
          for the cloudExadataInfrastructure.

          To set the cloud_exadata_infrastructure attribute:
          + provide the argument cloud_exadata_infrastructure on the command
            line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the cloudExadataInfrastructure resource.

          To set the location attribute:
          + provide the argument cloud_exadata_infrastructure on the command
            line with a fully specified name;
          + provide the argument --location on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --display-name=DISPLAY_NAME
        User friendly name for this resource.

     --gcp-oracle-zone=GCP_ORACLE_ZONE
        The GCP Oracle zone where Oracle Exadata Infrastructure is hosted.
        Example: us-east4-b-r2. If not specified, the system will pick a zone
        based on availability.

     --labels=[LABELS,...]
        Labels or tags associated with the resource.

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

     --request-id=REQUEST_ID
        An optional ID to identify the request. This value is used to identify
        duplicate requests. If you make a request with the same request ID and
        the original request is still in progress or completed, the server
        ignores the second request. This prevents clients from accidentally
        creating duplicate commitments.

        The request ID must be a valid UUID with the exception that zero UUID
        is not supported (00000000-0000-0000-0000-000000000000).

     Various properties of Exadata Infrastructure.

     --properties-shape=PROPERTIES_SHAPE
        The shape of the Exadata Infrastructure. The shape determines the
        amount of CPU, storage, and memory resources allocated to the instance.

        This flag argument must be specified if any of the other arguments in
        this group are specified.

     --properties-compute-count=PROPERTIES_COMPUTE_COUNT
        The number of compute servers for the Exadata Infrastructure.

     --properties-customer-contacts=[email=EMAIL]
        The list of customer contacts.

         email
            The email address used by Oracle to send notifications regarding
            databases and infrastructure.

        Shorthand Example:

            --properties-customer-contacts=email=string --properties-customer-contacts=email=string

        JSON Example:

            --properties-customer-contacts='[{"email": "string"}]'

        File Example:

            --properties-customer-contacts=path_to_file.(yaml|json)

     --properties-database-server-type=PROPERTIES_DATABASE_SERVER_TYPE
        The database server type of the Exadata Infrastructure.

     --properties-storage-count=PROPERTIES_STORAGE_COUNT
        The number of Cloud Exadata storage servers for the Exadata
        Infrastructure.

     --properties-storage-server-type=PROPERTIES_STORAGE_SERVER_TYPE
        The storage server type of the Exadata Infrastructure.

     --properties-total-storage-size-gb=PROPERTIES_TOTAL_STORAGE_SIZE_GB
        The total storage allocated to the Exadata Infrastructure resource, in
        gigabytes (GB).

     Maintenance window as defined by Oracle.
     https://docs.oracle.com/en-us/iaas/api/#/en/database/20160918/datatypes/MaintenanceWindow

     --maintenance-window-custom-action-timeout-mins=MAINTENANCE_WINDOW_CUSTOM_ACTION_TIMEOUT_MINS
        Determines the amount of time the system will wait before the start of
        each database server patching operation. Custom action timeout is in
        minutes and valid value is between 15 to 120 (inclusive).

     --maintenance-window-days-of-week=[MAINTENANCE_WINDOW_DAYS_OF_WEEK,...]
        Days during the week when maintenance should be performed.
        MAINTENANCE_WINDOW_DAYS_OF_WEEK must be one of:

         friday
            Friday
         monday
            Monday
         saturday
            Saturday
         sunday
            Sunday
         thursday
            Thursday
         tuesday
            Tuesday
         wednesday
            Wednesday

     --maintenance-window-hours-of-day=[MAINTENANCE_WINDOW_HOURS_OF_DAY,...]
        The window of hours during the day when maintenance should be
        performed. The window is a 4 hour slot. Valid values are: 0 -
        represents time slot 0:00 - 3:59 UTC 4 - represents time slot 4:00 -
        7:59 UTC 8 - represents time slot 8:00 - 11:59 UTC 12 - represents time
        slot 12:00 - 15:59 UTC 16 - represents time slot 16:00 - 19:59 UTC 20 -
        represents time slot 20:00 - 23:59 UTC

     --maintenance-window-is-custom-action-timeout-enabled
        If true, enables the configuration of a custom action timeout (waiting
        period) between database server patching operations.

     --maintenance-window-lead-time-week=MAINTENANCE_WINDOW_LEAD_TIME_WEEK
        Lead time window allows user to set a lead time to prepare for a down
        time. The lead time is in weeks and valid value is between 1 to 4.

     --maintenance-window-months=[MAINTENANCE_WINDOW_MONTHS,...]
        Months during the year when maintenance should be performed.
        MAINTENANCE_WINDOW_MONTHS must be one of:

         april
            The month of April.
         august
            The month of August.
         december
            The month of December.
         february
            The month of February.
         january
            The month of January.
         july
            The month of July.
         june
            The month of June.
         march
            The month of March.
         may
            The month of May.
         november
            The month of November.
         october
            The month of October.
         september
            The month of September.

     --maintenance-window-patching-mode=MAINTENANCE_WINDOW_PATCHING_MODE
        Cloud CloudExadataInfrastructure node patching method, either "ROLLING"
        or "NONROLLING". Default value is ROLLING.
        MAINTENANCE_WINDOW_PATCHING_MODE must be one of:

         non-rolling
            The non-rolling maintenance method first updates your storage
            servers at the same time, then your database servers at the same
            time.
         rolling
            Updates the Cloud Exadata database server hosts in a rolling
            fashion.

     --maintenance-window-preference=MAINTENANCE_WINDOW_PREFERENCE
        The maintenance window scheduling preference.
        MAINTENANCE_WINDOW_PREFERENCE must be one of:

         custom-preference
            Custom preference.
         no-preference
            No preference.

     --maintenance-window-weeks-of-month=[MAINTENANCE_WINDOW_WEEKS_OF_MONTH,...]
        Weeks during the month when maintenance should be performed. Weeks
        start on the 1st, 8th, 15th, and 22nd days of the month, and have a
        duration of 7 days. Weeks start and end based on calendar dates, not
        days of the week.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the oracledatabase/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/oracle/database/docs
```

### gcloud oracle-database cloud-exadata-infrastructures db-servers list

```text
NAME
    gcloud oracle-database cloud-exadata-infrastructures db-servers list - list
        all DbServers

SYNOPSIS
    gcloud oracle-database cloud-exadata-infrastructures db-servers list
        (--cloud-exadata-infrastructure=CLOUD_EXADATA_INFRASTRUCTURE
          : --location=LOCATION) [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List all DbServers.

EXAMPLES
    To list all DbServers in the location us-east4, run:

        $ gcloud oracle-database cloud-exadata-infrastructures db-servers \
            list --location=us-east4

REQUIRED FLAGS
     CloudExadataInfrastructure resource - The parent value for database server
     in the following format:
     projects/{project}/locations/{location}/cloudExadataInfrastructures/{cloudExadataInfrastructure}.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument --cloud-exadata-infrastructure on the command
        line with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --cloud-exadata-infrastructure=CLOUD_EXADATA_INFRASTRUCTURE
          ID of the cloudExadataInfrastructure or fully qualified identifier
          for the cloudExadataInfrastructure.

          To set the cloud-exadata-infrastructure attribute:
          + provide the argument --cloud-exadata-infrastructure on the
            command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --location=LOCATION
          The location id of the cloudExadataInfrastructure resource.

          To set the location attribute:
          + provide the argument --cloud-exadata-infrastructure on the
            command line with a fully specified name;
          + provide the argument --location on the command line.

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
    This command uses the oracledatabase/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/oracle/database/docs
```

### gcloud oracle-database cloud-exadata-infrastructures delete

```text
NAME
    gcloud oracle-database cloud-exadata-infrastructures delete - delete an
        ExadataInfrastructure

SYNOPSIS
    gcloud oracle-database cloud-exadata-infrastructures delete
        (CLOUD_EXADATA_INFRASTRUCTURE : --location=LOCATION) [--async]
        [--force] [--request-id=REQUEST_ID] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete an ExadataInfrastructure.

EXAMPLES
    To delete a ExadataInfrastructure with id my-instance in the location
    us-east4, run:

        $ gcloud oracle-database cloud-exadata-infrastructures delete \
            my-instance --location=us-east4

POSITIONAL ARGUMENTS
     CloudExadataInfrastructure resource - The name of the Cloud Exadata
     Infrastructure in the following format:
     projects/{project}/locations/{location}/cloudExadataInfrastructures/{cloud_exadata_infrastructure}.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument cloud_exadata_infrastructure on the command line
        with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CLOUD_EXADATA_INFRASTRUCTURE
          ID of the cloudExadataInfrastructure or fully qualified identifier
          for the cloudExadataInfrastructure.

          To set the cloud_exadata_infrastructure attribute:
          + provide the argument cloud_exadata_infrastructure on the command
            line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the cloudExadataInfrastructure resource.

          To set the location attribute:
          + provide the argument cloud_exadata_infrastructure on the command
            line with a fully specified name;
          + provide the argument --location on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --force
        If set to true, all VM clusters for this Exadata Infrastructure will be
        deleted. An Exadata Infrastructure can only be deleted once all its VM
        clusters have been deleted.

     --request-id=REQUEST_ID
        An optional ID to identify the request. This value is used to identify
        duplicate requests. If you make a request with the same request ID and
        the original request is still in progress or completed, the server
        ignores the second request. This prevents clients from accidentally
        creating duplicate commitments.

        The request ID must be a valid UUID with the exception that zero UUID
        is not supported (00000000-0000-0000-0000-000000000000).

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the oracledatabase/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/oracle/database/docs
```

### gcloud oracle-database cloud-exadata-infrastructures describe

```text
NAME
    gcloud oracle-database cloud-exadata-infrastructures describe - get details
        of a ExadataInfrastructure

SYNOPSIS
    gcloud oracle-database cloud-exadata-infrastructures describe
        (CLOUD_EXADATA_INFRASTRUCTURE : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Get details of a ExadataInfrastructure.

EXAMPLES
    To get a ExadataInfrastructure with id my-instance in the location
    us-east4, run:

        $ gcloud oracle-database cloud-exadata-infrastructures describe \
            my-instance --location=us-east4

POSITIONAL ARGUMENTS
     CloudExadataInfrastructure resource - The name of the Cloud Exadata
     Infrastructure in the following format:
     projects/{project}/locations/{location}/cloudExadataInfrastructures/{cloud_exadata_infrastructure}.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument cloud_exadata_infrastructure on the command line
        with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CLOUD_EXADATA_INFRASTRUCTURE
          ID of the cloudExadataInfrastructure or fully qualified identifier
          for the cloudExadataInfrastructure.

          To set the cloud_exadata_infrastructure attribute:
          + provide the argument cloud_exadata_infrastructure on the command
            line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the cloudExadataInfrastructure resource.

          To set the location attribute:
          + provide the argument cloud_exadata_infrastructure on the command
            line with a fully specified name;
          + provide the argument --location on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the oracledatabase/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/oracle/database/docs
```

### gcloud oracle-database cloud-exadata-infrastructures list

```text
NAME
    gcloud oracle-database cloud-exadata-infrastructures list - list all
        ExadataInfrastructures

SYNOPSIS
    gcloud oracle-database cloud-exadata-infrastructures list
        --location=LOCATION [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List all ExadataInfrastructures.

EXAMPLES
    To list all ExadataInfrastructures in the location us-east4, run:

        $ gcloud oracle-database cloud-exadata-infrastructures list \
            --location=us-east4

REQUIRED FLAGS
     Location resource - The parent value for CloudExadataInfrastructure in the
     following format: projects/{project}/locations/{location}. This represents
     a Cloud resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --location=LOCATION
          ID of the location or fully qualified identifier for the location.

          To set the location attribute:
          + provide the argument --location on the command line.

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
    This command uses the oracledatabase/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/oracle/database/docs
```

### gcloud oracle-database cloud-exadata-infrastructures update

```text
NAME
    gcloud oracle-database cloud-exadata-infrastructures update - update labels
        of an ExadataInfrastructure

SYNOPSIS
    gcloud oracle-database cloud-exadata-infrastructures update
        (CLOUD_EXADATA_INFRASTRUCTURE : --location=LOCATION) [--async]
        [--request-id=REQUEST_ID]
        [--labels=[LABELS,...]
          | --update-labels=[UPDATE_LABELS,...] --clear-labels
          | --remove-labels=REMOVE_LABELS] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update labels of an ExadataInfrastructure. Only labels can be updated on
    this resource; use --update-labels, --remove-labels or --clear-labels to
    manage them.

EXAMPLES
    To add or update labels on an ExadataInfrastructure with id my-instance in
    the location us-east4, run:

        $ gcloud oracle-database cloud-exadata-infrastructures update \
            my-instance --location=us-east4 \
            --update-labels=env=prod,team=oasis

    To remove the label team from the ExadataInfrastructure, run:

        $ gcloud oracle-database cloud-exadata-infrastructures update \
            my-instance --location=us-east4 --remove-labels=team

    To clear all labels from the ExadataInfrastructure, run:

        $ gcloud oracle-database cloud-exadata-infrastructures update \
            my-instance --location=us-east4 --clear-labels

POSITIONAL ARGUMENTS
     CloudExadataInfrastructure resource - Identifier. The name of the Exadata
     Infrastructure resource with the format:
     projects/{project}/locations/{region}/cloudExadataInfrastructures/{cloud_exadata_infrastructure}
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument cloud_exadata_infrastructure on the command line
        with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CLOUD_EXADATA_INFRASTRUCTURE
          ID of the cloudExadataInfrastructure or fully qualified identifier
          for the cloudExadataInfrastructure.

          To set the cloud_exadata_infrastructure attribute:
          + provide the argument cloud_exadata_infrastructure on the command
            line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the cloudExadataInfrastructure resource.

          To set the location attribute:
          + provide the argument cloud_exadata_infrastructure on the command
            line with a fully specified name;
          + provide the argument --location on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --request-id=REQUEST_ID
        An optional ID to identify the request. This value is used to identify
        duplicate requests. If you make a request with the same request ID and
        the original request is still in progress or completed, the server
        ignores the second request. This prevents clients from accidentally
        creating duplicate commitments.

        The request ID must be a valid UUID with the exception that zero UUID
        is not supported (00000000-0000-0000-0000-000000000000).

     Update labels.

     At most one of these can be specified:

       --labels=[LABELS,...]
          Set labels to new value. Labels or tags associated with the resource.

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
            Update labels value or add key value pair. Labels or tags
            associated with the resource.

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
    This command uses the oracledatabase/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/oracle/database/docs
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/oracle-database/cloud-exadata-infrastructures (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
