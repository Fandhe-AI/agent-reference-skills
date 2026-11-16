---
source: https://docs.cloud.google.com/sdk/gcloud/reference/container/clusters/check-autopilot-compatibility
---

# gcloud container clusters check-autopilot-compatibility

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud container clusters check-autopilot-compatibility

```text
NAME
    gcloud container clusters check-autopilot-compatibility - check autopilot
        compatibility of a running cluster

SYNOPSIS
    gcloud container clusters check-autopilot-compatibility NAME
        [--location=LOCATION | --region=REGION | --zone=ZONE, -z ZONE]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Check autopilot compatibility of a running cluster.

    For clusters with GKE version 1.31.6-gke.1027000 or later, you must enable
    the control plane component that performs the check by running the gcloud
    container clusters update command with the
    `--enable-autopilot-compatiblity-auditing`
    (https://cloud.google.com/sdk/gcloud/reference/container/clusters/update#--%5Bno-%5Denable-autopilot-compatibility-auditing)
    flag.

EXAMPLES
    To check autopilot compatibility of an existing cluster, run:

        $ gcloud container clusters check-autopilot-compatibility \
            sample-cluster

POSITIONAL ARGUMENTS
     NAME
        The name of this cluster.

FLAGS
     At most one of these can be specified:

       --location=LOCATION
          Compute zone or region (e.g. us-central1-a or us-central1) for the
          cluster. Overrides the default compute/region or compute/zone value
          for this command invocation. Prefer using this flag over the --region
          or --zone flags.

       --region=REGION
          Compute region (e.g. us-central1) for a regional cluster. Overrides
          the default compute/region property value for this command
          invocation.

       --zone=ZONE, -z ZONE
          Compute zone (e.g. us-central1-a) for a zonal cluster. Overrides the
          default compute/zone property value for this command invocation.

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

        $ gcloud alpha container clusters check-autopilot-compatibility

        $ gcloud beta container clusters check-autopilot-compatibility
```

### gcloud beta container clusters check-autopilot-compatibility

```text
NAME
    gcloud beta container clusters check-autopilot-compatibility - check
        autopilot compatibility of a running cluster

SYNOPSIS
    gcloud beta container clusters check-autopilot-compatibility NAME
        [--location=LOCATION | --region=REGION | --zone=ZONE, -z ZONE]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container clusters check-autopilot-compatibility

```text
NAME
    gcloud alpha container clusters check-autopilot-compatibility - check
        autopilot compatibility of a running cluster

SYNOPSIS
    gcloud alpha container clusters check-autopilot-compatibility NAME
        [--location=LOCATION | --region=REGION | --zone=ZONE, -z ZONE]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Corrected from the official docs (the help text above is verbatim): the description spells the flag `--enable-autopilot-compatiblity-auditing`; the flag of `gcloud container clusters update` is `--enable-autopilot-compatibility-auditing` (as in the linked anchor; negated form `--no-enable-autopilot-compatibility-auditing`).
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/container/clusters/check-autopilot-compatibility (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
