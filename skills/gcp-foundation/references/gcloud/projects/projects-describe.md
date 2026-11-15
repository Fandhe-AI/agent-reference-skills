---
source: https://docs.cloud.google.com/sdk/gcloud/reference/projects/describe
---

# gcloud projects describe

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud projects describe

```text
NAME
    gcloud projects describe - show metadata for a project

SYNOPSIS
    gcloud projects describe PROJECT_ID_OR_NUMBER [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Shows metadata for a project given a valid project ID.

    This command can fail for the following reasons:
      o The project specified does not exist.
      o The active account does not have permission to access the given
        project.

EXAMPLES
    The following command prints metadata for a project with the ID
    example-foo-bar-1:

        $ gcloud projects describe example-foo-bar-1

POSITIONAL ARGUMENTS
     PROJECT_ID_OR_NUMBER
        ID or number for the project you want to describe.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha projects describe

        $ gcloud beta projects describe
```

### gcloud beta projects describe

```text
NAME
    gcloud beta projects describe - show metadata for a project

SYNOPSIS
    gcloud beta projects describe PROJECT_ID_OR_NUMBER [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha projects describe

```text
NAME
    gcloud alpha projects describe - show metadata for a project

SYNOPSIS
    gcloud alpha projects describe PROJECT_ID_OR_NUMBER [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/projects/describe (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
