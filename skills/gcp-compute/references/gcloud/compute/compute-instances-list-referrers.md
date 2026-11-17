---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/instances/list-referrers
---

# gcloud compute instances list-referrers

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute instances list-referrers

```text
NAME
    gcloud compute instances list-referrers - list referrers to a Compute
        Engine virtual machine instance

SYNOPSIS
    gcloud compute instances list-referrers INSTANCE_NAME [--zone=ZONE]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Retrieves a list of resources that refer to the VM instance specified in
    the request. For example, if the VM instance is part of a managed or
    unmanaged instance group, the referrers list includes the instance group.

EXAMPLES
    To list referrers to an instance named my-instance in zone us-central1-a,
    run:

        $ gcloud compute instances list-referrers my-instance \
            --zone=us-central1-a

POSITIONAL ARGUMENTS
     INSTANCE_NAME
        Name of the instance to list referrers for. For details on valid
        instance names, refer to the criteria documented under the field 'name'
        at: https://cloud.google.com/compute/docs/reference/rest/v1/instances

FLAGS
     --zone=ZONE
        Zone of the instance to list referrers for. If not specified, you might
        be prompted to select a zone (interactive mode only). gcloud attempts
        to identify the appropriate zone by searching for resources in your
        currently active project. If the zone cannot be determined, gcloud
        prompts you for a selection with all available Google Cloud Platform
        zones.

        To avoid prompting when this flag is omitted, the user can set the
        compute/zone property:

            $ gcloud config set compute/zone ZONE

        A list of zones can be fetched by running:

            $ gcloud compute zones list

        To unset the property, run:

            $ gcloud config unset compute/zone

        Alternatively, the zone can be stored in the environment variable
        CLOUDSDK_COMPUTE_ZONE.

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

NOTES
    These variants are also available:

        $ gcloud alpha compute instances list-referrers

        $ gcloud beta compute instances list-referrers
```

### gcloud beta compute instances list-referrers

```text
NAME
    gcloud beta compute instances list-referrers - list referrers to a Compute
        Engine virtual machine instance

SYNOPSIS
    gcloud beta compute instances list-referrers INSTANCE_NAME [--zone=ZONE]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute instances list-referrers

```text
NAME
    gcloud alpha compute instances list-referrers - list referrers to a Compute
        Engine virtual machine instance

SYNOPSIS
    gcloud alpha compute instances list-referrers INSTANCE_NAME [--zone=ZONE]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/instances/list-referrers (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
