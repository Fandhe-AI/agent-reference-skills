---
source: https://docs.cloud.google.com/sdk/gcloud/reference/container/vmware/clusters
---

# gcloud container vmware clusters (part 2/2)

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud alpha container vmware clusters delete

```text
NAME
    gcloud alpha container vmware clusters delete - delete an Anthos cluster on
        VMware

SYNOPSIS
    gcloud alpha container vmware clusters delete
        (CLUSTER : --location=LOCATION) [--allow-missing] [--async] [--force]
        [--ignore-errors] [--validate-only] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container vmware clusters describe

```text
NAME
    gcloud alpha container vmware clusters describe - describe an Anthos
        cluster on VMware

SYNOPSIS
    gcloud alpha container vmware clusters describe
        (CLUSTER : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container vmware clusters enroll

```text
NAME
    gcloud alpha container vmware clusters enroll - enroll an Anthos cluster on
        VMware

SYNOPSIS
    gcloud alpha container vmware clusters enroll
        (CLUSTER : --location=LOCATION)
        (--admin-cluster-membership=ADMIN_CLUSTER_MEMBERSHIP
          : --admin-cluster-membership-location=ADMIN_CLUSTER_MEMBERSHIP_LOCATION --admin-cluster-membership-project=ADMIN_CLUSTER_MEMBERSHIP_PROJECT)
        [--async] [--local-name=LOCAL_NAME] [--validate-only]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container vmware clusters list

```text
NAME
    gcloud alpha container vmware clusters list - list Anthos clusters on
        VMware

SYNOPSIS
    gcloud alpha container vmware clusters list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container vmware clusters query-version-config

```text
NAME
    gcloud alpha container vmware clusters query-version-config - query
        versions for creating or upgrading an Anthos on VMware user cluster

SYNOPSIS
    gcloud alpha container vmware clusters query-version-config
        [--location=LOCATION]
        [--cluster=CLUSTER
          | [--admin-cluster-membership=ADMIN_CLUSTER_MEMBERSHIP
          : --admin-cluster-membership-location=ADMIN_CLUSTER_MEMBERSHIP_LOCATION; default="global" --admin-cluster-membership-project=ADMIN_CLUSTER_MEMBERSHIP_PROJECT]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container vmware clusters update

```text
NAME
    gcloud alpha container vmware clusters update - update an Anthos cluster on
        VMware

SYNOPSIS
    gcloud alpha container vmware clusters update
        (CLUSTER : --location=LOCATION) [--admin-users=ADMIN_USERS] [--async]
        [--description=DESCRIPTION]
        [--metal-lb-config-address-pools=[addresses=ADDRESSES],
          [avoid-buggy-ips=AVOID-BUGGY-IPS],
          [manual-assign=MANUAL-ASSIGN],[pool=POOL]]
        [--static-ip-config-ip-blocks=[gateway=GATEWAY],
          [ips=IPS],[netmask=NETMASK]]
        [--upgrade-policy=[control-plane-only=CONTROL-PLANE-ONLY]]
        [--validate-only] [--version=VERSION]
        [--add-annotations=[KEY1=VALUE1,KEY2=VALUE2,...]
          | --remove-annotations=[KEY1,KEY2,...]]
        [--cpus=CPUS --memory=MEMORY --disable-auto-resize
          | --enable-auto-resize] [--disable-aag-config | --enable-aag-config]
        [--disable-auto-repair | --enable-auto-repair]
        [--disable-vsphere-csi | --enable-vsphere-csi] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container vmware clusters upgrade

```text
NAME
    gcloud alpha container vmware clusters upgrade - centrally upgrade an
        Anthos cluster on VMware

SYNOPSIS
    gcloud alpha container vmware clusters upgrade
        (CLUSTER : --location=LOCATION) --version=VERSION
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/container/vmware/clusters (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
