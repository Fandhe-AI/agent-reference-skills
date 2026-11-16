---
source: https://docs.cloud.google.com/sdk/gcloud/reference/sql/databases
---

# gcloud sql databases

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud sql databases create

```text
NAME
    gcloud sql databases create - creates a database for a Cloud SQL instance

SYNOPSIS
    gcloud sql databases create DATABASE --instance=INSTANCE, -i INSTANCE
        [--async] [--charset=CHARSET] [--collation=COLLATION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Creates a database for a Cloud SQL instance.

POSITIONAL ARGUMENTS
     DATABASE
        Cloud SQL database name.

REQUIRED FLAGS
     --instance=INSTANCE, -i INSTANCE
        Cloud SQL instance ID.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --charset=CHARSET
        Cloud SQL database charset setting, which specifies the set of symbols
        and encodings used to store the data in your database. Each database
        version may support a different set of charsets.

     --collation=COLLATION
        Cloud SQL database collation setting, which specifies the set of rules
        for comparing characters in a character set. Each database version may
        support a different set of collations. For PostgreSQL database
        versions, this may only be set to the collation of the template
        database.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha sql databases create

        $ gcloud beta sql databases create
```

### gcloud sql databases delete

```text
NAME
    gcloud sql databases delete - deletes a Cloud SQL database

SYNOPSIS
    gcloud sql databases delete DATABASE --instance=INSTANCE, -i INSTANCE
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    For MySQL, also deletes all files in the database directory.

POSITIONAL ARGUMENTS
     DATABASE
        Cloud SQL database name.

REQUIRED FLAGS
     --instance=INSTANCE, -i INSTANCE
        Cloud SQL instance ID.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha sql databases delete

        $ gcloud beta sql databases delete
```

### gcloud sql databases describe

```text
NAME
    gcloud sql databases describe - displays configuration and metadata about a
        Cloud SQL database

SYNOPSIS
    gcloud sql databases describe DATABASE --instance=INSTANCE, -i INSTANCE
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Information such as database name, charset, and collation will be
    displayed.

POSITIONAL ARGUMENTS
     DATABASE
        Cloud SQL database name.

REQUIRED FLAGS
     --instance=INSTANCE, -i INSTANCE
        Cloud SQL instance ID.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha sql databases describe

        $ gcloud beta sql databases describe
```

### gcloud sql databases list

```text
NAME
    gcloud sql databases list - lists databases for a Cloud SQL instance

SYNOPSIS
    gcloud sql databases list --instance=INSTANCE, -i INSTANCE
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Lists databases for a Cloud SQL instance.

REQUIRED FLAGS
     --instance=INSTANCE, -i INSTANCE
        Cloud SQL instance ID.

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

        $ gcloud alpha sql databases list

        $ gcloud beta sql databases list
```

### gcloud sql databases patch

```text
NAME
    gcloud sql databases patch - patches the settings of a Cloud SQL database

SYNOPSIS
    gcloud sql databases patch DATABASE --instance=INSTANCE, -i INSTANCE
        [--charset=CHARSET] [--collation=COLLATION] [--diff]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Patches the settings of a Cloud SQL database.

POSITIONAL ARGUMENTS
     DATABASE
        Cloud SQL database name.

REQUIRED FLAGS
     --instance=INSTANCE, -i INSTANCE
        Cloud SQL instance ID.

OPTIONAL FLAGS
     --charset=CHARSET
        Cloud SQL database charset setting, which specifies the set of symbols
        and encodings used to store the data in your database. Each database
        version may support a different set of charsets.

     --collation=COLLATION
        Cloud SQL database collation setting, which specifies the set of rules
        for comparing characters in a character set. Each database version may
        support a different set of collations. This flag can't be used with
        PostgreSQL instances.

     --diff
        Show what changed as a result of the patch.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha sql databases patch

        $ gcloud beta sql databases patch
```

### gcloud beta sql databases create

```text
NAME
    gcloud beta sql databases create - creates a database for a Cloud SQL
        instance

SYNOPSIS
    gcloud beta sql databases create DATABASE --instance=INSTANCE, -i INSTANCE
        [--async] [--charset=CHARSET] [--collation=COLLATION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta sql databases delete

```text
NAME
    gcloud beta sql databases delete - deletes a Cloud SQL database

SYNOPSIS
    gcloud beta sql databases delete DATABASE --instance=INSTANCE, -i INSTANCE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta sql databases describe

```text
NAME
    gcloud beta sql databases describe - displays configuration and metadata
        about a Cloud SQL database

SYNOPSIS
    gcloud beta sql databases describe DATABASE --instance=INSTANCE, -i
        INSTANCE [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta sql databases list

```text
NAME
    gcloud beta sql databases list - lists databases for a Cloud SQL instance

SYNOPSIS
    gcloud beta sql databases list --instance=INSTANCE, -i INSTANCE
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta sql databases patch

```text
NAME
    gcloud beta sql databases patch - patches the settings of a Cloud SQL
        database

SYNOPSIS
    gcloud beta sql databases patch DATABASE --instance=INSTANCE, -i INSTANCE
        [--charset=CHARSET] [--collation=COLLATION] [--diff]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha sql databases config export

```text
NAME
    gcloud alpha sql databases config export - export the configuration for a
        Sqladmin database

SYNOPSIS
    gcloud alpha sql databases config export
        ([DATABASE : --instance=INSTANCE] --all) [--path=PATH; default="-"]
        [--resource-format=RESOURCE_FORMAT] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha sql databases create

```text
NAME
    gcloud alpha sql databases create - creates a database for a Cloud SQL
        instance

SYNOPSIS
    gcloud alpha sql databases create DATABASE --instance=INSTANCE, -i INSTANCE
        [--async] [--charset=CHARSET] [--collation=COLLATION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha sql databases delete

```text
NAME
    gcloud alpha sql databases delete - deletes a Cloud SQL database

SYNOPSIS
    gcloud alpha sql databases delete DATABASE --instance=INSTANCE, -i INSTANCE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha sql databases describe

```text
NAME
    gcloud alpha sql databases describe - displays configuration and metadata
        about a Cloud SQL database

SYNOPSIS
    gcloud alpha sql databases describe DATABASE --instance=INSTANCE, -i
        INSTANCE [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha sql databases list

```text
NAME
    gcloud alpha sql databases list - lists databases for a Cloud SQL instance

SYNOPSIS
    gcloud alpha sql databases list --instance=INSTANCE, -i INSTANCE
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha sql databases patch

```text
NAME
    gcloud alpha sql databases patch - patches the settings of a Cloud SQL
        database

SYNOPSIS
    gcloud alpha sql databases patch DATABASE --instance=INSTANCE, -i INSTANCE
        [--charset=CHARSET] [--collation=COLLATION] [--diff]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/sql/databases (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
