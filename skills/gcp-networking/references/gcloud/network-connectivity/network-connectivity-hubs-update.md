---
source: https://docs.cloud.google.com/sdk/gcloud/reference/network-connectivity/hubs/update
---

# gcloud network-connectivity hubs update

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud network-connectivity hubs update

```text
NAME
    gcloud network-connectivity hubs update - update a hub

SYNOPSIS
    gcloud network-connectivity hubs update HUB [--async]
        [--description=DESCRIPTION] [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]]
        [--[no-]export-psc | --[no-]export-psc-global-google-apis
          --[no-]export-psc-published-services-and-regional-google-apis]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update the details of a hub.

EXAMPLES
    To update the description of a hub named my-hub, run:

        $ gcloud network-connectivity hubs update my-hub \
             --description="The new description of my-hub".

POSITIONAL ARGUMENTS
     Hub resource - Name of the hub to be updated. This represents a Cloud
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
        New description of the hub.

     --update-labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to update. If a label exists, its value
        is modified. Otherwise, a new label is created.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

     At most one of these can be specified:

       --clear-labels
          Remove all labels. If --update-labels is also specified then
          --clear-labels is applied first.

          For example, to remove all labels:

              $ gcloud network-connectivity hubs update --clear-labels

          To remove all existing labels and create two new labels, foo and baz:

              $ gcloud network-connectivity hubs update --clear-labels \
                --update-labels foo=bar,baz=qux

       --remove-labels=[KEY,...]
          List of label keys to remove. If a label does not exist it is
          silently ignored. If --update-labels is also specified then
          --update-labels is applied first.

     At most one of these can be specified:

       --[no-]export-psc
          Whether Private Service Connect propagation is enabled for the hub.
          Use --export-psc to enable and --no-export-psc to disable.

       Or at least one of these can be specified:

         --[no-]export-psc-global-google-apis
            Whether propagation for Private Service Connect for global Google
            APIs is enabled for the hub. Use --export-psc-global-google-apis to
            enable and --no-export-psc-global-google-apis to disable.

         --[no-]export-psc-published-services-and-regional-google-apis
            Whether propagation for Private Service Connect for published
            services and regional Google APIs is enabled for the hub. Use
            --export-psc-published-services-and-regional-google-apis to enable
            and --no-export-psc-published-services-and-regional-google-apis to
            disable.

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

        $ gcloud alpha network-connectivity hubs update

        $ gcloud beta network-connectivity hubs update
```

### gcloud beta network-connectivity hubs update

```text
NAME
    gcloud beta network-connectivity hubs update - update a hub

SYNOPSIS
    gcloud beta network-connectivity hubs update HUB [--async]
        [--description=DESCRIPTION] [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]]
        [--[no-]export-psc | --[no-]export-psc-global-google-apis
          --[no-]export-psc-published-services-and-regional-google-apis]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-connectivity hubs update

```text
NAME
    gcloud alpha network-connectivity hubs update - update a hub

SYNOPSIS
    gcloud alpha network-connectivity hubs update HUB [--async]
        [--description=DESCRIPTION] [--labels=[KEY=VALUE,...]]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/network-connectivity/hubs/update (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
