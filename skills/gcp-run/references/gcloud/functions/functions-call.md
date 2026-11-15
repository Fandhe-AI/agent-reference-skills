---
source: https://docs.cloud.google.com/sdk/gcloud/reference/functions/call
---

# gcloud functions call

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud functions call

```text
NAME
    gcloud functions call - triggers execution of a Google Cloud Function

SYNOPSIS
    gcloud functions call (NAME : --region=REGION)
        [--cloud-event=CLOUD_EVENT | --data=DATA] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Triggers execution of a Google Cloud Function.

EXAMPLES
    To call a function, giving it 'Hello World!' in the message field of its
    event argument (depending on your environment you might need to escape
    characters in --data flag value differently), run:

        $ gcloud functions call helloWorld \
          --data='{"message": "Hello World!"}'

    Note that this method has a limited quota which cannot be increased. It is
    intended for testing and debugging and should not be used in production.

    Calls to HTTP-triggered functions are sent as HTTP POST requests. To use
    other HTTP methods, use a dedicated HTTP request tool such as cURL or wget.

POSITIONAL ARGUMENTS
     Function resource - The Cloud Function name to execute. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

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

FLAGS
     At most one of these can be specified:

       --cloud-event=CLOUD_EVENT
          JSON encoded string with a CloudEvent in structured content mode.

          Mutually exclusive with --data flag.

          Use for Cloud Functions 2nd Gen CloudEvent functions. The CloudEvent
          object will be sent to your function as a binary content mode message
          with the top-level 'data' field set as the HTTP body and all other
          JSON fields sent as HTTP headers.

       --data=DATA
          JSON string with data that will be passed to the function.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha functions call

        $ gcloud beta functions call
```

### gcloud beta functions call

```text
NAME
    gcloud beta functions call - triggers execution of a Google Cloud Function

SYNOPSIS
    gcloud beta functions call (NAME : --region=REGION)
        [--cloud-event=CLOUD_EVENT | --data=DATA] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha functions call

```text
NAME
    gcloud alpha functions call - triggers execution of a Google Cloud Function

SYNOPSIS
    gcloud alpha functions call (NAME : --region=REGION)
        [--cloud-event=CLOUD_EVENT | --data=DATA] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/functions/call (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
