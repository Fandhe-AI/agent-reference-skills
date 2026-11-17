---
source: https://docs.cloud.google.com/sdk/gcloud/reference/network-connectivity/multicloud-data-transfer-configs/create
---

# gcloud network-connectivity multicloud-data-transfer-configs create

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud network-connectivity multicloud-data-transfer-configs create

```text
NAME
    gcloud network-connectivity multicloud-data-transfer-configs create -
        create a multicloudDataTransferConfig

SYNOPSIS
    gcloud network-connectivity multicloud-data-transfer-configs create
        (MULTICLOUD_DATA_TRANSFER_CONFIG : --location=LOCATION) [--async]
        [--description=DESCRIPTION] [--etag=ETAG] [--labels=[LABELS,...]]
        [--request-id=REQUEST_ID] [--services=[SERVICES,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a multicloudDataTransferConfig

EXAMPLES
    To create the multicloudDataTransferConfig, run:

    $ gcloud network-connectivity multicloud-data-transfer-configs \        create config-1 --location=europe-west1 \
        --description="Multicloud Data Transfer Config description" \
        --services=compute-engine,cloud-storage

POSITIONAL ARGUMENTS
     MulticloudDataTransferConfig resource - Identifier. The name of the
     MulticloudDataTransferConfig resource. Format:
     projects/{project}/locations/{location}/multicloudDataTransferConfigs/{multicloud_data_transfer_config}.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

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

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --description=DESCRIPTION
        A description of this resource.

     --etag=ETAG
        The etag is computed by the server, and might be sent with update and
        delete requests so that the client has an up-to-date value before
        proceeding.

     --labels=[LABELS,...]
        User-defined labels.

         KEY
            Keys must start with a lowercase character and contain only hyphens
            (-), underscores (_), lowercase characters, and numbers.

         VALUE
            Values must contain only hyphens (-), underscores (_), lowercase
            characters, and numbers.

        Shorthand Example:

            --labels=string=string

        JSON Example:

            --labels='{"string": "string"}'

        File Example:

            --labels=path_to_file.(yaml|json)

     --request-id=REQUEST_ID
        A request ID to identify requests. Specify a unique request ID so that
        if you must retry your request, the server can ignore the request if it
        has already been completed. The server waits for at least 60 minutes
        since the first request.

        For example, consider a situation where you make an initial request and
        the request times out. If you make the request again with the same
        request ID, the server can check if original operation with the same
        request ID was received, and if so, can ignore the second request. This
        prevents clients from accidentally creating duplicate
        MulticloudDataTransferConfig resources.

        The request ID must be a valid UUID with the exception that zero UUID
        (00000000-0000-0000-0000-000000000000) isn't supported.

     --services=[SERVICES,...]
        Maps services to their current or planned states. Service names are
        keys, and the associated values describe the state of the service. If a
        state change is expected, the value is either ADDING or DELETING,
        depending on the actions taken.

        Sample output: "services": { "big-query": { "states": [ {
        "effectiveTime": "2024-12-12T08:00:00Z" "state": "ADDING", }, ] },
        "cloud-storage": { "states": [ { "state": "ACTIVE", } ] } }.

         KEY
            Sets KEY value.

         VALUE
            Sets VALUE value.

        Shorthand Example:

            --services=string

        JSON Example:

            --services='{"string": {}}'

        File Example:

            --services=path_to_file.(yaml|json)

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
            multicloud-data-transfer-configs create
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud network-connectivity multicloud-data-transfer-configs create config-1 \
    --location=europe-west1 \
    --description="Multicloud Data Transfer Config description" \
    --services=compute-engine,cloud-storage
```

### gcloud beta network-connectivity multicloud-data-transfer-configs create

```text
NAME
    gcloud beta network-connectivity multicloud-data-transfer-configs create -
        create multicloudDataTransferConfigs

SYNOPSIS
    gcloud beta network-connectivity multicloud-data-transfer-configs create
        (MULTICLOUD_DATA_TRANSFER_CONFIG : --location=LOCATION) [--async]
        [--description=DESCRIPTION] [--etag=ETAG] [--labels=[LABELS,...]]
        [--request-id=REQUEST_ID] [--services=[SERVICES,...]]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/network-connectivity/multicloud-data-transfer-configs/create (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
