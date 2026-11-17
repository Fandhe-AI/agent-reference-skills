---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/network-firewall-policies/associations
---

# gcloud compute network-firewall-policies associations

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute network-firewall-policies associations create

```text
NAME
    gcloud compute network-firewall-policies associations create - create a new
        association between a firewall policy and a network

SYNOPSIS
    gcloud compute network-firewall-policies associations create
        --firewall-policy=FIREWALL_POLICY --network=NETWORK [--name=NAME]
        [--priority=PRIORITY]
        [--associated-policy-to-be-replaced=ASSOCIATED_POLICY_TO_BE_REPLACED
          | --replace-association-on-target]
        [--firewall-policy-region=FIREWALL_POLICY_REGION
          | --global-firewall-policy] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute network-firewall-policies associations create is used to
    create network firewall policy associations. A network firewall policy is a
    set of rules that controls access to various resources.

EXAMPLES
    To associate a global network firewall policy with name my-policy to
    network my-network with an association named my-association, run:

        $ gcloud compute network-firewall-policies associations create \
            --firewall-policy=my-policy --network=my-network \
            --name=my-association --global-firewall-policy

    To associate a network firewall policy with name my-region-policy in region
    region-a to network my-network with an association named my-association,
    run:

        $ gcloud compute network-firewall-policies associations create \
            --firewall-policy=my-policy --network=my-network \
            --name=my-association --firewall-policy-region=region-a

REQUIRED FLAGS
     --firewall-policy=FIREWALL_POLICY
        Firewall policy ID with which to create association.

     --network=NETWORK
        Name of the network with which the association is created.

OPTIONAL FLAGS
     --name=NAME
        Name of the association.

     --priority=PRIORITY
        Priority of the association.

     At most one of these can be specified:

       --associated-policy-to-be-replaced=ASSOCIATED_POLICY_TO_BE_REPLACED
          Name of an already associated firewall policy to replace.

       --replace-association-on-target
          By default, if you attempt to insert an association to a network that
          is already associated with a firewall policy the method will fail. If
          this is set, the existing association will be deleted at the same
          time that the new association is created.

     At most one of these can be specified:

       --firewall-policy-region=FIREWALL_POLICY_REGION
          Region of the firewall policy to create. Overrides the default
          compute/region property value for this command invocation.

       --global-firewall-policy
          If set, the firewall policy is global.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute network-firewall-policies associations create

        $ gcloud beta compute network-firewall-policies associations create
```

### gcloud compute network-firewall-policies associations delete

```text
NAME
    gcloud compute network-firewall-policies associations delete - delete a new
        association between a firewall policy and an network or folder resource

SYNOPSIS
    gcloud compute network-firewall-policies associations delete
        --firewall-policy=FIREWALL_POLICY --name=NAME
        [--firewall-policy-region=FIREWALL_POLICY_REGION
          | --global-firewall-policy] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute network-firewall-policies associations delete is used to
    delete network firewall policy associations. An network firewall policy is
    a set of rules that controls access to various resources.

EXAMPLES
    To delete an association from a global network firewall policy with NAME
    my-policy and association name my-association, run:

        $ gcloud compute network-firewall-policies associations delete \
            --firewall-policy=my-policy --name=my-association \
            --global-firewall-policy

    To delete an association from a regional network firewall policy with NAME
    my-policy in region region-a and association name my-association, run:

        $ gcloud compute network-firewall-policies associations delete \
            --firewall-policy=my-policy --name=my-association \
            --firewall-policy-region=region-a

REQUIRED FLAGS
     --firewall-policy=FIREWALL_POLICY
        Firewall policy ID with which to delete association.

     --name=NAME
        Name of the association to delete.

OPTIONAL FLAGS
     At most one of these can be specified:

       --firewall-policy-region=FIREWALL_POLICY_REGION
          Region of the firewall policy to delete. Overrides the default
          compute/region property value for this command invocation.

       --global-firewall-policy
          If set, the firewall policy is global.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute network-firewall-policies associations delete

        $ gcloud beta compute network-firewall-policies associations delete
```

### gcloud compute network-firewall-policies associations update

```text
NAME
    gcloud compute network-firewall-policies associations update - update
        association between a firewall policy and a network

SYNOPSIS
    gcloud compute network-firewall-policies associations update
        --firewall-policy=FIREWALL_POLICY --name=NAME --priority=PRIORITY
        [--firewall-policy-region=FIREWALL_POLICY_REGION
          | --global-firewall-policy] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute network-firewall-policies associations update is used to
    update network firewall policy associations. A network firewall policy is a
    set of rules that controls access to various resources.

EXAMPLES
    To update priority of association named my-association on network firewall
    policy with name my-policy in region region-a, run:

        $ gcloud compute network-firewall-policies associations update \
            --firewall-policy=my-policy --name=my-association \
            --firewall-policy-region=region-a --priority=new-priority

REQUIRED FLAGS
     --firewall-policy=FIREWALL_POLICY
        Firewall policy ID with which to update association.

     --name=NAME
        Name of the association.

     --priority=PRIORITY
        Priority of the association.

OPTIONAL FLAGS
     At most one of these can be specified:

       --firewall-policy-region=FIREWALL_POLICY_REGION
          Region of the firewall policy to update. Overrides the default
          compute/region property value for this command invocation.

       --global-firewall-policy
          If set, the firewall policy is global.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute network-firewall-policies associations update

        $ gcloud beta compute network-firewall-policies associations update
```

### gcloud beta compute network-firewall-policies associations create

```text
NAME
    gcloud beta compute network-firewall-policies associations create - create
        a new association between a firewall policy and a network

SYNOPSIS
    gcloud beta compute network-firewall-policies associations create
        --firewall-policy=FIREWALL_POLICY --network=NETWORK [--name=NAME]
        [--priority=PRIORITY]
        [--associated-policy-to-be-replaced=ASSOCIATED_POLICY_TO_BE_REPLACED
          | --replace-association-on-target]
        [--firewall-policy-region=FIREWALL_POLICY_REGION
          | --global-firewall-policy] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute network-firewall-policies associations delete

```text
NAME
    gcloud beta compute network-firewall-policies associations delete - delete
        a new association between a firewall policy and an network or folder
        resource

SYNOPSIS
    gcloud beta compute network-firewall-policies associations delete
        --firewall-policy=FIREWALL_POLICY --name=NAME
        [--firewall-policy-region=FIREWALL_POLICY_REGION
          | --global-firewall-policy] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute network-firewall-policies associations update

```text
NAME
    gcloud beta compute network-firewall-policies associations update - update
        association between a firewall policy and a network

SYNOPSIS
    gcloud beta compute network-firewall-policies associations update
        --firewall-policy=FIREWALL_POLICY --name=NAME --priority=PRIORITY
        [--firewall-policy-region=FIREWALL_POLICY_REGION
          | --global-firewall-policy] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute network-firewall-policies associations create

```text
NAME
    gcloud alpha compute network-firewall-policies associations create - create
        a new association between a firewall policy and a network

SYNOPSIS
    gcloud alpha compute network-firewall-policies associations create
        --firewall-policy=FIREWALL_POLICY --network=NETWORK [--name=NAME]
        [--priority=PRIORITY]
        [--associated-policy-to-be-replaced=ASSOCIATED_POLICY_TO_BE_REPLACED
          | --replace-association-on-target]
        [--firewall-policy-region=FIREWALL_POLICY_REGION
          | --global-firewall-policy] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute network-firewall-policies associations delete

```text
NAME
    gcloud alpha compute network-firewall-policies associations delete - delete
        a new association between a firewall policy and an network or folder
        resource

SYNOPSIS
    gcloud alpha compute network-firewall-policies associations delete
        --firewall-policy=FIREWALL_POLICY --name=NAME
        [--firewall-policy-region=FIREWALL_POLICY_REGION
          | --global-firewall-policy] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute network-firewall-policies associations update

```text
NAME
    gcloud alpha compute network-firewall-policies associations update - update
        association between a firewall policy and a network

SYNOPSIS
    gcloud alpha compute network-firewall-policies associations update
        --firewall-policy=FIREWALL_POLICY --name=NAME --priority=PRIORITY
        [--firewall-policy-region=FIREWALL_POLICY_REGION
          | --global-firewall-policy] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/network-firewall-policies/associations (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
