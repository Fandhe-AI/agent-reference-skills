---
source: https://docs.cloud.google.com/sdk/gcloud/reference/sql/generate-login-token
---

# gcloud sql generate-login-token

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud sql generate-login-token

```text
NAME
    gcloud sql generate-login-token - generate an IAM login token for Cloud SQL

SYNOPSIS
    gcloud sql generate-login-token [--application-default-credential]
        [--instance=INSTANCE, -i INSTANCE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud sql generate-login-token generates an IAM token to use for logging
    in to Cloud SQL instances.

EXAMPLES
    To generate an IAM login token using gcloud credentials, run:

        $ gcloud sql generate-login-token

    To generate an IAM login token using application default credentials, run:

        $ gcloud sql generate-login-token --application-default-credential

    To generate an IAM login token using gcloud credentials for instance
    my-instance, run:

        $ gcloud sql generate-login-token --instance=my-instance

    To generate an IAM login token using application default credentials for
    instance my-instance, run:

        $ gcloud sql generate-login-token --instance=my-instance \
            --application-default-credential

FLAGS
     --application-default-credential
        Use application default credentials to generate the login token.

     --instance=INSTANCE, -i INSTANCE
        Cloud SQL instance ID.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha sql generate-login-token

        $ gcloud beta sql generate-login-token
```

### gcloud beta sql generate-login-token

```text
NAME
    gcloud beta sql generate-login-token - generate an IAM login token for
        Cloud SQL

SYNOPSIS
    gcloud beta sql generate-login-token [--application-default-credential]
        [--instance=INSTANCE, -i INSTANCE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha sql generate-login-token

```text
NAME
    gcloud alpha sql generate-login-token - generate an IAM login token for
        Cloud SQL

SYNOPSIS
    gcloud alpha sql generate-login-token [--application-default-credential]
        [--instance=INSTANCE, -i INSTANCE] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/sql/generate-login-token (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
