---
source: https://docs.cloud.google.com/sdk/gcloud/reference/dataplex/lakes
---

# gcloud dataplex lakes

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud dataplex lakes actions list

```text
NAME
    gcloud dataplex lakes actions list - list Dataplex lake actions

SYNOPSIS
    gcloud dataplex lakes actions list (--lake=LAKE : --location=LOCATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List all Dataplex Actions under a specific lake.

EXAMPLES
    To list all actions of a Dataplex Lake test-lake defined in location
    us-central1 run:

        $ gcloud dataplex lakes actions list --location=us-central1 \
            --lake=test-lake

REQUIRED FLAGS
     Lake resource - Arguments and flags that define the Dataplex Lake actions
     you want to list. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --lake on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --lake=LAKE
          ID of the lake or fully qualified identifier for the lake.

          To set the lake attribute:
          + provide the argument --lake on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --location=LOCATION
          Location of the Dataplex resource.

          To set the location attribute:
          + provide the argument --lake on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property dataplex/location.

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
    This command uses the dataplex/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/dataplex/docs

NOTES
    This variant is also available:

        $ gcloud alpha dataplex lakes actions list
```

### gcloud dataplex lakes add-iam-policy-binding

```text
NAME
    gcloud dataplex lakes add-iam-policy-binding - add IAM policy binding to a
        Dataplex lake resource

SYNOPSIS
    gcloud dataplex lakes add-iam-policy-binding (LAKE : --location=LOCATION)
        --member=PRINCIPAL --role=ROLE [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Add IAM policy binding to a Dataplex lake resource.

EXAMPLES
    To add an IAM policy binding for the role of roles/dataplex.viewer for the
    user test-user@gmail.com to lake test-lake in location us-central, run:

        $ gcloud dataplex lakes add-iam-policy-binding test-lake \
            --location=us-central1 --role=roles/dataplex.viewer \
            --member=user:foo@gmail.com

    See https://cloud.google.com/dataplex/docs/iam-roles for details of policy
    role and member types.

POSITIONAL ARGUMENTS
     Lakes resource - Arguments and flags that define the Dataplex lake you
     want to add IAM policy binding to. The arguments in this group can be used
     to specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument lake on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       LAKE
          ID of the lakes or fully qualified identifier for the lakes.

          To set the lake attribute:
          + provide the argument lake on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the Dataplex resource.

          To set the location attribute:
          + provide the argument lake on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property dataplex/location.

REQUIRED FLAGS
     --member=PRINCIPAL
        The principal to add the binding for. Should be of the form
        user|group|serviceAccount:email or domain:domain.

        Examples: user:test-user@gmail.com, group:admins@example.com,
        serviceAccount:test123@example.domain.com, or
        domain:example.domain.com.

        Some resources also accept the following special values:
        * allUsers - Special identifier that represents anyone who is on the
          internet, with or without a Google account.
        * allAuthenticatedUsers - Special identifier that represents anyone
          who is authenticated with a Google account or a service account.

     --role=ROLE
        Role name to assign to the principal. The role name is the complete
        path of a predefined role, such as roles/logging.viewer, or the role ID
        for a custom role, such as
        organizations/{ORGANIZATION_ID}/roles/logging.viewer.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha dataplex lakes add-iam-policy-binding
```

### gcloud dataplex lakes authorize

```text
NAME
    gcloud dataplex lakes authorize - authorize a service agent to manage
        resources

SYNOPSIS
    gcloud dataplex lakes authorize
        (--project-resource=PROJECT_RESOURCE
          | --storage-bucket-resource=STORAGE_BUCKET_RESOURCE
          | --bigquery-dataset-resource=BIGQUERY_DATASET_RESOURCE
          --secondary-project=SECONDARY_PROJECT) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    The service agent for the primary project will be granted an IAM role on a
    secondary project, a Cloud Storage bucket, or a BigQuery dataset.

EXAMPLES
    To authorize the service agent in project test-project to manage resources
    in the project test-project2, run:

        $ gcloud dataplex lakes authorize --project=test-project \
            --project-resource=test-project2

    To authorize the service agent in project test-project to manage the Cloud
    Storage bucket dataplex-storage-bucket, run:

        $ gcloud dataplex lakes authorize --project=test-project \
            --storage-bucket-resource=dataplex-storage-bucket

    To authorize the service agent in project test-project to manage the
    BigQuery dataset test-dataset in project test-project2, run:

        $ gcloud dataplex lakes authorize --project=test-project \
            --bigquery-dataset-resource=test-dataset \
            --secondary-project=test-project2

REQUIRED FLAGS
     The resource on which to grant a role to the service agent.

     Exactly one of these must be specified:

       --project-resource=PROJECT_RESOURCE
          The identifier of the project whose resources the service agent will
          manage.

       --storage-bucket-resource=STORAGE_BUCKET_RESOURCE
          The identifier of the Cloud Storage bucket that the service agent
          will manage.

       Or at least one of these can be specified:

         Fields to identify the BigQuery dataset.

         --bigquery-dataset-resource=BIGQUERY_DATASET_RESOURCE
            The identifier of the BigQuery dataset that the service agent will
            manage.

            This flag argument must be specified if any of the other arguments
            in this group are specified.

         --secondary-project=SECONDARY_PROJECT
            The identifier of the project where the BigQuery dataset is
            located.

            This flag argument must be specified if any of the other arguments
            in this group are specified.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha dataplex lakes authorize
```

### gcloud dataplex lakes create

```text
NAME
    gcloud dataplex lakes create - create a Dataplex lake resource

SYNOPSIS
    gcloud dataplex lakes create (LAKE : --location=LOCATION) [--async]
        [--description=DESCRIPTION] [--display-name=DISPLAY_NAME]
        [--labels=[KEY=VALUE,...]] [--metastore-service=METASTORE_SERVICE]
        [--validate-only] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    A lake is a centralized repository for managing data across the
    organization, where enterprise data is distributed across many cloud
    projects, and stored in a variety of storage services, such as Google Cloud
    Storage and BigQuery. A lake provides data admins with tools to organize,
    secure and manage their data at scale, and provides data scientists and
    data engineers an integrated experience to easily search, discover, analyze
    and transform data and associated metadata.

    The Lake ID will be used to generate names such as database and dataset
    names when publishing metadata to Hive Metastore and BigQuery. The Lake id
    must follow these rules:
      o Must contain only lowercase letters, numbers, and hyphens.
      o Must start with a letter.
      o Must end with a number or a letter.
      o Must be between 1-63 characters.
      o Must be unique within the customer project / location.

EXAMPLES
    To create a Dataplex lake with name my-dataplex-lake in location
    us-central1, run:

        $ gcloud dataplex lakes create my-dataplex-lake --location=us-central

    To create a Dataplex lake with name my-dataplex-lake in location
    us-central1 with metastore service service-123abc attached, run:

        $ gcloud dataplex lakes create my-dataplex-lake \
            --location=us-central \
            --metastore-service=projects/my-project/services/service-123abc

POSITIONAL ARGUMENTS
     Lakes resource - Arguments and flags that define the Dataplex lake you
     want to create. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument lake on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       LAKE
          ID of the lakes or fully qualified identifier for the lakes.

          To set the lake attribute:
          + provide the argument lake on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the Dataplex resource.

          To set the location attribute:
          + provide the argument lake on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property dataplex/location.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --description=DESCRIPTION
        Description of the lake.

     --display-name=DISPLAY_NAME
        Display name of the lake.

     --labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to add.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

     Settings to manage metadata publishing to a Hive Metastore from a lake.

     --metastore-service=METASTORE_SERVICE
        A relative reference to the Dataproc Metastore
        (https://cloud.google.com/dataproc-metastore/docs) service instance
        into which metadata will be published. This is of the form:
        projects/{project_number}/locations/{location_id}/services/{service_id}
        where the location matches the location of the lake.

     --validate-only
        Validate the create action, but don't actually perform it.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha dataplex lakes create
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud dataplex lakes create my-dataplex-lake \
    --location=us-central1

gcloud dataplex lakes create my-dataplex-lake \
    --location=us-central1 \
    --metastore-service=projects/my-project/services/service-123abc
```

### gcloud dataplex lakes deauthorize

```text
NAME
    gcloud dataplex lakes deauthorize - deauthorize a service agent from
        managing resources

SYNOPSIS
    gcloud dataplex lakes deauthorize
        (--project-resource=PROJECT_RESOURCE
          | --storage-bucket-resource=STORAGE_BUCKET_RESOURCE
          | --bigquery-dataset-resource=BIGQUERY_DATASET_RESOURCE
          --secondary-project=SECONDARY_PROJECT) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    The service agent for the primary project will have its IAM role revoked
    from a secondary project, a Cloud Storage bucket, or a BigQuery dataset.

EXAMPLES
    To deauthorize the service agent in project test-project from managing
    resources in the project test-project2, run:

        $ gcloud dataplex lakes deauthorize --project=test-project \
            --project-resource=test-project2

    To deauthorize the service agent in project test-project from managing the
    Cloud Storage bucket dataplex-storage-bucket, run:

        $ gcloud dataplex lakes deauthorize --project=test-project \
            --storage-bucket-resource=dataplex-storage-bucket

    To deauthorize the service agent in project test-project from managing the
    BigQuery dataset test-dataset in project test-project2, run:

        $ gcloud dataplex lakes deauthorize --project=test-project \
            --bigquery-dataset-resource=test-dataset \
            --secondary-project=test-project2

REQUIRED FLAGS
     The resource for which the service agent's role will be revoked.

     Exactly one of these must be specified:

       --project-resource=PROJECT_RESOURCE
          The identifier of the project whose resources the service agent will
          no longer manage.

       --storage-bucket-resource=STORAGE_BUCKET_RESOURCE
          The identifier of the Cloud Storage bucket that the service agent
          will no longer manage.

       Or at least one of these can be specified:

         Fields to identify the BigQuery dataset.

         --bigquery-dataset-resource=BIGQUERY_DATASET_RESOURCE
            The identifier of the BigQuery dataset that the service agent will
            no longer manage.

            This flag argument must be specified if any of the other arguments
            in this group are specified.

         --secondary-project=SECONDARY_PROJECT
            The identifier of the project where the BigQuery dataset is
            located.

            This flag argument must be specified if any of the other arguments
            in this group are specified.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha dataplex lakes deauthorize
```

### gcloud dataplex lakes delete

```text
NAME
    gcloud dataplex lakes delete - delete a Dataplex lake resource

SYNOPSIS
    gcloud dataplex lakes delete (LAKE : --location=LOCATION) [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a Dataplex lake resource.

EXAMPLES
    To delete a Dataplex lake test-lake in location us-central1, run:

        $ gcloud dataplex lakes delete test-lake --location=us-central1

POSITIONAL ARGUMENTS
     Lake resource - Arguments and flags that define the Dataplex lake you want
     to delete. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument lake on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       LAKE
          ID of the lake or fully qualified identifier for the lake.

          To set the lake attribute:
          + provide the argument lake on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location of the Dataplex resource.

          To set the location attribute:
          + provide the argument lake on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property dataplex/location.

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
    This command uses the dataplex/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/dataplex/docs

NOTES
    This variant is also available:

        $ gcloud alpha dataplex lakes delete
```

### gcloud dataplex lakes describe

```text
NAME
    gcloud dataplex lakes describe - describe a Dataplex lake resource

SYNOPSIS
    gcloud dataplex lakes describe (LAKE : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Displays all details of a Dataplex lake resource given a valid lake ID.

EXAMPLES
    To describe a Dataplex lake test-lake in location us-central1, run:

        $ gcloud dataplex lakes describe test-lake --location=us-central1

POSITIONAL ARGUMENTS
     Lake resource - Arguments and flags that define the Dataplex lake you want
     to retrieve. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument lake on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       LAKE
          ID of the lake or fully qualified identifier for the lake.

          To set the lake attribute:
          + provide the argument lake on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location of the Dataplex resource.

          To set the location attribute:
          + provide the argument lake on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property dataplex/location.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the dataplex/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/dataplex/docs

NOTES
    This variant is also available:

        $ gcloud alpha dataplex lakes describe
```

### gcloud dataplex lakes get-iam-policy

```text
NAME
    gcloud dataplex lakes get-iam-policy - get the IAM policy for a Dataplex
        lake resource

SYNOPSIS
    gcloud dataplex lakes get-iam-policy (LAKE : --location=LOCATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Displays the IAM policy associated with a Dataplex lake resource. If
    formatted as JSON, the output can be edited and used as a policy file for
    set-iam-policy. The output includes an "etag" field identifying the version
    emitted and allowing detection of concurrent policy updates.

EXAMPLES
    To print the IAM policy for Dataplex lake test-lake in location
    us-central1, run:

        $ gcloud dataplex lakes get-iam-policy test-lake \
          --location=us-central1

POSITIONAL ARGUMENTS
     Lake resource - Arguments and flags that define the Dataplex lake IAM
     policy you want to retrieve. The arguments in this group can be used to
     specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument lake on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       LAKE
          ID of the lake or fully qualified identifier for the lake.

          To set the lake attribute:
          + provide the argument lake on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location of the Dataplex resource.

          To set the location attribute:
          + provide the argument lake on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property dataplex/location.

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

API REFERENCE
    This command uses the dataplex/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/dataplex/docs

NOTES
    This variant is also available:

        $ gcloud alpha dataplex lakes get-iam-policy
```

### gcloud dataplex lakes list

```text
NAME
    gcloud dataplex lakes list - list Dataplex lake resources under a project

SYNOPSIS
    gcloud dataplex lakes list [--location=LOCATION] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List all Dataplex lake resource under a specific project and location.

EXAMPLES
    To list all Dataplex lake resources in location us-central, run:

        $ gcloud dataplex lakes list --project=test-project \
          --location=us-central1

    To list all Dataplex lakes in all locations, run:

        $ gcloud dataplex lakes list --project=test-project --location=-

FLAGS
     Location resource - Arguments and flags that define the Dataplex lake you
     want to list. This represents a Cloud resource. (NOTE) Some attributes are
     not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * set the property dataplex/location with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --location=LOCATION
        ID of the location or fully qualified identifier for the location.

        To set the location attribute:
        * provide the argument --location on the command line;
        * set the property dataplex/location.

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
    This command uses the dataplex/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/dataplex/docs

NOTES
    This variant is also available:

        $ gcloud alpha dataplex lakes list
```

### gcloud dataplex lakes remove-iam-policy-binding

```text
NAME
    gcloud dataplex lakes remove-iam-policy-binding - remove IAM policy binding
        from a Dataplex lake resource

SYNOPSIS
    gcloud dataplex lakes remove-iam-policy-binding
        (LAKE : --location=LOCATION) --member=PRINCIPAL --role=ROLE
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Remove IAM policy binding from a Dataplex lake resource.

EXAMPLES
    To remove an IAM policy binding for the role roles/dataplex.viewer for the
    user test-user@gmail.com from lake test-lake in location 'us-central', run:

        $ gcloud dataplex lakes remove-iam-policy-binding test-lake \
            --location=us-central1 --role=roles/dataplex.viewer \
            --member=user:foo@gmail.com

    See https://cloud.google.com/dataplex/docs/iam-roles for details of policy
    role and member types.

POSITIONAL ARGUMENTS
     Lakes resource - Arguments and flags that define the Dataplex lake you
     want to remove IAM policy binding from. The arguments in this group can be
     used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument lake on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       LAKE
          ID of the lakes or fully qualified identifier for the lakes.

          To set the lake attribute:
          + provide the argument lake on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the Dataplex resource.

          To set the location attribute:
          + provide the argument lake on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property dataplex/location.

REQUIRED FLAGS
     --member=PRINCIPAL
        The principal to remove the binding for. Should be of the form
        user|group|serviceAccount:email or domain:domain.

        Examples: user:test-user@gmail.com, group:admins@example.com,
        serviceAccount:test123@example.domain.com, or
        domain:example.domain.com.

        Deleted principals have an additional deleted: prefix and a ?uid=UID
        suffix, where UID is a unique identifier for the principal. Example:
        deleted:user:test-user@gmail.com?uid=123456789012345678901.

        Some resources also accept the following special values:
        * allUsers - Special identifier that represents anyone who is on the
          internet, with or without a Google account.
        * allAuthenticatedUsers - Special identifier that represents anyone
          who is authenticated with a Google account or a service account.

     --role=ROLE
        The role to remove the principal from.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha dataplex lakes remove-iam-policy-binding
```

### gcloud dataplex lakes set-iam-policy

```text
NAME
    gcloud dataplex lakes set-iam-policy - set the IAM policy to a Dataplex
        lake as defined in a JSON or YAML file

SYNOPSIS
    gcloud dataplex lakes set-iam-policy (LAKE : --location=LOCATION)
        POLICY_FILE [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    See https://cloud.google.com/iam/docs/managing-policies for details of the
    policy file format and contents.

EXAMPLES
    The following command will read an IAM policy defined in a JSON file
    policy.son and set it for the Dataplex lake test-lake defined in location
    us-central1:

        $ gcloud dataplex lakes set-iam-policy --location=us-central1 \
            test-lake policy.json

POSITIONAL ARGUMENTS
     Lakes resource - Arguments and flags that define the Dataplex lake you
     want to set IAM policy binding to. The arguments in this group can be used
     to specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument lake on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       LAKE
          ID of the lakes or fully qualified identifier for the lakes.

          To set the lake attribute:
          + provide the argument lake on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the Dataplex resource.

          To set the location attribute:
          + provide the argument lake on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property dataplex/location.

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
    This variant is also available:

        $ gcloud alpha dataplex lakes set-iam-policy
```

### gcloud dataplex lakes update

```text
NAME
    gcloud dataplex lakes update - update a Dataplex lake resource

SYNOPSIS
    gcloud dataplex lakes update (LAKE : --location=LOCATION) [--async]
        [--description=DESCRIPTION] [--display-name=DISPLAY_NAME]
        [--labels=[KEY=VALUE,...]] [--metastore-service=METASTORE_SERVICE]
        [--validate-only] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a Dataplex lake resource.

EXAMPLES
    To update a Dataplex Lake test-lake in location us-central1 to have the
    display name first-dataplex-lake and metastore service
    projects/test-lake/locations/us-central1/service/test-service, run:

        $ gcloud dataplex lakes update test-lake --location=us-central1 \
            --display-name="first-dataplex-lake" \
            --metastore-service="projects/test-lake/locations/us-central1/se\
        rvice/test-service"

POSITIONAL ARGUMENTS
     Lakes resource - Arguments and flags that define the Dataplex lake you
     want to update. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument lake on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       LAKE
          ID of the lakes or fully qualified identifier for the lakes.

          To set the lake attribute:
          + provide the argument lake on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the Dataplex resource.

          To set the location attribute:
          + provide the argument lake on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property dataplex/location.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --description=DESCRIPTION
        Description of the lake

     --display-name=DISPLAY_NAME
        Display Name

     --labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to add.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

     Settings to manage metadata publishing to a Hive Metastore from a lake.

     --metastore-service=METASTORE_SERVICE
        A relative reference to the Dataproc Metastore
        (https://cloud.google.com/dataproc-metastore/docs) service instance
        into which metadata will be published. This is of the form:
        projects/{project_number}/locations/{location_id}/services/{service_id}
        where the location matches the location of the lake.

     --validate-only
        Validate the update action, but don't actually perform it.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha dataplex lakes update
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud dataplex lakes update test-lake \
    --location=us-central1 \
    --display-name="first-dataplex-lake" \
    --metastore-service="projects/test-lake/locations/us-central1/service/test-service"
```

### gcloud alpha dataplex lakes actions list

```text
NAME
    gcloud alpha dataplex lakes actions list - list Dataplex lake actions

SYNOPSIS
    gcloud alpha dataplex lakes actions list
        (--lake=LAKE : --location=LOCATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dataplex lakes add-iam-policy-binding

```text
NAME
    gcloud alpha dataplex lakes add-iam-policy-binding - add IAM policy binding
        to a Dataplex lake resource

SYNOPSIS
    gcloud alpha dataplex lakes add-iam-policy-binding
        (LAKE : --location=LOCATION) --member=PRINCIPAL --role=ROLE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dataplex lakes authorize

```text
NAME
    gcloud alpha dataplex lakes authorize - authorize a service agent to manage
        resources

SYNOPSIS
    gcloud alpha dataplex lakes authorize
        (--project-resource=PROJECT_RESOURCE
          | --storage-bucket-resource=STORAGE_BUCKET_RESOURCE
          | --bigquery-dataset-resource=BIGQUERY_DATASET_RESOURCE
          --secondary-project=SECONDARY_PROJECT) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dataplex lakes create

```text
NAME
    gcloud alpha dataplex lakes create - create a Dataplex lake resource

SYNOPSIS
    gcloud alpha dataplex lakes create (LAKE : --location=LOCATION) [--async]
        [--description=DESCRIPTION] [--display-name=DISPLAY_NAME]
        [--labels=[KEY=VALUE,...]] [--metastore-service=METASTORE_SERVICE]
        [--validate-only] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dataplex lakes deauthorize

```text
NAME
    gcloud alpha dataplex lakes deauthorize - deauthorize a service agent from
        managing resources

SYNOPSIS
    gcloud alpha dataplex lakes deauthorize
        (--project-resource=PROJECT_RESOURCE
          | --storage-bucket-resource=STORAGE_BUCKET_RESOURCE
          | --bigquery-dataset-resource=BIGQUERY_DATASET_RESOURCE
          --secondary-project=SECONDARY_PROJECT) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dataplex lakes delete

```text
NAME
    gcloud alpha dataplex lakes delete - delete a Dataplex lake resource

SYNOPSIS
    gcloud alpha dataplex lakes delete (LAKE : --location=LOCATION) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dataplex lakes describe

```text
NAME
    gcloud alpha dataplex lakes describe - describe a Dataplex lake resource

SYNOPSIS
    gcloud alpha dataplex lakes describe (LAKE : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dataplex lakes get-iam-policy

```text
NAME
    gcloud alpha dataplex lakes get-iam-policy - get the IAM policy for a
        Dataplex lake resource

SYNOPSIS
    gcloud alpha dataplex lakes get-iam-policy (LAKE : --location=LOCATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dataplex lakes list

```text
NAME
    gcloud alpha dataplex lakes list - list Dataplex lake resources under a
        project

SYNOPSIS
    gcloud alpha dataplex lakes list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dataplex lakes remove-iam-policy-binding

```text
NAME
    gcloud alpha dataplex lakes remove-iam-policy-binding - remove IAM policy
        binding from a Dataplex lake resource

SYNOPSIS
    gcloud alpha dataplex lakes remove-iam-policy-binding
        (LAKE : --location=LOCATION) --member=PRINCIPAL --role=ROLE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dataplex lakes set-iam-policy

```text
NAME
    gcloud alpha dataplex lakes set-iam-policy - set the IAM policy to a
        Dataplex lake as defined in a JSON or YAML file

SYNOPSIS
    gcloud alpha dataplex lakes set-iam-policy (LAKE : --location=LOCATION)
        POLICY_FILE [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dataplex lakes update

```text
NAME
    gcloud alpha dataplex lakes update - update a Dataplex lake resource

SYNOPSIS
    gcloud alpha dataplex lakes update (LAKE : --location=LOCATION) [--async]
        [--description=DESCRIPTION] [--display-name=DISPLAY_NAME]
        [--labels=[KEY=VALUE,...]] [--metastore-service=METASTORE_SERVICE]
        [--validate-only] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the examples say "in location us-central1" but pass `--location=us-central`, which is not a region ID; the runnable form passes `--location=us-central1`.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/dataplex/lakes (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
