---
source: https://docs.cloud.google.com/sdk/gcloud/reference/network-connectivity/hubs/describe
---

# gcloud network-connectivity hubs describe

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud network-connectivity hubs describe

```text
NAME
    gcloud network-connectivity hubs describe - describe a hub

SYNOPSIS
    gcloud network-connectivity hubs describe HUB [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Retrieve and display details about a hub.

EXAMPLES
    To display details about a hub named my-hub, run:

        $ gcloud network-connectivity hubs describe my-hub

POSITIONAL ARGUMENTS
     Hub resource - Name of the hub to be described. This represents a Cloud
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument hub on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       HUB
          ID of the hub or fully qualified identifier for the hub.

          To set the hub attribute:
          + provide the argument hub on the command line.

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

        $ gcloud alpha network-connectivity hubs describe

        $ gcloud beta network-connectivity hubs describe
```

### gcloud beta network-connectivity hubs describe

```text
NAME
    gcloud beta network-connectivity hubs describe - describe a hub

SYNOPSIS
    gcloud beta network-connectivity hubs describe HUB [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-connectivity hubs describe

```text
NAME
    gcloud alpha network-connectivity hubs describe - describe a hub

SYNOPSIS
    gcloud alpha network-connectivity hubs describe HUB [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/network-connectivity/hubs/describe (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
