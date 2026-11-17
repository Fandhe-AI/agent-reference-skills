---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/org-security-policies/associations
---

# gcloud compute org-security-policies associations

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute org-security-policies associations create

```text
NAME
    gcloud compute org-security-policies associations create - create a new
        association between a security policy and an organization or folder
        resource

SYNOPSIS
    gcloud compute org-security-policies associations create
        --security-policy=SECURITY_POLICY
        [--excluded-folders=[EXCLUDED_FOLDERS,...]]
        [--excluded-projects=[EXCLUDED_PROJECTS,...]] [--name=NAME]
        [--organization=ORGANIZATION] [--replace-association-on-target]
        [--folder=FOLDER | --project-number=PROJECT_NUMBER]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute org-security-policies associations create is used to create
    organization security policy associations. An organization security policy
    is a set of rules that controls access to various resources.

    This command has billing implications. Projects in the hierarchy with
    effective hierarchical security policies will be automatically enrolled
    into Cloud Armor Enterprise if not already enrolled.

EXAMPLES
    To associate an organization security policy under folder with ID 123456789
    to folder 987654321, run:

        $ gcloud compute org-security-policies associations create \
            --security-policy=123456789 --folder=987654321

REQUIRED FLAGS
     --security-policy=SECURITY_POLICY
        Security policy ID of the association.

OPTIONAL FLAGS
     --excluded-folders=[EXCLUDED_FOLDERS,...]
        List of folders to exclude from the application of this security
        policy. Folders should be specified in the form "folders/123".

     --excluded-projects=[EXCLUDED_PROJECTS,...]
        List of projects to exclude from the application of this security
        policy. Projects should be specified in the form "projects/123".

     --name=NAME
        Name to identify this association. If unspecified, the name will be set
        to "organization-{ORGANIZATION_ID}" or "folder-{FOLDER_ID}".

     --organization=ORGANIZATION
        ID of the organization to associate the security policy with. Must be
        set if SECURITY_POLICY is short name.

     --replace-association-on-target
        By default, if you attempt to insert an association to an organization
        or folder resource that is already associated with a security policy
        the method will fail. If this is set, the existing association will be
        deleted at the same time that the new association is created.

     At most one of these can be specified:

       --folder=FOLDER
          ID of the folder to associate the security policy with.

       --project-number=PROJECT_NUMBER
          Project number to associate the security policy with.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute org-security-policies associations create

        $ gcloud beta compute org-security-policies associations create
```

### gcloud compute org-security-policies associations delete

```text
NAME
    gcloud compute org-security-policies associations delete - delete a Compute
        Engine organization security policy association

SYNOPSIS
    gcloud compute org-security-policies associations delete NAME
        --security-policy=SECURITY_POLICY [--organization=ORGANIZATION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute org-security-policies associations delete is used to delete
    organization security policy association.

EXAMPLES
    To delete an association with name example-association of an organization
    security policy with ID 123456789, run:

        $ gcloud compute org-security-policies associations delete \
            example-association --security-policy=123456789

POSITIONAL ARGUMENTS
     NAME
        Name of the association to delete.

REQUIRED FLAGS
     --security-policy=SECURITY_POLICY
        short name or ID of the security policy ID of the association.

OPTIONAL FLAGS
     --organization=ORGANIZATION
        ID of the organization in which the security policy is to be detached.
        Must be set if SECURITY_POLICY is short name.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute org-security-policies associations delete

        $ gcloud beta compute org-security-policies associations delete
```

### gcloud compute org-security-policies associations list

```text
NAME
    gcloud compute org-security-policies associations list - list the
        associations of an organization or folder resource

SYNOPSIS
    gcloud compute org-security-policies associations list
        (--folder=FOLDER | --organization=ORGANIZATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute org-security-policies associations list is used to list the
    associations of an organization or folder resource.

EXAMPLES
    To list the associations of the folder with ID 987654321, run:

        $ gcloud compute org-security-policies associations list \
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

        $ gcloud alpha compute org-security-policies associations list

        $ gcloud beta compute org-security-policies associations list
```

### gcloud beta compute org-security-policies associations create

```text
NAME
    gcloud beta compute org-security-policies associations create - create a
        new association between a security policy and an organization or folder
        resource

SYNOPSIS
    gcloud beta compute org-security-policies associations create
        --security-policy=SECURITY_POLICY
        [--excluded-folders=[EXCLUDED_FOLDERS,...]]
        [--excluded-projects=[EXCLUDED_PROJECTS,...]] [--name=NAME]
        [--organization=ORGANIZATION] [--replace-association-on-target]
        [--folder=FOLDER | --project-number=PROJECT_NUMBER]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute org-security-policies associations delete

```text
NAME
    gcloud beta compute org-security-policies associations delete - delete a
        Compute Engine organization security policy association

SYNOPSIS
    gcloud beta compute org-security-policies associations delete NAME
        --security-policy=SECURITY_POLICY [--organization=ORGANIZATION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute org-security-policies associations list

```text
NAME
    gcloud beta compute org-security-policies associations list - list the
        associations of an organization or folder resource

SYNOPSIS
    gcloud beta compute org-security-policies associations list
        (--folder=FOLDER | --organization=ORGANIZATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute org-security-policies associations create

```text
NAME
    gcloud alpha compute org-security-policies associations create - create a
        new association between a security policy and an organization or folder
        resource

SYNOPSIS
    gcloud alpha compute org-security-policies associations create
        --security-policy=SECURITY_POLICY
        [--excluded-folders=[EXCLUDED_FOLDERS,...]]
        [--excluded-projects=[EXCLUDED_PROJECTS,...]] [--name=NAME]
        [--organization=ORGANIZATION] [--replace-association-on-target]
        [--folder=FOLDER | --project-number=PROJECT_NUMBER]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute org-security-policies associations delete

```text
NAME
    gcloud alpha compute org-security-policies associations delete - delete a
        Compute Engine organization security policy association

SYNOPSIS
    gcloud alpha compute org-security-policies associations delete NAME
        --security-policy=SECURITY_POLICY [--organization=ORGANIZATION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute org-security-policies associations list

```text
NAME
    gcloud alpha compute org-security-policies associations list - list the
        associations of an organization or folder resource

SYNOPSIS
    gcloud alpha compute org-security-policies associations list
        (--folder=FOLDER | --organization=ORGANIZATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/org-security-policies/associations (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
