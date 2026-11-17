---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/routers/delete
---

# gcloud compute routers delete

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute routers delete

```text
NAME
    gcloud compute routers delete - delete Compute Engine routers

SYNOPSIS
    gcloud compute routers delete NAME [NAME ...] [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute routers delete deletes one or more Compute Engine routers.
    Routers can only be deleted when no other resources (e.g., virtual machine
    instances) refer to them.

POSITIONAL ARGUMENTS
     NAME [NAME ...]
        Names of the routers to delete.

FLAGS
     --region=REGION
        Region of the routers to delete. If not specified, you might be
        prompted to select a region (interactive mode only).

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

        $ gcloud alpha compute routers delete

        $ gcloud beta compute routers delete
```

### gcloud beta compute routers delete

```text
NAME
    gcloud beta compute routers delete - delete Compute Engine routers

SYNOPSIS
    gcloud beta compute routers delete NAME [NAME ...] [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute routers delete

```text
NAME
    gcloud alpha compute routers delete - delete Compute Engine routers

SYNOPSIS
    gcloud alpha compute routers delete NAME [NAME ...] [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/routers/delete (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
