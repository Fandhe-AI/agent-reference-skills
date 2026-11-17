---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/interconnects/groups/update
---

# gcloud compute interconnects groups update

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute interconnects groups update

```text
NAME
    gcloud compute interconnects groups update - update a Compute Engine
        interconnect group

SYNOPSIS
    gcloud compute interconnects groups update NAME [--description=DESCRIPTION]
        [--intended-topology-capability=INTENDED_TOPOLOGY_CAPABILITY]
        [--interconnects=[INTERCONNECT,...]] [--update-mask=UPDATE_MASK]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute interconnects groups update is used to update interconnect
    groups.

    For an example, refer to the EXAMPLES section below.

EXAMPLES
    To update an interconnect group example-interconnect-group's intended
    topology capability to PRODUCTION_CRITICAL, run:

        $ gcloud compute interconnects groups update \
            example-interconnect-group \
            --intended-topology-capability=PRODUCTION_CRITICAL

    To update an interconnect group example-interconnect-group's description to
    "example interconnect group description", run:

        $ gcloud compute interconnects groups update \
            example-interconnect-group \
            --description="example interconnect group description"

    To update an interconnect group example-interconnect-group's member
    interconnects to interconnect-1 and interconnect-2, run:

        $ gcloud compute interconnects groups update \
            example-interconnect-group \
            --interconnects=interconnect-1,interconnect-2 \
            --update-mask=interconnects

    Although you can add or remove member interconnects using this command, it
    is recommended to add or remove member interconnects using the add-members
    and remove-members commands.

POSITIONAL ARGUMENTS
     NAME
        Name of the interconnect group to update.

FLAGS
     --description=DESCRIPTION
        An optional, textual description for the interconnect group.

     --intended-topology-capability=INTENDED_TOPOLOGY_CAPABILITY
        The reliability the user intends this group to be capable of, in terms
        of the Interconnect product SLAs.

     --interconnects=[INTERCONNECT,...]
        Member interconnects to set the interconnect group to contain.

     --update-mask=UPDATE_MASK
        Optional update mask to specify which fields to update. Use commas to
        separate masks. If not specified, all fields present in the command
        will be updated.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute interconnects groups update

        $ gcloud beta compute interconnects groups update
```

### gcloud beta compute interconnects groups update

```text
NAME
    gcloud beta compute interconnects groups update - update a Compute Engine
        interconnect group

SYNOPSIS
    gcloud beta compute interconnects groups update NAME
        [--description=DESCRIPTION]
        [--intended-topology-capability=INTENDED_TOPOLOGY_CAPABILITY]
        [--interconnects=[INTERCONNECT,...]] [--update-mask=UPDATE_MASK]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute interconnects groups update

```text
NAME
    gcloud alpha compute interconnects groups update - update a Compute Engine
        interconnect group

SYNOPSIS
    gcloud alpha compute interconnects groups update NAME
        [--description=DESCRIPTION]
        [--intended-topology-capability=INTENDED_TOPOLOGY_CAPABILITY]
        [--interconnects=[INTERCONNECT,...]] [--update-mask=UPDATE_MASK]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/interconnects/groups/update (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
