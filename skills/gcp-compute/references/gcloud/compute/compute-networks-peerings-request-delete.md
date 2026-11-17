---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/networks/peerings/request-delete
---

# gcloud compute networks peerings request-delete

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute networks peerings request-delete

```text
NAME
    gcloud compute networks peerings request-delete - request deletion of a
        Compute Engine network peering

SYNOPSIS
    gcloud compute networks peerings request-delete NAME --network=NETWORK
        [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute networks peerings request-delete is used to request deletion
    of a consensus peering between virtual networks. The peering can be deleted
    if both sides request deletion.

EXAMPLES
    To request deletion of a consensus peering with the name 'peering-name'
    between the network 'local-network' and the network 'peer-network', run:

        $ gcloud compute networks peerings request-delete peering-name \
          --network=local-network

        $ gcloud compute networks peerings request-delete peering-name \
          --network=peer-network

    To complete the deletion, run gcloud compute networks peerings delete for
    each side of the peering.

POSITIONAL ARGUMENTS
     NAME
        The name of the peering.

REQUIRED FLAGS
     --network=NETWORK
        The name of the network in the current project containing the peering.

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

        $ gcloud alpha compute networks peerings request-delete

        $ gcloud beta compute networks peerings request-delete
```

### gcloud beta compute networks peerings request-delete

```text
NAME
    gcloud beta compute networks peerings request-delete - request deletion of
        a Compute Engine network peering

SYNOPSIS
    gcloud beta compute networks peerings request-delete NAME --network=NETWORK
        [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute networks peerings request-delete

```text
NAME
    gcloud alpha compute networks peerings request-delete - request deletion of
        a Compute Engine network peering

SYNOPSIS
    gcloud alpha compute networks peerings request-delete NAME
        --network=NETWORK [--async] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/networks/peerings/request-delete (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
