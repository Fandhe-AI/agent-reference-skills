---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/interconnects/wire-groups/create
---

# gcloud compute interconnects wire-groups create

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute interconnects wire-groups create

```text
NAME
    gcloud compute interconnects wire-groups create - create a Compute Engine
        wire group

SYNOPSIS
    gcloud compute interconnects wire-groups create NAME
        --bandwidth-allocation=BANDWIDTH_ALLOCATION
        --bandwidth-unmetered=BANDWIDTH_UNMETERED
        --cross-site-network=CROSS_SITE_NETWORK [--admin-enabled]
        [--description=DESCRIPTION] [--fault-response=FAULT_RESPONSE]
        [--validate-only] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute interconnects wire-groups create is used to create wire
    groups. A wire group represents a group of redundant wires between
    interconnects in two different metros. Each WireGroup belongs to a
    CrossSiteNetwork.

    For an example, refer to the EXAMPLES section below.

EXAMPLES
    To create a wire group, run:

        $ gcloud compute interconnects wire-groups create example-wg \
            --cross-site-network=example-csn --bandwidth-unmetered=1

POSITIONAL ARGUMENTS
     NAME
        Name of the wire group to create.

REQUIRED FLAGS
     --bandwidth-allocation=BANDWIDTH_ALLOCATION
        The bandwidth allocation for the wire group. BANDWIDTH_ALLOCATION must
        be one of:

         ALLOCATE_PER_WIRE
            Configures a separate unmetered bandwidth allocation (and
            associated charges) for each wire in the group.
         SHARED_WITH_WIRE_GROUP
            Configures one unmetered bandwidth allocation for the wire group.
            The unmetered bandwidth is divided equally across each wire in the
            group, but dynamic throttling reallocates unused unmetered
            bandwidth from unused or underused wires to other wires in the
            group.

     --bandwidth-unmetered=BANDWIDTH_UNMETERED
        The amount of unmetered bandwidth to assign to the wire group.

     --cross-site-network=CROSS_SITE_NETWORK
        Name of the crossSiteNetwork to operate on.

OPTIONAL FLAGS
     --admin-enabled
        Administrative status of the wire group. If not provided on creation,
        defaults to enabled. When this is enabled, the wire group is
        operational and will carry traffic. Use --no-admin-enabled to disable
        it.

     --description=DESCRIPTION
        An optional, textual description for the wire group.

     --fault-response=FAULT_RESPONSE
        The fault response for the wire group. FAULT_RESPONSE must be one of:

         DISABLE_PORT
            Disable port
         NONE
            None

     --validate-only
        Validate the new configuration, but don't update it.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute interconnects wire-groups create

        $ gcloud beta compute interconnects wire-groups create
```

### gcloud beta compute interconnects wire-groups create

```text
NAME
    gcloud beta compute interconnects wire-groups create - create a Compute
        Engine wire group

SYNOPSIS
    gcloud beta compute interconnects wire-groups create NAME
        --bandwidth-allocation=BANDWIDTH_ALLOCATION
        --bandwidth-unmetered=BANDWIDTH_UNMETERED
        --cross-site-network=CROSS_SITE_NETWORK [--admin-enabled]
        [--description=DESCRIPTION] [--fault-response=FAULT_RESPONSE]
        [--type=TYPE] [--validate-only] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute interconnects wire-groups create

```text
NAME
    gcloud alpha compute interconnects wire-groups create - create a Compute
        Engine wire group

SYNOPSIS
    gcloud alpha compute interconnects wire-groups create NAME
        --bandwidth-allocation=BANDWIDTH_ALLOCATION
        --bandwidth-unmetered=BANDWIDTH_UNMETERED
        --cross-site-network=CROSS_SITE_NETWORK [--admin-enabled]
        [--bandwidth-metered=BANDWIDTH_METERED] [--description=DESCRIPTION]
        [--fault-response=FAULT_RESPONSE] [--flow-management=FLOW_MANAGEMENT]
        [--network-service-class=NETWORK_SERVICE_CLASS] [--type=TYPE]
        [--validate-only] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Incomplete example: the `gcloud compute interconnects wire-groups create` example omits `--bandwidth-allocation`, which the SYNOPSIS requires (gcloud 593.0.0: "argument --bandwidth-allocation: Must be specified."). Add the required flag (see FLAGS on this page).
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/interconnects/wire-groups/create (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
