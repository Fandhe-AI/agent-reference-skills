---
source: https://docs.cloud.google.com/sdk/gcloud/reference/dns/dns-keys
---

# gcloud dns dns-keys

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud dns dns-keys describe

```text
NAME
    gcloud dns dns-keys describe - show details about a DNS key resource

SYNOPSIS
    gcloud dns dns-keys describe KEY-ID --zone=ZONE [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command displays the details of a single DNS key resource.

EXAMPLES
    To show details about a DNS key resource with ID 3 in a managed zone
    my_zone, run:

        $ gcloud dns dns-keys describe --zone=my_zone 3

    To get the DS record corresponding for the DNSKEY record from the previous
    example, run (the DNSKEY record must be for a key-signing key):

        $ gcloud dns dns-keys describe --zone=my_zone 3 \
            --format='value(ds_record())'

POSITIONAL ARGUMENTS
     KEY-ID
        The DNS key identifier.

REQUIRED FLAGS
     --zone=ZONE
        The name of the managed-zone the DNSKEY record belongs to

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha dns dns-keys describe

        $ gcloud beta dns dns-keys describe
```

### gcloud dns dns-keys list

```text
NAME
    gcloud dns dns-keys list - list DNS key resources

SYNOPSIS
    gcloud dns dns-keys list --zone=ZONE [--filter=EXPRESSION] [--limit=LIMIT]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List DNS key resources in a managed zone.

EXAMPLES
    To see the list of all DNS key resources for a managed zone my_zone, run:

        $ gcloud dns dns-keys list --zone=my_zone

    To see the DS records for every key-signing DnsKey in a managed zone, run:

        $ gcloud dns dns-keys list --zone=my_zone \
            --filter='type=keySigning' --format='value(ds_record())'

REQUIRED FLAGS
     --zone=ZONE
        The name of the managed-zone you want to list DNSKEY records for.

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

     --sort-by=[FIELD,...]
        Comma-separated list of resource field key names to sort by. The
        default order is ascending. Prefix a field with ``~'' for descending
        order on that field. This flag interacts with other flags that are
        applied in this order: --flatten, --sort-by, --filter, --limit.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha dns dns-keys list

        $ gcloud beta dns dns-keys list
```

### gcloud beta dns dns-keys describe

```text
NAME
    gcloud beta dns dns-keys describe - show details about a DNS key resource

SYNOPSIS
    gcloud beta dns dns-keys describe KEY-ID --zone=ZONE, -z ZONE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta dns dns-keys list

```text
NAME
    gcloud beta dns dns-keys list - list DNS key resources

SYNOPSIS
    gcloud beta dns dns-keys list --zone=ZONE, -z ZONE [--filter=EXPRESSION]
        [--limit=LIMIT] [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dns dns-keys describe

```text
NAME
    gcloud alpha dns dns-keys describe - show details about a DNS key resource

SYNOPSIS
    gcloud alpha dns dns-keys describe KEY-ID --zone=ZONE, -z ZONE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dns dns-keys list

```text
NAME
    gcloud alpha dns dns-keys list - list DNS key resources

SYNOPSIS
    gcloud alpha dns dns-keys list --zone=ZONE, -z ZONE [--filter=EXPRESSION]
        [--limit=LIMIT] [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/dns/dns-keys (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
