---
source: https://docs.cloud.google.com/sdk/gcloud/reference/iam/service-accounts/set-iam-policy
---

# gcloud iam service-accounts set-iam-policy

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud iam service-accounts set-iam-policy

```text
NAME
    gcloud iam service-accounts set-iam-policy - set IAM policy for a service
        account

SYNOPSIS
    gcloud iam service-accounts set-iam-policy SERVICE_ACCOUNT POLICY_FILE
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command replaces the existing IAM policy for a service account, given
    an IAM_ACCOUNT and a file encoded in JSON or YAML that contains the IAM
    policy. If the given policy file specifies an "etag" value, then the
    replacement will succeed only if the policy already in place matches that
    etag. (An etag obtained via $ gcloud iam service-accounts get-iam-policy
    will prevent the replacement if the policy for the service account has been
    subsequently updated.) A policy file that does not contain an etag value
    will replace any existing policy for the service account.

    If the service account does not exist, this command returns a
    PERMISSION_DENIED error.

    When managing IAM roles, you can treat a service account either as a
    resource or as an identity. This command is to set the iam policy of a
    service account resource. There are other gcloud commands to manage IAM
    policies for other types of resources. For example, to manage IAM policies
    on a project, use the $ gcloud projects commands.

EXAMPLES
    The following command will read an IAM policy from 'policy.json' and set it
    for a service account with
    'my-iam-account@my-project.iam.gserviceaccount.com' as the identifier:

        $ gcloud iam service-accounts set-iam-policy \
            my-iam-account@my-project.iam.gserviceaccount.com policy.json

    See https://cloud.google.com/iam/docs/managing-policies for details of the
    policy file format and contents.

POSITIONAL ARGUMENTS
     SERVICE_ACCOUNT
        The service account whose policy to set. The account should be
        formatted either as a numeric service account ID or as an email, like
        this: 123456789876543212345 or my-iam-account@somedomain.com.

     POLICY_FILE
        Path to a local JSON or YAML formatted file containing a valid policy.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha iam service-accounts set-iam-policy

        $ gcloud beta iam service-accounts set-iam-policy
```

### gcloud beta iam service-accounts set-iam-policy

```text
NAME
    gcloud beta iam service-accounts set-iam-policy - set IAM policy for a
        service account

SYNOPSIS
    gcloud beta iam service-accounts set-iam-policy SERVICE_ACCOUNT POLICY_FILE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha iam service-accounts set-iam-policy

```text
NAME
    gcloud alpha iam service-accounts set-iam-policy - set IAM policy for a
        service account

SYNOPSIS
    gcloud alpha iam service-accounts set-iam-policy SERVICE_ACCOUNT
        POLICY_FILE [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/iam/service-accounts/set-iam-policy (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
