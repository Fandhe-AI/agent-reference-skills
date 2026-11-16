---
source: https://docs.cloud.google.com/sdk/gcloud/reference/container/bare-metal/clusters
---

# gcloud container bare-metal clusters (part 2/2)

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud beta container bare-metal clusters query-version-config

```text
NAME
    gcloud beta container bare-metal clusters query-version-config - query
        versions for creating or upgrading an Anthos on bare metal user cluster

SYNOPSIS
    gcloud beta container bare-metal clusters query-version-config
        [--location=LOCATION]
        [--cluster=CLUSTER
          | [--admin-cluster-membership=ADMIN_CLUSTER_MEMBERSHIP
          : --admin-cluster-membership-location=ADMIN_CLUSTER_MEMBERSHIP_LOCATION; default="global" --admin-cluster-membership-project=ADMIN_CLUSTER_MEMBERSHIP_PROJECT]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container bare-metal clusters update

```text
NAME
    gcloud beta container bare-metal clusters update - update an Anthos cluster
        on bare metal

SYNOPSIS
    gcloud beta container bare-metal clusters update
        (CLUSTER : --location=LOCATION) [--admin-users=ADMIN_USERS]
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
          --control-plane-node-taints=[KEY=VALUE:EFFECT,...]
          --control-plane-registry-burst=CONTROL_PLANE_REGISTRY_BURST
          --control-plane-registry-pull-qps=CONTROL_PLANE_REGISTRY_PULL_QPS
          --disable-control-plane-serialize-image-pulls
          | --enable-control-plane-serialize-image-pulls]
        [--bgp-address-pools=[addresses=ADDRESSES],
          [avoid-buggy-ips=AVOID-BUGGY-IPS],
          [manual-assign=MANUAL-ASSIGN],[pool=POOL] --bgp-asn=BGP_ASN
          --bgp-peer-configs=[asn=ASN,
          ip=IP,control-plane-nodes=NODE_IP_1;NODE_IP_2,...]
          --bgp-load-balancer-node-configs=[node-ip=IP,
          labels=KEY1=VALUE1;KEY2=VALUE2,...]
          --bgp-load-balancer-node-labels=[KEY=VALUE,...]
          --bgp-load-balancer-node-taints=[KEY=VALUE:EFFECT,...]
          --bgp-load-balancer-registry-burst=BGP_LOAD_BALANCER_REGISTRY_BURST
          --bgp-load-balancer-registry-pull-qps=BGP_LOAD_BALANCER_REGISTRY_PULL_QPS --disable-bgp-load-balancer-serialize-image-pulls | --enable-bgp-load-balancer-serialize-image-pulls | --metal-lb-address-pools=[addresses=ADDRESSES],
          [avoid-buggy-ips=AVOID-BUGGY-IPS],
          [manual-assign=MANUAL-ASSIGN],[pool=POOL]
          --metal-lb-load-balancer-node-configs=[labels=LABELS],
          [node-ip=NODE-IP]
          --metal-lb-load-balancer-node-labels=[KEY=VALUE,...]
          --metal-lb-load-balancer-node-taints=[KEY=VALUE:EFFECT,...]
          --metal-lb-load-balancer-registry-burst=METAL_LB_LOAD_BALANCER_REGISTRY_BURST --metal-lb-load-balancer-registry-pull-qps=METAL_LB_LOAD_BALANCER_REGISTRY_PULL_QPS --disable-metal-lb-load-balancer-serialize-image-pulls | --enable-metal-lb-load-balancer-serialize-image-pulls]
        [--island-mode-service-address-cidr-blocks=SERVICE_ADDRESS,[...]
          --disable-sr-iov-config | --enable-sr-iov-config]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container bare-metal clusters create

```text
NAME
    gcloud alpha container bare-metal clusters create - create an Anthos
        cluster on bare metal

SYNOPSIS
    gcloud alpha container bare-metal clusters create
        (CLUSTER : --location=LOCATION) --version=VERSION
        (--admin-cluster-membership=ADMIN_CLUSTER_MEMBERSHIP
          : --admin-cluster-membership-location=ADMIN_CLUSTER_MEMBERSHIP_LOCATION --admin-cluster-membership-project=ADMIN_CLUSTER_MEMBERSHIP_PROJECT)
        (--control-plane-load-balancer-port=CONTROL_PLANE_LOAD_BALANCER_PORT
          (--control-plane-vip=CONTROL_PLANE_VIP
          --ingress-vip=INGRESS_VIP) (--enable-manual-lb
          | [--bgp-address-pools=[addresses=ADDRESSES],
          [avoid-buggy-ips=AVOID-BUGGY-IPS],
          [manual-assign=MANUAL-ASSIGN],[pool=POOL] --bgp-asn=BGP_ASN
          --bgp-peer-configs=[asn=ASN,
          ip=IP,control-plane-nodes=NODE_IP_1;NODE_IP_2,...]
          : [--bgp-load-balancer-node-configs=[node-ip=IP,
          labels=KEY1=VALUE1;KEY2=VALUE2,...]
          : --bgp-load-balancer-node-labels=[KEY=VALUE,...]
          --bgp-load-balancer-node-taints=[KEY=VALUE:EFFECT,...]
          --bgp-load-balancer-registry-burst=BGP_LOAD_BALANCER_REGISTRY_BURST
          --bgp-load-balancer-registry-pull-qps=BGP_LOAD_BALANCER_REGISTRY_PULL_QPS --disable-bgp-load-balancer-serialize-image-pulls]] | [--metal-lb-address-pools=[addresses=ADDRESSES],
          [avoid-buggy-ips=AVOID-BUGGY-IPS],
          [manual-assign=MANUAL-ASSIGN],[pool=POOL]
          : --metal-lb-load-balancer-node-configs=[labels=LABELS],
          [node-ip=NODE-IP]
          --metal-lb-load-balancer-node-labels=[KEY=VALUE,...]
          --metal-lb-load-balancer-node-taints=[KEY=VALUE:EFFECT,...]
          --disable-metal-lb-load-balancer-serialize-image-pulls
          --metal-lb-load-balancer-registry-burst=METAL_LB_LOAD_BALANCER_REGISTRY_BURST --metal-lb-load-balancer-registry-pull-qps=METAL_LB_LOAD_BALANCER_REGISTRY_PULL_QPS]))
        ((((--control-plane-node-configs=[labels=LABELS],[node-ip=NODE-IP]
          : --control-plane-node-labels=[KEY=VALUE,...]
          --control-plane-node-taints=[KEY=VALUE:EFFECT,...]
          --control-plane-registry-burst=CONTROL_PLANE_REGISTRY_BURST
          --control-plane-registry-pull-qps=CONTROL_PLANE_REGISTRY_PULL_QPS
          --disable-control-plane-serialize-image-pulls)))
          : --api-server-args=[KEY=VALUE,...])
        ((--lvp-node-mounts-config-path=LVP_NODE_MOUNTS_CONFIG_PATH
          --lvp-node-mounts-config-storage-class=LVP_NODE_MOUNTS_CONFIG_STORAGE_CLASS) ((--lvp-share-path=LVP_SHARE_PATH --lvp-share-storage-class=LVP_SHARE_STORAGE_CLASS) : --shared-path-pv-count=SHARED_PATH_PV_COUNT))
        [--admin-users=ADMIN_USERS] [--annotations=[KEY=VALUE,...]] [--async]
        [--binauthz-evaluation-mode=BINAUTHZ_EVALUATION_MODE]
        [--description=DESCRIPTION] [--enable-application-logs]
        [--login-user=LOGIN_USER]
        [--maintenance-address-cidr-blocks=[MAINTENANCE_ADDRESS_CIDR_BLOCKS,
          ...]] [--upgrade-control-plane=UPGRADE_CONTROL_PLANE]
        [--validate-only]
        [--container-runtime=CONTAINER_RUNTIME
          --max-pods-per-node=MAX_PODS_PER_NODE]
        [[(--island-mode-pod-address-cidr-blocks=POD_ADDRESS,[POD_ADDRESS,...]
          --island-mode-service-address-cidr-blocks=SERVICE_ADDRESS,[...])
          : --enable-advanced-networking
          --enable-multi-nic-config --enable-sr-iov-config]]
        [--uri=URI : --no-proxy=[NO_PROXY,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container bare-metal clusters delete

```text
NAME
    gcloud alpha container bare-metal clusters delete - delete an Anthos
        cluster on bare metal

SYNOPSIS
    gcloud alpha container bare-metal clusters delete
        (CLUSTER : --location=LOCATION) [--allow-missing] [--async] [--force]
        [--ignore-errors] [--validate-only] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container bare-metal clusters describe

```text
NAME
    gcloud alpha container bare-metal clusters describe - describe an Anthos
        cluster on bare metal

SYNOPSIS
    gcloud alpha container bare-metal clusters describe
        (CLUSTER : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container bare-metal clusters enroll

```text
NAME
    gcloud alpha container bare-metal clusters enroll - enroll an Anthos
        cluster on bare metal

SYNOPSIS
    gcloud alpha container bare-metal clusters enroll
        (CLUSTER : --location=LOCATION)
        (--admin-cluster-membership=ADMIN_CLUSTER_MEMBERSHIP
          : --admin-cluster-membership-location=ADMIN_CLUSTER_MEMBERSHIP_LOCATION --admin-cluster-membership-project=ADMIN_CLUSTER_MEMBERSHIP_PROJECT)
        [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container bare-metal clusters list

```text
NAME
    gcloud alpha container bare-metal clusters list - list Anthos clusters on
        bare metal

SYNOPSIS
    gcloud alpha container bare-metal clusters list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container bare-metal clusters query-version-config

```text
NAME
    gcloud alpha container bare-metal clusters query-version-config - query
        versions for creating or upgrading an Anthos on bare metal user cluster

SYNOPSIS
    gcloud alpha container bare-metal clusters query-version-config
        [--location=LOCATION]
        [--cluster=CLUSTER
          | [--admin-cluster-membership=ADMIN_CLUSTER_MEMBERSHIP
          : --admin-cluster-membership-location=ADMIN_CLUSTER_MEMBERSHIP_LOCATION; default="global" --admin-cluster-membership-project=ADMIN_CLUSTER_MEMBERSHIP_PROJECT]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container bare-metal clusters update

```text
NAME
    gcloud alpha container bare-metal clusters update - update an Anthos
        cluster on bare metal

SYNOPSIS
    gcloud alpha container bare-metal clusters update
        (CLUSTER : --location=LOCATION) [--admin-users=ADMIN_USERS]
        [--allow-missing] [--async]
        [--binauthz-evaluation-mode=BINAUTHZ_EVALUATION_MODE]
        [--description=DESCRIPTION] [--enable-application-logs]
        [--login-user=LOGIN_USER]
        [--maintenance-address-cidr-blocks=[MAINTENANCE_ADDRESS_CIDR_BLOCKS,
          ...]] [--upgrade-control-plane=UPGRADE_CONTROL_PLANE]
        [--validate-only] [--version=VERSION]
        [--add-annotations=[KEY1=VALUE1,KEY2=VALUE2,...]
          | --remove-annotations=[KEY1,KEY2,...]]
        [--api-server-args=[KEY=VALUE,...]
          --control-plane-node-configs=[labels=LABELS],[node-ip=NODE-IP]
          --control-plane-node-labels=[KEY=VALUE,...]
          --control-plane-node-taints=[KEY=VALUE:EFFECT,...]
          --control-plane-registry-burst=CONTROL_PLANE_REGISTRY_BURST
          --control-plane-registry-pull-qps=CONTROL_PLANE_REGISTRY_PULL_QPS
          --disable-control-plane-serialize-image-pulls
          | --enable-control-plane-serialize-image-pulls]
        [--bgp-address-pools=[addresses=ADDRESSES],
          [avoid-buggy-ips=AVOID-BUGGY-IPS],
          [manual-assign=MANUAL-ASSIGN],[pool=POOL] --bgp-asn=BGP_ASN
          --bgp-peer-configs=[asn=ASN,
          ip=IP,control-plane-nodes=NODE_IP_1;NODE_IP_2,...]
          --bgp-load-balancer-node-configs=[node-ip=IP,
          labels=KEY1=VALUE1;KEY2=VALUE2,...]
          --bgp-load-balancer-node-labels=[KEY=VALUE,...]
          --bgp-load-balancer-node-taints=[KEY=VALUE:EFFECT,...]
          --bgp-load-balancer-registry-burst=BGP_LOAD_BALANCER_REGISTRY_BURST
          --bgp-load-balancer-registry-pull-qps=BGP_LOAD_BALANCER_REGISTRY_PULL_QPS --disable-bgp-load-balancer-serialize-image-pulls | --enable-bgp-load-balancer-serialize-image-pulls | --metal-lb-address-pools=[addresses=ADDRESSES],
          [avoid-buggy-ips=AVOID-BUGGY-IPS],
          [manual-assign=MANUAL-ASSIGN],[pool=POOL]
          --metal-lb-load-balancer-node-configs=[labels=LABELS],
          [node-ip=NODE-IP]
          --metal-lb-load-balancer-node-labels=[KEY=VALUE,...]
          --metal-lb-load-balancer-node-taints=[KEY=VALUE:EFFECT,...]
          --metal-lb-load-balancer-registry-burst=METAL_LB_LOAD_BALANCER_REGISTRY_BURST --metal-lb-load-balancer-registry-pull-qps=METAL_LB_LOAD_BALANCER_REGISTRY_PULL_QPS --disable-metal-lb-load-balancer-serialize-image-pulls | --enable-metal-lb-load-balancer-serialize-image-pulls]
        [--island-mode-service-address-cidr-blocks=SERVICE_ADDRESS,[...]
          --disable-sr-iov-config | --enable-sr-iov-config]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/container/bare-metal/clusters (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
