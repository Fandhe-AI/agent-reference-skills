---
source: https://docs.cloud.google.com/sdk/gcloud/reference/run/compose
---

# gcloud run compose

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud run compose up

```text
NAME
    gcloud run compose up - deploy to Cloud Run from compose specification

SYNOPSIS
    gcloud run compose up [COMPOSE_FILE] [--[no-]allow-unauthenticated]
        [--dry-run] [--region=REGION] [--build | --no-build]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Deploy to Cloud Run from compose specification.

    The below attribute in the Compose file specifies the service to be used as
    the ingress container in Cloud Run. Only one service can be designated as
    the ingress container.

        x-google-cloudrun:
          ingress-container: true

EXAMPLES
    To deploy a container from the source Compose file on Cloud Run:

        $ gcloud run compose up compose.yaml

    To deploy to Cloud Run with unauthenticated access:

        $ gcloud run compose up compose.yaml --allow-unauthenticated

POSITIONAL ARGUMENTS
     [COMPOSE_FILE]
        The compose yaml file to deploy from a Compose directory to Cloud Run.

FLAGS
     --[no-]allow-unauthenticated
        Whether to enable allowing unauthenticated access to the service. This
        may take a few moments to take effect. Use --allow-unauthenticated to
        enable and --no-allow-unauthenticated to disable.

     --dry-run
        If set to true, only validates the configuration. The configuration is
        not applied.

     --region=REGION
        Region in which the resource can be found. Alternatively, set the
        property [run/region].

     At most one of these can be specified:

       --build
          Force build of images.

       --no-build
          Skip building from source if applicable.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha run compose up

        $ gcloud beta run compose up
```

### gcloud beta run compose up

```text
NAME
    gcloud beta run compose up - deploy to Cloud Run from compose specification

SYNOPSIS
    gcloud beta run compose up [COMPOSE_FILE] [--[no-]allow-unauthenticated]
        [--dry-run] [--region=REGION] [--build | --no-build]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha run compose up

```text
NAME
    gcloud alpha run compose up - deploy to Cloud Run from compose
        specification

SYNOPSIS
    gcloud alpha run compose up [COMPOSE_FILE] [--[no-]allow-unauthenticated]
        [--dry-run] [--region=REGION] [--build | --no-build]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Public access: `--allow-unauthenticated` lets anyone on the internet invoke the deployed services (see https://docs.cloud.google.com/run/docs/authenticating/public); use it only for intentionally public services and omit it otherwise.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/run/compose (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
