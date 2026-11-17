---
source: https://docs.cloud.google.com/sdk/gcloud/reference/network-connectivity/multicloud-data-transfer-configs/describe
---

# gcloud network-connectivity multicloud-data-transfer-configs describe

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud network-connectivity multicloud-data-transfer-configs describe

```text
NAME
    gcloud network-connectivity multicloud-data-transfer-configs describe -
        describe a multicloudDataTransferConfig

SYNOPSIS
    gcloud network-connectivity multicloud-data-transfer-configs describe
        (MULTICLOUD_DATA_TRANSFER_CONFIG : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a multicloudDataTransferConfig

EXAMPLES
    To describe the multicloudDataTransferConfig, run:

    $ gcloud network-connectivity multicloud-data-transfer-configs \        describe config-1 --location=europe-west1

POSITIONAL ARGUMENTS
     MulticloudDataTransferConfig resource - The name of the
     MulticloudDataTransferConfig resource to get. The arguments in this group
     can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument multicloud_data_transfer_config on the command
        line with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       MULTICLOUD_DATA_TRANSFER_CONFIG
          ID of the multicloudDataTransferConfig or fully qualified identifier
          for the multicloudDataTransferConfig.

          To set the multicloud_data_transfer_config attribute:
          + provide the argument multicloud_data_transfer_config on the
            command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the multicloudDataTransferConfig resource.

          To set the location attribute:
          + provide the argument multicloud_data_transfer_config on the
            command line with a fully specified name;
          + provide the argument --location on the command line.

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
    This variant is also available:

        $ gcloud beta network-connectivity \
            multicloud-data-transfer-configs describe
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud network-connectivity multicloud-data-transfer-configs describe config-1 \
    --location=europe-west1
```

### gcloud beta network-connectivity multicloud-data-transfer-configs describe

```text
NAME
    gcloud beta network-connectivity multicloud-data-transfer-configs describe
        - describe multicloudDataTransferConfigs

SYNOPSIS
    gcloud beta network-connectivity multicloud-data-transfer-configs describe
        (MULTICLOUD_DATA_TRANSFER_CONFIG : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/network-connectivity/multicloud-data-transfer-configs/describe (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
