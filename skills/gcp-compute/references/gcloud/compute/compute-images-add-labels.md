---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/images/add-labels
---

# gcloud compute images add-labels

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute images add-labels

```text
NAME
    gcloud compute images add-labels - add labels to Google Compute Engine
        images

SYNOPSIS
    gcloud compute images add-labels IMAGE_NAME --labels=[KEY=VALUE,...]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute images add-labels adds labels to a Google Compute Engine
    image.

EXAMPLES
    To add key-value pairs k0=v0 and k1=v1 to 'example-image'

        $ gcloud compute images add-labels example-image --labels=k0=v0,k1=v1

    Labels can be used to identify the image and to filter them. To find a
    image labeled with key-value pair k1, v2

        $ gcloud compute images list --filter='labels.k1:v2'

    To list only the labels when describing a resource, use --format

        $ gcloud compute images describe example-image \
            --format='default(labels)'

POSITIONAL ARGUMENTS
     IMAGE_NAME
        Name of the disk image to operate on.

REQUIRED FLAGS
     --labels=[KEY=VALUE,...]
        A list of labels to add.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute images add-labels

        $ gcloud beta compute images add-labels
```

### gcloud beta compute images add-labels

```text
NAME
    gcloud beta compute images add-labels - add labels to Google Compute Engine
        images

SYNOPSIS
    gcloud beta compute images add-labels IMAGE_NAME --labels=[KEY=VALUE,...]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute images add-labels

```text
NAME
    gcloud alpha compute images add-labels - add labels to Google Compute
        Engine images

SYNOPSIS
    gcloud alpha compute images add-labels IMAGE_NAME --labels=[KEY=VALUE,...]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/images/add-labels (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
