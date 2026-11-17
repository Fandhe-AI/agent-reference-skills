---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/routers/update
---

# gcloud compute routers update

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute routers update

```text
NAME
    gcloud compute routers update - update a Compute Engine router

SYNOPSIS
    gcloud compute routers update NAME [--advertisement-mode=MODE] [--asn=ASN]
        [--async] [--bgp-identifier-range=BGP_IDENTIFIER_RANGE]
        [--keepalive-interval=KEEPALIVE_INTERVAL] [--region=REGION]
        [--set-advertisement-groups=[GROUP,...]]
        [--set-advertisement-ranges=[CIDR_RANGE=DESC,...]]
        [--add-advertisement-groups=[GROUP,...]
          | --add-advertisement-ranges=[CIDR_RANGE=DESC,...]
          | --remove-advertisement-groups=[GROUP,...]
          | --remove-advertisement-ranges=[CIDR_RANGE,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute routers update is used to update a Compute Engine router.

POSITIONAL ARGUMENTS
     NAME
        Name of the router to update.

FLAGS
     --advertisement-mode=MODE
        The new advertisement mode for this router. MODE must be one of:

         CUSTOM
            Custom (user-configured) BGP advertisements.
         DEFAULT
            Default (Google-managed) BGP advertisements.

     --asn=ASN
        The optional BGP autonomous system number (ASN) for this router. Must
        be a 16-bit or 32-bit private ASN as defined in
        https://tools.ietf.org/html/rfc6996, for example --asn=64512.

     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --bgp-identifier-range=BGP_IDENTIFIER_RANGE
        The range of valid BGP Identifiers for this Router. Must be a
        link-local IPv4 range from 169.254.0.0/16, of size at least /30, even
        if the BGP sessions are over IPv6. It must not overlap with any IPv4
        BGP session ranges. This is commonly called "router ID" by other
        vendors.

     --keepalive-interval=KEEPALIVE_INTERVAL
        The interval between BGP keepalive messages that are sent to the peer.
        If set, this value must be between 20 and 60 seconds. The default is 20
        seconds. See $ gcloud topic datetimes for information on duration
        formats.

        BGP systems exchange keepalive messages to determine whether a link or
        host has failed or is no longer available. Hold time is the length of
        time in seconds that the BGP session is considered operational without
        any activity. After the hold time expires, the session is dropped.

        Hold time is three times the interval at which keepalive messages are
        sent, and the hold time is the maximum number of seconds allowed to
        elapse between successive keepalive messages that BGP receives from a
        peer. BGP will use the smaller of either the local hold time value or
        the peer's hold time value as the hold time for the BGP connection
        between the two peers.

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

     --set-advertisement-groups=[GROUP,...]
        The list of pre-defined groups of IP ranges to dynamically advertise on
        this router. This list can only be specified in custom advertisement
        mode.

        GROUP must be (only one value is supported):

         ALL_SUBNETS
            Automatically advertise all available subnets. This excludes any
            routes learned for subnets that use VPC Network Peering.

     --set-advertisement-ranges=[CIDR_RANGE=DESC,...]
        The list of individual IP ranges, in CIDR format, to dynamically
        advertise on this router. Each IP range can (optionally) be given a
        text description DESC. For example, to advertise a specific range, use
        --set-advertisement-ranges=192.168.10.0/24. To store a description with
        the range, use --set-advertisement-ranges=192.168.10.0/24=my-networks.
        This list can only be specified in custom advertisement mode.

     At most one of these can be specified:

       --add-advertisement-groups=[GROUP,...]
          A list of pre-defined groups of IP ranges to dynamically advertise on
          this router. This list is appended to any existing advertisements.
          This field can only be specified in custom advertisement mode.

          GROUP must be (only one value is supported):

           ALL_SUBNETS
              Automatically advertise all available subnets. This excludes any
              routes learned for subnets that use VPC Network Peering.

       --add-advertisement-ranges=[CIDR_RANGE=DESC,...]
          A list of individual IP ranges, in CIDR format, to dynamically
          advertise on this router. This list is appended to any existing
          advertisements. Each IP range can (optionally) be given a text
          description DESC. For example, to advertise a specific range, use
          --advertisement-ranges=192.168.10.0/24. To store a description with
          the range, use --advertisement-ranges=192.168.10.0/24=my-networks.
          This list can only be specified in custom advertisement mode.

       --remove-advertisement-groups=[GROUP,...]
          A list of pre-defined groups of IP ranges to remove from dynamic
          advertisement on this router. Each group in the list must exist in
          the current set of custom advertisements. This field can only be
          specified in custom advertisement mode.

          GROUP must be (only one value is supported):

           ALL_SUBNETS
              Automatically advertise all available subnets. This excludes any
              routes learned for subnets that use VPC Network Peering.

       --remove-advertisement-ranges=[CIDR_RANGE,...]
          A list of individual IP ranges, in CIDR format, to remove from
          dynamic advertisement on this router. Each IP range in the list must
          exist in the current set of custom advertisements. This field can
          only be specified in custom advertisement mode.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute routers update

        $ gcloud beta compute routers update
```

### gcloud beta compute routers update

```text
NAME
    gcloud beta compute routers update - update a Compute Engine router

SYNOPSIS
    gcloud beta compute routers update NAME [--advertisement-mode=MODE]
        [--asn=ASN] [--async] [--bgp-identifier-range=BGP_IDENTIFIER_RANGE]
        [--keepalive-interval=KEEPALIVE_INTERVAL] [--region=REGION]
        [--set-advertisement-groups=[GROUP,...]]
        [--set-advertisement-ranges=[CIDR_RANGE=DESC,...]]
        [--add-advertisement-groups=[GROUP,...]
          | --add-advertisement-ranges=[CIDR_RANGE=DESC,...]
          | --remove-advertisement-groups=[GROUP,...]
          | --remove-advertisement-ranges=[CIDR_RANGE,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute routers update

```text
NAME
    gcloud alpha compute routers update - update a Compute Engine router

SYNOPSIS
    gcloud alpha compute routers update NAME [--advertisement-mode=MODE]
        [--asn=ASN] [--async] [--bgp-identifier-range=BGP_IDENTIFIER_RANGE]
        [--keepalive-interval=KEEPALIVE_INTERVAL] [--region=REGION]
        [--set-advertisement-groups=[GROUP,...]]
        [--set-advertisement-ranges=[CIDR_RANGE=DESC,...]]
        [--add-advertisement-groups=[GROUP,...]
          | --add-advertisement-ranges=[CIDR_RANGE=DESC,...]
          | --remove-advertisement-groups=[GROUP,...]
          | --remove-advertisement-ranges=[CIDR_RANGE,...]]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Corrected from the official docs (the help text above is verbatim): the `--add-advertisement-ranges` description gives its examples as "--advertisement-ranges=192.168.10.0/24" and "--advertisement-ranges=192.168.10.0/24=my-networks", but the SYNOPSIS has no `--advertisement-ranges` flag (only `--set-advertisement-ranges`, `--add-advertisement-ranges` and `--remove-advertisement-ranges`); to append ranges, use `--add-advertisement-ranges=192.168.10.0/24` (or `--add-advertisement-ranges=192.168.10.0/24=my-networks`).
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/routers/update (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
