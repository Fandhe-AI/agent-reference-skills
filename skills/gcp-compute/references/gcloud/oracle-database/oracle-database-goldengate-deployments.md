---
source: https://docs.cloud.google.com/sdk/gcloud/reference/oracle-database/goldengate-deployments
---

# gcloud oracle-database goldengate-deployments

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud oracle-database goldengate-deployments create

```text
NAME
    gcloud oracle-database goldengate-deployments create - create a new
        GoldengateDeployment

SYNOPSIS
    gcloud oracle-database goldengate-deployments create GOLDENGATE_DEPLOYMENT
        --display-name=DISPLAY_NAME --odb-subnet=ODB_SUBNET
        (--properties-deployment-type=PROPERTIES_DEPLOYMENT_TYPE
          (--ogg-data-admin-username=OGG_DATA_ADMIN_USERNAME
          --ogg-data-deployment=OGG_DATA_DEPLOYMENT
          : --ogg-data-version=OGG_DATA_VERSION
          --ogg-data-admin-password=OGG_DATA_ADMIN_PASSWORD
          | [--ogg-data-admin-password-secret-version=OGG_DATA_ADMIN_PASSWORD_SECRET_VERSION : --secret=SECRET]) : --properties-cpu-core-count=PROPERTIES_CPU_CORE_COUNT --properties-description=PROPERTIES_DESCRIPTION --properties-environment-type=PROPERTIES_ENVIRONMENT_TYPE --properties-is-auto-scaling-enabled --properties-license-model=PROPERTIES_LICENSE_MODEL --maintenance-config-bundle-release-upgrade-period-days=MAINTENANCE_CONFIG_BUNDLE_RELEASE_UPGRADE_PERIOD_DAYS --maintenance-config-interim-release-upgrade-period-days=MAINTENANCE_CONFIG_INTERIM_RELEASE_UPGRADE_PERIOD_DAYS --maintenance-config-is-interim-release-auto-upgrade-enabled --maintenance-config-major-release-upgrade-period-days=MAINTENANCE_CONFIG_MAJOR_RELEASE_UPGRADE_PERIOD_DAYS --maintenance-config-security-patch-upgrade-period-days=MAINTENANCE_CONFIG_SECURITY_PATCH_UPGRADE_PERIOD_DAYS --maintenance-window-day=MAINTENANCE_WINDOW_DAY --maintenance-window-start-hour=MAINTENANCE_WINDOW_START_HOUR)
        [--async] [--gcp-oracle-zone=GCP_ORACLE_ZONE] [--labels=[LABELS,...]]
        [--location=LOCATION] [--odb-network=ODB_NETWORK]
        [--request-id=REQUEST_ID] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a new GoldengateDeployment.

EXAMPLES
    To create a GoldengateDeployment with id my-deployment in the location
    us-east4 with display-name my deployment, gcp oracle zone us-east4-b-r1,
    odb-network projects/my-project/locations/us-east4/odbNetworks/my-network,
    odb-subnet
    projects/my-project/locations/us-east4/odbNetworks/my-network/odbSubnets/my-subnet,
    license model LICENSE_INCLUDED, environment type PRODUCTION, deployment
    type DATABASE_ORACLE, cpu count 1, ogg-data deployment name
    my-ogg-deployment, admin username admin, password password, maintenance
    window on MONDAY at 23 hours, and maintenance configuration periods, run:

        $ gcloud oracle-database goldengate-deployments create \
            my-deployment --location=us-east4 \
            --display-name="my deployment" \
            --gcp-oracle-zone="us-east4-b-r1" \
            --odb-network=projects/my-project/locations/us-east4/\
        odbNetworks/my-network \
            --odb-subnet=projects/my-project/locations/us-east4/\
        odbNetworks/my-network/odbSubnets/my-subnet \
            --properties-license-model="LICENSE_INCLUDED" \
            --properties-environment-type="PRODUCTION" \
            --properties-deployment-type="DATABASE_ORACLE" \
            --properties-cpu-core-count=1 \
            --ogg-data-deployment="my-ogg-deployment" \
            --ogg-data-admin-username="admin" \
            --ogg-data-admin-password="password" \
            --maintenance-window-day="MONDAY" \
            --maintenance-window-start-hour=23 \
            --maintenance-config-interim-release-upgrade-period-days=0 \
            --maintenance-config-bundle-release-upgrade-period-days=1 \
            --maintenance-config-major-release-upgrade-period-days=2 \
            --maintenance-config-security-patch-upgrade-period-days=1

POSITIONAL ARGUMENTS
     GoldengateDeployment resource - Identifier. The name of the
     GoldengateDeployment resource in the following format:
     projects/{project}/locations/{region}/goldengateDeployments/{goldengate_deployment}
     This represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument goldengate_deployment on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument goldengate_deployment on the command line with a
        fully specified name;
      * provide the argument --location on the command line.

     This must be specified.

       GOLDENGATE_DEPLOYMENT
          ID of the goldengateDeployment or fully qualified identifier for the
          goldengateDeployment.

          To set the goldengate_deployment attribute:
          + provide the argument goldengate_deployment on the command line.

REQUIRED FLAGS
     --display-name=DISPLAY_NAME
        The display name for the GoldengateDeployment.

     OdbSubnet resource - The name of the OdbSubnet associated with the
     GoldengateDeployment for IP allocation. This represents a Cloud resource.
     (NOTE) Some attributes are not given arguments in this group but can be
     set in other ways.

     To set the project attribute:
      * provide the argument --odb-subnet on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument --odb-subnet on the command line with a fully
        specified name;
      * provide the argument --location on the command line.

     To set the odb-network attribute:
      * provide the argument --odb-subnet on the command line with a fully
        specified name;
      * provide the argument --odb-network on the command line.

     This must be specified.

       --odb-subnet=ODB_SUBNET
          ID of the odbSubnet or fully qualified identifier for the odbSubnet.

          To set the odb-subnet attribute:
          + provide the argument --odb-subnet on the command line.

     Properties of GoldengateDeployment.

     This must be specified.

       --properties-deployment-type=PROPERTIES_DEPLOYMENT_TYPE
          A valid Goldengate Deployment type. For a list of supported types,
          use the ListGoldengateDeploymentTypes operation.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --properties-cpu-core-count=PROPERTIES_CPU_CORE_COUNT
          The Minimum number of OCPUs to be made available for this Deployment.

       --properties-description=PROPERTIES_DESCRIPTION
          The description of the GoldengateDeployment.

       --properties-environment-type=PROPERTIES_ENVIRONMENT_TYPE
          The environment type of the GoldengateDeployment.

       --properties-is-auto-scaling-enabled
          Indicates if auto scaling is enabled for the Deployment's CPU core
          count.

       --properties-license-model=PROPERTIES_LICENSE_MODEL
          The Oracle license model that applies to a Deployment.
          PROPERTIES_LICENSE_MODEL must be one of:

           bring-your-own-license
              The license model is bring your own license.
           license-included
              The license model is included.

       The Ogg data of the GoldengateDeployment.

       This must be specified.

         --ogg-data-admin-username=OGG_DATA_ADMIN_USERNAME
            The Goldengate deployment console username.

            This flag argument must be specified if any of the other arguments
            in this group are specified.

         --ogg-data-deployment=OGG_DATA_DEPLOYMENT
            The name given to the Goldengate service deployment. The name must
            be 1 to 32 characters long, must contain only alphanumeric
            characters and must start with a letter.

            This flag argument must be specified if any of the other arguments
            in this group are specified.

         --ogg-data-version=OGG_DATA_VERSION
            Version of OGG

         Arguments for the deployment password options.

         At most one of these can be specified:

           --ogg-data-admin-password=OGG_DATA_ADMIN_PASSWORD
              The Goldengate deployment console password in plain text.

           Or at least one of these can be specified:

             SecretVersion resource - The Goldengate deployment console
             password secret version. The arguments in this group can be used
             to specify the attributes of this resource. (NOTE) Some attributes
             are not given arguments in this group but can be set in other
             ways.

             To set the project attribute:
              * provide the argument --ogg-data-admin-password-secret-version
                on the command line with a fully specified name;
              * provide the argument --project on the command line;
              * set the property core/project.

             --ogg-data-admin-password-secret-version=OGG_DATA_ADMIN_PASSWORD_SECRET_VERSION
                ID of the secretVersion or fully qualified identifier for the
                secretVersion.

                To set the secret-version attribute:
                * provide the argument
                  --ogg-data-admin-password-secret-version on the command line.

                This flag argument must be specified if any of the other
                arguments in this group are specified.

             --secret=SECRET
                The secret id of the secretVersion resource.

                To set the secret attribute:
                * provide the argument
                  --ogg-data-admin-password-secret-version on the command line
                  with a fully specified name;
                * provide the argument --secret on the command line.

       The maintenance configuration of the GoldengateDeployment.

       --maintenance-config-bundle-release-upgrade-period-days=MAINTENANCE_CONFIG_BUNDLE_RELEASE_UPGRADE_PERIOD_DAYS
          Defines auto upgrade period for bundle releases. Manually configured
          period cannot be longer than service defined period for bundle
          releases. This period must be shorter or equal to major release
          upgrade period. Not passing this field during create will equate to
          using the service default.

       --maintenance-config-interim-release-upgrade-period-days=MAINTENANCE_CONFIG_INTERIM_RELEASE_UPGRADE_PERIOD_DAYS
          Defines auto upgrade period for interim releases. This period must be
          shorter or equal to bundle release upgrade period.

       --maintenance-config-is-interim-release-auto-upgrade-enabled
          By default auto upgrade for interim releases are not enabled. If
          auto-upgrade is enabled for interim release, you have to specify
          interim_release_upgrade_period_days too.

       --maintenance-config-major-release-upgrade-period-days=MAINTENANCE_CONFIG_MAJOR_RELEASE_UPGRADE_PERIOD_DAYS
          Defines auto upgrade period for major releases. Manually configured
          period cannot be longer than service defined period for major
          releases. Not passing this field during create will equate to using
          the service default.

       --maintenance-config-security-patch-upgrade-period-days=MAINTENANCE_CONFIG_SECURITY_PATCH_UPGRADE_PERIOD_DAYS
          Defines auto upgrade period for releases with security fix. Manually
          configured period cannot be longer than service defined period for
          security releases. Not passing this field during create will equate
          to using the service default.

       The maintenance window of the GoldengateDeployment.

       --maintenance-window-day=MAINTENANCE_WINDOW_DAY
          Days of the week. MAINTENANCE_WINDOW_DAY must be one of:

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

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --maintenance-window-start-hour=MAINTENANCE_WINDOW_START_HOUR
          Start hour for maintenance period. Hour is in UTC.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --gcp-oracle-zone=GCP_ORACLE_ZONE
        The GCP Oracle zone where Oracle GoldengateDeployment is hosted.
        Example: us-east4-b-r2. If not specified, the system will pick a zone
        based on availability.

     --labels=[LABELS,...]
        The labels or tags associated with the GoldengateDeployment.

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
        For resources [goldengate_deployment, odb-network, odb-subnet],
        provides fallback value for resource location attribute. When the
        resource's full URI path is not provided, location will fallback to
        this flag value.

     --odb-network=ODB_NETWORK
        For resources [odb-network, odb-subnet], provides fallback value for
        resource odb-network attribute. When the resource's full URI path is
        not provided, odb-network will fallback to this flag value.

     --request-id=REQUEST_ID
        An optional request ID to identify requests. Specify a unique request
        ID so that if you must retry your request, the server will know to
        ignore the request if it has already been completed. The server will
        guarantee that for at least 60 minutes since the first request.

        For example, consider a situation where you make an initial request and
        the request times out. If you make the request again with the same
        request ID, the server can check if original operation with the same
        request ID was received, and if so, will ignore the second request.
        This prevents clients from accidentally creating duplicate commitments.

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

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined and the corrections listed in Notes are applied.

```bash
gcloud oracle-database goldengate-deployments create my-deployment \
    --location=us-east4 \
    --display-name="my deployment" \
    --gcp-oracle-zone="us-east4-b-r1" \
    --odb-network=projects/my-project/locations/us-east4/odbNetworks/my-network \
    --odb-subnet=projects/my-project/locations/us-east4/odbNetworks/my-network/odbSubnets/my-subnet \
    --properties-license-model="license-included" \
    --properties-environment-type="PRODUCTION" \
    --properties-deployment-type="DATABASE_ORACLE" \
    --properties-cpu-core-count=1 \
    --ogg-data-deployment="myOggDeployment" \
    --ogg-data-admin-username="admin" \
    --ogg-data-admin-password="password" \
    --maintenance-window-day="monday" \
    --maintenance-window-start-hour=23 \
    --maintenance-config-interim-release-upgrade-period-days=0 \
    --maintenance-config-bundle-release-upgrade-period-days=1 \
    --maintenance-config-major-release-upgrade-period-days=2 \
    --maintenance-config-security-patch-upgrade-period-days=1
```

### gcloud oracle-database goldengate-deployments delete

```text
NAME
    gcloud oracle-database goldengate-deployments delete - delete a
        GoldengateDeployment. This also deletes any associated Assignments

SYNOPSIS
    gcloud oracle-database goldengate-deployments delete
        (GOLDENGATE_DEPLOYMENT : --location=LOCATION) [--async]
        [--request-id=REQUEST_ID] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a GoldengateDeployment. This also deletes any associated
    Assignments.

EXAMPLES
    To delete a GoldengateDeployment with id my-deployment in the location
    us-east4, run:

        $ gcloud oracle-database goldengate-deployments delete \
            my-deployment --location=us-east4

POSITIONAL ARGUMENTS
     GoldengateDeployment resource - The name of the GoldengateDeployment in
     the following format:
     projects/{project}/locations/{location}/goldengateDeployments/{goldengate_deployment}.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument goldengate_deployment on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       GOLDENGATE_DEPLOYMENT
          ID of the goldengateDeployment or fully qualified identifier for the
          goldengateDeployment.

          To set the goldengate_deployment attribute:
          + provide the argument goldengate_deployment on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the goldengateDeployment resource.

          To set the location attribute:
          + provide the argument goldengate_deployment on the command line
            with a fully specified name;
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

### gcloud oracle-database goldengate-deployments describe

```text
NAME
    gcloud oracle-database goldengate-deployments describe - get details of a
        GoldengateDeployment

SYNOPSIS
    gcloud oracle-database goldengate-deployments describe
        (GOLDENGATE_DEPLOYMENT : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Get details of a GoldengateDeployment.

EXAMPLES
    To get a GoldengateDeployment with id my-deployment in the location
    us-east4, run:

        $ gcloud oracle-database goldengate-deployments describe \
            my-deployment --location=us-east4

POSITIONAL ARGUMENTS
     GoldengateDeployment resource - The name of the GoldengateDeployment in
     the following format:
     projects/{project}/locations/{location}/goldengateDeployments/{goldengate_deployment}.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument goldengate_deployment on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       GOLDENGATE_DEPLOYMENT
          ID of the goldengateDeployment or fully qualified identifier for the
          goldengateDeployment.

          To set the goldengate_deployment attribute:
          + provide the argument goldengate_deployment on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the goldengateDeployment resource.

          To set the location attribute:
          + provide the argument goldengate_deployment on the command line
            with a fully specified name;
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

### gcloud oracle-database goldengate-deployments list

```text
NAME
    gcloud oracle-database goldengate-deployments list - list all
        GoldengateDeployments

SYNOPSIS
    gcloud oracle-database goldengate-deployments list --location=LOCATION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List all GoldengateDeployments.

EXAMPLES
    To list all GoldengateDeployments in the location us-east4, run:

        $ gcloud oracle-database goldengate-deployments list \
            --location=us-east4

REQUIRED FLAGS
     Location resource - The parent value for GoldengateDeployments in the
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

### gcloud oracle-database goldengate-deployments start

```text
NAME
    gcloud oracle-database goldengate-deployments start - start a
        GoldengateDeployment

SYNOPSIS
    gcloud oracle-database goldengate-deployments start
        (GOLDENGATE_DEPLOYMENT : --location=LOCATION) [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Starts a GoldengateDeployment that is currently in a Stopped state.

EXAMPLES
    To start a GoldengateDeployment with id my-deployment in the location
    us-east4, run:

        $ gcloud oracle-database goldengate-deployments start \
            my-deployment --location=us-east4

POSITIONAL ARGUMENTS
     GoldengateDeployment resource - The name of the Goldengate Deployment in
     the following format:
     projects/{project}/locations/{location}/goldengateDeployments/{goldengate_deployment}.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument goldengate_deployment on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       GOLDENGATE_DEPLOYMENT
          ID of the goldengateDeployment or fully qualified identifier for the
          goldengateDeployment.

          To set the goldengate_deployment attribute:
          + provide the argument goldengate_deployment on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the goldengateDeployment resource.

          To set the location attribute:
          + provide the argument goldengate_deployment on the command line
            with a fully specified name;
          + provide the argument --location on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

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

### gcloud oracle-database goldengate-deployments stop

```text
NAME
    gcloud oracle-database goldengate-deployments stop - stop a
        GoldengateDeployment

SYNOPSIS
    gcloud oracle-database goldengate-deployments stop
        (GOLDENGATE_DEPLOYMENT : --location=LOCATION) [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Stops a GoldengateDeployment that is currently in an Active state.

EXAMPLES
    To stop a GoldengateDeployment with id my-deployment in the location
    us-east4, run:

        $ gcloud oracle-database goldengate-deployments stop my-deployment \
            --location=us-east4

POSITIONAL ARGUMENTS
     GoldengateDeployment resource - The name of the Goldengate Deployment in
     the following format:
     projects/{project}/locations/{location}/goldengateDeployments/{goldengate_deployment}.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument goldengate_deployment on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       GOLDENGATE_DEPLOYMENT
          ID of the goldengateDeployment or fully qualified identifier for the
          goldengateDeployment.

          To set the goldengate_deployment attribute:
          + provide the argument goldengate_deployment on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the goldengateDeployment resource.

          To set the location attribute:
          + provide the argument goldengate_deployment on the command line
            with a fully specified name;
          + provide the argument --location on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

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

### gcloud oracle-database goldengate-deployments update

```text
NAME
    gcloud oracle-database goldengate-deployments update - update labels of a
        GoldengateDeployment

SYNOPSIS
    gcloud oracle-database goldengate-deployments update
        (GOLDENGATE_DEPLOYMENT : --location=LOCATION) [--async]
        [--request-id=REQUEST_ID]
        [--labels=[LABELS,...]
          | --update-labels=[UPDATE_LABELS,...] --clear-labels
          | --remove-labels=REMOVE_LABELS] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update labels of a GoldengateDeployment. Only labels can be updated on this
    resource; use --update-labels, --remove-labels or --clear-labels to manage
    them.

EXAMPLES
    To add or update labels on a GoldengateDeployment with id my-deployment in
    the location us-east4, run:

        $ gcloud oracle-database goldengate-deployments update \
            my-deployment --location=us-east4 \
            --update-labels=env=prod,team=oasis

    To remove the label team from the GoldengateDeployment, run:

        $ gcloud oracle-database goldengate-deployments update \
            my-deployment --location=us-east4 --remove-labels=team

    To clear all labels from the GoldengateDeployment, run:

        $ gcloud oracle-database goldengate-deployments update \
            my-deployment --location=us-east4 --clear-labels

POSITIONAL ARGUMENTS
     GoldengateDeployment resource - Identifier. The name of the
     GoldengateDeployment resource in the following format:
     projects/{project}/locations/{region}/goldengateDeployments/{goldengate_deployment}
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument goldengate_deployment on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       GOLDENGATE_DEPLOYMENT
          ID of the goldengateDeployment or fully qualified identifier for the
          goldengateDeployment.

          To set the goldengate_deployment attribute:
          + provide the argument goldengate_deployment on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the goldengateDeployment resource.

          To set the location attribute:
          + provide the argument goldengate_deployment on the command line
            with a fully specified name;
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
          Set labels to new value. The labels or tags associated with the
          GoldengateDeployment.

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
            Update labels value or add key value pair. The labels or tags
            associated with the GoldengateDeployment.

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

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the example passes enum choices as uppercase API names (for example `LICENSE_INCLUDED`, `MONDAY`, `CLIENT_SUBNET`), while the flag descriptions list the choices in lowercase with hyphens (`license-included`, `monday`, `client-subnet`); the runnable form uses the documented lowercase choices (gcloud 593.0.0 also accepts the uppercase names). Flags whose description gives no fixed list of choices (such as `--properties-deployment-type` and `--properties-environment-type`) keep the official values.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the example sets `--ogg-data-deployment="my-ogg-deployment"`, but the flag description says the name "must contain only alphanumeric characters and must start with a letter"; the runnable form uses `myOggDeployment`.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/oracle-database/goldengate-deployments (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
