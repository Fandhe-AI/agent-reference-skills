---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/interconnects/wire-groups/remove-endpoint
---

# gcloud compute interconnects wire-groups remove-endpoint

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute interconnects wire-groups remove-endpoint

```text
NAME
    gcloud compute interconnects wire-groups remove-endpoint - remove endpoint
        from a Compute Engine wire group

SYNOPSIS
    gcloud compute interconnects wire-groups remove-endpoint NAME
        --cross-site-network=CROSS_SITE_NETWORK --endpoint-label=ENDPOINT_LABEL
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute interconnects wire-groups remove-endpoint is used to remove
    endpoints from a wire group.

    For an example, refer to the EXAMPLES section below.

EXAMPLES
    To remove an endpoint from a wire group, run:

        $ gcloud compute interconnects wire-groups remove-endpoint \
            example-wg --cross-site-network=example-csn \
            --endpoint-label=endpoint-1

POSITIONAL ARGUMENTS
     NAME
        Name of the wire group to update.

REQUIRED FLAGS
     --cross-site-network=CROSS_SITE_NETWORK
        Name of the crossSiteNetwork to operate on.

     --endpoint-label=ENDPOINT_LABEL
        The endpoint label for the wire group.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute interconnects wire-groups remove-endpoint

        $ gcloud beta compute interconnects wire-groups remove-endpoint
```

### gcloud beta compute interconnects wire-groups remove-endpoint

```text
NAME
    gcloud beta compute interconnects wire-groups remove-endpoint - remove
        endpoint from a Compute Engine wire group

SYNOPSIS
    gcloud beta compute interconnects wire-groups remove-endpoint NAME
        --cross-site-network=CROSS_SITE_NETWORK --endpoint-label=ENDPOINT_LABEL
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute interconnects wire-groups remove-endpoint

```text
NAME
    gcloud alpha compute interconnects wire-groups remove-endpoint - remove
        endpoint from a Compute Engine wire group

SYNOPSIS
    gcloud alpha compute interconnects wire-groups remove-endpoint NAME
        --cross-site-network=CROSS_SITE_NETWORK --endpoint-label=ENDPOINT_LABEL
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/interconnects/wire-groups/remove-endpoint (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
