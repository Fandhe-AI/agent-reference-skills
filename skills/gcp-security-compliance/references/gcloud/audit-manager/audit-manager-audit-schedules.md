---
source: https://docs.cloud.google.com/sdk/gcloud/reference/audit-manager/audit-schedules
---

# gcloud audit-manager audit-schedules

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud audit-manager audit-schedules create

```text
NAME
    gcloud audit-manager audit-schedules create - create Audit Schedule

SYNOPSIS
    gcloud audit-manager audit-schedules create
        --audit-schedule-id=AUDIT_SCHEDULE_ID
        --compliance-framework=COMPLIANCE_FRAMEWORK --frequency=FREQUENCY
        --gcs-uri=GCS_URI --location=LOCATION --report-format=REPORT_FORMAT
        --start-time=START_TIME
        (--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT)
        [--display-name=DISPLAY_NAME] [--end-time=END_TIME]
        [--parameter-overrides=[PARAMETER_OVERRIDES,...]]
        [--time-zone=TIME_ZONE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a new Audit Schedule. Parameter overrides are applied to every audit
    run of the schedule and cannot be changed after the schedule is created.

EXAMPLES
    To create an Audit Schedule in the us-central1 region, for a project with
    ID 123 against the compliance framework
    organizations/456/locations/global/frameworks/builtin-nist-800-53-revision5
    in odf format, run:

        $ gcloud audit-manager audit-schedules create --project=123 \
            --location=us-central1 --audit-schedule-id=my-schedule \
            --compliance-framework=organizations/456/locations/global/\
        frameworks/builtin-nist-800-53-revision5 --report-format=odf \
            --gcs-uri=gs://testbucketauditmanager \
            --start-time="2026-03-01T00:00:00Z" --frequency=DAILY

    If the compliance framework is parameterized, to create the same Audit
    Schedule while overriding cloud control parameters defined in the file
    overrides.json, run:

        $ gcloud audit-manager audit-schedules create --project=123 \
            --location=us-central1 --audit-schedule-id=my-schedule \
            --compliance-framework=organizations/456/locations/global/\
        frameworks/builtin-nist-800-53-revision5 --report-format=odf \
            --gcs-uri=gs://testbucketauditmanager \
            --start-time="2026-03-01T00:00:00Z" --frequency=DAILY \
            --parameter-overrides=overrides.json

REQUIRED FLAGS
     --audit-schedule-id=AUDIT_SCHEDULE_ID
        ID to use for the audit schedule.

     --compliance-framework=COMPLIANCE_FRAMEWORK
        Compliance Framework against which the Report must be generated. Eg:
        FEDRAMP_MODERATE

     --frequency=FREQUENCY
        Frequency of audit runs. FREQUENCY must be one of: daily, weekly,
        monthly, quarterly, annually.

     --gcs-uri=GCS_URI
        Destination Cloud storage bucket where report and evidence must be
        uploaded. The Cloud storage bucket provided here must be selected among
        the buckets entered during the enrollment process.

     --location=LOCATION
        The location where the audit schedule should be created.

     --report-format=REPORT_FORMAT
        The format in which the audit report should be created. REPORT_FORMAT
        must be (only one value is supported): odf.

     --start-time=START_TIME
        Date and time when the first audit run is triggered in RFC 3339 format.

     Exactly one of these must be specified:

       --folder=FOLDER
          Folder Id for which to create audit schedule

       --organization=ORGANIZATION
          Organization Id for which to create audit schedule

       --project=PROJECT
          Project Id for which to create audit schedule

OPTIONAL FLAGS
     --display-name=DISPLAY_NAME
        Display name for the audit schedule.

     --end-time=END_TIME
        Date and time that the schedule stops in RFC 3339 format.

     --parameter-overrides=[PARAMETER_OVERRIDES,...]
        Overrides for the parameters of parameterized cloud controls, applied
        when the audit runs. Map from cloud control resource name to the
        overrides for that cloud control.

         KEY
            Full resource name of the cloud control, for example
            organizations/123/locations/global/cloudControls/my-control, as
            returned by gcloud compliance-manager cloud-controls list.

         VALUE
            Parameter overrides for the cloud control.

             parameters
                Parameters to override.

                 name
                    Name of the parameter.

                 parameterValue
                    Value of the parameter. Set exactly one of the following
                    fields.

                     boolValue
                        A boolean value.

                     numberValue
                        A numeric value.

                     oneofValue
                        The selected sub-parameter of a oneOf parameter, with
                        its own name and parameterValue. Can be nested up to 3
                        levels.

                         name
                            Name of the parameter.

                         parameterValue
                            Value of the parameter. Set exactly one of the
                            following fields.

                             boolValue
                                A boolean value.

                             numberValue
                                A numeric value.

                             stringListValue
                                A list of strings.

                                 values
                                    The strings in the list.

                             stringValue
                                A string value.

                     stringListValue
                        A list of strings.

                         values
                            The strings in the list.

                     stringValue
                        A string value.

        Shorthand Example:

            --parameter-overrides=string={parameters=[{name=string,parameterValue={boolValue=boolean,numberValue=float,oneofValue={name=string,parameterValue={boolValue=boolean,numberValue=float,stringListValue={values=[string]},stringValue=string}},stringListValue={values=[string]},stringValue=string}}]}

        JSON Example:

            --parameter-overrides='{"string": {"parameters": [{"name": "string", "parameterValue": {"boolValue": boolean, "numberValue": float, "oneofValue": {"name": "string", "parameterValue": {"boolValue": boolean, "numberValue": float, "stringListValue": {"values": ["string"]}, "stringValue": "string"}}, "stringListValue": {"values": ["string"]}, "stringValue": "string"}}]}}'

        File Example:

            --parameter-overrides=path_to_file.(yaml|json)

     --time-zone=TIME_ZONE
        Time zone for the audit schedule in IANA format (e.g.
        America/New_York).

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha audit-manager audit-schedules create
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud audit-manager audit-schedules create \
    --project=123 \
    --location=us-central1 \
    --audit-schedule-id=my-schedule \
    --compliance-framework=organizations/456/locations/global/frameworks/builtin-nist-800-53-revision5 \
    --report-format=odf \
    --gcs-uri=gs://testbucketauditmanager \
    --start-time="2026-03-01T00:00:00Z" \
    --frequency=DAILY

gcloud audit-manager audit-schedules create \
    --project=123 \
    --location=us-central1 \
    --audit-schedule-id=my-schedule \
    --compliance-framework=organizations/456/locations/global/frameworks/builtin-nist-800-53-revision5 \
    --report-format=odf \
    --gcs-uri=gs://testbucketauditmanager \
    --start-time="2026-03-01T00:00:00Z" \
    --frequency=DAILY \
    --parameter-overrides=overrides.json
```

### gcloud audit-manager audit-schedules describe

```text
NAME
    gcloud audit-manager audit-schedules describe - describe Audit Schedule

SYNOPSIS
    gcloud audit-manager audit-schedules describe AUDIT_SCHEDULE
        [--endpoint-mode=ENDPOINT_MODE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe an Audit Schedule.

EXAMPLES
    To describe an Audit Schedule, run:

        $ gcloud audit-manager audit-schedules describe \
             projects/123/locations/us-central1/auditSchedules/my-schedule

POSITIONAL ARGUMENTS
     AUDIT_SCHEDULE
        Full resource name of the audit schedule.

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

REGIONAL ENDPOINTS
    This command supports regional endpoints. To use regional endpoints for
    this command, use the --endpoint-mode=regional-preferred flag. To use
    regional endpoints by default, run $ gcloud config set
    regional/endpoint_mode regional-preferred.

NOTES
    This variant is also available:

        $ gcloud alpha audit-manager audit-schedules describe
```

### gcloud audit-manager audit-schedules list

```text
NAME
    gcloud audit-manager audit-schedules list - list Audit Schedules

SYNOPSIS
    gcloud audit-manager audit-schedules list --location=LOCATION
        (--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List Audit Schedules.

EXAMPLES
    To list Audit Schedules in the us-central1 region for project 123, run:

        $ gcloud audit-manager audit-schedules list --project=123 \
             --location=us-central1

REQUIRED FLAGS
     --location=LOCATION
        The location where audit schedules should be listed.

     Exactly one of these must be specified:

       --folder=FOLDER
          Folder Id for which to list audit schedules

       --organization=ORGANIZATION
          Organization Id for which to list audit schedules

       --project=PROJECT
          Project Id for which to list audit schedules

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
    This variant is also available:

        $ gcloud alpha audit-manager audit-schedules list
```

### gcloud audit-manager audit-schedules update

```text
NAME
    gcloud audit-manager audit-schedules update - update Audit Schedule

SYNOPSIS
    gcloud audit-manager audit-schedules update AUDIT_SCHEDULE --state=STATE
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update an Audit Schedule state.

EXAMPLES
    To pause an Audit Schedule, run:

        $ gcloud audit-manager audit-schedules update \
             projects/123/locations/us-central1/auditSchedules/my-schedule \
             --state=paused

POSITIONAL ARGUMENTS
     AUDIT_SCHEDULE
        Full resource name of the audit schedule.

REQUIRED FLAGS
     --state=STATE
        State to update the audit schedule to. STATE must be one of: active,
        paused, deleted.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha audit-manager audit-schedules update
```

### gcloud alpha audit-manager audit-schedules create

```text
NAME
    gcloud alpha audit-manager audit-schedules create - create Audit Schedule

SYNOPSIS
    gcloud alpha audit-manager audit-schedules create
        --audit-schedule-id=AUDIT_SCHEDULE_ID
        --compliance-framework=COMPLIANCE_FRAMEWORK --frequency=FREQUENCY
        --gcs-uri=GCS_URI --location=LOCATION --report-format=REPORT_FORMAT
        --start-time=START_TIME
        (--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT)
        [--display-name=DISPLAY_NAME] [--end-time=END_TIME]
        [--parameter-overrides=[PARAMETER_OVERRIDES,...]]
        [--time-zone=TIME_ZONE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha audit-manager audit-schedules describe

```text
NAME
    gcloud alpha audit-manager audit-schedules describe - describe Audit
        Schedule

SYNOPSIS
    gcloud alpha audit-manager audit-schedules describe AUDIT_SCHEDULE
        [--endpoint-mode=ENDPOINT_MODE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha audit-manager audit-schedules list

```text
NAME
    gcloud alpha audit-manager audit-schedules list - list Audit Schedules

SYNOPSIS
    gcloud alpha audit-manager audit-schedules list --location=LOCATION
        (--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha audit-manager audit-schedules update

```text
NAME
    gcloud alpha audit-manager audit-schedules update - update Audit Schedule

SYNOPSIS
    gcloud alpha audit-manager audit-schedules update AUDIT_SCHEDULE
        --state=STATE [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/audit-manager/audit-schedules (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
