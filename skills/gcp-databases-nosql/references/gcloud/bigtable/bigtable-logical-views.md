---
source: https://docs.cloud.google.com/sdk/gcloud/reference/bigtable/logical-views
---

# gcloud bigtable logical-views

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud bigtable logical-views create

```text
NAME
    gcloud bigtable logical-views create - create a new Bigtable logical view

SYNOPSIS
    gcloud bigtable logical-views create (LOGICAL_VIEW : --instance=INSTANCE)
        --query=QUERY [--async] [--deletion-protection=DELETION_PROTECTION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a new Bigtable logical view.

EXAMPLES
    To create a logical view, run:

        $ gcloud bigtable logical-views create my-logical-view-id \
            --instance=my-instance-id \
            --query="SELECT my-column-family FROM my-table"

POSITIONAL ARGUMENTS
     Logical view resource - The logical view to create. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument logical_view on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       LOGICAL_VIEW
          ID of the logical view or fully qualified identifier for the logical
          view.

          To set the name attribute:
          + provide the argument logical_view on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --instance=INSTANCE
          Bigtable instance for the logical view.

          To set the instance attribute:
          + provide the argument logical_view on the command line with a
            fully specified name;
          + provide the argument --instance on the command line.

REQUIRED FLAGS
     --query=QUERY
        The query of the view.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --deletion-protection=DELETION_PROTECTION
        Whether the view is protected from deletion.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha bigtable logical-views create

        $ gcloud beta bigtable logical-views create
```

### gcloud bigtable logical-views delete

```text
NAME
    gcloud bigtable logical-views delete - delete a Bigtable logical view

SYNOPSIS
    gcloud bigtable logical-views delete (LOGICAL_VIEW : --instance=INSTANCE)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a Bigtable logical view.

EXAMPLES
    To delete a logical view, run:

        $ gcloud bigtable logical-views delete my-logical-view-id \
            --instance=my-instance-id

POSITIONAL ARGUMENTS
     Logical view resource - The logical view to delete. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument logical_view on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       LOGICAL_VIEW
          ID of the logical view or fully qualified identifier for the logical
          view.

          To set the name attribute:
          + provide the argument logical_view on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --instance=INSTANCE
          Bigtable instance for the logical view.

          To set the instance attribute:
          + provide the argument logical_view on the command line with a
            fully specified name;
          + provide the argument --instance on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha bigtable logical-views delete

        $ gcloud beta bigtable logical-views delete
```

### gcloud bigtable logical-views describe

```text
NAME
    gcloud bigtable logical-views describe - describe an existing Bigtable
        logical view

SYNOPSIS
    gcloud bigtable logical-views describe (LOGICAL_VIEW : --instance=INSTANCE)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe an existing Bigtable logical view.

EXAMPLES
    To view a logical view's description, run:

        $ gcloud bigtable logical-views describe my-logical-view-id \
            --instance=my-instance-id

POSITIONAL ARGUMENTS
     Logical view resource - The logical view to describe. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument logical_view on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       LOGICAL_VIEW
          ID of the logical view or fully qualified identifier for the logical
          view.

          To set the name attribute:
          + provide the argument logical_view on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --instance=INSTANCE
          Bigtable instance for the logical view.

          To set the instance attribute:
          + provide the argument logical_view on the command line with a
            fully specified name;
          + provide the argument --instance on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha bigtable logical-views describe

        $ gcloud beta bigtable logical-views describe
```

### gcloud bigtable logical-views list

```text
NAME
    gcloud bigtable logical-views list - list existing Bigtable logical views

SYNOPSIS
    gcloud bigtable logical-views list --instance=INSTANCE
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List existing Bigtable logical views.

EXAMPLES
    To list all logical views for an instance, run:

        $ gcloud bigtable logical-views list --instance=my-instance-id

REQUIRED FLAGS
     Instance resource - The instance to list logical views for. This
     represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --instance on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --instance=INSTANCE
          ID of the instance or fully qualified identifier for the instance.

          To set the instance attribute:
          + provide the argument --instance on the command line.

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

        $ gcloud alpha bigtable logical-views list

        $ gcloud beta bigtable logical-views list
```

### gcloud bigtable logical-views update

```text
NAME
    gcloud bigtable logical-views update - update a Bigtable logical view

SYNOPSIS
    gcloud bigtable logical-views update (LOGICAL_VIEW : --instance=INSTANCE)
        (--deletion-protection=DELETION_PROTECTION --query=QUERY) [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a Bigtable logical view.

EXAMPLES
    To update a logical view to a new query, run:

        $ gcloud bigtable logical-views update my-logical-view-id \
            --instance=my-instance-id \
            --query="SELECT my-column-family2 FROM my-table"

    To enable deletion protection on a logical view, run:

        $ gcloud bigtable logical-views update my-logical-view-id \
            --instance=my-instance-id --deletion-protection

POSITIONAL ARGUMENTS
     Logical view resource - The logical view to update. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument logical_view on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       LOGICAL_VIEW
          ID of the logical view or fully qualified identifier for the logical
          view.

          To set the name attribute:
          + provide the argument logical_view on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --instance=INSTANCE
          Bigtable instance for the logical view.

          To set the instance attribute:
          + provide the argument logical_view on the command line with a
            fully specified name;
          + provide the argument --instance on the command line.

REQUIRED FLAGS
     At least one of these must be specified:

       --deletion-protection=DELETION_PROTECTION
          Whether the view is protected from deletion.

       --query=QUERY
          The query of the view.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha bigtable logical-views update

        $ gcloud beta bigtable logical-views update
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud bigtable logical-views update my-logical-view-id \
    --instance=my-instance-id \
    --deletion-protection=true
```

### gcloud beta bigtable logical-views create

```text
NAME
    gcloud beta bigtable logical-views create - create a new Bigtable logical
        view

SYNOPSIS
    gcloud beta bigtable logical-views create
        (LOGICAL_VIEW : --instance=INSTANCE) --query=QUERY [--async]
        [--deletion-protection=DELETION_PROTECTION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta bigtable logical-views delete

```text
NAME
    gcloud beta bigtable logical-views delete - delete a Bigtable logical view

SYNOPSIS
    gcloud beta bigtable logical-views delete
        (LOGICAL_VIEW : --instance=INSTANCE) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta bigtable logical-views describe

```text
NAME
    gcloud beta bigtable logical-views describe - describe an existing Bigtable
        logical view

SYNOPSIS
    gcloud beta bigtable logical-views describe
        (LOGICAL_VIEW : --instance=INSTANCE) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta bigtable logical-views list

```text
NAME
    gcloud beta bigtable logical-views list - list existing Bigtable logical
        views

SYNOPSIS
    gcloud beta bigtable logical-views list --instance=INSTANCE
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta bigtable logical-views update

```text
NAME
    gcloud beta bigtable logical-views update - update a Bigtable logical view

SYNOPSIS
    gcloud beta bigtable logical-views update
        (LOGICAL_VIEW : --instance=INSTANCE)
        (--deletion-protection=DELETION_PROTECTION --query=QUERY) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bigtable logical-views create

```text
NAME
    gcloud alpha bigtable logical-views create - create a new Bigtable logical
        view

SYNOPSIS
    gcloud alpha bigtable logical-views create
        (LOGICAL_VIEW : --instance=INSTANCE) --query=QUERY [--async]
        [--deletion-protection=DELETION_PROTECTION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bigtable logical-views delete

```text
NAME
    gcloud alpha bigtable logical-views delete - delete a Bigtable logical view

SYNOPSIS
    gcloud alpha bigtable logical-views delete
        (LOGICAL_VIEW : --instance=INSTANCE) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bigtable logical-views describe

```text
NAME
    gcloud alpha bigtable logical-views describe - describe an existing
        Bigtable logical view

SYNOPSIS
    gcloud alpha bigtable logical-views describe
        (LOGICAL_VIEW : --instance=INSTANCE) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bigtable logical-views list

```text
NAME
    gcloud alpha bigtable logical-views list - list existing Bigtable logical
        views

SYNOPSIS
    gcloud alpha bigtable logical-views list --instance=INSTANCE
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bigtable logical-views update

```text
NAME
    gcloud alpha bigtable logical-views update - update a Bigtable logical view

SYNOPSIS
    gcloud alpha bigtable logical-views update
        (LOGICAL_VIEW : --instance=INSTANCE)
        (--deletion-protection=DELETION_PROTECTION --query=QUERY) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the deletion-protection example passes `--deletion-protection` without a value, but the flag takes one (`--deletion-protection=DELETION_PROTECTION`; gcloud 593.0.0: "argument --deletion-protection: expected one argument", and the accepted values are `true`, `yes`, `false` and `no`); the runnable form uses `--deletion-protection=true`.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/bigtable/logical-views (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
