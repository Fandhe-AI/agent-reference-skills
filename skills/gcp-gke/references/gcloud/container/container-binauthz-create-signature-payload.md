---
source: https://docs.cloud.google.com/sdk/gcloud/reference/container/binauthz/create-signature-payload
---

# gcloud container binauthz create-signature-payload

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud container binauthz create-signature-payload

```text
NAME
    gcloud container binauthz create-signature-payload - create a JSON
        container image signature object

SYNOPSIS
    gcloud container binauthz create-signature-payload
        --artifact-url=ARTIFACT_URL [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Given a container image URL specified by the manifest digest, this command
    will produce a JSON object whose signature is expected by Cloud Binary
    Authorization.

EXAMPLES
    To output serialized JSON to sign, run:

        $ gcloud container binauthz create-signature-payload \
          --artifact-url="gcr.io/example-project/example-image@sha256:abcd\
        "

REQUIRED FLAGS
     --artifact-url=ARTIFACT_URL
        Container URL. May be in the gcr.io/repository/image format, or may
        optionally contain the http or https scheme

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha container binauthz create-signature-payload

        $ gcloud beta container binauthz create-signature-payload
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud container binauthz create-signature-payload \
    --artifact-url="gcr.io/example-project/example-image@sha256:abcd"
```

### gcloud beta container binauthz create-signature-payload

```text
NAME
    gcloud beta container binauthz create-signature-payload - create a JSON
        container image signature object

SYNOPSIS
    gcloud beta container binauthz create-signature-payload
        --artifact-url=ARTIFACT_URL [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container binauthz create-signature-payload

```text
NAME
    gcloud alpha container binauthz create-signature-payload - create a JSON
        container image signature object

SYNOPSIS
    gcloud alpha container binauthz create-signature-payload
        --artifact-url=ARTIFACT_URL [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/container/binauthz/create-signature-payload (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
