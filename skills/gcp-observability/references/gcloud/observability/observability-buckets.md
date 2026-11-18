---
source: https://docs.cloud.google.com/sdk/gcloud/reference/observability/buckets
---

# gcloud observability buckets

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud observability buckets create

```text
NAME
    gcloud observability buckets create - create a bucket

SYNOPSIS
    gcloud observability buckets create (BUCKET : --location=LOCATION)
        [--async] [--cmek-settings-kms-key=CMEK_SETTINGS_KMS_KEY]
        [--description=DESCRIPTION] [--display-name=DISPLAY_NAME]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create an Observability Bucket.

EXAMPLES
    To create a bucket, run:

        $ gcloud observability buckets create my-bucket \
            --location=us-central1

POSITIONAL ARGUMENTS
     Bucket resource - Identifier. Name of the bucket. The format is:

         projects/[PROJECT_ID]/locations/[LOCATION]/buckets/[BUCKET_ID] The arguments in this group can be used to specify the attributes of this resource. (NOTE) Some attributes are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument bucket on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       BUCKET
          ID of the bucket or fully qualified identifier for the bucket.

          To set the bucket attribute:
          + provide the argument bucket on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the bucket resource.

          To set the location attribute:
          + provide the argument bucket on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     Settings for configuring CMEK for a bucket.

     --cmek-settings-kms-key=CMEK_SETTINGS_KMS_KEY
        The resource name for the configured Cloud KMS key. The format is:

            projects/[PROJECT_ID]/locations/[LOCATION]/keyRings/[KEYRING]/cryptoKeys/[KEY]

        For example:

            projects/my-project/locations/us-central1/keyRings/my-ring/cryptoKeys/my-key

     --description=DESCRIPTION
        Description of the bucket.

     --display-name=DISPLAY_NAME
        User friendly display name.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the observability/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/stackdriver/docs/

NOTES
    This variant is also available:

        $ gcloud beta observability buckets create
```

### gcloud observability buckets datasets describe

```text
NAME
    gcloud observability buckets datasets describe - describe datasets

SYNOPSIS
    gcloud observability buckets datasets describe
        (DATASET : --bucket=BUCKET --location=LOCATION) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a dataset

EXAMPLES
    To describe the dataset, run:

        $ gcloud observability buckets datasets describe

POSITIONAL ARGUMENTS
     Dataset resource - Name of the dataset to retrieve. The format is:

         projects/[PROJECT_ID]/locations/[LOCATION]/buckets/[BUCKET_ID]/datasets/[DATASET_ID] The arguments in this group can be used to specify the attributes of this resource. (NOTE) Some attributes are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument dataset on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       DATASET
          ID of the dataset or fully qualified identifier for the dataset.

          To set the dataset attribute:
          + provide the argument dataset on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --bucket=BUCKET
          The bucket id of the dataset resource.

          To set the bucket attribute:
          + provide the argument dataset on the command line with a fully
            specified name;
          + provide the argument --bucket on the command line.

       --location=LOCATION
          The location id of the dataset resource.

          To set the location attribute:
          + provide the argument dataset on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the observability/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/stackdriver/docs/

NOTES
    This variant is also available:

        $ gcloud beta observability buckets datasets describe
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud observability buckets datasets describe DATASET \
    --bucket=BUCKET \
    --location=LOCATION
```

### gcloud observability buckets datasets links create

```text
NAME
    gcloud observability buckets datasets links create - create links

SYNOPSIS
    gcloud observability buckets datasets links create
        (LINK : --bucket=BUCKET --dataset=DATASET --location=LOCATION)
        [--async] [--description=DESCRIPTION] [--display-name=DISPLAY_NAME]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a link

EXAMPLES
    To create the link, run:

        $ gcloud observability buckets datasets links create

POSITIONAL ARGUMENTS
     Link resource - Identifier. Name of the link. The format is:

         projects/[PROJECT_ID]/locations/[LOCATION]/buckets/[BUCKET_ID]/datasets/[DATASET_ID]/links/[LINK_ID] The arguments in this group can be used to specify the attributes of this resource. (NOTE) Some attributes are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument link on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       LINK
          ID of the link or fully qualified identifier for the link.

          To set the link attribute:
          + provide the argument link on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --bucket=BUCKET
          The bucket id of the link resource.

          To set the bucket attribute:
          + provide the argument link on the command line with a fully
            specified name;
          + provide the argument --bucket on the command line.

       --dataset=DATASET
          The dataset id of the link resource.

          To set the dataset attribute:
          + provide the argument link on the command line with a fully
            specified name;
          + provide the argument --dataset on the command line.

       --location=LOCATION
          The location id of the link resource.

          To set the location attribute:
          + provide the argument link on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --description=DESCRIPTION
        Description of the link.

     --display-name=DISPLAY_NAME
        A user friendly display name.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the observability/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/stackdriver/docs/

NOTES
    This variant is also available:

        $ gcloud beta observability buckets datasets links create
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud observability buckets datasets links create LINK \
    --bucket=BUCKET \
    --dataset=DATASET \
    --location=LOCATION
```

### gcloud observability buckets datasets links delete

```text
NAME
    gcloud observability buckets datasets links delete - delete links

SYNOPSIS
    gcloud observability buckets datasets links delete
        (LINK : --bucket=BUCKET --dataset=DATASET --location=LOCATION)
        [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a link

EXAMPLES
    To delete the link, run:

        $ gcloud observability buckets datasets links delete

POSITIONAL ARGUMENTS
     Link resource - Name of the link to delete. The format is:

         projects/[PROJECT_ID]/locations/[LOCATION]/buckets/[BUCKET_ID]/datasets/[DATASET_ID]/links/[LINK_ID] The arguments in this group can be used to specify the attributes of this resource. (NOTE) Some attributes are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument link on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       LINK
          ID of the link or fully qualified identifier for the link.

          To set the link attribute:
          + provide the argument link on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --bucket=BUCKET
          The bucket id of the link resource.

          To set the bucket attribute:
          + provide the argument link on the command line with a fully
            specified name;
          + provide the argument --bucket on the command line.

       --dataset=DATASET
          The dataset id of the link resource.

          To set the dataset attribute:
          + provide the argument link on the command line with a fully
            specified name;
          + provide the argument --dataset on the command line.

       --location=LOCATION
          The location id of the link resource.

          To set the location attribute:
          + provide the argument link on the command line with a fully
            specified name;
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
    This command uses the observability/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/stackdriver/docs/

NOTES
    This variant is also available:

        $ gcloud beta observability buckets datasets links delete
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud observability buckets datasets links delete LINK \
    --bucket=BUCKET \
    --dataset=DATASET \
    --location=LOCATION
```

### gcloud observability buckets datasets links describe

```text
NAME
    gcloud observability buckets datasets links describe - describe links

SYNOPSIS
    gcloud observability buckets datasets links describe
        (LINK : --bucket=BUCKET --dataset=DATASET --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a link

EXAMPLES
    To describe the link, run:

        $ gcloud observability buckets datasets links describe

POSITIONAL ARGUMENTS
     Link resource - Name of the link to retrieve. The format is:

         projects/[PROJECT_ID]/locations/[LOCATION]/buckets/[BUCKET_ID]/datasets/[DATASET_ID]/links/[LINK_ID] The arguments in this group can be used to specify the attributes of this resource. (NOTE) Some attributes are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument link on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       LINK
          ID of the link or fully qualified identifier for the link.

          To set the link attribute:
          + provide the argument link on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --bucket=BUCKET
          The bucket id of the link resource.

          To set the bucket attribute:
          + provide the argument link on the command line with a fully
            specified name;
          + provide the argument --bucket on the command line.

       --dataset=DATASET
          The dataset id of the link resource.

          To set the dataset attribute:
          + provide the argument link on the command line with a fully
            specified name;
          + provide the argument --dataset on the command line.

       --location=LOCATION
          The location id of the link resource.

          To set the location attribute:
          + provide the argument link on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the observability/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/stackdriver/docs/

NOTES
    This variant is also available:

        $ gcloud beta observability buckets datasets links describe
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud observability buckets datasets links describe LINK \
    --bucket=BUCKET \
    --dataset=DATASET \
    --location=LOCATION
```

### gcloud observability buckets datasets links list

```text
NAME
    gcloud observability buckets datasets links list - list links

SYNOPSIS
    gcloud observability buckets datasets links list
        (--dataset=DATASET : --bucket=BUCKET --location=LOCATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List links

EXAMPLES
    To list all links, run:

        $ gcloud observability buckets datasets links list

REQUIRED FLAGS
     Dataset resource - The parent dataset that owns this collection of links.
     The format is:

         projects/[PROJECT_ID]/locations/[LOCATION]/buckets/[BUCKET_ID]/datasets/[DATASET_ID] The arguments in this group can be used to specify the attributes of this resource. (NOTE) Some attributes are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --dataset on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --dataset=DATASET
          ID of the dataset or fully qualified identifier for the dataset.

          To set the dataset attribute:
          + provide the argument --dataset on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --bucket=BUCKET
          The bucket id of the dataset resource.

          To set the bucket attribute:
          + provide the argument --dataset on the command line with a fully
            specified name;
          + provide the argument --bucket on the command line.

       --location=LOCATION
          The location id of the dataset resource.

          To set the location attribute:
          + provide the argument --dataset on the command line with a fully
            specified name;
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
    This command uses the observability/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/stackdriver/docs/

NOTES
    This variant is also available:

        $ gcloud beta observability buckets datasets links list
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud observability buckets datasets links list \
    --dataset=DATASET \
    --bucket=BUCKET \
    --location=LOCATION
```

### gcloud observability buckets datasets links update

```text
NAME
    gcloud observability buckets datasets links update - update links

SYNOPSIS
    gcloud observability buckets datasets links update
        (LINK : --bucket=BUCKET --dataset=DATASET --location=LOCATION)
        [--async] [--description=DESCRIPTION] [--display-name=DISPLAY_NAME]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a link

EXAMPLES
    To update the link, run:

        $ gcloud observability buckets datasets links update

POSITIONAL ARGUMENTS
     Link resource - Identifier. Name of the link. The format is:

         projects/[PROJECT_ID]/locations/[LOCATION]/buckets/[BUCKET_ID]/datasets/[DATASET_ID]/links/[LINK_ID] The arguments in this group can be used to specify the attributes of this resource. (NOTE) Some attributes are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument link on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       LINK
          ID of the link or fully qualified identifier for the link.

          To set the link attribute:
          + provide the argument link on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --bucket=BUCKET
          The bucket id of the link resource.

          To set the bucket attribute:
          + provide the argument link on the command line with a fully
            specified name;
          + provide the argument --bucket on the command line.

       --dataset=DATASET
          The dataset id of the link resource.

          To set the dataset attribute:
          + provide the argument link on the command line with a fully
            specified name;
          + provide the argument --dataset on the command line.

       --location=LOCATION
          The location id of the link resource.

          To set the location attribute:
          + provide the argument link on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --description=DESCRIPTION
        Description of the link.

     --display-name=DISPLAY_NAME
        A user friendly display name.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the observability/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/stackdriver/docs/

NOTES
    This variant is also available:

        $ gcloud beta observability buckets datasets links update
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud observability buckets datasets links update LINK \
    --bucket=BUCKET \
    --dataset=DATASET \
    --location=LOCATION \
    --description=DESCRIPTION
```

### gcloud observability buckets datasets list

```text
NAME
    gcloud observability buckets datasets list - list datasets

SYNOPSIS
    gcloud observability buckets datasets list
        (--bucket=BUCKET : --location=LOCATION) [--show-deleted]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List datasets

EXAMPLES
    To list all datasets, run:

        $ gcloud observability buckets datasets list

REQUIRED FLAGS
     Bucket resource - The parent bucket that owns this collection of datasets.
     The format is:

         projects/[PROJECT_ID]/locations/[LOCATION]/buckets/[BUCKET_ID] The arguments in this group can be used to specify the attributes of this resource. (NOTE) Some attributes are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --bucket on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --bucket=BUCKET
          ID of the bucket or fully qualified identifier for the bucket.

          To set the bucket attribute:
          + provide the argument --bucket on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --location=LOCATION
          The location id of the bucket resource.

          To set the location attribute:
          + provide the argument --bucket on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

FLAGS
     --show-deleted
        If true, then the response will include deleted datasets.

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
    This command uses the observability/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/stackdriver/docs/

NOTES
    This variant is also available:

        $ gcloud beta observability buckets datasets list
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud observability buckets datasets list \
    --bucket=BUCKET \
    --location=LOCATION
```

### gcloud observability buckets datasets views describe

```text
NAME
    gcloud observability buckets datasets views describe - describe views

SYNOPSIS
    gcloud observability buckets datasets views describe
        (VIEW : --bucket=BUCKET --dataset=DATASET --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a view

EXAMPLES
    To describe the view, run:

        $ gcloud observability buckets datasets views describe

POSITIONAL ARGUMENTS
     View resource - Name of the view to retrieve. The format is:

         projects/[PROJECT_ID]/locations/[LOCATION]/buckets/[BUCKET_ID]/datasets/[DATASET_ID]/views/[VIEW_ID] The arguments in this group can be used to specify the attributes of this resource. (NOTE) Some attributes are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument view on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       VIEW
          ID of the view or fully qualified identifier for the view.

          To set the view attribute:
          + provide the argument view on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --bucket=BUCKET
          The bucket id of the view resource.

          To set the bucket attribute:
          + provide the argument view on the command line with a fully
            specified name;
          + provide the argument --bucket on the command line.

       --dataset=DATASET
          The dataset id of the view resource.

          To set the dataset attribute:
          + provide the argument view on the command line with a fully
            specified name;
          + provide the argument --dataset on the command line.

       --location=LOCATION
          The location id of the view resource.

          To set the location attribute:
          + provide the argument view on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the observability/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/stackdriver/docs/

NOTES
    This variant is also available:

        $ gcloud beta observability buckets datasets views describe
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud observability buckets datasets views describe VIEW \
    --bucket=BUCKET \
    --dataset=DATASET \
    --location=LOCATION
```

### gcloud observability buckets datasets views list

```text
NAME
    gcloud observability buckets datasets views list - list views

SYNOPSIS
    gcloud observability buckets datasets views list
        (--dataset=DATASET : --bucket=BUCKET --location=LOCATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List views

EXAMPLES
    To list all views, run:

        $ gcloud observability buckets datasets views list

REQUIRED FLAGS
     Dataset resource - Dataset whose views are to be listed. The format is:

         projects/[PROJECT_ID]/locations/[LOCATION]/buckets/[BUCKET_ID]/datasets/[DATASET_ID] The arguments in this group can be used to specify the attributes of this resource. (NOTE) Some attributes are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --dataset on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --dataset=DATASET
          ID of the dataset or fully qualified identifier for the dataset.

          To set the dataset attribute:
          + provide the argument --dataset on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --bucket=BUCKET
          The bucket id of the dataset resource.

          To set the bucket attribute:
          + provide the argument --dataset on the command line with a fully
            specified name;
          + provide the argument --bucket on the command line.

       --location=LOCATION
          The location id of the dataset resource.

          To set the location attribute:
          + provide the argument --dataset on the command line with a fully
            specified name;
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
    This command uses the observability/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/stackdriver/docs/

NOTES
    This variant is also available:

        $ gcloud beta observability buckets datasets views list
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud observability buckets datasets views list \
    --dataset=DATASET \
    --bucket=BUCKET \
    --location=LOCATION
```

### gcloud observability buckets describe

```text
NAME
    gcloud observability buckets describe - describe buckets

SYNOPSIS
    gcloud observability buckets describe (BUCKET : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a bucket

EXAMPLES
    To describe the bucket, run:

        $ gcloud observability buckets describe

POSITIONAL ARGUMENTS
     Bucket resource - Name of the bucket to retrieve. The format is:

         projects/[PROJECT_ID]/locations/[LOCATION]/buckets/[BUCKET_ID] The arguments in this group can be used to specify the attributes of this resource. (NOTE) Some attributes are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument bucket on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       BUCKET
          ID of the bucket or fully qualified identifier for the bucket.

          To set the bucket attribute:
          + provide the argument bucket on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the bucket resource.

          To set the location attribute:
          + provide the argument bucket on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the observability/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/stackdriver/docs/

NOTES
    This variant is also available:

        $ gcloud beta observability buckets describe
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud observability buckets describe BUCKET \
    --location=LOCATION
```

### gcloud observability buckets list

```text
NAME
    gcloud observability buckets list - list buckets

SYNOPSIS
    gcloud observability buckets list --location=LOCATION [--show-deleted]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List buckets

EXAMPLES
    To list all buckets, run:

        $ gcloud observability buckets list

REQUIRED FLAGS
     Location resource - The parent, which owns this collection of buckets. The
     format is:

         projects/[PROJECT_ID]/locations/[LOCATION] This represents a Cloud resource. (NOTE) Some attributes are not given arguments in this group but can be set in other ways.

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

FLAGS
     --show-deleted
        If true, then the response will include deleted buckets.

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
    This command uses the observability/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/stackdriver/docs/

NOTES
    This variant is also available:

        $ gcloud beta observability buckets list
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud observability buckets list \
    --location=LOCATION
```

### gcloud observability buckets update

```text
NAME
    gcloud observability buckets update - update a bucket

SYNOPSIS
    gcloud observability buckets update (BUCKET : --location=LOCATION)
        [--async] [--description=DESCRIPTION] [--display-name=DISPLAY_NAME]
        [--clear-cmek-settings --cmek-settings-kms-key=CMEK_SETTINGS_KMS_KEY]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update an Observability Bucket.

EXAMPLES
    To update a bucket, run:

        $ gcloud observability buckets update my-bucket \
            --location=us-central1 --display-name="My Bucket"

POSITIONAL ARGUMENTS
     Bucket resource - Identifier. Name of the bucket. The format is:

         projects/[PROJECT_ID]/locations/[LOCATION]/buckets/[BUCKET_ID] The arguments in this group can be used to specify the attributes of this resource. (NOTE) Some attributes are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument bucket on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       BUCKET
          ID of the bucket or fully qualified identifier for the bucket.

          To set the bucket attribute:
          + provide the argument bucket on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the bucket resource.

          To set the location attribute:
          + provide the argument bucket on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --description=DESCRIPTION
        Description of the bucket.

     --display-name=DISPLAY_NAME
        User friendly display name.

     Settings for configuring CMEK for a bucket.

     --clear-cmek-settings
        Set bucket.cmekSettings back to default value.

     --cmek-settings-kms-key=CMEK_SETTINGS_KMS_KEY
        The resource name for the configured Cloud KMS key. The format is:

            projects/[PROJECT_ID]/locations/[LOCATION]/keyRings/[KEYRING]/cryptoKeys/[KEY]

        For example:

            projects/my-project/locations/us-central1/keyRings/my-ring/cryptoKeys/my-key

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the observability/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/stackdriver/docs/

NOTES
    This variant is also available:

        $ gcloud beta observability buckets update
```

### gcloud beta observability buckets create

```text
NAME
    gcloud beta observability buckets create - create a bucket

SYNOPSIS
    gcloud beta observability buckets create (BUCKET : --location=LOCATION)
        [--async] [--cmek-settings-kms-key=CMEK_SETTINGS_KMS_KEY]
        [--description=DESCRIPTION] [--display-name=DISPLAY_NAME]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta observability buckets datasets describe

```text
NAME
    gcloud beta observability buckets datasets describe - describe datasets

SYNOPSIS
    gcloud beta observability buckets datasets describe
        (DATASET : --bucket=BUCKET --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta observability buckets datasets links create

```text
NAME
    gcloud beta observability buckets datasets links create - create links

SYNOPSIS
    gcloud beta observability buckets datasets links create
        (LINK : --bucket=BUCKET --dataset=DATASET --location=LOCATION)
        [--async] [--description=DESCRIPTION] [--display-name=DISPLAY_NAME]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta observability buckets datasets links delete

```text
NAME
    gcloud beta observability buckets datasets links delete - delete links

SYNOPSIS
    gcloud beta observability buckets datasets links delete
        (LINK : --bucket=BUCKET --dataset=DATASET --location=LOCATION)
        [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta observability buckets datasets links describe

```text
NAME
    gcloud beta observability buckets datasets links describe - describe links

SYNOPSIS
    gcloud beta observability buckets datasets links describe
        (LINK : --bucket=BUCKET --dataset=DATASET --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta observability buckets datasets links list

```text
NAME
    gcloud beta observability buckets datasets links list - list links

SYNOPSIS
    gcloud beta observability buckets datasets links list
        (--dataset=DATASET : --bucket=BUCKET --location=LOCATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta observability buckets datasets links update

```text
NAME
    gcloud beta observability buckets datasets links update - update links

SYNOPSIS
    gcloud beta observability buckets datasets links update
        (LINK : --bucket=BUCKET --dataset=DATASET --location=LOCATION)
        [--async] [--description=DESCRIPTION] [--display-name=DISPLAY_NAME]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta observability buckets datasets list

```text
NAME
    gcloud beta observability buckets datasets list - list datasets

SYNOPSIS
    gcloud beta observability buckets datasets list
        (--bucket=BUCKET : --location=LOCATION) [--show-deleted]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta observability buckets datasets views describe

```text
NAME
    gcloud beta observability buckets datasets views describe - describe views

SYNOPSIS
    gcloud beta observability buckets datasets views describe
        (VIEW : --bucket=BUCKET --dataset=DATASET --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta observability buckets datasets views list

```text
NAME
    gcloud beta observability buckets datasets views list - list views

SYNOPSIS
    gcloud beta observability buckets datasets views list
        (--dataset=DATASET : --bucket=BUCKET --location=LOCATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta observability buckets describe

```text
NAME
    gcloud beta observability buckets describe - describe buckets

SYNOPSIS
    gcloud beta observability buckets describe (BUCKET : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta observability buckets list

```text
NAME
    gcloud beta observability buckets list - list buckets

SYNOPSIS
    gcloud beta observability buckets list --location=LOCATION [--show-deleted]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta observability buckets update

```text
NAME
    gcloud beta observability buckets update - update a bucket

SYNOPSIS
    gcloud beta observability buckets update (BUCKET : --location=LOCATION)
        [--async] [--description=DESCRIPTION] [--display-name=DISPLAY_NAME]
        [--clear-cmek-settings --cmek-settings-kms-key=CMEK_SETTINGS_KMS_KEY]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the `create` example gives only the command, without the link, `--bucket`, `--dataset` and `--location` that the SYNOPSIS requires (`gcloud observability buckets datasets links create (LINK : --bucket=BUCKET --dataset=DATASET --location=LOCATION)`; gcloud 593.0.0: "Must be specified"); the runnable form adds the SYNOPSIS placeholders.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the `delete` example gives only the command, without the link, `--bucket`, `--dataset` and `--location` that the SYNOPSIS requires (`gcloud observability buckets datasets links delete (LINK : --bucket=BUCKET --dataset=DATASET --location=LOCATION)`; gcloud 593.0.0: "Must be specified"); the runnable form adds the SYNOPSIS placeholders.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the `describe` example gives only the command, without the bucket and `--location` that the SYNOPSIS requires (`gcloud observability buckets describe (BUCKET : --location=LOCATION)`; gcloud 593.0.0: "Must be specified"); the runnable form adds the SYNOPSIS placeholders.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the `describe` example gives only the command, without the dataset, `--bucket` and `--location` that the SYNOPSIS requires (`gcloud observability buckets datasets describe (DATASET : --bucket=BUCKET --location=LOCATION)`; gcloud 593.0.0: "Must be specified"); the runnable form adds the SYNOPSIS placeholders.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the `describe` example gives only the command, without the link, `--bucket`, `--dataset` and `--location` that the SYNOPSIS requires (`gcloud observability buckets datasets links describe (LINK : --bucket=BUCKET --dataset=DATASET --location=LOCATION)`; gcloud 593.0.0: "Must be specified"); the runnable form adds the SYNOPSIS placeholders.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the `describe` example gives only the command, without the view, `--bucket`, `--dataset` and `--location` that the SYNOPSIS requires (`gcloud observability buckets datasets views describe (VIEW : --bucket=BUCKET --dataset=DATASET --location=LOCATION)`; gcloud 593.0.0: "Must be specified"); the runnable form adds the SYNOPSIS placeholders.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the `list` example gives only the command, without the `--bucket` and `--location` that the SYNOPSIS requires (`gcloud observability buckets datasets list (--bucket=BUCKET : --location=LOCATION)`; gcloud 593.0.0: "Must be specified"); the runnable form adds the SYNOPSIS placeholders.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the `list` example gives only the command, without the `--dataset`, `--bucket` and `--location` that the SYNOPSIS requires (`gcloud observability buckets datasets links list (--dataset=DATASET : --bucket=BUCKET --location=LOCATION)`; gcloud 593.0.0: "Must be specified"); the runnable form adds the SYNOPSIS placeholders.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the `list` example gives only the command, without the `--dataset`, `--bucket` and `--location` that the SYNOPSIS requires (`gcloud observability buckets datasets views list (--dataset=DATASET : --bucket=BUCKET --location=LOCATION)`; gcloud 593.0.0: "Must be specified"); the runnable form adds the SYNOPSIS placeholders.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the `list` example gives only the command, without the `--location` that the SYNOPSIS requires (`gcloud observability buckets list --location=LOCATION`; gcloud 593.0.0: "Must be specified"); the runnable form adds the SYNOPSIS placeholders.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the `update` example gives only the command, without the link, `--bucket`, `--dataset` and `--location` that the SYNOPSIS requires (`gcloud observability buckets datasets links update (LINK : --bucket=BUCKET --dataset=DATASET --location=LOCATION)`; gcloud 593.0.0: "Must be specified"); the runnable form adds the SYNOPSIS placeholders, and `--description` for `update` (the update needs a change flag).
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/observability/buckets (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
