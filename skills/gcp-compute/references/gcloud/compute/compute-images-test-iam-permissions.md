---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/images/test-iam-permissions
---

# gcloud compute images test-iam-permissions

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute images test-iam-permissions

```text
NAME
    gcloud compute images test-iam-permissions - test IAM permissions for a
        Compute Engine image

SYNOPSIS
    gcloud compute images test-iam-permissions IMAGE
        --permissions=[PERMISSIONS,...] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute images test-iam-permissions tests the IAM permissions that a
    caller has on a Compute Engine image.

EXAMPLES
    To test if the caller has 'compute.images.get' permission on my-image, run:

        $ gcloud compute images test-iam-permissions my-image \
            --permissions=compute.images.get

POSITIONAL ARGUMENTS
     Image resource - The image for which to test permissions. This represents
     a Cloud resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument image on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       IMAGE
          ID of the image or fully qualified identifier for the image.

          To set the image attribute:
          + provide the argument image on the command line.

REQUIRED FLAGS
     --permissions=[PERMISSIONS,...]
        The permissions to test.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the compute/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/compute/

NOTES
    These variants are also available:

        $ gcloud alpha compute images test-iam-permissions

        $ gcloud beta compute images test-iam-permissions
```

### gcloud beta compute images test-iam-permissions

```text
NAME
    gcloud beta compute images test-iam-permissions - test IAM permissions for
        a Compute Engine image

SYNOPSIS
    gcloud beta compute images test-iam-permissions IMAGE
        --permissions=[PERMISSIONS,...] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute images test-iam-permissions

```text
NAME
    gcloud alpha compute images test-iam-permissions - test IAM permissions for
        a Compute Engine image

SYNOPSIS
    gcloud alpha compute images test-iam-permissions IMAGE
        --permissions=[PERMISSIONS,...] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/images/test-iam-permissions (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
