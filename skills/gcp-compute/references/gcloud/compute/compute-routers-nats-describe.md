---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/routers/nats/describe
---

# gcloud compute routers nats describe

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute routers nats describe

```text
NAME
    gcloud compute routers nats describe - describe a NAT in a Compute Engine
        router

SYNOPSIS
    gcloud compute routers nats describe NAME --router=ROUTER [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute routers nats describe is used to describe a NAT in a Compute
    Engine router.

EXAMPLES
    To describe NAT 'n1' in router 'r1', run:

        $ gcloud compute routers nats describe n1 --router=r1 \
            --region=us-central1

POSITIONAL ARGUMENTS
     NAME
        Name of the NAT to describe

REQUIRED FLAGS
     --router=ROUTER
        Router to use for NAT.

OPTIONAL FLAGS
     --region=REGION
        Region of the NAT to describe. If not specified, you might be prompted
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

API REFERENCE
    This command, when specified without alpha or beta, uses the
    compute/v1/routers API. The full documentation for this API can be found
    at: https://cloud.google.com/compute/docs/reference/rest/v1/routers/

    The beta command uses the compute/beta/routers API. The full documentation
    for this API can be found at:
    https://cloud.google.com/compute/docs/reference/rest/beta/routers/

    The alpha command uses the compute/alpha/routers API. Full documentation is
    not available for the alpha API.

NOTES
    These variants are also available:

        $ gcloud alpha compute routers nats describe

        $ gcloud beta compute routers nats describe
```

### gcloud beta compute routers nats describe

```text
NAME
    gcloud beta compute routers nats describe - describe a NAT in a Compute
        Engine router

SYNOPSIS
    gcloud beta compute routers nats describe NAME --router=ROUTER
        [--region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute routers nats describe

```text
NAME
    gcloud alpha compute routers nats describe - describe a NAT in a Compute
        Engine router

SYNOPSIS
    gcloud alpha compute routers nats describe NAME --router=ROUTER
        [--region=REGION] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/routers/nats/describe (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
