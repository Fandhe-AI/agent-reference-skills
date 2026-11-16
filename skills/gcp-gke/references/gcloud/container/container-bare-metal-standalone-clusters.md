---
source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/container/bare-metal/standalone-clusters
---

# gcloud container bare-metal standalone-clusters

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud alpha container bare-metal standalone-clusters describe

```text
NAME
    gcloud alpha container bare-metal standalone-clusters describe - describe
        an Anthos on bare metal standalone cluster

SYNOPSIS
    gcloud alpha container bare-metal standalone-clusters describe
        (STANDALONE_CLUSTER : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container bare-metal standalone-clusters enroll

```text
NAME
    gcloud alpha container bare-metal standalone-clusters enroll - enroll an
        Anthos on bare metal standalone cluster

SYNOPSIS
    gcloud alpha container bare-metal standalone-clusters enroll
        (STANDALONE_CLUSTER : --location=LOCATION)
        (--membership=MEMBERSHIP : --membership-location=MEMBERSHIP_LOCATION
          --membership-project=MEMBERSHIP_PROJECT) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container bare-metal standalone-clusters list

```text
NAME
    gcloud alpha container bare-metal standalone-clusters list - list Anthos on
        bare metal standalone clusters

SYNOPSIS
    gcloud alpha container bare-metal standalone-clusters list
        [--location=LOCATION] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container bare-metal standalone-clusters query-version-config

```text
NAME
    gcloud alpha container bare-metal standalone-clusters query-version-config
        - query versions for upgrading an Anthos on bare metal standalone
        cluster

SYNOPSIS
    gcloud alpha container bare-metal standalone-clusters query-version-config
        [--location=LOCATION] [--standalone-cluster=STANDALONE_CLUSTER]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container bare-metal standalone-clusters unenroll

```text
NAME
    gcloud alpha container bare-metal standalone-clusters unenroll - unenroll
        an Anthos on bare metal standalone cluster

SYNOPSIS
    gcloud alpha container bare-metal standalone-clusters unenroll
        (STANDALONE_CLUSTER : --location=LOCATION) [--allow-missing] [--async]
        [--ignore-errors] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container bare-metal standalone-clusters update

```text
NAME
    gcloud alpha container bare-metal standalone-clusters update - update an
        Anthos on bare metal standalone cluster

SYNOPSIS
    gcloud alpha container bare-metal standalone-clusters update
        (STANDALONE_CLUSTER : --location=LOCATION) [--admin-users=ADMIN_USERS]
        [--allow-missing] [--async]
        [--binauthz-evaluation-mode=BINAUTHZ_EVALUATION_MODE]
        [--description=DESCRIPTION] [--enable-application-logs]
        [--login-user=LOGIN_USER]
        [--maintenance-address-cidr-blocks=[MAINTENANCE_ADDRESS_CIDR_BLOCKS,
          ...]] [--validate-only] [--version=VERSION]
        [--add-annotations=[KEY1=VALUE1,KEY2=VALUE2,...]
          | --remove-annotations=[KEY1,KEY2,...]]
        [--api-server-args=[KEY=VALUE,...]
          --control-plane-node-configs=[labels=LABELS],[node-ip=NODE-IP]
          --control-plane-node-labels=[KEY=VALUE,...]
          --control-plane-node-taints=[KEY=VALUE:EFFECT,...]]
        [--bgp-lb-address-pools=[addresses=ADDRESSES],
          [avoid-buggy-ips=AVOID-BUGGY-IPS],
          [manual-assign=MANUAL-ASSIGN],[pool=POOL] --bgp-lb-asn=BGP_LB_ASN
          --bgp-lb-peer-configs=[asn=ASN],
          [control-plane-nodes=CONTROL-PLANE-NODES],[ip-address=IP-ADDRESS]
          --bgp-lb-load-balancer-node-configs=[labels=LABELS],[node-ip=NODE-IP]
          --bgp-lb-load-balancer-node-labels=[KEY=VALUE,...]
          --bgp-lb-load-balancer-node-taints=[KEY=VALUE:EFFECT,...]
          | --metal-lb-address-pools=[addresses=ADDRESSES],
          [avoid-buggy-ips=AVOID-BUGGY-IPS],
          [manual-assign=MANUAL-ASSIGN],[pool=POOL]
          --metal-lb-load-balancer-node-configs=[labels=LABELS],
          [node-ip=NODE-IP]
          --metal-lb-load-balancer-node-labels=[KEY=VALUE,...]
          --metal-lb-load-balancer-node-taints=[KEY=VALUE:EFFECT,...]]
        [--island-mode-service-address-cidr-blocks=SERVICE_ADDRESS,[...]
          --disable-sr-iov-config | --enable-sr-iov-config]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/container/bare-metal/standalone-clusters (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
