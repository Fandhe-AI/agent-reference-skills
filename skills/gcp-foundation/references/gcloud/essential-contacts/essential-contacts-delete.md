---
source: https://docs.cloud.google.com/sdk/gcloud/reference/essential-contacts/delete
---

# gcloud essential-contacts delete

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud essential-contacts delete

```text
NAME
    gcloud essential-contacts delete - delete an essential contact

SYNOPSIS
    gcloud essential-contacts delete CONTACT_ID
        [--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT]
        [GCLOUD_WIDE_FLAG ...]

EXAMPLES
    To delete the contact with id 123 in the current project, run:

        $ gcloud essential-contacts delete 123

    To delete the contact with id 123 in the folder with id 456, run:

        $ gcloud essential-contacts delete 123 --folder=456

    To delete the contact with id 123 in the organization with id 456, run:

        $ gcloud essential-contacts delete 123 --organization=456

POSITIONAL ARGUMENTS
     CONTACT_ID
        id of contact to delete.

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

        $ gcloud alpha essential-contacts delete

        $ gcloud beta essential-contacts delete
```

### gcloud beta essential-contacts delete

```text
NAME
    gcloud beta essential-contacts delete - delete an essential contact

SYNOPSIS
    gcloud beta essential-contacts delete CONTACT_ID
        [--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha essential-contacts delete

```text
NAME
    gcloud alpha essential-contacts delete - delete an essential contact

SYNOPSIS
    gcloud alpha essential-contacts delete CONTACT_ID
        [--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/essential-contacts/delete (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
