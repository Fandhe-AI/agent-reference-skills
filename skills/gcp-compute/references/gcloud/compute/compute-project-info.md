---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/project-info
---

# gcloud compute project-info

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute project-info add-metadata

```text
NAME
    gcloud compute project-info add-metadata - add or update project-wide
        metadata

SYNOPSIS
    gcloud compute project-info add-metadata
        [--metadata=KEY=VALUE,[KEY=VALUE,...]]
        [--metadata-from-file=KEY=LOCAL_FILE_PATH,[...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute project-info add-metadata can be used to add or update
    project-wide metadata. Every instance has access to a metadata server that
    can be used to query metadata that has been set through this tool.
    Project-wide metadata entries are visible to all instances. To set metadata
    for individual instances, use gcloud compute instances add-metadata. For
    information on metadata, see https://cloud.google.com/compute/docs/metadata

    Only metadata keys that are provided are mutated. Existing metadata entries
    will remain unaffected.

    If you are using this command to manage SSH keys for your project, please
    note the risks
    (https://docs.cloud.google.com/compute/docs/instances/access-overview#risks)
    of manual SSH key management as well as the required format for SSH key
    metadata, available at
    https://docs.cloud.google.com/compute/docs/connect/add-ssh-keys

FLAGS
     --metadata=KEY=VALUE,[KEY=VALUE,...]
        Metadata to be made available to the guest operating system running on
        the instances. Each metadata entry is a key/value pair separated by an
        equals sign. Each metadata key must be unique and have a max of 128
        bytes in length. Each value must have a max of 256 KB in length.
        Multiple arguments can be passed to this flag, e.g., --metadata
        key-1=value-1,key-2=value-2,key-3=value-3. The combined total size for
        all metadata entries is 512 KB.

        In images that have Compute Engine tools installed on them, such as the
        official images (https://cloud.google.com/compute/docs/images), the
        following metadata keys have special meanings:

         startup-script
            Specifies a script that will be executed by the instances once they
            start running. For convenience, --metadata-from-file can be used to
            pull the value from a file.

         startup-script-url
            Same as startup-script except that the script contents are pulled
            from a Cloud Storage location (e.g., gs://bucket/file.sh or
            https://storage.googleapis.com/bucket/file.sh).

            For startup scripts on Windows instances, the following metadata
            keys have special meanings: windows-startup-script-url,
            windows-startup-script-cmd, windows-startup-script-bat,
            windows-startup-script-ps1, sysprep-specialize-script-url,
            sysprep-specialize-script-cmd, sysprep-specialize-script-bat, and
            sysprep-specialize-script-ps1. For more information, see Running
            startup scripts
            (https://cloud.google.com/compute/docs/startupscript).

            At least one of [--metadata] or [--metadata-from-file] is required.

     --metadata-from-file=KEY=LOCAL_FILE_PATH,[...]
        Same as --metadata except that the value for the entry will be read
        from a local file. A value can be read from standard input by
        specifying ``-'' as the file path. This is useful for values that are
        too large such as startup-script contents.

        At least one of [--metadata] or [--metadata-from-file] is required.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute project-info add-metadata

        $ gcloud beta compute project-info add-metadata
```

### gcloud compute project-info describe

```text
NAME
    gcloud compute project-info describe - describe the Compute Engine project
        resource

SYNOPSIS
    gcloud compute project-info describe [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute project-info describe displays all data associated with the
    Compute Engine project resource. The project resource contains data such as
    global quotas, common instance metadata, and the project's creation time.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute project-info describe

        $ gcloud beta compute project-info describe
```

### gcloud compute project-info remove-metadata

```text
NAME
    gcloud compute project-info remove-metadata - remove project-wide metadata
        entries

SYNOPSIS
    gcloud compute project-info remove-metadata [--all | --keys=KEY,[KEY,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute project-info remove-metadata can be used to remove
    project-wide metadata entries.

FLAGS
     At most one of these can be specified:

       --all
          If provided, all metadata entries are removed.

       --keys=KEY,[KEY,...]
          The keys of the entries to remove.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute project-info remove-metadata

        $ gcloud beta compute project-info remove-metadata
```

### gcloud compute project-info update

```text
NAME
    gcloud compute project-info update - update a Compute Engine project
        resource

SYNOPSIS
    gcloud compute project-info update [--cloud-armor-tier=CLOUD_ARMOR_TIER]
        [--default-network-tier=DEFAULT_NETWORK_TIER] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute project-info update is used to update a Compute Engine
    project resource.

FLAGS
     --cloud-armor-tier=CLOUD_ARMOR_TIER
        Cloud armor tier to assign to the project. CLOUD_ARMOR_TIER must be one
        of: CA_STANDARD, CA_ENTERPRISE_PAYGO, CA_ENTERPRISE_ANNUAL.

     --default-network-tier=DEFAULT_NETWORK_TIER
        The default network tier to assign to the project. DEFAULT_NETWORK_TIER
        must be one of: PREMIUM, STANDARD.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute project-info update

        $ gcloud beta compute project-info update
```

### gcloud beta compute project-info add-metadata

```text
NAME
    gcloud beta compute project-info add-metadata - add or update project-wide
        metadata

SYNOPSIS
    gcloud beta compute project-info add-metadata
        [--metadata=KEY=VALUE,[KEY=VALUE,...]]
        [--metadata-from-file=KEY=LOCAL_FILE_PATH,[...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute project-info describe

```text
NAME
    gcloud beta compute project-info describe - describe the Compute Engine
        project resource

SYNOPSIS
    gcloud beta compute project-info describe [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute project-info remove-metadata

```text
NAME
    gcloud beta compute project-info remove-metadata - remove project-wide
        metadata entries

SYNOPSIS
    gcloud beta compute project-info remove-metadata
        [--all | --keys=KEY,[KEY,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute project-info update

```text
NAME
    gcloud beta compute project-info update - update a Compute Engine project
        resource

SYNOPSIS
    gcloud beta compute project-info update
        [--cloud-armor-tier=CLOUD_ARMOR_TIER]
        [--default-network-tier=DEFAULT_NETWORK_TIER]
        [--managed-protection-tier=MANAGED_PROTECTION_TIER]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute project-info add-metadata

```text
NAME
    gcloud alpha compute project-info add-metadata - add or update project-wide
        metadata

SYNOPSIS
    gcloud alpha compute project-info add-metadata
        [--metadata=KEY=VALUE,[KEY=VALUE,...]]
        [--metadata-from-file=KEY=LOCAL_FILE_PATH,[...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute project-info describe

```text
NAME
    gcloud alpha compute project-info describe - describe the Compute Engine
        project resource

SYNOPSIS
    gcloud alpha compute project-info describe [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute project-info remove-metadata

```text
NAME
    gcloud alpha compute project-info remove-metadata - remove project-wide
        metadata entries

SYNOPSIS
    gcloud alpha compute project-info remove-metadata
        [--all | --keys=KEY,[KEY,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute project-info set-default-service-account

```text
NAME
    gcloud alpha compute project-info set-default-service-account - set the
        default service account on the project

SYNOPSIS
    gcloud alpha compute project-info set-default-service-account
        [--service-account=SERVICE_ACCOUNT | --no-service-account]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute project-info update

```text
NAME
    gcloud alpha compute project-info update - update a Compute Engine project
        resource

SYNOPSIS
    gcloud alpha compute project-info update
        [--cloud-armor-tier=CLOUD_ARMOR_TIER]
        [--default-network-tier=DEFAULT_NETWORK_TIER]
        [--managed-protection-tier=MANAGED_PROTECTION_TIER]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/project-info (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
