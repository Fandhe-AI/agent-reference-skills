---
source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/compute/firewall-policies/mirroring-rules
---

# gcloud compute firewall-policies mirroring-rules

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud beta compute firewall-policies mirroring-rules create

```text
NAME
    gcloud beta compute firewall-policies mirroring-rules create - creates a
        Compute Engine firewall policy packet mirroring rule

SYNOPSIS
    gcloud beta compute firewall-policies mirroring-rules create PRIORITY
        --action=ACTION --firewall-policy=FIREWALL_POLICY
        --layer4-configs=[LAYER4_CONFIG,...] [--description=DESCRIPTION]
        [--dest-ip-ranges=[DEST_IP_RANGE,...]] [--direction=DIRECTION]
        [--[no-]disabled] [--organization=ORGANIZATION]
        [--security-profile-group=SECURITY_PROFILE_GROUP]
        [--src-ip-ranges=[SRC_IP_RANGE,...]]
        [--target-resources=[TARGET_RESOURCES,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute firewall-policies mirroring-rules delete

```text
NAME
    gcloud beta compute firewall-policies mirroring-rules delete - deletes a
        Compute Engine organization firewall policy packet mirroring rule

SYNOPSIS
    gcloud beta compute firewall-policies mirroring-rules delete PRIORITY
        --firewall-policy=FIREWALL_POLICY [--organization=ORGANIZATION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute firewall-policies mirroring-rules describe

```text
NAME
    gcloud beta compute firewall-policies mirroring-rules describe - describes
        a Compute Engine organization firewall policy packet mirroring rule

SYNOPSIS
    gcloud beta compute firewall-policies mirroring-rules describe PRIORITY
        --firewall-policy=FIREWALL_POLICY [--organization=ORGANIZATION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute firewall-policies mirroring-rules update

```text
NAME
    gcloud beta compute firewall-policies mirroring-rules update - updates a
        Compute Engine firewall policy packet mirroring rule

SYNOPSIS
    gcloud beta compute firewall-policies mirroring-rules update PRIORITY
        --firewall-policy=FIREWALL_POLICY [--action=ACTION]
        [--description=DESCRIPTION] [--dest-ip-ranges=[DEST_IP_RANGE,...]]
        [--direction=DIRECTION] [--[no-]disabled]
        [--layer4-configs=[LAYER4_CONFIG,...]] [--new-priority=NEW_PRIORITY]
        [--organization=ORGANIZATION]
        [--security-profile-group=SECURITY_PROFILE_GROUP]
        [--src-ip-ranges=[SRC_IP_RANGE,...]]
        [--target-resources=[TARGET_RESOURCES,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute firewall-policies mirroring-rules create

```text
NAME
    gcloud alpha compute firewall-policies mirroring-rules create - creates a
        Compute Engine firewall policy packet mirroring rule

SYNOPSIS
    gcloud alpha compute firewall-policies mirroring-rules create PRIORITY
        --action=ACTION --firewall-policy=FIREWALL_POLICY
        --layer4-configs=[LAYER4_CONFIG,...] [--description=DESCRIPTION]
        [--dest-ip-ranges=[DEST_IP_RANGE,...]] [--direction=DIRECTION]
        [--[no-]disabled] [--organization=ORGANIZATION]
        [--security-profile-group=SECURITY_PROFILE_GROUP]
        [--src-ip-ranges=[SRC_IP_RANGE,...]]
        [--target-resources=[TARGET_RESOURCES,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute firewall-policies mirroring-rules delete

```text
NAME
    gcloud alpha compute firewall-policies mirroring-rules delete - deletes a
        Compute Engine organization firewall policy packet mirroring rule

SYNOPSIS
    gcloud alpha compute firewall-policies mirroring-rules delete PRIORITY
        --firewall-policy=FIREWALL_POLICY [--organization=ORGANIZATION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute firewall-policies mirroring-rules describe

```text
NAME
    gcloud alpha compute firewall-policies mirroring-rules describe - describes
        a Compute Engine organization firewall policy packet mirroring rule

SYNOPSIS
    gcloud alpha compute firewall-policies mirroring-rules describe PRIORITY
        --firewall-policy=FIREWALL_POLICY [--organization=ORGANIZATION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute firewall-policies mirroring-rules update

```text
NAME
    gcloud alpha compute firewall-policies mirroring-rules update - updates a
        Compute Engine firewall policy packet mirroring rule

SYNOPSIS
    gcloud alpha compute firewall-policies mirroring-rules update PRIORITY
        --firewall-policy=FIREWALL_POLICY [--action=ACTION]
        [--description=DESCRIPTION] [--dest-ip-ranges=[DEST_IP_RANGE,...]]
        [--direction=DIRECTION] [--[no-]disabled]
        [--layer4-configs=[LAYER4_CONFIG,...]] [--new-priority=NEW_PRIORITY]
        [--organization=ORGANIZATION]
        [--security-profile-group=SECURITY_PROFILE_GROUP]
        [--src-ip-ranges=[SRC_IP_RANGE,...]]
        [--target-resources=[TARGET_RESOURCES,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/compute/firewall-policies/mirroring-rules (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
