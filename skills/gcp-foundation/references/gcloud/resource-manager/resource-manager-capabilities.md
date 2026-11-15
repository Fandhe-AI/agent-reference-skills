---
source: https://docs.cloud.google.com/sdk/gcloud/reference/resource-manager/capabilities
---

# gcloud resource-manager capabilities

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud resource-manager capabilities describe

```text
NAME
    gcloud resource-manager capabilities describe - show whether a Capability
        is enabled

SYNOPSIS
    gcloud resource-manager capabilities describe CAPABILITY_ID
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Command to show whether a Capability is enabled.

    This command can fail for the following reasons:
      o The capability specified does not exist.
      o The active account does not have permission to access the given
        folder/capability.

EXAMPLES
    The following command prints metadata for a capability with the ID
    folders/123/capabilities/app-management:

        $ gcloud resource-manager capabilities describe \
            "folders/123/capabilities/app-management"

POSITIONAL ARGUMENTS
     CAPABILITY_ID
        ID for the capability you want to describe.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha resource-manager capabilities describe

        $ gcloud beta resource-manager capabilities describe
```

### gcloud resource-manager capabilities update

```text
NAME
    gcloud resource-manager capabilities update - update a folder capability

SYNOPSIS
    gcloud resource-manager capabilities update CAPABILITY_ID --[no-]enable
        [--update-mask=UPDATE_MASK] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Command to Update/Set the value field of the Folder capability. This can be
    done by using the --enable flag to set the value to True, and the
    --no-enable flag to set the value to False.

    This command can fail for the following reasons:
      o There is no folder parenting the given capability name.
      o The active account does not have permission to update the given
        folder/capability.

EXAMPLES
    The following command updates a capability with the ID
    folders/123/capabilities/app-management to have the value True:

        $ gcloud resource-manager capabilities update \
            "folders/123/capabilities/app-management" --enable

    In order to set the value to False, the following command can be used:

        $ gcloud resource-manager capabilities update \
            "folders/123/capabilities/app-management" --no-enable

POSITIONAL ARGUMENTS
     CAPABILITY_ID
        ID for the capability you want to update.

REQUIRED FLAGS
     --[no-]enable
        Enable the Capability. Use --enable to enable and --no-enable to
        disable.

OPTIONAL FLAGS
     --update-mask=UPDATE_MASK
        Update Mask. This is an optional field, and the only valid value this
        can be set to currently is "value".

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha resource-manager capabilities update

        $ gcloud beta resource-manager capabilities update
```

### gcloud beta resource-manager capabilities describe

```text
NAME
    gcloud beta resource-manager capabilities describe - show whether a
        Capability is enabled

SYNOPSIS
    gcloud beta resource-manager capabilities describe CAPABILITY_ID
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta resource-manager capabilities update

```text
NAME
    gcloud beta resource-manager capabilities update - update a folder
        capability

SYNOPSIS
    gcloud beta resource-manager capabilities update CAPABILITY_ID
        --[no-]enable [--update-mask=UPDATE_MASK] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha resource-manager capabilities describe

```text
NAME
    gcloud alpha resource-manager capabilities describe - show whether a
        Capability is enabled

SYNOPSIS
    gcloud alpha resource-manager capabilities describe CAPABILITY_ID
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha resource-manager capabilities update

```text
NAME
    gcloud alpha resource-manager capabilities update - update a folder
        capability

SYNOPSIS
    gcloud alpha resource-manager capabilities update CAPABILITY_ID
        --[no-]enable [--update-mask=UPDATE_MASK] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/resource-manager/capabilities (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
