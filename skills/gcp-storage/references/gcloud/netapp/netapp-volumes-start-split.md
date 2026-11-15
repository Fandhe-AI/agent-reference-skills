---
source: https://docs.cloud.google.com/sdk/gcloud/reference/netapp/volumes/start-split
---

# gcloud netapp volumes start-split

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud netapp volumes start-split

```text
NAME
    gcloud netapp volumes start-split - starts splitting a Cloud NetApp clone
        volume from its source volume

SYNOPSIS
    gcloud netapp volumes start-split (VOLUME : --location=LOCATION) [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Starts a split clone operation for a Cloud NetApp clone volume. This
    separates the clone from its source volume and turns it into a standalone
    volume.

EXAMPLES
    The following command starts a split clone operation for a Volume named
    my-clone in location us-central1:

        $ gcloud netapp volumes start-split `my-clone` \
          --location=`us-central1`

POSITIONAL ARGUMENTS
     Volume resource - The Volume to split. The arguments in this group can be
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

FLAGS
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

        $ gcloud alpha netapp volumes start-split

        $ gcloud beta netapp volumes start-split
```

### gcloud beta netapp volumes start-split

```text
NAME
    gcloud beta netapp volumes start-split - starts splitting a Cloud NetApp
        clone volume from its source volume

SYNOPSIS
    gcloud beta netapp volumes start-split (VOLUME : --location=LOCATION)
        [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha netapp volumes start-split

```text
NAME
    gcloud alpha netapp volumes start-split - starts splitting a Cloud NetApp
        clone volume from its source volume

SYNOPSIS
    gcloud alpha netapp volumes start-split (VOLUME : --location=LOCATION)
        [--async] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/netapp/volumes/start-split (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
