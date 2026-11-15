---
source: https://docs.cloud.google.com/sdk/gcloud/reference/auth/activate-service-account
---

# gcloud auth activate-service-account

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud auth activate-service-account

```text
NAME
    gcloud auth activate-service-account - authorize access to Google Cloud
        with a service account

SYNOPSIS
    gcloud auth activate-service-account [ACCOUNT] --key-file=KEY_FILE
        [--password-file=PASSWORD_FILE | --prompt-for-password]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    To allow gcloud (and other tools in Google Cloud CLI) to use service
    account credentials to make requests, use this command to import these
    credentials from a file that contains a private authorization key, and
    activate them for use in gcloud. gcloud auth activate-service-account
    serves the same function as gcloud auth login but uses a service account
    rather than Google user credentials.

    For more information on authorization and credential types, see:
    https://cloud.google.com/sdk/docs/authorizing.

    Key File

    To obtain the key file for this command, use either the Google Cloud
    Console (https://console.cloud.google.com) or gcloud iam service-accounts
    keys create. The key file can be .json (preferred) or .p12 (legacy) format.
    In the case of legacy .p12 files, a separate password might be required and
    is displayed in the Console when you create the key.

    Credentials

    Credentials will also be activated (similar to running gcloud config set
    account [ACCOUNT_NAME]).

    If a project is specified using the --project flag, the project is set in
    active configuration, which is the same as running gcloud config set
    project [PROJECT_NAME]. Any previously active credentials, will be retained
    (though no longer default) and can be displayed by running gcloud auth
    list.

    If you want to delete previous credentials, see gcloud auth revoke.

    Note: Service accounts use client quotas for tracking usage.

EXAMPLES
    To authorize gcloud to access Google Cloud using an existing service
    account while also specifying a project, run:

        $ gcloud auth activate-service-account SERVICE_ACCOUNT@DOMAIN.COM \
        --key-file=/path/key.json --project=PROJECT_ID

POSITIONAL ARGUMENTS
     [ACCOUNT]
        E-mail address of the service account.

REQUIRED FLAGS
     --key-file=KEY_FILE
        Path to the private key file.

OPTIONAL FLAGS
     At most one of these can be specified:

       --password-file=PASSWORD_FILE
          Path to a file containing the password for the service account
          private key (only for a .p12 file).

       --prompt-for-password
          Prompt for the password for the service account private key (only for
          a .p12 file).

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha auth activate-service-account

        $ gcloud beta auth activate-service-account
```

### gcloud beta auth activate-service-account

```text
NAME
    gcloud beta auth activate-service-account - authorize access to Google
        Cloud with a service account

SYNOPSIS
    gcloud beta auth activate-service-account [ACCOUNT] --key-file=KEY_FILE
        [--password-file=PASSWORD_FILE | --prompt-for-password]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha auth activate-service-account

```text
NAME
    gcloud alpha auth activate-service-account - authorize access to Google
        Cloud with a service account

SYNOPSIS
    gcloud alpha auth activate-service-account [ACCOUNT] --key-file=KEY_FILE
        [--password-file=PASSWORD_FILE | --prompt-for-password]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/auth/activate-service-account (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
