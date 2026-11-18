---
source: https://docs.cloud.google.com/sdk/gcloud/reference/logging/buckets
---

# gcloud logging buckets

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud logging buckets create

```text
NAME
    gcloud logging buckets create - create a bucket

SYNOPSIS
    gcloud logging buckets create BUCKET_ID --location=LOCATION [--async]
        [--cmek-kms-key-name=CMEK_KMS_KEY_NAME] [--description=DESCRIPTION]
        [--enable-analytics] [--index=[KEY=VALUE, ...,...]]
        [--restricted-fields=[RESTRICTED_FIELD,...]]
        [--retention-days=RETENTION_DAYS] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    After creating a bucket, use a log sink to route logs into the bucket.

EXAMPLES
    To create a bucket 'my-bucket' in location 'global', run:

        $ gcloud logging buckets create my-bucket --location=global \
            --description="my custom bucket"

    To create a bucket with extended retention, run:

        $ gcloud logging buckets create my-bucket --location=global \
            --retention-days=365

    To create a bucket in cloud region 'us-central1', run:

        $ gcloud logging buckets create my-bucket --location=us-central1

    To create a bucket with custom index of 'jsonPayload.foo', run:

        $ gcloud logging buckets create my-bucket \
            --index=fieldPath=jsonPayload.foo,type=INDEX_TYPE_STRING

    To create a bucket with custom CMEK, run:

        $ gcloud logging buckets create my-bucket --location=us-central1 \
            --cmek-kms-key-name=CMEK_KMS_KEY_NAME

    To asynchronously create a bucket enrolled into Log Analytics, run:

        $ gcloud logging buckets create my-bucket --location=global \
            --async --enable-analytics

POSITIONAL ARGUMENTS
     BUCKET_ID
        ID of the bucket to create.

REQUIRED FLAGS
     --location=LOCATION
        Location in which to create the bucket. Once the bucket is created, the
        location cannot be changed.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --cmek-kms-key-name=CMEK_KMS_KEY_NAME
        A valid kms_key_name will enable CMEK for the bucket.

     --description=DESCRIPTION
        A textual description for the bucket.

     --enable-analytics
        Whether to opt the bucket into Log Analytics. Once opted in, the bucket
        cannot be opted out of Log Analytics.

     --index=[KEY=VALUE, ...,...]
        Specify an index to be added to the log bucket. This flag can be
        repeated. The fieldPath and type attributes are required. For example:
        --index=fieldPath=jsonPayload.foo,type=INDEX_TYPE_STRING. The following
        keys are accepted:

         fieldPath
            The LogEntry field path to index. For example:
            jsonPayload.request.status. Paths are limited to 800 characters and
            can include only letters, digits, underscores, hyphens, and
            periods.

         type
            The type of data in this index. For example: INDEX_TYPE_STRING
            Supported types are INDEX_TYPE_STRING and INDEX_TYPE_INTEGER.

     --restricted-fields=[RESTRICTED_FIELD,...]
        Comma-separated list of field paths that require permission checks in
        this bucket. The following fields and their children are eligible:
        textPayload, jsonPayload, protoPayload, httpRequest, labels,
        sourceLocation.

     --retention-days=RETENTION_DAYS
        The period logs will be retained, after which logs will automatically
        be deleted. The default is 30 days.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha logging buckets create

        $ gcloud beta logging buckets create
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud logging buckets create my-bucket \
    --index=fieldPath=jsonPayload.foo,type=INDEX_TYPE_STRING \
    --location=global
```

### gcloud logging buckets delete

```text
NAME
    gcloud logging buckets delete - delete a bucket

SYNOPSIS
    gcloud logging buckets delete BUCKET_ID --location=LOCATION
        [--billing-account=BILLING_ACCOUNT_ID | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID]
        [GCLOUD_WIDE_FLAG ...]

EXAMPLES
    To delete bucket 'my-bucket' in location 'global', run:

        $ gcloud logging buckets delete my-bucket --location=global

POSITIONAL ARGUMENTS
     BUCKET_ID
        ID of the bucket to delete.

REQUIRED FLAGS
     --location=LOCATION
        Location of the bucket.

OPTIONAL FLAGS
     At most one of these can be specified:

       --billing-account=BILLING_ACCOUNT_ID
          Billing account of the bucket to delete.

       --folder=FOLDER_ID
          Folder of the bucket to delete.

       --organization=ORGANIZATION_ID
          Organization of the bucket to delete.

       --project=PROJECT_ID
          Project of the bucket to delete.

          The Google Cloud project ID to use for this invocation. If omitted,
          then the current project is assumed; the current project can be
          listed using gcloud config list --format='text(core.project)' and can
          be set using gcloud config set project PROJECTID.

          --project and its fallback core/project property play two roles in
          the invocation: they specify both the project of the resource to
          operate on, and the project for API enablement checks, quota, and
          billing. To specify a different project for quota and billing, use
          the --billing-project flag or the billing/quota_project property.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha logging buckets delete

        $ gcloud beta logging buckets delete
```

### gcloud logging buckets describe

```text
NAME
    gcloud logging buckets describe - display information about a bucket

SYNOPSIS
    gcloud logging buckets describe BUCKET_ID --location=LOCATION
        [--billing-account=BILLING_ACCOUNT_ID | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Display information about a bucket.

EXAMPLES
    To describe a bucket in a project, run:

        $ gcloud logging buckets describe my-bucket --location=global

POSITIONAL ARGUMENTS
     BUCKET_ID
        The id of the bucket to describe.

REQUIRED FLAGS
     --location=LOCATION
        Location of the bucket.

OPTIONAL FLAGS
     At most one of these can be specified:

       --billing-account=BILLING_ACCOUNT_ID
          Billing account of the bucket to describe.

       --folder=FOLDER_ID
          Folder of the bucket to describe.

       --organization=ORGANIZATION_ID
          Organization of the bucket to describe.

       --project=PROJECT_ID
          Project of the bucket to describe.

          The Google Cloud project ID to use for this invocation. If omitted,
          then the current project is assumed; the current project can be
          listed using gcloud config list --format='text(core.project)' and can
          be set using gcloud config set project PROJECTID.

          --project and its fallback core/project property play two roles in
          the invocation: they specify both the project of the resource to
          operate on, and the project for API enablement checks, quota, and
          billing. To specify a different project for quota and billing, use
          the --billing-project flag or the billing/quota_project property.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha logging buckets describe

        $ gcloud beta logging buckets describe
```

### gcloud logging buckets list

```text
NAME
    gcloud logging buckets list - list the defined buckets

SYNOPSIS
    gcloud logging buckets list [--location=LOCATION]
        [--billing-account=BILLING_ACCOUNT_ID | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List the buckets for a project.

EXAMPLES
    To list the buckets in a project, run:

        $ gcloud logging buckets list

FLAGS
     --location=LOCATION
        Location from which to list buckets. By default, buckets in all
        locations will be listed

     At most one of these can be specified:

       --billing-account=BILLING_ACCOUNT_ID
          Billing account of the buckets to list.

       --folder=FOLDER_ID
          Folder of the buckets to list.

       --organization=ORGANIZATION_ID
          Organization of the buckets to list.

       --project=PROJECT_ID
          Project of the buckets to list.

          The Google Cloud project ID to use for this invocation. If omitted,
          then the current project is assumed; the current project can be
          listed using gcloud config list --format='text(core.project)' and can
          be set using gcloud config set project PROJECTID.

          --project and its fallback core/project property play two roles in
          the invocation: they specify both the project of the resource to
          operate on, and the project for API enablement checks, quota, and
          billing. To specify a different project for quota and billing, use
          the --billing-project flag or the billing/quota_project property.

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

        $ gcloud alpha logging buckets list

        $ gcloud beta logging buckets list
```

### gcloud logging buckets undelete

```text
NAME
    gcloud logging buckets undelete - undelete a bucket

SYNOPSIS
    gcloud logging buckets undelete BUCKET_ID --location=LOCATION
        [--billing-account=BILLING_ACCOUNT_ID | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID]
        [GCLOUD_WIDE_FLAG ...]

EXAMPLES
    To undelete bucket 'my-bucket' in location 'global', run:

        $ gcloud logging buckets undelete my-bucket --location=global

POSITIONAL ARGUMENTS
     BUCKET_ID
        ID of the bucket to undelete.

REQUIRED FLAGS
     --location=LOCATION
        Location of the bucket.

OPTIONAL FLAGS
     At most one of these can be specified:

       --billing-account=BILLING_ACCOUNT_ID
          Billing account of the bucket to undelete.

       --folder=FOLDER_ID
          Folder of the bucket to undelete.

       --organization=ORGANIZATION_ID
          Organization of the bucket to undelete.

       --project=PROJECT_ID
          Project of the bucket to undelete.

          The Google Cloud project ID to use for this invocation. If omitted,
          then the current project is assumed; the current project can be
          listed using gcloud config list --format='text(core.project)' and can
          be set using gcloud config set project PROJECTID.

          --project and its fallback core/project property play two roles in
          the invocation: they specify both the project of the resource to
          operate on, and the project for API enablement checks, quota, and
          billing. To specify a different project for quota and billing, use
          the --billing-project flag or the billing/quota_project property.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha logging buckets undelete

        $ gcloud beta logging buckets undelete
```

### gcloud logging buckets update

```text
NAME
    gcloud logging buckets update - update a bucket

SYNOPSIS
    gcloud logging buckets update BUCKET_ID --location=LOCATION
        [--add-index=[KEY=VALUE, ...,...]] [--async] [--clear-indexes]
        [--cmek-kms-key-name=CMEK_KMS_KEY_NAME] [--description=DESCRIPTION]
        [--enable-analytics] [--locked] [--remove-indexes=[FIELD PATH,...]]
        [--restricted-fields=[RESTRICTED_FIELD,...]]
        [--retention-days=RETENTION_DAYS] [--update-index=[KEY=VALUE, ...,...]]
        [--billing-account=BILLING_ACCOUNT_ID | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update the properties of a bucket.

EXAMPLES
    To update a bucket in your project, run:

        $ gcloud logging buckets update my-bucket --location=global \
           --description=my-new-description

    To update a bucket in your project and remove all indexes, run:

        $ gcloud logging buckets update my-bucket --location=global \
           --clear-indexes

    To update a bucket in your project and remove an index, run:

        $ gcloud logging buckets update my-bucket --location=global \
           --remove-indexes=jsonPayload.foo2

    To update a bucket in your project and add an index, run:

        $ gcloud logging buckets update my-bucket --location=global \
           --add-index=fieldPath=jsonPayload.foo2,type=INDEX_TYPE_STRING

    To update a bucket in your project and update an existing index, run:

        $ gcloud logging buckets update my-bucket --location=global \
           --update-index=fieldPath=jsonPayload.foo,type=INDEX_TYPE_INTEGER

    To update a bucket in your project and update existing cmek, run:

        $ gcloud logging buckets update my-bucket --location=global \
           --cmek-kms-key-name=CMEK_KEY_NAME

    To asynchronously enroll a bucket in your project into Log Analytics, run:

        $ gcloud logging buckets update my-bucket --location=global \
           --async --enable-analytics

POSITIONAL ARGUMENTS
     BUCKET_ID
        The id of the bucket to update.

REQUIRED FLAGS
     --location=LOCATION
        Location of the bucket.

OPTIONAL FLAGS
     --add-index=[KEY=VALUE, ...,...]
        Add an index to be added to the log bucket. This flag can be repeated.
        The fieldPath and type attributes are required. For example:
        --index=fieldPath=jsonPayload.foo,type=INDEX_TYPE_STRING. The following
        keys are accepted:

         fieldPath
            The LogEntry field path to index. For example:
            jsonPayload.request.status. Paths are limited to 800 characters and
            can include only letters, digits, underscores, hyphens, and
            periods.

         type
            The type of data in this index. For example: INDEX_TYPE_STRING
            Supported types are strings and integers.

     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --clear-indexes
        Remove all logging indexes from the bucket.

     --cmek-kms-key-name=CMEK_KMS_KEY_NAME
        A valid kms_key_name will enable CMEK for the bucket.

     --description=DESCRIPTION
        A new description for the bucket.

     --enable-analytics
        Whether to opt the bucket into Log Analytics. Once opted in, the bucket
        cannot be opted out of Log Analytics.

     --locked
        Lock the bucket and prevent it from being modified or deleted (unless
        it is empty).

     --remove-indexes=[FIELD PATH,...]
        Specify the field path of the logging index(es) to delete.

     --restricted-fields=[RESTRICTED_FIELD,...]
        A new set of restricted fields for the bucket.

     --retention-days=RETENTION_DAYS
        A new retention period for the bucket.

     --update-index=[KEY=VALUE, ...,...]
        Update an index to be added to the log bucket. This will update the
        type of the index, and also update its createTime to the new update
        time. This flag can be repeated. The fieldPath and type attributes are
        required. For example:
        --index=fieldPath=jsonPayload.foo,type=INDEX_TYPE_STRING. The following
        keys are accepted:

         fieldPath
            The LogEntry field path to index. For example:
            jsonPayload.request.status. Paths are limited to 800 characters and
            can include only letters, digits, underscores, hyphens, and
            periods.

         type
            The type of data in this index. For example: INDEX_TYPE_STRING
            Supported types are strings and integers.

     At most one of these can be specified:

       --billing-account=BILLING_ACCOUNT_ID
          Billing account of the bucket to update.

       --folder=FOLDER_ID
          Folder of the bucket to update.

       --organization=ORGANIZATION_ID
          Organization of the bucket to update.

       --project=PROJECT_ID
          Project of the bucket to update.

          The Google Cloud project ID to use for this invocation. If omitted,
          then the current project is assumed; the current project can be
          listed using gcloud config list --format='text(core.project)' and can
          be set using gcloud config set project PROJECTID.

          --project and its fallback core/project property play two roles in
          the invocation: they specify both the project of the resource to
          operate on, and the project for API enablement checks, quota, and
          billing. To specify a different project for quota and billing, use
          the --billing-project flag or the billing/quota_project property.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha logging buckets update

        $ gcloud beta logging buckets update
```

### gcloud beta logging buckets create

```text
NAME
    gcloud beta logging buckets create - create a bucket

SYNOPSIS
    gcloud beta logging buckets create BUCKET_ID --location=LOCATION [--async]
        [--cmek-kms-key-name=CMEK_KMS_KEY_NAME] [--description=DESCRIPTION]
        [--enable-analytics] [--index=[KEY=VALUE, ...,...]]
        [--restricted-fields=[RESTRICTED_FIELD,...]]
        [--retention-days=RETENTION_DAYS] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta logging buckets delete

```text
NAME
    gcloud beta logging buckets delete - delete a bucket

SYNOPSIS
    gcloud beta logging buckets delete BUCKET_ID --location=LOCATION
        [--billing-account=BILLING_ACCOUNT_ID | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta logging buckets describe

```text
NAME
    gcloud beta logging buckets describe - display information about a bucket

SYNOPSIS
    gcloud beta logging buckets describe BUCKET_ID --location=LOCATION
        [--billing-account=BILLING_ACCOUNT_ID | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta logging buckets list

```text
NAME
    gcloud beta logging buckets list - list the defined buckets

SYNOPSIS
    gcloud beta logging buckets list [--location=LOCATION]
        [--billing-account=BILLING_ACCOUNT_ID | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta logging buckets undelete

```text
NAME
    gcloud beta logging buckets undelete - undelete a bucket

SYNOPSIS
    gcloud beta logging buckets undelete BUCKET_ID --location=LOCATION
        [--billing-account=BILLING_ACCOUNT_ID | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta logging buckets update

```text
NAME
    gcloud beta logging buckets update - update a bucket

SYNOPSIS
    gcloud beta logging buckets update BUCKET_ID --location=LOCATION
        [--add-index=[KEY=VALUE, ...,...]] [--async] [--clear-indexes]
        [--cmek-kms-key-name=CMEK_KMS_KEY_NAME] [--description=DESCRIPTION]
        [--enable-analytics] [--locked] [--remove-indexes=[FIELD PATH,...]]
        [--restricted-fields=[RESTRICTED_FIELD,...]]
        [--retention-days=RETENTION_DAYS] [--update-index=[KEY=VALUE, ...,...]]
        [--billing-account=BILLING_ACCOUNT_ID | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha logging buckets create

```text
NAME
    gcloud alpha logging buckets create - create a bucket

SYNOPSIS
    gcloud alpha logging buckets create BUCKET_ID --location=LOCATION [--async]
        [--cmek-kms-key-name=CMEK_KMS_KEY_NAME] [--description=DESCRIPTION]
        [--enable-analytics] [--index=[KEY=VALUE, ...,...]]
        [--restricted-fields=[RESTRICTED_FIELD,...]]
        [--retention-days=RETENTION_DAYS] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha logging buckets delete

```text
NAME
    gcloud alpha logging buckets delete - delete a bucket

SYNOPSIS
    gcloud alpha logging buckets delete BUCKET_ID --location=LOCATION
        [--billing-account=BILLING_ACCOUNT_ID | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha logging buckets describe

```text
NAME
    gcloud alpha logging buckets describe - display information about a bucket

SYNOPSIS
    gcloud alpha logging buckets describe BUCKET_ID --location=LOCATION
        [--billing-account=BILLING_ACCOUNT_ID | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha logging buckets list

```text
NAME
    gcloud alpha logging buckets list - list the defined buckets

SYNOPSIS
    gcloud alpha logging buckets list [--location=LOCATION]
        [--billing-account=BILLING_ACCOUNT_ID | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha logging buckets undelete

```text
NAME
    gcloud alpha logging buckets undelete - undelete a bucket

SYNOPSIS
    gcloud alpha logging buckets undelete BUCKET_ID --location=LOCATION
        [--billing-account=BILLING_ACCOUNT_ID | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha logging buckets update

```text
NAME
    gcloud alpha logging buckets update - update a bucket

SYNOPSIS
    gcloud alpha logging buckets update BUCKET_ID --location=LOCATION
        [--add-index=[KEY=VALUE, ...,...]] [--async] [--clear-indexes]
        [--cmek-kms-key-name=CMEK_KMS_KEY_NAME] [--description=DESCRIPTION]
        [--enable-analytics] [--locked] [--remove-indexes=[FIELD PATH,...]]
        [--restricted-fields=[RESTRICTED_FIELD,...]]
        [--retention-days=RETENTION_DAYS] [--update-index=[KEY=VALUE, ...,...]]
        [--billing-account=BILLING_ACCOUNT_ID | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the `--index` example omits `--location`, which the SYNOPSIS requires (`gcloud logging buckets create BUCKET_ID --location=LOCATION`; gcloud 593.0.0: "argument --location: Must be specified"); the runnable form adds `--location=global`, the location of the other examples on this page.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/logging/buckets (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
