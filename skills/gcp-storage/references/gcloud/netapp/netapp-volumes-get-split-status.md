---
source: https://docs.cloud.google.com/sdk/gcloud/reference/netapp/volumes/get-split-status
---

# gcloud netapp volumes get-split-status

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud netapp volumes get-split-status

```text
NAME
    gcloud netapp volumes get-split-status - retrieves the split status of a
        Cloud NetApp clone volume

SYNOPSIS
    gcloud netapp volumes get-split-status (VOLUME : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Retrieves the current split clone status for a Cloud NetApp clone volume.

EXAMPLES
    The following command retrieves split status for a Volume named my-clone in
    location us-central1:

        $ gcloud netapp volumes get-split-status `my-clone` \
          --location=`us-central1`

POSITIONAL ARGUMENTS
     Volume resource - The Volume to retrieve split status for. The arguments
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

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha netapp volumes get-split-status

        $ gcloud beta netapp volumes get-split-status
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud netapp volumes get-split-status my-clone \
    --location=us-central1
```

### gcloud beta netapp volumes get-split-status

```text
NAME
    gcloud beta netapp volumes get-split-status - retrieves the split status of
        a Cloud NetApp clone volume

SYNOPSIS
    gcloud beta netapp volumes get-split-status (VOLUME : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha netapp volumes get-split-status

```text
NAME
    gcloud alpha netapp volumes get-split-status - retrieves the split status
        of a Cloud NetApp clone volume

SYNOPSIS
    gcloud alpha netapp volumes get-split-status (VOLUME : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the example wraps the values in backticks (`` `my-clone` ``, `` `us-central1` ``), which the shell runs as command substitutions; the runnable form passes `my-clone` and `--location=us-central1` without them.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/netapp/volumes/get-split-status (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
