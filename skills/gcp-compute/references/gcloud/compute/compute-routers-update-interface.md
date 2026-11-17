---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/routers/update-interface
---

# gcloud compute routers update-interface

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute routers update-interface

```text
NAME
    gcloud compute routers update-interface - update an interface on a Compute
        Engine router

SYNOPSIS
    gcloud compute routers update-interface NAME
        --interface-name=INTERFACE_NAME [--ip-version=IP_VERSION]
        [--region=REGION]
        [--interconnect-attachment=INTERCONNECT_ATTACHMENT
          | --interconnect-attachment-region=INTERCONNECT_ATTACHMENT_REGION
          | --vpn-tunnel=VPN_TUNNEL | --vpn-tunnel-region=VPN_TUNNEL_REGION]
        [--ip-address=IP_ADDRESS --mask-length=MASK_LENGTH]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute routers update-interface is used to update an interface on a
    Compute Engine router.

POSITIONAL ARGUMENTS
     NAME
        Name of the router to update.

REQUIRED FLAGS
     --interface-name=INTERFACE_NAME
        The name of the interface being updated.

OPTIONAL FLAGS
     --ip-version=IP_VERSION
        IP version of the interface. Possible values are IPV4 and IPV6.
        Defaults to IPV4. IP_VERSION must be one of:

         IPV4
            Interface with IPv4-based BGP.
         IPV6
            Interface with IPv6-based BGP.

     --region=REGION
        Region of the router to update. If not specified, you might be prompted
        to select a region (interactive mode only).

        To avoid prompting when this flag is omitted, you can set the
        compute/region property:

            $ gcloud config set compute/region REGION

        A list of regions can be fetched by running:

            $ gcloud compute regions list

        To unset the property, run:

            $ gcloud config unset compute/region

        Alternatively, the region can be stored in the environment variable
        CLOUDSDK_COMPUTE_REGION.

     At most one of these can be specified:

       --interconnect-attachment=INTERCONNECT_ATTACHMENT
          The interconnect attachment of the interface being updated.

       --interconnect-attachment-region=INTERCONNECT_ATTACHMENT_REGION
          Region of the interconnectAttachment to operate on. If not specified
          it will be set to the region of the router. Overrides the default
          compute/region property value for this command invocation.

       --vpn-tunnel=VPN_TUNNEL
          The tunnel of the interface being updated.

       --vpn-tunnel-region=VPN_TUNNEL_REGION
          Region of the vpn tunnel to operate on. If not specified it will be
          set to the region of the router. Overrides the default compute/region
          property value for this command invocation.

     The IP range of the interface, such as 192.0.2.0/24 or 2001:db8::/32. If
     either flag is specified, both must be specified.

     --ip-address=IP_ADDRESS
        The link local (IPv4) or ULA (IPv6) address of the router for this
        interface.

        This flag argument must be specified if any of the other arguments in
        this group are specified.

     --mask-length=MASK_LENGTH
        The subnet mask for the IP range of the interface. The interface IP
        address and BGP peer IP address must be selected from the subnet
        defined by this range.

        This flag argument must be specified if any of the other arguments in
        this group are specified.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute routers update-interface

        $ gcloud beta compute routers update-interface
```

### gcloud beta compute routers update-interface

```text
NAME
    gcloud beta compute routers update-interface - update an interface on a
        Compute Engine router

SYNOPSIS
    gcloud beta compute routers update-interface NAME
        --interface-name=INTERFACE_NAME [--ip-version=IP_VERSION]
        [--region=REGION]
        [--interconnect-attachment=INTERCONNECT_ATTACHMENT
          | --interconnect-attachment-region=INTERCONNECT_ATTACHMENT_REGION
          | --vpn-tunnel=VPN_TUNNEL | --vpn-tunnel-region=VPN_TUNNEL_REGION]
        [--ip-address=IP_ADDRESS --mask-length=MASK_LENGTH]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute routers update-interface

```text
NAME
    gcloud alpha compute routers update-interface - update an interface on a
        Compute Engine router

SYNOPSIS
    gcloud alpha compute routers update-interface NAME
        --interface-name=INTERFACE_NAME [--ip-version=IP_VERSION]
        [--region=REGION]
        [--interconnect-attachment=INTERCONNECT_ATTACHMENT
          | --interconnect-attachment-region=INTERCONNECT_ATTACHMENT_REGION
          | --vpn-tunnel=VPN_TUNNEL | --vpn-tunnel-region=VPN_TUNNEL_REGION]
        [--ip-address=IP_ADDRESS --mask-length=MASK_LENGTH]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/routers/update-interface (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
