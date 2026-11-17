---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/tpus/tpu-vm/accelerator-types
---

# gcloud compute tpus tpu-vm accelerator-types

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute tpus tpu-vm accelerator-types describe

```text
NAME
    gcloud compute tpus tpu-vm accelerator-types describe - describe an
        accelerator type available for Cloud TPU VM nodes

SYNOPSIS
    gcloud compute tpus tpu-vm accelerator-types describe
        (ACCELERATOR_TYPE : --zone=ZONE) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Get details on an accelerator type.

EXAMPLES
    To describe the v3-8 accelerator type in zone us-central1-b, run:

        $ gcloud compute tpus tpu-vm accelerator-types describe v3-8 \
            --zone=us-central1-b

POSITIONAL ARGUMENTS
     Accelerator type resource - Name of the accelerator type to describe. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument accelerator_type on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ACCELERATOR_TYPE
          ID of the accelerator_type or fully qualified identifier for the
          accelerator_type.

          To set the accelerator_type attribute:
          + provide the argument accelerator_type on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --zone=ZONE
          Zone of the Cloud TPU.

          If not specified, will use default compute/zone.

          To set the zone attribute:
          + provide the argument accelerator_type on the command line with a
            fully specified name;
          + provide the argument --zone on the command line;
          + set the property compute/zone.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the tpu/v2 API. The full documentation for this API can
    be found at: https://cloud.google.com/tpu/

NOTES
    This variant is also available:

        $ gcloud alpha compute tpus tpu-vm accelerator-types describe
```

### gcloud compute tpus tpu-vm accelerator-types list

```text
NAME
    gcloud compute tpus tpu-vm accelerator-types list - list available
        accelerator types for Cloud TPU VM nodes

SYNOPSIS
    gcloud compute tpus tpu-vm accelerator-types list [--zone=ZONE]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List available accelerator types for for Cloud TPU VM nodes.

EXAMPLES
    To list all of the accelerator types available in zone us-central1-b, run:

        $ gcloud compute tpus tpu-vm accelerator-types list \
            --zone=us-central1-b

FLAGS
     Location resource - Zone to list accelerator types for. This represents a
     Cloud resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument --zone on the command line with a fully
        specified name;
      * set the property compute/zone with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --zone=ZONE
        ID of the location or fully qualified identifier for the location.

        To set the zone attribute:
        * provide the argument --zone on the command line;
        * set the property compute/zone.

LIST COMMAND FLAGS
     --filter=EXPRESSION
        Apply a Boolean filter EXPRESSION to each resource item to be listed.
        If the expression evaluates True, then that item is listed. For more
        details and examples of filter expressions, run $ gcloud topic filters.
        This flag interacts with other flags that are applied in this order:
        --flatten, --sort-by, --filter, --limit.

     --limit=LIMIT
        Maximum number of resources to list. The default is unlimited. This
        flag interacts with other flags that are applied in this order:
        --flatten, --sort-by, --filter, --limit.

     --page-size=PAGE_SIZE
        Some services group resource list output into pages. This flag
        specifies the maximum number of resources per page. The default is
        determined by the service if it supports paging, otherwise it is
        unlimited (no paging). Paging may be applied before or after --filter
        and --limit depending on the service.

     --sort-by=[FIELD,...]
        Comma-separated list of resource field key names to sort by. The
        default order is ascending. Prefix a field with ``~'' for descending
        order on that field. This flag interacts with other flags that are
        applied in this order: --flatten, --sort-by, --filter, --limit.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the tpu/v2 API. The full documentation for this API can
    be found at: https://cloud.google.com/tpu/

NOTES
    This variant is also available:

        $ gcloud alpha compute tpus tpu-vm accelerator-types list
```

### gcloud alpha compute tpus tpu-vm accelerator-types describe

```text
NAME
    gcloud alpha compute tpus tpu-vm accelerator-types describe - describe an
        accelerator type available for Cloud TPU VM nodes

SYNOPSIS
    gcloud alpha compute tpus tpu-vm accelerator-types describe
        (ACCELERATOR_TYPE : --zone=ZONE) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute tpus tpu-vm accelerator-types list

```text
NAME
    gcloud alpha compute tpus tpu-vm accelerator-types list - list available
        accelerator types for Cloud TPU VM nodes

SYNOPSIS
    gcloud alpha compute tpus tpu-vm accelerator-types list [--zone=ZONE]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/tpus/tpu-vm/accelerator-types (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
