---
source: https://docs.cloud.google.com/sdk/gcloud/reference/auth/enterprise-certificate-config
---

# gcloud auth enterprise-certificate-config

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud auth enterprise-certificate-config create linux

```text
NAME
    gcloud auth enterprise-certificate-config create linux - create an
        enterprise-certificate configuration file for Linux

SYNOPSIS
    gcloud auth enterprise-certificate-config create linux --label=LABEL
        --module=MODULE --slot=SLOT [--ecp=ECP] [--ecp-client=ECP_CLIENT]
        [--ecp-http-proxy=ECP_HTTP_PROXY] [--output-file=OUTPUT_FILE]
        [--user-pin=USER_PIN] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command creates a configuration file used by gcloud to use the
    enterprise-certificate-proxy component for mTLS.

EXAMPLES
    To create a credential configuration run:

        $ gcloud auth enterprise-certificate-config create linux \
            --module=$PATH_TO_PKCS11_MODULE --slot=$PKCS11_SLOT_ID \
            --label=$PKCS11_OBJECT_LABEL --user-pin=$PKCS11_USER_PIN

REQUIRED FLAGS
     --label=LABEL
        The PKCS #11 label for the target credentials. The certificate, public
        key, and private key MUST have the same label.
        enterprise-certificate-proxy will use all three objects.

     --module=MODULE
        The full file path to the PKCS #11 module.

     --slot=SLOT
        The PKCS #11 slot containing the target credentials.

OPTIONAL FLAGS
     --ecp=ECP
        Provide a custom path to the enterprise-certificate-proxy binary. This
        flag must be the full path to the binary.

     --ecp-client=ECP_CLIENT
        Provide a custom path to the enterprise-certificate-proxy shared client
        library. This flag must be the full path to the shared library.

     --ecp-http-proxy=ECP_HTTP_PROXY
        Provide a custom path to the ECP HTTP proxy binary. This flag must be
        the full path to the binary.

     --output-file=OUTPUT_FILE
        Override the file path that the enterprise-certificate-proxy
        configuration is written to.

     --user-pin=USER_PIN
        The user pin used to login to the PKCS #11 module. If there is no user
        pin leave this field empty.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha auth enterprise-certificate-config create linux

        $ gcloud beta auth enterprise-certificate-config create linux
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined and `$VARIABLE` placeholders are quoted.

```bash
gcloud auth enterprise-certificate-config create linux \
    --module="${PATH_TO_PKCS11_MODULE}" \
    --slot="${PKCS11_SLOT_ID}" \
    --label="${PKCS11_OBJECT_LABEL}" \
    --user-pin="${PKCS11_USER_PIN}"
```

### gcloud auth enterprise-certificate-config create macos

```text
NAME
    gcloud auth enterprise-certificate-config create macos - create an
        enterprise-certificate configuration file for MacOS

SYNOPSIS
    gcloud auth enterprise-certificate-config create macos --issuer=ISSUER
        [--ecp=ECP] [--ecp-client=ECP_CLIENT] [--ecp-http-proxy=ECP_HTTP_PROXY]
        [--keychain-type=KEYCHAIN_TYPE; default="all"]
        [--output-file=OUTPUT_FILE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command creates a configuration file used by gcloud to use the
    enterprise-certificate-proxy component for mTLS.

EXAMPLES
    To create a credential configuration run:

        $ gcloud auth enterprise-certificate-config create macos \
            --issuer=$CERT_ISSUER

REQUIRED FLAGS
     --issuer=ISSUER
        The certificate issuer.

OPTIONAL FLAGS
     --ecp=ECP
        Provide a custom path to the enterprise-certificate-proxy binary. This
        flag must be the full path to the binary.

     --ecp-client=ECP_CLIENT
        Provide a custom path to the enterprise-certificate-proxy shared client
        library. This flag must be the full path to the shared library.

     --ecp-http-proxy=ECP_HTTP_PROXY
        Provide a custom path to the ECP HTTP proxy binary. This flag must be
        the full path to the binary.

     --keychain-type=KEYCHAIN_TYPE; default="all"
        Specify the target keychain(s) for certificate lookup.Accepted values
        are "login", "system", or "all". If omitted,defaults to "all". Use
        "all" to include custom keychains.

     --output-file=OUTPUT_FILE
        Override the file path that the enterprise-certificate-proxy
        configuration is written to.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha auth enterprise-certificate-config create macos

        $ gcloud beta auth enterprise-certificate-config create macos
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined and `$VARIABLE` placeholders are quoted.

```bash
gcloud auth enterprise-certificate-config create macos \
    --issuer="${CERT_ISSUER}"
```

### gcloud auth enterprise-certificate-config create windows

```text
NAME
    gcloud auth enterprise-certificate-config create windows - create an
        enterprise-certificate configuration file for Windows

SYNOPSIS
    gcloud auth enterprise-certificate-config create windows --issuer=ISSUER
        --provider=PROVIDER --store=STORE [--ecp=ECP] [--ecp-client=ECP_CLIENT]
        [--ecp-http-proxy=ECP_HTTP_PROXY] [--output-file=OUTPUT_FILE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command creates a configuration file used by gcloud to use the
    enterprise-certificate-proxy component for mTLS.

EXAMPLES
    To create a credential configuration run:

        $ gcloud auth enterprise-certificate-config create windows \
            --issuer=$CERT_ISSUER --store=$STORE --provider=$PROVIDER

REQUIRED FLAGS
     --issuer=ISSUER
        The certificate issuer.

     --provider=PROVIDER
        The Windows secure store provider.

     --store=STORE
        The Windows secure store.

OPTIONAL FLAGS
     --ecp=ECP
        Provide a custom path to the enterprise-certificate-proxy binary. This
        flag must be the full path to the binary.

     --ecp-client=ECP_CLIENT
        Provide a custom path to the enterprise-certificate-proxy shared client
        library. This flag must be the full path to the shared library.

     --ecp-http-proxy=ECP_HTTP_PROXY
        Provide a custom path to the ECP HTTP proxy binary. This flag must be
        the full path to the binary.

     --output-file=OUTPUT_FILE
        Override the file path that the enterprise-certificate-proxy
        configuration is written to.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha auth enterprise-certificate-config create windows

        $ gcloud beta auth enterprise-certificate-config create windows
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined and `$VARIABLE` placeholders are quoted.

```bash
gcloud auth enterprise-certificate-config create windows \
    --issuer="${CERT_ISSUER}" \
    --store="${STORE}" \
    --provider="${PROVIDER}"
```

### gcloud beta auth enterprise-certificate-config create linux

```text
NAME
    gcloud beta auth enterprise-certificate-config create linux - create an
        enterprise-certificate configuration file for Linux

SYNOPSIS
    gcloud beta auth enterprise-certificate-config create linux --label=LABEL
        --module=MODULE --slot=SLOT [--ecp=ECP] [--ecp-client=ECP_CLIENT]
        [--ecp-http-proxy=ECP_HTTP_PROXY] [--output-file=OUTPUT_FILE]
        [--user-pin=USER_PIN] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta auth enterprise-certificate-config create macos

```text
NAME
    gcloud beta auth enterprise-certificate-config create macos - create an
        enterprise-certificate configuration file for MacOS

SYNOPSIS
    gcloud beta auth enterprise-certificate-config create macos --issuer=ISSUER
        [--ecp=ECP] [--ecp-client=ECP_CLIENT] [--ecp-http-proxy=ECP_HTTP_PROXY]
        [--keychain-type=KEYCHAIN_TYPE; default="all"]
        [--output-file=OUTPUT_FILE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta auth enterprise-certificate-config create windows

```text
NAME
    gcloud beta auth enterprise-certificate-config create windows - create an
        enterprise-certificate configuration file for Windows

SYNOPSIS
    gcloud beta auth enterprise-certificate-config create windows
        --issuer=ISSUER --provider=PROVIDER --store=STORE [--ecp=ECP]
        [--ecp-client=ECP_CLIENT] [--ecp-http-proxy=ECP_HTTP_PROXY]
        [--output-file=OUTPUT_FILE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha auth enterprise-certificate-config create linux

```text
NAME
    gcloud alpha auth enterprise-certificate-config create linux - create an
        enterprise-certificate configuration file for Linux

SYNOPSIS
    gcloud alpha auth enterprise-certificate-config create linux --label=LABEL
        --module=MODULE --slot=SLOT [--ecp=ECP] [--ecp-client=ECP_CLIENT]
        [--ecp-http-proxy=ECP_HTTP_PROXY] [--output-file=OUTPUT_FILE]
        [--user-pin=USER_PIN] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha auth enterprise-certificate-config create macos

```text
NAME
    gcloud alpha auth enterprise-certificate-config create macos - create an
        enterprise-certificate configuration file for MacOS

SYNOPSIS
    gcloud alpha auth enterprise-certificate-config create macos
        --issuer=ISSUER [--ecp=ECP] [--ecp-client=ECP_CLIENT]
        [--ecp-http-proxy=ECP_HTTP_PROXY]
        [--keychain-type=KEYCHAIN_TYPE; default="all"]
        [--output-file=OUTPUT_FILE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha auth enterprise-certificate-config create windows

```text
NAME
    gcloud alpha auth enterprise-certificate-config create windows - create an
        enterprise-certificate configuration file for Windows

SYNOPSIS
    gcloud alpha auth enterprise-certificate-config create windows
        --issuer=ISSUER --provider=PROVIDER --store=STORE [--ecp=ECP]
        [--ecp-client=ECP_CLIENT] [--ecp-http-proxy=ECP_HTTP_PROXY]
        [--output-file=OUTPUT_FILE] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/auth/enterprise-certificate-config (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
