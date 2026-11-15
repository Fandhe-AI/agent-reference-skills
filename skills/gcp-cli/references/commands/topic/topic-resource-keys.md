---
source: https://docs.cloud.google.com/sdk/gcloud/reference/topic/resource-keys
---

# gcloud topic resource-keys

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud topic resource-keys

```text
NAME
    gcloud topic resource-keys - resource keys supplementary help

DESCRIPTION
    A resource is a JSON-serializable object organized as a tree. Each node is
    a scalar, indexed array, or dictionary. Structs and classes are represented
    by dictionaries indexed by member name.

    Each node is reachable by a unique path of names from the root. A node key
    is the path names separated by '.'. [number] represents an array index. For
    example:

        foo
        foo.bar
        abc.def[3].ghi

    The resource keys and data values for any gcloud list command can be
    printed by running gcloud ... list --format=flattened. See the command
    specific documentation for details on specific resource keys.

EXAMPLES
    This command lists the keys and values for the regions resource:

        $ gcloud compute regions list --format=flattened

    and here is sample output for the command:

        ---
        creationTimestamp: 2013-05-23T07:02:09.522-07:00
        description:       us-central1
        id:                22115839677829654
        kind:              compute#region
        name:              us-central1
        quotas[0].limit:   24.0
        quotas[0].metric:  CPUS
        quotas[0].usage:   15.0
        quotas[1].limit:   5120.0
        quotas[1].metric:  DISKS_TOTAL_GB
        quotas[1].usage:   1416.0
        quotas[2].limit:   7.0
        quotas[2].metric:  STATIC_ADDRESSES
        quotas[2].usage:   1.0
        quotas[3].limit:   23.0
        quotas[3].metric:  IN_USE_ADDRESSES
        quotas[3].usage:   16.0
        quotas[4].limit:   1024.0
        quotas[4].metric:  SSD_TOTAL_GB
        quotas[4].usage:   0.0
        quotas[5].limit:   1500.0
        quotas[5].metric:  LOCAL_SSD_TOTAL_GB
        quotas[5].usage:   750.0
        selfLink:          https://www.googleapis.com/.../us-central1
        status:            UP
        zones[0]:          us-central1-a
        zones[1]:          us-central1-b
        zones[2]:          us-central1-f

    The list command produces a resource list. The keys are to the left of ':'
    and the values are to the right.

NOTES
    These variants are also available:

        $ gcloud alpha topic resource-keys

        $ gcloud beta topic resource-keys
```

### gcloud beta topic resource-keys

```text
NAME
    gcloud beta topic resource-keys - resource keys supplementary help
```

### gcloud alpha topic resource-keys

```text
NAME
    gcloud alpha topic resource-keys - resource keys supplementary help
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/topic/resource-keys (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
