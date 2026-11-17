---
source: https://docs.cloud.google.com/sdk/gcloud/reference/dns/record-sets/transaction
---

# gcloud dns record-sets transaction

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud dns record-sets transaction abort

```text
NAME
    gcloud dns record-sets transaction abort - abort transaction

SYNOPSIS
    gcloud dns record-sets transaction abort --zone=ZONE, -z ZONE
        [--transaction-file=TRANSACTION_FILE; default="transaction.yaml"]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command aborts the transaction and deletes the transaction file.

EXAMPLES
    To abort the transaction, run:

        $ gcloud dns record-sets transaction abort --zone=MANAGED_ZONE

REQUIRED FLAGS
     --zone=ZONE, -z ZONE
        Name of the managed zone whose record sets you want to manage.

OPTIONAL FLAGS
     --transaction-file=TRANSACTION_FILE; default="transaction.yaml"
        Path of the file which contains the transaction.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha dns record-sets transaction abort

        $ gcloud beta dns record-sets transaction abort
```

### gcloud dns record-sets transaction add

```text
NAME
    gcloud dns record-sets transaction add - append a record-set addition to
        the transaction

SYNOPSIS
    gcloud dns record-sets transaction add RRDATAS [RRDATAS ...] --name=NAME
        --ttl=TTL --type=TYPE --zone=ZONE, -z ZONE
        [--transaction-file=TRANSACTION_FILE; default="transaction.yaml"]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command appends a record-set addition to the transaction.

    For a guide detailing how to manage records, see:
    https://cloud.google.com/dns/records/

EXAMPLES
    To add an A record with an IP address of "1.2.3.4", domain name of
    "my.domain.", and a managed zone "MANAGED_ZONE", run:

        $ gcloud dns record-sets transaction add "1.2.3.4" \
            --name=my.domain. --ttl=1234 --type=A --zone=MANAGED_ZONE

    To add a TXT record with multiple data values while specifying time to live
    as 14400 seconds, run:

        $ gcloud dns record-sets transaction add "Hello world" "Bye world" \
            --name=my.domain. --ttl=14400 --type=TXT --zone=MANAGED_ZONE

POSITIONAL ARGUMENTS
     RRDATAS [RRDATAS ...]
        DNS data (Address/CNAME/MX info, etc.) of the record-set to add. This
        is RDATA; the format of this information varies depending on the type
        and class of the resource record.

REQUIRED FLAGS
     --name=NAME
        DNS or domain name of the record-set to add.

     --ttl=TTL
        TTL (time to live) for the record-set to add.

     --type=TYPE
        DNS record type of the record-set to add.

     --zone=ZONE, -z ZONE
        Name of the managed zone whose record sets you want to manage.

OPTIONAL FLAGS
     --transaction-file=TRANSACTION_FILE; default="transaction.yaml"
        Path of the file which contains the transaction.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha dns record-sets transaction add

        $ gcloud beta dns record-sets transaction add
```

### gcloud dns record-sets transaction describe

```text
NAME
    gcloud dns record-sets transaction describe - describe the transaction

SYNOPSIS
    gcloud dns record-sets transaction describe --zone=ZONE, -z ZONE
        [--transaction-file=TRANSACTION_FILE; default="transaction.yaml"]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command displays the contents of the transaction.

EXAMPLES
    To look at the contents of the transaction, run:

        $ gcloud dns record-sets transaction describe --zone=MANAGED_ZONE

REQUIRED FLAGS
     --zone=ZONE, -z ZONE
        Name of the managed zone whose record sets you want to manage.

OPTIONAL FLAGS
     --transaction-file=TRANSACTION_FILE; default="transaction.yaml"
        Path of the file which contains the transaction.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha dns record-sets transaction describe

        $ gcloud beta dns record-sets transaction describe
```

### gcloud dns record-sets transaction execute

```text
NAME
    gcloud dns record-sets transaction execute - execute the transaction on
        Cloud DNS

SYNOPSIS
    gcloud dns record-sets transaction execute --zone=ZONE, -z ZONE
        [--transaction-file=TRANSACTION_FILE; default="transaction.yaml"]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command executes the transaction on Cloud DNS. This will result in
    record-sets being changed as specified in the transaction.

EXAMPLES
    To execute the transaction, run:

        $ gcloud dns record-sets transaction execute --zone=MANAGED_ZONE

REQUIRED FLAGS
     --zone=ZONE, -z ZONE
        Name of the managed zone whose record sets you want to manage.

FLAGS
     --transaction-file=TRANSACTION_FILE; default="transaction.yaml"
        Path of the file which contains the transaction.

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

        $ gcloud alpha dns record-sets transaction execute

        $ gcloud beta dns record-sets transaction execute
```

### gcloud dns record-sets transaction remove

```text
NAME
    gcloud dns record-sets transaction remove - append a record-set deletion to
        the transaction

SYNOPSIS
    gcloud dns record-sets transaction remove RRDATAS [RRDATAS ...] --name=NAME
        --ttl=TTL --type=TYPE --zone=ZONE, -z ZONE
        [--transaction-file=TRANSACTION_FILE; default="transaction.yaml"]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command appends a record-set deletion to the transaction.

EXAMPLES
    To remove an A record, run:

        $ gcloud dns record-sets transaction remove --zone=MANAGED_ZONE \
            --name=my.domain. --ttl=1234 --type=A "1.2.3.4"

    To remove a TXT record with multiple data values, run:

        $ gcloud dns record-sets transaction remove --zone=MANAGED_ZONE \
            --name=my.domain. --ttl=2345 --type=TXT "Hello world" \
            "Bye world"

POSITIONAL ARGUMENTS
     RRDATAS [RRDATAS ...]
        DNS name of the record-set to be removed.

REQUIRED FLAGS
     --name=NAME
        DNS name of the record-set to be removed.

     --ttl=TTL
        TTL for the record-set to be removed.

     --type=TYPE
        Type of the record-set to be removed.

     --zone=ZONE, -z ZONE
        Name of the managed zone whose record sets you want to manage.

OPTIONAL FLAGS
     --transaction-file=TRANSACTION_FILE; default="transaction.yaml"
        Path of the file which contains the transaction.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha dns record-sets transaction remove

        $ gcloud beta dns record-sets transaction remove
```

### gcloud dns record-sets transaction start

```text
NAME
    gcloud dns record-sets transaction start - start a transaction

SYNOPSIS
    gcloud dns record-sets transaction start --zone=ZONE, -z ZONE
        [--skip-soa-update]
        [--transaction-file=TRANSACTION_FILE; default="transaction.yaml"]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command starts a transaction.

EXAMPLES
    To start a transaction, run:

        $ gcloud dns record-sets transaction start --zone=MANAGED_ZONE

REQUIRED FLAGS
     --zone=ZONE, -z ZONE
        Name of the managed zone whose record sets you want to manage.

OPTIONAL FLAGS
     --skip-soa-update
        Skip incrementing the serial number of the SOA record when making
        changes to the record-sets.

     --transaction-file=TRANSACTION_FILE; default="transaction.yaml"
        Path of the file which contains the transaction.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha dns record-sets transaction start

        $ gcloud beta dns record-sets transaction start
```

### gcloud beta dns record-sets transaction abort

```text
NAME
    gcloud beta dns record-sets transaction abort - abort transaction

SYNOPSIS
    gcloud beta dns record-sets transaction abort --zone=ZONE, -z ZONE
        [--transaction-file=TRANSACTION_FILE; default="transaction.yaml"]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta dns record-sets transaction add

```text
NAME
    gcloud beta dns record-sets transaction add - append a record-set addition
        to the transaction

SYNOPSIS
    gcloud beta dns record-sets transaction add RRDATAS [RRDATAS ...]
        --name=NAME --ttl=TTL --type=TYPE --zone=ZONE, -z ZONE
        [--transaction-file=TRANSACTION_FILE; default="transaction.yaml"]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta dns record-sets transaction describe

```text
NAME
    gcloud beta dns record-sets transaction describe - describe the transaction

SYNOPSIS
    gcloud beta dns record-sets transaction describe --zone=ZONE, -z ZONE
        [--transaction-file=TRANSACTION_FILE; default="transaction.yaml"]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta dns record-sets transaction execute

```text
NAME
    gcloud beta dns record-sets transaction execute - execute the transaction
        on Cloud DNS

SYNOPSIS
    gcloud beta dns record-sets transaction execute --zone=ZONE, -z ZONE
        [--transaction-file=TRANSACTION_FILE; default="transaction.yaml"]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta dns record-sets transaction remove

```text
NAME
    gcloud beta dns record-sets transaction remove - append a record-set
        deletion to the transaction

SYNOPSIS
    gcloud beta dns record-sets transaction remove RRDATAS [RRDATAS ...]
        --name=NAME --ttl=TTL --type=TYPE --zone=ZONE, -z ZONE
        [--transaction-file=TRANSACTION_FILE; default="transaction.yaml"]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta dns record-sets transaction start

```text
NAME
    gcloud beta dns record-sets transaction start - start a transaction

SYNOPSIS
    gcloud beta dns record-sets transaction start --zone=ZONE, -z ZONE
        [--skip-soa-update]
        [--transaction-file=TRANSACTION_FILE; default="transaction.yaml"]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dns record-sets transaction abort

```text
NAME
    gcloud alpha dns record-sets transaction abort - abort transaction

SYNOPSIS
    gcloud alpha dns record-sets transaction abort --zone=ZONE, -z ZONE
        [--transaction-file=TRANSACTION_FILE; default="transaction.yaml"]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dns record-sets transaction add

```text
NAME
    gcloud alpha dns record-sets transaction add - append a record-set addition
        to the transaction

SYNOPSIS
    gcloud alpha dns record-sets transaction add RRDATAS [RRDATAS ...]
        --name=NAME --ttl=TTL --type=TYPE --zone=ZONE, -z ZONE
        [--transaction-file=TRANSACTION_FILE; default="transaction.yaml"]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dns record-sets transaction describe

```text
NAME
    gcloud alpha dns record-sets transaction describe - describe the
        transaction

SYNOPSIS
    gcloud alpha dns record-sets transaction describe --zone=ZONE, -z ZONE
        [--transaction-file=TRANSACTION_FILE; default="transaction.yaml"]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dns record-sets transaction execute

```text
NAME
    gcloud alpha dns record-sets transaction execute - execute the transaction
        on Cloud DNS

SYNOPSIS
    gcloud alpha dns record-sets transaction execute --zone=ZONE, -z ZONE
        [--transaction-file=TRANSACTION_FILE; default="transaction.yaml"]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dns record-sets transaction remove

```text
NAME
    gcloud alpha dns record-sets transaction remove - append a record-set
        deletion to the transaction

SYNOPSIS
    gcloud alpha dns record-sets transaction remove RRDATAS [RRDATAS ...]
        --name=NAME --ttl=TTL --type=TYPE --zone=ZONE, -z ZONE
        [--transaction-file=TRANSACTION_FILE; default="transaction.yaml"]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dns record-sets transaction start

```text
NAME
    gcloud alpha dns record-sets transaction start - start a transaction

SYNOPSIS
    gcloud alpha dns record-sets transaction start --zone=ZONE, -z ZONE
        [--skip-soa-update]
        [--transaction-file=TRANSACTION_FILE; default="transaction.yaml"]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/dns/record-sets/transaction (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
