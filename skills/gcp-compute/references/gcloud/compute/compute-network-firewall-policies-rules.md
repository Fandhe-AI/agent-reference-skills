---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/network-firewall-policies/rules
---

# gcloud compute network-firewall-policies rules

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute network-firewall-policies rules create

```text
NAME
    gcloud compute network-firewall-policies rules create - creates a Compute
        Engine network firewall policy rule

SYNOPSIS
    gcloud compute network-firewall-policies rules create PRIORITY
        --action=ACTION --firewall-policy=FIREWALL_POLICY
        --layer4-configs=[LAYER4_CONFIG,...] [--description=DESCRIPTION]
        [--dest-address-groups=[DEST_ADDRESS_GROUPS,...]]
        [--dest-fqdns=[DEST_FQDNS,...]] [--dest-ip-ranges=[DEST_IP_RANGE,...]]
        [--dest-network-context=DEST_NETWORK_CONTEXT]
        [--dest-region-codes=[DEST_REGION_CODES,...]]
        [--dest-threat-intelligence=[DEST_THREAT_INTELLIGENCE_LISTS,...]]
        [--direction=DIRECTION] [--[no-]disabled] [--[no-]enable-logging]
        [--security-profile-group=SECURITY_PROFILE_GROUP]
        [--src-address-groups=[SOURCE_ADDRESS_GROUPS,...]]
        [--src-fqdns=[SOURCE_FQDNS,...]] [--src-ip-ranges=[SRC_IP_RANGE,...]]
        [--src-network-context=SRC_NETWORK_CONTEXT]
        [--src-networks=[SRC_NETWORKS,...]]
        [--src-region-codes=[SOURCE_REGION_CODES,...]]
        [--src-secure-tags=[SOURCE_SECURE_TAGS,...]]
        [--src-threat-intelligence=[SOURCE_THREAT_INTELLIGENCE_LISTS,...]]
        [--target-forwarding-rules=[TARGET_FORWARDING_RULES,...]]
        [--target-secure-tags=[TARGET_SECURE_TAGS,...]]
        [--target-service-accounts=[TARGET_SERVICE_ACCOUNTS,...]]
        [--target-type=TARGET_TYPE] [--[no-]tls-inspect]
        [--firewall-policy-region=FIREWALL_POLICY_REGION
          | --global-firewall-policy] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute network-firewall-policies rules create is used to create
    network firewall policy rules.

EXAMPLES
    To create a rule with priority 10 in a global network firewall policy with
    name my-policy and description example rule, run:

        $ gcloud compute network-firewall-policies rules create 10 \
          --firewall-policy=my-policy --action=allow \
          --description="example rule" --global-firewall-policy

    To create a rule with priority 10 in a regional network firewall policy
    with name my-region-policy and description example rule, in region
    region-a, run:

        $ gcloud compute network-firewall-policies rules create 10 \
          --firewall-policy=my-policy --action=allow \
          --description="example rule"

POSITIONAL ARGUMENTS
     PRIORITY
        Priority of the rule to be inserted. Valid in [0, 2147483547].

REQUIRED FLAGS
     --action=ACTION
        Action to take if the request matches the match condition. ACTION must
        be one of: allow, deny, goto_next, apply_security_profile_group.

     --firewall-policy=FIREWALL_POLICY
        Firewall policy ID with which to create rule.

     --layer4-configs=[LAYER4_CONFIG,...]
        A list of destination protocols and ports to which the firewall rule
        will apply.

OPTIONAL FLAGS
     --description=DESCRIPTION
        An optional, textual description for the rule.

     --dest-address-groups=[DEST_ADDRESS_GROUPS,...]
        Destination address groups to match for this rule. Can only be
        specified if DIRECTION is engress.

     --dest-fqdns=[DEST_FQDNS,...]
        Destination FQDNs to match for this rule. Can only be specified if
        DIRECTION is egress.

     --dest-ip-ranges=[DEST_IP_RANGE,...]
        Destination IP ranges to match for this rule.

     --dest-network-context=DEST_NETWORK_CONTEXT
        Use this flag to indicate that the rule should match internet or
        non-internet traffic. It applies to destination traffic for egress
        rules. Valid values are INTERNET and NON_INTERNET. Use empty string to
        clear the field.

     --dest-region-codes=[DEST_REGION_CODES,...]
        Destination Region Code to match for this rule. Can only be specified
        if DIRECTION is egress. Cannot be specified when the source network
        context is NON_INTERNET.

     --dest-threat-intelligence=[DEST_THREAT_INTELLIGENCE_LISTS,...]
        Destination Threat Intelligence lists to match for this rule. Can only
        be specified if DIRECTION is egress. Cannot be specified when source
        network context is NON_INTERNET. The available lists can be found here:
        https://cloud.google.com/vpc/docs/firewall-policies-rule-details#threat-intelligence-fw-policy.

     --direction=DIRECTION
        Direction of the traffic the rule is applied. The default is to apply
        on incoming traffic. DIRECTION must be one of: INGRESS, EGRESS.

     --[no-]disabled
        Use this flag to disable the rule. Disabled rules will not affect
        traffic. Use --disabled to enable and --no-disabled to disable.

     --[no-]enable-logging
        Use this flag to enable logging of connections that allowed or denied
        by this rule. Use --enable-logging to enable and --no-enable-logging to
        disable.

     --security-profile-group=SECURITY_PROFILE_GROUP
        A security profile group to be used with apply_security_profile_group
        action.

     --src-address-groups=[SOURCE_ADDRESS_GROUPS,...]
        Source address groups to match for this rule. Can only be specified if
        DIRECTION is ingress.

     --src-fqdns=[SOURCE_FQDNS,...]
        Source FQDNs to match for this rule. Can only be specified if DIRECTION
        is ingress.

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

     --src-network-context=SRC_NETWORK_CONTEXT
        Use this flag to indicate that the rule should match internet,
        non-internet traffic or traffic coming from the network specified by
        --src-networks. It applies to ingress rules. Valid values are INTERNET,
        NON_INTERNET, VPC_NETWORKS and INTRA_VPC. Use empty string to clear the
        field.

     --src-networks=[SRC_NETWORKS,...]
        The source VPC networks to match for this rule. It can only be
        specified when --src-network-type is VPC_NETWORKS. It applies to
        ingress rules. It accepts full or partial URLs.

     --src-region-codes=[SOURCE_REGION_CODES,...]
        Source Region Code to match for this rule. Can only be specified if
        DIRECTION is ingress. Cannot be specified when the source network
        context is NON_INTERNET, VPC_NETWORK or INTRA_VPC.

     --src-secure-tags=[SOURCE_SECURE_TAGS,...]
        A list of instance secure tags indicating the set of instances on the
        network to which the rule applies if all other fields match. Either
        --src-ip-ranges or --src-secure-tags must be specified for ingress
        traffic. If both --src-ip-ranges and --src-secure-tags are specified,
        an inbound connection is allowed if either the range of the source
        matches --src-ip-ranges or the tag of the source matches
        --src-secure-tags. Secure Tags can be assigned to instances during
        instance creation.

     --src-threat-intelligence=[SOURCE_THREAT_INTELLIGENCE_LISTS,...]
        Source Threat Intelligence lists to match for this rule. Can only be
        specified if DIRECTION is ingress. Cannot be specified when the source
        network context is NON_INTERNET, VPC_NETWORK or INTRA_VPC. The
        available lists can be found here:
        https://cloud.google.com/vpc/docs/firewall-policies-rule-details#threat-intelligence-fw-policy.

     --target-forwarding-rules=[TARGET_FORWARDING_RULES,...]
        A list of forwarding rules to which this rule applies. This field
        allows you to control which load balancers get this rule. If not
        specified, the rule applies to all load balancers. This field is only
        applicable when --target-type is INTERNAL_MANAGED_LB. It accepts full
        or partial resource URLs.

     --target-secure-tags=[TARGET_SECURE_TAGS,...]
        An optional, list of target secure tags with a name of the format
        tagValues/ or full namespaced name

     --target-service-accounts=[TARGET_SERVICE_ACCOUNTS,...]
        List of target service accounts for the rule.

     --target-type=TARGET_TYPE
        Target type of the rule. By default a rule applies to VM instances
        (target-type = INSTANCES). Use INTERNAL_MANAGED_LB value to apply the
        rule to load balancers. TARGET_TYPE must be one of: INSTANCES,
        INTERNAL_MANAGED_LB.

     --[no-]tls-inspect
        Use this flag to indicate whether TLS traffic should be inspected using
        the TLS inspection policy when the security profile group is applied.
        Default: no TLS inspection. Use --tls-inspect to enable and
        --no-tls-inspect to disable.

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

        $ gcloud alpha compute network-firewall-policies rules create

        $ gcloud beta compute network-firewall-policies rules create
```

### gcloud compute network-firewall-policies rules delete

```text
NAME
    gcloud compute network-firewall-policies rules delete - deletes a Compute
        Engine network firewall policy rule

SYNOPSIS
    gcloud compute network-firewall-policies rules delete PRIORITY
        --firewall-policy=FIREWALL_POLICY
        [--firewall-policy-region=FIREWALL_POLICY_REGION
          | --global-firewall-policy] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute network-firewall-policies rules delete is used to delete
    network firewall policy rules.

EXAMPLES
    To delete a rule with priority 10 in a global network firewall policy with
    name my-policy, run:

        $ gcloud compute network-firewall-policies rules delete 10 \
            --firewall-policy=my-policy --global-firewall-policy

    To delete a rule with priority 10 in a regional network firewall policy
    with name my-policy, in region region-a, run:

        $ gcloud compute network-firewall-policies rules delete 10 \
            --firewall-policy=my-policy --firewall-policy-region=region-a

POSITIONAL ARGUMENTS
     PRIORITY
        Priority of the rule to be deleted. Valid in [0, 2147483547].

REQUIRED FLAGS
     --firewall-policy=FIREWALL_POLICY
        Firewall policy ID with which to delete rule.

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

        $ gcloud alpha compute network-firewall-policies rules delete

        $ gcloud beta compute network-firewall-policies rules delete
```

### gcloud compute network-firewall-policies rules describe

```text
NAME
    gcloud compute network-firewall-policies rules describe - describes a
        Compute Engine network firewall policy rule

SYNOPSIS
    gcloud compute network-firewall-policies rules describe PRIORITY
        --firewall-policy=FIREWALL_POLICY
        [--firewall-policy-region=FIREWALL_POLICY_REGION
          | --global-firewall-policy] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute network-firewall-policies rules describe is used to describe
    network firewall policy rules.

EXAMPLES
    To describe a rule with priority 10 in a global network firewall policy
    with name my-policy, run:

        $ gcloud compute network-firewall-policies rules describe 10 \
            --firewall-policy=my-policy --global-firewall-policy

    To describe a rule with priority 10 in a regional network firewall policy
    with name my-policy, in region region-a, run:

        $ gcloud compute network-firewall-policies rules describe 10 \
            --firewall-policy=my-policy --firewall-policy-region=region-a

POSITIONAL ARGUMENTS
     PRIORITY
        Priority of the rule to be described. Valid in [0, 2147483547].

REQUIRED FLAGS
     --firewall-policy=FIREWALL_POLICY
        Firewall policy ID with which to describe rule.

OPTIONAL FLAGS
     At most one of these can be specified:

       --firewall-policy-region=FIREWALL_POLICY_REGION
          Region of the firewall policy to operate on. Overrides the default
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

        $ gcloud alpha compute network-firewall-policies rules describe

        $ gcloud beta compute network-firewall-policies rules describe
```

### gcloud compute network-firewall-policies rules update

```text
NAME
    gcloud compute network-firewall-policies rules update - updates a Compute
        Engine network firewall policy rule

SYNOPSIS
    gcloud compute network-firewall-policies rules update PRIORITY
        --firewall-policy=FIREWALL_POLICY [--action=ACTION]
        [--description=DESCRIPTION]
        [--dest-address-groups=[DEST_ADDRESS_GROUPS,...]]
        [--dest-fqdns=[DEST_FQDNS,...]] [--dest-ip-ranges=[DEST_IP_RANGE,...]]
        [--dest-network-context=DEST_NETWORK_CONTEXT]
        [--dest-region-codes=[DEST_REGION_CODES,...]]
        [--dest-threat-intelligence=[DEST_THREAT_INTELLIGENCE_LISTS,...]]
        [--direction=DIRECTION] [--[no-]disabled] [--[no-]enable-logging]
        [--layer4-configs=[LAYER4_CONFIG,...]] [--new-priority=NEW_PRIORITY]
        [--security-profile-group=SECURITY_PROFILE_GROUP]
        [--src-address-groups=[SOURCE_ADDRESS_GROUPS,...]]
        [--src-fqdns=[SOURCE_FQDNS,...]] [--src-ip-ranges=[SRC_IP_RANGE,...]]
        [--src-network-context=SRC_NETWORK_CONTEXT]
        [--src-networks=[SRC_NETWORKS,...]]
        [--src-region-codes=[SOURCE_REGION_CODES,...]]
        [--src-secure-tags=[SOURCE_SECURE_TAGS,...]]
        [--src-threat-intelligence=[SOURCE_THREAT_INTELLIGENCE_LISTS,...]]
        [--target-forwarding-rules=[TARGET_FORWARDING_RULES,...]]
        [--target-secure-tags=[TARGET_SECURE_TAGS,...]]
        [--target-service-accounts=[TARGET_SERVICE_ACCOUNTS,...]]
        [--target-type=TARGET_TYPE] [--[no-]tls-inspect]
        [--firewall-policy-region=FIREWALL_POLICY_REGION
          | --global-firewall-policy] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute network-firewall-policies rules update is used to update
    network firewall policy rules.

EXAMPLES
    To update a rule with priority 10 in a global network firewall policy with
    name my-policy to change the action to allow and description to new example
    rule, run:

        $ gcloud compute network-firewall-policies rules update 10 \
            --firewall-policy=my-policy --action=allow \
            --description="new example rule"

POSITIONAL ARGUMENTS
     PRIORITY
        Priority of the rule to be updated. Valid in [0, 2147483547].

REQUIRED FLAGS
     --firewall-policy=FIREWALL_POLICY
        Firewall policy ID with which to update rule.

OPTIONAL FLAGS
     --action=ACTION
        Action to take if the request matches the match condition. ACTION must
        be one of: allow, deny, goto_next, apply_security_profile_group.

     --description=DESCRIPTION
        An optional, textual description for the rule.

     --dest-address-groups=[DEST_ADDRESS_GROUPS,...]
        Destination address groups to match for this rule. Can only be
        specified if DIRECTION is engress.

     --dest-fqdns=[DEST_FQDNS,...]
        Destination FQDNs to match for this rule. Can only be specified if
        DIRECTION is egress.

     --dest-ip-ranges=[DEST_IP_RANGE,...]
        Destination IP ranges to match for this rule.

     --dest-network-context=DEST_NETWORK_CONTEXT
        Use this flag to indicate that the rule should match internet or
        non-internet traffic. It applies to destination traffic for egress
        rules. Valid values are INTERNET and NON_INTERNET. Use empty string to
        clear the field.

     --dest-region-codes=[DEST_REGION_CODES,...]
        Destination Region Code to match for this rule. Can only be specified
        if DIRECTION is egress.

     --dest-threat-intelligence=[DEST_THREAT_INTELLIGENCE_LISTS,...]
        Destination Threat Intelligence lists to match for this rule. Can only
        be specified if DIRECTION is egress. The available lists can be found
        here:
        https://cloud.google.com/vpc/docs/firewall-policies-rule-details#threat-intelligence-fw-policy.

     --direction=DIRECTION
        Direction of the traffic the rule is applied. The default is to apply
        on incoming traffic. DIRECTION must be one of: INGRESS, EGRESS.

     --[no-]disabled
        Use this flag to disable the rule. Disabled rules will not affect
        traffic. Use --disabled to enable and --no-disabled to disable.

     --[no-]enable-logging
        Use this flag to enable logging of connections that allowed or denied
        by this rule. Use --enable-logging to enable and --no-enable-logging to
        disable.

     --layer4-configs=[LAYER4_CONFIG,...]
        A list of destination protocols and ports to which the firewall rule
        will apply.

     --new-priority=NEW_PRIORITY
        New priority for the rule to update. Valid in [0, 65535].

     --security-profile-group=SECURITY_PROFILE_GROUP
        A security profile group to be used with apply_security_profile_group
        action.

     --src-address-groups=[SOURCE_ADDRESS_GROUPS,...]
        Source address groups to match for this rule. Can only be specified if
        DIRECTION is ingress.

     --src-fqdns=[SOURCE_FQDNS,...]
        Source FQDNs to match for this rule. Can only be specified if DIRECTION
        is ingress.

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

     --src-network-context=SRC_NETWORK_CONTEXT
        Use this flag to indicate that the rule should match internet,
        non-internet traffic or traffic coming from the network specified by
        --src-networks. It applies to ingress rules. Valid values are INTERNET,
        NON_INTERNET, VPC_NETWORKS and INTRA_VPC. Use empty string to clear the
        field.

     --src-networks=[SRC_NETWORKS,...]
        The source VPC networks to match for this rule. It can only be
        specified when --src-network-type is VPC_NETWORKS. It applies to
        ingress rules. It accepts full or partial URLs.

     --src-region-codes=[SOURCE_REGION_CODES,...]
        Source Region Code to match for this rule. Can only be specified if
        DIRECTION is ingress.

     --src-secure-tags=[SOURCE_SECURE_TAGS,...]
        A list of instance secure tags indicating the set of instances on the
        network to which the rule applies if all other fields match. Either
        --src-ip-ranges or --src-secure-tags must be specified for ingress
        traffic. If both --src-ip-ranges and --src-secure-tags are specified,
        an inbound connection is allowed if either the range of the source
        matches --src-ip-ranges or the tag of the source matches
        --src-secure-tags. Secure Tags can be assigned to instances during
        instance creation.

     --src-threat-intelligence=[SOURCE_THREAT_INTELLIGENCE_LISTS,...]
        Source Threat Intelligence lists to match for this rule. Can only be
        specified if DIRECTION is ingress. The available lists can be found
        here:
        https://cloud.google.com/vpc/docs/firewall-policies-rule-details#threat-intelligence-fw-policy.

     --target-forwarding-rules=[TARGET_FORWARDING_RULES,...]
        A list of forwarding rules to which this rule applies. This field
        allows you to control which load balancers get this rule. If not
        specified, the rule applies to all load balancers. This field is only
        applicable when --target-type is INTERNAL_MANAGED_LB. It accepts full
        or partial resource URLs.

     --target-secure-tags=[TARGET_SECURE_TAGS,...]
        An optional, list of target secure tags with a name of the format
        tagValues/ or full namespaced name

     --target-service-accounts=[TARGET_SERVICE_ACCOUNTS,...]
        List of target service accounts for the rule.

     --target-type=TARGET_TYPE
        Target type of the rule. By default a rule applies to VM instances
        (target-type = INSTANCES). Use INTERNAL_MANAGED_LB value to apply the
        rule to load balancers. TARGET_TYPE must be one of: INSTANCES,
        INTERNAL_MANAGED_LB.

     --[no-]tls-inspect
        Use this flag to indicate whether TLS traffic should be inspected using
        the TLS inspection policy when the security profile group is applied.
        Default: no TLS inspection. Use --tls-inspect to enable and
        --no-tls-inspect to disable.

     At most one of these can be specified:

       --firewall-policy-region=FIREWALL_POLICY_REGION
          Region of the firewall policy to operate on. Overrides the default
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

        $ gcloud alpha compute network-firewall-policies rules update

        $ gcloud beta compute network-firewall-policies rules update
```

### gcloud beta compute network-firewall-policies rules create

```text
NAME
    gcloud beta compute network-firewall-policies rules create - creates a
        Compute Engine network firewall policy rule

SYNOPSIS
    gcloud beta compute network-firewall-policies rules create PRIORITY
        --action=ACTION --firewall-policy=FIREWALL_POLICY
        --layer4-configs=[LAYER4_CONFIG,...] [--description=DESCRIPTION]
        [--dest-address-groups=[DEST_ADDRESS_GROUPS,...]]
        [--dest-fqdns=[DEST_FQDNS,...]] [--dest-ip-ranges=[DEST_IP_RANGE,...]]
        [--dest-network-context=DEST_NETWORK_CONTEXT]
        [--dest-network-type=DEST_NETWORK_TYPE]
        [--dest-region-codes=[DEST_REGION_CODES,...]]
        [--dest-threat-intelligence=[DEST_THREAT_INTELLIGENCE_LISTS,...]]
        [--direction=DIRECTION] [--[no-]disabled] [--[no-]enable-logging]
        [--security-profile-group=SECURITY_PROFILE_GROUP]
        [--src-address-groups=[SOURCE_ADDRESS_GROUPS,...]]
        [--src-fqdns=[SOURCE_FQDNS,...]] [--src-ip-ranges=[SRC_IP_RANGE,...]]
        [--src-network-context=SRC_NETWORK_CONTEXT]
        [--src-network-type=SRC_NETWORK_TYPE]
        [--src-networks=[SRC_NETWORKS,...]]
        [--src-region-codes=[SOURCE_REGION_CODES,...]]
        [--src-secure-tags=[SOURCE_SECURE_TAGS,...]]
        [--src-threat-intelligence=[SOURCE_THREAT_INTELLIGENCE_LISTS,...]]
        [--target-forwarding-rules=[TARGET_FORWARDING_RULES,...]]
        [--target-secure-tags=[TARGET_SECURE_TAGS,...]]
        [--target-service-accounts=[TARGET_SERVICE_ACCOUNTS,...]]
        [--target-type=TARGET_TYPE] [--[no-]tls-inspect]
        [--firewall-policy-region=FIREWALL_POLICY_REGION
          | --global-firewall-policy] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute network-firewall-policies rules delete

```text
NAME
    gcloud beta compute network-firewall-policies rules delete - deletes a
        Compute Engine network firewall policy rule

SYNOPSIS
    gcloud beta compute network-firewall-policies rules delete PRIORITY
        --firewall-policy=FIREWALL_POLICY
        [--firewall-policy-region=FIREWALL_POLICY_REGION
          | --global-firewall-policy] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute network-firewall-policies rules describe

```text
NAME
    gcloud beta compute network-firewall-policies rules describe - describes a
        Compute Engine network firewall policy rule

SYNOPSIS
    gcloud beta compute network-firewall-policies rules describe PRIORITY
        --firewall-policy=FIREWALL_POLICY
        [--firewall-policy-region=FIREWALL_POLICY_REGION
          | --global-firewall-policy] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute network-firewall-policies rules update

```text
NAME
    gcloud beta compute network-firewall-policies rules update - updates a
        Compute Engine network firewall policy rule

SYNOPSIS
    gcloud beta compute network-firewall-policies rules update PRIORITY
        --firewall-policy=FIREWALL_POLICY [--action=ACTION]
        [--description=DESCRIPTION]
        [--dest-address-groups=[DEST_ADDRESS_GROUPS,...]]
        [--dest-fqdns=[DEST_FQDNS,...]] [--dest-ip-ranges=[DEST_IP_RANGE,...]]
        [--dest-network-context=DEST_NETWORK_CONTEXT]
        [--dest-network-type=DEST_NETWORK_TYPE]
        [--dest-region-codes=[DEST_REGION_CODES,...]]
        [--dest-threat-intelligence=[DEST_THREAT_INTELLIGENCE_LISTS,...]]
        [--direction=DIRECTION] [--[no-]disabled] [--[no-]enable-logging]
        [--layer4-configs=[LAYER4_CONFIG,...]] [--new-priority=NEW_PRIORITY]
        [--security-profile-group=SECURITY_PROFILE_GROUP]
        [--src-address-groups=[SOURCE_ADDRESS_GROUPS,...]]
        [--src-fqdns=[SOURCE_FQDNS,...]] [--src-ip-ranges=[SRC_IP_RANGE,...]]
        [--src-network-context=SRC_NETWORK_CONTEXT]
        [--src-network-type=SRC_NETWORK_TYPE]
        [--src-networks=[SRC_NETWORKS,...]]
        [--src-region-codes=[SOURCE_REGION_CODES,...]]
        [--src-secure-tags=[SOURCE_SECURE_TAGS,...]]
        [--src-threat-intelligence=[SOURCE_THREAT_INTELLIGENCE_LISTS,...]]
        [--target-forwarding-rules=[TARGET_FORWARDING_RULES,...]]
        [--target-secure-tags=[TARGET_SECURE_TAGS,...]]
        [--target-service-accounts=[TARGET_SERVICE_ACCOUNTS,...]]
        [--target-type=TARGET_TYPE] [--[no-]tls-inspect]
        [--firewall-policy-region=FIREWALL_POLICY_REGION
          | --global-firewall-policy] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute network-firewall-policies rules create

```text
NAME
    gcloud alpha compute network-firewall-policies rules create - creates a
        Compute Engine network firewall policy rule

SYNOPSIS
    gcloud alpha compute network-firewall-policies rules create PRIORITY
        --action=ACTION --firewall-policy=FIREWALL_POLICY
        --layer4-configs=[LAYER4_CONFIG,...] [--description=DESCRIPTION]
        [--dest-address-groups=[DEST_ADDRESS_GROUPS,...]]
        [--dest-fqdns=[DEST_FQDNS,...]] [--dest-ip-ranges=[DEST_IP_RANGE,...]]
        [--dest-network-context=DEST_NETWORK_CONTEXT]
        [--dest-network-type=DEST_NETWORK_TYPE]
        [--dest-region-codes=[DEST_REGION_CODES,...]]
        [--dest-threat-intelligence=[DEST_THREAT_INTELLIGENCE_LISTS,...]]
        [--direction=DIRECTION] [--[no-]disabled] [--[no-]enable-logging]
        [--security-profile-group=SECURITY_PROFILE_GROUP]
        [--src-address-groups=[SOURCE_ADDRESS_GROUPS,...]]
        [--src-fqdns=[SOURCE_FQDNS,...]] [--src-ip-ranges=[SRC_IP_RANGE,...]]
        [--src-network-context=SRC_NETWORK_CONTEXT]
        [--src-network-type=SRC_NETWORK_TYPE]
        [--src-networks=[SRC_NETWORKS,...]]
        [--src-region-codes=[SOURCE_REGION_CODES,...]]
        [--src-secure-tags=[SOURCE_SECURE_TAGS,...]]
        [--src-threat-intelligence=[SOURCE_THREAT_INTELLIGENCE_LISTS,...]]
        [--target-forwarding-rules=[TARGET_FORWARDING_RULES,...]]
        [--target-secure-tags=[TARGET_SECURE_TAGS,...]]
        [--target-service-accounts=[TARGET_SERVICE_ACCOUNTS,...]]
        [--target-type=TARGET_TYPE] [--[no-]tls-inspect]
        [--firewall-policy-region=FIREWALL_POLICY_REGION
          | --global-firewall-policy] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute network-firewall-policies rules delete

```text
NAME
    gcloud alpha compute network-firewall-policies rules delete - deletes a
        Compute Engine network firewall policy rule

SYNOPSIS
    gcloud alpha compute network-firewall-policies rules delete PRIORITY
        --firewall-policy=FIREWALL_POLICY
        [--firewall-policy-region=FIREWALL_POLICY_REGION
          | --global-firewall-policy] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute network-firewall-policies rules describe

```text
NAME
    gcloud alpha compute network-firewall-policies rules describe - describes a
        Compute Engine network firewall policy rule

SYNOPSIS
    gcloud alpha compute network-firewall-policies rules describe PRIORITY
        --firewall-policy=FIREWALL_POLICY
        [--firewall-policy-region=FIREWALL_POLICY_REGION
          | --global-firewall-policy] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute network-firewall-policies rules update

```text
NAME
    gcloud alpha compute network-firewall-policies rules update - updates a
        Compute Engine network firewall policy rule

SYNOPSIS
    gcloud alpha compute network-firewall-policies rules update PRIORITY
        --firewall-policy=FIREWALL_POLICY [--action=ACTION]
        [--description=DESCRIPTION]
        [--dest-address-groups=[DEST_ADDRESS_GROUPS,...]]
        [--dest-fqdns=[DEST_FQDNS,...]] [--dest-ip-ranges=[DEST_IP_RANGE,...]]
        [--dest-network-context=DEST_NETWORK_CONTEXT]
        [--dest-network-type=DEST_NETWORK_TYPE]
        [--dest-region-codes=[DEST_REGION_CODES,...]]
        [--dest-threat-intelligence=[DEST_THREAT_INTELLIGENCE_LISTS,...]]
        [--direction=DIRECTION] [--[no-]disabled] [--[no-]enable-logging]
        [--layer4-configs=[LAYER4_CONFIG,...]] [--new-priority=NEW_PRIORITY]
        [--security-profile-group=SECURITY_PROFILE_GROUP]
        [--src-address-groups=[SOURCE_ADDRESS_GROUPS,...]]
        [--src-fqdns=[SOURCE_FQDNS,...]] [--src-ip-ranges=[SRC_IP_RANGE,...]]
        [--src-network-context=SRC_NETWORK_CONTEXT]
        [--src-network-type=SRC_NETWORK_TYPE]
        [--src-networks=[SRC_NETWORKS,...]]
        [--src-region-codes=[SOURCE_REGION_CODES,...]]
        [--src-secure-tags=[SOURCE_SECURE_TAGS,...]]
        [--src-threat-intelligence=[SOURCE_THREAT_INTELLIGENCE_LISTS,...]]
        [--target-forwarding-rules=[TARGET_FORWARDING_RULES,...]]
        [--target-secure-tags=[TARGET_SECURE_TAGS,...]]
        [--target-service-accounts=[TARGET_SERVICE_ACCOUNTS,...]]
        [--target-type=TARGET_TYPE] [--[no-]tls-inspect]
        [--firewall-policy-region=FIREWALL_POLICY_REGION
          | --global-firewall-policy] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Corrected from the official docs (the help text above is verbatim): the `--src-networks` description says it "can only be specified when --src-network-type is VPC_NETWORKS", but `--src-network-type` is not in the GA SYNOPSIS (it appears only in the alpha and beta SYNOPSIS; gcloud 593.0.0 rejects it on the GA command: "--src-network-type flag is available in one or more alternate release tracks"). In GA, the flag whose valid values include `VPC_NETWORKS` is `--src-network-context`, so pass `--src-network-context=VPC_NETWORKS` with `--src-networks`. The `--[no-]disabled` description in `create` and `update` ends with "Use --disabled to enable and --no-disabled to disable", which reads the opposite of its first sentence ("Use this flag to disable the rule"): `--disabled` disables the rule (it no longer affects traffic), and `--no-disabled` enables it.
- Incomplete example: the `gcloud compute network-firewall-policies rules create` example omits `--layer4-configs`, which the SYNOPSIS requires (gcloud 593.0.0: "argument --layer4-configs: Must be specified."). Add the required flag (see FLAGS on this page).
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/network-firewall-policies/rules (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
