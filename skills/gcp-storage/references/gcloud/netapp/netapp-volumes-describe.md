---
source: https://docs.cloud.google.com/sdk/gcloud/reference/netapp/volumes/describe
---

# gcloud netapp volumes describe

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud netapp volumes describe

```text
NAME
    gcloud netapp volumes describe - show metadata for a Cloud NetApp Volume

SYNOPSIS
    gcloud netapp volumes describe (VOLUME : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a Cloud NetApp Volume

EXAMPLES
    The following command describe a Volume named NAME in the given location

        $ gcloud netapp volumes describe NAME --location=us-central1

POSITIONAL ARGUMENTS
     Volume resource - The Volume to describe. The arguments in this group can
     be used to specify the attributes of this resource. (NOTE) Some attributes
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

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha netapp volumes describe

        $ gcloud beta netapp volumes describe
```

### gcloud beta netapp volumes describe

```text
NAME
    gcloud beta netapp volumes describe - show metadata for a Cloud NetApp
        Volume

SYNOPSIS
    gcloud beta netapp volumes describe (VOLUME : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha netapp volumes describe

```text
NAME
    gcloud alpha netapp volumes describe - show metadata for a Cloud NetApp
        Volume

SYNOPSIS
    gcloud alpha netapp volumes describe (VOLUME : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/netapp/volumes/describe (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
