---
source: https://docs.cloud.google.com/sdk/gcloud/reference/auth/print-access-token
---

# gcloud auth print-access-token

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud auth print-access-token

```text
NAME
    gcloud auth print-access-token - print an access token for the specified
        account

SYNOPSIS
    gcloud auth print-access-token [ACCOUNT] [--lifetime=LIFETIME]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Print an access token for the specified account. See RFC6749
    (https://tools.ietf.org/html/rfc6749) for more information about access
    tokens.

    Note that token itself may not be enough to access some services. If you
    use the token with curl or similar tools, you may see permission errors
    similar to "API has not been used in project 32555940559 before or it is
    disabled.". If it happens, you may need to provide a quota project in the
    "X-Goog-User-Project" header. For example,

        $ curl -H "X-Goog-User-Project: your-project" \
            -H "Authorization: Bearer $(gcloud auth print-access-token)" \
            foo.googleapis.com

    The identity that granted the token must have the serviceusage.services.use
    permission on the provided project. See
    https://cloud.google.com/apis/docs/system-parameters for more information.

EXAMPLES
    To print access tokens:

        $ gcloud auth print-access-token

POSITIONAL ARGUMENTS
     [ACCOUNT]
        Account to get the access token for. If not specified, the current
        active account will be used.

FLAGS
     --lifetime=LIFETIME
        Access token lifetime. The default access token lifetime is 3600
        seconds, but you can use this flag to reduce the lifetime or extend it
        up to 43200 seconds (12 hours). The org policy constraint
        constraints/iam.allowServiceAccountCredentialLifetimeExtension must be
        set if you want to extend the lifetime beyond 3600 seconds. Note that
        this flag is for service account impersonation only, so it must be used
        together with the --impersonate-service-account flag.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha auth print-access-token

        $ gcloud beta auth print-access-token
```

Adapted (not in the official docs): runnable form of the example(s) above: the commands are rewritten so that they run as described (see Notes).

```bash
curl -H "X-Goog-User-Project: your-project" \
    -H "Authorization: Bearer $(gcloud auth print-access-token)" \
    https://foo.googleapis.com
```

### gcloud beta auth print-access-token

```text
NAME
    gcloud beta auth print-access-token - print an access token for the
        specified account

SYNOPSIS
    gcloud beta auth print-access-token [ACCOUNT] [--lifetime=LIFETIME]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha auth print-access-token

```text
NAME
    gcloud alpha auth print-access-token - print an access token for the
        specified account

SYNOPSIS
    gcloud alpha auth print-access-token [ACCOUNT] [--lifetime=LIFETIME]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the `curl` example that sends `Authorization: Bearer` with an access token passes the host `foo.googleapis.com` without a scheme, so curl uses plain HTTP and would send the token unencrypted; the runnable form uses `https://foo.googleapis.com` (replace `foo` with the API host).
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/auth/print-access-token (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
