---
source: https://docs.cloud.google.com/sdk/gcloud/reference/access-approval/service-account
---

# gcloud access-approval service-account

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud access-approval service-account get

```text
NAME
    gcloud access-approval service-account get - get Access Approval service
        account

SYNOPSIS
    gcloud access-approval service-account get
        [--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Retrieves the service account that is used by Access Approval to access KMS
    keys for signing approved approval requests.

EXAMPLES
    To get the service account for the current project use

        $ gcloud access-approval service-account get

    To get the service account for folder f1 use

        $ gcloud access-approval service-account get --folder=f1

    To get the service account for organization org1 use

        $ gcloud access-approval service-account get --organization=org1

FLAGS
     At most one of these can be specified:

       --folder=FOLDER
          Folder number. Only one of --project, --folder, or --organization can
          be provided. If none are provided then it uses config property
          [core/project].

       --organization=ORGANIZATION
          Organization number. Either --project, --folder, or --organization
          must be provided. If none are provided then it uses config property
          [core/project].

       --project=PROJECT
          Project number or id. Only one of --project, --folder, or
          --organization can be provided. If none are provided then it uses
          config property [core/project].

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.
```

## Notes

- Example error: the `--folder=f1` and `--organization=org1` examples pass values that gcloud 593.0.0 rejects ("Invalid value for [folder]: f1", "Invalid value for [organization]: org1"); the FLAGS describe `--folder` as "Folder number." and `--organization` as "Organization number.", so pass the numbers.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/access-approval/service-account (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
