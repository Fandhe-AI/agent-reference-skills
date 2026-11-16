---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/backend-buckets/test-iam-permissions
---

# gcloud compute backend-buckets test-iam-permissions

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute backend-buckets test-iam-permissions

```text
NAME
    gcloud compute backend-buckets test-iam-permissions - test IAM permissions
        for a Compute Engine backend bucket

SYNOPSIS
    gcloud compute backend-buckets test-iam-permissions BACKEND_BUCKET
        --permissions=[PERMISSION,...] [--global | --region=REGION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute backend-buckets test-iam-permissions tests the IAM
    permissions that a caller has on a Compute Engine backend bucket.

    Note: This operation is designed to be used for building permission-aware
    UIs and command-line tools, not for authorization checking. This operation
    may "fail open" without warning.

EXAMPLES
    To test if the caller has compute.backendBuckets.get and
    compute.backendBuckets.update permissions on a global backend bucket
    my-backend-bucket, run:

        $ gcloud compute backend-buckets test-iam-permissions \
            my-backend-bucket \
            --permissions=compute.backendBuckets.get,\
        compute.backendBuckets.update

    To test permissions on a regional backend bucket my-backend-bucket in
    region us-central1, run:

        $ gcloud compute backend-buckets test-iam-permissions \
            my-backend-bucket --region=us-central1 \
            --permissions=compute.regionBackendBuckets.get,\
        compute.regionBackendBuckets.update

POSITIONAL ARGUMENTS
     BACKEND_BUCKET
        ID of the backend bucket or fully qualified identifier for the backend
        bucket.

            To set the backend_bucket attribute:
            + provide the argument backend_bucket on the command line.

REQUIRED FLAGS
     --permissions=[PERMISSION,...]
        The set of permissions to check for the resource.

OPTIONAL FLAGS
     At most one of these can be specified:

       --global
          If set, the backend bucket is global.

       --region=REGION
          Region of the backend bucket to test IAM permissions for. Overrides
          the default compute/region property value for this command
          invocation.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the compute API. The full documentation for this API can
    be found at: https://cloud.google.com/compute/

NOTES
    These variants are also available:

        $ gcloud alpha compute backend-buckets test-iam-permissions

        $ gcloud beta compute backend-buckets test-iam-permissions
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud compute backend-buckets test-iam-permissions my-backend-bucket \
    --permissions=compute.backendBuckets.get,compute.backendBuckets.update

gcloud compute backend-buckets test-iam-permissions my-backend-bucket \
    --region=us-central1 \
    --permissions=compute.regionBackendBuckets.get,compute.regionBackendBuckets.update
```

### gcloud beta compute backend-buckets test-iam-permissions

```text
NAME
    gcloud beta compute backend-buckets test-iam-permissions - test IAM
        permissions for a Compute Engine backend bucket

SYNOPSIS
    gcloud beta compute backend-buckets test-iam-permissions BACKEND_BUCKET
        --permissions=[PERMISSION,...] [--global | --region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute backend-buckets test-iam-permissions

```text
NAME
    gcloud alpha compute backend-buckets test-iam-permissions - test IAM
        permissions for a Compute Engine backend bucket

SYNOPSIS
    gcloud alpha compute backend-buckets test-iam-permissions BACKEND_BUCKET
        --permissions=[PERMISSION,...] [--global | --region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/backend-buckets/test-iam-permissions (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
