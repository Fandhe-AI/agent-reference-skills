---
source: https://docs.cloud.google.com/sdk/gcloud/reference/firestore/user-creds
---

# gcloud firestore user-creds

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud firestore user-creds create

```text
NAME
    gcloud firestore user-creds create - creates a Cloud Firestore user creds

SYNOPSIS
    gcloud firestore user-creds create USER_CREDS --database=DATABASE
        [GCLOUD_WIDE_FLAG ...]

EXAMPLES
    To create a user creds called test-user-creds-id under database testdb.

        $ gcloud firestore user-creds create test-user-creds-id \
          --database=testdb

POSITIONAL ARGUMENTS
     USER_CREDS
        The user creds to operate on.

        For example, to operate on user creds creds-name-1:

            $ gcloud firestore user-creds create creds-name-1

REQUIRED FLAGS
     --database=DATABASE
        The database to operate on.

        For example, to operate on database foo:

            $ gcloud firestore user-creds create --database='foo'

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha firestore user-creds create

        $ gcloud beta firestore user-creds create
```

### gcloud firestore user-creds delete

```text
NAME
    gcloud firestore user-creds delete - deletes a Cloud Firestore user creds

SYNOPSIS
    gcloud firestore user-creds delete USER_CREDS --database=DATABASE
        [GCLOUD_WIDE_FLAG ...]

EXAMPLES
    To delete user creds 'test-user-creds-id' under database testdb.

        $ gcloud firestore user-creds delete test-user-creds-id \
          --database='testdb'

POSITIONAL ARGUMENTS
     USER_CREDS
        The user creds to operate on.

        For example, to operate on user creds creds-name-1:

            $ gcloud firestore user-creds delete creds-name-1

REQUIRED FLAGS
     --database=DATABASE
        The database to operate on.

        For example, to operate on database foo:

            $ gcloud firestore user-creds delete --database='foo'

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha firestore user-creds delete

        $ gcloud beta firestore user-creds delete
```

### gcloud firestore user-creds describe

```text
NAME
    gcloud firestore user-creds describe - describes a Cloud Firestore user
        creds

SYNOPSIS
    gcloud firestore user-creds describe USER_CREDS --database=DATABASE
        [GCLOUD_WIDE_FLAG ...]

EXAMPLES
    To describe user creds 'test-user-creds-id' under database testdb.

        $ gcloud firestore user-creds describe test-user-creds-id \
          --database='testdb'

POSITIONAL ARGUMENTS
     USER_CREDS
        The user creds to operate on.

        For example, to operate on user creds creds-name-1:

            $ gcloud firestore user-creds describe creds-name-1

REQUIRED FLAGS
     --database=DATABASE
        The database to operate on.

        For example, to operate on database foo:

            $ gcloud firestore user-creds describe --database='foo'

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha firestore user-creds describe

        $ gcloud beta firestore user-creds describe
```

### gcloud firestore user-creds disable

```text
NAME
    gcloud firestore user-creds disable - disables a Cloud Firestore user creds

SYNOPSIS
    gcloud firestore user-creds disable USER_CREDS --database=DATABASE
        [GCLOUD_WIDE_FLAG ...]

EXAMPLES
    To disable user creds 'test-user-creds-id' under database testdb.

        $ gcloud firestore user-creds disable test-user-creds-id \
          --database='testdb'

POSITIONAL ARGUMENTS
     USER_CREDS
        The user creds to operate on.

        For example, to operate on user creds creds-name-1:

            $ gcloud firestore user-creds disable creds-name-1

REQUIRED FLAGS
     --database=DATABASE
        The database to operate on.

        For example, to operate on database foo:

            $ gcloud firestore user-creds disable --database='foo'

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha firestore user-creds disable

        $ gcloud beta firestore user-creds disable
```

### gcloud firestore user-creds enable

```text
NAME
    gcloud firestore user-creds enable - enables a Cloud Firestore user creds

SYNOPSIS
    gcloud firestore user-creds enable USER_CREDS --database=DATABASE
        [GCLOUD_WIDE_FLAG ...]

EXAMPLES
    To enable user creds 'test-user-creds-id' under database testdb.

        $ gcloud firestore user-creds enable test-user-creds-id \
          --database='testdb'

POSITIONAL ARGUMENTS
     USER_CREDS
        The user creds to operate on.

        For example, to operate on user creds creds-name-1:

            $ gcloud firestore user-creds enable creds-name-1

REQUIRED FLAGS
     --database=DATABASE
        The database to operate on.

        For example, to operate on database foo:

            $ gcloud firestore user-creds enable --database='foo'

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha firestore user-creds enable

        $ gcloud beta firestore user-creds enable
```

### gcloud firestore user-creds list

```text
NAME
    gcloud firestore user-creds list - lists user creds under a Cloud Firestore
        database

SYNOPSIS
    gcloud firestore user-creds list --database=DATABASE [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

EXAMPLES
    To list all user creds under database testdb.

        $ gcloud firestore user-creds list --database='testdb'

REQUIRED FLAGS
     --database=DATABASE
        The database to operate on.

        For example, to operate on database foo:

            $ gcloud firestore user-creds list --database='foo'

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

        $ gcloud alpha firestore user-creds list

        $ gcloud beta firestore user-creds list
```

### gcloud firestore user-creds reset-password

```text
NAME
    gcloud firestore user-creds reset-password - resets a Cloud Firestore user
        creds

SYNOPSIS
    gcloud firestore user-creds reset-password USER_CREDS --database=DATABASE
        [GCLOUD_WIDE_FLAG ...]

EXAMPLES
    To reset password for user creds 'test-user-creds-id' under database
    testdb.

        $ gcloud firestore user-creds reset-password test-user-creds-id \
          --database='testdb'

POSITIONAL ARGUMENTS
     USER_CREDS
        The user creds to operate on.

        For example, to operate on user creds creds-name-1:

            $ gcloud firestore user-creds reset-password creds-name-1

REQUIRED FLAGS
     --database=DATABASE
        The database to operate on.

        For example, to operate on database foo:

            $ gcloud firestore user-creds reset-password --database='foo'

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha firestore user-creds reset-password

        $ gcloud beta firestore user-creds reset-password
```

### gcloud beta firestore user-creds create

```text
NAME
    gcloud beta firestore user-creds create - creates a Cloud Firestore user
        creds

SYNOPSIS
    gcloud beta firestore user-creds create USER_CREDS --database=DATABASE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta firestore user-creds delete

```text
NAME
    gcloud beta firestore user-creds delete - deletes a Cloud Firestore user
        creds

SYNOPSIS
    gcloud beta firestore user-creds delete USER_CREDS --database=DATABASE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta firestore user-creds describe

```text
NAME
    gcloud beta firestore user-creds describe - describes a Cloud Firestore
        user creds

SYNOPSIS
    gcloud beta firestore user-creds describe USER_CREDS --database=DATABASE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta firestore user-creds disable

```text
NAME
    gcloud beta firestore user-creds disable - disables a Cloud Firestore user
        creds

SYNOPSIS
    gcloud beta firestore user-creds disable USER_CREDS --database=DATABASE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta firestore user-creds enable

```text
NAME
    gcloud beta firestore user-creds enable - enables a Cloud Firestore user
        creds

SYNOPSIS
    gcloud beta firestore user-creds enable USER_CREDS --database=DATABASE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta firestore user-creds list

```text
NAME
    gcloud beta firestore user-creds list - lists user creds under a Cloud
        Firestore database

SYNOPSIS
    gcloud beta firestore user-creds list --database=DATABASE
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta firestore user-creds reset-password

```text
NAME
    gcloud beta firestore user-creds reset-password - resets a Cloud Firestore
        user creds

SYNOPSIS
    gcloud beta firestore user-creds reset-password USER_CREDS
        --database=DATABASE [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha firestore user-creds create

```text
NAME
    gcloud alpha firestore user-creds create - creates a Cloud Firestore user
        creds

SYNOPSIS
    gcloud alpha firestore user-creds create USER_CREDS --database=DATABASE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha firestore user-creds delete

```text
NAME
    gcloud alpha firestore user-creds delete - deletes a Cloud Firestore user
        creds

SYNOPSIS
    gcloud alpha firestore user-creds delete USER_CREDS --database=DATABASE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha firestore user-creds describe

```text
NAME
    gcloud alpha firestore user-creds describe - describes a Cloud Firestore
        user creds

SYNOPSIS
    gcloud alpha firestore user-creds describe USER_CREDS --database=DATABASE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha firestore user-creds disable

```text
NAME
    gcloud alpha firestore user-creds disable - disables a Cloud Firestore user
        creds

SYNOPSIS
    gcloud alpha firestore user-creds disable USER_CREDS --database=DATABASE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha firestore user-creds enable

```text
NAME
    gcloud alpha firestore user-creds enable - enables a Cloud Firestore user
        creds

SYNOPSIS
    gcloud alpha firestore user-creds enable USER_CREDS --database=DATABASE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha firestore user-creds list

```text
NAME
    gcloud alpha firestore user-creds list - lists user creds under a Cloud
        Firestore database

SYNOPSIS
    gcloud alpha firestore user-creds list --database=DATABASE
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha firestore user-creds reset-password

```text
NAME
    gcloud alpha firestore user-creds reset-password - resets a Cloud Firestore
        user creds

SYNOPSIS
    gcloud alpha firestore user-creds reset-password USER_CREDS
        --database=DATABASE [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/firestore/user-creds (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
