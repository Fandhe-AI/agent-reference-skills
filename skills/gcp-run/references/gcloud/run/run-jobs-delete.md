---
source: https://docs.cloud.google.com/sdk/gcloud/reference/run/jobs/delete
---

# gcloud run jobs delete

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud run jobs delete

```text
NAME
    gcloud run jobs delete - delete a job

SYNOPSIS
    gcloud run jobs delete JOB [--[no-]async] [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a job.

EXAMPLES
    To delete a job:

        $ gcloud run jobs delete job-name

POSITIONAL ARGUMENTS
     Job resource - Job to delete. This represents a Cloud resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument JOB on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       JOB
          ID of the Job or fully qualified identifier for the Job.

          To set the jobs attribute:
          + provide the argument JOB on the command line.

FLAGS
     --[no-]async
        Return immediately, without waiting for the operation in progress to
        complete. Defaults to --no-async. Use --async to enable and --no-async
        to disable.

     --region=REGION
        Region in which the resource can be found. Alternatively, set the
        property [run/region].

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha run jobs delete

        $ gcloud beta run jobs delete
```

### gcloud beta run jobs delete

```text
NAME
    gcloud beta run jobs delete - delete a job

SYNOPSIS
    gcloud beta run jobs delete JOB [--[no-]async]
        [--endpoint-mode=ENDPOINT_MODE] [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha run jobs delete

```text
NAME
    gcloud alpha run jobs delete - delete a job

SYNOPSIS
    gcloud alpha run jobs delete JOB [--[no-]async]
        [--endpoint-mode=ENDPOINT_MODE] [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/run/jobs/delete (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
