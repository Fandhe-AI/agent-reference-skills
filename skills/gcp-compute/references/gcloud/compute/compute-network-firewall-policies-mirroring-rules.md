---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/network-firewall-policies/mirroring-rules
---

# gcloud compute network-firewall-policies mirroring-rules

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute network-firewall-policies mirroring-rules create

```text
NAME
    gcloud compute network-firewall-policies mirroring-rules create - creates a
        Compute Engine network firewall policy packet mirroring rule

SYNOPSIS
    gcloud compute network-firewall-policies mirroring-rules create PRIORITY
        --action=ACTION --firewall-policy=FIREWALL_POLICY
        --global-firewall-policy --layer4-configs=[LAYER4_CONFIG,...]
        [--description=DESCRIPTION] [--dest-ip-ranges=[DEST_IP_RANGE,...]]
        [--direction=DIRECTION] [--[no-]disabled]
        [--security-profile-group=SECURITY_PROFILE_GROUP]
        [--src-ip-ranges=[SRC_IP_RANGE,...]]
        [--target-secure-tags=[TARGET_SECURE_TAGS,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute network-firewall-policies mirroring-rules create is used to
    create network firewall policy packet mirroring rules.

EXAMPLES
    To create a rule with priority 10 in a global network firewall policy with
    name my-policy and description example rule, run:

        $ gcloud compute network-firewall-policies mirroring-rules create \
          10 --firewall-policy=my-policy --action=do_not_mirror \
          --description="example rule" --global-firewall-policy

POSITIONAL ARGUMENTS
     PRIORITY
        Priority of the rule to be inserted. Valid in [0, 2147483547].

REQUIRED FLAGS
     --action=ACTION
        Action to take if the request matches the match condition. ACTION must
        be one of: mirror, do_not_mirror, goto_next.

     --firewall-policy=FIREWALL_POLICY
        Firewall policy ID with which to create rule.

     --global-firewall-policy
        Use this flag to indicate that firewall policy is global.

     --layer4-configs=[LAYER4_CONFIG,...]
        A list of destination protocols and ports to which the firewall rule
        will apply.

OPTIONAL FLAGS
     --description=DESCRIPTION
        An optional, textual description for the rule.

     --dest-ip-ranges=[DEST_IP_RANGE,...]
        Destination IP ranges to match for this rule.

     --direction=DIRECTION
        Direction of the traffic the rule is applied. The default is to apply
        on incoming traffic. DIRECTION must be one of: INGRESS, EGRESS.

     --[no-]disabled
        Use this flag to disable the rule. Disabled rules will not affect
        traffic. Use --disabled to enable and --no-disabled to disable.

     --security-profile-group=SECURITY_PROFILE_GROUP
        A security profile group to be used with mirror action.

     --src-ip-ranges=[SRC_IP_RANGE,...]
        A list of IP address blocks that are allowed to make inbound
        connections that match the firewall rule to the instances on the
        network. The IP address blocks must be specified in CIDR format:
        http://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing.Either
        --src-ip-ranges or --src-secure-tags must be specified for INGRESS
        traffic. If both --src-ip-ranges and --src-secure-tags are specified,
        the rule matches if either the range of the source matches
        --src-ip-ranges or the secure tag of the source matches
        --src-secure-tags.Multiple IP address blocks can be specified if they
        are separated by commas.

     --target-secure-tags=[TARGET_SECURE_TAGS,...]
        An optional, list of target secure tags with a name of the format
        tagValues/ or full namespaced name

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute network-firewall-policies mirroring-rules \
            create

        $ gcloud beta compute network-firewall-policies mirroring-rules \
            create
```

### gcloud compute network-firewall-policies mirroring-rules delete

```text
NAME
    gcloud compute network-firewall-policies mirroring-rules delete - deletes a
        Compute Engine network firewall policy packet mirroirng rule

SYNOPSIS
    gcloud compute network-firewall-policies mirroring-rules delete PRIORITY
        --firewall-policy=FIREWALL_POLICY --global-firewall-policy
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute network-firewall-policies mirroring-rules delete is used to
    delete network firewall policy packet mirroring rules.

EXAMPLES
    To delete a rule with priority 10 in a global network firewall policy with
    name my-policy, run:

        $ gcloud compute network-firewall-policies mirroring-rules delete \
            10 --firewall-policy=my-policy --global-firewall-policy

POSITIONAL ARGUMENTS
     PRIORITY
        Priority of the rule to be deleted. Valid in [0, 2147483547].

REQUIRED FLAGS
     --firewall-policy=FIREWALL_POLICY
        Firewall policy ID with which to delete rule.

     --global-firewall-policy
        Use this flag to indicate that firewall policy is global.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute network-firewall-policies mirroring-rules \
            delete

        $ gcloud beta compute network-firewall-policies mirroring-rules \
            delete
```

### gcloud compute network-firewall-policies mirroring-rules describe

```text
NAME
    gcloud compute network-firewall-policies mirroring-rules describe -
        describes a Compute Engine network firewall policy pakcet mirroring
        rule

SYNOPSIS
    gcloud compute network-firewall-policies mirroring-rules describe PRIORITY
        --firewall-policy=FIREWALL_POLICY --global-firewall-policy
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute network-firewall-policies mirroring-rules describe is used
    to describe network firewall policy packet mirroring rules.

EXAMPLES
    To describe a rule with priority 10 in a global network firewall policy
    with name my-policy, run:

        $ gcloud compute network-firewall-policies mirroring-rules \
            describe 10 --firewall-policy=my-policy --global-firewall-policy

POSITIONAL ARGUMENTS
     PRIORITY
        Priority of the rule to be described. Valid in [0, 2147483547].

REQUIRED FLAGS
     --firewall-policy=FIREWALL_POLICY
        Firewall policy ID with which to describe rule.

     --global-firewall-policy
        Use this flag to indicate that firewall policy is global.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute network-firewall-policies mirroring-rules \
            describe

        $ gcloud beta compute network-firewall-policies mirroring-rules \
            describe
```

### gcloud compute network-firewall-policies mirroring-rules update

```text
NAME
    gcloud compute network-firewall-policies mirroring-rules update - updates a
        Compute Engine network firewall policy packet mirroring rule

SYNOPSIS
    gcloud compute network-firewall-policies mirroring-rules update PRIORITY
        --firewall-policy=FIREWALL_POLICY --global-firewall-policy
        [--action=ACTION] [--description=DESCRIPTION]
        [--dest-ip-ranges=[DEST_IP_RANGE,...]] [--direction=DIRECTION]
        [--[no-]disabled] [--layer4-configs=[LAYER4_CONFIG,...]]
        [--new-priority=NEW_PRIORITY]
        [--security-profile-group=SECURITY_PROFILE_GROUP]
        [--src-ip-ranges=[SRC_IP_RANGE,...]]
        [--target-secure-tags=[TARGET_SECURE_TAGS,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute network-firewall-policies mirroring-rules update is used to
    update network firewall policy packet mirroring rules.

EXAMPLES
    To update a rule with priority 10 in a global network firewall policy with
    name my-policy to change the action to mirror and description to new
    example rule, run:

        $ gcloud compute network-firewall-policies mirroring-rules update \
            10 --firewall-policy=my-policy --action=mirror \
            --description="new example rule"

POSITIONAL ARGUMENTS
     PRIORITY
        Priority of the rule to be updated. Valid in [0, 2147483547].

REQUIRED FLAGS
     --firewall-policy=FIREWALL_POLICY
        Firewall policy ID with which to update rule.

     --global-firewall-policy
        Use this flag to indicate that firewall policy is global.

OPTIONAL FLAGS
     --action=ACTION
        Action to take if the request matches the match condition. ACTION must
        be one of: mirror, do_not_mirror, goto_next.

     --description=DESCRIPTION
        An optional, textual description for the rule.

     --dest-ip-ranges=[DEST_IP_RANGE,...]
        Destination IP ranges to match for this rule.

     --direction=DIRECTION
        Direction of the traffic the rule is applied. The default is to apply
        on incoming traffic. DIRECTION must be one of: INGRESS, EGRESS.

     --[no-]disabled
        Use this flag to disable the rule. Disabled rules will not affect
        traffic. Use --disabled to enable and --no-disabled to disable.

     --layer4-configs=[LAYER4_CONFIG,...]
        A list of destination protocols and ports to which the firewall rule
        will apply.

     --new-priority=NEW_PRIORITY
        New priority for the rule to update. Valid in [0, 65535].

     --security-profile-group=SECURITY_PROFILE_GROUP
        A security profile group to be used with mirror action.

     --src-ip-ranges=[SRC_IP_RANGE,...]
        A list of IP address blocks that are allowed to make inbound
        connections that match the firewall rule to the instances on the
        network. The IP address blocks must be specified in CIDR format:
        http://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing.Either
        --src-ip-ranges or --src-secure-tags must be specified for INGRESS
        traffic. If both --src-ip-ranges and --src-secure-tags are specified,
        the rule matches if either the range of the source matches
        --src-ip-ranges or the secure tag of the source matches
        --src-secure-tags.Multiple IP address blocks can be specified if they
        are separated by commas.

     --target-secure-tags=[TARGET_SECURE_TAGS,...]
        An optional, list of target secure tags with a name of the format
        tagValues/ or full namespaced name

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute network-firewall-policies mirroring-rules \
            update

        $ gcloud beta compute network-firewall-policies mirroring-rules \
            update
```

### gcloud beta compute network-firewall-policies mirroring-rules create

```text
NAME
    gcloud beta compute network-firewall-policies mirroring-rules create -
        creates a Compute Engine network firewall policy packet mirroring rule

SYNOPSIS
    gcloud beta compute network-firewall-policies mirroring-rules create
        PRIORITY --action=ACTION --firewall-policy=FIREWALL_POLICY
        --global-firewall-policy --layer4-configs=[LAYER4_CONFIG,...]
        [--description=DESCRIPTION] [--dest-ip-ranges=[DEST_IP_RANGE,...]]
        [--direction=DIRECTION] [--[no-]disabled]
        [--security-profile-group=SECURITY_PROFILE_GROUP]
        [--src-ip-ranges=[SRC_IP_RANGE,...]]
        [--target-secure-tags=[TARGET_SECURE_TAGS,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute network-firewall-policies mirroring-rules delete

```text
NAME
    gcloud beta compute network-firewall-policies mirroring-rules delete -
        deletes a Compute Engine network firewall policy packet mirroirng rule

SYNOPSIS
    gcloud beta compute network-firewall-policies mirroring-rules delete
        PRIORITY --firewall-policy=FIREWALL_POLICY --global-firewall-policy
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute network-firewall-policies mirroring-rules describe

```text
NAME
    gcloud beta compute network-firewall-policies mirroring-rules describe -
        describes a Compute Engine network firewall policy pakcet mirroring
        rule

SYNOPSIS
    gcloud beta compute network-firewall-policies mirroring-rules describe
        PRIORITY --firewall-policy=FIREWALL_POLICY --global-firewall-policy
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute network-firewall-policies mirroring-rules update

```text
NAME
    gcloud beta compute network-firewall-policies mirroring-rules update -
        updates a Compute Engine network firewall policy packet mirroring rule

SYNOPSIS
    gcloud beta compute network-firewall-policies mirroring-rules update
        PRIORITY --firewall-policy=FIREWALL_POLICY --global-firewall-policy
        [--action=ACTION] [--description=DESCRIPTION]
        [--dest-ip-ranges=[DEST_IP_RANGE,...]] [--direction=DIRECTION]
        [--[no-]disabled] [--layer4-configs=[LAYER4_CONFIG,...]]
        [--new-priority=NEW_PRIORITY]
        [--security-profile-group=SECURITY_PROFILE_GROUP]
        [--src-ip-ranges=[SRC_IP_RANGE,...]]
        [--target-secure-tags=[TARGET_SECURE_TAGS,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute network-firewall-policies mirroring-rules create

```text
NAME
    gcloud alpha compute network-firewall-policies mirroring-rules create -
        creates a Compute Engine network firewall policy packet mirroring rule

SYNOPSIS
    gcloud alpha compute network-firewall-policies mirroring-rules create
        PRIORITY --action=ACTION --firewall-policy=FIREWALL_POLICY
        --global-firewall-policy --layer4-configs=[LAYER4_CONFIG,...]
        [--description=DESCRIPTION] [--dest-ip-ranges=[DEST_IP_RANGE,...]]
        [--direction=DIRECTION] [--[no-]disabled]
        [--security-profile-group=SECURITY_PROFILE_GROUP]
        [--src-ip-ranges=[SRC_IP_RANGE,...]]
        [--target-secure-tags=[TARGET_SECURE_TAGS,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute network-firewall-policies mirroring-rules delete

```text
NAME
    gcloud alpha compute network-firewall-policies mirroring-rules delete -
        deletes a Compute Engine network firewall policy packet mirroirng rule

SYNOPSIS
    gcloud alpha compute network-firewall-policies mirroring-rules delete
        PRIORITY --firewall-policy=FIREWALL_POLICY --global-firewall-policy
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute network-firewall-policies mirroring-rules describe

```text
NAME
    gcloud alpha compute network-firewall-policies mirroring-rules describe -
        describes a Compute Engine network firewall policy pakcet mirroring
        rule

SYNOPSIS
    gcloud alpha compute network-firewall-policies mirroring-rules describe
        PRIORITY --firewall-policy=FIREWALL_POLICY --global-firewall-policy
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute network-firewall-policies mirroring-rules update

```text
NAME
    gcloud alpha compute network-firewall-policies mirroring-rules update -
        updates a Compute Engine network firewall policy packet mirroring rule

SYNOPSIS
    gcloud alpha compute network-firewall-policies mirroring-rules update
        PRIORITY --firewall-policy=FIREWALL_POLICY --global-firewall-policy
        [--action=ACTION] [--description=DESCRIPTION]
        [--dest-ip-ranges=[DEST_IP_RANGE,...]] [--direction=DIRECTION]
        [--[no-]disabled] [--layer4-configs=[LAYER4_CONFIG,...]]
        [--new-priority=NEW_PRIORITY]
        [--security-profile-group=SECURITY_PROFILE_GROUP]
        [--src-ip-ranges=[SRC_IP_RANGE,...]]
        [--target-secure-tags=[TARGET_SECURE_TAGS,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Corrected from the official docs (the help text above is verbatim): the `--src-ip-ranges` description says "Either --src-ip-ranges or --src-secure-tags must be specified for INGRESS traffic", but `--src-secure-tags` is not in the SYNOPSIS of the GA `mirroring-rules create` / `update`; among the source flags, only `--src-ip-ranges` is available there.
- Incomplete example: the `gcloud compute network-firewall-policies mirroring-rules create` example omits `--layer4-configs`, which the SYNOPSIS requires (gcloud 593.0.0: "argument --layer4-configs: Must be specified."); the `gcloud compute network-firewall-policies mirroring-rules update` example omits `--global-firewall-policy`, which the SYNOPSIS requires (gcloud 593.0.0: "argument --global-firewall-policy: Must be specified."). Add the required flag (see FLAGS on this page).
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/network-firewall-policies/mirroring-rules (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
