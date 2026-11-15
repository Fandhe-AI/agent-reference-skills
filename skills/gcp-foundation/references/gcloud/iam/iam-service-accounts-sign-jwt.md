---
source: https://docs.cloud.google.com/sdk/gcloud/reference/iam/service-accounts/sign-jwt
---

# gcloud iam service-accounts sign-jwt

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud iam service-accounts sign-jwt

```text
NAME
    gcloud iam service-accounts sign-jwt - sign a JWT with a managed service
        account key

SYNOPSIS
    gcloud iam service-accounts sign-jwt INPUT-FILE OUTPUT-FILE
        --iam-account=IAM_ACCOUNT [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command signs a JWT using a system-managed service account key.

    If the service account does not exist, this command returns a
    PERMISSION_DENIED error.

EXAMPLES
    To create a sign JWT with a system-managed service account key, run:

        $ gcloud iam service-accounts sign-jwt \
            --iam-account=my-iam-account@my-project.iam.gserviceaccount.com \
        input.json output.jwt

POSITIONAL ARGUMENTS
     INPUT-FILE
        A path to the file containing the JSON JWT Claim set to be signed.

     OUTPUT-FILE
        A path the resulting signed JWT will be written to.

REQUIRED FLAGS
     --iam-account=IAM_ACCOUNT
        The service account to sign as.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

SEE ALSO
    For more information on how this command ties into the wider cloud
    infrastructure, please see
    https://cloud.google.com/appengine/docs/java/appidentity/.

NOTES
    These variants are also available:

        $ gcloud alpha iam service-accounts sign-jwt

        $ gcloud beta iam service-accounts sign-jwt
```

### gcloud beta iam service-accounts sign-jwt

```text
NAME
    gcloud beta iam service-accounts sign-jwt - sign a JWT with a managed
        service account key

SYNOPSIS
    gcloud beta iam service-accounts sign-jwt INPUT-FILE OUTPUT-FILE
        --iam-account=IAM_ACCOUNT [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha iam service-accounts sign-jwt

```text
NAME
    gcloud alpha iam service-accounts sign-jwt - sign a JWT with a managed
        service account key

SYNOPSIS
    gcloud alpha iam service-accounts sign-jwt INPUT-FILE OUTPUT-FILE
        --iam-account=IAM_ACCOUNT [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/iam/service-accounts/sign-jwt (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
