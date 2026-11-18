---
source: https://docs.cloud.google.com/sdk/gcloud/reference/scc/iac-validation-reports
---

# gcloud scc iac-validation-reports

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud scc iac-validation-reports create

```text
NAME
    gcloud scc iac-validation-reports create - create a Cloud Security Command
        Center IaC Validation Report

SYNOPSIS
    gcloud scc iac-validation-reports create PARENT --tf-plan-file=PATH_TO_FILE
        [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a Cloud Security Command Center (SCC) IaC Validation Report. First
    argument is the parent of the IaC defined in the plan file. It is followed
    by path of the terraform plan file in JSON format.

    LRO operation ID is returned as the response of the command.

EXAMPLES
    Create an Iac Validation report on parent
    organizations/123/locations/global:

        $ gcloud scc iac-validation-reports create \
           organizations/123/locations/global --tf-plan-file=planFile.json

POSITIONAL ARGUMENTS
     PARENT
        Name of the organization where IaC Validation Report is to be created.
        Format: organizations/<organizationID>/locations/<location>

REQUIRED FLAGS
     --tf-plan-file=PATH_TO_FILE
        Path to a JSON file containing the IaC plan to be validated. Use a full
        or relative path to a local file containing the value of tf_plan_file.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

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

        $ gcloud alpha scc iac-validation-reports create
```

### gcloud scc iac-validation-reports describe

```text
NAME
    gcloud scc iac-validation-reports describe - describe a Cloud Security
        Command Center IaC Validation Report

SYNOPSIS
    gcloud scc iac-validation-reports describe
        (REPORT : --location=LOCATION --organization=ORGANIZATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a Cloud Security Command Center (SCC) IaC Validation Report. Takes
    the name of the report as an argument.

    Returns IAC Validation Report as response.

EXAMPLES
    Describe an IAC Validation report named
    organizations/123/locations/global/reports/abcef-gh :

        $ gcloud scc iac-validation-reports describe \
            organizations/123/locations/global/reports/abcef-gh

        or, run:

        $ gcloud scc iac-validation-reports describe abcef-gh \
            --organization=123 --location=global

POSITIONAL ARGUMENTS
     Report resource - IAC Validation report to be described. For example
     organizations/123/locations/global/reports/abcef-gh. The arguments in this
     group can be used to specify the attributes of this resource.

     This must be specified.

       REPORT
          ID of the report or fully qualified identifier for the report.

          To set the report attribute:
          + provide the argument report on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          ID of the location where the resource exists (for example, global).

          To set the location attribute:
          + provide the argument report on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --organization=ORGANIZATION
          ID of the organization which is the parent of the resource.

          To set the organization attribute:
          + provide the argument report on the command line with a fully
            specified name;
          + provide the argument --organization on the command line.

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

        $ gcloud alpha scc iac-validation-reports describe
```

### gcloud scc iac-validation-reports list

```text
NAME
    gcloud scc iac-validation-reports list - lists all the Cloud Security
        Command Center IaC validation reports for an organization

SYNOPSIS
    gcloud scc iac-validation-reports list
        ([PARENT] --location=LOCATION --organization=ORGANIZATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Lists all the Cloud Security Command Center (SCC) IaC validation reports
    for an organization.

EXAMPLES
    To list Cloud Security Command Center IaC validation reports for
    organization 123 in the global location, run:

        $ gcloud scc iac-validation-reports list \
            organizations/123/locations/global/reports

    Or using flags:

        $ gcloud scc iac-validation-reports list --organization=123 \
            --location=global

POSITIONAL ARGUMENTS
     Exactly one of these must be specified:

       [PARENT]
          Parent of the IaC validation reports or fully qualified identifier
          for the IaC validation reports.

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
    This command uses the securityposture/v1 API. For more information, see
    Security Command Center API.
    (https://cloud.google.com/security-command-center)

NOTES
    This variant is also available:

        $ gcloud alpha scc iac-validation-reports list
```

### gcloud alpha scc iac-validation-reports create

```text
NAME
    gcloud alpha scc iac-validation-reports create - create a Cloud Security
        Command Center IaC Validation Report

SYNOPSIS
    gcloud alpha scc iac-validation-reports create PARENT
        --tf-plan-file=PATH_TO_FILE [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha scc iac-validation-reports describe

```text
NAME
    gcloud alpha scc iac-validation-reports describe - describe a Cloud
        Security Command Center IaC Validation Report

SYNOPSIS
    gcloud alpha scc iac-validation-reports describe
        (REPORT : --location=LOCATION --organization=ORGANIZATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha scc iac-validation-reports list

```text
NAME
    gcloud alpha scc iac-validation-reports list - lists all the Cloud Security
        Command Center IaC validation reports for an organization

SYNOPSIS
    gcloud alpha scc iac-validation-reports list
        ([PARENT] --location=LOCATION --organization=ORGANIZATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/scc/iac-validation-reports (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
