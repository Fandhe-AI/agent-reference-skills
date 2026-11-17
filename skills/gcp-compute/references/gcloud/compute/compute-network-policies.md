---
source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/compute/network-policies
---

# gcloud compute network-policies

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud beta compute network-policies associations create

```text
NAME
    gcloud beta compute network-policies associations create - create a new
        association between a network policy and a network

SYNOPSIS
    gcloud beta compute network-policies associations create --network=NETWORK
        --network-policy=NETWORK_POLICY [--name=NAME]
        [--network-policy-region=NETWORK_POLICY_REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute network-policies associations delete

```text
NAME
    gcloud beta compute network-policies associations delete - delete an
        association between a network policy and a network

SYNOPSIS
    gcloud beta compute network-policies associations delete --name=NAME
        --network-policy=NETWORK_POLICY
        [--network-policy-region=NETWORK_POLICY_REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute network-policies associations describe

```text
NAME
    gcloud beta compute network-policies associations describe - describe an
        association between a network policy and a network

SYNOPSIS
    gcloud beta compute network-policies associations describe --name=NAME
        --network-policy=NETWORK_POLICY
        [--network-policy-region=NETWORK_POLICY_REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute network-policies create

```text
NAME
    gcloud beta compute network-policies create - create a Compute Engine
        network policy

SYNOPSIS
    gcloud beta compute network-policies create NETWORK_POLICY
        [--description=DESCRIPTION] [--region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute network-policies delete

```text
NAME
    gcloud beta compute network-policies delete - delete a Compute Engine
        network policy

SYNOPSIS
    gcloud beta compute network-policies delete NETWORK_POLICY
        [--region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute network-policies describe

```text
NAME
    gcloud beta compute network-policies describe - describe a Compute Engine
        network policy

SYNOPSIS
    gcloud beta compute network-policies describe NETWORK_POLICY
        [--region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute network-policies list

```text
NAME
    gcloud beta compute network-policies list - list Compute Engine network
        policies

SYNOPSIS
    gcloud beta compute network-policies list [--regions=REGION,[REGION,...]]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute network-policies traffic-classification-rules create

```text
NAME
    gcloud beta compute network-policies traffic-classification-rules create -
        creates a Compute Engine network policy rule

SYNOPSIS
    gcloud beta compute network-policies traffic-classification-rules create
        --action=ACTION --dscp-mode=DSCP_MODE
        --layer4-configs=[LAYER4_CONFIG,...] --network-policy=NETWORK_POLICY
        --priority=PRIORITY --traffic-class=TRAFFIC_CLASS
        [--description=DESCRIPTION] [--dest-ip-ranges=[DEST_IP_RANGE,...]]
        [--[no-]disabled] [--dscp-value=DSCP_VALUE] [--name=NAME]
        [--network-policy-region=NETWORK_POLICY_REGION]
        [--src-ip-ranges=[SRC_IP_RANGE,...]]
        [--target-secure-tags=[TARGET_SECURE_TAGS,...]]
        [--target-service-accounts=[TARGET_SERVICE_ACCOUNTS,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute network-policies traffic-classification-rules delete

```text
NAME
    gcloud beta compute network-policies traffic-classification-rules delete -
        deletes a Compute Engine network policy rule

SYNOPSIS
    gcloud beta compute network-policies traffic-classification-rules delete
        --network-policy=NETWORK_POLICY --priority=PRIORITY
        [--network-policy-region=NETWORK_POLICY_REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute network-policies traffic-classification-rules describe

```text
NAME
    gcloud beta compute network-policies traffic-classification-rules describe
        - describes a Compute Engine network policy rule

SYNOPSIS
    gcloud beta compute network-policies traffic-classification-rules describe
        --network-policy=NETWORK_POLICY --priority=PRIORITY
        [--network-policy-region=NETWORK_POLICY_REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute network-policies traffic-classification-rules update

```text
NAME
    gcloud beta compute network-policies traffic-classification-rules update -
        updates a Compute Engine network policy rule

SYNOPSIS
    gcloud beta compute network-policies traffic-classification-rules update
        --network-policy=NETWORK_POLICY --priority=PRIORITY [--action=ACTION]
        [--description=DESCRIPTION] [--dest-ip-ranges=[DEST_IP_RANGE,...]]
        [--[no-]disabled] [--dscp-mode=DSCP_MODE] [--dscp-value=DSCP_VALUE]
        [--layer4-configs=[LAYER4_CONFIG,...]]
        [--network-policy-region=NETWORK_POLICY_REGION]
        [--new-priority=NEW_PRIORITY] [--src-ip-ranges=[SRC_IP_RANGE,...]]
        [--target-secure-tags=[TARGET_SECURE_TAGS,...]]
        [--target-service-accounts=[TARGET_SERVICE_ACCOUNTS,...]]
        [--traffic-class=TRAFFIC_CLASS] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute network-policies update

```text
NAME
    gcloud beta compute network-policies update - update a Compute Engine
        network policy

SYNOPSIS
    gcloud beta compute network-policies update NETWORK_POLICY
        [--description=DESCRIPTION] [--region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute network-policies associations create

```text
NAME
    gcloud alpha compute network-policies associations create - create a new
        association between a network policy and a network

SYNOPSIS
    gcloud alpha compute network-policies associations create --network=NETWORK
        --network-policy=NETWORK_POLICY [--name=NAME]
        [--network-policy-region=NETWORK_POLICY_REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute network-policies associations delete

```text
NAME
    gcloud alpha compute network-policies associations delete - delete an
        association between a network policy and a network

SYNOPSIS
    gcloud alpha compute network-policies associations delete --name=NAME
        --network-policy=NETWORK_POLICY
        [--network-policy-region=NETWORK_POLICY_REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute network-policies associations describe

```text
NAME
    gcloud alpha compute network-policies associations describe - describe an
        association between a network policy and a network

SYNOPSIS
    gcloud alpha compute network-policies associations describe --name=NAME
        --network-policy=NETWORK_POLICY
        [--network-policy-region=NETWORK_POLICY_REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute network-policies create

```text
NAME
    gcloud alpha compute network-policies create - create a Compute Engine
        network policy

SYNOPSIS
    gcloud alpha compute network-policies create NETWORK_POLICY
        [--description=DESCRIPTION] [--region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute network-policies delete

```text
NAME
    gcloud alpha compute network-policies delete - delete a Compute Engine
        network policy

SYNOPSIS
    gcloud alpha compute network-policies delete NETWORK_POLICY
        [--region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute network-policies describe

```text
NAME
    gcloud alpha compute network-policies describe - describe a Compute Engine
        network policy

SYNOPSIS
    gcloud alpha compute network-policies describe NETWORK_POLICY
        [--region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute network-policies list

```text
NAME
    gcloud alpha compute network-policies list - list Compute Engine network
        policies

SYNOPSIS
    gcloud alpha compute network-policies list [--regions=REGION,[REGION,...]]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute network-policies traffic-classification-rules create

```text
NAME
    gcloud alpha compute network-policies traffic-classification-rules create -
        creates a Compute Engine network policy rule

SYNOPSIS
    gcloud alpha compute network-policies traffic-classification-rules create
        --action=ACTION --dscp-mode=DSCP_MODE
        --layer4-configs=[LAYER4_CONFIG,...] --network-policy=NETWORK_POLICY
        --priority=PRIORITY --traffic-class=TRAFFIC_CLASS
        [--description=DESCRIPTION]
        [--dest-address-groups=[DEST_ADDRESS_GROUP,...]]
        [--dest-ip-ranges=[DEST_IP_RANGE,...]] [--[no-]disabled]
        [--dscp-value=DSCP_VALUE] [--name=NAME]
        [--network-policy-region=NETWORK_POLICY_REGION]
        [--src-ip-ranges=[SRC_IP_RANGE,...]]
        [--target-secure-tags=[TARGET_SECURE_TAGS,...]]
        [--target-service-accounts=[TARGET_SERVICE_ACCOUNTS,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute network-policies traffic-classification-rules delete

```text
NAME
    gcloud alpha compute network-policies traffic-classification-rules delete -
        deletes a Compute Engine network policy rule

SYNOPSIS
    gcloud alpha compute network-policies traffic-classification-rules delete
        --network-policy=NETWORK_POLICY --priority=PRIORITY
        [--network-policy-region=NETWORK_POLICY_REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute network-policies traffic-classification-rules describe

```text
NAME
    gcloud alpha compute network-policies traffic-classification-rules describe
        - describes a Compute Engine network policy rule

SYNOPSIS
    gcloud alpha compute network-policies traffic-classification-rules describe
        --network-policy=NETWORK_POLICY --priority=PRIORITY
        [--network-policy-region=NETWORK_POLICY_REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute network-policies traffic-classification-rules update

```text
NAME
    gcloud alpha compute network-policies traffic-classification-rules update -
        updates a Compute Engine network policy rule

SYNOPSIS
    gcloud alpha compute network-policies traffic-classification-rules update
        --network-policy=NETWORK_POLICY --priority=PRIORITY [--action=ACTION]
        [--description=DESCRIPTION]
        [--dest-address-groups=[DEST_ADDRESS_GROUP,...]]
        [--dest-ip-ranges=[DEST_IP_RANGE,...]] [--[no-]disabled]
        [--dscp-mode=DSCP_MODE] [--dscp-value=DSCP_VALUE]
        [--layer4-configs=[LAYER4_CONFIG,...]]
        [--network-policy-region=NETWORK_POLICY_REGION]
        [--new-priority=NEW_PRIORITY] [--src-ip-ranges=[SRC_IP_RANGE,...]]
        [--target-secure-tags=[TARGET_SECURE_TAGS,...]]
        [--target-service-accounts=[TARGET_SERVICE_ACCOUNTS,...]]
        [--traffic-class=TRAFFIC_CLASS] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute network-policies update

```text
NAME
    gcloud alpha compute network-policies update - update a Compute Engine
        network policy

SYNOPSIS
    gcloud alpha compute network-policies update NETWORK_POLICY
        [--description=DESCRIPTION] [--region=REGION] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/compute/network-policies (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
