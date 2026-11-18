---
source: https://docs.cloud.google.com/sdk/gcloud/reference/logging/scopes
---

# gcloud logging scopes

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud logging scopes create

```text
NAME
    gcloud logging scopes create - create a log scope

SYNOPSIS
    gcloud logging scopes create LOG_SCOPE_ID
        --resource-names=[RESOURCE_NAMES,...] [--description=DESCRIPTION]
        [--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    After creating a log scope, you can use it to view logs in 1 or more
    resources.

EXAMPLES
    To create a log scope in a project, run:

        $ gcloud logging scopes create my-scope \
            --resource-names=projects/my-project

    To create a log scope in a project with a description, run:

        $ gcloud logging scopes create my-scope \
            --resource-names=projects/my-project --description="my
        custom log scope"

    To create a log scope that contains more than 1 resource, such as projects
    and views, run:

        $ gcloud logging scopes create my-scope \
            --resource-names=projects/my-project,projects/my-project2, \
            projects/my-project/locations/global/buckets/my-bucket/views/\
        my-view1, \
            projects/my-project/locations/global/buckets/my-bucket/views/\
        my-view2,

POSITIONAL ARGUMENTS
     LOG_SCOPE_ID
        ID of the log scope to create.

REQUIRED FLAGS
     --resource-names=[RESOURCE_NAMES,...]
        Comma-separated list of resource names in this log scope. It could be
        one or more parent resources or one or more views. A log scope can
        include a maximum of 50 projects and a maximum of 100 resources in
        total. For example, projects/[PROJECT_ID],
        projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID]

OPTIONAL FLAGS
     --description=DESCRIPTION
        A textual description for the log scope.

     At most one of these can be specified:

       --folder=FOLDER_ID
          Folder of the log scope to create.

       --organization=ORGANIZATION_ID
          Organization of the log scope to create.

       --project=PROJECT_ID
          Project of the log scope to create.

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

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined and the corrections listed in Notes are applied.

```bash
gcloud logging scopes create my-scope \
    --resource-names=projects/my-project \
    --description="my custom log scope"

gcloud logging scopes create my-scope \
    --resource-names=projects/my-project,projects/my-project2,projects/my-project/locations/global/buckets/my-bucket/views/my-view1,projects/my-project/locations/global/buckets/my-bucket/views/my-view2,
```

### gcloud logging scopes delete

```text
NAME
    gcloud logging scopes delete - delete a log scope

SYNOPSIS
    gcloud logging scopes delete LOG_SCOPE_ID
        [--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID] [GCLOUD_WIDE_FLAG ...]

EXAMPLES
    To delete a log scope, run:

        $ gcloud logging scopes delete my-scope

POSITIONAL ARGUMENTS
     LOG_SCOPE_ID
        ID of the log scope to delete.

FLAGS
     At most one of these can be specified:

       --folder=FOLDER_ID
          Folder of the log scope to delete.

       --organization=ORGANIZATION_ID
          Organization of the log scope to delete.

       --project=PROJECT_ID
          Project of the log scope to delete.

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

### gcloud logging scopes describe

```text
NAME
    gcloud logging scopes describe - display information about a log scope

SYNOPSIS
    gcloud logging scopes describe LOG_SCOPE_ID
        [--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Display information about a log scope.

EXAMPLES
    To describe a log scope in a project, run:

        $ gcloud logging scopes describe my-scope --project=my-project

POSITIONAL ARGUMENTS
     LOG_SCOPE_ID
        The ID of the log scope to describe.

FLAGS
     At most one of these can be specified:

       --folder=FOLDER_ID
          Folder of the log scope to describe.

       --organization=ORGANIZATION_ID
          Organization of the log scope to describe.

       --project=PROJECT_ID
          Project of the log scope to describe.

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

### gcloud logging scopes list

```text
NAME
    gcloud logging scopes list - list the defined log scopes

SYNOPSIS
    gcloud logging scopes list
        [--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List the log scopes for a project.

EXAMPLES
    To list the log scopes in a project, run:

        $ gcloud logging scopes list --project=my-project

FLAGS
     At most one of these can be specified:

       --folder=FOLDER_ID
          Folder of the log scopes to list.

       --organization=ORGANIZATION_ID
          Organization of the log scopes to list.

       --project=PROJECT_ID
          Project of the log scopes to list.

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

### gcloud logging scopes update

```text
NAME
    gcloud logging scopes update - update a log scope

SYNOPSIS
    gcloud logging scopes update LOG_SCOPE_ID [--description=DESCRIPTION]
        [--resource-names=[RESOURCE_NAMES,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update the properties of a log scope.

EXAMPLES
    To update the description of a log scope in a project, run:

        $ gcloud logging scopes update my-scope \
           --description=my-new-description --project=my-project

    To update the resource name of a log scope in a project. Ensure that you
    provide all the resource names including the existing ones. For example, if
    the log scope has the resource name my-project, and you want to update the
    log scope to have the resource name another-project, run the following:

        $ gcloud logging scopes update my-scope \
           --resource-names=projects/my-project,projects/another-project \
           --project=my-project

POSITIONAL ARGUMENTS
     LOG_SCOPE_ID
        The ID of the log scope to update.

FLAGS
     --description=DESCRIPTION
        A new description for the log scope.

     --resource-names=[RESOURCE_NAMES,...]
        A new set of resource names for the log scope.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the multi-resource example writes `--resource-names` as a comma list with spaces after the commas and a trailing comma; the shell splits it at the spaces (gcloud 593.0.0: "unrecognized arguments"), so the runnable form writes the list without spaces or the trailing comma.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/logging/scopes (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
