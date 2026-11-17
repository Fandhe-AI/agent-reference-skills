---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/interconnects/attachments/delete
---

# gcloud compute interconnects attachments delete

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute interconnects attachments delete

```text
NAME
    gcloud compute interconnects attachments delete - delete Compute Engine
        interconnect attachments

SYNOPSIS
    gcloud compute interconnects attachments delete NAME [NAME ...]
        [--region=REGION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute interconnects attachments delete deletes Compute Engine
    interconnect attachments.

POSITIONAL ARGUMENTS
     NAME [NAME ...]
        Names of the interconnect attachments to delete.

FLAGS
     --region=REGION
        Region of the interconnect attachments to delete. If not specified, you
        might be prompted to select a region (interactive mode only).

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

        $ gcloud alpha compute interconnects attachments delete

        $ gcloud beta compute interconnects attachments delete
```

### gcloud beta compute interconnects attachments delete

```text
NAME
    gcloud beta compute interconnects attachments delete - delete Compute
        Engine interconnect attachments

SYNOPSIS
    gcloud beta compute interconnects attachments delete NAME [NAME ...]
        [--region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute interconnects attachments delete

```text
NAME
    gcloud alpha compute interconnects attachments delete - delete Compute
        Engine interconnect attachments

SYNOPSIS
    gcloud alpha compute interconnects attachments delete NAME [NAME ...]
        [--region=REGION] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/interconnects/attachments/delete (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
