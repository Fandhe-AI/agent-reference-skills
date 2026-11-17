---
source: https://docs.cloud.google.com/sdk/gcloud/reference/dns/project-info
---

# gcloud dns project-info

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud dns project-info describe

```text
NAME
    gcloud dns project-info describe - view Cloud DNS related information for a
        project

SYNOPSIS
    gcloud dns project-info describe PROJECT_ID [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command displays Cloud DNS related information for your project
    including quotas for various resources and operations.

EXAMPLES
    To display Cloud DNS related information for your project, run:

        $ gcloud dns project-info describe my_project_id

POSITIONAL ARGUMENTS
     PROJECT_ID
        The identifier for the project you want DNS related info for.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha dns project-info describe

        $ gcloud beta dns project-info describe
```

### gcloud beta dns project-info describe

```text
NAME
    gcloud beta dns project-info describe - view Cloud DNS related information
        for a project

SYNOPSIS
    gcloud beta dns project-info describe PROJECT_ID [--location=LOCATION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dns project-info describe

```text
NAME
    gcloud alpha dns project-info describe - view Cloud DNS related information
        for a project

SYNOPSIS
    gcloud alpha dns project-info describe PROJECT_ID [--location=LOCATION]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/dns/project-info (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
