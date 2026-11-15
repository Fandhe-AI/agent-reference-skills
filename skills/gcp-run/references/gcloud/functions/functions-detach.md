---
source: https://docs.cloud.google.com/sdk/gcloud/reference/functions/detach
---

# gcloud functions detach

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud functions detach

```text
NAME
    gcloud functions detach - detach a Cloud Functions v2 function from its
        existing environment and make it a native Cloud Run function

SYNOPSIS
    gcloud functions detach (NAME : --region=REGION) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Detach a Cloud Functions v2 function from its existing environment and make
    it a native Cloud Run function.

POSITIONAL ARGUMENTS
     Function resource - The name of the Cloud Functions v2 function to detach.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument NAME on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       NAME
          ID of the function or fully qualified identifier for the function.

          To set the function attribute:
          + provide the argument NAME on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          The Cloud region for the function. Overrides the default
          functions/region property value for this command invocation.

          To set the region attribute:
          + provide the argument NAME on the command line with a fully
            specified name;
          + provide the argument --region on the command line;
          + set the property functions/region.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha functions detach

        $ gcloud beta functions detach
```

### gcloud beta functions detach

```text
NAME
    gcloud beta functions detach - detach a Cloud Functions v2 function from
        its existing environment and make it a native Cloud Run function

SYNOPSIS
    gcloud beta functions detach (NAME : --region=REGION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha functions detach

```text
NAME
    gcloud alpha functions detach - detach a Cloud Functions v2 function from
        its existing environment and make it a native Cloud Run function

SYNOPSIS
    gcloud alpha functions detach (NAME : --region=REGION)
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/functions/detach (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
