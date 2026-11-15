---
source: https://docs.cloud.google.com/sdk/gcloud/reference/netapp/volumes/establish-peering
---

# gcloud netapp volumes establish-peering

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud netapp volumes establish-peering

```text
NAME
    gcloud netapp volumes establish-peering - establish peering for Cache
        Volumes

SYNOPSIS
    gcloud netapp volumes establish-peering (VOLUME : --location=LOCATION)
        --peer-cluster-name=PEER_CLUSTER_NAME --peer-svm-name=PEER_SVM_NAME
        --peer-volume-name=PEER_VOLUME_NAME [--async]
        [--peer-ip-addresses=PEER_IP_ADDRESS,[...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Establish peering for Cache Volumes.

EXAMPLES
    The following command establishes peering for Cache Volume named NAME using
    the arguments specified:

        $ gcloud netapp volumes establish-peering NAME \
          --location=us-central1 --peer-cluster-name=peer-cluster-name1 \
          --peer-svm-name=peer-svm-name1 \
          --peer-volume-name=peer-volume-name1 \
          --peer-ip-addresses=1.1.1.1,2.2.2.2

POSITIONAL ARGUMENTS
     Volume resource - The Cache Volume to establish peering for. The arguments
     in this group can be used to specify the attributes of this resource.
     (NOTE) Some attributes are not given arguments in this group but can be
     set in other ways.

     To set the project attribute:
      * provide the argument volume on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       VOLUME
          ID of the volume or fully qualified identifier for the volume.

          To set the volume attribute:
          + provide the argument volume on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the volume.

          To set the location attribute:
          + provide the argument volume on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property netapp/location.

REQUIRED FLAGS
     --peer-cluster-name=PEER_CLUSTER_NAME
        Name of the destination cluster to be peered with the source cluster.

     --peer-svm-name=PEER_SVM_NAME
        Name of the local source vserver svm to be peered with the destination
        cluster.

     --peer-volume-name=PEER_VOLUME_NAME
        Name of the source volume to be peered with the destination volume.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --peer-ip-addresses=PEER_IP_ADDRESS,[...]
        List of ip addresses to be used for peering. This is required for
        cluster peering, not required for svm peering.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha netapp volumes establish-peering

        $ gcloud beta netapp volumes establish-peering
```

### gcloud beta netapp volumes establish-peering

```text
NAME
    gcloud beta netapp volumes establish-peering - establish peering for Cache
        Volumes

SYNOPSIS
    gcloud beta netapp volumes establish-peering (VOLUME : --location=LOCATION)
        --peer-cluster-name=PEER_CLUSTER_NAME --peer-svm-name=PEER_SVM_NAME
        --peer-volume-name=PEER_VOLUME_NAME [--async]
        [--peer-ip-addresses=PEER_IP_ADDRESS,[...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha netapp volumes establish-peering

```text
NAME
    gcloud alpha netapp volumes establish-peering - establish peering for Cache
        Volumes

SYNOPSIS
    gcloud alpha netapp volumes establish-peering
        (VOLUME : --location=LOCATION) --peer-cluster-name=PEER_CLUSTER_NAME
        --peer-svm-name=PEER_SVM_NAME --peer-volume-name=PEER_VOLUME_NAME
        [--async] [--peer-ip-addresses=PEER_IP_ADDRESS,[...]]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/netapp/volumes/establish-peering (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
