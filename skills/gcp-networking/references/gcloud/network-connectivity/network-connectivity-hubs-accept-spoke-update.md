---
source: https://docs.cloud.google.com/sdk/gcloud/reference/network-connectivity/hubs/accept-spoke-update
---

# gcloud network-connectivity hubs accept-spoke-update

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud network-connectivity hubs accept-spoke-update

```text
NAME
    gcloud network-connectivity hubs accept-spoke-update - accept a proposal to
        update a spoke in a hub

SYNOPSIS
    gcloud network-connectivity hubs accept-spoke-update HUB --spoke=SPOKE
        --spoke-etag=SPOKE_ETAG [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Accept a proposed or previously rejected VPC spoke update. By accepting a
    spoke update, you permit updating connectivity between the associated VPC
    network and other VPC networks that are attached to the same hub.

EXAMPLES
    To accept updating a spoke named my-spoke with etag in a hub named my-hub,
    run:

        $ gcloud network-connectivity hubs accept-spoke-update my-hub \
             --spoke="projects/spoke-project/locations/global/hubs/my-spoke" \
         --spoke-etag=etag

POSITIONAL ARGUMENTS
     Hub resource - Name of the hub to accept the spoke update. This represents
     a Cloud resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

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

REQUIRED FLAGS
     --spoke=SPOKE
        URI of the spoke to accept update

     --spoke-etag=SPOKE_ETAG
        Etag of the spoke to accept update

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

API REFERENCE
    This command uses the networkconnectivity/v1 API. The full documentation
    for this API can be found at:
    https://cloud.google.com/network-connectivity/docs/reference/networkconnectivity/rest

NOTES
    This variant is also available:

        $ gcloud beta network-connectivity hubs accept-spoke-update
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud network-connectivity hubs accept-spoke-update my-hub \
    --spoke="projects/spoke-project/locations/global/spokes/my-spoke" \
    --spoke-etag=etag
```

### gcloud beta network-connectivity hubs accept-spoke-update

```text
NAME
    gcloud beta network-connectivity hubs accept-spoke-update - accept a
        proposal to update a spoke in a hub

SYNOPSIS
    gcloud beta network-connectivity hubs accept-spoke-update HUB --spoke=SPOKE
        --spoke-etag=SPOKE_ETAG [--async] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the example passes `--spoke="projects/spoke-project/locations/global/hubs/my-spoke"`, a hub path, although `--spoke` is the "URI of the spoke" (`projects/PROJECT/locations/LOCATION/spokes/SPOKE`, the form the `accept-spoke` / `reject-spoke` examples use); the runnable form uses `projects/spoke-project/locations/global/spokes/my-spoke`.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/network-connectivity/hubs/accept-spoke-update (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
