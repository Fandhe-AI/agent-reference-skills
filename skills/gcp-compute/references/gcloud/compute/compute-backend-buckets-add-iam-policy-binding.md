---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/backend-buckets/add-iam-policy-binding
---

# gcloud compute backend-buckets add-iam-policy-binding

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute backend-buckets add-iam-policy-binding

```text
NAME
    gcloud compute backend-buckets add-iam-policy-binding - add an IAM policy
        binding to a Compute Engine backend bucket

SYNOPSIS
    gcloud compute backend-buckets add-iam-policy-binding BACKEND_BUCKET
        --member=PRINCIPAL --role=ROLE [--global | --region=REGION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Add an IAM policy binding to a Compute Engine backend bucket.

EXAMPLES
    To add an IAM policy binding for the role of
    'compute.loadBalancerServiceUser' for the user 'test-user@gmail.com' with
    backend bucket 'my-backend-bucket' and region 'REGION', run:

        $ gcloud compute backend-buckets add-iam-policy-binding \
          my-backend-bucket --region=REGION \
          --member='user:test-user@gmail.com' \
          --role='roles/compute.loadBalancerServiceUser'

    To add an IAM policy binding for the role of
    'compute.loadBalancerServiceUser' for the user 'test-user@gmail.com' with
    global backend bucket 'my-backend-bucket', run either of the following:

        $ gcloud compute backend-buckets add-iam-policy-binding \
          my-backend-bucket --global --member='user:test-user@gmail.com' \
          --role='roles/compute.loadBalancerServiceUser'

        $ gcloud compute backend-buckets add-iam-policy-binding \
          my-backend-bucket --member='user:test-user@gmail.com' \
          --role='roles/compute.loadBalancerServiceUser'

    See https://cloud.google.com/iam/docs/managing-policies for details of
    policy role and member types.

POSITIONAL ARGUMENTS
     BACKEND_BUCKET
        ID of the backend bucket or fully qualified identifier for the backend
        bucket.

            To set the backend_bucket attribute:
            + provide the argument backend_bucket on the command line.

REQUIRED FLAGS
     --member=PRINCIPAL
        The principal to add the binding for. Should be of the form
        user|group|serviceAccount:email or domain:domain.

        Examples: user:test-user@gmail.com, group:admins@example.com,
        serviceAccount:test123@example.domain.com, or
        domain:example.domain.com.

        Some resources also accept the following special values:
        * allUsers - Special identifier that represents anyone who is on the
          internet, with or without a Google account.
        * allAuthenticatedUsers - Special identifier that represents anyone
          who is authenticated with a Google account or a service account.

     --role=ROLE
        Role name to assign to the principal. The role name is the complete
        path of a predefined role, such as roles/logging.viewer, or the role ID
        for a custom role, such as
        organizations/{ORGANIZATION_ID}/roles/logging.viewer.

OPTIONAL FLAGS
     At most one of these can be specified:

       --global
          If set, the backend bucket is global.

       --region=REGION
          Region of the backend bucket to operate on. Overrides the default
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

        $ gcloud alpha compute backend-buckets add-iam-policy-binding

        $ gcloud beta compute backend-buckets add-iam-policy-binding
```

### gcloud beta compute backend-buckets add-iam-policy-binding

```text
NAME
    gcloud beta compute backend-buckets add-iam-policy-binding - add an IAM
        policy binding to a Compute Engine backend bucket

SYNOPSIS
    gcloud beta compute backend-buckets add-iam-policy-binding BACKEND_BUCKET
        --member=PRINCIPAL --role=ROLE [--global | --region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute backend-buckets add-iam-policy-binding

```text
NAME
    gcloud alpha compute backend-buckets add-iam-policy-binding - add an IAM
        policy binding to a Compute Engine backend bucket

SYNOPSIS
    gcloud alpha compute backend-buckets add-iam-policy-binding BACKEND_BUCKET
        --member=PRINCIPAL --role=ROLE [--global | --region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/backend-buckets/add-iam-policy-binding (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
