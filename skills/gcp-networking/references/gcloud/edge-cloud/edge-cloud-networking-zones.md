---
source: https://docs.cloud.google.com/sdk/gcloud/reference/edge-cloud/networking/zones
---

# gcloud edge-cloud networking zones

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud edge-cloud networking zones init

```text
NAME
    gcloud edge-cloud networking zones init - initialize a specified
        Distributed Cloud Edge Network zone

SYNOPSIS
    gcloud edge-cloud networking zones init (ZONE : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Initialize a specified Distributed Cloud Edge Network zone.

EXAMPLES
    To initialize a Distributed Cloud Edge Network zone called
    'us-central1-edge-den1', run:

        $ gcloud edge-cloud networking zones init us-central1-edge-den1 \
          --location=us-central1

POSITIONAL ARGUMENTS
     Zone resource - The zone to initialize. The arguments in this group can be
     used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument zone on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ZONE
          ID of the zone or fully qualified identifier for the zone.

          To set the zone attribute:
          + provide the argument zone on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The Cloud location for the zone.

          To set the location attribute:
          + provide the argument zone on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha edge-cloud networking zones init
```

### gcloud alpha edge-cloud networking zones init

```text
NAME
    gcloud alpha edge-cloud networking zones init - initialize a specified
        Distributed Cloud Edge Network zone

SYNOPSIS
    gcloud alpha edge-cloud networking zones init (ZONE : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/edge-cloud/networking/zones (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
