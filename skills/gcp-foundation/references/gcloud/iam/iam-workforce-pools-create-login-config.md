---
source: https://docs.cloud.google.com/sdk/gcloud/reference/iam/workforce-pools/create-login-config
---

# gcloud iam workforce-pools create-login-config

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud iam workforce-pools create-login-config

```text
NAME
    gcloud iam workforce-pools create-login-config - create a login
        configuration file to enable sign-in via a web-based authorization flow
        using Workforce Identity Federation

SYNOPSIS
    gcloud iam workforce-pools create-login-config AUDIENCE
        --output-file=OUTPUT_FILE [--activate] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command creates a configuration file to enable browser based
    third-party sign in with Workforce Identity Federation through gcloud auth
    login --login-config=/path/to/config.json.

EXAMPLES
    To create a login configuration by using the short-format audience, run:

        $ gcloud iam workforce-pools create-login-config \
            $WORKFORCE_POOL_ID/$PROVIDER_ID --output-file=login-config.json

    To create a login configuration by using the full resource name audience,
    run:

        $ gcloud iam workforce-pools create-login-config \
            locations/global/workforcePools/$WORKFORCE_POOL_ID/providers/\
        $PROVIDER_ID --output-file=login-config.json

POSITIONAL ARGUMENTS
     AUDIENCE
        The workforce pool provider resource name in the format
        "<pool>/<provider>" or
        "locations/<location>/workforcePools/<pool>/providers/<provider>".

REQUIRED FLAGS
     --output-file=OUTPUT_FILE
        Location to store the generated login configuration file.

OPTIONAL FLAGS
     --activate
        Sets the property auth/login_config_file to the created login
        configuration file. Calling gcloud auth login will automatically use
        this login configuration unless it is explicitly unset.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha iam workforce-pools create-login-config

        $ gcloud beta iam workforce-pools create-login-config
```

### gcloud beta iam workforce-pools create-login-config

```text
NAME
    gcloud beta iam workforce-pools create-login-config - create a login
        configuration file to enable sign-in via a web-based authorization flow
        using Workforce Identity Federation

SYNOPSIS
    gcloud beta iam workforce-pools create-login-config AUDIENCE
        --output-file=OUTPUT_FILE [--activate] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha iam workforce-pools create-login-config

```text
NAME
    gcloud alpha iam workforce-pools create-login-config - create a login
        configuration file to enable sign-in via a web-based authorization flow
        using Workforce Identity Federation

SYNOPSIS
    gcloud alpha iam workforce-pools create-login-config AUDIENCE
        --output-file=OUTPUT_FILE [--activate] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/iam/workforce-pools/create-login-config (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
