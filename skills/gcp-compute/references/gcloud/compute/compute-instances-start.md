---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/instances/start
---

# gcloud compute instances start

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute instances start

```text
NAME
    gcloud compute instances start - start a stopped virtual machine instance

SYNOPSIS
    gcloud compute instances start INSTANCE_NAMES [INSTANCE_NAMES ...]
        [--async] [--csek-key-file=FILE] [--zone=ZONE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute instances start is used to start a stopped Compute Engine
    virtual machine. Only a stopped virtual machine can be started.

EXAMPLES
    To start a stopped instance named 'example-instance' in zone us-central1-a,
    run:

        $ gcloud compute instances start example-instance \
            --zone=us-central1-a

POSITIONAL ARGUMENTS
     INSTANCE_NAMES [INSTANCE_NAMES ...]
        Names of the instances to operate on. For details on valid instance
        names, refer to the criteria documented under the field 'name' at:
        https://cloud.google.com/compute/docs/reference/rest/v1/instances

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --csek-key-file=FILE
        (DEPRECATED) Path to a Customer-Supplied Encryption Key (CSEK) key file
        that maps Compute Engine resources to user managed keys to be used when
        creating, mounting, or taking snapshots of disks.

            If you pass `-` as value of the flag, the CSEK is read from stdin.
            See https://cloud.google.com/compute/docs/disks/customer-supplied-encryption for more details.

        The --csek-key-file flag is deprecated.

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

        $ gcloud alpha compute instances start

        $ gcloud beta compute instances start
```

### gcloud beta compute instances start

```text
NAME
    gcloud beta compute instances start - start a stopped virtual machine
        instance

SYNOPSIS
    gcloud beta compute instances start INSTANCE_NAMES [INSTANCE_NAMES ...]
        [--async] [--csek-key-file=FILE] [--zone=ZONE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute instances start

```text
NAME
    gcloud alpha compute instances start - start a stopped virtual machine
        instance

SYNOPSIS
    gcloud alpha compute instances start INSTANCE_NAMES [INSTANCE_NAMES ...]
        [--async] [--csek-key-file=FILE] [--zone=ZONE] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Deprecated (quoted from the 593.0.0 help; the migration target is the one the help names): `gcloud compute instances start --csek-key-file`: "The --csek-key-file flag is deprecated.".
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/instances/start (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
