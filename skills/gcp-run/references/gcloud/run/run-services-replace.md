---
source: https://docs.cloud.google.com/sdk/gcloud/reference/run/services/replace
---

# gcloud run services replace

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud run services replace

```text
NAME
    gcloud run services replace - create or replace a service from a YAML
        service specification

SYNOPSIS
    gcloud run services replace [FILE] [--async] [--dry-run] [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Creates or replaces a service from a YAML service specification.

EXAMPLES
    To replace the specification for a service defined in myservice.yaml

        $ gcloud run services replace myservice.yaml

POSITIONAL ARGUMENTS
     [FILE]
        The absolute path to the YAML file with a Knative service definition
        for the service to update or deploy. Defaults to service.yaml if not
        specified.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --dry-run
        If set to true, only validates the configuration. The configuration is
        not applied.

     --region=REGION
        Region in which the resource can be found. Alternatively, set the
        property [run/region].

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha run services replace

        $ gcloud beta run services replace
```

### gcloud beta run services replace

```text
NAME
    gcloud beta run services replace - create or replace a service from a YAML
        service specification

SYNOPSIS
    gcloud beta run services replace [FILE] [--async] [--dry-run]
        [--endpoint-mode=ENDPOINT_MODE] [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha run services replace

```text
NAME
    gcloud alpha run services replace - create or replace a service from a YAML
        service specification

SYNOPSIS
    gcloud alpha run services replace [FILE] [--async] [--dry-run]
        [--endpoint-mode=ENDPOINT_MODE] [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/run/services/replace (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
