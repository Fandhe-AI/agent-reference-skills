---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/interconnects/groups/create
---

# gcloud compute interconnects groups create

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute interconnects groups create

```text
NAME
    gcloud compute interconnects groups create - create a Compute Engine
        interconnect group

SYNOPSIS
    gcloud compute interconnects groups create NAME
        --intended-topology-capability=INTENDED_TOPOLOGY_CAPABILITY
        [--description=DESCRIPTION] [--interconnects=[INTERCONNECT,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute interconnects groups create is used to create interconnect
    groups. An interconnect group connects a set of redundant interconnects
    between Google and the customer.

    For an example, refer to the EXAMPLES section below.

EXAMPLES
    To create an interconnect group capable of PRODUCTION_CRITICAL, run:

        $ gcloud compute interconnects groups create \
            example-interconnect-group \
            --intended-topology-capability=PRODUCTION_CRITICAL \
            --description="Example interconnect group"

    It is easy to add members to an existing interconnect group after creation
    using the add-members command.

    To create an interconnect group capable of PRODUCTION_NON_CRITICAL, with
    two members at creation time, run:

        $ gcloud compute interconnects groups create \
            example-interconnect-group \
            --intended-topology-capability=PRODUCTION_NON_CRITICAL \
            --interconnects=interconnect-1,interconnect-2

POSITIONAL ARGUMENTS
     NAME
        Name of the interconnect group to create.

REQUIRED FLAGS
     --intended-topology-capability=INTENDED_TOPOLOGY_CAPABILITY
        The reliability the user intends this group to be capable of, in terms
        of the Interconnect product SLAs.

OPTIONAL FLAGS
     --description=DESCRIPTION
        An optional, textual description for the interconnect group.

     --interconnects=[INTERCONNECT,...]
        Member interconnects to add to the interconnect group initially.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute interconnects groups create

        $ gcloud beta compute interconnects groups create
```

### gcloud beta compute interconnects groups create

```text
NAME
    gcloud beta compute interconnects groups create - create a Compute Engine
        interconnect group

SYNOPSIS
    gcloud beta compute interconnects groups create NAME
        --intended-topology-capability=INTENDED_TOPOLOGY_CAPABILITY
        [--description=DESCRIPTION] [--interconnects=[INTERCONNECT,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute interconnects groups create

```text
NAME
    gcloud alpha compute interconnects groups create - create a Compute Engine
        interconnect group

SYNOPSIS
    gcloud alpha compute interconnects groups create NAME
        --intended-topology-capability=INTENDED_TOPOLOGY_CAPABILITY
        [--description=DESCRIPTION] [--interconnects=[INTERCONNECT,...]]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/interconnects/groups/create (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
