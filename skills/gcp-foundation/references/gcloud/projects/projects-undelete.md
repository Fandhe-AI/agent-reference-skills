---
source: https://docs.cloud.google.com/sdk/gcloud/reference/projects/undelete
---

# gcloud projects undelete

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud projects undelete

```text
NAME
    gcloud projects undelete - undelete a project

SYNOPSIS
    gcloud projects undelete PROJECT_ID_OR_NUMBER [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Undeletes the project with the given project ID.

    This command can fail for the following reasons:
      o There is no project with the given ID.
      o The active account does not have Owner or Editor permissions for the
        given project.

EXAMPLES
    The following command undeletes the project with the ID example-foo-bar-1:

        $ gcloud projects undelete example-foo-bar-1

POSITIONAL ARGUMENTS
     PROJECT_ID_OR_NUMBER
        ID or number for the project you want to undelete.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

SEE ALSO
    See https://support.google.com/cloud/answer/6251787 for information on
    creating or deleting projects from the Google Cloud Platform Console.

NOTES
    These variants are also available:

        $ gcloud alpha projects undelete

        $ gcloud beta projects undelete
```

### gcloud beta projects undelete

```text
NAME
    gcloud beta projects undelete - undelete a project

SYNOPSIS
    gcloud beta projects undelete PROJECT_ID_OR_NUMBER [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha projects undelete

```text
NAME
    gcloud alpha projects undelete - undelete a project

SYNOPSIS
    gcloud alpha projects undelete PROJECT_ID_OR_NUMBER [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/projects/undelete (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
