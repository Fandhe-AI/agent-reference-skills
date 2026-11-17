---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/networks/subnets/delete
---

# gcloud compute networks subnets delete

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute networks subnets delete

```text
NAME
    gcloud compute networks subnets delete - delete Google Cloud subnetworks

SYNOPSIS
    gcloud compute networks subnets delete NAME [NAME ...] [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute networks subnets delete deletes one or more Google Cloud
    subnetworks. Subnetworks can only be deleted when no other resources, such
    as VM instances, refer to them.".

EXAMPLES
    To delete the subnetwork subnet-1 in the us-central1, run:

        $ gcloud compute networks subnets delete subnet-1 \
            --region=us-central1

POSITIONAL ARGUMENTS
     NAME [NAME ...]
        Names of the subnetworks to delete.

FLAGS
     --region=REGION
        Region of the subnetworks to delete. If not specified, you might be
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

        $ gcloud alpha compute networks subnets delete

        $ gcloud beta compute networks subnets delete
```

### gcloud beta compute networks subnets delete

```text
NAME
    gcloud beta compute networks subnets delete - delete Google Cloud
        subnetworks

SYNOPSIS
    gcloud beta compute networks subnets delete NAME [NAME ...]
        [--region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute networks subnets delete

```text
NAME
    gcloud alpha compute networks subnets delete - delete Google Cloud
        subnetworks

SYNOPSIS
    gcloud alpha compute networks subnets delete NAME [NAME ...]
        [--region=REGION] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/networks/subnets/delete (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
