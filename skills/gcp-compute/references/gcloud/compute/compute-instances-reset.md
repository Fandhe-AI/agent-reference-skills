---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/instances/reset
---

# gcloud compute instances reset

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute instances reset

```text
NAME
    gcloud compute instances reset - reset a virtual machine instance

SYNOPSIS
    gcloud compute instances reset INSTANCE_NAMES [INSTANCE_NAMES ...]
        [--zone=ZONE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute instances reset is used to perform a hard reset on a Compute
    Engine virtual machine.

    This will not perform a clean shutdown of the guest OS on the instance.

EXAMPLES
    To reset an instance named test-instance, run:

        $ gcloud compute instances reset test-instance

POSITIONAL ARGUMENTS
     INSTANCE_NAMES [INSTANCE_NAMES ...]
        Names of the instances to operate on. For details on valid instance
        names, refer to the criteria documented under the field 'name' at:
        https://cloud.google.com/compute/docs/reference/rest/v1/instances

FLAGS
     --zone=ZONE
        Zone of the instances to operate on. If not specified, you might be
        prompted to select a zone (interactive mode only). gcloud attempts to
        identify the appropriate zone by searching for resources in your
        currently active project. If the zone cannot be determined, gcloud
        prompts you for a selection with all available Google Cloud Platform
        zones.

        To avoid prompting when this flag is omitted, the user can set the
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

        $ gcloud alpha compute instances reset

        $ gcloud beta compute instances reset
```

### gcloud beta compute instances reset

```text
NAME
    gcloud beta compute instances reset - reset a virtual machine instance

SYNOPSIS
    gcloud beta compute instances reset INSTANCE_NAMES [INSTANCE_NAMES ...]
        [--zone=ZONE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute instances reset

```text
NAME
    gcloud alpha compute instances reset - reset a virtual machine instance

SYNOPSIS
    gcloud alpha compute instances reset INSTANCE_NAMES [INSTANCE_NAMES ...]
        [--zone=ZONE] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/instances/reset (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
