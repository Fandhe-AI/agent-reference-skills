---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/instances/delete-access-config
---

# gcloud compute instances delete-access-config

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute instances delete-access-config

```text
NAME
    gcloud compute instances delete-access-config - delete an access
        configuration from a virtual machine network interface

SYNOPSIS
    gcloud compute instances delete-access-config INSTANCE_NAME
        [--access-config-name=ACCESS_CONFIG_NAME; default="external-nat"]
        [--network-interface=NETWORK_INTERFACE; default="nic0"] [--zone=ZONE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute instances delete-access-config is used to delete access
    configurations from network interfaces of Compute Engine virtual machines.
    Access configurations let you assign a public, external IP to a virtual
    machine. The delete-access-config operation removes external IP from the
    instance interface. If there is traffic routed to the external IP, after
    deleting the access config operation, traffic to the external IP will not
    reach the VM anymore.

EXAMPLES
    To remove the externally accessible IP from a virtual machine named
    example-instance in zone us-central1-a, run:

        $ gcloud compute instances delete-access-config example-instance \
            --zone=us-central1-a

POSITIONAL ARGUMENTS
     INSTANCE_NAME
        Name of the instance to operate on. For details on valid instance
        names, refer to the criteria documented under the field 'name' at:
        https://cloud.google.com/compute/docs/reference/rest/v1/instances

FLAGS
     --access-config-name=ACCESS_CONFIG_NAME; default="external-nat"
        Specifies the name of the access configuration to delete. external-nat
        is used as the default if this flag is not provided.

     --network-interface=NETWORK_INTERFACE; default="nic0"
        Specifies the name of the network interface from which to delete the
        access configuration. If this is not provided, then nic0 is used as the
        default.

     --zone=ZONE
        Zone of the instance to operate on. If not specified, you might be
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

        $ gcloud alpha compute instances delete-access-config

        $ gcloud beta compute instances delete-access-config
```

### gcloud beta compute instances delete-access-config

```text
NAME
    gcloud beta compute instances delete-access-config - delete an access
        configuration from a virtual machine network interface

SYNOPSIS
    gcloud beta compute instances delete-access-config INSTANCE_NAME
        [--access-config-name=ACCESS_CONFIG_NAME; default="external-nat"]
        [--network-interface=NETWORK_INTERFACE; default="nic0"] [--zone=ZONE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute instances delete-access-config

```text
NAME
    gcloud alpha compute instances delete-access-config - delete an access
        configuration from a virtual machine network interface

SYNOPSIS
    gcloud alpha compute instances delete-access-config INSTANCE_NAME
        [--access-config-name=ACCESS_CONFIG_NAME; default="external-nat"]
        [--network-interface=NETWORK_INTERFACE; default="nic0"] [--zone=ZONE]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/instances/delete-access-config (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
