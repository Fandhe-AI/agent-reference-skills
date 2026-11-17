---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/instance-groups/unmanaged/remove-instances
---

# gcloud compute instance-groups unmanaged remove-instances

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute instance-groups unmanaged remove-instances

```text
NAME
    gcloud compute instance-groups unmanaged remove-instances - removes
        resources from an unmanaged instance group by instance name

SYNOPSIS
    gcloud compute instance-groups unmanaged remove-instances NAME
        --instances=INSTANCE,[INSTANCE,...] [--zone=ZONE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute instance-groups unmanaged remove-instances removes instances
    from an unmanaged instance group using the instance name.

    This does not delete the actual instance resources but removes it from the
    instance group.

POSITIONAL ARGUMENTS
     NAME
        Name of the instance group to operate on.

REQUIRED FLAGS
     --instances=INSTANCE,[INSTANCE,...]
        The names of the instances to remove from the instance group.

OPTIONAL FLAGS
     --zone=ZONE
        Zone of the instance group to operate on. If not specified and the
        compute/zone property isn't set, you might be prompted to select a zone
        (interactive mode only).

        To avoid prompting when this flag is omitted, you can set the
        compute/zone property:

            $ gcloud config set compute/zone ZONE

        A list of zones can be fetched by running:

            $ gcloud compute zones list

        To unset the property, run:

            $ gcloud config unset compute/zone

        Alternatively, the zone can be stored in the environment variable
        CLOUDSDK_COMPUTE_ZONE.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute instance-groups unmanaged remove-instances

        $ gcloud beta compute instance-groups unmanaged remove-instances
```

### gcloud beta compute instance-groups unmanaged remove-instances

```text
NAME
    gcloud beta compute instance-groups unmanaged remove-instances - removes
        resources from an unmanaged instance group by instance name

SYNOPSIS
    gcloud beta compute instance-groups unmanaged remove-instances NAME
        --instances=INSTANCE,[INSTANCE,...] [--zone=ZONE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute instance-groups unmanaged remove-instances

```text
NAME
    gcloud alpha compute instance-groups unmanaged remove-instances - removes
        resources from an unmanaged instance group by instance name

SYNOPSIS
    gcloud alpha compute instance-groups unmanaged remove-instances NAME
        --instances=INSTANCE,[INSTANCE,...] [--zone=ZONE]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/instance-groups/unmanaged/remove-instances (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
