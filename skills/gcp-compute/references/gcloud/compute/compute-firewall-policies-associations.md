---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/firewall-policies/associations
---

# gcloud compute firewall-policies associations

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute firewall-policies associations create

```text
NAME
    gcloud compute firewall-policies associations create - create a new
        association between a firewall policy and an organization or folder
        resource

SYNOPSIS
    gcloud compute firewall-policies associations create
        --firewall-policy=FIREWALL_POLICY [--folder=FOLDER] [--name=NAME]
        [--organization=ORGANIZATION] [--replace-association-on-target]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute firewall-policies associations create is used to create
    organization firewall policy associations. An organization firewall policy
    is a set of rules that controls access to various resources.

EXAMPLES
    To associate an organization firewall policy under folder with ID
    ``123456789" to folder ``987654321", run:

        $ gcloud compute firewall-policies associations create \
            --firewall-policy=123456789 --folder=987654321

REQUIRED FLAGS
     --firewall-policy=FIREWALL_POLICY
        Security policy ID of the association.

OPTIONAL FLAGS
     --folder=FOLDER
        ID of the folder with which the association is created.

     --name=NAME
        Name to identify this association. If unspecified, the name will be set
        to "organization-{ORGANIZATION_ID}" or "folder-{FOLDER_ID}".

     --organization=ORGANIZATION
        ID of the organization in which the firewall policy is to be
        associated. Must be set if FIREWALL_POLICY is short name.

     --replace-association-on-target
        By default, if you attempt to insert an association to an organization
        or folder resource that is already associated with a firewall policy
        the method will fail. If this is set, the existing association will be
        deleted at the same time that the new association is created.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute firewall-policies associations create

        $ gcloud beta compute firewall-policies associations create
```

### gcloud compute firewall-policies associations delete

```text
NAME
    gcloud compute firewall-policies associations delete - delete a Compute
        Engine organization firewall policy association

SYNOPSIS
    gcloud compute firewall-policies associations delete NAME
        --firewall-policy=FIREWALL_POLICY [--organization=ORGANIZATION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute firewall-policies associations delete is used to delete
    organization firewall policy association.

EXAMPLES
    To delete an association with name ``example-association" of an
    organization firewall policy with ID ``123456789", run:

        $ gcloud compute firewall-policies associations delete \
            example-association --firewall-policy=123456789

POSITIONAL ARGUMENTS
     NAME
        Name of the association to delete.

REQUIRED FLAGS
     --firewall-policy=FIREWALL_POLICY
        Short name or ID of the firewall policy ID of the association.

OPTIONAL FLAGS
     --organization=ORGANIZATION
        ID of the organization in which the firewall policy is to be detached.
        Must be set if FIREWALL_POLICY is short name.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute firewall-policies associations delete

        $ gcloud beta compute firewall-policies associations delete
```

### gcloud compute firewall-policies associations list

```text
NAME
    gcloud compute firewall-policies associations list - list the associations
        of an organization or folder resource

SYNOPSIS
    gcloud compute firewall-policies associations list
        (--folder=FOLDER | --organization=ORGANIZATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute firewall-policies associations list is used to list the
    associations of an organization or folder resource.

EXAMPLES
    To list the associations of the folder with ID ``987654321", run:

        $ gcloud compute firewall-policies associations list \
            --folder=987654321

REQUIRED FLAGS
     Exactly one of these must be specified:

       --folder=FOLDER
          ID of the folder with which the association is listed.

       --organization=ORGANIZATION
          ID of the organization with which the association is listed.

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

        $ gcloud alpha compute firewall-policies associations list

        $ gcloud beta compute firewall-policies associations list
```

### gcloud beta compute firewall-policies associations create

```text
NAME
    gcloud beta compute firewall-policies associations create - create a new
        association between a firewall policy and an organization or folder
        resource

SYNOPSIS
    gcloud beta compute firewall-policies associations create
        --firewall-policy=FIREWALL_POLICY [--folder=FOLDER] [--name=NAME]
        [--organization=ORGANIZATION] [--replace-association-on-target]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute firewall-policies associations delete

```text
NAME
    gcloud beta compute firewall-policies associations delete - delete a
        Compute Engine organization firewall policy association

SYNOPSIS
    gcloud beta compute firewall-policies associations delete NAME
        --firewall-policy=FIREWALL_POLICY [--organization=ORGANIZATION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute firewall-policies associations list

```text
NAME
    gcloud beta compute firewall-policies associations list - list the
        associations of an organization or folder resource

SYNOPSIS
    gcloud beta compute firewall-policies associations list
        (--folder=FOLDER | --organization=ORGANIZATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute firewall-policies associations create

```text
NAME
    gcloud alpha compute firewall-policies associations create - create a new
        association between a firewall policy and an organization or folder
        resource

SYNOPSIS
    gcloud alpha compute firewall-policies associations create
        --firewall-policy=FIREWALL_POLICY [--folder=FOLDER] [--name=NAME]
        [--organization=ORGANIZATION] [--replace-association-on-target]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute firewall-policies associations delete

```text
NAME
    gcloud alpha compute firewall-policies associations delete - delete a
        Compute Engine organization firewall policy association

SYNOPSIS
    gcloud alpha compute firewall-policies associations delete NAME
        --firewall-policy=FIREWALL_POLICY [--organization=ORGANIZATION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute firewall-policies associations list

```text
NAME
    gcloud alpha compute firewall-policies associations list - list the
        associations of an organization or folder resource

SYNOPSIS
    gcloud alpha compute firewall-policies associations list
        (--folder=FOLDER | --organization=ORGANIZATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/firewall-policies/associations (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
