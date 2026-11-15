---
source: https://docs.cloud.google.com/sdk/gcloud/reference/app/create
---

# gcloud app create

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud app create

```text
NAME
    gcloud app create - create an App Engine app within the current Google
        Cloud Project

SYNOPSIS
    gcloud app create [--region=REGION] [--service-account=SERVICE_ACCOUNT]
        [--ssl-policy=SSL_POLICY] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create an App Engine app within the current Google Cloud Project.

EXAMPLES
    To create an app with region chosen interactively, run:

        $ gcloud app create

    To create an app in the us-central region, run:

        $ gcloud app create --region=us-central

    To create an app that with a user-managed service account, run:

        $ gcloud app create --service-account=SERVICE_ACCOUNT

    To create an app with minimum SSL policy allowing TLS 1.2 and above, run:

        $ gcloud app create --ssl-policy=TLS_VERSION_1_2

FLAGS
     --region=REGION
        The region to create the app within. Use gcloud app regions list to
        list available regions. If not provided, select region interactively.

     --service-account=SERVICE_ACCOUNT
        The app-level default service account to create the app with. Note that
        you can specify a distinct service account for each App Engine version
        with gcloud app deploy --service-account. However if you do not specify
        a version-level service account, this default will be used. If this
        parameter is not provided for app creation, the app-level default will
        be set to be the out-of-box App Engine Default Service Account,
        https://cloud.google.com/appengine/docs/standard/python3/service-account
        outlines the limitation of that service account.

     --ssl-policy=SSL_POLICY
        The app-level SSL policy to create the app with. SSL_POLICY must be one
        of: TLS_VERSION_1_0, TLS_VERSION_1_2.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud beta app create
```

### gcloud beta app create

```text
NAME
    gcloud beta app create - create an App Engine app within the current Google
        Cloud Project

SYNOPSIS
    gcloud beta app create [--region=REGION]
        [--service-account=SERVICE_ACCOUNT] [--ssl-policy=SSL_POLICY]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/app/create (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
