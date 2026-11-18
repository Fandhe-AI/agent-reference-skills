---
source: https://docs.cloud.google.com/sdk/gcloud/reference/logging/write
---

# gcloud logging write

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud logging write

```text
NAME
    gcloud logging write - write a log entry

SYNOPSIS
    gcloud logging write LOG_NAME MESSAGE
        [--monitored-resource-labels=[KEY=VALUE, ...,...]]
        [--monitored-resource-type=MONITORED_RESOURCE_TYPE; default="global"]
        [--payload-type=PAYLOAD_TYPE; default="text"]
        [--severity=SEVERITY; default="DEFAULT"]
        [--billing-account=BILLING_ACCOUNT_ID | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Write a log entry. If the destination log does not exist, it will be
    created. By default, all log entries written with this command are written
    with the "global" resource type.

    gcloud logging write should be used for simple testing purposes. Check
    Cloud Logging agent for a proper way to send log entries:
    https://cloud.google.com/logging/docs/agent/

EXAMPLES
    To create a log entry in a given log, run:

        $ gcloud logging write LOG_NAME "A simple entry"

    To create a high severity log entry, run:

        $ gcloud logging write LOG_NAME "Urgent message" --severity=ALERT

    To create a structured log, run:

        $ gcloud logging write LOG_NAME '{"key": "value"}' \
            --payload-type=json

    To create a log entry with a custom resource type, run:

        $ gcloud logging write LOG_NAME "A simple entry" \
            --monitored-resource-type=gce_instance \
            --monitored-resource-labels=zone=us-centra1-a,instance_id=1234

POSITIONAL ARGUMENTS
     LOG_NAME
        Name of the log where the log entry will be written.

     MESSAGE
        Message to put in the log entry. It can be JSON if you include
        --payload-type=json.

FLAGS
     --monitored-resource-labels=[KEY=VALUE, ...,...]
        Monitored Resource labels to add to the payload

     --monitored-resource-type=MONITORED_RESOURCE_TYPE; default="global"
        Monitored Resource type to add to the payload

     --payload-type=PAYLOAD_TYPE; default="text"
        Type of the log entry payload. PAYLOAD_TYPE must be one of: text, json.

     --severity=SEVERITY; default="DEFAULT"
        Severity level of the log entry. SEVERITY must be one of: DEFAULT,
        DEBUG, INFO, NOTICE, WARNING, ERROR, CRITICAL, ALERT, EMERGENCY.

     At most one of these can be specified:

       --billing-account=BILLING_ACCOUNT_ID
          Billing account of the log entries to write.

       --folder=FOLDER_ID
          Folder of the log entries to write.

       --organization=ORGANIZATION_ID
          Organization of the log entries to write.

       --project=PROJECT_ID
          Project of the log entries to write.

          The Google Cloud project ID to use for this invocation. If omitted,
          then the current project is assumed; the current project can be
          listed using gcloud config list --format='text(core.project)' and can
          be set using gcloud config set project PROJECTID.

          --project and its fallback core/project property play two roles in
          the invocation: they specify both the project of the resource to
          operate on, and the project for API enablement checks, quota, and
          billing. To specify a different project for quota and billing, use
          the --billing-project flag or the billing/quota_project property.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha logging write

        $ gcloud beta logging write
```

### gcloud beta logging write

```text
NAME
    gcloud beta logging write - write a log entry

SYNOPSIS
    gcloud beta logging write LOG_NAME MESSAGE
        [--monitored-resource-labels=[KEY=VALUE, ...,...]]
        [--monitored-resource-type=MONITORED_RESOURCE_TYPE; default="global"]
        [--payload-type=PAYLOAD_TYPE; default="text"]
        [--severity=SEVERITY; default="DEFAULT"]
        [--billing-account=BILLING_ACCOUNT_ID | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha logging write

```text
NAME
    gcloud alpha logging write - write a log entry

SYNOPSIS
    gcloud alpha logging write LOG_NAME MESSAGE
        [--monitored-resource-labels=[KEY=VALUE, ...,...]]
        [--monitored-resource-type=MONITORED_RESOURCE_TYPE; default="global"]
        [--payload-type=PAYLOAD_TYPE; default="text"]
        [--severity=SEVERITY; default="DEFAULT"]
        [--billing-account=BILLING_ACCOUNT_ID | --folder=FOLDER_ID
          | --organization=ORGANIZATION_ID | --project=PROJECT_ID]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/logging/write (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
