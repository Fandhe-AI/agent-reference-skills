---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/os-config/project-feature-settings
---

# gcloud compute os-config project-feature-settings

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute os-config project-feature-settings describe

```text
NAME
    gcloud compute os-config project-feature-settings describe - get all VM
        Manager project feature settings

SYNOPSIS
    gcloud compute os-config project-feature-settings describe
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Get all VM Manager project feature settings.

EXAMPLES
    To get project feature settings for project my-project:

        $ gcloud compute os-config project-feature-settings describe \
           --project=my-project

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the osconfig/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/compute/docs/osconfig/rest
```

### gcloud compute os-config project-feature-settings update

```text
NAME
    gcloud compute os-config project-feature-settings update - update VM
        Manager project feature settings

SYNOPSIS
    gcloud compute os-config project-feature-settings update
        --patch-and-config-feature-set=PATCH_AND_CONFIG_FEATURE_SET
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update VM Manager project feature settings.

EXAMPLES
    To update project feature settings for project my-project:

        $ gcloud compute os-config project-feature-settings update \
           --project=my-project --patch-and-config-feature-set=full

REQUIRED FLAGS
     --patch-and-config-feature-set=PATCH_AND_CONFIG_FEATURE_SET
        Specifies the feature set for VM Manager. PATCH_AND_CONFIG_FEATURE_SET
        must be one of:

         full
            Full set of VM Manager functionality (alias for osconfig-c).
         limited
            Limited feature set. Enables only the basic set of features (alias
            for osconfig-b).
         osconfig-b
            Limited feature set. Enables only the basic set of features.
         osconfig-c
            Full set of VM Manager functionality.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the osconfig/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/compute/docs/osconfig/rest
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/os-config/project-feature-settings (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
