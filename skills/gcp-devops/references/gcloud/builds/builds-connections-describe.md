---
source: https://docs.cloud.google.com/sdk/gcloud/reference/builds/connections/describe
---

# gcloud builds connections describe

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud builds connections describe

```text
NAME
    gcloud builds connections describe - describe a Cloud Build Connection

SYNOPSIS
    gcloud builds connections describe (CONNECTION : --region=REGION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a Cloud Build Connection.

EXAMPLES
    To describe a Connection my-conn in region us-central1, run the following
    command:

        $ gcloud builds connections describe my-conn --region=us-central1

POSITIONAL ARGUMENTS
     Connection resource - Cloud Build Connection to describe. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument connection on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CONNECTION
          ID of the connection or fully qualified identifier for the
          connection.

          To set the connection attribute:
          + provide the argument connection on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          The Google Cloud region.

          To set the region attribute:
          + provide the argument connection on the command line with a fully
            specified name;
          + provide the argument --region on the command line;
          + set the property builds/region.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the cloudbuild/v2 API. The full documentation for this
    API can be found at: https://cloud.google.com/cloud-build/docs/

NOTES
    These variants are also available:

        $ gcloud alpha builds connections describe

        $ gcloud beta builds connections describe
```

### gcloud beta builds connections describe

```text
NAME
    gcloud beta builds connections describe - describe a Cloud Build Connection

SYNOPSIS
    gcloud beta builds connections describe (CONNECTION : --region=REGION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha builds connections describe

```text
NAME
    gcloud alpha builds connections describe - describe a Cloud Build
        Connection

SYNOPSIS
    gcloud alpha builds connections describe (CONNECTION : --region=REGION)
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/builds/connections/describe (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
