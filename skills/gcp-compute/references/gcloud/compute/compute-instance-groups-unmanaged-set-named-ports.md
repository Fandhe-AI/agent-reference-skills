---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/instance-groups/unmanaged/set-named-ports
---

# gcloud compute instance-groups unmanaged set-named-ports

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute instance-groups unmanaged set-named-ports

```text
NAME
    gcloud compute instance-groups unmanaged set-named-ports - sets the list of
        named ports for an instance group

SYNOPSIS
    gcloud compute instance-groups unmanaged set-named-ports NAME
        --named-ports=[NAME:PORT,...] [--zone=ZONE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Named ports are key:value pairs metadata representing the service name and
    the port that it's running on. Named ports can be assigned to an instance
    group, which indicates that the service is available on all instances in
    the group. This information is used by Application Load Balancers and proxy
    Network Load Balancers.

    gcloud compute instance-groups unmanaged set-named-ports sets the list of
    named ports for all instances in an instance group.

    Note: Running this command will clear all existing named ports.

EXAMPLES
    For example, to apply the named ports to an entire instance group:

        $ gcloud compute instance-groups unmanaged set-named-ports \
            example-instance-group --named-ports=example-service:1111 \
            --zone=us-central1-a

    The above example will assign a name 'example-service' for port 1111 to the
    instance group called 'example-instance-group' in the us-central1-a zone.
    The command removes any named ports that are already set for this instance
    group.

    To clear named ports from instance group provide empty named ports list as
    parameter:

        $ gcloud compute instance-groups unmanaged set-named-ports \
            example-instance-group --named-ports="" --zone=us-central1-a

POSITIONAL ARGUMENTS
     NAME
        Name of the instance group to operate on.

REQUIRED FLAGS
     --named-ports=[NAME:PORT,...]
        The comma-separated list of key:value pairs representing the service
        name and the port that it is running on.

        To clear the list of named ports pass empty list as flag value. For
        example:

            $ gcloud compute instance-groups unmanaged set-named-ports \
                example-instance-group --named-ports ""

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

        $ gcloud alpha compute instance-groups unmanaged set-named-ports

        $ gcloud beta compute instance-groups unmanaged set-named-ports
```

### gcloud beta compute instance-groups unmanaged set-named-ports

```text
NAME
    gcloud beta compute instance-groups unmanaged set-named-ports - sets the
        list of named ports for an instance group

SYNOPSIS
    gcloud beta compute instance-groups unmanaged set-named-ports NAME
        --named-ports=[NAME:PORT,...] [--zone=ZONE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute instance-groups unmanaged set-named-ports

```text
NAME
    gcloud alpha compute instance-groups unmanaged set-named-ports - sets the
        list of named ports for an instance group

SYNOPSIS
    gcloud alpha compute instance-groups unmanaged set-named-ports NAME
        --named-ports=[NAME:PORT,...] [--zone=ZONE] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/instance-groups/unmanaged/set-named-ports (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
