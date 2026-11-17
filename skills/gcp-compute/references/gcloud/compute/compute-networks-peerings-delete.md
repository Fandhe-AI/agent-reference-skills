---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/networks/peerings/delete
---

# gcloud compute networks peerings delete

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute networks peerings delete

```text
NAME
    gcloud compute networks peerings delete - delete a Compute Engine network
        peering

SYNOPSIS
    gcloud compute networks peerings delete NAME --network=NETWORK
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute networks peerings delete deletes a Compute Engine network
    peering.

EXAMPLES
    To delete a network peering with the name 'peering-name' on the network
    'local-network', run:

        $ gcloud compute networks peerings delete peering-name \
            --network=local-network

POSITIONAL ARGUMENTS
     NAME
        The name of the peering to delete.

REQUIRED FLAGS
     --network=NETWORK
        The name of the network in the current project containing the peering.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute networks peerings delete

        $ gcloud beta compute networks peerings delete
```

### gcloud beta compute networks peerings delete

```text
NAME
    gcloud beta compute networks peerings delete - delete a Compute Engine
        network peering

SYNOPSIS
    gcloud beta compute networks peerings delete NAME --network=NETWORK
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute networks peerings delete

```text
NAME
    gcloud alpha compute networks peerings delete - delete a Compute Engine
        network peering

SYNOPSIS
    gcloud alpha compute networks peerings delete NAME --network=NETWORK
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/networks/peerings/delete (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
