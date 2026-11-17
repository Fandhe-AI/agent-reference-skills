---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/network-firewall-policies/get-effective-firewalls
---

# gcloud compute network-firewall-policies get-effective-firewalls

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute network-firewall-policies get-effective-firewalls

```text
NAME
    gcloud compute network-firewall-policies get-effective-firewalls - get the
        effective firewalls for a network

SYNOPSIS
    gcloud compute network-firewall-policies get-effective-firewalls
        --network=NETWORK [--region=REGION] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute network-firewall-policies get-effective-firewalls is used to
    get the effective firewalls applied to the network, including regional
    firewalls in a specified region.

EXAMPLES
    To get the effective firewalls of network with name example-network,
    including effective regional firewalls for that network, in region
    region-a, run:

        $ gcloud compute network-firewall-policies get-effective-firewalls \
            --network=example-network --region=region-a

    To show all fields of the firewall rules, please show in JSON format with
    option --format=json

    To list more the fields of the rules of network example-network in table
    format, run:

        $ gcloud compute network-firewall-policies get-effective-firewalls \
            --network=example-network --region=region-a --format="table(
          type,
          firewall_policy_name,
          rule_type,
          priority,
          action,
          direction,
          ip_ranges.list():label=IP_RANGES,
          target_svc_acct,
          enableLogging,
          description,
          name,
          disabled,
          target_tags,
          src_svc_acct,
          src_tags,
          ruleTupleCount,
          targetResources:label=TARGET_RESOURCES)"

REQUIRED FLAGS
     --network=NETWORK
        The network to get the effective firewalls for.

FLAGS
     --region=REGION
        The region to get the effective regional firewalls.

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

        $ gcloud alpha compute network-firewall-policies \
            get-effective-firewalls

        $ gcloud beta compute network-firewall-policies \
            get-effective-firewalls
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud compute network-firewall-policies get-effective-firewalls \
    --network=example-network \
    --region=region-a \
    --format="table( type, firewall_policy_name, rule_type, priority, action, direction, ip_ranges.list():label=IP_RANGES, target_svc_acct, enableLogging, description, name, disabled, target_tags, src_svc_acct, src_tags, ruleTupleCount, targetResources:label=TARGET_RESOURCES)"
```

### gcloud beta compute network-firewall-policies get-effective-firewalls

```text
NAME
    gcloud beta compute network-firewall-policies get-effective-firewalls - get
        the effective firewalls for a network

SYNOPSIS
    gcloud beta compute network-firewall-policies get-effective-firewalls
        --network=NETWORK [--region=REGION] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute network-firewall-policies get-effective-firewalls

```text
NAME
    gcloud alpha compute network-firewall-policies get-effective-firewalls -
        get the effective firewalls for a network

SYNOPSIS
    gcloud alpha compute network-firewall-policies get-effective-firewalls
        --network=NETWORK [--region=REGION] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/network-firewall-policies/get-effective-firewalls (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
