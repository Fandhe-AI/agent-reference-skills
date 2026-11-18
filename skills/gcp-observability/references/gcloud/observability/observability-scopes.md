---
source: https://docs.cloud.google.com/sdk/gcloud/reference/observability/scopes
---

# gcloud observability scopes

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud observability scopes describe

```text
NAME
    gcloud observability scopes describe - describe scopes

SYNOPSIS
    gcloud observability scopes describe (SCOPE : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a scope

EXAMPLES
    To describe the scope, run:

        $ gcloud observability scopes describe

POSITIONAL ARGUMENTS
     Scope resource - Name of the resource. The format is:

         projects/{project}/locations/{location}/scopes/{scope}

     The {location} field must be set to global. The {scope} field must be set
     to Default. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument scope on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       SCOPE
          ID of the scope or fully qualified identifier for the scope.

          To set the scope attribute:
          + provide the argument scope on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the scope resource.

          To set the location attribute:
          + provide the argument scope on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the observability/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/stackdriver/docs/

NOTES
    These variants are also available:

        $ gcloud alpha observability scopes describe

        $ gcloud beta observability scopes describe
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud observability scopes describe SCOPE \
    --location=LOCATION
```

### gcloud observability scopes update

```text
NAME
    gcloud observability scopes update - update scopes

SYNOPSIS
    gcloud observability scopes update (SCOPE : --location=LOCATION)
        [--log-scope=LOG_SCOPE] [--trace-scope=TRACE_SCOPE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a scope

EXAMPLES
    To update the scope, run:

        $ gcloud observability scopes update

POSITIONAL ARGUMENTS
     Scope resource - Identifier. Name of the resource. The format is:

         projects/{project}/locations/{location}/scopes/{scope}

     The {location} field must be set to global. The {scope} field must be set
     to Default. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument scope on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       SCOPE
          ID of the scope or fully qualified identifier for the scope.

          To set the scope attribute:
          + provide the argument scope on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the scope resource.

          To set the location attribute:
          + provide the argument scope on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

FLAGS
     --log-scope=LOG_SCOPE
        The full resource name of the LogScope. For example:

            //logging.googleapis.com/projects/myproject/locations/global/logScopes/my-log-scope

     --trace-scope=TRACE_SCOPE
        The resource name of the TraceScope. For example:

            projects/myproject/locations/global/traceScopes/my-trace-scope

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the observability/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/stackdriver/docs/

NOTES
    These variants are also available:

        $ gcloud alpha observability scopes update

        $ gcloud beta observability scopes update
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud observability scopes update SCOPE \
    --location=LOCATION \
    --log-scope=LOG_SCOPE
```

### gcloud beta observability scopes describe

```text
NAME
    gcloud beta observability scopes describe - describe scopes

SYNOPSIS
    gcloud beta observability scopes describe (SCOPE : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta observability scopes update

```text
NAME
    gcloud beta observability scopes update - update scopes

SYNOPSIS
    gcloud beta observability scopes update (SCOPE : --location=LOCATION)
        [--log-scope=LOG_SCOPE] [--trace-scope=TRACE_SCOPE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha observability scopes describe

```text
NAME
    gcloud alpha observability scopes describe - describe scopes

SYNOPSIS
    gcloud alpha observability scopes describe (SCOPE : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha observability scopes update

```text
NAME
    gcloud alpha observability scopes update - update scopes

SYNOPSIS
    gcloud alpha observability scopes update (SCOPE : --location=LOCATION)
        [--log-scope=LOG_SCOPE] [--trace-scope=TRACE_SCOPE]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the `describe` example gives only the command, without the scope and `--location` that the SYNOPSIS requires (`gcloud observability scopes describe (SCOPE : --location=LOCATION)`; gcloud 593.0.0: "Must be specified"); the runnable form adds the SYNOPSIS placeholders.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the `update` example gives only the command, without the scope and `--location` that the SYNOPSIS requires (`gcloud observability scopes update (SCOPE : --location=LOCATION)`; gcloud 593.0.0: "Must be specified"); the runnable form adds the SYNOPSIS placeholders, and `--log-scope` (one of the optional change flags `--log-scope` / `--trace-scope`), since an update without a change flag has nothing to apply.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/observability/scopes (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
