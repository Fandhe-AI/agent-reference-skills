---
source: https://docs.cloud.google.com/sdk/gcloud/reference/network-connectivity/hubs/create
---

# gcloud network-connectivity hubs create

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud network-connectivity hubs create

```text
NAME
    gcloud network-connectivity hubs create - create a new hub

SYNOPSIS
    gcloud network-connectivity hubs create HUB [--async]
        [--description=DESCRIPTION] [--labels=[KEY=VALUE,...]]
        [--policy-mode=POLICY_MODE] [--preset-topology=PRESET_TOPOLOGY]
        [--export-psc | --export-psc-global-google-apis
          --export-psc-published-services-and-regional-google-apis]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a new hub with the given name.

EXAMPLES
    To create a hub with the name my-hub and the description optional
    description, run:

        $ gcloud network-connectivity hubs create my-hub \
            --description="optional description"

POSITIONAL ARGUMENTS
     Hub resource - Name of the hub to be created. This represents a Cloud
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

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --description=DESCRIPTION
        Description of the hub.

     --labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to add.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

     --policy-mode=POLICY_MODE
        Policy mode of the hub. POLICY_MODE must be one of:
        policy-mode-unspecified, preset.

     --preset-topology=PRESET_TOPOLOGY
        Topology of the hub. Only applicable when --policy-mode=PRESET.
        PRESET_TOPOLOGY must be one of: hybrid-inspection, mesh,
        preset-topology-unspecified, star.

     At most one of these can be specified:

       --export-psc
          This boolean controls whether Private Service Connect transitivity is
          enabled for the hub.

       Or at least one of these can be specified:

         --export-psc-global-google-apis
            This boolean controls whether Private Service Connect endpoints for
            global Google APIs should be propagated.

         --export-psc-published-services-and-regional-google-apis
            This boolean controls whether Private Service Connect endpoints for
            regional ILBs and regional Google APIs should be propagated.

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

        $ gcloud alpha network-connectivity hubs create

        $ gcloud beta network-connectivity hubs create
```

### gcloud beta network-connectivity hubs create

```text
NAME
    gcloud beta network-connectivity hubs create - create a new hub

SYNOPSIS
    gcloud beta network-connectivity hubs create HUB [--async]
        [--description=DESCRIPTION] [--labels=[KEY=VALUE,...]]
        [--policy-mode=POLICY_MODE] [--preset-topology=PRESET_TOPOLOGY]
        [--export-psc | --export-psc-global-google-apis
          --export-psc-published-services-and-regional-google-apis]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-connectivity hubs create

```text
NAME
    gcloud alpha network-connectivity hubs create - create a new hub

SYNOPSIS
    gcloud alpha network-connectivity hubs create HUB [--async]
        [--description=DESCRIPTION] [--labels=[KEY=VALUE,...]]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/network-connectivity/hubs/create (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
