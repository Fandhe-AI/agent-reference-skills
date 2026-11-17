---
source: https://docs.cloud.google.com/sdk/gcloud/reference/network-connectivity/hubs/reject-spoke
---

# gcloud network-connectivity hubs reject-spoke

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud network-connectivity hubs reject-spoke

```text
NAME
    gcloud network-connectivity hubs reject-spoke - reject a spoke from a hub

SYNOPSIS
    gcloud network-connectivity hubs reject-spoke HUB --spoke=SPOKE [--async]
        [--details=DETAILS] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Reject a VPC spoke. By rejecting a spoke, you prevent or remove
    connectivity between the associated VPC network and any other VPC networks
    that are attached to the same hub.

EXAMPLES
    To reject a spoke named my-spoke from a hub named my-hub with reason
    my-reason, run:

        $ gcloud network-connectivity hubs reject-spoke my-hub \
          --spoke="projects/spoke-project/locations/global/spokes/my-spoke\
        " --details=my-reason

POSITIONAL ARGUMENTS
     Hub resource - Name of the hub to reject the spoke from. This represents a
     Cloud resource. (NOTE) Some attributes are not given arguments in this
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
        URI of the spoke to reject

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --details=DETAILS
        Additional details behind the rejection

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

        $ gcloud beta network-connectivity hubs reject-spoke
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud network-connectivity hubs reject-spoke my-hub \
    --spoke="projects/spoke-project/locations/global/spokes/my-spoke" \
    --details=my-reason
```

### gcloud beta network-connectivity hubs reject-spoke

```text
NAME
    gcloud beta network-connectivity hubs reject-spoke - reject a spoke from a
        hub

SYNOPSIS
    gcloud beta network-connectivity hubs reject-spoke HUB --spoke=SPOKE
        [--async] [--details=DETAILS] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/network-connectivity/hubs/reject-spoke (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
