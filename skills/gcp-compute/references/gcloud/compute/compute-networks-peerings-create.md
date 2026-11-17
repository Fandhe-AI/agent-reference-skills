---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/networks/peerings/create
---

# gcloud compute networks peerings create

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute networks peerings create

```text
NAME
    gcloud compute networks peerings create - create a Compute Engine network
        peering

SYNOPSIS
    gcloud compute networks peerings create NAME --network=NETWORK
        --peer-network=PEER_NETWORK [--async] [--auto-create-routes]
        [--export-custom-routes] [--export-subnet-routes-with-public-ip]
        [--import-custom-routes] [--import-subnet-routes-with-public-ip]
        [--peer-project=PEER_PROJECT] [--stack-type=STACK_TYPE]
        [--update-strategy=UPDATE_STRATEGY] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute networks peerings create is used to create peerings between
    virtual networks. Each side of a peering association is set up
    independently. Peering will be active only when the configuration from both
    sides matches.

EXAMPLES
    To create a network peering with the name 'peering-name' between the
    network 'local-network' and the network 'peer-network' which exports and
    imports custom routes and subnet routes with public IPs, run:

        $ gcloud compute networks peerings create peering-name \
            --network=local-network --peer-network=peer-network \
            --export-custom-routes --import-custom-routes \
            --export-subnet-routes-with-public-ip \
            --import-subnet-routes-with-public-ip

POSITIONAL ARGUMENTS
     NAME
        The name of the peering.

REQUIRED FLAGS
     --network=NETWORK
        The name of the network in the current project to be peered with the
        peer network.

     --peer-network=PEER_NETWORK
        The name of the network to be peered with the current network.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --auto-create-routes
        (DEPRECATED) If set, will automatically create routes for the network
        peering. Flag auto-create-routes is deprecated. Peer network subnet
        routes are always created in a network when peered.

        Flag --auto-create-routes is deprecated and will be removed in a future
        release.

     --export-custom-routes
        If set, the network will export custom routes to peer network. Use
        --no-export-custom-routes to disable it.

     --export-subnet-routes-with-public-ip
        If set, the network will export subnet routes with addresses in the
        public IP ranges to peer network. Use
        --no-export-subnet-routes-with-public-ip to disable it.

     --import-custom-routes
        If set, the network will import custom routes from peer network. Use
        --no-import-custom-routes to disable it.

     --import-subnet-routes-with-public-ip
        If set, the network will import subnet routes with addresses in the
        public IP ranges from peer network. Use
        --no-import-subnet-routes-with-public-ip to disable it.

     --peer-project=PEER_PROJECT
        The name of the project for the peer network. If not specified,
        defaults to current project.

     --stack-type=STACK_TYPE
        Stack type of the peering. If not specified, defaults to IPV4_ONLY.

        STACK_TYPE must be one of:

            IPV4_ONLY
               Only IPv4 traffic and routes will be exchanged across this peering.

            IPV4_IPV6
               IPv4 traffic and routes will be exchanged across this peering.
               IPv6 traffic and routes will be exchanged if the matching peering
               configuration also has stack_type set to IPV4_IPV6.

     --update-strategy=UPDATE_STRATEGY
        Update strategy of the peering. If not specified, defaults to
        INDEPENDENT.

        UPDATE_STRATEGY must be one of:

        INDEPENDENT Updates and deletes to the peering connection can be
        performed by either network admin.

        CONSENSUS Updates and deletes to the peering connection must be agreed
        upon by both network admins.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute networks peerings create

        $ gcloud beta compute networks peerings create
```

### gcloud beta compute networks peerings create

```text
NAME
    gcloud beta compute networks peerings create - create a Compute Engine
        network peering

SYNOPSIS
    gcloud beta compute networks peerings create NAME --network=NETWORK
        --peer-network=PEER_NETWORK [--async] [--auto-create-routes]
        [--export-custom-routes] [--export-subnet-routes-with-public-ip]
        [--import-custom-routes] [--import-subnet-routes-with-public-ip]
        [--peer-project=PEER_PROJECT] [--stack-type=STACK_TYPE]
        [--update-strategy=UPDATE_STRATEGY] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute networks peerings create

```text
NAME
    gcloud alpha compute networks peerings create - create a Compute Engine
        network peering

SYNOPSIS
    gcloud alpha compute networks peerings create NAME --network=NETWORK
        --peer-network=PEER_NETWORK [--async] [--auto-create-routes]
        [--export-custom-routes] [--export-subnet-routes-with-public-ip]
        [--import-custom-routes] [--import-subnet-routes-with-public-ip]
        [--peer-project=PEER_PROJECT] [--stack-type=STACK_TYPE]
        [--update-strategy=UPDATE_STRATEGY] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Deprecated (quoted from the 593.0.0 help; the migration target is the one the help names): `gcloud compute networks peerings create --auto-create-routes`: "Flag --auto-create-routes is deprecated and will be removed in a future release.".
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/networks/peerings/create (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
