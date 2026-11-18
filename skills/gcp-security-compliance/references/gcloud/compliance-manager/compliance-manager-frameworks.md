---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compliance-manager/frameworks
---

# gcloud compliance-manager frameworks

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compliance-manager frameworks create

```text
NAME
    gcloud compliance-manager frameworks create - create a framework

SYNOPSIS
    gcloud compliance-manager frameworks create
        (FRAMEWORK : --location=LOCATION --organization=ORGANIZATION)
        [--category=[CATEGORY,...]]
        [--cloud-control-details=[majorRevisionId=MAJORREVISIONID],
          [name=NAME],[parameters=PARAMETERS]] [--description=DESCRIPTION]
        [--display-name=DISPLAY_NAME] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a framework for a given organization and location.

EXAMPLES
    To create a framework my-framework-id in organization my-organization-id
    and location global, run:

        $ gcloud compliance-manager frameworks create my-framework-id \
            --organization=my-organization-id --location=global \
            --description="My framework description" \
            --display-name="My framework display name" \
            --controls='[{"name":
         "organizations/my-organization-id/locations/global/cloudControls/my\
        -control-1", "majorRevisionId": "1", "parameters": []}]' \

    To create a framework my-framework-id in project my-project-number and
    location global, run:

        $ gcloud compliance-manager frameworks create my-framework-id \
            --project=my-project-number --location=global \
            --description="My framework description" \
            --display-name="My framework display name" \
            --controls='[{"name":
         "projects/my-project-number/locations/global/cloudControls/my-contr\
        ol-1", "majorRevisionId": "1", "parameters": []}]' \

POSITIONAL ARGUMENTS
     Framework resource - Identifier. The name of the framework, in one of the
     following formats:
     organizations/{organization}/locations/{location}/frameworks/{framework}
     or projects/{project}/locations/{location}/frameworks/{framework}.

     The only supported location is global. The arguments in this group can be
     used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument framework on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project. This resource can be one of the
        following types:
        [cloudsecuritycompliance.organizations.locations.frameworks,
        cloudsecuritycompliance.projects.locations.frameworks].

     This must be specified.

       FRAMEWORK
          ID of the framework or fully qualified identifier for the framework.

          To set the framework attribute:
          + provide the argument framework on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the framework resource.

          To set the location attribute:
          + provide the argument framework on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --organization=ORGANIZATION
          The organization id of the framework resource.

          To set the organization attribute:
          + provide the argument framework on the command line with a fully
            specified name;
          + provide the argument --organization on the command line. Must be
            specified for resource of type
            [cloudsecuritycompliance.organizations.locations.frameworks].

FLAGS
     --category=[CATEGORY,...]
        The category of the framework. CATEGORY must be one of:

         assured-workloads
            An Assured Workloads framework.
         custom-framework
            A user-created framework.
         data-security
            A data security posture framework.
         google-best-practices
            A Google's best practices framework.
         industry-defined-standard
            An industry-defined framework.

     --cloud-control-details=[majorRevisionId=MAJORREVISIONID],[name=NAME],[parameters=PARAMETERS]
        The cloud control details that are directly added without any grouping
        in the framework.

         majorRevisionId
            The major version of the cloud control.

         name
            The name of the cloud control, in one of the following formats:
            organizations/{organization}/locations/{location}/cloudControls/{cloud_control}
            or
            projects/{project}/locations/{location}/cloudControls/{cloud_control}.

            The only supported location is global.

         parameters
            Parameters are key-value pairs that let you provide your custom
            location requirements, environment requirements, or other settings
            that are relevant to the cloud control. An example parameter is
            {"name": "location","value": "us-west-1"}.

             name
                The name or key of the parameter.

        Shorthand Example:

            --cloud-control-details=majorRevisionId=int,name=string,parameters=[{name=string}] --cloud-control-details=majorRevisionId=int,name=string,parameters=[{name=string}]

        JSON Example:

            --cloud-control-details='[{"majorRevisionId": int, "name": "string", "parameters": [{"name": "string"}]}]'

        File Example:

            --cloud-control-details=path_to_file.(yaml|json)

     --description=DESCRIPTION
        The description of the framework. The maximum length is 2000
        characters.

     --display-name=DISPLAY_NAME
        The friendly name of the framework. The maximum length is 200
        characters.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the cloudsecuritycompliance/v1 API. The full
    documentation for this API can be found at:
    https://cloud.google.com/security-command-center#compliance-management
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined and the corrections listed in Notes are applied.

```bash
gcloud compliance-manager frameworks create my-framework-id \
    --organization=my-organization-id \
    --location=global \
    --description="My framework description" \
    --display-name="My framework display name" \
    --cloud-control-details='[{"name": "organizations/my-organization-id/locations/global/cloudControls/my-control-1", "majorRevisionId": "1", "parameters": []}]'

gcloud compliance-manager frameworks create my-framework-id \
    --project=my-project-number \
    --location=global \
    --description="My framework description" \
    --display-name="My framework display name" \
    --cloud-control-details='[{"name": "projects/my-project-number/locations/global/cloudControls/my-control-1", "majorRevisionId": "1", "parameters": []}]'
```

### gcloud compliance-manager frameworks delete

```text
NAME
    gcloud compliance-manager frameworks delete - delete a framework

SYNOPSIS
    gcloud compliance-manager frameworks delete
        (FRAMEWORK : --location=LOCATION --organization=ORGANIZATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a specific framework.

EXAMPLES
    To delete framework my-framework-id in organization my-organization-id and
    location global, run:

        $ gcloud compliance-manager frameworks delete my-framework-id \
            --organization=my-organization-id --location=global

    To delete framework my-framework-id in project my-project-number and
    location global, run:

        $ gcloud compliance-manager frameworks delete my-framework-id \
            --project=my-project-number --location=global

POSITIONAL ARGUMENTS
     Framework resource - The name of the resource, in one of the following
     formats:
     organizations/{organization}/locations/{location}/frameworks/{framework}
     or projects/{project}/locations/{location}/frameworks/{framework}.

     The only supported location is global. The arguments in this group can be
     used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument framework on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project. This resource can be one of the
        following types:
        [cloudsecuritycompliance.organizations.locations.frameworks,
        cloudsecuritycompliance.projects.locations.frameworks].

     This must be specified.

       FRAMEWORK
          ID of the framework or fully qualified identifier for the framework.

          To set the framework attribute:
          + provide the argument framework on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the framework resource.

          To set the location attribute:
          + provide the argument framework on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --organization=ORGANIZATION
          The organization id of the framework resource.

          To set the organization attribute:
          + provide the argument framework on the command line with a fully
            specified name;
          + provide the argument --organization on the command line. Must be
            specified for resource of type
            [cloudsecuritycompliance.organizations.locations.frameworks].

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the cloudsecuritycompliance/v1 API. The full
    documentation for this API can be found at:
    https://cloud.google.com/security-command-center#compliance-management
```

### gcloud compliance-manager frameworks describe

```text
NAME
    gcloud compliance-manager frameworks describe - get a framework

SYNOPSIS
    gcloud compliance-manager frameworks describe
        (FRAMEWORK : --location=LOCATION --organization=ORGANIZATION)
        [--major-revision-id=MAJOR_REVISION_ID] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Get the details for a specific framework.

EXAMPLES
    To get framework my-framework-id in organization my-organization-id and
    location global, run:

        $ gcloud compliance-manager frameworks describe my-framework-id \
            --organization=my-organization-id --location=global

    To get framework my-framework-id in project my-project-number and location
    global, run:

        $ gcloud compliance-manager frameworks describe my-framework-id \
            --project=my-project-number --location=global

POSITIONAL ARGUMENTS
     Framework resource - The name of the framework to retrieve, in one of the
     following formats:
     organizations/{organization}/locations/{location}/frameworks/{framework}
     or projects/{project}/locations/{location}/frameworks/{framework}.

     The only supported location is global. The arguments in this group can be
     used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument framework on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project. This resource can be one of the
        following types:
        [cloudsecuritycompliance.organizations.locations.frameworks,
        cloudsecuritycompliance.projects.locations.frameworks].

     This must be specified.

       FRAMEWORK
          ID of the framework or fully qualified identifier for the framework.

          To set the framework attribute:
          + provide the argument framework on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the framework resource.

          To set the location attribute:
          + provide the argument framework on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --organization=ORGANIZATION
          The organization id of the framework resource.

          To set the organization attribute:
          + provide the argument framework on the command line with a fully
            specified name;
          + provide the argument --organization on the command line. Must be
            specified for resource of type
            [cloudsecuritycompliance.organizations.locations.frameworks].

FLAGS
     --major-revision-id=MAJOR_REVISION_ID
        The framework major version to retrieve. If not specified, the most
        recently updated revision_id is retrieved.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the cloudsecuritycompliance/v1 API. The full
    documentation for this API can be found at:
    https://cloud.google.com/security-command-center#compliance-management
```

### gcloud compliance-manager frameworks list

```text
NAME
    gcloud compliance-manager frameworks list - list frameworks

SYNOPSIS
    gcloud compliance-manager frameworks list
        (--location=LOCATION : --organization=ORGANIZATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List all frameworks for a given organization and location.

EXAMPLES
    To list all frameworks in organization my-organization-id and location
    global, run:

        $ gcloud compliance-manager frameworks list \
            --organization=my-organization-id --location=global

    To list all frameworks in project my-project-number and location global,
    run:

        $ gcloud compliance-manager frameworks list \
            --project=my-project-number --location=global

REQUIRED FLAGS
     Location resource - The parent resource name, in one of the following
     formats:
      * organizations/{organization}/locations/{location}
      * projects/{project}/locations/{location}.

     The only supported location is global. The arguments in this group can be
     used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project. This resource can be one of the
        following types: [cloudsecuritycompliance.organizations.locations,
        cloudsecuritycompliance.projects.locations].

     This must be specified.

       --location=LOCATION
          ID of the location or fully qualified identifier for the location.

          To set the location attribute:
          + provide the argument --location on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --organization=ORGANIZATION
          The organization id of the location resource.

          To set the organization attribute:
          + provide the argument --location on the command line with a fully
            specified name;
          + provide the argument --organization on the command line. Must be
            specified for resource of type
            [cloudsecuritycompliance.organizations.locations].

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

API REFERENCE
    This command uses the cloudsecuritycompliance/v1 API. The full
    documentation for this API can be found at:
    https://cloud.google.com/security-command-center#compliance-management
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the `create` examples pass `--controls=...`, which is not a flag of this command (gcloud 593.0.0: "unrecognized arguments: --controls=... (did you mean '--account'?)"); the SYNOPSIS flag that takes this JSON list is `--cloud-control-details` (FLAGS example: `--cloud-control-details='[{"majorRevisionId": int, "name": "string", "parameters": [{"name": "string"}]}]'`), which the runnable form uses.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compliance-manager/frameworks (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
