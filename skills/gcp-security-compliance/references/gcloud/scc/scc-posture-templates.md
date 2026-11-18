---
source: https://docs.cloud.google.com/sdk/gcloud/reference/scc/posture-templates
---

# gcloud scc posture-templates

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud scc posture-templates describe

```text
NAME
    gcloud scc posture-templates describe - describe a Cloud Security Command
        Center posture template

SYNOPSIS
    gcloud scc posture-templates describe
        (POSTURE_TEMPLATE : --location=LOCATION --organization=ORGANIZATION)
        [--revision-id=REVISION_ID] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a Cloud Security Command Center (SCC) posture template.

    By default, the latest created revision of the posture template is
    described. Users must provide revision ID to describe a specific revision.

EXAMPLES
    Describe a posture template named
    organizations/123/locations/global/postureTemplates/secure_by_default (i.e.
    a posture in organization 123, location global, with id secure_by_default):

        $ gcloud scc posture-templates describe \
            organizations/123/locations/global/postureTemplates/\
        secure_by_default

    Describe a specific revision v1.0.0 of posture template named
    organizations/123/locations/global/postureTemplates/secure_by_default:

        $ gcloud scc posture-templates describe \
            organizations/123/locations/global/postureTemplates/\
        secure_by_default --revision-id=v1.0.0

POSITIONAL ARGUMENTS
     Posture template resource - Posture template to be described. For example
     organizations/<organizationID>/locations/<location>/postureTemplates/<postureTemplateID>.
     The arguments in this group can be used to specify the attributes of this
     resource.

     This must be specified.

       POSTURE_TEMPLATE
          ID of the posture_template or fully qualified identifier for the
          posture_template.

          To set the posture_template attribute:
          + provide the argument posture_template on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          ID of the location where the resource exists (for example, global).

          To set the location attribute:
          + provide the argument posture_template on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

       --organization=ORGANIZATION
          ID of the organization which is the parent of the resource.

          To set the organization attribute:
          + provide the argument posture_template on the command line with a
            fully specified name;
          + provide the argument --organization on the command line.

FLAGS
     --revision-id=REVISION_ID
        ID of the specific posture template revision to be described. If not
        specified, latest revision is described.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the securityposture/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/security-command-center

NOTES
    This variant is also available:

        $ gcloud alpha scc posture-templates describe
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud scc posture-templates describe organizations/123/locations/global/postureTemplates/secure_by_default

gcloud scc posture-templates describe organizations/123/locations/global/postureTemplates/secure_by_default \
    --revision-id=v1.0.0
```

### gcloud scc posture-templates list

```text
NAME
    gcloud scc posture-templates list - list the details of the Cloud Security
        Command Center posture templates

SYNOPSIS
    gcloud scc posture-templates list
        ([PARENT] --location=LOCATION --organization=ORGANIZATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List the details of the Cloud Security Command Center (SCC) posture
    templates for the specified organization.

EXAMPLES
    To list Cloud Security Command Center posture templates for organization
    123 and in the global location, run:

        $ gcloud scc posture-templates list \
            organizations/123/locations/global

        $ gcloud scc posture-templates list --organization=123 \
            --location=global

POSITIONAL ARGUMENTS
     Exactly one of these must be specified:

       [PARENT]
          Parent of Cloud Security Command Center posture templates. Formatted
          as organizations/<organizationID>/locations/<location>.

       Or at least one of these can be specified:

         Specify organization and location using flags.

         --location=LOCATION
            When data residency controls are enabled, this attribute specifies
            the location in which the resource is located and applicable.

            This flag argument must be specified if any of the other arguments
            in this group are specified.

         --organization=ORGANIZATION
            The organization ID (e.g., 123) that contains the resource.

            This flag argument must be specified if any of the other arguments
            in this group are specified.

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
    This command uses the securityposture/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/security-command-center

NOTES
    This variant is also available:

        $ gcloud alpha scc posture-templates list
```

### gcloud alpha scc posture-templates describe

```text
NAME
    gcloud alpha scc posture-templates describe - describe a Cloud Security
        Command Center posture template

SYNOPSIS
    gcloud alpha scc posture-templates describe
        (POSTURE_TEMPLATE : --location=LOCATION --organization=ORGANIZATION)
        [--revision-id=REVISION_ID] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha scc posture-templates list

```text
NAME
    gcloud alpha scc posture-templates list - list the details of the Cloud
        Security Command Center posture templates

SYNOPSIS
    gcloud alpha scc posture-templates list
        ([PARENT] --location=LOCATION --organization=ORGANIZATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/scc/posture-templates (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
