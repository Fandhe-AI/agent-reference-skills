---
source: https://docs.cloud.google.com/sdk/gcloud/reference/network-connectivity/spokes/linked-router-appliances
---

# gcloud network-connectivity spokes linked-router-appliances

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud network-connectivity spokes linked-router-appliances create

```text
NAME
    gcloud network-connectivity spokes linked-router-appliances create - create
        a new Router appliance spoke

SYNOPSIS
    gcloud network-connectivity spokes linked-router-appliances create
        (SPOKE : --region=REGION) --hub=HUB
        --router-appliance=[instance=INSTANCE],[ip=IP] [--async]
        [--description=DESCRIPTION]
        [--exclude-export-ranges=[EXCLUDE_EXPORT_RANGES,...]]
        [--exclude-import-ranges=[EXCLUDE_IMPORT_RANGES,...]] [--group=GROUP]
        [--include-export-ranges=[INCLUDE_EXPORT_RANGES,...]]
        [--include-import-ranges=[INCLUDE_IMPORT_RANGES,...]]
        [--labels=[KEY=VALUE,...]] [--site-to-site-data-transfer]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a new Router appliance spoke
    (https://cloud.google.com/network-connectivity/docs/network-connectivity-center/how-to/working-with-hubs-spokes#create-ra-spoke).

EXAMPLES
    To create a spoke in region us-central1 that uses data transfer and has two
    router appliance instances, run:

        $ gcloud network-connectivity spokes linked-router-appliances \
            create my-spoke \
            --hub="https://www.googleapis.com/networkconnectivity/v1/project\
        s/my-project/locations/global/hubs/my-hub" --region=us-central1 \
            --router-appliance=instance=https://www.googleapis.com/compute/\
        v1/projects/my-project/zones/us-central1-a/instances/vm1,\
        ip=10.10.0.1 \
            --router-appliance=instance=https://www.googleapis.com/compute/\
        v1/projects/my-project/zones/us-central1-a/instances/vm2,\
        ip=10.10.0.2 --site-to-site-data-transfer

POSITIONAL ARGUMENTS
     Spoke resource - Name of the spoke to be created. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument spoke on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       SPOKE
          ID of the spoke or fully qualified identifier for the spoke.

          To set the spoke attribute:
          + provide the argument spoke on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          The location Id.

          To set the region attribute:
          + provide the argument spoke on the command line with a fully
            specified name;
          + provide the argument --region on the command line.

REQUIRED FLAGS
     --hub=HUB
        Hub that the spoke will attach to. The hub must already exist.

     --router-appliance=[instance=INSTANCE],[ip=IP]
        Router appliance instance(s) that the spoke provides connectivity to.
        The resources must already exist.

        For example, use --router-appliance=instance=ins_uri_1,ip=10.10.0.1 to
        add a single router appliance instance, or
        --router-appliance=instance=ins_uri_1,ip=10.10.0.1
        --router-appliance=instance=ins_uri_2,ip=10.10.0.2 ... to add multiple
        instances.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --description=DESCRIPTION
        Description of the spoke to create.

     --exclude-export-ranges=[EXCLUDE_EXPORT_RANGES,...]
        Dynamic routes overlapped/encompassed by exclude export ranges are
        excluded during export to hub.

     --exclude-import-ranges=[EXCLUDE_IMPORT_RANGES,...]
        Hub routes overlapped/encompassed by exclude import ranges are excluded
        during import from hub.

     --group=GROUP
        The group that the spoke will be added to. The group must already
        exist. If unset, the spoke will be added to the ``default`` group.

     --include-export-ranges=[INCLUDE_EXPORT_RANGES,...]
        Dynamic routes fully encompassed by include export ranges are included
        during export to hub. If it's empty, the spoke exports all dynamic
        routes to the hub.

     --include-import-ranges=[INCLUDE_IMPORT_RANGES,...]
        Hub routes fully encompassed by include import ranges are included
        during import from hub. If it's empty, the spoke does not import any
        subnets from the hub. If it's empty and site-to-site-data-transfer is
        true, the spoke imports all IPv4 site-to-site dynamic routes from the
        hub.

     --labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to add.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

     --site-to-site-data-transfer
        Whether to enable site-to-site data transfer for this spoke. Data
        transfer is available only in supported locations
        (https://cloud.google.com/network-connectivity/docs/network-connectivity-center/concepts/locations).

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

        $ gcloud beta network-connectivity spokes linked-router-appliances \
            create
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud network-connectivity spokes linked-router-appliances create my-spoke \
    --hub="https://www.googleapis.com/networkconnectivity/v1/projects/my-project/locations/global/hubs/my-hub" \
    --region=us-central1 \
    --router-appliance=instance=https://www.googleapis.com/compute/v1/projects/my-project/zones/us-central1-a/instances/vm1,ip=10.10.0.1 \
    --router-appliance=instance=https://www.googleapis.com/compute/v1/projects/my-project/zones/us-central1-a/instances/vm2,ip=10.10.0.2 \
    --site-to-site-data-transfer
```

### gcloud network-connectivity spokes linked-router-appliances update

```text
NAME
    gcloud network-connectivity spokes linked-router-appliances update - update
        a Router appliance spoke

SYNOPSIS
    gcloud network-connectivity spokes linked-router-appliances update
        (SPOKE : --region=REGION) [--async] [--description=DESCRIPTION]
        [--exclude-export-ranges=[EXCLUDE_EXPORT_RANGES,...]]
        [--exclude-import-ranges=[EXCLUDE_IMPORT_RANGES,...]]
        [--include-export-ranges=[INCLUDE_EXPORT_RANGES,...]]
        [--include-import-ranges=[INCLUDE_IMPORT_RANGES,...]]
        [--router-appliance=[instance=INSTANCE],[ip=IP]]
        [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update the details of a Router appliance spoke.

EXAMPLES
    To update the description of a Router appliance spoke named my-spoke, run:

        $ gcloud network-connectivity spokes linked-router-appliances \
            update my-spoke --region=us-central1 \
            --description="new spoke description"

    To replace the router appliance instances linked to a spoke with two new
    instances, run:

        $ gcloud network-connectivity spokes linked-router-appliances \
            update my-spoke --region=us-central1 \
            --router-appliance=instance=https://www.googleapis.com/compute/\
        v1/projects/my-project/zones/us-central1-a/instances/vm1,\
        ip=10.10.0.1 \
            --router-appliance=instance=https://www.googleapis.com/compute/\
        v1/projects/my-project/zones/us-central1-a/instances/vm2,\
        ip=10.10.0.2

POSITIONAL ARGUMENTS
     Spoke resource - Name of the spoke to update. The arguments in this group
     can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument spoke on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       SPOKE
          ID of the spoke or fully qualified identifier for the spoke.

          To set the spoke attribute:
          + provide the argument spoke on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          The location Id.

          To set the region attribute:
          + provide the argument spoke on the command line with a fully
            specified name;
          + provide the argument --region on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --description=DESCRIPTION
        New description of the spoke.

     --exclude-export-ranges=[EXCLUDE_EXPORT_RANGES,...]
        Dynamic routes overlapped/encompassed by exclude export ranges are
        excluded during export to hub.

     --exclude-import-ranges=[EXCLUDE_IMPORT_RANGES,...]
        Hub routes overlapped/encompassed by exclude import ranges are excluded
        during import from hub.

     --include-export-ranges=[INCLUDE_EXPORT_RANGES,...]
        Dynamic routes fully encompassed by include export ranges are included
        during export to hub. If it's empty, the spoke exports all dynamic
        routes to the hub.

     --include-import-ranges=[INCLUDE_IMPORT_RANGES,...]
        Hub routes fully encompassed by include import ranges are included
        during import from hub. If it's empty, the spoke does not import any
        subnets from the hub. If it's empty and site-to-site-data-transfer is
        true, the spoke imports all IPv4 site-to-site dynamic routes from the
        hub.

     --router-appliance=[instance=INSTANCE],[ip=IP]
        Router appliance instance(s) with which to replace the set of instances
        already linked to this spoke. Pass this flag multiple times to replace
        with multiple instances. For example, use
        --router-appliance=instance=new_ins_uri,ip=10.10.0.1 for a single
        router appliance instance, or
        --router-appliance=instance=new_ins_uri_1,ip=10.10.0.1
        --router-appliance=instance=new_ins_uri_2,ip=10.10.0.2 ... for multiple
        instances.

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

              $ gcloud network-connectivity spokes linked-router-appliances \
                update --clear-labels

          To remove all existing labels and create two new labels, foo and baz:

              $ gcloud network-connectivity spokes linked-router-appliances \
                update --clear-labels --update-labels foo=bar,baz=qux

       --remove-labels=[KEY,...]
          List of label keys to remove. If a label does not exist it is
          silently ignored. If --update-labels is also specified then
          --update-labels is applied first.

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

        $ gcloud beta network-connectivity spokes linked-router-appliances \
            update
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud network-connectivity spokes linked-router-appliances update my-spoke \
    --region=us-central1 \
    --router-appliance=instance=https://www.googleapis.com/compute/v1/projects/my-project/zones/us-central1-a/instances/vm1,ip=10.10.0.1 \
    --router-appliance=instance=https://www.googleapis.com/compute/v1/projects/my-project/zones/us-central1-a/instances/vm2,ip=10.10.0.2
```

### gcloud beta network-connectivity spokes linked-router-appliances create

```text
NAME
    gcloud beta network-connectivity spokes linked-router-appliances create -
        create a new Router appliance spoke

SYNOPSIS
    gcloud beta network-connectivity spokes linked-router-appliances create
        (SPOKE : --region=REGION) --hub=HUB
        --router-appliance=[instance=INSTANCE],[ip=IP] [--async]
        [--description=DESCRIPTION]
        [--exclude-export-ranges=[EXCLUDE_EXPORT_RANGES,...]]
        [--exclude-import-ranges=[EXCLUDE_IMPORT_RANGES,...]] [--group=GROUP]
        [--include-export-ranges=[INCLUDE_EXPORT_RANGES,...]]
        [--include-import-ranges=[INCLUDE_IMPORT_RANGES,...]]
        [--labels=[KEY=VALUE,...]] [--site-to-site-data-transfer]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-connectivity spokes linked-router-appliances update

```text
NAME
    gcloud beta network-connectivity spokes linked-router-appliances update -
        update a Router appliance spoke

SYNOPSIS
    gcloud beta network-connectivity spokes linked-router-appliances update
        (SPOKE : --region=REGION) [--async] [--description=DESCRIPTION]
        [--exclude-export-ranges=[EXCLUDE_EXPORT_RANGES,...]]
        [--exclude-import-ranges=[EXCLUDE_IMPORT_RANGES,...]]
        [--include-export-ranges=[INCLUDE_EXPORT_RANGES,...]]
        [--include-import-ranges=[INCLUDE_IMPORT_RANGES,...]]
        [--router-appliance=[instance=INSTANCE],[ip=IP]]
        [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/network-connectivity/spokes/linked-router-appliances (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
