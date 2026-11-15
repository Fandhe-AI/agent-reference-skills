---
source: https://docs.cloud.google.com/sdk/gcloud/reference/run/jobs/describe
---

# gcloud run jobs describe

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud run jobs describe

```text
NAME
    gcloud run jobs describe - obtain details about jobs

SYNOPSIS
    gcloud run jobs describe JOB [--region=REGION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Obtain details about jobs.

EXAMPLES
    To describe a job:

        $ gcloud run jobs describe my-job

POSITIONAL ARGUMENTS
     Job resource - Job to describe. This represents a Cloud resource. (NOTE)
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

        $ gcloud alpha run jobs describe

        $ gcloud beta run jobs describe
```

### gcloud beta run jobs describe

```text
NAME
    gcloud beta run jobs describe - obtain details about jobs

SYNOPSIS
    gcloud beta run jobs describe JOB [--endpoint-mode=ENDPOINT_MODE]
        [--region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha run jobs describe

```text
NAME
    gcloud alpha run jobs describe - obtain details about jobs

SYNOPSIS
    gcloud alpha run jobs describe JOB [--endpoint-mode=ENDPOINT_MODE]
        [--region=REGION] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/run/jobs/describe (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
