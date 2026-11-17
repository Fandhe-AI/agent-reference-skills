---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/project-views
---

# gcloud compute project-views

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute project-views describe

```text
NAME
    gcloud compute project-views describe - describe the Compute Engine
        project-view resource

SYNOPSIS
    gcloud compute project-views describe --region=REGION [--project=PROJECT]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute project-views describe displays all data associated with the
    Compute Engine project-view resource.

EXAMPLES
    To describe the project-view resource for region us-central1:

        $ gcloud compute project-views describe --region=us-central1

REQUIRED FLAGS
     --region=REGION
        Region of the project view.

OPTIONAL FLAGS
     --project=PROJECT
        Project ID for this request.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the compute/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/compute/

NOTES
    These variants are also available:

        $ gcloud alpha compute project-views describe

        $ gcloud beta compute project-views describe
```

### gcloud beta compute project-views describe

```text
NAME
    gcloud beta compute project-views describe - describe the Compute Engine
        project-view resource

SYNOPSIS
    gcloud beta compute project-views describe --region=REGION
        [--project=PROJECT] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute project-views describe

```text
NAME
    gcloud alpha compute project-views describe - describe the Compute Engine
        project-view resource

SYNOPSIS
    gcloud alpha compute project-views describe --region=REGION
        [--project=PROJECT] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/project-views (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
