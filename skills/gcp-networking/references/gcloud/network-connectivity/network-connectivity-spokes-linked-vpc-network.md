---
source: https://docs.cloud.google.com/sdk/gcloud/reference/network-connectivity/spokes/linked-vpc-network
---

# gcloud network-connectivity spokes linked-vpc-network

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud network-connectivity spokes linked-vpc-network create

```text
NAME
    gcloud network-connectivity spokes linked-vpc-network create - create a new
        VPC spoke

SYNOPSIS
    gcloud network-connectivity spokes linked-vpc-network create SPOKE
        --hub=HUB --vpc-network=VPC_NETWORK [--async]
        [--description=DESCRIPTION] [--exclude-export-ranges=[CIDR_RANGE,...]]
        [--global] [--group=GROUP] [--include-export-ranges=[CIDR_RANGE,...]]
        [--labels=[KEY=VALUE,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a new VPC spoke.

EXAMPLES
    To create a VPC spoke named myspoke, run:

        $ gcloud network-connectivity spokes linked-vpc-network create \
             myspoke \
             --hub=https://www.googleapis.com/networkconnectivity/v1/\
         projects/my-project/locations/global/hubs/my-hub --global \
             --vpc-network=https://www.googleapis.com/compute/v1/projects/\
         my-project/global/networks/my-vpc

POSITIONAL ARGUMENTS
     Spoke resource - Name of the spoke to create. This represents a Cloud
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument spoke on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument spoke on the command line with a fully specified
        name;
      * provide the argument --global on the command line.

     This must be specified.

       SPOKE
          ID of the spoke or fully qualified identifier for the spoke.

          To set the spoke attribute:
          + provide the argument spoke on the command line.

REQUIRED FLAGS
     --hub=HUB
        Hub that the spoke will attach to. The hub must already exist.

     --vpc-network=VPC_NETWORK
        VPC network that the spoke provides connectivity to. The resource must
        already exist.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --description=DESCRIPTION
        Description of the spoke to create.

     --exclude-export-ranges=[CIDR_RANGE,...]
        Subnet IP address range(s) to hide from other VPC networks that are
        connected through Network Connectivity Center.

     --global
        Indicates that the spoke is global.

     --group=GROUP
        Group that the spoke will be part of. The group must already exist.

     --include-export-ranges=[CIDR_RANGE,...]
        Subnet IP address range(s) to export to other VPC networks that are
        connected through Network Connectivity Center.

     --labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to add.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the networkconnectivity/v1 API. The full documentation
    for this API can be found at:
    https://cloud.google.com/network-connectivity/docs/reference/networkconnectivity/rest

NOTES
    This variant is also available:

        $ gcloud beta network-connectivity spokes linked-vpc-network create
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud network-connectivity spokes linked-vpc-network create myspoke \
    --hub=https://www.googleapis.com/networkconnectivity/v1/projects/my-project/locations/global/hubs/my-hub \
    --global \
    --vpc-network=https://www.googleapis.com/compute/v1/projects/my-project/global/networks/my-vpc
```

### gcloud network-connectivity spokes linked-vpc-network update

```text
NAME
    gcloud network-connectivity spokes linked-vpc-network update - update a VPC
        spoke

SYNOPSIS
    gcloud network-connectivity spokes linked-vpc-network update SPOKE
        [--async] [--description=DESCRIPTION]
        [--exclude-export-ranges=[CIDR_RANGE,...]] [--global]
        [--include-export-ranges=[CIDR_RANGE,...]]
        [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update the details of a VPC spoke.

EXAMPLES
    To update the description of a global VPC spoke named my-spoke, run:

        $ gcloud network-connectivity spokes linked-vpc-network update \
             myspoke --global --description="new spoke description"

POSITIONAL ARGUMENTS
     Spoke resource - Name of the spoke to update. This represents a Cloud
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument spoke on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument spoke on the command line with a fully specified
        name;
      * provide the argument --global on the command line.

     This must be specified.

       SPOKE
          ID of the spoke or fully qualified identifier for the spoke.

          To set the spoke attribute:
          + provide the argument spoke on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --description=DESCRIPTION
        New description of the spoke.

     --exclude-export-ranges=[CIDR_RANGE,...]
        New exclude export ranges of the spoke.

     --global
        Indicates that the spoke is global.

     --include-export-ranges=[CIDR_RANGE,...]
        New include export ranges of the spoke.

     --update-labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to update. If a label exists, its value
        is modified. Otherwise, a new label is created.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

     At most one of these can be specified:

       --clear-labels
          Remove all labels. If --update-labels is also specified then
          --clear-labels is applied first.

          For example, to remove all labels:

              $ gcloud network-connectivity spokes linked-vpc-network update \
                --clear-labels

          To remove all existing labels and create two new labels, foo and baz:

              $ gcloud network-connectivity spokes linked-vpc-network update \
                --clear-labels --update-labels foo=bar,baz=qux

       --remove-labels=[KEY,...]
          List of label keys to remove. If a label does not exist it is
          silently ignored. If --update-labels is also specified then
          --update-labels is applied first.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the networkconnectivity/v1 API. The full documentation
    for this API can be found at:
    https://cloud.google.com/network-connectivity/docs/reference/networkconnectivity/rest

NOTES
    This variant is also available:

        $ gcloud beta network-connectivity spokes linked-vpc-network update
```

### gcloud beta network-connectivity spokes linked-vpc-network create

```text
NAME
    gcloud beta network-connectivity spokes linked-vpc-network create - create
        a new VPC spoke

SYNOPSIS
    gcloud beta network-connectivity spokes linked-vpc-network create SPOKE
        --hub=HUB --vpc-network=VPC_NETWORK [--async]
        [--description=DESCRIPTION] [--exclude-export-ranges=[CIDR_RANGE,...]]
        [--global] [--group=GROUP] [--include-export-ranges=[CIDR_RANGE,...]]
        [--labels=[KEY=VALUE,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-connectivity spokes linked-vpc-network update

```text
NAME
    gcloud beta network-connectivity spokes linked-vpc-network update - update
        a VPC spoke

SYNOPSIS
    gcloud beta network-connectivity spokes linked-vpc-network update SPOKE
        [--async] [--description=DESCRIPTION]
        [--exclude-export-ranges=[CIDR_RANGE,...]] [--global]
        [--include-export-ranges=[CIDR_RANGE,...]]
        [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/network-connectivity/spokes/linked-vpc-network (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
