---
source: https://docs.cloud.google.com/sdk/gcloud/reference/auth/revoke
---

# gcloud auth revoke

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud auth revoke

```text
NAME
    gcloud auth revoke - revoke access credentials for an account

SYNOPSIS
    gcloud auth revoke [ACCOUNTS ...] [--all] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Revokes credentials for the specified user accounts, service accounts or
    external accounts (workload identity pools).

    When given a user account, this command revokes the user account token on
    the server. If the revocation is successful, or if the token has already
    been revoked, this command removes the credential from the local machine.

    When given a service account, this command does not revoke the service
    account token on the server because service account tokens are not
    revocable. Instead, it will print a warning and remove the credential from
    the local machine. When used with a service account, this command has only
    a local effect and the key associated with the service account is not
    deleted. This can be done by executing gcloud iam service-accounts keys
    delete after revoke.

    When given an external account (workload identity pool), whether
    impersonated or not, the command does not revoke the corresponding token on
    the server because these tokens are not revocable. The underlying external
    credentials (OIDC, AWS, etc.) used to generate these access tokens have to
    be revoked too, but gcloud has no control over that. Instead, it will print
    a warning and remove the credential from the local machine.

    If no account is specified, this command revokes credentials for the
    currently active account, effectively logging out of that account. If --all
    is given, the behaviors described above apply individually to each account
    in the list.

    You can revoke credentials when you want to prevent gcloud and other Google
    Cloud CLI tools from using the specified account. You do not need to revoke
    credentials to switch between accounts.

POSITIONAL ARGUMENTS
     [ACCOUNTS ...]
        Accounts whose credentials are to be revoked.

FLAGS
     --all
        Revoke credentials for all accounts.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha auth revoke

        $ gcloud beta auth revoke
```

### gcloud beta auth revoke

```text
NAME
    gcloud beta auth revoke - revoke access credentials for an account

SYNOPSIS
    gcloud beta auth revoke [ACCOUNTS ...] [--all] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha auth revoke

```text
NAME
    gcloud alpha auth revoke - revoke access credentials for an account

SYNOPSIS
    gcloud alpha auth revoke [ACCOUNTS ...] [--all] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/auth/revoke (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
