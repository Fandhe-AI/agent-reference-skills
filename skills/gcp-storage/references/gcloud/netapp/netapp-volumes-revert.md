---
source: https://docs.cloud.google.com/sdk/gcloud/reference/netapp/volumes/revert
---

# gcloud netapp volumes revert

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud netapp volumes revert

```text
NAME
    gcloud netapp volumes revert - revert a Cloud NetApp Volume back to a
        specified Snapshot

SYNOPSIS
    gcloud netapp volumes revert (VOLUME : --location=LOCATION)
        --snapshot=SNAPSHOT [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Revert a Cloud NetApp Volume back to a specified source Snapshot

EXAMPLES
    The following command reverts a Volume named NAME in the given location and
    snapshot

        $ gcloud netapp volumes revert NAME --location=us-central1 \
          --snapshot="snapshot1"

POSITIONAL ARGUMENTS
     Volume resource - The Volume to revert. The arguments in this group can be
     used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

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
     Snapshot resource - The Snapshot to revert the Volume back to. This
     represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --snapshot on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument --snapshot on the command line with a fully
        specified name;
      * set the property netapp/location.

     To set the volume attribute:
      * provide the argument --snapshot on the command line with a fully
        specified name.

     This must be specified.

       --snapshot=SNAPSHOT
          ID of the snapshot or fully qualified identifier for the snapshot.

          To set the snapshot attribute:
          + provide the argument --snapshot on the command line.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha netapp volumes revert

        $ gcloud beta netapp volumes revert
```

### gcloud beta netapp volumes revert

```text
NAME
    gcloud beta netapp volumes revert - revert a Cloud NetApp Volume back to a
        specified Snapshot

SYNOPSIS
    gcloud beta netapp volumes revert (VOLUME : --location=LOCATION)
        --snapshot=SNAPSHOT [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha netapp volumes revert

```text
NAME
    gcloud alpha netapp volumes revert - revert a Cloud NetApp Volume back to a
        specified Snapshot

SYNOPSIS
    gcloud alpha netapp volumes revert (VOLUME : --location=LOCATION)
        --snapshot=SNAPSHOT [--async] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/netapp/volumes/revert (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
