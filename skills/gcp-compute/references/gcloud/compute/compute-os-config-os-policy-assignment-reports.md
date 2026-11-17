---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/os-config/os-policy-assignment-reports
---

# gcloud compute os-config os-policy-assignment-reports

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute os-config os-policy-assignment-reports describe

```text
NAME
    gcloud compute os-config os-policy-assignment-reports describe - describe
        an OS policy assignment report

SYNOPSIS
    gcloud compute os-config os-policy-assignment-reports describe
        (INSTANCE_OS_POLICY_ASSIGNMENT
          : --instance=INSTANCE --location=LOCATION)
        [--endpoint-mode=ENDPOINT_MODE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe an OS policy assignment report

EXAMPLES
    To describe the report of an OS policy assignment my-assignment for an
    instance my-instance in location us-central1-a:

        $ gcloud compute os-config os-policy-assignment-reports describe \
            my-assignment --instance=my-instance --location=us-central1-a

    Or use the relative names or URI of the resource, assuming the project ID
    is my-project:

        $ gcloud compute os-config os-policy-assignment-reports describe \
            projects/my-project/locations/us-central1-a/instances/\
        my-instance/osPolicyAssignments/my-assignment/report

        $ gcloud compute os-config os-policy-assignment-reports describe \
            https://osconfig.googleapis.com/v1alpha/projects/my-project/\
        locations/us-central1-a/instances/instance-name/\
        osPolicyAssignments/assignment-id/report

POSITIONAL ARGUMENTS
     OS policy assignment resource - OS policy assignment report. The arguments
     in this group can be used to specify the attributes of this resource.
     (NOTE) Some attributes are not given arguments in this group but can be
     set in other ways.

     To set the project attribute:
      * provide the argument instance_os_policy_assignment on the command
        line with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       INSTANCE_OS_POLICY_ASSIGNMENT
          ID of the OS policy assignment or fully qualified identifier for the
          OS policy assignment.

          To set the instance_os_policy_assignment attribute:
          + provide the argument instance_os_policy_assignment on the command
            line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --instance=INSTANCE
          Compute Engine VM instance.

          To set the instance attribute:
          + provide the argument instance_os_policy_assignment on the command
            line with a fully specified name;
          + provide the argument --instance on the command line.

       --location=LOCATION
          Location of the OS policy assignment.

          To set the location attribute:
          + provide the argument instance_os_policy_assignment on the command
            line with a fully specified name;
          + provide the argument --location on the command line;
          + set the property compute/zone.

FLAGS
     --endpoint-mode=ENDPOINT_MODE
        Specifies endpoint mode for a given command. Regional endpoints provide
        enhanced data residency and reliability by ensuring your request is
        handled entirely within the specified Google Cloud region. This differs
        from global endpoints, which may process parts of the request outside
        the target region. Overrides the default regional/endpoint_mode
        property value for this command invocation. ENDPOINT_MODE must be one
        of:

         global
            (Default) Use global rather than regional endpoints.
         regional
            Only use regional endpoints. An error will be raised if a regional
            endpoint is not available for a given command.
         regional-preferred
            Use regional endpoints when available, otherwise use global
            endpoints. Recommended for most users.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the osconfig/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/compute/docs/osconfig/rest

REGIONAL ENDPOINTS
    This command supports regional endpoints. To use regional endpoints for
    this command, use the --endpoint-mode=regional-preferred flag. To use
    regional endpoints by default, run $ gcloud config set
    regional/endpoint_mode regional-preferred.

NOTES
    This variant is also available:

        $ gcloud alpha compute os-config os-policy-assignment-reports \
            describe
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud compute os-config os-policy-assignment-reports describe projects/my-project/locations/us-central1-a/instances/my-instance/osPolicyAssignments/my-assignment/report

gcloud compute os-config os-policy-assignment-reports describe https://osconfig.googleapis.com/v1alpha/projects/my-project/locations/us-central1-a/instances/instance-name/osPolicyAssignments/assignment-id/report
```

### gcloud compute os-config os-policy-assignment-reports list

```text
NAME
    gcloud compute os-config os-policy-assignment-reports list - list OS policy
        assignment reports

SYNOPSIS
    gcloud compute os-config os-policy-assignment-reports list
        [--endpoint-mode=ENDPOINT_MODE] [--location=LOCATION]
        [--assignment-id=ASSIGNMENT_ID | --instance=INSTANCE]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List OS policy assignment reports.

EXAMPLES
    To list reports OS policy assignment in location us-central1-a:

        $ gcloud compute os-config os-policy-assignment-reports list \
            --location=us-central1-a

    To list reports of an instance my-instance in location us-central1-a:

        $ gcloud compute os-config os-policy-assignment-reports list \
            --location=us-central1-a --instance=my-instance

    To list reports of an OS policy assignment my-assignment in location
    us-central1-a:

        $ gcloud compute os-config os-policy-assignment-reports list \
            --location=us-central1-a --assignment-id=my-assignment

FLAGS
     --endpoint-mode=ENDPOINT_MODE
        Specifies endpoint mode for a given command. Regional endpoints provide
        enhanced data residency and reliability by ensuring your request is
        handled entirely within the specified Google Cloud region. This differs
        from global endpoints, which may process parts of the request outside
        the target region. Overrides the default regional/endpoint_mode
        property value for this command invocation. ENDPOINT_MODE must be one
        of:

         global
            (Default) Use global rather than regional endpoints.
         regional
            Only use regional endpoints. An error will be raised if a regional
            endpoint is not available for a given command.
         regional-preferred
            Use regional endpoints when available, otherwise use global
            endpoints. Recommended for most users.

     Location resource - Location of the OS policy assignment reports to list.
     This represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * set the property compute/zone with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --location=LOCATION
        ID of the location or fully qualified identifier for the location.

        To set the location attribute:
        * provide the argument --location on the command line;
        * set the property compute/zone.

     Specify which instance or OS policy assignment to list reports for.

     At most one of these can be specified:

       --assignment-id=ASSIGNMENT_ID
          An OSPolicyAssignment ID. If not provided, OSPolicyAssignmentReports
          for all instances in the project and location will be listed.

       --instance=INSTANCE
          Either instance name or instance ID. If not provided,
          OSPolicyAssignmentReports for all instances in the project and
          location will be listed.

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
    This command uses the osconfig/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/compute/docs/osconfig/rest

REGIONAL ENDPOINTS
    This command supports regional endpoints. To use regional endpoints for
    this command, use the --endpoint-mode=regional-preferred flag. To use
    regional endpoints by default, run $ gcloud config set
    regional/endpoint_mode regional-preferred.

NOTES
    This variant is also available:

        $ gcloud alpha compute os-config os-policy-assignment-reports list
```

### gcloud alpha compute os-config os-policy-assignment-reports describe

```text
NAME
    gcloud alpha compute os-config os-policy-assignment-reports describe -
        describe an OS policy assignment report

SYNOPSIS
    gcloud alpha compute os-config os-policy-assignment-reports describe
        (INSTANCE_OS_POLICY_ASSIGNMENT
          : --instance=INSTANCE --location=LOCATION)
        [--endpoint-mode=ENDPOINT_MODE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute os-config os-policy-assignment-reports list

```text
NAME
    gcloud alpha compute os-config os-policy-assignment-reports list - list OS
        policy assignment reports

SYNOPSIS
    gcloud alpha compute os-config os-policy-assignment-reports list
        [--endpoint-mode=ENDPOINT_MODE] [--location=LOCATION]
        [--assignment-id=ASSIGNMENT_ID | --instance=INSTANCE]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/os-config/os-policy-assignment-reports (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
