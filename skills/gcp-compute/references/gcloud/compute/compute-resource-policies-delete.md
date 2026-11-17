---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/resource-policies/delete
---

# gcloud compute resource-policies delete

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute resource-policies delete

```text
NAME
    gcloud compute resource-policies delete - delete a Compute Engine resource
        policy

SYNOPSIS
    gcloud compute resource-policies delete NAME [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a Compute Engine resource policy.

EXAMPLES
    The following command deletes a Compute Engine resource policy.

        $ gcloud compute resource-policies delete my-resource-policy \
            --region=REGION

POSITIONAL ARGUMENTS
     NAME
        Name of the resource policy to operate on.

FLAGS
     --region=REGION
        Region of the resource policy to operate on. If not specified, you
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

        $ gcloud alpha compute resource-policies delete

        $ gcloud beta compute resource-policies delete
```

### gcloud beta compute resource-policies delete

```text
NAME
    gcloud beta compute resource-policies delete - delete a Compute Engine
        resource policy

SYNOPSIS
    gcloud beta compute resource-policies delete NAME [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute resource-policies delete

```text
NAME
    gcloud alpha compute resource-policies delete - delete a Compute Engine
        resource policy

SYNOPSIS
    gcloud alpha compute resource-policies delete NAME [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/resource-policies/delete (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
