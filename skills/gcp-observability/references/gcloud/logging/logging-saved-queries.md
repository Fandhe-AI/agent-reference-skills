---
source: https://docs.cloud.google.com/sdk/gcloud/reference/logging/saved-queries
---

# gcloud logging saved-queries

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud logging saved-queries create

```text
NAME
    gcloud logging saved-queries create - create a Logging saved query

SYNOPSIS
    gcloud logging saved-queries create --display-name=DISPLAY_NAME
        --location=LOCATION --visibility=VISIBILITY
        (--sql-query-text=SQL_QUERY_TEXT | --log-filter=LOG_FILTER
          --summary-fields=SUMMARY_FIELDS --summary-field-end=SUMMARY_FIELD_END
          | --summary-field-start=SUMMARY_FIELD_START)
        [--description=DESCRIPTION] [--id=ID]
        [--billing-account=BILLING_ACCOUNT_ID | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a saved query.

EXAMPLES
    To create a saved query in a project, run:

        $ gcloud logging saved-queries create --id=my-saved-query \
           --location=global --display-name="My saved query" \
           --visibility=private --sql-query-text="SELECT * FROM my_table"

REQUIRED FLAGS
     --display-name=DISPLAY_NAME
        Display name for the saved query.

     --location=LOCATION
        Location to create the saved query in.

     --visibility=VISIBILITY
        Visibility of the saved query. VISIBILITY must be one of: private,
        shared.

     Exactly one of these must be specified:

       --sql-query-text=SQL_QUERY_TEXT
          SQL query text.

       Or at least one of these can be specified:

         --log-filter=LOG_FILTER
            Filter expression for the log-based query.

         --summary-fields=SUMMARY_FIELDS
            Comma-separated list of fields to include in the summary. This flag
            must be specified if --summary-field-start or --summary-field-end
            are provided.

         At most one of these can be specified:

           --summary-field-end=SUMMARY_FIELD_END
              Setting for number of characters to display for each summary
              field: characters will be counted from the end of the string.
              Requires the --summary-fields flag to be specified as well.

           --summary-field-start=SUMMARY_FIELD_START
              Setting for number of characters to display for each summary
              field: characters will be counted from the start of the string.
              Requires the --summary-fields flag to be specified as well.

OPTIONAL FLAGS
     --description=DESCRIPTION
        A textual description for the saved query.

     --id=ID
        ID of the saved query to create.

     At most one of these can be specified:

       --billing-account=BILLING_ACCOUNT_ID
          Billing account of the saved query to create.

       --folder=FOLDER_ID
          Folder of the saved query to create.

       --organization=ORGANIZATION_ID
          Organization of the saved query to create.

       --project=PROJECT_ID
          Project of the saved query to create.

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
```

### gcloud logging saved-queries delete

```text
NAME
    gcloud logging saved-queries delete - delete a Logging saved query

SYNOPSIS
    gcloud logging saved-queries delete ID --location=LOCATION
        [--billing-account=BILLING_ACCOUNT_ID | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a saved query.

EXAMPLES
    To delete a saved query in a project, run:

        $ gcloud logging saved-queries delete MY_QUERY_ID \
            --project=MY_PROJECT_ID --location=global

POSITIONAL ARGUMENTS
     ID
        ID of the saved query to delete.

REQUIRED FLAGS
     --location=LOCATION
        Location of the saved query to delete.

OPTIONAL FLAGS
     At most one of these can be specified:

       --billing-account=BILLING_ACCOUNT_ID
          Billing account of the saved query to delete.

       --folder=FOLDER_ID
          Folder of the saved query to delete.

       --organization=ORGANIZATION_ID
          Organization of the saved query to delete.

       --project=PROJECT_ID
          Project of the saved query to delete.

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
```

### gcloud logging saved-queries describe

```text
NAME
    gcloud logging saved-queries describe - a command that describes a Logging
        saved query

SYNOPSIS
    gcloud logging saved-queries describe ID --location=LOCATION
        [--billing-account=BILLING_ACCOUNT_ID | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a saved query.

EXAMPLES
    To describe a saved query in a project, run:

        $ gcloud logging saved-queries describe ID --project=PROJECT_ID \
            --location=LOCATION

POSITIONAL ARGUMENTS
     ID
        ID of the saved query to describe.

REQUIRED FLAGS
     --location=LOCATION
        Location of the saved query to describe.

OPTIONAL FLAGS
     At most one of these can be specified:

       --billing-account=BILLING_ACCOUNT_ID
          Billing account of the saved query to describe.

       --folder=FOLDER_ID
          Folder of the saved query to describe.

       --organization=ORGANIZATION_ID
          Organization of the saved query to describe.

       --project=PROJECT_ID
          Project of the saved query to describe.

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
```

### gcloud logging saved-queries list

```text
NAME
    gcloud logging saved-queries list - list Logging saved queries

SYNOPSIS
    gcloud logging saved-queries list --location=LOCATION
        [--billing-account=BILLING_ACCOUNT_ID | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List saved queries for a parent resource. (project, billing account,
    folder, or organization)

EXAMPLES
    To list saved queries in a project, run:

        $ gcloud logging saved-queries list --location=LOCATION \
            --project=PROJECT_ID

REQUIRED FLAGS
     --location=LOCATION
        Location of the saved queries to list.

FLAGS
     At most one of these can be specified:

       --billing-account=BILLING_ACCOUNT_ID
          Billing account of the parent resource for saved queries to list.

       --folder=FOLDER_ID
          Folder of the parent resource for saved queries to list.

       --organization=ORGANIZATION_ID
          Organization of the parent resource for saved queries to list.

       --project=PROJECT_ID
          Project of the parent resource for saved queries to list.

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
```

### gcloud logging saved-queries update

```text
NAME
    gcloud logging saved-queries update - update Logging saved queries

SYNOPSIS
    gcloud logging saved-queries update SAVED_QUERY_ID
        [--description=DESCRIPTION] [--display-name=DISPLAY_NAME]
        [--location=LOCATION] [--name=NAME] [--visibility=VISIBILITY]
        [--billing-account=BILLING_ACCOUNT_ID | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID]
        [--sql-query-text=SQL_QUERY_TEXT
          | --add-summary-field=ADD_SUMMARY_FIELD --clear-summary-fields
          --log-filter=LOG_FILTER --remove-summary-field=REMOVE_SUMMARY_FIELD
          --summary-field-end=SUMMARY_FIELD_END
          | --summary-field-start=SUMMARY_FIELD_START] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a saved query.

EXAMPLES
    To update the display name and description of a saved query, run:

        $ gcloud logging saved-queries update my-saved-query \
            --display-name="New Name" --description="New Description"

POSITIONAL ARGUMENTS
     SAVED_QUERY_ID
        ID of the saved query to update.

FLAGS
     --description=DESCRIPTION
        The description of the saved query.

     --display-name=DISPLAY_NAME
        The display name of the saved query.

     --location=LOCATION
        Location of the saved query.

     --name=NAME
        The resource name of the saved query.

     --visibility=VISIBILITY
        The visibility of the saved query.

     At most one of these can be specified:

       --billing-account=BILLING_ACCOUNT_ID
          Billing account of the saved query to update.

       --folder=FOLDER_ID
          Folder of the saved query to update.

       --organization=ORGANIZATION_ID
          Organization of the saved query to update.

       --project=PROJECT_ID
          Project of the saved query to update.

          The Google Cloud project ID to use for this invocation. If omitted,
          then the current project is assumed; the current project can be
          listed using gcloud config list --format='text(core.project)' and can
          be set using gcloud config set project PROJECTID.

          --project and its fallback core/project property play two roles in
          the invocation: they specify both the project of the resource to
          operate on, and the project for API enablement checks, quota, and
          billing. To specify a different project for quota and billing, use
          the --billing-project flag or the billing/quota_project property.

     At most one of these can be specified:

       --sql-query-text=SQL_QUERY_TEXT
          The SQL query text. If this argument is specified, no LoggingQuery
          arguments (--log-filter, --add-summary-field, etc.) may be specified.

       Or at least one of these can be specified:

         --add-summary-field=ADD_SUMMARY_FIELD
            Add a summary field.

         --clear-summary-fields
            Clear all summary fields.

         --log-filter=LOG_FILTER
            The logging filter. If this argument is specified, --sql-query-text
            may not be specified.

         --remove-summary-field=REMOVE_SUMMARY_FIELD
            Remove a summary field.

         At most one of these can be specified:

           --summary-field-end=SUMMARY_FIELD_END
              Summary field end.

           --summary-field-start=SUMMARY_FIELD_START
              Summary field start.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/logging/saved-queries (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
