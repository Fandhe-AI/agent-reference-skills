---
source: https://docs.cloud.google.com/sdk/gcloud/reference/network-connectivity/spokes/describe
---

# gcloud network-connectivity spokes describe

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud network-connectivity spokes describe

```text
NAME
    gcloud network-connectivity spokes describe - describe a spoke

SYNOPSIS
    gcloud network-connectivity spokes describe SPOKE
        [--global | --region=REGION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Retrieve and display details about a spoke.

EXAMPLES
    To display details about a spoke named myspoke in the us-central1 region,
    run:

        $ gcloud network-connectivity spokes describe myspoke \
             --region=us-central1

POSITIONAL ARGUMENTS
     Spoke resource - Name of the spoke to describe. This represents a Cloud
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument spoke on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument spoke on the command line with a fully specified
        name;
      * provide the argument --global on the command line;
      * provide the argument --region on the command line.

     This must be specified.

       SPOKE
          ID of the spoke or fully qualified identifier for the spoke.

          To set the spoke attribute:
          + provide the argument spoke on the command line.

FLAGS
     At most one of these can be specified:

       --global
          Indicates that the spoke is global.

       --region=REGION
          A Google Cloud region. To see the names of regions, see Viewing a
          list of available regions
          (https://cloud.google.com/compute/docs/regions-zones/viewing-regions-zones#viewing_a_list_of_available_regions).

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the networkconnectivity/v1 API. The full documentation
    for this API can be found at:
    https://cloud.google.com/network-connectivity/docs/reference/networkconnectivity/rest

NOTES
    These variants are also available:

        $ gcloud alpha network-connectivity spokes describe

        $ gcloud beta network-connectivity spokes describe
```

### gcloud beta network-connectivity spokes describe

```text
NAME
    gcloud beta network-connectivity spokes describe - describe a spoke

SYNOPSIS
    gcloud beta network-connectivity spokes describe SPOKE
        [--global | --region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-connectivity spokes describe

```text
NAME
    gcloud alpha network-connectivity spokes describe - describe a spoke

SYNOPSIS
    gcloud alpha network-connectivity spokes describe (SPOKE : --region=REGION)
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/network-connectivity/spokes/describe (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
