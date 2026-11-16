---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/backend-buckets/set-iam-policy
---

# gcloud compute backend-buckets set-iam-policy

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute backend-buckets set-iam-policy

```text
NAME
    gcloud compute backend-buckets set-iam-policy - set the IAM policy binding
        for a Compute Engine backend bucket

SYNOPSIS
    gcloud compute backend-buckets set-iam-policy BACKEND_BUCKET POLICY_FILE
        [--global | --region=REGION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Sets the IAM policy for the given backend bucket as defined in a JSON or
    YAML file.

EXAMPLES
    The following command will read an IAM policy defined in a JSON file
    'policy.json' and set it for the regional backend bucket my-backend-bucket:

        $ gcloud compute backend-buckets set-iam-policy my-backend-bucket \
            policy.json --region=REGION

    The following commands will read an IAM policy defined in a JSON file
    'policy.json' and set it for the global backend bucket my-backend-bucket:

        $ gcloud compute backend-buckets set-iam-policy my-backend-bucket \
            policy.json --global

        $ gcloud compute backend-buckets set-iam-policy my-backend-bucket \
            policy.json

    See https://cloud.google.com/iam/docs/managing-policies for details of the
    policy file format and contents.

POSITIONAL ARGUMENTS
     BACKEND_BUCKET
        ID of the backend bucket or fully qualified identifier for the backend
        bucket.

            To set the backend_bucket attribute:
            + provide the argument backend_bucket on the command line.

     POLICY_FILE
        Path to a local JSON or YAML formatted file containing a valid policy.

        The output of the get-iam-policy command is a valid file, as is any
        JSON or YAML file conforming to the structure of a Policy
        (https://cloud.google.com/iam/reference/rest/v1/Policy).

FLAGS
     At most one of these can be specified:

       --global
          If set, the backend bucket is global.

       --region=REGION
          Region of the backend bucket to setIamPolicy. Overrides the default
          compute/region property value for this command invocation.

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

        $ gcloud alpha compute backend-buckets set-iam-policy

        $ gcloud beta compute backend-buckets set-iam-policy
```

### gcloud beta compute backend-buckets set-iam-policy

```text
NAME
    gcloud beta compute backend-buckets set-iam-policy - set the IAM policy
        binding for a Compute Engine backend bucket

SYNOPSIS
    gcloud beta compute backend-buckets set-iam-policy BACKEND_BUCKET
        POLICY_FILE [--global | --region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute backend-buckets set-iam-policy

```text
NAME
    gcloud alpha compute backend-buckets set-iam-policy - set the IAM policy
        binding for a Compute Engine backend bucket

SYNOPSIS
    gcloud alpha compute backend-buckets set-iam-policy BACKEND_BUCKET
        POLICY_FILE [--global | --region=REGION] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/backend-buckets/set-iam-policy (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
