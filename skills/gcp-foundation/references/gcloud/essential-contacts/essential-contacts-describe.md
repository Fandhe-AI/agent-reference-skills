---
source: https://docs.cloud.google.com/sdk/gcloud/reference/essential-contacts/describe
---

# gcloud essential-contacts describe

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud essential-contacts describe

```text
NAME
    gcloud essential-contacts describe - describe an essential contact

SYNOPSIS
    gcloud essential-contacts describe CONTACT_ID
        [--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT]
        [GCLOUD_WIDE_FLAG ...]

EXAMPLES
    To describe the contact with id 123 in the current project, run:

        $ gcloud essential-contacts describe 123

    To describe the contact with id 123 in the folder with id 456, run:

        $ gcloud essential-contacts describe 123 --folder=456

    To describe the contact with id 123 in the organization with id 456, run:

        $ gcloud essential-contacts describe 123 --organization=456

POSITIONAL ARGUMENTS
     CONTACT_ID
        id of contact to describe.

FLAGS
     At most one of these can be specified:

       --folder=FOLDER
          folder number where contacts are set. If neither --project, --folder,
          nor --organization are provided then the config property
          [core/project] will be used as the resource.

       --organization=ORGANIZATION
          organization number where contacts are set. If neither --project,
          --folder, nor --organization are provided then the config property
          [core/project] will be used as the resource.

       --project=PROJECT
          project number or id where contacts are set. If neither --project,
          --folder, nor --organization are provided then the config property
          [core/project] will be used as the resource.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha essential-contacts describe

        $ gcloud beta essential-contacts describe
```

### gcloud beta essential-contacts describe

```text
NAME
    gcloud beta essential-contacts describe - describe an essential contact

SYNOPSIS
    gcloud beta essential-contacts describe CONTACT_ID
        [--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha essential-contacts describe

```text
NAME
    gcloud alpha essential-contacts describe - describe an essential contact

SYNOPSIS
    gcloud alpha essential-contacts describe CONTACT_ID
        [--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/essential-contacts/describe (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
