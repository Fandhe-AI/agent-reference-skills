---
source: https://docs.cloud.google.com/sdk/gcloud/reference/bigtable/materialized-views
---

# gcloud bigtable materialized-views

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud bigtable materialized-views create

```text
NAME
    gcloud bigtable materialized-views create - create a new Bigtable
        materialized view

SYNOPSIS
    gcloud bigtable materialized-views create
        (MATERIALIZED_VIEW : --instance=INSTANCE) --query=QUERY [--async]
        [--deletion-protection=DELETION_PROTECTION] [--ignore-warnings]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a new Bigtable materialized view.

EXAMPLES
    To create a materialized view, run:        $ gcloud bigtable materialized-views create \
            my-materialized-view-id --instance=my-instance-id \
            --query="SELECT my-column-family FROM my-table" \
            --deletion-protection=false

POSITIONAL ARGUMENTS
     Materialized view resource - The materialized view to create. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument materialized_view on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       MATERIALIZED_VIEW
          ID of the materialized view or fully qualified identifier for the
          materialized view.

          To set the name attribute:
          + provide the argument materialized_view on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --instance=INSTANCE
          Bigtable instance for the materialized view.

          To set the instance attribute:
          + provide the argument materialized_view on the command line with a
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

     --ignore-warnings
        Ignore warnings when creating the materialized view.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha bigtable materialized-views create

        $ gcloud beta bigtable materialized-views create
```

### gcloud bigtable materialized-views delete

```text
NAME
    gcloud bigtable materialized-views delete - delete a Bigtable materialized
        view

SYNOPSIS
    gcloud bigtable materialized-views delete
        (MATERIALIZED_VIEW : --instance=INSTANCE) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a Bigtable materialized view.

EXAMPLES
    To delete a materialized view, run:

        $ gcloud bigtable materialized-views delete \
            my-materialized-view-id --instance=my-instance-id

POSITIONAL ARGUMENTS
     Materialized view resource - The materialized view to delete. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument materialized_view on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       MATERIALIZED_VIEW
          ID of the materialized view or fully qualified identifier for the
          materialized view.

          To set the name attribute:
          + provide the argument materialized_view on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --instance=INSTANCE
          Bigtable instance for the materialized view.

          To set the instance attribute:
          + provide the argument materialized_view on the command line with a
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

        $ gcloud alpha bigtable materialized-views delete

        $ gcloud beta bigtable materialized-views delete
```

### gcloud bigtable materialized-views describe

```text
NAME
    gcloud bigtable materialized-views describe - describe an existing Bigtable
        materialized view

SYNOPSIS
    gcloud bigtable materialized-views describe
        (MATERIALIZED_VIEW : --instance=INSTANCE)
        [--view=VIEW; default="schema"] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe an existing Bigtable materialized view.

EXAMPLES
    To get back information related to a view's schema (for example,
    description), run:

        $ gcloud bigtable materialized-views describe \
            my-materialized-view-id --instance=my-instance-id --view=schema

    or (because schema is the default view) simply:

        $ gcloud bigtable materialized-views describe \
            my-materialized-view-id --instance=my-instance-id

    To get back information related to the view's replication state, run:

        $ gcloud bigtable materialized-views describe \
            my-materialized-view-id --instance=my-instance-id \
            --view=replication

    To get back all information for the view, run:

        $ gcloud bigtable materialized-views describe \
            my-materialized-view-id --instance=my-instance-id --view=full

POSITIONAL ARGUMENTS
     Materialized view resource - The materialized view to describe. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument materialized_view on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       MATERIALIZED_VIEW
          ID of the materialized view or fully qualified identifier for the
          materialized view.

          To set the name attribute:
          + provide the argument materialized_view on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --instance=INSTANCE
          Bigtable instance for the materialized view.

          To set the instance attribute:
          + provide the argument materialized_view on the command line with a
            fully specified name;
          + provide the argument --instance on the command line.

FLAGS
     --view=VIEW; default="schema"
        Specifies what type of information to return about the view. VIEW must
        be one of: full, replication, schema.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha bigtable materialized-views describe

        $ gcloud beta bigtable materialized-views describe
```

### gcloud bigtable materialized-views list

```text
NAME
    gcloud bigtable materialized-views list - list existing Bigtable
        materialized views

SYNOPSIS
    gcloud bigtable materialized-views list --instance=INSTANCE
        [--view=VIEW; default="schema"] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List existing Bigtable materialized views.

EXAMPLES
    To list all materialized views for an instance, run:

        $ gcloud bigtable materialized-views list --instance=my-instance-id

    You may also specify what information to return by supplying the --view
    flag, such as:

        $ gcloud bigtable materialized-views list \
            --instance=my-instance-id --view=schema

    Currently, only the schema view is supported for this command. This is the
    default view, and it returns information about the schemas of your
    materialized views.

REQUIRED FLAGS
     Instance resource - The instance to list materialized views for. This
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

FLAGS
     --view=VIEW; default="schema"
        Specifies what type of information to return about the view. VIEW must
        be one of: full, replication, schema.

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

        $ gcloud alpha bigtable materialized-views list

        $ gcloud beta bigtable materialized-views list
```

### gcloud bigtable materialized-views update

```text
NAME
    gcloud bigtable materialized-views update - update a Bigtable materialized
        view

SYNOPSIS
    gcloud bigtable materialized-views update
        (MATERIALIZED_VIEW : --instance=INSTANCE)
        --deletion-protection=DELETION_PROTECTION [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a Bigtable materialized view.

EXAMPLES
    To update a materialized view, run:

        $ gcloud bigtable materialized-views update \
            my-materialized-view-id --instance=my-instance-id \
            --deletion-protection=true

POSITIONAL ARGUMENTS
     Materialized view resource - The materialized view to update. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument materialized_view on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       MATERIALIZED_VIEW
          ID of the materialized view or fully qualified identifier for the
          materialized view.

          To set the name attribute:
          + provide the argument materialized_view on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --instance=INSTANCE
          Bigtable instance for the materialized view.

          To set the instance attribute:
          + provide the argument materialized_view on the command line with a
            fully specified name;
          + provide the argument --instance on the command line.

REQUIRED FLAGS
     --deletion-protection=DELETION_PROTECTION
        Whether the view is protected from deletion.

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

        $ gcloud alpha bigtable materialized-views update

        $ gcloud beta bigtable materialized-views update
```

### gcloud beta bigtable materialized-views create

```text
NAME
    gcloud beta bigtable materialized-views create - create a new Bigtable
        materialized view

SYNOPSIS
    gcloud beta bigtable materialized-views create
        (MATERIALIZED_VIEW : --instance=INSTANCE) --query=QUERY [--async]
        [--deletion-protection=DELETION_PROTECTION] [--ignore-warnings]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta bigtable materialized-views delete

```text
NAME
    gcloud beta bigtable materialized-views delete - delete a Bigtable
        materialized view

SYNOPSIS
    gcloud beta bigtable materialized-views delete
        (MATERIALIZED_VIEW : --instance=INSTANCE) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta bigtable materialized-views describe

```text
NAME
    gcloud beta bigtable materialized-views describe - describe an existing
        Bigtable materialized view

SYNOPSIS
    gcloud beta bigtable materialized-views describe
        (MATERIALIZED_VIEW : --instance=INSTANCE)
        [--view=VIEW; default="schema"] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta bigtable materialized-views list

```text
NAME
    gcloud beta bigtable materialized-views list - list existing Bigtable
        materialized views

SYNOPSIS
    gcloud beta bigtable materialized-views list --instance=INSTANCE
        [--view=VIEW; default="schema"] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta bigtable materialized-views update

```text
NAME
    gcloud beta bigtable materialized-views update - update a Bigtable
        materialized view

SYNOPSIS
    gcloud beta bigtable materialized-views update
        (MATERIALIZED_VIEW : --instance=INSTANCE)
        --deletion-protection=DELETION_PROTECTION [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bigtable materialized-views create

```text
NAME
    gcloud alpha bigtable materialized-views create - create a new Bigtable
        materialized view

SYNOPSIS
    gcloud alpha bigtable materialized-views create
        (MATERIALIZED_VIEW : --instance=INSTANCE) --query=QUERY [--async]
        [--deletion-protection=DELETION_PROTECTION] [--ignore-warnings]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bigtable materialized-views delete

```text
NAME
    gcloud alpha bigtable materialized-views delete - delete a Bigtable
        materialized view

SYNOPSIS
    gcloud alpha bigtable materialized-views delete
        (MATERIALIZED_VIEW : --instance=INSTANCE) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bigtable materialized-views describe

```text
NAME
    gcloud alpha bigtable materialized-views describe - describe an existing
        Bigtable materialized view

SYNOPSIS
    gcloud alpha bigtable materialized-views describe
        (MATERIALIZED_VIEW : --instance=INSTANCE)
        [--view=VIEW; default="schema"] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bigtable materialized-views list

```text
NAME
    gcloud alpha bigtable materialized-views list - list existing Bigtable
        materialized views

SYNOPSIS
    gcloud alpha bigtable materialized-views list --instance=INSTANCE
        [--view=VIEW; default="schema"] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bigtable materialized-views update

```text
NAME
    gcloud alpha bigtable materialized-views update - update a Bigtable
        materialized view

SYNOPSIS
    gcloud alpha bigtable materialized-views update
        (MATERIALIZED_VIEW : --instance=INSTANCE)
        --deletion-protection=DELETION_PROTECTION [--async]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/bigtable/materialized-views (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
