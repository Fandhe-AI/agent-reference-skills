---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/routers/remove-bgp-peer
---

# gcloud compute routers remove-bgp-peer

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute routers remove-bgp-peer

```text
NAME
    gcloud compute routers remove-bgp-peer - remove a BGP peer from a Compute
        Engine router

SYNOPSIS
    gcloud compute routers remove-bgp-peer NAME
        (--peer-name=PEER_NAME | --peer-names=[PEER_NAME,...])
        [--region=REGION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute routers remove-bgp-peer removes a BGP peer from a Compute
    Engine router.

POSITIONAL ARGUMENTS
     NAME
        Name of the router to update.

REQUIRED FLAGS
     Exactly one of these must be specified:

       --peer-name=PEER_NAME
          The name of the peer being removed.

       --peer-names=[PEER_NAME,...]
          The list of names for peers being removed.

OPTIONAL FLAGS
     --region=REGION
        Region of the router to update. If not specified, you might be prompted
        to select a region (interactive mode only).

        To avoid prompting when this flag is omitted, you can set the
        compute/region property:

            $ gcloud config set compute/region REGION

        A list of regions can be fetched by running:

            $ gcloud compute regions list

        To unset the property, run:

            $ gcloud config unset compute/region

        Alternatively, the region can be stored in the environment variable
        CLOUDSDK_COMPUTE_REGION.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute routers remove-bgp-peer

        $ gcloud beta compute routers remove-bgp-peer
```

### gcloud beta compute routers remove-bgp-peer

```text
NAME
    gcloud beta compute routers remove-bgp-peer - remove a BGP peer from a
        Compute Engine router

SYNOPSIS
    gcloud beta compute routers remove-bgp-peer NAME
        (--peer-name=PEER_NAME | --peer-names=[PEER_NAME,...])
        [--region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute routers remove-bgp-peer

```text
NAME
    gcloud alpha compute routers remove-bgp-peer - remove a BGP peer from a
        Compute Engine router

SYNOPSIS
    gcloud alpha compute routers remove-bgp-peer NAME
        (--peer-name=PEER_NAME | --peer-names=[PEER_NAME,...])
        [--region=REGION] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/routers/remove-bgp-peer (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
