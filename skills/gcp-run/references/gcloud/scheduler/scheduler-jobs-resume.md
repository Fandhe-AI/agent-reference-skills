---
source: https://docs.cloud.google.com/sdk/gcloud/reference/scheduler/jobs/resume
---

# gcloud scheduler jobs resume

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud scheduler jobs resume

```text
NAME
    gcloud scheduler jobs resume - resume execution of a paused job

SYNOPSIS
    gcloud scheduler jobs resume (JOB : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Resume execution of a paused job.

EXAMPLES
    The following command resumes execution of a paused job:

        $ gcloud scheduler jobs resume my-job

POSITIONAL ARGUMENTS
     Job resource - The job to resume. The arguments in this group can be used
     to specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument job on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       JOB
          ID of the job or fully qualified identifier for the job.

          To set the job attribute:
          + provide the argument job on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the job. By default, uses the location of the current
          project's App Engine app if there is an associated app.

          To set the location attribute:
          + provide the argument job on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + defaults to App Engine's app location if not provided & an app
            exists.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the cloudscheduler/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/scheduler/

NOTES
    These variants are also available:

        $ gcloud alpha scheduler jobs resume

        $ gcloud beta scheduler jobs resume
```

### gcloud beta scheduler jobs resume

```text
NAME
    gcloud beta scheduler jobs resume - resume execution of a paused job

SYNOPSIS
    gcloud beta scheduler jobs resume (JOB : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha scheduler jobs resume

```text
NAME
    gcloud alpha scheduler jobs resume - resume execution of a paused job

SYNOPSIS
    gcloud alpha scheduler jobs resume (JOB : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/scheduler/jobs/resume (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
