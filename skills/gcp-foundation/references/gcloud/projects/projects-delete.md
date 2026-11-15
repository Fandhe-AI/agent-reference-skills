---
source: https://docs.cloud.google.com/sdk/gcloud/reference/projects/delete
---

# gcloud projects delete

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud projects delete

```text
NAME
    gcloud projects delete - delete a project

SYNOPSIS
    gcloud projects delete PROJECT_ID_OR_NUMBER [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Deletes the project with the given project ID.

    This command can fail for the following reasons:
      o The project specified does not exist.
      o The active account does not have IAM role role/owner or another IAM
        role with the resourcemanager.projects.delete permission for the given
        project.

    See Access control for projects using IAM
    (https://cloud.google.com/resource-manager/docs/access-control-proj) for
    more information.

EXAMPLES
    The following command deletes the project with the ID example-foo-bar-1:

        $ gcloud projects delete example-foo-bar-1

POSITIONAL ARGUMENTS
     PROJECT_ID_OR_NUMBER
        ID or number for the project you want to delete.

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

        $ gcloud alpha projects delete

        $ gcloud beta projects delete
```

### gcloud beta projects delete

```text
NAME
    gcloud beta projects delete - delete a project

SYNOPSIS
    gcloud beta projects delete PROJECT_ID_OR_NUMBER
        [--recommend=BOOLEAN_VALUE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha projects delete

```text
NAME
    gcloud alpha projects delete - delete a project

SYNOPSIS
    gcloud alpha projects delete PROJECT_ID_OR_NUMBER
        [--recommend=BOOLEAN_VALUE] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/projects/delete (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
