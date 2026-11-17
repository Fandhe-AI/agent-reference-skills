---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/routers/nats/rules
---

# gcloud compute routers nats rules

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute routers nats rules create

```text
NAME
    gcloud compute routers nats rules create - add a Rule to a Compute Engine
        NAT

SYNOPSIS
    gcloud compute routers nats rules create RULE_NUMBER --match=MATCH
        --nat=NAT --router=ROUTER [--async] [--region=REGION]
        [--source-nat-active-ips=IP_ADDRESS,[IP_ADDRESS,...]]
        [--source-nat-active-ranges=SUBNETWORK,[SUBNETWORK,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute routers nats rules create is used to create a Rule on a
    Compute Engine NAT.

EXAMPLES
    Create a rule to use the IP Address address-1 to talk to destination IPs in
    the CIDR Range "203.0.113.0/24".

        $ gcloud compute routers nats rules create 1 --nat=my-nat \
            --router=my-router --region=us-central1 \
            --match='inIpRange(destination.ip, "203.0.113.0/24")' \
            --source-nat-active-ips=a1

POSITIONAL ARGUMENTS
     RULE_NUMBER
        Number that uniquely identifies the Rule to create

REQUIRED FLAGS
     --match=MATCH
        CEL Expression used to identify traffic to which this rule applies.

        * Supported attributes (Public NAT): destination.ip
        * Supported attributes (Private NAT): nexthop.hub
        * Supported methods (Public Nat): inIpRange
        * Supported operators (Public NAT): ||, ==
        * Supported operators (Private NAT): ==

        Examples of allowed Match expressions (Public NAT):
        * 'inIpRange(destination.ip, "203.0.113.0/24")''
        * 'destination.ip == "203.0.113.7"'
        * 'destination.ip == "203.0.113.7" || inIpRange(destination.ip,
          "203.0.113.16/25")'

        Example of allowed Match expression (Private NAT):
        * nexthop.hub ==
          "//networkconnectivity.googleapis.com/projects/p1/locations/global/hubs/h1"

     --nat=NAT
        Name of the NAT that contains the Rule

     --router=ROUTER
        Router to use for NAT.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --region=REGION
        Region of the NAT to create. If not specified, you might be prompted to
        select a region (interactive mode only).

        To avoid prompting when this flag is omitted, you can set the
        compute/region property:

            $ gcloud config set compute/region REGION

        A list of regions can be fetched by running:

            $ gcloud compute regions list

        To unset the property, run:

            $ gcloud config unset compute/region

        Alternatively, the region can be stored in the environment variable
        CLOUDSDK_COMPUTE_REGION.

     --source-nat-active-ips=IP_ADDRESS,[IP_ADDRESS,...]
        External IP Addresses to use for connections matching this rule. This
        flag is supported only for Public NAT and is required when creating a
        Public NAT gateway.

        These must be valid reserved external IP addresses in the same region.

     --source-nat-active-ranges=SUBNETWORK,[SUBNETWORK,...]
        Subnetworks from which addresses are used for connections matching this
        rule. This flag is supported only for Private NAT and is required when
        creating a Private NAT gateway.

        These must be subnetwork resources in the same region, with purpose set
        to PRIVATE_NAT.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute routers nats rules create

        $ gcloud beta compute routers nats rules create
```

### gcloud compute routers nats rules delete

```text
NAME
    gcloud compute routers nats rules delete - delete a Rule in a Compute
        Engine NAT

SYNOPSIS
    gcloud compute routers nats rules delete RULE_NUMBER [RULE_NUMBER ...]
        --nat=NAT --router=ROUTER [--region=REGION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute routers nats rules delete is used to delete a Rule on a
    Compute Engine NAT.

EXAMPLES
    To delete Rule 1 in NAT 'n1' in router 'r1', run:

        $ gcloud compute routers nats rules delete 1 --nat=n1 --router=r1 \
            --region=us-central1

POSITIONAL ARGUMENTS
     RULE_NUMBER [RULE_NUMBER ...]
        Number that uniquely identifies the Rules to operate on

REQUIRED FLAGS
     --nat=NAT
        Name of the NAT that contains the Rule

     --router=ROUTER
        Router to use for NAT.

OPTIONAL FLAGS
     --region=REGION
        Region of the NAT containing the Rules to delete. If not specified, you
        might be prompted to select a region (interactive mode only).

        To avoid prompting when this flag is omitted, you can set the
        compute/region property:

            $ gcloud config set compute/region REGION

        A list of regions can be fetched by running:

            $ gcloud compute regions list

        To unset the property, run:

            $ gcloud config unset compute/region

        Alternatively, the region can be stored in the environment variable
        CLOUDSDK_COMPUTE_REGION.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute routers nats rules delete

        $ gcloud beta compute routers nats rules delete
```

### gcloud compute routers nats rules describe

```text
NAME
    gcloud compute routers nats rules describe - describe a Rule in a Compute
        Engine NAT

SYNOPSIS
    gcloud compute routers nats rules describe RULE_NUMBER --nat=NAT
        --router=ROUTER [--region=REGION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute routers nats rules describe is used to describe a Rule on a
    Compute Engine NAT.

EXAMPLES
    To describe Rule 1 in NAT 'n1' in router 'r1', run:

        $ gcloud compute routers nats rules describe 1 --nat=n1 \
            --router=r1 --region=us-central1

POSITIONAL ARGUMENTS
     RULE_NUMBER
        Number that uniquely identifies the Rule to operate on

REQUIRED FLAGS
     --nat=NAT
        Name of the NAT that contains the Rule

     --router=ROUTER
        Router to use for NAT.

OPTIONAL FLAGS
     --region=REGION
        Region of the NAT containing the Rule to describe. If not specified,
        you might be prompted to select a region (interactive mode only).

        To avoid prompting when this flag is omitted, you can set the
        compute/region property:

            $ gcloud config set compute/region REGION

        A list of regions can be fetched by running:

            $ gcloud compute regions list

        To unset the property, run:

            $ gcloud config unset compute/region

        Alternatively, the region can be stored in the environment variable
        CLOUDSDK_COMPUTE_REGION.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute routers nats rules describe

        $ gcloud beta compute routers nats rules describe
```

### gcloud compute routers nats rules list

```text
NAME
    gcloud compute routers nats rules list - lists the NATs on a Compute Engine
        router

SYNOPSIS
    gcloud compute routers nats rules list --nat=NAT --router=ROUTER
        [--region=REGION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute routers nats rules list is used to list the Rule on a
    Compute Engine NAT.

EXAMPLES
    To list all Rules in Nat n1 in router r1 in region us-central1, run:

        $ gcloud compute routers nats rules list --nat=n1 --router=r1 \
          --region=us-central1.

REQUIRED FLAGS
     --nat=NAT
        Name of the NAT that contains the Rule

     --router=ROUTER
        Router to use for NAT.

OPTIONAL FLAGS
     --region=REGION
        Region of the NAT containing the Rules to list. If not specified, you
        might be prompted to select a region (interactive mode only).

        To avoid prompting when this flag is omitted, you can set the
        compute/region property:

            $ gcloud config set compute/region REGION

        A list of regions can be fetched by running:

            $ gcloud compute regions list

        To unset the property, run:

            $ gcloud config unset compute/region

        Alternatively, the region can be stored in the environment variable
        CLOUDSDK_COMPUTE_REGION.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute routers nats rules list

        $ gcloud beta compute routers nats rules list
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud compute routers nats rules list \
    --nat=n1 \
    --router=r1 \
    --region=us-central1
```

### gcloud compute routers nats rules update

```text
NAME
    gcloud compute routers nats rules update - update a Rule in a Compute
        Engine NAT

SYNOPSIS
    gcloud compute routers nats rules update RULE_NUMBER --nat=NAT
        --router=ROUTER [--async] [--match=MATCH] [--region=REGION]
        [--source-nat-active-ips=IP_ADDRESS,[IP_ADDRESS,...]]
        [--source-nat-active-ranges=SUBNETWORK,[SUBNETWORK,...]]
        [--clear-source-nat-drain-ips
          | --source-nat-drain-ips=IP_ADDRESS,[IP_ADDRESS,...]]
        [--clear-source-nat-drain-ranges
          | --source-nat-drain-ranges=SUBNETWORK,[SUBNETWORK,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute routers nats rules update is used to update a Rule in a
    Compute Engine NAT.

EXAMPLES
    To drain connections established using address-1 and use address-2 for all
    new connections matching Rule 1 in NAT nat-1, run:

        $ gcloud compute routers nats rules update 1 --nat=nat1 \
            --router=my-router --region=us-central1 \
            --source-nat-drain-ips=address-1 \
            --source-nat-active-ips=address-2

POSITIONAL ARGUMENTS
     RULE_NUMBER
        Number that uniquely identifies the Rule to update

REQUIRED FLAGS
     --nat=NAT
        Name of the NAT that contains the Rule

     --router=ROUTER
        Router to use for NAT.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --match=MATCH
        CEL Expression used to identify traffic to which this rule applies.

        * Supported attributes (Public NAT): destination.ip
        * Supported attributes (Private NAT): nexthop.hub
        * Supported methods (Public Nat): inIpRange
        * Supported operators (Public NAT): ||, ==
        * Supported operators (Private NAT): ==

        Examples of allowed Match expressions (Public NAT):
        * 'inIpRange(destination.ip, "203.0.113.0/24")''
        * 'destination.ip == "203.0.113.7"'
        * 'destination.ip == "203.0.113.7" || inIpRange(destination.ip,
          "203.0.113.16/25")'

        Example of allowed Match expression (Private NAT):
        * nexthop.hub ==
          "//networkconnectivity.googleapis.com/projects/p1/locations/global/hubs/h1"

     --region=REGION
        Region of the NAT containing the Rule to update. If not specified, you
        might be prompted to select a region (interactive mode only).

        To avoid prompting when this flag is omitted, you can set the
        compute/region property:

            $ gcloud config set compute/region REGION

        A list of regions can be fetched by running:

            $ gcloud compute regions list

        To unset the property, run:

            $ gcloud config unset compute/region

        Alternatively, the region can be stored in the environment variable
        CLOUDSDK_COMPUTE_REGION.

     --source-nat-active-ips=IP_ADDRESS,[IP_ADDRESS,...]
        External IP Addresses to use for connections matching this rule. This
        flag is supported only for Public NAT and is required when creating a
        Public NAT gateway.

        These must be valid reserved external IP addresses in the same region.

     --source-nat-active-ranges=SUBNETWORK,[SUBNETWORK,...]
        Subnetworks from which addresses are used for connections matching this
        rule. This flag is supported only for Private NAT and is required when
        creating a Private NAT gateway.

        These must be subnetwork resources in the same region, with purpose set
        to PRIVATE_NAT.

     At most one of these can be specified:

       --clear-source-nat-drain-ips
          Clear drained IPs from the rule

       --source-nat-drain-ips=IP_ADDRESS,[IP_ADDRESS,...]
          External IP Addresses to drain connections on.

          These must be external IPs previously used as active IPs on this
          rule. No new connections will be established using these IPs.

     At most one of these can be specified:

       --clear-source-nat-drain-ranges
          Clear drained ranges from the rule

       --source-nat-drain-ranges=SUBNETWORK,[SUBNETWORK,...]
          Subnetwork ranges to drain connections on.

          These must be subnetworks previously used as active ranges on this
          rule. No new connections will be established using these ranges.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute routers nats rules update

        $ gcloud beta compute routers nats rules update
```

### gcloud beta compute routers nats rules create

```text
NAME
    gcloud beta compute routers nats rules create - add a Rule to a Compute
        Engine NAT

SYNOPSIS
    gcloud beta compute routers nats rules create RULE_NUMBER --match=MATCH
        --nat=NAT --router=ROUTER [--async] [--region=REGION]
        [--source-nat-active-ips=IP_ADDRESS,[IP_ADDRESS,...]]
        [--source-nat-active-ranges=SUBNETWORK,[SUBNETWORK,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute routers nats rules delete

```text
NAME
    gcloud beta compute routers nats rules delete - delete a Rule in a Compute
        Engine NAT

SYNOPSIS
    gcloud beta compute routers nats rules delete RULE_NUMBER [RULE_NUMBER ...]
        --nat=NAT --router=ROUTER [--region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute routers nats rules describe

```text
NAME
    gcloud beta compute routers nats rules describe - describe a Rule in a
        Compute Engine NAT

SYNOPSIS
    gcloud beta compute routers nats rules describe RULE_NUMBER --nat=NAT
        --router=ROUTER [--region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute routers nats rules list

```text
NAME
    gcloud beta compute routers nats rules list - lists the NATs on a Compute
        Engine router

SYNOPSIS
    gcloud beta compute routers nats rules list --nat=NAT --router=ROUTER
        [--region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute routers nats rules update

```text
NAME
    gcloud beta compute routers nats rules update - update a Rule in a Compute
        Engine NAT

SYNOPSIS
    gcloud beta compute routers nats rules update RULE_NUMBER --nat=NAT
        --router=ROUTER [--async] [--match=MATCH] [--region=REGION]
        [--source-nat-active-ips=IP_ADDRESS,[IP_ADDRESS,...]]
        [--source-nat-active-ranges=SUBNETWORK,[SUBNETWORK,...]]
        [--clear-source-nat-drain-ips
          | --source-nat-drain-ips=IP_ADDRESS,[IP_ADDRESS,...]]
        [--clear-source-nat-drain-ranges
          | --source-nat-drain-ranges=SUBNETWORK,[SUBNETWORK,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute routers nats rules create

```text
NAME
    gcloud alpha compute routers nats rules create - add a Rule to a Compute
        Engine NAT

SYNOPSIS
    gcloud alpha compute routers nats rules create RULE_NUMBER --match=MATCH
        --nat=NAT --router=ROUTER [--async] [--region=REGION]
        [--source-nat-active-ips=IP_ADDRESS,[IP_ADDRESS,...]]
        [--source-nat-active-ranges=SUBNETWORK,[SUBNETWORK,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute routers nats rules delete

```text
NAME
    gcloud alpha compute routers nats rules delete - delete a Rule in a Compute
        Engine NAT

SYNOPSIS
    gcloud alpha compute routers nats rules delete RULE_NUMBER
        [RULE_NUMBER ...] --nat=NAT --router=ROUTER [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute routers nats rules describe

```text
NAME
    gcloud alpha compute routers nats rules describe - describe a Rule in a
        Compute Engine NAT

SYNOPSIS
    gcloud alpha compute routers nats rules describe RULE_NUMBER --nat=NAT
        --router=ROUTER [--region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute routers nats rules list

```text
NAME
    gcloud alpha compute routers nats rules list - lists the NATs on a Compute
        Engine router

SYNOPSIS
    gcloud alpha compute routers nats rules list --nat=NAT --router=ROUTER
        [--region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute routers nats rules update

```text
NAME
    gcloud alpha compute routers nats rules update - update a Rule in a Compute
        Engine NAT

SYNOPSIS
    gcloud alpha compute routers nats rules update RULE_NUMBER --nat=NAT
        --router=ROUTER [--async] [--match=MATCH] [--region=REGION]
        [--source-nat-active-ips=IP_ADDRESS,[IP_ADDRESS,...]]
        [--source-nat-active-ranges=SUBNETWORK,[SUBNETWORK,...]]
        [--clear-source-nat-drain-ips
          | --source-nat-drain-ips=IP_ADDRESS,[IP_ADDRESS,...]]
        [--clear-source-nat-drain-ranges
          | --source-nat-drain-ranges=SUBNETWORK,[SUBNETWORK,...]]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the `list` example ends with the sentence period attached to the region (`--region=us-central1.`), which gcloud would pass as the region; the runnable form drops the period.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/routers/nats/rules (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
