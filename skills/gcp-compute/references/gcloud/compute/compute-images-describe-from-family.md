---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/images/describe-from-family
---

# gcloud compute images describe-from-family

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute images describe-from-family

```text
NAME
    gcloud compute images describe-from-family - describe the latest image from
        an image family

SYNOPSIS
    gcloud compute images describe-from-family IMAGE_NAME [--zone=ZONE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute images describe-from-family looks up the latest image from
    an image family and runs a describe on it. If the image is not in the
    default project, you need to specify a value for --project.

EXAMPLES
    To view the description for the latest debian-9 image from the debian-cloud
    project, run:

        $ gcloud compute images describe-from-family debian-9 \
            --project=debian-cloud

POSITIONAL ARGUMENTS
     IMAGE_NAME
        Name of the disk image to describe.

FLAGS
     --zone=ZONE
        Zone to query. Returns the latest image available in the image family
        for the specified zone. If not specified, returns the latest globally
        available image.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute images describe-from-family

        $ gcloud beta compute images describe-from-family
```

### gcloud beta compute images describe-from-family

```text
NAME
    gcloud beta compute images describe-from-family - describe the latest image
        from an image family

SYNOPSIS
    gcloud beta compute images describe-from-family IMAGE_NAME [--zone=ZONE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute images describe-from-family

```text
NAME
    gcloud alpha compute images describe-from-family - describe the latest
        image from an image family

SYNOPSIS
    gcloud alpha compute images describe-from-family IMAGE_NAME [--zone=ZONE]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/images/describe-from-family (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
