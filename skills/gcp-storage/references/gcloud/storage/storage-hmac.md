---
source: https://docs.cloud.google.com/sdk/gcloud/reference/storage/hmac
---

# gcloud storage hmac

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud storage hmac create

```text
NAME
    gcloud storage hmac create - add a service account HMAC

SYNOPSIS
    gcloud storage hmac create SERVICE_ACCOUNT [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud storage hmac create command creates an HMAC key for the specified
    service account. The secret key material is only available upon creation,
    so be sure to store the returned secret along with the access_id.

EXAMPLES
    To create an HMAC key for
    test.service.account@test_project.iam.gserviceaccount.com:

        $ gcloud storage hmac create \
            test.service.account@test_project.iam.gserviceaccount.com

POSITIONAL ARGUMENTS
     SERVICE_ACCOUNT
        The service account email.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha storage hmac create
```

### gcloud storage hmac delete

```text
NAME
    gcloud storage hmac delete - remove a service account HMAC

SYNOPSIS
    gcloud storage hmac delete ACCESS_ID [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud storage hmac delete permanently deletes the specified HMAC key. Note
    that keys must be updated to be in the INACTIVE state before they can be
    deleted.

EXAMPLES
    To delete a specific HMAC key:

        $ gcloud storage hmac delete GOOG56JBMFZX6PMPTQ62VD2

    To be prompted for HMAC keys to delete:

        $ gcloud storage hmac delete

POSITIONAL ARGUMENTS
     ACCESS_ID
        Access ID for HMAC key to delete.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha storage hmac delete
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud storage hmac delete ACCESS_ID
```

### gcloud storage hmac describe

```text
NAME
    gcloud storage hmac describe - describes a service account HMAC key

SYNOPSIS
    gcloud storage hmac describe ACCESS_ID [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud storage hmac describe retrieves the specified HMAC key's metadata.
    Note that there is no option to retrieve a key's secret material after it
    has been created.

EXAMPLES
    The following command retrieves the HMAC key's metadata:

        $ gcloud storage hmac describe GOOG56JBMFZX6PMPTQ62VD2

    Note GOOG56JBMFZX6PMPTQ62VD2 is the ACCESS_ID of the HMAC key.

POSITIONAL ARGUMENTS
     ACCESS_ID
        The Access ID
        (https://cloud.google.com/storage/docs/authentication/hmackeys#overview)
        of the HMAC key

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha storage hmac describe
```

### gcloud storage hmac list

```text
NAME
    gcloud storage hmac list - list service account HMAC keys

SYNOPSIS
    gcloud storage hmac list [--all, -a] [--long, -l]
        [--service-account=SERVICE_ACCOUNT, -u SERVICE_ACCOUNT]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud storage hmac list lists the HMAC key metadata for keys in the
    current project.

EXAMPLES
    To show metadata for all keys, including recently deleted keys:

        $ gcloud storage hmac list --all --long

    To list only HMAC keys belonging to the service account
    test.sa@test.iam.gserviceaccount.com:

        $ gcloud storage hmac list \
            --service-account=test.sa@test.iam.gserviceaccount.com

FLAGS
     --all, -a
        Shows all keys, including recently deleted keys.

     --long, -l
        Use long listing format, showing the full metadata for each key
        excluding the secret.

     --service-account=SERVICE_ACCOUNT, -u SERVICE_ACCOUNT
        Filter keys for the provided service account email.

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
    This variant is also available:

        $ gcloud alpha storage hmac list
```

### gcloud storage hmac update

```text
NAME
    gcloud storage hmac update - change the status of a service account HMAC

SYNOPSIS
    gcloud storage hmac update ACCESS_ID (--activate | --deactivate)
        [--etag=ETAG, -e ETAG] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud storage hmac update sets the state of the specified key. Valid state
    arguments are ACTIVE and INACTIVE. To set a key to state DELETED, use
    gcloud storage hmac delete on an INACTIVE key. If an etag is set in the
    command, it will only succeed if the provided etag matches the etag of the
    stored key.

EXAMPLES
    To activate an HMAC key:

        $ gcloud storage hmac update GOOG56JBMFZX6PMPTQ62VD2 --activate

    To set the state of an HMAC key to INACTIVE provided its etag is M42da=:

        $ gcloud storage hmac update GOOG56JBMFZX6PMPTQ62VD2 --deactivate \
            --etag=M42da=

POSITIONAL ARGUMENTS
     ACCESS_ID
        Access ID for HMAC key to update.

REQUIRED FLAGS
     Exactly one of these must be specified:

       --activate
          Sets the state of the specified key to ACTIVE.

       --deactivate
          Sets the state of the specified key to INACTIVE.

OPTIONAL FLAGS
     --etag=ETAG, -e ETAG
        If provided, the update will only be performed if the specified etag
        matches the etag of the stored key.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha storage hmac update
```

### gcloud alpha storage hmac create

```text
NAME
    gcloud alpha storage hmac create - add a service account HMAC

SYNOPSIS
    gcloud alpha storage hmac create SERVICE_ACCOUNT [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha storage hmac delete

```text
NAME
    gcloud alpha storage hmac delete - remove a service account HMAC

SYNOPSIS
    gcloud alpha storage hmac delete ACCESS_ID [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha storage hmac describe

```text
NAME
    gcloud alpha storage hmac describe - describes a service account HMAC key

SYNOPSIS
    gcloud alpha storage hmac describe ACCESS_ID [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha storage hmac list

```text
NAME
    gcloud alpha storage hmac list - list service account HMAC keys

SYNOPSIS
    gcloud alpha storage hmac list [--all, -a] [--long, -l]
        [--service-account=SERVICE_ACCOUNT, -u SERVICE_ACCOUNT]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha storage hmac update

```text
NAME
    gcloud alpha storage hmac update - change the status of a service account
        HMAC

SYNOPSIS
    gcloud alpha storage hmac update ACCESS_ID (--activate | --deactivate)
        [--etag=ETAG, -e ETAG] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the second `delete` example omits the access ID and says gcloud prompts for the keys to delete, but `ACCESS_ID` is a required positional argument (SYNOPSIS) and gcloud 593.0.0 has no prompt for it ("argument ACCESS_ID: Must be specified"); the runnable form passes `ACCESS_ID`.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/storage/hmac (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
