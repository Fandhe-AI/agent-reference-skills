---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/instances/os-inventory/list-instances
---

# gcloud compute instances os-inventory list-instances

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute instances os-inventory list-instances

```text
NAME
    gcloud compute instances os-inventory list-instances - list instances with
        specific OS inventory data values

SYNOPSIS
    gcloud compute instances os-inventory list-instances
        [--inventory-filter=INVENTORY_FILTER]
        [--kernel-version=KERNEL_VERSION --os-shortname=OS_SHORTNAME
          --os-version=OS_VERSION
          --package-name=PACKAGE_NAME --package-version=PACKAGE_VERSION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute instances os-inventory list-instances displays all Compute
    Engine instances in a project matching an inventory filter. Run $ gcloud
    topic filters to see the supported filter syntax.

EXAMPLES
    To list all instances with OS inventory data in a project in table form,
    run:

        $ gcloud compute instances os-inventory list-instances

    To list the URIs of all instances whose OS short name contains rhel, run:

        $ gcloud compute instances os-inventory list-instances \
        --inventory-filter="ShortName:rhel" --uri

    To list the URIs of all instances whose OS short name is equal to rhel,
    run:

        $ gcloud compute instances os-inventory list-instances \
        --os-shortname="rhel" --uri

    To list all instances with package google-cloud-sdk of version 235.0.0-0
    installed, run:

        $ gcloud compute instances os-inventory list-instances \
        --package-name="google-cloud-sdk" --package-version="235.0.0-0"

    To list all instances with package name matching a regex ^google-cloud
    available for update through apt, run:

        $ gcloud compute instances os-inventory list-instances \
        --inventory-filter="PackageUpdates.apt[].Name~^google-cloud*"

    To list all instances with package update google-cloud-sdk of version
    greater than or equal to 235.0.0-0 available through apt, run:

        $ gcloud compute instances os-inventory list-instances \
        --inventory-filter="PackageUpdates.apt[].['google-cloud-sdk'].Ve\
        rsion>=235.0.0-0"

    To list all instances missing the Stackdriver monitoring package
    stackdriver-agent, run:

        $ gcloud compute instances os-inventory list-instances \
        --inventory-filter="NOT(InstalledPackages:stackdriver-agent)"

    To list all Windows instances with an installed qfe hotfix whose ID equals
    KB4462930, run:

        $ gcloud compute instances os-inventory list-instances \
        --inventory-filter="InstalledPackages.qfe[].HotFixID=KB4462930"

    To list all Windows instances with a wua update whose description contains
    the word Security, run:

        $ gcloud compute instances os-inventory list-instances \
        --inventory-filter="InstalledPackages.wua[].Description:Security\
        "

FLAGS
     --inventory-filter=INVENTORY_FILTER
        Filter expression for matching against OS inventory criteria

     Exact match values for OS inventory data:

     --kernel-version=KERNEL_VERSION
        If specified, only instances with this kernel version in their
        inventory data will be displayed.

     --os-shortname=OS_SHORTNAME
        If specified, only instances with this OS shortname in their inventory
        data will be displayed.

     --os-version=OS_VERSION
        If specified, only instances with this OS version in their inventory
        data will be displayed.

     --package-name=PACKAGE_NAME
        If specified, only instances with an installed package of this name in
        their inventory data will be displayed.

     --package-version=PACKAGE_VERSION
        If specified with a package name, only instances with the installed
        package of this version in their inventory data will be displayed.

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

     --uri
        Print a list of resource URIs instead of the default output, and change
        the command output to a list of URIs. If this flag is used with
        --format, the formatting is applied on this URI list. To display URIs
        alongside other keys instead, use the uri() transform.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute instances os-inventory list-instances

        $ gcloud beta compute instances os-inventory list-instances
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud compute instances os-inventory list-instances \
    --inventory-filter="PackageUpdates.apt[].['google-cloud-sdk'].Version>=235.0.0-0"

gcloud compute instances os-inventory list-instances \
    --inventory-filter="InstalledPackages.wua[].Description:Security"
```

### gcloud beta compute instances os-inventory list-instances

```text
NAME
    gcloud beta compute instances os-inventory list-instances - list instances
        with specific OS inventory data values

SYNOPSIS
    gcloud beta compute instances os-inventory list-instances
        [--inventory-filter=INVENTORY_FILTER]
        [--kernel-version=KERNEL_VERSION --os-shortname=OS_SHORTNAME
          --os-version=OS_VERSION
          --package-name=PACKAGE_NAME --package-version=PACKAGE_VERSION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute instances os-inventory list-instances

```text
NAME
    gcloud alpha compute instances os-inventory list-instances - list instances
        with specific OS inventory data values

SYNOPSIS
    gcloud alpha compute instances os-inventory list-instances
        [--inventory-filter=INVENTORY_FILTER]
        [--kernel-version=KERNEL_VERSION --os-shortname=OS_SHORTNAME
          --os-version=OS_VERSION
          --package-name=PACKAGE_NAME --package-version=PACKAGE_VERSION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/instances/os-inventory/list-instances (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
