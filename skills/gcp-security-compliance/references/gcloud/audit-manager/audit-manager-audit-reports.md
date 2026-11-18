---
source: https://docs.cloud.google.com/sdk/gcloud/reference/audit-manager/audit-reports
---

# gcloud audit-manager audit-reports

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud audit-manager audit-reports generate

```text
NAME
    gcloud audit-manager audit-reports generate - generate Audit Report

SYNOPSIS
    gcloud audit-manager audit-reports generate
        --compliance-framework=COMPLIANCE_FRAMEWORK --gcs-uri=GCS_URI
        --location=LOCATION --report-format=REPORT_FORMAT
        (--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT)
        [--parameter-overrides=[PARAMETER_OVERRIDES,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Generate a new Audit Report.

EXAMPLES
    To generate an Audit Report in the us-central1 region, for a project with
    ID 123 against the compliance framework
    organizations/456/locations/global/frameworks/builtin-nist-800-53-revision5
    in odf format and store it in gs://testbucketauditmanager bucket, run:

        $ gcloud audit-manager audit-reports generate --project=123 \
            --location=us-central1 \
            --compliance-framework=organizations/456/locations/global/\
        frameworks/builtin-nist-800-53-revision5 --report-format=odf \
            --gcs-uri=gs://testbucketauditmanager

    If the compliance framework is parameterized, to generate the same Audit
    Report while overriding cloud control parameters defined in the file
    overrides.json, run:

        $ gcloud audit-manager audit-reports generate --project=123 \
            --location=us-central1 \
            --compliance-framework=organizations/456/locations/global/\
        frameworks/builtin-nist-800-53-revision5 --report-format=odf \
            --gcs-uri=gs://testbucketauditmanager \
            --parameter-overrides=overrides.json

REQUIRED FLAGS
     --compliance-framework=COMPLIANCE_FRAMEWORK
        Compliance Framework against which the Report must be generated. Eg:
        FEDRAMP_MODERATE

     --gcs-uri=GCS_URI
        Destination Cloud storage bucket where report and evidence must be
        uploaded. The Cloud storage bucket provided here must be selected among
        the buckets entered during the enrollment process.

     --location=LOCATION
        The location where the report should be generated.

     --report-format=REPORT_FORMAT
        The format in which the audit report should be created. REPORT_FORMAT
        must be (only one value is supported): odf.

     Exactly one of these must be specified:

       --folder=FOLDER
          Folder Id for which to generate audit report

       --organization=ORGANIZATION
          Organization Id for which to generate audit report

       --project=PROJECT
          Project Id for which to generate audit report

OPTIONAL FLAGS
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

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha audit-manager audit-reports generate
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud audit-manager audit-reports generate \
    --project=123 \
    --location=us-central1 \
    --compliance-framework=organizations/456/locations/global/frameworks/builtin-nist-800-53-revision5 \
    --report-format=odf \
    --gcs-uri=gs://testbucketauditmanager

gcloud audit-manager audit-reports generate \
    --project=123 \
    --location=us-central1 \
    --compliance-framework=organizations/456/locations/global/frameworks/builtin-nist-800-53-revision5 \
    --report-format=odf \
    --gcs-uri=gs://testbucketauditmanager \
    --parameter-overrides=overrides.json
```

### gcloud alpha audit-manager audit-reports generate

```text
NAME
    gcloud alpha audit-manager audit-reports generate - generate Audit Report

SYNOPSIS
    gcloud alpha audit-manager audit-reports generate
        --compliance-framework=COMPLIANCE_FRAMEWORK --gcs-uri=GCS_URI
        --location=LOCATION --report-format=REPORT_FORMAT
        (--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT)
        [--parameter-overrides=[PARAMETER_OVERRIDES,...]]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/audit-manager/audit-reports (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
