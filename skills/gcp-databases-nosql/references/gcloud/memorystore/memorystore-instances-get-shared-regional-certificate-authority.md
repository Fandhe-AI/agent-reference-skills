---
source: https://docs.cloud.google.com/sdk/gcloud/reference/memorystore/instances/get-shared-regional-certificate-authority
---

# gcloud memorystore instances get-shared-regional-certificate-authority

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud memorystore instances get-shared-regional-certificate-authority

```text
NAME
    gcloud memorystore instances get-shared-regional-certificate-authority -
        get the shared regional CA certificate bundle for Memorystore

SYNOPSIS
    gcloud memorystore instances get-shared-regional-certificate-authority
        --location=LOCATION [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Get the shared regional CA certificate bundle for Memorystore.

    This command can fail for the following reasons:
      o The active account doesn't have permission to access the given
        region.

EXAMPLES
    To get the shared, regional CA certificate bundle in the default region,
    run:

        $ gcloud memorystore instances \
            get-shared-regional-certificate-authority

REQUIRED FLAGS
     Location resource - Arguments and flags that specify the location. This
     represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --location=LOCATION
          ID of the location or fully qualified identifier for the location.

          To set the location attribute:
          + provide the argument --location on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the memorystore/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/memorystore/

NOTES
    These variants are also available:

        $ gcloud alpha memorystore instances \
            get-shared-regional-certificate-authority

        $ gcloud beta memorystore instances \
            get-shared-regional-certificate-authority
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud memorystore instances get-shared-regional-certificate-authority \
    --location=us-central1
```

### gcloud beta memorystore instances get-shared-regional-certificate-authority

```text
NAME
    gcloud beta memorystore instances get-shared-regional-certificate-authority
        - get the shared regional CA certificate bundle for Memorystore

SYNOPSIS
    gcloud beta memorystore instances get-shared-regional-certificate-authority
        --location=LOCATION [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha memorystore instances get-shared-regional-certificate-authority

```text
NAME
    gcloud alpha memorystore instances
        get-shared-regional-certificate-authority - get the shared regional CA
        certificate bundle for Memorystore

SYNOPSIS
    gcloud alpha memorystore instances
        get-shared-regional-certificate-authority --location=LOCATION
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the examples give only the command, without the `--location` that the SYNOPSIS requires (gcloud 593.0.0: "Must be specified"); the runnable form adds sample values.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/memorystore/instances/get-shared-regional-certificate-authority (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
