---
source: https://docs.cloud.google.com/sdk/gcloud/reference/projects/update
---

# gcloud projects update

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud projects update

```text
NAME
    gcloud projects update - update the name of a project

SYNOPSIS
    gcloud projects update PROJECT_ID --name=NAME [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update the name of the given project.

    This command can fail for the following reasons:
      o There is no project with the given ID.
      o The active account does not have Owner or Editor permissions for the
        given project.

EXAMPLES
    The following command updates a project with the ID example-foo-bar-1 to
    have the name Foo Bar & Grill:

        $ gcloud projects update example-foo-bar-1 --name="Foo Bar & Grill"

POSITIONAL ARGUMENTS
     PROJECT_ID
        ID for the project you want to update.

REQUIRED FLAGS
     --name=NAME
        New name for the project.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha projects update

        $ gcloud beta projects update
```

### gcloud beta projects update

```text
NAME
    gcloud beta projects update - update the name of a project

SYNOPSIS
    gcloud beta projects update PROJECT_ID --name=NAME [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha projects update

```text
NAME
    gcloud alpha projects update - update the name and/or labels of a project

SYNOPSIS
    gcloud alpha projects update PROJECT_ID_OR_NUMBER
        (--name=NAME --update-labels=[KEY=VALUE,...] --clear-labels
          | --remove-labels=[KEY,...]) [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/projects/update (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
