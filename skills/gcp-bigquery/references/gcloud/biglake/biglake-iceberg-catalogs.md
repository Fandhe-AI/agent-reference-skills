---
source: https://docs.cloud.google.com/sdk/gcloud/reference/biglake/iceberg/catalogs
---

# gcloud biglake iceberg catalogs

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud biglake iceberg catalogs create

```text
NAME
    gcloud biglake iceberg catalogs create - create a BigLake Iceberg REST
        catalog

SYNOPSIS
    gcloud biglake iceberg catalogs create CATALOG --catalog-type=CATALOG_TYPE
        [--credential-mode=CREDENTIAL_MODE; default="end-user"]
        [--cross-cloud-cache=MODE] [--default-location=DEFAULT_LOCATION]
        [--description=DESCRIPTION]
        [--federated-catalog-identity-mode=FEDERATED_CATALOG_IDENTITY_MODE]
        [--federated-catalog-type=FEDERATED_CATALOG_TYPE]
        [--glue-aws-region=GLUE_AWS_REGION]
        [--glue-aws-role-arn=GLUE_AWS_ROLE_ARN]
        [--glue-warehouse=GLUE_WAREHOUSE]
        [--metadata-service-directory-name=METADATA_SERVICE_DIRECTORY_NAME]
        [--namespace-filters=[NAMESPACE,...]]
        [--primary-location=PRIMARY_LOCATION]
        [--refresh-interval=REFRESH_INTERVAL]
        [--restricted-locations=[LOCATION,...]] [--secret-name=SECRET_NAME]
        [--service-directory-name=SERVICE_DIRECTORY_NAME]
        [--snowflake-account-identifier=SNOWFLAKE_ACCOUNT_IDENTIFIER]
        [--snowflake-role=SNOWFLAKE_ROLE]
        [--snowflake-warehouse=SNOWFLAKE_WAREHOUSE]
        [--unity-catalog-name=UNITY_CATALOG_NAME]
        [--unity-instance-name=UNITY_INSTANCE_NAME]
        [--unity-service-principal-application-id=UNITY_SERVICE_PRINCIPAL_APPLICATION_ID]
        [--workday-base-url=WORKDAY_BASE_URL] [--workday-tenant=WORKDAY_TENANT]
        [--kms-key=KMS_KEY : --kms-keyring=KMS_KEYRING
          --kms-location=KMS_LOCATION --kms-project=KMS_PROJECT]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a BigLake Iceberg REST catalog.

EXAMPLES
    To add a catalog using a Cloud Storage bucket my-catalog-bucket, run:

        $ gcloud biglake iceberg catalogs create my-catalog-bucket \
            --catalog-type=gcs-bucket

    To create a catalog using a Cloud Storage bucket my-catalog-bucket with
    vended credentials, run:

        $ gcloud biglake iceberg catalogs create my-catalog-bucket \
            --catalog-type=gcs-bucket --credential-mode=vended-credentials

    To create a catalog my-lakehouse-catalog with catalog type lakehouse, run:

        $ gcloud biglake iceberg catalogs create my-lakehouse-catalog \
            --catalog-type=lakehouse --default-location=gs://my-bucket

    To create a catalog my-lakehouse-catalog with cross-cloud cache enabled,
    run:

        $ gcloud biglake iceberg catalogs create my-lakehouse-catalog \
            --catalog-type=lakehouse --default-location=gs://my-bucket \
            --cross-cloud-cache=enabled

    To create a catalog my-lakehouse-catalog with CMEK encryption, run:

        $ gcloud biglake iceberg catalogs create my-lakehouse-catalog \
            --catalog-type=lakehouse --default-location=gs://my-bucket \
            --kms-key=projects/my-project/locations/us-central1/keyRings/\
        my-ring/cryptoKeys/my-key

    To create a unity federated catalog my-federated-catalog, run:

        $ gcloud biglake iceberg catalogs create my-federated-catalog \
            --catalog-type=federated --federated-catalog-type=unity \
            --service-directory-name=projects/my-project/locations/us/\
        namespaces/my-namespace/services/my-service \
            --unity-catalog-name=my-catalog \
            --unity-instance-name=instance.cloud.databricks.com \
            --unity-service-principal-application-id=xxxxxxxx-xxxx-xxxx-xxxx\
        -xxxxxxxxxxxx --primary-location=us

POSITIONAL ARGUMENTS
     Catalog resource - The Iceberg Catalog to create. This represents a Cloud
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument catalog on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CATALOG
          ID of the catalog or fully qualified identifier for the catalog.

          To set the catalog attribute:
          + provide the argument catalog on the command line.

REQUIRED FLAGS
     --catalog-type=CATALOG_TYPE
        Catalog type to create the catalog with. CATALOG_TYPE must be one of:

         biglake
            BigLake Iceberg catalog. Catalog type which allows namespaces and
            tables within a catalog to be mapped to locations beyond the
            catalog's designated default. Note: biglake and lakehouse catalog
            types are the same.
         federated
            BigLake federated catalog mirroring a remote catalog.
         gcs-bucket
            A catalog backed by a Cloud Storage bucket.
         lakehouse
            BigLake Iceberg catalog. Catalog type which allows namespaces and
            tables within a catalog to be mapped to locations beyond the
            catalog's designated default. Note: biglake and lakehouse catalog
            types are the same.

OPTIONAL FLAGS
     --credential-mode=CREDENTIAL_MODE; default="end-user"
        Credential mode to create the catalog with. CREDENTIAL_MODE must be one
        of:

         end-user
            Use end user credentials to access the catalog.
         vended-credentials
            Use vended credentials to access the catalog.

     --cross-cloud-cache=MODE
        Whether to enable caching of remote data on Google Cloud. This may
        result in data being temporarily persisted on Google Cloud. MODE must
        be one of: enabled, disabled.

     --default-location=DEFAULT_LOCATION
        Can only be used with BigLake catalogs. The default storage location
        for the catalog, e.g., gs://my-bucket/....

     --description=DESCRIPTION
        Description of the resource.

     --federated-catalog-identity-mode=FEDERATED_CATALOG_IDENTITY_MODE
        The identity mode for the federated catalog.
        FEDERATED_CATALOG_IDENTITY_MODE must be one of:

         service-identity
            Queries execute using the BigLake service account.
         user-identity-federation
            Queries execute using the end user's identity and are propagated to
            the remote catalog. Identity federation must be configured in the
            remote catalog.

     --federated-catalog-type=FEDERATED_CATALOG_TYPE
        Type of the federated catalog. FEDERATED_CATALOG_TYPE must be one of:
        unity, glue, snowflake, workday.

     --glue-aws-region=GLUE_AWS_REGION
        The AWS region of the Glue catalog to connect to.

     --glue-aws-role-arn=GLUE_AWS_ROLE_ARN
        The AWS role ARN of the Glue catalog that the BigLake federated catalog
        will assume to access the catalog.

     --glue-warehouse=GLUE_WAREHOUSE
        The warehouse to connect to in AWS Glue Iceberg REST Catalog.

     --metadata-service-directory-name=METADATA_SERVICE_DIRECTORY_NAME
        The service directory resource name used to route metadata layer
        traffic with the remote catalog over a private network connection, in
        the format
        projects/{project_id}/locations/{location}/namespaces/{namespace}/services/{service_name}.
        This is used to retrieve catalog metadata (such as Iceberg
        configurations, namespaces, and tables) and to fetch OAuth tokens. See
        https://docs.cloud.google.com/lakehouse/docs/set-up-cross-cloud-lakehouse#setup-cci.

     --namespace-filters=[NAMESPACE,...]
        Filters to determine which namespaces are included in the refresh
        process. Empty list means include all namespaces.

     --primary-location=PRIMARY_LOCATION
        Primary location for mirroring the remote catalog metadata. It must be
        a BigLake-supported location, and it should be proximate to the remote
        catalog's location for better performance and lower cost.

     --refresh-interval=REFRESH_INTERVAL
        The interval for refreshing metadata from the remote catalog (e.g.,
        "1hr5m30s"). Defaults to seconds if no unit is specified. If unset, the
        refresh interval will be set to 0s (background refresh disabled).

     --restricted-locations=[LOCATION,...]
        Additional Google Cloud Storage buckets and locations (e.g.,
        gs://my-other-bucket/...) that are permitted for use by resources
        within a catalog. This field is currently only used for BigLake
        catalogs.If restricted_locations is empty and unrestricted catalog
        creation is enabled, all accessible locations are allowed. Otherwise,
        only default_location and locations in this list are allowed.

     --secret-name=SECRET_NAME
        The secret resource name in Secret Manager, in the format
        projects/{project_id}/locations/{location}/secrets/{secret_id} or
        projects/{project_id}/locations/{location}/secrets/{secret_id}/versions/{version_id}.

     --service-directory-name=SERVICE_DIRECTORY_NAME
        The service directory resource name for request routing, in the format
        projects/{project_id}/locations/{location}/namespaces/{namespace}/services/{service_name}.
        see
        https://docs.cloud.google.com/lakehouse/docs/set-up-cross-cloud-lakehouse#setup-cci.

     --snowflake-account-identifier=SNOWFLAKE_ACCOUNT_IDENTIFIER
        The account identifier of the Snowflake catalog to connect to.

     --snowflake-role=SNOWFLAKE_ROLE
        The specific role to request for the Snowflake catalog.

     --snowflake-warehouse=SNOWFLAKE_WAREHOUSE
        The warehouse to connect to in Snowflake.

     --unity-catalog-name=UNITY_CATALOG_NAME
        Name of the catalog in Unity Catalog.

     --unity-instance-name=UNITY_INSTANCE_NAME
        The instance name is the first part of the URL when you log into your
        Databricks deployment. For example, for a Databricks on Google Cloud
        workspace URL https://1.1.gcp.databricks.com, the instance name is
        1.1.gcp.databricks.com.

     --unity-service-principal-application-id=UNITY_SERVICE_PRINCIPAL_APPLICATION_ID
        Optional. The application ID of the Databricks service principal that
        will be used to access the Unity Catalog in the OIDC authentication
        flow. With OIDC, the secret-name argument is not used.

     --workday-base-url=WORKDAY_BASE_URL
        The base URL of the Workday instance.

     --workday-tenant=WORKDAY_TENANT
        The Workday tenant name.

     Key resource - The Cloud KMS (Key Management Service) cryptokey that will
     be used to protect the catalog. The Lakehouse encryption service account
     (lh-<project_number>@gcp-sa-lakehouse.iam.gserviceaccount.com) must hold
     permission 'Cloud KMS CryptoKey Encrypter/Decrypter'. The arguments in
     this group can be used to specify the attributes of this resource.

     --kms-key=KMS_KEY
        ID of the key or fully qualified identifier for the key.

        To set the kms-key attribute:
        * provide the argument --kms-key on the command line.

        This flag argument must be specified if any of the other arguments in
        this group are specified.

     --kms-keyring=KMS_KEYRING
        The KMS keyring of the key.

        To set the kms-keyring attribute:
        * provide the argument --kms-key on the command line with a fully
          specified name;
        * provide the argument --kms-keyring on the command line.

     --kms-location=KMS_LOCATION
        The Google Cloud location for the key.

        To set the kms-location attribute:
        * provide the argument --kms-key on the command line with a fully
          specified name;
        * provide the argument --kms-location on the command line.

     --kms-project=KMS_PROJECT
        The Google Cloud project for the key.

        To set the kms-project attribute:
        * provide the argument --kms-key on the command line with a fully
          specified name;
        * provide the argument --kms-project on the command line;
        * set the property core/project.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha biglake iceberg catalogs create

        $ gcloud beta biglake iceberg catalogs create
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud biglake iceberg catalogs create my-lakehouse-catalog \
    --catalog-type=lakehouse \
    --default-location=gs://my-bucket \
    --kms-key=projects/my-project/locations/us-central1/keyRings/my-ring/cryptoKeys/my-key

gcloud biglake iceberg catalogs create my-federated-catalog \
    --catalog-type=federated \
    --federated-catalog-type=unity \
    --service-directory-name=projects/my-project/locations/us/namespaces/my-namespace/services/my-service \
    --unity-catalog-name=my-catalog \
    --unity-instance-name=instance.cloud.databricks.com \
    --unity-service-principal-application-id=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx \
    --primary-location=us
```

### gcloud biglake iceberg catalogs delete

```text
NAME
    gcloud biglake iceberg catalogs delete - delete a BigLake Iceberg REST
        catalog

SYNOPSIS
    gcloud biglake iceberg catalogs delete CATALOG [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a BigLake Iceberg REST catalog.

POSITIONAL ARGUMENTS
     Catalog resource - The Iceberg Catalog to delete. This represents a Cloud
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument catalog on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CATALOG
          ID of the catalog or fully qualified identifier for the catalog.

          To set the catalog attribute:
          + provide the argument catalog on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha biglake iceberg catalogs delete

        $ gcloud beta biglake iceberg catalogs delete
```

### gcloud biglake iceberg catalogs describe

```text
NAME
    gcloud biglake iceberg catalogs describe - describe a BigLake Iceberg REST
        catalog

SYNOPSIS
    gcloud biglake iceberg catalogs describe CATALOG [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a BigLake Iceberg REST catalog.

POSITIONAL ARGUMENTS
     Catalog resource - The Iceberg Catalog to describe. This represents a
     Cloud resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument catalog on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CATALOG
          ID of the catalog or fully qualified identifier for the catalog.

          To set the catalog attribute:
          + provide the argument catalog on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha biglake iceberg catalogs describe

        $ gcloud beta biglake iceberg catalogs describe
```

### gcloud biglake iceberg catalogs failover

```text
NAME
    gcloud biglake iceberg catalogs failover - failover a BigLake Iceberg REST
        catalog

SYNOPSIS
    gcloud biglake iceberg catalogs failover CATALOG
        --primary-replica=PRIMARY_REPLICA
        [--conditional-failover-replication-time=CONDITIONAL_FAILOVER_REPLICATION_TIME]
        [--validate-only] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Failover a BigLake Iceberg REST catalog.

POSITIONAL ARGUMENTS
     Catalog resource - The Iceberg Catalog to failover. This represents a
     Cloud resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument catalog on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CATALOG
          ID of the catalog or fully qualified identifier for the catalog.

          To set the catalog attribute:
          + provide the argument catalog on the command line.

REQUIRED FLAGS
     --primary-replica=PRIMARY_REPLICA
        The primary replica region to failover to.

OPTIONAL FLAGS
     --conditional-failover-replication-time=CONDITIONAL_FAILOVER_REPLICATION_TIME
        If not specified, wait for all data from the source region to replicate
        to the new primary region before completing the failover, with no data
        loss. If specified, the failover will be executed immediately,
        accepting data loss of any data commited after the specified timestamp.
        This timestamp must be in UTC format, e.g.
        "2025-10-09T01:13:34.038262Z". See $ gcloud topic datetimes for more
        information.

     --validate-only
        If true, the failover will be validated but not executed.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha biglake iceberg catalogs failover

        $ gcloud beta biglake iceberg catalogs failover
```

### gcloud biglake iceberg catalogs get-iam-policy

```text
NAME
    gcloud biglake iceberg catalogs get-iam-policy - get the IAM policy for a
        BigLake Iceberg REST catalog

SYNOPSIS
    gcloud biglake iceberg catalogs get-iam-policy CATALOG
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Gets the IAM policy for a BigLake Iceberg REST catalog.

EXAMPLES
    To get the IAM policy for the catalog my-catalog run:

        $ gcloud biglake iceberg catalogs get-iam-policy my-catalog

POSITIONAL ARGUMENTS
     Catalog resource - The Iceberg Catalog to get the IAM policy for. This
     represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument catalog on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CATALOG
          ID of the catalog or fully qualified identifier for the catalog.

          To set the catalog attribute:
          + provide the argument catalog on the command line.

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

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha biglake iceberg catalogs get-iam-policy

        $ gcloud beta biglake iceberg catalogs get-iam-policy
```

### gcloud biglake iceberg catalogs list

```text
NAME
    gcloud biglake iceberg catalogs list - list BigLake Iceberg REST catalogs

SYNOPSIS
    gcloud biglake iceberg catalogs list [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List BigLake Iceberg REST catalogs.

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

        $ gcloud alpha biglake iceberg catalogs list

        $ gcloud beta biglake iceberg catalogs list
```

### gcloud biglake iceberg catalogs set-iam-policy

```text
NAME
    gcloud biglake iceberg catalogs set-iam-policy - set the IAM policy for a
        BigLake Iceberg REST catalog

SYNOPSIS
    gcloud biglake iceberg catalogs set-iam-policy CATALOG POLICY_FILE
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Sets the IAM policy for a BigLake Iceberg REST catalog.

EXAMPLES
    To set the IAM policy for the catalog my-catalog with the policy in
    policy.json run:

        $ gcloud biglake iceberg catalogs set-iam-policy my-catalog \
            policy.json

POSITIONAL ARGUMENTS
     Catalog resource - The Iceberg Catalog to set the IAM policy for. This
     represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument catalog on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CATALOG
          ID of the catalog or fully qualified identifier for the catalog.

          To set the catalog attribute:
          + provide the argument catalog on the command line.

     POLICY_FILE
        Path to a local JSON or YAML formatted file containing a valid policy.

        The output of the get-iam-policy command is a valid file, as is any
        JSON or YAML file conforming to the structure of a Policy
        (https://cloud.google.com/iam/reference/rest/v1/Policy).

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha biglake iceberg catalogs set-iam-policy

        $ gcloud beta biglake iceberg catalogs set-iam-policy
```

### gcloud biglake iceberg catalogs update

```text
NAME
    gcloud biglake iceberg catalogs update - update a BigLake Iceberg REST
        catalog

SYNOPSIS
    gcloud biglake iceberg catalogs update CATALOG
        [--catalog-type=CATALOG_TYPE]
        [--credential-mode=CREDENTIAL_MODE; default="end-user"]
        [--cross-cloud-cache=MODE] [--description=DESCRIPTION]
        [--federated-catalog-identity-mode=FEDERATED_CATALOG_IDENTITY_MODE]
        [--glue-aws-role-arn=GLUE_AWS_ROLE_ARN]
        [--metadata-service-directory-name=METADATA_SERVICE_DIRECTORY_NAME]
        [--namespace-filters=[NAMESPACE,...]]
        [--refresh-interval=REFRESH_INTERVAL]
        [--restricted-locations=[LOCATION,...]] [--secret-name=SECRET_NAME]
        [--service-directory-name=SERVICE_DIRECTORY_NAME]
        [--snowflake-role=SNOWFLAKE_ROLE]
        [--unity-service-principal-application-id=UNITY_SERVICE_PRINCIPAL_APPLICATION_ID]
        [--clear-kms-key | [--kms-key=KMS_KEY : --kms-keyring=KMS_KEYRING
          --kms-location=KMS_LOCATION --kms-project=KMS_PROJECT]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a BigLake Iceberg REST catalog.

EXAMPLES
    To update the description of a catalog my-catalog, run:

        $ gcloud biglake iceberg catalogs update my-catalog \
            --description="updated description"

    To update a catalog my-lakehouse-catalog to catalog type lakehouse with
    restricted locations, run:

        $ gcloud biglake iceberg catalogs update my-lakehouse-catalog \
            --catalog-type=lakehouse \
            --restricted-locations=gs://my-bucket1,gs://my-bucket2

    To update a catalog my-lakehouse-catalog to enable cross-cloud cache, run:

        $ gcloud biglake iceberg catalogs update my-lakehouse-catalog \
            --cross-cloud-cache=enabled

    To update the Cloud KMS key of a catalog my-catalog, run:

        $ gcloud biglake iceberg catalogs update my-catalog \
            --kms-key=projects/my-project/locations/us-central1/keyRings/\
        my-ring/cryptoKeys/my-new-key

    To update the refresh interval and namespace filters for a federated
    catalog my-federated-catalog, run:

        $ gcloud biglake iceberg catalogs update my-federated-catalog \
            --refresh-interval=1h --namespace-filters=db1,db2

POSITIONAL ARGUMENTS
     Catalog resource - The Iceberg Catalog to update. This represents a Cloud
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument catalog on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CATALOG
          ID of the catalog or fully qualified identifier for the catalog.

          To set the catalog attribute:
          + provide the argument catalog on the command line.

FLAGS
     --catalog-type=CATALOG_TYPE
        Catalog type to update the catalog with. Currently only updating to a
        BigLake or Lakehouse catalog type is supported. CATALOG_TYPE must be
        one of:

         biglake
            BigLake Iceberg catalog. Catalog type which allows namespaces and
            tables within a catalog to be mapped to locations beyond the
            catalog's designated default. Note: biglake and lakehouse catalog
            types are the same.
         lakehouse
            BigLake Iceberg catalog. Catalog type which allows namespaces and
            tables within a catalog to be mapped to locations beyond the
            catalog's designated default. Note: biglake and lakehouse catalog
            types are the same.

     --credential-mode=CREDENTIAL_MODE; default="end-user"
        Credential mode to create the catalog with. CREDENTIAL_MODE must be one
        of:

         end-user
            Use end user credentials to access the catalog.
         vended-credentials
            Use vended credentials to access the catalog.

     --cross-cloud-cache=MODE
        Whether to enable caching of remote data on Google Cloud. This may
        result in data being temporarily persisted on Google Cloud. MODE must
        be one of: enabled, disabled.

     --description=DESCRIPTION
        Description of the resource.

     --federated-catalog-identity-mode=FEDERATED_CATALOG_IDENTITY_MODE
        The identity mode for the federated catalog.
        FEDERATED_CATALOG_IDENTITY_MODE must be one of:

         service-identity
            Queries execute using the BigLake service account.
         user-identity-federation
            Queries execute using the end user's identity and are propagated to
            the remote catalog. Identity federation must be configured in the
            remote catalog.

     --glue-aws-role-arn=GLUE_AWS_ROLE_ARN
        The AWS role ARN of the Glue catalog that the BigLake federated catalog
        will assume to access the catalog.

     --metadata-service-directory-name=METADATA_SERVICE_DIRECTORY_NAME
        The service directory resource name used to route metadata layer
        traffic with the remote catalog over a private network connection, in
        the format
        projects/{project_id}/locations/{location}/namespaces/{namespace}/services/{service_name}.
        This is used to retrieve catalog metadata (such as Iceberg
        configurations, namespaces, and tables) and to fetch OAuth tokens. See
        https://docs.cloud.google.com/lakehouse/docs/set-up-cross-cloud-lakehouse#setup-cci.

     --namespace-filters=[NAMESPACE,...]
        Filters to determine which namespaces are included in the refresh
        process. Empty list means include all namespaces.

     --refresh-interval=REFRESH_INTERVAL
        Interval for refreshing metadata from the remote catalog (e.g.,
        "1hr5m30s"). Defaults to seconds if no unit is specified. If unset, the
        refresh interval will be set to 0s (background refresh disabled).

     --restricted-locations=[LOCATION,...]
        Additional Google Cloud Storage buckets and locations (e.g.,
        gs://my-other-bucket/...) that are permitted for use by resources
        within a catalog. This field is currently only used for BigLake
        catalogs.If restricted_locations is empty and unrestricted catalog
        creation is enabled, all accessible locations are allowed. Otherwise,
        only default_location and locations in this list are allowed.

     --secret-name=SECRET_NAME
        Resource name of the Secret Manager secret, in the format
        projects/{project_id}/locations/{location}/secrets/{secret_id} or
        projects/{project_id}/locations/{location}/secrets/{secret_id}/versions/{version_id}.

     --service-directory-name=SERVICE_DIRECTORY_NAME
        The service directory resource name for request routing, in the format
        projects/{project_id}/locations/{location}/namespaces/{namespace}/services/{service_name}.
        see
        https://docs.cloud.google.com/lakehouse/docs/set-up-cross-cloud-lakehouse#setup-cci.

     --snowflake-role=SNOWFLAKE_ROLE
        The specific role to request for the Snowflake catalog.

     --unity-service-principal-application-id=UNITY_SERVICE_PRINCIPAL_APPLICATION_ID
        Optional. The application ID of the Databricks service principal that
        will be used to access the Unity Catalog in the OIDC authentication
        flow. With OIDC, the secret-name argument is not used.

     At most one of these can be specified:

       --clear-kms-key
          Clear the Cloud KMS key for the catalog and revert to Google-managed
          encryption.

       Or at least one of these can be specified:

         Key resource - The Cloud KMS (Key Management Service) cryptokey that
         will be used to protect the catalog. The Lakehouse encryption service
         account (lh-<project_number>@gcp-sa-lakehouse.iam.gserviceaccount.com)
         must hold permission 'Cloud KMS CryptoKey Encrypter/Decrypter'. The
         arguments in this group can be used to specify the attributes of this
         resource.

         --kms-key=KMS_KEY
            ID of the key or fully qualified identifier for the key.

            To set the kms-key attribute:
            - provide the argument --kms-key on the command line.

            This flag argument must be specified if any of the other arguments
            in this group are specified.

         --kms-keyring=KMS_KEYRING
            The KMS keyring of the key.

            To set the kms-keyring attribute:
            - provide the argument --kms-key on the command line with a fully
              specified name;
            - provide the argument --kms-keyring on the command line.

         --kms-location=KMS_LOCATION
            The Google Cloud location for the key.

            To set the kms-location attribute:
            - provide the argument --kms-key on the command line with a fully
              specified name;
            - provide the argument --kms-location on the command line.

         --kms-project=KMS_PROJECT
            The Google Cloud project for the key.

            To set the kms-project attribute:
            - provide the argument --kms-key on the command line with a fully
              specified name;
            - provide the argument --kms-project on the command line;
            - set the property core/project.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha biglake iceberg catalogs update

        $ gcloud beta biglake iceberg catalogs update
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud biglake iceberg catalogs update my-catalog \
    --kms-key=projects/my-project/locations/us-central1/keyRings/my-ring/cryptoKeys/my-new-key
```

### gcloud beta biglake iceberg catalogs create

```text
NAME
    gcloud beta biglake iceberg catalogs create - create a BigLake Iceberg REST
        catalog

SYNOPSIS
    gcloud beta biglake iceberg catalogs create CATALOG
        --catalog-type=CATALOG_TYPE
        [--credential-mode=CREDENTIAL_MODE; default="end-user"]
        [--cross-cloud-cache=MODE] [--default-location=DEFAULT_LOCATION]
        [--description=DESCRIPTION]
        [--federated-catalog-identity-mode=FEDERATED_CATALOG_IDENTITY_MODE]
        [--federated-catalog-type=FEDERATED_CATALOG_TYPE]
        [--glue-aws-region=GLUE_AWS_REGION]
        [--glue-aws-role-arn=GLUE_AWS_ROLE_ARN]
        [--glue-warehouse=GLUE_WAREHOUSE]
        [--metadata-service-directory-name=METADATA_SERVICE_DIRECTORY_NAME]
        [--namespace-filters=[NAMESPACE,...]]
        [--primary-location=PRIMARY_LOCATION]
        [--refresh-interval=REFRESH_INTERVAL]
        [--restricted-locations=[LOCATION,...]] [--secret-name=SECRET_NAME]
        [--service-directory-name=SERVICE_DIRECTORY_NAME]
        [--snowflake-account-identifier=SNOWFLAKE_ACCOUNT_IDENTIFIER]
        [--snowflake-role=SNOWFLAKE_ROLE]
        [--snowflake-user-identity-federation-role=SNOWFLAKE_USER_IDENTITY_FEDERATION_ROLE]
        [--snowflake-warehouse=SNOWFLAKE_WAREHOUSE]
        [--unity-catalog-name=UNITY_CATALOG_NAME]
        [--unity-instance-name=UNITY_INSTANCE_NAME]
        [--unity-service-principal-application-id=UNITY_SERVICE_PRINCIPAL_APPLICATION_ID]
        [--workday-api-client-client-id=WORKDAY_API_CLIENT_CLIENT_ID]
        [--workday-base-url=WORKDAY_BASE_URL] [--workday-tenant=WORKDAY_TENANT]
        [--kms-key=KMS_KEY : --kms-keyring=KMS_KEYRING
          --kms-location=KMS_LOCATION --kms-project=KMS_PROJECT]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta biglake iceberg catalogs delete

```text
NAME
    gcloud beta biglake iceberg catalogs delete - delete a BigLake Iceberg REST
        catalog

SYNOPSIS
    gcloud beta biglake iceberg catalogs delete CATALOG [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta biglake iceberg catalogs describe

```text
NAME
    gcloud beta biglake iceberg catalogs describe - describe a BigLake Iceberg
        REST catalog

SYNOPSIS
    gcloud beta biglake iceberg catalogs describe CATALOG
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta biglake iceberg catalogs failover

```text
NAME
    gcloud beta biglake iceberg catalogs failover - failover a BigLake Iceberg
        REST catalog

SYNOPSIS
    gcloud beta biglake iceberg catalogs failover CATALOG
        --primary-replica=PRIMARY_REPLICA
        [--conditional-failover-replication-time=CONDITIONAL_FAILOVER_REPLICATION_TIME]
        [--validate-only] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta biglake iceberg catalogs get-iam-policy

```text
NAME
    gcloud beta biglake iceberg catalogs get-iam-policy - get the IAM policy
        for a BigLake Iceberg REST catalog

SYNOPSIS
    gcloud beta biglake iceberg catalogs get-iam-policy CATALOG
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta biglake iceberg catalogs list

```text
NAME
    gcloud beta biglake iceberg catalogs list - list BigLake Iceberg REST
        catalogs

SYNOPSIS
    gcloud beta biglake iceberg catalogs list [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta biglake iceberg catalogs set-iam-policy

```text
NAME
    gcloud beta biglake iceberg catalogs set-iam-policy - set the IAM policy
        for a BigLake Iceberg REST catalog

SYNOPSIS
    gcloud beta biglake iceberg catalogs set-iam-policy CATALOG POLICY_FILE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta biglake iceberg catalogs update

```text
NAME
    gcloud beta biglake iceberg catalogs update - update a BigLake Iceberg REST
        catalog

SYNOPSIS
    gcloud beta biglake iceberg catalogs update CATALOG
        [--catalog-type=CATALOG_TYPE]
        [--credential-mode=CREDENTIAL_MODE; default="end-user"]
        [--cross-cloud-cache=MODE] [--description=DESCRIPTION]
        [--federated-catalog-identity-mode=FEDERATED_CATALOG_IDENTITY_MODE]
        [--glue-aws-role-arn=GLUE_AWS_ROLE_ARN]
        [--metadata-service-directory-name=METADATA_SERVICE_DIRECTORY_NAME]
        [--namespace-filters=[NAMESPACE,...]]
        [--refresh-interval=REFRESH_INTERVAL]
        [--restricted-locations=[LOCATION,...]] [--secret-name=SECRET_NAME]
        [--service-directory-name=SERVICE_DIRECTORY_NAME]
        [--snowflake-role=SNOWFLAKE_ROLE]
        [--snowflake-user-identity-federation-role=SNOWFLAKE_USER_IDENTITY_FEDERATION_ROLE]
        [--unity-service-principal-application-id=UNITY_SERVICE_PRINCIPAL_APPLICATION_ID]
        [--workday-api-client-client-id=WORKDAY_API_CLIENT_CLIENT_ID]
        [--clear-kms-key | [--kms-key=KMS_KEY : --kms-keyring=KMS_KEYRING
          --kms-location=KMS_LOCATION --kms-project=KMS_PROJECT]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha biglake iceberg catalogs create

```text
NAME
    gcloud alpha biglake iceberg catalogs create - create a BigLake Iceberg
        REST catalog

SYNOPSIS
    gcloud alpha biglake iceberg catalogs create CATALOG
        --catalog-type=CATALOG_TYPE
        [--credential-mode=CREDENTIAL_MODE; default="end-user"]
        [--cross-cloud-cache=MODE] [--default-location=DEFAULT_LOCATION]
        [--description=DESCRIPTION]
        [--federated-catalog-identity-mode=FEDERATED_CATALOG_IDENTITY_MODE]
        [--federated-catalog-type=FEDERATED_CATALOG_TYPE]
        [--glue-aws-region=GLUE_AWS_REGION]
        [--glue-aws-role-arn=GLUE_AWS_ROLE_ARN]
        [--glue-warehouse=GLUE_WAREHOUSE]
        [--metadata-service-directory-name=METADATA_SERVICE_DIRECTORY_NAME]
        [--namespace-filters=[NAMESPACE,...]]
        [--primary-location=PRIMARY_LOCATION]
        [--refresh-interval=REFRESH_INTERVAL]
        [--restricted-locations=[LOCATION,...]] [--secret-name=SECRET_NAME]
        [--service-directory-name=SERVICE_DIRECTORY_NAME]
        [--snowflake-account-identifier=SNOWFLAKE_ACCOUNT_IDENTIFIER]
        [--snowflake-role=SNOWFLAKE_ROLE]
        [--snowflake-user-identity-federation-role=SNOWFLAKE_USER_IDENTITY_FEDERATION_ROLE]
        [--snowflake-warehouse=SNOWFLAKE_WAREHOUSE]
        [--unity-catalog-name=UNITY_CATALOG_NAME]
        [--unity-instance-name=UNITY_INSTANCE_NAME]
        [--unity-service-principal-application-id=UNITY_SERVICE_PRINCIPAL_APPLICATION_ID]
        [--workday-api-client-client-id=WORKDAY_API_CLIENT_CLIENT_ID]
        [--workday-base-url=WORKDAY_BASE_URL] [--workday-tenant=WORKDAY_TENANT]
        [--kms-key=KMS_KEY : --kms-keyring=KMS_KEYRING
          --kms-location=KMS_LOCATION --kms-project=KMS_PROJECT]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha biglake iceberg catalogs delete

```text
NAME
    gcloud alpha biglake iceberg catalogs delete - delete a BigLake Iceberg
        REST catalog

SYNOPSIS
    gcloud alpha biglake iceberg catalogs delete CATALOG [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha biglake iceberg catalogs describe

```text
NAME
    gcloud alpha biglake iceberg catalogs describe - describe a BigLake Iceberg
        REST catalog

SYNOPSIS
    gcloud alpha biglake iceberg catalogs describe CATALOG
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha biglake iceberg catalogs failover

```text
NAME
    gcloud alpha biglake iceberg catalogs failover - failover a BigLake Iceberg
        REST catalog

SYNOPSIS
    gcloud alpha biglake iceberg catalogs failover CATALOG
        --primary-replica=PRIMARY_REPLICA
        [--conditional-failover-replication-time=CONDITIONAL_FAILOVER_REPLICATION_TIME]
        [--validate-only] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha biglake iceberg catalogs get-iam-policy

```text
NAME
    gcloud alpha biglake iceberg catalogs get-iam-policy - get the IAM policy
        for a BigLake Iceberg REST catalog

SYNOPSIS
    gcloud alpha biglake iceberg catalogs get-iam-policy CATALOG
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha biglake iceberg catalogs list

```text
NAME
    gcloud alpha biglake iceberg catalogs list - list BigLake Iceberg REST
        catalogs

SYNOPSIS
    gcloud alpha biglake iceberg catalogs list [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha biglake iceberg catalogs set-iam-policy

```text
NAME
    gcloud alpha biglake iceberg catalogs set-iam-policy - set the IAM policy
        for a BigLake Iceberg REST catalog

SYNOPSIS
    gcloud alpha biglake iceberg catalogs set-iam-policy CATALOG POLICY_FILE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha biglake iceberg catalogs update

```text
NAME
    gcloud alpha biglake iceberg catalogs update - update a BigLake Iceberg
        REST catalog

SYNOPSIS
    gcloud alpha biglake iceberg catalogs update CATALOG
        [--catalog-type=CATALOG_TYPE]
        [--credential-mode=CREDENTIAL_MODE; default="end-user"]
        [--cross-cloud-cache=MODE] [--description=DESCRIPTION]
        [--federated-catalog-identity-mode=FEDERATED_CATALOG_IDENTITY_MODE]
        [--glue-aws-role-arn=GLUE_AWS_ROLE_ARN]
        [--metadata-service-directory-name=METADATA_SERVICE_DIRECTORY_NAME]
        [--namespace-filters=[NAMESPACE,...]]
        [--refresh-interval=REFRESH_INTERVAL]
        [--restricted-locations=[LOCATION,...]] [--secret-name=SECRET_NAME]
        [--service-directory-name=SERVICE_DIRECTORY_NAME]
        [--snowflake-role=SNOWFLAKE_ROLE]
        [--snowflake-user-identity-federation-role=SNOWFLAKE_USER_IDENTITY_FEDERATION_ROLE]
        [--unity-service-principal-application-id=UNITY_SERVICE_PRINCIPAL_APPLICATION_ID]
        [--workday-api-client-client-id=WORKDAY_API_CLIENT_CLIENT_ID]
        [--clear-kms-key | [--kms-key=KMS_KEY : --kms-keyring=KMS_KEYRING
          --kms-location=KMS_LOCATION --kms-project=KMS_PROJECT]]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/biglake/iceberg/catalogs (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
