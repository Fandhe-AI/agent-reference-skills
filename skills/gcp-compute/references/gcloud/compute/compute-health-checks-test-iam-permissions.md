---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/health-checks/test-iam-permissions
---

# gcloud compute health-checks test-iam-permissions

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute health-checks test-iam-permissions

```text
NAME
    gcloud compute health-checks test-iam-permissions - test IAM permissions
        for a Compute Engine health check

SYNOPSIS
    gcloud compute health-checks test-iam-permissions NAME
        --permissions=[PERMISSION,...] [--global | --region=REGION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute health-checks test-iam-permissions tests the IAM permissions
    that a caller has on a Compute Engine health check.

    Note: This operation is designed to be used for building permission-aware
    UIs and command-line tools, not for authorization checking. This operation
    may "fail open" without warning.

EXAMPLES
    To test if the caller has compute.healthChecks.getIamPolicy permission on a
    health check my-health-check, run:

        $ gcloud compute health-checks test-iam-permissions \
            my-health-check --permissions=compute.healthChecks.getIamPolicy

POSITIONAL ARGUMENTS
     NAME
        Name of the health check to test IAM permissions for.

REQUIRED FLAGS
     --permissions=[PERMISSION,...]
        The set of permissions to check for the resource.

OPTIONAL FLAGS
     At most one of these can be specified:

       --global
          If set, the health check is global.

       --region=REGION
          Region of the health check to test IAM permissions for. If not
          specified, you might be prompted to select a region (interactive mode
          only).

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

        $ gcloud alpha compute health-checks test-iam-permissions

        $ gcloud beta compute health-checks test-iam-permissions
```

### gcloud beta compute health-checks test-iam-permissions

```text
NAME
    gcloud beta compute health-checks test-iam-permissions - test IAM
        permissions for a Compute Engine health check

SYNOPSIS
    gcloud beta compute health-checks test-iam-permissions NAME
        --permissions=[PERMISSION,...] [--global | --region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute health-checks test-iam-permissions

```text
NAME
    gcloud alpha compute health-checks test-iam-permissions - test IAM
        permissions for a Compute Engine health check

SYNOPSIS
    gcloud alpha compute health-checks test-iam-permissions NAME
        --permissions=[PERMISSION,...] [--global | --region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/health-checks/test-iam-permissions (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
