---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/images/delete
---

# gcloud compute images delete

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute images delete

```text
NAME
    gcloud compute images delete - delete Compute Engine images

SYNOPSIS
    gcloud compute images delete IMAGE_NAME [IMAGE_NAME ...]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute images delete deletes one or more Compute Engine images.

EXAMPLES
    To delete images 'my-image1' and 'my-image2', run:

        $ gcloud compute images delete my-image1 my-image2

POSITIONAL ARGUMENTS
     IMAGE_NAME [IMAGE_NAME ...]
        Names of the disk images to delete.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute images delete

        $ gcloud beta compute images delete
```

### gcloud beta compute images delete

```text
NAME
    gcloud beta compute images delete - delete Compute Engine images

SYNOPSIS
    gcloud beta compute images delete IMAGE_NAME [IMAGE_NAME ...]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute images delete

```text
NAME
    gcloud alpha compute images delete - delete Compute Engine images

SYNOPSIS
    gcloud alpha compute images delete IMAGE_NAME [IMAGE_NAME ...]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/images/delete (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
