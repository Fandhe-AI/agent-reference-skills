---
source: https://docs.cloud.google.com/sdk/gcloud/reference/dataplex/assets/describe
---

# gcloud dataplex assets describe

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud dataplex assets describe

```text
NAME
    gcloud dataplex assets describe - describe a Dataplex asset resource

SYNOPSIS
    gcloud dataplex assets describe
        (ASSET : --lake=LAKE --location=LOCATION --zone=ZONE)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Displays all details of a Dataplex asset resource given a valid asset ID.

EXAMPLES
    To describe a Dataplex asset test-asset within zone test-zone in lake
    test-lake in location us-central1, run:

        $ gcloud dataplex assets describe test-asset \
          --location=us-central1 --lake=test-lake --zone=test-zone

POSITIONAL ARGUMENTS
     Asset resource - Arguments and flags that define the Dataplex asset you
     want to retrieve. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument asset on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ASSET
          ID of the asset or fully qualified identifier for the asset.

          To set the asset attribute:
          + provide the argument asset on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --lake=LAKE
          Identifier of the Dataplex lake resource.

          To set the lake attribute:
          + provide the argument asset on the command line with a fully
            specified name;
          + provide the argument --lake on the command line.

       --location=LOCATION
          Location of the Dataplex resource.

          To set the location attribute:
          + provide the argument asset on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property dataplex/location.

       --zone=ZONE
          Identifier of the Dataplex zone resource.

          To set the zone attribute:
          + provide the argument asset on the command line with a fully
            specified name;
          + provide the argument --zone on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the dataplex/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/dataplex/docs

NOTES
    This variant is also available:

        $ gcloud alpha dataplex assets describe
```

### gcloud alpha dataplex assets describe

```text
NAME
    gcloud alpha dataplex assets describe - describe a Dataplex asset resource

SYNOPSIS
    gcloud alpha dataplex assets describe
        (ASSET : --lake=LAKE --location=LOCATION --zone=ZONE)
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/dataplex/assets/describe (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
