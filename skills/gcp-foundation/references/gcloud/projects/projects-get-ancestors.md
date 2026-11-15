---
source: https://docs.cloud.google.com/sdk/gcloud/reference/projects/get-ancestors
---

# gcloud projects get-ancestors

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud projects get-ancestors

```text
NAME
    gcloud projects get-ancestors - get the ancestors for a project

SYNOPSIS
    gcloud projects get-ancestors PROJECT_ID [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud projects get-ancestors displays the ancestors for a project.
    Projects may be grouped under folders and an organization. This comand will
    print the folder and organization hierarchy for the given project.

EXAMPLES
    To print the ancestors for a project with ID my-project, run:

        $ gcloud projects get-ancestors my-project

POSITIONAL ARGUMENTS
     Project resource - The project for which to display ancestors. This
     represents a Cloud resource.

     This must be specified.

       PROJECT_ID
          ID of the project or fully qualified identifier for the project.

          To set the project_id attribute:
          + provide the argument project_id on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the cloudresourcemanager/v1 API. The full documentation
    for this API can be found at: https://cloud.google.com/resource-manager

NOTES
    These variants are also available:

        $ gcloud alpha projects get-ancestors

        $ gcloud beta projects get-ancestors
```

### gcloud beta projects get-ancestors

```text
NAME
    gcloud beta projects get-ancestors - get the ancestors for a project

SYNOPSIS
    gcloud beta projects get-ancestors PROJECT_ID [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha projects get-ancestors

```text
NAME
    gcloud alpha projects get-ancestors - get the ancestors for a project

SYNOPSIS
    gcloud alpha projects get-ancestors PROJECT_ID [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/projects/get-ancestors (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
