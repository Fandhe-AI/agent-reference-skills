---
source: https://docs.cloud.google.com/sdk/gcloud/reference/resource-manager/boundary-configs
---

# gcloud resource-manager boundary-configs

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud resource-manager boundary-configs describe

```text
NAME
    gcloud resource-manager boundary-configs describe - describe a boundary
        configuration

SYNOPSIS
    gcloud resource-manager boundary-configs describe
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud resource-manager boundary-configs describe describes the boundary
    configuration under the specified organization or folder.

EXAMPLES
    To describe the boundary configuration in an organization with ID
    123456789012, run:

        $ gcloud resource-manager boundary-configs describe \
            --organization=123456789012

    To describe the boundary configuration in a folder with ID 456789012345,
    run:

        $ gcloud resource-manager boundary-configs describe \
            --folder=456789012345

REQUIRED FLAGS
     Exactly one of these must be specified:

       --folder=FOLDER_ID
          Folder ID.

       --organization=ORGANIZATION_ID
          Organization ID.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha resource-manager boundary-configs describe

        $ gcloud beta resource-manager boundary-configs describe
```

### gcloud resource-manager boundary-configs update

```text
NAME
    gcloud resource-manager boundary-configs update - update a boundary
        configuration

SYNOPSIS
    gcloud resource-manager boundary-configs update
        (--clear-tag-key | --tag-key=TAG_KEY)
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID) [--async]
        [--etag=ETAG] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud resource-manager boundary-configs update updates the boundary
    configuration under the specified organization or folder.

EXAMPLES
    To update the tag key of the boundary configuration in an organization with
    ID 123456789012, run:

        $ gcloud resource-manager boundary-configs update \
            --organization=123456789012 --tag-key=123456789012/env

    To update the tag key of the boundary configuration in a folder with ID
    456789012345, run:

        $ gcloud resource-manager boundary-configs update \
            --folder=456789012345 --tag-key=123456789012/env

    To clear the tag key of the boundary configuration in a folder with ID
    456789012345, run:

        $ gcloud resource-manager boundary-configs update \
            --folder=456789012345 --clear-tag-key

REQUIRED FLAGS
     Exactly one of these must be specified:

       --clear-tag-key
          Clear the tag key from the boundary config.

       --tag-key=TAG_KEY
          The namespaced name of the tag key (e.g. 123456789012/env).

     Exactly one of these must be specified:

       --folder=FOLDER_ID
          Folder ID.

       --organization=ORGANIZATION_ID
          Organization ID.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --etag=ETAG
        The etag of the boundary config.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha resource-manager boundary-configs update

        $ gcloud beta resource-manager boundary-configs update
```

### gcloud beta resource-manager boundary-configs describe

```text
NAME
    gcloud beta resource-manager boundary-configs describe - describe a
        boundary configuration

SYNOPSIS
    gcloud beta resource-manager boundary-configs describe
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta resource-manager boundary-configs update

```text
NAME
    gcloud beta resource-manager boundary-configs update - update a boundary
        configuration

SYNOPSIS
    gcloud beta resource-manager boundary-configs update
        (--clear-tag-key | --tag-key=TAG_KEY)
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID) [--async]
        [--etag=ETAG] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha resource-manager boundary-configs describe

```text
NAME
    gcloud alpha resource-manager boundary-configs describe - describe a
        boundary configuration

SYNOPSIS
    gcloud alpha resource-manager boundary-configs describe
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha resource-manager boundary-configs update

```text
NAME
    gcloud alpha resource-manager boundary-configs update - update a boundary
        configuration

SYNOPSIS
    gcloud alpha resource-manager boundary-configs update
        (--clear-tag-key | --tag-key=TAG_KEY)
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID) [--async]
        [--etag=ETAG] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/resource-manager/boundary-configs (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
